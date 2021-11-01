import Router from 'express-promise-router';
import { logout } from '../controllers/logout.controller.js';
/**
 * POST '/' -> expects a request with Authorization header, responds with 200
 * if header exists, or 400 if not.
 */
const router = Router();

router.post('/', logout);

export default router;