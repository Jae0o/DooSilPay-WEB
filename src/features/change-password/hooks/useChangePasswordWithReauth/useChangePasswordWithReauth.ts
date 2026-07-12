import { useMutation } from '@tanstack/react-query';

import { changePasswordWithReauth } from '../../api';

const useChangePasswordWithReauth = () => useMutation({ mutationFn: changePasswordWithReauth });

export default useChangePasswordWithReauth;
