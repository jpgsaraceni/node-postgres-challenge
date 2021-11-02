import Router from 'express';
import { createSuppliers, readSuppliers, updateSuppliers, deleteSuppliers, readSupplierDetails } from '../controllers/supplier.controller.js'

const router = Router();

router.post('/', createSuppliers);
router.get('/', readSuppliers);
router.get('/:id', readSupplierDetails)
router.put('/', updateSuppliers);
router.delete('/', deleteSuppliers);

export default router;