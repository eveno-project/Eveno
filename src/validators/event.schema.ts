import { z, ZodObject } from "zod";

const stringToZodDate = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), { message: "La date ne peut-être inférieur à aujourd’hui" }));

export const eventSchema = z.object({
    adult: z.boolean(),
    title: z.string().min(3, { message: "minimum 3 caractères" }),
    description: z.string().min(20, { message: "mininum 20 caractères" }),
    startDate: stringToZodDate,
    endDate: stringToZodDate,
    publishedAt: z.date().optional(),
    localization: z.object({
        address: z.string().refine((arg) => arg !== undefined && arg.length >= 9, { message: "Adresse invalid" }),
        city: z.string().refine((arg) => arg !== undefined && arg.length >= 2, { message: "Ville invalid" }),
        regionName: z.string().refine((arg) => arg !== undefined && arg.length >= 9, { message: "Ville invalid" }),
        zipCode: z.string().transform((arg) => Number(arg)).refine((arg) => arg !== undefined && 9, { message: "Code postal invalid" }),
    }),
}).refine((arg) => (arg.startDate <= arg.endDate), {
    path: ["endDate"],
    message: "La date de fin ne peut-être inférieur à la date de départ",
});

