/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */

import { twMerge } from "tailwind-merge";

export interface HorizontalRuleProps {
    margin?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
    className?: string;
}

export const HorizontalRule = ({ className, margin }: HorizontalRuleProps) => {
    const computedMargin = () => {
        switch (margin) {
            case "sm":
                return "my-1";
            case "md":
                return "my-2";
            case "lg":
                return "my-3";
            case "xl":
                return "my-4";
            case "2xl":
                return "my-5";
            case "3xl":
                return "my-6";
            case "4xl":
                return "my-7";
            case "5xl":
                return "my-8";
            case "6xl":
                return "my-9";
            case "7xl":
                return "my-10";
            case "8xl":
                return "my-11";
            case "9xl":
                return "my-12";
            default:
                return "my-2";
        }
    };

    return <hr className={twMerge("border-1 bg-gray-300 w-full", computedMargin(), className)} />;
};

export default HorizontalRule;
