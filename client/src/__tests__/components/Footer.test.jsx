import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../../components/Footer';

describe('Footer', () => {
  it('Renders component without crashing', () => {
    render(<Footer />);
  });
});
