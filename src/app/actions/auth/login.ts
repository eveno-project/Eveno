"use server";
import { loginSchema } from "@validators/auth.schema";

export default async function Login(_prevState: any, params: FormData) {
    try {
        const {data, error, success} = loginSchema.safeParse({
            email: params.get('email'),
            password: params.get('password')
        });
        return {data, error, success: success || null};
    } catch (error) {
        throw error
    }
}
