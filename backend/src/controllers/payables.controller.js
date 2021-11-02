import { readRequest } from '../services/read.js';
import { updateRequest } from '../services/update.js';
import { deleteRequest } from '../services/delete.js';

export const readPayables = (req, res) => {
  readRequest(req, res, 'payables');
};
export const updatePayables = (req, res) => {
  updateRequest(req, res, 'payables');
};
export const deletePayables = (req, res) => {
  deleteRequest(req, res, 'payables');
};
