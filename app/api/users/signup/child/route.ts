import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.post("/api/users/signup/child", body);

  return handleApiResult(result);
}
