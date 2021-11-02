import { selectFiltered, insertRefactored, selectRefactored, deleteRefactored, updateRefactored } from '../config/query.js';
import { verify } from '../config/token.js';
/**
 * Checks authorization header, then passes req.body to the query.js insert method,
 * along with the id decoded from the jwt.
 * Responds with 200, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 */
export const createSuppliers = (req, res) => {
  const { body } = req;

  verify(req)
    .then((decoded) => {
      insertRefactored(body, 'suppliers', ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
};
/**
 * Checks authorization header, then calls select method from query.js to get all suppliers from db.
 * Responds with result, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 */
export const readSuppliers = (req, res) => {
  verify(req)
    .then(() => {
      selectRefactored(['*'], 'suppliers', {})
        .then(result => res.send(result))
        .catch(err => res.sendStatus(400));
    }).catch(err => res.sendStatus(401))
};
// TODO refactor
export const readSupplierDetails = async (req, res) => {
  const { id } = req.params;

  verify(req)
    .then((decoded) => {
      if (/\s/g.test(decoded.id)) {
        res.sendStatus(418);
        return false;
      }
      selectFiltered('suppliers', id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
}
/**
 * Checks for a filter object in req.body, if it exists, separates it and deletes from body.
 * Checks authorization header, then passes req.body to the query.js update method,
 * along with the id decoded from the jwt.
 * Responds with 200, 400, 401 or 500.
 * @param {object} req 
 * @param {object} res 
 */
export const updateSuppliers = (req, res) => {
  const { body } = req;
  const { filter } = body;
  if (filter) delete body.filter;

  verify(req)
    .then((decoded) => {
      updateRefactored(body, 'suppliers', filter, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
};
/**
 * Checks authorization header, then passes the req.body.id or req.body (if id was not supplied)
 * to the query.js delete method, along with the id decoded from the jwt.
 * Responds with 200, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 */
export const deleteSuppliers = (req, res) => {
  const { body } = req;
  const { id } = body;
  const conditionObj = id ? { id } : { body };

  verify(req)
    .then((decoded) => {
      deleteRefactored('suppliers', conditionObj, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
          console.log(err)
          res.sendStatus(400)
        })
    }).catch(() => res.sendStatus(401))
};