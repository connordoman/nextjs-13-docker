/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */

import { S3Client, GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = new S3Client();

    const params: GetObjectCommandInput = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.query.key as string,
    };

    const command = new GetObjectCommand(params);

    try {
        const data = client.send(command);
        res.status(200).json(data);
    } catch (e: any) {
        res.status(400).json({ message: "Invalid request" });
    } finally {
        client.destroy();
    }
}
