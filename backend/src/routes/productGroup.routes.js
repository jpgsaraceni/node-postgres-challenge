import Router from 'express';
import { createProductGroups, readProductGroups, updateProductGroups, deleteProductGroups } from '../controllers/productGroup.controller.js'

const router = Router();

router.post('/', createProductGroups);
router.get('/', readProductGroups);
router.get('/:id', readProductGroups);
router.put('/', updateProductGroups);
router.delete('/', deleteProductGroups);

export default router;