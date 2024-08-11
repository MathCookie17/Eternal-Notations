import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, round, currentEngineeringValue, nextEngineeringValue, iteratedFGH0, iteratedFGH1, iteratedFGH1log, iteratedFGH2, iteratedFGH2log, iteratedFGH3, iteratedFGH3log, FGH4, FGH4inverse } from "../baseline/utils.js";

    /**
     * A notation that abbreviates numbers using the Fast-Growing Hierarchy, a simple system of functions: f0(n) = n + 1, f1(n) is f0(f0(f0(f0...(n)))) with n f0's,
     * f2(n) is f1(f1(f1(f1...(n)))) with n f1's, and so on, with each function being a repeated version of the previous one.
     * The Fast-Growing Hierarchy functions have a similar growth rate to the hyperoperators: f1 multiplies, f2 is exponential, f3 is tetrational, f4 is pentational, and so on.
     * This notation only goes up to f4.
     * @param maximums ( Decimal[] ) If the number given is above maximums[0], another iteration of f0 is applied. Likewise, going above maximums[1] causes an iteration of f1 to be applied, going above maximums[2] causes an iteration of f2 to be applied, and so on.
     * Later functions are applied before earlier ones. Default is [1, 4, 32, ee41373247578.35493, Infinity], which are the values that cause the argument to stay below 1 and the amount of iterations of each function to stay below 4.
     * If less than 5 entries are provided, the unfilled entries are set to Infinity, i.e. those later operators don't show up.
     * @param functionChars ( [string, string][] ) The strings used to show each application of each function. functionChars[n] corresponds to f[n]. For each entry, functionChars[n][0] goes before the argument,
     * functionChars[n][1] goes after. Default is [["f0(", ")"], ["f1(", ")"], ["f2(", ")"], ["f3(", ")"], ["f4(", ")"]]. If less than 5 entries are provided, the unfilled entries go back to their default values.
     * @param max_in_a_row ( number[] ) If the amount of iterations of f0 is above max_in_a_row[0], the f0's are concatenated into an (f0^n) expression. Likewise for the rest of the functions and their corresponding entries here.
     * Default is [4, 4, 4, 4, 4]. If less than 5 entries are provided, the unfilled entries are set to the same value as the last filled one.
     * @param iterationChars ( [string, string, string][] ) The strings used when the amount of iterations is concatenated. In each entry, iterationChars[n][0] goes before the amount of iterations, iterationChars[n][1] goes after the amount of iterations,
     * and iterationChars[n][2] goes on the opposite side of the argument from the other two. Default is [["(f0^", ")", ""], ["(f1^", ")", ""], ["(f2^", ")", ""], ["(f3^", ")", ""], ["(f4^", ")", ""]].
     * If less than 5 entries are provided, the unfilled entries go back to their default values.
     * @param iterationAfter ( boolean[] ) If iterationAfter[n] is true, then the amount of iterations of that function goes after the argument instead of before. Default is [false, false, false, false, false].
     * If less than 5 entries are provided, the unfilled entries are set to false.
     * @param edgeChars ( [string, string, boolean] ) If any of the functions are applied to the value at least once, then edgeChars[0] goes on the left end of the whole expression, edgeChars[1] goes on the right end.
     * If edgeChars[2] is true, then the other two edgeChars appear even if no other functions are visible. Default is ["", "", false].
     * @param argumentChars ( [string, string, boolean] ) If any of the functions are applied to the value at least once, then argumentChars[0] goes right before the argument, edgeChars[1] goes right after.
     * If argumentChars[2] is true, then the other two argumentChars appear even if no other functions are visible. Default is ["", "", false].
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The argument is rounded to the nearest multiple of this value. If this parameter is a function, then the argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * @param delimiterPermutation ( number ) The order that the functions are shown in when multiple are present (they're always applied from greatest to least; this parameter is only a visual change). The default is 119, which corresponds to [f0, f1, f2, f3, f4]. Each value from 0 to 119 represents a different ordering.
     * @param engineerings ( Decimal | Decimal[][] ) Either a DecimalSource or an array of arrays of DecimalSources; default is 1. This parameter controls the allowed amount of iterations for each function: for example, if engineerings[0] is [3], then the amount of f0 iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings[1] is [5, 2], then the permitted amounts of f0 iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
     * If engineerings is a single value, then every argument is given that single value as its engineerings entry. The amount of iterations for f4 may not be a non-integer, though the iterations for the rest may be. If less than 5 entries are provided, then all unfilled entries will be set equal to the last entry that was given.
     * @param innerNotation ( Notation ) The notation that the argument is itself written in. DefaultNotation is the default.
     * @param iterationInnerNotations ( Notation | Notation[] ) iterationInnerNotations[0] is the notation that the amount of iterations of f0 is written in, and likewise for the rest of the functions.
     * If only a single notation is provided, all 5 entries are set to that notation. If less than 5 entries are provided, the unfilled ones are set to be the same as the last given one. Is the same as innerNotation by default.
     * @param functionShown ( ((value : Decimal) => boolean)[] ) functionShown[0] controls when the f0 iterations are shown: the f0 iterations, whether concatenated or not, are only shown if functionShown[0](amount of f0 iterations) returns true.
     * Default is (value => value.gt(0)) for all five entries, i.e. the iterations are only shown if there's more than zero of them. If less than 5 entries are provided, the unfilled ones are set to be the same as the last given one. 
     */
