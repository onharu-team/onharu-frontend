export interface ChatRoomRes {
  chatRoomId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export interface ChatList {
  chatRoomResponses: ChatRoomRes[];
}
