import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { ApiResponse } from "@/lib/api/types/common";
import { ChildData } from "@/lib/api/types/auth";

export async function GET() {
  const result = await serverApiClient.get<ApiResponse<ChildData>>("/api/users/profile/child");

  return handleApiResult(result);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.put<ApiResponse<Record<string, never>>>(
    "/api/users/profile/child",
    body
  );

  return handleApiResult(result);
}
