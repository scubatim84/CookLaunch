import request from 'supertest';
import app from '../../../server.js';
import User from '../../../models/User';

describe('POST /api/auth/register', () => {
  test('Responds with status code 400 and error if new user data not valid', async () => {
    const newUserMock = {
      firstName: 'test',
      lastName: 'runner',
      email: '',
      password: 'tester',
      password2: 'tester',
    };

    let res = await request(app).post('/api/auth/register').send(newUserMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Email field is required');
  });

  test('Responds with status code 201 and JSON of new user data if success', async () => {
    const newUserMock = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: 'tester',
      password2: 'tester',
    };

    let res = await request(app).post('/api/auth/register').send(newUserMock);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(newUserMock.email);
    expect(res.body.firstName).toBe(newUserMock.firstName);
    expect(res.body.lastName).toBe(newUserMock.lastName);
    expect(res.body.pantry).toBeDefined();
    expect(res.body.groceries).toBeDefined();
    expect(res.body._id).not.toBeNull();
    expect(res.body.date).not.toBeNull();
    expect(res.body.password).not.toBe(newUserMock.password);
  });

  test('Responds with status code 400 and error message if user already exists', async () => {
    const newUserMock = {
      firstName: 'test',
      lastName: 'runner',
      email: 'already@there.com',
      password: 'tester',
      password2: 'tester',
    };

    let res = await request(app).post('/api/auth/register').send(newUserMock);

    expect(res.statusCode).toBe(201);

    res = await request(app).post('/api/auth/register').send(newUserMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Email already exists');
  });
});

describe('POST /api/auth/login', () => {
  test('Responds with status code 400 and error if existing user data not valid', async () => {
    const existingUserMock = {
      email: 'testrunner@runner.com',
      password: '',
    };

    let res = await request(app).post('/api/auth/login').send(existingUserMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Password field is required');
  });

  test('Responds with status code 404 and error if user not found', async () => {
    const existingUserMock = {
      email: 'testrunner@dontexist.com',
      password: 'tester',
    };

    let res = await request(app).post('/api/auth/login').send(existingUserMock);

    expect(res.statusCode).toBe(404);
    expect(res.body).toBe('Email not found');
  });

  test('Responds with status code 400 and error if password incorrect', async () => {
    const newUserMock = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@tester.com',
      password: 'tester',
      password2: 'tester',
    };

    await request(app).post('/api/auth/register').send(newUserMock);

    const existingUserMock = {
      email: 'test@tester.com',
      password: 'badpassword',
    };

    let res = await request(app).post('/api/auth/login').send(existingUserMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Password incorrect');
  });

  test('Responds with status code 200 and token if successful', async () => {
    const newUserMock = {
      firstName: 'test',
      lastName: 'runner',
      email: 'tester@tester.com',
      password: 'tester',
      password2: 'tester',
    };

    await request(app).post('/api/auth/register').send(newUserMock);

    const existingUserMock = {
      email: 'tester@tester.com',
      password: 'tester',
    };

    let res = await request(app).post('/api/auth/login').send(existingUserMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('Bearer');
  });
});

afterAll(() => {
  User.collection.drop();
});
