"use client";

import UserSession from "@interfaces/sessionUser";
import { Avatar, Box, Button, Card, CardContent, Container, Paper, Typography } from "@mui/material";

import SessionUser from "@interfaces/sessionUser";
import { deepPurple } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";

export default function Profile({ user }: { user: UserSession }) {

	return (
		<Box component="section">
			<Paper component="article" elevation={0} sx={{ p: 2 }}>
				<Grid container spacing={4}>
					<Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Avatar
							sx={{ bgcolor: deepPurple[500], width: 120, height: 120, fontSize: '3rem' }}
							src={user?.image || undefined}
						>
							{user?.username?.charAt(0).toUpperCase()}
						</Avatar>
					</Grid>
					<Grid xs={12} md={5}>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{user?.username}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								{user?.email}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								{ user?.role === 2 ? "Rôle: Administrateur" : "Rôle: Utilisateur" }
							</Typography>
							<Box sx={{ mt: 3 }}>
								<Button variant="contained" color="primary" href="/profile/edit/password" >
									Modifier le mot de passe
								</Button>
							</Box>
						</CardContent>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
