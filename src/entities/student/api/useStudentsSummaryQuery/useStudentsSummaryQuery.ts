import { useSuspenseQuery } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';

import type { StudentsSummary } from '../../model';
import { STUDENT_KEY } from '../student.keys';

export const getStudentsSummary = async (period: string): Promise<StudentsSummary> => {
  const res = await httpClient.get<APIResponse<StudentsSummary>>('/students/summary', { params: { period } });

  return res.data.data;
};

const useStudentsSummaryQuery = (period: string) =>
  useSuspenseQuery({
    queryKey: STUDENT_KEY.summary(period),
    queryFn: () => getStudentsSummary(period),
  });

export default useStudentsSummaryQuery;
