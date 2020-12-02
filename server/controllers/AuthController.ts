import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { comparePassword, hashPassword } from '../helpers/bcrypt';
import { signToken } from '../helpers/jwt';
import { v4 as uuidv4 } from 'uuid';
import RefreshToken from '../models/RefreshToken';

/**
 * Basic authentication controller
 */
export default class AuthController {
  /**
   * User sign up
   * @param req
   * @param res
   */
  static signUp = async (req: Request, res: Response): Promise<Response> => {
    //Get name, email, password
    const { firstname = '', lastname = '', username = '', email, password } = req.body;
    //Verify if user enter
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
      return res.status(500).json({ success: false, data: 'Enter a valid email address.' });
    } else if (password.length < 5 || password.length > 20) {
      return res.status(500).json({
        success: false,
        data: 'Password must be between 5 and 20 characters.',
      });
    }
    //Insert the user
    const userRepository = getRepository(User);
    try {
      //Hash password before inserting to database
      const hashedPassword = await hashPassword(password);
      await userRepository.save(new User(email, hashedPassword, firstname, lastname, username, null, null));
      res.status(201).json({
        message: 'Account created',
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

  /**
   * Log in for the user
   * @param req
   * @param res
   */
  static login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    // usually this would be a database call:
    const user = await getRepository(User).findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'no such user found' });
    }

    try {
      const isPasswordMatched = await comparePassword(password, user.password);
      if (isPasswordMatched) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        //const payload = {id: user.id};
        const token = signToken(user);
        delete user.password;
        delete user.googleId;
        delete user.facebookId;
        const refreshTokenModel = new RefreshToken();
        const refreshToken = uuidv4();
        refreshTokenModel.refreshToken = refreshToken;
        refreshTokenModel.user = user;
        await getRepository(RefreshToken).save(refreshTokenModel);
        return res
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
          })
          .json({ user, accessToken: token });
      } else {
        return res.status(401).json({ message: 'passwords did not match' });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  };

  static refresh = async (req: Request, res: Response): Promise<Response> => {
    const refreshToken = req.cookies.refreshToken;
    try {
      const refreshTokenModel = await getRepository(RefreshToken).findOne({
        where: {
          refreshToken,
        },
      });
      const user = refreshTokenModel.user;
      if (user) {
        const token = signToken(user);
        delete user.firstname;
        delete user.lastname;
        delete user.password;
        delete user.email;
        delete user.googleId;
        delete user.facebookId;
        return res.status(200).json({
          accessToken: token,
        });
      }
      return res.status(403).json({
        message: 'Cannot be accessed',
      });
    } catch (e) {
      res.status(500).json(e);
    }
  };
}
