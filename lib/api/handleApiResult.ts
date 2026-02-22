import { NextResponse } from "next/server";
import { ApiResult } from "./types/common";

export function handleApiResult<T>(result: ApiResult<T>) {
    if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.error.message,
      },
      {
        status: result.error.status,
      }
    );
  }

  return NextResponse.json(result.data);
}
