/*
 * Created on Mon Sep 25 2023
 * Author: Connor Doman
 */
var express = require("express");
var next = require("next");
var port = parseInt(process.env.PORT || "3000", 10);
var dev = process.env.NODE_ENV !== "production";
var app = next({ dev: true });
var handle = app.getRequestHandler();
/**
 * This essentially overrides
 * the default Next.js server.js
 */
app.prepare()
    .then(function () {
    var server = express();
    server.use(handle).listen(port, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:".concat(port));
    });
})["catch"](function (ex) {
    console.error(ex.stack);
    process.exit(1);
});
