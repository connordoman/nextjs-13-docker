/*
 * Created on Mon Sep 25 2023
 * Author: Connor Doman
 */

import { twMerge } from "tailwind-merge";

export interface HeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    children?: React.ReactNode;
}
export const Heading = ({ level, className, children }: HeadingProps) => {
    const commonClasses = "font-bold font-sans";

    switch (level) {
        case 6:
            return <h6 className={twMerge(commonClasses, "text-xl", className)}>{children}</h6>;
        case 5:
            return <h5 className={twMerge(commonClasses, "text-2xl", className)}>{children}</h5>;
        case 4:
            return <h4 className={twMerge(commonClasses, "text-3xl", className)}>{children}</h4>;
        case 3:
            return <h3 className={twMerge(commonClasses, "text-4xl", className)}>{children}</h3>;
        case 2:
            return <h2 className={twMerge(commonClasses, "text-5xl", className)}>{children}</h2>;
        case 1:
            return <h1 className={twMerge(commonClasses, "text-6xl", className)}>{children}</h1>;
    }
};

export default Heading;
