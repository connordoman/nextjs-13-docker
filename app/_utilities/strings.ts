/*
 * Created on Tue Sep 26 2023
 * Author: Connor Doman
 */

export const NUMBER_REGEX = /^-?\d+(?:\.\d+)?$/;

export const isNumber = (value: string): boolean => {
    return NUMBER_REGEX.test(value);
};
