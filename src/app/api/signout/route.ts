// app/api/signout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@common/app/lib/auth';

export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	console.log(session);

	if (session) {
		// Supprimer le cookie de session
		return NextResponse.json({ message: 'Signed out successfully' }, {
			status: 200,
			headers: {
				'Set-Cookie': `next-auth.session-token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
			},
		});
	} else {
		return NextResponse.json({ error: 'No active session' }, { status: 400 });
	}
}
