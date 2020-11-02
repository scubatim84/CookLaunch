import React from 'react';
import { render } from '@testing-library/react';

import ProfileFieldLabel from '../../../components/Profile/ProfileFieldLabel';

describe('ProfileFieldLabel', () => {
  it('Renders title passed as prop to component', () => {
    const { queryByText } = render(<ProfileFieldLabel label='Test label' />);

    expect(queryByText('Test label')).toBeTruthy();
  });
});
