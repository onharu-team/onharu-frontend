import { serverApiClient } from "@/lib/api/serverApiClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.post("/api/users/login", body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: result.error.message,
      },
      {
        status: result.error.status,
      }
    );
  }

  const response = NextResponse.json(result.data);

  const setCookie = result.headers?.get("set-cookie");

  if (setCookie) {
    response.headers.append("Set-Cookie", setCookie);
  }

  return response;
}
