import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates numbers in terms of how many times you'd have to apply factorial to 3 to get to them, so 3 is 3!0, 6 is 3!1, and 720 is 3!2.
 * @param iterations ( number ) The amount of factorial-amount iterations.
 * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
 * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class FactorialAmountNotation extends Notation {
    private _iterations;
    private _max_in_a_row;
    private _base;
    factorialChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    baseShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_in_a_row?: number, base?: DecimalSource, factorialChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, baseShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
}
/**
 * A variant of factorial amount notation that uses a different amount of iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class MultiFactorialAmountNotation extends Notation {
    private _maxnum;
    _max_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    factorialChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    baseShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], factorialChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, baseShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
}
