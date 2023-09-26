/*
 * Created on Mon Sep 25 2023
 * Author: Connor Doman
 */

const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: true });
const handle = app.getRequestHandler();

/**
 * This essentially overrides
 * the default Next.js server.js
 */

app.prepare()
    .then(() => {
        const server = express();

        server.use(handle).listen(port, (err: any) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex: any) => {
        console.error(ex.stack);
        process.exit(1);
    });
