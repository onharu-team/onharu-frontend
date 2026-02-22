import { NextResponse } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";
import { LogoutResponse } from "@/lib/api/types/auth";

export async function POST() {
  const result = await serverApiClient.post<LogoutResponse>("/api/users/logout", undefined);

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

  response.cookies.set("JSESSIONID", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });

  return response;
}
