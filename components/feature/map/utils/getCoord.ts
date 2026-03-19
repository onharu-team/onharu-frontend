export type Coord = { lat: number; lng: number } | null;

export async function getCoord(address: string): Promise<Coord> {
  if (!address) return null;

  try {
    const res = await fetch(`/api/get-coord?address=${encodeURIComponent(address)}`);
    const data = await res.json();

    if (data.lat && data.lng) {
      return { lat: data.lat, lng: data.lng };
    }
    return null;
  } catch (error) {
    console.error("좌표 변환 실패:", error);
    return null;
  }
}
