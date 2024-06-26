import { default as NextLink } from 'next/link';

import styles from './link.module.css';
import { ReactNode } from 'react';
import { Color } from '@type/color';

export default function Link({
    children,
    className,
    color = 'primary',
    href
}: {
    children: ReactNode,
    className?: string,
    color?: Color,
    href: string,
}) {
    return (
        <NextLink className={`${styles.link} ${styles[color]} ${className}`} href={href}>{children}</NextLink>
    );
}
