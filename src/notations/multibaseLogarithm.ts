import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, multibaseLogarithmmult, nextEngineeringValue, currentEngineeringValue, previousEngineeringValue } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Similar to LogarithmNotation, but each iteration takes multiple logarithms of different bases.
     * @param bases ( Decimal[] ! ) The list of bases for the logarithm iterations. For example, if bases is [10, 2], then each iteration performs .log(10).log(2) on the value.
     * @param iterations ( number ) The amount of logarithm iterations. This can be negative.
     * @param max_es_in_a_row ( number ) If the logarithm representation would have more E's at the beginning than this, those E's are made into an E^n expression. Default is 5.
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the E in "E10", expChars[1] takes the place of the first E in "EE10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (E^) in (E^10)4. Default is [["E", ""], ["E", ""], ["(E^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as E^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, an (E^n) expression comes after the number instead of before.
     * @param expMults ( Decimal[] ) On each logarithm, the result is multiplied by the corresponding number in this array. If expMults has less entries than bases, the remaining entries are given an expMult of 1. Default is an empty array, which is equivalent to an array of 1s.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (E^n) expression is itself notated with. Is the same as innerNotation by default.
     */
export class MultibaseLogarithmNotation extends Notation {
    private _bases ! : Decimal[];
    public _iterations : number = 1;
    public max_es_in_a_row = 5;
    public expChars : [[string, string], [string, string], [string, string]] = [["E", ""], ["E", ""], ["(E^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]];
    public superexpAfter = false;
    private _expMults : Decimal[] = [];
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;

    constructor(
        bases : DecimalSource[],
        iterations: number = 1,
        max_es_in_a_row: number = 5, 
        expChars : [[string, string], [string, string], [string, string]] = [["E", ""], ["E", ""], ["(E^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]],
        superexpAfter : boolean = false,
        expMults : DecimalSource[] = [],
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.setBasesAndExpMults(bases, expMults);
      this.iterations = iterations;
      this.max_es_in_a_row = max_es_in_a_row;
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
    }

    public name = "Multibase Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && this._iterations >= 0)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0) && this._iterations == 0) return this.innerNotation.format(0);
      let result = "";
      let iterations = this._iterations;
      let negExp = false;
      // Some optimization has been done in these next few statements to avoid calling slog on small numbers when possible
      let highestBase = Decimal.dOne;
      for (let b = 0; b < this._bases.length; b++) highestBase = Decimal.max(highestBase, this._bases[b].pow(this._expMults[b].recip()));
      if (iterations * this._bases.length >= 1 && value.lte(0)) iterations = 0;
      else if (iterations * this._bases.length >= 2 && value.lte(1)) iterations = 1;
      else if (!multibaseLogarithmmult(value, this._bases, iterations, this._expMults).isFinite()) iterations = Math.ceil(Decimal.slog(value).sub(Decimal.slog(highestBase)).sub(1e-12).toNumber()/this._bases.length + 1);
      while (!multibaseLogarithmmult(value, this._bases, iterations, this._expMults).isFinite()) iterations -= 1;
      value = multibaseLogarithmmult(value, this._bases, iterations, this._expMults);
      let usedChars = this.expChars;
      if (iterations < 0 && this.logChars != null) {
        usedChars = this.logChars;
        iterations *= -1;
      }
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this.max_es_in_a_row && iterations % 1 == 0) {
          for (let i = 0; i < iterations; i++) {
            let eChar = usedChars[(i == 0) ? 0 : 1][0];
            let afterChar = usedChars[(i == 0) ? 0 : 1][1];
            result = eChar + result + afterChar;
          }
      }
      else {
          let eChar = usedChars[2][0];
          let afterChar = usedChars[2][1];
          let eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;
          else result = eStr + result;
      }
      if (negExp) {
        let eChar = this.expChars[(iterations == 0) ? 0 : 1][0];
        let afterChar = this.expChars[(iterations == 0) ? 0 : 1][1];
        result = eChar + this.negativeString[0] + result + this.negativeString[1] + afterChar;
      }
      return result;
    }

    private setBasesAndExpMults(bases : DecimalSource[], expMults : DecimalSource[]) {
      if (bases.length == 0) throw new RangeError("Empty bases in Multibase Logarithm Notation");
      let newBases : Decimal[] = [];
      let newMults : Decimal[] = [];
      for (let b = 0; b < bases.length; b++) {
        let baseD = toDecimal(bases[b]);
        let expMultD = (b >= expMults.length) ? Decimal.dOne : toDecimal(expMults[b]);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (baseD.pow(expMultD.recip()).lte(1)) throw new RangeError("Base <= 1 in Multibase Logarithm Notation");
        newBases.push(baseD);
        newMults.push((b >= expMults.length) ? Decimal.dOne : expMultD);
      }
      this._bases = newBases;
      this._expMults = newMults;
    }

    public get bases() {
      return this._bases;
    }

    public set bases(bases : DecimalSource[]) {
      if (bases.length == 0) throw new RangeError("Empty bases in Multibase Logarithm Notation");
      let basesD = bases.map(toDecimal);
      let newBases : Decimal[] = [];
      for (let b = 0; b < bases.length; b++) {
        let expMultD = (b >= this._expMults.length) ? Decimal.dOne : this._expMults[b];
        if (basesD[b].pow(expMultD.recip()).lte(1)) throw new RangeError("Base <= 1 in Multibase Logarithm Notation");
        newBases.push(basesD[b]);
      }
      this._bases = newBases;
      this._expMults = this._expMults.slice(0, this._bases.length)
    }

    public get expMults() {
      return this._expMults;
    }

    public set expMults(expMults : DecimalSource[]) {
      let expMultsD = expMults.map(toDecimal);
      let newMults : Decimal[] = [];
      for (let b = 0; b < expMults.length && b < this.bases.length; b++) {
        if (this._bases[b].pow(expMultsD[b].recip()).lte(1)) throw new RangeError("Base <= 1 in Multibase Logarithm Notation");
        newMults.push(expMultsD[b]);
      }
      this._expMults = newMults;
      while (this._expMults.length < this._bases.length) this._expMults.push(Decimal.dOne);
    }

    public get iterations() {
      return this._iterations;
    }

    public set iterations(iterations : number) {
      if (iterations % 1 != 0) throw new RangeError("Multibase Logarithm does not support non-integer iterations");
      this._iterations = iterations;
    }

  }

    /**
     * Similar to MultiLogarithmNotation, but each iteration takes multiple logarithms of different bases.
     * @param bases ( Decimal[] ! ) The list of bases for the logarithm iterations. For example, if bases is [10, 2], then each iteration performs .log(10).log(2) on the value.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e12.
     * @param max_es_in_a_row ( number ) If the logarithm representation would have more E's at the beginning than this, those E's are made into an E^n expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the E in "E10", expChars[1] takes the place of the first E in "EE10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (E^) in (E^10)4. Default is [["E", ""], ["E", ""], ["(E^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as E^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, an (E^n) expression comes after the number instead of before.
     * @param expMults ( Decimal[] ) On each logarithm, the result is multiplied by the corresponding number in this array. If expMults has less entries than bases, the remaining entries are given an expMult of 1. Default is an empty array, which is equivalent to an array of 1s.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (E^n) expression is itself notated with. Is the same as innerNotation by default.
     */
export class MultibaseMultiLogarithmNotation extends Notation {
    private _bases ! : Decimal[];
    private _maxnum : Decimal = new Decimal(1e12);
    public max_es_in_a_row = 5;
    public _minIterations : number = 1;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public expChars : [[string, string], [string, string], [string, string]] = [["E", ""], ["E", ""], ["(E^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]];
    public superexpAfter = false;
    private _expMults : Decimal[] = [];
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;

    constructor(
        bases : DecimalSource[],
        maxnum: DecimalSource = 1e12,
        max_es_in_a_row: number = 5, 
        minIterations : number = 1,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        expChars : [[string, string], [string, string], [string, string]] = [["E", ""], ["E", ""], ["(E^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]],
        superexpAfter : boolean = false,
        expMults : DecimalSource[] = [],
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.setBasesAndExpMults(bases, expMults)
      this.maxnum = maxnum;
      this.max_es_in_a_row = max_es_in_a_row;
      this.minIterations = minIterations;
      this.engineerings = engineerings;
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
    }

    public name = "Multibase Multi-Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && this._minIterations >= 0)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      let originalValue = value;
      let iterations = this._minIterations;
      let highestBase = Decimal.dOne;
      for (let b = 0; b < this._bases.length; b++) highestBase = Decimal.max(highestBase, this._bases[b].pow(this._expMults[b].recip()));
      if (!multibaseLogarithmmult(value, this._bases, this._minIterations, this._expMults).isFinite()) {
        let decIterations = toDecimal(iterations);
        if (value.gte(highestBase)) decIterations = currentEngineeringValue(Decimal.slog(value).sub(Decimal.slog(highestBase)).div(this._bases.length).plus(2), this._engineerings);
        while (!multibaseLogarithmmult(value, this._bases, decIterations.toNumber(), this._expMults).isFinite()) decIterations = previousEngineeringValue(decIterations, this._engineerings);
        iterations = decIterations.toNumber();
      }
      else if (multibaseLogarithmmult(value, this._bases, iterations, this._expMults).gte(this._maxnum)) {
        if (multibaseLogarithmmult(value, this._bases, iterations, this._expMults).gte(Decimal.iteratedexp(10, 3, highestBase, true))) {
          iterations = currentEngineeringValue(Decimal.slog(value).sub(Decimal.slog(highestBase)).sub(3).div(this._bases.length).plus(1), this._engineerings).toNumber();
        }
        while (iterations * this._bases.length < 9e15 && multibaseLogarithmmult(value, this._bases, iterations, this._expMults).gte(this._maxnum)) iterations = nextEngineeringValue(new Decimal(iterations), this._engineerings).toNumber();
      }
      if (iterations * this._bases.length >= 9e15) { // Imprecision was causing problems, so if we're too high, just ignore the logarithm process and find an equivalent expression based only on iterations, since at that point the leftover value means nothing
        let result = this.innerNotation.format(1);
        let eChar = this.expChars[2][0];
        let afterChar = this.expChars[2][1];
        let eStr = this.superexponentInnerNotation.format(iterations);
        eStr = eChar + eStr + afterChar;
        if (this.superexpAfter) result = result + eStr;
        else result = eStr + result;
        return result;
      }
      return new MultibaseLogarithmNotation(this._bases, iterations, this.max_es_in_a_row, this.expChars, this.logChars, this.superexpAfter, this._expMults, this.innerNotation, this.superexponentInnerNotation).format(originalValue);
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lt(0)) throw new RangeError("Negative maxnum in Multi-Logarithm Notation");
      this._maxnum = maxnumD;
    }

    public get engineerings() {
      return this._engineerings;
    }
  
    public set engineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._engineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      for (let e = 0; e < engineeringsD.length; e++) {
        if (engineeringsD[e].mod(1).neq(0)) throw new RangeError("Multibase Logarithm does not support non-integer iterations");
      }
      this._engineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    private setBasesAndExpMults(bases : DecimalSource[], expMults : DecimalSource[]) {
      if (bases.length == 0) throw new RangeError("Empty bases in Multibase Logarithm Notation");
      let newBases : Decimal[] = [];
      let newMults : Decimal[] = [];
      for (let b = 0; b < bases.length; b++) {
        let baseD = toDecimal(bases[b]);
        let expMultD = (b >= expMults.length) ? Decimal.dOne : toDecimal(expMults[b]);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (baseD.pow(expMultD.recip()).lte(1)) throw new RangeError("Base <= 1 in Multibase Logarithm Notation");
        newBases.push(baseD);
        newMults.push((b >= expMults.length) ? Decimal.dOne : expMultD);
      }
      this._bases = newBases;
      this._expMults = newMults;
    }

    public get bases() {
      return this._bases;
    }

    public set bases(bases : DecimalSource[]) {
      if (bases.length == 0) throw new RangeError("Empty bases in Multibase Logarithm Notation");
      let basesD = bases.map(toDecimal);
      let newBases : Decimal[] = [];
      for (let b = 0; b < bases.length; b++) {
        let expMultD = (b >= this._expMults.length) ? Decimal.dOne : this._expMults[b];
        if (basesD[b].pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multibase Multi-Logarithm Notation");
        newBases.push(basesD[b]);
      }
      this._bases = newBases;
      this._expMults = this._expMults.slice(0, this._bases.length)
    }

    public get expMults() {
      return this._expMults;
    }

    public set expMults(expMults : DecimalSource[]) {
      let expMultsD = expMults.map(toDecimal);
      let newMults : Decimal[] = [];
      for (let b = 0; b < expMults.length && b < this.bases.length; b++) {
        if (this._bases[b].pow(expMultsD[b].recip()).lte(1.44466786100976613366)) throw new RangeError("Base <= 1 in Multibase Logarithm Notation");
        newMults.push(expMultsD[b]);
      }
      this._expMults = newMults;
      while (this._expMults.length < this._bases.length) this._expMults.push(Decimal.dOne);
    }

    public get minIterations() {
      return this._minIterations;
    }

    public set minIterations(minIterations : number) {
      if (minIterations % 1 != 0) throw new RangeError("Multibase Logarithm does not support non-integer iterations");
      this._minIterations = minIterations;
    }

  }