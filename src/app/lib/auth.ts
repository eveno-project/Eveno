import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@common/utils/db";
import { compare } from "bcryptjs";

export const authOptions : NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {label: "Email", type: "text"},
				password: {label: "Password", type: "password"}
			},
			authorize: async (credentials): Promise<any> => {
				console.log("Connexion ?");

				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					throw new Error('No user found');
				}

				if (user && credentials?.password) {
					const isValid = await compare(credentials.password, user.password);
					if (isValid) {
						return user;
					}
				}

				return null;

			}
		})
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',

	}
};
