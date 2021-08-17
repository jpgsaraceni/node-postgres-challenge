import runQuery from '../config/database.js';
import { verify } from '../config/session.js';
// import QueryBuilder from '../config/query.js';

export const createProducts = (req, res) => {
  const { token } = req.cookies;
  const values = [
    req.body.groupId,
    req.body.name,
    req.body.description,
  ];
  if (req.body.measureUnit) {
    values.push(req.body.measureUnit);
  } else {
    values.push('uni');
  }

  verify(token).then((decoded) => {
    values.push(decoded.id);

    const query = 'INSERT INTO products' // check if product group was not deleted
      + ' (product_group_id, name, description, measure_unit, create_user_id)'
      + ' VALUES'
      + ' ($1, $2, $3, $4, $5)'
      + ' RETURNING *';

    runQuery(query, values)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
}

export const readProducts = (req, res) => {
  const { token } = req.cookies;
  verify(token).then((decoded) => {
    const query = 'SELECT * FROM products WHERE deleted=false';

    runQuery(query)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
};

export const updateProducts = (req, res) => {
  const { token } = req.cookies;
  const values = [
    req.body.id,
    req.body.groupId,
    req.body.name,
    req.body.description,
  ];
  if (req.body.measureUnit) {
    values.push(req.body.measureUnit);
  } else {
    values.push('uni');
  }

  verify(token).then((decoded) => {
    values.push(decoded.id);

    const query = 'UPDATE products'
      + ' SET product_group_id=$2, name=$3, description=$4, measure_unit=$5, update_date=NOW(), update_user_id=$6'
      + ' WHERE id=$1 AND deleted=false'
      + ' RETURNING *';

    runQuery(query, values)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401));
}

export const deleteProducts = (req, res) => {
  const { id } = req.body;
  const { token } = req.cookies;

  verify(token).then((decoded) => {
    const { id: userId } = decoded

    const query = 'UPDATE products'
      + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
      + ' WHERE id=$1'
      + ' RETURNING *';

    runQuery(query, [id, userId])
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
}