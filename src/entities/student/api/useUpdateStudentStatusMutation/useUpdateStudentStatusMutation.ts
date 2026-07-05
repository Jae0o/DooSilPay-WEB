import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { Student, StudentStatus } from '../../model';
import { STUDENT_KEY } from '../student.keys';

export const updateStudentStatus = async ({ id, status }: { id: string; status: StudentStatus }): Promise<Student> => {
  const res = await httpClient.patch<APIResponse<Student>>(`/students/${id}/status`, { status });

  return res.data.data;
};

const useUpdateStudentStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentStatus,
    onSuccess: (data) => {
      queryClient.setQueryData(STUDENT_KEY.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.lists() });
    },
  });
};

export default useUpdateStudentStatusMutation;
