import request from 'supertest';
import app from '../../../server/app';

describe('Test Public project router will render public project', () => {
  it('Request /api/projects should return public project', async () => {
    const result = await request(app).get('/api/projects').send();
    expect(result.status).toBe(200);
  });
});
