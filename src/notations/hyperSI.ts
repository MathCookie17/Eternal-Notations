import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, hyperscientifify } from "../baseline/utils.js";
import { DetailedSignValueArray } from "../baseline/signValue.js";

/**
 * Abbreviates a number using "hyper-SI" prefixes that represent the tetra-powers of 10: 10 is 1 Pl, 100 is 2 Pl, 10^9 is 9 Pl, 10^10 is 1 Dg, 10^100 is 2 Dg, 10^10^9 is 9 Dg, 10^10^10 is 1 Bi, and so on. It's similar to hyperscientific, but with the hyper-exponent replaced by an equivalent prefix abbreviation.
 * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (slogBase) and (slogBase^smallest prefix), at 2 mantissaPower the bounds are (slogBase^slogBase) and (slogBase^slogBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
export class HyperSINotation extends Notation {
    private _slogBase : Decimal = new Decimal(10);
    private _prefixes : [string, Decimal][];
    private _negaPrefixes : [string, Decimal][] | string;
    public frontToBack : boolean = true;
    public rounding : DecimalSource | ((value : Decimal) => Decimal);
    public max_in_a_row : number = 4;
    private _mantissaPower : Decimal = Decimal.dZero;
    public space : string = " ";
    public separator : string = "";
    public delimiters : [string, string] = ["(", ")"];
    public zero : string = "";
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = new DefaultNotation();

    constructor(
        slogBase : DecimalSource = 10,
        prefixes : [string, DecimalSource][] = [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]],
        negaPrefixes : [string, DecimalSource][] | string = [["np", 2], ["lg", 1]],
        frontToBack : boolean = true,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        max_in_a_row : number = 4,
        mantissaPower : DecimalSource = 0,
        space : string = " ",
        separator : string = "",
        delimiters : [string, string] = ["(", ")"],
        zero : string = "",
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = new DefaultNotation()) {
        super();
        this._slogBase = toDecimal(slogBase);
        this._prefixes = prefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;
        else this._negaPrefixes = negaPrefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this.frontToBack = frontToBack;
        this.rounding = rounding;
        this.max_in_a_row = max_in_a_row;
        this._mantissaPower = toDecimal(mantissaPower);
        this.space = space;
        this.separator = separator;
        this.delimiters = delimiters;
        this.zero = zero;
        this.mantissaInnerNotation = mantissaInnerNotation;
        this.exponentInnerNotation = exponentInnerNotation;
    }

    public name = "Hyper-SI Notation";

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
        let negExp = false;
        let prefixesUsed = this._prefixes;
        let [mantissa, hyperexponent] = hyperscientifify(value, this.slogBase, this.rounding, this.mantissaPower, ((value.lt(1) && typeof this.negaPrefixes == "object") ? this.negaPrefixes : this.prefixes).map((p) => p[1]))
        if (hyperexponent.lt(0)) {
            negExp = true;
            if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
            hyperexponent = hyperexponent.neg();
        }
        let arr = DetailedSignValueArray(hyperexponent, prefixesUsed);
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

    public get slogBase() {
        return this._slogBase;
    }

    public set slogBase(slogBase : DecimalSource) {
        let slogBaseD = toDecimal(slogBase);
        if (slogBaseD.lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyper-SI Notation");
        this._slogBase = slogBaseD;
    }

    public get prefixes() {
        return this._prefixes;
    }

    public set prefixes(prefixes : [string, DecimalSource][]) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in Hyper-SI Notation");
        this._prefixes = prefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this._prefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    }

    public get negaPrefixes() {
        return this._negaPrefixes;
    }

    public set negaPrefixes(negaPrefixes : [string, DecimalSource][] | string) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in Hyper-SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;
        else {
            this._negaPrefixes = negaPrefixes.map(function(entry){
                return [entry[0], toDecimal(entry[1])]
            })
            this._negaPrefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
        }
    }

    public get mantissaPower() {
        return this._mantissaPower;
    }
  
    public set mantissaPower(mantissaPower : DecimalSource) {
        let mantissaPowerD = toDecimal(mantissaPower);
        if (mantissaPowerD.lt(-2)) throw new RangeError("mantissaPower below -2 in Hyper-SI Notation");
        this._mantissaPower = mantissaPowerD;
    }
}

/**
 * A variant of HyperSINotation where the numbers in truncated expressions are themselves notated in this notation.
 * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase^smallest prefix), at 2 mantissaPower the bounds are (logBase^logBase) and (logBase^logBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
 * @param delimitersBefore ( boolean ) If this is true, the number and delimiters in a truncated expression go before the prefix instead of after. Default is false.
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param showOnLarge ( boolean ) This parameter shows whether the numeral that the delimiters are placed on is shown - if it's true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 */
export class NestedHyperSINotation extends Notation {
    private _slogBase : Decimal = new Decimal(10);
    private _prefixes : [string, Decimal][];
    private _negaPrefixes : [string, Decimal][] | string;
    public frontToBack : boolean = true;
    public rounding : DecimalSource | ((value : Decimal) => Decimal);
    public max_in_a_row : number = 4;
    private _mantissaPower : Decimal = Decimal.dZero;
    public space : string = " ";
    public separator : string = "";
    public delimiters : [string, string] = ["(", ")"];
    public delimitersBefore : boolean = false;
    public zero : string = "";
    public innerNotation : Notation = new DefaultNotation();
    public showOnLarge : boolean = true;

