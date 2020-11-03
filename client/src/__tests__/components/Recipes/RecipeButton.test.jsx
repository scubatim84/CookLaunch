import React from 'react';
import { render } from '@testing-library/react';

import RecipeButton from '../../../components/Recipes/RecipeButton';

describe('RecipeButton', () => {
  it('Renders edit mode of component', () => {
    const { queryByTestId } = render(<RecipeButton editMode />);

    expect(queryByTestId('submit-button')).toBeTruthy();
    expect(queryByTestId('cancel-button')).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeNull();
  });

  it('Renders non-edit mode of component', () => {
    const { queryByTestId } = render(<RecipeButton />);

    expect(queryByTestId('submit-button')).toBeNull();
    expect(queryByTestId('cancel-button')).toBeNull();
    expect(queryByTestId('edit-button')).toBeTruthy();
  });
});
