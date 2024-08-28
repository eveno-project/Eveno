'use client';
import User from "@interfaces/user";
import { Delete } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { TransitionProps } from "react-transition-group/Transition";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
	  children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
  ) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

export function UserDeleteDialog({ user, delete: deleteUser, isLoading }: { user: Pick<User, 'id' | 'email' | 'username'>, delete: (username: string) => Promise<void>, isLoading: boolean }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = () => {
		deleteUser(user.username);
	}
	return (
		<>
            <Button variant="contained" color="error" onClick={handleOpen} endIcon={<Delete />}>Supprimer</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>Supprimer le compte de <span>{user.email}</span></DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Êtes-vous sûr de vouloir supprimer le compte de {user.email} ? Cette action est irréversible.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
                <LoadingButton
                    color="error"
					disabled={isLoading}
					loading={isLoading}
                    endIcon={<Delete />}
					loadingPosition="end"
					variant="contained"
                    onClick={handleDelete}
				>
					<span>Supprimer</span>
				</LoadingButton>
					<Button disabled={isLoading} onClick={handleClose}>Annuler</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
