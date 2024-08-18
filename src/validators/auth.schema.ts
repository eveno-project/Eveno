import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email('Email non valide'),
    password: z.string().refine((arg) => arg)
})