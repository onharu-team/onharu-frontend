"use client";

import ReservationCard from "../reservations/components/ReservationCard";
import { ChildReservationCardProps, OwnerReservationCardProps } from "../reservations/types";
import EmptyState from "@/components/ui/EmptyState";

interface ReservationCardListProps {
  title: string;
  items?: OwnerReservationCardProps[] | ChildReservationCardProps[];
  emptyTitle?: string;
  emptySubtitle?: string;
  emptyButtonText?: string;
  emptyLink?: string;
}

export default function CardList({
  title,
  items = [],
  emptyTitle,
  emptySubtitle,
  emptyButtonText,
  emptyLink,
}: ReservationCardListProps) {
  const hasItems = items.length > 0;

  return (
    <div>
      <div className="mb-4 text-base font-bold sm:mb-8 sm:text-lg">{title}</div>

      {!hasItems ? (
        <>
          {emptyTitle && (
            <EmptyState
              title={emptyTitle}
              subtitle={emptySubtitle}
              buttonText={emptyButtonText}
              buttonLink={emptyLink}
              className="flex flex-col items-center gap-4 bg-white py-10 text-center"
            />
          )}
        </>
      ) : (
        <ul>
          {items.map(item => (
            <ReservationCard key={item.id} {...item} className="bg-white" />
          ))}
        </ul>
      )}
    </div>
  );
}
