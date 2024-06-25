import { Role } from "@constants/role";

export { default } from "next-auth/middleware";

// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	console.log('Middleware', req.nextUrl.pathname, session)

	if(req.nextUrl.pathname.startsWith('/admin') && !session) {
		console.log('Redirecting to /login');
		return NextResponse.redirect(new URL('/login', req.url));
	} else if (req.nextUrl.pathname.startsWith('/admin') && session?.role !== Role.ADMIN) {
		console.log('Redirecting to /');
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}
