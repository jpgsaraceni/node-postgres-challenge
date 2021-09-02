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

export const runTransaction = async (primaryQuery, primaryValues, secondaryQueries, secondaryValues) => {
  const client = await pool.connect()
  let queryStatus = [];
  try {
    await client.query('BEGIN');
    const res = await client.query(primaryQuery, primaryValues);
    queryStatus.push(res.rows);
    await secondaryQueries.forEach((secondaryQuery, i) => {
      client.query(secondaryQuery, [...secondaryValues[i], res.rows[0].id]).then((result) => {
        queryStatus.push(result.rows);
      }).catch(err => {
        console.log(err)
        queryStatus = false
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