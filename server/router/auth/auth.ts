import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../../models/User';
import { comparePassword, hashPassword } from '../../helpers/bcrypt';
import passport from 'passport';
import { signToken } from '../../helpers/jwt';
import AuthController from '../../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/signup', AuthController.signUp);

AuthRouter.post('/login', AuthController.login);

AuthRouter.post('/refresh', AuthController.refresh);

export default AuthRouter;
