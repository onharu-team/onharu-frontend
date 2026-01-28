import { RawReservation, GroupedReservations } from "../type/ReservationType";
/**
 * 날짜별로 시간을 그룹핑
 * @param data RawReservation 배열
 * @returns {GroupedReservations} 날짜별 시간 배열
 */
export function ReservationUtils(data: RawReservation[]): GroupedReservations {
  return data.reduce((acc, cur) => {
    if (!acc[cur.date]) acc[cur.date] = [];
    acc[cur.date].push(cur.time);
    return acc;
  }, {} as GroupedReservations);
}
