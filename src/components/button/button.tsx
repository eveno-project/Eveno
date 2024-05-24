import { Type } from '@types/button';

export default function Button({
    children,
    color,
    type,
    isOutline = false,
}: {
    children: React.ReactNode,
    color: 'primary' | 'secondary' | 'tertiary',
    type: Type,
    isOutline?: boolean,
}) {
    return (
        <button type={type} className={`button ${isOutline ? 'outline' : ''} ${color}`}>{children}</button>
    );
}