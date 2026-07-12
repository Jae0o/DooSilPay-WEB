import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FirebaseError } from 'firebase/app';

import ChangePasswordModal from './ChangePasswordModal';

const mutateSpy = vi.hoisted(() => vi.fn());

vi.mock('../../hooks', () => ({
  useChangePasswordWithReauth: () => ({ mutate: mutateSpy, isPending: false }),
}));

const setMatchMedia = () => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
};

const fill = async (user: ReturnType<typeof userEvent.setup>, current: string, next: string, confirm: string) => {
  await user.type(screen.getByPlaceholderText('현재 비밀번호'), current);
  await user.type(screen.getByPlaceholderText('새 비밀번호'), next);
  await user.type(screen.getByPlaceholderText('새 비밀번호 다시 입력'), confirm);
};

beforeEach(() => {
  setMatchMedia();
  mutateSpy.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ChangePasswordModal', () => {
  it('새 비밀번호가 8자 미만이면 필드 에러를 노출하고 변경을 요청하지 않는다', async () => {
    const user = userEvent.setup();
    render(<ChangePasswordModal open onClose={vi.fn()} />);

    await fill(user, 'current123', '123', '123');
    await user.click(screen.getByRole('button', { name: '변경하기' }));

    expect(await screen.findByText('비밀번호는 8자 이상이어야 해요.')).toBeInTheDocument();
    expect(mutateSpy).not.toHaveBeenCalled();
  });

  it('새 비밀번호 확인이 불일치하면 필드 에러를 노출하고 변경을 요청하지 않는다', async () => {
    const user = userEvent.setup();
    render(<ChangePasswordModal open onClose={vi.fn()} />);

    await fill(user, 'current123', 'newpass123', 'different1');
    await user.click(screen.getByRole('button', { name: '변경하기' }));

    expect(await screen.findByText('비밀번호가 일치하지 않아요.')).toBeInTheDocument();
    expect(mutateSpy).not.toHaveBeenCalled();
  });

  it('wrong-password 실패 시 현재 비밀번호 오류 배너를 노출한다', async () => {
    mutateSpy.mockImplementation((_input, { onError }) => onError(new FirebaseError('auth/wrong-password', '')));
    const user = userEvent.setup();
    render(<ChangePasswordModal open onClose={vi.fn()} />);

    await fill(user, 'wrong-pw', 'newpass123', 'newpass123');
    await user.click(screen.getByRole('button', { name: '변경하기' }));

    expect(mutateSpy).toHaveBeenCalledWith(
      { currentPassword: 'wrong-pw', newPassword: 'newpass123' },
      expect.any(Object),
    );
    expect(await screen.findByText('현재 비밀번호가 올바르지 않아요.')).toBeInTheDocument();
  });
});
