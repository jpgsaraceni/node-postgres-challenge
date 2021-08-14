/* eslint-disable no-console */
/* -------------------------------------------------------------------------- */
/*                               ANCHOR imports                               */
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

/* -------------------------------------------------------------------------- */
/*                ANCHOR instance and configure an object of Pool             */
/* -------------------------------------------------------------------------- */

const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error(`Client: ${client} \n Error: ${err}`);
  process.exit(-1);
});

/* -------------------------------------------------------------------------- */
/*                                ANCHOR login                                */
/* -------------------------------------------------------------------------- */

app.get('/login', (req, res) => {
  const { email } = req.body;
  const { password: frontPassword } = req.body;

  const query = 'SELECT id, name, password, deleted'
    + ' FROM users'
    + ' WHERE $1 = email AND deleted = false';
  const values = [email];

  pool.connect()
    .then((client) => client.query(query, values)
      .then((result) => {
        const { name, password: dbPassword, id } = result.rows[0];

        bcrypt.compare(frontPassword, dbPassword).then((bcryptResult) => {
          if (bcryptResult) {
            jwt.sign({ id }, secret, (err, token) => {
              // TODO read about Authorization header using Bearer schema
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
});

/* -------------------------------------------------------------------------- */
/*                            ANCHOR CRUD suppliers                           */
/* -------------------------------------------------------------------------- */
// TODO: create a middleware for jwt token verification.
// action for when query fails
// add optional fields (email and phone_number)
app.post('/suppliers', (req, res) => {
  const { token } = req.cookies;
  // const frontEndValues = {
  //   name: req.body.name,
  //   city: req.body.city,
  //   state: req.body.state,
  // };
  const exampleValues = ['Fornecedor Teste', 'Miguel Pereira', 'RJ'];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id: userId } = decoded;

      const query = 'INSERT INTO suppliers'
        + ' (name, city, state, create_user_id)'
        + ' VALUES'
        + ' ($1, $2, $3, $4)';
      const values = exampleValues.push(userId); // to be replaced by frontEndValues

      pool.connect()
        .then((client) => client.query(query, values)
          .then(() => res.sendStatus(200)));
    }
  });
});

app.get('/suppliers', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const query = 'SELECT * FROM suppliers WHERE deleted = false';
      const values = [];

      pool.connect()
        .then((client) => client.query(query, values)
          .then((result) => res.status(200).send(result.rows)));
    }
  });
});

app.put('/suppliers', (req, res) => {
  const { token } = req.cookies;
  // const frontEndValues = {
  //   supplierId: req.body.supplierId,
  //   name: req.body.name,
  //   city: req.body.city,
  //   state: req.body.sate,
  // };
  const exampleSupplierId = 2;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id: userId } = decoded;

      const query = 'UPDATE suppliers'
        + ' SET name=$1, update_date=NOW(), update_user_id=$2'
        + ' WHERE id=$3 AND deleted=false';
      const values = ['Usuário Atualizado', userId, exampleSupplierId]; // to be replaced with frontEndValues.

      pool.connect()
        .then((client) => client.query(query, values)
          .then((result) => res.status(200).send(result.rows)));
    }
  });
});

app.delete('/suppliers', (req, res) => {
  const { token } = req.cookies;
  // const { supplierId } = req.body;
  const exampleSupplierId = 1;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id: userId } = decoded;

      const query = 'UPDATE suppliers'
        + ' SET deleted=true, update_date=NOW(), update_user_id=$1'
        + ' WHERE id=$2';
      const values = [userId, exampleSupplierId];

      pool.connect()
        .then((client) => client.query(query, values)
          .then(() => res.sendStatus(200)));
    }
  });
});

app.listen(80);
