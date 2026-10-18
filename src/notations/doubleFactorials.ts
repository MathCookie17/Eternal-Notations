import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, iteratedfactorial, inverse_factorial, factorial_slog } from "../baseline/utils.js";


/**
 * A Myriad-like notation that abbreviates numbers in terms of powers of double factorials (as in 3!! = (3!)! = 720) and a coefficient. Numbers below 720 are just written as normal, then a factor of 3!! is introduced, so 1080 would be 1.5 * 3!!.
 * Above 720^2, powers of 3!! are written as, well, powers of 3!!, so 1,000,000 would be around 1.929 * 3!!^2. The highest double factorial is included first, so powers of 4!! start being included, then 5!!, and so on; for example, 10^^4 is written as 5!! * 6!!^2 * 7!!^9 * 8!!^7 * 9!!^4 * 10!!^4 * 11!!^7 * 12!!^2.
 * Once the double factorial number gets too high, the entire thing is wrapped in a single factorial, such as (12!!^5 * 13!!^7)!, then multiple factorials, then the number of factorials gets written out, eventually in this notation as well.
 * @param minDF ( Decimal ) The lowest double factorial that gets written as a double factorial - numbers below that are just written as the coefficient. Default is 3, meaning 3!! (720) is the cutoff point for the coefficient.
 * @param maxDF ( Decimal ) The limit of double factorial numbers - once the double factorial would reach this point, the number gets wrapped in another single factorial. Default is 3628800, i.e. 10!.
 * @param reverseTerms ( boolean ) If this parameter is true, the double factorials are written in descending order instead of ascending order. Default is false.
 * @param maxTerms ( number ) Only the largest few terms (double factorials and the coefficient) are written - this parameter controls how many terms are written. Default is 8.
 * @param multiplicationSign ( string ) The string placed between each term. Default is " * ".
 * @param divisionSign ( string ) The string placed between each term for numbers below 1. Default is " / ".
 * @param DFChars ( [[string, string], [string, string], [string, string]] ) These are the strings used to indicate double factorials. For each of the three pairs in this array, the first entry goes before the number in question, the second goes after.
 * DFChars[0][0] and [0][1] go before and after the double factorial number itself. When a double factorial is raised to a power, [1][0] and [1][1] then go around that double factorial string, while [2][0] and [2][1] go around the exponent. Default is [["", "!!"], ["", ""], ["^", ""]].
 * @param powerBefore ( boolean ) If this is true, the exponent on a double factorial goes before the double factorial instead of after. Default is false.
 * @param factorialChars ( [[string, string], [string, string], [string, string], [string, string]] ) These strings are used for larger numbers to indicate further factorials have been taken. For each of the four pairs in this array, the first entry goes before the number in question, the second goes after.
 * factorialChars[0][0] and [0][1] go around the rest of the expression to indicate a single factorial is taken, then once more factorials are taken, [1][0] and [1][1] are used for all factorials beyond the innermost one.
 * Once it switches to writing out the amount of factorials as a number, [2][0] and [2][1] go around the rest of the expression, [3][0] and [3][1] go around the factorial amount. Default is [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]].
 * @param maxFactorials ( number ) The largest amount of factorials that will be written out in a row - any more than this and the amount of factorials starts being written as a number. Default is 5.
 * @param factorialBefore ( boolean ) If this is true, the amount of factorials for super large numbers is written before the rest of the expression instead of after. Default is false.
 * @param coefficientInnerNotation ( Notation ) The notation that the coefficient is written in. DefaultNotation is the default.
 * @param DFInnerNotation ( Notation ) The notation that the double factorial numbers are written in. Is the same as coefficientInnerNotation by default.
 * @param powerInnerNotation ( Notation ) The notation that the exponents on double factorials are written in. Is the same as coefficientInnerNotation by default.
 * @param factorialInnerNotation ( Notation | null ) The notation that the amount of factorials is written in - if this is null, then the amount of factorials is written in this notation itself. Default is null.
 * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / (", ")"], where that "1 / " is actually the concatenation of (how coefficientInnerNotation formats 1) and divisionSign.
 */
