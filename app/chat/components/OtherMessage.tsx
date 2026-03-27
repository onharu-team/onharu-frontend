import Image from "next/image";

export function OtherMessage({ message, time }: { message: string; time: string }) {
  return (
    <div className="mb-3.75 flex items-start gap-2.5">
      <div className="relative h-7.5 w-7.5 sm:h-15 sm:w-15">
        <Image
          src="/image/page/default-profile.svg"
          alt="프로필 기본 이미지"
          fill
          className="object-contain"
        />
      </div>
      <div className="max-w-50 rounded-r-[10px] rounded-bl-[10px] border px-1.5 py-2.5 text-sm font-semibold wrap-break-word sm:max-w-80 sm:px-3 sm:py-5 sm:text-base">
        {message}
      </div>
      <div className="text-text-secondary self-end text-xs sm:text-sm">{time}</div>
    </div>
  );
}
