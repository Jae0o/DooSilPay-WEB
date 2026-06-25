import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

import { auth } from '@shared/api';

export const changePassword = async (newPassword: string): Promise<void> => {
  const user = auth.currentUser;

  if (!user?.email) throw new Error('NO_CURRENT_USER');

  await updatePassword(user, newPassword);

  // 비번 변경은 validSince를 점프시켜 기존 세션을 폐기 판정한다. getIdToken(true)만으로는
  // auth_time이 갱신되지 않아(에뮬레이터는 verifyIdToken에서 폐기검사 강제) 여전히 폐기로 막힌다.
  // 새 비밀번호로 재인증해 auth_time이 갱신된 토큰을 받은 뒤 강제 갱신한다.
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, newPassword));
  await user.getIdToken(true);
};
