export default function formatDateTime(iso: string | Date) {
  const dateObj = new Date(iso);

  return {
    date: dateObj.toLocaleDateString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: dateObj.toLocaleTimeString("ko-KR", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
