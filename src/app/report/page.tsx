"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, FormHelperText, FormControl } from '@mui/material';
import { IssueSchema, IssueValues } from '@validators/issue.shema';

export default function IssueForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IssueValues>({
        resolver: zodResolver(IssueSchema),
        defaultValues: {
            title: '',
            body: '',
        },
    });

    const onSubmit = async (issueValues: IssueValues) => {
        try {
            const response = await fetch('/api/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(issueValues),
            });

            if (response.ok) {
                alert('Ticket créée avec succès');
            } else {
                console.error('Erreur lors de la création de l\'issue');
                alert('Une erreur est survenue lors de la création de l\'issue.');
            }
        } catch (error) {
            console.error('Une erreur est survenue:', error);
            alert('Une erreur est survenue lors de la création de l\'issue.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormControl fullWidth margin="normal" error={!!errors.title}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Titre"
                            variant="outlined"
                            fullWidth
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.body}>
                <Controller
                    name="body"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            error={!!errors.body}
                            helperText={errors.body?.message}
                        />
                    )}
                />
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
            >
                Créer un Ticket
            </Button>
            {errors && Object.keys(errors).length > 0 && (
                <Box sx={{ marginTop: '1rem', color: 'red' }}>
                    {Object.values(errors).map((error, index) => (
                        <FormHelperText key={index}>{error.message}</FormHelperText>
                    ))}
                </Box>
            )}
        </Box>
    );
}
