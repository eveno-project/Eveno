"use client";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TagSchema, TagValues } from "@validators/tag.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Create } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import Tag from "@interfaces/tag";
import { setErrorMap, ZodIssue } from "zod";

export default function TagForm({ setTag }: { setTag: (Tag: Tag) => void }) {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting, isDirty, isValid},
    } = useForm<TagValues>({
        resolver: zodResolver(TagSchema),
        defaultValues: {
            name: ''
        }
    });
    const onSubmit = (tag: TagValues) => {
        const create = async () => {
            const response = await fetch('/api/tag', {
                method: 'POST',
                body: JSON.stringify(tag),
            });
            if (response.ok) {
                setTag((await response.json()).data as Tag);
                reset();
            } else if (response.status === 409) {
                const { message } = (await response.json()).error as { path: 'name', message: string};
                setError('name', { type: 'existing' , message });
            }
        }
        create();
    }
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
        }}>
            <FormControl margin="normal" error={!!errors.name}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Nom"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
            </FormControl>
            <Box>
                <LoadingButton
                    fullWidth
                    type="submit"
                    disabled={isSubmitting || !isDirty || !isValid}
                    endIcon={<Add />}
                    loading={isSubmitting}
                    loadingPosition="end"
                    variant="contained"
                >
                    <span>Créer</span>
                </LoadingButton>
            </Box>
        </Box>
    );
};
