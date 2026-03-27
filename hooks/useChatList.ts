import { getChatList } from "@/lib/api/chat";
import { ChatList } from "@/lib/api/types/chat";
import { useQuery } from "@tanstack/react-query";

export const useChatList = () => {
  return useQuery<ChatList, Error>({
    queryKey: ["chatList"],
    queryFn: async () => {
      const res = await getChatList();

      if (res.success === false) {
        throw new Error("채팅 목록 조회를 불러오는데 실패했습니다.");
      }

      return res.data;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
