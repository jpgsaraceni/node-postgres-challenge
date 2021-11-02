import Router from 'express';
import { deletePayables, readPayables, updatePayables, readPayableDetails } from '../controllers/payables.controller.js';

const router = Router();

router.get('/', readPayables);
router.get('/:id', readPayableDetails);
router.put('/', updatePayables);
router.delete('/', deletePayables);

export default router;
