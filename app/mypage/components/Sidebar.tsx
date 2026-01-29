"use client";

import { RiArrowRightSLine } from "@remixicon/react";
import { ownerMenu, childMenu } from "../menuConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ role }: { role: "owner" | "child" }) {
  const menu = role === "owner" ? ownerMenu : childMenu;
  const pathname = usePathname();

  return (
    <aside className="w-115 p-6">
      <h2 className="mb-15.75 text-2xl font-bold">마이페이지</h2>

      {menu.map(section => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="mb-8">
            <div className="mb-3 flex items-center gap-2.5">
              <Icon size={23} />
              <h3 className="text-md font-bold">{section.title}</h3>
            </div>

            <ul>
              {section.items.map(item => {
                const isActive = pathname === item.href;
                const liClasses = `
                  ml-8.25 flex items-center justify-between border-b p-3 text-base font-bold hover:bg-main-100
                  ${isActive ? "bg-main-200 text-main" : "text-text-secondary"}
                `;
                const arrowClass = isActive ? "text-main" : "text-text-secondary";

                return (
                  <Link key={item.href} href={item.href}>
                    <li className={liClasses}>
                      {item.label}
                      <RiArrowRightSLine size={24} className={arrowClass} />
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}
