import UsersTable from "@components/users/usersTable";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { Role } from "@constants/role";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";

export default async function Page() {

	const session = await getServerSession(authOptions);
	if (session?.user.role !== Role.ADMIN) {
		redirect("/");
	}

	return (
		<Container maxWidth="md">
			<UsersTable />
		</Container>
	);
}
