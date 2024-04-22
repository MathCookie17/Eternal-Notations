import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, hypersplit } from "../baseline/utils.js";

/**
 * Abbreviates a number by splitting it into hyperoperators like how OmegaNum does, except there's an exponentiation entry between the mantissa and the tetration entry.
 * @param delimiters ( [string, string][] ) An array of pairs of strings. Each pair of strings is placed around one of the numbers in the split to indicate which hyperoperator it is, with the first string in the pair coming before the number and the second string in the pair coming after the number. delimiters[0] goes with the mantissa, delimiters[1] goes with the exponent, delimiters[2] goes with the tetration, delimiters[3] goes with the pentation. Default is [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", ") "]]. If there are less than four entries, the remaining entries are filled in with empty strings.
 * @param base ( Decimal ) The base of the exponentiation, tetration, and pentation. Default is 10.
 * @param maximums ( Decimal | Decimal[] ) The largest allowed values for each operator: anything equal to or above this rolls over to the next operator. maximums[0] is the mantissa limit, maximums[1] is the exponent limit, maximums[2] is the tetration limit. Default is [10, 10, 10], where that 10 is whatever the base is. Setting the mantissa maximum to 0 or either of the other two maximums to 1 (actually, anything less than or equal to its corresponding expMult) will effectively disable that operator: for example, if maximums[1] is 1, then exponentiation is effectively excluded from the operators. If just one Decimal is given rather than an array, all three maximums are the same. If there are less than three entries, the last entry is copied to fill the remaining ones.
 * @param showZeroes ( number | number[] ) This parameter controls whether hyperoperators in the split with a value of 0 are shown or not. Default is [1, -1, -1, -1], where for each operator, a positive value means it's always shown even if zero, a negative value means it's not shown if it's zero, and a 0 means it's shown when it's zero but only if a higher hyperoperator is nonzero. If only one number is given rather than an array, then the latter three entries all become that value, but the mantissa's showZeroes always defaults to 1 unless you directly change it with an array. If there are less than four entries, the last entry is copied to fill the remaining ones.
 * @param delimiterPermutation ( number ) The order that the hyperoperators go in when multiple are present. The default is 1, which corresponds to [pentation, tetration, mantissa, exponent]. Each value from 0 to 23 represents a different ordering.
 * @param originalMaximums ( Decimal | Decimal[] ) These are the maximums that apply when the next operator is 0: for example, if maximums is [10, 10, 10] but originalMaximums is [100, 10, 10], then the mantissa can go up to 100 before exponents begin but once the exponent has begun increasing then the mantissa is limited to 10 (this applies even if tetration or pentation is above 0, as long as exponent is still 0). Is the same as maximums by default.
 * @param minnum ( Decimal ) Values above this and below maximums[0] will just return [value, 0, 0, 0] instead of doing any splitting; this prevents small-but-not-too-small values like 2 from forcing negative exponents. Default is 1. Set this value to a negative number to disable this functionality.
 * @param mantissaRounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0. 
 * @param innerNotations ( Notation | Notations[] ) The notations that the numbers are themselves notated with. Has up to four entries, corresponding to the mantissa, exponent, tetration, and pentation in that order. The default is for DefaultNotation to be used for all four. If this is just a single Notation instead of an array, all four hyperoperators use the same innerNotation. If there are less than four entries, the last entry is copied to fill the remaining ones.
 * @param engineerings ( Decimal | [Decimal | Decimal[], Decimal | Decimal[], Decimal | Decimal[]] ) An array of three arrays of Decimals, each of which may potentially be just a single Decimal instead of an array of them. These behave like the engineerings parameter in other notations; the first entry is for exponentiation, the second is for tetration, the third is for pentation. You may make this a single Decimal instead of an array at all to give all three the same single engineering value, but you can't make a single array to give to all three because an array of single Decimals uses "different single values for each of the three hyperoperators" rather than "the same array for all three hyperoperators"... in other words, if you use an array, the upper-level array needs to have three entries, one for each non-mantissa hyperoperator in the split, and each entry of this three-entry array behaves as an engineerings parameter. Default is [[1], [1], [1]], and if less than three entries are provided, the remaining ones are set to [1].
 * @param expMultipliers ( Decimal | Decimal[] ) An array of up to three Decimals which multiply the exponent, tetration, and pentation respectively; this multiplication happens once to start and one more time between each application of the next hyperoperator. Default is [1, 1, 1]. If just one Decimal is given rather than an array, all three multipliers are the same. If there are less than three entries, the remaining ones are set to 1.
 */
export class HypersplitNotation extends Notation {
    private _delimiters : [string, string][] = [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", ") "]];
    private _base : Decimal = Decimal.dTen;
    private _maximums : Decimal[] = [Decimal.dTen, Decimal.dTen, Decimal.dTen];
    private _showZeroes : number[] = [1, -1, -1, -1];
    public delimiterPermutation : number = 1;
    private _originalMaximums : Decimal[] = this._maximums;
    public minnum : Decimal = Decimal.dOne;
    public mantissaRounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _innerNotations : Notation[] = [new DefaultNotation()];
    private _engineerings : [Decimal[], Decimal[], Decimal[]] = [[Decimal.dOne], [Decimal.dOne], [Decimal.dOne]];
    private _expMultipliers : Decimal[] = [Decimal.dOne, Decimal.dOne, Decimal.dOne];

