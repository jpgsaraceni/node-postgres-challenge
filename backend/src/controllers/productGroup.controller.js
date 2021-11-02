import createRequest from '../services/create.js';
import readRequest from '../services/read.js';
import updateRequest from '../services/update.js';
import deleteRequest from '../services/delete.js';

export const createProductGroups = (req, res) => {
  createRequest(req, res, 'product_groups');
};
export const readProductGroups = (req, res) => {
  readRequest(req, res, 'product_groups');
};
export const updateProductGroups = (req, res) => {
  updateRequest(req, res, 'product_groups');
};
export const deleteProductGroups = (req, res) => {
  deleteRequest(req, res, 'product_groups');
};