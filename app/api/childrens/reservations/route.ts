import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function GET() {
  const params = new URLSearchParams({
    childId: "1",
    pageNum: "1",
    perPage: "10",
    statusFilter: "ALL",
    sortField: "id",
    sortDirection: "desc",
  });

  const result = await serverApiClient.get(`/api/childrens/reservations?${params.toString()}`);

  return handleApiResult(result);
}
