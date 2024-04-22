import Decimal from "break_eternity.js";
import { scientifify, defaultBaseChars, hypersplit } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { AlternateBaseNotation } from "../baseline/alternateBase.js";

    /**
     * Uses PsiCubed2's "lexiographic ordering" as described at https://googology.fandom.com/wiki/User_blog:PsiCubed2/An_intuitive_lexicographic_ordering_of_numbers_up_to_P10_(%CF%89%5E%CF%89-level).
     * In summary, this notation starts with exponential expressions with E, then tetrational with F, then pentational with G, then (though this usually doesn't come up) hexational with H, but after the first entry (which represents the logarithm/super-logarithm/penta-logarithm) there are entries after dashes that each add accuracy to the approximation.
     * For example, in an E4-x expression, that x is the digits of the mantissa in n*10^4, and in an F8-x expression, that x is whatever's at the top of the power tower of 8 tens that represents the given value.
     * This notation obeys the rule that chopping off characters from the end always produces less accurate approximations, which means each digit has more precedence than all the digits afterwards:
     * for example, anything of the form F2-45-42..., no matter what comes after that 2, is greater than anything of the form F2-45-41...
     * @param maxEntries ( number | number[] ) In its complete form, this is an array of four numbers: the first determines the maximum amount of dash entries for E-level numbers, the second is for F-level numbers, the third is for G-level numbers, and the fourth is for H-level numbers. If a single number is given instead of an array, all three values are set to that same number. If less than four elements are provided, the remaining elements are set to be equal to the last provided element. Default is [2, 4, 6, 8].
     * @param maxPrecision ( number ) The highest amount of digits that a dash entry can show. Default is 10.
     * @param base ( number | string[] ) This parameter, which can be either a number or an array of strings, controls the base this notation works in. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings. Default is 10.
     * @param dashString ( string ) The string placed between each dash entry. Default is "-".
     * @param letters ( [string, string, string, string] ) The three letters used for exponential, tetrational, pentational, and hexational expressions respectively. Default is ["E", "F", "G", "H"].
     * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in the base being used.
     * 
     * Since this notation relies on its base to format the numbers themselves, it does not have an innerNotation parameter.
     */
export class PsiDashNotation extends Notation {
    private _maxEntries : number[] = [2, 4, 6, 8];
    private _maxPrecision : number = 10;
    private _base ! : string[];
    public dashString : string = "-";
    public letters : [string, string, string, string] = ["E", "F", "G", "H"];
    public recipString : [string, string] | null = null;

    constructor(
        maxEntries : number | number[] = [2, 4, 6, 8],
        maxPrecision : number = 10,
        base : number | string[] = 10,
        dashString : string = "-",
        letters : [string, string, string, string] = ["E", "F", "G", "H"],
        recipString : [string, string] | null = null
    ) {
        super();
        this.maxEntries = maxEntries;
        this.maxPrecision = maxPrecision;
        this.base = base;
        this.dashString = dashString;
        this.letters = letters;
        this.recipString = recipString;
    }

    public name = "Psi Dash Notation";

