import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, currentEngineeringValue, nextEngineeringValue } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

    /**
     * Abbreviates numbers in terms of a root; this is the square root by default, so 64 is 8^2 and 10,000 is 100^2.
     * @param height ( Decimal ) The height of the root. Default is 2.
     * @param iterations ( Decimal ) The amount of root iterations: 1 is regular Root notation, 2 means the root is taken twice, and so on. This can be negative: for example, with -1 iterations, 13 would be "√(169)"
     * @param max_in_a_row ( number ) If there are more root iterations than this, then the ^b's are made into a ^b^n expression. Default is 5.
     * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
     * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null ) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
     * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
     * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param heightInnerNotation ( Notation ) The notation that the height within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class RootNotation extends Notation {
    public height : Decimal = Decimal.dTwo;
    public iterations : Decimal = Decimal.dOne;
    public max_in_a_row = 5;
    public rootChars : [[string, string], [string, string], [string, string] | null] = [["", "^"], ["(", ")^"], null];
    public inverseChars : [[string, string], [string, string], [string, string] | null] | null = [["√(", ")"], ["√(", ")"], null];
    public superexpAfter = true;
    public heightShown : number = -1;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public heightInnerNotation : Notation = this.innerNotation;

    constructor(
        height : DecimalSource = 2,
        iterations: DecimalSource = 1,
        max_Fs_in_a_row: number = 5, 
        rootChars : [[string, string], [string, string], [string, string] | null] = [["", "^"], ["(", ")^"], null],
        inverseChars : [[string, string], [string, string], [string, string] | null] | null = [["√(", ")"], ["√(", ")"], null],
        superexpAfter : boolean = true,
        heightShown : number = -1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        heightInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.height = toDecimal(height);
      this.iterations = toDecimal(iterations);
      this.max_in_a_row = max_Fs_in_a_row;
      this.rootChars = rootChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.heightShown = heightShown;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.heightInnerNotation = heightInnerNotation;
    }

    public name = "Root Notation";
  
    public formatDecimal(value: Decimal): string {
      let result = "";
      let iterations = this.iterations;
      value = value.root(this.height.pow(this.iterations));
      let usedChars = this.rootChars;
      if (iterations.lt(0) && this.inverseChars != null) {
        usedChars = this.inverseChars;
        iterations = iterations.neg();
      }
      let baseStr = this.heightInnerNotation.format(this.height);
      if (usedChars[2] === null) {
        if (this.iterations.lt(0)) usedChars[2] = ["^" + baseStr + "^-", ""];
        else usedChars[2] = ["^" + baseStr + "^", ""];
      }
      else if (this.inverseChars != null) iterations = iterations.abs();
      if (!this.heightShown) baseStr = "";
      result = this.innerNotation.format(value)
      if (iterations.gte(0) && iterations.lte(this.max_in_a_row) && iterations.mod(1).eq(0)) {
          for (let i = 0; i < iterations.toNumber(); i++) {
            let eChar = usedChars[(i == 0) ? 0 : 1][0];
            let afterChar = usedChars[(i == 0) ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.heightShown < 0) result = result + baseStr;
            else if (this.heightShown > 0) result = baseStr + result;
          }
      }
      else {
          let eChar = usedChars[2][0];
          let afterChar = usedChars[2][1];
          let eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;
          else result = eStr + result;
          if (this.heightShown < -1) result = result + baseStr;
          else if (this.heightShown > 1) result = baseStr + result;
      }
      return result;
    }
  }

    /**
     * A variant of root notation that uses a different root height depending on how large the number is.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 10000.
     * @param minHeight ( Decimal ) The minimum root height. Default is 2.
     * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
     * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null ) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
     * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
     * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param heightInnerNotation ( Notation ) The notation that the height within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class IncreasingRootNotation extends Notation {
    private _maxnum : Decimal = new Decimal(10000);
    public minHeight : Decimal = Decimal.dTwo;
    private _engineerings : Decimal[] = [Decimal.dOne];
    public rootChars : [[string, string], [string, string], [string, string] | null] = [["", "^"], ["(", ")^"], null];
    public inverseChars : [[string, string], [string, string], [string, string] | null] | null = [["√(", ")"], ["√(", ")"], null];
    public heightShown : number = -1;
    public innerNotation : Notation = new DefaultNotation();
    public heightInnerNotation : Notation = this.innerNotation;

    constructor(
        maxnum: DecimalSource = 10000,
        minHeight : DecimalSource = 2,
        engineerings : DecimalSource | DecimalSource[] = 1, 
        rootChars : [[string, string], [string, string], [string, string] | null] = [["", "^"], ["(", ")^"], null],
        inverseChars : [[string, string], [string, string], [string, string] | null] | null = [["√(", ")"], ["√(", ")"], null],
        heightShown : number = -1,
        innerNotation : Notation = new DefaultNotation(),
        heightInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.maxnum = maxnum;
      this.minHeight = toDecimal(minHeight);
      this.engineerings = engineerings;
      this.rootChars = rootChars;
      this.inverseChars = inverseChars;
      this.heightShown = heightShown;
      this.innerNotation = innerNotation;
      this.heightInnerNotation = heightInnerNotation;
    }

    public name = "Increasing Root Notation";

    public formatDecimal(value: Decimal): string {
      if (value.eq(0)) return this.innerNotation.format(0);
      let height = nextEngineeringValue(Decimal.log(value, this._maxnum), this._engineerings).max(this.minHeight);
      return new RootNotation(height, 1, 5, this.rootChars, this.inverseChars, true, this.heightShown, this.innerNotation, this.innerNotation, this.heightInnerNotation).format(value);
    }

    public get maxnum() {
      return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
      let maxnumD = toDecimal(maxnum);
      if (maxnumD.lte(1)) throw new RangeError("maxnum <= 1 in Increasing Root Notation");
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
     * A variant of root notation that uses a different amount of root iterations depending on how large the number is. Once the amount of iterations gets too high, we go to a higher layer where the amount of iterations is itself written in this notation, and repeat that layering process for larger and larger numbers.
     * @param height ( Decimal ) The height of the root. Default is 2.
     * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 10000.
     * @param max_iterations_in_a_row ( number ) If there are more root iterations than this, then the ^b's are made into a ^b^n expression. Default is 5.
     * @param minIterations ( Decimal ) The minimum amount of root iterations. Default is 1.
     * @param maxIterations ( Decimal ) The amount of root iterations must be less than this: anything higher and the layer is increased. Default is 10000.
     * @param layerBase ( Decimal ) The number that we're repeatedly taking the root of on higher layers. Default is equal to the height so that the power tower is filled with one number instead of two alternating numbers.
     * @param max_layers_in_a_row ( number ) If there are more root iterations than this, then the ^b^h's are made into a (^b^h)^n expression. Default is 3.
     * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the iteration amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param layerEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of layers: if it's three then the layer amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted layer amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
     * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
     * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
     * @param layerChars ( [string, string] ) A pair of strings that represent an additional layer: the first string is placed before the number, the second is placed afterwards. Default is ["", "^b^h"], where b is layerBase and h is height.
     * @param layerAfter ( boolean ) This is false by default; if it's true, the layerChars come after the number instead of before.
     * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
     * @param heightInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
     */
