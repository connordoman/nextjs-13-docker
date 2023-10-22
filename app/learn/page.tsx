/*
 * Created on Sat Oct 21 2023
 * Author: Connor Doman
 */

import fs from "fs";
import "./style.css";
import { PalMarkdown as Markdown } from "../_components/Markdown";

export default function LearnPage() {
    const file = fs.readFileSync(`app/learn/README.md`, "utf8");

    return <Markdown>{file}</Markdown>;
}
