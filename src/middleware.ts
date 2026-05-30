import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    const pathname = req.nextUrl.pathname;

    // EMPLOYEE không được vào employees
    if (
      token?.role === "EMPLOYEE" &&
      pathname.startsWith("/employees")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    /*
      Protect tất cả route
      TRỪ:
      - api auth
      - login
      - next static
      - favicon
    */
    "/((?!api/auth|login|_next/static|_next/image|favicon.ico).*)",
  ],
};