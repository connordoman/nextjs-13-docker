/*
 * Created on Tue Oct 10 2023
 * Author: Connor Doman
 *
 * this code is a work around to client-side rendering with NextAuth and app/ directory.
 *
 *
 * It is NOT recommended to use this method.
 */
"use client";

import { SessionProvider } from "next-auth/react";

type NextAuthProviderProps = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
