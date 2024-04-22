import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, hyperscientifify, iteratedexpmult, multslog } from "../baseline/utils.js";

  /**
   * Scientific notation, but with tetration instead of exponentiation. Abbreviates 9 as "9F0", 1,000 as "3F1", and 10^10^10^10 as "1F4".
   * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in hyperscientific notation. Default is 1e10.
   * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2F0". Default is false.
   * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is true.
   * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
   * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
export class HyperscientificNotation extends Notation {
    private _maxnum : Decimal = new Decimal(1e10);
    public max_Fs_in_a_row = 5;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    private _mantissaPower : Decimal = Decimal.dZero;
    public iteration_zero : boolean = false;
    private _base : Decimal = Decimal.dTen;
    private _expChars : [string, string][] = [["F", ""], ["F", ""], ["(F^", ")"]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public superexpAfter : boolean = false;
    public formatNegatives : boolean = true;
    private _expMult : Decimal = Decimal.dOne;
    private _hyperexpMult : Decimal = Decimal.dOne;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public superexponentInnerNotation : Notation = this.exponentInnerNotation;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

    constructor(
        maxnum: DecimalSource = 1e10,
        max_Fs_in_a_row: number = 5, 
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        mantissaPower : DecimalSource = 0,
        iteration_zero : boolean = false,
        base : DecimalSource = 10, 
        expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [["F", ""], ["F", ""], ["(F^", ")"]],
        negExpChars : null | [[string, string] | boolean, [string, string]] = null,
        expBefore : boolean = false,
        superexpAfter : boolean = false,
        formatNegatives : boolean = true,
        expMult : DecimalSource = 1,
        hyperexpMult : DecimalSource = 1,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        superexponentInnerNotation : Notation = exponentInnerNotation,
        ) {
      super();
      this.maxnum = maxnum;
      this.max_Fs_in_a_row = max_Fs_in_a_row;
      this.rounding = rounding;
      this.engineerings = engineerings;
      this.mantissaPower = mantissaPower;
      this.iteration_zero = iteration_zero;
      this._base = toDecimal(base);
      this.expBefore = expBefore;
      this.superexpAfter = superexpAfter;
      this.formatNegatives = formatNegatives;
      this.expMult = expMult;
      this.hyperexpMult = hyperexpMult;
      this.mantissaInnerNotation = mantissaInnerNotation;
      this.exponentInnerNotation = exponentInnerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.unconvertedExpChars = expChars;
      this.expChars = expChars;
      this.negExpChars = negExpChars;
    }

    public name = "Hyperscientific Notation";

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
      if (this.iteration_zero && value.lt(this._maxnum) && value.gt(this._maxnum.recip())) return this.mantissaInnerNotation.format(value);
      let result = "";
      if (value.lt(iteratedexpmult(this._base, 1, this._maxnum.toNumber(), this._expMult))) {
        let [mantissa, exponent] = hyperscientifify(value, this._base, this.rounding, this._mantissaPower, this._engineerings, this._expMult, this._hyperexpMult);
        let beforeChar = this._expChars[0][0];
        let afterChar = this._expChars[0][1];
        if (exponent.lt(0) && this.negExpChars !== null && this.negExpChars[0] !== false) {
          if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          beforeChar = this.negExpChars[0][0];
          afterChar = this.negExpChars[0][1];
          exponent = exponent.neg();
        }
        let mantissaStr = this.mantissaInnerNotation.format(mantissa);
        let exponentStr = this.exponentInnerNotation.format(exponent);
        if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;
        else result = mantissaStr + beforeChar + exponentStr + afterChar;
      }
      else {
        if (value.lt(1) && this.negExpChars !== null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
        let added_Fs = 0;
        while (value.gte(iteratedexpmult(this._base, 1, this._maxnum.toNumber(), this._expMult))) {
          added_Fs++;
          value = multslog(value, this._base, this._expMult).mul(this._hyperexpMult);
        }
        result = this.format(value);
        if (added_Fs <= this.max_Fs_in_a_row) {
          result = this._expChars[1][0] + result + this._expChars[1][1];
        }
        else {
            let FStr = this.superexponentInnerNotation.format(added_Fs);
            FStr = this._expChars[2][0] + FStr + this._expChars[2][1];
            if (this.superexpAfter) result = result + FStr;
            else result = FStr + result;
        }
      }
      return result;
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Hyperscientific Notation");
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
      if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Notation");
      this._base = baseD;
    }

    public get mantissaPower() {
      return this._mantissaPower;
    }

    public set mantissaPower(mantissaPower : DecimalSource) {
      let mantissaPowerD = toDecimal(mantissaPower);
      if (mantissaPowerD.lt(-2)) throw new RangeError("mantissaPower below -2 in Hyperscientific Notation");
      this._mantissaPower = mantissaPowerD;
    }

    public get expMult() {
      return this._expMult;
    }

    public set expMult(expMult : DecimalSource) {
      let expMultD = toDecimal(expMult);
      if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
      if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Notation");
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
  
    public get expChars() {
      return this.unconvertedExpChars;
    }
  
    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string]]) {
      let one = this.mantissaInnerNotation.format(1);
      let expChars : [string, string][] = [];
      expChars.push(input[0]);
      expChars.push(["", ""]);
      if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];
      else if (input[1][0] === false) expChars[1][0] = one + input[0][0];
      else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
      if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];
      else if (input[1][1] === false) expChars[1][1] = one + input[0][1];
      else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
      expChars.push(input[2]);
      this._expChars = expChars;
    }

  }

    /**
     * This notation performs hyperscientific notation a certain number of times. 1 iteration means the number is in the form AFB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AFBFC, and so on.
     * @param iterations ( number ! ) The amount of iterations.
     * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
     * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
     * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
     * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
     * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
     * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
     * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
     * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is false.
     * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
     * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
     * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
     * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
     */
  export class HyperscientificIterationsNotation extends Notation {
    private _iterations ! : number;
    public max_Fs_in_a_row = 5;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public mantissaPower : Decimal = Decimal.dZero;
    private _base : Decimal = Decimal.dTen;
    private _expChars : [string, string][] = [["F", ""], ["F", ""], ["(F^", ")"]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public superexpAfter : boolean = false;
    public formatNegatives : boolean = false;
    private _expMult : Decimal = Decimal.dOne;
    private _hyperexpMult : Decimal = Decimal.dOne;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public superexponentInnerNotation : Notation = this.exponentInnerNotation;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

    constructor(
        iterations: number,
        max_Fs_in_a_row: number = 5,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        mantissaPower : DecimalSource = 0,
        base : DecimalSource = 10, 
        expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [["F", ""], ["F", ""], ["(F^", ")"]],
        negExpChars : null | [[string, string] | boolean, [string, string]] = null,
        expBefore : boolean = false,
        superexpAfter : boolean = false,
        formatNegatives : boolean = false,
        expMult : DecimalSource = 1,
        hyperexpMult : DecimalSource = 1,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        superexponentInnerNotation : Notation = exponentInnerNotation,
        ) {
      super();
      this.iterations = iterations;
      this.max_Fs_in_a_row = max_Fs_in_a_row;
      this.rounding = rounding;
      this.engineerings = engineerings;
      this.mantissaPower = toDecimal(mantissaPower);
      this._base = toDecimal(base);
      this.expBefore = expBefore;
      this.superexpAfter = superexpAfter;
      this.formatNegatives = formatNegatives;
      this.expMult = expMult;
      this.hyperexpMult = hyperexpMult;
      this.mantissaInnerNotation = mantissaInnerNotation;
      this.exponentInnerNotation = exponentInnerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.unconvertedExpChars = expChars;
      this.expChars = expChars;
      this.negExpChars = negExpChars;
    }

    public name = "Hyperscientific Iterations Notation";

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
      if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
      let iterations = this._iterations;
      let result = "";
      let added_Fs = 0;
      while (value.gt(Decimal.tetrate(10, Number.MAX_SAFE_INTEGER, 1, true)) && added_Fs < iterations) {
        added_Fs++;
        value = multslog(value, this._base, this._expMult).mul(this._hyperexpMult);
      }
      let sciArray = [value];
      for (let i = 0; i < iterations - added_Fs; i++) {
        if (sciArray[sciArray.length - 1].lte(0) && !this.formatNegatives) break;
        let [mantissa, exponent] = hyperscientifify(sciArray[sciArray.length - 1], this._base, this.rounding, this.mantissaPower, this._engineerings, this._expMult, this._hyperexpMult);
        sciArray.pop();
        sciArray.push(mantissa, exponent);
      }
      let endings = sciArray.length - 1;
      let beforeChar = this._expChars[0][0];
      let afterChar = this._expChars[0][1];
      while (sciArray.length > 0) {
        let numStr = "";
        let toFormat = sciArray[0];
        if (this.negExpChars !== null && typeof this.negExpChars[0] !== "boolean" && toFormat.lt(0)) {
          toFormat = toFormat.neg();
          beforeChar = this.negExpChars[0][0];
          afterChar = this.negExpChars[0][1];
        }
        if (sciArray.length == 1) numStr = this.exponentInnerNotation.format(toFormat);
        else numStr = this.mantissaInnerNotation.format(toFormat);
        if (this.expBefore) {
          if (sciArray.length <= endings) result = afterChar + result;
          result = numStr + result;
          sciArray.shift();
        }
        else {
          if (sciArray.length <= endings) result += beforeChar;
          result += numStr;
          sciArray.shift();
        }
        beforeChar = this._expChars[0][0];
        afterChar = this._expChars[0][1];
      }
      for (let e = 0; e < endings; e++) {
        if (this.expBefore) result = beforeChar + result;
        else result += afterChar;
      }
      if (added_Fs <= this.max_Fs_in_a_row) {
        for (let i = 0; i < added_Fs; i++) result = this._expChars[1][0] + result + this._expChars[1][1];
      }
      else {
        let FStr = this.superexponentInnerNotation.format(added_Fs);
        FStr = this._expChars[2][0] + FStr + this._expChars[2][1];
        if (this.superexpAfter) result = result + FStr;
        else result = FStr + result;
      }
      return result;
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

    public get iterations() {
      return this._iterations;
    }

    public set iterations(iterations : number) {
      if (iterations % 1 != 0) throw new RangeError("Hyperscientific Iterations Notation requires a whole number of iterations");
      this._iterations = iterations;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Iterations Notation");
      this._base = baseD;
    }

    public get expMult() {
      return this._expMult;
    }

    public set expMult(expMult : DecimalSource) {
      let expMultD = toDecimal(expMult);
      if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
      if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Iterations Notation");
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
  
    public get expChars() {
      return this.unconvertedExpChars;
    }
  
    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string]]) {
      let one = this.mantissaInnerNotation.format(1);
      let expChars : [string, string][] = [];
      expChars.push(input[0]);
      expChars.push(["", ""]);
      if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];
      else if (input[1][0] === false) expChars[1][0] = one + input[0][0];
      else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
      if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];
      else if (input[1][1] === false) expChars[1][1] = one + input[0][1];
      else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
      expChars.push(input[2]);
      this._expChars = expChars;
    }

  }