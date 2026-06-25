import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import TextInput from './TextInput';

describe('TextInput', () => {
  it('input 을 렌더한다', () => {
    render(<TextInput placeholder="이메일" />);

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
  });

  it('invalid 면 aria-invalid 를 부여한다', () => {
    render(<TextInput invalid placeholder="이메일" />);

    expect(screen.getByPlaceholderText('이메일')).toHaveAttribute('aria-invalid', 'true');
  });

  it('prefix·suffix 슬롯을 렌더한다', () => {
    render(<TextInput prefix={<span>@</span>} suffix="원" placeholder="값" />);

    expect(screen.getByText('@')).toBeInTheDocument();
    expect(screen.getByText('원')).toBeInTheDocument();
  });

  it('disabled 면 비활성', () => {
    render(<TextInput disabled placeholder="이메일" />);

    expect(screen.getByPlaceholderText('이메일')).toBeDisabled();
  });

  it('ref 로 input 에 접근한다', () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextInput ref={ref} placeholder="이메일" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
