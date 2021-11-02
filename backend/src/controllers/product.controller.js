import { createRequest } from '../services/create.js';
import { readRequest } from '../services/read.js';
import { updateRequest } from '../services/update.js';
import { deleteRequest } from '../services/delete.js';

export const createProducts = (req, res) => {
  createRequest(req, res, 'products');
};
export const readProducts = (req, res) => {
  readRequest(req, res, 'products');
};
export const updateProducts = (req, res) => {
  updateRequest(req, res, 'products');
};
export const deleteProducts = (req, res) => {
  deleteRequest(req, res, 'products');
};