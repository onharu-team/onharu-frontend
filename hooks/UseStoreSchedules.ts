import { Schedule } from "@/app/mypage/sharing/types";
import { getStoreSchedules } from "@/lib/api/stores";
import { GetStoreSchedulesReq } from "@/lib/api/types/stores";
import { useQuery } from "@tanstack/react-query";

interface ScheduleReturn {
  times: Record<string, string[]>;
  detailed: Record<string, Schedule[]>;
}

interface UseStoreSchedulesProps {
  storeId: string;
  params: GetStoreSchedulesReq;
}

// useStoreSchedules: 가게 스케줄 조회 커스텀 훅
// - storeId와 year/month를 기준으로 해당 월의 스케줄 정보를 가져옴
// - times: 날짜별 시작 시간 배열
// - detailed: 날짜별 시간, 종료 시간, 최대 인원, 사용 가능 여부 등 상세 정보

export const useStoreSchedules = ({ storeId, params }: UseStoreSchedulesProps) => {
  const query = useQuery({
    queryKey: ["storeSchedules", storeId, params.year, params.month],
    queryFn: () => getStoreSchedules(storeId, params),
    enabled: !!storeId && !!params.year && !!params.month,
    select: (res): ScheduleReturn => {
      if (!res.success) return { times: {}, detailed: {} };

      const monthly = res.data.dateSummaries ?? [];
      const times: Record<string, string[]> = {};
      const detailed: Record<string, Schedule[]> = {};

      monthly.forEach(item => {
        const details = item.scheduleSlots.map(s => ({
          time: s.startTime.slice(0, 5),
          endTime: s.endTime.slice(0, 5),
          maxPeople: s.maxPeople,
          id: s.id,
          isAvailable: s.isAvailable,
        }));

        times[item.date] = details.map(d => d.time);
        detailed[item.date] = details;
      });

      return { times, detailed };
    },
  });
  return {
    ...query,
    times: query.data?.times ?? {},
    detailed: query.data?.detailed ?? {},
  };
};
