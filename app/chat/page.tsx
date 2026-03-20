"use client";

import ChatList from "./components/ChatList";
import ChatListSkeleton from "./components/ChatListSkeleton";
import ChatListEmpty from "./components/ChatListEmpty";
import { useChatList } from "@/hooks/useChatList";
import { useAuthProfile } from "@/hooks/useAuth";

export default function ChatPage() {
  const { data: user } = useAuthProfile();
  const { data: chatData, isLoading } = useChatList();

  if (isLoading) return <ChatListSkeleton />;

  const chatRooms = chatData?.chatRoomResponses ?? [];
  const hasChats = chatRooms.length > 0;

  return hasChats ? (
    <div className="mt-section-sm-top mb-section-sm-bottom md:mt-section-lg-top md:mb-section-lg-bottom wrapper overflow-hidden">
      <ChatList name={user?.name || ""} userId={user?.userId || 0} chatList={chatRooms} />
    </div>
  ) : (
    <ChatListEmpty />
  );
}