    public formatDecimal(value: Decimal): string {
        let currentValue = value;
        let baseNum = this._base.length;
        let baseNumD = new Decimal(baseNum);
        if (value.eq(0)) return this._base[0];
        if (value.eq(1)) return this.letters[0] + this._base[0];
        if (value.lt(1)) {
            let rString = ["", ""];
            if (this.recipString === null) rString = [this._base[1] + " / ", ""];
            else rString = this.recipString;
            return rString[0] + this.format(value.recip()) + rString[1];
        }
        let startLetter = -1;
        let [E, F, G, H] = [0, 0, 0, 0];
        let dashArray : Decimal[] = [];
        if (!baseNumD.tetrate(2).isFinite() || value.lt(baseNumD.tetrate(2))) {
            E = 1;
            currentValue = value.log(baseNum);
            startLetter = 0;
        }
        else if (!baseNumD.pentate(2).isFinite() || value.lt(baseNumD.pentate(2))) {
            F = 1;
            currentValue = value.slog(baseNum, 100, true);
            startLetter = 1;
        }
        else if (!baseNumD.pentate(baseNum).isFinite() || value.lt(baseNumD.pentate(baseNum))) {
            G = 1;
            currentValue = hypersplit(value, baseNum, [0, 1, 1])[3];
            startLetter = 2;
        }
        else { //H is only needed in base 3, but it's still here
            H = 1;
            let hexaValue = Decimal.dZero;
            while (currentValue.gte(baseNum)) {
                currentValue = hypersplit(currentValue, baseNum, [0, 1, 1])[3];
                hexaValue = hexaValue.plus(1);
            }
            currentValue = currentValue.log(baseNum).plus(hexaValue);
            startLetter = 3;
        }
        let result = this.letters[startLetter];
        let maxEntries = this._maxEntries[startLetter];
        if (maxEntries == 1) {
            let innerNotation = new AlternateBaseNotation(this._base, 0, this._maxPrecision - 1, this._maxPrecision - 1, Decimal.dInf, Decimal.dInf, 0);
            result += innerNotation.format(currentValue);
            return result;
        }
        while ((E > 0 || F > 0 || G > 0 || H > 0) && dashArray.length < maxEntries - 1 && currentValue.lte(Decimal.pow(baseNum, this._maxPrecision)) && currentValue.lte(Number.MAX_VALUE)) {
            let sciPair = scientifify(currentValue, baseNum, baseNum**(1 - this._maxPrecision));
            dashArray.push(sciPair[0].mul(baseNumD.pow(sciPair[1])).floor().div(baseNumD.pow(sciPair[1])));
            if (E > 0) {
                E--;
                currentValue = Decimal.pow(baseNum, currentValue);
            }
            else if (F > 0) {
                F--;
                E = currentValue.floor().toNumber();
                currentValue = Decimal.pow(baseNum, currentValue.mod(1));
            }
            else if (G > 0) {
                G--;
                F = currentValue.floor().toNumber();
                currentValue = Decimal.pow(baseNum, currentValue.mod(1));
            }
            else if (H > 0) {
                H--;
                G = currentValue.floor().toNumber();
                currentValue = Decimal.pow(baseNum, currentValue.mod(1));
            }
        }
        let sciPair = scientifify(currentValue, baseNum, baseNum**(1 - this._maxPrecision));
        dashArray.push(sciPair[0].mul(baseNumD.pow(sciPair[1])).floor().div(baseNumD.pow(sciPair[1])));
        while (dashArray.length > 1 && scientifify(dashArray[dashArray.length - 1], baseNum, baseNum**(-this._maxPrecision + 1))[0].eq(1)) dashArray.pop();
        let innerNotation = new AlternateBaseNotation(this._base, 0, this._maxPrecision - 1, this._maxPrecision - 1, -1, Decimal.dInf, undefined, undefined, undefined, undefined, -Infinity, undefined, undefined, undefined, "", undefined, undefined, undefined, undefined, this._maxPrecision);
        for (let d = 0; d < dashArray.length; d++) {
            result += innerNotation.format(dashArray[d]);
            if (d < dashArray.length - 1) result += this.dashString;
        }
        return result;
    }

    public get base() {
        return this._base;
    }
  
    public set base(base : number | string[]) {
        if (typeof base == "number") {
            if (base < 0) throw new RangeError("Negative bases are not implemented");
            if (base % 1 != 0) throw new RangeError("Fractional bases are not supported");
            if (base > 64) throw new RangeError("There are only 64 default base digits; if you want to use a base above 64, provide your own character array.");
            base = defaultBaseChars.slice(0, base);
        }
        if (base.length == 0) throw new RangeError("There is no such thing as base 0");
        if (base.length < 3) throw new RangeError("Psi Dash Notation doesn't work with base 1 or 2");
        this._base = base;
    }

    public get maxEntries() {
        return this._maxEntries;
    }

    public set maxEntries(maxEntries: number | number[]) {
        if (!Array.isArray(maxEntries)) maxEntries = [maxEntries];
        while (maxEntries.length < 4) maxEntries.push(maxEntries[maxEntries.length - 1]);
        if (maxEntries[0] < 1 || maxEntries[1] < 1 || maxEntries[2] < 1 || maxEntries[3] < 1) throw new RangeError("Less than 1 entry in Psi Dash Notation");
        this._maxEntries = maxEntries;
    }

    public get maxPrecision() {
        return this._maxPrecision;
    }

    public set maxPrecision(maxPrecision : number) {
        if (maxPrecision < 1) throw new RangeError("maxPrecision < 1 in Psi Dash Notation");
        this._maxPrecision = maxPrecision;
    }
}