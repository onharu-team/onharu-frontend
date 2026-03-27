export function DateDivider({ date }: { date: string }) {
  return (
    <div className="bg-border mx-auto my-6.5 flex max-h-7 w-50 items-center justify-center rounded-full sm:my-13.75 sm:h-10.25 sm:w-97.25">
      {date}
    </div>
  );
}
