import { runQuery, runSoftDeleteTransaction, runTransaction } from '../config/database.js';
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
 * @param {array<string>} columns names of columns to be returned from the query
 * @param {string} table 
 * @param  {object} conditions column/value pairs 
 * @returns {Promise} result of the query
 * 
 * @example select(['id', 'name'], 'users', {email: 'test@example.com'})
 */
export const selectRefactored = (columns, table, conditions) => {
  let columnsString = '';
  columns.forEach((column) => columnsString += `${column}, `);
  columnsString = columnsString.slice(0, -2);

  const conditionKeys = Object.keys(conditions);
  const conditionValues = Object.values(conditions);

  let filters = '';
  conditionKeys.forEach((key, i) => filters += `${key} = $${i + 1} AND `);

  return new Promise((resolve, reject) => {
    const query = `SELECT ${columnsString}`
      + ` FROM ${table}`
      + ` WHERE ${filters}deleted = false`;

    const values = conditionValues;

    runQuery(query, values)
      .then(result => {
        if (result.length === 0) reject(401);
        resolve(result);
      }).catch(err => {
        reject(err)
      });
  })
};
/**
 * 
 * @param {object} inserts column/value pairs
 * @param {string} table 
 * @param  {array} returning what to return from db 
 * @returns {Promise} result of the query
 * 
 * @example insert({email: 'test@example.com', 'name': 'a'}, 'users', ['*'])
 */
export const insertRefactored = (inserts, table, returning, id) => {
  let returningString = '';
  returning.forEach((column) => returningString += `${column}, `);
  returningString = returningString.slice(0, -2);

  const insertColumns = Object.keys(inserts);
  const insertValues = Object.values(inserts);

  let valuePositions = '';
  insertColumns.forEach((key, i) => valuePositions += `$${i + 2}, `);
  valuePositions = valuePositions.slice(0, -2);

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${table} `
      + ` (create_user_id, ${insertColumns})`
      + ' VALUES'
      + ` ($1, ${valuePositions})`
      + ` RETURNING ${returningString}`;

    const values = [id, ...insertValues];
    console.log(query, values)

    runQuery(query, values)
      .then(result => {
        if (result.length === 0) reject(401);
        resolve(result);
      }).catch(err => {
        reject(err)
      });
  })
};
/**
 * 
 * @param {object} updates column/value pairs
 * @param {string} table 
 * @param {object} conditions column/value pairs
 * @param  {array} returning what to return from db 
 * @param  {number} id user who is updating 
 * @returns {Promise} result of the query
 * 
 * @example update({email: 'updated@example.com', 'name': 'a'}, 'users', {email: 'test@example.com'}, ['*'], 1)
 */
export const updateRefactored = (updates, table, conditions, returning, id) => {
  let returningString = '';
  returning.forEach((column) => returningString += `${column}, `);
  returningString = returningString.slice(0, -2);

  const updateColumns = Object.keys(updates);
  const updateValues = Object.values(updates);

  let updatePairs = '';
  updateColumns.forEach((column, i) => updatePairs += `${column}='${updateValues[i]}', `)
  updatePairs = updatePairs.slice(0, -2);

  let filters = '';
  let conditionValues = [];

  if (conditions) {
    const conditionKeys = Object.keys(conditions);
    conditionValues = Object.values(conditions);

    conditionKeys.forEach((key, i) => filters += `${key} = $${i + 2} AND `);
  }

  return new Promise((resolve, reject) => {
    const query = `UPDATE ${table}`
      + ` SET ${updatePairs}, update_date=NOW(), update_user_id=$1`
      + ` WHERE ${filters}deleted = false`
      + ` RETURNING ${returningString}`;

    const values = [id, ...conditionValues];

    runQuery(query, values)
      .then(result => {
        if (result.length === 0) reject(401);
        console.log(result)
        resolve(result);
      }).catch(err => {
        console.log(1, err)
        reject(err)
      });
  })
};
/**
 * 
 * @param {string} table 
 * @param {object} conditions column/value pairs
 * @param  {array} returning what to return from db 
 * @param  {number} id user who is deleting
 * @returns {Promise} result of the query
 * 
 * @example update({email: 'updated@example.com', 'name': 'a'}, 'users', {email: 'test@example.com'}, ['*'], 1)
 */
export const deleteRefactored = (table, conditions, returning, id) => {
  let returningString = '';
  returning.forEach((column) => returningString += `${column}, `);
  returningString = returningString.slice(0, -2);

  const conditionKeys = Object.keys(conditions);
  const conditionValues = Object.values(conditions);

  let filters = '';
  conditionKeys.forEach((key, i) => filters += `${key} = $${i + 2} AND `);

  return new Promise((resolve, reject) => {
    const query = `UPDATE ${table}`
      + ` SET deleted=true, update_date=NOW(), update_user_id=$1`
      + ` WHERE ${filters}deleted = false`
      + ` RETURNING ${returningString}`;

    const values = [id, ...conditionValues];

    runQuery(query, values)
      .then(result => {
        if (result.length === 0) reject(400);
        resolve(result);
      }).catch(err => {
        reject(err)
      });
  })
};

// TODO refactor transactions
