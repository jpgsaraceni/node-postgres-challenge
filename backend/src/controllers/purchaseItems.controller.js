import { deleteQuery, select, update } from '../config/query.js';

export const readPurchaseItems = (req, res) => {
  select(req, res, 'purchase_items');
}

export const updatePurchaseItems = (req, res) => {
  update(req, res, 'purchase_items');
}

export const deletePurchaseItems = (req, res) => {
  deleteQuery(req, res, 'purchase_items');
}
