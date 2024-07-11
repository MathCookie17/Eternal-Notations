import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * Given an array of strings with values, takes a nonnegative Decimal value and converts it into an array that contains how many of each of those strings you'd need to add up to that value.
 * @param value The value to be converted.
 * @param numerals An array of pairs of strings and Decimals, sorted from highest to lowest Decimal. This function may not work if the numerals aren't sorted correctly.
 * @param rounding Rounds the value to the nearest multiple of this value. Default is the value of the lowest string.
 * @param roundType Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @returns An array of pairs of strings and Decimals, where each Decimal is the amount of that corresponding string; if you multiply the value of each string by its corresponding Decimal in the returned array and sum those values, you get back the original value.
 */
export declare function SignValueArray(value: DecimalSource, numerals: [string, DecimalSource][], rounding?: DecimalSource, roundType?: string): [string, Decimal][];
/**
 * Same as SignValueArray, except each entry of the array contains three entries instead of two, with the third being the Decimal value of that entry's string.
 * @param value The value to be converted.
 * @param numerals An array of pairs of strings and Decimals, sorted from highest to lowest Decimal. This function may not work if the numerals aren't sorted correctly.
 * @param rounding Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
 * @param roundType Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @returns An array of [string, Decimal, Decimal] triples, where each first Decimal is the amount of that corresponding string and each second Decimal is the value of that string; if you multiply the two Decimals in each entry in the returned array and sum those products, you get back the original value (minus any part smaller than the smallest numeral).
 */
export declare function DetailedSignValueArray(value: DecimalSource, numerals: [string, DecimalSource][], rounding?: DecimalSource, roundType?: string): [string, Decimal, Decimal][];
/**
 * Takes a detailed sign value array as returned by DetailedSignValueArray, and gives back the total value in that array.
 */
export declare function findSignValue(arr: [string, Decimal, Decimal][]): Decimal;
/**
 * Given an array of sign-value numerals such as Roman numerals, converts the number into that sign-value system. For example, given the Roman numerals themselves, 325 becomes CCCXXV.
 * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
 * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
 * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
 * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
 * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like M(6). Default is ["(", ")"].
 * @param zero ( string ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
export declare class SignValueNotation extends Notation {
    private _numerals;
    rounding: Decimal;
    frontToBack: boolean;
    roundType: string;
    max_in_a_row: number;
    separator: string;
    delimiters: [string, string];
    zero: string;
    innerNotation: Notation;
    constructor(numerals: [string, DecimalSource][], rounding?: DecimalSource, frontToBack?: boolean, roundType?: string, max_in_a_row?: number, separator?: string, delimiters?: [string, string], zero?: string, innerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get numerals(): [string, DecimalSource][];
    set numerals(numerals: [string, DecimalSource][]);
}
/**
 * A variant of SignValueNotation where the numbers in truncated expressions are themselves notated in this notation. Once the parentheses are deep enough, brackets are introduced to represent the number of parentheses layers, and later on braces are introduced to represent the number of bracket layers.
 * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
 * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
 * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
 * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
 * @param max_nestingP ( number ) The maximum layers of nesting of parentheses - any more layers and brackets are introduced. Default is 3.
 * @param max_nestingB ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Is the same as maxNestingP by default.
 * @param mantissaPower ( Decimal ) Normally, once brackets are introduced, the number in parentheses is limited to between 1 and the value of the numeral that has the brackets on it, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower, the bounds are (value) and (value^2), and so on. For example, a number represented with Roman numerals as M[VI](I) with 0 mantissaPower becomes M[V](M) with 1 mantissaPower and M[IV](M(M)) with 2 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets and parentheses is limited to between (value of the numeral in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented with Roman numerals as M{V}(M) with 1 hypermantissaPower becomes M{VI}(I) with 0 hypermantissaPower and M{IV}[M](I) with 2 mantissaPower.
 * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
 * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that determine what goes before and after the number in a truncated expression like M(6). The first two strings replace parentheses, the middle two replace brackets, and the last two replace braces. Default is [["(", ")"], ["[", "]"], ["{", "}"]].
 * @param delimiterPermutation ( number ) The order that the numeral, parentheses, brackets, and braces go in when multiple are present. Default is 9, which corresponds to [numeral, braces, brackets, parentheses]. Each value from 0 to 23 represents a different ordering.
 * @param zero ( number ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
 * @param showOnLarge ( [boolean, boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 * showOnLarge[0] is for when parentheses are the highest delimiter, showOnLarge[1] is for when brackets are the highest delimiter, and showOnLarge[2] is for when braces are the highest delimiter.
 *
 * This notation does not have an InnerNotation parameter.
 */
export declare class NestedSignValueNotation extends Notation {
    private _numerals;
    rounding: Decimal;
    frontToBack: boolean;
    roundType: string;
    max_in_a_row: number;
    max_nestingP: number;
    max_nestingB: number;
    mantissaPower: Decimal;
    hypermantissaPower: Decimal;
    separator: string;
    delimiters: [[string, string], [string, string], [string, string]];
    delimiterPermutation: number;
    zero: string;
    showOnLarge: [boolean, boolean, boolean];
    constructor(numerals: [string, DecimalSource][], rounding?: DecimalSource, frontToBack?: boolean, roundType?: string, max_in_a_row?: number, max_nestingP?: number, max_nestingB?: number, mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, separator?: string, delimiters?: [[string, string], [string, string], [string, string]], delimiterPermutation?: number, zero?: string, showOnLarge?: [boolean, boolean, boolean]);
    name: string;
    formatDecimal(value: Decimal): string;
    get numerals(): [string, DecimalSource][];
    set numerals(numerals: [string, DecimalSource][]);
}
