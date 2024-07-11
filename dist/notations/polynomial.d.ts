import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Writes numbers in the form of a polynomial-ish expression, with x having a certain value. For example, if x is 10, then 346 is written as 3x^2 + 4x + 6.
 * @param value ( Decimal ) The value of x. Default is 10.
 * @param formatExponents ( number ) If this parameter is positive, then exponents are also written as polynomials, so x^x, x^(3x + 2), x^x^4x, and so on can appear. If this parameter is negative, the exponents are only written as numbers. If this parameter is zero, the exponents are not written at all. Default is 1.
 * @param minimumTerm ( Decimal ) The lowest power of x that gets a term, which may have a non-whole coefficient to account for what would be terms below this one. Default is 0, i.e. the constant term.
 * @param fractionInverse ( boolean ) This parameter controls how negative powers of x are handled.
 * If this parameter is true, then the powers of x continue below the constant term, so if x = 10, then 1.25 is written as 1 + 2x^-1 + 5x^-2.
 * If this parameter is false, then the negative powers of x use denominators instead of negative exponents, so if x = 10, then 1.25 is written as 1 + 2/x + 5/x^2.
 * Default is true.
 * @param maxTerms ( number ) The highest amount of terms shown; terms after the first few are cut off. Default is 8.
 * @param variableStr ( string ) The string used to represent the variable. Default is "x".
 * @param maxMultiTerm ( Decimal ) Only values below this have multiple terms shown. Values above this only show a single term and a coefficient (which may be non-whole). Default is value^^3 or 3^30, whichever is larger.
 * @param maxSingleTerm ( Decimal ) Values above this are considered too big to show on their own, so they get an x^ placed before them and are written in terms of that exponent. Default is value^^5.
 * @param maxExps ( number ) The highest amount of x^'s that can be placed before the polynomial in a row; any more than this and they're abbreviated in (x^)^n form. Default is 5.
 * @param showZeroTerms ( number ) If this parameter is negative, terms with a coefficient of zero are skipped. If this parameter is zero, then terms with a coefficient of zero are shown as long as there's some term with a nonzero coefficient later on. If this parameter is positive, terms, even those with a coefficient of zero, continue to be shown until the maximum amount of terms is hit. Default is -1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param additionSign ( string ) This string is placed between each term. Default is " + ".
 * @param subtractionSign ( string ) This string is placed between each term for negative numbers. Default is " - ".
 * @param multiplicationSign ( string ) This string is placed between the coefficient and the variable term. Default is the empty string.
 * @param divisionSign ( string ) This string is placed between the coefficient and the variable term for terms below x^0 when inverseTerms is positive. Default is "/".
 * @param multiplicationBefore ( boolean ) If this parameter is true, the coefficient is placed before the variable instead of after. Default is true.
 * @param powerStrings ( [string, string] ) A pair of strings used to denote exponents on variables: powerStrings[0] goes before the exponent, powerStrings[1] goes after the exponent. Default is ["<sup>", "</sup>"].
 * @param coefficientStrings ( [string, string] ) A pair of strings used to denote coefficients on variables: coefficientStrings[0] goes before the coefficient, coefficientStrings[1] goes after the coefficient. Default is ["", ""].
 * @param parenthesizePower ( number ) If this parameter is negative, parentheses are not placed around the exponent. If this parameter is zero, parentheses are placed around the exponent if it contains variables, but not if it's just a number. If this parameter is positive, parentheses are always placed around the exponent. Default is -1.
 * @param unitCoefficientShown ( [boolean, boolean] ) If unitCoefficientShown[0] is true, the coefficient is shown even if it's 1. unitCoefficientShown[1] does the same thing, but for when divisionSign is used instead of for multiplicationSign. Default is [false, true].
 * @param unitPowerShown ( boolean ) Normally, the exponent on x is not shown if it's 1, but it's shown even in that case if unitPowerShown is true. Default is false.
 * @param expStrings ( [[string, string], [string, string], [string, string], [string, string]] ) An array of four pairs of strings that indicate exponentiation on large numbers. In each pair, expStrings[n][0] goes before the value in question, expStrings[n][1] goes after.
 * expStrings[0] replaces the x^() that directly surrounds the number when it's large enough to get x^'s before it. expStrings[1] concerns the rest of the x^'s - expStrings[0] is only for the innermost x^, expStrings[1] is for the rest.
 * expStrings[2] replaces the (x^)^n that indicates repeated exponentiation when that n is just a number, expStrings[3] does the same thing but for when that n contains variables.
 * Default is [["x^(", ")"], ["x^", ""], ["(x^)^", " "], ["(x^)^(", ") "]], where that x is replaced with whatever variableStr is.
 * @param superexpBefore ( boolean ) If this value is true, the repeated exponentiation string stuff comes before the polynomial instead of afterwards. Default is true.
 * @param frontSubtractionSign ( string ) This string is placed at the beginning of the expression for negative numbers. Is the same as subtractionSign by default.
 * @param constantStrings ( [string, string] ) A pair of strings used to denote the constant term: coefficientStrings[0] goes before the constant term, coefficientStrings[1] goes after the constant term. Default is ["", ""].
 * @param precision ( Decimal ) The expression will stop once it gets to within this level of precision compared to the original value, to ensure that meaningless terms (like an x^2 term in an expression with an x^2,000) from floating point imprecision aren't included. Default is 1.2e-16.
 * @param minimumTermRounding ( DecimalSource | ((value : Decimal) => Decimal) ) If the expression includes the minimum term, the minimum term is rounded to the nearest multiple of this value. If this parameter is a function, then the minimum term is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 */
export declare class PolynomialNotation extends Notation {
    private _value;
    formatExponents: number;
    minimumTerm: Decimal;
    fractionInverse: boolean;
    private _maxTerms;
    variableStr: string;
    maxMultiTerm: Decimal;
    maxSingleTerm: Decimal;
    maxExps: number;
    showZeroTerms: number;
    innerNotation: Notation;
    additionSign: string;
    subtractionSign: string;
    multiplicationSign: string;
    divisionSign: string;
    multiplicationBefore: boolean;
    powerStrings: [string, string];
    coefficientStrings: [string, string];
    parenthesizePower: number;
    unitCoefficientShown: [boolean, boolean];
    unitPowerShown: boolean;
    expStrings: [[string, string], [string, string], [string, string], [string, string]];
    superexpBefore: boolean;
    frontSubtractionSign: string;
    constantStrings: [string, string];
    precision: Decimal;
    minimumTermRounding: DecimalSource | ((value: Decimal) => Decimal);
    constructor(value?: DecimalSource, formatExponents?: number, minimumTerm?: DecimalSource, fractionInverse?: boolean, maxTerms?: number, variableStr?: string, maxMultiTerm?: DecimalSource, maxSingleTerm?: DecimalSource, maxExps?: number, showZeroTerms?: number, innerNotation?: Notation, additionSign?: string, subtractionSign?: string, multiplicationSign?: string, divisionSign?: string, multiplicationBefore?: boolean, powerStrings?: [string, string], coefficientStrings?: [string, string], parenthesizePower?: number, unitCoefficientShown?: [boolean, boolean], unitPowerShown?: boolean, expStrings?: [[string, string], [string, string], [string, string], [string, string]], superexpBefore?: boolean, frontSubtractionSign?: string, constantStrings?: [string, string], precision?: DecimalSource, minimumTermRounding?: DecimalSource | ((value: Decimal) => Decimal));
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get value(): DecimalSource;
    set value(value: DecimalSource);
    get maxTerms(): number;
    set maxTerms(maxTerms: number);
}
