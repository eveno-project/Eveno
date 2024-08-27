/* eslint-disable @next/next/no-img-element */
import Event from "@interfaces/event";

import styles from './card.module.css';
import { Box, Button, Paper, Typography, Zoom } from '@mui/material';
import Image from "next/image";

export default function Card({ event, width = 200, index }: { event: Partial<Event>, width?: number, index: number }) {
    const { title, images, localizations, linkTicketing, id } = event;
    return (
        <Zoom in={!!id} style={{ transitionDelay: `${index === 0 ? 100 : 200+(index * 50)}ms` }}>
            <Paper sx={{ maxWidth: width }}>
                <Box>
                    {
                        images && images?.length > 0 ? (
                            <img
                                className={styles.image}
                                src={images[0].src}
                                alt={images[0].alt}
                            />
                        ) : (<Image width={width} height={140} src="/fou/nothing-image.png" alt="Nothing image"  />)
                    }
                </Box>
                <Box sx={{
                    padding: 1
                }}>
                    <Box sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        <Typography>{title}</Typography>
                    </Box>
                    {
                        localizations && localizations.length !== 0 ? (
                            <Typography className={styles.address}>{localizations[0].address}, {localizations[0].zipCode} {localizations[0].city}</Typography>
                        ) : (
                            <Typography className={styles.address}>À distance </Typography>
                        )
                    }
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 1
                }}>
                    <Button href={`/event/${event.id}`}>Voir plus</Button>
                </Box>
            </Paper>
        </Zoom>
    );
}
