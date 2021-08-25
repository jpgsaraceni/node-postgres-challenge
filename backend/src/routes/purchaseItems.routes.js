import Router from 'express-promise-router';
import { deletePurchaseItems, readPurchaseItems, updatePurchaseItems } from '../controllers/purchaseItems.controller.js';

const router = Router();

router.get('/', readPurchaseItems);
router.put('/', updatePurchaseItems);
router.delete('/', deletePurchaseItems);

export default router;
