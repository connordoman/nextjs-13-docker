"use client";
/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */

import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { isNumber } from "../_utilities/strings";

export type InputType = "text" | "password" | "email" | "number" | "tel" | "url";

export function parseInputEvent(event: React.ChangeEvent<HTMLInputElement>): string | number {
    const valueAsString: string = event.target.value;

    switch (event.target.type) {
        case "number":
            return parseInt(valueAsString);
        default:
            return valueAsString;
    }
}

export interface InputProps {
    type?: InputType;
    placeholder?: string;
    className?: string;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
    value?: string;
}

export const Input = ({ type, placeholder, className, children, onChange, value }: InputProps) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInputEvent(event);
        if (onChange) {
            onChange(value as string);
        }
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            className={twMerge(
                "border-2 border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-black",
                className
            )}
            onChange={handleChange}
            value={value}>
            {children}
        </input>
    );
};

export const TextInput = ({ placeholder, className, children }: InputProps) => {
    return (
        <Input type="text" placeholder={placeholder} className={twMerge("", className)}>
            {children}
        </Input>
    );
};

export const PasswordInput = ({ placeholder, className, children, onChange }: InputProps) => {
    return (
        <Input type="password" placeholder={placeholder} className={twMerge("", className)}>
            {children}
        </Input>
    );
};

export interface NumberInputProps extends InputProps {
    min?: number;
    max?: number;
    step?: number;
}

export const NumberInput = ({ min, max, step, placeholder, className, children, onChange }: NumberInputProps) => {
    const handleChange = (value: string) => {
        const isValueNumber = isNumber(value);
        if (!isValueNumber) {
            return;
        }

        const valueAsNumber = parseFloat(value);

        if (onChange) {
            onChange(value);
        }
    };
    return (
        <Input type="number" placeholder={placeholder} className={twMerge("", className)}>
            {children}
        </Input>
    );
};

export default Input;
