import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";

/**
 * This notation, no matter what you put in, returns a particular string. Used for things like Blind notation.
 * @param str ( string ! ) The string that this notation returns.
 */
export class PredeterminedNotation extends Notation {
    public str : string;

    constructor(str : string) {
        super();
        this.str = str;
      }
  
    public format(
      value: DecimalSource
    ): string {
      return this.str;
    }

    public name = "Predetermined Notation";
  
    public formatNegativeDecimal(value: Decimal): string {
        return this.str;
    }
  
    public formatDecimal(value: Decimal): string {
        return this.str;
    }
  }