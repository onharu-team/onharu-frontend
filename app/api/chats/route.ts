import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

export async function GET() {
  const result = await serverApiClient.get("/api/chats");

  return handleApiResult(result);
}
