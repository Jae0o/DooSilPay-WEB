import { render, screen } from '@testing-library/react';

import FormField from './FormField';

describe('FormField', () => {
  it('label 과 children 을 렌더한다', () => {
    render(
      <FormField label="이메일">
        <input aria-label="email" />
      </FormField>,
    );

    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
  });

  it('required 면 * 를 표시한다', () => {
    render(
      <FormField label="이메일" required>
        <input />
      </FormField>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('error 가 있으면 hint 대신 error 를 보여준다', () => {
    render(
      <FormField hint="힌트" error="에러 메시지">
        <input />
      </FormField>,
    );

    expect(screen.getByText('에러 메시지')).toBeInTheDocument();
    expect(screen.queryByText('힌트')).not.toBeInTheDocument();
  });
});
