import { redirect } from "next/navigation";

import { Container } from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import NoAdultContentRoundedIcon from '@mui/icons-material/NoAdultContentRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';

import { getById } from "@services/event";
import Carousel from "@components/carousel/carousel";
import { Color } from "@constants/color";
import DateFormatter from "@services/date";
import style from "./page.module.css";
import Button from "@components/button/button";

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById(params.id);
    if (event) {
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
                                    <>
                                        <CloudRoundedIcon htmlColor={Color.BLACK} width="14" />
                                        <p className={style.information__address}>
                                            En ligne
                                        </p>
                                    </>
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
                </section>
            </Container>
        );
    }
    redirect('/');
}