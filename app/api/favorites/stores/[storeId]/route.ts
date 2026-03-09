import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function POST(request: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const result = await serverApiClient.post(`/api/favorites/stores/${storeId}`);

  return handleApiResult(result);
}
