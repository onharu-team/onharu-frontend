"use client";

import { MobileView } from "./component/MobileView";
import { DesktopView } from "./component/DesktopView";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { data: user } = useAuth();

  console.log(user);

  const isLoggedIn = !!user?.success;

  return (
    <>
      <div className="tablet:block hidden">
        <DesktopView isLoggedIn={isLoggedIn} />
      </div>
      <div className="tablet:hidden block">
        <MobileView isLoggedIn={isLoggedIn} userName={user?.data?.name} />
      </div>
    </>
  );
};
