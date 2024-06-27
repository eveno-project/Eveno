import { z } from "zod";

const stringToZodDate = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), { message: "La date ne peut-être inférieur à aujourd’hui" }));

const localizationBaseSchema = z.object({
    address: z.string().refine((arg) => arg !== undefined && arg.length >= 9 || arg.length === 0, { message: "Adresse invalid" }),
    city: z.string().refine((arg) => arg !== undefined && arg.length >= 2 || arg.length === 0, { message: "Ville invalid" }),
    regionName: z.string().refine((arg) => arg !== undefined && arg.length >= 9 || arg.length === 0, { message: "Région invalid" }),
    zipCode: z.string().transform((arg) => Number(arg)).refine((arg) => arg !== undefined && 9, { message: "Code postal invalid" }),
})

const eventBaseSchema = z.object({
    adult: z.boolean(),
    userId: z.number(),
    title: z.string().min(3, { message: "minimum 3 caractères" }),
    description: z.string().min(20, { message: "mininum 20 caractères" }),
    startDate: stringToZodDate,
    endDate: stringToZodDate,
    publishedAt: z.date().optional(),
    localization: localizationBaseSchema,
    user: z.object({
        id: z.number().optional()
    }),
    tags: z.array(z.object({
        id: z.number()
    })).optional(),
});

export const eventSchema = eventBaseSchema
    .refine((arg) => (arg.startDate <= arg.endDate), {
        path: ["endDate"],
        message: "La date de fin ne peut-être inférieur à la date de départ",
    });

export const updateEventSchema = eventBaseSchema
    .extend({
        id: z.number(),
        localization: localizationBaseSchema.extend({
            id: z.number()
        })

    }).refine((arg) => (arg.startDate <= arg.endDate), {
        path: ["endDate"],
        message: "La date de fin ne peut-être inférieur à la date de départ",
    });