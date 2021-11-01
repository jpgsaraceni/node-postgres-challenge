import Router from 'express-promise-router';
import { createUser, readUsers, updateUsers, deleteUsers } from '../controllers/user.controller.js';
/**
 * POST '/' -> expects name, email and password, responds with 200, 400, 401 or 500.
 * GET '/' -> responds with all users if authorized. 500 or 401 else.
 * PUT '/' -> expects name, email, password and condition (object with value/pair filter).
 *  Responds with 200, 400, 401 or 500.
 * DELETE '/' -> expects email of user to be deleted. Responds with 200, 400 or 401.
 * 
 */
const router = Router();

router.post('/', createUser);
router.get('/', readUsers);
router.put('/', updateUsers);
router.delete('/', deleteUsers);

export default router;