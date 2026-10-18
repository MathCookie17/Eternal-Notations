import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, currentEngineeringValue, nextEngineeringValue, previousEngineeringValue, round, increasingFunctionScientifify } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

  /**
   * Takes any strictly increasing Decimal => Decimal function (preferrably one whose outputs are larger than its inputs) and uses Decimal.increasingInverse to create a Logarithm-style notation using it.
   * For example, if the function is (v => v.pow(6)), then 729 would be written as f(3).
   * @param func ( (value : Decimal) => Decimal ! ) The function that this notation uses. This function must be strictly increasing, and unless maxnum is false, it should return an output larger than its input, at least for numbers above the maxnum.
   * @param inverseAlready ( boolean ) If this parameter is false, then "func" is the function to take the inverse of. If this parameter is true, then "func" is already the inverse function.
   * For example, if you want the function to be (v => Decimal.tetrate(2, v)) (which would make this notation equivalent to base-2 super logarithm), then if inverseAlready is true,
   * you'd enter (v => Decimal.slog(v, 2)) as func instead. Decimal.increasingInverse can be slow, so doing this is mostly useful for speed purposes.
   * @param layerFunction ( (value : Decimal) => Decimal ) For numbers too large to just repeatedly apply func, layerFunction is used to determine how many extra "layers" to add on.
   * The default value of layerFunction is value => Decimal.tetrate(10, value.toNumber(), 1, true), i.e. each layer increases the tetra-exponent by 1, i.e. each layer is a power tower layer.
   * @param layerInverseAlready ( boolean ) Same as inverseAlready, but for layerFunction instead.
   * @param layerMimics ( boolean ) If this parameter is false, then layers and iterations are treated as separate. If this parameter is true, then layers act as if they're additional iterations.
   * You should probably only make this parameter true if your layerFunction is approximating what repeatedly applying func would do to large numbers.
   * @param iterationChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate iterations of the function. In each pair, the first entry goes before the number, the second entry goes after the number. iterationChars[0] takes the place of the f() in "f(25)", iterationChars[1] takes the place of the first f() in "f(f(654))" (iterationChars[0] is for the innermost iteration, iterationChars[1] is for the outer ones), and iterationChars[2] takes the place of the (f^) in (f^10)4. Default is [["f(", ")"], ["f(", ")"], ["(f^", ")"]].
   * @param negIterationChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of iterationChars used for negative iterations. Default is [["f^-1(", ")"], ["f^-1(", ")"], ["(f^-", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of iterationChars[2], such as (f^-2).
   * @param layerChars ( [[string, string], [string, string], [string, string]] ) Same as iterationChars, but for layers instead of iterations. Since each layer is equivalent to an exponent level by default, the default is [["e", ""], ["e", ""], ["(e^", ")"]]. This parameter is unused if layerMimics is true.
   * @param minIterations ( Decimal ) The minimum amount of iterations of the function. Default is 1.
   * @param maxnum ( Decimal | null ) If this parameter is a Decimal, then whenever the number within the function would exceed this value, another iteration of the function is taken to bring it back below this value. If this value is null, then there is no maximum, so the amount of iterations does not change. Default is 1e12.
   * @param layer_maxnum ( Decimal ) Whenever the number, before applying any function iterations, is above this value, the amount of layers is increased to bring it back below this value. Default is (e^6)12.
   * @param rangeMinimum ( Decimal ) The minimum value that is allowed to be put into the function. If the value given would result in a function argument below this value, the function cannot be applied, and so the amount of iterations is reduced. Default is 0, which doesn't really do anything because notations already handle negatives separately... except if this value is below 0, negatives above this value are handled directly by the function instead of using negativeSign.
   * @param rangeMaximum ( Decimal ) The maximum value that is allowed to be put into the function. This value must be greater than maxnum, so this parameter doesn't really do anything for the notation, but depending on what function you're using, it may be useful in ensuring Decimal.increasingInverse doesn't try testing invalid values.
   * @param max_iterations_in_a_row ( number ) If there are more iterations than this, the f()'s are made into an f^n expression. Default is 5.
   * @param max_layers_in_a_row ( number ) If there are more layers than this, the e's are made into an e^n expression. Default is 3. This parameter is unused if layerMimics is true.
   * @param superexpAfter ( [boolean, boolean, boolean] ) If superexpAfter[0] is true, the f^n expression from iterationChars comes after the number instead of before. superexpAfter[1] is for negExpChars, superexpAfter[2] is for layerChars. Default is [false, false, false].
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The number within the function is rounded to the nearest multiple of this value. If this parameter is a function, then the value is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted amounts of iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param layerEngineerings ( Decimal | Decimal[] ) Same as iterationEngineerings, but for layers instead of iterations. Default is 1.
   * @param innerNotation ( Notation ) The notation that the number within the function is itself notated with. DefaultNotation is the default.
   * @param iterationInnerNotation ( Notation | null ) The notation that the number in an (f^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as innerNotation by default.
   * @param layerInnerNotation ( Notation | null ) The notation that the number in an (e^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as iterationInnerNotation by default. This parameter is unused if layerMimics is true.
   * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal (which happens if it's below 1 and it violates rangeMinimum's lower bound but its reciprocal does not), recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is ["1 / ", ""].
   */
  export class IncreasingFunctionNotation extends Notation {
    public func ! : (value : Decimal) => Decimal;
    public inverseAlready : boolean = false;
    public layerFunction : (value : Decimal) => Decimal = value => Decimal.tetrate(10, value.toNumber(), 1, true);
    public layerInverseAlready : boolean = false;
    public layerMimics : boolean = false;
    public iterationChars : [[string, string], [string, string], [string, string]] = [["f(", ")"], ["f(", ")"], ["(f^", ")"]];
    public negIterationChars : null | [[string, string], [string, string], [string, string]] = [["f^-1(", ")"], ["f^-1(", ")"], ["(f^-", ")"]];
    public layerChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]];
    private _minIterations : Decimal = Decimal.dOne;
    public maxnum : Decimal | null = new Decimal(1e12);
    public layer_maxnum : Decimal = new Decimal("(e^6)12");
    private _rangeMinimum : Decimal = Decimal.dZero;
    private _rangeMaximum : Decimal = Decimal.dInf;
    public max_iterations_in_a_row : number = 5;
    public max_layers_in_a_row : number = 3;
    public superexpAfter : [boolean, boolean, boolean] = [false, false, false];
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _iterationEngineerings : Decimal[] = [Decimal.dOne];
    private _layerEngineerings : Decimal[] = [Decimal.dOne];
    public innerNotation : Notation = new DefaultNotation();
    public iterationInnerNotation : Notation | null = this.innerNotation;
    public layerInnerNotation : Notation | null = this.iterationInnerNotation;
    public recipString : [string, string] = ["1 / ", ""];
  
    constructor(
      func : (value : Decimal) => Decimal,
      inverseAlready : boolean = false,
      layerFunction : (value : Decimal) => Decimal = value => Decimal.tetrate(10, value.toNumber(), 1, true),
      layerInverseAlready : boolean = false,
      layerMimics : boolean = false,
      iterationChars : [[string, string], [string, string], [string, string]] = [["f(", ")"], ["f(", ")"], ["(f^", ")"]],
      negIterationChars : null | [[string, string], [string, string], [string, string]] = [["f^-1(", ")"], ["f^-1(", ")"], ["(f^-", ")"]],
      layerChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]],
      minIterations : DecimalSource = Decimal.dOne,
      maxnum : DecimalSource | null = new Decimal(1e12),
      layer_maxnum : DecimalSource = new Decimal("(e^6)12"),
      rangeMinimum : DecimalSource = 0,
      rangeMaximum : DecimalSource = Infinity,
      max_iterations_in_a_row : number = 5,
      max_layers_in_a_row : number = 3,
      superexpAfter : [boolean, boolean, boolean] = [false, false, false],
      rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero,
      iterationEngineerings : DecimalSource | DecimalSource[] = 1, 
      layerEngineerings : DecimalSource | DecimalSource[] = 1, 
      innerNotation : Notation = new DefaultNotation(),
      iterationInnerNotation : Notation | null = innerNotation,
      layerInnerNotation : Notation | null = iterationInnerNotation,
      recipString : [string, string] = ["1 / ", ""],
      ) {
      super();
      this.func = func;
      this.inverseAlready = inverseAlready;
      this.layerFunction = layerFunction;
      this.layerInverseAlready = layerInverseAlready;
      this.layerMimics = layerMimics;
      this.iterationChars = iterationChars;
      this.negIterationChars = negIterationChars;
      this.layerChars = layerChars;
      this._minIterations = toDecimal(minIterations);
      this.maxnum = (maxnum === null) ? null : toDecimal(maxnum);
      this.layer_maxnum = toDecimal(layer_maxnum);
      this.setRange(rangeMinimum, rangeMaximum);
      this.max_iterations_in_a_row = max_iterations_in_a_row;
      this.max_layers_in_a_row = max_layers_in_a_row;
      this.superexpAfter = superexpAfter;
      this.rounding = rounding;
      this.iterationEngineerings = iterationEngineerings;
      this.layerEngineerings = layerEngineerings;
      this.innerNotation = innerNotation;
      this.iterationInnerNotation = iterationInnerNotation;
      this.layerInnerNotation = layerInnerNotation;
      this.recipString = recipString;
    }

    public name = "Increasing Function Notation";

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
  
      return (decimal.sgn() < 0 && (decimal.lt(this._rangeMinimum)))
        ? this.formatNegativeDecimal(decimal.abs())
        : this.formatDecimal(decimal);
    }
  
    public formatDecimal(value: Decimal): string {
      let func : (value : Decimal) => Decimal, inverse : (value : Decimal) => Decimal;
      let maxnum = (this.maxnum !== null) ? this.maxnum : Decimal.dInf;
      if (this.inverseAlready) {
        func = this.func;
        inverse = Decimal.increasingInverse(this.func, false, undefined, this._rangeMinimum, this._rangeMaximum);
      }
      else {
        func = Decimal.increasingInverse(this.func, false, undefined, this._rangeMinimum, this._rangeMaximum);
        inverse = this.func;
      }
      let layerFunc : (value : Decimal) => Decimal, layerInverse : (value : Decimal) => Decimal;
      if (this.layerInverseAlready) {
        layerFunc = this.layerFunction;
        layerInverse = Decimal.increasingInverse(this.layerFunction);
      }
      else {
        layerFunc = Decimal.increasingInverse(this.layerFunction);
        layerInverse = this.layerFunction;
      }
      if (value.lt(1) && value.neq(0) && value.lt(this.func(this._rangeMinimum)) && value.recip().gte(this.func(this._rangeMinimum))) return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
      let currentValue = new Decimal(value);
      let roundedValue = round(currentValue, this.rounding);
      let iterations = new Decimal(0);
      let layers = new Decimal(0);
      if (roundedValue.gte(this.layer_maxnum)) {
        if (!this.layerMimics) {
          let valLayers = layerFunc(currentValue);
          layers = currentEngineeringValue(valLayers.sub(layerFunc(this.layer_maxnum)), this._layerEngineerings);
          currentValue = layerInverse(valLayers.sub(layers));
          roundedValue = round(currentValue, this.rounding);
          while (roundedValue.gte(this.layer_maxnum)) {
            layers = nextEngineeringValue(layers, this._layerEngineerings);
            currentValue = layerInverse(valLayers.sub(layers));
            roundedValue = round(currentValue, this.rounding);
          }
        }
        else {
          let valLayers = layerFunc(currentValue);
          iterations = currentEngineeringValue(valLayers.sub(layerFunc(this.layer_maxnum)), this._iterationEngineerings);
          currentValue = layerInverse(valLayers.sub(iterations));
          roundedValue = round(currentValue, this.rounding);
          while (roundedValue.gte(this.layer_maxnum)) {
            iterations = nextEngineeringValue(iterations, this._iterationEngineerings);
            currentValue = layerInverse(valLayers.sub(iterations));
            roundedValue = round(currentValue, this.rounding);
          }
        }
      }
      if (this._minIterations.lt(0)) {
        let inverseMinimum = func(this._rangeMinimum);
        let inverseMaximum = func(this._rangeMaximum);
        NegIterationLoop: while (iterations.gt(this._minIterations)) {
          let nextIterations = previousEngineeringValue(iterations, this._iterationEngineerings);
          let nextValue = new Decimal(currentValue);
          roundedValue = round(nextValue, this.rounding);
          for (let i = 0; i < nextIterations.sub(iterations).neg().toNumber(); i++) {
            if (nextValue.lt(inverseMinimum) || nextValue.gt(inverseMaximum)) break NegIterationLoop;
            nextValue = inverse(nextValue);
            roundedValue = round(nextValue, this.rounding);
            if (!nextValue.isFinite() || roundedValue.gte(maxnum)) break NegIterationLoop;
          }
          iterations = nextIterations;
          currentValue = nextValue;
        }
      }
      roundedValue = round(currentValue, this.rounding);
      IterationLoop: while (iterations.lt(this._minIterations) || roundedValue.gte(maxnum)) {
        let nextIterations = nextEngineeringValue(iterations, this._iterationEngineerings);
        let nextValue = new Decimal(currentValue);
        roundedValue = round(nextValue, this.rounding);
        for (let i = 0; i < nextIterations.sub(iterations).toNumber(); i++) {
          if (nextValue.lt(this._rangeMinimum) || nextValue.gt(this._rangeMaximum)) break IterationLoop;
          nextValue = func(nextValue);
          roundedValue = round(nextValue, this.rounding);
          if (!nextValue.isFinite()) break IterationLoop;
        }
        iterations = nextIterations;
        currentValue = nextValue;
      }
      roundedValue = round(currentValue, this.rounding);
      let result = this.innerNotation.format(roundedValue);
      let usedChars = (this.negIterationChars && iterations.lt(0)) ? this.negIterationChars : this.iterationChars;
      let usedSuperExpAfter = (this.negIterationChars && iterations.lt(0)) ? this.superexpAfter[1] : this.superexpAfter[0];
      if (this.negIterationChars && iterations.lt(0)) iterations = iterations.abs();
      if (iterations.gt(0) && iterations.lte(this.max_iterations_in_a_row) && iterations.mod(1).eq(0)) {
        result = usedChars[0][0] + result + usedChars[0][1];
        for (let i = 1; i < iterations.toNumber(); i++) result = usedChars[1][0] + result + usedChars[1][1];
      }
      else if (iterations.abs().gt(this.max_iterations_in_a_row)) {
        let eStr = (this.iterationInnerNotation === null ? this : this.iterationInnerNotation).format(iterations);
        eStr = usedChars[2][0] + eStr + usedChars[2][1];
        if (usedSuperExpAfter) result = result + eStr;
        else result = eStr + result;
      }
      if (layers.neq(0)) {
        if (layers.lte(this.max_layers_in_a_row) && layers.mod(1).eq(0)) {
          result = this.layerChars[0][0] + result + this.layerChars[0][1];
          for (let i = 1; i < layers.toNumber(); i++) result = this.layerChars[1][0] + result + this.layerChars[1][1];
        }
        else if (layers.abs().gt(this.max_layers_in_a_row)) {
          let eStr = (this.layerInnerNotation === null ? this : this.layerInnerNotation).format(layers);
          eStr = this.layerChars[2][0] + eStr + this.layerChars[2][1];
          if (this.superexpAfter[2]) result = result + eStr;
          else result = eStr + result;
        }
      }
      return result;
    }

    public get minIterations() {
      return this._minIterations;
    }

    public set minIterations(minIterations : DecimalSource) {
      minIterations = toDecimal(minIterations);
      if (minIterations.mod(1).neq(0)) throw new RangeError("Increasing Function does not support non-integer iterations");
      this._minIterations = minIterations;
    }

    private setRange(minimum : DecimalSource, maximum : DecimalSource) {
      let minimumD = toDecimal(minimum);
      let maximumD = toDecimal(maximum);
      if (this.maxnum && maximumD.lt(this.maxnum)) throw new RangeError("The range maximum in IncreasingFunction must be >= the maxnum");
      if (!this.maxnum && maximumD.lt(Infinity)) throw new RangeError("If maxnum is false, the range maximum in IncreasingFunction must be Infinity");
      if (maximumD.lte(minimumD)) throw new RangeError("In IncreasingFunction, maximumD must be greater than minimumD");
      this._rangeMinimum = minimumD;
      this._rangeMaximum = maximumD;
    }

    public get rangeMinimum() {
      return this._rangeMinimum;
    }

    public set rangeMinimum(minimum : DecimalSource) {
      this.setRange(minimum, this._rangeMaximum);
    }

    public get rangeMaximum() {
      return this._rangeMaximum;
    }

    public set rangeMaximum(maximum : DecimalSource) {
      this.setRange(this._rangeMinimum, maximum);
    }

    public get iterationEngineerings() {
      return this._iterationEngineerings;
    }
  
    public set iterationEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._iterationEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      for (let e = 0; e < engineeringsD.length; e++) {
        if (engineeringsD[e].mod(1).neq(0)) throw new RangeError("Increasing Function does not support non-integer iterations");
      }
      this._iterationEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get layerEngineerings() {
      return this._layerEngineerings;
    }
  
    public set layerEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._layerEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      this._layerEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }
  }

    /**
     * Takes an increasing function that takes multiple Decimals as input and returns a Decimal, and uses Decimal.increasingInverse to create a Scientific-style notation using it.
     * The last argument is considered the highest priority argument to increment, like how the exponent is higher-priority than the mantissa in regular scientific notation.
     * @param func ( (...values : Decimal[]) => Decimal ! ) The function that is being used. It can have any amount of Decimal arguments, but it must return a Decimal (and it must have a fixed amount of arguments - the arguments can't themselves be an array of Decimals)
     * 
     * NOTE: Due to how important this function is in determining the rest of the parameters, once an instance of IncreasingFunctionScientificNotation has been constructed,
     * you cannot change its func to a function with a different amount of arguments than the func it had before. Create a new IncreasingFunctionScientificNotation instance if you want to use a function with a different number of arguments.
     * 
     * @param limits ( Decimal[] ! ) limits[0] is the minimum value that the first argument is allowed to have; anything less, and the second argument is decreased to bring the first argument back over that limit. Likewise, limits[1] is the minimum for the second argument, limits[2] is the minimum for the third argument, and so on.
     * The last argument does not have a limit. If this array has less values than (amount of arguments - 1), then all unfilled values will be set equal to the last value that was given.
     * @param limitsAreMaximums ( boolean ) If this parameter is true, the limits are maximums instead of minimums. Default is false.
     * @param engineerings ( Decimal | Decimal[][] ) Either a DecimalSource or an array of arrays of DecimalSources; default is 1. This parameter controls the allowed values for each argument: for example, if engineerings[0] is [3], then the second argument will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings[1] is [5, 2], then the permitted values for the third argument are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * The first argument does not have an engineerings array. If engineerings is a single value, then every argument is given that single value as its engineerings entry. If engineerings is an array with less arguments than (amount of arguments - 1), then all unfilled entries will be set equal to the last entry that was given.
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The first argument is rounded to the nearest multiple of this value. If this parameter is a function, then the first argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * NOTE: Unlike the rounding parameter in other scientific notations functions, this one does not detect "overflow", so rounding may cause the first argument to go under or over its limit.
     * @param rangeLimits ( [Decimal, Decimal][] ) For the purposes of ensuring Decimal.increasingInverse functions properly, these parameters set limits on the domain of the function.
     * For each entry, rangeLimits[a][0] is the minimum for an argument, rangeLimits[a][1] is the maximum for an argument.
     * These parameters do nothing for the actual result, they only ensure valid behavior.
     * @param revertValues ( (Decimal | boolean)[] ) If an argument would end up with a non-finite value (such as if increasingInverse returned NaN), that argument's revertValue entry determines what it becomes instead.
     * If the revertValues entry is 'true', then that argument reverts to its limit. If the revertValues entry is a Decimal, then that argument becomes that value. If the revertValues entry is 'false', the non-finite value remains.
     * @param argumentOrder ( number[] ) This array should contain the numbers from 0 to (amount of arguments - 1), and it decides what order they're added to the notation's output:
     * for example, if argumentOrder is [0, 2, 1, 3], then the first argument is added first, then the third, then the second, and finally the fourth. This does not change their priority numerically, only their positions in the notation's output.
     * If the array given does not contain some arguments, those arguments are added at the end. Default is the empty array, which becomes the default of [0, 1, 2, 3, etc.].
     * @param argumentChars ( [string, string, string, string, string, string][] ) When one of the arguments is added to the notation's output, argumentChars[n][0] is placed before the entire expression thus far before the argument is added, argumentChars[n][1] is placed after the entire expression thus far before the argument is added,
     * argumentChars[n][2] is placed around the argument itself and [n][3] is placed after the argument itself, and [n][4] and [n][5] are placed before and after the entire expression after the argument is added.
     * If this parameter is given less entries than (amount of arguments), the remaining entries are filled in with [["", "", "", ", ", "", ""]], except for the entry corresponding to the argument that's last in argumentOrder, which gets [["", "", "", "", "", ""]].
     * @param argumentToLeft ( boolean[] ) If an argument's corresponding entry in this array is true, that argument is outputted to the left of the expression thus far instead of the right. Default is an array consisting entirely of false, and if this parameter is given less entries than (amount of arguments), the remaining ones default to false.
     * @param argumentShown ( (value : Decimal, index : number, allArguments : Decimal[]) => boolean ) If an argument's value would return false when run through this function (similar to Array.map()'s callback function, the second argument is the index of that parameter in the array of parameters, the third argument is the entire array of parameters), that argument is not shown in the notation's output. Default is (value) => true, meaning it does nothing by default.
     * @param innerNotations ( Notation | Notation[] ) Either a Notation or an array of Notations. If this is a single Notation, then every argument is itself written in that notation. If this is an array, then each argument is itself written in its corresponding innerNotations entry. If the array has less entries than (amount of arguments), the remaining entries are written in DefaultNotation.
     * @param iteration_maxnum ( Decimal ) If the value exceeds this number, then before running it through func, iterations of iterationFunc are applied to bring it back below this value. Default is (e^5)12.
     * @param iterationFunction ( (value : Decimal) => Decimal ) The function that's applied to numbers over iteration_maxnum to bring them back under iteration_maxnum. Default is value => Decimal.pow(10, value).
     * @param iterationInverseAlready ( boolean ) If this parameter is false, then "iterationFunction" is the function to take the inverse of. If this parameter is true, then "iterationFunction" is already the inverse function.
     * For example, if you want iterationFunction to be (v => Decimal.tetrate(2, v)), then if inverseAlready is true,
     * you'd enter (v => Decimal.slog(v, 2)) as iterationFunction instead. Decimal.increasingInverse can be slow, so doing this is mostly useful for speed purposes.
     * @param layer_maxnum ( Decimal ) Whenever the number, before applying any function iterations, is above this value, the amount of layers is increased to bring it back below this value. Default is (e^5)12.
     * @param layerFunction ( (value : Decimal) => Decimal ) For numbers too large to just repeatedly apply iterationFunction, layerFunction is used to determine how many extra "layers" to add on.
     * The default value of layerFunction is value => Decimal.tetrate(10, value.toNumber(), 1, true), i.e. each layer increases the tetra-exponent by 1, i.e. each layer is a power tower layer.
     * @param layerInverseAlready ( boolean ) Same as iterationInverseAlready, but for layerFunction instead.
     * @param layerMimics ( boolean ) If this parameter is false, then layers and iterations are treated as separate. If this parameter is true, then layers act as if they're additional iterations.
     * You should probably only make this parameter true if your layerFunction is approximating what repeatedly applying iterationFunction would do to large numbers.
     * @param iterationChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate iterations of iterationFunction. In each pair, the first entry goes before the number, the second entry goes after the number. iterationChars[0] takes the place of the f() in "f(25)", iterationChars[1] takes the place of the first f() in "f(f(654))" (iterationChars[0] is for the innermost iteration, iterationChars[1] is for the outer ones), and iterationChars[2] takes the place of the (f^) in (f^10)4. Default is [["f(", ")"], ["f(", ")"], ["(f^", ")"]].
     * @param layerChars ( [[string, string], [string, string], [string, string]] ) Same as iterationChars, but for layers instead of iterations. Since each layer is equivalent to an exponent level by default, the default is [["e", ""], ["e", ""], ["(e^", ")"]]. This parameter is unused if layerMimics is true.
     * @param max_iterations_in_a_row ( number ) If there are more iterations than this, the f()'s are made into an f^n expression. Default is 5.
     * @param max_layers_in_a_row ( number ) If there are more layers than this, the e's are made into an e^n expression. Default is 3. This parameter is unused if layerMimics is true.
     * @param superexpAfter ( [boolean, boolean] ) If superexpAfter[0] is true, the f^n expression from iterationChars comes after the number instead of before. superexpAfter[1] is for layerChars. Default is [false, false].
     * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted amounts of iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param layerEngineerings ( Decimal | Decimal[] ) Same as iterationEngineerings, but for layers instead of iterations. Default is 1.
     * @param iterationInnerNotation ( Notation ) The notation that the number in an (f^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. DefaultNotation is the default.
     * @param layerInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as iterationInnerNotation by default. This parameter is unused if layerMimics is true.
     * @param minValue ( Decimal ) The minimum value that is allowed to be run through func. Values below this are just written in innerNotations[0] directly, unless they are reciprocals of numbers that are not below minValue. Default is 0.
     * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal (which happens if it's below 1 and it's below minValue but its reciprocal is not), recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is ["1 / ", ""].
     */
  export class IncreasingFunctionScientificNotation extends Notation {
    private _func ! : (...values : Decimal[]) => Decimal;
    private _limits ! : Decimal[];
    public limitsAreMaximums : boolean = false;
    private _engineerings : Decimal[][] = [[Decimal.dOne]];
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _rangeLimits : [Decimal, Decimal][] = [[Decimal.dNegInf, Decimal.dInf]];
    private _revertValues : (Decimal | boolean)[] = [false];
    private _argumentOrder : number[] = [];
    private _argumentChars : [string, string, string, string, string, string][] = [];
    private _argumentToLeft : boolean[] = [false];
    public argumentShown : (value : Decimal, index : number, allArguments : Decimal[]) => boolean = (value => true);
    private _innerNotations : (Notation | null)[] = [new DefaultNotation()];
    private argamount : number;

    public iteration_maxnum : Decimal = new Decimal("(e^5)12");
    public iterationFunction : (value : Decimal) => Decimal = value => Decimal.pow(10, value);
    public iterationInverseAlready : boolean = false;
    public layer_maxnum : Decimal = new Decimal("(e^5)12");
    public layerFunction : (value : Decimal) => Decimal = value => Decimal.tetrate(10, value.toNumber(), 1, true);
    public layerInverseAlready : boolean = false;
    public layerMimics : boolean = false;
    public iterationChars : [[string, string], [string, string], [string, string]] = [["f(", ")"], ["f(", ")"], ["(f^", ")"]];
    public layerChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]];
    public max_iterations_in_a_row : number = 5;
    public max_layers_in_a_row : number = 3;
    public superexpAfter : [boolean, boolean] = [false, false];
    private _iterationEngineerings : Decimal[] = [Decimal.dOne];
    private _layerEngineerings : Decimal[] = [Decimal.dOne];
    public iterationInnerNotation : Notation | null = new DefaultNotation();
    public layerInnerNotation : Notation | null = this.iterationInnerNotation;
    public minValue : Decimal = Decimal.dZero;
    public recipString : [string, string] = ["1 / ", ""];
  
    constructor(
      func : (...values : Decimal[]) => Decimal,
      limits : DecimalSource[],
      limitsAreMaximums : boolean = false,
      engineerings : DecimalSource | DecimalSource[][] = 1,
      rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero,
      rangeLimits : [DecimalSource, DecimalSource][] = [[-Infinity, Infinity]],
      revertValues : (DecimalSource | boolean)[] = [false],
      argumentOrder : number[] = [],
      argumentChars : [string, string, string, string, string, string][] = [],
      argumentToLeft : boolean[] = [false],
      argumentShown : (value : Decimal, index : number, allArguments : Decimal[]) => boolean = (value => true),
      innerNotations : (Notation | null) | (Notation | null)[] = new DefaultNotation(),

      iteration_maxnum : DecimalSource = new Decimal("(e^5)12"),
      iterationFunction : (value : Decimal) => Decimal = value => Decimal.pow(10, value),
      iterationInverseAlready : boolean = false,
      layer_maxnum : DecimalSource = new Decimal("(e^5)12"),
      layerFunction : (value : Decimal) => Decimal = value => Decimal.tetrate(10, value.toNumber(), 1, true),
      layerInverseAlready : boolean = false,
      layerMimics : boolean = false,
      iterationChars : [[string, string], [string, string], [string, string]] = [["f(", ")"], ["f(", ")"], ["(f^", ")"]],
      layerChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]],
      max_iterations_in_a_row : number = 5,
      max_layers_in_a_row : number = 3,
      superexpAfter : [boolean, boolean] = [false, false],
      iterationEngineerings : DecimalSource | DecimalSource[] = 1, 
      layerEngineerings : DecimalSource | DecimalSource[] = 1, 
      iterationInnerNotation : Notation | null = new DefaultNotation(),
      layerInnerNotation : Notation | null = iterationInnerNotation,
      minValue : DecimalSource = 0,
      recipString : [string, string] = ["1 / ", ""],
      ) {
      super();
      this._func = func;
      this.argamount = func.length;
      this.limitsAreMaximums = limitsAreMaximums;
      this.limits = limits;
      this.engineerings = engineerings;
      this.rounding = rounding;
      this.rangeLimits = rangeLimits;
      this.revertValues = revertValues;
      this.argumentOrder = argumentOrder;
      this.argumentChars = argumentChars;
      this.argumentToLeft = argumentToLeft;
      this.argumentShown = argumentShown;
      this.innerNotations = innerNotations;

      this.iteration_maxnum = toDecimal(iteration_maxnum);
      this.iterationFunction = iterationFunction;
      this.iterationInverseAlready = iterationInverseAlready;
      this.layer_maxnum = toDecimal(layer_maxnum);
      this.layerFunction = layerFunction;
      this.layerInverseAlready = layerInverseAlready;
      this.layerMimics = layerMimics;
      this.iterationChars = iterationChars;
      this.layerChars = layerChars;
      this.max_iterations_in_a_row = max_iterations_in_a_row;
      this.max_layers_in_a_row = max_layers_in_a_row;
      this.superexpAfter = superexpAfter;
      this.rounding = rounding;
      this.iterationEngineerings = iterationEngineerings;
      this.layerEngineerings = layerEngineerings;
      this.iterationInnerNotation = iterationInnerNotation;
      this.layerInnerNotation = layerInnerNotation;
      this.minValue = toDecimal(minValue);
      this.recipString = recipString;
    }

    public name = "Increasing Function Scientific Notation";

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
  
      return (decimal.sgn() < 0 && (decimal.lt(this.minValue)))
        ? this.formatNegativeDecimal(decimal.abs())
        : this.formatDecimal(decimal);
    }
  
    public formatDecimal(value: Decimal): string {
      let iterationFunc : (value : Decimal) => Decimal, iterationInverse : (value : Decimal) => Decimal;
      let maxnum = (this.iteration_maxnum !== null) ? this.iteration_maxnum : Decimal.dInf;
      if (this.iterationInverseAlready) {
        iterationFunc = this.iterationFunction;
        iterationInverse = Decimal.increasingInverse(this.iterationFunction);
      }
      else {
        iterationFunc = Decimal.increasingInverse(this.iterationFunction);
        iterationInverse = this.iterationFunction;
      }
      let layerFunc : (value : Decimal) => Decimal, layerInverse : (value : Decimal) => Decimal;
      if (this.layerInverseAlready) {
        layerFunc = this.layerFunction;
        layerInverse = Decimal.increasingInverse(this.layerFunction);
      }
      else {
        layerFunc = Decimal.increasingInverse(this.layerFunction);
        layerInverse = this.layerFunction;
      }
      if (value.lt(1) && value.neq(0) && value.lt(this.minValue) && value.recip().gte(this.minValue)) return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
      let currentValue = new Decimal(value);
      let iterations = new Decimal(0);
      let layers = new Decimal(0);
      if (currentValue.gte(this.layer_maxnum)) {
        if (!this.layerMimics) {
          let valLayers = layerFunc(currentValue);
          layers = currentEngineeringValue(valLayers.sub(layerFunc(this.layer_maxnum)), this._layerEngineerings);
          currentValue = layerInverse(valLayers.sub(layers));
          while (currentValue.gte(this.layer_maxnum)) {
            layers = nextEngineeringValue(layers, this._layerEngineerings);
            currentValue = layerInverse(valLayers.sub(layers));
          }
        }
        else {
          let valLayers = layerFunc(currentValue);
          iterations = currentEngineeringValue(valLayers.sub(layerFunc(this.layer_maxnum)), this._iterationEngineerings);
          currentValue = layerInverse(valLayers.sub(iterations));
          while (currentValue.gte(this.layer_maxnum)) {
            iterations = nextEngineeringValue(iterations, this._iterationEngineerings);
            currentValue = layerInverse(valLayers.sub(iterations));
          }
        }
      }
      IterationLoop: while (currentValue.gte(maxnum)) {
        let nextIterations = nextEngineeringValue(iterations, this._iterationEngineerings);
        let nextValue = new Decimal(currentValue);
        for (let i = 0; i < nextIterations.sub(iterations).toNumber(); i++) {
          nextValue = iterationFunc(nextValue);
          if (!nextValue.isFinite()) break IterationLoop;
        }
        iterations = nextIterations;
        currentValue = nextValue;
      }
      let result = "";
      if (currentValue.lt(this.minValue)) result = (this._innerNotations[0] === null ? this : this._innerNotations[0]).format(currentValue);
      else {
        let sciArray = increasingFunctionScientifify(currentValue, this._func, this._limits, this.limitsAreMaximums, this._engineerings, this.rounding, this._rangeLimits, this._revertValues);
        for (let o = 0; o < this._argumentOrder.length; o++) {
          let arg = this._argumentOrder[o];
          if (!this.argumentShown(sciArray[arg], arg, sciArray)) continue;
          result = this._argumentChars[arg][0] + result + this._argumentChars[arg][1]
          let str = (this._innerNotations[arg] === null ? this : this._innerNotations[arg]).format(sciArray[arg]);
          str = this._argumentChars[arg][2] + str + this._argumentChars[arg][3];
          if (this._argumentToLeft[arg]) result = str + result;
          else result = result + str;
          result = this._argumentChars[arg][4] + result + this._argumentChars[arg][5];
        }
      }
      if (iterations.gt(0) && iterations.lte(this.max_iterations_in_a_row) && iterations.mod(1).eq(0)) {
        result = this.iterationChars[0][0] + result + this.iterationChars[0][1];
        for (let i = 1; i < iterations.toNumber(); i++) result = this.iterationChars[1][0] + result + this.iterationChars[1][1];
      }
      else if (iterations.abs().gt(this.max_iterations_in_a_row)) {
        let eStr = (this.iterationInnerNotation === null ? this : this.iterationInnerNotation).format(iterations);
        eStr = this.iterationChars[2][0] + eStr + this.iterationChars[2][1];
        if (this.superexpAfter[0]) result = result + eStr;
        else result = eStr + result;
      }
      if (layers.neq(0)) {
        if (layers.lte(this.max_layers_in_a_row) && layers.mod(1).eq(0)) {
          result = this.layerChars[0][0] + result + this.layerChars[0][1];
          for (let i = 1; i < layers.toNumber(); i++) result = this.layerChars[1][0] + result + this.layerChars[1][1];
        }
        else if (layers.abs().gt(this.max_layers_in_a_row)) {
          let eStr = (this.layerInnerNotation === null ? this : this.layerInnerNotation).format(layers);
          eStr = this.layerChars[2][0] + eStr + this.layerChars[2][1];
          if (this.superexpAfter[1]) result = result + eStr;
          else result = eStr + result;
        }
      }
      return result;
    }

    public get func() {
      return this._func;
    }

    public set func(func : (...values : Decimal[]) => Decimal) {
      if (func.length != this.argamount) throw new Error("The amount of arguments in Increasing Function Scientific cannot be changed once the notation has been constructed");
      this._func = func;
    }

    public get limits() {
      return this._limits;
    }

    public set limits(limits : DecimalSource[]) {
      let limitsD = limits.map(toDecimal);
      if (limitsD.length == 0) throw new Error("Increasing Function Scientific does not work with an empty limits array");
      while (limitsD.length < this.argamount - 1) limitsD.push(limitsD[limitsD.length - 1]);
      limitsD[this.argamount - 1] = (this.limitsAreMaximums) ? Decimal.dInf : Decimal.dNegInf;
      this._limits = limitsD;
    }

    public get engineerings() {
      return this._engineerings;
    }

    public set engineerings(input : DecimalSource | DecimalSource[][]) {
      if (!(Array.isArray(input))) input = [[input]];
      let result : Decimal[][] = [[Decimal.dOne]];
      for (let i = 0; i < input.length; i++) {
          let entry = input[i];
          if (entry.length == 0) result[i] = [Decimal.dOne];
          else result[i] = entry.map(toDecimal);
      }
      while (result.length < this.argamount - 1) result.push(result[result.length - 1]);
      this._engineerings = result;
    }

    public get rangeLimits() {
      return this._rangeLimits;
    }

    public set rangeLimits(rangeLimits : [DecimalSource, DecimalSource][]) {
      let limitsD : [Decimal, Decimal][] = rangeLimits.map(value => [toDecimal(value[0]), toDecimal(value[1])]);
      if (limitsD.length == 0) limitsD.push([Decimal.dNegInf, Decimal.dInf]);
      while (limitsD.length < this.argamount) limitsD.push(limitsD[limitsD.length - 1]);
      for (let l = 0; l < limitsD.length; l++) if (limitsD[l][0].gte(limitsD[l][1])) throw new Error("Range minimum >= range maximum in Increasing Function Scientifify");
      this._rangeLimits = limitsD;
    }

    public get revertValues() {
      return this._revertValues;
    }

    public set revertValues(revertValues : (DecimalSource | boolean)[]) {
      let revertValuesD = revertValues.map(value => (typeof value == "boolean" ? value : toDecimal(value)));
      if (revertValuesD.length == 0) revertValuesD.push(false);
      while (revertValuesD.length < this.argamount) revertValuesD.push(revertValuesD[revertValuesD.length - 1]);
      this._revertValues = revertValuesD;
    }

    public get argumentChars() {
      return this._argumentChars;
    }

    public set argumentChars(argumentChars : [string, string, string, string, string, string][]) {
      let lastArgument = this._argumentOrder[this._argumentOrder.length - 1];
      while (argumentChars.length < this.argamount) {
        if (argumentChars.length == lastArgument) argumentChars.push(["", "", "", "", "", ""]);
        else argumentChars.push(["", "", "", ", ", "", ""]);
      }
      this._argumentChars = argumentChars;
    }

    public get argumentOrder() {
      return this._argumentOrder;
    }

    public set argumentOrder(argumentOrder : number[]) {
      let filledIn : boolean[] = [];
      let result : number[] = [];
      while (filledIn.length < this.argamount) filledIn.push(false);
      for (let a = 0; a < argumentOrder.length; a++) {
        let arg = argumentOrder[a];
        if (arg >= 0 && arg < this.argamount && arg % 1 == 0) {
          filledIn[arg] = true;
          result.push(arg);
        }
      }
      for (let f = 0; f < filledIn.length; f++) {
        if (filledIn[f] == false) result.push(f);
      }
      this._argumentOrder = result;
    }

    public get argumentToLeft() {
      return this._argumentToLeft;
    }

    public set argumentToLeft(argumentToLeft : boolean[]) {
      while (argumentToLeft.length < this.argamount) {
        argumentToLeft.push(false);
      }
      this._argumentToLeft = argumentToLeft;
    }

    public get iterationEngineerings() {
      return this._iterationEngineerings;
    }
  
    public set iterationEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._iterationEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      for (let e = 0; e < engineeringsD.length; e++) {
        if (engineeringsD[e].mod(1).neq(0)) throw new RangeError("Increasing Function does not support non-integer iterations");
      }
      this._iterationEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get layerEngineerings() {
      return this._layerEngineerings;
    }
  
    public set layerEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._layerEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      this._layerEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get innerNotations() {
      return this._innerNotations;
    }

    public set innerNotations(innerNotations : (Notation | null) | (Notation | null)[]) {
      if (!Array.isArray(innerNotations)) innerNotations = [innerNotations];
      while (innerNotations.length < this.argamount) {
        innerNotations.push(new DefaultNotation());
      }
      this._innerNotations = innerNotations;
    }
  }

    /**
     * Uses three increasing functions to create a Double Factorials-style notation: numbers are expressed as a series of terms, where each term is a whole number run through the first function, then
     * raised to some power (or whatever the second function does), and the terms are multiplied together (or whatever the third function does).
     * @param termFunc ( (value : Decimal) => Decimal ! ) The function applied to integers to generate the terms.
     * @param powerFunc ( (term : Decimal, power : Decimal) => Decimal ) The function used in place of raising a term to a power. Default is (term, power) => Decimal.pow(term, power).
     * @param betweenFunc ( (leftover : Decimal, term : Decimal) => Decimal ) The function that combines each term. "leftover" is value from the rest of the terms thus far. Default is (leftover, term) => Decimal.mul(leftover, term).
     * @param termInverseAlready ( boolean ) If this parameter is false, termFunc is the increasing function, so Decimal.increasingInverse is used to figure out what the terms are based on the value given.
     * If this parameter is true, then termFunc is already the inverse function. Default is false.
     * @param powerInverseAlready ( boolean ) If this parameter is false, then powerFunc takes the current term and the power and returns their combination's value. If this parameter is true, then
     * powerFunc is the inverse function: it takes a value and the current term and finds the power that that term would need to be combined with to make that value. Default is false.
     * @param betweenInverseAlready ( boolean ) If this parameter is false, then betweenFunc takes the remaining number and the current term and returns the total value. If this parameter is true, then
     * betweenFunc is the inverse function: it takes the total value and the current term and finds the leftover value that that term would need to be combined with to make that value. Default is false.
     * @param maxTerms ( number ) If there would be too many terms, only the largest few are shown. This parameter controls the maximum amount of terms shown. Default is 8.
     * @param termChars ( [string, string] ) These two strings are placed around each term's number: termChars[0] goes before the term number, termChars[1] goes after. Default is ["f(", ")"].
     * @param powerChars ( [string, string, string] ) When the power is large enough to be shown (which, by default, is when it's above 1), powerChars[0] is placed before the power number, powerChars[1] is placed after, and powerChars[2] is placed on the opposite side of the term from the other two. Default is ["^", "", ""].
     * @param betweenChar ( string ) This string is placed between each term. Default is " * ".
     * @param powerBefore ( boolean ) If this parameter is false, a term's power is written after the term itself. If this parameter is true, the power is written before the term. Default is false.
     * @param reverseTerms ( boolean ) If this parameter is false, terms are written largest to smallest. If this parameter is true, terms are written smallest to largest. Default is false.
     * @param minTerm ( Decimal ) The smallest allowed term number. If the term number would go below this, a constant term (i.e. a term that's just a plain value without using termFunc or powerFunc) is added and the terms stop after that. Default is 1.
     * @param constantTermChars ( [string, string] ) Same as termChars, but for the constant term instead. Default is ["", ""].
     * @param edgeChars ( [string, string] ) edgeChars[0] is placed before the whole string of terms, edgeChars[1] is placed after. Default is ["", ""].
     * @param rangeLimits ( [[Decimal, Decimal], [Decimal, Decimal], [Decimal, Decimal]] ) For the purposes of ensuring Decimal.increasingInverse functions properly, these parameters set limits on the domain of the function.
     * For each entry, rangeLimits[a][0] is the minimum for an argument, rangeLimits[a][1] is the maximum for an argument. rangeLimits[0] is for termFunc, rangeLimits[1] is for powerFunc, rangeLimits[2] is for betweenFunc.
     * These parameters do nothing for the actual result, they only ensure valid behavior.
     * @param termEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed term numbers: if it's three then the term number will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted term numbers are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param powerEngineerings ( Decimal | Decimal[] ) Same as termEngineerings, but for the power numbers instead of the term numbers. Default is 1.
     * @param constantInnerNotation ( Notation ) The notation that the constant term is written in. DefaultNotation is the default.
     * @param termInnerNotation ( Notation | null ) The notation that the term numbers are written in. If this parameter is null, the term numbers are written in this notation yourself (if you're using this option, make sure small numbers reduce back to the constant term!). Is the same as constantInnerNotation by default.
     * @param powerInnerNotation ( Notation | null ) The notation that the power numbers are written in. If this parameter is null, the power numbers are written in this notation yourself (if you're using this option, make sure small numbers reduce back to the constant term!). Is the same as constantInnerNotation by default.
     * @param maxChars ( number ) If the result has reached this many characters after a term has been added, it stops there even if the amount of terms hasn't reached maxTerms yet. Default is Infinity, meaning maxChars doesn't apply by default.
     * @param showConstantTerm ( (value : Decimal) => boolean ) Even if the constant term is reached, it's only actually shown if plugging it into this function would return true. Default is value => true.
     * @param showTerms ( (term : Decimal, power : Decimal) => boolean ) A term is only shown if plugging the term and power into this function would return true. The term is still evaluated even if this function would return false, it's just not shown in the result. Default is (term, power) => true.
     * @param irrelevancyFunc ( (currentValue : Decimal, originalValue : Decimal) => boolean ) If, after a term is added to the result, calling this function (with the current remaining value as its first parameter, the original value before any terms were added (but after the iteration and layer functions are applied, if applicable) as its second) returns true, no more terms are added afterwards. Default is a function that always returns false.
     * @param maxPowersInARow ( number ) If a term's power is equal to or less than this parameter, then that term's power is not written out. Instead, that term is written multiple times in a row, with that amount of times being equal to its power. Default is 1.
     * @param betweenPowersChar ( string ) When multiple of the same term are written in a row, this string is placed between copies of the same term instead of betweenChar. Default is "".
     * @param termWrapperChars ( [string, string] ) When some amount of copies of the same term (that amount of copies may be 1) are written out instead of writing the power as a number, termWrapperChars[0] goes before the whole set of copies, termWrapperChars[1] goes after. Default is ["", ""].
     * @param iteration_maxnum ( Decimal ) If the value exceeds this number, then before running it through func, iterations of iterationFunc are applied to bring it back below this value. Default is (e^5)12.
     * @param iterationFunction ( (value : Decimal) => Decimal ! ) The function that's applied to numbers over iteration_maxnum to bring them back under iteration_maxnum. Default is value => Decimal.pow(10, value).
     * @param iterationInverseAlready ( boolean ) If this parameter is false, then "iterationFunction" is the function to take the inverse of. If this parameter is true, then "iterationFunction" is already the inverse function.
     * For example, if you want iterationFunction to be (v => Decimal.tetrate(2, v)), then if inverseAlready is true,
     * you'd enter (v => Decimal.slog(v, 2)) as iterationFunction instead. Decimal.increasingInverse can be slow, so doing this is mostly useful for speed purposes.
     * @param layer_maxnum ( Decimal ) Whenever the number, before applying any function iterations, is above this value, the amount of layers is increased to bring it back below this value. Default is (e^5)12.
     * @param layerFunction ( (value : Decimal) => Decimal ) For numbers too large to just repeatedly apply iterationFunction, layerFunction is used to determine how many extra "layers" to add on.
     * The default value of layerFunction is value => Decimal.tetrate(10, value.toNumber(), 1, true), i.e. each layer increases the tetra-exponent by 1, i.e. each layer is a power tower layer.
     * @param layerInverseAlready ( boolean ) Same as iterationInverseAlready, but for layerFunction instead.
     * @param layerMimics ( boolean ) If this parameter is false, then layers and iterations are treated as separate. If this parameter is true, then layers act as if they're additional iterations.
     * You should probably only make this parameter true if your layerFunction is approximating what repeatedly applying iterationFunction would do to large numbers.
     * @param iterationChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate iterations of iterationFunction. In each pair, the first entry goes before the number, the second entry goes after the number. iterationChars[0] takes the place of the f() in "f(25)", iterationChars[1] takes the place of the first f() in "f(f(654))" (iterationChars[0] is for the innermost iteration, iterationChars[1] is for the outer ones), and iterationChars[2] takes the place of the (f^) in (f^10)4. Default is [["f(", ")"], ["f(", ")"], ["(f^", ")"]].
     * @param layerChars ( [[string, string], [string, string], [string, string]] ) Same as iterationChars, but for layers instead of iterations. Since each layer is equivalent to an exponent level by default, the default is [["e", ""], ["e", ""], ["(e^", ")"]]. This parameter is unused if layerMimics is true.
     * @param max_iterations_in_a_row ( number ) If there are more iterations than this, the f()'s are made into an f^n expression. Default is 5.
     * @param max_layers_in_a_row ( number ) If there are more layers than this, the e's are made into an e^n expression. Default is 3. This parameter is unused if layerMimics is true.
     * @param superexpAfter ( [boolean, boolean] ) If superexpAfter[0] is true, the f^n expression from iterationChars comes after the number instead of before. superexpAfter[1] is for layerChars. Default is [false, false].
     * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted amounts of iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * @param layerEngineerings ( Decimal | Decimal[] ) Same as iterationEngineerings, but for layers instead of iterations. Default is 1.
     * @param iterationInnerNotation ( Notation | null ) The notation that the number in an (f^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. DefaultNotation is the default.
     * @param layerInnerNotation ( Notation | null ) The notation that the number in an (e^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as iterationInnerNotation by default. This parameter is unused if layerMimics is true.
     * @param minValue ( Decimal ) The minimum value that is allowed to be run through func. Values below this are just written in innerNotations[0] directly, unless they are reciprocals of numbers that are not below minValue. Default is 0.
     * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal (which happens if it's below 1 and it's below minValue but its reciprocal is not), recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is ["1 / ", ""].
     */
  export class IncreasingFunctionProductNotation extends Notation {
    public termFunc ! : (value : Decimal) => Decimal;
    public powerFunc : (term : Decimal, power : Decimal) => Decimal = (term, power) => Decimal.pow(term, power);
    public betweenFunc : (leftover : Decimal, term : Decimal) => Decimal = (leftover, term) => Decimal.mul(leftover, term);
    public termInverseAlready : boolean = false;
    public powerInverseAlready : boolean = false;
    public betweenInverseAlready : boolean = false;
    private _maxTerms : number = 8;
    public termChars : [string, string] = ["f(", ")"];
    public powerChars : [string, string, string] = ["^", "", ""];
    public betweenChar : string = " * ";
    public powerBefore : boolean = false;
    public reverseTerms : boolean = false;
    public minTerm : Decimal = Decimal.dOne;
    public constantTermChars : [string, string] = ["", ""];
    public edgeChars : [string, string] = ["", ""];
    public rangeLimits : [[Decimal, Decimal], [Decimal, Decimal], [Decimal, Decimal]] = [[Decimal.dNegInf, Decimal.dInf], [Decimal.dNegInf, Decimal.dInf], [Decimal.dNegInf, Decimal.dInf]]
    private _termEngineerings : Decimal[] = [Decimal.dOne];
    private _powerEngineerings : Decimal[] = [Decimal.dOne];
    public constantInnerNotation : Notation = new DefaultNotation();
    public termInnerNotation : Notation | null = this.constantInnerNotation;
    public powerInnerNotation : Notation | null = this.constantInnerNotation;
    public maxChars : number = Infinity;
    public showConstantTerm : (value : Decimal) => boolean = (value => true);
    public showTerms : (term : Decimal, power : Decimal) => boolean = ((term, power) => true)
    public irrelevancyFunc : (currentValue : Decimal, originalValue : Decimal) => boolean = (currentValue) => false;
    public maxPowersInARow : number = 1;
    public betweenPowersChar : string = "";
    public termWrapperChars : [string, string] = ["", ""];

    public iteration_maxnum : Decimal = new Decimal("(e^5)12");
    public iterationFunction : (value : Decimal) => Decimal = value => Decimal.pow(10, value);
    public iterationInverseAlready : boolean = false;
    public layer_maxnum : Decimal = new Decimal("(e^5)12");
    public layerFunction : (value : Decimal) => Decimal = value => Decimal.tetrate(10, value.toNumber(), 1, true);
    public layerInverseAlready : boolean = false;
    public layerMimics : boolean = false;
    public iterationChars : [[string, string], [string, string], [string, string]] = [["f(", ")"], ["f(", ")"], ["(f^", ")"]];
    public layerChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]];
    public max_iterations_in_a_row : number = 5;
    public max_layers_in_a_row : number = 3;
    public superexpAfter : [boolean, boolean] = [false, false];
    private _iterationEngineerings : Decimal[] = [Decimal.dOne];
    private _layerEngineerings : Decimal[] = [Decimal.dOne];
    public iterationInnerNotation : Notation | null = new DefaultNotation();
    public layerInnerNotation : Notation | null = this.iterationInnerNotation;
    public minValue : Decimal = Decimal.dZero;
    public recipString : [string, string] = ["1 / ", ""];

    constructor(
      termFunc : (value : Decimal) => Decimal,
      powerFunc : (term : Decimal, power : Decimal) => Decimal = (term, power) => Decimal.pow(term, power),
      betweenFunc : (leftover : Decimal, term : Decimal) => Decimal = (leftover, term) => Decimal.mul(leftover, term),
      termInverseAlready : boolean = false,
      powerInverseAlready : boolean = false,
      betweenInverseAlready : boolean = false,
      maxTerms : number = 8,
      termChars : [string, string] = ["f(", ")"],
      powerChars : [string, string, string] = ["^", "", ""],
      betweenChar : string = " * ",
      powerBefore : boolean = false,
      reverseTerms : boolean = false,
      minTerm : DecimalSource = 1,
      constantTermChars : [string, string] = ["", ""],
      edgeChars : [string, string] = ["", ""],
      rangeLimits : [[DecimalSource, DecimalSource], [DecimalSource, DecimalSource], [DecimalSource, DecimalSource]] = [[Decimal.dNegInf, Decimal.dInf], [Decimal.dNegInf, Decimal.dInf], [Decimal.dNegInf, Decimal.dInf]],
      termEngineerings : DecimalSource | DecimalSource[] = 1,
      powerEngineerings : DecimalSource | DecimalSource[] = 1,
      constantInnerNotation : Notation = new DefaultNotation(),
      termInnerNotation : Notation = constantInnerNotation,
      powerInnerNotation : Notation = constantInnerNotation,
      maxChars : number = Infinity,
      showConstantTerm : (value : Decimal) => boolean = (value => true),
      showTerms : (term : Decimal, power : Decimal) => boolean = ((term, power) => true),
      irrelevancyFunc : (currentValue : Decimal, originalValue : Decimal) => boolean = (currentValue) => false,
      maxPowersInARow : number = 1,
      betweenPowersChar : string = "",
      termWrapperChars : [string, string] = ["", ""],

      iteration_maxnum : DecimalSource = new Decimal("(e^5)12"),
      iterationFunction : (value : Decimal) => Decimal = value => Decimal.pow(10, value),
      iterationInverseAlready : boolean = false,
      layer_maxnum : DecimalSource = new Decimal("(e^5)12"),
      layerFunction : (value : Decimal) => Decimal = value => Decimal.tetrate(10, value.toNumber(), 1, true),
      layerInverseAlready : boolean = false,
      layerMimics : boolean = false,
      iterationChars : [[string, string], [string, string], [string, string]] = [["f(", ")"], ["f(", ")"], ["(f^", ")"]],
      layerChars : [[string, string], [string, string], [string, string]] = [["e", ""], ["e", ""], ["(e^", ")"]],
      max_iterations_in_a_row : number = 5,
      max_layers_in_a_row : number = 3,
      superexpAfter : [boolean, boolean] = [false, false],
      iterationEngineerings : DecimalSource | DecimalSource[] = 1, 
      layerEngineerings : DecimalSource | DecimalSource[] = 1, 
      iterationInnerNotation : Notation | null = new DefaultNotation(),
      layerInnerNotation : Notation | null = iterationInnerNotation,
      minValue : DecimalSource = 0,
      recipString : [string, string] = ["1 / ", ""],
      ) {
      super();
      this.termFunc = termFunc;
      this.powerFunc = powerFunc;
      this.betweenFunc = betweenFunc;
      this.termInverseAlready = termInverseAlready;
      this.powerInverseAlready = powerInverseAlready;
      this.betweenInverseAlready = betweenInverseAlready;
      this.maxTerms = maxTerms;
      this.termChars = termChars;
      this.powerChars = powerChars;
      this.betweenChar = betweenChar;
      this.powerBefore = powerBefore;
      this.reverseTerms = reverseTerms;
      this.minTerm = toDecimal(minTerm);
      this.constantTermChars = constantTermChars;
      this.edgeChars = edgeChars;
      this.rangeLimits = [[toDecimal(rangeLimits[0][0]), toDecimal(rangeLimits[0][1])], [toDecimal(rangeLimits[1][0]), toDecimal(rangeLimits[1][1])], [toDecimal(rangeLimits[2][0]), toDecimal(rangeLimits[2][1])]];
      this.termEngineerings = termEngineerings;
      this.powerEngineerings = powerEngineerings;
      this.constantInnerNotation = constantInnerNotation;
      this.termInnerNotation = termInnerNotation;
      this.powerInnerNotation = powerInnerNotation;
      this.showConstantTerm = showConstantTerm;
      this.showTerms = showTerms;
      this.irrelevancyFunc = irrelevancyFunc;
      this.maxPowersInARow = maxPowersInARow;
      this.betweenPowersChar = betweenPowersChar;
      this.termWrapperChars = termWrapperChars;
      this.maxChars = maxChars;

      this.iteration_maxnum = toDecimal(iteration_maxnum);
      this.iterationFunction = iterationFunction;
      this.iterationInverseAlready = iterationInverseAlready;
      this.layer_maxnum = toDecimal(layer_maxnum);
      this.layerFunction = layerFunction;
      this.layerInverseAlready = layerInverseAlready;
      this.layerMimics = layerMimics;
      this.iterationChars = iterationChars;
      this.layerChars = layerChars;
      this.max_iterations_in_a_row = max_iterations_in_a_row;
      this.max_layers_in_a_row = max_layers_in_a_row;
      this.superexpAfter = superexpAfter;
      this.iterationEngineerings = iterationEngineerings;
      this.layerEngineerings = layerEngineerings;
      this.iterationInnerNotation = iterationInnerNotation;
      this.layerInnerNotation = layerInnerNotation;
      this.minValue = toDecimal(minValue);
      this.recipString = recipString;
    }

    public name = "Increasing Function Product Notation";

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
  
      return (decimal.sgn() < 0 && (decimal.lt(this.minValue)))
        ? this.formatNegativeDecimal(decimal.abs())
        : this.formatDecimal(decimal);
    }
  
    public formatDecimal(value: Decimal): string {
      let iterationFunc : (value : Decimal) => Decimal, iterationInverse : (value : Decimal) => Decimal;
      let maxnum = (this.iteration_maxnum !== null) ? this.iteration_maxnum : Decimal.dInf;
      if (this.iterationInverseAlready) {
        iterationFunc = this.iterationFunction;
        iterationInverse = Decimal.increasingInverse(this.iterationFunction);
      }
      else {
        iterationFunc = Decimal.increasingInverse(this.iterationFunction);
        iterationInverse = this.iterationFunction;
      }
      let layerFunc : (value : Decimal) => Decimal, layerInverse : (value : Decimal) => Decimal;
      if (this.layerInverseAlready) {
        layerFunc = this.layerFunction;
        layerInverse = Decimal.increasingInverse(this.layerFunction);
      }
      else {
        layerFunc = Decimal.increasingInverse(this.layerFunction);
        layerInverse = this.layerFunction;
      }
      if (value.lt(1) && value.neq(0) && value.lt(this.minValue) && value.recip().gte(this.minValue)) return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
      let currentValue = new Decimal(value);
      let iterations = new Decimal(0);
      let layers = new Decimal(0);
      if (currentValue.gte(this.layer_maxnum)) {
        if (!this.layerMimics) {
          let valLayers = layerFunc(currentValue);
          layers = currentEngineeringValue(valLayers.sub(layerFunc(this.layer_maxnum)), this._layerEngineerings);
          currentValue = layerInverse(valLayers.sub(layers));
          while (currentValue.gte(this.layer_maxnum)) {
            layers = nextEngineeringValue(layers, this._layerEngineerings);
            currentValue = layerInverse(valLayers.sub(layers));
          }
        }
        else {
          let valLayers = layerFunc(currentValue);
          iterations = currentEngineeringValue(valLayers.sub(layerFunc(this.layer_maxnum)), this._iterationEngineerings);
          currentValue = layerInverse(valLayers.sub(iterations));
          while (currentValue.gte(this.layer_maxnum)) {
            iterations = nextEngineeringValue(iterations, this._iterationEngineerings);
            currentValue = layerInverse(valLayers.sub(iterations));
          }
        }
      }
      IterationLoop: while (currentValue.gte(maxnum)) {
        let nextIterations = nextEngineeringValue(iterations, this._iterationEngineerings);
        let nextValue = new Decimal(currentValue);
        for (let i = 0; i < nextIterations.sub(iterations).toNumber(); i++) {
          nextValue = iterationFunc(nextValue);
          if (!nextValue.isFinite()) break IterationLoop;
        }
        iterations = nextIterations;
        currentValue = nextValue;
      }

      let termFunc : (value : Decimal) => Decimal; let termInverse : (term : Decimal) => Decimal;
      let powerFunc : (value: Decimal, term : Decimal) => Decimal; let powerInverse : (term : Decimal, power : Decimal) => Decimal;
      let betweenFunc : (value: Decimal, term : Decimal) => Decimal; let betweenInverse : (leftover: Decimal, term : Decimal) => Decimal;
      if (this.termInverseAlready) {
        termFunc = this.termFunc;
        termInverse = Decimal.increasingInverse(this.termFunc, false, undefined, this.rangeLimits[0][0], this.rangeLimits[0][1]);
      }
      else {
        termFunc = Decimal.increasingInverse(this.termFunc, false, undefined, this.rangeLimits[0][0], this.rangeLimits[0][1]);
        termInverse = this.termFunc;
      }
      if (this.powerInverseAlready) {
        powerFunc = this.powerFunc;
        powerInverse = (term, power) => (Decimal.increasingInverse((val : Decimal) => this.powerFunc(val, term), false, undefined, this.rangeLimits[1][0], this.rangeLimits[1][1])(power))
      }
      else {
        powerFunc = (value, term) => (Decimal.increasingInverse((val : Decimal) => this.powerFunc(term, val), false, undefined, this.rangeLimits[1][0], this.rangeLimits[1][1])(value))
        powerInverse = this.powerFunc;
      }
      if (this.betweenInverseAlready) {
        betweenFunc = this.betweenFunc;
        betweenInverse = (leftover, term) => (Decimal.increasingInverse((val : Decimal) => this.betweenFunc(val, term), false, undefined, this.rangeLimits[2][0], this.rangeLimits[2][1])(leftover))
      }
      else {
        betweenFunc = (value, term) => (Decimal.increasingInverse((val : Decimal) => this.betweenFunc(val, term), false, undefined, this.rangeLimits[2][0], this.rangeLimits[2][1])(value))
        betweenInverse = this.betweenFunc;
      }

      let result = "";
      if (currentValue.lt(this.minValue)) result = this.constantInnerNotation.format(currentValue);
      else {
        let irrelevancyCheck = currentValue;
        let termsSoFar = 0;
        while (termsSoFar < this._maxTerms && result.length < this.maxChars && !this.irrelevancyFunc(currentValue, irrelevancyCheck)) {
          let currentTerm = currentEngineeringValue(termFunc(currentValue), this._termEngineerings);
          if (currentTerm.isFinite() && currentTerm.gte(this.minTerm)) {
            let currentTermValue = termInverse(currentTerm);
            let currentPower = currentEngineeringValue(powerFunc(currentValue, currentTermValue), this._powerEngineerings);
            let combinedTerm = powerInverse(currentTermValue, currentPower);
            // console.log(currentValue + " " + currentTerm + " " + currentTermValue + " " + currentPower + " " + combinedTerm)
            currentValue = betweenFunc(currentValue, combinedTerm);
            if (this.showTerms(currentTerm, currentPower)) {
              if (termsSoFar > 0) {
                if (this.reverseTerms) result = this.betweenChar + result;
                else result = result + this.betweenChar;
              }
              let singleTermStr = this.termChars[0] + (this.termInnerNotation === null ? this : this.termInnerNotation).format(currentTerm) + this.termChars[1];
              let termStr = "";
              if (currentPower.gte(0) && currentPower.lte(this.maxPowersInARow) && currentPower.mod(1).eq(0)) {
                for (let p = 0; p < currentPower.toNumber(); p++) {
                  if (p > 0) termStr = termStr + this.betweenPowersChar;
                  termStr += singleTermStr;
                }
                termStr = this.termWrapperChars[0] + termStr + this.termWrapperChars[1]
              }
              else {
                termStr = singleTermStr;
                if (this.powerBefore) termStr = this.powerChars[0] + (this.powerInnerNotation === null ? this : this.powerInnerNotation).format(currentPower) + this.powerChars[1] + termStr + this.powerChars[2];
                else termStr = this.powerChars[2] + termStr + this.powerChars[0] + (this.powerInnerNotation === null ? this : this.powerInnerNotation).format(currentPower) + this.powerChars[1];
              }
              if (this.reverseTerms) result = termStr + result;
              else result = result + termStr;
              termsSoFar++;
            }
          }
          else {
            if (this.showConstantTerm(currentValue)) {
              if (termsSoFar > 0) {
                if (this.reverseTerms) result = this.betweenChar + result;
                else result = result + this.betweenChar;
              }
              let termStr = this.constantTermChars[0] + this.constantInnerNotation.format(currentValue) + this.constantTermChars[1];
              if (this.reverseTerms) result = termStr + result;
              else result = result + termStr;
            }
            break;
          }
        }
        result = this.edgeChars[0] + result + this.edgeChars[1];
      }

      if (iterations.gt(0) && iterations.lte(this.max_iterations_in_a_row) && iterations.mod(1).eq(0)) {
        result = this.iterationChars[0][0] + result + this.iterationChars[0][1];
        for (let i = 1; i < iterations.toNumber(); i++) result = this.iterationChars[1][0] + result + this.iterationChars[1][1];
      }
      else if (iterations.abs().gt(this.max_iterations_in_a_row)) {
        let eStr = (this.iterationInnerNotation === null ? this : this.iterationInnerNotation).format(iterations);
        eStr = this.iterationChars[2][0] + eStr + this.iterationChars[2][1];
        if (this.superexpAfter[0]) result = result + eStr;
        else result = eStr + result;
      }
      if (layers.neq(0)) {
        if (layers.lte(this.max_layers_in_a_row) && layers.mod(1).eq(0)) {
          result = this.layerChars[0][0] + result + this.layerChars[0][1];
          for (let i = 1; i < layers.toNumber(); i++) result = this.layerChars[1][0] + result + this.layerChars[1][1];
        }
        else if (layers.abs().gt(this.max_layers_in_a_row)) {
          let eStr = (this.layerInnerNotation === null ? this : this.layerInnerNotation).format(layers);
          eStr = this.layerChars[2][0] + eStr + this.layerChars[2][1];
          if (this.superexpAfter[1]) result = result + eStr;
          else result = eStr + result;
        }
      }

      return result;
    }

    public get maxTerms() {
      return this._maxTerms;
    }

    public set maxTerms(maxTerms : number) {
        if (maxTerms <= 0) throw new RangeError("Nonpositive max terms in Increasing Function Product Notation");
        this._maxTerms = maxTerms;
    }

    public get termEngineerings() {
      return this._termEngineerings;
    }
  
    public set termEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._termEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      this._termEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get powerEngineerings() {
      return this._powerEngineerings;
    }
  
    public set powerEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._powerEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      this._powerEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get iterationEngineerings() {
      return this._iterationEngineerings;
    }
  
    public set iterationEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._iterationEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      for (let e = 0; e < engineeringsD.length; e++) {
        if (engineeringsD[e].mod(1).neq(0)) throw new RangeError("Increasing Function does not support non-integer iterations");
      }
      this._iterationEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }

    public get layerEngineerings() {
      return this._layerEngineerings;
    }
  
    public set layerEngineerings(engineerings : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      if (engineerings.length == 0) {
        this._layerEngineerings = [Decimal.dOne];
        return;
      }
      let engineeringsD : Decimal[] = engineerings.map(toDecimal);
      this._layerEngineerings = engineeringsD.sort(function(a, b){
          if (a.lt(b)) return -1;
          else if (a.eq(b)) return 0;
          else return 1;
      }).reverse();
    }
  }