/*
 * Created on Mon Oct 02 2023
 * Author: Connor Doman
 */
"use client";

import { useSession } from "next-auth/react";
import Heading from "../_components/Heading";
import { ActionButtons, ActionListSingleGroup } from "../_components/patternfly/ActionList";

import { NextPage } from "next";
import Link from "next/link";

const ExperimentalPage: NextPage = () => {
    const { data: session, status } = useSession();

    return (
        <div className="flex flex-col md:w-2/3 mx-auto bg-slate-200 min-h-screen p-4 text-zinc-700">
            <Heading level={3}>Login Page</Heading>
            <Link href="/experimental/auth" className="underline underline-offset-1 text-sky-700">
                Login
            </Link>
            <Heading level={3}>Client Session</Heading>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
};

export default ExperimentalPage;
