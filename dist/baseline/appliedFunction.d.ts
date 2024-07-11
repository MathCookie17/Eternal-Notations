import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * Applies a function to the value, puts a string before it and/or a string after it, then uses InnerNotation to abbreviate the new value.
 * @param DecimalFunc ( Decimal -> Decimal ) The Decimal -> Decimal function that this notation applies before using InnerNotation. Default is the identity function.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param StringFunc ( string -> string ) The string -> string function that this notation applies after using InnerNotation. Default is the identity function.
 * @param nonFiniteApplied ( boolean ) This is false by default; if this is true, then the functions here are applied even to infinities and NaN. If this is false, then the infinityString, negativeInfinityString, and NaNString of the inner notation, not this notation, are used.
 */
export declare class AppliedFunctionNotation extends Notation {
    DecimalFunc: (value: Decimal) => Decimal;
    innerNotation: Notation;
    StringFunc: (value: string) => string;
    nonFiniteApplied: boolean;
    constructor(DecimalFunc?: (value: Decimal) => Decimal, innerNotation?: Notation, StringFunc?: (value: string) => string, nonFiniteApplied?: boolean);
    name: string;
    format(value: DecimalSource): string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
}
