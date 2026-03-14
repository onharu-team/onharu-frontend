"use client";

import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PageSection } from "../components/PageSection";
import ReservationContent from "./components/ReservationContent";
import FilteredTabSection from "@/components/feature/filtered-tab-section/FilteredTabSection";
import { useAuthProfile } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { ReservationStatus } from "@/lib/api/types/reservation";
import { CHILD_RESERVATION_TABS, OWNER_RESERVATION_TABS } from "./constants/reservationTabs";
import EmptyState from "@/components/ui/EmptyState";

const PER_PAGE = 4;

export default function ReservationPage() {
  const { data: user } = useAuthProfile();
  const searchParams = useSearchParams();

  const pageNum = Number(searchParams.get("pageNum") ?? 1);
  const statusFilter = (searchParams.get("statusFilter") ?? "ALL") as ReservationStatus;

  const isOwnerNoStore = user?.userType === "OWNER" && (!user.stores || user.stores.length === 0);

  const baseParams = {
    pageNum,
    perPage: PER_PAGE,
    statusFilter,
    sortField: "id" as const,
    sortDirection: "desc" as const,
  };

  const reservationParams =
    user?.userType === "OWNER" ? { ...baseParams, storeId: user.stores?.[0] } : baseParams;

  const { data, isLoading } = useReservations(
    !isOwnerNoStore ? user?.userType : undefined,
    reservationParams
  );

  const reservationsData = data?.success ? data.data : null;

  const tabs = user?.userType === "OWNER" ? OWNER_RESERVATION_TABS : CHILD_RESERVATION_TABS;

  const showEmpty =
    isOwnerNoStore || !reservationsData || reservationsData.reservations.length === 0;

  return (
    <PageSection title="예약 내역" className="bg-white">
      <FilteredTabSection tabs={tabs}>
        {isLoading ? (
          Array.from({ length: PER_PAGE }).map((_, idx) => (
            <Skeleton key={idx} className="mt-4 h-30 rounded-[10px]" />
          ))
        ) : showEmpty ? (
          <EmptyState title="예약 내역이 없습니다." subtitle="나눔 가게를 둘러보고 예약해보세요!" />
        ) : (
          user && <ReservationContent items={reservationsData} role={user.userType} />
        )}
      </FilteredTabSection>
    </PageSection>
  );
}
