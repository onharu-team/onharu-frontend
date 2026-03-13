"use client";

import DateGroupedPaginatedSection from "@/components/feature/date-grouped-pagination/DateGroupedPaginatedSection";
import ReservationCard from "./ReservationCard";
import { UserRole } from "@/lib/api/types/auth";
import { ChildReservation, OwnerReservation, ReservationsData } from "@/lib/api/types/reservation";

interface Props {
  items: ReservationsData<OwnerReservation | ChildReservation>;
  role: UserRole;
}

export default function ReservationContent({ items, role }: Props) {
  return (
    <DateGroupedPaginatedSection
      items={items.reservations}
      totalPage={items.totalPages}
      getDate={item => item.reservationAt}
      render={item => <ReservationCard key={item.id} {...item} role={role} />}
    />
  );
}
