import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
import { DefaultNotation } from "./defaultNotation.js";
import { toDecimal, scientifify, hyperscientifify } from "./utils.js";

/**
 * Given an array of strings with values, takes a nonnegative Decimal value and converts it into an array that contains how many of each of those strings you'd need to add up to that value.
 * @param value The value to be converted.
 * @param numerals An array of pairs of strings and Decimals, sorted from highest to lowest Decimal. This function may not work if the numerals aren't sorted correctly.
 * @param rounding Rounds the value to the nearest multiple of this value. Default is the value of the lowest string.
 * @param roundType Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @returns An array of pairs of strings and Decimals, where each Decimal is the amount of that corresponding string; if you multiply the value of each string by its corresponding Decimal in the returned array and sum those values, you get back the original value.
 */
export function SignValueArray(value : DecimalSource, numerals : [string, DecimalSource][], rounding : DecimalSource = numerals[numerals.length - 1][1], roundType : string = "round") : [string, Decimal][] {
    if (numerals.length == 0) throw new Error("No numerals provided");
    value = toDecimal(value);
    rounding = toDecimal(rounding);
    if (value.lt(0)) throw new RangeError("Negative numbers are not supported by SignValueArray")
    if (value.eq(0)) return [];
    if (rounding.gt(0)) {
        if (roundType === "floor") value = value.div(rounding).floor().mul(rounding);
        else if (roundType === "round") value = value.div(rounding).round().mul(rounding);
        else if (roundType === "ceil" || roundType === "ceiling") value = value.div(rounding).ceil().mul(rounding);
        else if (roundType === "trunc") value = value.div(rounding).trunc().mul(rounding);
    }
    let result : [string, Decimal][] = [];
    numerals = numerals.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    for (let analyzed = 0; analyzed < numerals.length; analyzed++) {
        let numeralVal = toDecimal(numerals[analyzed][1]);
        let coefficient : Decimal = value.div(numeralVal).floor();
        while (coefficient.plus(1).mul(numeralVal).lte(value)) {  //Combats imprecision
            coefficient = coefficient.plus(1);
        }
        value = value.sub(coefficient.mul(numeralVal));
        if (coefficient.gt(0)) result.push([numerals[analyzed][0], coefficient]);
    }
    return result;
}

/**
 * Same as SignValueArray, except each entry of the array contains three entries instead of two, with the third being the Decimal value of that entry's string.
 * @param value The value to be converted.
 * @param numerals An array of pairs of strings and Decimals, sorted from highest to lowest Decimal. This function may not work if the numerals aren't sorted correctly.
 * @param rounding Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
 * @param roundType Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @returns An array of [string, Decimal, Decimal] triples, where each first Decimal is the amount of that corresponding string and each second Decimal is the value of that string; if you multiply the two Decimals in each entry in the returned array and sum those products, you get back the original value (minus any part smaller than the smallest numeral).
 */
export function DetailedSignValueArray(value : DecimalSource, numerals : [string, DecimalSource][], rounding : DecimalSource = 0, roundType : string = "round") : [string, Decimal, Decimal][] {
    if (numerals.length == 0) throw new Error("No numerals provided");
    value = toDecimal(value);
    rounding = toDecimal(rounding);
    if (value.lt(0)) throw new RangeError("Negative numbers are not supported by SignValueArray")
    if (value.eq(0)) return [];
    if (rounding.gt(0)) {
        if (roundType === "floor") value = value.div(rounding).floor().mul(rounding);
        else if (roundType === "round") value = value.div(rounding).round().mul(rounding);
        else if (roundType === "ceil" || roundType === "ceiling") value = value.div(rounding).ceil().mul(rounding);
        else if (roundType === "trunc") value = value.div(rounding).trunc().mul(rounding);
    }
    let result : [string, Decimal, Decimal][] = [];
    numerals.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    for (let analyzed = 0; analyzed < numerals.length; analyzed++) {
        let numeralVal = toDecimal(numerals[analyzed][1]);
        let coefficient = value.div(numeralVal).floor();
        value = value.sub(coefficient.mul(numeralVal));
        if (coefficient.gt(0)) result.push([numerals[analyzed][0], coefficient, numeralVal]);
    }
    return result;
}

/**
 * Takes a detailed sign value array as returned by DetailedSignValueArray, and gives back the total value in that array.
 */
export function findSignValue(arr : [string, Decimal, Decimal][]) : Decimal {
    let result = Decimal.dZero;
    for (let n = 0; n < arr.length; n++) {
        result = result.plus(Decimal.mul(arr[n][1], arr[n][2]));
    }
    return result;
}

    /**
     * Given an array of sign-value numerals such as Roman numerals, converts the number into that sign-value system. For example, given the Roman numerals themselves, 325 becomes CCCXXV.
     * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
     * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
     * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
     * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
     * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
     * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
     * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like M(6). Default is ["(", ")"].
     * @param zero ( string ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
     * @param innerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
     */
