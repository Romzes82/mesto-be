import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateAvatar
} from '../controllers/users';

const router = Router();
// router.post('/signin', login);
// router.post('/signup', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
// router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
