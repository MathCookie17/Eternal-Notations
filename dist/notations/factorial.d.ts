import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Represents numbers in terms of factorials, so 24 is "4!" and 720 is "6!".
 * @param iterations ( number ) The amount of factorial iterations: 1 is factorial notation, 2 is double factorial (as in (x!)!, not the other meaning of "multifactorial"), and so on. This can be negative: with -1 iterations, 4 would be "24¡".
 * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
 */
export declare class FactorialNotation extends Notation {
    iterations: number;
    private _max_in_a_row;
    factorialChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    constructor(iterations?: number, max_in_a_row?: number, factorialChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, innerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
}
/**
 * A variant of factorial notation that uses a different amount of factorial iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 3628800, i.e. 10!.
 * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of factorial iterations. Default is 1.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
 */
export declare class MultiFactorialNotation extends Notation {
    private _maxnum;
    private _max_in_a_row;
    minIterations: number;
    private _engineerings;
    factorialChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, engineerings?: DecimalSource | DecimalSource[], factorialChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, innerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
}
