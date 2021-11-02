import Router from 'express';
import { restore } from '../controllers/restore.controller.js'

const router = Router();

router.put('/:category', restore);

export default router;