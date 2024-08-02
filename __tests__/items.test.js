import request from 'supertest';
import app from '../src/server.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(
    process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Items Routes', () => {
  let token = '';

  beforeAll(async () => {
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    token = registerResponse.body.token;
  });

  test('should create a new item', async () => {
    const response = await request(app)
      .post('/api/items')
      .set('x-auth-token', token)
      .send({
        list: 'list_id_here',
        name: 'Test Item'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Test Item');
  });

  test('should get all items', async () => {
    const response = await request(app)
      .get('/api/items')
      .set('x-auth-token', token);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
