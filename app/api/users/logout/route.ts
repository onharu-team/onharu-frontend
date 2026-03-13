import { NextResponse } from "next/server";
import { serverApiClient } from "@/lib/api/serverApiClient";

export async function POST() {
  const result = await serverApiClient.post("/api/users/logout");

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

  const cookiesToDelete = ["JSESSIONID", "userType", "storeId"];
  cookiesToDelete.forEach(cookie => response.cookies.set(cookie, "", { path: "/", maxAge: 0 }));

  return response;
}
