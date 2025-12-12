import { Router } from 'express';
import {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
  login,
} from '../controllers/users';

const router = Router();
router.post('/signin', login);
// router.post('/signup', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
