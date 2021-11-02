import { runQuery, runSoftDeleteTransaction, runTransaction, runTransactionRefactored } from '../config/database.js';
/**
 * 
 * @param {array<string>} columns names of columns to be returned from the query
 * @param {string} table 
 * @param  {object} conditions column/value pairs 
 * @returns {Promise} result of the query
 * 
 * @example select(['id', 'name'], 'users', {email: 'test@example.com'})
 */
export const selectQuery = (columns, table, conditions) => {
  let columnsString = '';
  columns.forEach((column) => columnsString += `${column}, `);
  columnsString = columnsString.slice(0, -2);

  let filters = '';
  let conditionValues = [];

  if (conditions) {
    const conditionKeys = Object.keys(conditions);
    conditionValues = Object.values(conditions);

    conditionKeys.forEach((key, i) => filters += `${key} = $${i + 1} AND `);
  }


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
export const insertQuery = (inserts, table, returning, id) => {
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
export const updateQuery = (updates, table, conditions, returning, id) => {
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
export const deleteQuery = (table, conditions, returning, id) => {
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

export const restoreQuery = (table, conditions, returning, id) => {
  let returningString = '';
  returning.forEach((column) => returningString += `${column}, `);
  returningString = returningString.slice(0, -2);

  const conditionKeys = Object.keys(conditions);
  const conditionValues = Object.values(conditions);

  let filters = '';
  conditionKeys.forEach((key, i) => filters += `${key} = $${i + 2} AND `);

  return new Promise((resolve, reject) => {
    const query = `UPDATE ${table}`
      + ` SET deleted=false, update_date=NOW(), update_user_id=$1`
      + ` WHERE ${filters}deleted = true`
      + ` RETURNING ${returningString}`;

    const values = [id, ...conditionValues];
    console.log(query, values);

    runQuery(query, values)
      .then(result => {
        if (result.length === 0) reject(result);
        resolve(result);
      }).catch(err => {
        reject(err)
      });
  })
};


export const insertWithTransaction = (inserts, returning, id) => {
  const insertTables = Object.keys(inserts); // ['purchase', 'items', 'payables']
  const insertObjects = Object.values(inserts) // [{}, {}, {}]

  const queryArray = [];
  const valuesArray = [];

  insertTables.forEach((table, i) => {
    const insertColumns = Object.keys(insertObjects[i]);
    const insertValues = Object.values(insertObjects[i]);

    let valuePositions = '';
    insertColumns.forEach((key, j) => valuePositions += `$${j + 2}, `);
    valuePositions = valuePositions.slice(0, -2);

    let query;

    if (i === 0) {
      query = `INSERT INTO ${table}s `
        + ` (create_user_id, ${insertColumns})`
        + ' VALUES'
        + ` ($1, ${valuePositions})`
        + ` RETURNING id`;
    };
    if ((i > 0) && (i < (insertTables.length - 1))) {
      query = `INSERT INTO ${table}s `
        + ` (create_user_id, ${insertColumns}, ${insertTables[0]}_id)`
        + ' VALUES'
        + ` ($1, ${valuePositions}, $${insertColumns.length + 2})`
        + ` RETURNING id`;
    };
    if (i === (insertTables.length - 1)) {
      query = `INSERT INTO ${table}s `
        + ` (create_user_id, ${insertColumns}, ${insertTables[0]}_id)`
        + ' VALUES'
        + ` ($1, ${valuePositions}, $${insertColumns.length + 2})`
        + ` RETURNING ${returning}`;
    }


    const values = [id, ...insertValues];

    queryArray.push(query);
    valuesArray.push(values);
  })
  return new Promise((resolve, reject) => {
    runTransaction(queryArray, valuesArray)
      .then(() => resolve(true))
      .catch(() => reject(false))
  })
}
// TODO refactor transactions

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