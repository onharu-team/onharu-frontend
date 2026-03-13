"use client";

import { ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TabFilter from "@/components/ui/TabFilter";

export interface TabItem {
  label: string;
  value: string;
}

interface Props {
  tabs: TabItem[];
  children: ReactNode;
  defaultValue?: string;
  filterKey?: string;
}

export default function FilteredTabSection({
  tabs,
  children,
  defaultValue = "ALL",
  filterKey = "statusFilter",
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const active = searchParams.get(filterKey) ?? defaultValue;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(filterKey, value);

    params.set("pageNum", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <TabFilter tabs={tabs} status={active} setStatus={handleChange} />
      {children}
    </>
  );
}
