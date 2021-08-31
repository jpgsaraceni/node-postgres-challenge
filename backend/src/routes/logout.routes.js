import Router from 'express-promise-router';
import { logout } from '../controllers/logout.controller.js';

const router = Router();

router.post('/', logout);

export default router;