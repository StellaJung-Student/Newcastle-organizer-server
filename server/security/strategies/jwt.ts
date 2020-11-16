import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { JWT_SECRET } from '../../configs/baseConfig';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const strategy = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      function (jwt_payload, next) {
        const userRepository = getRepository(User);
        console.log('payload received', jwt_payload);
        // usually this would be a database call:
        const user = userRepository.findOne({
          where: {
            id: jwt_payload.id,
          },
        });
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      }
    )
  );
};

export { strategy };
