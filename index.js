/* eslint-disable import/extensions */

// TODO:
// add optional fields to inserts/updates;
// transactions;
// validations;
// duplicate db inserts;
// review query error handling;
// id is incrementing even when query fails;

/* -------------------------------------------------------------------------- */
/*                               ANCHOR imports                               */
/* -------------------------------------------------------------------------- */

import express from 'express';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import PostgreCrud from './crud.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* -------------------------------------------------------------------------- */
/*                                ANCHOR login                                */
/* -------------------------------------------------------------------------- */

const postgresLogin = new PostgreCrud();

app.get('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const query = 'SELECT id, name, password'
    + ' FROM users'
    + ' WHERE $1 = email AND deleted = false';
  const values = [email];

  postgresLogin.setParams(req, res);
  postgresLogin.login(password, query, values);
});

/* -------------------------------------------------------------------------- */
/*                              ANCHOR CRUD users                             */
/* -------------------------------------------------------------------------- */

const crudUsers = new PostgreCrud();

app.post('/users', (req, res) => {
  const receivedPassword = req.body.password;
  const values = [
    req.body.name,
    req.body.email,
  ];

  bcrypt.hash(receivedPassword, 10, (bcryptError, hash) => {
    if (bcryptError) throw bcryptError;
    values.push(hash);

    const query = 'INSERT INTO users'
      + ' (name, email, password, create_user_id)'
      + ' VALUES'
      + ' ($1, $2, $3, $4)'
      + ' RETURNING name, email, password, create_user_id';

    crudUsers.setParams(req, res);
    crudUsers.request(query, values);
  });
});

app.get('/users', (req, res) => {
  const values = [];

  const query = 'SELECT * FROM users WHERE deleted = false';

  crudUsers.setParams(req, res);
  crudUsers.setNoId(true);
  crudUsers.request(query, values);
});

app.put('/users', (req, res) => {
  const receivedPassword = req.body.password;
  const values = [
    req.body.name,
    req.body.email,
    req.body.id,
  ];

  bcrypt.hash(receivedPassword, 10, (bcryptError, hash) => {
    if (bcryptError) throw bcryptError;
    values.push(hash);

    const query = 'UPDATE users'
      + ' SET name=$1, email=$2, password=$4, update_date=NOW(), update_user_id=$5'
      + ' WHERE id=$3 AND deleted=false'
      + ' RETURNING name, email, password, create_user_id, create_date, update_user_id, update_date';

    crudUsers.setParams(req, res);
    crudUsers.request(query, values);
  });
});

app.delete('/users', (req, res) => {
  const values = [
    req.body.id,
  ];

  const query = 'UPDATE users'
    + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
    + ' WHERE id=$1'
    + ' RETURNING id, name, deleted';

  crudUsers.setParams(req, res);
  crudUsers.request(query, values);
});

/* -------------------------------------------------------------------------- */
/*                            ANCHOR CRUD suppliers                           */
/* -------------------------------------------------------------------------- */

const crudSuppliers = new PostgreCrud();

app.post('/suppliers', (req, res) => {
  const values = [
    req.body.name,
    req.body.city,
    req.body.state,
  ];

  const query = 'INSERT INTO suppliers'
    + ' (name, city, state, create_user_id)'
    + ' VALUES'
    + ' ($1, $2, $3, $4)'
    + ' RETURNING name, city, state, create_user_id';

  crudSuppliers.setParams(req, res);
  crudSuppliers.request(query, values);
});

app.get('/suppliers', (req, res) => {
  const values = [];

  const query = 'SELECT * FROM suppliers WHERE deleted = false';

  crudSuppliers.setParams(req, res);
  crudSuppliers.setNoId(true);
  crudSuppliers.request(query, values);
});

app.put('/suppliers', (req, res) => {
  const values = [
    req.body.supplierId,
    req.body.name,
  ];

  const query = 'UPDATE suppliers'
    + ' SET name=$2, update_date=NOW(), update_user_id=$3'
    + ' WHERE id=$1 AND deleted=false'
    + ' RETURNING id, name, city, state';

  crudSuppliers.setParams(req, res);
  crudSuppliers.request(query, values);
});

app.delete('/suppliers', (req, res) => {
  const values = [
    req.body.supplierId,
  ];

  const query = 'UPDATE suppliers'
    + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
    + ' WHERE id=$1'
    + ' RETURNING id, name, deleted';

  crudSuppliers.setParams(req, res);
  crudSuppliers.request(query, values);
});

/* -------------------------------------------------------------------------- */
/*                         ANCHOR CRUD product groups                         */
/* -------------------------------------------------------------------------- */

const crudProductGroups = new PostgreCrud();

app.post('/product-groups', (req, res) => {
  const values = [req.body.name];

  const query = 'INSERT INTO product_groups'
    + ' (name, create_user_id)'
    + ' VALUES'
    + ' ($1, $2)'
    + ' RETURNING id, name, create_user_id, create_date';

  crudProductGroups.setParams(req, res);
  crudProductGroups.request(query, values);
});

app.get('/product-groups', (req, res) => {
  const values = [];

  const query = 'SELECT * FROM product_groups WHERE deleted = false';

  crudProductGroups.setParams(req, res);
  crudProductGroups.setNoId(true);
  crudProductGroups.request(query, values);
});

app.put('/product-groups', (req, res) => {
  const values = [
    req.body.productGroupId,
    req.body.name,
  ];

  const query = 'UPDATE product_groups'
    + ' SET name=$2, update_date=NOW(), update_user_id=$3'
    + ' WHERE id=$1 AND deleted=false'
    + ' RETURNING id, name, create_user_id, create_date, update_user_id, update_date';

  crudProductGroups.setParams(req, res);
  crudProductGroups.request(query, values);
});

app.delete('/product-groups', (req, res) => {
  const values = [
    req.body.productGroupId,
  ];

  const query = 'UPDATE product_groups'
    + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
    + ' WHERE id=$1'
    + ' RETURNING id, name, deleted';

  crudProductGroups.setParams(req, res);
  crudProductGroups.request(query, values);
});

/* -------------------------------------------------------------------------- */
/*                            ANCHOR CRUD products                            */
/* -------------------------------------------------------------------------- */

const crudProducts = new PostgreCrud();

app.post('/products', (req, res) => {
  const values = [
    req.body.id,
    req.body.name,
  ];

  const query = 'INSERT INTO products' // check if product group is not deleted
    + ' (product_group_id, name, create_user_id)'
    + ' VALUES'
    + ' ($1, $2, $3)'
    + ' RETURNING id, product_group_id, name, create_user_id, create_date';

  crudProducts.setParams(req, res);
  crudProducts.request(query, values);
});

app.get('/products', (req, res) => {
  const values = [];

  const query = 'SELECT * FROM products WHERE deleted = false';

  crudProducts.setParams(req, res);
  crudProducts.setNoId(true);
  crudProducts.request(query, values);
});

app.put('/products', (req, res) => {
  const values = [
    req.body.productId,
    req.body.name,
  ];

  const query = 'UPDATE products'
    + ' SET name=$2, update_date=NOW(), update_user_id=$3'
    + ' WHERE id=$1 AND deleted=false'
    + ' RETURNING id, name, create_user_id, create_date, update_user_id, update_date';

  crudProducts.setParams(req, res);
  crudProducts.request(query, values);
});

app.delete('/products', (req, res) => {
  const values = [
    req.body.productId,
  ];

  const query = 'UPDATE products'
    + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
    + ' WHERE id=$1'
    + ' RETURNING id, name, deleted';

  crudProducts.setParams(req, res);
  crudProducts.request(query, values);
});

app.listen(80);
