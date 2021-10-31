import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
/**
 * Creates a JWT containing user id and secret (stored in the server)
 * @param {number} id 
 * @returns {Promise<string>} JWT or error
 */
export const sign = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: id }, secret, (err, token) => {
      if (err) reject(err);
      if (token) resolve(token);
    });
  })
}

export const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      if (decoded) resolve(decoded);
    })
  })
}