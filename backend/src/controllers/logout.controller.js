import { verify } from '../config/token.js';

export const logout = (req, res) => {
  verify(req)
    .then(() => {
      res.sendStatus(200)
      console.log(1);
    })
    .catch(() => {
      res.sendStatus(400)
      console.log(2)
    });
}