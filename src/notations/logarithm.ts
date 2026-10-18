import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, iteratedmultlog, multslog, nextEngineeringValue, iteratedexpmult, currentEngineeringValue, previousEngineeringValue, multabs } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Abbreviates numbers in terms of their logarithm, so 10^12 is "e12" and 2 is "e0.301".
     * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Logarithm notation, 2 is double Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "lg100".
     * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
     * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
     * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class LogarithmNotation extends Notation {
    public iterations : number = 1;
    public max_es_in_a_row = 5;
    private _base : Decimal = Decimal.dTen;
    public negLogBehavior : boolean = true;
    public expChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 0;
    private _expMult : Decimal = Decimal.dOne;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        iterations: number = 1,
        max_es_in_a_row: number = 5, 
        base : DecimalSource = 10,
        negLogBehavior : boolean = true,
        expChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 0,
        expMult : DecimalSource = 1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.iterations = iterations;
      this.max_es_in_a_row = max_es_in_a_row;
      this._base = toDecimal(base);
      this.negLogBehavior = negLogBehavior;
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.expMult = expMult;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && this.iterations >= 0)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0) && this.iterations == 0) return this.innerNotation.format(0);
      let result = "";
      let iterations = this.iterations;
      let negExp = false;
      if (value.lt(1) && value.gt(0) && this.negLogBehavior) {
        negExp = true;
        value = value.log(this._base).neg();
        iterations -= 1;
      } 
      // Some optimization has been done in these next few statements to avoid calling slog on small numbers when possible
      if (iterations >= 1 && value.lte(0)) iterations = 0;
      else if (iterations >= 2 && value.lte(1)) iterations = 1;
      else if (!iteratedmultlog(value, this._base, iterations, this._expMult).isFinite()) iterations = Math.ceil(multslog(value, this._base, this._expMult).sub(1e-12).toNumber() + 1)
      while (!iteratedmultlog(value, this._base, iterations, this._expMult).isFinite()) iterations -= 1;
      value = iteratedmultlog(value, this._base, iterations, this._expMult);
      let usedChars = this.expChars;
      if (iterations < 0 && this.logChars != null) {
        usedChars = this.logChars;
        iterations *= -1;
      }
      let baseStr = "";
      if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this.max_es_in_a_row && iterations % 1 == 0) {
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
      if (negExp) {
        let eChar = this.expChars[(iterations == 0) ? 0 : 1][0];
        let afterChar = this.expChars[(iterations == 0) ? 0 : 1][1];
        result = eChar + this.negativeString[0] + result + this.negativeString[1] + afterChar;
        if (this.baseShown < 0) result = result + baseStr;
        else result = baseStr + result;
      }
      return result;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.pow(this._expMult.recip()).lte(1)) throw new RangeError("Base <= 1 in Logarithm Notation");
      this._base = baseD;
    }

    public get expMult() {
      return this._expMult;
    }

    public set expMult(expMult : DecimalSource) {
      let expMultD = toDecimal(expMult);
      if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
      if (this._base.pow(expMultD.recip()).lte(1)) throw new RangeError("Base <= 1 in Logarithm Notation");
      this._expMult = expMultD;
    }  

  }

    /**
     * A variant of logarithm notation that uses a different amount of logarithm iterations depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e12.
     * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
     * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
     * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
     * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class MultiLogarithmNotation extends Notation {
    private _maxnum : Decimal = new Decimal(1e12);
    public max_es_in_a_row = 5;
    public minIterations : number = 1;
    private _base : Decimal = Decimal.dTen;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public negLogBehavior : boolean = true;
    public expChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]];
    public logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 0;
    private _expMult : Decimal = Decimal.dOne;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        maxnum: DecimalSource = 1e12,
        max_es_in_a_row: number = 5, 
        minIterations : number = 1,
        base : DecimalSource = 10,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        negLogBehavior : boolean = true,
        expChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]],
        logChars : [[string, string], [string, string], [string, string]] | null = [["lg", ""], ["lg", ""], ["(lg^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 0,
        expMult : DecimalSource = 1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation
        ) {
      super();
      this.maxnum = maxnum;
      this.max_es_in_a_row = max_es_in_a_row;
      this.minIterations = minIterations;
      this._base = toDecimal(base);
      this.engineerings = engineerings;
      this.negLogBehavior = negLogBehavior;
      this.expChars = expChars;
      this.logChars = logChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.expMult = expMult;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Multi-Logarithm Notation";

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
    
        return (decimal.sgn() < 0 && this.minIterations >= 0)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      let originalValue = value;
      let negExp = false;
      if (value.lt(1) && this.negLogBehavior) {
        negExp = true;
        value = multabs(value);
      }
      let iterations = this.minIterations;
      if (!iteratedmultlog(value, this._base, this.minIterations, this._expMult).isFinite()) {
        let decIterations = toDecimal(iterations);
        if (value.gte(this._base)) decIterations = currentEngineeringValue(multslog(value, this._base, this._expMult).plus(2), this._engineerings);
        while (!iteratedmultlog(value, this._base, decIterations.toNumber(), this._expMult).isFinite()) decIterations = previousEngineeringValue(decIterations, this._engineerings);
        iterations = decIterations.toNumber();
      }
      else if (value.gte(iteratedexpmult(this._base, this._maxnum, this.minIterations, this._expMult))) iterations = nextEngineeringValue(multslog(value, this._base, this._expMult).sub(multslog(this._maxnum, this._base, this._expMult)), this._engineerings).toNumber();
      if (iterations > 9e15) { // Imprecision was causing problems, so if we're too high, just ignore the logarithm process and find an equivalent expression based only on iterations, since at that point the leftover value means nothing
        if (negExp) iterations -= 1;
        let result = this.innerNotation.format(1);
        let baseStr = "";
        if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
        let eChar = this.expChars[2][0];
        let afterChar = this.expChars[2][1];
        let eStr = this.superexponentInnerNotation.format(iterations);
        eStr = eChar + eStr + afterChar;
        if (this.superexpAfter) result = result + eStr;
        else result = eStr + result;
        if (this.baseShown < 0) result = result + baseStr;
        else result = baseStr + result;
        if (negExp) {
          let eChar = this.expChars[(iterations == 0) ? 0 : 1][0];
          let afterChar = this.expChars[(iterations == 0) ? 0 : 1][1];
          result = eChar + this.negativeString[0] + result + this.negativeString[1] + afterChar;
          if (this.baseShown < 0) result = result + baseStr;
          else result = baseStr + result;
        }
        return result;
      }
      return new LogarithmNotation(iterations, this.max_es_in_a_row, this._base, this.negLogBehavior, this.expChars, this.logChars, this.superexpAfter, this.baseShown, this._expMult, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(originalValue);
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lt(0)) throw new RangeError("Negative maxnum in Multi-Logarithm Notation");
      this._maxnum = maxnumD;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Logarithm Notation");
      this._base = baseD;
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

    public get expMult() {
      return this._expMult;
    }

    public set expMult(expMult : DecimalSource) {
      let expMultD = toDecimal(expMult);
      if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
      if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Logarithm Notation");
      this._expMult = expMultD;
    }

  }