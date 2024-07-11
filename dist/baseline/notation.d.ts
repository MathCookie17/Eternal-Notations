import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
export declare abstract class Notation {
    format(value: DecimalSource): string;
    formatNegativeDecimal(value: Decimal): string;
    abstract formatDecimal(value: Decimal): string;
    negativeString: [string, string];
    infinityString: string;
    negativeInfinityString: string | null;
    NaNString: string;
    isInfinite: (decimal: Decimal) => boolean;
    name: string;
    get infinite(): string;
    get negativeInfinite(): string;
    /**
     * Sets the five parameters that all notations have, then returns back the notation it was given but with those changes made. Parameters left undefined here are not changed.
     * @param negativeString A [string, string] or undefined. If this is a pair of strings, negative numbers have negativeString[0] placed in front of them and negativeString[1] placed after them (default is ["-", ""]). The negative string is unaltered if this is undefined.
     * @param infinityString A string or undefined. If this is a string, this becomes what the notation returns for positive infinities ("Infinite" by default). The infinity string is unaltered if this is undefined.
     * @param negativeInfinityString A string, null, or undefined. If this is a string, this becomes what the notation returns for negative infinities. If this is null, then negative infinities use negativeString and infinityString concatenated (this is the default behavior). The negative infinity string is unaltered if this is undefined.
     * @param NaNString A string or undefined. If this is a string, this becomes what the notation returns for NaN ("???" by default). The NaN string is unaltered if this is undefined.
     * @param isInfinite A Decimal => boolean function, or undefined. If this is a function, then that function is what tests if a number is considered infinite (the default is (decimal.eq(Decimal.dInf) || decimal.eq(Decimal.dNegInf)), which means "only return true if the Decimal is actually infinite", but by changing this function, this can be changed to, say, mark anything above 2^1024 as infinite). The infinite-checking function is unaltered if this is undefined.
     */
    setNotationGlobals(negativeString?: [string, string], infinityString?: string, negativeInfinityString?: string | null, NaNString?: string, isInfinite?: ((decimal: Decimal) => boolean)): this;
    /**
     * Changes the name of the Notation, then gives you back the Notation. (i.e. returns this)
     */
    setName(name: string): this;
}
