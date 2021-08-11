/* eslint-disable no-console */
/* -------------------------------------------------------------------------- */
/*                               ANCHOR imports                               */
/* -------------------------------------------------------------------------- */

import pkg from 'pg';
import express from 'express';
import bcrypt from 'bcrypt';

// bcrypt.hash('123', 10, async (err, hash) => { // EXAMPLE generate bcrypt hash
//   console.log(hash);
// });

const { Pool } = pkg;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* -------------------------------------------------------------------------- */
/*                ANCHOR instance and configure an object of Pool             */
/* -------------------------------------------------------------------------- */

const pool = new Pool({
  user: 'postgres',
  password: 'meu@deus0',
  host: 'localhost',
  port: 5432,
  database: 'node-postgres',
});

/* -------------------------------------------------------------------------- */
/*                          ANCHOR pool error handling                        */
/* -------------------------------------------------------------------------- */
// "the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens"
// TODO understand this. Source: https://node-postgres.com/features/pooling

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/* -------------------------------------------------------------------------- */
/*                             EXAMPLE login query                            */
/* -------------------------------------------------------------------------- */

// const query = 'SELECT id, name FROM users WHERE $1 = users.email AND $2 = users.password';
// const values = [
//   'jpgsaraceni@gmail.com',
//   '$2b$10$hfgAGGX.QYiFQf1MW0vHN.qiXNKzxgWqN4PmRA3B3.xLi9gpho9jG',
// ];

/* -------------------------------------------------------------------------- */
/*                   EXAMPLE connect to DB and execute query                  */
/* -------------------------------------------------------------------------- */

// pool.connect()
//   .then((client) => {
//     console.log('connected');
//     return client
//       .query(query, values)
//       .then((result) => {
//         client.release();
//         console.table(result.rows);
//       })
//       .catch((err) => {
//         client.release();
//         console.log(err);
//       });
//   });

/* -------------------------------------------------------------------------- */
/*                                ANCHOR login                                */
/* -------------------------------------------------------------------------- */

app.get('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const query = 'SELECT id, name, password FROM users WHERE $1 = users.email';
  const values = [email];

  pool.connect()
    .then((client) => {
      console.log('connected');
      return client
        .query(query, values)
        .then((result) => {
          const { password: dbPassword, name } = result.rows[0];

          // TODO status codes

          bcrypt.compare(password, dbPassword).then((bcryptResult) => {
            if (bcryptResult) { // correct password
              console.log('Logged in.');
              res.status(200).send(`Hello, ${name}!`);
            } else { // wrong password
              console.log('Invalid password.');
              res.sendStatus(500);
            }
          }).catch((err) => { // bcrypt error
            console.log(`bcrypt failed: ${err}`);
            res.sendStatus(500);
          });
          client.release();
        })
        .catch((err) => { // query error
          client.release();
          console.log(`query failed: ${err}`);
          res.sendStatus(500);
        });
    }).catch((err) => { // connect error
      console.log(`Connection failed: ${err.message}`);
    });
});

app.listen(80);
