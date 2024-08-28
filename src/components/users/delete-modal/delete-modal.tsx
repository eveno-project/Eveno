"use client";
import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Close } from '@mui/icons-material';

import UserSession from "@interfaces/sessionUser";
import { signOut } from "next-auth/react";
import { PASSWORD_REQUIRED, REPORT, USER_DELETE_ERROR_ACCOUNT, USER_DELETE_ERROR_PASSWORD, USER_ERROR_NOT_FOUND } from '@constants/message-schema';

export default function DeleteAccountModal({ user }: { user: UserSession }) {
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setPassword('');
		setError('');
	};

	const handleDelete = async () => {
		if (password === '') {
			setError(PASSWORD_REQUIRED);
			return;
		}

		try {
			const response = await fetch('/api/user/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password, email: user.email }),
			});

			if (response.ok) {
				handleClose();
				await signOut({
					redirect: true,
					callbackUrl: '/',
				});

			} else {
				setError(USER_DELETE_ERROR_PASSWORD);
			}
		} catch (error) {
			setError(USER_DELETE_ERROR_ACCOUNT + REPORT);
		}
	};

	return (
		<>
			<Button variant="contained" color="error" onClick={handleOpen} startIcon={<DeleteIcon />}>
				Supprimer le compte
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="delete-account-modal-title"
				aria-describedby="delete-account-modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Typography id="delete-account-modal-title" variant="h6" component="h2">
							Supprimer le compte
						</Typography>
						<IconButton onClick={handleClose}>
							<Close />
						</IconButton>
					</Box>
					<Typography id="delete-account-modal-description" sx={{ mt: 2 }}>
						Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
						Veuillez entrer votre mot de passe pour confirmer.
					</Typography>
					<TextField
						fullWidth
						label="Mot de passe"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={!!error}
						helperText={error}
						sx={{ mt: 3 }}
					/>
					<Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
						<Button variant="contained" color="primary" onClick={handleDelete}>
							Confirmer
						</Button>
						<Button variant="outlined" color="secondary" onClick={handleClose}>
							Annuler
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
}
