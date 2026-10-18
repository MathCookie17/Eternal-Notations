import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, multabs, scientifify, hyperscientifify, iteratedexpmult, iteratedmultlog, multslog } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * The progression of this notation is similar to Default notation: unabbreviated, then scientific, then hyperscientific. However, this notation is not itself a default: instead, it lets you customize the process.
     * @param maxnum ( Decimal ) The point at which the notation switches to scientific. Default is 1e12.
     * @param minnum ( Decimal ) The point below 1 at which the notation switches to scientific with a negative exponent. Default is 1e-6.
     * @param max_es_in_a_row ( number ) If the scientific representation would have more e's than this, switches to F notation. Default is 5.
     * @param logBase ( Decimal ) The base of the scientific notation. Default is 10.
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
     * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are base and base^^2, if hypermantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F8" would become "100F7" with 1 hypermantissaPower and "(1e100)F6" with 2 hypermantissaPower. 
     * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
     * @param hyperengineerings ( Decimal | DecimalSource[] ) Same as engineerings, but for the hyperexponent instead.
     * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 1 on it), and expChars[3][1] (expChars[2][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["F", ""], ["F", ""]].
     * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
     * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
     * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
     * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
     * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
     * @param mantissaInnerNotation ( Notation ) The notation that the mantissa is itself notated with. DefaultNotation is the default.
     * @param exponentInnerNotation ( Notation ) The notation that the exponent is itself notated with. Is the same as mantissaInnerNotation by default.
     * @param hyperexpFormat ( [boolean, boolean] ) A pair of booleans that determines whether the numbers in a hyperscientific expression are notated using ExpandedDefaultNotation itself rather than the innerNotations. The first entry is for the mantissa, the second is for the hyperexponent. This only applies to "xFy" expressions; "Fx" expressions (where x is over the maxnum) always formats x in ExpandedDefaultNotation itself. Default is [false, false].
     */
export class ExpandedDefaultNotation extends Notation {
    private _maxnum : Decimal = new Decimal(1e12);
    private _minnum : Decimal = new Decimal(1e-6);
    public max_es_in_a_row : number = 5;
    private _logBase : Decimal = Decimal.dTen;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    public mantissaPower : Decimal = Decimal.dZero;
    private _hypermantissaPower : Decimal = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    private _hyperengineerings : Decimal[] = [Decimal.dOne];
    private _expChars : [string, string][] = [["e", ""], ["e", ""], ["F", ""], ["F", ""]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public hyperexpBefore : boolean = false;
    private _expMult : Decimal = Decimal.dOne;
    private _hyperexpMult : Decimal = Decimal.dOne;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public hyperexpFormat : [boolean, boolean] = [false, false];
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]];

    constructor(
        maxnum : DecimalSource = new Decimal(1e12),
        minnum : DecimalSource = new Decimal(1e-6),
        max_es_in_a_row : number = 5,
        logBase : DecimalSource = Decimal.dTen,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero,
        mantissaPower : DecimalSource = Decimal.dZero,
        hypermantissaPower : DecimalSource = Decimal.dZero,
        engineerings : DecimalSource[] = [Decimal.dOne],
        hyperengineerings : DecimalSource[] = [Decimal.dOne],
        expChars : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] = [["e", ""], ["e", ""], ["F", ""], ["F", ""]],
        negExpChars : null | [[string, string] | boolean, [string, string]] = null,
        expBefore : boolean = false,
        hyperexpBefore : boolean = false,
        expMult : DecimalSource = Decimal.dOne,
        hyperexpMult : DecimalSource = Decimal.dOne,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        hyperexpFormat : [boolean, boolean] = [false, false]
    ) {
        super();
        this._maxnum = toDecimal(maxnum);
        this.minnum = minnum;
        this.max_es_in_a_row = max_es_in_a_row;
        this._logBase = toDecimal(logBase);
        this.rounding = rounding;
        this.mantissaPower = toDecimal(mantissaPower);
        this.hypermantissaPower = hypermantissaPower;
        this.engineerings = engineerings;
        this.hyperengineerings = hyperengineerings;
        this.expBefore = expBefore;
        this.hyperexpBefore = hyperexpBefore;
        this.expMult = expMult;
        this.hyperexpMult = hyperexpMult;
        this.mantissaInnerNotation = mantissaInnerNotation;
        this.exponentInnerNotation = exponentInnerNotation;
        this.hyperexpFormat = hyperexpFormat;
        this.unconvertedExpChars = expChars;
        this.expChars = expChars;
        this.negExpChars = negExpChars;
    }

    public name = "Expanded Default Notation";

    public formatDecimal(value: Decimal): string {
        if (value.eq(0) || (value.abs().gte(this._minnum) && value.abs().lt(this._maxnum))) return this.mantissaInnerNotation.format(value);
        let negative = false;
        if (value.lt(0)) {
            negative = true;
            value = value.neg();
        }
        let result = "";
        if (multabs(value.abs()).lt(iteratedexpmult(this._logBase, this._maxnum, 1, this._expMult))) {
            let [mantissa, exponent] = scientifify(value, this._logBase, this.rounding, this.mantissaPower, this._engineerings, this._expMult);
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
            let negExp = false;
            if (value.lt(1)) {
              if (this.negExpChars != null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
              negExp = true;
              let [m, e] = scientifify(value, 10, this.rounding);
              value = e.neg().pow10().mul(m);
            }
            if (value.lt(iteratedexpmult(this._logBase, this._maxnum, this.max_es_in_a_row + 1, this._expMult))) {
                let added_es = 0;
                while (value.gte(iteratedexpmult(this._logBase, this._maxnum, 1, this._expMult))) {
                  added_es++;
                  value = iteratedmultlog(value, this._logBase, 1, this._expMult);
                }
                if (negExp) value = value.neg();
                result = this.format(value);
                for (let e = 0; e < added_es; e++) result = this._expChars[1][0] + result + this._expChars[1][1];
              }
              else if (value.lt(iteratedexpmult(this._logBase, 1, this._maxnum.div(this._hyperexpMult).toNumber(), this._expMult))) {
                let [mantissa, exponent] = hyperscientifify(value, this._logBase, this.rounding, this._hypermantissaPower, this._hyperengineerings, this._expMult, this._hyperexpMult);
                if (negExp) exponent = exponent.neg();
                let baseStr = (this.hyperexpFormat[0]) ? this.format(mantissa) : this.mantissaInnerNotation.format(mantissa);
                let exponentStr = (this.hyperexpFormat[1]) ? this.format(exponent) : this.exponentInnerNotation.format(exponent);
                if (this.hyperexpBefore) result = this._expChars[2][0] + exponentStr + this._expChars[2][1] + baseStr;
                else result = baseStr + this._expChars[2][0] + exponentStr + this._expChars[2][1];
              }
              else {
                let exponent = multslog(value, this._logBase, this._expMult).mul(this._hyperexpMult);
                if (negExp) exponent = exponent.neg();
                result = this._expChars[3][0] + this.format(exponent) + this._expChars[3][1];
              }
              if (negative) result = this.negativeString + result;
          }
          return result;
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Expanded Default Notation");
      if (this._minnum.gte(maxnumD)) throw new RangeError("Maxnum below minnum in Expanded Default Notation");
      this._maxnum = maxnumD;
    }

    public get minnum() {
      return this._minnum;
    }

    public set minnum(minnum: DecimalSource) {
      let minnumD = toDecimal(minnum);
      if (minnumD.gte(this._maxnum)) throw new RangeError("Minnum above maxnum in Expanded Default Notation");
      this._minnum = minnumD;
    }

    public get logBase() {
      return this._logBase;
    }

    public set logBase(logBase : DecimalSource) {
      let logBaseD = toDecimal(logBase);
      if (logBaseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Expanded Default Notation");
      this._logBase = logBaseD;
    }

    public get hypermantissaPower() {
      return this._hypermantissaPower;
    }

    public set hypermantissaPower(hypermantissaPower : DecimalSource) {
      let hypermantissaPowerD = toDecimal(hypermantissaPower);
      if (hypermantissaPowerD.lt(-2)) throw new RangeError("hypermantissaPower below -2 in Hyperscientific Notation");
      this._hypermantissaPower = hypermantissaPowerD;
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

    public get hyperengineerings() {
      return this._hyperengineerings;
    }
  
    public set hyperengineerings(hyperengineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(hyperengineerings)) hyperengineerings = [hyperengineerings];
      if (hyperengineerings.length == 0) {
        this._hyperengineerings = [Decimal.dOne];
        return;
      }
      let hyperengineeringsD : Decimal[] = hyperengineerings.map(toDecimal);
      this._hyperengineerings = hyperengineeringsD.sort(function(a, b){
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
      if (this._logBase.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Expanded Default Notation");
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
  
    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]]) {
      let one = this.format(1);
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
      expChars.push(["", ""]);
      if (typeof input[3][0] == "string") expChars[3][0] = input[3][0];
      else if (input[3][0] === false) expChars[3][0] = one + input[2][0];
      else if (input[3][0] === true) expChars[3][0] = input[2][0] + one;
      if (typeof input[3][1] == "string") expChars[3][1] = input[3][1];
      else if (input[3][1] === false) expChars[3][1] = one + input[2][1];
      else if (input[3][1] === true) expChars[3][1] = input[2][1] + one;
      this._expChars = expChars;
    }

}