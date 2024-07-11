import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates numbers in terms of their super-logarithm, so 10 is "F1" and 10^10^10 is "F3". Uses the linear approximation of tetration.
 * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Super-Logarithm notation, 2 is double Super-Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "slg10,000,000,000".
 * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
 * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
 * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class SuperLogarithmNotation extends Notation {
    private _iterations;
    max_Fs_in_a_row: number;
    private _base;
    expChars: [[string, string], [string, string], [string, string]];
    logChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    baseShown: number;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_Fs_in_a_row?: number, base?: DecimalSource, expChars?: [[string, string], [string, string], [string, string]], logChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, baseShown?: number, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
}
/**
 * A variant of super-logarithm notation that uses a different amount of super-logarithm iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
 * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
 * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class MultiSuperLogarithmNotation extends Notation {
    private _maxnum;
    max_Fs_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    expChars: [[string, string], [string, string], [string, string]];
    logChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    baseShown: number;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_Fs_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expChars?: [[string, string], [string, string], [string, string]], logChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, baseShown?: number, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
}
