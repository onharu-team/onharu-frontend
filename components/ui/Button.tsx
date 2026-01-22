interface ButtonProps {
  varient: "light" | "default" | "dark";
  fontSize: "sm" | "md" | "lg";
  width: "xs" | "sm" | "md" | "lg";
  height: "xs" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({ varient = "default", fontSize, width, height, children }: ButtonProps) => {
  return <></>;
};
