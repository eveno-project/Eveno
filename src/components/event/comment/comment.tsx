import { default as IComment } from "@interfaces/comment";
import { ListItem, ListItemAvatar, Avatar, ListItemText, List, Divider, Button, Typography, Box } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

function formatTimeDifference(date: Date): string {
    const now = new Date();
    const timeDifference = date.getTime() - now.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (Math.abs(daysDifference) < 1) {
        return `${Math.abs(hoursDifference)}h`;
    } else {
        return `${Math.abs(daysDifference)}j`;
    }
}

export default function Comment({ comment }: { comment: IComment }) {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={comment.user.username} src={comment.user.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography>{comment.user.username}</Typography>
                            <Typography variant="caption">{formatTimeDifference(comment.createdAt)}</Typography>
                        </Box>
                    }
                    secondary={comment.content}
                />
            </ListItem>
            <Divider />
            {
                comment.replies && (
                    <List>
                        <TransitionGroup>
                            {
                                comment.replies && comment.replies.map((reply, index) => (
                                    <Comment key={index} comment={reply} />
                                ))
                            }
                        </TransitionGroup>
                    </List>
                )
            }
        </>
    );
}