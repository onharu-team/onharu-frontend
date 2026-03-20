import { OwnerMyPage } from "./components/OwnerMyPage";
import { ChildMyPage } from "./components/ChildMyPage";
import { cookies } from "next/headers";
import { UserRole } from "@/lib/api/types/auth";

export default async function MyPage() {
  const cookieStore = await cookies();
  const userType = cookieStore.get("userType")?.value as UserRole;

  return userType === "OWNER" ? <OwnerMyPage /> : <ChildMyPage />;
}
