import { z } from "zod";

export const tagSchema = z.object({
    name:  z.string().min(1, { message: "minimum 1 caractère" })
})