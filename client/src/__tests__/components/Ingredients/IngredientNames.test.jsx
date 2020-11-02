import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import IngredientNames from '../../../components/Ingredients/IngredientNames';

describe('IngredientNames renders correctly', () => {
  it('Redirects user to login component if not logged in', () => {
    render(
      <Router>
        <IngredientNames />
      </Router>
    );
  });

  it('Renders loader if no id is passed as a prop', async () => {
    const { queryByTestId } = render(<IngredientNames isLoggedIn />);

    expect(queryByTestId('loader')).toBeTruthy();
  });
});
