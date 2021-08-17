import Router from 'express-promise-router';
import { createSuppliers, readSuppliers, updateSuppliers, deleteSuppliers } from '../controllers/supplier.controller.js'

const router = Router();

router.post('/', createSuppliers);
router.get('/', readSuppliers);
router.put('/', updateSuppliers);
router.delete('/', deleteSuppliers);

export default router;