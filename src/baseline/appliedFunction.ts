import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
import { DefaultNotation } from "./defaultNotation.js";
import { toDecimal } from "./utils.js";

/**
 * Applies a function to the value, puts a string before it and/or a string after it, then uses InnerNotation to abbreviate the new value.
 * @param DecimalFunc ( Decimal -> Decimal ) The Decimal -> Decimal function that this notation applies before using InnerNotation. Default is the identity function.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param StringFunc ( string -> string ) The string -> string function that this notation applies after using InnerNotation. Default is the identity function.
 * @param nonFiniteApplied ( boolean ) This is false by default; if this is true, then the functions here are applied even to infinities and NaN. If this is false, then the infinityString, negativeInfinityString, and NaNString of the inner notation, not this notation, are used.
 */
export class AppliedFunctionNotation extends Notation {
    public DecimalFunc : (value : Decimal) => Decimal;
    public innerNotation : Notation = new DefaultNotation();
    public StringFunc : (value : string) => string;
    public nonFiniteApplied : boolean = false;

    constructor(
      DecimalFunc : (value : Decimal) => Decimal = (value) => value, 
      innerNotation : Notation = new DefaultNotation(), 
      StringFunc : (value : string) => string = (str) => str, 
      nonFiniteApplied : boolean = false) {
        super();
        this.DecimalFunc = DecimalFunc;
        this.innerNotation = innerNotation;
        this.StringFunc = StringFunc;
        this.nonFiniteApplied = nonFiniteApplied;
      }

    public name = "Applied Function Notation";
  
    public format(
      value: DecimalSource
    ): string {
      value = toDecimal(value);
      if (!value.isFinite() && !this.nonFiniteApplied) return this.innerNotation.format(value);
      return this.StringFunc(this.innerNotation.format(this.DecimalFunc(value)));
    }
  
    public formatNegativeDecimal(value: Decimal): string {
        return this.StringFunc(this.innerNotation.formatNegativeDecimal(this.DecimalFunc(value)));
    }
  
    public formatDecimal(value: Decimal): string {
        return this.StringFunc(this.innerNotation.formatDecimal(this.DecimalFunc(value)));
    }
  }