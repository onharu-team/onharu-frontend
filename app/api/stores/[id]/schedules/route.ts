import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const url = new URL(request.url);
  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");

  if (!year || !month) {
    return new Response(JSON.stringify({ message: "year와 month는 필수입니다." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await serverApiClient.get(
    `/api/stores/${id}/schedules?year=${year}&month=${month}`
  );

  return handleApiResult(result);
}
