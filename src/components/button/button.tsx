import { Types } from '@types/button';

export default function Button({
    children,
    color,
    isOutline = false,
    type,
}: {
    children: React.ReactNode,
    color: 'primary' | 'secondary' | 'tertiary',
    isOutline: boolean,
    type: Types,
}) {
    return (
        <button type={type} className={`button ${isOutline ? 'outline' : ''} ${color}`}>{children}</button>
    );
}