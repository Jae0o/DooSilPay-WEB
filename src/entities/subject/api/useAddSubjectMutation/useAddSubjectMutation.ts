import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import { SUBJECT_KEY } from '../subject.keys';

export const addSubject = async (name: string): Promise<string[]> => {
  const res = await httpClient.post<APIResponse<string[]>>('/subjects', { name });

  return res.data.data;
};

const useAddSubjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSubject,
    onSuccess: (data) => {
      queryClient.setQueryData(SUBJECT_KEY.list(), data);
    },
  });
};

export default useAddSubjectMutation;
