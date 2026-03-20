"use client";

import { useState } from "react";
import { ChatListPanel } from "./ChatListPanel";
import ChatRoom from "./ChatRoom";
import { ChatRoomRes } from "@/lib/api/types/chat";

interface ChatListProps {
  name: string;
  userId: number;
  chatList: ChatRoomRes[];
}

export default function ChatList({ name, userId, chatList }: ChatListProps) {
  const [selectedChat, setSelectedChat] = useState<ChatRoomRes | null>(null);

  const handleBackOrDelete = () => setSelectedChat(null);
  const isChatRoomVisible = selectedChat !== null;

  return (
    <div className="flex justify-center sm:justify-baseline sm:gap-7.5">
      <ChatListPanel
        name={name}
        chatList={chatList}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      <div className={`w-full ${isChatRoomVisible ? "block" : "hidden md:block"}`}>
        <ChatRoom
          userName={name}
          userId={userId}
          chat={selectedChat}
          onBack={handleBackOrDelete}
          onDeleteRoom={handleBackOrDelete}
        />
      </div>
    </div>
  );
}
