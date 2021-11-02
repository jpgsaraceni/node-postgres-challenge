import { selectQuery } from '../config/query.js';
import { verify } from '../config/token.js';
/**
 * Checks authorization header, then calls select method from query.js to get all registries from db.
 * Responds with result, 400 or 401.
 * @param {object} req 
 * @param {object} res 
 * @param {string} table
 */
const readRequest = (req, res, table) => {
  const { id } = req.params;
  const filter = id ? { id } : {};

  verify(req)
    .then(() => {
      selectQuery(['*'], table, filter)
        .then(result => res.send(result))
        .catch(err => res.sendStatus(400));
    }).catch(err => res.sendStatus(401))
};

export default readRequest;