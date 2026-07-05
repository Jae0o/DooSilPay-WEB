import { useSuspenseQuery } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';
import { MINUTE } from '@shared/config';

import type { Student } from '../../model';
import { STUDENT_KEY } from '../student.keys';

export const getStudent = async (id: string): Promise<Student> => {
  const res = await httpClient.get<APIResponse<Student>>(`/students/${id}`);

  return res.data.data;
};

const useStudentQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: STUDENT_KEY.detail(id),
    queryFn: () => getStudent(id),
    staleTime: MINUTE,
  });

export default useStudentQuery;
