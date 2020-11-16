import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../../models/User';
import { comparePassword, hashPassword } from '../../helpers/bcrypt';
import passport from 'passport';
import { signToken } from '../../helpers/jwt';

const AuthRouter = Router();

AuthRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res.status(500).json({ success: false, data: 'Enter a valid email address.' });
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).json({
      success: false,
      data: 'Password must be between 5 and 20 characters.',
    });
  }

  const userRepository = getRepository(User);
  try {
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.save(new User(name, email, hashedPassword, null, null));
    res.status(201).json({
      message: 'Account created',
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

AuthRouter.post('/login', async function (req, res) {
  const { email, password } = req.body;

  // usually this would be a database call:
  const user = await getRepository(User).findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'no such user found' });
  }

  if (await comparePassword(password, user.password)) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    //const payload = {id: user.id};
    const token = signToken(user);
    res.json({ message: 'ok', token: token });
  } else {
    res.status(401).json({ message: 'passwords did not match' });
  }
});

AuthRouter.get('/secret', passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json('Success! You can not see this without a token');
});

export default AuthRouter;
