import clsx from "clsx";

interface ButtonProps {
  disabled?: boolean;
  varient: "light" | "default" | "dark";
  fontSize: "sm" | "md" | "lg";
  width: "xs" | "sm" | "md" | "lg";
  height: "xs" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const FontSizeClasses = {
  sm: "text-[14px]",
  md: "text-[16px]",
  lg: "text-[18px]",
};

const HeightClasses = {
  xs: "h-[25px] rounded-[5px]",
  sm: "h-[35px] rounded-[5px]",
  md: "h-[45px] rounded-[10px]",
  lg: "h-[50px] rounded-[10px]",
};

const WidthClasses = {
  xs: "min-w-[90px]",
  sm: "min-w-[100px]",
  md: "min-w-[140px]",
  lg: "min-w-[100%]",
};

const VarientClasses = {
  light: "bg-main-400 text-gray-900 hover:bg-main-500",
  default: "bg-main text-white hover:bg-main-hover",
  dark: "bg-main-active text-white hover:bg-main",
};

const baseClasses =
  "flex items-center justify-center font-medium px-2 transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[-1px_3px_3px_0_rgba(80,80,80,0.3)] active:scale-97 disabled:pointer-events-none";

const disabledClasses = "!bg-main-300 !text-gray-50 cursor-not-allowed";

export const Button = ({
  varient = "default",
  fontSize,
  width,
  height,
  children,
  disabled = true,
}: ButtonProps) => {
  return (
    <>
      <button
        disabled={disabled}
        className={clsx(
          baseClasses,
          FontSizeClasses[fontSize],
          HeightClasses[height],
          WidthClasses[width],
          VarientClasses[varient],
          disabled && disabledClasses
        )}
      >
        {children}
      </button>
    </>
  );
};
