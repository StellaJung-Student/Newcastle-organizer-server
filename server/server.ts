import 'dotenv/config';
import app from './app';

const { PORT } = require('../configs/baseConfig');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
