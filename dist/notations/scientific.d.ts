import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Scientific notation. Abbreviates 9 as "9e0" and 10^50 as "1e50". For larger numbers, switches to abbreviations like "e1e17" and eventually "(e^7)1e6", similarly to break_eternity's default toString.
 * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in scientific notation. Default is 1e12.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2e0". Default is false.
 * @param base ( Decimal ) Scientific notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "1e2".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", and expChars[2] takes the place of the (e^) in (e^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class ScientificNotation extends Notation {
    private _maxnum;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    iteration_zero: boolean;
    private _base;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    private _expMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, base?: DecimalSource, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, expMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
/**
 * This notation performs scientific notation a certain number of times. 1 iteration means the number is in the form AeB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AeBeC, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param base ( Decimal ) Scientific notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "1e2".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", and expChars[2] takes the place of the (e^) in (e^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class ScientificIterationsNotation extends Notation {
    private _iterations;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    _base: Decimal;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    private _expMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, base?: DecimalSource, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, expMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
