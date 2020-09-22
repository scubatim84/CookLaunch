import request from 'supertest';
import app from './server';

const getTestUserToken = async () => {
  // Create new user and register user
  const newUserMock = {
    firstName: 'test',
    lastName: 'runner',
    email: 'testuser@testuser.com',
    password: 'tester',
    password2: 'tester',
  };

  await request(app).post('/api/auth/register').send(newUserMock);

  // Log in user and obtain token to store in headers for use in tests
  const loginCredentials = {
    email: newUserMock.email,
    password: newUserMock.password,
  };

  const res = await request(app).post('/api/auth/login').send(loginCredentials);

  // Return token from body of login request
  return res.body;
};

export default getTestUserToken;
