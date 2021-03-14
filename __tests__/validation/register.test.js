import chai from 'chai';
import validateRegisterInput from '../../validation/register';

const { expect } = chai;

describe('Test validateRegisterInput function', () => {
  it('Returns error and invalid if first name empty', async () => {
    const mockData = {
      firstName: '',
      lastName: 'runner',
      email: 'test@testrunner.com',
      password: 'tester',
      password2: 'tester',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('First name field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if last name empty', async () => {
    const mockData = {
      firstName: 'test',
      lastName: '',
      email: 'test@testrunner.com',
      password: 'tester',
      password2: 'tester',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Last name field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if e-mail empty', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: '',
      password: 'tester',
      password2: 'tester',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Email field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if e-mail invalid', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'testrunner.com',
      password: 'tester',
      password2: 'tester',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Email is invalid');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if password empty', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: '',
      password2: 'tester',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Password field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if confirm password empty', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: 'tester',
      password2: '',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Confirm password field is required');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if password less than 6 characters', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: 'testr',
      password2: 'testr',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Password must be 6 to 30 characters long');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if password more than 30 characters', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: 'testertestertestertestertestert',
      password2: 'testertestertestertestertestert',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Password must be 6 to 30 characters long');
    expect(res.isValid).to.equal(false);
  });

  it('Returns error and invalid if password and confirm password do not match', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: 'tester',
      password2: 'runner',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.equal('Passwords must match');
    expect(res.isValid).to.equal(false);
  });

  it('Returns no error and valid if all data is present and valid', async () => {
    const mockData = {
      firstName: 'test',
      lastName: 'runner',
      email: 'test@runner.com',
      password: 'tester',
      password2: 'tester',
    };

    const res = await validateRegisterInput(mockData);

    expect(res.error).to.have.lengthOf(0);
    expect(res.isValid).to.equal(true);
  });
});
