import { insertRefactored } from '../config/query.js';
import { verify } from '../config/token.js';
/**
 * Checks authorization header, then passes req.body to the query.js insert method,
 * along with the id decoded from the jwt.
 * Responds with 200, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 * @param {string} table
 */
export const createRequest = (req, res, table) => {
  const { body } = req;

  verify(req)
    .then((decoded) => {
      insertRefactored(body, table, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
};
