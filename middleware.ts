import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 로그인 필요 페이지
const protectedRoutes = ["/mypage", "/reservation", "/chat"];

// 로그인 상태에서 접근하면 안되는 페이지
const publicOnlyRoutes = ["/login", "/signup", "/find-id", "/find-password", "/oauth-signup"];

export default function middleware(req: NextRequest) {
  const isLoggedIn = !!req.cookies.get("JSESSIONID");
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  const isPublicOnlyRoute = publicOnlyRoutes.some(route => pathname.startsWith(route));

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isPublicOnlyRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/mypage/:path*",
    "/reservation",
    "/chat",
    "/login",
    "/signup/:path*",
    "/find-id",
    "/find-password",
    "/oauth-signup/:path*",
  ],
};
