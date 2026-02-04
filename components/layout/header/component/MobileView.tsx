import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { NavItems } from "../data";
import { RiMenu3Line, RiNotification3Line, RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const MobileView = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-100 border-b border-b-gray-200 bg-white">
      <div className="wrapper relative">
        <h1 className="bg-main-200 m-auto h-12.5 w-20">로고</h1>
        <button className="absolute top-3 right-3" onClick={() => setOpen(true)}>
          <RiMenu3Line />
        </button>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-100 bg-black opacity-6",
          !open && "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "fixed top-0 right-0 z-101 h-full w-[60vw] min-w-[320px] border-l bg-white duration-200",
          !open && "translate-x-100"
        )}
      >
        <div className="relative h-12.5">
          {isLoggedIn && (
            <button className="absolute top-3.5 right-11" onClick={() => router.push("")}>
              <span className="relative">
                <RiNotification3Line size={20} />
                <span className="bg-main absolute top-0 right-0 h-2 w-2 rounded-full" />
              </span>
            </button>
          )}

          <button
            className="absolute top-3 right-3"
            onClick={() => {
              setOpen(false);
            }}
          >
            <RiCloseLine />
          </button>
        </div>
        <div className="relative mt-5 px-5">
          {isLoggedIn && (
            <div className="bg-main-100 rounded-md p-3">
              환영합니다 :)
              <br />
              <span className="text-md font-bold">피카츄</span> 님
            </div>
          )}

          <nav className="mt-5">
            <ul>
              {NavItems.filter(items => !items.requireAuth || isLoggedIn).map(items => {
                const isActive = pathname === items.pathname;
                return (
                  <button
                    key={items.id}
                    className="relative block w-full cursor-pointer text-left"
                    onClick={() => {
                      router.push(items.pathname);
                      setOpen(false);
                    }}
                  >
                    <li className={cn("border-b py-4", isActive && "text-main font-bold")}>
                      {items.title}
                    </li>
                  </button>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-12.5 flex gap-3 px-4">
          {isLoggedIn && (
            <>
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
