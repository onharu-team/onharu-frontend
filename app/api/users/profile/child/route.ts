import { handleApiResult } from "@/lib/api/handleApiResult";
import { serverApiClient } from "@/lib/api/serverApiClient";
// import { ChildData } from "@/lib/api/types/auth";

export async function GET() {
  const result = await serverApiClient.get("/api/users/profile/child");

  return handleApiResult(result);
}
