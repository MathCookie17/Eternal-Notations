import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, scientifify, hyperscientifify } from "../baseline/utils.js";
import { DetailedSignValueArray } from "../baseline/signValue.js";

/**
 * Abbreviates a number using the SI prefixes: 1,000 is 1 k, 10^12 is 1 T, 10^30 is 1 Q, 10^33 is 1 kQ, 10^72 is 1 TQQ, 10^300 is 1 Q[10], and so on.
 * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Q[6]. Default is ["[", "]"].
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
export class SINotation extends Notation {
    private _logBase : Decimal = new Decimal(10);
    private _prefixes ! : [string, Decimal][];
    private _negaPrefixes ! : [string, Decimal][] | string;
    public frontToBack : boolean = true;
    public rounding : DecimalSource | ((value : Decimal) => Decimal);
    public max_in_a_row : number = 4;
    public mantissaPower : Decimal = Decimal.dZero;
    public space : string = " ";
    public separator : string = "";
    public delimiters : [string, string] = ["[", "]"];
    public zero : string = "";
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = new DefaultNotation();

    constructor(
        logBase : DecimalSource = 10,
        prefixes : [string, DecimalSource][] = [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]],
        negaPrefixes : [string, DecimalSource][] | string = [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]],
        frontToBack : boolean = true,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        max_in_a_row : number = 4,
        mantissaPower : DecimalSource = 0,
        space : string = " ",
        separator : string = "",
        delimiters : [string, string] = ["[", "]"],
        zero : string = "",
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = new DefaultNotation()) {
        super();
        this.logBase = logBase;
        this.prefixes = prefixes;
        this.negaPrefixes = negaPrefixes;
        this.frontToBack = frontToBack;
        this.rounding = rounding;
        this.max_in_a_row = max_in_a_row;
        this.mantissaPower = toDecimal(mantissaPower);
        this.space = space;
        this.separator = separator;
        this.delimiters = delimiters;
        this.zero = zero;
        this.mantissaInnerNotation = mantissaInnerNotation;
        this.exponentInnerNotation = exponentInnerNotation;
    }

    public name = "SI Notation";

    public formatDecimal(value: Decimal): string {
        if (value.eq(0)) return this.mantissaInnerNotation.format(0);
        let negExp = false;
        let prefixesUsed = this._prefixes;
        let [mantissa, exponent] = scientifify(value, this.logBase, this.rounding, this.mantissaPower, ((value.lt(1) && typeof this.negaPrefixes == "object") ? this.negaPrefixes : this.prefixes).map((p) => p[1]))
        if (exponent.lt(0)) {
            negExp = true;
            if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
            exponent = exponent.neg();
        }
        let arr = DetailedSignValueArray(exponent, prefixesUsed);
        let result = "";
        if (arr.length == 0) result = this.zero;
        else {
            for (let s = 0; s < arr.length; s++) {
                let subresult = "";
                if (arr[s][1].lte(this.max_in_a_row)) for (let i = 0; i < arr[s][1].toNumber(); i++) {
                    subresult += arr[s][0];
                    if (i < arr[s][1].toNumber() - 1) subresult += this.separator;
                }
                else subresult += (arr[s][0] + this.delimiters[0] + this.exponentInnerNotation.format(arr[s][1]) + this.delimiters[1]);
                if (this.frontToBack) {
                    result = subresult + result;
                    if (s < arr.length - 1) result = this.separator + result;
                }
                else {
                    result += subresult;
                    if (s < arr.length - 1) result += this.separator;
                }
            }
        }
        if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
        result = this.mantissaInnerNotation.format(mantissa) + this.space + result;
        return result;
    }

    public get logBase() {
        return this._logBase;
    }

    public set logBase(logBase : DecimalSource) {
        let logBaseD = toDecimal(logBase);
        if (logBaseD.lte(1)) throw new RangeError("Base <= 1 in SI notation");
        this._logBase = logBaseD;
    }

    public get prefixes() {
        return this._prefixes;
    }

    public set prefixes(prefixes : [string, DecimalSource][]) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in SI Notation");
        this._prefixes = prefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this._prefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    }

    public get negaPrefixes() {
        return this._negaPrefixes;
    }

    public set negaPrefixes(negaPrefixes : [string, DecimalSource][] | string) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;
        else {
            this._negaPrefixes = negaPrefixes.map(function(entry){
                return [entry[0], toDecimal(entry[1])]
            })
            this._negaPrefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
        }
    }
}

/**
 * A variant of SINotation where the numbers in truncated expressions are themselves notated in this notation. Once the brackets are deep enough, braces are introduced to represent the number of brackets layers.
 * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
 * @param max_nesting ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Default is 3.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets is limited to between (value of the prefix in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented as Q{5}(10) with 0 hypermantissaPower becomes Q{4}(1 Q[10]) with 0 hypermantissaPower and Q{4}(Q[1 Q[10]]) with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [[string, string], [string, string]] ) An array of two pairs of strings that determine what goes before and after the number in a truncated expression like Q[6]. The first two strings replace brackets, the last two replace braces. Default is [["[", "]"], ["{", "}"]].
 * @param delimiterPermutation ( number ) The order that the numeral, brackets, and braces go in when multiple are present. Default is 3, which corresponds to [numeral, braces, brackets]. Each value from 0 to 5 represents a different ordering.
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param showOnLarge ( [boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 * showOnLarge[0] is for when brackets are the highest delimiter, showOnLarge[1] is for when braces are the highest delimiter.
 */
