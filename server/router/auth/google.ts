import { Router } from 'express';
import passport from 'passport';
import User from '../../models/User';
import { signToken } from '../../helpers/jwt';

const googleAuthRouter = Router();

googleAuthRouter.get(
  `/auth/google`,
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);

googleAuthRouter.get(
  `/auth/google/callback`,
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const user: User = req.user as User;
    return res.status(200).json({ accessToken: signToken(user) });
    //.redirect('/');
  }
);

googleAuthRouter.get('/auth/google/logout', async (req, res, next) => {
  try {
    req.logOut();
    res.status(204);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default googleAuthRouter;
