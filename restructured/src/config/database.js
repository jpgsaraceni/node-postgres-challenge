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

const runQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.connect()
      .then((client) => client.query(query, values)
        .then(result => resolve(result.rows))
        .catch((err) => reject(err)))
      .catch((err) => reject(err));
  })
}

export default runQuery;