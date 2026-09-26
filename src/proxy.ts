import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminTokenString } from "@/lib/auth/admin-guard";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValidSession = verifyAdminTokenString(sessionToken);

    // If visiting /admin/login while already authenticated with a valid session, go directly to dashboard
    if (pathname === "/admin/login") {
      if (isValidSession) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.next();
    }

    // For all other /admin routes (dashboard, registrations, etc.), require valid session
    if (!isValidSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
