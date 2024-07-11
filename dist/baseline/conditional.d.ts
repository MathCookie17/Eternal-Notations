import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "./notation.js";
/**
 * Has an array of notations to choose from, selecting one of them to abbreviate the value based on certain conditions.
 *
 * @param specialIncluded ( boolean ! ) If this parameter is true, then special numbers (negatives, infinities, etc.) use the conditions to decide which notation to be abbreviated in as well. If this parameter is false, then negatives use negativeSign and their absolute value as usual, and infinities and NaNs still use their respective strings as usual.
 *
 * After that first argument, this notation can take as many arguments as you want to give it. The arguments are of type [Notation, Decimal -> boolean], i.e. pairs where the first entry of each pair is a Notation and the second is a predicate that takes a Decimal. To abbreviate a Decimal value, this notation starts at the beginning of the arguments, and for each argument it checks whether the value satisfies that argument's predicate; if so, that argument's notation is used to abbreviate the value, otherwise the checking moves on to the next argument. An error is thrown if the value doesn't satisfy any of the predicates.
 */
export declare class ConditionalNotation extends Notation {
    specialIncluded: boolean;
    options: [Notation, (value: Decimal) => boolean][];
    constructor(specialIncluded: boolean, ...options: [Notation, (value: Decimal) => boolean][]);
    name: string;
    format(value: DecimalSource): string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
}
