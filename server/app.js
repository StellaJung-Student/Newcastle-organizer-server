const express = require('express');

const app = express();

/**
 * Dummy route
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Hello',
  });
});

module.exports = app;
