import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

import { auth } from '@shared/api';

import type { ChangePasswordWithReauthInput } from '../../model';
import { changePassword } from '../changePassword';

export const changePasswordWithReauth = async ({
  currentPassword,
  newPassword,
}: ChangePasswordWithReauthInput): Promise<void> => {
  const user = auth.currentUser;

  if (!user?.email) throw new Error('NO_CURRENT_USER');

  // 설정 진입 세션은 auth_time이 오래됐을 수 있음 — 현재 비번으로 본인 확인(requires-recent-login 예방)
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));

  // 이후는 기존 로직 재사용 (updatePassword + validSince 갱신 workaround 포함)
  await changePassword(newPassword);
};
