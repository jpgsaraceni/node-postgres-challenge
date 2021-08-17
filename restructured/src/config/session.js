import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const sign = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, secret, (err, token) => {
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