import runQuery from '../config/database.js';
import { verify } from '../config/session.js';

export const insert = (req, res, table, hash) => {
  const { token } = req.cookies;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  verify(token).then((decoded) => {
    if (/\s/g.test(keys)) {
      res.sendStatus(418);
      return false;
    }

    values.push(decoded.id);
    const count = values.map((key, i) => i + 1);

    const query = `INSERT INTO ${table}`
      + ` (${keys.join(', ')}, create_user_id)`
      + ' VALUES'
      + ` ($${count.join(', $')})`
      + ' RETURNING *'

    runQuery(query, values)
      .then(result => res.send(result))
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  }).catch(() => res.sendStatus(401))
};

export const select = (req, res, table) => {
  const { token } = req.cookies;
  verify(token).then(() => {
    const query = `SELECT * FROM ${table} WHERE deleted=false`;

    runQuery(query)
      .then(result => res.send(result))
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  }).catch(() => res.sendStatus(401))
};

export const update = (req, res, table, notNull) => { // TODO: options for where
  const { token } = req.cookies;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  // const whereKey = Object.keys(whereObj)[0];
  // const whereValue = Object.values(whereObj)[0];

  if (notNull) {
    Object.keys(notNull).forEach(key => keys.push(key)); // FIXME: adds repeated keys into query; works but not cool
    Object.values(notNull).forEach(value => values.push(value));
  }

  verify(token).then((decoded) => {
    if (/\s/g.test(keys) || /\s/g.test(keys)) {
      res.sendStatus(418);
      return false;
    }

    // values.push(decoded.id, whereValue);
    values.push(decoded.id);

    const count = values.map((key, i) => i + 1);
    let pairs = keys.map((key, i) => `${key}=$${i + 1}`);

    const query = `UPDATE ${table}`
      + ` SET ${pairs.join(', ')}, update_date=NOW(), update_user_id=$${count.length}` // FIXME id is included
      // + ` WHERE ${whereKey}=${count} AND deleted=false`
      + ' WHERE id=$1 AND deleted=false'
      + ' RETURNING *';

    console.log(query, values);

    runQuery(query, values)
      .then(result => res.send(result))
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  }).catch(() => res.sendStatus(401));
}

export const deleteQuery = (req, res, table) => {
  const { token } = req.cookies;
  const values = [req.body.id];

  verify(token).then((decoded) => {
    values.push(decoded.id);

    const query = `UPDATE ${table}`
      + ` SET deleted=true, update_date=NOW(), update_user_id=$2`
      + ' WHERE id=$1'
      + ' RETURNING *';

    runQuery(query, values)
      .then(result => res.send(result))
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  }).catch(() => res.sendStatus(401));
}