export class DoubleFactorialsNotation extends Notation {
    private _minDF : Decimal = new Decimal(3);
    private _maxDF : Decimal = new Decimal(3628800);
    public reverseTerms : boolean = false;
    private _maxTerms : number = 8;
    public multiplicationSign : string = " * ";
    public divisionSign : string = " / ";
    public DFChars : [[string, string], [string, string], [string, string]] = [["", "!!"], ["", ""], ["^", ""]];
    public powerBefore : boolean = false;
    public factorialChars : [[string, string], [string, string], [string, string], [string, string]] = [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]];
    public maxFactorials : number = 5;
    public factorialBefore : boolean = false;
    public coefficientInnerNotation : Notation = new DefaultNotation();
    public DFInnerNotation : Notation = this.coefficientInnerNotation;
    public powerInnerNotation : Notation = this.coefficientInnerNotation;
    public factorialInnerNotation : null | Notation = null;
    public recipString : [string, string] | null = null;

    constructor(
        minDF : DecimalSource = 3,
        maxDF : DecimalSource = 3628800,
        reverseTerms : boolean = false,
        maxTerms : number = 8,
        multiplicationSign : string = " * ",
        divisionSign : string = " / ",
        DFChars : [[string, string], [string, string], [string, string]] = [["", "!!"], ["", ""], ["^", ""]],
        powerBefore : boolean = false,
        factorialChars : [[string, string], [string, string], [string, string], [string, string]] = [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]],
        maxFactorials : number = 5,
        factorialBefore : boolean = false,
        coefficientInnerNotation : Notation = new DefaultNotation(),
        DFInnerNotation : Notation = coefficientInnerNotation,
        powerInnerNotation : Notation = coefficientInnerNotation,
        factorialInnerNotation : null | Notation = null,
        recipString : [string, string] | null = null
    ) {
        super();
        minDF = toDecimal(minDF);
        if (minDF.lte(1)) throw new RangeError("minDF <= 1 in Double Factorials Notation");
        this._minDF = minDF;
        this.maxDF = maxDF;
        this.reverseTerms = reverseTerms;
        this._maxTerms = maxTerms;
        this.multiplicationSign = multiplicationSign;
        this.divisionSign = divisionSign;
        this.DFChars = DFChars;
        this.powerBefore = powerBefore;
        this.factorialChars = factorialChars;
        this.factorialBefore = factorialBefore;
        this.maxFactorials = maxFactorials;
        this.coefficientInnerNotation = coefficientInnerNotation;
        this.DFInnerNotation = DFInnerNotation;
        this.powerInnerNotation = powerInnerNotation;
        this.factorialInnerNotation = factorialInnerNotation;
        this.recipString = recipString;
    }

    public name = "Double Factorials Notation";

    public formatDecimal(value: Decimal): string {
        if (value.eq(0)) return this.coefficientInnerNotation.format(0);
        let currentValue = value;
        let minDFNum = iteratedfactorial(this._minDF, 2);
        let multiplicationUsed = this.multiplicationSign;
        let negExp = false;
        if (value.lt(1)) {
            if (value.lt(iteratedfactorial(this._minDF.plus(this._maxTerms).sub(1).min(this._maxDF), 2).recip())) {
                let recipString = ["", ""];
                if (this.recipString === null) recipString = [this.coefficientInnerNotation.format(1) + this.divisionSign + "(", ")"];
                else recipString = this.recipString;
                return recipString[0] + this.format(value.recip()) + recipString[1];
            }
            negExp = true;
            currentValue = value.recip().mul(minDFNum);
            multiplicationUsed = this.divisionSign;
        }
        let result = "";
        let factorialLimit = iteratedfactorial(this._maxDF, 2);
        let factorials = Decimal.dZero;
        if (currentValue.gte(factorialLimit)) {
            factorials = factorial_slog(currentValue).sub(factorial_slog(factorialLimit)).plus(1).floor().max(0);
            currentValue = (factorials.gte(9e15)) ? iteratedfactorial(this._minDF, 2) : inverse_factorial(currentValue, factorials.toNumber());
        } 
        let currentDF = inverse_factorial(currentValue, 2).floor();
        let termsSoFar = 0;
        while (currentDF.gte(this._minDF)) {
           let DFNum = iteratedfactorial(currentDF, 2);
           let subresult = this.DFChars[0][0] + this.DFInnerNotation.format(currentDF) + this.DFChars[0][1];
           let power = currentValue.log(DFNum).floor();
           let powerString = "";
           if (power.neq(1)) {
            subresult = this.DFChars[1][0] + subresult + this.DFChars[1][1];
            powerString = this.DFChars[2][0] + this.powerInnerNotation.format(power) + this.DFChars[2][1];
           }
           if (this.powerBefore) subresult = powerString + subresult;
           else subresult += powerString;
           if (this.reverseTerms) result += subresult;
           else result = subresult + result;
           termsSoFar++;
           if (termsSoFar >= this._maxTerms) break;
           else {
            if (this.reverseTerms) result += multiplicationUsed;
            else result = multiplicationUsed + result;
           }
           currentValue = currentValue.div(DFNum.pow(power));
           currentDF = inverse_factorial(currentValue, 2).floor();
        }
        if (termsSoFar < this._maxTerms) {
            if (negExp) {
                currentValue = minDFNum.div(currentValue);

            }
            if (this.reverseTerms) result += this.coefficientInnerNotation.format(currentValue);
            else result = this.coefficientInnerNotation.format(currentValue) + result;
        }
        if (factorials.gt(0)) {
            if (factorials.lte(this.maxFactorials)) {
                result = this.factorialChars[0][0] + result + this.factorialChars[0][1];
                for (let i = 1; i < factorials.toNumber(); i++) result = this.factorialChars[1][0] + result + this.factorialChars[1][1];
            }
            else {
                result = this.factorialChars[2][0] + result + this.factorialChars[2][1];
                let factorialString = "";
                if (this.factorialInnerNotation === null) factorialString = this.factorialChars[3][0] + this.format(factorials) + this.factorialChars[3][1];
                else factorialString = this.factorialChars[3][0] + this.factorialInnerNotation.format(factorials) + this.factorialChars[3][1];
                if (this.factorialBefore) result = factorialString + result;
                else result += factorialString;
            }
        }
        return result;
    }

    public get minDF() {
        return this._minDF;
    }

    public set minDF(minDF : DecimalSource) {
        let minDFD = toDecimal(minDF);
        if (minDFD.lte(1)) throw new RangeError("minDF <= 1 in Double Factorials Notation");
        if (minDFD.gte(this._maxDF)) throw new RangeError("minDF above maxDF in Double Factorials Notation");
        this._minDF = minDFD;
    }

    public get maxDF() {
        return this._maxDF;
    }

    public set maxDF(maxDF : DecimalSource) {
        let maxDFD = toDecimal(maxDF);
        if (maxDFD.lte(1)) throw new RangeError("maxDF <= 1 in Double Factorials Notation");
        if (maxDFD.lte(this._minDF)) throw new RangeError("maxDF below minDF in Double Factorials Notation");
        this._maxDF = maxDFD;
    }

    public get maxTerms() {
        return this._maxTerms;
    }

    public set maxTerms(maxTerms : number) {
        if (maxTerms <= 0) throw new RangeError("Nonpositive max terms in Double Factorials Notation");
        this._maxTerms = maxTerms;
    }
}