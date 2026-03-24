"use client";

import { useRouter } from "next/navigation";
import { createChatRoom, getChatList } from "@/lib/api/chat";
import { useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/components/feature/toast/Toast";

// 1:1 채팅방 진입 및 생성 전용 커스텀 훅
export const useEnterChat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  /**
   * 특정 유저와 채팅방 진입 또는 생성
   * @param targetUserId - 상대방 유저 ID
   * @param targetUserName - 상대방 유저 이름
   */
  const enterChat = async (targetUserId: number, targetUserName: string) => {
    try {
      // 채팅 목록 가져오기 (이미 있는 방인지 확인용)
      const res = await queryClient.fetchQuery({
        queryKey: ["chatList"],
        queryFn: getChatList,
      });

      const existingRooms = (res.success && res.data?.chatRoomResponses) || [];

      // 참여자 목록에 상대방 이름이 있는지 확인
      const existingRoom = existingRooms.find(room =>
        room.chatParticipants.includes(targetUserName)
      );

      if (existingRoom) {
        // 이미 방이 있다면 해당 방으로 이동
        router.push(`/chat/${existingRoom.chatRoomId}`);
        return;
      }

      // 기존 방이 없다면 새로 생성
      const createRes = await createChatRoom({
        name: `${targetUserName}님과의 채팅`,
        roomType: "ONE_TO_ONE",
        targetId: targetUserId,
      });

      if (createRes.success && createRes.data) {
        queryClient.invalidateQueries({ queryKey: ["chatList"] });
        router.push(`/chat/${createRes.data.chatRoomId}`);
      }
    } catch (error) {
      console.error("채팅방 진입 실패:", error);
      Toast("error", "채팅방 연결 실패", "잠시후에 다시 시도해주세요.");
    }
  };

  return { enterChat };
};
