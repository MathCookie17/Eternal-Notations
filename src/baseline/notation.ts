import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal } from "./utils.js";

export abstract class Notation {
  
  //Notation stuff
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
  
      return decimal.sgn() < 0
        ? this.formatNegativeDecimal(decimal.abs())
        : this.formatDecimal(decimal);
    }

    public formatNegativeDecimal(value: Decimal): string {
      return this.negativeString[0] + this.formatDecimal(value) + this.negativeString[1];
    }

    public abstract formatDecimal(value: Decimal): string;

    //Parameter stuff
    public negativeString : [string, string] = ["-", ""];
    public infinityString : string = "Infinite";
    public negativeInfinityString : string | null = null;
    public NaNString : string = "???";
    public isInfinite = (decimal: Decimal) : boolean => (decimal.eq(Decimal.dInf) || decimal.eq(Decimal.dNegInf));
    public name : string = "";
  
    public get infinite(): string {
      return this.infinityString;
    }

    public get negativeInfinite(): string {
      if (this.negativeInfinityString === null) return this.negativeString[0] + this.infinityString + this.negativeString[1];
      else return this.negativeInfinityString;
    }

    /**
     * Sets the five parameters that all notations have, then returns back the notation it was given but with those changes made. Parameters left undefined here are not changed.
     * @param negativeString A [string, string] or undefined. If this is a pair of strings, negative numbers have negativeString[0] placed in front of them and negativeString[1] placed after them (default is ["-", ""]). The negative string is unaltered if this is undefined.
     * @param infinityString A string or undefined. If this is a string, this becomes what the notation returns for positive infinities ("Infinite" by default). The infinity string is unaltered if this is undefined.
     * @param negativeInfinityString A string, null, or undefined. If this is a string, this becomes what the notation returns for negative infinities. If this is null, then negative infinities use negativeString and infinityString concatenated (this is the default behavior). The negative infinity string is unaltered if this is undefined.
     * @param NaNString A string or undefined. If this is a string, this becomes what the notation returns for NaN ("???" by default). The NaN string is unaltered if this is undefined.
     * @param isInfinite A Decimal => boolean function, or undefined. If this is a function, then that function is what tests if a number is considered infinite (the default is (decimal.eq(Decimal.dInf) || decimal.eq(Decimal.dNegInf)), which means "only return true if the Decimal is actually infinite", but by changing this function, this can be changed to, say, mark anything above 2^1024 as infinite). The infinite-checking function is unaltered if this is undefined.
     */
    public setNotationGlobals(
      negativeString? : [string, string],
      infinityString? : string,
      negativeInfinityString? : string | null,
      NaNString? : string,
      isInfinite? : ((decimal: Decimal) => boolean)
      ) : this {
        if (negativeString !== undefined) this.negativeString = negativeString;
        if (infinityString !== undefined) this.infinityString = infinityString;
        if (negativeInfinityString !== undefined) this.negativeInfinityString = negativeInfinityString;
        if (NaNString !== undefined) this.NaNString = NaNString;
        if (isInfinite !== undefined) this.isInfinite = isInfinite;
        return this;
    } 

    /**
     * Changes the name of the Notation, then gives you back the Notation. (i.e. returns this)
     */
    public setName(name : string) : this {
      this.name = name;
      return this;
    }
  
  }