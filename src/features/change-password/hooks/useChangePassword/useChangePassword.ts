import { useMutation } from '@tanstack/react-query';

import { changePassword } from '../../api';

const useChangePassword = () =>
  useMutation({
    mutationFn: (newPassword: string) => changePassword(newPassword),
  });

export default useChangePassword;
