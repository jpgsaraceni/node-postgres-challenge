import Router from 'express-promise-router';
import { login } from '../controllers/login.controller.js';

const router = Router();

router.get('/', login);

export default router;