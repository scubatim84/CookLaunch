//TODO: Replace Jest with Mocha so server tests do not conflict with CRA Jest
// import validateLoginInput from '../../validation/login.js';

// describe('Test validateLoginInput function', () => {
//   test('Returns error and invalid if email empty', async () => {
//     const mockData = {
//       email: '',
//       password: 'tester',
//     };

//     const res = await validateLoginInput(mockData);

//     expect(res.error).toBe('Email field is required');
//     expect(res.isValid).toBe(false);
//   });

//   test('Returns error and invalid if password empty', async () => {
//     const mockData = {
//       email: 'test@runner.com',
//       password: '',
//     };

//     const res = await validateLoginInput(mockData);

//     expect(res.error).toBe('Password field is required');
//     expect(res.isValid).toBe(false);
//   });

//   test('Returns error and invalid if email is invalid', async () => {
//     const mockData = {
//       email: 'testrunner.com',
//       password: 'tester',
//     };

//     const res = await validateLoginInput(mockData);

//     expect(res.error).toBe('Email is invalid');
//     expect(res.isValid).toBe(false);
//   });

//   test('Returns no error and valid if email and password not empty', async () => {
//     const mockData = {
//       email: 'test@runner.com',
//       password: 'tester',
//     };

//     const res = await validateLoginInput(mockData);

//     expect(res.error).toHaveLength(0);
//     expect(res.isValid).toBe(true);
//   });
// });
