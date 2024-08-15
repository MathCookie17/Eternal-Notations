import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, multabs, weak_hyperscientifify, weak_tetrate, weak_slog } from "../baseline/utils.js";

  /**
   * Scientific notation, but with "weak tetration" instead of exponentiation, where weak tetration is repeated exponentiation but evaluated bottom-to-top instead of top-to-bottom. xfy = (base↓↓y)^x, where base↓↓y = (((base^base)^base)^base...)^base = base^base^(y - 1).
   * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in weak hyperscientific notation. Default is 1e12.
   * @param max_fs_in_a_row ( number ) If the weak hyperscientific representation would have more f's at the beginning than this, those f's are made into an f^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in weak hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "3.543f2" would become "35.43f1" with 1 mantissaPower and "354.3f0" with 2 mantissaPower.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the weak hyperscientific notation and jump directly to the innerNotation - useful if you want 100 to just be abbreviated as "100" instead of "2f1". Default is false.
   * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2f1".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for weak hyperscientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the f in "1f10", expChars[1] takes the place of the first f in "f1f10", and expChars[2] takes the place of the (f^) in (f^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["f", ""], ["f", ""], ["(f^", ")"]].
   * @param negExpChars ( null | [[string, string], [string, string], [string, string]] ) This can either be null or an array of three pairs of strings. Ignore this parameter if it's null, which is the default. Otherwise, this acts like expChars, but it's used when the exponent is negative. Default is null.
   * @param recipString ( null | [string, string] ) If this parameter is null, numbers below 1 are just written in mantissaInnerNotation. If this parameter is a pair of strings, then numbers below 1 are written in terms of their reciprocal, with recipString[0] going before the reciprocal and recipString[1] going after the reciprocal. Default is ["1 / ", ""].
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (f^n) expressions come after the rest of the number instead of before. Default is false.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (f^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
export class WeakHyperscientificNotation extends Notation {
    private _maxnum : Decimal = new Decimal(1e12);
    public max_fs_in_a_row = 5;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public mantissaPower : Decimal = Decimal.dZero;
    public iteration_zero : boolean = false;
    private _base : Decimal = Decimal.dTen;
    private _expChars : [string, string][] = [["f", ""], ["f", ""], ["(f^", ")"]];
    private _negExpChars : null | [string, string][] = null;
    public recipString : null | [string, string] = ["1 / ", ""];
    public expBefore : boolean = false;
    public superexpAfter : boolean = false;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public superexponentInnerNotation : Notation = this.exponentInnerNotation;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];
    private unconvertedNegExpChars : null | [[string, string], [string | boolean, string | boolean], [string, string]];

    constructor(
        maxnum: DecimalSource = 1e12,
        max_fs_in_a_row: number = 5,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        mantissaPower : DecimalSource = 0,
        iteration_zero : boolean = false,
        base : DecimalSource = 10, 
        expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [["f", ""], ["f", ""], ["(f^", ")"]],
        negExpChars : null | [[string, string], [string | boolean, string | boolean], [string, string]] = null,
        recipString : [string, string] = ["1 / ", ""],
        expBefore : boolean = false,
        superexpAfter : boolean = false,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        superexponentInnerNotation : Notation = exponentInnerNotation
        ) {
      super();
      this.maxnum = maxnum;
      this.max_fs_in_a_row = max_fs_in_a_row;
      this.rounding = rounding;
      this.engineerings = engineerings;
      this.mantissaPower = toDecimal(mantissaPower);
      this.iteration_zero = iteration_zero;
      this._base = toDecimal(base);
      this.recipString = recipString;
      this.expBefore = expBefore;
      this.superexpAfter = superexpAfter;
      this.mantissaInnerNotation = mantissaInnerNotation;
      this.exponentInnerNotation = exponentInnerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.unconvertedExpChars = expChars;
      this.unconvertedNegExpChars = negExpChars;
      this.expChars = expChars;
      this.negExpChars = negExpChars;
    }

    public name = "Weak Hyperscientific Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0) || value.eq(1)) return this.mantissaInnerNotation.format(value);
      if (value.lt(1)) {
        if (this.recipString === null) return this.mantissaInnerNotation.format(value);
        else return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
      }
      if (this.iteration_zero && value.lt(this._maxnum) && value.gt(this._maxnum.recip())) return this.mantissaInnerNotation.format(value);
      let result = "";
      if (multabs(value).lt(weak_tetrate(this._base, this._maxnum))) {
        let [mantissa, exponent] = weak_hyperscientifify(value, this._base, this.rounding, this.mantissaPower, this._engineerings);
        let beforeChar = this._expChars[0][0];
        let afterChar = this._expChars[0][1];
        if (exponent.lt(0) && this._negExpChars !== null) {
          beforeChar = this._negExpChars[0][0];
          afterChar = this._negExpChars[0][1];
          exponent = exponent.neg();
        }
        let mantissaStr = this.mantissaInnerNotation.format(mantissa);
        let exponentStr = this.exponentInnerNotation.format(exponent);
        if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;
        else result = mantissaStr + beforeChar + exponentStr + afterChar;
      }
      else {
        let negExp = false;
        let targetExpChars = this._expChars;
        if (value.lt(weak_tetrate(this._base, 0))) {
          negExp = true;
          if (this._negExpChars !== null) targetExpChars = this._negExpChars;
          let [m, e] = weak_hyperscientifify(value, this._base, this.rounding, this.mantissaPower, this._engineerings);
          value = weak_tetrate(this._base, e.neg()).pow(m);
        }
        let added_es = Decimal.slog(value, this._base, true).sub(Decimal.slog(this._maxnum, this._base, true).plus(3)).div(2).floor().toNumber();
        value = (added_es > 9e15) ? this._maxnum : Decimal.iteratedlog(value, this._base, added_es * 2, true);
        while (value.gte(weak_tetrate(this._base, this._maxnum))) {
          added_es += 1;
          value = weak_slog(value, this._base);
        }
        if (negExp) {
          if (this._negExpChars === null) negExp = false;
          else value = value.neg();
        }
        result = this.format(value);
        if (added_es <= this.max_fs_in_a_row) {
            for (let i = 0; i < added_es; i++) {
              result = targetExpChars[1][0] + result + targetExpChars[1][1];
            }
        }
        else {
            let eStr = this.superexponentInnerNotation.format(added_es);
            eStr = targetExpChars[2][0] + eStr + targetExpChars[2][1];
            if (this.superexpAfter) result = result + eStr;
            else result = eStr + result; 
        }
      }
      return result;
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Weak Hyperscientific Notation");
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
      if (baseD.lte(1)) throw new RangeError("Base <= 1 in Weak Hyperscientific Notation");
      this._base = toDecimal(base);
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

    public get negExpChars() {
      return this.unconvertedNegExpChars;
    }
  
    public set negExpChars(input : null | [[string, string], [string | boolean, string | boolean], [string, string]]) {
      if (input === null) {
        this._negExpChars = null;
      }
      else {
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
        this._negExpChars = expChars;
      }
    }

  }

  /**
   * This notation performs weak hyperscientific notation a certain number of times. 1 iteration means the number is in the form AfB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AfBfC, and so on.
   * @param iterations ( number ! ) The amount of iterations.
   * @param max_fs_in_a_row ( number ) If the scientific representation would have more f's at the beginning than this, those f's are made into an f^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in weak hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "3.543f2" would become "35.43f1" with 1 mantissaPower and "354.3f0" with 2 mantissaPower.
   * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2f1".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for weak hyperscientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the f in "1f10", expChars[1] takes the place of the first f in "f1f10", and expChars[2] takes the place of the (f^) in (f^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["f", ""], ["f", ""], ["(f^", ")"]].
   * @param negExpChars ( null | [string, string] ) This can either be null or a pair of strings. Ignore this parameter if it's null, which is the default. Otherwise, this acts like expChars[0], but it's used when the exponent is negative. Default is null.
   * @param recipString ( null | [string, string] ) If this parameter is null, numbers below 1 are just written in mantissaInnerNotation. If this parameter is a pair of strings, then numbers below 1 are written in terms of their reciprocal, with recipString[0] going before the reciprocal and recipString[1] going after the reciprocal. Default is ["1 / ", ""].
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (f^n) expressions come after the rest of the number instead of before. Default is false.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (f^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
export class WeakHyperscientificIterationsNotation extends Notation {
  private _iterations ! : number;
  public max_fs_in_a_row = 5;
  public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
  private _engineerings : Decimal[] = [Decimal.dOne];
  public mantissaPower : Decimal = Decimal.dZero;
  public _base : Decimal = Decimal.dTen;
  private _expChars : [string, string][] = [["f", ""], ["f", ""], ["(f^", ")"]];
  public negExpChars : null | [string, string] = null;
  public recipString : null | [string, string] = ["1 / ", ""];
  public expBefore : boolean = false;
  public superexpAfter : boolean = false;
  public mantissaInnerNotation : Notation = new DefaultNotation();
  public exponentInnerNotation : Notation = this.mantissaInnerNotation;
  public superexponentInnerNotation : Notation = this.exponentInnerNotation;
  private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

  constructor(
      iterations: number,
      max_fs_in_a_row: number = 5,
      rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
      engineerings : DecimalSource | DecimalSource[] = 1, 
      mantissaPower : DecimalSource = 0,
      base : DecimalSource = 10, 
      expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [["f", ""], ["f", ""], ["(f^", ")"]],
      negExpChars : null | [string, string] = null,
      recipString : [string, string] = ["1 / ", ""],
      expBefore : boolean = false,
      superexpAfter : boolean = false,
      mantissaInnerNotation : Notation = new DefaultNotation(),
      exponentInnerNotation : Notation = mantissaInnerNotation,
      superexponentInnerNotation : Notation = exponentInnerNotation
      ) {
    super();
    this.iterations = iterations;
    this.max_fs_in_a_row = max_fs_in_a_row;
    this.rounding = rounding;
    this.engineerings = engineerings;
    this.mantissaPower = toDecimal(mantissaPower);
    this._base = toDecimal(base);
    this.recipString = recipString;
    this.expBefore = expBefore;
    this.superexpAfter = superexpAfter;
    this.mantissaInnerNotation = mantissaInnerNotation;
    this.exponentInnerNotation = exponentInnerNotation;
    this.superexponentInnerNotation = superexponentInnerNotation;
    this.unconvertedExpChars = expChars;
    this.expChars = expChars;
    this.negExpChars = negExpChars;
  }

  public name = "Weak Hyperscientific Iterations Notation";

  public formatDecimal(value: Decimal): string {
    if (value.eq(0) || value.eq(1)) return this.mantissaInnerNotation.format(value);
    if (value.lt(1)) {
      if (this.recipString === null) return this.mantissaInnerNotation.format(value);
      else return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
    }
    if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
    let iterations = this._iterations;
    let result = "";
    let negExp = false;
    let originalValue = value;
    if (value.lt(weak_tetrate(this._base, 0))) {
      negExp = true;
      let [m, e] = weak_hyperscientifify(value, this._base, this.rounding, this.mantissaPower, this._engineerings);
      value = weak_tetrate(this._base, e.neg()).pow(m);
    }
    let maxIterations = 0;
    if (value.gt(Decimal.iteratedexp(10, 4, this._base, true))) maxIterations = Decimal.slog(value, 10, true).sub(Decimal.slog(this._base, 10, true).plus(4)).div(2).floor().toNumber();
    if (maxIterations < 9e15) {
      let testingValue = value.iteratedlog(10, maxIterations * 2, true);
      maxIterations--;
      while (testingValue.isFinite()) {
        testingValue = weak_slog(testingValue, this._base);
        maxIterations++;
      }
    }
    if (iterations > maxIterations) iterations = maxIterations;
    let added_es = Decimal.min(this._iterations, Decimal.slog(value, this._base, true).sub(Decimal.slog(new Decimal(Number.MAX_SAFE_INTEGER), this._base, true)).div(2).floor()).toNumber();
    if (added_es < iterations - Decimal.slog(new Decimal(Number.MAX_SAFE_INTEGER), this._base, true).div(2).ceil().toNumber()) added_es = iterations - Decimal.slog(new Decimal(Number.MAX_SAFE_INTEGER), this._base, true).div(2).ceil().toNumber();
    if (added_es < 0) added_es = 0;
    value = Decimal.iteratedlog(value, this._base, added_es * 2, true);
    let sciArray = [value];
    for (let i = 0; i < iterations - added_es; i++) {
      if (sciArray[sciArray.length - 1].lte(1)) break;
      let [mantissa, exponent] = weak_hyperscientifify(sciArray[sciArray.length - 1], this._base, this.rounding, this.mantissaPower, this._engineerings);
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
        negExp = false;
      }
      if (sciArray.length == 1) numStr = this.exponentInnerNotation.format(toFormat);
      else numStr = this.mantissaInnerNotation.format(toFormat);
      // if (!onlyNumericCharacters(numStr) && !(onlyNumericCharacters(numStr, true) && sciArray.length == 1)) numStr = "(" + numStr + ")";
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
    if (added_es <= this.max_fs_in_a_row) {
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
    if (iterations % 1 != 0) throw new RangeError("Weak Hyperscientific Iterations Notation requires a whole number of iterations");
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

  public get base() {
    return this._base;
  }

  public set base(base : DecimalSource) {
    let baseD = toDecimal(base);
    if (baseD.lte(1)) throw new RangeError("Base <= 1 in Weak Hyperscientific Iterations Notation");
    this._base = toDecimal(base);
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