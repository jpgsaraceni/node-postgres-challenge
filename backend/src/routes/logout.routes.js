import Router from 'express';
import { logout } from '../controllers/logout.controller.js';

const router = Router();

router.post('/', logout);

export default router;