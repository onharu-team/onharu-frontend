import { ChatMessage } from "@/lib/api/types/chat";
import formatDateTime from "@/utils/formatDateTime";

/**
 * UI 렌더링을 위한 통합 아이템 타입
 * date: 날짜 구분선 데이터
 * message: 포맷팅된 시간이 포함된 실제 채팅 메시지 데이터
 */

export type RenderableItem =
  | { type: "date"; date: string }
  | { type: "message"; data: ChatMessage & { formattedTime: string } };

/**
 * 일반 메시지 배열을 받아, 날짜가 바뀔 때마다 날짜 구분선을 끼워넣은
 * 새로운 렌더링용 배열을 생성함
 */
export function buildRenderableMessages(messages: ChatMessage[]): RenderableItem[] {
  return messages.reduce<{ items: RenderableItem[]; prevDate: string | null }>(
    (acc, msg) => {
      const { date, time } = formatDateTime(msg.createdAt);

      // 현재 메시지의 날짜가 이전 메시지의 날짜와 다르다면 날짜 구분선 추가
      if (date !== acc.prevDate) {
        acc.items.push({
          type: "date",
          date,
        });
      }

      // 원본 메시지 데이터에 포맷팅된 시간이랑 삽입
      acc.items.push({
        type: "message",
        data: { ...msg, formattedTime: time },
      });

      return {
        items: acc.items,
        prevDate: date,
      };
    },
    // 초기값
    { items: [], prevDate: null }
  ).items;
}
