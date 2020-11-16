import request from 'supertest';
import app from '../../server/app';

describe('Test IndexController', () => {
  it('Request / should return Hello!', async () => {
    const result = await request(app).get('/').send();

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('Hello!');
  });
});

/*
import request from 'supertest';
import app from '../../server/app';

describe('Test for passport', () => {
  let token: string = null;

  beforeEach(() => {
    request(app)
      .post('/tokens')
      .send({ email: 'admin@newcastle.com', password: 'admin' })
      .end((err, res) => {
        token = res.body.token;
      });
  });

  test('It should response the status of 400 from the POST method, /tokens, with wrong information', async () => {
    const response = await request(app)
      .post('/tokens')
      .send({ email: 'admin@newcastle.com', password: 'wrong password' });
    expect(response.status).toBe(400);
  });

  test('It should response the status of 200 from the POST method, /tokens, with correct information', async () => {
    const response = await request(app).post('/tokens').send({ email: 'admin@newcastle.com', password: 'admin' });
    expect(response.status).toBe(200);
  });

  test('It should response the status of 401 from the GET method, /ping, without token', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(401);
  });

  test('It should response the status 200 from the GET method, /ping, with token', async () => {
    const response = await request(app).get('/ping').auth(token, { type: 'bearer' });
    expect(token).not.toBe(null);
    expect(response.status).toBe(200);
  });
});
*/
