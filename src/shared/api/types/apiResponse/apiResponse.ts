/** 성공 응답: { ok: true, data }. axios.get<APIResponse<T>> 제네릭으로 사용. */
export interface APIResponse<T> {
  ok: true;
  data: T;
}

/** 에러 응답 바디: { ok: false, error: { code, message } }. AxiosError.response?.data 타이핑용. */
export interface ApiErrorBody {
  ok: false;
  error: { code: string; message: string };
}
