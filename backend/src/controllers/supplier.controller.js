import createRequest from '../services/create.js';
import readRequest from '../services/read.js';
import updateRequest from '../services/update.js';
import deleteRequest from '../services/delete.js';

export const createSuppliers = (req, res) => {
  createRequest(req, res, 'suppliers');
};
export const readSuppliers = (req, res) => {
  readRequest(req, res, 'suppliers');
};
export const updateSuppliers = (req, res) => {
  updateRequest(req, res, 'suppliers');
};
export const deleteSuppliers = (req, res) => {
  deleteRequest(req, res, 'suppliers');
};
