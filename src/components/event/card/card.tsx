import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';

import { Color } from "@constants/color";
import Event from "@interfaces/event";

import styles from './card.module.css';
import Link from '@components/link/link';

export default function Card({ event, width = 200 }: { event: Partial<Event>, width: number }) {
    const { title, images, localization, linkTicketing } = event;
    return (
        <article className={styles.card} style={{ width }}>
            {
                images && (
                    <div className={styles.container}>
                        <BookmarkBorderRoundedIcon className={styles.icon} />
                        <img className={styles.image} src={images[0].path} alt={images[0].name} />
                        {linkTicketing && (<a href={linkTicketing}>Ticketing</a>)}
                    </div>
                )
            }
            <section className={styles.content}>
                <p>{title}</p>
                {
                    localization ? (
                        <p className={styles.address}>{localization.address}, {localization.zipCode} { localization.city}</p>
                    ) : (
                        <p className={styles.address}>À distance </p>
                    )
                }
            </section>
            {
                localization && (
                    <div>
                        <PinDropRoundedIcon htmlColor={Color.BLACK} />
                        <p>{localization.address}, {localization.zipCode} {localization.city}</p>
                    </div>
                )
            }
            <section className={styles.footer}>
                <Link color='primary' href={`/event/detail/${event.id}`}>Voir plus</Link>
            </section>
        </article>
    );
}