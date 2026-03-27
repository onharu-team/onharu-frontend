"use client";

import { MessageList } from "./MessageList";
import { ChatRoomEmpty } from "./ChatRoomEmpty";
import { ChatHeader } from "./ChatHeader";
import { ChatInputArea } from "./ChatInputArea";
import { ChatRoomRes } from "@/lib/api/types/chat";
import { useChatSocket } from "@/hooks/useChatSocket";

interface ChatRoomProps {
  userName: string;
  userId: number;
  chat: ChatRoomRes | null;
  onBack: () => void;
  onDeleteRoom: (roomId: number) => void;
}

export default function ChatRoom({ userName, userId, chat, onBack, onDeleteRoom }: ChatRoomProps) {
  const chatRoomId = chat?.chatRoomId ?? null;
  const { sendMessage, isConnected } = useChatSocket(chatRoomId, userId);

  if (!chat) return <ChatRoomEmpty />;

  const handleClose = () => onDeleteRoom(chat.chatRoomId);

  return (
    <div className="border-border flex h-[calc(100vh-120px)] w-full flex-col justify-between rounded-[10px] border bg-white">
      {/* 채팅방 헤더 */}
      <ChatHeader
        chatRoomId={chat.chatRoomId}
        sender={chat.chatParticipants[0]}
        onBack={onBack}
        onClose={handleClose}
      />

      {/* 채팅방 메시지 목록 */}
      <div className="relative flex-1 overflow-hidden">
        <MessageList
          userName={userName}
          userId={userId}
          chatRoomId={chat.chatRoomId}
          unreadCount={chat.unreadMessageCount}
        />
      </div>

      {/* 메시지 입력 영역 */}
      <ChatInputArea onSendMessage={sendMessage} isConnected={isConnected} />
    </div>
  );
}
