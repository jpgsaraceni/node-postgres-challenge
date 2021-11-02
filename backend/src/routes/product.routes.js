import Router from 'express';
import { createProducts, readProducts, updateProducts, deleteProducts, readProductDetails } from '../controllers/product.controller.js'

const router = Router();

router.post('/', createProducts);
router.get('/', readProducts);
router.get('/:id', readProductDetails);
router.put('/', updateProducts);
router.delete('/', deleteProducts);

export default router;