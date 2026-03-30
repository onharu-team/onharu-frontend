import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function POST(request: Request, { params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params; // ← await으로 받은 storeId를
  const body = await request.json();

  const result = await serverApiClient.post(
    `/api/childrens/stores/${storeId}/reservations`, // ← 여기서 써야해요
    body
  );

  return handleApiResult(result);
}
