import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function PUT() {
  const result = await serverApiClient.put("/api/notifications/histories/read/all", undefined);

  return handleApiResult(result);
}
