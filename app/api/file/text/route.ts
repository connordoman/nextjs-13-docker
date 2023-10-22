/*
 * Created on Sat Oct 21 2023
 * Author: Connor Doman
 */

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get("f") as string;

    const file = fs.readFileSync(`app/${fileName}`);

    // const fileExtension = fileName.split(".").pop();
    const mimeType = "text/plain";

    return new Response(file, {
        headers: {
            "content-type": mimeType,
        },
    });
}
