import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates a number using the SI prefixes: 1,000 is 1 k, 10^12 is 1 T, 10^30 is 1 Q, 10^33 is 1 kQ, 10^72 is 1 TQQ, 10^300 is 1 Q[10], and so on.
 * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Q[6]. Default is ["[", "]"].
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
export declare class SINotation extends Notation {
    private _logBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    mantissaPower: Decimal;
    space: string;
    separator: string;
    delimiters: [string, string];
    zero: string;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    constructor(logBase?: DecimalSource, prefixes?: [string, DecimalSource][], negaPrefixes?: [string, DecimalSource][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, mantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [string, string], zero?: string, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get logBase(): DecimalSource;
    set logBase(logBase: DecimalSource);
    get prefixes(): [string, DecimalSource][];
    set prefixes(prefixes: [string, DecimalSource][]);
    get negaPrefixes(): [string, DecimalSource][] | string;
    set negaPrefixes(negaPrefixes: [string, DecimalSource][] | string);
}
/**
 * A variant of SINotation where the numbers in truncated expressions are themselves notated in this notation. Once the brackets are deep enough, braces are introduced to represent the number of brackets layers.
 * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
 * @param max_nesting ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Default is 3.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets is limited to between (value of the prefix in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented as Q{5}(10) with 0 hypermantissaPower becomes Q{4}(1 Q[10]) with 0 hypermantissaPower and Q{4}(Q[1 Q[10]]) with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [[string, string], [string, string]] ) An array of two pairs of strings that determine what goes before and after the number in a truncated expression like Q[6]. The first two strings replace brackets, the last two replace braces. Default is [["[", "]"], ["{", "}"]].
 * @param delimiterPermutation ( number ) The order that the numeral, brackets, and braces go in when multiple are present. Default is 3, which corresponds to [numeral, braces, brackets]. Each value from 0 to 5 represents a different ordering.
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param showOnLarge ( [boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 * showOnLarge[0] is for when brackets are the highest delimiter, showOnLarge[1] is for when braces are the highest delimiter.
 */
export declare class NestedSINotation extends Notation {
    private _logBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    private _max_nesting;
    mantissaPower: Decimal;
    private _hypermantissaPower;
    space: string;
    separator: string;
    delimiters: [[string, string], [string, string]];
    delimiterPermutation: number;
    zero: string;
    innerNotation: Notation;
    showOnLarge: [boolean, boolean];
    constructor(logBase?: DecimalSource, prefixes?: [string, DecimalSource][], negaPrefixes?: [string, DecimalSource][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, max_nesting?: number, mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [[string, string], [string, string]], delimiterPermutation?: number, zero?: string, innerNotation?: Notation, showOnLarge?: [boolean, boolean]);
    name: string;
    formatDecimal(value: Decimal): string;
    get logBase(): DecimalSource;
    set logBase(logBase: DecimalSource);
    get prefixes(): [string, DecimalSource][];
    set prefixes(prefixes: [string, DecimalSource][]);
    get negaPrefixes(): [string, DecimalSource][] | string;
    set negaPrefixes(negaPrefixes: [string, DecimalSource][] | string);
    get hypermantissaPower(): DecimalSource;
    set hypermantissaPower(hypermantissaPower: DecimalSource);
    get max_nesting(): number;
    set max_nesting(max_nesting: number);
}
