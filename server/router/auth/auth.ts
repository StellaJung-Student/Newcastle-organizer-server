import { Router } from 'express';
import AuthController from '../../controllers/AuthController';

const AuthRouter = Router();

AuthRouter.post('/signup', AuthController.signUp);

AuthRouter.post('/login', AuthController.login);

AuthRouter.post('/refresh', AuthController.refresh);

export default AuthRouter;
