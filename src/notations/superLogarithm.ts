import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { multslog, toDecimal, nextEngineeringValue, iteratedexpmult } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Abbreviates numbers in terms of their super-logarithm, so 10 is "F1" and 10^10^10 is "F3". Uses the linear approximation of tetration.
     * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Super-Logarithm notation, 2 is double Super-Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "slg10,000,000,000".
     * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
     * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
     * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
     * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class SuperLogarithmNotation extends Notation {
    private _iterations : number = 1;
    public max_Fs_in_a_row = 5;
    private _base : Decimal = Decimal.dTen;
    public expChars : [[string, string], [string, string], [string, string]] = [["F", ""], ["F", ""], ["(F^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["slg", ""], ["slg", ""], ["(slg^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 0;
    public formatNegatives : boolean = false;
    private _expMult : Decimal = Decimal.dOne;
    private _hyperexpMult : Decimal = Decimal.dOne;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        iterations: number = 1,
        max_Fs_in_a_row: number = 5, 
        base : DecimalSource = 10, 
        expChars : [[string, string], [string, string], [string, string]] = [["F", ""], ["F", ""], ["(F^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["slg", ""], ["slg", ""], ["(slg^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 0,
        formatNegatives : boolean = false,
        expMult : DecimalSource = 1,
        hyperexpMult : DecimalSource = 1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.iterations = iterations;
      this.max_Fs_in_a_row = max_Fs_in_a_row;
      this._base = toDecimal(base);
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.formatNegatives = formatNegatives;
      this.expMult = expMult;
      this.hyperexpMult = hyperexpMult;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Super Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && !this.formatNegatives)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      let result = "";
      let iterations = this._iterations;
      if (iterations < 0) for (let i = 0; i < -iterations; i++) value = iteratedexpmult(this._base, 1, value.div(this._hyperexpMult).toNumber(), this._expMult);
      else for (let i = 0; i < iterations; i++) value = multslog(value, this._base, this._expMult).mul(this._hyperexpMult);
      let usedChars = this.expChars;
      if (iterations < 0 && this.logChars != null) {
        usedChars = this.logChars;
        iterations *= -1;
      }
      let baseStr = "";
      if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this.max_Fs_in_a_row && iterations % 1 == 0) {
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
      if (iterations % 1 != 0) throw new RangeError("Super Logarithm Notation requires a whole number of iterations");
      this._iterations = iterations;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Super Logarithm Notation");
      this._base = baseD;
    }

    public get expMult() {
      return this._expMult;
    }

    public set expMult(expMult : DecimalSource) {
      let expMultD = toDecimal(expMult);
      if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
      if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Super Logarithm Notation");
      this._expMult = expMultD;
    }
    
    public get hyperexpMult() {
      return this._hyperexpMult;
    }

    public set hyperexpMult(hyperexpMult : DecimalSource) {
      let hyperexpMultD = toDecimal(hyperexpMult);
      if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
      this._hyperexpMult = hyperexpMultD;
    }  
  }

    /**
     * A variant of super-logarithm notation that uses a different amount of super-logarithm iterations depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
     * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
     * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
     * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
     * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class MultiSuperLogarithmNotation extends Notation {
    private _maxnum : Decimal = new Decimal(1e10);
    public max_Fs_in_a_row = 5;
    public minIterations : number = 1;
    private _base : Decimal = Decimal.dTen;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public expChars : [[string, string], [string, string], [string, string]] = [["F", ""], ["F", ""], ["(F^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["slg", ""], ["slg", ""], ["(slg^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 0;
    public formatNegatives : boolean = false;
    private _expMult : Decimal = Decimal.dOne;
    private _hyperexpMult : Decimal = Decimal.dOne;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        maxnum: DecimalSource = 1e10,
        max_Fs_in_a_row: number = 5, 
        minIterations : number = 1,
        base : DecimalSource = 10,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        expChars : [[string, string], [string, string], [string, string]] = [["F", ""], ["F", ""], ["(F^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["slg", ""], ["slg", ""], ["(slg^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 0,
        formatNegatives : boolean = false,
        expMult : DecimalSource = 1,
        hyperexpMult : DecimalSource = 1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.maxnum = maxnum;
      this.max_Fs_in_a_row = max_Fs_in_a_row;
      this.minIterations = minIterations;
      this._base = toDecimal(base);
      this.engineerings = engineerings;
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.formatNegatives = formatNegatives;
      this.expMult = expMult;
      this.hyperexpMult = hyperexpMult;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Multi-Super Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && !this.formatNegatives)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      let iterations = 0;
      let currentValue = toDecimal(value);
      if (this.minIterations < 0) while (iterations > this.minIterations) {
        iterations--;
        currentValue = iteratedexpmult(this._base, 1, currentValue.div(this._hyperexpMult).toNumber(), this._expMult)
      }
      else while (iterations < this.minIterations) {
        iterations++;
        currentValue = multslog(currentValue, this._base, this._expMult).mul(this._hyperexpMult);
      }
      while (currentValue.gte(this._maxnum)) {
        let currentiterations = iterations;
        iterations = nextEngineeringValue(new Decimal(iterations), this._engineerings).toNumber();
        for (let i = currentiterations; i < iterations; i++) currentValue = multslog(currentValue, this._base, this._expMult).mul(this._hyperexpMult);
      }
      return new SuperLogarithmNotation(iterations, this.max_Fs_in_a_row, this._base, this.expChars, this.logChars, this.superexpAfter, this.baseShown, this.formatNegatives, this._expMult, this._hyperexpMult, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Multi-Super Logarithm Notation");
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
      if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Super Logarithm Notation");
      this._base = baseD;
    }

    public get expMult() {
      return this._expMult;
    }

    public set expMult(expMult : DecimalSource) {
      let expMultD = toDecimal(expMult);
      if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
      if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Super Logarithm Notation");
      this._expMult = expMultD;
    }
    
    public get hyperexpMult() {
      return this._hyperexpMult;
    }

    public set hyperexpMult(hyperexpMult : DecimalSource) {
      let hyperexpMultD = toDecimal(hyperexpMult);
      if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
      this._hyperexpMult = hyperexpMultD;
    }  
  }