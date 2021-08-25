import { deleteQuery, select, update } from '../config/query.js';

export const readPayables = (req, res) => {
  select(req, res, 'payables');
}

export const updatePayables = (req, res) => {
  update(req, res, 'payables');
}

export const deletePayables = (req, res) => {
  deleteQuery(req, res, 'payables');
}
