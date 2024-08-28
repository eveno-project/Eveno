'use client';
import Comment from '@interfaces/comment';
import { List } from '@mui/material';
import { default as Item } from './comment';
import { TransitionGroup } from 'react-transition-group';
import EventFormComment from '@components/form/event-form-comment';
import { Session } from 'next-auth';
import Event from '@interfaces/event';

export default function CommentList({ event, session }: { event: Event, session: Session | null}) {
    return (
        <List>
            {
                session && event && (
                    <EventFormComment event={event} />
                )
            }
            <TransitionGroup>

                {
                    !!event.comments && event.comments.map((comment, index) => (
                        <Item key={index} comment={comment} />
                    ))
                }
            </TransitionGroup>
        </List>
    );
}

