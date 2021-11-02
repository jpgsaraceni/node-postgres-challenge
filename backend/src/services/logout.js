import { verify } from '../config/token.js';
/**
 * Validates jwt with server signature
 * @param {object} req 
 * @param {object} res 
 * @returns {number} responds with 200 or 400
 */
export const logoutRequest = (req, res) => {
  verify(req)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(() => {
      res.sendStatus(400)
    });
}