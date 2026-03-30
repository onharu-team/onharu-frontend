"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { ChatMessage } from "@/lib/api/types/chat";
import { Toast } from "@/components/feature/toast/Toast";

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
  const subscriptionRef = useRef<StompSubscription | null>(null); // 구독 참조
  const reconnectCountRef = useRef(0); // 재연결 시도 횟수
  const [isConnected, setIsConnected] = useState(false); // 소켓 연결 상태

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return; // 방 ID 없으면 연결 안 함

    const brokerURL = `wss://${process.env.NEXT_PUBLIC_WS_HOST}/ws-chat`;

    // STOMP 클라이언트 생성 (웹소켓 기반 실시간 메시지 통신)
    const stompClient = new Client({
      brokerURL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: msg => console.log("[STOMP Debug]:", msg),

      onWebSocketError: event => {
        console.error("WebSocket ERROR:", event);
        Toast("error", "연결 실패", "잠시 후 다시 시도해주세요.");
      },

      onWebSocketClose: () => {
        reconnectCountRef.current++;

        if (reconnectCountRef.current > 2) {
          stompClient.deactivate();
        }
      },
    });

    // 서버에서 메시지 받았을 때 처리
    const handleIncomingMessage = (message: IMessage) => {
      try {
        const newMessage: ChatMessage = JSON.parse(message.body);

        // React Query 캐시에 메시지 추가
        queryClient.setQueryData<InfiniteData<ChatPageRes>>(["chatMessages", roomId], oldData => {
          if (!oldData?.pages?.length) return oldData;

          const firstPage = oldData.pages[0];
          const messages = firstPage.data.chatRoomMessageResponses;

          // 중복 메시지 제거
          if (messages.some(msg => msg.chatMessageId === newMessage.chatMessageId)) {
            return oldData;
          }

          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                data: {
                  ...firstPage.data,
                  chatRoomMessageResponses: [newMessage, ...messages],
                },
              },
              ...oldData.pages.slice(1),
            ],
          };
        });
        queryClient.invalidateQueries({
          queryKey: ["chatList"],
        });
      } catch (error) {
        console.error("Parsing error:", error);
      }
    };

    // 채팅방 연결 및 구독
    stompClient.onConnect = () => {
      // console.log("STOMP CONNECTED");
      setIsConnected(true);

      // 기존 구독 있으면 제거
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // 실시간 채팅 구독: 해당 경로로 들어오는 메시지를 감지하여 처리
      subscriptionRef.current = stompClient.subscribe(
        `/topic/chat/${roomId}`,
        handleIncomingMessage
      );
    };

    // 연결 끊김 및 에러 처리
    stompClient.onDisconnect = () => {
      // console.log("STOMP DISCONNECTED");
      setIsConnected(false);
    };

    stompClient.onStompError = frame => {
      console.error("STOMP ERROR:", frame);
      setIsConnected(false);
      Toast("error", "채팅 서버 오류", "잠시 후 다시 시도해주세요.");
    };

    // 클라이언트 참조 저장 및 활성화
    stompClientRef.current = stompClient;
    stompClient.activate();

    // cleanup: 컴포넌트 언마운트 시 연결 해제
    return () => {
      // console.log("CLEANUP SOCKET");

      // 구독 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      // 연결 해제
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }

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

      if (!content.trim()) return;

      if (!client || !client.connected) {
        console.warn("STOMP not connected");
        Toast("error", "전송 실패", "잠시 후 다시 시도해주세요.");
        return;
      }

      try {
        // 서버로 메시지 발송
        client.publish({
          destination: "/app/chat/send",
          body: JSON.stringify({
            chatRoomId: roomId!,
            senderId,
            content,
          }),
        });
      } catch (error) {
        console.error("SEND ERROR:", error);
      }
    },
    [roomId, senderId]
  );

  return { sendMessage, isConnected };
}
