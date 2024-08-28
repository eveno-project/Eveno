import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUser } from "@services/user";
import { JWT } from "next-auth/jwt";
import { UserAuth } from "@interfaces/user";
import Route from "@enums/routes.enum";
import { INVALID_CREDENTIALS } from "@constants/message-schema";

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
		async jwt(params : {token: JWT; user: UserAuth | User} ) {
			if (params.user) {
				params.user = params.user as UserAuth;
				params.token.id = parseInt(params.user.id, 10)
				params.token.username = params.user.username
				params.token.email = params.user.email
				params.token.role = params.user.role.id
				params.token.adult = params.user.adult
				params.token.picture = params.user.image
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
				session.user.image = token.picture;
			}
			return session;
		},
	}
};
