import { deleteQuery, select, update, insertWithTransaction } from '../config/query.js';
import { verify } from '../config/session.js';

export const createPurchases = async (req, res) => {
  const { token } = req.cookies;
  const {
    supplier_id,
    total_price,
    number_of_payments,
    product_id,
    amount,
    unit_price,
    payment_price,
    due_date,
    purchase_date,
    payment_number,
  } = req.body;
  const keys = Object.keys(req.body);

  const { id: create_user_id } = await verify(token);

  if (/\s/g.test(keys)) {
    res.sendStatus(418);
    return false;
  }

  const purchaseObject = {
    supplier_id,
    total_price,
    number_of_payments,
    create_user_id,
  };

  const purchase_itemsObject = {
    product_id,
    amount,
    unit_price,
    create_user_id,
    purchase_id: 0,
  };

  const payablesObject = {
    // to reduce complexity for this primary version, payables
    // will all be generated with only one payment due.
    payment_price,
    due_date,
    purchase_date,
    payment_number,
    create_user_id,
    purchase_id: 0,
  }

  const tableNames = ["purchases", "purchase_items", "payables"]

  const transaction = await insertWithTransaction(tableNames, purchaseObject, purchase_itemsObject, payablesObject);
  transaction ? res.status(200).send(transaction) : res.sendStatus(404);
};

// TODO refactor other methods for purchases

export const readPurchases = (req, res) => {
  select(req, res, 'purchases');
}

export const updatePurchases = (req, res) => {
  update(req, res, 'purchases');
}

export const deletePurchases = (req, res) => {
  deleteQuery(req, res, 'purchases');
}
