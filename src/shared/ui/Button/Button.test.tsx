import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('children 을 렌더한다', () => {
    render(<Button>로그인</Button>);

    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('isLoading 이면 disabled + aria-busy', () => {
    render(<Button isLoading>로그인</Button>);

    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });

  it('disabled 면 비활성', () => {
    render(<Button disabled>로그인</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
