export interface ApiError {
  status: number;
  message: string;
  code?: string;
  timestamp?: string;
  error?: string;
  path?: string;
}

export type ApiResult<T> =
  | {
      ok: true;
      data: T;
      headers: Headers;
    }
  | {
      ok: false;
      error: {
        message: string;
        status: number;
      };
      headers: Headers;
    };
