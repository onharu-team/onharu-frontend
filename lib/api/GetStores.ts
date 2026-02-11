export async function GetStores() {
  const res = await fetch("/api/stores");

  if (!res.ok) {
    throw new Error("가게 목록 조회 실패");
  }

  return res.json();
}
