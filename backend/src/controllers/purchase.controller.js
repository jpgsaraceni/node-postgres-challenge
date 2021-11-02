import { deleteWithTransaction } from '../config/query.js';
import { verify } from '../config/session.js';
import readRequest from '../services/read.js';
import createRequestWithTransaction from '../services/transactionCreate.js';
import updateRequest from '../services/update.js';

export const createPurchases = (req, res) => {
  createRequestWithTransaction(req, res);
};
export const readPurchases = (req, res) => {
  readRequest(req, res, 'purchases');
};
export const updatePurchases = (req, res) => { // TODO refactor for transactions
  updateRequest(req, res, 'purchases');
};
export const deletePurchases = async (req, res) => { // TODO refactor
  const { token } = req.cookies;
  const {
    id
  } = req.body;

  const { id: userId } = await verify(token);

  const transaction = await deleteWithTransaction(id, userId, "purchases", "purchase_items", "payables");
  transaction ? res.status(200).send(transaction) : res.sendStatus(404);
};
