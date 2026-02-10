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

export const DesktopView = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="border border-b-gray-200 bg-white">
      <div className="wrapper m-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-24">
          <Link href={"/"}>
            <h1 className="relative h-[80px] w-[150px]">
              <Image src={"/image/icon/logo.svg"} fill alt="" style={{ objectFit: "contain" }} />
            </h1>
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
