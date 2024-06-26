import { ZodIssue } from "zod";

export type Action = (
	  _prevState: any,
  params: FormData
) => Promise<{ errors: ZodIssue[] }>;
