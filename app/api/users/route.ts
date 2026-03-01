import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function DELETE() {
  const result = await serverApiClient.delete("/api/users");

  return handleApiResult(result);
}
