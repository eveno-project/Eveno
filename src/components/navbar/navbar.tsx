import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import style from './navbar.module.css';
import { getAll } from "@services/event";
import Image from 'next/image';
import Button from '@components/button/button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Color } from '@constants/color';
import Link from 'next/link';

export default async function NavBar({ noSearchBar, noMenu }: { noSearchBar?: boolean, noMenu?: boolean }) {
    return (
        <header className={style.navbar__container}>
            <div className={style.navbar__fou}>
                <Link href="/"><Image src="/fou/classic.svg" alt='logo' width={32} height={32} /></Link>
            </div>
            {
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
            }
        </header>
    );
}
