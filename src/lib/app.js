import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import connectDatabase from '../../config/database.js';
import users from './routes/users.js';
import auth from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDatabase();

// middleware
app.use(logger);

// parse json request bodies
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', users);
app.use('/api/auth', auth);
app.use('/api/items', items);
app.use('/api/lists', lists);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;

