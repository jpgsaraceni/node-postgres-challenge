import { sign } from '../config/token.js';
import { compare } from '../config/hash.js';
import { selectQuery } from '../config/query.js';
/**
 * Calls method to retrieve user information from database, compares req.body.password to received
 * password, then generates JWT to send to client in response body. If the email is not found in DB
 * or passwords don't match responds with error code 401.
 * @param {object} req 
 * @param {object} res 
 * @returns {string | number} token or error code 401
 */
const loginRequest = (req, res) => {
  const { email } = req.body
  selectQuery(['id', 'password'], 'users', { email })
    .then((dbResponse) => {
      compare(req.body.password.toString(), dbResponse[0].password,
        sign(dbResponse[0].id))
        .then(token => {
          res.send(token)
        }).catch(() => {
          res.sendStatus(401)
        });
    }).catch(() => res.sendStatus(401));
};

export default loginRequest;