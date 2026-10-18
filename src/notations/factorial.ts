import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, multabs, iteratedfactorial, inverse_factorial, factorial_slog, nextEngineeringValue } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { AppliedFunctionNotation } from "../baseline/appliedFunction.js";

    /**
     * Represents numbers in terms of factorials, so 24 is "4!" and 720 is "6!".
     * @param iterations ( number ) The amount of factorial iterations: 1 is factorial notation, 2 is double factorial (as in (x!)!, not the other meaning of "multifactorial"), and so on. This can be negative: with -1 iterations, 4 would be "24¡".
     * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
     * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
     * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
     */
export class FactorialNotation extends Notation {
    public iterations : number = 1;
    private _max_in_a_row = 5;
    public factorialChars : [[string, string], [string, string], [string, string]] = [["", "!"], ["", "!"], ["!", ""]];
    public inverseChars : [[string, string], [string, string], [string, string]] | null = [["", "¡"], ["", "¡"], ["¡", ""]];
    public superexpAfter = true;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;

    constructor(
        iterations: number = 1,
        max_in_a_row: number = 5, 
        factorialChars : [[string, string], [string, string], [string, string]] = [["", "!"], ["", "!"], ["!", ""]],
        inverseChars : [[string, string], [string, string], [string, string]] | null = [["", "¡"], ["", "¡"], ["¡", ""]],
        superexpAfter : boolean = true,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.iterations = iterations;
      this.max_in_a_row = max_in_a_row;
      this.factorialChars = factorialChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
    }

    public name = "Factorial Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0) && this.iterations == 0) return this.innerNotation.format(0);
      if (value.lt(1)) {
        let recipNotation = new AppliedFunctionNotation(
          function(value : Decimal) : Decimal {return value.recip();},
          this, function(value : string) {return "1 / " + value;}
        )
        return recipNotation.format(value);
      }
      let result = "";
      let iterations = this.iterations;
      value = inverse_factorial(value, iterations);
      let usedChars = this.factorialChars;
      if (iterations < 0 && this.inverseChars != null) {
        usedChars = this.inverseChars;
        iterations *= -1;
      }
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this._max_in_a_row && iterations % 1 == 0) {
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
      return result;
    }

    public get max_in_a_row() {
      return this._max_in_a_row;
    }

    public set max_in_a_row(max_in_a_row : number) {
      if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Factorial Notation");
      this._max_in_a_row = max_in_a_row;
    }
  }

    /**
     * A variant of factorial notation that uses a different amount of factorial iterations depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 3628800, i.e. 10!.
     * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of factorial iterations. Default is 1.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
     * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
     */
export class MultiFactorialNotation extends Notation {
    private _maxnum : Decimal = new Decimal(3628800);
    private _max_in_a_row = 5;
    public minIterations : number = 1;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public factorialChars : [[string, string], [string, string], [string, string]] = [["", "!"], ["", "!"], ["!", ""]];
    public inverseChars : [[string, string], [string, string], [string, string]] | null = [["", "¡"], ["", "¡"], ["¡", ""]];
    public superexpAfter = true;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;

    constructor(
        maxnum: DecimalSource = 3628800,
        max_in_a_row: number = 5, 
        minIterations : number = 1,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        factorialChars : [[string, string], [string, string], [string, string]] = [["", "!"], ["", "!"], ["!", ""]],
        inverseChars : [[string, string], [string, string], [string, string]] | null = [["", "¡"], ["", "¡"], ["¡", ""]],
        superexpAfter : boolean = true,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation
        ) {
      super();
      this._maxnum = toDecimal(maxnum);
      this.max_in_a_row = max_in_a_row;
      this.minIterations = minIterations;
      this.engineerings = engineerings;
      this.factorialChars = factorialChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
    }

    public name = "Multi-Factorial Notation";
  
    public formatDecimal(value: Decimal): string {
      let iterations = this.minIterations;
      if (value.eq(0)) iterations = 0;
      else if (multabs(value).gte(iteratedfactorial(this._maxnum, this.minIterations - 1))) iterations = nextEngineeringValue(factorial_slog(multabs(value)).sub(factorial_slog(this._maxnum)), this._engineerings).max(this.minIterations).toNumber();
      if (iterations > 9e15) {
          let result = this.innerNotation.format(this._maxnum);
          let eChar = this.factorialChars[2][0];
          let afterChar = this.factorialChars[2][1];
          let eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;
          else result = eStr + result;
          return result;
      }
      return new FactorialNotation(iterations, this._max_in_a_row, this.factorialChars, this.inverseChars, this.superexpAfter, this.innerNotation, this.superexponentInnerNotation).format(value);
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
      if (maxnumD.lte(2)) throw new RangeError("maxnum <= 2 in Multi-Factorial Notation");
      this._maxnum = maxnumD;
    }

    public get max_in_a_row() {
      return this._max_in_a_row;
    }

    public set max_in_a_row(max_in_a_row : number) {
      if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Multi-Factorial Notation");
      this._max_in_a_row = max_in_a_row;
    }
  }