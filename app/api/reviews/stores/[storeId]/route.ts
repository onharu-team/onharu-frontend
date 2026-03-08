import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function POST(req: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const body = await req.json();

  const result = await serverApiClient.post(`/api/reviews/stores/${storeId}`, body);

  return handleApiResult(result);
}
