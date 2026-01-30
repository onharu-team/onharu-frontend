import clsx from "clsx";

interface PageSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PageSection({ title, children, className }: PageSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold sm:mb-8">{title}</h3>
      <div className={clsx("bg-secondary rounded-[10px]", className)}>{children}</div>
    </div>
  );
}
