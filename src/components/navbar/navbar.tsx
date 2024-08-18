'use client';
import style from './navbar.module.css';
import Image from 'next/image';
import Link from '@components/link/link';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

export default function NavBar({ noSearchBar, noMenu }: { noSearchBar?: boolean, noMenu?: boolean }) {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        async () => setSession(await getSession());
    }, [])
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
                    <></>
                    // <Button onClick={signOut} type='button' color='primary'>Se déconnecter</Button>
                ) : (
                    <Link href="/login" className={style.authentication__login}>Se connecter</Link>
                )
            }
        </header>
    );
}
