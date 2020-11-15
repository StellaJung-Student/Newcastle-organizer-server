//DotENV
require('dotenv').config();
const app = require('./app')
//Port (normally 8080)
const {PORT} = require("../configs/baseConfig");

//Start server
app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});