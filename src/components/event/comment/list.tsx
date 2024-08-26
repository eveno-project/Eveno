'use client';
import Comment from '@interfaces/comment';
import { List } from '@mui/material';
import { default as Item } from './comment';
import { TransitionGroup } from 'react-transition-group';

export default function CommentList({ comments }: { comments: Comment[] }) {
    return (
        <List>
            <TransitionGroup>
            {
                !!comments && comments.map((comment, index) => (
                    <Item key={index} comment={comment} />
                ))
            }
            </TransitionGroup>
        </List>
    );
}

