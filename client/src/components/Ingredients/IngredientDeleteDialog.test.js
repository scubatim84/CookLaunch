import React from 'react';
import {shallow} from 'enzyme';
import IngredientDeleteDialog from './IngredientDeleteDialog';

it('Renders component without crashing', () => {
  shallow(<IngredientDeleteDialog />);
});
