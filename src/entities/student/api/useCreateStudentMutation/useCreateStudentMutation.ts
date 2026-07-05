import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { CreateStudentInput, Student } from '../../model';
import { STUDENT_KEY } from '../student.keys';

export const createStudent = async (input: CreateStudentInput): Promise<Student> => {
  const res = await httpClient.post<APIResponse<Student>>('/students', input);

  return res.data.data;
};

const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: STUDENT_KEY.lists() }),
  });
};

export default useCreateStudentMutation;
