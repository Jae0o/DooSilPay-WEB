export const ACADEMY_KEY = {
  all: ['academy'] as const,

  me: () => [...ACADEMY_KEY.all, 'me'] as const,
};
