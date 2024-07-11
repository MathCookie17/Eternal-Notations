import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
/**
 * For reasons unbeknownst to me, break_eternity's Decimal.fromValue does not seem to work on values that are already Decimals, so this function is a version of Decimal.fromValue that does.1
 * Unlike Decimal.fromValue, this function uses the linear approximation of tetration to convert strings that involve tetration.
 * @param value ( Decimal ! ) The DecimalSource to be converted.
 */
export declare function toDecimal(value: DecimalSource): Decimal;
/**
 * "Multiplicative absolute value". For numbers with absolute value less than 1, returns their reciprocal. Otherwise, returns the original value. (0 just returns 0)
 * @param value ( Decimal ! ) The number to take the multiplicative absolute value of.
 */
export declare function multabs(value: DecimalSource): Decimal;
/**
 * Rounds the given value to the nearest multiple of some number.
 * @param value ( Decimal ) The value to be rounded.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) If this parameter is a Decimal, then "value" is rounded to the nearest multiple of "rounding".
 * If this parameter is a Decimal -> Decimal function, then "value" is plugged into that function, and whatever that function returns is used as the "rounding" to round to the nearest multiple of.
 * The rounding is not performed at all if "rounding" is 0.
 */
export declare function round(value: DecimalSource, rounding: DecimalSource | ((value: Decimal) => Decimal)): Decimal;
/**
 * Checks a string to see if it only contains certain characters.
 * @param str ( string ! ) The string to be checked.
 * @param allowed ( string[] ! ) An array of the allowed characters (any strings in this array that are more than one character will end up being ignored).
 */
export declare function onlyAllowedCharacters(str: string, allowed: string[]): boolean;
/**
 * Checks a string to see if it only contains numeric characters: 0 1 2 3 4 5 6 7 8 9 . ,
 * This is just a subset of onlyAllowedCharacters, but it's included here for convienence.
 * @param str ( string ! ) The string to be checked
 * @param negativeAllowed ( boolean ) The character - is also allowed if this is true. Default is false.
 */
export declare function onlyNumericCharacters(str: string, negativeAllowed?: boolean): boolean;
export declare const lowercaseAlphabet: string[];
export declare const uppercaseAlphabet: string[];
export declare const defaultBaseChars: string[];
/**
 * Takes a number and formats it with commas and decimals.
 * @param value ( number ! ) The number to be formatted.
 * @param placesAbove1 ( number ) For numbers 1 or greater, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) For numbers less than 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commas ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, which means commas are always included.
 * @param decimalChar ( string ) The string used as the decimal point. Default is ".".
 * @param commaChar ( string ) The string used as the comma. Default is ",".
 */
export declare function commasAndDecimals(value: number, placesAbove1?: number, placesBelow1?: number, commas?: number, decimalChar?: string, commaChar?: string): string;
/**
 * Adds commas to a string by inserting a comma between every few characters of the string, starting at the end.
 * @param str ( string ! ) The string to be formatted.
 * @param commaChar ( string[] ) The character to be inserted as a comma. Default is ",".
 * @param spacing ( number ) The amount of characters between each commas. Default is 3.
 */
export declare function addCommas(str: string, commaChars?: string[], spacing?: number): string;
/**
 * Approximates a number as a fraction using continued fractions, returning whatever the first continued fraction approximation of that number that's close enough to the true value is.
 * @param value ( number ! ) The value to be approximated as a fraction.
 * @param precision ( number ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional. If precision is 0, it will be as exact as floating point numbers will allow.
 * @param returnForm ( number ! ) Controls what the returned array represents. 0 means "continued fraction", 1 means "numerator and denominator", 2 means "whole number, numerator, denominator", 3 means "whole number, numerator, and denominator, but change the fractional part for negatives to match how mixed numbers are actually written".
 * @param maxIterations ( number ) The process will end after this many iterations even if the desired precision has not been reached. Default is Infinity.
 * @param maxDenominator ( number ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
 * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
 * @param maxNumerator ( number ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
 * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
 */
export declare function fractionApproximation(value: number, precision: number, returnForm: number, maxIterations?: number, maxDenominator?: number, strictMaxDenominator?: boolean, maxNumerator?: number, strictMaxNumerator?: boolean): number[];
/**
 * Approximates a Decimal as a fraction using continued fractions, returning whatever the first continued fraction approximation of that number that's close enough to the true value is.
 * @param value ( Decimal ! ) The value to be approximated as a fraction.
 * @param precision ( Decimal ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
 * @param returnForm ( number ! ) Controls what the returned array represents. 0 means "continued fraction", 1 means "numerator and denominator", 2 means "whole number, numerator, denominator", 3 means "whole number, numerator, and denominator, but flip for negatives to match how mixed numbers are actually written".
 * @param maxIterations ( number ) The process will end after this many iterations even if the desired precision has not been reached. Default is Infinity.
 * @param maxDenominator ( Decimal ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
 * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
 * @param maxNumerator ( Decimal ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
 * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
 */
