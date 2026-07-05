import { useSuspenseQuery } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { ListStudentsParams, ListStudentsResult } from '../../model';
import { STUDENT_KEY } from '../student.keys';

export const getStudents = async (params: ListStudentsParams): Promise<ListStudentsResult> => {
  const res = await httpClient.get<APIResponse<ListStudentsResult>>('/students', { params });

  return res.data.data;
};

const useStudentsQuery = (params: ListStudentsParams = {}) =>
  useSuspenseQuery({
    queryKey: STUDENT_KEY.list(params),
    queryFn: () => getStudents(params),
  });

export default useStudentsQuery;
