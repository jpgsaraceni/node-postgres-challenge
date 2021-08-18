import { insert, select, update, deleteQuery } from '../config/query.js';

export const createSuppliers = (req, res) => {
  insert(req, res, 'suppliers');
}

export const readSuppliers = (req, res) => {
  select(req, res, 'suppliers');
};

export const updateSuppliers = (req, res) => {
  update(req, res, 'suppliers');
}

export const deleteSuppliers = (req, res) => {
  deleteQuery(req, res, 'suppliers');
}