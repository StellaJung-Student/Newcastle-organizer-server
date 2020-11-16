import express, { Express } from 'express';

const app: Express = express();

/**
 * Dummy route
 */
app.get('/', (req, res) => {
  res.status(200).send({
    data: 'Hello!',
  });
});

export default app;
