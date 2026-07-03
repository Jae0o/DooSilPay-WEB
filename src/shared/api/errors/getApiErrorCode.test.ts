import type { AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';

import { getApiErrorCode } from './getApiErrorCode';

const body = { ok: false, error: { code: 'STUDENT_NOT_FOUND', message: '수강생을 찾을 수 없어요.' } };
const axiosErrorWithBody = new AxiosError('Request failed', undefined, undefined, undefined, {
  data: body,
} as AxiosResponse);

describe('getApiErrorCode', () => {
  it('AxiosError 응답 바디의 에러 코드를 반환한다', () =>
    expect(getApiErrorCode(axiosErrorWithBody)).toBe('STUDENT_NOT_FOUND'));
  it('response가 없는 AxiosError는 undefined', () =>
    expect(getApiErrorCode(new AxiosError('Network Error'))).toBeUndefined());
  it('AxiosError가 아니면 undefined', () => expect(getApiErrorCode(new Error('boom'))).toBeUndefined());
});
