import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { MeResponse } from "@/lib/api/types/auth";

export async function GET() {
  const result = await serverApiClient.get<MeResponse>("/api/users/me");

  return handleApiResult(result);
}
