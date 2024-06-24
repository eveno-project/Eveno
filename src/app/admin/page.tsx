import UsersTable from "@components/users/usersTable";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";
import { Role } from "@constants/role";
import { redirect } from "next/navigation";

export default async function AdminPage() {

	const session = await getServerSession(authOptions);
	if(session?.user.role !== Role.ADMIN) {
		redirect("/");
	}

	return (
		<div>
			<UsersTable/>
		</div>
	);
}
