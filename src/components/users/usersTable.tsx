"use client";

import { useState, useEffect, SetStateAction } from 'react';
import User from "@interfaces/user";
import { getUsersByRole } from "@services/user";
import Button from "@components/button/button";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import styles from './UsersTable.module.css';

const UsersTable = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		// Fetch users from the API
		fetch('/api/users')
			.then(response => response.json())
			.then((data: User[]) => {
				setUsers(data);
			})
			.catch(error => {
				console.error('Error fetching users:', error);
			});
	}, []);

	const handleDelete = async (username: string) => {
		try {
			const res = await fetch(`/api/users/${username}`, { method: 'DELETE' });
			if (res.ok) {
				setUsers(users.filter(user => user.username !== username));
			} else {
				console.error('Failed to delete user');
			}
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Admin</h1>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.th}>ID</th>
						<th className={styles.th}>Username</th>
						<th className={styles.th}>Email</th>
						<th className={styles.th}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id} className={styles.tr}>
							<td className={styles.td}>{user.id}</td>
							<td className={styles.td}>{user.username}</td>
							<td className={styles.td}>{user.email}</td>
							<td className={styles.td}>
								<Button type={"button"} color="primary" onClick={() => handleDelete(user.username)}>
									<DeleteRoundedIcon />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export async function getServerSideProps() {
	const users = await getUsersByRole('user');
	return {
		props: {
			initialUsers: users,
		},
	};
}

export default UsersTable;
