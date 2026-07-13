import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import { SUBJECT_KEY } from '../subject.keys';

export const removeSubject = async (name: string): Promise<string[]> => {
  const res = await httpClient.delete<APIResponse<string[]>>(`/subjects/${encodeURIComponent(name)}`);

  return res.data.data;
};

const useRemoveSubjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSubject,
    onSuccess: (data) => {
      queryClient.setQueryData(SUBJECT_KEY.list(), data);
    },
  });
};

export default useRemoveSubjectMutation;
