import { EMAIL, PASSWORD_MIN } from '@constants/message-schema';
import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(EMAIL),
    password: z.string().min(8, PASSWORD_MIN),
})

export type LoginValues = z.infer<typeof LoginSchema>;
