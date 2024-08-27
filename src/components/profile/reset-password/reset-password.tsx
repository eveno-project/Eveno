"use client";

import { Box, Button, Container, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SessionUser from "@interfaces/sessionUser";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function ResetPassword({ session }: { session: Session }) {

	const [user, setUser] = useState<SessionUser | null>(null);
	const [oldPassword, setOldPassword] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");

	const router = useRouter();

	useEffect(() => {
		const getUser = async () => {
			setUser(session.user);
		}
		getUser();

	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Les deux mots de passe doivent être identiques");
			return;
		}
		setError("");
		setSuccess("");

		try {
			const response = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user?.email,
					oldPassword,
					newPassword: password,
				}),
			});

			if(response.status === 200){
				setSuccess("Mot de passe mis à jour avec succès");
				setOldPassword("");
				setPassword("");
				setConfirmPassword("");
				router.push("/profile");
				return;
			} else {
				const responseBody = await response.json();
				setError(responseBody.message);

				return;
			}

		} catch (error) {
			setError("Une erreur s'est produite");
			return;
		}

	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Paper elevation={0} sx={{ padding: 4, marginTop: 8 }}>
				<Typography component="h1" variant="h5" align="center">
					Réinitialiser le mot de passe
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Ancien mot de passe"
						type="password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						autoComplete="new-password"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Nouveau mot de passe"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="new-password"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Confirmer le mot de passe"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						autoComplete="new-password"
					/>
					{error && (
						<Typography color="error" variant="body2">
							{error}
						</Typography>
					)}
					{success && (
						<Typography color="primary" variant="body2">
							{success}
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ mt: 3, mb: 2 }}
					>
						Réinitialiser le mot de passe
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}
