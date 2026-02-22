"use client";

import { MobileView } from "./component/MobileView";
import { DesktopView } from "./component/DesktopView";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { data: user } = useAuth();

  const isLoggedIn = !!user?.success;

  return (
    <>
      <div className="hidden md:block">
        <DesktopView isLoggedIn={isLoggedIn} />
      </div>
      <div className="block md:hidden">
        <MobileView isLoggedIn={isLoggedIn} userName={user?.data?.name} />
      </div>
    </>
  );
};
