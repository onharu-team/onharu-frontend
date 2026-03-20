import { useParams, useRouter } from "next/navigation";
import { ChatRoomRes } from "@/lib/api/types/chat";
import { ChatListItem } from "./ChatListItem";

interface Props {
  name: string;
  chatList: ChatRoomRes[];
}

export function ChatListPanel({ name, chatList }: Props) {
  const params = useParams();
  const router = useRouter();

  const currentChatId = params.id;

  const handleSelect = (chat: ChatRoomRes) => {
    router.push(`/chat/${chat.chatRoomId}`);
  };

  return (
    <div
      className={`scrollbar-thin wrapper md:border-border h-[calc(100vh-120px)] w-full overflow-y-auto md:max-w-133.75 md:rounded-[10px] md:border md:p-7.5 ${
        currentChatId ? "hidden md:block" : ""
      }`}
    >
      <h3 className="text-md mb-4.25 font-bold sm:mb-8.75 sm:text-2xl">
        <span className="block">{name}님의</span>
        <span className="block">대화방입니다 :{")"}</span>
      </h3>

      {chatList.map((chat, i) => (
        <ChatListItem
          key={i}
          chat={chat}
          isSelected={String(currentChatId) === String(chat.chatRoomId)}
          onSelect={() => handleSelect(chat)}
        />
      ))}
    </div>
  );
}
