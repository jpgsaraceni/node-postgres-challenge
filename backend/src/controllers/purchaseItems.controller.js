import readRequest from '../services/read.js';
import updateRequest from '../services/update.js';
import deleteRequest from '../services/delete.js';

export const readPurchaseItems = (req, res) => {
  readRequest(req, res, 'purchase_items');
};
export const updatePurchaseItems = (req, res) => {
  updateRequest(req, res, 'purchase_items');
};
export const deletePurchaseItems = (req, res) => {
  deleteRequest(req, res, 'purchase_items');
};

