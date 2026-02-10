"use client";
import { MobileView } from "./component/MobileView";
import { DesktopView } from "./component/DesktopView";

export const Header = () => {
  /*
   * const isLoggedIn = !!user
   * 해당 코드는 추후 로그인 여부를 확인하는 코드입니다.
   * 현재는 login 상태를 false로 고정시켜놓은 상태입니다.
   * login 기능 연결 후 20번째줄은 수정해야합니다.
   */
  //
  const isLoggedIn = false;

  return (
    <>
      <div className="hidden md:block">
        <DesktopView isLoggedIn={isLoggedIn} />
      </div>
      <div className="block md:hidden">
        <MobileView isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
};
