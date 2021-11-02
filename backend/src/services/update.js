import { updateRefactored } from '../config/query.js';
import { verify } from '../config/token.js';
/**
 * Checks for a filter object in req.body, if it exists, separates it and deletes from body.
 * Checks authorization header, then passes req.body to the query.js update method,
 * along with the id decoded from the jwt.
 * Responds with 200, 400, 401 or 500.
 * @param {object} req 
 * @param {object} res 
 * @param {string} table
 */
export const updateRequest = (req, res, table) => {
  const { body } = req;
  const { filter } = body;
  if (filter) delete body.filter;

  verify(req)
    .then((decoded) => {
      updateRefactored(body, table, filter, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
};