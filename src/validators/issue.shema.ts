import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, 'Le titre est requis').max(256, 'Le titre ne doit pas dépasser 256 caractères'),
    body: z.string().optional(),
    labels: z.array(z.string()).optional(),
});

export type IssueValues = z.infer<typeof IssueSchema>;
