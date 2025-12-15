import { Router } from 'express';
import { createUser, login } from '../controllers/auth';
import { validateUserBodyCreation, validateUserBodyLogin } from '../validators/auth';

const router = Router();

router.post('/signup', validateUserBodyCreation, createUser);
router.post('/signin', validateUserBodyLogin, login);

export default router;