export class MultiRootNotation extends Notation {
    public height : Decimal = Decimal.dTwo;
    public maxnum : Decimal = new Decimal(10000);
    public max_iterations_in_a_row = 5;
    public minIterations : Decimal = Decimal.dOne;
    public maxIterations : Decimal = new Decimal(10000);
    public layerBase : Decimal = this.height;
    public max_layers_in_a_row = 3;
    private _iterationEngineerings : Decimal[] = [Decimal.dOne];
    private _layerEngineerings : Decimal[] = [Decimal.dOne];
    public rootChars : [[string, string], [string, string], [string, string] | null] = [["", "^"], ["(", ")^"], null];
    public inverseChars : [[string, string], [string, string], [string, string] | null] | null = [["√(", ")"], ["√(", ")"], null];
    public superexpAfter = true;
    public layerChars : [string, string] | null = null;
    public layerAfter : boolean = false;
    public heightShown : number = -1;
    public innerNotation : Notation = new DefaultNotation();
    public superexponentInnerNotation : Notation = this.innerNotation;
    public heightInnerNotation : Notation = this.innerNotation;

    constructor(
        height : DecimalSource = 2,
        maxnum: DecimalSource = 10000,
        max_iterations_in_a_row: number = 5, 
        minIterations : DecimalSource = 1,
        maxIterations : DecimalSource = 10000,
        layerBase : DecimalSource = height,
        max_layers_in_a_row: number = 3,
        iterationEngineerings : DecimalSource | DecimalSource[] = 1,
        layerEngineerings : DecimalSource | DecimalSource[] = 1, 
        rootChars : [[string, string], [string, string], [string, string] | null] = [["", "^"], ["(", ")^"], null],
        inverseChars : [[string, string], [string, string], [string, string] | null] | null = [["√(", ")"], ["√(", ")"], null],
        superexpAfter : boolean = true,
        layerChars : [string, string] | null = null,
        layerAfter : boolean = false,
        heightShown : number = -1,
        innerNotation : Notation = new DefaultNotation(),
        superexponentInnerNotation : Notation = innerNotation,
        heightInnerNotation : Notation = innerNotation,
        ) {
      super();
      this.height = toDecimal(height);
      this.maxnum = toDecimal(maxnum);
      this.max_iterations_in_a_row = max_iterations_in_a_row;
      this.minIterations = toDecimal(minIterations);
      this.maxIterations = toDecimal(maxIterations);
      this.layerBase = toDecimal(layerBase);
      this.max_layers_in_a_row = max_layers_in_a_row;
      this.iterationEngineerings = iterationEngineerings;
      this.layerEngineerings = layerEngineerings;
      this.rootChars = rootChars;
      this.inverseChars = inverseChars;
      this.superexpAfter = superexpAfter;
      this.layerChars = layerChars;
      this.layerAfter = layerAfter;
      this.heightShown = heightShown;
      this.innerNotation = innerNotation;
      this.superexponentInnerNotation = superexponentInnerNotation;
      this.heightInnerNotation = heightInnerNotation;
    }

