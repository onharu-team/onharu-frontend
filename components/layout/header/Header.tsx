"use client";

import { MobileView } from "./component/MobileView";
import { DesktopView } from "./component/DesktopView";
import { useAuthProfile } from "@/hooks/useAuth";

export const Header = () => {
  const { data: user } = useAuthProfile();

  const isLoggedIn = !!user;

  return (
    <>
      <div className="tablet:block hidden">
        <DesktopView isLoggedIn={isLoggedIn} />
      </div>
      <div className="block md:hidden">
        <MobileView isLoggedIn={isLoggedIn} userName={user?.name} />
      </div>
    </>
  );
};
