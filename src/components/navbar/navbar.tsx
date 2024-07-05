"use client";
import style from './navbar.module.css';
import Image from 'next/image';
import Button from '@components/button/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import useSession from "@hooks/useSession";
import * as url from "node:url";

export default function NavBar({ noSearchBar, noMenu }: { noSearchBar?: boolean, noMenu?: boolean }) {
    const router = useRouter();
    const pathname = usePathname()
    const handleLogin = () => {
        router.push("/login");
    }

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    }

    const session = useSession();

    return (
        <header className={style.navbar__container}>
            <div className={style.navbar__fou}>
                <Link href="/"><Image src="/fou/classic.svg" alt='logo' width={32} height={32} /></Link>
            </div>
            {/* {
                !noSearchBar && (
                    <input
                        type="text"
                        placeholder="Rechercher"
                        className={style.navbar__searchbar}
                    />
                )
            }
            {
                !noMenu && (
                    <Button color='primary' type='button'><MenuRoundedIcon htmlColor={Color.BLACK} /></Button>
                )
            } */}
            {
                session?.user ? (
                    <Button onClick={handleLogout} color={"primary"} type={"button"}>Se déconnecter</Button>
                ) : (
                    pathname !== '/login' && pathname !== '/register' &&(
                        <Button onClick={handleLogin} color={"primary"} type={"button"}>Se connecter</Button>
                    )
                )
            }
        </header>
    );
}
