import { redirect } from "next/navigation";

import { Container } from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import validateEvent from "@actions/event/validate";
import followEvent from "@actions/event/follow";
import NoAdultContentRoundedIcon from '@mui/icons-material/NoAdultContentRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import Link from '@components/link/link';
import { getById } from "@services/event";
import Carousel from "@components/carousel/carousel";
import { Color } from "@constants/color";
import DateFormatter from "@services/date";
import style from "./page.module.css";
import Button from "@components/button/button";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { Role } from "@constants/role";
import EventFormValidate from "@components/form/event-form-validate";
import EventFormFollow from "@components/form/event-form-follow";
import EventSubscribe from "@interfaces/EventSubscribe";

function isUserSubscribed(eventSubscribes: EventSubscribe[], userId: number): boolean {
    return eventSubscribes.some(subscribe => subscribe.userId === userId);
}

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById(params.id);
    const session = await getServerSession(authOptions);
    console.log(event.eventSubscribes);

    let myEvent = false;
    let canValide = false;
    let canFollow = false;
    let follow = false;

    if (session) {
        if (event && (event.user.id === session?.user.id)) {
            myEvent = true;
        }
        if (
            event
            && event.isValid === false
            && (session.user.role === Role.ADMIN)
        ) {
            canValide = true;
        }

        if ((session.user.role !== Role.ADMIN || event.user.id !== session?.user.id) && event.isValid === false) {
            redirect('/');
        }
        if (
            event
            && event.isValid === true
        ) {
            canFollow = true;
        }

        if (session.user) {
            follow = isUserSubscribed(event.eventSubscribes, session.user.id);
        }

        console.log(follow);
    }

    if (event) {
        return (
            <Container className={style.container} maxWidth="md">
                <section className={style.header}>
                    <article>
                        {
                            event.images && event?.images?.length !== 0 && (
                                <section className={style.carousel}>
                                    <Carousel images={event.images} />
                                </section>
                            )
                        }
                    </article>
                    <article>
                        <h1 className={style.title}>{event.title}</h1>
                    </article>
                    <article>
                        {
                            event.adult && (
                                <NoAdultContentRoundedIcon className={style.icon} />
                            )
                        }
                    </article>
                </section>
                <section className={style.body}>
                    <article className={style.information__container}>
                        <div className={style.information__address__container}>
                            {
                                event.localizations?.length !== 0 && event.localizations[0].zipCode > 0 ? (
                                    <>
                                        <div className={style.information__address__header}>
                                            <LocationOnRoundedIcon htmlColor={Color.BLACK} width="14" />
                                            <p className={style.title__2}>Address</p>
                                        </div>
                                        <div className={style.information__address__list}>
                                            {
                                                event.localizations.map((localization, index) => (
                                                    <p key={index} className={style.information__address}>{localization.address}, {localization.city}, {localization.zipCode} {localization.regionName}</p>
                                                ))
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <article className={style.information__address}>
                                        <CloudRoundedIcon htmlColor={Color.BLACK} width="14" />
                                        <p className={style.information__address}>
                                            En ligne
                                        </p>
                                    </article>
                                )
                            }
                        </div>
                        <article className={style.information__agenda__container}>
                            <h3>Date et Heure</h3>
                            <div className={style.information__agenda__item}>
                                <EventAvailableRoundedIcon />
                                <p> Débute le {DateFormatter.complete(event.startDate)}</p>
                            </div>
                            <div className={style.information__agenda__item}>
                                <EventBusyRoundedIcon />
                                <p> Termine le {DateFormatter.complete(event.endDate)}</p>
                            </div>
                        </article>
                    </article>
                    <article className={style.description__container}>
                        <h3>Description</h3>
                        <p>{event.description}</p>
                    </article>
                </section>
                <section className={style.footer}>
                    <Button className={style.footer__reserved__button} color="primary" type="button">Reserver</Button>
                    {
                        canValide && (
                            <EventFormValidate action={validateEvent} event={event} />
                        )
                    }
                    {
                        myEvent && (
                            <Link href={`/event/${event.id}/edit`}>
                                <Button className={style.footer__reserved__button} color="primary" type="button"  >modifier</Button>
                            </Link>
                        )
                    }
                    {
                        canFollow && follow && (
                            <EventFormFollow action={followEvent} event={event} />
                        )
                    }
                </section>
            </Container>
        );
    }
    redirect('/');
}
