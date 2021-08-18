import { deleteQuery, insert, select, update } from '../config/query.js';

export const createPurchases = (req, res) => {
  insert(req, res, 'purchases');
};

export const readPurchases = (req, res) => {
  select(req, res, 'purchases');
}

export const updatePurchases = (req, res) => {
  update(req, res, 'purchases');
}

export const deletePurchases = (req, res) => {
  deleteQuery(req, res, 'purchases');
}
