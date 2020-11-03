import React from 'react';
import { render } from '@testing-library/react';

import CardTitle from '../../components/CardTitle';

describe('CardTitle', () => {
  it('Renders component without crashing', () => {
    render(<CardTitle title='Test Title' />);
  });

  it('Renders title passed as prop to component', () => {
    const { queryByText } = render(<CardTitle title='Test Title' />);

    expect(queryByText('Test Title')).toBeTruthy();
  });
});
