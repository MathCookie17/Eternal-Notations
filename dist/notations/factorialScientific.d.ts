import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Like scientific notation, but with factorials instead of exponents. Abbreviates 12 as "2 * 3!" and 16! as "1 * 16!". For larger numbers, switches to abbreviations like "(8 * 17!)!" and eventually "(!5)5.6 * 7!", the latter of which means "start with 5.6 * 7! and take the factorial of it 5 times".
 * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-scientific notation. Default is 3628800.
 * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 1 to just be abbreviated as "1" instead of "1 * 1!". Default is false.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / ", "!"], ["1 / ", ""]].
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class FactorialScientificNotation extends Notation {
    private _maxnum;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    iteration_zero: boolean;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
/**
 * This notation performs factorial-scientific notation a certain number of times. 1 iteration means the number is in the form A * B! (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A * (B * C!)!, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / (", ")!"], ["1 / ", ""]].
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class FactorialScientificIterationsNotation extends Notation {
    private _iterations;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    _engineerings: Decimal[];
    mantissaPower: Decimal;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
