"use client";

import { userMe } from "@/lib/api/auth";
import { MeResponse } from "@/lib/api/types/auth";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  return useQuery<MeResponse | null>({
    queryKey: ["auth"],
    queryFn: userMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
