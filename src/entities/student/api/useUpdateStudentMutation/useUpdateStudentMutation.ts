import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { Student, UpdateStudentInput } from '../../model';
import { STUDENT_KEY } from '../student.keys';

export const updateStudent = async ({ id, input }: { id: string; input: UpdateStudentInput }): Promise<Student> => {
  const res = await httpClient.put<APIResponse<Student>>(`/students/${id}`, input);

  return res.data.data;
};

const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: (data) => {
      queryClient.setQueryData(STUDENT_KEY.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: STUDENT_KEY.lists() });
    },
  });
};

export default useUpdateStudentMutation;
