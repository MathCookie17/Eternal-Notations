import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * The progression of this notation is similar to Default notation: unabbreviated, then scientific, then hyperscientific. However, this notation is not itself a default: instead, it lets you customize the process.
 * @param maxnum ( Decimal ) The point at which the notation switches to scientific. Default is 1e12.
 * @param minnum ( Decimal ) The point below 1 at which the notation switches to scientific with a negative exponent. Default is 1e-6.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's than this, switches to F notation. Default is 5.
 * @param logBase ( Decimal ) The base of the scientific notation. Default is 10.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are base and base^^2, if hypermantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F8" would become "100F7" with 1 hypermantissaPower and "(1e100)F6" with 2 hypermantissaPower.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param hyperengineerings ( Decimal | DecimalSource[] ) Same as engineerings, but for the hyperexponent instead.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 1 on it), and expChars[3][1] (expChars[2][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["F", ""], ["F", ""]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the mantissa is itself notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param hyperexpFormat ( [boolean, boolean] ) A pair of booleans that determines whether the numbers in a hyperscientific expression are notated using ExpandedDefaultNotation itself rather than the innerNotations. The first entry is for the mantissa, the second is for the hyperexponent. This only applies to "xFy" expressions; "Fx" expressions (where x is over the maxnum) always formats x in ExpandedDefaultNotation itself. Default is [false, false].
 */
export declare class ExpandedDefaultNotation extends Notation {
    private _maxnum;
    private _minnum;
    max_es_in_a_row: number;
    private _logBase;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    mantissaPower: Decimal;
    private _hypermantissaPower;
    private _engineerings;
    private _hyperengineerings;
    private _expChars;
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    hyperexpBefore: boolean;
    private _expMult;
    private _hyperexpMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    hyperexpFormat: [boolean, boolean];
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, minnum?: DecimalSource, max_es_in_a_row?: number, logBase?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, engineerings?: DecimalSource[], hyperengineerings?: DecimalSource[], expChars?: [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, hyperexpBefore?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, hyperexpFormat?: [boolean, boolean]);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get minnum(): DecimalSource;
    set minnum(minnum: DecimalSource);
    get logBase(): DecimalSource;
    set logBase(logBase: DecimalSource);
    get hypermantissaPower(): DecimalSource;
    set hypermantissaPower(hypermantissaPower: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get hyperengineerings(): DecimalSource | DecimalSource[];
    set hyperengineerings(hyperengineerings: DecimalSource | DecimalSource[]);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]]);
}
