const express = require('express');
const logger = require('./lib/middleware/logger');
const path = require('path');

const app = express();
const port = 3000;

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
