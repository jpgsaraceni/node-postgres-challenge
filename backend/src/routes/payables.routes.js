import Router from 'express-promise-router';
import { deletePayables, readPayables, updatePayables } from '../controllers/payables.controller.js';

const router = Router();

router.get('/', readPayables);
router.put('/', updatePayables);
router.delete('/', deletePayables);

export default router;
