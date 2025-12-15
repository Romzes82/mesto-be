import { Router } from 'express';
import { createUser, login, logout } from '../controllers/auth';
import { validateUserBodyCreation } from '../validators/auth';

const router = Router();

router.post('/signup', validateUserBodyCreation, createUser);
router.post('/signin', login);
router.post('/logout', logout);

export default router;
