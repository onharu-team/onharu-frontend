"use client";

import Sidebar from "./components/Sidebar";
import Loading from "../Loading";
import { useAuthProfile } from "@/hooks/useAuth";

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  const { data: user } = useAuthProfile();

  if (!user || user.userType == null) {
    return <Loading />;
  }

  return (
    <section className="lg:mt-section-lg-top mb-section-sm-bottom lg:mb-section-lg-bottom">
      <div className="wrapper flex min-h-screen flex-col lg:flex-row">
        <Sidebar role={user.userType} />
        <main className="flex-1 py-4 sm:p-6">{children}</main>
      </div>
    </section>
  );
}
