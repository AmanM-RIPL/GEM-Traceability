import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC = new Set(["/login", "/register"]);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(pathname, "middleware");

  if (PUBLIC.has(pathname)) {
    return NextResponse.next();
  }
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
    matcher:["/((?!api|_next/static|_next/image|favicon.ico|main/login).*)"]
    //  matcher: ["/main((?!/login).*)"],
//   matcher: ["/dashboard/:path*", "/login", "/register"],
};
