import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Event from "@interfaces/event";

import styles from './card.module.css';
import Link from '@components/link/link';

export default function Card({ event, width = 200 }: { event: Partial<Event>, width?: number }) {
    const { title, images, localizations, linkTicketing } = event;
    return (
        <article className={styles.card} style={{ width }}>
            {
                images && (
                    <div className={styles.container}>
                        <BookmarkBorderRoundedIcon className={styles.icon} />

                        <img className={styles.image} src={images[0]?.path} alt={images[0]?.name} />
                        {linkTicketing && (<a href={linkTicketing}>Ticketing</a>)}
                    </div>
                )
            }
            <section className={styles.content}>
                <p>{title}</p>
                {
                    localizations && localizations.length !== 0 ? (
                        <p className={styles.address}>{localizations[0].address}, {localizations[0].zipCode} { localizations[0].city}</p>
                    ) : (
                        <p className={styles.address}>À distance </p>
                    )
                }
            </section>
            <section className={styles.footer}>
                <Link color='primary' href={`/event/${event.id}`}>Voir plus</Link>
            </section>
        </article>
    );
}
