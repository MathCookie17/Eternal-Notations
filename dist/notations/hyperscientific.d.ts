import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Scientific notation, but with tetration instead of exponentiation. Abbreviates 9 as "9F0", 1,000 as "3F1", and 10^10^10^10 as "1F4".
 * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in hyperscientific notation. Default is 1e10.
 * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2F0". Default is false.
 * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is true.
 * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class HyperscientificNotation extends Notation {
    private _maxnum;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    private _mantissaPower;
    iteration_zero: boolean;
    private _base;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, base?: DecimalSource, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get mantissaPower(): DecimalSource;
    set mantissaPower(mantissaPower: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
/**
 * This notation performs hyperscientific notation a certain number of times. 1 iteration means the number is in the form AFB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AFBFC, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
 * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is false.
 * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
export declare class HyperscientificIterationsNotation extends Notation {
    private _iterations;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    private _base;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    superexpAfter: boolean;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, base?: DecimalSource, expChars?: [[string, string], [string | boolean, string | boolean], [string, string]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, superexpAfter?: boolean, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get iterations(): number;
    set iterations(iterations: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string]]);
}
