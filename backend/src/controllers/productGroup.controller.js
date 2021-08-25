import { deleteQuery, insert, select, update } from '../config/query.js';

export const createProductGroups = (req, res) => {
  insert(req, res, 'product_groups');
};

export const readProductGroups = (req, res) => {
  select(req, res, 'product_groups');
};

export const updateProductGroups = (req, res) => {
  update(req, res, 'product_groups');
};

export const deleteProductGroups = (req, res) => {
  deleteQuery(req, res, 'product_groups');
};