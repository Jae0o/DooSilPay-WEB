export const SUBJECT_KEY = {
  all: ['subjects'] as const,

  list: () => [...SUBJECT_KEY.all, 'list'] as const,
};
