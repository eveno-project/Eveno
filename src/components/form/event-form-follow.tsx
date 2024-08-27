"use client";
import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import Event from "@interfaces/event";
import { NotificationAddOutlined, NotificationsActive } from "@mui/icons-material";

export default function EventFormFollow({ event, follow }: { event: Event, follow: boolean }) {
    return (
        <Box>
            {
                event && (
                    <Tooltip title={follow ? "Ne plus suivre l'événement" : "Suivre l'événement"}>
                        <Box component="form" action="/api/event/follow" method="POST">
                            <input type="hidden" name="id" value={event.id} />
                            <input type="hidden" name="boolean" value={follow.toString()} />
                            <IconButton type="submit" aria-label="Suivre l'événement">
                                {
                                    follow ? (
                                        <NotificationsActive color="secondary" />
                                    ) : (
                                        <NotificationAddOutlined />
                                    )
                                }
                            </IconButton>
                        </Box>
                    </Tooltip>
                )
            }
        </Box>
    );

};
