/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */
"use client";

import Heading from "@/app/_components/Heading";
import { LoginButton } from "@/app/_components/auth/AuthButton";
import { useSession } from "next-auth/react";

export default function ClientAuthTest() {
    const { data: session, status } = useSession();

    return (
        <div className="bg-slate-200 min-h-screen p-4 text-zinc-700">
            <Heading level={1}>Client Side Session Retrieval</Heading>
            {status ? <pre>{JSON.stringify(session, null, 4)}</pre> : <LoginButton />}
        </div>
    );
}
