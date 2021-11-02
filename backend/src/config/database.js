import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();


const poolConfig = JSON.parse(process.env.POOL_CONFIG);
const { Pool } = pkg;

const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error(`Client: ${client} \n Error: ${err}`);
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Successfully connected!');
});
/**
 * Opens a pool connection and runs the query, then releases the client.
 * @param {string} query  
 * @param {array<string | number>} values 
 * @returns {Promise.<Object[]>} response from db
 */
export const runQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => client
        .query(query, values)
        .then(result => resolve(result.rows))
        .catch((err) => reject(err))
        .finally(() => client.release()))
      .catch((err) => reject(err));
  })
}

export const runSoftDeleteTransaction = async (primaryQuery, primaryValues, secondaryQueries, secondaryValues) => {
  const client = await pool.connect()
  let queryStatus = [];
  try {
    await client.query('BEGIN');
    await client.query(primaryQuery, primaryValues);
    await secondaryQueries.forEach((secondaryQuery, i) => {
      client.query(secondaryQuery, [...secondaryValues[i]]).then((result) => {
        queryStatus.push(result.rows);
      });
    })
    await client.query('COMMIT')
  } catch (e) {
    queryStatus = false;
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
    return queryStatus;
  }
};

// queryArray = ['query returning id', 'query taking id as last param', 'idem']
// valuesArray = ['values first query', 'values missing id', 'idem']
export const runTransaction = async (queryArray, valuesArray) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => {
        const queries = queryArray;
        const values = valuesArray;
        let queryStatus = [];
        client.query('BEGIN')
          .then(() => {
            client.query(queryArray[0], valuesArray[0])
              .then(result => {
                queryStatus.push(result.rows);
                queries.shift();
                values.shift();
                queryArray.forEach((query, i) => { // TODO refactor to use Promise.all (?)
                  client.query(query, [...values[i], result.rows[0].id])
                })
                client.query('COMMIT').then(() => {
                  resolve(true)
                })
              }).catch(e => {
                client.query('ROLLBACK')
                reject(e)
              })
          }).catch(e => reject(e)).finally(() => client.release())
      }).catch(e => reject(e))
  })
};
