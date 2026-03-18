import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

// 가게 스케줄 생성
export async function POST(request: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const body = await request.json();

  const result = await serverApiClient.post(`/api/owners/stores/${storeId}/schedules`, body);

  return handleApiResult(result);
}

// 가게 스케줄 삭제
export async function DELETE(request: Request, context: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await context.params;

  const body = await request.json();

  const result = await serverApiClient.delete(`/api/owners/stores/${storeId}/schedules`, body);

  return handleApiResult(result);
}
