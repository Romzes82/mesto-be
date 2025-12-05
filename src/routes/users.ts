import { Router } from 'express';
// import User from '../models/card';
import {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

// router.patch('/me/avatar', updateAvatar);

export default router;
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
