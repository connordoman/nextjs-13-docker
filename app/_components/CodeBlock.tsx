/*
 * Created on Sat Oct 21 2023
 * Author: Connor Doman
 */

import React from "react";
import { Light } from "react-syntax-highlighter";
import { githubGist } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface CodeBlockProps {
    children: React.ReactNode;
    className: string;
}

export const CodeBlock = ({ children, className = "", ...rest }: CodeBlockProps) => {
    const language = className.replace(/language-/, "");

    return language ? (
        <Light {...rest} language={language} style={githubGist} PreTag="div">
            {String(children)}
        </Light>
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    );
};

export default CodeBlock;
