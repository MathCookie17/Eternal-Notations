import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * Writes a number as a fraction that approximates its value. (The approximation is found via continued fractions).
 * @param precision ( Decimal ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
 * @param mixedNumber ( boolean ) If this is true, the fractions are written as mixed numbers, i.e. the whole part is separate from the fractional part. Default is false.
 * @param maxIterations ( number ) The approximation will end after this many continued fractions iterations even if the desired precision has not been reached. Default is Infinity.
 * @param maxDenominator ( Decimal ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
 * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
 * @param maxNumerator ( Decimal ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
 * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
 * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of pairs of strings. Each pair of strings is placed around one of the numbers in the fraction to indicate which part of the fraction it is, with the first string in the pair coming before the number and the second string in the pair coming after the number. delimiters[0] goes with the numerator, delimiters[1] goes with the denominator, and delimiters[2] goes with the whole number if mixedNumber is true. Default is [["", ""], ["/", ""], ["", " "]].
 * @param delimiterPermutation ( number ) The order that the parts of the fraction go in. Default is 1, which corresponds to [whole, numerator, denominator]. Each value from 0 to 5 represents a different ordering.
 * @param numeratorInnerNotation ( Notation ) The notation that the numerator, and by default the rest of the fraction as well, is abbreviated in. DefaultNotation is the default.
 * @param wholeInnerNotation ( Notation ) The notation that the whole number in the mixed number fraction is abbreviated with. Is the same as numeratorInnerNotation by default.
 * @param denominatorInnerNotation ( Notation ) The notation that the denominator in the fraction is abbreviated with. Is the same as numeratorInnerNotation by default.
 * @param showUnitDenominator ( boolean ) Controls whether the denominator is displayed even if it's 1. Default is false. This does not apply to mixed numbers, since there the fractional part is always hidden if it's zero.
 */
export declare class FractionNotation extends Notation {
    precision: Decimal;
    mixedNumber: boolean;
    maxIterations: number;
    maxDenominator: Decimal;
    strictMaxDenominator: boolean;
    maxNumerator: Decimal;
    strictMaxNumerator: boolean;
    delimiters: [[string, string], [string, string], [string, string]];
    delimiterPermutation: number;
    numeratorInnerNotation: Notation;
    wholeInnerNotation: Notation;
    denominatorInnerNotation: Notation;
    showUnitDenominator: boolean;
    constructor(precision: DecimalSource, mixedNumber?: boolean, maxIterations?: number, maxDenominator?: DecimalSource, strictMaxDenominator?: boolean, maxNumerator?: DecimalSource, strictMaxNumerator?: boolean, delimiters?: [[string, string], [string, string], [string, string]], delimiterPermutation?: number, numeratorInnerNotation?: Notation, wholeInnerNotation?: Notation, denominatorInnerNotation?: Notation, showUnitDenominator?: boolean);
    name: string;
    formatDecimal(value: Decimal): string;
}
