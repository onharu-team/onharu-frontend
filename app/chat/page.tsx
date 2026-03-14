"use client";

import ChatList from "./components/ChatList";
import ChatListSkeleton from "./components/ChatListSkeleton";
import { useChatList } from "@/hooks/useChatList";
import { useAuthProfile } from "@/hooks/useAuth";
import ChatListEmpty from "./components/ChatListEmpty";

export default function ChatPage() {
  const { data: user } = useAuthProfile();
  const userName = user?.name || "";

  const { data, isLoading } = useChatList();

  return (
    <div>
      {isLoading ? (
        <ChatListSkeleton />
      ) : data && data.chatRoomResponses.length > 0 ? (
        <div className="mt-section-sm-top mb-section-sm-bottom md:mt-section-lg-top md:mb-section-lg-bottom wrapper overflow-hidden">
          <ChatList name={userName} chatList={data.chatRoomResponses} />
        </div>
      ) : (
        <ChatListEmpty />
      )}
    </div>
  );
}
