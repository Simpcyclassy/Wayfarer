import express from 'express';
import { validateSigninCredentials, validateSignupCredentials } from '../middlewares/validate';
import User from '../controllers/User';

const router = express.Router();

router.post('/auth/signup', validateSignupCredentials, User.signUp);

router.post('/auth/signup', validateSigninCredentials, User.signUp);

export default router;
