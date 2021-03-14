import chai from 'chai';
import validateLoginInput from '../../validation/login';

const { expect } = chai;

describe('Test validateLoginInput function', () => {
  it('Returns error and invalid if email empty', async () => {
    const mockData = {
      email: '',
      password: 'tester',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).to.equal('Email field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if password empty', async () => {
    const mockData = {
      email: 'test@runner.com',
      password: '',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).to.equal('Password field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if email is invalid', async () => {
    const mockData = {
      email: 'testrunner.com',
      password: 'tester',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).to.equal('Email is invalid');
    expect(res.isValid).to.equal(false);
  });

  it('Returns no error and valid if email and password not empty', async () => {
    const mockData = {
      email: 'test@runner.com',
      password: 'tester',
    };

    const res = await validateLoginInput(mockData);

    expect(res.error).to.have.lengthOf(0);
    expect(res.isValid).to.equal(true);
  });
});
