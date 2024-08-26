"use server";
import { Container } from "@mui/material";
import ResetPassword from "@components/profile/reset-password/reset-password";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {

	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/");
	}

	return (
		<Container component="main" maxWidth="xs">
			<ResetPassword  session={session}/>
		</Container>
		);
};
