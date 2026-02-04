export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mt-2.5 mb-1.75 text-sm font-medium sm:mt-5 sm:mb-3.75 sm:text-base">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.25 sm:gap-2.5">{children}</div>
    </div>
  );
}
