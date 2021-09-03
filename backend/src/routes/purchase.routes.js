import Router from 'express-promise-router';
import { createPurchases, deletePurchases, readPurchaseDetails, readPurchases, updatePurchases } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/', createPurchases);
router.get('/', readPurchases);
router.get('/:id', readPurchaseDetails);
router.put('/', updatePurchases);
router.delete('/', deletePurchases);

export default router;
