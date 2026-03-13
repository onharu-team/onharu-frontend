"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useNotificationHistory } from "@/hooks/useNotificationsHistory";
import { useNotificationQuery } from "@/hooks/useNotification";
import NotificationItem from "./components/NotificationItem";
import GenericPagination from "@/components/feature/pagination/GenericPagination";
import { PageSection } from "../components/PageSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";

export default function NotificationsPage({ perPage = 6 }: { perPage?: number }) {
  const searchParams = useSearchParams();
  const pageNum = Number(searchParams.get("pageNum")) || 1;

  const { notification } = useNotificationQuery();
  const {
    notifications,
    totalPages,
    isLoading: isHistoriesLoading,
    hasUnread,
    markAllAsRead,
  } = useNotificationHistory({ pageNum, perPage });

  // 페이지 진입 시 읽지 않은 알림이 있으면 전체 읽음 처리
  useEffect(() => {
    if (hasUnread && !isHistoriesLoading) {
      markAllAsRead();
    }
  }, [hasUnread, isHistoriesLoading, markAllAsRead]);

  // 알림 설정 체크
  if (!notification || !notification.isSystemEnabled) {
    return (
      <PageSection title="알림 내역" className="bg-white">
        <div className="bg-secondary mt-6 rounded-[10px] py-8 text-center text-sm font-medium">
          알림이 꺼져 있습니다.
          <p>알림을 받으려면 알림 설정에서 켜주세요.</p>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection title="알림 내역" className={clsx(notifications.length !== 0 && "bg-white")}>
      {isHistoriesLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} height={80} className="mb-3 rounded-[10px]" />
          ))}
        </>
      ) : notifications.length === 0 ? (
        <div className="py-5 text-center text-sm font-medium">알림 내역이 없습니다.</div>
      ) : (
        <div className="divide-y">
          {notifications.map(item => (
            <NotificationItem
              key={item.id}
              title={item.title}
              message={item.message}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && <GenericPagination totalPages={totalPages} />}
    </PageSection>
  );
}
