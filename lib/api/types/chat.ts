export interface ChatRoomRes {
  chatRoomId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
  chatParticipants: string[];
}

export interface ChatList {
  chatRoomResponses: ChatRoomRes[];
}
