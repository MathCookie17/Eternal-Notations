import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * The default way to abbreviate numbers - any leftover numbers in other notations are typically put through this to add commas and decimal places.
 * Starts with unabbreviated numbers, then scientific notation, then scientific notation with multiple e's, and finally F notation.
 * @param placesAbove1 ( number ) For numbers above 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) For numbers below 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. Default is 0, which means commas are always shown. If this value is negative, commas are never used.
 * @param maxnum ( Decimal ) The point at which the notation switches to scientific. Default is 1e12.
 * @param minnum ( Decimal ) The point below 1 at which the notation switches to scientific with a negative exponent. Default is 1e-6.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's in the front than this, switches to F notation. Default is 5.
 * @param decimalChar ( string ) The string used as the decimal point. Default is ".".
 * @param commaChar ( string ) The string used as the comma. Default is ",".
 *
 * This notation does not have an innerNotation parameter.
 */
export declare class DefaultNotation extends Notation {
    placesAbove1: number;
    placesBelow1: number;
    commasMin: Decimal;
    maxnum: Decimal;
    minnum: Decimal;
    max_es_in_a_row: number;
    decimalChar: string;
    commaChar: string;
    constructor(placesAbove1?: number, placesBelow1?: number, commasMin?: DecimalSource, maxnum?: DecimalSource, minnum?: DecimalSource, max_es_in_a_row?: number, decimalChar?: string, commaChar?: string);
    name: string;
    formatDecimal(value: Decimal): string;
}
