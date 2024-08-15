import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, nextEngineeringValue } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Abbreviates numbers in terms of their pentational logarithm, so 10 is "G1" and 10^^10^^10 is "G3". Uses the linear approximations of tetration and pentation.
     * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Penta-Logarithm notation, 2 is double Penta-Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "plg(10^^10)".
     * @param max_Gs_in_a_row ( number ) If the penta-logarithm representation would have more G's at the beginning than this, those G's are made into an G^n expression. Default is 5.
     * @param base ( Decimal ) This notation normally works in penta-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 9^^9 becomes "G2".
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the G in "G10", expChars[1] takes the place of the first G in "GG10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (G^) in (G^10)4. Default is [["G", ""], ["G", ""], ["(G^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["plg", ""], ["plg", ""], ["(plg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as G^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, a (G^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in penta-logarithm notation directly. Default is false.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (G^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class PentaLogarithmNotation extends Notation {
    private _iterations : number = 1;
    public max_Gs_in_a_row = 5;
    private _base : Decimal = Decimal.dTen;
    public expChars : [[string, string], [string, string], [string, string]] = [["G", ""], ["G", ""], ["(G^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["plg", ""], ["plg", ""], ["(plg^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 0;
    public formatNegatives : boolean = false;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        iterations: number = 1,
        max_Gs_in_a_row: number = 5, 
        base : DecimalSource = 10, 
        expChars : [[string, string], [string, string], [string, string]] = [["G", ""], ["G", ""], ["(G^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["plg", ""], ["plg", ""], ["(plg^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 0,
        formatNegatives : boolean = false,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.iterations = iterations;
      this.max_Gs_in_a_row = max_Gs_in_a_row;
      this._base = toDecimal(base);
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.formatNegatives = formatNegatives;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Penta-Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && (!this.formatNegatives || decimal.lt(-2) || decimal.gt(this._base.tetrate(decimal.toNumber(), 1, true))))
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      let result = "";
      let iterations = this._iterations;
      if (iterations < 0) for (let i = 0; i < -iterations; i++) value = Decimal.pentate(this._base, value.toNumber(), 1, true);
      else for (let i = 0; i < iterations; i++) value = Decimal.penta_log(value, this._base, true);
      let usedChars = this.expChars;
      if (iterations < 0 && this.logChars != null) {
        usedChars = this.logChars;
        iterations *= -1;
      }
      let baseStr = "";
      if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this.max_Gs_in_a_row && iterations % 1 == 0) {
          for (let i = 0; i < iterations; i++) {
            let eChar = usedChars[(i == 0) ? 0 : 1][0];
            let afterChar = usedChars[(i == 0) ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.baseShown < 0) result = result + baseStr;
            else result = baseStr + result;
          }
      }
      else {
          let eChar = usedChars[2][0];
          let afterChar = usedChars[2][1];
          let eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;
          else result = eStr + result;
          if (this.baseShown < 0) result = result + baseStr;
          else result = baseStr + result;
      }
      return result;
    }

    public get iterations() {
      return this._iterations;
    }

    public set iterations(iterations : number) {
      if (iterations % 1 != 0) throw new RangeError("Penta-Logarithm Notation requires a whole number of iterations");
      this._iterations = iterations;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (Decimal.pentate(base, Infinity, 1, true).isFinite()) throw new RangeError("Bases with convergent pentation don't work for Penta-Logarithm Notation");
      this._base = baseD;
    }
  }

    /**
     * A variant of penta-logarithm notation that uses a different amount of penta-logarithm iterations depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
     * @param max_Gs_in_a_row ( number ) If the penta-logarithm representation would have more G's at the beginning than this, those G's are made into an G^n expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
     * @param base ( Decimal ) This notation normally works in penta-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 9^^9 becomes "G2".
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the G in "G10", expChars[1] takes the place of the first G in "GG10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (G^) in (G^10)4. Default is [["G", ""], ["G", ""], ["(G^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["plg", ""], ["plg", ""], ["(plg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as G^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, a (G^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in penta-logarithm notation directly. Default is false.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (G^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class MultiPentaLogarithmNotation extends Notation {
    private _maxnum : Decimal = new Decimal(1e10);
    public max_Gs_in_a_row = 5;
    public minIterations : number = 1;
    private _base : Decimal = Decimal.dTen;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public expChars : [[string, string], [string, string], [string, string]] = [["G", ""], ["G", ""], ["(G^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["plg", ""], ["plg", ""], ["(plg^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 0;
    public formatNegatives : boolean = false;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        maxnum: DecimalSource = 1e10,
        max_Gs_in_a_row: number = 5, 
        minIterations : number = 1,
        base : DecimalSource = 10,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        expChars : [[string, string], [string, string], [string, string]] = [["G", ""], ["G", ""], ["(G^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["plg", ""], ["plg", ""], ["(plg^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 0,
        formatNegatives : boolean = false,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.maxnum = maxnum;
      this.max_Gs_in_a_row = max_Gs_in_a_row;
      this.minIterations = minIterations;
      this._base = toDecimal(base);
      this.engineerings = engineerings;
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.formatNegatives = formatNegatives;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Multi-Penta-Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && (!this.formatNegatives || decimal.lt(-2) || decimal.gt(this._base.tetrate(decimal.toNumber(), 1, true))))
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      let iterations = 0;
      let currentValue = toDecimal(value);
      if (this.minIterations < 0) while (iterations > this.minIterations) {
        iterations--;
        currentValue = Decimal.pentate(this._base, currentValue.toNumber(), 1, true);
      }
      else while (iterations < this.minIterations) {
        iterations++;
        currentValue = Decimal.penta_log(currentValue, this._base, true);
      }
      while (currentValue.gte(this._maxnum)) {
        let currentiterations = iterations;
        iterations = nextEngineeringValue(new Decimal(iterations), this._engineerings).toNumber();
        for (let i = currentiterations; i < iterations; i++) currentValue = Decimal.penta_log(currentValue, this._base, true);
      }
      return new PentaLogarithmNotation(iterations, this.max_Gs_in_a_row, this._base, this.expChars, this.logChars, this.superexpAfter, this.baseShown, this.formatNegatives, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Multi-Penta-Logarithm Notation");
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
      this._engineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (Decimal.pentate(base, Infinity, 1, true).isFinite()) throw new RangeError("Bases with convergent pentation don't work for Multi-Penta-Logarithm Notation");
      this._base = baseD;
    }
  }