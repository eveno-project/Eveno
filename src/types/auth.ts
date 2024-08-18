import { loginSchema } from "@validators/auth.schema";
import { z } from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;