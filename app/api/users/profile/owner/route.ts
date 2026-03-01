import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { ApiResponse } from "@/lib/api/types/common";
import { OwnerData } from "@/lib/api/types/auth";

export async function GET() {
  const result = await serverApiClient.get<ApiResponse<OwnerData>>("/api/users/profile/owner");

  return handleApiResult(result);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.put<ApiResponse<Record<string, never>>>(
    "/api/users/profile/owner",
    body
  );

  return handleApiResult(result);
}
