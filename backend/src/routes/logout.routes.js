import Router from 'express-promise-router';
import { logout } from '../controllers/logout.controller.js';

const router = Router();

router.get('/', logout);

export default router;