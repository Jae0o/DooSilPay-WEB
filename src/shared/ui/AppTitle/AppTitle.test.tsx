import { render, screen } from '@testing-library/react';

import AppTitle from './AppTitle';

describe('AppTitle', () => {
  it('renders the DooSilPay heading', () => {
    render(<AppTitle />);

    expect(screen.getByRole('heading', { name: 'DooSilPay' })).toBeInTheDocument();
  });
});
