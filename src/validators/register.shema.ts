import { BIRTHDAY_ERROR_TYPE, BIRTHDAY_MIN_AGE, BIRTHDAY_REQUIRED, CONFIRM_PASSWORD, CONFIRM_PASSWORD_REQUIRED, EMAIL, MIN_PASSWORD, USERNAME_REQUIRED } from '@constants/message-schema';
import dayjs from 'dayjs';
import { z } from 'zod';


const RegisterBaseSchema = z.object({
    email: z.string().email(EMAIL),
    username: z.string({message: USERNAME_REQUIRED}),
    birthday: z.string({message: BIRTHDAY_REQUIRED})
    .refine((date) => dayjs(date, "DD-MM-YYYY", true).isValid(), {
      message: BIRTHDAY_ERROR_TYPE,
    })
    .refine((date) => dayjs().diff(dayjs(date), "year") >= 13, {
      message: BIRTHDAY_MIN_AGE,
    }),
});

const RegisterPasswordSchema = z.object({
    password: z.string().min(8, { message: MIN_PASSWORD}),
    confirm: z.string({ message: CONFIRM_PASSWORD_REQUIRED}),
});

export const RegisterSchema = RegisterBaseSchema.merge(RegisterPasswordSchema).
refine((data) => data.password === data.confirm, {
  message: CONFIRM_PASSWORD,
  path: ["confirm"],
})

export type RegisterValues = z.infer<typeof RegisterSchema>;