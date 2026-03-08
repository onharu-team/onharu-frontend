"use client";

import { useSearchParams } from "next/navigation";
import { PageSection } from "../components/PageSection";
import ReservationContent from "./components/ReservationContent";
import { useAuthProfile } from "@/hooks/useAuth";
import { ReservationStatus } from "@/lib/api/types/reservation";
import { useReservations } from "@/hooks/useReservations";

const EMPTY_RESERVATIONS = {
  reservations: [],
  totalPages: 0,
  totalCount: 0,
  currentPage: 1,
  perPage: 4,
};

export default function ReservationPage() {
  const { data: user } = useAuthProfile();
  const searchParams = useSearchParams();

  const pageNum = Number(searchParams.get("pageNum") ?? 1);
  const statusFilter = (searchParams.get("statusFilter") ?? "ALL") as ReservationStatus;

  const baseParams = {
    pageNum,
    perPage: 4,
    statusFilter,
    sortField: "id" as const,
    sortDirection: "desc" as const,
  };

  const reservationParams =
    user?.userType === "OWNER" ? { ...baseParams, storeId: user.stores[0] } : { ...baseParams };

  const { data } = useReservations(user?.userType, reservationParams);

  const reservationsData = data?.success && data.data ? data.data : EMPTY_RESERVATIONS;

  return (
    <PageSection title="예약 내역" className="bg-white">
      {user && <ReservationContent items={reservationsData} role={user.userType} />}
    </PageSection>
  );
}
