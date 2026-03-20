import { NextRequest } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";

// 채팅방 초대
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ chatRoomId: string }> }
) {
  const { chatRoomId } = await context.params;

  const body = await request.json();

  const result = await serverApiClient.post(`/api/chats/${chatRoomId}/participants`, body);

  return handleApiResult(result);
}
