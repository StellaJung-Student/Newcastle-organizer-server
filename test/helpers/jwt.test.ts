import request from 'supertest';
import app from '../../server/app';

describe('Test JWT helper function', () => {
  it('Request / should return Hello!', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Hello!');
  });
});
