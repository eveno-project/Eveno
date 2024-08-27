'use client';
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    Link,
    List,
    ListItemButton,
    ListItemText,
    Toolbar
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ hasLoginLayout = false, hasAdminLayout = false }: { hasLoginLayout?: boolean, hasAdminLayout?: boolean }) {
    const pathname = usePathname();
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [hasLogin, setHasLogin] = useState(false);
    const [hasAdmin, setHasAdmin] = useState(false);
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
        setHasLogin(pathname.includes('login'));
        setHasAdmin(pathname.includes('admin'));
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
                {!hasLoginLayout && (
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
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                <Box
                                sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                <Divider />
                                <List>
                                    {session ? (
                                        <>
                                            <ListItemButton onClick={() => handleNavigation('/profile')}>
                                                <ListItemText primary="Profil" />
                                            </ListItemButton>
                                            {session.user.role === 2 && (
                                                <ListItemButton onClick={() => handleNavigation('/admin/event')}>
                                                    <ListItemText primary="Administration" />
                                                </ListItemButton>
                                            )}
                                            <ListItemButton onClick={handleSignOut}>
                                                <ListItemText primary="Se déconnecter" />
                                            </ListItemButton>
                                        </>
                                    ) : (
                                        <ListItemButton onClick={() => handleNavigation('/authentication/login')}>
                                            <ListItemText primary="Se connecter" />
                                        </ListItemButton>
                                    )}
                                </List>
                                <Divider />
                            </Box>
                        </Drawer>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
