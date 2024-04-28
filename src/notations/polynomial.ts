import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, round, scientifify } from "../baseline/utils.js";

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
export class PolynomialNotation extends Notation {
    private _value : Decimal = Decimal.dTen;
    public formatExponents : number = 1;
    public minimumTerm : Decimal = Decimal.dZero;
    public fractionInverse : boolean = true;
    private _maxTerms : number = 8;
    public variableStr : string = "x";
    public maxMultiTerm : Decimal = this._value.tetrate(3).max(3**30);
    public maxSingleTerm : Decimal = this._value.tetrate(5);
    public maxExps : number = 5;
    public showZeroTerms : number = -1;
    public innerNotation : Notation = new DefaultNotation();
    public additionSign : string = " + ";
    public subtractionSign : string = " - ";
    public multiplicationSign : string = "";
    public divisionSign : string = "/";
    public multiplicationBefore : boolean = true;
    public powerStrings : [string, string] = ["<sup>", "</sup>"];
    public coefficientStrings : [string, string] = ["", ""]
    public parenthesizePower : number = -1;
    public unitCoefficientShown : [boolean, boolean] = [false, true];
    public unitPowerShown : boolean = false;
    public expStrings : [[string, string], [string, string], [string, string], [string, string]];
    public superexpBefore : boolean = true;
    public frontSubtractionSign : string = this.subtractionSign;
    public constantStrings : [string, string] = ["", ""];
    public precision : Decimal = new Decimal(1.2e-16);
    public minimumTermRounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;

    constructor(
        value : DecimalSource = 10,
        formatExponents : number = 1,
        minimumTerm : DecimalSource = 0,
        fractionInverse : boolean = true,
        maxTerms : number = 8,
        variableStr : string = "x",
        maxMultiTerm : DecimalSource = Decimal.tetrate(value, 3).max(3**30),
        maxSingleTerm : DecimalSource = Decimal.tetrate(value, 5),
        maxExps : number = 5,
        showZeroTerms : number = -1,
        innerNotation : Notation = new DefaultNotation(),
        additionSign : string = " + ",
        subtractionSign : string = " - ",
        multiplicationSign : string = "",
        divisionSign : string = "/",
        multiplicationBefore : boolean = true,
        powerStrings : [string, string] = ["<sup>", "</sup>"],
        coefficientStrings : [string, string] = ["", ""],
        parenthesizePower : number = -1,
        unitCoefficientShown : [boolean, boolean] = [false, true],
        unitPowerShown : boolean = false,
        expStrings : [[string, string], [string, string], [string, string], [string, string]] = [[variableStr + "^(", ")"], [variableStr + "^", ""], ["(" + variableStr + "^)^", " "], ["(" + variableStr + "^)^(", ") "]],
        superexpBefore : boolean = true,
        frontSubtractionSign : string = subtractionSign,
        constantStrings : [string, string] = ["", ""],
        precision : DecimalSource = 1.2e-16,
        minimumTermRounding : DecimalSource | ((value : Decimal) => Decimal) = 0
    ) {
        super();
        this.formatExponents = formatExponents;
        this.value = value;
        this.minimumTerm = toDecimal(minimumTerm);
        this.fractionInverse = fractionInverse;
        this.maxTerms = maxTerms;
        this.variableStr = variableStr;
        this.maxMultiTerm = toDecimal(maxMultiTerm);
        this.maxSingleTerm = toDecimal(maxSingleTerm);
        this.maxExps = maxExps;
        this.showZeroTerms = showZeroTerms;
        this.innerNotation = innerNotation;
        this.additionSign = additionSign;
        this.subtractionSign = subtractionSign;
        this.multiplicationSign = multiplicationSign;
        this.divisionSign = divisionSign;
        this.multiplicationBefore = multiplicationBefore;
        this.powerStrings = powerStrings;
        this.coefficientStrings = coefficientStrings;
        this.parenthesizePower = parenthesizePower;
        this.unitCoefficientShown = unitCoefficientShown;
        this.unitPowerShown = unitPowerShown;
        this.expStrings = expStrings;
        this.superexpBefore = superexpBefore;
        this.frontSubtractionSign = frontSubtractionSign;
        this.constantStrings = constantStrings;
        this.precision = toDecimal(precision);
        this.minimumTermRounding = minimumTermRounding;
    }

    public name = "Polynomial Notation";

    public format(
        value: DecimalSource
      ): string {
  
        let decimal = toDecimal(value);
  
        if (decimal.isNan()) return this.NaNString;
    
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
  
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
    
        return this.formatDecimal(decimal);
      }

