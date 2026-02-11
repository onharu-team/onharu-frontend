export async function GetStores(pageNum: number, perPage: number) {
  const res = await fetch(`/api/stores?pageNum=${pageNum}&perPage=${perPage}`);

  if (!res.ok) {
    throw new Error("가게 목록 조회 실패");
  }

  return res.json();
}
