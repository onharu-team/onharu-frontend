import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function DELETE(req: Request, context: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await context.params;

  const result = await serverApiClient.delete(`/api/reviews/${reviewId}`);

  return handleApiResult(result);
}
