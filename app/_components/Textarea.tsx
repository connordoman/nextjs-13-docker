"use client";
/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps {
    className?: string;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
}

export const Textarea = ({ className, children, onChange }: TextareaProps) => {
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetValue = event.target.value as string;
        setValue(targetValue);

        if (onChange) {
            onChange(targetValue);
        }
    };

    return (
        <textarea
            className={twMerge(
                "resize-y bg-gray-200 px-4 py-2 rounded-md active:brightness-75 hover:brightness-105 focus:outline-dotted outline-1 w-full h-48",
                className
            )}
            value={value}
            onChange={handleChange}>
            {children}
        </textarea>
    );
};
