"use client";

import { MessageList } from "./MessageList";
import { ChatRoomEmpty } from "./ChatRoomEmpty";
import { ChatHeader } from "./ChatHeader";
import { ChatInputArea } from "./ChatInputArea";
import { messages } from "../data/mockData";
import { ChatRoomRes } from "@/lib/api/types/chat";

interface ChatRoomProps {
  chat: ChatRoomRes | null;
  onBack: () => void;
  onDeleteRoom: (roomId: number) => void;
}

export default function ChatRoom({ chat, onBack, onDeleteRoom }: ChatRoomProps) {
  if (!chat) return <ChatRoomEmpty />;

  const handleDelete = async () => {
    if (!chat) return;
    onDeleteRoom(chat.chatRoomId);
  };

  return (
    <div className="border-border flex h-[calc(100vh-120px)] w-full flex-col justify-between rounded-[10px] border">
      <ChatHeader sender={"나중에 수정"} onBack={onBack} onDeleteRoom={handleDelete} />

      <div className="px-wrapper scrollbar-thin flex-1 overflow-y-auto sm:px-7.5">
        <MessageList messages={messages} />
      </div>

      <ChatInputArea />
    </div>
  );
}