export class FastGrowingHierarchyNotation extends Notation {
    private _maximums : Decimal[] = [Decimal.dOne, new Decimal(4), new Decimal(32), new Decimal("ee41373247578.35493"), Decimal.dInf];
    private _functionChars : [string, string][] = [["f0(", ")"], ["f1(", ")"], ["f2(", ")"], ["f3(", ")"], ["f4(", ")"]];
    private _max_in_a_row : number[] = [4, 4, 4, 4, 4];
    private _iterationChars : [string, string, string][] = [["(f0^", ")", ""], ["(f1^", ")", ""], ["(f2^", ")", ""], ["(f3^", ")", ""], ["(f4^", ")", ""]];
    private _iterationAfter : boolean[] = [false];
    public edgeChars : [string, string, boolean] = ["", "", false];
    public argumentChars : [string, string, boolean] = ["", "", false];
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    public delimiterPermutation : number = 119;
    private _engineerings : Decimal[][] = [[Decimal.dOne], [Decimal.dOne], [Decimal.dOne], [Decimal.dOne], [Decimal.dOne]];
    public innerNotation : Notation = new DefaultNotation();
    private _iterationInnerNotations : Notation[] = [this.innerNotation];
    private _functionShown : ((value : Decimal) => boolean)[] = [(value => value.gt(0))];

    constructor(
      maximums : DecimalSource[] = [Decimal.dOne, new Decimal(4), new Decimal(32), new Decimal("ee41373247578.35493"), Decimal.dInf],
      functionChars : [string, string][] = [["f0(", ")"], ["f1(", ")"], ["f2(", ")"], ["f3(", ")"], ["f4(", ")"]],
      max_in_a_row : number | number[] = [4, 4, 4, 4, 4],
      iterationChars : [string, string, string][] = [["(f0^", ")", ""], ["(f1^", ")", ""], ["(f2^", ")", ""], ["(f3^", ")", ""], ["(f4^", ")", ""]],
      iterationAfter : boolean[] = [false],
      edgeChars : [string, string, boolean] = ["", "", false],
      argumentChars : [string, string, boolean] = ["", "", false],
      rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero,
      delimiterPermutation : number = 119,
      engineerings : DecimalSource | DecimalSource[][] = 1,
      innerNotation : Notation = new DefaultNotation(),
      iterationInnerNotations : Notation | Notation[] = innerNotation,
      functionShown : ((value : Decimal) => boolean)[] = [(value => value.gt(0))]
    ) {
        super();
        this.maximums = maximums;
        this.functionChars = functionChars;
        this.max_in_a_row = max_in_a_row;
        this.iterationChars = iterationChars;
        this.iterationAfter = iterationAfter;
        this.edgeChars = edgeChars;
        this.argumentChars = argumentChars;
        this.rounding = rounding;
        this.delimiterPermutation = delimiterPermutation;
        this.engineerings = engineerings;
        this.innerNotation = innerNotation;
        this.iterationInnerNotations = iterationInnerNotations;
        this.functionShown = functionShown;
    }

