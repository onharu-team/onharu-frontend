"use client";

import { useChatList } from "@/hooks/useChatList";
import { useAuthProfile } from "@/hooks/useAuth";
import { ChatListPanel } from "./components/ChatListPanel";
import ChatListEmpty from "./components/ChatListEmpty";
import ChatListSkeleton from "./components/ChatListSkeleton";
export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { data: user } = useAuthProfile();
  const { data: chatData, isLoading } = useChatList();

  if (isLoading) return <ChatListSkeleton />;

  const chatRooms = chatData?.chatRoomResponses ?? [];
  const hasChats = chatRooms.length > 0;

  if (!hasChats) {
    return <ChatListEmpty />;
  }

  return (
    <div className="wrapper mt-section-sm-top mb-section-sm-bottom md:mt-section-lg-top md:mb-section-lg-bottom flex overflow-hidden md:gap-7.5">
      <ChatListPanel name={user?.name || ""} chatList={chatRooms} />

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
