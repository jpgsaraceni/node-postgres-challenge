/* eslint-disable no-console */

/* -------------------------------------------------------------------------- */
/*                         ANCHOR imports and configs                         */
/* -------------------------------------------------------------------------- */

import dotenv from 'dotenv';
import pkg from 'pg';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
const secret = process.env.JWT_SECRET;
const poolConfig = JSON.parse(process.env.POOL_CONFIG);
const { Pool } = pkg;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const pool = new Pool(poolConfig);

/* -------------------------------------------------------------------------- */
/*                         ANCHOR handling Pool erros                         */
/* -------------------------------------------------------------------------- */

pool.on('error', (err, client) => {
  console.error(`Client: ${client} \n Error: ${err}`);
  process.exit(-1);
});

/* -------------------------------------------------------------------------- */
/*                              ANCHOR CRUD class                             */
/* -------------------------------------------------------------------------- */

function PostgreCrud() {
  let req;
  let res;
  let noId = false;

  function setParams(_req, _res) {
    req = _req;
    res = _res;
  }

  function setNoId(_noId) {
    noId = _noId;
  }

  /* -------------------------------------------------------------------------- */
  /*                          ANCHOR DB request method                          */
  /* -------------------------------------------------------------------------- */

  function request(query, values) {
    const { token } = req.cookies;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { id: userId } = decoded;

        if (!noId) values.push(userId);

        pool.connect()
          .then((client) => client.query(query, values)
            .then((result) => res.status(200).send(result.rows))
            .catch((queryError) => {
              console.log(queryError);
              res.sendStatus(500);
            }))
          .catch((connectionError) => {
            console.log(connectionError);
            res.sendStatus(500);
          })
          .finally(noId = false);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                             ANCHOR login method                            */
  /* -------------------------------------------------------------------------- */

  function login(password, query, values) {
    pool.connect()
      .then((client) => client.query(query, values)
        .then((result) => {
          if (result.rowCount === 0) { // if email is not registered
            res.sendStatus(401);
            return false;
          }
          const { name, password: dbPassword, id } = result.rows[0];

          bcrypt.compare(password, dbPassword).then((bcryptResult) => {
            if (bcryptResult) {
              jwt.sign({ id }, secret, (err, token) => {
                if (err) {
                  console.log(`JWT failed: ${err}`);
                  res.sendStatus(500);
                } else {
                  res.cookie('token', token);
                  res.status(200).send(`Hello, ${name}!`);
                }
              });
            } else {
              res.sendStatus(401);
            }
          }).catch((err) => {
            console.log(`Bcrypt failed: ${err}`);
            res.sendStatus(500);
          });
          client.release();
          return true;
        })

        .catch((err) => {
          client.release();
          console.log(`Query failed: ${err}`);
          res.sendStatus(500);
        }))

      .catch((err) => {
        console.log(`Connection failed: ${err.message}`);
        res.sendStatus(500);
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                            ANCHOR Class methods                            */
  /* -------------------------------------------------------------------------- */

  return {
    setParams,
    setNoId,
    request,
    login,
  };
}

export default PostgreCrud;
