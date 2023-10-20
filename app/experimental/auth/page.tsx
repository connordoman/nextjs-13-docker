/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */

import Heading from "@/app/_components/Heading";
import { LoginButton, LogoutButton } from "@/app/_components/auth/AuthButton";
import customAuthOptions from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

export default async function ExperimentalAuth() {
    const session = await getServerSession(customAuthOptions);
    console.log(session);

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
            <LoginButton />
            <LogoutButton />
            <Heading level={1}>Server Session</Heading>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}
