import { createRequest } from '../services/create.js';
import { readRequest } from '../services/read.js';
import { updateRequest } from '../services/update.js';
import { deleteRequest } from '../services/delete.js';

import { selectFiltered } from '../config/query.js';
import { verify } from '../config/token.js';

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
// TODO refactor
export const readProductDetails = async (req, res) => {
  const { id } = req.params;

  verify(req)
    .then((decoded) => {
      if (/\s/g.test(decoded.id)) {
        res.sendStatus(418);
        return false;
      }
      selectFiltered('products', id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
}
