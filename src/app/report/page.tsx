"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Box, FormControl, Container, Typography } from '@mui/material';
import { IssueSchema, IssueValues } from '@validators/issue.shema';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

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

            if (!response.ok) {
                console.error('Erreur lors de la création de l\'issue');
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error('Une erreur est survenue:', error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Typography variant='h6'>Reporter un incident</Typography>
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

                <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                >
                    Créer un Ticket
                </LoadingButton>
            </Box>
        </Container>
    );
}
