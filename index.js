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

  const query = 'SELECT id, name, password'
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
/*                        ANCHOR Pool connect function                        */
/* -------------------------------------------------------------------------- */

function connectCRUD(query, values, res) {
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
    });
}

/* -------------------------------------------------------------------------- */
/*                              ANCHOR CRUD users                             */
/* -------------------------------------------------------------------------- */

app.post('/users', (req, res) => {
  const { token } = req.cookies;
  const { password: receivedPassword } = req.body;
  const values = [req.body.name, req.body.email];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const { id: userId } = decoded;

      bcrypt.hash(receivedPassword, 10, (bcryptError, hash) => {
        if (bcryptError) throw bcryptError;
        values.push(hash);

        const query = 'INSERT INTO users'
          + ' (name, email, password, create_user_id)'
          + ' VALUES'
          + ' ($1, $2, $3, $4)'
          + ' RETURNING name, email, password, create_user_id';
        values.push(userId);

        connectCRUD(query, values, res);
      });
    }
  });
});

app.get('/users', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const query = 'SELECT * FROM users WHERE deleted = false';
      const values = [];

      connectCRUD(query, values, res);
    }
  });
});

app.put('/users', (req, res) => {
  const { token } = req.cookies;
  const { password: receivedPassword } = req.body;
  const values = [req.body.name, req.body.email, req.body.id];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const { id: userId } = decoded;

      bcrypt.hash(receivedPassword, 10, (bcryptError, hash) => {
        if (bcryptError) throw bcryptError;
        values.push(hash);

        const query = 'UPDATE users'
          + ' SET name=$1, email=$2, password=$4, update_date=NOW(), update_user_id=$5'
          + ' WHERE id=$3 AND deleted=false'
          + ' RETURNING name, email, password, create_user_id, create_date, update_user_id, update_date';
        values.push(userId);

        connectCRUD(query, values, res);
      });
    }
  });
});

app.delete('/users', (req, res) => {
  const { token } = req.cookies;
  const values = [req.body.id];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const { id: userId } = decoded;

      const query = 'UPDATE users'
        + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
        + ' WHERE id=$1'
        + ' RETURNING id, name, deleted';
      values.push(userId);

      connectCRUD(query, values, res);
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                            ANCHOR CRUD suppliers                           */
/* -------------------------------------------------------------------------- */
// TODO: create a middleware for jwt token verification.
// add optional fields (email and phone_number)

app.post('/suppliers', (req, res) => {
  const { token } = req.cookies;
  const values = [req.body.name, req.body.city, req.body.state];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const { id: userId } = decoded;

      const query = 'INSERT INTO suppliers'
        + ' (name, city, state, create_user_id)'
        + ' VALUES'
        + ' ($1, $2, $3, $4)'
        + ' RETURNING name, city, state, create_user_id';
      values.push(userId);

      connectCRUD(query, values, res);
    }
  });
});

app.get('/suppliers', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secret, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const query = 'SELECT * FROM suppliers WHERE deleted = false';
      const values = [];

      connectCRUD(query, values, res);
    }
  });
});

app.put('/suppliers', (req, res) => {
  const { token } = req.cookies;
  const values = [req.body.supplierId, req.body.name];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const { id: userId } = decoded;

      const query = 'UPDATE suppliers'
        + ' SET name=$2, update_date=NOW(), update_user_id=$3'
        + ' WHERE id=$1 AND deleted=false'
        + ' RETURNING id, name, city, state';
      values.push(userId);

      connectCRUD(query, values, res);
    }
  });
});

app.delete('/suppliers', (req, res) => {
  const { token } = req.cookies;
  const values = [req.body.supplierId];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
    } else {
      const { id: userId } = decoded;

      const query = 'UPDATE suppliers'
        + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
        + ' WHERE id=$1'
        + ' RETURNING id, name, deleted';
      values.push(userId);

      connectCRUD(query, values, res);
    }
  });
});

app.listen(80);
