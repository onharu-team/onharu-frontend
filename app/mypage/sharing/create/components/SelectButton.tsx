import clsx from "clsx";

export function SelectButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "border-border h-7.75 w-20 rounded-full border text-sm font-medium sm:text-base",
        selected ? "bg-main text-white" : "bg-white"
      )}
    >
      {label}
    </button>
  );
}
