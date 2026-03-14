import Image from "next/image";
import { ChatRoomRes } from "@/lib/api/types/chat";
import formatDateTime from "@/utils/formatDateTime";

interface Props {
  chat: ChatRoomRes;
  isSelected: boolean;
  onSelect: () => void;
}

export function ChatListItem({ chat, isSelected, onSelect }: Props) {
  const { time } = formatDateTime(chat.lastMessageTime);

  return (
    <div
      onClick={onSelect}
      className={`mb-2 flex h-25 cursor-pointer gap-1.75 rounded-[10px] border p-5 transition-transform duration-300 hover:scale-[1.01] sm:mb-5 sm:gap-3.75 ${
        isSelected
          ? "border-main bg-main-100"
          : "border-border hover:border-main focus:border-main active:border-main"
      }`}
    >
      <div className="relative h-7.5 w-7.5 sm:h-15 sm:w-15">
        <Image
          src="/image/page/default-profile.svg"
          alt="프로필 기본 이미지"
          fill
          className="object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="sm:text-md mb-1.25 font-semibold">{chat.chatParticipants[0]}</div>
        <div className="truncate text-sm sm:text-base">{chat.lastMessage}</div>
      </div>

      <div
        className={`flex flex-col items-end ${chat.unreadMessageCount > 0 ? "justify-between" : "justify-end"}`}
      >
        {chat.unreadMessageCount > 0 && (
          <div className="bg-main flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs font-bold text-white">
            {chat.unreadMessageCount}
          </div>
        )}
        <div className="text-sm sm:text-base">{time}</div>
      </div>
    </div>
  );
}
