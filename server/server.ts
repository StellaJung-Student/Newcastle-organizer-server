import 'dotenv/config';
import './security/passport';
import app from './app';
import { createConnection } from 'typeorm';

import { PORT } from './configs/baseConfig';

createConnection(/*...*/)
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
