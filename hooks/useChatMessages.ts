import { getChatMessages } from "@/lib/api/chat";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * 특정 채팅방 메시지를 무한 스크롤 방식으로 가져오는 훅
 * @param chatRoomId - 조회할 채팅방 ID
 */

export const useChatMessagesQuery = (chatRoomId: number) => {
  return useInfiniteQuery({
    queryKey: ["chatMessages", chatRoomId],
    queryFn: ({ pageParam }) => getChatMessages(chatRoomId, pageParam),
    initialPageParam: undefined as number | undefined,
    /**
     * 다음 페이지의 파라미터를 결정함
     * lastPage: 가장 최근에 가져온 데이터 페이지
     */
    getNextPageParam: lastPage => {
      if (lastPage.success && lastPage.data.chatRoomMessageResponses.length > 0) {
        const messages = lastPage.data.chatRoomMessageResponses;

        // 마지막 메시지의 id를 다음 cursorId로 사용
        return messages[messages.length - 1].chatMessageId;
      }
      // 더 이상 가져올 데이터가 없으면 undefined 반환
      return undefined;
    },

    select: data => ({
      pages: data.pages.flatMap(page => (page.success ? page.data.chatRoomMessageResponses : [])),
      pageParams: data.pageParams,
    }),
  });
};
