"use client";

import { MobileView } from "./component/MobileView";
import { DesktopView } from "./component/DesktopView";
import { useAuthProfile } from "@/hooks/useAuth";
import { useChatList } from "@/hooks/useChatList";

export const Header = () => {
  const { data: user } = useAuthProfile();

  const isLoggedIn = !!user;

  const { data } = useChatList();

  const chatRooms = data?.chatRoomResponses ?? [];
  const unreadCount = chatRooms.reduce((acc, chat) => acc + (chat.unreadMessageCount ?? 0), 0);

  return (
    <>
      <div className="tablet:block hidden">
        <DesktopView isLoggedIn={isLoggedIn} unreadCount={unreadCount} />
      </div>
      <div className="block md:hidden">
        <MobileView isLoggedIn={isLoggedIn} userName={user?.name} unreadCount={unreadCount} />
      </div>
    </>
  );
};
