import express from 'express';
import {validateSingupCredentials} from '../middlewares/validate';
import User from '../controllers/User';

const router = express.Router();

router.post('/auth/signup', validateSingupCredentials, User.signUp);

export default router;
