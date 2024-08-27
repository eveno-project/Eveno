"use client";
import { useEffect } from "react";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import { Button, Box, FormControl, TextField, Checkbox, FormControlLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { EventValue, eventSchema } from "@validators/event.schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function EventForm({ event, tags, userId }: { event?: Event, tags: Tag[], userId: number }) {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        getValues
    } = useForm<EventValue>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            user: { id: userId },
            title: event?.title || '',
            description: event?.description || '',
            startDate: event?.startDate ? new Date(event.startDate) : new Date(),
            endDate: event?.endDate ? new Date(event.endDate) : new Date(),
            linkTicketing: event?.linkTicketing || '',
            adult: event?.adult || false,
            localizations: event?.localizations?.[0],
            tags: event?.tags.map(tag => ({ id: tag.id })) || [],
        }
    });

    const onSubmit = async (eventValue: EventValue) => {
        const method = event?.id ? 'PUT' : 'POST';
        const url = event?.id ? `/api/event/${event.id}` : '/api/event';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventValue),
        });
        if (response.ok) {
            const result = await response.json();
            router.push(`/event/${result.success.id}`);
        } else {
            console.error('Failed to submit');
        }
    };

    // useEffect(() => { console.log({ errors }) }, [errors]);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {event?.id && (
                <input type="hidden" name="id" value={event.id} />
            )}
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
            <FormControl fullWidth margin="normal" error={!!errors.description}>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                    )}
                />
            </FormControl>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <FormControl fullWidth margin="normal" error={!!errors.startDate}>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Date de départ"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.startDate}
                                helperText={errors.startDate?.message}
                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal" error={!!errors.endDate}>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Date de fin"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.endDate}
                                helperText={errors.endDate?.message}
                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            />
                        )}
                    />
                </FormControl>
            </Box>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="linkTicketing"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Lien billeterie"
                            variant="outlined"
                            fullWidth
                            error={!!errors.linkTicketing}
                            helperText={errors.linkTicketing?.message}
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Controller
                    name="adult"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Tout public ?"
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.localizations?.address || !!errors.localizations}>
                <Controller
                    name="localizations.address"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Adresse"
                            variant="outlined"
                            fullWidth
                            error={!!errors.localizations?.address || !!errors.localizations}
                            helperText={errors.localizations?.address?.message || errors.localizations?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.localizations?.city || !!errors.localizations}>
                <Controller
                    name="localizations.city"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Ville"
                            variant="outlined"
                            fullWidth
                            error={!!errors.localizations?.city || !!errors.localizations}
                            helperText={errors.localizations?.city?.message || errors.localizations?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.localizations?.zipCode || !!errors.localizations}>
                <Controller
                    name="localizations.zipCode"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Code postal"
                            type="number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.localizations?.zipCode || !!errors.localizations}
                            helperText={errors.localizations?.zipCode?.message || errors.localizations?.message}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.localizations?.regionName || !!errors.localizations}>
                <Controller
                    name="localizations.regionName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Région"
                            variant="outlined"
                            fullWidth
                            error={!!errors.localizations?.regionName || !!errors.localizations}
                            helperText={errors.localizations?.regionName?.message || errors.localizations?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.tags}>
                <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            multiple
                            value={field.value.map(tag => tag.id) || []}
                            onChange={(event) => {
                                const selectedValues = event.target.value as number[];
                                const selectedTags = selectedValues.map(id => ({ id }));
                                field.onChange(selectedTags);
                            }}
                            renderValue={(selected) => {
                                if (!selected || selected.length === 0) {
                                    return '';
                                }
                                return (selected as number[]).map(tagId => {
                                    const tag = tags.find(t => t.id === tagId);
                                    return tag ? tag.name : '';
                                }).join(', ');
                            }}
                        >
                            {tags.map(tag => (
                                <MenuItem key={tag.id} value={tag.id}>
                                    {tag.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors.tags && <FormHelperText>{errors.tags.message}</FormHelperText>}
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
            >
                {event?.id ? "Modifier l&apos;évènement" : "Créer un évènement"}
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
