/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */
import { twMerge } from "tailwind-merge";

export interface CodeProps {
    className?: string;
    children?: React.ReactNode;
}

export const Code = ({ className, children }: CodeProps) => {
    return <code className={twMerge("font-mono bg-gray-200 px-2 py-1 rounded-md", className)}>{children}</code>;
};

export default Code;
