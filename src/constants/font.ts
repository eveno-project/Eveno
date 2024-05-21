import localFont from 'next/font/local';

export const LUCIOLE = localFont({
    src: [
        {
            path: '../assets/fonts/Luciole-Regular.ttf',
            weight: '400',
            style: 'regular'
        },
        {
            path: '../assets/fonts/Luciole-Regular-Italic.ttf',
            weight: '400',
            style: 'italic'
        },
        {
            path: '../assets/fonts/Luciole-Bold.ttf',
            weight: '700',
            style: 'bold'
        },
        {
            path: '../assets/fonts/Luciole-Bold-Italic.ttf',
            weight: '700',
            style: 'italic'
        }
    ]
})