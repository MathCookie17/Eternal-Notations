import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, fractionApproximationD } from "./utils.js";
import { Notation } from "./notation.js";
import { DefaultNotation } from "./defaultNotation.js";

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
     * @param showUnitDenominator ( boolean ) Controls whether the denominator is displayed even if it's 1. Default is false. For mixed numbers, if this parameter is false, then whole numbers are just abbreviated using wholeInnerNotation directly.
     */
export class FractionNotation extends Notation {
    public precision : Decimal;
    public mixedNumber : boolean = false;
    public maxIterations: number = Infinity;
    public maxDenominator : Decimal = Decimal.dInf;
    public strictMaxDenominator : boolean = false;
    public maxNumerator : Decimal = Decimal.dInf;
    public strictMaxNumerator : boolean = false;
    public delimiters : [[string, string], [string, string], [string, string]] = [["", ""], ["/", ""], ["", " "]];
    public delimiterPermutation : number = 1;
    public numeratorInnerNotation : Notation = new DefaultNotation();
    public wholeInnerNotation : Notation = this.numeratorInnerNotation;
    public denominatorInnerNotation : Notation = this.numeratorInnerNotation;
    public showUnitDenominator : boolean = false;

    constructor(
        precision : DecimalSource,
        mixedNumber : boolean = false,
        maxIterations : number = Infinity,
        maxDenominator : DecimalSource = Decimal.dInf,
        strictMaxDenominator : boolean = false,
        maxNumerator : DecimalSource = Decimal.dInf,
        strictMaxNumerator : boolean = false,
        delimiters : [[string, string], [string, string], [string, string]] = [["", ""], ["/", ""], ["", " "]],
        delimiterPermutation : number = 1,
        numeratorInnerNotation : Notation = new DefaultNotation(),
        wholeInnerNotation : Notation = numeratorInnerNotation,
        denominatorInnerNotation : Notation = numeratorInnerNotation,
        showUnitDenominator : boolean = false,
    ) {
        super();
        this.precision = toDecimal(precision);
        this.mixedNumber = mixedNumber;
        this.maxIterations = maxIterations;
        this.maxDenominator = toDecimal(maxDenominator);
        this.strictMaxDenominator = strictMaxDenominator;
        this.maxNumerator = toDecimal(maxNumerator);
        this.strictMaxNumerator = strictMaxNumerator;
        this.delimiters = delimiters;
        this.delimiterPermutation = delimiterPermutation;
        this.numeratorInnerNotation = numeratorInnerNotation;
        this.wholeInnerNotation = wholeInnerNotation;
        this.denominatorInnerNotation = denominatorInnerNotation;
        this.showUnitDenominator = showUnitDenominator;
    }

    public name = "Fraction Notation";

    public formatDecimal(value: Decimal): string {
        let fraction = fractionApproximationD(value, this.precision, (this.mixedNumber ? 3 : 1), this.maxIterations, this.maxDenominator, this.strictMaxDenominator, this.maxNumerator, this.strictMaxNumerator);
        if (fraction.length == 2) fraction.unshift(Decimal.dZero);
        if (fraction[0].eq(0) && fraction[1].eq(0)) return this.wholeInnerNotation.format(0);
        if (this.mixedNumber && !this.showUnitDenominator && fraction[1].eq(0) && fraction[2].eq(1)) return this.wholeInnerNotation.format(fraction[0]);
        let orderArray = [1];
        orderArray.splice(this.delimiterPermutation % 2, 0, 2);
        orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 3);
        let result = "";
        while (orderArray.length > 0) {
            if (orderArray[0] == 1 && (fraction[1].neq(0) || !this.mixedNumber)) result += this.delimiters[0][0] + this.numeratorInnerNotation.format(fraction[1]) + this.delimiters[0][1];
            else if (orderArray[0] == 2 && (this.showUnitDenominator || fraction[2].neq(1)) && (fraction[1].neq(0) || !this.mixedNumber)) result += this.delimiters[1][0] + this.denominatorInnerNotation.format(fraction[2]) + this.delimiters[1][1];
            else if (orderArray[0] == 3 && fraction[0].neq(0)) result += this.delimiters[2][0] + this.wholeInnerNotation.format(fraction[0]) + this.delimiters[2][1];
            orderArray.shift();
        }
        return result;
    }
}