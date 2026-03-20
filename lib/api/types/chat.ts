// 개별 채팅방 정보 응답
export interface ChatRoomRes {
  chatRoomId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
  chatParticipants: string[];
}

// 참여 중인 전체 채팅방 목록 응답
export interface ChatList {
  chatRoomResponses: ChatRoomRes[];
}

// 채팅방 생성 요청 시 전달할 데이터
export interface CreateChatReq {
  name: string;
  roomType: "ONE_TO_ONE";
  chatParticipantIds: number[];
}

// 채팅방 생성 성공 시 받는 응답
export interface CreateChatRes {
  chatRoomId: number;
}

// 기존 채팅방에 새로운 사용자 초대 요청 시 전달할 데이터
export interface InviteParticipantsReq {
  userIds: number[];
}

// 메시지 읽음 처리 요청 시 전달할 데이터
export interface ReadMessageReq {
  messageId: number;
}

// 개별 채팅 메시지 상세 정보
export interface ChatMessage {
  chatMessageId: number;
  sender?: number;
  senderName: string;
  content: string;
  createdAt: string;
}

// 채팅 메시지 목록 조회 응답 (커서 기반 페이징)
export interface ChatMessageRes {
  chatRoomMessageResponses: ChatMessage[];
}
