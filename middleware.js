// middleware.js

import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("adminToken")?.value;

  const { pathname } = req.nextUrl;

  // Paths that should NOT require login
  const publicPaths = ["/", "/login"];

  // Allow access to public pages
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/login"],
};