    public name = "Multi-Root Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0)) return this.innerNotation.format(0);
      if (value.lt(1)) return this.innerNotation.format(1) + " / " + this.format(value.recip());
      let layers = 0;
      layers = currentEngineeringValue(Decimal.slog(value, 10, true).sub(Decimal.slog(Decimal.iteratedexp(10, 2, new Decimal(Number.MAX_SAFE_INTEGER), true))).div(2), this._layerEngineerings).max(0).toNumber();
      if (layers > 0) value = value.iteratedlog(10, layers * 2, true);
      if (layers >= 4.5e15) value = this.maxnum.pow(Decimal.pow(this.height, this.maxIterations));
      else while (value.gte(this.maxnum.pow(Decimal.pow(this.height, this.maxIterations)))) {
        let nextLayers = nextEngineeringValue(new Decimal(layers), this._layerEngineerings).toNumber();
        let layerdiff = nextLayers - layers;
        for (let i = 0; i < layerdiff; i++) value = value.log(this.layerBase).log(this.height);
        layers = nextLayers;
      }
      let iterations = value.log(this.maxnum).log(this.height);
      if (!Decimal.isFinite(iterations)) iterations = this.minIterations;
      else iterations = nextEngineeringValue(iterations, this._iterationEngineerings).max(this.minIterations);
      let subresult = new RootNotation(this.height, iterations, this.max_iterations_in_a_row, this.rootChars, this.inverseChars, this.superexpAfter, this.heightShown, this.innerNotation, this.superexponentInnerNotation, this.heightInnerNotation).format(value);
      let result = subresult;
      if (layers == 0) return subresult;
      let layerBeforeStr = "";
      let layerAfterStr = "";
      let baseStr = this.heightInnerNotation.format(this.layerBase);
      let usedChars = this.rootChars;
      if (usedChars[2] === null) {
        if (iterations.lt(0)) usedChars[2] = ["^" + baseStr + "^-", ""];
        else usedChars[2] = ["^" + baseStr + "^", ""];
      }
      if (!this.heightShown) baseStr = "";
      if (this.layerChars == null) {
        let eChar = usedChars[0][0];
        let afterChar = usedChars[0][1];
        let eStr = this.heightInnerNotation.format(this.height);
        if (this.superexpAfter) eStr = baseStr + "^" + eStr + afterChar;
        else eStr = baseStr + "^" + eStr + eChar;
        if (this.layerAfter) layerAfterStr = eStr;
        else layerBeforeStr = eStr;
      }
      else {
        layerBeforeStr = this.layerChars[0];
        layerAfterStr = this.layerChars[1]
      }
      if (layers >= 0 && layers <= this.max_layers_in_a_row) {
        for (let l = 0; l < layers; l++) {
          result = layerBeforeStr + result + layerAfterStr;
        }
      }
      else {
        let leStr = this.superexponentInnerNotation.format(layers);
        if (this.layerAfter) leStr = "(" + layerAfterStr + ")" + "^" + leStr;
        else leStr = "(" + layerBeforeStr + ")" + "^" + leStr;;
        if (this.layerAfter) result = result + "(" + leStr + ")";
        else result = "(" + leStr + ")" + result;
      }
      return result;
    }

    public get iterationEngineerings() {
      return this._iterationEngineerings;
    }

    public set iterationEngineerings(iterationEngineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(iterationEngineerings)) iterationEngineerings = [iterationEngineerings];
      if (iterationEngineerings.length == 0) {
        this._iterationEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = iterationEngineerings.map(toDecimal);
      this._iterationEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get layerEngineerings() {
      return this._layerEngineerings;
    }

    public set layerEngineerings(layerEngineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(layerEngineerings)) layerEngineerings = [layerEngineerings];
      if (layerEngineerings.length == 0) {
        this._layerEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD = layerEngineerings.map(toDecimal);
      this._layerEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }
  }