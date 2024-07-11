import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class DoubleFactorialsNotation extends Notation {
    private _minDF;
    private _maxDF;
    reverseTerms: boolean;
    private _maxTerms;
    multiplicationSign: string;
    divisionSign: string;
    DFChars: [[string, string], [string, string], [string, string]];
    powerBefore: boolean;
    factorialChars: [[string, string], [string, string], [string, string], [string, string]];
    maxFactorials: number;
    factorialBefore: boolean;
    coefficientInnerNotation: Notation;
    DFInnerNotation: Notation;
    powerInnerNotation: Notation;
    factorialInnerNotation: null | Notation;
    recipString: [string, string] | null;
    constructor(minDF?: DecimalSource, maxDF?: DecimalSource, reverseTerms?: boolean, maxTerms?: number, multiplicationSign?: string, divisionSign?: string, DFChars?: [[string, string], [string, string], [string, string]], powerBefore?: boolean, factorialChars?: [[string, string], [string, string], [string, string], [string, string]], maxFactorials?: number, factorialBefore?: boolean, coefficientInnerNotation?: Notation, DFInnerNotation?: Notation, powerInnerNotation?: Notation, factorialInnerNotation?: null | Notation, recipString?: [string, string] | null);
    name: string;
    formatDecimal(value: Decimal): string;
    get minDF(): DecimalSource;
    set minDF(minDF: DecimalSource);
    get maxDF(): DecimalSource;
    set maxDF(maxDF: DecimalSource);
    get maxTerms(): number;
    set maxTerms(maxTerms: number);
}
