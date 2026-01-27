import clsx from "clsx";

interface HeadingProps {
  title: string;
  addClassName?: string;
  children?: React.ReactNode;
}

export const Heading = ({ title, addClassName, children }: HeadingProps) => {
  return (
    <div className={clsx("flex gap-2 border-b border-gray-300 pb-2 md:pb-4", addClassName)}>
      <p className="text-md font-bold md:text-xl lg:text-2xl">{title}</p>
      {children}
    </div>
  );
};