    constructor(
        delimiters : [string, string][] = [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", " "]],
        base : DecimalSource = 10,
        maximums : DecimalSource | DecimalSource[] = base,
        showZeroes : number | number[] = [1, -1, -1, -1],
        delimiterPermutation : number = 1,
        originalMaximums : DecimalSource | DecimalSource[] = maximums,
        minnum : DecimalSource = 1,
        mantissaRounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        innerNotations : Notation | Notation[] = new DefaultNotation(),
        engineerings : DecimalSource | [DecimalSource | DecimalSource[], DecimalSource | DecimalSource[], DecimalSource | DecimalSource[]] = 1,
        expMultipliers : DecimalSource | DecimalSource[] = 1
    ) {
        super();
        this.delimiters = delimiters;
        this._base = toDecimal(base);
        this.maximums = maximums;
        this.showZeroes = showZeroes;
        this.delimiterPermutation = delimiterPermutation;
        this.originalMaximums = originalMaximums;
        this.minnum = toDecimal(minnum);
        this.mantissaRounding = mantissaRounding;
        this.innerNotations = innerNotations;
        this.engineerings = engineerings;
        this.expMultipliers = expMultipliers
    }

    public name = "Hypersplit Notation";

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
    
        return (decimal.sgn() < 0 && this._maximums[0].eq(0))
        ? this.formatNegativeDecimal(decimal.abs())
        : this.formatDecimal(decimal);
      }

    public formatDecimal(value: Decimal): string {
        let hp = hypersplit(value, this._base, this._maximums, this._originalMaximums, this.minnum, this.mantissaRounding, this._engineerings[0], this._engineerings[1], this._engineerings[2], this._expMultipliers[0], this._expMultipliers[1], this._expMultipliers[2]);
        let orderArray = [0];
        orderArray.splice(this.delimiterPermutation % 2, 0, 1);
        orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 2);
        orderArray.splice(Math.floor(this.delimiterPermutation / 6) % 4, 0, 3);
        let result = "";
        while (orderArray.length > 0) {
            if (orderArray[0] == 0 && (this._showZeroes[0] > 0 || (this._showZeroes[0] == 0 && (hp[1].neq(0) || hp[2].neq(0) || hp[3].neq(0))) || hp[0].neq(0))) result += this._delimiters[0][0] + this._innerNotations[0].format(hp[0]) + this._delimiters[0][1];
            else if (orderArray[0] == 1 && (this._showZeroes[1] > 0 || (this._showZeroes[1] == 0 && (hp[2].neq(0) || hp[3].neq(0))) || hp[1].neq(0))) result += this._delimiters[1][0] + this._innerNotations[1].format(hp[1]) + this._delimiters[1][1];
            else if (orderArray[0] == 2 && (this._showZeroes[2] > 0 || (this._showZeroes[2] == 0 && hp[3].neq(0)) || hp[2].neq(0))) result += this._delimiters[2][0] + this._innerNotations[2].format(hp[2]) + this._delimiters[2][1];
            else if (orderArray[0] == 3 && (this._showZeroes[3] > 0 || hp[3].neq(0))) result += this._delimiters[3][0] + this._innerNotations[3].format(hp[3]) + this._delimiters[3][1];
            orderArray.shift();
        }
        return result;
    }

    public get delimiters() {
      return this._delimiters;
    }

    public set delimiters(delimiters : [string, string][]) {
      while (delimiters.length < 4) delimiters.push(["", ""]);
      this._delimiters = delimiters;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.pow(this._expMultipliers[0].recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hypersplit Notation");
      this._base = baseD;
    }

    public get maximums() {
      return this._maximums;
    }

    public set maximums(maximums : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(maximums)) maximums = [maximums];
        this._maximums = maximums.map(toDecimal);
        while (this._maximums.length < 3) this._maximums.push(this._maximums[this._maximums.length - 1]);
    }

    public get showZeroes() {
      return this._showZeroes;
    }

    public set showZeroes(showZeroes : number | number[]) {
      if (!Array.isArray(showZeroes)) showZeroes = [1, showZeroes];
        this._showZeroes = showZeroes;
        while (this._showZeroes.length < 4) this._showZeroes.push(this._showZeroes[this._showZeroes.length - 1]);
    }

    public get originalMaximums() {
      return this._originalMaximums;
    }

    public set originalMaximums(originalMaximums : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(originalMaximums)) originalMaximums = [originalMaximums];
        this._originalMaximums = originalMaximums.map(toDecimal);
        while (this._originalMaximums.length < 3) this._originalMaximums.push(this._originalMaximums[this._originalMaximums.length - 1]);
    }

    public get innerNotations() {
      return this._innerNotations;
    }

    public set innerNotations(innerNotations : Notation | Notation[]) {
      if (!Array.isArray(innerNotations)) innerNotations = [innerNotations];
        this._innerNotations = innerNotations;
        while (this._innerNotations.length < 4) this._innerNotations.push(this._innerNotations[this._innerNotations.length - 1]);
    }

    public get engineerings() {
      return this._engineerings;
    }

    public set engineerings(input : DecimalSource | [DecimalSource | DecimalSource[], DecimalSource | DecimalSource[], DecimalSource | DecimalSource[]]) {
      if (!(Array.isArray(input))) input = [input, input, input];
      let result : [Decimal[], Decimal[], Decimal[]] = [[Decimal.dOne], [Decimal.dOne], [Decimal.dOne]];
      for (let i = 0; i < input.length; i++) {
          let entry = input[i];
          if (!(Array.isArray(entry))) result[i] = [toDecimal(entry)];
          else if (entry.length == 0) result[i] = [Decimal.dOne];
          else result[i] = entry.map(toDecimal);
      }
      this._engineerings = result;
    }

    public get expMultipliers() {
      return this._expMultipliers;
    }

    public set expMultipliers(expMultipliers : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(expMultipliers)) expMultipliers = [expMultipliers];
      while (expMultipliers.length < 3) expMultipliers.push(Decimal.dOne);
      if (this._base.pow(Decimal.recip(expMultipliers[0])).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hypersplit Notation");
      this._expMultipliers = expMultipliers.map(toDecimal);
    }
}