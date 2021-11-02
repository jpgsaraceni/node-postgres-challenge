import { verify } from '../config/token.js';
import { createHash } from '../config/hash.js';
import { deleteRefactored, insertRefactored, selectRefactored, updateRefactored } from '../config/query.js';
/**
 * Checks authorization header, then hashes the password received, replaces it in the req.body object,
 * then passes it to the query.js insert method, along with the id decoded from the jwt.
 * Responds with 200, 400, 401 or 500.
 * @param {object} req 
 * @param {object} res 
 */
export const createUser = (req, res) => {
  const { body } = req;

  verify(req)
    .then((decoded) => {
      createHash(body.password.toString())
        .then((hash) => {
          body.password = hash;
          insertRefactored(body, 'users', ['*'], decoded.id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
        }).catch(() => res.sendStatus(500))
    }).catch(() => res.sendStatus(401))
};
/**
 * Checks authorization header, then calls select method from query.js to get all users from db.
 * Responds with result, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 */
export const readUsers = (req, res) => {
  verify(req)
    .then(() => {
      selectRefactored(['*'], 'users', {})
        .then(result => res.send(result))
        .catch(err => res.sendStatus(400));
    }).catch(err => res.sendStatus(401))
};
/**
 * Checks for a filter object in req.body, if it exists, separates it and deletes from body.
 * Checks authorization header, then hashes the password received, replaces it in the req.body object,
 * then passes it to the query.js update method, along with the id decoded from the jwt.
 * Responds with 200, 400, 401 or 500.
 * @param {object} req 
 * @param {object} res 
 */
export const updateUsers = (req, res) => {
  const { body } = req;
  const { filter } = body;
  if (filter) delete body.filter;
  console.log(body, filter)

  verify(req)
    .then((decoded) => {
      createHash(body.password.toString())
        .then((hash) => {
          body.password = hash;
          updateRefactored(body, 'users', filter, ['*'], decoded.id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
        }).catch(() => res.sendStatus(500))
    }).catch(() => res.sendStatus(401))
};
/**
 * Checks authorization header, then passes the id or email (if id was not supplied) to the query.js
 * delete method, along with the id decoded from the jwt.
 * Responds with 200, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 */
export const deleteUsers = (req, res) => {
  const { email, id } = req.body;
  const conditionObj = id ? { id } : { email };

  verify(req)
    .then((decoded) => {
      deleteRefactored('users', conditionObj, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
          res.sendStatus(400)
        })
    }).catch(() => res.sendStatus(401))
};