import { NextResponse } from "next/server";

export function middleware(req) {
  const isAuthenticated = req.cookies.has("auth_token"); // Check cookie
  console.log("isAuthenticated", isAuthenticated);
  const protectedRoutes = ["/profile", "/canvas"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/canvas/:path*"], // Protected routes
};
