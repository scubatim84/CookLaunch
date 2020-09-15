import React from 'react';
import {shallow} from 'enzyme';
import CardTitle from '../../components/CardTitle';

describe('CardTitle', () => {
  it('Renders component without crashing', () => {
    shallow(<CardTitle title='Test Title' />);
  });

  it('Renders title passed as prop to component', () => {
    const wrapper = shallow(<CardTitle title='Test Title' />);

    expect(wrapper.find('#Title').equals('Test Title'));
  });
});
