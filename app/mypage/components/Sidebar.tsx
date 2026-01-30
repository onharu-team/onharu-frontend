"use client";

import { useState, useEffect, useRef } from "react";
import { RiArrowDownSLine, RiArrowRightSLine, RiCloseLine, RiMenuLine } from "@remixicon/react";
import { ownerMenu, childMenu } from "../menuConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar({ role }: { role: "owner" | "child" }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const menu = role === "owner" ? ownerMenu : childMenu;
  const pathname = usePathname();

  // 모바일 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-white lg:w-115 lg:border-b-0 lg:bg-transparent">
      {/* 모바일 헤더 */}
      <div className="flex items-center justify-between py-4 sm:p-4 lg:hidden">
        <h2 className="text-base font-bold sm:text-xl">마이페이지</h2>
        <button onClick={() => setMobileMenuOpen(prev => !prev)}>
          {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
      </div>

      {/* 메뉴 컨테이너 */}
      <div
        ref={mobileMenuRef}
        className={clsx(
          "transition-max-height overflow-hidden duration-300 ease-in-out lg:block",
          mobileMenuOpen ? "max-h-500" : "max-h-0",
          "lg:max-h-full lg:min-w-70 lg:p-6"
        )}
      >
        {/* PC 헤더 */}
        <h2 className="mb-15.75 hidden text-2xl font-bold lg:block">마이페이지</h2>

        {menu.map(section => {
          const isOpen = openSection === section.title;
          const Icon = section.icon;

          return (
            <div
              key={section.title}
              className="mb-4 overflow-hidden rounded border lg:mx-0 lg:mb-8 lg:border-0"
            >
              <button
                className="hover:bg-main-100 lg:text-md flex w-full items-center justify-between p-3 text-base font-bold lg:mb-3 lg:p-0 lg:hover:bg-transparent"
                onClick={() => setOpenSection(isOpen ? null : section.title)}
              >
                <span className="flex items-center gap-2">
                  <Icon size={23} />
                  <span className="lg:hidden">{section.title}</span>
                  <span className="hidden lg:inline">{section.title}</span>
                </span>
                <RiArrowDownSLine
                  size={20}
                  className={clsx(
                    "transition-transform duration-300 lg:hidden",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              <ul
                className={clsx(
                  "bg-main-50 transition-max-height flex flex-col overflow-hidden duration-300 ease-in-out lg:flex lg:flex-col lg:overflow-visible lg:bg-transparent",
                  isOpen ? "max-h-125 lg:max-h-full" : "max-h-0 lg:max-h-full"
                )}
              >
                {section.items.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <li
                        className={clsx(
                          "hover:bg-main-100 ml-6 p-2 font-bold lg:ml-8.25 lg:flex lg:items-center lg:justify-between lg:border-b lg:p-4",
                          isActive ? "bg-main-200 text-main" : "text-text-secondary"
                        )}
                      >
                        {item.label}
                        <RiArrowRightSLine
                          size={24}
                          className={clsx(
                            isActive ? "text-main" : "text-text-secondary",
                            "hidden lg:inline"
                          )}
                        />
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
