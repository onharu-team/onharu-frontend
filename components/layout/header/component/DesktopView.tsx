"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { NavItems } from "../data";
import { Alert } from "./Alert";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useLogout";

export const DesktopView = ({
  isLoggedIn,
  unreadCount,
}: {
  isLoggedIn: boolean;
  unreadCount: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: logout } = useLogout();

  return (
    <header className="max-h-20 border border-b-gray-200 bg-white">
      <div className="wrapper m-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-24">
          <Link href={"/"}>
            <h1 className="relative h-[80px] w-[150px]">
              <Image src={"/image/icon/logo.svg"} fill alt="" style={{ objectFit: "contain" }} />
            </h1>
          </Link>
          <LayoutGroup>
            <nav className="shrink-0">
              <ul className="flex gap-6">
                {NavItems.filter(items => !items.requireAuth || isLoggedIn).map(items => {
                  const isActive = pathname.includes(items.pathname);
                  const isChat = items.pathname === "/chat";
                  return (
                    <li key={items.id}>
                      <Link href={items.pathname} className="relative px-3">
                        <span
                          className={cn(
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
                          className="bg-main absolute -bottom-[30px] h-[3px] w-full"
                        />
                        {isChat && unreadCount > 0 && (
                          <span className="bg-main absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </LayoutGroup>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <>
              <Alert
                buttonClass="relative"
                iconSize={28}
                alertClass="-top-1 right-0 h-[12px] w-[12px]"
              />
              <Button
                varient="dark"
                width="sm"
                height="md"
                fontSize="md"
                onClick={() => router.push("/mypage")}
              >
                마이페이지
              </Button>
              <Button
                varient="default"
                width="sm"
                height="md"
                fontSize="md"
                onClick={() => logout()}
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
              onClick={() => router.push("/login")}
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
