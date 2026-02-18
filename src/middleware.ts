import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
    const isLoginRoute = nextUrl.pathname === "/dashboard/login";

    if (isDashboardRoute && !isLoginRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard/login", nextUrl));
        }
    }

    if (isLoginRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
