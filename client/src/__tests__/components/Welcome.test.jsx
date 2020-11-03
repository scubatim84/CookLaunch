import React from 'react';
import { shallow } from 'enzyme';
import Welcome from '../../components/Welcome';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';

describe('Welcome', () => {
  it('Renders component without crashing', () => {
    shallow(<Welcome />);
  });

  it('Renders redirect component to login route if not logged in', () => {
    const wrapper = shallow(<Welcome />);

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('Renders loader component if there is no first name prop', () => {
    const wrapper = shallow(<Welcome isLoggedIn={true} />);

    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it('Renders welcome component if logged in and first name provided', () => {
    const wrapper = shallow(<Welcome isLoggedIn={true} firstName='Tim' />);

    expect(wrapper.find(Backdrop)).toHaveLength(1);
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(6);
    expect(wrapper.find(Typography)).toHaveLength(5);
    expect(wrapper.find('#FirstName').equals('Welcome Tim'));
  });
});
