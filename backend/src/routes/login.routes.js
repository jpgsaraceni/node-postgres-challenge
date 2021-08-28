import Router from 'express-promise-router';
import { login } from '../controllers/login.controller.js';

const router = Router();

router.post('/', login);

export default router;