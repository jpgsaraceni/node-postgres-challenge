import { verify } from '../config/token.js';
import { createHash } from '../config/hash.js';
import { deleteRefactored, insertRefactored, selectRefactored, updateRefactored } from '../config/query.js';

export const createUser = (req, res) => {
  const { name, email, password } = req.body;

  verify(req)
    .then((decoded) => {
      createHash(password)
        .then((hash) => {
          insertRefactored({ name, email, password: hash }, 'users', ['*'])
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
        }).catch(() => res.sendStatus(500))
    }).catch(() => res.sendStatus(401))
};

export const readUsers = (req, res) => {
  verify(req)
    .then(() => {
      selectRefactored(['*'], 'users', {})
        .then(result => res.send(result))
        .catch(err => res.sendStatus(400));
    }).catch(err => res.sendStatus(401))
};

export const updateUsers = (req, res) => {
  const { name, email, password, condition } = req.body;

  verify(req)
    .then((decoded) => {
      createHash(password)
        .then((hash) => {
          updateRefactored({ name, email, password: hash }, 'users', condition, ['*'], decoded.id)
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(400))
        }).catch(() => res.sendStatus(500))
    }).catch(() => res.sendStatus(401))
};

export const deleteUsers = (req, res) => {
  const { email } = req.body;

  verify(req)
    .then((decoded) => {
      deleteRefactored('users', { email }, ['*'], decoded.id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
};