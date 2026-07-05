import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import { STUDENT_KEY } from '../student.keys';

export const deleteStudent = async (id: string): Promise<{ id: string }> => {
  const res = await httpClient.delete<APIResponse<{ id: string }>>(`/students/${id}`);

  return res.data.data;
};

const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: STUDENT_KEY.lists() }),
  });
};

export default useDeleteStudentMutation;
