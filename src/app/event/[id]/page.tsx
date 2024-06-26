import { redirect } from "next/navigation";

import style from "./page.module.css";
import { getById } from "@services/event";
import Carousel from "@components/carousel/carousel";

import { Container } from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import NoAdultContentRoundedIcon from '@mui/icons-material/NoAdultContentRounded';
import dayjs from 'dayjs';

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById(params.id);
    if (event) {
        event.images = [
            {
                name: "test",
                path: "http://via.placeholder.com/640x360"
            },
            {
                name: "test",
                path: "http://via.placeholder.com/1080x360"
            },
            {
                name: "test",
                path: "http://via.placeholder.com/640x1920"
            },
            {
                name: "test",
                path: "http://via.placeholder.com/300x500"
            },
            {
                name: "test",
                path: "http://via.placeholder.com/64x36"
            },
        ];
        return (
            <Container className={style.container} maxWidth="md">
                <section className={style.header}>
                    <article>
                        {
                            event?.images && (
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
                <section>
                    <p>{event.description}</p>
                </section>
                <section className={style.address__container}>
                    {
                        event.localizations ? (
                            <>
                                <LocationOnRoundedIcon className={style.address__icon__color} />
                                <p className={style.address}>{event.localizations[0].address}, {event.localizations[0].city}, {event.localizations[0].zipCode} {event.localizations[0].regionName}</p>
                            </>
                        ) : (
                            <>
                                <p>
                                    En ligne
                                </p>
                            </>
                        )
                    }
                </section>
                <section className={style.footer}>
                </section>
            </Container>
        );
    }
    redirect('/');
}