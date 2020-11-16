import express, { Express, urlencoded, json } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { isCorrectToken } from './helpers/jwt';
import AuthRouter from './router/auth/auth';
import GoogleAuthRouter from './router/auth/google';

const app: Express = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use(passport.initialize());

/**
 * Dummy route
 */
app.get('/', isCorrectToken, (req, res) => {
  res.status(200).send({
    data: 'Hello!',
  });
});

app.use(GoogleAuthRouter);
app.use('/auth', AuthRouter);

export default app;
