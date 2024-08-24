'use client';
import { THEME } from "@constants/theme";
import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = createTheme(THEME);
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
}