import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { comparePassword, hashPassword } from '../helpers/bcrypt';
import { signToken } from '../helpers/jwt';

export default class AuthController {
  /**
   * User sign up
   * @param req
   * @param res
   */
  static signUp = async (req: Request, res: Response) => {
    //Get name, email, password
    const { name, email, password } = req.body;
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
      await userRepository.save(new User(name, email, hashedPassword, null, null));
      res.status(201).json({
        message: 'Account created',
      });
    } catch (e) {
      res.status(500).json(e);
    }
  };

  /**
   * Log in for the user
   * @param req
   * @param res
   */
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // usually this would be a database call:
    const user = await getRepository(User).findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'no such user found' });
    }

    try {
      const isPasswordMatched = await comparePassword(password, user.password);
      if (isPasswordMatched) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        //const payload = {id: user.id};
        const token = signToken(user);
        res.json({ message: 'ok', token: token });
      } else {
        res.status(401).json({ message: 'passwords did not match' });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  };
}
