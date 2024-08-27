"use client";
import { useRouter } from "next/navigation";
import Event from "@interfaces/event";
import { useState } from "react";
import { Button } from "@mui/material";

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
        <form onSubmit={handleDelete}>
            <input type="hidden" name="id" value={event.id} />
            <Button color="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Deleting...' : 'Supprimer l\'event'}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}