export class NestedSINotation extends Notation {
    private _logBase : Decimal = new Decimal(10);
    private _prefixes ! : [string, Decimal][];
    private _negaPrefixes ! : [string, Decimal][] | string;
    public frontToBack : boolean = true;
    public rounding : DecimalSource | ((value : Decimal) => Decimal);
    public max_in_a_row : number = 4;
    private _max_nesting : number = 3;
    public mantissaPower : Decimal = Decimal.dZero;
    private _hypermantissaPower : Decimal = Decimal.dZero;
    public space : string = " ";
    public separator : string = "";
    public delimiters : [[string, string], [string, string]] = [["[", "]"], ["{", "}"]];
    public delimiterPermutation : number = 3;
    public zero : string = "";
    public innerNotation : Notation = new DefaultNotation();
    public showOnLarge : [boolean, boolean] = [true, true];

    constructor(
        logBase : DecimalSource = 10,
        prefixes : [string, DecimalSource][] = [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]],
        negaPrefixes : [string, DecimalSource][] | string = [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]],
        frontToBack : boolean = true,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        max_in_a_row : number = 4,
        max_nesting : number = 3,
        mantissaPower : DecimalSource = 0,
        hypermantissaPower : DecimalSource = 0,
        space : string = " ",
        separator : string = "",
        delimiters : [[string, string], [string, string]] = [["[", "]"], ["{", "}"]],
        delimiterPermutation : number = 3,
        zero : string = "",
        innerNotation : Notation = new DefaultNotation(),
        showOnLarge : [boolean, boolean] = [true, true]
        ) {
        super();
        this.logBase = logBase;
        this.prefixes = prefixes;
        this.negaPrefixes = negaPrefixes;
        this.frontToBack = frontToBack;
        this.rounding = rounding;
        this.max_in_a_row = max_in_a_row;
        this.max_nesting = max_nesting;
        this.mantissaPower = toDecimal(mantissaPower);
        this.hypermantissaPower = hypermantissaPower;
        this.space = space;
        this.separator = separator;
        this.delimiters = delimiters;
        this.delimiterPermutation = delimiterPermutation;
        this.zero = zero;
        this.innerNotation = innerNotation;
        this.showOnLarge = showOnLarge;
    }

    public name = "Nested SI Notation";

    public formatDecimal(value: Decimal): string {
        if (value.eq(0)) return this.innerNotation.format(0);
        let negExp = false;
        let prefixesUsed = this._prefixes;
        let [mantissa, exponent] = scientifify(value, this.logBase, this.rounding, this.mantissaPower, ((value.lt(1) && typeof this.negaPrefixes == "object") ? this.negaPrefixes : this.prefixes).map((p) => p[1]))
        if (exponent.lt(0)) {
            negExp = true;
            if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
            exponent = exponent.neg();
        }
        let arr = DetailedSignValueArray(exponent, prefixesUsed);
        let result = "";
        if (arr.length == 0) result = this.zero;
        let orderArray = [1];
        orderArray.splice(this.delimiterPermutation % 2, 0, 2);
        orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 3);
        for (let s = 0; s < arr.length; s++) {
            let portion = arr[s][1].mul(arr[s][2]);
            if (arr[s][1].lte(this.max_in_a_row)) for (let i = 0; i < arr[s][1].toNumber(); i++) {
                if (this.frontToBack) result = arr[s][0] + result;
                else result += arr[s][0];
                if (i < arr[s][1].toNumber() - 1) {
                    if (this.frontToBack) result = this.separator + result;
                    else result += this.separator;
                }
            }
            else {
                if (this._logBase.pow(arr[s][1].mul(arr[s][2])).lt(Decimal.tetrate(this._logBase.pow(arr[s][2]), this._max_nesting + 1))) {
                    let subresult = "";
                    while (orderArray.length > 0) {
                        if (orderArray[0] == 1 && this.showOnLarge[0]) subresult += arr[s][0];
                        else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(arr[s][1]) + this.delimiters[0][1];
                        orderArray.shift();
                    }
                    if (this.frontToBack) result = subresult + result;
                    else result += subresult;
                }
                else {
                    let [mantissa, hyperexponent] = hyperscientifify(portion, this._logBase.pow(arr[s][2]), this.rounding, this._hypermantissaPower);
                    let subresult = "";
                    while (orderArray.length > 0) {
                        if (orderArray[0] == 1 && this.showOnLarge[1]) subresult += arr[s][0];
                        else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(mantissa) + this.delimiters[0][1];
                        else if (orderArray[0] == 3) subresult += this.delimiters[1][0] + this.format(hyperexponent.plus(1)) + this.delimiters[1][1];
                        orderArray.shift();
                    }
                    if (this.frontToBack) result = subresult + result;
                    else result += subresult;
                }
                if (arr[s][1].gte(this._logBase.pow(this._prefixes[this._prefixes.length - 1][1].plus(this.mantissaPower)))) {
                    //Exponent is no longer integer accurate, so don't bother showing mantissa or lower prefixes
                    if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
                    return result;
                }
            }
            if (s < arr.length - 1) {
                if (this.frontToBack) result = this.separator + result;
                else result += this.separator;
            }
        }
        if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
        if (this.zero == "" && arr.length == 0) result = this.innerNotation.format(mantissa);
        else result = this.innerNotation.format(mantissa) + this.space + result;
        return result;
    }

    public get logBase() {
        return this._logBase;
    }

    public set logBase(logBase : DecimalSource) {
        let logBaseD = toDecimal(logBase);
        if (logBaseD.lte(1)) throw new RangeError("Base <= 1 in Nested SI notation");
        this._logBase = logBaseD;
    }

    public get prefixes() {
        return this._prefixes;
    }

    public set prefixes(prefixes : [string, DecimalSource][]) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in Nested SI Notation");
        this._prefixes = prefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this._prefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    }

    public get negaPrefixes() {
        return this._negaPrefixes;
    }

    public set negaPrefixes(negaPrefixes : [string, DecimalSource][] | string) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in Nested SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;
        else {
            this._negaPrefixes = negaPrefixes.map(function(entry){
                return [entry[0], toDecimal(entry[1])]
            })
            this._negaPrefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
        }
    }

    public get hypermantissaPower() {
        return this._hypermantissaPower;
    }
  
    public set hypermantissaPower(hypermantissaPower : DecimalSource) {
        let hypermantissaPowerD = toDecimal(hypermantissaPower);
        if (hypermantissaPowerD.lt(-2)) throw new RangeError("hypermantissaPower below -2 in Nested SI Notation");
        this._hypermantissaPower = hypermantissaPowerD;
    }

    public get max_nesting() {
        return this._max_nesting;
    }

    public set max_nesting(max_nesting : number) {
        if (max_nesting <= 0) throw new RangeError("Nonpositive max nesting in Nested SI Notation");
        this._max_nesting = max_nesting;
    }
}