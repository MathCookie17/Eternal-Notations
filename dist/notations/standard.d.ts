import Decimal from "break_eternity.js";
import { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Uses the names of large numbers to abbreviate them: a million is 1 M, two billion is 2 B, and so on. Larger names use the -illion scheme devised by Jonathan Bowers.
 * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
 * @param longScale ( boolean ) The short scale is used if this is false, the long scale is used if this is true. Default is false.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
 * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 */
export declare class StandardNotation extends Notation {
    private _dialect;
    longScale: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _entriesLimit;
    private _charLimit;
    innerNotation: Notation;
    private prefixes;
    private charLimitReached;
    constructor(dialect?: number, longScale?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), entriesLimit?: number, charLimit?: number, innerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    private calcLayer2;
    private calcLayer3;
    get dialect(): number;
    set dialect(dialect: number);
    get entriesLimit(): number;
    set entriesLimit(entriesLimit: number);
    get charLimit(): number;
    set charLimit(charLimit: number);
}
