import { Type } from '@types/button';
import styles from './button.module.css';
import { ReactNode } from 'react';
import { Color } from '@types/color';

export default function Button({
    children,
    color,
    type,
    isOutline = false,
    className
}: {
    children: ReactNode,
    color: Color,
    type: Type,
    isOutline?: boolean,
    className?: string
}) {
    return (
        <button type={type} className={`${styles[`${color}${isOutline ? '_outline' : ''}`]} ${className}`}>{children}</button>
    );
}