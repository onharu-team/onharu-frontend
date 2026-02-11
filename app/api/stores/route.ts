// app/api/stores/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageNum = searchParams.get("pageNum") ?? "1";
  const perPage = searchParams.get("perPage") ?? "4";

  const res = await fetch(
    `http://onharu-api.votex.co.kr:15080/api/stores?pageNum=${pageNum}&perPage=${perPage}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
