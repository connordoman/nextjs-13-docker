/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */

import { twMerge } from "tailwind-merge";

export interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export const Button = ({ className, children }: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "bg-gray-200 px-4 py-2 rounded-md active:brightness-75 hover:brightness-105 focus:outline-dotted outline-1",
                className
            )}>
            {children}
        </button>
    );
};
