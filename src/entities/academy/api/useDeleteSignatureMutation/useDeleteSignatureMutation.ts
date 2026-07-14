import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { AcademyProfile } from '../../model';
import { ACADEMY_KEY } from '../academy.keys';

export const deleteSignature = async (): Promise<AcademyProfile> => {
  const res = await httpClient.delete<APIResponse<AcademyProfile>>('/academy/signature');

  return res.data.data;
};

const useDeleteSignatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSignature,
    onSuccess: (data) => {
      queryClient.setQueryData(ACADEMY_KEY.me(), data);
    },
  });
};

export default useDeleteSignatureMutation;
