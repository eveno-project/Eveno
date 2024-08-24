import Header from "@components/header/header";
import ThemeProvider from "@providers/theme.provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header rootLayout={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
