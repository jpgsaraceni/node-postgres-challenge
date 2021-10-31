import { verify } from '../config/token.js';

export const logout = (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    verify(token).then(() => {
      res.sendStatus(200);
    }).catch(() => res.sendStatus(400));
  } else {
    res.sendStatus(400);
  }
}