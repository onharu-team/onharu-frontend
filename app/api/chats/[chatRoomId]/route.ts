import { serverApiClient } from "@/lib/api/serverApiClient";
import { handleApiResult } from "@/lib/api/handleApiResult";
import { NextRequest } from "next/server";

// 채팅방 탈퇴
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ chatRoomId: string }> }
) {
  const { chatRoomId } = await context.params;

  const result = await serverApiClient.delete(`/api/chats/${chatRoomId}`);

  return handleApiResult(result);
}
