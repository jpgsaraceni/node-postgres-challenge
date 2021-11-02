import Router from 'express';
import { createPurchases, deletePurchases, readPurchases, updatePurchases } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/', createPurchases);
router.get('/', readPurchases);
router.get('/:id', readPurchases);
router.put('/', updatePurchases);
router.delete('/', deletePurchases);

export default router;
