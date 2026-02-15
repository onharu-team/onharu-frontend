import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = `http://onharu-api.votex.co.kr:15080/api/stores?${searchParams.toString()}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
