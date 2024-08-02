import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import connectToDatabase from '../config/connect.js';
import users from './routes/users.js';
import auth from './routes/auth.js';
import error from './middleware/error.js';
import limiter from './middleware/rate-limiter.js';
import items from './routes/items.js';
import lists from './routes/lists.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectToDatabase();

// middleware
app.use(logger);

// parse json request bodies
app.use(express.json());

// enable cross-origin-resource-sharing
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// rate limiting
app.use(limiter);

// static files
app.use(express.static(path.join(__dirname, '../../public')));

// routes
app.use('/api', users);
app.use('/api/auth', auth);
app.use('/api/items', items);
app.use('/api/lists', lists);

// error handler
app.use(error);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

export default app;

