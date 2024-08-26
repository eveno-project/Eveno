"use server";
import { Container } from "@mui/material";
import Profile from "@components/profile/profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";
import SessionUser from "@interfaces/sessionUser";

export default async function Page() {


	const session = await getServerSession(authOptions);

	const user = session?.user as SessionUser;


	if (!session) {
		redirect("/");
	}

	return (
		<Container
	  		component="main"
	  		maxWidth="md"
	  		sx={{
				overflow: 'hidden'
	  		}}
	>
	  <Profile user={user}/>
	</Container>
	)
}
