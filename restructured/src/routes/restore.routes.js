import Router from 'express-promise-router';
import { restore } from '../controllers/restore.controller.js'

const router = Router();

router.put('/:category', restore);

export default router;