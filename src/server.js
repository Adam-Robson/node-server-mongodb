import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import connectDB from './config/db.js';
import users from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

connectDB();

// middleware
app.use(logger);
app.use(express.json()); // To parse JSON bodies

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', users);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
