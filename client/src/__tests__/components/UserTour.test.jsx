import React from 'react';
import { render } from '@testing-library/react';

import UserTour from '../../components/UserTour';

describe('UserTour', () => {
  const handleLoggedIn = jest.fn();

  it('Renders loader if component has not yet logged tour user in', () => {
    const { queryByTestId } = render(
      <UserTour handleLoggedIn={handleLoggedIn} isLoggedIn={false} />
    );

    expect(queryByTestId('loader')).toBeTruthy();
  });
});
