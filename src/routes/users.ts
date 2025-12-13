import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo
} from '../controllers/users';

const router = Router();
// router.post('/signin', login);
// router.post('/signup', createUser);
router.get('/', getUsers);
// конкретный роут ДО параметрического
router.get('/me', getUserInfo);
router.get('/:userId', getUserById);
// router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
