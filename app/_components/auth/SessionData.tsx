/*
 * Created on Thu Oct 19 2023
 * Author: Connor Doman
 */

"use client";

import { useState } from "react";
import Heading from "../Heading";
import { Session, getServerSession } from "next-auth";
import customAuthOptions from "@/app/_lib/auth";

export const SessionData = async () => {
    const session = await getServerSession(customAuthOptions);

    return (
        <div>
            <Heading level={2}>Server Session</Heading>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
};
