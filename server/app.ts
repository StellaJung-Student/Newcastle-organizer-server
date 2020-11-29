import express, { Express, json, urlencoded } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import AuthRouter from './router/auth/auth';
import GoogleAuthRouter from './router/auth/google';
import cors from 'cors';
import ProjectRouter from './router/resources/projects';
import UserProjectRouter from './router/resources/user/projects';
import TaskRouter from './router/resources/tasks';
import TagRouter from './router/resources/tags';
import ProjectListRouter from './router/resources/projectList';
import session from 'cookie-session';

const app: Express = express();

app.set('trust proxy', 1); // trust first proxy

app.use(
  session({
    name: 'session',
    keys: ['Hello', 'Holla'],
    secret: 'what the hell is this secret',
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    domain: 'vercel.app',
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 365),
  })
);

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://newcastle-organizer.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(passport.initialize());

/**
 * Dummy route
 */
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello!',
  });
});

app.use('/auth/google', GoogleAuthRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/projects', ProjectRouter);
app.use('/api/user/projects', UserProjectRouter);
app.use('/api', TaskRouter);
app.use('/api', ProjectListRouter);
app.use('/api', TagRouter);

app.use('*', (req, res) => {
  return res.status(404).send({ message: 'Nothing here!' });
});

export default app;
