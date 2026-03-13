import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function GET() {
  const result = await serverApiClient.get("/api/notifications/me");

  return handleApiResult(result);
}

export async function PUT(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.put("/api/notifications/me", body);

  return handleApiResult(result);
}
