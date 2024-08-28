'use client';
import { Chip, Paper, styled, Zoom } from "@mui/material";
import { Tag } from "@prisma/client";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function TagList({ deleteTag, tags }: { deleteTag: (id: number) => void, tags: Tag[] }) {
    const handleDelete = (tag: Tag) => () => {
        deleteTag(tag.id);
    }
    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            {
                tags && tags.map((tag, index) => (
                    <Zoom
                        key={index}
                        in={!!tag.id}
                        style={{
                            transitionDelay: `${100 + (index * 50)}ms`
                        }}
                    >
                        <ListItem>
                            <Chip
                                label={tag.name}
                                onDelete={handleDelete(tag)}
                            />
                        </ListItem>
                    </Zoom>
                ))
            }
        </Paper>
    );
}