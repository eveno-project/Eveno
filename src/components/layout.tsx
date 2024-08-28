'use client';
import ThemeProvider from "@providers/theme.provider";
import { SessionProvider } from "next-auth/react";
import Header from "./header/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}