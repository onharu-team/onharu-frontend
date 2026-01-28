"use client";

import { RiKakaoTalkFill } from "@remixicon/react";
import clsx from "clsx";

type KakaoLoginButtonProps = {
  className?: string;
};

export default function KakaoLoginButton({ className }: KakaoLoginButtonProps) {
  return (
    <div className={clsx("flex flex-col items-center gap-5", className)}>
      <h3 className="text-4 text-text-secondary text-center font-medium">간편 로그인</h3>
      <button
        type="button"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#FFD900] p-2.5 shadow-md hover:brightness-95 active:brightness-90"
      >
        <RiKakaoTalkFill size={30} />
      </button>
    </div>
  );
}
