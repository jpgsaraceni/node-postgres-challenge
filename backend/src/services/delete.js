import { deleteRefactored } from '../config/query.js';
import { verify } from '../config/token.js';
/**
 * Checks authorization header, then passes the req.body.id or req.body (if id was not supplied)
 * to the query.js delete method, along with the id decoded from the jwt.
 * Responds with 200, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 * @param {string} table
 */
export const deleteRequest = (req, res, table) => {
  const { body } = req;
  const { id } = body;
  const conditionObj = id ? { id } : { body };

  verify(req)
    .then((decoded) => {
      deleteRefactored(table, conditionObj, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
          console.log(err)
          res.sendStatus(400)
        })
    }).catch(() => res.sendStatus(401))
};