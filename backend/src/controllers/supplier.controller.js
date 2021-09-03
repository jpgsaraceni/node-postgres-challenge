import { insert, select, update, deleteQuery, selectFiltered } from '../config/query.js';
import { verify } from '../config/session.js';

export const createSuppliers = (req, res) => {
  insert(req, res, 'suppliers');
}

export const readSuppliers = (req, res) => {
  select(req, res, 'suppliers');
};

export const readSupplierDetails = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  const { id: userId } = await verify(token);

  if (!userId) {
    res.sendStatus(401)
    return false
  }

  if (/\s/g.test(id)) {
    res.sendStatus(418);
    return false;
  }

  const supplier = await selectFiltered('suppliers', { id })

  if (supplier) {
    res.send({ supplier })
  } else {
    res.send(500)
  }
}

export const updateSuppliers = (req, res) => {
  update(req, res, 'suppliers');
}

export const deleteSuppliers = (req, res) => {
  deleteQuery(req, res, 'suppliers');
}