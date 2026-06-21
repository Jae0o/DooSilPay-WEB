import { render, screen } from '@testing-library/react';

import DooPayLogo from './DooPayLogo';

describe('DooPayLogo', () => {
  it('마크와 DooPay 워드마크를 렌더한다', () => {
    render(<DooPayLogo />);

    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('Doo')).toBeInTheDocument();
    expect(screen.getByText('Pay')).toBeInTheDocument();
  });

  it('withText=false면 워드마크를 숨기고 마크만 남긴다', () => {
    render(<DooPayLogo withText={false} />);

    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.queryByText('Pay')).not.toBeInTheDocument();
  });

  it('variant=onBrand면 텍스트를 흰색으로 표시한다', () => {
    render(<DooPayLogo variant="onBrand" />);

    expect(screen.getByText('Doo')).toHaveClass('text-white');
  });
});
