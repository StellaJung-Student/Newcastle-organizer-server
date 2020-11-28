import request from 'supertest';
import app from '../server/app';

describe('Test IndexController', () => {
  it('Request / should return Hello!', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Hello!');
  });

  it('Request /whatEverRoute should return 404!', async () => {
    const result = await request(app).get('/whatEverRoute').send();

    expect(result.status).toBe(404);
    console.log(result.body);
    expect(result.body.message).toBe('Nothing here!');
  });
});
