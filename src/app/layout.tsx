
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@components/layout";
import Header from "@components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eveno",
  description: "Des événements par tout en France !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <Header />
          {children}
        </Layout>
      </body>
    </html>
  );
}
