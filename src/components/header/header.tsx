'use client';
import { AppBar, Box, Button, Link, Toolbar } from "@mui/material";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header({ rootLayout = true }: { rootLayout?: boolean }) {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        const get = async () => {
            setSession(await getSession());
        }
        get();
    }, [])

    return (
        <AppBar position="static" color="inherit" sx={{
            marginBottom: 2
        }}>
            <Toolbar>
                <Link href="/">
                    <Image
                        src="/fou/classic.svg"
                        alt={"Logo FOU"}
                        width={45}
                        height={45}
                    />
                </Link>
                <Box sx={{ flex: '1 1' }}></Box>
                {
                    rootLayout && (
                        <>
                            {
                                session ? (
                                    <Button href="/api/signout">Se déconnecter</Button>
                                ) : (
                                    <Button href="/authentication/login">Se connecter</Button>
                                )
                            }
                        </>
                    )
                }
            </Toolbar>
        </AppBar>
    );
}