import { RawReservation, GroupedReservations } from "../type/ReservationType";
/**
 * 날짜별로 시간을 그룹핑
 * @param data RawReservation 배열
 * @returns {GroupedReservations} 날짜별 시간 배열
 *
 * 예를 들어
 * [
 *  {date: "2025-12-12", time: ["11:00"]},
 *  {date: "2025-12-12", time: ["12:00"]},
 *  {date: "2025-12-13", time: ["15:00"]},
 *  {date: "2025-12-13", time: ["17:00"]},
 *  {date: "2025-12-15", time: ["14:00"]},
 * ]
 * 위와 같은 데이터가 있다면 아래와 같이 만들어줍니다.
 * {
    "2025-12-12": ["11:00", "12:00"],
    "2025-12-13": ["15:00","17:00"],
    "2025-12-15": ["14:00"],
  }
    위처럼 날짜별로 예약 가능 시간을 그룹화 해줍니다.
 *
 */
export function ReservationUtils(data: RawReservation[]): GroupedReservations {
  if (!Array.isArray(data)) return {};

  return data.reduce((acc, cur) => {
    if (!acc[cur.date]) acc[cur.date] = [];
    acc[cur.date].push(cur.time);
    return acc;
  }, {} as GroupedReservations);
}
