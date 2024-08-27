"use client";
import { useRouter } from "next/navigation";
import Event from "@interfaces/event";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Delete, Login } from "@mui/icons-material";

export default function EventFormDelete({ event }: { event: Event }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/event/${event.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push("/");
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to delete the event');
                setIsLoading(false);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleDelete}>
            <input type="hidden" name="id" value={event.id} />
            <LoadingButton
					fullWidth
					type="submit"
					disabled={isLoading}
					endIcon={<Delete />}
					loading={isLoading}
					loadingPosition="end"
					variant="contained"
                    color="error"
				>
					<span>Supprimer</span>
				</LoadingButton>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Box>
    );
}