export declare function fractionApproximationD(value: DecimalSource, precision: DecimalSource, returnForm: number, maxIterations?: number, maxDenominator?: DecimalSource, strictMaxDenominator?: boolean, maxNumerator?: DecimalSource, strictMaxNumerator?: boolean): Decimal[];
/**
 * Returns an array of all the primes that are not greater than max.
 * @param max ( number ! ) The cutoff point for the list of primes.
 */
export declare function primesArray(max: number): number[];
/**
 * Turns a whole number into its prime factorization. Returns an array of pairs of numbers: in each pair is a prime and its exponent. For example, 60 would return [[2, 2], [3, 1], [5, 1]] since its prime factoration is 2^2 * 3^1 * 5^1.
 * 1 returns an empty array, 0 returns [[0, 1]], negatives have [-1, 1] on the beginning of their array.
 * @param value ( number ! ) The number to factorize. Must be an integer.
 * @param primes ( number | number[] ! ) If this is an array, that array is the list of prime factors to check for. If this is a number, all primes that are not greater than that number are checked.
 */
export declare function primeFactorize(value: number, primes: number | number[]): [number, number][];
/**
 * Uses fractionApproximation to find an approximation of value as a fraction, then finds the prime factorization of that fraction using primeFactorize.
 * For example, 40/63 would return [[2, 3], [3, -2], [5, 1], [7, -1]] because it's equal to 2^3 * 3^-2 * 5^1 * 7^-1.
 * @param value ( number ! ) The number to factorize.
 * @param primes ( number | number[] ! ) If this is an array, that array is the list of prime factors to check for. If this is a number, all primes that are not greater than that number are checked.
 * @param precision ( number ! ) If this is positive, the fraction approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
 * @param maxIterations ( number ) The fraction approximating process will end after this many iterations even if the desired precision has not been reached. Default is Infinity.
 * @param maxDenominator ( number ) If the fraction approximation's denominator is above this, the fraction approximating ends there. Default is Infinity, which means there is no maximum denominator.
 * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the fraction approximating stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
 * @param maxNumerator ( number ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
 * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
 */
export declare function primeFactorizeFraction(value: number, primes: number | number[], precision: number, maxIterations?: number, maxDenominator?: number, strictMaxDenominator?: boolean, maxNumerator?: number, strictMaxNumerator?: boolean): [number, number][];
export declare function currentEngineering(value: Decimal, engineerings: Decimal[]): Decimal[];
export declare function engineeringValue(arr: Decimal[], engineerings: Decimal[]): Decimal;
export declare function currentEngineeringValue(value: Decimal, engineerings: Decimal[]): Decimal;
export declare function nextEngineering(value: Decimal, engineerings: Decimal[]): Decimal[];
export declare function nextEngineeringValue(value: Decimal, engineerings: Decimal[]): Decimal;
export declare function previousEngineering(value: Decimal, engineerings: Decimal[]): Decimal[];
export declare function previousEngineeringValue(value: Decimal, engineerings: Decimal[]): Decimal;
export declare function upperCurrentEngineeringValue(value: Decimal, engineerings: Decimal[]): Decimal;
/**
 * Decimal's iteratedexp, except each exponentiation in the iteratedexp, instead of just being base^value, is base^(value/mult), so that taking the logarithm to undo it would require multiplying by the mult after said logarithm.
 */
export declare function iteratedexpmult(base: DecimalSource, payload: DecimalSource, height: number, mult: DecimalSource): Decimal;
/**
 * Decimal's iteratedlog, except the value is multiplied by mult after each logarithm.
 */
export declare function iteratedmultlog(value: DecimalSource, base: DecimalSource, times: number, mult: DecimalSource): Decimal;
/**
 * This function is to iteratedexpmult and iteratedmultlog as slog is to iteratedexp/tetrate and iteratedlog.
 */
export declare function multslog(value: DecimalSource, base: DecimalSource, mult: DecimalSource): Decimal;
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b * (base)^e equals the original value.
 * @param value ( Decimal ! ) The value we want to turn into scientific notation.
 * @param base ( Decimal ) The base of the scientific notation we're using (default is 10)
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, 2.357e224 in base 10, which normally returns [2.357, 224], would become [23.57, 223] with 1 mantissaPower and [235.7, 222] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
 */
