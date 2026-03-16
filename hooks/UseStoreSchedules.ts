import { getStoreSchedules } from "@/lib/api/stores";
import { GetStoreSchedulesReq } from "@/lib/api/types/stores";
import { useQuery } from "@tanstack/react-query";

interface UseStoreSchedulesProps {
  storeId: string;
  params: GetStoreSchedulesReq;
}

export const useStoreSchedules = ({ storeId, params }: UseStoreSchedulesProps) => {
  return useQuery({
    queryKey: ["storeSchedules", storeId, params.year, params.month],
    queryFn: () => getStoreSchedules(storeId, params),
    enabled: !!storeId && !!params.year && !!params.month,
    select: res => {
      if (!res.success) return {};

      const monthly = res.data.monthlySummaries ?? [];

      return monthly.reduce<Record<string, string[]>>((acc, item) => {
        acc[item.date] = item.dailyScheduleDetails
          //   .filter(s => s.isAvailable)
          .map(s => s.startTime.slice(0, 5));

        return acc;
      }, {});
    },
  });
};
