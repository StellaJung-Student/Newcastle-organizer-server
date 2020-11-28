import { Router } from 'express';
import passport from 'passport';
import User from '../../models/User';
import { signToken } from '../../helpers/jwt';

const googleAuthRouter = Router();

googleAuthRouter.get(
  '',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);

googleAuthRouter.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const user: User = req.user as User;
  return res
    .status(200)
    .cookie('jwt', signToken(user), {
      httpOnly: true,
    })
    .redirect('/');
});

googleAuthRouter.get('/logout', async (req, res) => {
  try {
    req.logOut();
    res.status(204);
  } catch (e) {
    res.status(500).json(e);
  }
});

export default googleAuthRouter;
