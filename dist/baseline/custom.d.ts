import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * Applies a Decimal -> string function to the inputted Decimal. Basically, you can make your own notation with this.
 * @param func ( Decimal -> string ! ) The Decimal -> string function that this notation runs.
 * @param negativeStringUsed ( boolean ) This parameter is false by default. If it's true, then negative numbers aren't run through func directly - instead, their absolute value is run through func, and then negativeString is put on front.
 * @param infinityStringUsed ( boolean ) This parameter is true by default. If it's true, then infinite numbers aren't run through func - instead, they just use infinityString and negativeInfinityString.
 */
export declare class CustomNotation extends Notation {
    func: (value: Decimal) => string;
    negativeStringUsed: boolean;
    infinityStringUsed: boolean;
    constructor(func: (value: Decimal) => string, negativeStringUsed?: boolean, infinityStringUsed?: boolean);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
}
