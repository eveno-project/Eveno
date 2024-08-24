import NavBar from "@components/navbar/navbar";
import ThemeProvider from "@providers/theme.provider";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <NavBar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}