import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUser } from "@services/user";
import { JWT } from "next-auth/jwt";
import { UserAuth } from "@interfaces/user";
import Route from "@enums/routes.enum";
import { INVALID_CREDENTIALS } from "@constants/message-schema";
import { AdapterUser } from "next-auth/adapters";

export const authOptions : NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {label: "email", type: "text"},
				password: {label: "password", type: "password"}
			},
			authorize: async (credentials): Promise<any> => {

				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await getUser(credentials.email);

				if (!user) {
					throw new Error(INVALID_CREDENTIALS);
				}

				if (user && credentials?.password) {
					const isValid = await compare(credentials.password, user.password);
					if (isValid) {
						const {password, ...result} = user;
						return result;
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
		signIn: Route.LOGIN,
	},
	callbacks: {
		async jwt({ token, user }: { token: JWT; user?: UserAuth | User | AdapterUser | undefined }) {
			if (user) {
				const userAuth = user as UserAuth;
				token.id = parseInt(userAuth.id, 10);
				token.username = userAuth.username;
				token.email = userAuth.email;
				token.role = userAuth.role.id;
				token.adult = userAuth.adult;
				token.picture = userAuth.image;
			}
			return token;
		},
		async session({ session, token }) {

			if(session.user) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.username = token.username;
				session.user.email = token.email;
				session.user.adult = token.adult;
				session.user.image = token.picture;
			}
			return session;
		},
	}
};
