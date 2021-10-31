import { sign } from '../config/token.js';
import { compare } from '../config/hash.js';
import { selectUser } from '../config/query.js';
/**
 * Calls method to retrieve user information from database, compares req.body.password to received
 * password, then generates JWT to send to client in response body. If the email is not found in DB
 * or passwords don't match responds with error code 401.
 * @param {object} req 
 * @param {object} res 
 * @returns {string | number} token or error code 401
 */
export const login = (req, res) => {
  selectUser(req.body.email)
    .then((dbResponse) => {
      compare(req.body.password, dbResponse.password,
        sign(dbResponse.id))
        .then(token => {
          res.send(token)
        }).catch(() => {
          res.sendStatus(401)
        });
    }).catch(() => res.sendStatus(401));
}