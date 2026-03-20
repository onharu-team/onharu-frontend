"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { Client, IMessage } from "@stomp/stompjs";
import { ChatMessage } from "@/lib/api/types/chat";

interface ChatPageRes {
  success: boolean;
  data: {
    chatRoomMessageResponses: ChatMessage[];
  };
}

/**
 * 채팅방 실시간 소켓 훅
 * @param roomId - 연결할 채팅방 ID
 * @param senderId - 메시지 보낸 사람 ID
 * @returns sendMessage: 메시지 전송 함수, isConnected: 연결 상태
 */

export function useChatSocket(roomId: number | null, senderId: number) {
  const stompClientRef = useRef<Client | null>(null); // STOMP 클라이언트 참조
  const [isConnected, setIsConnected] = useState(false); // 소켓 연결 상태

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return; // 방 ID 없으면 연결 안 함

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const brokerURL = `${protocol}://onharu-api.votex.co.kr:15080/ws-chat`;

    // STOMP 클라이언트 생성 (웹소켓 기반 실시간 메시지 통신)
    const stompClient = new Client({
      brokerURL,
      reconnectDelay: 5000, // 연결 끊기면 5초 후 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      // debug: msg => console.log("[STOMP Debug]:", msg),
    });

    // 서버에서 메시지 받았을 때 처리
    const handleIncomingMessage = (message: IMessage) => {
      try {
        const newMessage: ChatMessage = JSON.parse(message.body);

        // React Query 캐시에 메시지 추가
        queryClient.setQueryData<InfiniteData<ChatPageRes>>(["chatMessages", roomId], oldData => {
          if (!oldData?.pages?.length) return oldData;

          // 기존 페이지 복사 후 첫 페이지에 새 메시지 추가
          const newPages = [...oldData.pages];
          const firstPageMessages = newPages[0].data.chatRoomMessageResponses;

          // 중복 메시지 제거
          if (firstPageMessages.some(msg => msg.chatMessageId === newMessage.chatMessageId)) {
            return oldData;
          }

          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              chatRoomMessageResponses: [newMessage, ...firstPageMessages],
            },
          };

          return { ...oldData, pages: newPages };
        });
      } catch (error) {
        console.error("Parsing error:", error);
      }
    };

    // 채팅방 연결 및 구독
    stompClient.onConnect = () => {
      // console.log("STOMP CONNECTED");
      setIsConnected(true);

      // 실시간 채팅 구독: 해당 경로로 들어오는 메시지를 감지하여 처리
      stompClient.subscribe(`/topic/chat/${roomId}`, handleIncomingMessage);
    };

    // 연결 끊김 및 에러 처리
    stompClient.onDisconnect = () => setIsConnected(false);
    stompClient.onStompError = frame => {
      console.error("STOMP ERROR:", frame);
      setIsConnected(false);
    };

    // 클라이언트 참조 저장 및 활성화
    stompClientRef.current = stompClient;
    stompClient.activate();

    // cleanup: 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient.connected) stompClient.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
    };
  }, [roomId, queryClient]);

  /**
   * 메시지 전송 함수
   * @param content - 전송할 메시지 내용
   */

  const sendMessage = useCallback(
    (content: string) => {
      const client = stompClientRef.current;
      if (!content.trim() || !client?.connected) {
        console.warn("STOMP connection not ready");
        return;
      }

      // 서버로 메시지 발송
      client.publish({
        destination: "/app/chat/send",
        body: JSON.stringify({
          chatRoomId: roomId!,
          senderId,
          content,
        }),
      });
    },
    [roomId, senderId]
  );

  return { sendMessage, isConnected };
}
