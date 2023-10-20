/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */

import Heading from "@/app/_components/Heading";
import customAuthOptions from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

export default async function ServerAuthTest() {
    const session = await getServerSession(customAuthOptions);

    return (
        <div className="bg-slate-200 min-h-screen p-4 text-zinc-700">
            <Heading level={1}>Server Side Session Retrieval</Heading>
            <pre>{JSON.stringify(session, null, 4)}</pre>
        </div>
    );
}
