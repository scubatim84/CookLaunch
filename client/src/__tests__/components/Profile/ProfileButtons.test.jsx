import React from 'react';
import { render, screen } from '@testing-library/react';

import ProfileButtons from '../../../components/Profile/ProfileButtons';

describe('ProfileButtons', () => {
  it('Renders component when in edit mode', () => {
    const { queryByTestId } = render(<ProfileButtons editMode />);

    expect(queryByTestId('save-button')).toBeTruthy();
    expect(queryByTestId('cancel-button')).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeNull();
  });

  it('Renders component when not in edit mode', () => {
    const { queryByTestId } = render(<ProfileButtons />);

    expect(queryByTestId('edit-button')).toBeTruthy();
    expect(queryByTestId('save-button')).toBeNull();
    expect(queryByTestId('cancel-button')).toBeNull();
  });
});
