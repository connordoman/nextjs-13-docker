import { useState } from "react";

const TextInput = () => {
    const [text, setText] = useState<string>("");

    return <input type="text" value={text} onChange={() => null} />;
};
