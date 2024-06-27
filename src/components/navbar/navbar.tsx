import style from './navbar.module.css';
import Image from 'next/image';
import Button from '@components/button/button';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function NavBar({ noSearchBar, noMenu }: { noSearchBar?: boolean, noMenu?: boolean }) {
    const session = await getServerSession();
    const handleLogin = () => {
        redirect('loging')
    };
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
