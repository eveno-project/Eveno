import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUser } from "@services/user";
import { JWT } from "next-auth/jwt";
import { UserAuth } from "@interfaces/user";

export const authOptions : NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {label: "Email", type: "text"},
				password: {label: "Password", type: "password"}
			},
			authorize: async (credentials): Promise<any> => {

				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await getUser(credentials.email);

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
	},
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: UserAuth }) {
			if (user) {
				user = user as UserAuth;
				token.id = parseInt(user.id, 10)
				token.username = user.username
				token.email = user.email
				token.role = user.roleId
				token.adult = user.adult
			}
			return token
		},
		async session({ session, token }) {

			if(session.user) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.username = token.username;
				session.user.email = token.email;
				session.user.adult = token.adult;
			}
			return session;
		},
	}
};