export class SignValueNotation extends Notation {
    private _numerals ! : [string, Decimal][];
    public rounding : Decimal;
    public frontToBack : boolean = false;
    public roundType : string = "round";
    public max_in_a_row : number = 4;
    public separator : string = "";
    public delimiters : [string, string] = ["(", ")"];
    public zero : string = "";
    public innerNotation : Notation = new DefaultNotation()

    constructor(numerals : [string, DecimalSource][],
        rounding : DecimalSource = 0,
        frontToBack : boolean = false,
        roundType : string = "round",
        max_in_a_row : number = 4,
        separator : string = "",
        delimiters : [string, string] = ["(", ")"],
        zero : string = "",
        innerNotation : Notation = new DefaultNotation()) {
        super();
        this.numerals = numerals
        this.frontToBack = frontToBack;
        this.rounding = toDecimal(rounding);
        this.roundType = roundType;
        this.max_in_a_row = max_in_a_row;
        this.separator = separator;
        this.delimiters = delimiters;
        this.zero = zero;
        this.innerNotation = innerNotation;
    }

    public name = "Sign-Value Notation";

    public formatDecimal(value: Decimal): string {
        let arr = SignValueArray(value, this._numerals, this.rounding, this.roundType);
        if (arr.length == 0) return this.zero;
        let result = "";
        for (let s = 0; s < arr.length; s++) {
            let subresult = "";
            if (arr[s][1].lte(this.max_in_a_row)) for (let i = 0; i < arr[s][1].toNumber(); i++) {
                subresult += arr[s][0]
            }
            else subresult += (arr[s][0] + this.delimiters[0] + this.innerNotation.format(arr[s][1]) + this.delimiters[1]);
            if (this.frontToBack) {
                result = subresult + result;
                if (s < arr.length - 1) result = this.separator + result;
            }
            else {
                result += subresult;
                if (s < arr.length - 1) result += this.separator;
            }
        }
        return result;
    }

    public get numerals() {
        return this._numerals;
    }

    public set numerals(numerals: [string, DecimalSource][]) {
        if (numerals.length == 0) throw new Error("No numerals provided for signValue notation");
        this._numerals = numerals.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this._numerals.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    }
}

    /**
     * A variant of SignValueNotation where the numbers in truncated expressions are themselves notated in this notation. Once the parentheses are deep enough, brackets are introduced to represent the number of parentheses layers, and later on braces are introduced to represent the number of bracket layers.
     * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
     * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
     * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
     * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
     * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
     * @param max_nestingP ( number ) The maximum layers of nesting of parentheses - any more layers and brackets are introduced. Default is 3.
     * @param max_nestingB ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Is the same as maxNestingP by default.
     * @param mantissaPower ( Decimal ) Normally, once brackets are introduced, the number in parentheses is limited to between 1 and the value of the numeral that has the brackets on it, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower, the bounds are (value) and (value^2), and so on. For example, a number represented with Roman numerals as M[VI](I) with 0 mantissaPower becomes M[V](M) with 1 mantissaPower and M[IV](M(M)) with 2 mantissaPower.
     * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets and parentheses is limited to between (value of the numeral in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented with Roman numerals as M{V}(M) with 1 hypermantissaPower becomes M{VI}(I) with 0 hypermantissaPower and M{IV}[M](I) with 2 mantissaPower.
     * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
     * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that determine what goes before and after the number in a truncated expression like M(6). The first two strings replace parentheses, the middle two replace brackets, and the last two replace braces. Default is [["(", ")"], ["[", "]"], ["{", "}"]].
     * @param delimiterPermutation ( number ) The order that the numeral, parentheses, brackets, and braces go in when multiple are present. Default is 9, which corresponds to [numeral, braces, brackets, parentheses]. Each value from 0 to 23 represents a different ordering.
     * @param zero ( number ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
     * @param showOnLarge ( [boolean, boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
     * showOnLarge[0] is for when parentheses are the highest delimiter, showOnLarge[1] is for when brackets are the highest delimiter, and showOnLarge[2] is for when braces are the highest delimiter.
     * 
     * This notation does not have an InnerNotation parameter.
     */
export class NestedSignValueNotation extends Notation {
    private _numerals ! : [string, Decimal][];
    public rounding : Decimal;
    public frontToBack : boolean = false;
    public roundType : string = "round";
    public max_in_a_row : number = 4;
    public max_nestingP : number = 3;
    public max_nestingB : number = this.max_nestingP;
    public mantissaPower : Decimal = Decimal.dZero;
    public hypermantissaPower : Decimal = Decimal.dOne;
    public separator : string = "";
    public delimiters : [[string, string], [string, string], [string, string]] = [["(", ")"], ["[", "]"], ["{", "}"]];
    public delimiterPermutation : number = 9;
    public zero : string = "";
    public showOnLarge : [boolean, boolean, boolean] = [true, true, true];

