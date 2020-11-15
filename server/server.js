require('dotenv').config();
const app = require('./app');

const { PORT } = require('../configs/baseConfig');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
