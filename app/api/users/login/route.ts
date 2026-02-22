import { serverApiClient } from "@/lib/api/serverApiClient";
import { LoginResponse } from "@/lib/api/types/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await serverApiClient.post<LoginResponse>("/api/users/login", body);

  if (!result.ok) {
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
