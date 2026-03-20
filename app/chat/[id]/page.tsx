"use client";

import { useParams, useRouter } from "next/navigation";
import { useChatList } from "@/hooks/useChatList";
import { useAuthProfile } from "@/hooks/useAuth";
import ChatRoom from "../components/ChatRoom";

export default function ChatDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: user } = useAuthProfile();
  const { data: chatData } = useChatList();

  const chatRooms = chatData?.chatRoomResponses ?? [];
  const selectedChat = chatRooms.find(room => String(room.chatRoomId) === String(id));

  if (!selectedChat) return <div className="p-10 text-center">방을 찾을 수 없습니다.</div>;

  return (
    <ChatRoom
      userName={user?.name || ""}
      userId={user?.userId || 0}
      chat={selectedChat}
      onBack={() => router.push("/chat")}
      onDeleteRoom={() => router.push("/chat")}
    />
  );
}
