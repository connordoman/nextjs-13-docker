/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */

import type { NextAuthOptions, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const customAuthOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials: Record<"username" | "password", string> | undefined,
                req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
            ): Promise<User | null> {
                const user = { id: "1", name: "Connor Doman", email: "connor@connordoman.dev" };
                if (credentials?.username === "connor" && credentials?.password === "password") {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};

export default customAuthOptions;
