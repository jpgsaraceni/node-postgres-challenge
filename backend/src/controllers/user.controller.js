import { runQuery } from '../config/database.js';
import { verify } from '../config/token.js';
import { createHash } from '../config/hash.js';
import { insertUser } from '../config/query.js';

// export const createUsers = (req, res) => {
//   const { token } = req.cookies;
//   const { password } = req.body;
//   const values = [
//     req.body.name,
//     req.body.email,
//   ];

//   verify(token)
//     .then((decoded) => {
//       createHash(password)
//         .then((hash) => {
//           values.push(hash, decoded.id);

//           const query = 'INSERT INTO users'
//             + ' (name, email, password, create_user_id)'
//             + ' VALUES'
//             + ' ($1, $2, $3, $4)'
//             + ' RETURNING *';
//           runQuery(query, values)
//             .then(result => res.send(result))
//             .catch(err => res.sendStatus(500));
//         }).catch(err => res.sendStatus(401))
//     })
// }

export const createUser = (req, res) => {
  console.log('controller')
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  console.log(name, email, password);

  verify(req)
    .then((decoded) => {
      createHash(password)
        .then((hash) => {
          insertUser(name, email, hash, decoded.id).then(() => res.sendStatus(200))
        }).catch(() => res.sendStatus(401))
    })
}

export const readUsers = (req, res) => {
  const { token } = req.cookies;
  verify(token).then((decoded) => {
    const query = 'SELECT * FROM users WHERE deleted=false';

    runQuery(query)
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
};

export const updateUsers = (req, res) => {
  const { token } = req.cookies;
  const { password } = req.body;
  const values = [
    req.body.name,
    req.body.email,
    req.body.id,
  ];

  verify(token).then((decoded) => {
    createHash(password).then((hash) => {

      values.push(hash, decoded.id);

      const query = 'UPDATE users'
        + ' SET name=$1, email=$2, password=$4, update_date=NOW(), update_user_id=$5'
        + ' WHERE id=$3 AND deleted=false'
        + ' RETURNING *';

      runQuery(query, values)
        .then(result => res.send(result))
        .catch(err => res.sendStatus(500));
    }).catch(err => res.sendStatus(401));
  });
}

export const deleteUsers = (req, res) => {
  const { id } = req.body;
  const { token } = req.cookies;

  verify(token).then((decoded) => {
    const { id: userId } = decoded

    const query = 'UPDATE users'
      + ' SET deleted=true, update_date=NOW(), update_user_id=$2'
      + ' WHERE id=$1'
      + ' RETURNING *';

    runQuery(query, [id, userId])
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
}