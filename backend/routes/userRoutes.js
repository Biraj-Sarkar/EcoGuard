import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/userController.js';
import { validateRegister, validateLogin } from '../middleware/validate.js';

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
