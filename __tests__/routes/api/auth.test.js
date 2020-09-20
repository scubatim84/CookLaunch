import request from 'supertest';
import app from '../../../server.js';

describe('POST /api/auth/login', () => {
  test('Responds with token if successful, status code 400 if not', async () => {
    const existingUserMock = {
      email: 'testrunner@runner.com',
      password: '',
    };

    let res = await request(app).post('/api/auth/login').send(existingUserMock);

    expect(res.statusCode).toBe(400);

    existingUserMock.password = 'tester';

    res = await request(app).post('/api/auth/login').send(existingUserMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('Bearer');
  });
});
