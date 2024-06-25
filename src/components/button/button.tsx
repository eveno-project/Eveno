import { Type } from '@types/button';
import styles from './button.module.css';
import { ReactNode } from 'react';
import { Color } from '@types/color';

export default function Button({
    children,
    color,
    type,
    isOutline = false,
    onClick,
    className
}: {
    children: ReactNode,
    color: Color,
    type: Type,
    isOutline?: boolean,
    className?: string
    onClick?: () => void,
}) {
    return (
        <button onClick={onClick} type={type} className={`${styles[`${color}${isOutline ? '_outline' : ''}`]} ${className}`}>{children}</button>
    );
}
