import React from 'react';
import { shallow } from 'enzyme';
import IngredientText from '../../../components/Ingredients/IngredientText';

describe('IngredientText', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientText />);
  });

  it('Renders checked typography correctly', () => {
    const wrapper = shallow(<IngredientText checked />);

    expect(wrapper.find('#Checked')).toHaveLength(1);
  });

  it('Renders unchecked typography correctly', () => {
    const wrapper = shallow(<IngredientText />);

    expect(wrapper.find('#Unchecked')).toHaveLength(1);
  });
});