    public name = "Fast-Growing Hierarchy Notation";

    public formatDecimal(value: Decimal): string {
      let currentValue = value;
      let roundedValues = [value, value, value, value, value];
      let iterations = [Decimal.dZero, Decimal.dZero, Decimal.dZero, Decimal.dZero, Decimal.dZero];
      let initialRun = [true, true, true, true, true];
      if (value.eq(0)) initialRun = [false, false, false, false, false]
      while (roundedValues[4].gte(this._maximums[4]) || initialRun[4]) {
        initialRun[3] = initialRun[2] = initialRun[1] = initialRun[0] = true;
        currentValue = roundedValues[4];
        iterations[0] = Decimal.dZero;
        iterations[1] = Decimal.dZero;
        iterations[2] = Decimal.dZero;
        iterations[3] = Decimal.dZero;
        while (currentValue.gte(this._maximums[4])) {
          let amount4 = nextEngineeringValue(iterations[4], this._engineerings[4]).sub(iterations[4]).toNumber();
          for (let i = 0; i < amount4; i++) {
            currentValue = FGH4inverse(currentValue);
            iterations[4] = iterations[4].plus(1)
          }
        }
        initialRun[4] = false;
        roundedValues[4] = roundedValues[3] = roundedValues[2] = roundedValues[1] = roundedValues[0] = currentValue;
        while (roundedValues[3].gte(this._maximums[3]) || initialRun[3]) {
          initialRun[2] = initialRun[1] = initialRun[0] = true;
          currentValue = roundedValues[3];
          iterations[0] = Decimal.dZero;
          iterations[1] = Decimal.dZero;
          iterations[2] = Decimal.dZero;
          if (currentValue.gte(this._maximums[3])) {
            let iterations3 = currentEngineeringValue(iteratedFGH3log(currentValue, this._maximums[3]).floor().max(0), this._engineerings[3]).toNumber();
            currentValue = iteratedFGH3(currentValue, -iterations3);
            iterations[3] = iterations[3].plus(iterations3);
            while (currentValue.gte(this._maximums[3])) {
              iterations3 = nextEngineeringValue(iterations[3], this._engineerings[3]).sub(iterations[3]).toNumber();
              currentValue = iteratedFGH3(currentValue, -iterations3);
              iterations[3] = iterations[3].plus(iterations3);
            }
          }
          initialRun[3] = false;
          roundedValues[3] = roundedValues[2] = roundedValues[1] = roundedValues[0] = currentValue;
          while (roundedValues[2].gte(this._maximums[2]) || initialRun[2]) {
            initialRun[1] = initialRun[0] = true;
            currentValue = roundedValues[2];
            iterations[0] = Decimal.dZero;
            iterations[1] = Decimal.dZero;
            if (currentValue.gte(this._maximums[2])) {
              let iterations2 = currentEngineeringValue(iteratedFGH2log(currentValue, this._maximums[2]).floor().max(0), this._engineerings[2]).toNumber();
              currentValue = iteratedFGH2(currentValue, -iterations2);
              iterations[2] = iterations[2].plus(iterations2);
              while (currentValue.gte(this._maximums[2])) {
                iterations2 = nextEngineeringValue(iterations[2], this._engineerings[2]).sub(iterations[2]).toNumber();
                currentValue = iteratedFGH2(currentValue, -iterations2);
                iterations[2] = iterations[2].plus(iterations2);
              }
            }
            initialRun[2] = false;
            roundedValues[2] = roundedValues[1] = roundedValues[0] = currentValue;
            while (roundedValues[1].gte(this._maximums[1]) || initialRun[1]) {
              initialRun[0] = true;
              currentValue = roundedValues[1];
              iterations[0] = Decimal.dZero;
              if (currentValue.gte(this._maximums[1])) {
                let iterations1 = currentEngineeringValue(iteratedFGH1log(currentValue, this._maximums[1]).floor().max(0), this._engineerings[1]);
                currentValue = iteratedFGH1(currentValue, -iterations1);
                iterations[1] = iterations[1].plus(iterations1);
                while (currentValue.gte(this._maximums[1])) {
                  iterations1 = nextEngineeringValue(iterations[1], this._engineerings[1]).sub(iterations[1]);
                  currentValue = iteratedFGH1(currentValue, -iterations1);
                  iterations[1] = iterations[1].plus(iterations1);
                }
              }
              initialRun[1] = false;
              roundedValues[1] = roundedValues[0] = currentValue;
              while (roundedValues[0].gte(this._maximums[0]) || initialRun[0]) {
                currentValue = roundedValues[0];
                let roundedValue = round(currentValue, this.rounding);
                if (roundedValue.gte(this._maximums[0])) {
                  let iterations0 = currentEngineeringValue(roundedValue.sub(this._maximums[0]).floor().max(0), this._engineerings[0]);
                  currentValue = iteratedFGH0(currentValue, -iterations0);
                  roundedValue = round(currentValue, this.rounding);
                  iterations[0] = iterations[0].plus(iterations0);
                  while (roundedValue.gte(this._maximums[0])) {
                    iterations0 = nextEngineeringValue(iterations[0], this._engineerings[0]).sub(iterations[0]);
                    currentValue = iteratedFGH0(currentValue, -iterations0);
                    roundedValue = round(currentValue, this.rounding);
                    iterations[0] = iterations[0].plus(iterations0);
                  }
                }
                initialRun[0] = false;
                roundedValues[0] = roundedValue;
              }
              roundedValues[1] = this.FGHEvaluate(roundedValues[0], [iterations[0]]);
            }
            roundedValues[2] = this.FGHEvaluate(roundedValues[1], [Decimal.dZero, iterations[1]]);
          }
          roundedValues[3] = this.FGHEvaluate(roundedValues[2], [Decimal.dZero, Decimal.dZero, iterations[2]]);
        }
        roundedValues[4] = this.FGHEvaluate(roundedValues[3], [Decimal.dZero, Decimal.dZero, Decimal.dZero, iterations[3]]);
      }

      let anyIterations = false;
      for (let f = 0; f < 5; f++) if (this._functionShown[f](iterations[f])) { anyIterations = true; break; }
      let orderArray = [0];
      orderArray.splice(this.delimiterPermutation % 2, 0, 1);
      orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 2);
      orderArray.splice(Math.floor(this.delimiterPermutation / 6) % 4, 0, 3);
      orderArray.splice(Math.floor(this.delimiterPermutation / 24) % 5, 0, 4);
      let result = this.innerNotation.format(roundedValues[0]);
      if (anyIterations || this.argumentChars[2]) result = this.argumentChars[0] + result + this.argumentChars[1];
      for (let o = 0; o < 5; o++) {
        let f = orderArray[o];
        if (this._functionShown[f](iterations[f])) {
          let currentiterations = iterations[f];
          if (currentiterations.gt(0) && currentiterations.lte(this._max_in_a_row[f]) && currentiterations.mod(1).eq(0)) {
            for (let i = 0; i < currentiterations.toNumber(); i++) {
              result = this._functionChars[f][0] + result + this._functionChars[f][1];
            }
          }
          else if (this._iterationAfter[f]) {
            result = this._iterationChars[f][2] + result + this._iterationChars[f][0] + this._iterationInnerNotations[f].format(iterations[f]) + this._iterationChars[f][1];
          }
          else result = this._iterationChars[f][0] + this._iterationInnerNotations[f].format(iterations[f]) + this._iterationChars[f][1] + result + this._iterationChars[f][2];
        }
      }
      if (anyIterations || this.edgeChars[2]) result = this.edgeChars[0] + result + this.edgeChars[1];
      return result;
    }

    private FGHEvaluate(argument : Decimal, iterationArray : Decimal[]) : Decimal {
      let result = argument;
      if (iterationArray.length > 0) result = iteratedFGH0(result, iterationArray[0]);
      if (iterationArray.length > 1) result = iteratedFGH1(result, iterationArray[1]);
      if (iterationArray.length > 2) result = iteratedFGH2(result, iterationArray[2].toNumber());
      if (iterationArray.length > 3) result = iteratedFGH3(result, iterationArray[3].toNumber());
      if (iterationArray.length > 4) {
        let i4 = iterationArray[4].toNumber();
        let i4a = Math.abs(i4);
        for (let i = 0; i < i4a; i++) {
          if (i4 > 0) result = FGH4(result);
          else result = FGH4inverse(result);
          if (result.eq(0) || !result.isFinite()) return result;
        }
      }
      return result;
    }

    public get maximums() {
      return this._maximums;
    }

    public set maximums(maximums : DecimalSource[]) {
      let maximumsD = maximums.map(toDecimal);
      while (maximumsD.length < 5) maximumsD.push(Decimal.dInf);
      this._maximums = maximumsD;
    }

    public get functionChars() {
      return this._functionChars;
    }

    public set functionChars(functionChars : [string, string][]) {
      let result : [string, string][] = [["f0(", ")"], ["f1(", ")"], ["f2(", ")"], ["f3(", ")"], ["f4(", ")"]];
      for (let f = 0; f < Math.min(5, functionChars.length); f++) result[f] = functionChars[f];
      this._functionChars = result;
    }

    public get max_in_a_row() {
      return this._max_in_a_row;
    }

    public set max_in_a_row(max_in_a_row : number | number[]) {
      if (!Array.isArray(max_in_a_row)) max_in_a_row = [max_in_a_row];
      if (max_in_a_row.length == 0) max_in_a_row.push(4);
      while (max_in_a_row.length < 5) max_in_a_row.push(max_in_a_row[max_in_a_row.length - 1]);
      this._max_in_a_row = max_in_a_row;
    }

    public get iterationChars() {
      return this._iterationChars;
    }

    public set iterationChars(iterationChars : [string, string, string][]) {
      let result : [string, string, string][] = [["(f0^", ")", ""], ["(f1^", ")", ""], ["(f2^", ")", ""], ["(f3^", ")", ""], ["(f4^", ")", ""]];
      for (let f = 0; f < Math.min(5, iterationChars.length); f++) result[f] = iterationChars[f];
      this._iterationChars = result;
    }

    public get iterationAfter() {
      return this._iterationAfter;
    }

    public set iterationAfter(iterationAfter : boolean[]) {
      while (iterationAfter.length < 5) iterationAfter.push(false);
      this._iterationAfter = iterationAfter;
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
      while (result.length < 5) result.push(result[result.length - 1]);
      for (let e = 0; e < result[4].length; e++) {
        if (result[4][e].mod(1).neq(0)) throw new Error("Non-whole numbers in the engineerings entry for f4 in Fast-Growing Hierarchy notation")
      }
      this._engineerings = result;
    }

    public get iterationInnerNotations() {
      return this._iterationInnerNotations;
    }

    public set iterationInnerNotations(iterationInnerNotations : Notation | Notation[]) {
      if (!Array.isArray(iterationInnerNotations)) iterationInnerNotations = [iterationInnerNotations];
      if (iterationInnerNotations.length == 0) iterationInnerNotations.push(new DefaultNotation());
      while (iterationInnerNotations.length < 5) iterationInnerNotations.push(iterationInnerNotations[iterationInnerNotations.length - 1]);
      this._iterationInnerNotations = iterationInnerNotations;
    }

    public get functionShown() {
      return this._functionShown;
    }

    public set functionShown(functionShown : ((value : Decimal) => boolean)[]) {
      if (functionShown.length == 0) functionShown.push(value => value.gt(0));
      while (functionShown.length < 5) functionShown.push(functionShown[functionShown.length - 1]);
      this._functionShown = functionShown;
    }

}