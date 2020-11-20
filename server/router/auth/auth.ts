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

//TODO: Testing purpose, delete later
AuthRouter.get('/secret', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json('Success! You can not see this without a token');
});

export default AuthRouter;
