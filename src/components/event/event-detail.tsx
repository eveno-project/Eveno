'use client';

import commentEvent from "@actions/event/comment";
import deleteEvent from "@actions/event/delete";
import followEvent from "@actions/event/follow";
import validateEvent from "@actions/event/validate";
import Carousel from "@components/carousel/carousel";
import EventFormComment from "@components/form/event-form-comment";
import EventFormDelete from "@components/form/event-form-delete";
import EventFormFollow from "@components/form/event-form-follow";
import EventFormValidate from "@components/form/event-form-validate";
import { Box, Typography, Paper, Button } from "@mui/material";
import DateFormatter from "@services/date";
import Link from "next/link";
import CommentList from "./comment/list";
import { Session } from "next-auth";
import style from './event.module.css';
import Event from "@interfaces/event";
import { CloudRounded, EventAvailableRounded, EventBusyRounded, LocationOnRounded, NoAdultContentRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import EventSubscribe from "@interfaces/EventSubscribe";
import { Role } from "@constants/role";
import { isUserSubscribed } from "@services/event";

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

            setCanValid(!!!event.isValid && session.user.role === Role.ADMIN
                && event.user.id !== session?.user.id
            );
            setCanFollow(!!event?.isValid);
            if ((session.user.role !== Role.ADMIN) && event.isValid === false) {
                redirect('/');
            }
            if (session.user) {
                if (event.eventSubscribes) {
                    setFollow(isUserSubscribed(event.eventSubscribes, session.user.id));
                }
            }

        }
    }, [event.eventSubscribes, event.isValid, event.user.id, session])

    return (
        <Box component="article" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                <Box component="article" sx={{ display: 'flex', alignItems: 'center' }}>
                    {
                        event.adult && (
                            <NoAdultContentRounded className={style.icon} />
                        )
                    }
                    <Typography variant="h4" fontWeight="bold" >{event.title}</Typography>
                    <Box sx={{ flex: '1 1' }}></Box>
                    {
                        (event.linkTicketing != undefined) && (
                            <Button variant="contained" type="button" href={event.linkTicketing}>Reserver</Button>
                        )
                    }
                </Box>
            </Box>
            <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box component="article" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {
                            event && event.localizations && event.localizations?.length !== 0 && event.localizations[0].zipCode > 0 ? (
                                <>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOnRounded width="8" />
                                        <Typography variant="h6">Addresse</Typography>
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
                <Box component="article">
                    <Typography variant="h6">Description</Typography>
                    <Typography>{event.description}</Typography>
                </Box>
            </Box>
            <Box component="section">
                {
                    canValid && (
                        <EventFormValidate event={event} />
                    )
                }
                {
                    isMyEvent && (
                        <Link href={`/event/${event.id}/edit`}>
                            <Button type="button" >modifier</Button>
                        </Link>
                    )
                }
                {
                    canFollow && (
                        <EventFormFollow action={followEvent} event={event} doYouFollow={follow} />
                    )
                }
                {
                    isMyEvent && (
                        <EventFormDelete action={deleteEvent} event={event} />
                    )
                }
            </Box>
            <Box component="section" className={style.body}>
                {
                    session && (
                        <EventFormComment event={event} />
                    )
                }
            </Box>
            <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Commentaires</Typography>
                <Paper>
                    {
                        !!event.comments && (
                            <CommentList comments={event.comments} />
                        )
                    }
                </Paper>
            </Box>
        </Box>
    );
}