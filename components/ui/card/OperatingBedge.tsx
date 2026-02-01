import clsx from "clsx";

export const OperatingBedge = ({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const status = nowMinutes >= openMinutes || nowMinutes < closeMinutes ? "영업중" : "영업종료";

  // 자정 안 넘김
  if (openMinutes < closeMinutes) {
    const status = nowMinutes >= openMinutes && nowMinutes < closeMinutes ? "영업중" : "영업종료";
    return (
      <span className={clsx("shrink-0 text-xs", status === "영업중" ? "text-main" : "text-danger")}>
        {status}
      </span>
    );
  }

  return (
    <span className={clsx("shrink-0 text-xs", status === "영업중" ? "text-main" : "text-danger")}>
      {status}
    </span>
  );
};
