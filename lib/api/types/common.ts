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
      success: true;
      data: T | null;
      headers: Headers;
    }
  | {
      success: false;
      error: {
        message: string;
        status: number;
      };
      headers: Headers;
    };

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message?: string;
  code?: string;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
