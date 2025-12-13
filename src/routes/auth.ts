import { Router } from 'express';
import { createUser, login, logout } from '../controllers/auth';

const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);
router.post('/logout', logout);

// router.get('/', getUsers);
// router.get('/:userId', getUserById);
// router.post('/', createUser);
// router.patch('/me', updateUser);
// router.patch('/me/avatar', updateAvatar);

export default router;