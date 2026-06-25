import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { AcademyProfile, UpsertAcademyInput } from '../../model';
import { ACADEMY_KEY } from '../academy.keys';

export const upsertAcademy = async (input: UpsertAcademyInput): Promise<AcademyProfile> => {
  const res = await httpClient.put<APIResponse<AcademyProfile>>('/academy', input);

  return res.data.data;
};

const useUpsertAcademyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertAcademy,
    onSuccess: (data) => {
      queryClient.setQueryData(ACADEMY_KEY.me(), data);
    },
  });
};

export default useUpsertAcademyMutation;
