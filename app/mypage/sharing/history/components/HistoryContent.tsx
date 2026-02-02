"use client";

import { SharingHistoryItem } from "../types";
import FilteredTabSection from "@/components/feature/filtered-tab-section/FilteredTabSection";
import DateGroupedPaginatedSection from "@/components/feature/date-grouped-pagination/DateGroupedPaginatedSection";
import { OWNER_SHARING_HISTORY_TABS } from "../constants/historyTabs";
import HistoryCard from "./HistoryCard";

interface Props {
  items: SharingHistoryItem[];
}

export default function HistoryContent({ items }: Props) {
  return (
    <FilteredTabSection
      items={items}
      tabs={OWNER_SHARING_HISTORY_TABS}
      filterKey="status"
      render={filtered => (
        <DateGroupedPaginatedSection
          items={filtered}
          getDate={item => item.createdAt}
          emptyText="나눔 내역이 없습니다."
          render={item => <HistoryCard key={item.id} {...item} status={item.status} />}
        />
      )}
    />
  );
}
