import { deleteQuery, select, update, selectFiltered } from '../config/query.js';
import { verify } from '../config/session.js';

export const readPayables = (req, res) => {
  select(req, res, 'payables');
}

export const readPayableDetails = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  const { id: userId } = await verify(token);

  if (!userId) {
    res.sendStatus(401)
    return false
  }

  if (/\s/g.test(id)) {
    res.sendStatus(418);
    return false;
  }

  const payable = await selectFiltered('payables', { purchase_id: id })

  if (payable) {
    res.send({ payable })
  } else {
    res.send(500)
  }
}

export const updatePayables = (req, res) => {
  update(req, res, 'payables');
}

export const deletePayables = (req, res) => {
  deleteQuery(req, res, 'payables');
}
