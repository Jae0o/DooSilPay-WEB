import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import type { APIResponse, CustomQueryOptions } from '@shared/api';
import { httpClient } from '@shared/api';
import { MINUTE } from '@shared/config';

import type { AcademyProfile } from '../../model';
import { ACADEMY_KEY } from '../academy.keys';

export const getAcademy = async (): Promise<AcademyProfile | null> => {
  try {
    const res = await httpClient.get<APIResponse<AcademyProfile>>('/academy');

    return res.data.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;

    throw error;
  }
};

const useGetAcademyQuery = (options: CustomQueryOptions<AcademyProfile | null> = {}) => {
  const { enabled = true, staleTime = MINUTE, gcTime } = options;

  return useQuery({
    queryKey: ACADEMY_KEY.me(),
    queryFn: getAcademy,
    enabled,
    staleTime,
    gcTime,
  });
};

export default useGetAcademyQuery;
