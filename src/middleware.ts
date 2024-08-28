import { Role } from "@constants/role";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });
    const url = req.nextUrl.clone();

    if (url.pathname.startsWith("/admin")) {
      if (!token) {
          url.pathname = "/";
        return NextResponse.redirect(url);
      }

      if (token.role !== Role.ADMIN) {
          url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  }

export const config = { matcher: ["/admin/:path*"] };

