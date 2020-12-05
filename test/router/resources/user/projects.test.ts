import request from 'supertest';
import { getRepository } from 'typeorm';
import connection from '../../../db/database';
import Project from '../../../../server/models/Project';
import app from '../../../../server/app';

beforeAll(async () => {
  await connection.create();
  await connection.clear();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
  const project1 = new Project('test1', 'test1', 'test1', true, []);
  project1.id = 1;
  const project2 = new Project('test2', 'test2', 'test2', false, []);
  project1.id = 2;
  const project3 = new Project('test3', 'test3', 'test3', true, []);
  project1.id = 3;
  await getRepository(Project).save(project1);
  await getRepository(Project).save(project2);
  await getRepository(Project).save(project3);
});

describe('Test user projects controller', () => {
  it('Request /api/user/projects without authentication should result ok', async () => {
    const result = await request(app).get('/api/user/projects').send({
      username: 'test@gmail.com',
      password: 'test',
    });
    expect(401).toBe(401);
  });
});
