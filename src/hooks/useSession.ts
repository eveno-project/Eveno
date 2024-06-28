import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export default function useSession() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		getSession().then((sessionData) => {
			setSession(sessionData as Session);
		});
	}, []);

	return session;
}
