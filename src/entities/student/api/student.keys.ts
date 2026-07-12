import type { ListStudentsParams } from '../model';

export const STUDENT_KEY = {
  all: ['student'] as const,

  lists: () => [...STUDENT_KEY.all, 'list'] as const,
  list: (params: ListStudentsParams) => [...STUDENT_KEY.lists(), params] as const,

  details: () => [...STUDENT_KEY.all, 'detail'] as const,
  detail: (id: string) => [...STUDENT_KEY.details(), id] as const,

  summaries: () => [...STUDENT_KEY.all, 'summary'] as const,
  summary: (period: string) => [...STUDENT_KEY.summaries(), period] as const,
};
