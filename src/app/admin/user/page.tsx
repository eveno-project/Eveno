import UsersTable from "@components/users/user-table";
import User from "@interfaces/user";
import { Container } from "@mui/material";


type UserDisplay = Pick<User, 'id' | 'username' | 'email'>;

export default async function Page() {
	let users: UserDisplay[] = [];
	const response = await fetch('/api/user');
	if (response.ok) {
		const data = (await response.json()) as UserDisplay[];
		users = [...data] as UserDisplay[];
	} else {
		console.error('erreur');
	}
	const handleDelete = async (username: string) => {
		try {
			const result = await fetch(`/api/user/${username}`, { method: 'DELETE' });
			if (result.ok) {
				users = [...users.filter(user => user.username !== username)];
			} else {
				console.error('Failed to delete user');
			}
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};
	return (
		<Container component="main" maxWidth="md">
			<UsersTable users={users} handleDelete={handleDelete} />
		</Container>
	);
}
