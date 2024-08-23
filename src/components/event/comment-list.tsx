import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Event from "@interfaces/event";

import styles from './card.module.css';
import Link from '@components/link/link';
import Image from 'next/image';
import CardComment from './card-comment/card-comment';

export default function CommentList({ event }: { event: Partial<Event> }) {

    if (event.comments) {
        return (
            <div>
                {event.comments.map(comment => (
                    < CardComment comment={comment} />
                ))}
            </div>
        );
    }
}
