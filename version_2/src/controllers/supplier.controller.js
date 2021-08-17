import runQuery from '../config/database.js';
import { verify } from '../config/session.js';
// import QueryBuilder from '../config/query.js';

export const createSuppliers = (req, res) => {
  const { token } = req.cookies;
  const values = [
    req.body.name,
    req.body.email,
    req.body.phoneNumber,
    req.body.city,
    req.body.state,
  ];

  verify(token).then((decoded) => {
    values.push(decoded.id);

    const query = 'INSERT INTO suppliers'
      + ' (name, email, phone_number, city, state, create_user_id)'
      + ' VALUES'
      + ' ($1, $2, $3, $4, $5, $6)'
      + ' RETURNING *';

    runQuery(query, values)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
}

export const readSuppliers = (req, res) => {
  const { token } = req.cookies;
  verify(token).then((decoded) => {
    const query = 'SELECT * FROM suppliers WHERE deleted=false';

    runQuery(query)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
};

export const updateSuppliers = (req, res) => {
  const { token } = req.cookies;
  const values = [
    req.body.id,
    req.body.name,
    req.body.email,
    req.body.phoneNumber,
    req.body.city,
    req.body.state,
  ];

  verify(token).then((decoded) => {
    values.push(decoded.id);

    const query = 'UPDATE suppliers'
      + ' SET name=$2, email=$3, phone_number=$4, city=$5, state=$6, update_date=NOW(), update_user_id=$7'
      + ' WHERE id=$1 AND deleted=false'
      + ' RETURNING *';

    runQuery(query, values)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401));
}

export const deleteSuppliers = (req, res) => {
  const { id } = req.body;
  const { token } = req.cookies;

  verify(token).then((decoded) => {
    const { id: userId } = decoded

    const query = 'UPDATE suppliers'
      + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
      + ' WHERE id=$1'
      + ' RETURNING *';

    runQuery(query, [id, userId])
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
}