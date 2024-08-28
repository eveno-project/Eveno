import { TAG_NAME_REQUIRED } from "@constants/message-schema";
import { z } from "zod";

export const TagSchema = z.object({
    name:  z.string().min(1, { message: TAG_NAME_REQUIRED })
});

export type TagValues = z.infer<typeof TagSchema>;