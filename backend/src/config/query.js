import { runQuery, runSoftDeleteTransaction, runTransaction } from '../config/database.js';
import { verify } from '../config/session.js';

// FIXME treat the req.body object in the controllers, not here

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
      // WHERE 1=1 AND filtro
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

export const deleteQuery = (req, res, table) => { // TODO verify if foreign key to existing rows
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

export const insertWithTransaction = async (table, ...queryObjects) => {
  const queryArray = [...queryObjects]
  const primaryKeys = Object.keys(queryArray[0]);
  const primaryValues = Object.values(queryArray[0]);
  queryArray.shift();

  const primaryCount = primaryValues.map((key, i) => i + 1);

  const primaryQuery = `INSERT INTO ${table[0]}`
    + ` (${primaryKeys.join(', ')})`
    + ' VALUES'
    + ` ($${primaryCount.join(', $')})`
    + ` RETURNING *`;

  let secondaryQueries = [];
  let secondaryValues = [];

  queryArray.forEach((queryObject, k) => {
    const keys = Object.keys(queryObject);
    const values = Object.values(queryObject);
    values.pop();
    const count = keys.map((key, i) => i + 1);

    const query = `INSERT INTO ${table[k + 1]}`
      + ` (${keys.join(', ')})`
      + ' VALUES'
      + ` ($${count.join(', $')})`
      + ` RETURNING *`;

    secondaryQueries.push(query);
    secondaryValues.push(values);
  })

  return await runTransaction(primaryQuery, primaryValues, secondaryQueries, secondaryValues);
}

export const deleteWithTransaction = async (mainTableId, userId, ...tables) => {

  const primaryValues = [mainTableId, userId]
  const primaryTable = tables[0]

  const secondaryQueries = [];
  const secondaryValues = [];

  tables.forEach(table => {
    secondaryQueries.push(`UPDATE ${table}`
      + ' SET'
      + ' deleted=true,'
      + ' update_date=NOW(),'
      + ' update_user_id=$2'
      + ' WHERE'
      + ` ${table == primaryTable ? 'id' : primaryTable.slice(0, -1) + '_id'} = $1 RETURNING *`
    )
    secondaryValues.push(primaryValues)
  })

  const primaryQuery = secondaryQueries.shift();

  return await runSoftDeleteTransaction(primaryQuery, primaryValues, secondaryQueries, secondaryValues);
}

export const selectFiltered = (table, ...filterParams) => {
  return new Promise((resolve, reject) => {
    const queryArray = [...filterParams];
    let where = 'WHERE '

    queryArray.forEach((object, i) => {
      const key = Object.keys(object);
      const value = Object.values(object);
      const pair = `${key}=${value}`
      i == 0 ? where += pair : where += `AND ${pair}`;
    })

    const query = `SELECT * FROM ${table} ${where}`

    runQuery(query)
      .then(result => resolve(result))
      .catch(err => reject(err));
  })
}

// ANCHOR new query.js file:
/**
 * 
 * @param {string} email 
 * @returns {Promise<Object>} user information from db
 */
export const selectUser = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name, password'
      + ' FROM users'
      + ' WHERE $1 = email AND deleted = false';

    const values = [email];

    runQuery(query, values).then(result => {
      if (result.length == 0) reject(401);
      resolve(result[0]);
    }).catch(err => {
      reject(err)
    });
  })
};
