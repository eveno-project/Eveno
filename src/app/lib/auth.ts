import { NextAuthOptions, User } from "next-auth";
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
					throw new Error('Email ou mot de passe incorrect');
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
		async jwt(params : {token: JWT; user: UserAuth | User} ) {
			if (params.user) {
				params.user = params.user as UserAuth;
				params.token.id = parseInt(params.user.id, 10)
				params.token.username = params.user.username
				params.token.email = params.user.email
				params.token.role = params.user.roleId
				params.token.adult = params.user.adult
			}
			return params.token
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
