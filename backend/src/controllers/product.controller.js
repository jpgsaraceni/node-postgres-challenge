import { deleteQuery, insert, select, update, selectFiltered } from '../config/query.js';
import { verify } from '../config/session.js';

export const createProducts = (req, res) => {
  insert(req, res, 'products');
}

export const readProducts = (req, res) => {
  select(req, res, 'products');
};

export const readProductDetails = async (req, res) => {
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

  const product = await selectFiltered('products', { id })

  if (product) {
    res.send({ product })
  } else {
    res.send(500)
  }
}

export const updateProducts = (req, res) => {
  const notNull = { "measure_unit": 'uni' } // sets default value to NOT NULL constrained columns
  if (req.body.measure_unit) notNull.measure_unit(req.body.measure_unit);

  update(req, res, 'products', notNull);
}

export const deleteProducts = (req, res) => {
  deleteQuery(req, res, 'products');
}