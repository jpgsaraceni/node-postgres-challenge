import Router from 'express-promise-router';
import { login } from '../controllers/login.controller.js';
/**
 * POST '/' -> expects email and password, returns token or 401 error code.
 * @example req.body = {
 *  email: 'test@example.com',
 *  password: 'secret'
 * }
 * 
 * res.send(JWT) || res.sendStatus(401)
 */
const router = Router();

router.post('/', login);

export default router;