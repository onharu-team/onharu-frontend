import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

// 가게 스케줄 조회
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const { searchParams } = new URL(request.url);

  const result = await serverApiClient.get(
    `/api/stores/${id}/schedules?${searchParams.toString()}`
  );

  return handleApiResult(result);
}