    constructor(numerals : [string, DecimalSource][],
        rounding : DecimalSource = 0,
        frontToBack : boolean = false,
        roundType : string = "round",
        max_in_a_row : number = 4,
        max_nestingP : number = 3,
        max_nestingB : number = max_nestingP,
        mantissaPower : DecimalSource = 0,
        hypermantissaPower : DecimalSource = 1,
        separator : string = "",
        delimiters : [[string, string], [string, string], [string, string]] = [["(", ")"], ["[", "]"], ["{", "}"]],
        delimiterPermutation : number = 9,
        zero : string = "",
        showOnLarge : [boolean, boolean, boolean] = [true, true, true]) {
        super();
        this.numerals = numerals
        this.frontToBack = frontToBack;
        this.rounding = toDecimal(rounding);
        this.roundType = roundType;
        this.max_in_a_row = max_in_a_row;
        this.max_nestingP = max_nestingP;
        this.max_nestingB = max_nestingB;
        this.mantissaPower = toDecimal(mantissaPower);
        this.hypermantissaPower = toDecimal(hypermantissaPower);
        this.separator = separator;
        this.delimiters = delimiters;
        this.delimiterPermutation = delimiterPermutation;
        this.zero = zero;
        this.showOnLarge = showOnLarge;
    }

    public name = "Nested Sign-Value Notation";

    public formatDecimal(value: Decimal): string {
        let arr = DetailedSignValueArray(value, this._numerals, this.rounding, this.roundType);
        if (arr.length == 0) return this.zero;
        let result = "";
        for (let s = 0; s < arr.length; s++) {
            let orderArray = [1];
            orderArray.splice(this.delimiterPermutation % 2, 0, 2);
            orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 3);
            orderArray.splice(Math.floor(this.delimiterPermutation / 6) % 4, 0, 4);
            let portion = arr[s][1].mul(arr[s][2]);
            if (arr[s][1].lte(this.max_in_a_row)) for (let i = 0; i < arr[s][1].toNumber(); i++) {
                if (this.frontToBack) result = arr[s][0] + result;
                else result += arr[s][0];
            }
            else if (arr[s][1].lt(arr[s][2].pow(this.max_nestingP))) {
                let subresult = "";
                while (orderArray.length > 0) {
                    if (orderArray[0] == 1 && this.showOnLarge[0]) subresult += arr[s][0];
                    else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(arr[s][1]) + this.delimiters[0][1];
                    orderArray.shift();
                }
                if (this.frontToBack) result = subresult + result;
                else result += subresult;
            }
            else if (arr[s][1].mul(arr[s][2]).lt(Decimal.tetrate(arr[s][2], this.max_nestingB + 1))) {
                let [mantissa, exponent] = scientifify(portion, arr[s][2], this.rounding, this.mantissaPower);
                let subresult = "";
                while (orderArray.length > 0) {
                    if (orderArray[0] == 1 && this.showOnLarge[1]) subresult += arr[s][0];
                    else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(mantissa) + this.delimiters[0][1];
                    else if (orderArray[0] == 3) subresult += this.delimiters[1][0] + this.format(exponent) + this.delimiters[1][1];
                    orderArray.shift();
                }
                if (this.frontToBack) result = subresult + result;
                else result += subresult;
                break;
            }
            else {
                let [hypermantissa, hyperexponent] = hyperscientifify(portion, arr[s][2], this.rounding, this.hypermantissaPower);
                let [mantissa, exponent] = scientifify(hypermantissa, arr[s][2], this.rounding, this.mantissaPower);
                if (hypermantissa.lt(arr[s][2].pow(this.max_nestingP + 1))) {
                    mantissa = hypermantissa;
                    exponent = Decimal.dZero;
                }
                let subresult = "";
                while (orderArray.length > 0) {
                    if (orderArray[0] == 1 && this.showOnLarge[2]) subresult += arr[s][0];
                    else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(mantissa) + this.delimiters[0][1];
                    else if (orderArray[0] == 3 && exponent.gt(0)) subresult += this.delimiters[1][0] + this.format(exponent) + this.delimiters[1][1];
                    else if (orderArray[0] == 4) subresult += this.delimiters[2][0] + this.format(hyperexponent) + this.delimiters[2][1];
                    orderArray.shift();
                }
                if (this.frontToBack) result = subresult + result;
                else result += subresult;
            }
            if (s < arr.length - 1) {
                if (this.frontToBack) result = this.separator + result;
                else result += this.separator;
            }
        }
        return result;
    }

    public get numerals() {
        return this._numerals;
    }

    public set numerals(numerals: [string, DecimalSource][]) {
        if (numerals.length == 0) throw new Error("No numerals provided for signValue notation");
        this._numerals = numerals.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this._numerals.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    }
}