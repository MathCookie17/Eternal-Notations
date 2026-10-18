import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal } from "./utils.js";
import { Notation } from "./notation.js";

/**
 * Has an array of notations to choose from, selecting one of them to abbreviate the value based on certain conditions.
 * 
 * @param specialIncluded ( boolean ! ) If this parameter is true, then special numbers (negatives, infinities, etc.) use the conditions to decide which notation to be abbreviated in as well. If this parameter is false, then negatives use negativeSign and their absolute value as usual, and infinities and NaNs still use their respective strings as usual.
 * 
 * After that first argument, this notation can take as many arguments as you want to give it. The arguments are of type [Notation, Decimal -> boolean], i.e. pairs where the first entry of each pair is a Notation and the second is a predicate that takes a Decimal. To abbreviate a Decimal value, this notation starts at the beginning of the arguments, and for each argument it checks whether the value satisfies that argument's predicate; if so, that argument's notation is used to abbreviate the value, otherwise the checking moves on to the next argument. An error is thrown if the value doesn't satisfy any of the predicates.
 */
export class ConditionalNotation extends Notation {
    public specialIncluded : boolean;
    public options : [Notation, (value : Decimal) => boolean][];

    constructor(specialIncluded : boolean, ...options : [Notation, (value : Decimal) => boolean][]) {
        super();
        this.specialIncluded = specialIncluded;
        this.options = options;
    }
    public name = "Conditional Notation";

    public format(
        value: DecimalSource
    ): string {
    let decimal = toDecimal(value);

    if (this.specialIncluded) {
        for (let n = 0; n < this.options.length; n++) {
            if (this.options[n][1](decimal)) return this.options[n][0].format(decimal);
        }
        throw new Error("No notation was chosen.")
    }
    else {
        if (decimal.isNan()) return this.NaNString;
  
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
  
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
    
        return (decimal.sgn() < 0 && !this.specialIncluded)
          ? this.formatNegativeDecimal(decimal.abs())
          : this.formatDecimal(decimal);
      }
    }

    public formatNegativeDecimal(value: Decimal): string {
        return this.negativeString[0] + this.formatDecimal(value) + this.negativeString[1];
    }

    public formatDecimal(value: Decimal): string {
        for (let n = 0; n < this.options.length; n++) {
            if (this.options[n][1](value)) return this.options[n][0].format(value);
        }
        throw new Error("No notation was chosen.")
    }
}