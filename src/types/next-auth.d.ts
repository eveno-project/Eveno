import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: number;
			username: string;
			email: string;
			role: number;
			adult: boolean;
		} & DefaultSession['user'];
	}

	interface User {
		id: number;
		username: string;
		email: string;
		roleId: number;
		adult: boolean;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: number;
		username: string;
		email: string;
		role: number;
		adult: boolean;
	}
}
