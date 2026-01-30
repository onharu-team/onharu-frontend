import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  varient: "light" | "default" | "dark";
  fontSize: "sm" | "md" | "lg";
  width: "xs" | "sm" | "md" | "lg";
  height: "xs" | "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

const FontSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-md",
};

const HeightClasses = {
  xs: "h-[25px] rounded-sm",
  sm: "h-[35px] rounded-sm",
  md: "h-[45px] rounded-md",
  lg: "h-[50px] rounded-md",
};

const WidthClasses = {
  xs: "min-w-[90px]",
  sm: "min-w-[100px]",
  md: "min-w-[140px]",
  lg: "w-full min-w-0",
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
  type = "button",
  varient = "default",
  fontSize,
  width,
  height,
  children,
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={clsx(
          baseClasses,
          FontSizeClasses[fontSize],
          HeightClasses[height],
          WidthClasses[width],
          VarientClasses[varient],
          disabled && disabledClasses
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
