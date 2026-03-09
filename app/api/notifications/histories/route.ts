import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params = {
    pageNum: searchParams.get("pageNum") ?? "1",
    perPage: searchParams.get("perPage") ?? "6",
    sortField: searchParams.get("sortField") ?? "createdAt",
    sortDirection: searchParams.get("sortDirection") ?? "desc",
  };

  const queryString = new URLSearchParams(params).toString();

  const result = await serverApiClient.get(`/api/notifications/histories?${queryString}`);

  return handleApiResult(result);
}
