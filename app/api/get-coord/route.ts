import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return new Response(JSON.stringify({ error: "주소 없음" }), { status: 400 });
  }

  const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    }
  );

  const data = await res.json();

  if (!data.documents || data.documents.length === 0) {
    return new Response(JSON.stringify({ lat: null, lng: null }), { status: 200 });
  }

  const doc = data.documents[0];
  return new Response(
    JSON.stringify({
      lat: parseFloat(doc.y),
      lng: parseFloat(doc.x),
    }),
    { status: 200 }
  );
}
