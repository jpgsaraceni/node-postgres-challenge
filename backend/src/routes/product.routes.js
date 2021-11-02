import Router from 'express';
import { createProducts, readProducts, updateProducts, deleteProducts } from '../controllers/product.controller.js'

const router = Router();

router.post('/', createProducts);
router.get('/', readProducts);
router.get('/:id', readProducts);
router.put('/', updateProducts);
router.delete('/', deleteProducts);

export default router;