import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function GET() {
  const result = await serverApiClient.get("/api/owners/stores?pageNum=1&perPage=10");

  return handleApiResult(result);
}
