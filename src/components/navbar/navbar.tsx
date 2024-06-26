import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import style from './navbar.module.css';
import { getAll } from "@services/event";

export default async function NavBar() {
    const events = await getAll();

    return (
        <header className={style.navbar}>
            <div className={style.iconContainer}>
                <HomeIcon />
            </div>
            <input
                type="text"
                placeholder="Rechercher..."
                className={style.searchInput}
            />
            <div className={style.iconContainer}>
                <LoginIcon />
            </div>
        </header>
    );
}
