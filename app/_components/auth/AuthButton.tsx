/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */

"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "../Button";

export const LoginButton = () => {
    return <Button onClick={() => signIn()}>Sign In</Button>;
};

export const LogoutButton = () => {
    return <Button onClick={() => signOut()}>Sign Out</Button>;
};
