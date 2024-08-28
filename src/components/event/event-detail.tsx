'use client';

import Carousel from "@components/carousel/carousel";
import EventFormDelete from "@components/form/event-form-delete";
import EventFormFollow from "@components/form/event-form-follow";
import EventFormValidate from "@components/form/event-form-validate";
import { Box, Typography, Paper, Button, Toolbar, Chip } from "@mui/material";
import DateFormatter from "@services/date";
import Link from "next/link";
import CommentList from "./comment/list";
import { Session } from "next-auth";
import style from './event.module.css';
import Event from "@interfaces/event";
import { CloudRounded, Edit, EventAvailableRounded, EventBusyRounded, LocationOnRounded, NoAdultContentRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Role } from "@constants/role";
import { isUserSubscribed } from "@services/event";
import { EventDeleteDialog } from "@components/event/delete-dialog";

interface EventDetailProps {
    session: Session | null;
    event: Event;
}

export default function EventDetail({ session, event }: EventDetailProps) {
    const [isMyEvent, setIsMyEvent] = useState(false);
    const [canValid, setCanValid] = useState(false);
    const [canFollow, setCanFollow] = useState(false);
    const [follow, setFollow] = useState(false);
    useEffect(() => {
        if (event && session) {
            setIsMyEvent(event.user.id === session?.user.id);

            setCanValid(!!!event.isValid && session.user.role === Role.ADMIN);
            setCanFollow(!!event?.isValid);
            if ((session.user.role !== Role.ADMIN) && event.isValid === false && event.user.id !== session.user.id) {
                redirect('/');
            }
            if (session.user) {
                if (event.eventSubscribes) {
                    setFollow(isUserSubscribed(event.eventSubscribes, session.user.id));
                }
            }

        }
    }, [event, session])

    return (
        <Box component="article" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Toolbar component="section" sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {
                    canValid && (
                        <EventFormValidate event={event} />
                    )
                }
                {
                    isMyEvent && (
                        <Button type="button" variant="contained" color="secondary" href={`/event/${event.id}/edit`} endIcon={<Edit />}>Éditer</Button>
                    )
                }
                {
                    isMyEvent && (
                        <EventDeleteDialog event={event}/>
                    )
                }
            </Toolbar>
            <Box component="section" className={style.header}>
                <Box component="article">
                    {
                        event.images && event?.images?.length !== 0 && (
                            <Box component="section" className={style.carousel}>
                                <Carousel images={event.images} />
                            </Box>
                        )
                    }
                </Box>
                <Box component="article" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {
                        event.adult && (
                            <NoAdultContentRounded color="error" sx={{ alignSelf: 'center', marginTop: '3px' }} />
                        )
                    }
                    <Typography variant="h4" fontWeight="bold" >{event.title}</Typography>
                    <Box sx={{ flex: '1 1' }}></Box>
                    {
                        (event.linkTicketing != undefined) && (
                            <Button variant="contained" type="button" href={event.linkTicketing}>Reserver</Button>
                        )
                    }
                    {
                        canFollow && (
                            <EventFormFollow event={event} follow={follow} />
                        )
                    }
                </Box>
                <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2}}>
                    {
                        event.tags && event.tags.map((tag, index) => (
                           //chip component from material ui
                            <Chip key={index} label={tag.name} />
                        ))
                    }
                </Box>
            </Box>
            <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box component="article" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {
                            event && event.localizations && event.localizations?.length !== 0 && event.localizations[0].zipCode > 0 ? (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationOnRounded fontSize="small" />
                                        <Typography variant="h6">Lieu</Typography>
                                    </Box>
                                    <Box sx={{ margin: 0 }}>
                                        {
                                            event.localizations.map((localization, index) => (
                                                <Typography key={index} sx={{ display: 'flex', alignItems: 'center', marginLeft: 0.5 }}>
                                                    {localization.address}, {localization.city}, {localization.zipCode} {localization.regionName}
                                                </Typography>
                                            ))
                                        }
                                    </Box>
                                </>
                            ) : (
                                <Box component="article" sx={{ display: 'flex', alignItems: 'center', marginLeft: 0.5 }}>
                                    <CloudRounded width="14" />
                                    <Typography>
                                        En ligne
                                    </Typography>
                                </Box>
                            )
                        }
                    </Box>
                    <Box component="article" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="h6">Dates</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventAvailableRounded />
                            <Typography> Débute le {DateFormatter.complete(event.startDate)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EventBusyRounded />
                            <Typography> Termine le {DateFormatter.complete(event.endDate)}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box component="article" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6">Description</Typography>
                    <Typography>{event.description}</Typography>
                </Box>
            </Box>
            <Box component="section" className={style.body}>

            </Box>
            <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Commentaires</Typography>
                <Paper>
                    {
                        !!event.comments && (
                            <CommentList session={session} event={event} />
                        )
                    }
                </Paper>
            </Box>
        </Box>
    );
}
