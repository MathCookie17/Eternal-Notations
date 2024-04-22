import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
import { toDecimal } from "./utils.js";

/**
 * Applies a Decimal -> string function to the inputted Decimal. Basically, you can make your own notation with this.
 * @param func ( Decimal -> string ! ) The Decimal -> string function that this notation runs.
 * @param negativeStringUsed ( boolean ) This parameter is false by default. If it's true, then negative numbers aren't run through func directly - instead, their absolute value is run through func, and then negativeString is put on front.
 * @param infinityStringUsed ( boolean ) This parameter is true by default. If it's true, then infinite numbers aren't run through func - instead, they just use infinityString and negativeInfinityString.
 */
export class CustomNotation extends Notation {
    public func : (value : Decimal) => string;
    public negativeStringUsed : boolean = false;
    public infinityStringUsed : boolean = false;

    constructor(func : (value : Decimal) => string, negativeStringUsed : boolean = false, infinityStringUsed : boolean = false) {
        super();
        this.func = func;
        this.negativeStringUsed = negativeStringUsed;
        this.infinityStringUsed = infinityStringUsed;
      }
      
      public name = "Custom Notation";
  
      public format(
        value: DecimalSource
      ): string {

        let decimal = toDecimal(value);

        if (decimal.isNan()) return this.NaNString;
    
        if (this.isInfinite(decimal)) {
          if (this.infinityStringUsed) return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
          else return decimal.sgn() < 0 ? (this.negativeStringUsed ? this.negativeString + this.formatDecimal(Decimal.dInf) : this.formatDecimal(Decimal.dNegInf)) : this.formatDecimal(Decimal.dInf);
        }
  
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
    
        return (decimal.sgn() < 0 && this.negativeStringUsed)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
        return this.func(value);
    }
  }