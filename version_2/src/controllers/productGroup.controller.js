import runQuery from '../config/database.js';
import { verify } from '../config/session.js';
// import QueryBuilder from '../config/query.js';

export const createProductGroups = (req, res) => {
  const { token } = req.cookies;
  const values = [
    req.body.name
  ];

  verify(token).then((decoded) => {
    values.push(decoded.id);

    const query = 'INSERT INTO product_groups'
      + ' (name, create_user_id)'
      + ' VALUES'
      + ' ($1, $2)'
      + ' RETURNING *';

    runQuery(query, values)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
};

export const readProductGroups = (req, res) => {
  const { token } = req.cookies;
  verify(token).then((decoded) => {
    const query = 'SELECT * FROM product_groups WHERE deleted=false';

    runQuery(query)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
};

export const updateProductGroups = (req, res) => {
  const { token } = req.cookies;
  const values = [
    req.body.id,
    req.body.name,
  ];

  verify(token).then((decoded) => {
    console.log(decoded);
    values.push(decoded.id);

    const query = 'UPDATE product_groups'
      + ' SET name=$2, update_date=NOW(), update_user_id=$3'
      + ' WHERE id=$1 AND deleted=false'
      + ' RETURNING *';
    console.log(values)
    runQuery(query, values)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401));
};

export const deleteProductGroups = (req, res) => {
  const { id } = req.body;
  const { token } = req.cookies;

  verify(token).then((decoded) => {
    const { id: userId } = decoded

    const query = 'UPDATE product_groups'
      + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
      + ' WHERE id=$1'
      + ' RETURNING *';

    runQuery(query, [id, userId])
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
};