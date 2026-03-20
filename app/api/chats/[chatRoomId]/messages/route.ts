import { NextRequest } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

// 특정 채팅방 메시지 조회 (커서 기반)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ chatRoomId: string }> }
) {
  const { chatRoomId } = await context.params;

  const { searchParams } = new URL(request.url);
  const cursorId = searchParams.get("cursorId");

  const endpoint = cursorId
    ? `/api/chats/${chatRoomId}/messages?cursorId=${cursorId}`
    : `/api/chats/${chatRoomId}/messages`;

  const result = await serverApiClient.get(endpoint);

  return handleApiResult(result);
}
