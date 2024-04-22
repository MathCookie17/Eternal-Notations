import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, currentEngineeringValue, nextEngineeringValue } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Abbreviates numbers in terms of their super-root; this is the square super-root by default, so 256 is 4↑↑2 and 46,656 is 6↑↑2.
     * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
     * @param iterations ( number ) The amount of super-root iterations: 1 is regular Super-Root notation, 2 means the super-root is taken twice, and so on. This can be negative.
     * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
     * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
     * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
     * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class SuperRootNotation extends Notation {
    private _height : number = 2;
    private _iterations : number = 1;
    public max_in_a_row = 5;
    public rootChars : [[string, string], [string, string], [string, string]] = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
    public inverseChars : [[string, string], [string, string], [string, string]] | null = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
    public superexpAfter = true;
    public heightShown : number = -1;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        height : number = 2,
        iterations: number = 1,
        max_Fs_in_a_row: number = 5, 
        rootChars : [[string, string], [string, string], [string, string]] = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]],
        inverseChars : [[string, string], [string, string], [string, string]] | null = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]],
        superexpAfter : boolean = true,
        heightShown : number = -1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.height = height;
      this.iterations = iterations;
      this.max_in_a_row = max_Fs_in_a_row;
      this.rootChars = rootChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.heightShown = heightShown;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Super Root Notation";
  
    public formatDecimal(value: Decimal): string {
      let result = "";
      let iterations = this._iterations;
      if (iterations < 0) {
        let i = 0;
        for (; i > iterations; i--) {
          if (value.gt(Decimal.iteratedexp(10, Math.ceil(this._height) + 1, new Decimal(Number.MAX_SAFE_INTEGER)))) {
            value = Decimal.tetrate(10, (i - iterations) * (Math.ceil(this._height) - 1), value, true);
            i = iterations;
          }
          value = Decimal.tetrate(value, this._height, 1, true);
        }
      }
      else {
        let i = 0;
        i = Decimal.slog(value, 10, true).sub(Decimal.slog(Decimal.iteratedexp(10, Math.ceil(this._height) + 1, new Decimal(Number.MAX_SAFE_INTEGER)), 10, true)).div(Math.ceil(this._height) - 1).floor().max(0).min(iterations).toNumber();
        if (i > 0) value = Decimal.iteratedlog(value, 10, i * (Math.ceil(this._height) - 1), true);
        for (; i < iterations; i++) {
          let newvalue = Decimal.linear_sroot(value, this._height);
          if (newvalue.isNan()) {
            iterations = i;
            break;
          }
          value = newvalue;
        }
      }
      let usedChars = this.rootChars;
      if (iterations < 0 && this.inverseChars != null) {
        usedChars = this.inverseChars;
        iterations *= -1;
      }
      let heightStr = "";
      if (this.heightShown) heightStr = this.baseInnerNotation.format(this._height);
      result = this.innerNotation.format(value)
      if (iterations >= 0 && iterations <= this.max_in_a_row && iterations % 1 == 0) {
          for (let i = 0; i < iterations; i++) {
            let eChar = usedChars[(i == 0) ? 0 : 1][0];
            let afterChar = usedChars[(i == 0) ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.heightShown < 0) result = result + heightStr;
            else result = heightStr + result;
          }
      }
      else {
          let eChar = usedChars[2][0];
          let afterChar = usedChars[2][1];
          let eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;
          else result = eStr + result;
          if (this.heightShown < 0) result = result + heightStr;
          else result = heightStr + result;
      }
      return result;
    }

    public get height() {
      return this._height;
    }

    public set height(height : number) {
      if (height < 1) throw new RangeError("Super root notation does not work with a height less than 1.");
      this._height = height;
    }

    public get iterations() {
      return this._iterations;
    }
  
    public set iterations(iterations : number) {
      if (iterations % 1 != 0) throw new RangeError("Super Root Notation requires a whole number of iterations");
      this._iterations = iterations;
    }
  }

    /**
     * A variant of super-root notation that uses a different amount of super-root iterations depending on how large the number is.
     * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
     * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
     * @param minIterations ( number ) The minimum amount of super-root iterations. Default is 1.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
     * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
     * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class MultiSuperRootNotation extends Notation {
    private _height : number = 2;
    private _maxnum : Decimal = new Decimal(1e10);
    public max_in_a_row = 5;
    public minIterations : number = 1;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public rootChars : [[string, string], [string, string], [string, string]] = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
    public inverseChars : [[string, string], [string, string], [string, string]] | null = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
    public superexpAfter = true;
    public heightShown : number = -1;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public baseInnerNotation : Notation = this.innerNotation;

    constructor(
        height : number = 2,
        maxnum: DecimalSource = 1e10,
        max_in_a_row: number = 5, 
        minIterations : number = 1,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        rootChars : [[string, string], [string, string], [string, string]] = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]],
        inverseChars : [[string, string], [string, string], [string, string]] | null = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]],
        superexpAfter : boolean = true,
        heightShown : number = -1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        baseInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.height = height;
      this.maxnum = maxnum;
      this.max_in_a_row = max_in_a_row;
      this.minIterations = minIterations;
      this.engineerings = engineerings;
      this.rootChars = rootChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.heightShown = heightShown;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.baseInnerNotation = baseInnerNotation;
    }

    public name = "Multi-Super Root Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.gte(Decimal.tetrate(10, 9e15, 1))) { // Imprecision was causing problems, so if we're too high, just ignore the root process and find an equivalent expression with slog
        let result = this.innerNotation.format(this._maxnum);
        let eChar = this.rootChars[2][0];
        let afterChar = this.rootChars[2][1];
        let eStr = this.superexponentInnerNotation.format(Decimal.slog(value, 10, true).div(Math.ceil(this._height) - 1));
        let heightStr = "";
        if (this.heightShown) heightStr = this.baseInnerNotation.format(this._height);
        eStr = eChar + eStr + afterChar;
        if (this.superexpAfter) result = result + eStr;
        else result = eStr + result;
        if (this.heightShown < 0) result = result + heightStr;
        else result = heightStr + result;
        return result;
      }
      let iterations = 0;
      let currentValue = toDecimal(value);
      if (this.minIterations < 0) {
        for (; iterations > this.minIterations; iterations--) {
          if (currentValue.gt(Decimal.iteratedexp(10, Math.ceil(this._height) + 1, new Decimal(Number.MAX_SAFE_INTEGER)))) {
            currentValue = Decimal.tetrate(10, (iterations - this.minIterations) * (Math.ceil(this._height) - 1), currentValue, true);
            iterations = this.minIterations;
          }
          currentValue = Decimal.tetrate(currentValue, this._height, 1, true);
        }
      }
      else {
        let addediterations = currentEngineeringValue(Decimal.slog(currentValue, 10, true).sub(Decimal.slog(Decimal.iteratedexp(10, Math.ceil(this._height) + 1, new Decimal(Number.MAX_SAFE_INTEGER)), 10, true)).div(Math.ceil(this._height) - 1), this._engineerings).max(this.minIterations);
        if (addediterations.gt(0)) currentValue = Decimal.iteratedlog(currentValue, 10, addediterations.mul((Math.ceil(this._height) - 1)).toNumber(), true);
        iterations += addediterations.toNumber();
        while (iterations < this.minIterations) {
          let newvalue = Decimal.linear_sroot(currentValue, this._height);
          if (newvalue.isNan()) break;
          currentValue = newvalue;
          iterations++;
        }
      }
      IterationLoop: while (currentValue.gte(this._maxnum)) {
        let newvalue = currentValue;
        let currentiterations = iterations;
        iterations = nextEngineeringValue(new Decimal(iterations), this._engineerings).toNumber();
        let iterationDifference = iterations - currentiterations;
        if (iterations == currentiterations) iterationDifference = 1; //If the amount of iterations is so high that nextEngineeringValue doesn't change it, ignore the engineering stuff and just get down to the point.
        for (let i = 0; i < iterationDifference; i++) {
          newvalue = Decimal.linear_sroot(currentValue, this._height);
          if (newvalue.isNan()) {
            iterations = currentiterations;
            break IterationLoop;
          }
          currentValue = newvalue;
        }
      }
      return new SuperRootNotation(this._height, iterations, this.max_in_a_row, this.rootChars, this.inverseChars, this.superexpAfter, this.heightShown, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
    }

    public get height() {
      return this._height;
    }

    public set height(height : number) {
      if (height < 1) throw new RangeError("Super root notation does not work with a height less than 1.");
      this._height = height;
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(1)) throw new RangeError("maxnum <= 1 in Multi-Super Root Notation");
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
  }

    /**
     * A variant of super-root notation that uses a different super-root height depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 65536.
     * @param minHeight ( number ) The minimum super-root height. Default is 2.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
     * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
     * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
    export class IncreasingSuperRootNotation extends Notation {
      private _maxnum : Decimal = new Decimal(65536);
      private _minHeight : number = 2;
      private _engineerings : Decimal[] = [Decimal.dOne];
      public rootChars : [[string, string], [string, string], [string, string]] = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      public inverseChars : [[string, string], [string, string], [string, string]] | null = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      public heightShown : number = -1;
      public innerNotation : Notation = new DefaultNotation();
      public baseInnerNotation : Notation = this.innerNotation;
  
      constructor(
          maxnum: DecimalSource = 65536,
          minHeight : number = 2, 
          engineerings : DecimalSource | DecimalSource[] = 1, 
          rootChars : [[string, string], [string, string], [string, string]] = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]],
          inverseChars : [[string, string], [string, string], [string, string]] | null = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]],
          heightShown : number = -1,
          innerNotation : Notation = new DefaultNotation(),
          baseInnerNotation : Notation = innerNotation,
          ) {
        super();
        this.maxnum = maxnum;
        this.minHeight = minHeight;
        this.engineerings = engineerings;
        this.rootChars = rootChars;
        this.inverseChars = inverseChars;
        this.heightShown = heightShown;
        this.innerNotation = innerNotation;
        this.baseInnerNotation = baseInnerNotation;
      }

      public name = "Increasing Super Root Notation";
    
      public formatDecimal(value: Decimal): string {
        if (value.eq(0)) return this.innerNotation.format(0);
        let height = nextEngineeringValue(Decimal.slog(value, this._maxnum.toNumber(), true), this._engineerings).max(this._minHeight).toNumber();
        return new SuperRootNotation(height, 1, 5, this.rootChars, this.inverseChars, true, this.heightShown, this.innerNotation, this.innerNotation, this.baseInnerNotation).format(value);
      }

      public get maxnum() {
        return this._maxnum;
      }
  
      public set maxnum(maxnum: DecimalSource) {
        let maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(1)) throw new RangeError("maxnum <= 1 in Increasing Super Root Notation");
        this._maxnum = maxnumD;
      }
      
      public get minHeight() {
        return this._minHeight;
      }

      public set minHeight(minHeight : number) {
        if (minHeight < 1) throw new RangeError("Super root notation does not work with a height less than 1.");
        this._minHeight = minHeight;
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
    }