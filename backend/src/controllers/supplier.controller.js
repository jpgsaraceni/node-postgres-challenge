import { createRequest } from '../services/create.js';
import { readRequest } from '../services/read.js';
import { updateRequest } from '../services/update.js';
import { deleteRequest } from '../services/delete.js';

import { selectFiltered } from '../config/query.js';
import { verify } from '../config/token.js';

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

// TODO refactor
export const readSupplierDetails = async (req, res) => {
  const { id } = req.params;

  verify(req)
    .then((decoded) => {
      if (/\s/g.test(decoded.id)) {
        res.sendStatus(418);
        return false;
      }
      selectFiltered('suppliers', id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(400))
    }).catch(() => res.sendStatus(401))
}