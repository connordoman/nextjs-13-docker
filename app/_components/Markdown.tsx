/*
 * Created on Sat Oct 21 2023
 * Author: Connor Doman
 */
"use client";
import Markdown from "react-markdown";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightEighties as style } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface MarkdownProps {
    text?: string;
    children?: React.ReactNode;
}

export const PalMarkdown = ({ text, children }: MarkdownProps) => {
    return (
        <Markdown
            children={text || String(children)}
            components={{
                code({ children, className, node, ...rest }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                        <SyntaxHighlighter
                            language={match[1]}
                            PreTag="div"
                            children={String(children).replace(/\n$/, "")}
                            style={style}
                            className="pre-code"
                        />
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    );
                },
            }}
        />
    );
};
