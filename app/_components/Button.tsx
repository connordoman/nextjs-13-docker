/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */
"use client";

import { twMerge } from "tailwind-merge";

export interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ className, children, onClick }: ButtonProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={twMerge(
                "bg-gray-200 px-4 py-2 rounded-md active:brightness-75 hover:brightness-105 focus:outline-dotted outline-1 text-zinc-700",
                className
            )}
            onClick={() => handleClick()}>
            {children}
        </button>
    );
};
