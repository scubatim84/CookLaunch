import React from 'react';
import { render } from '@testing-library/react';

import ProfileFieldContent from '../../../components/Profile/ProfileFieldContent';

describe('ProfileFieldContent', () => {
  it('Renders component when in edit mode', () => {
    const { queryByTestId } = render(<ProfileFieldContent editMode />);

    expect(queryByTestId('edit-undefined')).toBeTruthy();
  });

  it('Renders component when not in edit mode', () => {
    const { queryByText } = render(
      <ProfileFieldContent content='Test content' />
    );

    expect(queryByText('Test content')).toBeTruthy();
  });
});
