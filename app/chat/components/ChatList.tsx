"use client";

import { useState } from "react";
import { ChatListPanel } from "./ChatListPanel";
import ChatRoom from "./ChatRoom";
import { ChatRoomRes } from "@/lib/api/types/chat";

interface ChatListProps {
  name: string;
  chatList: ChatRoomRes[];
}

export default function ChatList({ name, chatList }: ChatListProps) {
  const [selectedChat, setSelectedChat] = useState<ChatRoomRes | null>(null);
  const [rooms, setRooms] = useState(chatList);

  const handleDeleteRoom = async (roomId: number) => {
    try {
      // 삭제

      setRooms(prev => prev.filter(room => room.chatRoomId !== roomId));

      setSelectedChat(prev => (prev?.chatRoomId === roomId ? null : prev));
    } catch (e) {
      console.error("채팅방 나가기 실패", e);
    }
  };

  return (
    <div className="flex justify-center sm:justify-baseline sm:gap-7.5">
      <ChatListPanel
        name={name}
        chatList={rooms}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      <div className={`w-full ${selectedChat ? "block" : "hidden md:block"}`}>
        <ChatRoom
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
          onDeleteRoom={handleDeleteRoom}
        />
      </div>
    </div>
  );
}
