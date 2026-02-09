"use client";

import { useEffect, useState } from "react";
import ChatList from "./components/ChatList";
import ChatListEmpty from "./components/ChatListEmpty";
import { chatListMock } from "./data/mockData";
import ChatListSkeleton from "./components/ChatListSkeleton";

export default function ChatPage() {
  const [loading, setLoading] = useState(true);
  const [chatList, setChatList] = useState<typeof chatListMock>([]);

  useEffect(() => {
    setTimeout(() => {
      setChatList(chatListMock);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div>
      {loading ? (
        <ChatListSkeleton />
      ) : chatList.length > 0 ? (
        <div className="mt-section-sm-top mb-section-sm-bottom md:mt-section-lg-top md:mb-section-lg-bottom wrapper overflow-hidden">
          <ChatList name="코끼리땃쥐" chatList={chatList} />
        </div>
      ) : (
        <ChatListEmpty />
      )}
    </div>
  );
}
