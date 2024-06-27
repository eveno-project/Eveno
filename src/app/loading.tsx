import style from './page.module.css';
import Loader from '@components/loader/loader';

export default function Loading() {
    return (
        <main className={style.loading__container}>
            <Loader />
        </main>
    );
}