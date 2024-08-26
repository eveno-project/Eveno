import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('Veuillez entrée un courriel valide'),
    password: z.string().min(8, 'Doit contenir 8 caractère minimum'),
})

export type LoginValues = z.infer<typeof LoginSchema>;
