'use client';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon, Inbox, Dashboard, Event, Tag, Person, Notifications, Add } from "@mui/icons-material";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ hasLoginLayout = false, hasAdminLayout = false }: { hasLoginLayout?: boolean, hasAdminLayout?: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    const [hasMyEvent, setHasMyEvent] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const get = async () => {
        setSession(await getSession());
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
        <AppBar position="static" color="inherit" sx={{ marginBottom: 2 }}>
            <Toolbar>
                <Link href="/">
                    <Image
                        src="/fou/classic.svg"
                        alt="Logo FOU"
                        width={45}
                        height={45}
                    />
                </Link>
                <Box sx={{ flex: '1 1' }}></Box>
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
                            <MenuIcon />
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
                                                <CloseIcon />
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
                                            {session.user.role === 2 && (
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
                                                    onClick={() => handleNavigation('/authentication/login')}
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
            </Toolbar>
        </AppBar >
    );
}
