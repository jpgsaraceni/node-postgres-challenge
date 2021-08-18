import { deleteQuery, insert, select, update } from '../config/query.js';

export const createProducts = (req, res) => {
  insert(req, res, 'products');
}

export const readProducts = (req, res) => {
  select(req, res, 'products');
};

export const updateProducts = (req, res) => {
  const notNull = { "measure_unit": 'uni' } // sets default value to NOT NULL constrained columns
  if (req.body.measure_unit) notNull.measure_unit(req.body.measure_unit);

  update(req, res, 'products', notNull);
}

export const deleteProducts = (req, res) => {
  deleteQuery(req, res, 'products');
}