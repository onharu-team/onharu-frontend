"use client";

import { OwnerMyPage } from "./components/OwnerMyPage";
import { ChildMyPage } from "./components/ChildMyPage";
import { useAuthProfile } from "@/hooks/useAuth";

export default function MyPage() {
  const { data: user } = useAuthProfile();

  if (!user) return null;

  return user.userType === "OWNER" ? <OwnerMyPage user={user} /> : <ChildMyPage user={user} />;
}
