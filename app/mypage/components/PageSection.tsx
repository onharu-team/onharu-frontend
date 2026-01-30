import clsx from "clsx";

interface PageSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PageSection({ title, children, className }: PageSectionProps) {
  return (
    <div>
      <h3 className="mb-8 text-lg font-bold">{title}</h3>
      <div className={clsx("bg-secondary rounded-[10px] p-8", className)}>{children}</div>
    </div>
  );
}