    public formatDecimal(value: Decimal): string {
        if (value.eq(0)) return this.innerNotation.format(0);
        let result = ""
        let negative = false;
        if (value.lt(0)) {
            negative = true;
            value = value.abs();
            result = this.frontSubtractionSign;
        };
        if (value.lte(this.maxMultiTerm.recip()) || (this.minimumTerm.isFinite() && value.lt(this._value.pow(this.minimumTerm)) && value.lt(this._value.pow(this.minimumTerm.neg().div(2))))) {
            result += this.innerNotation.format(1) + this.divisionSign + "(" + this.format(value.recip()) + ")";
            return result;
        }
        let baseString = this.variableStr;
        let bottomExps = value.slog(this._value, 100, true).sub(this.maxSingleTerm.slog(this._value, 100, true)).plus(1).floor().max(0);
        if (bottomExps.lt(9e15)) {
            value = value.iteratedlog(this._value, bottomExps.toNumber(), true);
        let currentValue = value;
        let bottom = value.mul(this.precision);
        let roundingMultiple = (this.minimumTerm.eq(-Infinity)) ? Decimal.dZero : (typeof this.minimumTermRounding == "function") ? this.minimumTermRounding(value.mod(this._value.pow(this.minimumTerm))) : toDecimal(this.minimumTermRounding);
        currentValue = round(currentValue, (this.minimumTerm.eq(-Infinity)) ? Decimal.dZero : this._value.pow(this.minimumTerm).mul(roundingMultiple));
        let termsSoFar = 0;
        let maxTerms = (currentValue.lt(this.maxMultiTerm)) ? this._maxTerms : 1;
        let power = currentValue.log(this._value).floor().plus(1);
        while (termsSoFar < maxTerms && (currentValue.gte(bottom) || this.showZeroTerms > 0)) {
            termsSoFar++;
            let coefficient : Decimal;
            let powerNum : Decimal;
            if (this.showZeroTerms >= 0) {
                power = power.sub(1);
                powerNum = this._value.pow(power);
                coefficient = currentValue.div(powerNum);
            }
            else {
                [coefficient, power] = scientifify(currentValue, this._value);
                powerNum = this._value.pow(power);
            }
            if (power.lt(this.minimumTerm)) {
                power = this.minimumTerm;
                powerNum = this._value.pow(power);
                coefficient = currentValue.div(powerNum);
            }
            if (value.lt(this.maxMultiTerm) && power.gt(this.minimumTerm)) coefficient = coefficient.floor();
            else coefficient = round(coefficient, this.minimumTermRounding);
            let subresult = "";
            if (power.eq(0)) subresult = this.constantStrings[0] + this.innerNotation.format(coefficient) + this.constantStrings[1];
            else {
                let reciprocal = false;
                if (this.fractionInverse && power.lt(0)) {
                    reciprocal = true;
                    power = power.abs();
                }
                let powerString = "";
                if (this.formatExponents != 0 && (this.unitPowerShown || power.neq(1))) {
                    if (this.formatExponents > 0) powerString = this.format(power);
                    else powerString = this.innerNotation.format(power);
                    if (this.parenthesizePower > 0 || (this.parenthesizePower == 0 && power.abs().gte(this._value) && this.formatExponents > 0)) powerString = "(" + powerString + ")";
                    powerString = this.powerStrings[0] + powerString + this.powerStrings[1];
                }
                powerString = baseString + powerString;
                let coefficientString = "";
                if (coefficient.neq(1) || ((this.unitCoefficientShown[0] && !reciprocal) || (this.unitCoefficientShown[1] && reciprocal))) {
                    coefficientString = this.innerNotation.format(coefficient);
                    coefficientString = this.coefficientStrings[0] + coefficientString + this.coefficientStrings[1];
                }
                subresult = powerString;
                let usedSign = (reciprocal) ? this.divisionSign : this.multiplicationSign;
                if (coefficientString) {
                    if (this.multiplicationBefore) subresult = coefficientString + usedSign + powerString;
                    else subresult = powerString + usedSign + coefficientString;
                }
            }
            result += subresult;
            if (power.lte(this.minimumTerm)) break;
            currentValue = currentValue.sub(powerNum.mul(coefficient));
            if (termsSoFar < maxTerms && (currentValue.gt(bottom) || this.showZeroTerms > 0)) {
                if (negative) result += this.subtractionSign;
                else result += this.additionSign;
            }
        }
        }
        if (bottomExps.gt(0) && bottomExps.lte(this.maxExps)) {
            result = this.expStrings[0][0] + result + this.expStrings[0][1];
            for (let i = 1; i < bottomExps.toNumber(); i++) result = this.expStrings[1][0] + result + this.expStrings[1][1];
        }
        else if (bottomExps.gt(this.maxExps)) {
            let superexpString = "";
            if (bottomExps.lt(this._value)) superexpString = this.expStrings[2][0] + this.format(bottomExps) + this.expStrings[2][1];
            else superexpString = this.expStrings[3][0] + this.format(bottomExps) + this.expStrings[3][1];
            if (this.superexpBefore) result = superexpString + result;
            else result += superexpString;
        }
        return result;
    }

    public get value() {
        return this._value;
    }

    public set value(value : DecimalSource) {
        let valueD = toDecimal(value);
        if (valueD.lte(1)) throw new RangeError("Value <= 1 in Polynomial Notation");
        if (this.formatExponents > 0 && valueD.lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work in Polynomial Notation with formatted exponents");
        this._value = valueD;
    }

    public get maxTerms() {
        return this._maxTerms;
    }

    public set maxTerms(maxTerms : number) {
        if (maxTerms <= 0) throw new RangeError("Nonpositive max terms in Polynomial Notation");
        this._maxTerms = maxTerms;
    }
}