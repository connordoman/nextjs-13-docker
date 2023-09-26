/*
 * Created on Mon Sep 25 2023
 * Author: Connor Doman
 */

import { twMerge } from "tailwind-merge";

export interface MastheadProps {
    className?: string;
    children?: React.ReactNode;
}

export const Masthead = ({ className, children }: MastheadProps) => {
    return (
        <header className={twMerge("w-full border-b border-black px-8 py-4 sticky top-0 bg-white z-30", className)}>
            {children}
        </header>
    );
};

export default Masthead;
