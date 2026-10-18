import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { iteratedfactorial, factorial_slog, nextEngineeringValue, toDecimal } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Abbreviates numbers in terms of how many times you'd have to apply factorial to 3 to get to them, so 3 is 3!0, 6 is 3!1, and 720 is 3!2.
     * @param iterations ( number ) The amount of factorial-amount iterations.
     * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
     * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
     * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class FactorialAmountNotation extends Notation {
    private _iterations : number = 1;
    private _max_in_a_row = 5;
    private _base : Decimal = new Decimal(3);
    public factorialChars : [[string, string], [string, string], [string, string]] = [["!", ""], ["!", ""], ["(!^", ")"]];
    public inverseChars : [[string, string], [string, string], [string, string]] | null = [["¡", ""], ["¡", ""], ["(¡^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 1;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        iterations: number = 1,
        max_in_a_row: number = 5, 
        base : DecimalSource = 3, 
        factorialChars : [[string, string], [string, string], [string, string]] = [["!", ""], ["!", ""], ["(!^", ")"]],
        inverseChars : [[string, string], [string, string], [string, string]] | null = [["¡", ""], ["¡", ""], ["(¡^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.iterations = iterations;
      this._max_in_a_row = max_in_a_row;
      this.base = base;
      this.factorialChars = factorialChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Factorial Amount Notation";
  
    public formatDecimal(value: Decimal): string {
      let result = "";
      if (value.lt(1) && value.neq(0)) return "1 / " + this.format(value.recip()) 
      if (value.lte(2)) return this.innerNotation.format(value);
      let iterations = this._iterations;
      if (this._iterations < 0) for (iterations = 0; iterations > this._iterations && value.gt(2); iterations--) value = iteratedfactorial(this._base, value.toNumber());
      else for (iterations = 0; iterations < this._iterations && value.gt(2); iterations++) value = factorial_slog(value, this._base);
      let usedChars = this.factorialChars;
      if (iterations < 0 && this.inverseChars != null) {
        usedChars = this.inverseChars;
        iterations *= -1;
      }
      let baseStr = "";
      if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this._max_in_a_row && iterations % 1 == 0) {
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
      if (iterations % 1 != 0) throw new RangeError("Factorial Amount Notation requires a whole number of iterations");
      this._iterations = iterations;
    }

    public get max_in_a_row() {
      return this._max_in_a_row;
    }

    public set max_in_a_row(max_in_a_row : number) {
      if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Factorial Amount Notation");
      this._max_in_a_row = max_in_a_row;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.lte(2)) throw new RangeError("Base <= 2 in Factorial Amount Notation");
      this._base = baseD;
    }
  }

    /**
     * A variant of factorial amount notation that uses a different amount of iterations depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
     * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
     * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
     * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
     * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class MultiFactorialAmountNotation extends Notation {
    private _maxnum : Decimal = new Decimal(3628800);
    public _max_in_a_row = 5;
    public minIterations : number = 1;
    private _base : Decimal = new Decimal(3);
    private _engineerings : Decimal[] = [Decimal.dOne];
    public factorialChars : [[string, string], [string, string], [string, string]] = [["!", ""], ["!", ""], ["(!^", ")"]];
    public inverseChars : [[string, string], [string, string], [string, string]] | null = [["¡", ""], ["¡", ""], ["(¡^", ")"]];
    public superexpAfter = false;
    public baseShown : number = 1;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        maxnum: DecimalSource = 1e10,
        max_in_a_row: number = 5, 
        minIterations : number = 1,
        base : DecimalSource = 3,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        factorialChars : [[string, string], [string, string], [string, string]] = [["!", ""], ["!", ""], ["(!^", ")"]],
        inverseChars : [[string, string], [string, string], [string, string]] | null = [["¡", ""], ["¡", ""], ["(¡^", ")"]],
        superexpAfter : boolean = false,
        baseShown : number = 1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.maxnum = maxnum;
      this.max_in_a_row = max_in_a_row;
      this.minIterations = minIterations;
      this.base = base;
      this.engineerings = engineerings
      this.factorialChars = factorialChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.baseShown = baseShown;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Multi-Factorial Amount Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.lte(1) && value.neq(0)) return "1 / " + this.format(value.recip()) 
      if (value.lte(2)) return this.innerNotation.format(value);
      let iterations = 0;
      let currentValue = toDecimal(value);
      while (iterations < this.minIterations && currentValue.gt(2)) {
        iterations++;
        currentValue = factorial_slog(currentValue, this._base);
      }
      while (currentValue.gte(this._maxnum)) {
        let currentiterations = iterations;
        iterations = nextEngineeringValue(new Decimal(iterations), this._engineerings).toNumber();
        for (let i = currentiterations; i < iterations; i++) {
          currentValue = factorial_slog(currentValue, this._base);
          if (currentValue.lte(2)) break;
        }
      }
      return new FactorialAmountNotation(iterations, this._max_in_a_row, this._base, this.factorialChars, this.inverseChars, this.superexpAfter, this.baseShown, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
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
      if (maxnumD.lte(2)) throw new RangeError("maxnum <= 2 in Multi-Factorial Amount Notation");
      this._maxnum = maxnumD;
    }

    public get max_in_a_row() {
      return this._max_in_a_row;
    }

    public set max_in_a_row(max_in_a_row : number) {
      if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Multi-Factorial Amount Notation");
      this._max_in_a_row = max_in_a_row;
    }

    public get base() {
      return this._base;
    }

    public set base(base : DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.lte(2)) throw new RangeError("Base <= 2 in Multi-Factorial Amount Notation");
      this._base = baseD;
    }
  }