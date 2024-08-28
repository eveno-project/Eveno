import UsersTable from "@components/users/user-table";
import { Container } from "@mui/material";

export default async function Page() {
	return (
		<Container component="main" maxWidth="md">
			<UsersTable />
		</Container>
	);
}
