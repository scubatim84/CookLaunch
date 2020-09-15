import React from 'react';
import {shallow} from 'enzyme';
import ResetPasswordByEmailForm from '../../../components/Auth/ResetPasswordByEmailForm';

// Create mock of useParams to pass in token to component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    token: 'test',
  }),
  useRouteMatch: () => ({url: '/reset/:token'}),
}));

describe('ResetPasswordByEmailForm', () => {
  it('Renders component without crashing', () => {
    shallow(<ResetPasswordByEmailForm />);
  });
});
