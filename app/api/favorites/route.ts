import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const result = await serverApiClient.get(`/api/favorites?${searchParams.toString()}`);

  return handleApiResult(result);
}
