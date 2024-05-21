import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import prisma from "./../../../utils/db";


export const AuthOptions : NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {label: "Email", type: "text"},
				password: {label: "Password", type: "password"}
			},
			authorize: async (credentials): Promise<any> => {
				if (!credentials) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				
				if (!user) {
					throw new Error('No user found');
				}

				if (user && credentials?.password) {
					// Vérification du mot de passe
					const isValid = await compare(credentials.password, user.password);
					if (isValid) {
						return user;
					}
				}

				return null;

			}
		})
	],
	pages: {
		signIn: '/login',

	}
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
