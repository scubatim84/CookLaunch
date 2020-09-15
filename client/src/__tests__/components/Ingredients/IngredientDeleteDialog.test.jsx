import React from 'react';
import {shallow} from 'enzyme';
import IngredientDeleteDialog from '../../../components/Ingredients/IngredientDeleteDialog';

describe('IngredientDeleteDialog', () => {
  it('Renders component without crashing', () => {
    shallow(<IngredientDeleteDialog />);
  });
});
