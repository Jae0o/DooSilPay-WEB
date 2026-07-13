import { useSuspenseQuery } from '@tanstack/react-query';

import type { APIResponse } from '@shared/api';
import { httpClient } from '@shared/api';
import { MINUTE } from '@shared/config';

import { SUBJECT_KEY } from '../subject.keys';

export const getSubjects = async (): Promise<string[]> => {
  const res = await httpClient.get<APIResponse<string[]>>('/subjects');

  return res.data.data;
};

const useSubjectsQuery = () =>
  useSuspenseQuery({
    queryKey: SUBJECT_KEY.list(),
    queryFn: getSubjects,
    staleTime: 5 * MINUTE,
  });

export default useSubjectsQuery;
