import clsx from "clsx";

export const OperatingBedge = ({ status }: { status: "open" | "close" }) => {
  return (
    <span className={clsx("shrink-0 text-xs", status === "open" ? "text-main" : "text-danger")}>
      {status === "open" ? "영업중" : "영업종료"}
    </span>
  );
};
