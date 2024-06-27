import styles from './tag.module.css';
import { ReactNode } from 'react';
import { Color } from '@types/color';

export default function Tag({
    children,
    color,
    isOutline = false,
    className
}: {
    children: ReactNode,
    color: Color,
    isOutline?: boolean,
    className?: string
}) {
    return (
        <div className={`${styles[`${color}${isOutline ? '_outline' : ''}`]} ${className}`}>{children}</div>
    );
}
