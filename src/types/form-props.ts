import type { ZodIssue } from "zod";

export type FormProps = {
    action: (
      _prevState: any,
      params: FormData
    ) => Promise<{ errors: ZodIssue[] }>;
};