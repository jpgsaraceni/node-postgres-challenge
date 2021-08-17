import Router from 'express-promise-router';
import { createProducts, readProducts, updateProducts, deleteProducts } from '../controllers/product.controller.js'

const router = Router();

router.post('/', createProducts);
router.get('/', readProducts);
router.put('/', updateProducts);
router.delete('/', deleteProducts);

export default router;