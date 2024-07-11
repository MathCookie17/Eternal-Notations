import Decimal from "break_eternity.js";
import { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Uses Donald Knuth's -yllion proposal to abbreviate numbers. In this system, rather than each power of 1,000 getting a new name, each new number name after a hundred is the square of the previous one.
 * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param lowestAbbreviated The smallest -yllion that gets abbreviated - numbers below this -yllion are written out in full. Default is 1, i.e. a myllion, i.e. 10^8. Set this to 0 to have a myriad (10^4) get abbreviated too, set this to 2 to make a myllion also be written out but a byllion still be abbreviated, and so on. Do not set this parameter to anything below 0 or higher than 6.
 * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
 * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. Default is an AlternateBaseNotation that still works in base 10, but used the myriad system's commas instead of the usual commas.
 */
export declare class MyriadNotation extends Notation {
    private _dialect;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _lowestAbbreviated;
    private _entriesLimit;
    private _charLimit;
    innerNotation: Notation;
    private prefixes;
    private charLimitReached;
    constructor(dialect?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), lowestAbbreviated?: number, entriesLimit?: number, charLimit?: number, innerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    private calcYllion;
    get dialect(): number;
    set dialect(dialect: number);
    get lowestAbbreviated(): number;
    set lowestAbbreviated(lowestAbbreviated: number);
    get entriesLimit(): number;
    set entriesLimit(entriesLimit: number);
    get charLimit(): number;
    set charLimit(charLimit: number);
}
