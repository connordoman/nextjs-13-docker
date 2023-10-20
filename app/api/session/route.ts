/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */

import { getServerSession } from "next-auth";
import customAuthOptions from "@/app/_lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession({ req: request, ...customAuthOptions });

    return NextResponse.json({
        authenticated: !!session,
        session,
    });
}
