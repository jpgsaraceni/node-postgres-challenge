import { createHash } from '../config/hash.js';
import { insertWithTransaction } from '../config/query.js';
import { verify } from '../config/token.js';
/**
 * Checks authorization header, then passes req.body to the query.js insert method,
 * along with the id decoded from the jwt. If there is a password in body, hashes it first.
 * Responds with 200, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 * @param {string} table
 */
//req.body = {payables:{'a':1, 'b':2}, items:{'c':3, 'd':4}, purchase:{'e':5, 'f':6}}
const createRequestWithTransaction = async (req, res) => {
  const { body } = req;

  if (body.password) {
    await createHash(body.password.toString())
      .then((hash) => body.password = hash)
  };

  verify(req)
    .then((decoded) => {
      insertWithTransaction(body, '*', decoded.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))


};

export default createRequestWithTransaction;
