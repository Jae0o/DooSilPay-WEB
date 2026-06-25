import { updatePassword } from 'firebase/auth';

import { auth } from '@shared/api';

export const changePassword = async (newPassword: string): Promise<void> => {
  const user = auth.currentUser;

  if (!user) throw new Error('NO_CURRENT_USER');

  await updatePassword(user, newPassword);
};
