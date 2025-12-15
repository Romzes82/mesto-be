import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} from '../controllers/users';
import { validateUserBodyUpdate, validateAvatarBodyUpdate, validateUserParams } from '../validators/users';

const router = Router();
router.get('/', getUsers);
// конкретный роут ДО параметрического
router.get('/me', getUserInfo);
router.get('/:userId', validateUserParams, getUserById);
// router.post('/', createUser);
router.patch('/me', validateUserBodyUpdate, updateUser);
router.patch('/me/avatar', validateAvatarBodyUpdate, updateAvatar);

export default router;
