import { runQuery } from '../config/database.js';
import { sign } from '../config/session.js';
import { compare } from '../config/hash.js';

export const login = (req, res) => {
  console.log("requisição")
  const { email, password: reqPassword } = req.body;

  const query = 'SELECT id, name, password'
    + ' FROM users'
    + ' WHERE $1 = email AND deleted = false';

  runQuery(query, [email])
    .then(result => {
      if (result.length == 0) { // no matching email in DB
        res.sendStatus(401);
        return false;

      } else {
        const { password: dbPassword, name, id } = result[0];

        compare(reqPassword, dbPassword).then(bcryptResult => {
          if (bcryptResult) {
            sign(id).then(jwt => {
              res.cookie('token', jwt);
              res.status(200).send(`Hello, ${name}!`);

            }).catch(() => res.sendStatus(500));
          } else {
            res.sendStatus(401); // passwords don't match
          };
        }).catch(() => res.sendStatus(500));
      };
    }).catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}