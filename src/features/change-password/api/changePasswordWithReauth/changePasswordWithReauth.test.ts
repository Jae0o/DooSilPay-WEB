import { beforeEach, describe, expect, it, vi } from 'vitest';

import { auth } from '@shared/api';

import { changePasswordWithReauth } from './changePasswordWithReauth';

const { reauthSpy, changePasswordSpy, credentialSpy } = vi.hoisted(() => ({
  reauthSpy: vi.fn(),
  changePasswordSpy: vi.fn(),
  credentialSpy: vi.fn((email: string, password: string) => ({ email, password })),
}));

vi.mock('firebase/auth', () => ({
  EmailAuthProvider: { credential: credentialSpy },
  reauthenticateWithCredential: reauthSpy,
}));
vi.mock('@shared/api', () => ({ auth: { currentUser: null } }));
vi.mock('../changePassword', () => ({ changePassword: changePasswordSpy }));

const mockedAuth = auth as unknown as { currentUser: { email: string | null } | null };

describe('changePasswordWithReauth', () => {
  beforeEach(() => {
    reauthSpy.mockReset().mockResolvedValue(undefined);
    changePasswordSpy.mockReset().mockResolvedValue(undefined);
    credentialSpy.mockClear();
    mockedAuth.currentUser = { email: 'owner@doopay.kr' };
  });

  it('현재 비번으로 재인증한 뒤 changePassword를 순서대로 호출한다', async () => {
    await changePasswordWithReauth({ currentPassword: 'old-pw', newPassword: 'new-pw-1234' });

    expect(credentialSpy).toHaveBeenCalledWith('owner@doopay.kr', 'old-pw');
    expect(reauthSpy).toHaveBeenCalledWith(mockedAuth.currentUser, { email: 'owner@doopay.kr', password: 'old-pw' });
    expect(changePasswordSpy).toHaveBeenCalledWith('new-pw-1234');
    // 재인증 → 변경 순서 보장
    expect(reauthSpy.mock.invocationCallOrder[0]).toBeLessThan(changePasswordSpy.mock.invocationCallOrder[0]);
  });

  it('로그인 사용자가 없으면 NO_CURRENT_USER를 던지고 아무것도 호출하지 않는다', async () => {
    mockedAuth.currentUser = null;

    await expect(changePasswordWithReauth({ currentPassword: 'old-pw', newPassword: 'new-pw-1234' })).rejects.toThrow(
      'NO_CURRENT_USER',
    );
    expect(reauthSpy).not.toHaveBeenCalled();
    expect(changePasswordSpy).not.toHaveBeenCalled();
  });

  it('재인증 실패 시 에러를 전파하고 changePassword를 호출하지 않는다', async () => {
    reauthSpy.mockRejectedValue(new Error('auth/wrong-password'));

    await expect(changePasswordWithReauth({ currentPassword: 'wrong', newPassword: 'new-pw-1234' })).rejects.toThrow(
      'auth/wrong-password',
    );
    expect(changePasswordSpy).not.toHaveBeenCalled();
  });
});
