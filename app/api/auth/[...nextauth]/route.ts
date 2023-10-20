/*
 * Created on Tue Oct 10 2023
 * Author: Connor Doman
 */

import customAuthOptions from "@/app/_lib/auth";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "",
};

const handler = NextAuth(customAuthOptions);

export { handler as GET, handler as POST };
