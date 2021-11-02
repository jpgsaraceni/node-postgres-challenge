import Router from 'express';
import { deletePayables, readPayables, updatePayables } from '../controllers/payables.controller.js';

const router = Router();

router.get('/', readPayables);
router.get('/:id', readPayables);
router.put('/', updatePayables);
router.delete('/', deletePayables);

export default router;
