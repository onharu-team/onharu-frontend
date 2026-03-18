import { apiClient } from "./clientApiClient";
import { ApiResponse } from "./types/common";
import {
  ChatList,
  CreateChatReq,
  CreateChatRes,
  ChatMessageRes,
  InviteParticipantsReq,
  ReadMessageReq,
} from "./types/chat";

// 채팅방 목록 조회
export const getChatList = (): Promise<ApiResponse<ChatList>> => {
  return apiClient.get<ApiResponse<ChatList>>("/chats");
};

// 채팅방 생성
export const createChatRoom = (data: CreateChatReq): Promise<ApiResponse<CreateChatRes>> => {
  return apiClient.post<ApiResponse<CreateChatRes>>("/chats", data);
};

// 채팅방 탈퇴
export const leaveChatRoom = (chatRoomId: number): Promise<ApiResponse<string>> => {
  return apiClient.delete<ApiResponse<string>>(`/chats/${chatRoomId}`);
};

// 채팅 메시지 조회 (커서 기반)
export const getChatMessages = (
  chatRoomId: number,
  cursorId?: number
): Promise<ApiResponse<ChatMessageRes>> => {
  const url = cursorId
    ? `/chats/${chatRoomId}/messages?cursorId=${cursorId}`
    : `/chats/${chatRoomId}/messages`;
  return apiClient.get<ApiResponse<ChatMessageRes>>(url);
};

// 채팅방 사용자 초대
export const inviteToChat = (
  chatRoomId: number,
  data: InviteParticipantsReq
): Promise<ApiResponse<void>> => {
  return apiClient.post<ApiResponse<void>>(`/chats/${chatRoomId}/participants`, data);
};

// 채팅 메시지 읽음 처리
export const markAsRead = (
  chatRoomId: number,
  data: ReadMessageReq
): Promise<ApiResponse<void>> => {
  return apiClient.post<ApiResponse<void>>(`/chats/${chatRoomId}/read`, data);
};
