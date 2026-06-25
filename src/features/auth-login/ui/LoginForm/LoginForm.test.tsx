import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('이메일·비밀번호 필드와 로그인 버튼, 기본 체크된 상태 유지 체크박스를 렌더한다', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText('name@academy.kr')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: '로그인 상태 유지' })).toBeChecked();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('빈 값으로 제출하면 이메일·비밀번호 필수 에러를 노출한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(await screen.findByText('이메일을 입력해 주세요.')).toBeInTheDocument();
    expect(screen.getByText('비밀번호를 입력해 주세요.')).toBeInTheDocument();
  });

  it('이메일 형식이 올바르지 않으면 형식 에러를 노출한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('name@academy.kr'), 'name');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    expect(await screen.findByText('이메일 형식이 올바르지 않아요.')).toBeInTheDocument();
  });
});
