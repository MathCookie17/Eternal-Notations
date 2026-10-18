import Decimal from "break_eternity.js";
import { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { AlternateBaseNotation } from "../baseline/alternateBase.js";
import { scientifify, toDecimal } from "../baseline/utils.js";
import { AppliedFunctionNotation } from "../baseline/appliedFunction.js"

/**
 * Uses Donald Knuth's -yllion proposal to abbreviate numbers. In this system, rather than each power of 1,000 getting a new name, each new number name after a hundred is the square of the previous one.
 * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param lowestAbbreviated The smallest -yllion that gets abbreviated - numbers below this -yllion are written out in full. Default is 1, i.e. a myllion, i.e. 10^8. Set this to 0 to have a myriad (10^4) get abbreviated too, set this to 2 to make a myllion also be written out but a byllion still be abbreviated, and so on. Do not set this parameter to anything below 0 or higher than 6.
 * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
 * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. Default is an AlternateBaseNotation that still works in base 10, but used the myriad system's commas instead of the usual commas.
 */
export class MyriadNotation extends Notation {
    private _dialect : number = 0;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _lowestAbbreviated : number = 1;
    private _entriesLimit : number = 20;
    private _charLimit : number = 50;
    public innerNotation : Notation;

    private prefixes : string[][]
    private charLimitReached : boolean = false;

    constructor(
        dialect : number = 0,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        lowestAbbreviated : number = 1,
        entriesLimit : number = 20,
        charLimit : number = 50,
        innerNotation : Notation = new AlternateBaseNotation(10, 0, -4, -4, 0, "2^1024", "1e-6", 5, 0, 0, -1, false, 4, 
        [",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", "::", ",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", ";;;", ",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", "::", ",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", ":::"]),
        ) {
        super();
        this.dialect = dialect;
        this.rounding = rounding;
        this.lowestAbbreviated = lowestAbbreviated;
        this.entriesLimit = entriesLimit;
        this.charLimit = charLimit;
        this.innerNotation = innerNotation;
        if (this._dialect == 1) // Antimatter Dimensions Standard
            this.prefixes = [
                ["m", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
                ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], 
                ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], 
                ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]
            ]
        else if (dialect == 2) 
            this.prefixes = [
                ["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
                ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
                ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], 
                ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]
            ]; 
        else // MathCookie's Standard
            this.prefixes = [
                ["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"], // Below a decyllion
                ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"], // Ones
                ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], // Tens
                ["", "Cn", "My", "CnMy", "LtM", "CnLtM", "MyLtM", "CnMyLtM", "LtB"] // Powers of 100
            ];
        }

    public name = "Myriad Notation";
    
    public formatDecimal(value: Decimal): string {
        this.charLimitReached = false;
        if (value.eq(0)) return this.innerNotation.format(0);
        let result = "";
        let negExp = false;
        let base = Decimal.pow(10000, Decimal.pow(2, this._lowestAbbreviated));
        if (value.lt(1) && this._dialect == 2) {
            if (value.gte(0.01)) return this.innerNotation.format(value);
            let recipNotation = new AppliedFunctionNotation(
                function(value : Decimal) : Decimal {return value.recip();},
                this, function(value : string) {return "1 / " + value;}
            )
            return recipNotation.format(value);
        }
        if (value.lt(1)) {
            negExp = true;
            let [m, e] = scientifify(value, base);
            value = base.pow(e.neg()).mul(m); 
        }
        let latins = Decimal.dZero;
        if (value.gte(Decimal.pow(10000, Decimal.pow(2, 1e16)))) {
            latins = Decimal.slog(value, 10, true).sub(4).div(2).floor().max(0);
            value = (latins.gte(4.5e15)) ? Decimal.dOne : value.iteratedlog(10, latins.mul(2).toNumber(), true);
            while (value.gte(Decimal.pow(10000, Decimal.pow(2, 1e16)))) {
                latins = latins.plus(1);
                value = value.log(10000).log(2);
            }
            if (negExp) result += "/";
            if (latins.eq(1)) result += "Lt[";
            else {
                result += "Lt^" + this.format(latins);
                if (latins.gte(base)) return result;
                else result += "[";
            }
            negExp = false;
        }
        let [mantissa, exponent] = scientifify(value, 10000, this.rounding, 0, Decimal.pow(2, this._lowestAbbreviated).round());
        if (value.lte(Decimal.pow(10000, Decimal.pow(2, this._entriesLimit + this._lowestAbbreviated)))) result += this.innerNotation.format(mantissa);
        if (exponent.eq(0)) return result; //No -yllion here
        if (value.lte(Decimal.pow(10000, Decimal.pow(2, this._entriesLimit + this._lowestAbbreviated)))) result += " ";
        if (negExp) result += "/";
        let charsSoFar = 0; //This is used to keep track of whether we've hit the character limit
        let iterations = 0; //This is used to keep track of whether we've hit the entry limit
        while (exponent.gt(0)) {
            iterations++;
            let yllion = exponent.log(2).floor();
            while (exponent.gte(Decimal.pow(2, yllion.plus(1)))) yllion = yllion.plus(1); //This line deals with log imprecision
            exponent = exponent.sub(Decimal.pow(2, yllion).round());
            let str = this.calcYllion(yllion);
            result += str;
            charsSoFar += str.length;
            if (exponent.gt(0)) {
                result += "-";
                charsSoFar += 1;
                if (charsSoFar > this._charLimit) {
                    this.charLimitReached = true;
                    break;
                }
            }
            if (iterations == this._entriesLimit && exponent.gt(0)) {
                this.charLimitReached = true;
                break;
            }
        }
        if (this.charLimitReached) result += "...";
        if (latins.gt(0)) result += "]";
        return result;
    }

    private calcYllion(yllion : Decimal) : string {
        if (yllion.lt(0)) throw new Error("Myriad notation has attempted to calculate a negative -yllion. This is a bug in Eternal Notations, so it's probably not your fault.");
        let yllionN = yllion.round().toNumber(); //Converting yllion to a number is safe because we never go above the byllionth (10^16th) yllion. yllion should never be non-whole to begin with, but you never know with floating point.
        let result = "";
        if (yllionN < 10) return this.prefixes[0][yllionN];
        else while (yllionN > 0) {
            let hundred = Math.floor(Math.log10(yllionN) / 2);
            let coefficient = Math.floor(yllionN / Math.pow(100, hundred));
            let imprecisions = 0;
            if (coefficient == 0) {
                hundred -= 1;
                coefficient = Math.floor(yllionN / Math.pow(100, hundred))
                imprecisions++;
            }
            if (coefficient >= 100) {
                hundred += 1;
                coefficient = Math.floor(yllionN / Math.pow(100, hundred))
                imprecisions++;
            }
            if (coefficient == 0 && imprecisions == 2) {
                //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
                coefficient = 1;
                yllionN = 0;
            }
            else yllionN = yllionN - (coefficient * Math.pow(100, hundred));
            if (coefficient > 1 || hundred == 0) result += this.prefixes[1][coefficient % 10] + this.prefixes[2][Math.floor(coefficient/10)];
            result +=  this.prefixes[3][hundred];
            if (yllionN > 0) {
                if (this._dialect == 2) {
                    result += "'a";
                }
                else {
                    result += "_";
                }
            }
        }
        return result;
    }

    public get dialect() {
        return this._dialect;
    }

    public set dialect(dialect : number) {
        this._dialect = dialect;
        if (this._dialect == 1) // Antimatter Dimensions Standard
        this.prefixes = [
            ["m", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
            ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], 
            ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], 
            ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]
        ]
    else if (dialect == 2) 
        this.prefixes = [
            ["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
            ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], 
            ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], 
            ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]
        ]; 
    else // MathCookie's Standard
        this.prefixes = [
            ["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"], // Below a decyllion
            ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"], // Ones
            ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], // Tens
            ["", "Cn", "My", "CnMy", "LtM", "CnLtM", "MyLtM", "CnMyLtM", "LtB"] // Powers of 100
        ];
    }

    public get lowestAbbreviated() {
        return this._lowestAbbreviated;
    }

    public set lowestAbbreviated(lowestAbbreviated : number) {
        if (lowestAbbreviated < 0 || lowestAbbreviated > 6) throw new RangeError("Invalid lowestAbbreviated in Myriad Notation");
        this._lowestAbbreviated = lowestAbbreviated;
    }

    public get entriesLimit() {
        return this._entriesLimit;
    }

    public set entriesLimit(entriesLimit : number) {
        if (entriesLimit <= 0) throw new RangeError("Non-positive entriesLimit in Myriad Notation");
        this._entriesLimit = entriesLimit;
    }
    public get charLimit() {
        return this._charLimit;
    }

    public set charLimit(charLimit : number) {
        if (charLimit <= 0) throw new RangeError("Non-positive charLimit in Myriad Notation");
        this._charLimit = charLimit;
    }
}