import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://onharu-api.votex.co.kr:15080/api/stores?pageNum=1&perPage=4", {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
