"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/Button";
import { NavItems } from "./data";
import clsx from "clsx";
import { motion, LayoutGroup } from "framer-motion";
import { RiNotification3Line } from "@remixicon/react";

<<<<<<<< HEAD:components/layout/header/Header.tsx
========
/* NavItems pathname속성값들은 추후 상세페이지가 만들어진 후 경로 수정해야합니다. */

const NavItems = [
  {
    id: 1,
    pathname: "/charitystore",
    title: "나눔가게",
    requireAuth: false,
  },
  {
    id: 2,
    pathname: "/",
    title: "지도",
    requireAuth: false,
  },
  {
    id: 3,
    pathname: "",
    title: "채팅",
    requireAuth: true,
  },
];

>>>>>>>> dev:components/layout/Header.tsx
export const Header = () => {
  /*
   * const isLoggedIn = !!user
   * 해당 코드는 추후 로그인 여부를 확인하는 코드입니다.
   * 현재는 login 상태를 false로 고정시켜놓은 상태입니다.
   * login 기능 연결 후 20번째줄은 수정해야합니다.
   */
  //
  const isLoggedIn = false;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-white">
      <div className="wrapper m-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-24">
          <Link href={"/"}>
            <h1 className="bg-main-100 h-[60px] w-[138px]">로고</h1>
          </Link>
          <LayoutGroup>
            <nav>
              <ul className="flex gap-8">
                {NavItems.filter(items => !items.requireAuth || isLoggedIn).map(items => {
                  const isActive = pathname === items.pathname;
                  return (
                    <li key={items.id}>
                      <Link href={items.pathname} className="relative px-3">
                        <span
                          className={clsx(
                            "hover:text-main text-[18px] font-bold transition duration-90",
                            isActive && "text-main"
                          )}
                        >
                          {items.title}
                        </span>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ originX: 0.5 }}
                          className="bg-main absolute -bottom-[20px] h-[3px] w-full"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </LayoutGroup>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <>
              <button className="relative" onClick={() => router.push("")}>
                <RiNotification3Line size={28} />
                {/* 아래 span은 새로운 알림이 있을 경우 조건부 노출되도록 수정해야합니다. */}
                <span className="bg-main absolute -top-1 right-0 h-[12px] w-[12px] rounded-full"></span>
              </button>
              <Button
                varient="dark"
                width="sm"
                height="md"
                fontSize="md"
                onClick={() => router.push("/")}
              >
                마이페이지
              </Button>
              <Button
                varient="default"
                width="sm"
                height="md"
                fontSize="md"
                onClick={() => router.push("/")}
              >
                로그아웃
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <Button
              varient="default"
              width="sm"
              height="md"
              fontSize="md"
              onClick={() => router.push("/")}
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
