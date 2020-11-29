import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../configs/baseConfig';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const strategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://fast-island-78566.herokuapp.com/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      async function (accessToken, refreshToken, profile, cb) {
        const userRepository = getRepository(User);
        try {
          let user = await userRepository.findOne({
            where: {
              email: profile.emails[0].value,
            },
          });
          if (user != null) {
            user = await userRepository.save(user);
            user.googleId = profile.id;
            return cb(null, user);
          } else {
            user = new User(profile.emails[0].value, '', '', '', profile.username || '', profile.id, '');
            user = await userRepository.save(user);
            return cb(null, user);
          }
        } catch (e) {
          return cb(e, null);
        }
      }
    )
  );
};

export { strategy };
