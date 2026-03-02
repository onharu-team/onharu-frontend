import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function POST(
  request: Request,
  context: { params: Promise<{ reservationId: string }> }
) {
  const { reservationId } = await context.params;

  const body = await request.json();

  const result = await serverApiClient.post(
    `/api/owners/reservations/${reservationId}/reject`,
    body
  );

  return handleApiResult(result);
}
