import React from 'react';
import {shallow} from 'enzyme';
import CardTitle from './CardTitle';
import Typography from '@material-ui/core/Typography';

const wrapper = shallow(<CardTitle title='Test Title' />);

it('Renders component without crashing', () => {
  shallow(<CardTitle title='Test Title' />);
});

it('Renders title passed as prop to component', () => {
  expect(
    wrapper.equals(
      <Typography component='h1' variant='h5'>
        Test Title
      </Typography>
    )
  );
});
