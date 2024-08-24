import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Event from "@interfaces/event";
import { Container, Divider, Grid, Paper, Avatar } from "@mui/material";
import styles from './card.module.css';
import Link from '@components/link/link';
import Image from 'next/image';
import Comment from '@interfaces/comment';

export default function CardComment({ comment }: { comment: Partial<Comment> }) {
    const { content, user } = comment;
    return (
        <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    {
                        user ? (
                            <h4 style={{ margin: 0, textAlign: "left" }}>{user.username}</h4>
                        ) : (
                            <h4 style={{ margin: 0, textAlign: "left" }}>système</h4>
                        )
                    }
                    <p style={{ textAlign: "left" }}>
                        {content}
                    </p>
                </Grid>
            </Grid>
        </Paper>
    );
}
