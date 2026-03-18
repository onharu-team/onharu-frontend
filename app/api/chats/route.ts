import { NextRequest } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

// 채팅 목록 조회
export async function GET() {
  const result = await serverApiClient.get("/api/chats");

  return handleApiResult(result);
}

// 채팅방 생성
export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = await serverApiClient.post("/api/chats", body);

  return handleApiResult(result);
}
