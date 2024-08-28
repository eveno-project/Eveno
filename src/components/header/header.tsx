import {
    AppBar,
    Box,
    Link,
    Toolbar
} from "@mui/material";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Navigation from "./navigation";

export default async function Header({ hasLoginLayout = false, hasAdminLayout = false }: { hasLoginLayout?: boolean, hasAdminLayout?: boolean }) {
    const session = await getServerSession();
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
                <Navigation session={session} hasLoginLayout={hasLoginLayout} />
            </Toolbar>
        </AppBar >
    );
}
