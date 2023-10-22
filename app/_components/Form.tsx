/*
 * Created on Sat Oct 21 2023
 * Author: Connor Doman
 */

"use client";

import { useState } from "react";

const TextInput = () => {
    const [text, setText] = useState<string>("");

    return <input type="text" value={text} onChange={() => null} />;
};
