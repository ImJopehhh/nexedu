"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { checkRateLimit, registerLoginAttempt } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function loginAction(formData: FormData) {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";

    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.allowed) {
        return { error: `Terlalu banyak percobaan. Silakan coba lagi dalam ${Math.ceil(rateLimit.retryAfter! / 60)} menit.` };
    }

    try {
        await signIn("credentials", formData);
        await registerLoginAttempt(ip, true);
        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            await registerLoginAttempt(ip, false);
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Kredensial salah" };
                default:
                    return { error: "Terjadi kesalahan saat login" };
            }
        }
        throw error;
    }
}

export async function logoutAction() {
    await signOut({ redirectTo: "/" });
}
