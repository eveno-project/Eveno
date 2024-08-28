"use client";
import { useState, useEffect } from 'react';
import User from "@interfaces/user";
import { getUsersByRole } from "@services/user";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Role } from '@constants/role';
import { UserDeleteDialog } from './admin/delete-dialog';

type UserDisplay = Pick<User, 'id' | 'username' | 'email'>;

export default function UsersTable() {
	const [users, setUsers] = useState<UserDisplay[]>([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const get = async () => {
			const response = await fetch('/api/user');
			if (response.ok) {
				const data = (await response.json()) as UserDisplay[];
				setUsers(data);
			} else {
				console.error('erreur');
			}
		}
		get();
	}, []);

	const handleDelete = async (username: string) => {
		try {
			setLoading(true);
			const res = await fetch(`/api/user/${username}`, { method: 'DELETE' });
			if (res.ok) {
				setUsers(users.filter(user => user.username !== username));
			} else {
				console.error('Failed to delete user');
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error('Error deleting user:', error);
		}
	};

	return (
		<Box component="section">
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell align="right">Nom d&apos;utilisateur</TableCell>
							<TableCell align="right">Courriel</TableCell>
							<TableCell align="right">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							users.map((user) => (
								<TableRow
									key={user.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{user.id}
									</TableCell>
									<TableCell align="right">{user.username}</TableCell>
									<TableCell align="right">{user.email}</TableCell>
									<TableCell align="right">
										<UserDeleteDialog
											user={user}
											delete={handleDelete}
											isLoading={isLoading}
										/>
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export async function getServerSideProps() {
	const users = await getUsersByRole(Role.USER);
	return {
		props: {
			initialUsers: users,
		},
	};
}
