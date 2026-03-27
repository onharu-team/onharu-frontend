export function MyMessage({ message, time }: { message: string; time: string }) {
  return (
    <div className="mb-3.75 flex justify-end gap-2.5">
      <div className="text-text-secondary self-end text-xs sm:text-sm">{time}</div>
      <div className="border-main bg-main max-w-50 rounded-l-[10px] rounded-br-[10px] border px-1.5 py-2.5 text-sm font-semibold wrap-break-word text-white sm:max-w-80 sm:px-3 sm:py-5 sm:text-base">
        {message}
      </div>
    </div>
  );
}
