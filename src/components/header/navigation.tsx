'use client';
import { Role } from "@constants/role";
import Route from "@enums/routes.enum";
import { Add, Notifications, Tag, Person, Menu, Close, Event, Report } from "@mui/icons-material";
import { Button, IconButton, Drawer, Box, Toolbar, Divider, List, ListSubheader, ListItemButton, ListItemAvatar, Avatar, ListItemText, ListItemIcon, ListItem, } from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navigation({ session, hasLoginLayout }: { session: Session | null, hasLoginLayout: boolean}) {
    const pathname = usePathname();
    const router = useRouter();
    const [hasMyEvent, setHasMyEvent] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const get = async () => {
    }
    useEffect(() => {
        get();
    }, [])

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        setDrawerOpen(false);
    };

    const handleSignOut = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/',
        });
    }
    useEffect(() => {
        get();
        setHasMyEvent(pathname.includes('/user/event'));
    }, [pathname])
    return (
        <>
            {
                session && hasMyEvent && (
                    <Button href="/" variant="contained" endIcon={<Add />} sx={{ marginX: 1 }}>
                        Créer un événement
                    </Button>
                )
            }
            {
                !hasLoginLayout && (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <Menu />
                        </IconButton>
                        <Drawer
                            component="nav"
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    width: 250,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                <Box>
                                    <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box
                                            sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}
                                        >
                                            <IconButton onClick={toggleDrawer(false)}>
                                                <Close />
                                            </IconButton>
                                        </Box>
                                    </Toolbar>
                                    <Divider />
                                    {session && (
                                        <>
                                            <List
                                                subheader={
                                                    <ListSubheader component="div" id="nested-list-subheader">
                                                        Profile
                                                    </ListSubheader>
                                                }
                                            >
                                                <ListItemButton onClick={() => handleNavigation('/profile')}>
                                                    {
                                                        session.user && session.user.image && (
                                                            <ListItemAvatar>
                                                                <Avatar alt={session.user.username} src={session.user.image} />
                                                            </ListItemAvatar>
                                                        )
                                                    }
                                                    <ListItemText primary="Mon compte" />
                                                </ListItemButton>
                                                <ListItemButton onClick={() => handleNavigation('/user/event')}>
                                                    <ListItemIcon>
                                                        <Event />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Mes événements" />
                                                </ListItemButton>
                                                <ListItemButton onClick={() => handleNavigation('/user/follow')}>
                                                    <ListItemIcon>
                                                        <Notifications />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Mes suivis" />
                                                </ListItemButton>
                                            </List>
                                            <Divider />
                                            {session.user.role === Role.ADMIN && (
                                                <List
                                                    subheader={
                                                        <ListSubheader component="div" id="nested-list-subheader">
                                                            Administration
                                                        </ListSubheader>
                                                    }
                                                >
                                                    <ListItemButton onClick={() => handleNavigation('/admin/event')}>
                                                        <ListItemIcon>
                                                            <Event />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Événements" />
                                                    </ListItemButton>
                                                    <ListItemButton onClick={() => handleNavigation('/admin/tag')}>
                                                        <ListItemIcon>
                                                            <Tag />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Catégories" />
                                                    </ListItemButton>
                                                    <ListItemButton onClick={() => handleNavigation('/admin/user')}>
                                                        <ListItemIcon >
                                                            <Person />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Utilisateurs" />
                                                    </ListItemButton>
                                                </List>
                                            )}
                                            <Divider />
                                            {
                                                session?.user && (
                                                    <List>
                                                        <ListItemButton onClick={() => handleNavigation('/report')}>
                                                            <ListItemIcon>
                                                                <Report />
                                                            </ListItemIcon>
                                                            <ListItemText primary="Problème à signaler" />
                                                        </ListItemButton>
                                                    </List>
                                                )
                                            }
                                        </>
                                    )
                                    }
                                </Box>
                                <List>
                                    <ListItem>
                                        {
                                            session ? (
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    onClick={handleSignOut}
                                                >
                                                    Se déconnecter
                                                </Button>
                                            ) : (
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    onClick={() => handleNavigation(Route.LOGIN)}
                                                >
                                                    Se connecter
                                                </Button>
                                            )
                                        }
                                    </ListItem>
                                </List>
                            </Box>
                        </Drawer>
                    </>
                )}
        </>
    );
}