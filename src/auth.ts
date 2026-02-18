import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: undefined, // PrismaAdapter(prisma) - Optional for credentials, but good for sessions
    session: { strategy: "jwt" },
    pages: {
        signIn: "/dashboard/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.schoolId = user.schoolId;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string;
                session.user.role = token.role as string;
                session.user.schoolId = token.schoolId as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.user.findUnique({ where: { email } });
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
});

declare module "next-auth" {
    interface User {
        role: string;
        schoolId: string | null;
    }
    interface Session {
        user: {
            id: string;
            role: string;
            schoolId: string | null;
        } & import("next-auth").DefaultSession["user"];
    }
}
