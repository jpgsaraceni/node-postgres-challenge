import runQuery from '../config/database.js';
import { verify } from '../config/session.js';

export const restore = (req, res) => {
  const { token } = req.cookies;
  const { category } = req.params;
  const { id } = req.body;

  if (/\s/g.test(req.body.table)) {
    res.sendStatus(418);
    return false;
  }

  verify(token).then((decoded) => {

    const query = `UPDATE ${category}`
      + ' SET deleted=false, update_date=NOW(), update_user_id=$2'
      + ' WHERE id=$1'
      + ' RETURNING *';

    runQuery(query, [id, decoded.id])
      .then(result => res.send(result))
      .catch(err => res.sendStatus(500));
  }).catch(err => res.sendStatus(401))
}