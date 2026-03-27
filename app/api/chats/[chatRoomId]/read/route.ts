import { NextRequest } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

// 채팅 메시지 읽음 처리
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ chatRoomId: string }> }
) {
  const { chatRoomId } = await context.params;

  const body = await request.json();

  const result = await serverApiClient.post(`/api/chats/${chatRoomId}/read`, body);

  return handleApiResult(result);
}
