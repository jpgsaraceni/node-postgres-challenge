import { deleteQuery, select, selectFiltered, update } from '../config/query.js';
import { verify } from '../config/session.js';

export const readPurchaseItems = (req, res) => {
  console.log(req.params)
  const { token } = req.cookies;
  const { id: purchase_id } = req.params;


  if (/\s/g.test(purchase_id)) {
    res.sendStatus(418);
    return false;
  }

  verify(token).then(() => {
    selectFiltered('purchase_items', { purchase_id })
      .then(result => res.send(result))
      .catch(() => res.sendStatus(500));
  }).catch(() => {
    res.sendStatus(401)
  });
}

export const updatePurchaseItems = (req, res) => {
  update(req, res, 'purchase_items');
}

export const deletePurchaseItems = (req, res) => {
  deleteQuery(req, res, 'purchase_items');
}