export declare function scientifify(value: DecimalSource, base?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expMultiplier?: DecimalSource): [Decimal, Decimal];
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that Decimal.iteratedexp(base, e, b, true) equals the original value.
 * @param value ( Decimal ! ) The value we want to turn into hyperscientific notation.
 * @param base ( Decimal ) The base of the hyperscientific notation we're using (default is 10).
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, 1e100 in base 10, which normally returns [2, 2], would become [100, 1] with 1 mantissaPower and [1e100, 0] with 2 mantissaPower.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expMultiplier ( Decimal ) Each exponentiation in the iteratedexp, instead of just being base^value, is base^(value/expMultiplier), so that taking the logarithm to undo it would require multiplying by the expMultiplier after said logarithm. Default is 1.
 * @param hyperexpMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
 */
export declare function hyperscientifify(value: DecimalSource, base?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), hypermantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expMultiplier?: DecimalSource, hyperexpMultiplier?: DecimalSource): [Decimal, Decimal];
/**
 * Splits a Decimal into an array of four decimals, [M, E, T, P], such that if b is the base, b^^b^^b^^...^^(b^b^b^b...^(m * b^e))) = the original Decimal, where there are T b^'s and P b^^'s.
 * In other words, this function splits a Decimal into a hyperoperator array like in OmegaNum, except there's an exponentiation entry between the mantissa and the tetration entry.
 * @param value ( Decimal ! ) The Decimal inputted into the function.
 * @param base ( Decimal ) The base of the exponentiation, tetration, and pentation. Default is 10.
 * @param maximums ( Decimal[] ) The largest allowed values for each operator: anything equal to or above this rolls over to the next operator. maximums[0] is the mantissa limit, maximums[1] is the exponent limit, maximums[2] is the tetration limit. Default is [10, 10, 10], where that 10 is replaced with whatever the base is. Setting maximums[0] to 0 effectively disables the mantissa, setting maximums[1] to be equal to or less than expMult effectively disables the exponent, and setting maximums[2] to be equal to or less than hyperexpMult effectively disables the tetration.
 * @param originalMaximums ( Decimal[] ) These are the maximums that apply when the next operator is 0: for example, if maximums is [10, 10, 10] but originalMaximums is [100, 10, 10], then the mantissa can go up to 100 before exponents begin but once the exponent has begun increasing then the mantissa is limited to 10 (this applies even if tetration or pentation is above 0, as long as exponent is still 0). Is the same as maximums by default.
 * @param minnum ( Decimal ) Values above this and below maximums[0] will just return [value, 0, 0, 0] instead of doing any splitting; this prevents small-but-not-too-small values like 2 from forcing negative exponents. Default is 1. Set this value to a negative number to disable this functionality.
 * @param mantissaRounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param hyperengineerings ( Decimal | Decimal[] ) Same as engineerings, but for the tetration value instead.
 * @param pentaengineerings ( Decimal | Decimal[] ) Same as engineerings, but for the pentation value instead.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each tetration in the process is multiplied by this value. Default is 1.
 * @param pentaexpMult ( Decimal ) The pentation value is multiplied by this value. Default is 1.
 */
export declare function hypersplit(value: DecimalSource, base?: DecimalSource, maximums?: DecimalSource[], originalMaximums?: DecimalSource[], minnum?: DecimalSource, mantissaRounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], hyperengineerings?: DecimalSource | DecimalSource[], pentaengineerings?: DecimalSource | DecimalSource[], expMult?: DecimalSource, hyperexpMult?: DecimalSource, pentaexpMult?: DecimalSource): [Decimal, Decimal, Decimal, Decimal];
export declare function factorial(value: number): number;
/**
 * Repeatedly takes the factorial of a Decimal.
 * @param value ( Decimal ! ) The number we're taking factorials of.
 * @param iterations ( number ) The amount of times the factorial is taken. Uses an approximation for non-whole amounts of iterations. Default is 1.
 */
export declare function iteratedfactorial(value: DecimalSource, iterations?: number): Decimal;
/**
 * The inverse of the factorial function: finds the number x such that x! = value. Equivalent to iteratedfactorial with a negative amount of iterations.
 * @param value ( Decimal ! ) The value we're finding the inverse factorial of.
 * @param iterations ( number ) The amount of times the factorial is taken. Default is 1. For example, if iterations is 2, then it finds the number x such that x!! = value. Default is 1.
 */
export declare function inverse_factorial(value: DecimalSource, iterations?: number): Decimal;
/**
 * This function is to iteratedfactorial and inverse_factorial as slog is to iteratedexp and iteratedlog: it returns the amount of times factorial must be applied to the base to return the given value.
 * @param value ( Decimal ! ) The value we're finding the factorial_slog for.
 * @param base ( Decimal ) The number that the factorials are repeatedly applied to. The base must be greater than 2. Default is 3.
 */
