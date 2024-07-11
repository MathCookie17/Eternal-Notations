import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates numbers in terms of their logarithm, so 10^12 is "e12" and 2 is "e0.301".
 * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Logarithm notation, 2 is double Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "lg100".
 * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
 * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class LogarithmNotation extends Notation {
    iterations: number;
    max_es_in_a_row: number;
    private _base;
    negLogBehavior: boolean;
    expChars: [[string, string], [string, string], [string, string]];
    logChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    baseShown: number;
    private _expMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_es_in_a_row?: number, base?: DecimalSource, negLogBehavior?: boolean, expChars?: [[string, string], [string, string], [string, string]], logChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, baseShown?: number, expMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
}
/**
 * A variant of logarithm notation that uses a different amount of logarithm iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e12.
 * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
export declare class MultiLogarithmNotation extends Notation {
    private _maxnum;
    max_es_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    negLogBehavior: boolean;
    expChars: [[string, string], [string, string], [string, string]];
    logChars: [[string, string], [string, string], [string, string]] | null;
    superexpAfter: boolean;
    baseShown: number;
    private _expMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_es_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], negLogBehavior?: boolean, expChars?: [[string, string], [string, string], [string, string]], logChars?: [[string, string], [string, string], [string, string]] | null, superexpAfter?: boolean, baseShown?: number, expMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
}
