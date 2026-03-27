"use client";

import { useRef, useLayoutEffect, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useChatMessagesQuery } from "@/hooks/useChatMessages";
import { buildRenderableMessages } from "../utils/groupMessagesByDate";
import { DateDivider } from "./DateDivider";
import { MyMessage } from "./MyMessage";
import { OtherMessage } from "./OtherMessage";
import { markAsRead } from "@/lib/api/chat";
import { useQueryClient } from "@tanstack/react-query";

type MessageListProps = {
  userName: string;
  userId: number;
  chatRoomId: number;
  unreadCount?: number;
};

export function MessageList({ userName, userId, chatRoomId, unreadCount = 0 }: MessageListProps) {
  const queryClient = useQueryClient();
  // 스크롤 컨테이너 DOM 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // 이전 스크롤 높이를 저장하여 무한 스크롤 시 위치 복원
  const previousScrollHeightRef = useRef(0);
  const isInitialRender = useRef(true);
  // 마지막 읽음 메시지 ID 저장
  const lastReadIdRef = useRef<number | null>(null);

  // 채팅 메시지 가져오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatMessagesQuery(chatRoomId);

  // 전체 메시지 배열을 과거 ~ 최신 순으로 정렬
  const allMessages = useMemo(() => {
    return (
      data?.pages
        ?.flat()
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) ?? []
    );
  }, [data]);

  // 메시지를 포맷팅 날짜 포함해서 렌더링용 배열로 변환
  const items = buildRenderableMessages(allMessages);

  // 읽음 처리
  useEffect(() => {
    const latest = allMessages[allMessages.length - 1];
    if (!latest) return;

    const latestId = latest.chatMessageId;
    if (unreadCount > 0 && lastReadIdRef.current !== latestId) {
      markAsRead(chatRoomId, { messageId: latestId })
        .then(() => {
          lastReadIdRef.current = latestId;
          queryClient.invalidateQueries({ queryKey: ["chatList"] });
        })
        .catch(err => console.error("읽음 처리 실패:", err));
    }
  }, [allMessages, chatRoomId, unreadCount, queryClient]);

  // 무한 스크롤
  const { ref: topInterceptor, inView } = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      if (scrollContainerRef.current) {
        previousScrollHeightRef.current = scrollContainerRef.current.scrollHeight;
      }
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 스크롤 위치 제어
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || allMessages.length === 0) return;

    // 처음엔 스크롤 맨 아래로 이동
    if (isInitialRender.current) {
      container.scrollTop = container.scrollHeight;
      isInitialRender.current = false;
      return;
    }

    // 이전 스크롤 위치 보존
    if (previousScrollHeightRef.current) {
      container.style.scrollBehavior = "auto";
      const delta = container.scrollHeight - previousScrollHeightRef.current;
      container.scrollTop = delta; // 이전 높이 차이만큼 스크롤 조정
      previousScrollHeightRef.current = 0;
    } else {
      // 새 메시지 수신 시 스크롤 아래로 이동
      container.style.scrollBehavior = "smooth";
      container.scrollTop = container.scrollHeight;
    }
  }, [allMessages.length]);

  if (status === "pending") return <div className="p-4 text-center">로딩 중...</div>;

  return (
    <div
      ref={scrollContainerRef}
      className="px-wrapper flex h-full flex-col overflow-y-auto sm:px-7.5"
    >
      {isFetchingNextPage && (
        <div className="flex justify-center py-2 text-xs text-gray-400">
          이전 대화 불러오는 중...
        </div>
      )}

      {/* 무한 스크롤 상단 인터셉터 */}
      <div ref={topInterceptor} style={{ height: "1px" }} />

      {/* 메시지 렌더링 */}
      {items.map((item, idx) => {
        if (item.type === "date") return <DateDivider key={`date-${item.date}`} date={item.date} />;

        const msg = item.data;
        const isMe =
          String(msg.senderName) === String(userId) ||
          msg.senderName === userName ||
          String(msg.sender) === String(userId);

        const MessageComponent = isMe ? MyMessage : OtherMessage;
        return (
          <MessageComponent
            key={`msg-${msg.chatMessageId}-${idx}`}
            message={msg.content}
            time={msg.formattedTime}
          />
        );
      })}
    </div>
  );
}
