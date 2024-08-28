'use client';
import { Delete } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { TransitionProps } from "react-transition-group/Transition";
import Event from "@interfaces/event";
import EventFormDelete from "@components/form/event-form-delete";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function EventDeleteDialog({ event }: { event: Event }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	}
	const handleClose = () => {
		setOpen(false);
	};

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
				<DialogTitle>Supprimer l&apos;événement <span>{event.title}</span></DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Êtes-vous sûr de vouloir supprimer l&apos;événement {event.title} ? Cette action est irréversible.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<EventFormDelete event={event} />
					<Button onClick={handleClose}>Annuler</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
