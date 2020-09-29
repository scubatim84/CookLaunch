import React from 'react';
import { shallow } from 'enzyme';
import ImageController from '../../components/ImageController';

describe('ImageController', () => {
  it('Renders component without crashing', () => {
    shallow(<ImageController />);
  });
});
