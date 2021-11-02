import Router from 'express';
import { createUser, readUsers, updateUsers, deleteUsers } from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser);
router.get('/', readUsers);
router.get('/:id', readUsers)
router.put('/', updateUsers);
router.delete('/', deleteUsers);

export default router;