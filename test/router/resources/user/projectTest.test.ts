import request from 'supertest';
import app from '../../../../server/app';

describe('Test user project route', () => {
  it('Request /api/user/projects should return status 401 if not logged in', async () => {
    const result = await request(app).get('/api/user/projects').send();
    expect(result.status).toBe(401);
  });
});