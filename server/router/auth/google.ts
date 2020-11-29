import { Router } from 'express';
import passport from 'passport';
import User from '../../models/User';
import { signToken } from '../../helpers/jwt';
import RefreshToken from '../../models/RefreshToken';
import { v4 as uuid4 } from 'uuid';

const googleAuthRouter = Router();

googleAuthRouter.get(
  '',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  })
);

googleAuthRouter.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const user: User = req.user as User;
  const token = signToken(user);
  delete user.firstname;
  delete user.lastname;
  delete user.password;
  delete user.email;
  delete user.googleId;
  delete user.facebookId;
  const refreshTokenModel = new RefreshToken();
  const refreshToken = uuid4();
  refreshTokenModel.refreshToken = refreshToken;
  refreshTokenModel.user = user;
  return res
    .status(200)
    .cookie('accessToken', token, {
      //httpOnly: true,
    })
    .cookie('user', user, {
      //httpOnly: true,
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
    })
    .redirect('https://newcastle-organizer.vercel.app/projects');
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
