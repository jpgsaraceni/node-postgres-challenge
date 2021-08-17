import Router from 'express-promise-router';
import { createUsers, readUsers, updateUsers, deleteUsers } from '../controllers/user.controller.js'

const router = Router();

router.post('/', createUsers);
router.get('/', readUsers);
router.put('/', updateUsers);
router.delete('/', deleteUsers);

export default router;