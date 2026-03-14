import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import { ChatList } from "./types/chat";

// 채팅방 목록 조회
export const getChatList = (): Promise<ApiResponse<ChatList>> => {
  return apiClient.get<ApiResponse<ChatList>>("/chats");
};
