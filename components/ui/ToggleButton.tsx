import clsx from "clsx";

interface ToggleButtonProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function ToggleButton({ checked, onChange, disabled = false }: ToggleButtonProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={clsx(
        "relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 sm:h-11 sm:w-24",
        checked ? "bg-main-400" : "bg-gray-300",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span
        className={clsx(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 sm:h-9 sm:w-9",
          checked ? "translate-x-7 sm:translate-x-14" : "translate-x-1 sm:translate-x-1"
        )}
      />
    </button>
  );
}