    constructor(
        slogBase : DecimalSource = 10,
        prefixes : [string, DecimalSource][] = [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]],
        negaPrefixes : [string, DecimalSource][] | string = [["np", 2], ["lg", 1]],
        frontToBack : boolean = true,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        max_in_a_row : number = 4,
        mantissaPower : DecimalSource = 0,
        space : string = " ",
        separator : string = "",
        delimiters : [string, string] = ["(", ")"],
        delimitersBefore : boolean = false,
        zero : string = "",
        innerNotation : Notation = new DefaultNotation(),
        showOnLarge : boolean = true
        ) {
        super();
        this._slogBase = toDecimal(slogBase);
        this._prefixes = prefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;
        else this._negaPrefixes = negaPrefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this.frontToBack = frontToBack;
        this.rounding = rounding;
        this.max_in_a_row = max_in_a_row;
        this._mantissaPower = toDecimal(mantissaPower);
        this.space = space;
        this.separator = separator;
        this.delimiters = delimiters;
        this.delimitersBefore = delimitersBefore;
        this.zero = zero;
        this.innerNotation = innerNotation;
        this.showOnLarge = showOnLarge;
    }

    public name = "Nested Hyper-SI Notation";

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
        let negExp = false;
        let prefixesUsed = this._prefixes;
        let [mantissa, hyperexponent] = hyperscientifify(value, this.slogBase, this.rounding, this.mantissaPower, ((value.lt(1) && typeof this.negaPrefixes == "object") ? this.negaPrefixes : this.prefixes).map((p) => p[1]))
        if (hyperexponent.lt(0)) {
            negExp = true;
            if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
            hyperexponent = hyperexponent.neg();
        }
        let arr = DetailedSignValueArray(hyperexponent, prefixesUsed);
        let result = "";
        if (arr.length == 0) result = this.zero;
        for (let s = 0; s < arr.length; s++) {
            if (arr[s][1].lte(this.max_in_a_row)) for (let i = 0; i < arr[s][1].toNumber(); i++) {
                if (this.frontToBack) result = arr[s][0] + result;
                else result += arr[s][0];
            }
            else {
                let subresult = "";
                if (this.delimitersBefore) subresult = this.delimiters[0] + this.format(arr[s][1]) + this.delimiters[1] + ((this.showOnLarge) ? arr[s][0] : "");
                else subresult = ((this.showOnLarge) ? arr[s][0] : "") + this.delimiters[0] + this.format(arr[s][1]) + this.delimiters[1];
                if (this.frontToBack) result = subresult + result;
                else result += subresult;
                if (arr[s][1].gte(this._slogBase.tetrate(this._prefixes[this._prefixes.length - 1][1].plus(this._mantissaPower).toNumber(), 1, true))) {
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

    public get slogBase() {
        return this._slogBase;
    }

    public set slogBase(slogBase : DecimalSource) {
        let slogBaseD = toDecimal(slogBase);
        if (slogBaseD.lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Nested Hyper-SI Notation");
        this._slogBase = slogBaseD;
    }

    public get prefixes() {
        return this._prefixes;
    }

    public set prefixes(prefixes : [string, DecimalSource][]) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in Nested Hyper-SI Notation");
        this._prefixes = prefixes.map(function(entry){
            return [entry[0], toDecimal(entry[1])]
        })
        this._prefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
    }

    public get negaPrefixes() {
        return this._negaPrefixes;
    }

    public set negaPrefixes(negaPrefixes : [string, DecimalSource][] | string) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in Nested Hyper-SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;
        else {
            this._negaPrefixes = negaPrefixes.map(function(entry){
                return [entry[0], toDecimal(entry[1])]
            })
            this._negaPrefixes.sort((a, b) => Decimal.cmp(a[1], b[1]) * -1);
        }
    }

    public get mantissaPower() {
        return this._mantissaPower;
    }
  
    public set mantissaPower(mantissaPower : DecimalSource) {
        let mantissaPowerD = toDecimal(mantissaPower);
        if (mantissaPowerD.lt(-2)) throw new RangeError("mantissaPower below -2 in Nested Hyper-SI Notation");
        this._mantissaPower = mantissaPowerD;
    }
}