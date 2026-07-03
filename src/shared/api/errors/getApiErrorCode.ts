import { isAxiosError } from 'axios';

import type { ApiErrorBody } from '../types';

/** AxiosError 응답 바디(ApiErrorBody)에서 서버 에러 코드 추출. 해당 없으면 undefined. */
export const getApiErrorCode = (error: unknown): string | undefined =>
  isAxiosError<ApiErrorBody>(error) ? error.response?.data?.error?.code : undefined;
