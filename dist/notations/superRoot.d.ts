import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates numbers in terms of their super-root; this is the square super-root by default, so 256 is 4↑↑2 and 46,656 is 6↑↑2.
 * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
 * @param iterations ( number ) The amount of super-root iterations: 1 is regular Super-Root notation, 2 means the super-root is taken twice, and so on. This can be negative.
 * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class SuperRootNotation extends Notation {
    private _height;
    private _iterations;
    max_in_a_row: number;
    rootChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(height?: number, iterations?: number, max_Fs_in_a_row?: number, rootChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get height(): number;
    set height(height: number);
    get iterations(): number;
    set iterations(iterations: number);
}
/**
 * A variant of super-root notation that uses a different amount of super-root iterations depending on how large the number is.
 * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of super-root iterations. Default is 1.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class MultiSuperRootNotation extends Notation {
    private _height;
    private _maxnum;
    max_in_a_row: number;
    minIterations: number;
    private _engineerings;
    rootChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(height?: number, maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, engineerings?: DecimalSource | DecimalSource[], rootChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get height(): number;
    set height(height: number);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * A variant of super-root notation that uses a different super-root height depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 65536.
 * @param minHeight ( number ) The minimum super-root height. Default is 2.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class IncreasingSuperRootNotation extends Notation {
    private _maxnum;
    private _minHeight;
    private _engineerings;
    rootChars: [[string, string], [string, string], [string, string]];
    inverseChars: [[string, string], [string, string], [string, string]] | null;
    heightShown: number;
    innerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, minHeight?: number, engineerings?: DecimalSource | DecimalSource[], rootChars?: [[string, string], [string, string], [string, string]], inverseChars?: [[string, string], [string, string], [string, string]] | null, heightShown?: number, innerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get minHeight(): number;
    set minHeight(minHeight: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
