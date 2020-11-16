import request from 'supertest';
import app from '../../server/app';

describe('Test IndexController', () => {
  it('Request / should return Hello!', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('Hello!');
  });
});
