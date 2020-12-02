import request from 'supertest';
import connection from '../../db/database';
import app from '../../../server/app';

beforeAll(async () => {
  await connection.create();
  await connection.clear();
});

afterAll(async () => {
  await connection.clear();
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe('Test authentication route', () => {
  it('Request /api/auth/signup should return status 201 if having email and password with length > 5', async () => {
    const result = await request(app).post('/api/auth/signup').send({
      email: 'test@gmail.com',
      password: 'test123',
    });
    expect(result.status).toBe(201);
  });

  it('Request /api/auth/signup should return status 500 if having email and password with length < 5', async () => {
    const result = await request(app).post('/api/auth/signup').send({
      email: 'test@gmail.com',
      password: 'test',
    });
    expect(result.status).toBe(500);
  });
});
