import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Like hyperscientific notation, but with repeated factorials instead of tetration. For example, 6 (3!) could be 3!1, 4!2 means 4!! (which is around 6.2e23), and 7!20 means 7!!!!!!... with 20 !'s.
 * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-hyperscientific notation. Default is 3628800.
 * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param limit ( Decimal ) If the mantissa is below the limit, a factorial is removed to bring the mantissa back above the limit. Default is 3.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 6 to just be abbreviated as "6" instead of "3!1". Default is false.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class FactorialHyperscientificNotation extends Notation {
    maxnum: Decimal;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    private _limit;
    iteration_zero: boolean;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], limit?: DecimalSource, iteration_zero?: boolean, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get limit(): DecimalSource;
    set limit(limit: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
/**
 * This notation performs factorial-hyperscientific notation a certain number of times. 1 iteration means the number is in the form A!B (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A!B!C, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param limit ( Decimal ) If the mantissa is equal to or above the limit, another factorial is taken to bring the mantissa back above the limit. Default is 3.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class FactorialHyperscientificIterationsNotation extends Notation {
    private _iterations;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    private _limit;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], limit?: DecimalSource, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get limit(): DecimalSource;
    set limit(limit: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
