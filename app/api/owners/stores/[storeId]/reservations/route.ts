import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function GET(request: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const { searchParams } = new URL(request.url);

  const result = await serverApiClient.get(
    `/api/owners/stores/${storeId}/reservations?${searchParams.toString()}`
  );

  return handleApiResult(result);
}
