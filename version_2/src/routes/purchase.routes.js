import Router from 'express-promise-router';
import { createPurchases, deletePurchases, readPurchases, updatePurchases } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/', createPurchases);
router.get('/', readPurchases);
router.put('/', updatePurchases);
router.delete('/', deletePurchases);

export default router;
