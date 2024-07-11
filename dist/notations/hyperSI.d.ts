import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates a number using "hyper-SI" prefixes that represent the tetra-powers of 10: 10 is 1 Pl, 100 is 2 Pl, 10^9 is 9 Pl, 10^10 is 1 Dg, 10^100 is 2 Dg, 10^10^9 is 9 Dg, 10^10^10 is 1 Bi, and so on. It's similar to hyperscientific, but with the hyper-exponent replaced by an equivalent prefix abbreviation.
 * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (slogBase) and (slogBase^smallest prefix), at 2 mantissaPower the bounds are (slogBase^slogBase) and (slogBase^slogBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
export declare class HyperSINotation extends Notation {
    private _slogBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    private _mantissaPower;
    space: string;
    separator: string;
    delimiters: [string, string];
    zero: string;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    constructor(slogBase?: DecimalSource, prefixes?: [string, DecimalSource][], negaPrefixes?: [string, DecimalSource][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, mantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [string, string], zero?: string, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get slogBase(): DecimalSource;
    set slogBase(slogBase: DecimalSource);
    get prefixes(): [string, DecimalSource][];
    set prefixes(prefixes: [string, DecimalSource][]);
    get negaPrefixes(): [string, DecimalSource][] | string;
    set negaPrefixes(negaPrefixes: [string, DecimalSource][] | string);
    get mantissaPower(): DecimalSource;
    set mantissaPower(mantissaPower: DecimalSource);
}
/**
 * A variant of HyperSINotation where the numbers in truncated expressions are themselves notated in this notation.
 * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase^smallest prefix), at 2 mantissaPower the bounds are (logBase^logBase) and (logBase^logBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
 * @param delimitersBefore ( boolean ) If this is true, the number and delimiters in a truncated expression go before the prefix instead of after. Default is false.
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param showOnLarge ( boolean ) This parameter shows whether the numeral that the delimiters are placed on is shown - if it's true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 */
export declare class NestedHyperSINotation extends Notation {
    private _slogBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    private _mantissaPower;
    space: string;
    separator: string;
    delimiters: [string, string];
    delimitersBefore: boolean;
    zero: string;
    innerNotation: Notation;
    showOnLarge: boolean;
    constructor(slogBase?: DecimalSource, prefixes?: [string, DecimalSource][], negaPrefixes?: [string, DecimalSource][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, mantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [string, string], delimitersBefore?: boolean, zero?: string, innerNotation?: Notation, showOnLarge?: boolean);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get slogBase(): DecimalSource;
    set slogBase(slogBase: DecimalSource);
    get prefixes(): [string, DecimalSource][];
    set prefixes(prefixes: [string, DecimalSource][]);
    get negaPrefixes(): [string, DecimalSource][] | string;
    set negaPrefixes(negaPrefixes: [string, DecimalSource][] | string);
    get mantissaPower(): DecimalSource;
    set mantissaPower(mantissaPower: DecimalSource);
}
