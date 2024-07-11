import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * This notation, no matter what you put in, returns a particular string. Used for things like Blind notation.
 * @param str ( string ! ) The string that this notation returns.
 */
export declare class PredeterminedNotation extends Notation {
    str: string;
    constructor(str: string);
    format(value: DecimalSource): string;
    name: string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
}
