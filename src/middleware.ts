import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");
  const pathname = request.nextUrl.pathname;
  if (
    sessionToken &&
    pathname !== "/home" &&
    !pathname.includes("/room-call")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (
    !sessionToken &&
    (pathname === "/home" || pathname.includes("/room-call"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next|static|.*\\.(?:png|jpg|jpeg|svg|webp|mp3|ico|woff2?|ttf|eot)).*)",
  ],
};
