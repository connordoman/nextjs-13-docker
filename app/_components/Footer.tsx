/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */
import { twMerge } from "tailwind-merge";

export interface FooterProps {
    className?: string;
    children?: React.ReactNode;
}

export const Footer = ({ className, children }: FooterProps) => {
    return (
        <footer className={twMerge("w-full border-t border-black px-8 py-4 sticky bottom-0 bg-white", className)}>
            {children}
        </footer>
    );
};

export default Footer;
