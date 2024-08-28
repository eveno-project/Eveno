"use client";
import { useState, useEffect } from 'react';
import User from "@interfaces/user";
import { getUsersByRole } from "@services/user";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Role } from '@constants/role';
import { UserDeleteDialog } from './admin/delete-dialog';


export default function UsersTable({ users, handleDelete }: { users: Pick<User, 'id' | 'username' | 'email'>[], handleDelete: (username: string) => Promise<void>}) {
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
