import React from 'react';
import { render } from '@testing-library/react';

import FormSubmitMessage from '../../components/FormSubmitMessage';

describe('FormSubmitMessage', () => {
  it('Renders submit message passed as prop to component', () => {
    const { queryByText } = render(
      <FormSubmitMessage submitMessage='Test message' />
    );

    expect(queryByText('Test message')).toBeTruthy();
  });
});
