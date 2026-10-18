import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, factorial_hyperscientifify, factorial_slog, iteratedfactorial } from "../baseline/utils.js";

  /**
   * Like hyperscientific notation, but with repeated factorials instead of tetration. For example, 6 (3!) could be 3!1, 4!2 means 4!! (which is around 6.2e23), and 7!20 means 7!!!!!!... with 20 !'s.
   * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-hyperscientific notation. Default is 3628800.
   * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param limit ( Decimal ) If the mantissa is below the limit, a factorial is removed to bring the mantissa back above the limit. Default is 3.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 6 to just be abbreviated as "6" instead of "3!1". Default is false.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
export class FactorialHyperscientificNotation extends Notation {
    public maxnum : Decimal = new Decimal(3628800);
    public max_Fs_in_a_row = 5;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    private _limit : Decimal = new Decimal(3);
    public iteration_zero : boolean = false;
    private _expChars : [string, string][] = [["!", ""], ["!", ""], ["(!^", ")"]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public superexpAfter : boolean = false;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public superexponentInnerNotation : Notation = this.exponentInnerNotation;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

    constructor(
        maxnum: DecimalSource = 3628800,
        max_Fs_in_a_row: number = 5, 
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        limit : DecimalSource = 3,
        iteration_zero : boolean = false,
        expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [["!", ""], [false, ""], ["(!^", ")"]],
        negExpChars : null | [[string, string] | boolean, [string, string]] = null,
        expBefore : boolean = false,
        superexpAfter : boolean = false,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        superexponentInnerNotation : Notation = exponentInnerNotation,
        ) {
      super();
      this.maxnum = toDecimal(maxnum);
      this.max_Fs_in_a_row = max_Fs_in_a_row;
      this.rounding = rounding;
      this.engineerings = engineerings;
      this.limit = limit;
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

    public name = "Factorial Hyperscientific Notation";
  
    public formatDecimal(value: Decimal): string {
      if (this.iteration_zero && value.lt(this.maxnum) && value.gt(this.maxnum.recip())) return this.mantissaInnerNotation.format(value);
      let result = "";
      if (value.lt(iteratedfactorial(this._limit, this.maxnum.toNumber()))) {
        let [mantissa, exponent] = factorial_hyperscientifify(value, this._limit, this.rounding, this._engineerings);
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
        while (value.gte(iteratedfactorial(this._limit, this.maxnum.toNumber()))) {
          added_Fs++;
          value = factorial_slog(value, this._limit)
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

    public get limit() {
      return this._limit;
    }

    public set limit(limit : DecimalSource) {
      let limitD = toDecimal(limit);
      if (limitD.lte(2)) throw new Error("Limit <= 2 in Factorial Hyperscientific Notation");
      this._limit = limitD;
    }
  
    public get expChars() {
      return this.unconvertedExpChars;
    }
  
    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string]]) {
      let limitStr = this.mantissaInnerNotation.format(this._limit);
      let expChars : [string, string][] = [];
      expChars.push(input[0]);
      expChars.push(["", ""]);
      if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];
      else if (input[1][0] === false) expChars[1][0] = limitStr + input[0][0];
      else if (input[1][0] === true) expChars[1][0] = input[0][0] + limitStr;
      if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];
      else if (input[1][1] === false) expChars[1][1] = limitStr + input[0][1];
      else if (input[1][1] === true) expChars[1][1] = input[0][1] + limitStr;
      expChars.push(input[2]);
      this._expChars = expChars;
    }

  }

    /**
     * This notation performs factorial-hyperscientific notation a certain number of times. 1 iteration means the number is in the form A!B (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A!B!C, and so on.
     * @param iterations ( number ! ) The amount of iterations.
     * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param limit ( Decimal ) If the mantissa is equal to or above the limit, another factorial is taken to bring the mantissa back above the limit. Default is 3.
     * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
     * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
     * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
     * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
     * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
     * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
     */
  export class FactorialHyperscientificIterationsNotation extends Notation {
    private _iterations ! : number;
    public max_Fs_in_a_row = 5;
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _engineerings : Decimal[] = [Decimal.dOne];
    private _limit : Decimal = new Decimal(3);
    private _expChars : [string, string][] = [["!", ""], ["!", ""], ["(!^", ")"]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public superexpAfter : boolean = false;
    public mantissaInnerNotation : Notation = new DefaultNotation();
    public exponentInnerNotation : Notation = this.mantissaInnerNotation;
    public superexponentInnerNotation : Notation = this.exponentInnerNotation;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string]];

    constructor(
        iterations: number,
        max_Fs_in_a_row: number = 5,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        limit : DecimalSource = 3,
        expChars : [[string, string], [string | boolean, string | boolean], [string, string]] = [["!", ""], [false, ""], ["(!^", ")"]],
        negExpChars : null | [[string, string] | boolean, [string, string]] = null,
        expBefore : boolean = false,
        superexpAfter : boolean = false,
        mantissaInnerNotation : Notation = new DefaultNotation(),
        exponentInnerNotation : Notation = mantissaInnerNotation,
        superexponentInnerNotation : Notation = exponentInnerNotation,
        ) {
      super();
      this.iterations = iterations;
      this.max_Fs_in_a_row = max_Fs_in_a_row;
      this.rounding = rounding;
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      this._engineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
      this.limit = limit;
      this.expBefore = expBefore;
      this.superexpAfter = superexpAfter;
      this.mantissaInnerNotation = mantissaInnerNotation;
      this.exponentInnerNotation = exponentInnerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.unconvertedExpChars = expChars;
      this.expChars = expChars;
      this.negExpChars = negExpChars;
    }

    public name = "Factorial Hyperscientific Iterations Notation";
  
    public formatDecimal(value: Decimal): string {
      if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
      let iterations = this._iterations;
      let result = "";
      let added_Fs = 0;
      while (value.gt(Decimal.tetrate(10, Number.MAX_SAFE_INTEGER, 1, true)) && added_Fs < iterations) {
        added_Fs++;
        value = factorial_slog(value, this._limit);
      }
      let sciArray = [value];
      for (let i = 0; i < iterations - added_Fs; i++) {
        if (sciArray[sciArray.length - 1].lte(2)) break;
        let [mantissa, exponent] = factorial_hyperscientifify(sciArray[sciArray.length - 1], this._limit, this.rounding, this._engineerings);
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

    public get iterations() {
      return this._iterations;
    }

    public set iterations(iterations : number) {
      if (iterations % 1 != 0) throw new RangeError("Factorial Hyperscientific Iterations Notation requires a whole number of iterations");
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

    public get limit() {
      return this._limit;
    }

    public set limit(limit : DecimalSource) {
      let limitD = toDecimal(limit);
      if (limitD.lte(2)) throw new Error("Limit <= 2 in Factorial Hyperscientific Notation");
      this._limit = limitD;
    }
  
    public get expChars() {
      return this.unconvertedExpChars;
    }
  
    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string]]) {
      let limitStr = this.mantissaInnerNotation.format(this._limit);
      let expChars : [string, string][] = [];
      expChars.push(input[0]);
      expChars.push(["", ""]);
      if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];
      else if (input[1][0] === false) expChars[1][0] = limitStr + input[0][0];
      else if (input[1][0] === true) expChars[1][0] = input[0][0] + limitStr;
      if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];
      else if (input[1][1] === false) expChars[1][1] = limitStr + input[0][1];
      else if (input[1][1] === true) expChars[1][1] = input[0][1] + limitStr;
      expChars.push(input[2]);
      this._expChars = expChars;
    }

  }