export declare function factorial_slog(value: DecimalSource, base?: DecimalSource): Decimal;
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b * e! equals the original value.
 * @param value ( Decimal ! ) The value to be converted into "factorial scientific notation".
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in factorial-scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
export declare function factorial_scientifify(value: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[]): [Decimal, Decimal];
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b!!!... with e !'s equals the original value.
 * @param value ( Decimal ! ) The value to be converted into "factorial hyperscientific notation".
 * @param limit ( Decimal ) If the mantissa is below this value, the amount of factorials is decreased by 1 to bring the mantissa back to being equal to or above this value. Default is 3.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
export declare function factorial_hyperscientifify(value: DecimalSource, limit?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[]): [Decimal, Decimal];
/**
 * Returns the nth polygonal number of s sides; 3 sides is triangular numbers, 4 sides is perfect squares, etc.
 * Grows quadratically.
 * @param value ( Decimal ! ) The value we're taking the polygonal number of.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 */
export declare function polygon(value: DecimalSource, sides: DecimalSource): Decimal;
/**
 * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds n given x and s.
 * Grows at a square root rate (square root itself, of course, is the s = 4 case of polygonRoot).
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 */
export declare function polygonRoot(value: DecimalSource, sides: DecimalSource): Decimal;
/**
 * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds s given x and n.
 * This is actually weaker than polygonRoot - polygonRoot has the strength of square root, but polygonLog has the strength of division.
 * @param value ( Decimal ! ) The x in the above example.
 * @param base ( Decimal ! ) The n in the above example.
 */
export declare function polygonLog(value: DecimalSource, base: DecimalSource): Decimal;
/**
 * Iterated polygon: this function returns the result of applying polygon(x, s) to 'payload' (with the result placed in the x of the next application) 'value' times.
 * Grows double-exponentially, using a linear approximation for fractional values (though this becomes irrelevant for values above 8 or so, as there's an approximating formula that holds for non-small values)
 * @param value ( Decimal ! ) The amount of times the polygon function is applied.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 * @param payload ( Decimal ) The number the polygon function is repeatedly applied to. Default is 2.
 */
export declare function biPolygon(value: DecimalSource, sides: DecimalSource, payload?: DecimalSource): Decimal;
/**
 * Performs polygonRoot on 'payload', 'iterations' times. Equivalent to biPolygon with a negative value.
 * @param payload ( Decimal ! ) The number that's having the polygonal root repeatedly taken on.
 * @param iterations ( Decimal ! ) The amount of times the polygonal root is taken.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 */
export declare function iteratedPolygonRoot(payload: DecimalSource, iterations: DecimalSource, sides: DecimalSource): Decimal;
/**
 * Inverse function of biPolygon: for biPolygon(n, s, p) = x, this function finds n given x, s, and p.
 * Grows double-logarithmically.
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
 */
export declare function biPolygonRoot(value: DecimalSource, sides: DecimalSource, zeroValue?: DecimalSource): Decimal;
/**
 * Iterated biPolygon: this function returns the result of applying biPolygon(x, s, p) to 'base' (with the result placed in the x of the next application) 'value' times.
 * Grows tetrationally (increasing value by 1 increases the super-logarithm by around 2). Uses a "linear" approximation for fractional values; I'll admit the approximation used is pretty arbitrary, because I didn't have any better ideas.
 * @param value ( number ! ) The amount of times the biPolygon function is applied.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 * @param base ( Decimal ) The payload used in each application of biPolygon. Default is 2.
 * @param payload ( Decimal ) The value that biPolygon is repeatedly applied to. Default is 2.
 */
export declare function triPolygon(value: number, sides: DecimalSource, base?: DecimalSource, payload?: DecimalSource): Decimal;
/**
 * Performs biPolygonRoot on 'payload', 'iterations' times. Equivalent to triPolygon with a negative value.
 * @param payload ( Decimal ! ) The number that's having the bipolygonal root repeatedly taken on.
 * @param iterations ( number ! ) The amount of times the bipolygonal root is taken.
 * @param sides ( Decimal ) The amount of sides on the polygon.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root. Default is 2.
 */
export declare function iteratedBiPolygonRoot(payload: DecimalSource, iterations: number, sides: DecimalSource, zeroValue?: DecimalSource): Decimal;
/**
 * Inverse function of triPolygon: for triPolygon(n, s, b, p) = x, this function finds n given x, s, b, and p.
 * Grows super-logarithmically.
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 * @param base ( Decimal ) The b in the above example. Default is 2.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
 */
export declare function triPolygonRoot(value: DecimalSource, sides: DecimalSource, base?: DecimalSource, zeroValue?: DecimalSource): Decimal;
