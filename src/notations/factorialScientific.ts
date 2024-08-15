import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, multabs, factorial_scientifify, inverse_factorial, factorial_slog } from "../baseline/utils.js";

  /**
   * Like scientific notation, but with factorials instead of exponents. Abbreviates 12 as "2 * 3!" and 16! as "1 * 16!". For larger numbers, switches to abbreviations like "(8 * 17!)!" and eventually "(!5)5.6 * 7!", the latter of which means "start with 5.6 * 7! and take the factorial of it 5 times".
   * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-scientific notation. Default is 3628800.
   * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 1 to just be abbreviated as "1" instead of "1 * 1!". Default is false.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / ", "!"], ["1 / ", ""]].
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
export class FactorialScientificNotation extends Notation {
    private _maxnum : Decimal = new Decimal(3628800);
    public max_es_in_a_row = 5;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public mantissaPower : Decimal = Decimal.dZero;
    public iteration_zero : boolean = false;
    private _expChars : [string, string][] = [[" * ", "!"], ["(", ")!"], [" (!", ")"]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = [[" / ", "!"], ["1 / ", ""]];
    public expBefore : boolean = false;
    public superexpAfter : boolean = true;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public superexponentInnerNotation : Notation = this.exponentInnerNotation;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

    constructor(
        maxnum: DecimalSource = 3628800,
        max_es_in_a_row: number = 5,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        mantissaPower : DecimalSource = 0,
        iteration_zero : boolean = false,
        expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [[" * ", "!"], ["(", ")!"], [" (!", ")"]],
        negExpChars : null | [[string, string] | boolean, [string, string]] = [[" / ", "!"], ["1 / ", ""]],
        expBefore : boolean = false,
        superexpAfter : boolean = true,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        superexponentInnerNotation : Notation = exponentInnerNotation
        ) {
      super();
      this.maxnum = maxnum;
      this.max_es_in_a_row = max_es_in_a_row;
      this.rounding = rounding;
      this.engineerings = engineerings;
      this.mantissaPower = toDecimal(mantissaPower);
      this.iteration_zero = iteration_zero;
      this.expBefore = expBefore;
      this.superexpAfter = superexpAfter;
      this.mantissaInnerNotation = mantissaInnerNotation;
      this.exponentInnerNotation = exponentInnerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.unconvertedExpChars = expChars;
      this.expChars = expChars;
      this.negExpChars = negExpChars;
    }

    public name = "Factorial Scientific Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0)) return this.mantissaInnerNotation.format(0);
      if (this.iteration_zero && value.lt(this._maxnum) && value.gt(this._maxnum.recip())) return this.mantissaInnerNotation.format(value);
      let result = "";
      if (multabs(value).lt(this._maxnum.factorial())) {
        let [mantissa, exponent] = factorial_scientifify(value, this.rounding, this.mantissaPower, this._engineerings);
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
          let [m, e] = factorial_scientifify(value, this.rounding, this.mantissaPower, this._engineerings);
          value = m.mul(e.neg().factorial());
        }
        let added_es = factorial_slog(value, this._maxnum).floor().toNumber();
        value = (added_es > 9e15) ? this._maxnum : inverse_factorial(value, added_es);
        while (value.gte(this._maxnum.factorial())) {
          added_es += 1;
          value = inverse_factorial(value, 1);
        }
        if (negExp) value = value.neg();
        result = this.format(value)
        if (added_es <= this.max_es_in_a_row) {
            for (let i = 0; i < added_es; i++) {
              result = this._expChars[1][0] + result + this._expChars[1][1];
            }
        }
        else {
            let eStr = this.superexponentInnerNotation.format(added_es);
            eStr = this._expChars[2][0] + eStr + this._expChars[2][1];
            if (this.superexpAfter) result = result + eStr;
            else result = eStr + result; 
        }
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

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum : DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(2)) throw new RangeError("maxnum <= 2 in Factorial Scientific Notation");
      this._maxnum = maxnumD;
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
   * This notation performs factorial-scientific notation a certain number of times. 1 iteration means the number is in the form A * B! (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A * (B * C!)!, and so on.
   * @param iterations ( number ! ) The amount of iterations.
   * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / (", ")!"], ["1 / ", ""]].
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
export class FactorialScientificIterationsNotation extends Notation {
  private _iterations ! : number;
  public max_es_in_a_row = 5;
  public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
  public _engineerings : Decimal[] = [Decimal.dOne];
  public mantissaPower : Decimal = Decimal.dZero;
  private _expChars : [string, string][] = [[" * (", ")!"], ["(", ")!"], [" (!", ")"]];
  public negExpChars : null | [[string, string] | boolean, [string, string]] = [[" / (", ")!"], ["1 / ", ""]];
  public expBefore : boolean = false;
  public superexpAfter : boolean = true;
  public mantissaInnerNotation : Notation = new DefaultNotation();
  public exponentInnerNotation : Notation = this.mantissaInnerNotation;
  public superexponentInnerNotation : Notation = this.exponentInnerNotation;
  private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

  constructor(
      iterations: number,
      max_es_in_a_row: number = 5,
      rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
      engineerings : DecimalSource | DecimalSource[] = 1, 
      mantissaPower : DecimalSource = 0,
      expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [[" * (", ")!"], ["(", ")!"], [" (!", ")"]],
      negExpChars : null | [[string, string] | boolean, [string, string]] = [[" / (", ")!"], ["1 / ", ""]],
      expBefore : boolean = false,
      superexpAfter : boolean = true,
      mantissaInnerNotation : Notation = new DefaultNotation(),
      exponentInnerNotation : Notation = mantissaInnerNotation,
      superexponentInnerNotation : Notation = exponentInnerNotation
      ) {
    super();
    this.iterations = iterations;
    this.max_es_in_a_row = max_es_in_a_row;
    this.rounding = rounding;
    this.engineerings = engineerings
    this.mantissaPower = toDecimal(mantissaPower);
    this.expBefore = expBefore;
    this.superexpAfter = superexpAfter;
    this.mantissaInnerNotation = mantissaInnerNotation;
    this.exponentInnerNotation = exponentInnerNotation;
    this.superexponentInnerNotation = superexponentInnerNotation;
    this.unconvertedExpChars = expChars;
    this.expChars = expChars;
    this.negExpChars = negExpChars;
  }

  public name = "Factorial Scientific Iterations Notation";

  public formatDecimal(value: Decimal): string {
    if (value.eq(0)) return this.mantissaInnerNotation.format(0);
    if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
    let iterations = this._iterations;
    let result = "";
    let negExp = false;
    let originalValue = value;
    if (value.lt(1)) {
      negExp = true;
      let [m, e] = factorial_scientifify(value, this.rounding, this.mantissaPower, this._engineerings);
      value = e.neg().factorial().mul(m);
    }
    let added_es = Decimal.min(this._iterations, factorial_slog(value).sub(factorial_slog(new Decimal(Number.MAX_SAFE_INTEGER))).floor()).toNumber();
    if (added_es < iterations - factorial_slog(new Decimal(Number.MAX_SAFE_INTEGER)).ceil().toNumber()) added_es = iterations - factorial_slog(new Decimal(Number.MAX_SAFE_INTEGER)).ceil().toNumber();
    if (added_es < 0) added_es = 0;
    if (negExp && this.negExpChars !== null && (added_es > 0 || this.negExpChars[0] === true)) return this.negExpChars[1][0] + this.format(originalValue.recip()) + this.negExpChars[1][1];
    value = inverse_factorial(value, added_es);
    let sciArray = [value];
    for (let i = 0; i < iterations - added_es; i++) {
      if (sciArray[sciArray.length - 1].eq(0)) break;
      let [mantissa, exponent] = factorial_scientifify(sciArray[sciArray.length - 1], this.rounding, this.mantissaPower, this._engineerings);
      if (i == 0 && negExp) exponent = exponent.neg();
      sciArray.pop();
      sciArray.push(mantissa, exponent);
    }
    let negMantissa = false;
    if (sciArray.length == 1 && negExp) {
      sciArray[0] = sciArray[0].neg();
      negMantissa = true;
    }
    let endings = sciArray.length - 1;
    let beforeChar = this._expChars[0][0];
    let afterChar = this._expChars[0][1];
    while (sciArray.length > 0) {
      let numStr = "";
      let toFormat = sciArray[0];
      if (this.negExpChars !== null && typeof this.negExpChars[0] !== "boolean" && toFormat.lt(0) && !negMantissa) {
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
    if (added_es <= this.max_es_in_a_row) {
      for (let i = 0; i < added_es; i++) result = this._expChars[1][0] + result + this._expChars[1][1];
    }
    else {
      let eStr = this.superexponentInnerNotation.format(added_es);
      eStr = this._expChars[2][0] + eStr + this._expChars[2][1];
      if (this.superexpAfter) result = result + eStr;
      else result = eStr + result;
    }
    return result;
  }

  public get iterations() {
    return this._iterations;
  }

  public set iterations(iterations : number) {
    if (iterations % 1 != 0) throw new RangeError("Factorial Scientific Iterations Notation requires a whole number of iterations");
    this._iterations = iterations;
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