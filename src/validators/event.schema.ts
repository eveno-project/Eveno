import { DATE_END_NOT_INF_STARTED, DATE_NOT_INF_NOW, EVENT_DESCRIPTION_MIN, EVENT_TITLE_MIN, IMAGE_ALT_MIN, IMAGE_ALT_REQUIRED, IMAGE_SRC_REQUIRED, IMAGE_SRC_VALID, LOCALIZATION_ADDRESS_INVALID, LOCALIZATION_ADDRESS_REQUIRED, LOCALIZATION_CITY_INVALID, LOCALIZATION_CITY_REQUIRED, LOCALIZATION_REGION_INVALID, LOCALIZATION_REGION_REQUIRED, LOCALIZATION_REQUIRED, LOCALIZATION_ZIPCODE_INVALID, LOCALIZATION_ZIPCODE_REQUIRED } from "@constants/message-schema";
import { Message } from "@mui/icons-material";
import path from "path";
import { argv } from "process";
import { z } from "zod";

const stringToZodDate = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date().min(new Date(new Date().setHours(0, 0, 0, 0)), { message: DATE_NOT_INF_NOW }));

const localizationBaseSchema = z.object({
    address: z.string().refine((arg) => arg !== undefined && arg.length >= 9 || arg.length === 0, { message: LOCALIZATION_ADDRESS_INVALID }).optional(),
    city: z.string().refine((arg) => arg !== undefined && arg.length >= 2 || arg.length === 0, { message: LOCALIZATION_CITY_INVALID }).optional(),
    regionName: z.string().refine((arg) => arg !== undefined && arg.length > 2 || arg.length === 0, { message: LOCALIZATION_REGION_INVALID }).optional(),
    zipCode: z.number().refine((arg) => arg === 0 || arg.toString().length === 5, { message: LOCALIZATION_ZIPCODE_INVALID }).optional(),
    longitude: z.number().optional(),
    latitude: z.number().optional(),
}).refine(data => {
    const { address, city, regionName, zipCode } = data;
    const filledFields = [address, city, regionName, zipCode].filter(field => field !== undefined && field !== "" && field !== 0);
    return filledFields.length === 0 || filledFields.length === 4;
}, {
    message: LOCALIZATION_REQUIRED,
    path: ["localizations.address"]
});

const eventBaseSchema = z.object({
    adult: z.boolean(),
    title: z.string().min(3, { message: EVENT_TITLE_MIN }),
    description: z.string().min(20, { message: EVENT_DESCRIPTION_MIN }),
    startDate: stringToZodDate,
    endDate: stringToZodDate,
    publishedAt: z.date().optional(),
    linkTicketing: z.string().optional(),
    user: z.object({
        id: z.number().optional()
    }),
    tags: z.array(z.object({
        id: z.number()
    })).optional(),
});

const imageSchema = z.object({
    alt: z.string({ message: IMAGE_ALT_REQUIRED }).min(5, { message: IMAGE_ALT_MIN }),
    src: z.string({ message: IMAGE_SRC_REQUIRED }).url({ message: IMAGE_SRC_VALID }),
});

export const eventSchema = eventBaseSchema
    .extend({
        localizations: localizationBaseSchema.optional(),
        images: z.array(imageSchema).optional(),
    })
    .refine((arg) => (arg.startDate <= arg.endDate), {
        path: ["endDate"],
        message: DATE_END_NOT_INF_STARTED,
    });

export const updateEventSchema = eventBaseSchema
    .extend({
        id: z.number(),
        localizations: z.object({
            id: z.number(),
            address: z.string({ message: LOCALIZATION_ADDRESS_REQUIRED}).refine((arg) => arg !== undefined && arg.length >= 9 || arg.length === 0, { message: LOCALIZATION_ADDRESS_INVALID }).optional(),
            city: z.string({ message: LOCALIZATION_CITY_REQUIRED}).refine((arg) => arg !== undefined && arg.length >= 2 || arg.length === 0, { message: LOCALIZATION_CITY_INVALID }).optional(),
            regionName: z.string({ message: LOCALIZATION_REGION_REQUIRED}).refine((arg) => arg !== undefined && arg.length > 2 || arg.length === 0, { message: LOCALIZATION_REGION_INVALID }).optional(),
            zipCode: z.number({ message: LOCALIZATION_ZIPCODE_REQUIRED}).refine((arg) => arg.toString().length === 5, { message: LOCALIZATION_ZIPCODE_INVALID }).optional(),
            longitude: z.number({ message: LOCALIZATION_ADDRESS_REQUIRED}).optional(),
            latitude: z.number({ message: LOCALIZATION_ADDRESS_REQUIRED}).optional(),
        }).optional()
    }).refine((arg) => (arg.startDate <= arg.endDate), {
        path: ["endDate"],
        message: DATE_END_NOT_INF_STARTED,
    });

export type EventValue = z.infer<typeof eventSchema>;
export type EventUpdateValue = z.infer<typeof updateEventSchema>;
