import Decimal from "break_eternity.js";
import { DecimalSource } from "break_eternity.js";
/**
 * For reasons unbeknownst to me, break_eternity's Decimal.fromValue does not seem to work on values that are already Decimals, so this function is a version of Decimal.fromValue that does.
 * Unlike Decimal.fromValue, this function uses the linear approximation of tetration to convert strings that involve tetration.
 * @param value ( Decimal ! ) The DecimalSource to be converted.
 */
declare function toDecimal(value: DecimalSource): Decimal;
/**
 * "Multiplicative absolute value". For numbers with absolute value less than 1, returns their reciprocal. Otherwise, returns the original value. (0 just returns 0)
 * @param value ( Decimal ! ) The number to take the multiplicative absolute value of.
 */
declare function multabs(value: DecimalSource): Decimal;
/**
 * Takes a number and formats it with commas and decimals.
 * @param value ( number ! ) The number to be formatted.
 * @param placesAbove1 ( number ) For numbers 1 or greater, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) For numbers less than 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commas ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, which means commas are always included.
 * @param decimalChar ( string ) The string used as the decimal point. Default is ".".
 * @param commaChar ( string ) The string used as the comma. Default is ",".
 */
declare function commasAndDecimals(value: number, placesAbove1?: number, placesBelow1?: number, commas?: number, decimalChar?: string, commaChar?: string): string;
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
declare function fractionApproximation(value: number, precision: number, returnForm: number, maxIterations?: number, maxDenominator?: number, strictMaxDenominator?: boolean, maxNumerator?: number, strictMaxNumerator?: boolean): number[];
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
declare function fractionApproximationD(value: DecimalSource, precision: DecimalSource, returnForm: number, maxIterations?: number, maxDenominator?: DecimalSource, strictMaxDenominator?: boolean, maxNumerator?: DecimalSource, strictMaxNumerator?: boolean): Decimal[];
/**
 * Turns a whole number into its prime factorization. Returns an array of pairs of numbers: in each pair is a prime and its exponent. For example, 60 would return [[2, 2], [3, 1], [5, 1]] since its prime factoration is 2^2 * 3^1 * 5^1.
 * 1 returns an empty array, 0 returns [[0, 1]], negatives have [-1, 1] on the beginning of their array.
 * @param value ( number ! ) The number to factorize. Must be an integer.
 * @param primes ( number | number[] ! ) If this is an array, that array is the list of prime factors to check for. If this is a number, all primes that are not greater than that number are checked.
 */
declare function primeFactorize(value: number, primes: number | number[]): [
    number,
    number
][];
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
declare function primeFactorizeFraction(value: number, primes: number | number[], precision: number, maxIterations?: number, maxDenominator?: number, strictMaxDenominator?: boolean, maxNumerator?: number, strictMaxNumerator?: boolean): [
    number,
    number
][];
/**
 * Same as Decimal's iteratedlog, except it takes an array of bases instead of a single base,
 * and each iteration consists of taking logarithms of each of those bases in order.
 * Unlike iteratedlog, fractional 'times' is not supported here.
 * For example, multibaseLogarithm(x, [10, 2], 1) = x.log(10).log(2), and multibaseLogarithm(x, [10, 2], 2) = x.log(10).log(2).log(10).log(2)
 * @param value ( Decimal ! ) The value to take the multi-base logarithm of.
 * @param bases ( Decimal[] ! ) The array of bases that the logarithms are taken in.
 * @param times ( number ) The amount of iterations. Each iteration, the entire array of bases is cycled through once. Default is 1.
 */
declare function multibaseLogarithm(value: DecimalSource, bases: DecimalSource[], times?: number): Decimal;
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b * (base)^e equals the original value.
 * @param value ( Decimal ! ) The value we want to turn into scientific notation.
 * @param base ( Decimal ) The base of the scientific notation we're using (default is 10)
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, 2.357e224 in base 10, which normally returns [2.357, 224], would become [23.57, 223] with 1 mantissaPower and [235.7, 222] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
 */
declare function scientifify(value: DecimalSource, base?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expMultiplier?: DecimalSource): [
    Decimal,
    Decimal
];
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
declare function hyperscientifify(value: DecimalSource, base?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), hypermantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expMultiplier?: DecimalSource, hyperexpMultiplier?: DecimalSource): [
    Decimal,
    Decimal
];
/**
 * "Weak tetration" is, like regular tetration, repeated exponentiation, but evaluated from bottom to top instead of from top to bottom.
 * For example, 10↓↓5 is (((10^10)^10)^10)^10. It turns out that a↓↓b is equal to a^(a^(b - 1)).
 * @param value ( Decimal ! ) The value to repeatedly exponentiate.
 * @param height ( Decimal ! ) The amount of layers in the power tower.
 * @param lowest ( Decimal ) The number at the bottom of the power tower. Is equal to 'value' by default.
 */
declare function weak_tetrate(value: DecimalSource, height: DecimalSource, lowest?: DecimalSource): Decimal;
/**
 * One of weak tetration's inverses: given that base↓↓x = value, what is x?
 * This turns out to just be log(log(value)) + 1, with 'base' as the base of the logarithms.
 * @param value ( Decimal ! ) The value to find the weak super-logarithm of.
 * @param base ( Decimal ) The base of the weak super-logarithm. Default is 10.
 */
declare function weak_slog(value: DecimalSource, base?: DecimalSource): Decimal;
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that ((base)↓↓e)^b equals the original value, where x↓↓y is "weak tetration", x↓↓y = x^x^(y - 1).
 * @param value ( Decimal ! ) The value we want to turn into weak hyperscientific notation.
 * @param base ( Decimal ) The base of the weak hyperscientific notation we're using (default is 10).
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in weak hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, 1e350 in base 10, which normally returns [3.5, 3], would become [35, 2] with 1 mantissaPower and [350, 1] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
 */
declare function weak_hyperscientifify(value: DecimalSource, base?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expMultiplier?: DecimalSource): [
    Decimal,
    Decimal
];
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that Decimal.pentate(base, e, b, true) equals the original value.
 * @param value ( Decimal ! ) The value we want to turn into penta-scientific notation.
 * @param base ( Decimal ) The base of the penta-scientific notation we're using (default is 10).
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param hypermantissaPower ( Decimal ) Normally, the mantissa in penta-scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^^2, if mantissaPower is 2 then the bounds are base^^^2 and base^^^3, and so on. For example, 10^^10 in base 10, which normally returns [1, 2], would become [10, 1] with 1 mantissaPower and [10^^10, 0] with 2 mantissaPower.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
declare function pentascientifify(value: DecimalSource, base?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), hypermantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[]): [
    Decimal,
    Decimal
];
/**
 * An advanced version of scientifify that takes any strictly increasing function with any amount of Decimal arguments and uses Decimal.increasingInverse to turn it into a scientific notation-like expression.
 * The last argument is considered the highest priority argument to increment, like how the exponent is higher-priority than the mantissa in regular scientifify.
 * Returns an array of Decimals containing the values of each parameter that, when plugged into the function, will give the original value.
 * @param value ( Decimal ! ) The value being inputted into the function.
 * @param func ( (...values : Decimal[]) => Decimal ! ) The function that is being used. It can have any amount of Decimal arguments, but it must return a Decimal (and it must have a fixed amount of arguments - the arguments can't themselves be an array of Decimals)
 * @param limits ( Decimal[] ! ) limits[0] is the minimum value that the first argument is allowed to have; anything less, and the second argument is decreased to bring the first argument back over that limit. Likewise, limits[1] is the minimum for the second argument, limits[2] is the minimum for the third argument, and so on.
 * The last argument does not have a limit. If this array has less values than (amount of arguments - 1), then all unfilled values will be set equal to the last value that was given.
 * @param limitsAreMaximums ( boolean ) If this parameter is true, the limits are maximums instead of minimums. Default is false.
 * @param engineerings ( Decimal | Decimal[][] ) Either a DecimalSource or an array of arrays of DecimalSources; default is 1. This parameter controls the allowed values for each argument: for example, if engineerings[0] is [3], then the second argument will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings[1] is [5, 2], then the permitted values for the third argument are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * The first argument does not have an engineerings array. If engineerings is a single value, then every argument is given that single value as its engineerings entry. If engineerings is an array with less arguments than (amount of arguments - 1), then all unfilled entries will be set equal to the last entry that was given.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The first argument is rounded to the nearest multiple of this value. If this parameter is a function, then the first argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * NOTE: Unlike the rounding parameter in other scientifify functions, this one does not detect "overflow", so rounding may cause the first argument to go under or over its limit.
 * @param rangeLimits ( [Decimal, Decimal][] ) For the purposes of ensuring Decimal.increasingInverse functions properly, these parameters set limits on the domain of the function.
 * For each entry, rangeLimits[a][0] is the minimum for an argument, rangeLimits[a][1] is the maximum for an argument.
 * These parameters do nothing for the actual result, they only ensure valid behavior.
 * @param revertValues ( (Decimal | boolean)[] ) If an argument would end up with a non-finite value (such as if increasingInverse returned NaN), that argument's revertValue entry determines what it becomes instead.
 * If the revertValues entry is 'true', then that argument reverts to its limit. If the revertValues entry is a Decimal, then that argument becomes that value. If the revertValues entry is 'false', the non-finite value remains.
 */
declare function increasingFunctionScientifify(value: DecimalSource, func: (...values: Decimal[]) => Decimal, limits: DecimalSource[], limitsAreMaximums?: boolean, engineerings?: DecimalSource | DecimalSource[][], rounding?: DecimalSource | ((value: Decimal) => Decimal), rangeLimits?: [
    DecimalSource,
    DecimalSource
][], revertValues?: (DecimalSource | boolean)[]): Decimal[];
/**
 * Returns a function that, when a Decimal value is plugged into it, runs increasingFunctionScientifify on that value with the arguments given here.
 * @param func ( (...values : Decimal[]) => Decimal ! ) The function that is being used. It can have any amount of Decimal arguments, but it must return a Decimal (and it must have a fixed amount of arguments - the arguments can't themselves be an array of Decimals)
 * @param limits ( Decimal[] ! ) limits[0] is the minimum value that the first argument is allowed to have; anything less, and the second argument is decreased to bring the first argument back over that limit. Likewise, limits[1] is the minimum for the second argument, limits[2] is the minimum for the third argument, and so on.
 * The last argument does not have a limit. If this array has less values than (amount of arguments - 1), then all unfilled values will be set equal to the last value that was given.
 * @param limitsAreMaximums ( boolean ) If this parameter is true, the limits are maximums instead of minimums. Default is false.
 * @param engineerings ( Decimal | Decimal[][] ) Either a DecimalSource or an array of arrays of DecimalSources; default is 1. This parameter controls the allowed values for each argument: for example, if engineerings[0] is [3], then the second argument will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings[1] is [5, 2], then the permitted values for the third argument are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * The first argument does not have an engineerings array. If engineerings is a single value, then every argument is given that single value as its engineerings entry. If engineerings is an array with less arguments than (amount of arguments - 1), then all unfilled entries will be set equal to the last entry that was given
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The first argument is rounded to the nearest multiple of this value. If this parameter is a function, then the first argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * NOTE: Unlike the rounding parameter in other scientifify functions, this one does not detect "overflow", so rounding may cause the first argument to go under or over its limit.
 * @param rangeLimits ( [Decimal, Decimal][] ) For the purposes of ensuring Decimal.increasingInverse functions properly, these parameters set limits on the domain of the function.
 * For each entry, rangeLimits[a][0] is the minimum for an argument, rangeLimits[a][1] is the maximum for an argument.
 * These parameters do nothing for the actual result, they only ensure valid behavior.
 */
declare function increasingScientififyFunction(func: (...values: Decimal[]) => Decimal, limits: DecimalSource[], limitsAreMaximums?: boolean, engineerings?: DecimalSource | DecimalSource[][], rounding?: DecimalSource | ((value: Decimal) => Decimal), rangeLimits?: [
    DecimalSource,
    DecimalSource
][]): (value: DecimalSource) => Decimal[];
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
declare function hypersplit(value: DecimalSource, base?: DecimalSource, maximums?: DecimalSource[], originalMaximums?: DecimalSource[], minnum?: DecimalSource, mantissaRounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], hyperengineerings?: DecimalSource | DecimalSource[], pentaengineerings?: DecimalSource | DecimalSource[], expMult?: DecimalSource, hyperexpMult?: DecimalSource, pentaexpMult?: DecimalSource): [
    Decimal,
    Decimal,
    Decimal,
    Decimal
];
/**
 * Repeatedly takes the factorial of a Decimal.
 * @param value ( Decimal ! ) The number we're taking factorials of.
 * @param iterations ( number ) The amount of times the factorial is taken. Uses an approximation for non-whole amounts of iterations. Default is 1.
 */
declare function iteratedfactorial(value: DecimalSource, iterations?: number): Decimal;
/**
 * The inverse of the factorial function: finds the number x such that x! = value. Equivalent to iteratedfactorial with a negative amount of iterations.
 * @param value ( Decimal ! ) The value we're finding the inverse factorial of.
 * @param iterations ( number ) The amount of times the factorial is taken. Default is 1. For example, if iterations is 2, then it finds the number x such that x!! = value. Default is 1.
 */
declare function inverse_factorial(value: DecimalSource, iterations?: number): Decimal;
/**
 * This function is to iteratedfactorial and inverse_factorial as slog is to iteratedexp and iteratedlog: it returns the amount of times factorial must be applied to the base to return the given value.
 * @param value ( Decimal ! ) The value we're finding the factorial_slog for.
 * @param base ( Decimal ) The number that the factorials are repeatedly applied to. The base must be greater than 2. Default is 3.
 */
declare function factorial_slog(value: DecimalSource, base?: DecimalSource): Decimal;
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b * e! equals the original value.
 * @param value ( Decimal ! ) The value to be converted into "factorial scientific notation".
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in factorial-scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
declare function factorial_scientifify(value: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, engineerings?: DecimalSource | DecimalSource[]): [
    Decimal,
    Decimal
];
/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b!!!... with e !'s equals the original value.
 * @param value ( Decimal ! ) The value to be converted into "factorial hyperscientific notation".
 * @param limit ( Decimal ) If the mantissa is below this value, the amount of factorials is decreased by 1 to bring the mantissa back to being equal to or above this value. Default is 3.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
declare function factorial_hyperscientifify(value: DecimalSource, limit?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[]): [
    Decimal,
    Decimal
];
/**
 * Returns the nth polygonal number of s sides; 3 sides is triangular numbers, 4 sides is perfect squares, etc.
 * Grows quadratically.
 * @param value ( Decimal ! ) The value we're taking the polygonal number of.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 */
declare function polygon(value: DecimalSource, sides: DecimalSource): Decimal;
/**
 * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds n given x and s.
 * Grows at a square root rate (square root itself, of course, is the s = 4 case of polygonRoot).
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 */
declare function polygonRoot(value: DecimalSource, sides: DecimalSource): Decimal;
/**
 * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds s given x and n.
 * This is actually weaker than polygonRoot - polygonRoot has the strength of square root, but polygonLog has the strength of division.
 * @param value ( Decimal ! ) The x in the above example.
 * @param base ( Decimal ! ) The n in the above example.
 */
declare function polygonLog(value: DecimalSource, base: DecimalSource): Decimal;
/**
 * Iterated polygon: this function returns the result of applying polygon(x, s) to 'payload' (with the result placed in the x of the next application) 'value' times.
 * Grows double-exponentially, using a linear approximation for fractional values (though this becomes irrelevant for values above 8 or so, as there's an approximating formula that holds for non-small values)
 * @param value ( Decimal ! ) The amount of times the polygon function is applied.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 * @param payload ( Decimal ) The number the polygon function is repeatedly applied to. Default is 2.
 */
declare function biPolygon(value: DecimalSource, sides: DecimalSource, payload?: DecimalSource): Decimal;
/**
 * Performs polygonRoot on 'payload', 'iterations' times. Equivalent to biPolygon with a negative value.
 * @param payload ( Decimal ! ) The number that's having the polygonal root repeatedly taken on.
 * @param iterations ( Decimal ! ) The amount of times the polygonal root is taken.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 */
declare function iteratedPolygonRoot(payload: DecimalSource, iterations: DecimalSource, sides: DecimalSource): Decimal;
/**
 * Inverse function of biPolygon: for biPolygon(n, s, p) = x, this function finds n given x, s, and p.
 * Grows double-logarithmically.
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
 */
declare function biPolygonRoot(value: DecimalSource, sides: DecimalSource, zeroValue?: DecimalSource): Decimal;
/**
 * Iterated biPolygon: this function returns the result of applying biPolygon(x, s, p) to 'base' (with the result placed in the x of the next application) 'value' times.
 * Grows tetrationally (increasing value by 1 increases the super-logarithm by around 2). Uses a "linear" approximation for fractional values; I'll admit the approximation used is pretty arbitrary, because I didn't have any better ideas.
 * @param value ( number ! ) The amount of times the biPolygon function is applied.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 * @param base ( Decimal ) The payload used in each application of biPolygon. Default is 2.
 * @param payload ( Decimal ) The value that biPolygon is repeatedly applied to. Default is 2.
 */
declare function triPolygon(value: number, sides: DecimalSource, base?: DecimalSource, payload?: DecimalSource): Decimal;
/**
 * Performs biPolygonRoot on 'payload', 'iterations' times. Equivalent to triPolygon with a negative value.
 * @param payload ( Decimal ! ) The number that's having the bipolygonal root repeatedly taken on.
 * @param iterations ( number ! ) The amount of times the bipolygonal root is taken.
 * @param sides ( Decimal ) The amount of sides on the polygon.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root. Default is 2.
 */
declare function iteratedBiPolygonRoot(payload: DecimalSource, iterations: number, sides: DecimalSource, zeroValue?: DecimalSource): Decimal;
/**
 * Inverse function of triPolygon: for triPolygon(n, s, b, p) = x, this function finds n given x, s, b, and p.
 * Grows super-logarithmically.
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 * @param base ( Decimal ) The b in the above example. Default is 2.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
 */
declare function triPolygonRoot(value: DecimalSource, sides: DecimalSource, base?: DecimalSource, zeroValue?: DecimalSource): Decimal;
/**
 * f0(n) in the Fast-Growing Hierarchy. This is the successor function, f0(n) = n + 1.
 * @param value ( Decimal ) The input to f0.
 */
declare function FGH0(value: DecimalSource): Decimal;
/**
 * The inverse of f0(n) in the Fast-Growing Hierarchy. Equal to n - 1.
 * @param value ( Decimal ) The value that FGH0 will return when given the result of this function.
 */
declare function FGH0inverse(value: DecimalSource): Decimal;
/**
 * Applies FGH0 to 'value' 'times' times. Equivalent to value + times.
 * @param value ( Decimal ) The value to repeatedly apply FGH0 to.
 * @param times ( Decimal ) The amount of times FGH0 is applied to value.
 */
declare function iteratedFGH0(value: DecimalSource, times: DecimalSource): Decimal;
/**
 * Applies FGH0inverse to 'value' 'times' times. Equivalent to value - times.
 * @param value ( Decimal ) The value to repeatedly apply FGH0inverse to.
 * @param times ( Decimal ) The amount of times FGH0inverse is applied to value.
 */
declare function iteratedFGH0inverse(value: DecimalSource, times: DecimalSource): Decimal;
/**
 * f1(n) in the Fast-Growing Hierarchy. f1(n) = f0(f0(f0(f0...(n)))) with n f0's. Since f0() is just adding 1, f1(n) equals n * 2.
 * @param value ( Decimal ) The input to f1.
 */
declare function FGH1(value: DecimalSource): Decimal;
/**
 * The inverse of f1(n) in the Fast-Growing Hierarchy. Equal to n / 2.
 * @param value ( Decimal ) The value that FGH1 will return when given the result of this function.
 */
declare function FGH1inverse(value: DecimalSource): Decimal;
/**
 * Applies FGH1 to 'value' 'times' times. Equivalent to value * 2^times.
 * @param value ( Decimal ) The value to repeatedly apply FGH1 to.
 * @param times ( Decimal ) The amount of times FGH1 is applied to value.
 */
declare function iteratedFGH1(value: DecimalSource, times: DecimalSource): Decimal;
/**
 * One of the inverses of iteratedFGH1: given iteratedFGH1(base, x) = value and knowing what the base and value are, finds x.
 * Equivalent to the base-2 logarithm of (value / base).
 * @param value ( Decimal ) The answer given by iteratedFGH1 when called on the result this inverse outputs.
 * @param base ( Decimal ) The base that iteratedFGH1 is called on with the result this inverse outputs to return the given value.
 */
declare function iteratedFGH1log(value: DecimalSource, base: DecimalSource): Decimal;
/**
 * f2(n) in the Fast-Growing Hierarchy. f2(n) = f1(f1(f1(f1...(n)))) with n f1's. f2(n) = n * 2^n.
 * @param value ( Decimal ) The input to f2.
 */
declare function FGH2(value: DecimalSource): Decimal;
/**
 * The inverse of f2(n) in the Fast-Growing Hierarchy. Similar to the base-2 logarithm for larger numbers.
 * This is basically the Lambert W function, just with a base of 2 instead of e.
 * @param value ( Decimal ) The value that FGH2 will output when given the result of this function.
 */
declare function FGH2inverse(value: DecimalSource): Decimal;
/**
 * Applies FGH2 to 'value' 'times' times. Similar in growth rate to base 2 iteratedexp.
 * @param value ( Decimal ) The value to repeatedly apply FGH2 to.
 * @param times ( number ) The amount of times FGH2 is applied to value.
 */
declare function iteratedFGH2(value: DecimalSource, times: number): Decimal;
/**
 * One of the inverses of iteratedFGH2: given iteratedFGH2(base, x) = value and knowing what the base and value are, finds x.
 * Similar to base 2 slog.
 * @param value ( Decimal ) The answer given by iteratedFGH2 when called on the result this inverse outputs.
 * @param base ( Decimal ) The base that iteratedFGH2 is called on with the result this inverse outputs to return the given value.
 */
declare function iteratedFGH2log(value: DecimalSource, base: DecimalSource): Decimal;
/**
 * f3(n) in the Fast-Growing Hierarchy. f3(n) = f2(f2(f2(f2...(n)))) with n f2's. Grows tetrationally.
 * @param value ( Decimal ) The input to f3.
 */
declare function FGH3(value: DecimalSource): Decimal;
/**
 * The inverse of f3(n) in the Fast-Growing Hierarchy. Similar to super-logarithm.
 * @param value ( Decimal ) The value that FGH3 will output when given the result of this function.
 */
declare function FGH3inverse(value: DecimalSource): Decimal;
/**
 * Applies FGH3 to 'value' 'times' times. Grows pentationally with respect to 'times'.
 * @param value ( Decimal ) The value to repeatedly apply FGH3 to.
 * @param times ( number ) The amount of times FGH3 is applied to value.
 */
declare function iteratedFGH3(value: DecimalSource, times: number): Decimal;
/**
 * One of the inverses of iteratedFGH3: given iteratedFGH3(base, x) = value and knowing what the base and value are, finds x.
 * Similar to penta_log.
 * @param value ( Decimal ) The answer given by iteratedFGH3 when called on the result this inverse outputs.
 * @param base ( Decimal ) The base that iteratedFGH3 is called on with the result this inverse outputs to return the given value.
 */
declare function iteratedFGH3log(value: DecimalSource, base: DecimalSource): Decimal;
declare abstract class Notation {
    //Notation stuff
    format(value: DecimalSource): string;
    formatNegativeDecimal(value: Decimal): string;
    abstract formatDecimal(value: Decimal): string;
    //Parameter stuff
    negativeString: [
        string,
        string
    ];
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
    setNotationGlobals(negativeString?: [
        string,
        string
    ], infinityString?: string, negativeInfinityString?: string | null, NaNString?: string, isInfinite?: ((decimal: Decimal) => boolean)): this;
    /**
     * Changes the name of the Notation, then gives you back the Notation. (i.e. returns this)
     */
    setName(name: string): this;
}
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
declare class DefaultNotation extends Notation {
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
/**
 * Converts a given number into a different base.
 * @param value ( number ! ) The number to be converted.
 * @param base ( number | string[] ! ) This can be either a number or an array of strings. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings.
 * @param placesAbove1 ( number ) The amount of decimal places shown for numbers above 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). This value must be set to zero if negaDigits is -1 or base, as bijective bases do not support non-whole numbers. Default is -4.
 * @param placesBelow1 ( number ) The amount of decimal places shown for numbers below 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). This value must be set to zero if negaDigits is -1 or base, as bijective bases do not support non-whole numbers. Default is -4.
 * @param negaDigits ( number ) How many of the digits are negative? Default is 0, which means the digits are from 0 to (base - 1). For example, if negaDigits is 1, the digits are from -1 to (base - 2). For odd bases, set this to (base - 1)/2 for the "balanced" version of that base. The maximum value of negaDigits is the base itself, and the minimum value is -1 (which results in the bijective version of the base); values outside this range will throw an error. You can't set negaDigits to anything other than 0 or -1 if base is given as a number (rather than an array of strings), since digits for negative numbers are not included in the default set of digits.
 * @param commasMin ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, though this is no different from any value under base^commaSpacing.
 * @param showZeroes ( number ) A positive, zero, or negative number; default is -1. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this is negative, zeroes at the end of the decimal places are not shown. If this is negative infinity, all trailing zeroes are removed, even those before the decimal point.
 * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
 * @param commaSpacing ( number ) How many digits are between each comma. Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param negativeChar ( string ) The character used as the negative sign. Default is "-". There is no negative sign if negaDigits is between 1 and (base - 2); if negaDigits equals (base - 1) or base, the negative sign is used for positive numbers instead of negative numbers.
 * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is however many digits (2^53 - 1) has in that base.
 * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits (though the numeric value of the base remains the same).
 * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
 * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
 * @param concatenation ( null | [boolean, string, string, Notation?] ) This parameter may either be null or an array containing a boolean, then two strings, then optionally a Notation. If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
 * Default is null, i.e. no concatenation occurs.
 */
declare function BaseConvert(value: number, base: number | string[], placesAbove1?: number, placesBelow1?: number, negaDigits?: number, commasMin?: number, showZeroes?: number, reverseDigits?: boolean, commaSpacing?: number, commaChars?: string[], decimalChar?: string, negativeChar?: string, precision?: number, specialDigits?: [
    (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
    string[]
][], concatenation?: null | [
    boolean,
    string,
    string,
    Notation?
]): string;
/**
 * Behaves similarly to DefaultNotation, but supports alternate bases (any whole-number base between 2 and 64, or higher if you provide your own digits) and has more customization.
 * @param base ( number | string[] ! ) This can be either a number or an array of strings. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings.
 * @param negaDigits ( number ) How many of the digits are negative? Default is 0, which means the digits are from 0 to (base - 1). For example, if negaDigits is 1, the digits are from -1 to (base - 2). For odd bases, set this to (base - 1)/2 for the "balanced" version of that base. The maximum value of negaDigits is the base itself, and the minimum value is -1 (which results in the bijective version of the base); values outside this range will throw an error. You can't set negaDigits to anything other than 0 or -1 if base is given as a number (rather than an array of strings), since digits for negative numbers are not included in the default set of digits. Note that if negaDigits equals -1 or negaDigits equals the base, the amount of decimal places when calling format must be 0, as bijective bases do not support non-whole numbers.
 * @param placesAbove1 ( number ) For numbers above 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) For numbers below 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. Default is 0, which means commas are always shown. If this value is negative, commas are never used.
 * @param maxnum ( Decimal ) Numbers greater than or equal to this are converted into scientific notation. Default is base^12.
 * @param minnum ( Decimal ) Numbers less than this are converted into scientific notation. Default is base^-6.
 * @param max_exps_in_a_row ( number ) If the scientific representation would have more "exponential characters" (like the e in usual scientific notation) in the front than this, switches to F notation. Default is 5.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are base and base^^2, if hypermantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F8" would become "100F7" with 1 hypermantissaPower and "(1e100)F6" with 2 hypermantissaPower.
 * @param showZeroes ( number ) A positive, zero, or negative number; default is -1. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this is negative, zeroes at the end of the decimal places are not shown. If this is negative infinity, then trailing zeroes are always removed, even those before the decimal point.
 * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
 * @param commaSpacing ( number ) How many digits are between each comma? Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 1 on it), and expChars[3][1] (expChars[2][1] with a 1 on it). Default is [["$", ""], ["$", ""], ["#", ""], ["#", ""]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is however many digits (2^53 - 1) has in that base.
 * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits (though the numeric value of the base remains the same).
 * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
 * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
 * @param concatenation ( null | [boolean, string, string, Notation?] ) If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
 * Default is null, i.e. no concatenation occurs.
 *
 * This notation does not have an innerNotation parameter.
 */
declare class AlternateBaseNotation extends Notation {
    private _base;
    negaDigits: number;
    placesAbove1: number;
    placesBelow1: number;
    commasMin: Decimal;
    maxnum: Decimal;
    minnum: Decimal;
    max_exps_in_a_row: number;
    mantissaPower: Decimal;
    hypermantissaPower: Decimal;
    showZeroes: number;
    reverseDigits: boolean;
    commaSpacing: number;
    commaChars: string[];
    decimalChar: string;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    hyperexpBefore: boolean;
    precision: number;
    specialDigits: [
        (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
        string[]
    ][];
    concatenation: null | [
        boolean,
        string,
        string,
        Notation?
    ];
    private unconvertedExpChars;
    constructor(base: number | string[], negaDigits?: number, placesAbove1?: number, placesBelow1?: number, commasMin?: DecimalSource, maxnum?: DecimalSource, minnum?: DecimalSource, max_exps_in_a_row?: number, mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, showZeroes?: number, reverseDigits?: boolean, commaSpacing?: number, commaChars?: string[], decimalChar?: string, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, hyperexpBefore?: boolean, precision?: number, specialDigits?: [
        (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
        string[]
    ][], concatenation?: null | [
        boolean,
        string,
        string,
        Notation?
    ]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    /**
     * Returns an array containing the digits of the base.
     */
    get base(): number | string[];
    set base(base: number | string[]);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ]);
}
/**
 * This notation, no matter what you put in, returns a particular string. Used for things like Blind notation.
 * @param str ( string ! ) The string that this notation returns.
 */
declare class PredeterminedNotation extends Notation {
    str: string;
    constructor(str: string);
    format(value: DecimalSource): string;
    name: string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
}
/**
 * Has an array of notations to choose from, selecting one of them to abbreviate the value based on certain conditions.
 *
 * @param specialIncluded ( boolean ! ) If this parameter is true, then special numbers (negatives, infinities, etc.) use the conditions to decide which notation to be abbreviated in as well. If this parameter is false, then negatives use negativeSign and their absolute value as usual, and infinities and NaNs still use their respective strings as usual.
 *
 * After that first argument, this notation can take as many arguments as you want to give it. The arguments are of type [Notation, Decimal -> boolean], i.e. pairs where the first entry of each pair is a Notation and the second is a predicate that takes a Decimal. To abbreviate a Decimal value, this notation starts at the beginning of the arguments, and for each argument it checks whether the value satisfies that argument's predicate; if so, that argument's notation is used to abbreviate the value, otherwise the checking moves on to the next argument. An error is thrown if the value doesn't satisfy any of the predicates.
 */
declare class ConditionalNotation extends Notation {
    specialIncluded: boolean;
    options: [
        Notation,
        (value: Decimal) => boolean
    ][];
    constructor(specialIncluded: boolean, ...options: [
        Notation,
        (value: Decimal) => boolean
    ][]);
    name: string;
    format(value: DecimalSource): string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
}
/**
 * Applies a function to the value, puts a string before it and/or a string after it, then uses InnerNotation to abbreviate the new value.
 * @param DecimalFunc ( Decimal -> Decimal ) The Decimal -> Decimal function that this notation applies before using InnerNotation. Default is the identity function.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param StringFunc ( string -> string ) The string -> string function that this notation applies after using InnerNotation. Default is the identity function.
 * @param nonFiniteApplied ( boolean ) This is false by default; if this is true, then the functions here are applied even to infinities and NaN. If this is false, then the infinityString, negativeInfinityString, and NaNString of the inner notation, not this notation, are used.
 */
declare class AppliedFunctionNotation extends Notation {
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
/**
 * Given an array of sign-value numerals such as Roman numerals, converts the number into that sign-value system. For example, given the Roman numerals themselves, 325 becomes CCCXXV.
 * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
 * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
 * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
 * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
 * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like M(6). Default is ["(", ")"].
 * @param zero ( string ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
declare class SignValueNotation extends Notation {
    private _numerals;
    rounding: Decimal;
    frontToBack: boolean;
    roundType: string;
    max_in_a_row: number;
    separator: string;
    delimiters: [
        string,
        string
    ];
    zero: string;
    innerNotation: Notation;
    constructor(numerals: [
        string,
        DecimalSource
    ][], rounding?: DecimalSource, frontToBack?: boolean, roundType?: string, max_in_a_row?: number, separator?: string, delimiters?: [
        string,
        string
    ], zero?: string, innerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get numerals(): [
        string,
        DecimalSource
    ][];
    set numerals(numerals: [
        string,
        DecimalSource
    ][]);
}
/**
 * A variant of SignValueNotation where the numbers in truncated expressions are themselves notated in this notation. Once the parentheses are deep enough, brackets are introduced to represent the number of parentheses layers, and later on braces are introduced to represent the number of bracket layers.
 * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
 * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
 * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
 * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
 * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
 * @param max_nestingP ( number ) The maximum layers of nesting of parentheses - any more layers and brackets are introduced. Default is 3.
 * @param max_nestingB ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Is the same as maxNestingP by default.
 * @param mantissaPower ( Decimal ) Normally, once brackets are introduced, the number in parentheses is limited to between 1 and the value of the numeral that has the brackets on it, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower, the bounds are (value) and (value^2), and so on. For example, a number represented with Roman numerals as M[VI](I) with 0 mantissaPower becomes M[V](M) with 1 mantissaPower and M[IV](M(M)) with 2 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets and parentheses is limited to between (value of the numeral in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented with Roman numerals as M{V}(M) with 1 hypermantissaPower becomes M{VI}(I) with 0 hypermantissaPower and M{IV}[M](I) with 2 mantissaPower.
 * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
 * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that determine what goes before and after the number in a truncated expression like M(6). The first two strings replace parentheses, the middle two replace brackets, and the last two replace braces. Default is [["(", ")"], ["[", "]"], ["{", "}"]].
 * @param delimiterPermutation ( number ) The order that the numeral, parentheses, brackets, and braces go in when multiple are present. Default is 9, which corresponds to [numeral, braces, brackets, parentheses]. Each value from 0 to 23 represents a different ordering.
 * @param zero ( number ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
 * @param showOnLarge ( [boolean, boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 * showOnLarge[0] is for when parentheses are the highest delimiter, showOnLarge[1] is for when brackets are the highest delimiter, and showOnLarge[2] is for when braces are the highest delimiter.
 *
 * This notation does not have an InnerNotation parameter.
 */
declare class NestedSignValueNotation extends Notation {
    private _numerals;
    rounding: Decimal;
    frontToBack: boolean;
    roundType: string;
    max_in_a_row: number;
    max_nestingP: number;
    max_nestingB: number;
    mantissaPower: Decimal;
    hypermantissaPower: Decimal;
    separator: string;
    delimiters: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    delimiterPermutation: number;
    zero: string;
    showOnLarge: [
        boolean,
        boolean,
        boolean
    ];
    constructor(numerals: [
        string,
        DecimalSource
    ][], rounding?: DecimalSource, frontToBack?: boolean, roundType?: string, max_in_a_row?: number, max_nestingP?: number, max_nestingB?: number, mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, separator?: string, delimiters?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], delimiterPermutation?: number, zero?: string, showOnLarge?: [
        boolean,
        boolean,
        boolean
    ]);
    name: string;
    formatDecimal(value: Decimal): string;
    get numerals(): [
        string,
        DecimalSource
    ][];
    set numerals(numerals: [
        string,
        DecimalSource
    ][]);
}
/**
 * Writes a number as a fraction that approximates its value. (The approximation is found via continued fractions).
 * @param precision ( Decimal ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
 * @param mixedNumber ( boolean ) If this is true, the fractions are written as mixed numbers, i.e. the whole part is separate from the fractional part. Default is false.
 * @param maxIterations ( number ) The approximation will end after this many continued fractions iterations even if the desired precision has not been reached. Default is Infinity.
 * @param maxDenominator ( Decimal ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
 * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
 * @param maxNumerator ( Decimal ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
 * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
 * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of pairs of strings. Each pair of strings is placed around one of the numbers in the fraction to indicate which part of the fraction it is, with the first string in the pair coming before the number and the second string in the pair coming after the number. delimiters[0] goes with the numerator, delimiters[1] goes with the denominator, and delimiters[2] goes with the whole number if mixedNumber is true. Default is [["", ""], ["/", ""], ["", " "]].
 * @param delimiterPermutation ( number ) The order that the parts of the fraction go in. Default is 1, which corresponds to [whole, numerator, denominator]. Each value from 0 to 5 represents a different ordering.
 * @param numeratorInnerNotation ( Notation ) The notation that the numerator, and by default the rest of the fraction as well, is abbreviated in. DefaultNotation is the default.
 * @param wholeInnerNotation ( Notation ) The notation that the whole number in the mixed number fraction is abbreviated with. Is the same as numeratorInnerNotation by default.
 * @param denominatorInnerNotation ( Notation ) The notation that the denominator in the fraction is abbreviated with. Is the same as numeratorInnerNotation by default.
 * @param showUnitDenominator ( boolean ) Controls whether the denominator is displayed even if it's 1. Default is false. For mixed numbers, if this parameter is false, then whole numbers are just abbreviated using wholeInnerNotation directly.
 */
declare class FractionNotation extends Notation {
    precision: Decimal;
    mixedNumber: boolean;
    maxIterations: number;
    maxDenominator: Decimal;
    strictMaxDenominator: boolean;
    maxNumerator: Decimal;
    strictMaxNumerator: boolean;
    delimiters: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    delimiterPermutation: number;
    numeratorInnerNotation: Notation;
    wholeInnerNotation: Notation;
    denominatorInnerNotation: Notation;
    showUnitDenominator: boolean;
    constructor(precision: DecimalSource, mixedNumber?: boolean, maxIterations?: number, maxDenominator?: DecimalSource, strictMaxDenominator?: boolean, maxNumerator?: DecimalSource, strictMaxNumerator?: boolean, delimiters?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], delimiterPermutation?: number, numeratorInnerNotation?: Notation, wholeInnerNotation?: Notation, denominatorInnerNotation?: Notation, showUnitDenominator?: boolean);
    name: string;
    formatDecimal(value: Decimal): string;
}
/**
 * Applies a Decimal -> string function to the inputted Decimal. Basically, you can make your own notation with this.
 * @param func ( Decimal -> string ! ) The Decimal -> string function that this notation runs.
 * @param negativeStringUsed ( boolean ) This parameter is false by default. If it's true, then negative numbers aren't run through func directly - instead, their absolute value is run through func, and then negativeString is put on front.
 * @param infinityStringUsed ( boolean ) This parameter is true by default. If it's true, then infinite numbers aren't run through func - instead, they just use infinityString and negativeInfinityString.
 */
declare class CustomNotation extends Notation {
    func: (value: Decimal) => string;
    negativeStringUsed: boolean;
    infinityStringUsed: boolean;
    constructor(func: (value: Decimal) => string, negativeStringUsed?: boolean, infinityStringUsed?: boolean);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
}
/**
 * Scientific notation. Abbreviates 9 as "9e0" and 10^50 as "1e50". For larger numbers, switches to abbreviations like "e1e17" and eventually "(e^7)1e6", similarly to break_eternity's default toString.
 * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in scientific notation. Default is 1e12.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2e0". Default is false.
 * @param base ( Decimal ) Scientific notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "1e2".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", and expChars[2] takes the place of the (e^) in (e^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class ScientificNotation extends Notation {
    private _maxnum;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    iteration_zero: boolean;
    private _base;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    private _expMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, expMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * This notation performs scientific notation a certain number of times. 1 iteration means the number is in the form AeB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AeBeC, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param base ( Decimal ) Scientific notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "1e2".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", and expChars[2] takes the place of the (e^) in (e^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class ScientificIterationsNotation extends Notation {
    private _iterations;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    _base: Decimal;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    private _expMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, expMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * Abbreviates numbers in terms of their logarithm, so 10^12 is "e12" and 2 is "e0.301".
 * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Logarithm notation, 2 is double Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "lg100".
 * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
 * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class LogarithmNotation extends Notation {
    iterations: number;
    max_es_in_a_row: number;
    private _base;
    negLogBehavior: boolean;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    private _expMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_es_in_a_row?: number, base?: DecimalSource, negLogBehavior?: boolean, expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, expMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
}
/**
 * A variant of logarithm notation that uses a different amount of logarithm iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e12.
 * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiLogarithmNotation extends Notation {
    private _maxnum;
    max_es_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    negLogBehavior: boolean;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    private _expMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_es_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], negLogBehavior?: boolean, expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, expMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
}
/**
 * Uses the names of large numbers to abbreviate them: a million is 1 M, two billion is 2 B, and so on. Larger names use the -illion scheme devised by Jonathan Bowers.
 * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
 * @param longScale ( boolean ) The short scale is used if this is false, the long scale is used if this is true. Default is false.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
 * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 */
declare class StandardNotation extends Notation {
    private _dialect;
    longScale: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _entriesLimit;
    private _charLimit;
    innerNotation: Notation;
    private prefixes; // This object can have different parameters, so I'm making this any type
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
/**
 * Each power of 1,000 gets a letter of the alphabet, so 1,000 is 1a, 55,430,000 is 55.43b, 10^15 is 1e, and so on. aa comes after z, aaa comes after zz.
 * 100A means that there would be 100 lowercase letters in the full expression, 1Aa means 1,000A, 1Ad means (10^12)A, 100B means there would be 100 lowercase letters in an expression beginning with A,
 * 200C means that there would be 200 lowercase letters in an expression beginning with B, and so on. AA comes after Z. 100@ means there would be 100 uppercase letters in a full expression, 1 '@a'
 * (the quotes aren't there, they're just in this explanation to avoid @ doing parameter stuff) means 1,000@, and so on.
 * @param letters ( [string[], string[], string[]] ) An array of three arrays of strings. The first array is the lowercase letters, the second array is the uppercase letters, and the third is the "third letters", of which @ is the only one in the default system. The default setting has the 26 lowercase letters as the first array, the 26 uppercase letters as the second array, and a single-entry array containing only @ as the third array.
 * @param negaLetters ( number | [number, number, number] ) If you think of the letters as being numbers in an alternate base, how many of the digits in the base are negative? Default is -1, which corresponds to a bijective base. 0 would be a regular base, i.e. including a letter for zero.
 * This parameter must be between -1 and (the amount of letters - 2). If this parameter is a single number, then that's the amount of negative letters for all three letter types, but if it's an array then negaLetters[0] is for the lowercase letters, negaLetters[1] is for the uppercase letters, and negaLetters[2] is for the third letters.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param base ( Decimal ) The number that the letters represent powers of. Default is 1,000.
 * @param max_letters ( number ) The highest amount of letters of a single tier - any more, and they're truncated into the next tier. Default is 12.
 * @param between ( string ) This string goes between the number and the letters. Default is the empty string.
 * @param separator ( string ) This string goes between each letter. Default is the empty string.
 * @param hyperseparator ( string ) This string goes between each tier of letters. Default is the empty string.
 * @param alwaysHyperseparate ( boolean ) If this parameter is true, hyperseparators appear for every letter tier after the first non-empty one, even if some of the later ones are empty (and thus would normally skip their hyperseparator). Default is false.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param lettersOrder ( number ) The order that the different types of letters go in when multiple are present. Default is 0, which corresponds to [third, uppercase, lowercase]. Each value from 0 to 5 represents a different ordering.
 * @param reverseLetters ( boolean ) If this is true, the letters of a single type are written right to left instead of left to right. Default is false.
 * @param mantissaAfter ( boolean ) If this is true, the number comes after all the letters instead of before. Default is false.
 * @param divisionChar ( [string, string] ) The strings used to represent that the letter expression is actually its reciprocal (for numbers below 1); divisionChar[0] goes before the letter expression, divisionChar[1] goes after the letter expression. Default is ["/", ""].
 * @param specialLetters ( [[(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][]] )
 * An array of three arrays of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different letters (though the amount of letters remains the same). specialLetters[0] is for the lowercase letters, specialLetters[1] is for the uppercase letters, and specialLetters[2] is for the third letters.
 * The function's arguments are the place value of the letter (the last place is place value 0), the letter's distance from the leftmost letter, and the "value" of that letter string (a is 1, z is 26, aa is 27, etc.), and the function returns true if this letter is to use that set of special letters instead of the normal ones; the string array is the set of special letters to be used.
 * Earlier entries in specialLetters take priority, reverting back to the regular letters if none of the special letters apply or if the one that does apply doesn't have enough entries to represent that letter.
 * @param fixedLetters ( [[number, string][], [number, string][], [number, string][]] ) If the value of the letter string matches any of the numbers in that letter type's array in here (fixedLetters[0] is for the lowercase letters, fixedLetters[1] is for the uppercase letters, fixedLetters[2] is for the third letters), the regular letters are not used - instead, the letter string is just set to that number's corresponding string in this array. Default is [[], [], []], i.e. there are no fixed letters.
 * @param concatenation ( [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]] ) concatenation[0] is for lowercase letters, concatenation[1] is for uppercase letters, concatenation[2] is for third letters.
 * If a concatenation entry is not null, then when multiple of the same letter of a single tier are adjacent, they'll be concatenated into a single letter with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[n][1] and concatenation[n][2] are placed before and after the concatenation number. If concatenation[n][3] is undefined, the concatenation number is written as a letter string itself, otherwise it's written in whatever notation is given. If concatenation[n][0] is true, then the concatenation number comes after the letter being concatenated, otherwise it comes before.
 * Default is [null, null, null], i.e. no concatenation occurs.
 */
declare class LettersNotation extends Notation {
    private _letters;
    private _negaLetters;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _base;
    private _max_letters;
    between: string;
    separator: string;
    hyperseparator: string;
    alwaysHyperseparate: boolean;
    innerNotation: Notation;
    lettersOrder: number;
    reverseLetters: boolean;
    mantissaAfter: boolean;
    divisionChar: [
        string,
        string
    ];
    specialLetters: [
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][]
    ];
    fixedLetters: [
        [
            number,
            string
        ][],
        [
            number,
            string
        ][],
        [
            number,
            string
        ][]
    ];
    concatenation: [
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ]
    ];
    constructor(letters?: [
        string[],
        string[],
        string[]
    ], negaLetters?: number | [
        number,
        number,
        number
    ], rounding?: DecimalSource | ((value: Decimal) => Decimal), base?: DecimalSource, max_letters?: number, between?: string, separator?: string, hyperseparator?: string, alwaysHyperseparate?: boolean, innerNotation?: Notation, lettersOrder?: number, reverseLetters?: boolean, mantissaAfter?: boolean, divisionChar?: [
        string,
        string
    ], specialLetters?: [
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][]
    ], fixedLetters?: [
        [
            number,
            string
        ][],
        [
            number,
            string
        ][],
        [
            number,
            string
        ][]
    ], concatenation?: [
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ]
    ]);
    name: string;
    formatDecimal(value: Decimal): string;
    get letters(): [
        string[],
        string[],
        string[]
    ];
    set letters(letters: [
        string[],
        string[],
        string[]
    ]);
    get negaLetters(): number | [
        number,
        number,
        number
    ];
    set negaLetters(negaLetters: number | [
        number,
        number,
        number
    ]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get max_letters(): number;
    set max_letters(max_letters: number);
}
/**
 * Scientific notation, but with tetration instead of exponentiation. Abbreviates 9 as "9F0", 1,000 as "3F1", and 10^10^10^10 as "1F4".
 * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in hyperscientific notation. Default is 1e10.
 * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2F0". Default is false.
 * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is true.
 * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class HyperscientificNotation extends Notation {
    private _maxnum;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    private _mantissaPower;
    iteration_zero: boolean;
    private _base;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get mantissaPower(): DecimalSource;
    set mantissaPower(mantissaPower: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * This notation performs hyperscientific notation a certain number of times. 1 iteration means the number is in the form AFB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AFBFC, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
 * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is false.
 * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class HyperscientificIterationsNotation extends Notation {
    private _iterations;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    private _base;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get iterations(): number;
    set iterations(iterations: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * Abbreviates numbers in terms of their super-logarithm, so 10 is "F1" and 10^10^10 is "F3". Uses the linear approximation of tetration.
 * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Super-Logarithm notation, 2 is double Super-Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "slg10,000,000,000".
 * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
 * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
 * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class SuperLogarithmNotation extends Notation {
    private _iterations;
    max_Fs_in_a_row: number;
    private _base;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_Fs_in_a_row?: number, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
}
/**
 * A variant of super-logarithm notation that uses a different amount of super-logarithm iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
 * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
 * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiSuperLogarithmNotation extends Notation {
    private _maxnum;
    max_Fs_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    formatNegatives: boolean;
    private _expMult;
    private _hyperexpMult;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_Fs_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, formatNegatives?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
}
/**
 * The progression of this notation is similar to Default notation: unabbreviated, then scientific, then hyperscientific. However, this notation is not itself a default: instead, it lets you customize the process.
 * @param maxnum ( Decimal ) The point at which the notation switches to scientific. Default is 1e12.
 * @param minnum ( Decimal ) The point below 1 at which the notation switches to scientific with a negative exponent. Default is 1e-6.
 * @param max_es_in_a_row ( number ) If the scientific representation would have more e's than this, switches to F notation. Default is 5.
 * @param logBase ( Decimal ) The base of the scientific notation. Default is 10.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are base and base^^2, if hypermantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F8" would become "100F7" with 1 hypermantissaPower and "(1e100)F6" with 2 hypermantissaPower.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param hyperengineerings ( Decimal | DecimalSource[] ) Same as engineerings, but for the hyperexponent instead.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 1 on it), and expChars[3][1] (expChars[2][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["F", ""], ["F", ""]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
 * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
 * @param mantissaInnerNotation ( Notation ) The notation that the mantissa is itself notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param hyperexpFormat ( [boolean, boolean] ) A pair of booleans that determines whether the numbers in a hyperscientific expression are notated using ExpandedDefaultNotation itself rather than the innerNotations. The first entry is for the mantissa, the second is for the hyperexponent. This only applies to "xFy" expressions; "Fx" expressions (where x is over the maxnum) always formats x in ExpandedDefaultNotation itself. Default is [false, false].
 */
declare class ExpandedDefaultNotation extends Notation {
    private _maxnum;
    private _minnum;
    max_es_in_a_row: number;
    private _logBase;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    mantissaPower: Decimal;
    private _hypermantissaPower;
    private _engineerings;
    private _hyperengineerings;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    hyperexpBefore: boolean;
    private _expMult;
    private _hyperexpMult;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    hyperexpFormat: [
        boolean,
        boolean
    ];
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, minnum?: DecimalSource, max_es_in_a_row?: number, logBase?: DecimalSource, rounding?: DecimalSource | ((value: Decimal) => Decimal), mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, engineerings?: DecimalSource[], hyperengineerings?: DecimalSource[], expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, hyperexpBefore?: boolean, expMult?: DecimalSource, hyperexpMult?: DecimalSource, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, hyperexpFormat?: [
        boolean,
        boolean
    ]);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get minnum(): DecimalSource;
    set minnum(minnum: DecimalSource);
    get logBase(): DecimalSource;
    set logBase(logBase: DecimalSource);
    get hypermantissaPower(): DecimalSource;
    set hypermantissaPower(hypermantissaPower: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get hyperengineerings(): DecimalSource | DecimalSource[];
    set hyperengineerings(hyperengineerings: DecimalSource | DecimalSource[]);
    get expMult(): DecimalSource;
    set expMult(expMult: DecimalSource);
    get hyperexpMult(): DecimalSource;
    set hyperexpMult(hyperexpMult: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ]);
}
/**
 * Abbreviates a number using the SI prefixes: 1,000 is 1 k, 10^12 is 1 T, 10^30 is 1 Q, 10^33 is 1 kQ, 10^72 is 1 TQQ, 10^300 is 1 Q[10], and so on.
 * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Q[6]. Default is ["[", "]"].
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
declare class SINotation extends Notation {
    private _logBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    mantissaPower: Decimal;
    space: string;
    separator: string;
    delimiters: [
        string,
        string
    ];
    zero: string;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    constructor(logBase?: DecimalSource, prefixes?: [
        string,
        DecimalSource
    ][], negaPrefixes?: [
        string,
        DecimalSource
    ][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, mantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [
        string,
        string
    ], zero?: string, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get logBase(): DecimalSource;
    set logBase(logBase: DecimalSource);
    get prefixes(): [
        string,
        DecimalSource
    ][];
    set prefixes(prefixes: [
        string,
        DecimalSource
    ][]);
    get negaPrefixes(): [
        string,
        DecimalSource
    ][] | string;
    set negaPrefixes(negaPrefixes: [
        string,
        DecimalSource
    ][] | string);
}
/**
 * A variant of SINotation where the numbers in truncated expressions are themselves notated in this notation. Once the brackets are deep enough, braces are introduced to represent the number of brackets layers.
 * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
 * @param max_nesting ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Default is 3.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
 * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets is limited to between (value of the prefix in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented as Q{5}(10) with 0 hypermantissaPower becomes Q{4}(1 Q[10]) with 0 hypermantissaPower and Q{4}(Q[1 Q[10]]) with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [[string, string], [string, string]] ) An array of two pairs of strings that determine what goes before and after the number in a truncated expression like Q[6]. The first two strings replace brackets, the last two replace braces. Default is [["[", "]"], ["{", "}"]].
 * @param delimiterPermutation ( number ) The order that the numeral, brackets, and braces go in when multiple are present. Default is 3, which corresponds to [numeral, braces, brackets]. Each value from 0 to 5 represents a different ordering.
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param showOnLarge ( [boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 * showOnLarge[0] is for when brackets are the highest delimiter, showOnLarge[1] is for when braces are the highest delimiter.
 */
declare class NestedSINotation extends Notation {
    private _logBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    private _max_nesting;
    mantissaPower: Decimal;
    private _hypermantissaPower;
    space: string;
    separator: string;
    delimiters: [
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    delimiterPermutation: number;
    zero: string;
    innerNotation: Notation;
    showOnLarge: [
        boolean,
        boolean
    ];
    constructor(logBase?: DecimalSource, prefixes?: [
        string,
        DecimalSource
    ][], negaPrefixes?: [
        string,
        DecimalSource
    ][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, max_nesting?: number, mantissaPower?: DecimalSource, hypermantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], delimiterPermutation?: number, zero?: string, innerNotation?: Notation, showOnLarge?: [
        boolean,
        boolean
    ]);
    name: string;
    formatDecimal(value: Decimal): string;
    get logBase(): DecimalSource;
    set logBase(logBase: DecimalSource);
    get prefixes(): [
        string,
        DecimalSource
    ][];
    set prefixes(prefixes: [
        string,
        DecimalSource
    ][]);
    get negaPrefixes(): [
        string,
        DecimalSource
    ][] | string;
    set negaPrefixes(negaPrefixes: [
        string,
        DecimalSource
    ][] | string);
    get hypermantissaPower(): DecimalSource;
    set hypermantissaPower(hypermantissaPower: DecimalSource);
    get max_nesting(): number;
    set max_nesting(max_nesting: number);
}
/**
 * Abbreviates a number using "hyper-SI" prefixes that represent the tetra-powers of 10: 10 is 1 Pl, 100 is 2 Pl, 10^9 is 9 Pl, 10^10 is 1 Dg, 10^100 is 2 Dg, 10^10^9 is 9 Dg, 10^10^10 is 1 Bi, and so on. It's similar to hyperscientific, but with the hyper-exponent replaced by an equivalent prefix abbreviation.
 * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (slogBase) and (slogBase^smallest prefix), at 2 mantissaPower the bounds are (slogBase^slogBase) and (slogBase^slogBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
 */
declare class HyperSINotation extends Notation {
    private _slogBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    private _mantissaPower;
    space: string;
    separator: string;
    delimiters: [
        string,
        string
    ];
    zero: string;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    constructor(slogBase?: DecimalSource, prefixes?: [
        string,
        DecimalSource
    ][], negaPrefixes?: [
        string,
        DecimalSource
    ][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, mantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [
        string,
        string
    ], zero?: string, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get slogBase(): DecimalSource;
    set slogBase(slogBase: DecimalSource);
    get prefixes(): [
        string,
        DecimalSource
    ][];
    set prefixes(prefixes: [
        string,
        DecimalSource
    ][]);
    get negaPrefixes(): [
        string,
        DecimalSource
    ][] | string;
    set negaPrefixes(negaPrefixes: [
        string,
        DecimalSource
    ][] | string);
    get mantissaPower(): DecimalSource;
    set mantissaPower(mantissaPower: DecimalSource);
}
/**
 * A variant of HyperSINotation where the numbers in truncated expressions are themselves notated in this notation.
 * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
 * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
 * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
 * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
 * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase^smallest prefix), at 2 mantissaPower the bounds are (logBase^logBase) and (logBase^logBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
 * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
 * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
 * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
 * @param delimitersBefore ( boolean ) If this is true, the number and delimiters in a truncated expression go before the prefix instead of after. Default is false.
 * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
 * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
 * @param showOnLarge ( boolean ) This parameter shows whether the numeral that the delimiters are placed on is shown - if it's true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
 */
declare class NestedHyperSINotation extends Notation {
    private _slogBase;
    private _prefixes;
    private _negaPrefixes;
    frontToBack: boolean;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    max_in_a_row: number;
    private _mantissaPower;
    space: string;
    separator: string;
    delimiters: [
        string,
        string
    ];
    delimitersBefore: boolean;
    zero: string;
    innerNotation: Notation;
    showOnLarge: boolean;
    constructor(slogBase?: DecimalSource, prefixes?: [
        string,
        DecimalSource
    ][], negaPrefixes?: [
        string,
        DecimalSource
    ][] | string, frontToBack?: boolean, rounding?: DecimalSource | ((value: Decimal) => Decimal), max_in_a_row?: number, mantissaPower?: DecimalSource, space?: string, separator?: string, delimiters?: [
        string,
        string
    ], delimitersBefore?: boolean, zero?: string, innerNotation?: Notation, showOnLarge?: boolean);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get slogBase(): DecimalSource;
    set slogBase(slogBase: DecimalSource);
    get prefixes(): [
        string,
        DecimalSource
    ][];
    set prefixes(prefixes: [
        string,
        DecimalSource
    ][]);
    get negaPrefixes(): [
        string,
        DecimalSource
    ][] | string;
    set negaPrefixes(negaPrefixes: [
        string,
        DecimalSource
    ][] | string);
    get mantissaPower(): DecimalSource;
    set mantissaPower(mantissaPower: DecimalSource);
}
/**
 * Uses Donald Knuth's -yllion proposal to abbreviate numbers. In this system, rather than each power of 1,000 getting a new name, each new number name after a hundred is the square of the previous one.
 * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param lowestAbbreviated The smallest -yllion that gets abbreviated - numbers below this -yllion are written out in full. Default is 1, i.e. a myllion, i.e. 10^8. Set this to 0 to have a myriad (10^4) get abbreviated too, set this to 2 to make a myllion also be written out but a byllion still be abbreviated, and so on. Do not set this parameter to anything below 0 or higher than 6.
 * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
 * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. Default is an AlternateBaseNotation that still works in base 10, but used the myriad system's commas instead of the usual commas.
 */
declare class MyriadNotation extends Notation {
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
/**
 * Abbreviates a number by splitting it into hyperoperators like how OmegaNum does, except there's an exponentiation entry between the mantissa and the tetration entry.
 * @param delimiters ( [string, string][] ) An array of pairs of strings. Each pair of strings is placed around one of the numbers in the split to indicate which hyperoperator it is, with the first string in the pair coming before the number and the second string in the pair coming after the number. delimiters[0] goes with the mantissa, delimiters[1] goes with the exponent, delimiters[2] goes with the tetration, delimiters[3] goes with the pentation. Default is [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", ") "]]. If there are less than four entries, the remaining entries are filled in with empty strings.
 * @param base ( Decimal ) The base of the exponentiation, tetration, and pentation. Default is 10.
 * @param maximums ( Decimal | Decimal[] ) The largest allowed values for each operator: anything equal to or above this rolls over to the next operator. maximums[0] is the mantissa limit, maximums[1] is the exponent limit, maximums[2] is the tetration limit. Default is [10, 10, 10], where that 10 is whatever the base is. Setting the mantissa maximum to 0 or either of the other two maximums to 1 (actually, anything less than or equal to its corresponding expMult) will effectively disable that operator: for example, if maximums[1] is 1, then exponentiation is effectively excluded from the operators. If just one Decimal is given rather than an array, all three maximums are the same. If there are less than three entries, the last entry is copied to fill the remaining ones.
 * @param showZeroes ( number | number[] ) This parameter controls whether hyperoperators in the split with a value of 0 are shown or not. Default is [1, -1, -1, -1], where for each operator, a positive value means it's always shown even if zero, a negative value means it's not shown if it's zero, and a 0 means it's shown when it's zero but only if a higher hyperoperator is nonzero. If only one number is given rather than an array, then the latter three entries all become that value, but the mantissa's showZeroes always defaults to 1 unless you directly change it with an array. If there are less than four entries, the last entry is copied to fill the remaining ones.
 * @param delimiterPermutation ( number ) The order that the hyperoperators go in when multiple are present. The default is 1, which corresponds to [pentation, tetration, mantissa, exponent]. Each value from 0 to 23 represents a different ordering.
 * @param originalMaximums ( Decimal | Decimal[] ) These are the maximums that apply when the next operator is 0: for example, if maximums is [10, 10, 10] but originalMaximums is [100, 10, 10], then the mantissa can go up to 100 before exponents begin but once the exponent has begun increasing then the mantissa is limited to 10 (this applies even if tetration or pentation is above 0, as long as exponent is still 0). Is the same as maximums by default.
 * @param minnum ( Decimal ) Values above this and below maximums[0] will just return [value, 0, 0, 0] instead of doing any splitting; this prevents small-but-not-too-small values like 2 from forcing negative exponents. Default is 1. Set this value to a negative number to disable this functionality.
 * @param mantissaRounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param innerNotations ( Notation | Notations[] ) The notations that the numbers are themselves notated with. Has up to four entries, corresponding to the mantissa, exponent, tetration, and pentation in that order. The default is for DefaultNotation to be used for all four. If this is just a single Notation instead of an array, all four hyperoperators use the same innerNotation. If there are less than four entries, the last entry is copied to fill the remaining ones.
 * @param engineerings ( Decimal | [Decimal | Decimal[], Decimal | Decimal[], Decimal | Decimal[]] ) An array of three arrays of Decimals, each of which may potentially be just a single Decimal instead of an array of them. These behave like the engineerings parameter in other notations; the first entry is for exponentiation, the second is for tetration, the third is for pentation. You may make this a single Decimal instead of an array at all to give all three the same single engineering value, but you can't make a single array to give to all three because an array of single Decimals uses "different single values for each of the three hyperoperators" rather than "the same array for all three hyperoperators"... in other words, if you use an array, the upper-level array needs to have three entries, one for each non-mantissa hyperoperator in the split, and each entry of this three-entry array behaves as an engineerings parameter. Default is [[1], [1], [1]], and if less than three entries are provided, the remaining ones are set to [1].
 * @param expMultipliers ( Decimal | Decimal[] ) An array of up to three Decimals which multiply the exponent, tetration, and pentation respectively; this multiplication happens once to start and one more time between each application of the next hyperoperator. Default is [1, 1, 1]. If just one Decimal is given rather than an array, all three multipliers are the same. If there are less than three entries, the remaining ones are set to 1.
 */
declare class HypersplitNotation extends Notation {
    private _delimiters;
    private _base;
    private _maximums;
    private _showZeroes;
    delimiterPermutation: number;
    private _originalMaximums;
    minnum: Decimal;
    mantissaRounding: DecimalSource | ((value: Decimal) => Decimal);
    private _innerNotations;
    private _engineerings;
    private _expMultipliers;
    constructor(delimiters?: [
        string,
        string
    ][], base?: DecimalSource, maximums?: DecimalSource | DecimalSource[], showZeroes?: number | number[], delimiterPermutation?: number, originalMaximums?: DecimalSource | DecimalSource[], minnum?: DecimalSource, mantissaRounding?: DecimalSource | ((value: Decimal) => Decimal), innerNotations?: Notation | Notation[], engineerings?: DecimalSource | [
        DecimalSource | DecimalSource[],
        DecimalSource | DecimalSource[],
        DecimalSource | DecimalSource[]
    ], expMultipliers?: DecimalSource | DecimalSource[]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get delimiters(): [
        string,
        string
    ][];
    set delimiters(delimiters: [
        string,
        string
    ][]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get maximums(): DecimalSource | DecimalSource[];
    set maximums(maximums: DecimalSource | DecimalSource[]);
    get showZeroes(): number | number[];
    set showZeroes(showZeroes: number | number[]);
    get originalMaximums(): DecimalSource | DecimalSource[];
    set originalMaximums(originalMaximums: DecimalSource | DecimalSource[]);
    get innerNotations(): Notation | Notation[];
    set innerNotations(innerNotations: Notation | Notation[]);
    get engineerings(): DecimalSource | [
        DecimalSource | DecimalSource[],
        DecimalSource | DecimalSource[],
        DecimalSource | DecimalSource[]
    ];
    set engineerings(input: DecimalSource | [
        DecimalSource | DecimalSource[],
        DecimalSource | DecimalSource[],
        DecimalSource | DecimalSource[]
    ]);
    get expMultipliers(): DecimalSource | DecimalSource[];
    set expMultipliers(expMultipliers: DecimalSource | DecimalSource[]);
}
/**
 * Represents numbers in terms of factorials, so 24 is "4!" and 720 is "6!".
 * @param iterations ( number ) The amount of factorial iterations: 1 is factorial notation, 2 is double factorial (as in (x!)!, not the other meaning of "multifactorial"), and so on. This can be negative: with -1 iterations, 4 would be "24¡".
 * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
 */
declare class FactorialNotation extends Notation {
    iterations: number;
    private _max_in_a_row;
    factorialChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    constructor(iterations?: number, max_in_a_row?: number, factorialChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, innerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
}
/**
 * A variant of factorial notation that uses a different amount of factorial iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 3628800, i.e. 10!.
 * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of factorial iterations. Default is 1.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiFactorialNotation extends Notation {
    private _maxnum;
    private _max_in_a_row;
    minIterations: number;
    private _engineerings;
    factorialChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, engineerings?: DecimalSource | DecimalSource[], factorialChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, innerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
}
/**
 * Like scientific notation, but with factorials instead of exponents. Abbreviates 12 as "2 * 3!" and 16! as "1 * 16!". For larger numbers, switches to abbreviations like "(8 * 17!)!" and eventually "(!5)5.6 * 7!", the latter of which means "start with 5.6 * 7! and take the factorial of it 5 times".
 * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-scientific notation. Default is 3628800.
 * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 1 to just be abbreviated as "1" instead of "1 * 1!". Default is false.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / ", "!"], ["1 / ", ""]].
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class FactorialScientificNotation extends Notation {
    private _maxnum;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    iteration_zero: boolean;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * This notation performs factorial-scientific notation a certain number of times. 1 iteration means the number is in the form A * B! (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A * (B * C!)!, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / (", ")!"], ["1 / ", ""]].
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class FactorialScientificIterationsNotation extends Notation {
    private _iterations;
    max_es_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    _engineerings: Decimal[];
    mantissaPower: Decimal;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_es_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * Like hyperscientific notation, but with repeated factorials instead of tetration. For example, 6 (3!) could be 3!1, 4!2 means 4!! (which is around 6.2e23), and 7!20 means 7!!!!!!... with 20 !'s.
 * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-hyperscientific notation. Default is 3628800.
 * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param limit ( Decimal ) If the mantissa is below the limit, a factorial is removed to bring the mantissa back above the limit. Default is 3.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 6 to just be abbreviated as "6" instead of "3!1". Default is false.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class FactorialHyperscientificNotation extends Notation {
    maxnum: Decimal;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    private _limit;
    iteration_zero: boolean;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], limit?: DecimalSource, iteration_zero?: boolean, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get limit(): DecimalSource;
    set limit(limit: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * This notation performs factorial-hyperscientific notation a certain number of times. 1 iteration means the number is in the form A!B (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A!B!C, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param limit ( Decimal ) If the mantissa is equal to or above the limit, another factorial is taken to bring the mantissa back above the limit. Default is 3.
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class FactorialHyperscientificIterationsNotation extends Notation {
    private _iterations;
    max_Fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    private _limit;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_Fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], limit?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get limit(): DecimalSource;
    set limit(limit: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * Abbreviates numbers in terms of how many times you'd have to apply factorial to 3 to get to them, so 3 is 3!0, 6 is 3!1, and 720 is 3!2.
 * @param iterations ( number ) The amount of factorial-amount iterations.
 * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
 * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class FactorialAmountNotation extends Notation {
    private _iterations;
    private _max_in_a_row;
    private _base;
    factorialChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_in_a_row?: number, base?: DecimalSource, factorialChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
}
/**
 * A variant of factorial amount notation that uses a different amount of iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiFactorialAmountNotation extends Notation {
    private _maxnum;
    _max_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    factorialChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], factorialChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get max_in_a_row(): number;
    set max_in_a_row(max_in_a_row: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
}
/**
 * Converts a given number into the "factoradic base", where the place values are the factorial numbers, which means each digit can go one value higher than the previous.
 * @param value ( number ! ) The number to be converted.
 * @param digitList ( string[] ) An array of strings taken as the digits of the base. Default is the default 64 digits: 0-9, then A-Z, then a-z, then +, then /.
 * @param placesAbove1 ( number ) The amount of decimal places shown for numbers above 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) The amount of decimal places shown for numbers below 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commasMin ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, though this is no different from any value under base^commaSpacing.
 * @param showZeroes ( number ) A positive, zero, or negative number; default is -1. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this is negative, zeroes at the end of the decimal places are not shown. If this is negative infinity, all trailing zeroes are removed, even those before the decimal point.
 * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
 * @param commaSpacing ( number ) How many digits are between each comma. Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param negativeChar ( string ) The character used as the negative sign. Default is "-". There is no negative sign if negaDigits is between 1 and (base - 2); if negaDigits equals (base - 1) or base, the negative sign is used for positive numbers instead of negative numbers.
 * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is 18.
 * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits.
 * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
 * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
 * @param concatenation ( null | [boolean, string, string, Notation?] ) This parameter may either be null or an array containing a boolean, then two strings, then optionally a Notation. If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
 * Default is null, i.e. no concatenation occurs.
 * @returns The number in the given base as a string.
 */
declare function FactoradicConvert(value: number, digitList?: string[], placesAbove1?: number, placesBelow1?: number, commasMin?: number, showZeroes?: number, reverseDigits?: boolean, commaSpacing?: number, commaChars?: string[], decimalChar?: string, negativeChar?: string, precision?: number, specialDigits?: [
    (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
    string[]
][], concatenation?: null | [
    boolean,
    string,
    string,
    Notation?
]): string;
/**
 * Abbreviates a given number in the "factoradic base", where the place values are the factorial numbers, which means each digit can go one value higher than the previous. Behaves like AlternateBaseNotation for larger numbers, but with factorials instead of powers.
 * @param digitList ( string[] ) An array of strings taken as the digits of the base. Default is the default 64 digits: 0-9, then A-Z, then a-z, then +, then /.
 * @param hyperBase ( Decimal ) The base used for the hyperscientific stage of the notation. Default is 720.
 * @param placesAbove1 ( number ) For numbers above 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) For numbers below 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. Default is 0, which means commas are always shown. If this value is negative, commas are never used.
 * @param maxnum ( Decimal ) Numbers greater than or equal to this are converted into scientific notation. Default is 1307674368000 (15!).
 * @param minnum ( Decimal ) Numbers less than this are converted into scientific notation. Default is 1 / 362880 (1 / 9!).
 * @param max_exps_in_a_row ( number ) If the scientific representation would have more "exponential characters" (Which defaults to $) than this, switches to the hyperscientific stage of the notation. Default is 5.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in factorial-scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, a number normally represented as "1$15", would become "15$14" with 1 mantissaPower and "210$13" with 2 mantissaPower.
 * @param showZeroes ( number ) A positive, zero, or negative number. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this negative, zeroes at the end of the decimal places are not shown. Default is -1.
 * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
 * @param commaSpacing ( number ) How many digits are between each comma? Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 'b' on it, where 'b' is however hyperBase is formatted in this notation), and expChars[3][1] (expChars[2][1] with a 'b' on it, where 'b' is however hyperBase is formatted in this notation). Default is [["$", ""], [false, ""], ["!", ""], [false, ""]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [true, "1 / "], where that 1 is replaced with whatever digitList[1] is.
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
 * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is 18.
 * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits.
 * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
 * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
 * @param concatenation ( null | [boolean, string, string, Notation?] ) If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
 * Default is null, i.e. no concatenation occurs.
 *
 * This notation does not have an innerNotation parameter.
 */
declare class FactoradicNotation extends Notation {
    digitList: string[];
    hyperBase: Decimal;
    placesAbove1: number;
    placesBelow1: number;
    commasMin: Decimal;
    maxnum: Decimal;
    minnum: Decimal;
    max_exps_in_a_row: number;
    mantissaPower: Decimal;
    showZeroes: number;
    reverseDigits: boolean;
    commaSpacing: number;
    commaChars: string[];
    decimalChar: string;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    hyperexpBefore: boolean;
    precision: number;
    specialDigits: [
        (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
        string[]
    ][];
    concatenation: null | [
        boolean,
        string,
        string,
        Notation?
    ];
    private unconvertedExpChars;
    constructor(digitList?: string[], hyperBase?: DecimalSource, placesAbove1?: number, placesBelow1?: number, commasMin?: DecimalSource, maxnum?: DecimalSource, minnum?: DecimalSource, max_exps_in_a_row?: number, mantissaPower?: DecimalSource, showZeroes?: number, reverseDigits?: boolean, commaSpacing?: number, commaChars?: string[], decimalChar?: string, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, hyperexpBefore?: boolean, precision?: number, specialDigits?: [
        (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
        string[]
    ][], concatenation?: null | [
        boolean,
        string,
        string,
        Notation?
    ]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ]
    ]);
}
/**
 * Abbreviates numbers in terms of a root; this is the square root by default, so 64 is 8^2 and 10,000 is 100^2.
 * @param height ( Decimal ) The height of the root. Default is 2.
 * @param iterations ( Decimal ) The amount of root iterations: 1 is regular Root notation, 2 means the root is taken twice, and so on. This can be negative: for example, with -1 iterations, 13 would be "√(169)"
 * @param max_in_a_row ( number ) If there are more root iterations than this, then the ^b's are made into a ^b^n expression. Default is 5.
 * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
 * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null ) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
 * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param heightInnerNotation ( Notation ) The notation that the height within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class RootNotation extends Notation {
    height: Decimal;
    iterations: Decimal;
    max_in_a_row: number;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    heightInnerNotation: Notation;
    constructor(height?: DecimalSource, iterations?: DecimalSource, max_Fs_in_a_row?: number, rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, heightInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
}
/**
 * A variant of root notation that uses a different root height depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 10000.
 * @param minHeight ( Decimal ) The minimum root height. Default is 2.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
 * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null ) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
 * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param heightInnerNotation ( Notation ) The notation that the height within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class IncreasingRootNotation extends Notation {
    private _maxnum;
    minHeight: Decimal;
    private _engineerings;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ] | null;
    heightShown: number;
    innerNotation: Notation;
    heightInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, minHeight?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ] | null, heightShown?: number, innerNotation?: Notation, heightInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * A variant of root notation that uses a different amount of root iterations depending on how large the number is. Once the amount of iterations gets too high, we go to a higher layer where the amount of iterations is itself written in this notation, and repeat that layering process for larger and larger numbers.
 * @param height ( Decimal ) The height of the root. Default is 2.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 10000.
 * @param max_iterations_in_a_row ( number ) If there are more root iterations than this, then the ^b's are made into a ^b^n expression. Default is 5.
 * @param minIterations ( Decimal ) The minimum amount of root iterations. Default is 1.
 * @param maxIterations ( Decimal ) The amount of root iterations must be less than this: anything higher and the layer is increased. Default is 10000.
 * @param layerBase ( Decimal ) The number that we're repeatedly taking the root of on higher layers. Default is equal to the height so that the power tower is filled with one number instead of two alternating numbers.
 * @param max_layers_in_a_row ( number ) If there are more root iterations than this, then the ^b^h's are made into a (^b^h)^n expression. Default is 3.
 * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the iteration amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param layerEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of layers: if it's three then the layer amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted layer amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
 * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
 * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
 * @param layerChars ( [string, string] ) A pair of strings that represent an additional layer: the first string is placed before the number, the second is placed afterwards. Default is ["", "^b^h"], where b is layerBase and h is height.
 * @param layerAfter ( boolean ) This is false by default; if it's true, the layerChars come after the number instead of before.
 * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param heightInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiRootNotation extends Notation {
    height: Decimal;
    maxnum: Decimal;
    max_iterations_in_a_row: number;
    minIterations: Decimal;
    maxIterations: Decimal;
    layerBase: Decimal;
    max_layers_in_a_row: number;
    private _iterationEngineerings;
    private _layerEngineerings;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ] | null;
    superexpAfter: boolean;
    layerChars: [
        string,
        string
    ] | null;
    layerAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    heightInnerNotation: Notation;
    constructor(height?: DecimalSource, maxnum?: DecimalSource, max_iterations_in_a_row?: number, minIterations?: DecimalSource, maxIterations?: DecimalSource, layerBase?: DecimalSource, max_layers_in_a_row?: number, iterationEngineerings?: DecimalSource | DecimalSource[], layerEngineerings?: DecimalSource | DecimalSource[], rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ] | null
    ] | null, superexpAfter?: boolean, layerChars?: [
        string,
        string
    ] | null, layerAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, heightInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterationEngineerings(): DecimalSource | DecimalSource[];
    set iterationEngineerings(iterationEngineerings: DecimalSource | DecimalSource[]);
    get layerEngineerings(): DecimalSource | DecimalSource[];
    set layerEngineerings(layerEngineerings: DecimalSource | DecimalSource[]);
}
/**
 * Abbreviates numbers in terms of their super-root; this is the square super-root by default, so 256 is 4↑↑2 and 46,656 is 6↑↑2.
 * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
 * @param iterations ( number ) The amount of super-root iterations: 1 is regular Super-Root notation, 2 means the super-root is taken twice, and so on. This can be negative.
 * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class SuperRootNotation extends Notation {
    private _height;
    private _iterations;
    max_in_a_row: number;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(height?: number, iterations?: number, max_Fs_in_a_row?: number, rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get height(): number;
    set height(height: number);
    get iterations(): number;
    set iterations(iterations: number);
}
/**
 * A variant of super-root notation that uses a different amount of super-root iterations depending on how large the number is.
 * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of super-root iterations. Default is 1.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiSuperRootNotation extends Notation {
    private _height;
    private _maxnum;
    max_in_a_row: number;
    minIterations: number;
    private _engineerings;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(height?: number, maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, engineerings?: DecimalSource | DecimalSource[], rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get height(): number;
    set height(height: number);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * A variant of super-root notation that uses a different super-root height depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 65536.
 * @param minHeight ( number ) The minimum super-root height. Default is 2.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class IncreasingSuperRootNotation extends Notation {
    private _maxnum;
    private _minHeight;
    private _engineerings;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    heightShown: number;
    innerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, minHeight?: number, engineerings?: DecimalSource | DecimalSource[], rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, heightShown?: number, innerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get minHeight(): number;
    set minHeight(minHeight: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * Writes numbers as their prime factorization: for example, writes 6 as 2 * 3, and writes 60 as 2^2 * 3 * 5.
 * For larger numbers, approximates them as a square root, then a cube root, then a fourth root, and so on, then as a power tower, and then as a tetration of some number to a whole height.
 * Supports non-whole numbers by approximating them as fractions.
 * @param maxPrime ( number ) Only primes up to this value are checked for. Default is 10000. For example, if maxPrime is 5, then 231 would be written as 3 * 77 because 3 would be checked for but 7 and 11 would not be checked for (and so it wouldn't figure out that 77 is composite).
 * @param max_tower_height ( number ) If the power tower would be taller than this many layers, switches to tetrational format. Default is 5.
 * @param fractionPrecision ( number ) The precision with which non-whole numbers are approximated as fractions. If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional. Default is -1e-6.
 * @param numLimit ( number ) Only numbers below this point can stand on their own; anything higher and exponents are introduced. Default is maxPrime^2, as that's when inaccurate prime factorizations (where a supposed large prime actually has two large prime factors) can start showing up.
 * @param powerBase ( number ) If the power tower has more than two layers, all layers except the top two are set to this value. Default is maxPrime.
 * @param minimum ( number ) Numbers below this value are written in terms of their reciprocal. Default is 1 / maxPrime.
 * @param multiplicationString ( string ) The string placed between two prime factors. Default is " * ".
 * @param powerString ( [string, string] ) When a prime factor has an exponent, such as 3^2, this pair of strings controls what shows up between the base and the exponent: powerString[0] goes before the exponent, powerString[1] goes after the exponent. Default is ["^", ""].
 * @param powerBefore ( boolean ) If this is true, exponents on prime factors go before those primes instead of after. Default is false.
 * @param expChars ( [[string, string, string], [string, string, string]] ) An array containing two arrays, each of which contains three strings. In a power tower, expChars[0][0] goes before the tower, expChars[0][1] goes between each entry, and expChars[0][2] goes at the end of the tower. expChars[1] is like expChars[0], but for tetration instead of exponentiation. Default is [["(", ")^(", ")"], ["(", ")^^(", ")"]].
 * @param baseInnerNotation ( Notation ) The notation that the prime factors are themselves written in. DefaultNotation is the default.
 * @param powerInnerNotation ( Notation | null ) The notation that the exponents on the prime factors are written in. Is the same as baseInnerNotation by default. If this is null, then the exponents are themselves written in Prime notation.
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["(", ")" + powerString[0] + -1 + powerString[1]], where that -1 is however powerInnerNotation writes -1.
 */
declare class PrimeNotation extends Notation {
    private _maxPrime;
    max_tower_height: number;
    fractionPrecision: number;
    numLimit: number;
    private _powerBase;
    minimum: number;
    multiplicationString: string;
    powerString: [
        string,
        string
    ];
    powerBefore: boolean;
    expChars: [
        [
            string,
            string,
            string
        ],
        [
            string,
            string,
            string
        ]
    ];
    baseInnerNotation: Notation;
    powerInnerNotation: Notation | null;
    recipString: [
        string,
        string
    ] | null;
    constructor(maxPrime?: number, max_tower_height?: number, fractionPrecision?: number, numLimit?: number, powerBase?: number, minimum?: number, multiplicationString?: string, powerString?: [
        string,
        string
    ], powerBefore?: boolean, expChars?: [
        [
            string,
            string,
            string
        ],
        [
            string,
            string,
            string
        ]
    ], baseInnerNotation?: Notation, powerInnerNotation?: Notation | null, recipString?: [
        string,
        string
    ] | null);
    name: string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
    get maxPrime(): number;
    set maxPrime(maxPrime: number);
    get powerBase(): number;
    set powerBase(powerBase: number);
}
/**
 * Uses PsiCubed2's "lexiographic ordering" as described at https://googology.fandom.com/wiki/User_blog:PsiCubed2/An_intuitive_lexicographic_ordering_of_numbers_up_to_P10_(%CF%89%5E%CF%89-level).
 * In summary, this notation starts with exponential expressions with E, then tetrational with F, then pentational with G, then (though this usually doesn't come up) hexational with H, but after the first entry (which represents the logarithm/super-logarithm/penta-logarithm) there are entries after dashes that each add accuracy to the approximation.
 * For example, in an E4-x expression, that x is the digits of the mantissa in n*10^4, and in an F8-x expression, that x is whatever's at the top of the power tower of 8 tens that represents the given value.
 * This notation obeys the rule that chopping off characters from the end always produces less accurate approximations, which means each digit has more precedence than all the digits afterwards:
 * for example, anything of the form F2-45-42..., no matter what comes after that 2, is greater than anything of the form F2-45-41...
 * @param maxEntries ( number | number[] ) In its complete form, this is an array of four numbers: the first determines the maximum amount of dash entries for E-level numbers, the second is for F-level numbers, the third is for G-level numbers, and the fourth is for H-level numbers. If a single number is given instead of an array, all three values are set to that same number. If less than four elements are provided, the remaining elements are set to be equal to the last provided element. Default is [2, 4, 6, 8].
 * @param maxPrecision ( number ) The highest amount of digits that a dash entry can show. Default is 10.
 * @param base ( number | string[] ) This parameter, which can be either a number or an array of strings, controls the base this notation works in. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings. Default is 10.
 * @param dashString ( string ) The string placed between each dash entry. Default is "-".
 * @param letters ( [string, string, string, string] ) The three letters used for exponential, tetrational, pentational, and hexational expressions respectively. Default is ["E", "F", "G", "H"].
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in the base being used.
 *
 * Since this notation relies on its base to format the numbers themselves, it does not have an innerNotation parameter.
 */
declare class PsiDashNotation extends Notation {
    private _maxEntries;
    private _maxPrecision;
    private _base;
    dashString: string;
    letters: [
        string,
        string,
        string,
        string
    ];
    recipString: [
        string,
        string
    ] | null;
    constructor(maxEntries?: number | number[], maxPrecision?: number, base?: number | string[], dashString?: string, letters?: [
        string,
        string,
        string,
        string
    ], recipString?: [
        string,
        string
    ] | null);
    name: string;
    formatDecimal(value: Decimal): string;
    get base(): number | string[];
    set base(base: number | string[]);
    get maxEntries(): number | number[];
    set maxEntries(maxEntries: number | number[]);
    get maxPrecision(): number;
    set maxPrecision(maxPrecision: number);
}
/**
 * Writes numbers based on a system of infinite layers of prestige, where each layer requires a certain amount of the previous layer and is gained at some root of the previous layer.
 * For example, if root is 3 and requirement is 1e12, then it takes 1e12 of one layer's currency to get 1 of the next layer's currency, and multiplying the amount of one layer by X multiplies the amount of the next layer by X^(1/3).
 * @param root ( Decimal ! ) Each layer's gain is this root of the previous layer's gain.
 * @param requirement ( Decimal ! ) 1 of layer X + 1 requires this much of layer X.
 * @param recursive ( boolean ) If this is true, then once the layer number is itself larger than the original requirement, it will start being written in this notation itself. After a few layers of nesting, this switches to showing the amount of nestings, i.e. the "hyperlayer", along with the "payload" that's nested that many times. Default is false.
 *
 * WARNING: When recursive is true, this notation is significantly laggy. Maybe don't turn this setting to true if you're using this for an incremental game...
 *
 * @param rampings ( [Decimal, Decimal, Decimal][] ) Each entry of this array consists of three Decimals: the first is the layer where that ramping interval starts, the second is the amount the root is ramping by, and the third is the amount the requirement is ramping by.
 * "Ramping" means that on each layer, the root is multiplied by its ramping amount, and the requirement is raised to the power of its ramping amount. For example, if root is 3, requirement is 1e12, and the first entry of ramping is [4, 3, 2],
 * then on the 4th layer the ramping begins, so on the 5th layer root becomes 9 and requirement becomes 1e24, on the 6th layer root becomes 27 and requirement becomes 1e48, on the 7th layer root becomes 81 and requirement becomes 1e96, and so on.
 * Default is [], which is effectively the same as [[0, 1, 1]], i.e. no ramping occurs.
 * @param layerChars ( [string, string] ) A pair of strings. layerChars[0] is placed before the layer number, layerChars[1] is placed after the layer number. Default is ["[", "] "].
 * @param layerBefore ( boolean ) If this parameter is true, the layer comes before the amount of that layer instead of after. Default is true.
 * @param showLayerZero ( boolean ) If this parameter is false, then if the layer is zero, the number just uses amountInnerNotation and doesn't show the layer at all, but the layer is shown even when it's zero if this parameter is true. Default is true.
 * @param amountInnerNotation ( Notation ) The notation that the amount of the current layer is written with. DefaultNotation is the default.
 * @param layerInnerNotation ( Notation ) The notation that the layer number is written with. DefaultNotation is the default.
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in amountInnerNotation.
 * @param maxNesting ( number ) The maximum amount of nestings of the layer before switching to hyperlayer format. This parameter does nothing if recursive is false. Default is 3.
 * @param recursiveChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used for recursive layers: recursiveChars[0][0] goes before the layer number once said layer number is itself notated in this notation, recursiveChars[0][1] goes after the layer number in that scenario.
 * recursiveChars[1] acts like layerChars, but for the hyperlayer number instead of the layer number, and likewise recursiveChars[2] acts like recursiveChars[0] but for the hyperlayer number.  This parameter does nothing if recursive is false. Default is [["[", "]"], ["{", "} "], ["{", "}"]].
 * @param hyperlayerBefore ( boolean ) If this parameter is true, the hyperlayer comes before the payload instead of after. This parameter does nothing if recursive is false. Default is true.
 * @param hypermantissaPower ( number ) Normally, the payload in hyperlayer format is bounded by 1 and requirement, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are requirement and divisorAtLayer(requirement), if hypermantissaPower is 2 then the bounds are divisorAtLayer(requirement) and divisorAtLayer(divisorAtLayer(requirement)), and so on. For example, with a requirement of 1e12, a number normally represented as "{10} 100" would become "{9} [1] 100" with 1 hypermantissaPower and "{8} [[1] 100]" with 2 hypermantissaPower.
 */
declare class PrestigeLayerNotation extends Notation {
    private _root;
    private _requirement;
    recursive: boolean;
    private _rampings;
    layerChars: [
        string,
        string
    ];
    layerBefore: boolean;
    showLayerZero: boolean;
    amountInnerNotation: Notation;
    layerInnerNotation: Notation;
    recipString: [
        string,
        string
    ] | null;
    maxNesting: number;
    recursiveChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    hyperlayerBefore: boolean;
    hypermantissaPower: number;
    private rampingCheckpoints;
    constructor(root: DecimalSource, requirement: DecimalSource, recursive?: boolean, rampings?: [
        DecimalSource,
        DecimalSource,
        DecimalSource
    ][], layerChars?: [
        string,
        string
    ], layerBefore?: boolean, showLayerZero?: boolean, amountInnerNotation?: Notation, layerInnerNotation?: Notation, recipString?: [
        string,
        string
    ] | null, maxNesting?: number, recursiveChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], hyperlayerBefore?: boolean, hypermantissaPower?: number);
    name: string;
    private calculateCheckpoints;
    private rootAtLayer;
    private outermostDivisor;
    private divisorAtLayer;
    /**
     * Given a certain amount of the layer 0 currency, returns the layer you'd be on.
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     * @param rounded ( boolean ) Ensures that the given layer is a whole number. Default is true.
     */
    getLayer(value: Decimal, rounded?: boolean): Decimal;
    /**
     * Given a certain amount of the layer 0 currency, returns the layer you'd be on and the amount of currency you'd have on that layer. The function returns an array of the form [currency, layer].
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     */
    layerAndCurrency(value: Decimal): [
        Decimal,
        Decimal
    ];
    /**
     * Applies getLayer multiple times.
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     * @param iterations ( number ! ) The amount of times getLayer is applied to the value.
     */
    iteratedLayer(value: Decimal, iterations: number): Decimal;
    /**
     * The Prestige Layer equivalent of slog: how many times can we apply getLayer to value before it gets down to 1?
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     */
    getHyperlayer(value: Decimal): Decimal;
    formatDecimal(value: Decimal): string;
    get root(): DecimalSource;
    set root(root: DecimalSource);
    get requirement(): DecimalSource;
    set requirement(requirement: DecimalSource);
    get rampings(): [
        DecimalSource,
        DecimalSource,
        DecimalSource
    ][];
    set rampings(rampings: [
        DecimalSource,
        DecimalSource,
        DecimalSource
    ][]);
}
/**
 * Writes numbers using increasingly powerful operators: first addition, then multiplication, then exponentiation with a fixed top (i.e. root-style exponentiation),
 * then exponentiation with a fixed bottom (logarithm-style), then tetration with a fixed top (super-root), then tetration with a fixed bottom (super-logarithm).
 * Once too many of one operator is used but before it gets high enough to switch to the next, it starts showing how many times that operator is applied.
 * Smaller numbers with the operators applied to them are themselves written in this notation, allowing for nesting parameters.
 * @param bases ( Decimal | Decimal[] ) bases[0] is the number being added to for addition, bases[1] is the number being multiplied by for multiplication, bases[2] is the height of the exponentiation for roots, bases[3] is the base of the exponentiation for exponentiation, bases[4] is the height of the tetration for super-roots, and bases[5] is the base of the tetration for tetration. If less than 6 entries are provided, then the remaining entries are filled in with defaults: addition's default is 10, multiplication matches addition by default, root gets 2 by default, exponentiation matches multiplication by default, super-root matches root by default, and tetration matches exponentiation by default. If a single Decimal is provided instead of an array, that Decimal is taken as addition's base and the rest are filled in with defaults. The default value of this parameter is 10.
 * @param maximums ( Decimal[] ) An array of Decimals: each one is a forced maximum for one operator, such that if the number being formatted is equal to or above that maximum, it's forced to the next operator. maximums[0] is the default plain number (i.e. the maximum number that doesn't get any operators at all), maximums[1] is for addition, maximums[2] is for multiplication, maximums[3] is for roots, maximums[4] is for exponentiation, and maximums[5] is for super-roots (tetration doesn't get a maximum because there's no operator after it). If less than 6 entries are provided, the remaining ones are set to Infinity (there are other ways for an operator to max out, so this is fine). If the array is empty, then maximums[0] (this one shouldn't be infinite, as if it was the operators wouldn't be used at all) is set to bases[0]. The default value for this parameter has maximums[0] be 10 and the rest of the maximums be Infinity.
 * @param operatorChars ( [[string, string], [string, string], [string, string], [string, string]][] ) An array of arrays of four pairs of strings (the outermost array's length is not fixed like the inner arrays' lengths are). In each of these inner arrays, each pair of strings determines what goes around a number to represent an operator. For example:
 * operatorChars[0][0] is the pair of strings used for the innermost addition for the addition operator, with operatorChars[0][0][0] going before the number being added to and operatorChars[0][0][1] going afterwards. operatorChars[0][1] is also for addition, but for additions after the first one (in case you want to add parentheses around inner ones but not the outermost one, for example). operatorChars[0][2] and [0][3] are for once nesting addition begins, with [0][2] going around the number being added to and [0][3] going around the amount of addition operators applied. operatorChars[1] does all the same things as operatorChars[0] but for multiplication instead of addition, operatorChars[2] is for root, operatorChars[3] is for exponentiation, operatorChars[4] is for super-root, and operatorChars[5] is for tetration.
 * Default is [
 
 [["10 + ", ""], ["10 + ", ""], [" + ", ""], ["10 * ", ""]],
 
 [["10 * ", ""], ["10 * ", ""], [" * ", ""], ["10^", ""]],
 
 [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
 
 [["10^", ""], ["10^", ""], [" ", ""], ["(10^)^", ""]],
 
 [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
 
 [["10^^", ""], ["10^^", ""], [" ", ""], ["(10^^)^", ""]]
 
 ]
 
 * @param thresholds ( [Decimal, Decimal | boolean, number, Decimal, number][] ) Again, each entry in the outer array corresponds to one of the six operators.
 In the inner arrays, thresholds[n][0] is the value at which the number being added to/multiplied by/raised to a power/etc., the "argument", switches from being written in plainInnerNotation to being written within the Increasing Operator notation itself, and thresholds[n][3] is that notation switch threshold for the amount of times the operator is applied once the nesting form begins.
 thresholds[n][1] is a forced maximum on the argument, i.e. if the argument is not less than this value then another instance of the operator is applied to get it back below the threshold. thresholds[n][2] is the highest amount of times an operator can be applied before it switches to nesting form,
 and thresholds[n][4] is the highest amount of "nestings" (i.e. where the amount of times the operator is applied is itself written in this notation with this operator being applied) before forcefully switching to the next operator.
 thresholds[n][1] can be a boolean instead of a Decimal: if it's false then it's set to the maximum argument of the PREVIOUS operator, and if it's true then it's set to the maximum value before nesting form begins of the previous operator (thresholds[0][1] has no previous operator to refer to, so if it's a boolean then it's set to maximums[0]).
 Default is an array containing six entries that are all [10, true, 4, 10, 2].
 * @param rootBehavior ( null | [boolean, Decimal, Decimal | boolean] ) If this is null (which is the default), then roots behave like the other operators, applying multiple times then switching to nesting form. However, if this is not null, then roots aren't applied multiple times: instead, the degree of the root increases for larger numbers.
 rootBehavior[1] is how much the root degree changes by each time it increases; this value is added to the degree is rootBehavior[0] is false, but it multiplies the degree if rootBehavior[0] is true. rootBehavior[2] is the maximum height of the root before nesting in the height; thresholds[2][2] is ignored if rootBehavior is not null, but thresholds[2][4] still applies.
 rootBehavior[2] can be a boolean, which follows the same rules as thresholds[2][1] does as a boolean.
 * @param superRootBehavior ( null | [boolean, Decimal, Decimal | boolean] ) Same as rootBehavior, but for super-roots instead. Default is null.
 * @param roundings ( [DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal)][] ) For a given operator, if rounding[n][0] is not 0, then the argument is rounded to the nearest multiple of that value if we're not in nesting form yet. If roundings[n][0] is a function, then the argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of.
 * roundings[n][1] and roundings[n][2] are similar, but [n][1] is for the argument in nesting form and [n][2] is for the amount of times the operator is applied in nesting form. Default is an array consisting of six [0, 0, 0]s, i.e. no rounding occurs.
 * @param preAdditionFormats ( [Decimal, string, string, string, string, (value : Decimal) => boolean, Notation][] ) Well, that's certainly a confusing type for this parameter, isn't it? Let me explain.
 * This parameter is used to format numbers before the operator begins, for the sake of notations like Omega and Fours. When one of these formats is applied, the number is subtracted by a certain amount and displayed surrounded by some strings corresponding to that amount.
 * Here's what each entry does:
 * preAdditionFormats[n][0] is the value that that format begins being used at, which is also the amount the number is subtracted by.
 * preAdditionFormats[n][1] and [n][2] go before and after the number respectively. preAdditionFormats[n][3] and [n][4] also go before and after the number respectively, on the inside of the gap between [n][1] and [n][2]. (in other words, the writing goes [n][1], [n][3], number, [n][4], [n][2]).
 * The reason [n][3] and [n][4] exist is because of [n][5], a Decimal => boolean function. If this function returns true, then the number is shown, but if it returns false, the number isn't shown. [n][3] and [n][4] are only shown if the number is shown, but [n][1] and [n][2] are shown even if the number isn't.
 * Finally, [n][6] is the notation that the number is formatted in within this expression.
 * All of this means nothing by default, though, since the default for preAdditionFormats is [], i.e. there are no preAdditionFormats by default.
 * @param nestingBefore ( boolean[] ) For each entry of this array (each entry corresponds to one of the six operators), if that entry is true, then when that operator switches to nesting form, the amount of times the operator is applied is written before the argument instead of after. Default is [true, true, false, true, false, true]. If less than six entries are provided, the remaining ones are set to their default values.
 * @param parenthesize ( [[string, string, boolean], [string, string, boolean], [string, string, boolean]][] ) Each entry in the outer array corresponds to one of the six operators, so let's focus on what's inside each entry.
 * Each entry consists of three [string, string, boolean] arrays, used to add parentheses to the argument and application number of an operator.
 * parenthesize[n][0][0] goes before the argument, parenthesize[n][0][1] goes afterwards, and parenthesize[n][0][2] determines when the parentheses start showing up:
 * if it's false then the parentheses only appear once the argument starts being written with Increasing Operator notation itself, but if it's true then the parentheses are always there (If you don't want the parentheses at all, just set the two strings to empty strings).
 * parenthesize[n][0] is for the argument before nesting form activates, parenthesize[n][1] is for the argument in nesting form, and parenthesize[n][2] is for the amount of times the operator is applied in nesting form.
 * @param argumentShown ( [(value : Decimal) => boolean, (value : Decimal) => boolean, [string, string]?, [string, string]?][] ) This parameter allows you to set times when the argument is not shown. As usual, each entry of the outer array corresponds to one of the six operators.
 * In each inner array, argumentShown[n][0] and [n][1] are Decimal -> boolean functions; the argument is only shown if that function returns true. [n][0] is for before nesting form, [n][1] is for during nesting form.
 * If the argument is not shown before nesting form, then argumentShown[n][2] and [n][3] replace operatorChars[n][0] and [n][1] respectively (for nesting form, the part with the argument is simply omitted, meaning operatorChars[n][2] is not used but [n][3] is).
 * @param plainInnerNotation ( Notation ) The notation that regular numbers, i.e. numbers below maximums[0], are written in. DefaultNotation is the default.
 * @param innerNotations ( Notation | [Notation, Notation, Notation][] ) Each entry in the outer array corresponds to one of the six operators.
 * innerNotations[n][0] is the notation that the argument for that operator is written in before switching to nesting form, innerNotations[n][1] is the notation the argument is written in in nesting form, and innerNotations[n][2] is the notation the operator number is written in in nesting form. These notations only apply before the argument and operator number's notational thresholds are reached.
 * You can also just input a single notation here and it will be used everywhere. (I wanted to also allow inputting a single [Notation, Notation, Notation], but it seems TypeScript has no way of safely distinguishing arrays from arrays of arrays...), which is what's done by default:
 * the default value of this parameter is DefaultNotation.
 * @param minnum ( Decimal ) Values smaller than this are written in terms of their reciprocal. The default is the reciprocal of maximums[0].
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / (", ")"], where that 1 is however 1 is written in plainInnerNotation.
 */
declare class IncreasingOperatorNotation extends Notation {
    private _bases;
    private _maximums;
    private _operatorChars;
    private _thresholds; //setMaximums in the constructor assigns this
    private _rootBehavior;
    private _superRootBehavior;
    private _roundings;
    private _preAdditionFormats;
    private _nestingBefore;
    private _parenthesize;
    private _argumentShown;
    plainInnerNotation: Notation;
    private _innerNotations;
    minnum: Decimal;
    recipString: [
        string,
        string
    ] | null;
    private argumentMaximums; //setMaximums in the constructor assigns this
    private symbolicMaximums; //setMaximums in the constructor assigns this
    private nestingMaximums; //setMaximums in the constructor assigns this
    private unconvertedThresholds;
    constructor(bases?: DecimalSource | DecimalSource[], maximums?: DecimalSource[], operatorChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ][], thresholds?: [
        DecimalSource,
        DecimalSource | boolean,
        number,
        DecimalSource,
        number
    ][], rootBehavior?: null | [
        boolean,
        DecimalSource,
        DecimalSource | boolean
    ], superRootBehavior?: null | [
        boolean,
        DecimalSource,
        DecimalSource | boolean
    ], roundings?: [
        DecimalSource | ((value: Decimal) => Decimal),
        DecimalSource | ((value: Decimal) => Decimal),
        DecimalSource | ((value: Decimal) => Decimal)
    ][], preAdditionFormats?: [
        DecimalSource,
        string,
        string,
        string,
        string,
        (value: Decimal) => boolean,
        Notation
    ][], nestingBefore?: boolean[], parenthesize?: [
        [
            string,
            string,
            boolean
        ],
        [
            string,
            string,
            boolean
        ],
        [
            string,
            string,
            boolean
        ]
    ][], argumentShown?: [
        (value: Decimal) => boolean,
        (value: Decimal) => boolean,
        [
            string,
            string
        ]?,
        [
            string,
            string
        ]?
    ][], plainInnerNotation?: Notation, innerNotations?: Notation | [
        Notation,
        Notation,
        Notation
    ][], minnum?: DecimalSource | undefined, recipString?: [
        string,
        string
    ] | null);
    name: string;
    private setMaximums;
    formatDecimal(value: Decimal): string;
    get bases(): DecimalSource | DecimalSource[];
    set bases(bases: DecimalSource | DecimalSource[]);
    get maximums(): DecimalSource[];
    set maximums(maximums: DecimalSource[]);
    get operatorChars(): [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ][];
    set operatorChars(operatorChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ][]);
    get thresholds(): [
        DecimalSource,
        DecimalSource | boolean,
        number,
        DecimalSource,
        number
    ][];
    set thresholds(thresholds: [
        DecimalSource,
        DecimalSource | boolean,
        number,
        DecimalSource,
        number
    ][]);
    get rootBehavior(): null | [
        boolean,
        Decimal,
        Decimal | boolean
    ];
    set rootBehavior(rootBehavior: null | [
        boolean,
        Decimal,
        Decimal | boolean
    ]);
    get superRootBehavior(): null | [
        boolean,
        Decimal,
        Decimal | boolean
    ];
    set superRootBehavior(superRootBehavior: null | [
        boolean,
        Decimal,
        Decimal | boolean
    ]);
    get roundings(): [
        DecimalSource | ((value: Decimal) => Decimal),
        DecimalSource | ((value: Decimal) => Decimal),
        DecimalSource | ((value: Decimal) => Decimal)
    ][];
    set roundings(roundings: [
        DecimalSource | ((value: Decimal) => Decimal),
        DecimalSource | ((value: Decimal) => Decimal),
        DecimalSource | ((value: Decimal) => Decimal)
    ][]);
    get preAdditionFormats(): [
        DecimalSource,
        string,
        string,
        string,
        string,
        (value: Decimal) => boolean,
        Notation
    ][];
    set preAdditionFormats(preAdditionFormats: [
        DecimalSource,
        string,
        string,
        string,
        string,
        (value: Decimal) => boolean,
        Notation
    ][]);
    get nestingBefore(): boolean[];
    set nestingBefore(nestingBefore: boolean[]);
    get parenthesize(): [
        [
            string,
            string,
            boolean
        ],
        [
            string,
            string,
            boolean
        ],
        [
            string,
            string,
            boolean
        ]
    ][];
    set parenthesize(parenthesize: [
        [
            string,
            string,
            boolean
        ],
        [
            string,
            string,
            boolean
        ],
        [
            string,
            string,
            boolean
        ]
    ][]);
    get argumentShown(): [
        (value: Decimal) => boolean,
        (value: Decimal) => boolean,
        [
            string,
            string
        ]?,
        [
            string,
            string
        ]?
    ][];
    set argumentShown(argumentShown: [
        (value: Decimal) => boolean,
        (value: Decimal) => boolean,
        [
            string,
            string
        ]?,
        [
            string,
            string
        ]?
    ][]);
    get innerNotations(): Notation | [
        Notation,
        Notation,
        Notation
    ][];
    set innerNotations(innerNotations: Notation | [
        Notation,
        Notation,
        Notation
    ][]);
}
/**
 * Abbreviates numbers in terms of polygonal numbers (triangular numbers by default, but the amount of sides can be changed). For example, 10 is the 4th triangular number, so it's written as △4.
 * △△ represents the amount of times △ is applied to 2, so △△10 means △(△(△(...△2))) with 10 △'s. Similarly, △△△ represents the amount of times △△ is applied to 2, so △△△5 means △△(△△(△△(△△(△△(2))))).
 * @param sides ( Decimal ) The amount of sides on the polygon in question. Default is 3, which means the triangular numbers are used. This parameter must be greater than 2.
 * @param polyChars ( [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]] )
 * When the number under a single-polygon is below maxnum (so it's written as a plain number), polyChars[0][0] is placed before the number and polyChars[0][1] is placed after the number.
 * polyChars[1][0] and [1][1] are used instead when the number is itself written in this notation.
 * polyChars[2] and [3] serve the same purpose as [0] and [1] respectively but for double-polygons,
 * and polyChars[4] and [5] are for triple-polygons.
 * Default is [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]].
 * @param maxnum ( Decimal ) Only numbers smaller than this can appear on their own; any larger and another polygonal root is taken. Default is 26796, i.e. △△5.
 * @param maxPolys ( number ) The largest amount of single polygons in a row - any larger and they're truncated into a double polygon string. Default is 5.
 * @param biPolyBase ( Decimal ) The number that the single-polygons are repeatedly applied to to calculate the double-polygon number. Default is 2.
 * @param maxBiPolys ( number ) The largest amount of double polygons in a row - any larger and they're truncated into a triple polygon string. Is the same as maxPolys by default.
 * @param triPolyBase ( Decimal ) The number that the double-polygons are repeatedly applied to to calculate the triple-polygon number. Default is 2.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param minnum ( Decimal ) Values smaller than this are written in terms of their reciprocal. Default is whatever number is written as △0.1, which with sides == 3 is 0.055.
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in plainInnerNotation.
 */
declare class PolygonalNotation extends Notation {
    private _sides;
    polyChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    private _maxnum;
    maxPolys: number;
    private _biPolyBase;
    maxBiPolys: number;
    private _triPolyBase;
    innerNotation: Notation;
    private _minnum;
    recipString: [
        string,
        string
    ] | null;
    constructor(sides?: DecimalSource, polyChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], maxnum?: DecimalSource, maxPolys?: number, biPolyBase?: DecimalSource, maxBiPolys?: number, triPolyBase?: DecimalSource, innerNotation?: Notation, minnum?: DecimalSource, recipString?: [
        string,
        string
    ] | null);
    name: string;
    formatDecimal(value: Decimal): string;
    get sides(): DecimalSource;
    set sides(sides: DecimalSource);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get biPolyBase(): DecimalSource;
    set biPolyBase(biPolyBase: DecimalSource);
    get triPolyBase(): DecimalSource;
    set triPolyBase(triPolyBase: DecimalSource);
    get minnum(): DecimalSource;
    set minnum(minnum: DecimalSource);
}
/**
 * A Myriad-like notation that abbreviates numbers in terms of powers of double factorials (as in 3!! = (3!)! = 720) and a coefficient. Numbers below 720 are just written as normal, then a factor of 3!! is introduced, so 1080 would be 1.5 * 3!!.
 * Above 720^2, powers of 3!! are written as, well, powers of 3!!, so 1,000,000 would be around 1.929 * 3!!^2. The highest double factorial is included first, so powers of 4!! start being included, then 5!!, and so on; for example, 10^^4 is written as 5!! * 6!!^2 * 7!!^9 * 8!!^7 * 9!!^4 * 10!!^4 * 11!!^7 * 12!!^2.
 * Once the double factorial number gets too high, the entire thing is wrapped in a single factorial, such as (12!!^5 * 13!!^7)!, then multiple factorials, then the number of factorials gets written out, eventually in this notation as well.
 * @param minDF ( Decimal ) The lowest double factorial that gets written as a double factorial - numbers below that are just written as the coefficient. Default is 3, meaning 3!! (720) is the cutoff point for the coefficient.
 * @param maxDF ( Decimal ) The limit of double factorial numbers - once the double factorial would reach this point, the number gets wrapped in another single factorial. Default is 3628800, i.e. 10!.
 * @param reverseTerms ( boolean ) If this parameter is true, the double factorials are written in descending order instead of ascending order. Default is false.
 * @param maxTerms ( number ) Only the largest few terms (double factorials and the coefficient) are written - this parameter controls how many terms are written. Default is 8.
 * @param multiplicationSign ( string ) The string placed between each term. Default is " * ".
 * @param divisionSign ( string ) The string placed between each term for numbers below 1. Default is " / ".
 * @param DFChars ( [[string, string], [string, string], [string, string]] ) These are the strings used to indicate double factorials. For each of the three pairs in this array, the first entry goes before the number in question, the second goes after.
 * DFChars[0][0] and [0][1] go before and after the double factorial number itself. When a double factorial is raised to a power, [1][0] and [1][1] then go around that double factorial string, while [2][0] and [2][1] go around the exponent. Default is [["", "!!"], ["", ""], ["^", ""]].
 * @param powerBefore ( boolean ) If this is true, the exponent on a double factorial goes before the double factorial instead of after. Default is false.
 * @param factorialChars ( [[string, string], [string, string], [string, string], [string, string]] ) These strings are used for larger numbers to indicate further factorials have been taken. For each of the four pairs in this array, the first entry goes before the number in question, the second goes after.
 * factorialChars[0][0] and [0][1] go around the rest of the expression to indicate a single factorial is taken, then once more factorials are taken, [1][0] and [1][1] are used for all factorials beyond the innermost one.
 * Once it switches to writing out the amount of factorials as a number, [2][0] and [2][1] go around the rest of the expression, [3][0] and [3][1] go around the factorial amount. Default is [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]].
 * @param maxFactorials ( number ) The largest amount of factorials that will be written out in a row - any more than this and the amount of factorials starts being written as a number. Default is 5.
 * @param factorialBefore ( boolean ) If this is true, the amount of factorials for super large numbers is written before the rest of the expression instead of after. Default is false.
 * @param coefficientInnerNotation ( Notation ) The notation that the coefficient is written in. DefaultNotation is the default.
 * @param DFInnerNotation ( Notation ) The notation that the double factorial numbers are written in. Is the same as coefficientInnerNotation by default.
 * @param powerInnerNotation ( Notation ) The notation that the exponents on double factorials are written in. Is the same as coefficientInnerNotation by default.
 * @param factorialInnerNotation ( Notation | null ) The notation that the amount of factorials is written in - if this is null, then the amount of factorials is written in this notation itself. Default is null.
 * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / (", ")"], where that "1 / " is actually the concatenation of (how coefficientInnerNotation formats 1) and divisionSign.
 */
declare class DoubleFactorialsNotation extends Notation {
    private _minDF;
    private _maxDF;
    reverseTerms: boolean;
    private _maxTerms;
    multiplicationSign: string;
    divisionSign: string;
    DFChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    powerBefore: boolean;
    factorialChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    maxFactorials: number;
    factorialBefore: boolean;
    coefficientInnerNotation: Notation;
    DFInnerNotation: Notation;
    powerInnerNotation: Notation;
    factorialInnerNotation: null | Notation;
    recipString: [
        string,
        string
    ] | null;
    constructor(minDF?: DecimalSource, maxDF?: DecimalSource, reverseTerms?: boolean, maxTerms?: number, multiplicationSign?: string, divisionSign?: string, DFChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], powerBefore?: boolean, factorialChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], maxFactorials?: number, factorialBefore?: boolean, coefficientInnerNotation?: Notation, DFInnerNotation?: Notation, powerInnerNotation?: Notation, factorialInnerNotation?: null | Notation, recipString?: [
        string,
        string
    ] | null);
    name: string;
    formatDecimal(value: Decimal): string;
    get minDF(): DecimalSource;
    set minDF(minDF: DecimalSource);
    get maxDF(): DecimalSource;
    set maxDF(maxDF: DecimalSource);
    get maxTerms(): number;
    set maxTerms(maxTerms: number);
}
/**
 * Uses a grid of empty and filled squares to represent numbers. Each row is written in binary, where empty squares are 0s and filled squares are 1s.
 * The first row represents the number itself. The second row represents how many extra squares the first row should have before the last ones (the last ones are what's shown) - in other words, whatever number n is in the second row means the first row is multiplied by 2^n.
 * The third row shows the amount of extra squares that should be in the second row, and so on.
 * Negative numbers have an empty diamond in front of the first row, and such a diamond can also be in front of the second row (so the exponent of the 2^n is negative) for small numbers.
 * For tetrational numbers, there may even be a second plane: the second plane's number is the amount of extra rows that the first plane should have before the last ones (the last ones are what's shown).
 * @param width ( number ) The amount of squares in each row. Default is 8.
 * @param height ( number ) The amount of rows in each plane. Default is 8.
 * @param digits ( string[] ) The digits used to represent the numbers. These digits determine what number base the grid works in; as the name implies, digits[n] is the digit for the number n. Default is ["□", "■"].
 * @param rowOpenings ( [string, string, string] ) Each row begins with rowOpenings[0] normally, but if either of the first two rows is negative, then non-negative rows begin with rowOpenings[1] and negative rows begin with rowOpenings[2]. Default is ["", " ", "◇"].
 * @param fullFirstRow ( boolean ) If this parameter is true, the first row is divided by 2^(width - 1) so it always uses all of its digits, allowing representations of non-whole numbers to not just collapse to their integer part. Default is false.
 * @param opening ( string ) This string goes before the grid. Default is a newline character.
 * @param separator ( string ) This string goes between each digit. Default is the empty string.
 * @param betweenRows ( string ) This string goes between each row. Default is a newline character.
 * @param betweenPlanes ( string ) This string goes between each plane. Default is two newline characters.
 * @param minimumSizes ( [number, number, number] ) Digits of 0 will be added to the end of each row to ensure every row has at least a width of minimumSizes[0]. Rows of 0s will be added to the end of each plane to ensure every plane has at least a height of minimumSizes[1]. Planes of 0s will be added to the end of the grid to ensure the grid has at least a depth of minimumSizes[2]. Default is [width, height, 1], i.e. each plane is expanded to its full size but no extra planes are added.
 * @param backwards ( [boolean, boolean, boolean] ) If backwards[0] is true, then the digits within each row go greatest-to-least instead of least-to-greatest. backwards[1] is similar but for the order of rows within each plane, and backwards[2] is for the order of planes. Default is [false, false, false].
 *
 * This notation does not have an InnerNotation parameter.
 */
declare class GridNotation extends Notation {
    private _width;
    private _height;
    private _digits;
    rowOpenings: [
        string,
        string,
        string
    ];
    fullFirstRow: boolean;
    opening: string;
    separator: string;
    betweenRows: string;
    betweenPlanes: string;
    minimumSizes: [
        number,
        number,
        number
    ];
    backwards: [
        boolean,
        boolean,
        boolean
    ];
    constructor(width?: number, height?: number, digits?: string[], rowOpenings?: [
        string,
        string,
        string
    ], fullFirstRow?: boolean, opening?: string, separator?: string, betweenRows?: string, betweenPlanes?: string, minimumSizes?: [
        number,
        number,
        number
    ], backwards?: [
        boolean,
        boolean,
        boolean
    ]);
    name: string;
    private nextDigit;
    private nextRow;
    private nextPlane;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    get digits(): string[];
    set digits(digits: string[]);
}
/**
 * Writes numbers in the form of a polynomial-ish expression, with x having a certain value. For example, if x is 10, then 346 is written as 3x^2 + 4x + 6.
 * @param value ( Decimal ) The value of x. Default is 10.
 * @param formatExponents ( number ) If this parameter is positive, then exponents are also written as polynomials, so x^x, x^(3x + 2), x^x^4x, and so on can appear. If this parameter is negative, the exponents are only written as numbers. If this parameter is zero, the exponents are not written at all. Default is 1.
 * @param minimumTerm ( Decimal ) The lowest power of x that gets a term, which may have a non-whole coefficient to account for what would be terms below this one. Default is 0, i.e. the constant term.
 * @param fractionInverse ( boolean ) This parameter controls how negative powers of x are handled.
 * If this parameter is true, then the powers of x continue below the constant term, so if x = 10, then 1.25 is written as 1 + 2x^-1 + 5x^-2.
 * If this parameter is false, then the negative powers of x use denominators instead of negative exponents, so if x = 10, then 1.25 is written as 1 + 2/x + 5/x^2.
 * Default is true.
 * @param maxTerms ( number ) The highest amount of terms shown; terms after the first few are cut off. Default is 8.
 * @param variableStr ( string ) The string used to represent the variable. Default is "x".
 * @param maxMultiTerm ( Decimal ) Only values below this have multiple terms shown. Values above this only show a single term and a coefficient (which may be non-whole). Default is value^^3 or 3^30, whichever is larger.
 * @param maxSingleTerm ( Decimal ) Values above this are considered too big to show on their own, so they get an x^ placed before them and are written in terms of that exponent. Default is value^^5.
 * @param maxExps ( number ) The highest amount of x^'s that can be placed before the polynomial in a row; any more than this and they're abbreviated in (x^)^n form. Default is 5.
 * @param showZeroTerms ( number ) If this parameter is negative, terms with a coefficient of zero are skipped. If this parameter is zero, then terms with a coefficient of zero are shown as long as there's some term with a nonzero coefficient later on. If this parameter is positive, terms, even those with a coefficient of zero, continue to be shown until the maximum amount of terms is hit. Default is -1.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param additionSign ( string ) This string is placed between each term. Default is " + ".
 * @param subtractionSign ( string ) This string is placed between each term for negative numbers. Default is " - ".
 * @param multiplicationSign ( string ) This string is placed between the coefficient and the variable term. Default is the empty string.
 * @param divisionSign ( string ) This string is placed between the coefficient and the variable term for terms below x^0 when inverseTerms is positive. Default is "/".
 * @param multiplicationBefore ( boolean ) If this parameter is true, the coefficient is placed before the variable instead of after. Default is true.
 * @param powerStrings ( [string, string] ) A pair of strings used to denote exponents on variables: powerStrings[0] goes before the exponent, powerStrings[1] goes after the exponent. Default is ["<sup>", "</sup>"].
 * @param coefficientStrings ( [string, string] ) A pair of strings used to denote coefficients on variables: coefficientStrings[0] goes before the coefficient, coefficientStrings[1] goes after the coefficient. Default is ["", ""].
 * @param parenthesizePower ( number ) If this parameter is negative, parentheses are not placed around the exponent. If this parameter is zero, parentheses are placed around the exponent if it contains variables, but not if it's just a number. If this parameter is positive, parentheses are always placed around the exponent. Default is -1.
 * @param unitCoefficientShown ( [boolean, boolean] ) If unitCoefficientShown[0] is true, the coefficient is shown even if it's 1. unitCoefficientShown[1] does the same thing, but for when divisionSign is used instead of for multiplicationSign. Default is [false, true].
 * @param unitPowerShown ( boolean ) Normally, the exponent on x is not shown if it's 1, but it's shown even in that case if unitPowerShown is true. Default is false.
 * @param expStrings ( [[string, string], [string, string], [string, string], [string, string]] ) An array of four pairs of strings that indicate exponentiation on large numbers. In each pair, expStrings[n][0] goes before the value in question, expStrings[n][1] goes after.
 * expStrings[0] replaces the x^() that directly surrounds the number when it's large enough to get x^'s before it. expStrings[1] concerns the rest of the x^'s - expStrings[0] is only for the innermost x^, expStrings[1] is for the rest.
 * expStrings[2] replaces the (x^)^n that indicates repeated exponentiation when that n is just a number, expStrings[3] does the same thing but for when that n contains variables.
 * Default is [["x^(", ")"], ["x^", ""], ["(x^)^", " "], ["(x^)^(", ") "]], where that x is replaced with whatever variableStr is.
 * @param superexpBefore ( boolean ) If this value is true, the repeated exponentiation string stuff comes before the polynomial instead of afterwards. Default is true.
 * @param frontSubtractionSign ( string ) This string is placed at the beginning of the expression for negative numbers. Is the same as subtractionSign by default.
 * @param constantStrings ( [string, string] ) A pair of strings used to denote the constant term: coefficientStrings[0] goes before the constant term, coefficientStrings[1] goes after the constant term. Default is ["", ""].
 * @param precision ( Decimal ) The expression will stop once it gets to within this level of precision compared to the original value, to ensure that meaningless terms (like an x^2 term in an expression with an x^2,000) from floating point imprecision aren't included. Default is 1.2e-16.
 * @param minimumTermRounding ( DecimalSource | ((value : Decimal) => Decimal) ) If the expression includes the minimum term, the minimum term is rounded to the nearest multiple of this value. If this parameter is a function, then the minimum term is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 */
declare class PolynomialNotation extends Notation {
    private _value;
    formatExponents: number;
    minimumTerm: Decimal;
    fractionInverse: boolean;
    private _maxTerms;
    variableStr: string;
    maxMultiTerm: Decimal;
    maxSingleTerm: Decimal;
    maxExps: number;
    showZeroTerms: number;
    innerNotation: Notation;
    additionSign: string;
    subtractionSign: string;
    multiplicationSign: string;
    divisionSign: string;
    multiplicationBefore: boolean;
    powerStrings: [
        string,
        string
    ];
    coefficientStrings: [
        string,
        string
    ];
    parenthesizePower: number;
    unitCoefficientShown: [
        boolean,
        boolean
    ];
    unitPowerShown: boolean;
    expStrings: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    superexpBefore: boolean;
    frontSubtractionSign: string;
    constantStrings: [
        string,
        string
    ];
    precision: Decimal;
    minimumTermRounding: DecimalSource | ((value: Decimal) => Decimal);
    constructor(value?: DecimalSource, formatExponents?: number, minimumTerm?: DecimalSource, fractionInverse?: boolean, maxTerms?: number, variableStr?: string, maxMultiTerm?: DecimalSource, maxSingleTerm?: DecimalSource, maxExps?: number, showZeroTerms?: number, innerNotation?: Notation, additionSign?: string, subtractionSign?: string, multiplicationSign?: string, divisionSign?: string, multiplicationBefore?: boolean, powerStrings?: [
        string,
        string
    ], coefficientStrings?: [
        string,
        string
    ], parenthesizePower?: number, unitCoefficientShown?: [
        boolean,
        boolean
    ], unitPowerShown?: boolean, expStrings?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], superexpBefore?: boolean, frontSubtractionSign?: string, constantStrings?: [
        string,
        string
    ], precision?: DecimalSource, minimumTermRounding?: DecimalSource | ((value: Decimal) => Decimal));
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get value(): DecimalSource;
    set value(value: DecimalSource);
    get maxTerms(): number;
    set maxTerms(maxTerms: number);
}
/**
 * Similar to Letters notation, but without a mantissa: the lowercase letters themselves represent the number, so a is 1, b is 2... z is 26, aa is 27... and so on.
 * Uppercase letters mean the same thing they do in Letters notation: in an expression with an uppercase A, the number (which here is represented by the lowercase letters) represent the amount of lowercase letters that would be in the full expression without the A,
 * an uppercase B expression's lowercase letters represent how many lowercase letters would be in an uppercase A expression, and so on.
 * @param letters ( [string[], string[], string[]] ) An array of three arrays of strings. The first array is the lowercase letters, the second array is the uppercase letters, and the third is the "third letters", of which @ is the only one in the default system. The default setting has the 26 lowercase letters as the first array, the 26 uppercase letters as the second array, and a single-entry array containing only @ as the third array.
 * @param negaLetters ( number | [number, number, number] ) In this notation, the letters are like the digits in an alternate base - this parameter controls how many of the digits in the base are negative. Default is -1, which corresponds to a bijective base. 0 would be a regular base, i.e. including a letter for zero.
 * This parameter must be between -1 and (the amount of letters - 2). If this parameter is a single number, then that's the amount of negative letters for all three letter types, but if it's an array then negaLetters[0] is for the lowercase letters, negaLetters[1] is for the uppercase letters, and negaLetters[2] is for the third letters.
 * @param max_letters ( number ) The highest amount of letters of a single tier - any more, and they're truncated into the next tier. Default is 9.
 * @param fraction ( boolean ) If this parameter is false, a non-whole lowercase letter is represented by decimal places. If this parameter is true, a non-whole lowercase letter is represented by an approximation as a "mixed number" fraction. Default is true. Note that if negaLetters[0] is -1 or equal to letters[0].length, an error will be thrown if this parameter is false, as bijective bases don't allow decimal places.
 * @param placesAbove1 ( number ) If fraction is false, then this is the amount of decimal places shown for numbers above 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off).
 * On the other hand, if fraction is true, then this is the precision of the fractional approximation. If this is positive, the approximation will be within placesAbove1 of the true value. If this is negative, the approximation will be within value/abs(placesAbove1) of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
 * @param placesBelow1 ( number ) Same as placesAbove1, but for values below 1 instead.
 * @param lettersOrder ( number ) The order that the different types of letters go in when multiple are present. Default is 0, which corresponds to [third, uppercase, lowercase]. Each value from 0 to 5 represents a different ordering.
 * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. If this value is negative, commas are never used. Default is -1.
 * @param commaSpacing ( number ) How many digits are between each comma? Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param hyperseparator ( string ) This string goes between each tier of letters. Default is the empty string.
 * @param alwaysHyperseparate ( boolean ) If this parameter is true, hyperseparators appear for every letter tier after the first non-empty one, even if some of the later ones are empty (and thus would normally skip their hyperseparator). Default is false.
 * @param reverseLetters ( boolean ) If this is true, the letters of a single type are written right to left instead of left to right. Default is false.
 * @param minnum ( Decimal ) Numbers less than this are written in terms of their reciprocal. Default is 1.
 * @param recipString ( [string, string] ) The strings used to represent that the letter expression is actually its reciprocal (for numbers below minnum); divisionChar[0] goes before the letter expression, divisionChar[1] goes after the letter expression. Default is ["/", ""].
 * @param specialLetters ( [[(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][]] )
 * An array of three arrays of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different letters (though the amount of letters remains the same). specialLetters[0] is for the lowercase letters, specialLetters[1] is for the uppercase letters, and specialLetters[2] is for the third letters.
 * The function's arguments are the place value of the letter (the last place is place value 0), the letter's distance from the leftmost letter, and the "value" of that letter string (a is 1, z is 26, aa is 27, etc.), and the function returns true if this letter is to use that set of special letters instead of the normal ones; the string array is the set of special letters to be used.
 * Earlier entries in specialLetters take priority, reverting back to the regular letters if none of the special letters apply or if the one that does apply doesn't have enough entries to represent that letter.
 * @param fixedLetters ( [[number, string][], [number, string][], [number, string][]] ) If the value of the letter string matches any of the numbers in that letter type's array in here (fixedLetters[0] is for the lowercase letters, fixedLetters[1] is for the uppercase letters, fixedLetters[2] is for the third letters), the regular letters are not used - instead, the letter string is just set to that number's corresponding string in this array. Default is [[], [], []], i.e. there are no fixed letters.
 * @param concatenation ( [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]] ) concatenation[0] is for lowercase letters, concatenation[1] is for uppercase letters, concatenation[2] is for third letters.
 * If a concatenation entry is not null, then when multiple of the same letter of a single tier are adjacent, they'll be concatenated into a single letter with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[n][1] and concatenation[n][2] are placed before and after the concatenation number. If concatenation[n][3] is undefined, the concatenation number is written as a letter string itself, otherwise it's written in whatever notation is given. If concatenation[n][0] is true, then the concatenation number comes after the letter being concatenated, otherwise it comes before.
 * Default is [null, null, null], i.e. no concatenation occurs.
 *
 * This notation does not have an innerNotation parameter.
 */
declare class LetterDigitsNotation extends Notation {
    private _letters;
    private _negaLetters;
    private _max_letters;
    private _fraction;
    placesAbove1: number;
    placesBelow1: number;
    lettersOrder: number;
    commasMin: Decimal;
    commaSpacing: number;
    commaChars: string[];
    decimalChar: string;
    hyperseparator: string;
    alwaysHyperseparate: boolean;
    reverseLetters: boolean;
    minnum: Decimal;
    recipString: [
        string,
        string
    ];
    specialLetters: [
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][]
    ];
    fixedLetters: [
        [
            number,
            string
        ][],
        [
            number,
            string
        ][],
        [
            number,
            string
        ][]
    ];
    concatenation: [
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ]
    ];
    constructor(letters?: [
        string[],
        string[],
        string[]
    ], negaLetters?: number | [
        number,
        number,
        number
    ], max_letters?: number, fraction?: boolean, placesAbove1?: number, placesBelow1?: number, lettersOrder?: number, commasMin?: DecimalSource, commaSpacing?: number, commaChars?: string[], decimalChar?: string, hyperseparator?: string, alwaysHyperseparate?: boolean, reverseLetters?: boolean, minnum?: DecimalSource, recipString?: [
        string,
        string
    ], specialLetters?: [
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][],
        [
            (placeValue: number, fromStart?: number, outerValue?: number) => boolean,
            string[]
        ][]
    ], fixedLetters?: [
        [
            number,
            string
        ][],
        [
            number,
            string
        ][],
        [
            number,
            string
        ][]
    ], concatenation?: [
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ],
        null | [
            boolean,
            string,
            string,
            Notation?
        ]
    ]);
    name: string;
    infinityString: string; //"Infinite" is a string that can appear for a finite number ((e^9)6226554245.028894, to be precise), so we can't use that word for actual infinity
    formatDecimal(value: Decimal): string;
    get letters(): [
        string[],
        string[],
        string[]
    ];
    set letters(letters: [
        string[],
        string[],
        string[]
    ]);
    get negaLetters(): number | [
        number,
        number,
        number
    ];
    set negaLetters(negaLetters: number | [
        number,
        number,
        number
    ]);
    get max_letters(): number;
    set max_letters(max_letters: number);
    get fraction(): boolean;
    set fraction(fraction: boolean);
}
/**
 * This function gives a physical description of the Decimal it's given, to get across how large the number is.
 * For reasonably-sized numbers, this function expresses them in terms of how large of a volume you could fill with that many litres of water.
 * Once we get beyond the observable universe, it starts going to 4D versions of galaxies and universes, then 5D, and so on.
 * Then, for numbers where the amount of dimensions gets too large, it switches to considering an endlessly-replicating bacteria colony that doubles every second, and it tells you how long it would take for that exponential growth to reach your number.
 * Once that timespan becomes too long, it switches to considering the amount of possible permutations of the atoms in various objects.
 * Beyond that point, it switches between the atoms and bacteria scenarios, examining permutations, then permutations of the permutations, and so on.
 * Finally, for tetrational numbers, it gives up on representing the number itself and instead considers writing them as a power tower of 10s and how tall that power tower would be.
 *
 * Though this function behaves similarly to a Notation, it is not actually a Notation.
 *
 * @param value ( Decimal ! ) The value to give a description of.
 */
declare function physicalScale(value: DecimalSource): string;
/**
 * Similar to LogarithmNotation, but each iteration takes multiple logarithms of different bases.
 * @param bases ( Decimal[] ! ) The list of bases for the logarithm iterations. For example, if bases is [10, 2], then each iteration performs .log(10).log(2) on the value.
 * @param iterations ( number ) The amount of logarithm iterations. This can be negative.
 * @param max_es_in_a_row ( number ) If the logarithm representation would have more E's at the beginning than this, those E's are made into an E^n expression. Default is 5.
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the E in "E10", expChars[1] takes the place of the first E in "EE10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (E^) in (E^10)4. Default is [["E", ""], ["E", ""], ["(E^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as E^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (E^n) expression comes after the number instead of before.
 * @param expMults ( Decimal[] ) On each logarithm, the result is multiplied by the corresponding number in this array. If expMults has less entries than bases, the remaining entries are given an expMult of 1. Default is an empty array, which is equivalent to an array of 1s.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (E^n) expression is itself notated with. Is the same as innerNotation by default.
 */
declare class MultibaseLogarithmNotation extends Notation {
    private _bases;
    _iterations: number;
    max_es_in_a_row: number;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    private _expMults;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    constructor(bases: DecimalSource[], iterations?: number, max_es_in_a_row?: number, expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, expMults?: DecimalSource[], innerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    private setBasesAndExpMults;
    get bases(): DecimalSource[];
    set bases(bases: DecimalSource[]);
    get expMults(): DecimalSource[];
    set expMults(expMults: DecimalSource[]);
    get iterations(): number;
    set iterations(iterations: number);
}
/**
 * Similar to MultiLogarithmNotation, but each iteration takes multiple logarithms of different bases.
 * @param bases ( Decimal[] ! ) The list of bases for the logarithm iterations. For example, if bases is [10, 2], then each iteration performs .log(10).log(2) on the value.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e12.
 * @param max_es_in_a_row ( number ) If the logarithm representation would have more E's at the beginning than this, those E's are made into an E^n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the E in "E10", expChars[1] takes the place of the first E in "EE10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (E^) in (E^10)4. Default is [["E", ""], ["E", ""], ["(E^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as E^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, an (E^n) expression comes after the number instead of before.
 * @param expMults ( Decimal[] ) On each logarithm, the result is multiplied by the corresponding number in this array. If expMults has less entries than bases, the remaining entries are given an expMult of 1. Default is an empty array, which is equivalent to an array of 1s.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (E^n) expression is itself notated with. Is the same as innerNotation by default.
 */
declare class MultibaseMultiLogarithmNotation extends Notation {
    private _bases;
    private _maxnum;
    max_es_in_a_row: number;
    _minIterations: number;
    private _engineerings;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    private _expMults;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    constructor(bases: DecimalSource[], maxnum?: DecimalSource, max_es_in_a_row?: number, minIterations?: number, engineerings?: DecimalSource | DecimalSource[], expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, expMults?: DecimalSource[], innerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    private setBasesAndExpMults;
    get bases(): DecimalSource[];
    set bases(bases: DecimalSource[]);
    get expMults(): DecimalSource[];
    set expMults(expMults: DecimalSource[]);
    get minIterations(): number;
    set minIterations(minIterations: number);
}
/**
 * Scientific notation, but with "weak tetration" instead of exponentiation, where weak tetration is repeated exponentiation but evaluated bottom-to-top instead of top-to-bottom. xfy = (base↓↓y)^x, where base↓↓y = (((base^base)^base)^base...)^base = base^base^(y - 1).
 * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in weak hyperscientific notation. Default is 1e12.
 * @param max_fs_in_a_row ( number ) If the weak hyperscientific representation would have more f's at the beginning than this, those f's are made into an f^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in weak hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "3.543f2" would become "35.43f1" with 1 mantissaPower and "354.3f0" with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the weak hyperscientific notation and jump directly to the innerNotation - useful if you want 100 to just be abbreviated as "100" instead of "2f1". Default is false.
 * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2f1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for weak hyperscientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the f in "1f10", expChars[1] takes the place of the first f in "f1f10", and expChars[2] takes the place of the (f^) in (f^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["f", ""], ["f", ""], ["(f^", ")"]].
 * @param negExpChars ( null | [[string, string], [string, string], [string, string]] ) This can either be null or an array of three pairs of strings. Ignore this parameter if it's null, which is the default. Otherwise, this acts like expChars, but it's used when the exponent is negative. Default is null.
 * @param recipString ( null | [string, string] ) If this parameter is null, numbers below 1 are just written in mantissaInnerNotation. If this parameter is a pair of strings, then numbers below 1 are written in terms of their reciprocal, with recipString[0] going before the reciprocal and recipString[1] going after the reciprocal. Default is ["1 / ", ""].
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (f^n) expressions come after the rest of the number instead of before. Default is false.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (f^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class WeakHyperscientificNotation extends Notation {
    private _maxnum;
    max_fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    iteration_zero: boolean;
    private _base;
    private _expChars;
    private _negExpChars;
    recipString: null | [
        string,
        string
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    private unconvertedNegExpChars;
    constructor(maxnum?: DecimalSource, max_fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], recipString?: [
        string,
        string
    ], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
    get negExpChars(): null | [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set negExpChars(input: null | [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * This notation performs weak hyperscientific notation a certain number of times. 1 iteration means the number is in the form AfB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AfBfC, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_fs_in_a_row ( number ) If the scientific representation would have more f's at the beginning than this, those f's are made into an f^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in weak hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "3.543f2" would become "35.43f1" with 1 mantissaPower and "354.3f0" with 2 mantissaPower.
 * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2f1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for weak hyperscientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the f in "1f10", expChars[1] takes the place of the first f in "f1f10", and expChars[2] takes the place of the (f^) in (f^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["f", ""], ["f", ""], ["(f^", ")"]].
 * @param negExpChars ( null | [string, string] ) This can either be null or a pair of strings. Ignore this parameter if it's null, which is the default. Otherwise, this acts like expChars[0], but it's used when the exponent is negative. Default is null.
 * @param recipString ( null | [string, string] ) If this parameter is null, numbers below 1 are just written in mantissaInnerNotation. If this parameter is a pair of strings, then numbers below 1 are written in terms of their reciprocal, with recipString[0] going before the reciprocal and recipString[1] going after the reciprocal. Default is ["1 / ", ""].
 * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (f^n) expressions come after the rest of the number instead of before. Default is false.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (f^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class WeakHyperscientificIterationsNotation extends Notation {
    private _iterations;
    max_fs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    _base: Decimal;
    private _expChars;
    negExpChars: null | [
        string,
        string
    ];
    recipString: null | [
        string,
        string
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_fs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        string,
        string
    ], recipString?: [
        string,
        string
    ], expBefore?: boolean, superexpAfter?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * Hyperscientific notation, but with pentation instead of tetration. Abbreviates 9 as "9G0", 10^10^10 as "3G1", and 10^^10,000,000,000 as "2G2" (though that last one is too big for this library).
 * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in penta-scientific notation. Default is 1e10.
 * @param max_Gs_in_a_row ( number ) If the penta-scientific representation would have more G's at the beginning than this, those G's are made into an G^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in penta-scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^^2, if mantissaPower is 2 then the bounds are base^^^2 and base^^^3, and so on. For example, a number normally represented as "2G2" would become "(1e10)G1" with 1 mantissaPower and "(10^^1e10)G0" with 2 mantissaPower.
 * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2G0". Default is false.
 * @param base ( Decimal ) Penta-scientific notation normally works in penta-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 9^^2 becomes "2G1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the penta-exponent, the second entry goes after the penta-exponent. expChars[0] takes the place of the G in "1G10", expChars[1] takes the place of the first G in "G1G10", and expChars[2] takes the place of the (G^) in (G^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["G", ""], ["G", ""], ["(G^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the penta-exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (G^n) expressions come after the rest of the number instead of before. Default is false.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in penta-scientific directly. Default is true.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest penta-exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (G^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class PentaScientificNotation extends Notation {
    private _maxnum;
    max_Gs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    iteration_zero: boolean;
    private _base;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    formatNegatives: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(maxnum?: DecimalSource, max_Gs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, iteration_zero?: boolean, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, formatNegatives?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * This notation performs penta-scientific notation a certain number of times. 1 iteration means the number is in the form AGB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AGBGC, and so on.
 * @param iterations ( number ! ) The amount of iterations.
 * @param max_Gs_in_a_row ( number ) If the penta-scientific representation would have more G's at the beginning than this, those G's are made into an G^n expression. Default is 5.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in penta-scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^^2, if mantissaPower is 2 then the bounds are base^^^2 and base^^^3, and so on. For example, a number normally represented as "2G2" would become "(1e10)G1" with 1 mantissaPower and "(10^^1e10)G0" with 2 mantissaPower.
 * @param base ( Decimal ) Penta-scientific notation normally works in penta-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 9^^2 becomes "2G1".
 * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the penta-exponent, the second entry goes after the penta-exponent. expChars[0] takes the place of the G in "1G10", expChars[1] takes the place of the first G in "G1G10", and expChars[2] takes the place of the (G^) in (G^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["G", ""], ["G", ""], ["(G^", ")"]].
 * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
 * @param expBefore ( boolean ) If this parameter is true, the penta-exponent comes before the mantissa instead of after. Default is false.
 * @param superexpAfter ( boolean ) If this parameter is true, (G^n) expressions come after the rest of the number instead of before. Default is false.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in penta-scientific directly. Default is true.
 * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
 * @param exponentInnerNotation ( Notation ) The notation that the highest penta-exponent is itself notated with. Is the same as mantissaInnerNotation by default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (G^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
 */
declare class PentaScientificIterationsNotation extends Notation {
    private _iterations;
    max_Gs_in_a_row: number;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _engineerings;
    mantissaPower: Decimal;
    private _base;
    private _expChars;
    negExpChars: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ];
    expBefore: boolean;
    superexpAfter: boolean;
    formatNegatives: boolean;
    mantissaInnerNotation: Notation;
    exponentInnerNotation: Notation;
    superexponentInnerNotation: Notation;
    private unconvertedExpChars;
    constructor(iterations: number, max_Gs_in_a_row?: number, rounding?: DecimalSource | ((value: Decimal) => Decimal), engineerings?: DecimalSource | DecimalSource[], mantissaPower?: DecimalSource, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ], negExpChars?: null | [
        [
            string,
            string
        ] | boolean,
        [
            string,
            string
        ]
    ], expBefore?: boolean, superexpAfter?: boolean, formatNegatives?: boolean, mantissaInnerNotation?: Notation, exponentInnerNotation?: Notation, superexponentInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get iterations(): number;
    set iterations(iterations: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get expChars(): [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ];
    set expChars(input: [
        [
            string,
            string
        ],
        [
            string | boolean,
            string | boolean
        ],
        [
            string,
            string
        ]
    ]);
}
/**
 * Abbreviates numbers in terms of their pentational logarithm, so 10 is "G1" and 10^^10^^10 is "G3". Uses the linear approximations of tetration and pentation.
 * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Penta-Logarithm notation, 2 is double Penta-Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "plg(10^^10)".
 * @param max_Gs_in_a_row ( number ) If the penta-logarithm representation would have more G's at the beginning than this, those G's are made into an G^n expression. Default is 5.
 * @param base ( Decimal ) This notation normally works in penta-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 9^^9 becomes "G2".
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the G in "G10", expChars[1] takes the place of the first G in "GG10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (G^) in (G^10)4. Default is [["G", ""], ["G", ""], ["(G^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["plg", ""], ["plg", ""], ["(plg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as G^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, a (G^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in penta-logarithm notation directly. Default is false.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (G^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class PentaLogarithmNotation extends Notation {
    private _iterations;
    max_Gs_in_a_row: number;
    private _base;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    formatNegatives: boolean;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(iterations?: number, max_Gs_in_a_row?: number, base?: DecimalSource, expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, formatNegatives?: boolean, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get iterations(): number;
    set iterations(iterations: number);
    get base(): DecimalSource;
    set base(base: DecimalSource);
}
/**
 * A variant of penta-logarithm notation that uses a different amount of penta-logarithm iterations depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_Gs_in_a_row ( number ) If the penta-logarithm representation would have more G's at the beginning than this, those G's are made into an G^n expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
 * @param base ( Decimal ) This notation normally works in penta-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 9^^9 becomes "G2".
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the G in "G10", expChars[1] takes the place of the first G in "GG10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (G^) in (G^10)4. Default is [["G", ""], ["G", ""], ["(G^", ")"]].
 * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["plg", ""], ["plg", ""], ["(plg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as G^-1.
 * @param superexpAfter ( boolean ) This is false by default; if it's true, a (G^n) expression comes after the number instead of before.
 * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
 * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in penta-logarithm notation directly. Default is false.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (G^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiPentaLogarithmNotation extends Notation {
    private _maxnum;
    max_Gs_in_a_row: number;
    minIterations: number;
    private _base;
    private _engineerings;
    expChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    logChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    baseShown: number;
    formatNegatives: boolean;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, max_Gs_in_a_row?: number, minIterations?: number, base?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], expChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], logChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, baseShown?: number, formatNegatives?: boolean, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
}
/**
 * Abbreviates numbers in terms of their pentational root; this is the square penta-root by default, so e8.0723e153 is 4↑↑↑2 and eee2.069e36,305 is 6↑↑↑2.
 * @param height ( number ) The height of the penta-root. Default is 2. This notation does not work with a penta-root height less than 1.
 * @param iterations ( number ) The amount of penta-root iterations: 1 is regular Penta-Root notation, 2 means the penta-root is taken twice, and so on. This can be negative.
 * @param max_in_a_row ( number ) If there are more penta-root iterations than this, then the ↑↑↑b's are made into a (↑↑↑b^n) expression. Default is 5.
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate penta-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑↑ in "7↑↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑↑2)↑↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑↑^) in 6(↑↑↑^7)2. Default is [["", "↑↑↑"], ["(", ")↑↑↑"], ["(↑↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a penta-root of negative iterations. Default is [["proot(", ")"], ["proot(", ")"], ["(proot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑↑^-1).
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑↑^n) expression comes after the number instead of before.
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class PentaRootNotation extends Notation {
    private _height;
    private _iterations;
    max_in_a_row: number;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(height?: number, iterations?: number, max_Gs_in_a_row?: number, rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get height(): number;
    set height(height: number);
    get iterations(): number;
    set iterations(iterations: number);
}
/**
 * A variant of penta-root notation that uses a different amount of penta-root iterations depending on how large the number is.
 * @param height ( number ) The height of the penta-root. Default is 2. This notation does not work with a penta-root height less than 1.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
 * @param max_in_a_row ( number ) If there are more penta-root iterations than this, then the ↑↑↑b's are made into a (↑↑↑b^n) expression. Default is 5.
 * @param minIterations ( number ) The minimum amount of penta-root iterations. Default is 1.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate penta-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑↑ in "7↑↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑↑2)↑↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑↑^) in 6(↑↑↑^7)2. Default is [["", "↑↑↑"], ["(", ")↑↑↑"], ["(↑↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a penta-root of negative iterations. Default is [["proot(", ")"], ["proot(", ")"], ["(proot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑↑^-1).
 * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑↑^n) expression comes after the number instead of before.
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class MultiPentaRootNotation extends Notation {
    private _height;
    private _maxnum;
    max_in_a_row: number;
    minIterations: number;
    private _engineerings;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(height?: number, maxnum?: DecimalSource, max_in_a_row?: number, minIterations?: number, engineerings?: DecimalSource | DecimalSource[], rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get height(): number;
    set height(height: number);
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * A variant of penta-root notation that uses a different penta-root height depending on how large the number is.
 * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 65536.
 * @param minHeight ( number ) The minimum penta-root height. Default is 2.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate penta-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑↑ in "7↑↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑↑2)↑↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑↑^) in 6(↑↑↑^7)2. Default is [["", "↑↑↑"], ["(", ")↑↑↑"], ["(↑↑↑^", ")"]].
 * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a penta-root of negative iterations. Default is [["proot(", ")"], ["proot(", ")"], ["(proot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑↑^-1).
 * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
 * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
 * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
 */
declare class IncreasingPentaRootNotation extends Notation {
    private _maxnum;
    private _minHeight;
    private _engineerings;
    rootChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    inverseChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null;
    heightShown: number;
    innerNotation: Notation;
    baseInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, minHeight?: number, engineerings?: DecimalSource | DecimalSource[], rootChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], inverseChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ] | null, heightShown?: number, innerNotation?: Notation, baseInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get maxnum(): DecimalSource;
    set maxnum(maxnum: DecimalSource);
    get minHeight(): number;
    set minHeight(minHeight: number);
    get engineerings(): DecimalSource | DecimalSource[];
    set engineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * Takes any strictly increasing Decimal => Decimal function (preferrably one whose outputs are larger than its inputs) and uses Decimal.increasingInverse to create a Logarithm-style notation using it.
 * For example, if the function is (v => v.pow(6)), then 729 would be written as f(3).
 * @param func ( (value : Decimal) => Decimal ! ) The function that this notation uses. This function must be strictly increasing, and unless maxnum is false, it should return an output larger than its input, at least for numbers above the maxnum.
 * @param inverseAlready ( boolean ) If this parameter is false, then "func" is the function to take the inverse of. If this parameter is true, then "func" is already the inverse function.
 * For example, if you want the function to be (v => Decimal.tetrate(2, v)) (which would make this notation equivalent to base-2 super logarithm), then if inverseAlready is true,
 * you'd enter (v => Decimal.slog(v, 2)) as func instead. Decimal.increasingInverse can be slow, so doing this is mostly useful for speed purposes.
 * @param layerFunction ( (value : Decimal) => Decimal ) For numbers too large to just repeatedly apply func, layerFunction is used to determine how many extra "layers" to add on.
 * The default value of layerFunction is value => Decimal.tetrate(10, value.toNumber(), 1, true), i.e. each layer increases the tetra-exponent by 1, i.e. each layer is a power tower layer.
 * @param layerInverseAlready ( boolean ) Same as inverseAlready, but for layerFunction instead.
 * @param layerMimics ( boolean ) If this parameter is false, then layers and iterations are treated as separate. If this parameter is true, then layers act as if they're additional iterations.
 * You should probably only make this parameter true if your layerFunction is approximating what repeatedly applying func would do to large numbers.
 * @param iterationChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate iterations of the function. In each pair, the first entry goes before the number, the second entry goes after the number. iterationChars[0] takes the place of the f() in "f(25)", iterationChars[1] takes the place of the first f() in "f(f(654))" (iterationChars[0] is for the innermost iteration, iterationChars[1] is for the outer ones), and iterationChars[2] takes the place of the (f^) in (f^10)4. Default is [["f(", ")"], ["f(", ")"], ["(f^", ")"]].
 * @param negIterationChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of iterationChars used for negative iterations. Default is [["f^-1(", ")"], ["f^-1(", ")"], ["(f^-", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of iterationChars[2], such as (f^-2).
 * @param layerChars ( [[string, string], [string, string], [string, string]] ) Same as iterationChars, but for layers instead of iterations. Since each layer is equivalent to an exponent level by default, the default is [["e", ""], ["e", ""], ["(e^", ")"]]. This parameter is unused if layerMimics is true.
 * @param minIterations ( Decimal ) The minimum amount of iterations of the function. Default is 1.
 * @param maxnum ( Decimal | null ) If this parameter is a Decimal, then whenever the number within the function would exceed this value, another iteration of the function is taken to bring it back below this value. If this value is null, then there is no maximum, so the amount of iterations does not change. Default is 1e12.
 * @param layer_maxnum ( Decimal ) Whenever the number, before applying any function iterations, is above this value, the amount of layers is increased to bring it back below this value. Default is (e^6)12.
 * @param rangeMinimum ( Decimal ) The minimum value that is allowed to be put into the function. If the value given would result in a function argument below this value, the function cannot be applied, and so the amount of iterations is reduced. Default is 0, which doesn't really do anything because notations already handle negatives separately... except if this value is below 0, negatives above this value are handled directly by the function instead of using negativeSign.
 * @param rangeMaximum ( Decimal ) The maximum value that is allowed to be put into the function. This value must be greater than maxnum, so this parameter doesn't really do anything for the notation, but depending on what function you're using, it may be useful in ensuring Decimal.increasingInverse doesn't try testing invalid values.
 * @param max_iterations_in_a_row ( number ) If there are more iterations than this, the f()'s are made into an f^n expression. Default is 5.
 * @param max_layers_in_a_row ( number ) If there are more layers than this, the e's are made into an e^n expression. Default is 3. This parameter is unused if layerMimics is true.
 * @param superexpAfter ( [boolean, boolean, boolean] ) If superexpAfter[0] is true, the f^n expression from iterationChars comes after the number instead of before. superexpAfter[1] is for negExpChars, superexpAfter[2] is for layerChars. Default is [false, false, false].
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The number within the function is rounded to the nearest multiple of this value. If this parameter is a function, then the value is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted amounts of iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param layerEngineerings ( Decimal | Decimal[] ) Same as iterationEngineerings, but for layers instead of iterations. Default is 1.
 * @param innerNotation ( Notation ) The notation that the number within the function is itself notated with. DefaultNotation is the default.
 * @param iterationInnerNotation ( Notation | null ) The notation that the number in an (f^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as innerNotation by default.
 * @param layerInnerNotation ( Notation | null ) The notation that the number in an (e^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as iterationInnerNotation by default. This parameter is unused if layerMimics is true.
 * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal (which happens if it's below 1 and it violates rangeMinimum's lower bound but its reciprocal does not), recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is ["1 / ", ""].
 */
declare class IncreasingFunctionNotation extends Notation {
    func: (value: Decimal) => Decimal;
    inverseAlready: boolean;
    layerFunction: (value: Decimal) => Decimal;
    layerInverseAlready: boolean;
    layerMimics: boolean;
    iterationChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    negIterationChars: null | [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    layerChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    private _minIterations;
    maxnum: Decimal | null;
    layer_maxnum: Decimal;
    private _rangeMinimum;
    private _rangeMaximum;
    max_iterations_in_a_row: number;
    max_layers_in_a_row: number;
    superexpAfter: [
        boolean,
        boolean,
        boolean
    ];
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _iterationEngineerings;
    private _layerEngineerings;
    innerNotation: Notation;
    iterationInnerNotation: Notation | null;
    layerInnerNotation: Notation | null;
    recipString: [
        string,
        string
    ];
    constructor(func: (value: Decimal) => Decimal, inverseAlready?: boolean, layerFunction?: (value: Decimal) => Decimal, layerInverseAlready?: boolean, layerMimics?: boolean, iterationChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], negIterationChars?: null | [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], layerChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], minIterations?: DecimalSource, maxnum?: DecimalSource | null, layer_maxnum?: DecimalSource, rangeMinimum?: DecimalSource, rangeMaximum?: DecimalSource, max_iterations_in_a_row?: number, max_layers_in_a_row?: number, superexpAfter?: [
        boolean,
        boolean,
        boolean
    ], rounding?: DecimalSource | ((value: Decimal) => Decimal), iterationEngineerings?: DecimalSource | DecimalSource[], layerEngineerings?: DecimalSource | DecimalSource[], innerNotation?: Notation, iterationInnerNotation?: Notation | null, layerInnerNotation?: Notation | null, recipString?: [
        string,
        string
    ]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get minIterations(): DecimalSource;
    set minIterations(minIterations: DecimalSource);
    private setRange;
    get rangeMinimum(): DecimalSource;
    set rangeMinimum(minimum: DecimalSource);
    get rangeMaximum(): DecimalSource;
    set rangeMaximum(maximum: DecimalSource);
    get iterationEngineerings(): DecimalSource | DecimalSource[];
    set iterationEngineerings(engineerings: DecimalSource | DecimalSource[]);
    get layerEngineerings(): DecimalSource | DecimalSource[];
    set layerEngineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * Takes an increasing function that takes multiple Decimals as input and returns a Decimal, and uses Decimal.increasingInverse to create a Scientific-style notation using it.
 * The last argument is considered the highest priority argument to increment, like how the exponent is higher-priority than the mantissa in regular scientific notation.
 * @param func ( (...values : Decimal[]) => Decimal ! ) The function that is being used. It can have any amount of Decimal arguments, but it must return a Decimal (and it must have a fixed amount of arguments - the arguments can't themselves be an array of Decimals)
 *
 * NOTE: Due to how important this function is in determining the rest of the parameters, once an instance of IncreasingFunctionScientificNotation has been constructed,
 * you cannot change its func to a function with a different amount of arguments than the func it had before. Create a new IncreasingFunctionScientificNotation instance if you want to use a function with a different number of arguments.
 *
 * @param limits ( Decimal[] ! ) limits[0] is the minimum value that the first argument is allowed to have; anything less, and the second argument is decreased to bring the first argument back over that limit. Likewise, limits[1] is the minimum for the second argument, limits[2] is the minimum for the third argument, and so on.
 * The last argument does not have a limit. If this array has less values than (amount of arguments - 1), then all unfilled values will be set equal to the last value that was given.
 * @param limitsAreMaximums ( boolean ) If this parameter is true, the limits are maximums instead of minimums. Default is false.
 * @param engineerings ( Decimal | Decimal[][] ) Either a DecimalSource or an array of arrays of DecimalSources; default is 1. This parameter controls the allowed values for each argument: for example, if engineerings[0] is [3], then the second argument will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings[1] is [5, 2], then the permitted values for the third argument are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * The first argument does not have an engineerings array. If engineerings is a single value, then every argument is given that single value as its engineerings entry. If engineerings is an array with less arguments than (amount of arguments - 1), then all unfilled entries will be set equal to the last entry that was given.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The first argument is rounded to the nearest multiple of this value. If this parameter is a function, then the first argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * NOTE: Unlike the rounding parameter in other scientific notations functions, this one does not detect "overflow", so rounding may cause the first argument to go under or over its limit.
 * @param rangeLimits ( [Decimal, Decimal][] ) For the purposes of ensuring Decimal.increasingInverse functions properly, these parameters set limits on the domain of the function.
 * For each entry, rangeLimits[a][0] is the minimum for an argument, rangeLimits[a][1] is the maximum for an argument.
 * These parameters do nothing for the actual result, they only ensure valid behavior.
 * @param revertValues ( (Decimal | boolean)[] ) If an argument would end up with a non-finite value (such as if increasingInverse returned NaN), that argument's revertValue entry determines what it becomes instead.
 * If the revertValues entry is 'true', then that argument reverts to its limit. If the revertValues entry is a Decimal, then that argument becomes that value. If the revertValues entry is 'false', the non-finite value remains.
 * @param argumentOrder ( number[] ) This array should contain the numbers from 0 to (amount of arguments - 1), and it decides what order they're added to the notation's output:
 * for example, if argumentOrder is [0, 2, 1, 3], then the first argument is added first, then the third, then the second, and finally the fourth. This does not change their priority numerically, only their positions in the notation's output.
 * If the array given does not contain some arguments, those arguments are added at the end. Default is the empty array, which becomes the default of [0, 1, 2, 3, etc.].
 * @param argumentChars ( [string, string, string, string, string, string][] ) When one of the arguments is added to the notation's output, argumentChars[n][0] is placed before the entire expression thus far before the argument is added, argumentChars[n][1] is placed after the entire expression thus far before the argument is added,
 * argumentChars[n][2] is placed around the argument itself and [n][3] is placed after the argument itself, and [n][4] and [n][5] are placed before and after the entire expression after the argument is added.
 * If this parameter is given less entries than (amount of arguments), the remaining entries are filled in with [["", "", "", ", ", "", ""]], except for the entry corresponding to the argument that's last in argumentOrder, which gets [["", "", "", "", "", ""]].
 * @param argumentToLeft ( boolean[] ) If an argument's corresponding entry in this array is true, that argument is outputted to the left of the expression thus far instead of the right. Default is an array consisting entirely of false, and if this parameter is given less entries than (amount of arguments), the remaining ones default to false.
 * @param argumentShown ( (value : Decimal, index : number, allArguments : Decimal[]) => boolean ) If an argument's value would return false when run through this function (similar to Array.map()'s callback function, the second argument is the index of that parameter in the array of parameters, the third argument is the entire array of parameters), that argument is not shown in the notation's output. Default is (value) => true, meaning it does nothing by default.
 * @param innerNotations ( Notation | Notation[] ) Either a Notation or an array of Notations. If this is a single Notation, then every argument is itself written in that notation. If this is an array, then each argument is itself written in its corresponding innerNotations entry. If the array has less entries than (amount of arguments), the remaining entries are written in DefaultNotation.
 * @param iteration_maxnum ( Decimal ) If the value exceeds this number, then before running it through func, iterations of iterationFunc are applied to bring it back below this value. Default is (e^5)12.
 * @param iterationFunction ( (value : Decimal) => Decimal ) The function that's applied to numbers over iteration_maxnum to bring them back under iteration_maxnum. Default is value => Decimal.pow(10, value).
 * @param iterationInverseAlready ( boolean ) If this parameter is false, then "iterationFunction" is the function to take the inverse of. If this parameter is true, then "iterationFunction" is already the inverse function.
 * For example, if you want iterationFunction to be (v => Decimal.tetrate(2, v)), then if inverseAlready is true,
 * you'd enter (v => Decimal.slog(v, 2)) as iterationFunction instead. Decimal.increasingInverse can be slow, so doing this is mostly useful for speed purposes.
 * @param layer_maxnum ( Decimal ) Whenever the number, before applying any function iterations, is above this value, the amount of layers is increased to bring it back below this value. Default is (e^5)12.
 * @param layerFunction ( (value : Decimal) => Decimal ) For numbers too large to just repeatedly apply iterationFunction, layerFunction is used to determine how many extra "layers" to add on.
 * The default value of layerFunction is value => Decimal.tetrate(10, value.toNumber(), 1, true), i.e. each layer increases the tetra-exponent by 1, i.e. each layer is a power tower layer.
 * @param layerInverseAlready ( boolean ) Same as iterationInverseAlready, but for layerFunction instead.
 * @param layerMimics ( boolean ) If this parameter is false, then layers and iterations are treated as separate. If this parameter is true, then layers act as if they're additional iterations.
 * You should probably only make this parameter true if your layerFunction is approximating what repeatedly applying iterationFunction would do to large numbers.
 * @param iterationChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate iterations of iterationFunction. In each pair, the first entry goes before the number, the second entry goes after the number. iterationChars[0] takes the place of the f() in "f(25)", iterationChars[1] takes the place of the first f() in "f(f(654))" (iterationChars[0] is for the innermost iteration, iterationChars[1] is for the outer ones), and iterationChars[2] takes the place of the (f^) in (f^10)4. Default is [["f(", ")"], ["f(", ")"], ["(f^", ")"]].
 * @param layerChars ( [[string, string], [string, string], [string, string]] ) Same as iterationChars, but for layers instead of iterations. Since each layer is equivalent to an exponent level by default, the default is [["e", ""], ["e", ""], ["(e^", ")"]]. This parameter is unused if layerMimics is true.
 * @param max_iterations_in_a_row ( number ) If there are more iterations than this, the f()'s are made into an f^n expression. Default is 5.
 * @param max_layers_in_a_row ( number ) If there are more layers than this, the e's are made into an e^n expression. Default is 3. This parameter is unused if layerMimics is true.
 * @param superexpAfter ( [boolean, boolean] ) If superexpAfter[0] is true, the f^n expression from iterationChars comes after the number instead of before. superexpAfter[1] is for layerChars. Default is [false, false].
 * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted amounts of iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param layerEngineerings ( Decimal | Decimal[] ) Same as iterationEngineerings, but for layers instead of iterations. Default is 1.
 * @param iterationInnerNotation ( Notation ) The notation that the number in an (f^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. DefaultNotation is the default.
 * @param layerInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as iterationInnerNotation by default. This parameter is unused if layerMimics is true.
 * @param minValue ( Decimal ) The minimum value that is allowed to be run through func. Values below this are just written in innerNotations[0] directly, unless they are reciprocals of numbers that are not below minValue. Default is 0.
 * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal (which happens if it's below 1 and it's below minValue but its reciprocal is not), recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is ["1 / ", ""].
 */
declare class IncreasingFunctionScientificNotation extends Notation {
    private _func;
    private _limits;
    limitsAreMaximums: boolean;
    private _engineerings;
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    private _rangeLimits;
    private _revertValues;
    private _argumentOrder;
    private _argumentChars;
    private _argumentToLeft;
    argumentShown: (value: Decimal, index: number, allArguments: Decimal[]) => boolean;
    private _innerNotations;
    private argamount;
    iteration_maxnum: Decimal;
    iterationFunction: (value: Decimal) => Decimal;
    iterationInverseAlready: boolean;
    layer_maxnum: Decimal;
    layerFunction: (value: Decimal) => Decimal;
    layerInverseAlready: boolean;
    layerMimics: boolean;
    iterationChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    layerChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    max_iterations_in_a_row: number;
    max_layers_in_a_row: number;
    superexpAfter: [
        boolean,
        boolean
    ];
    private _iterationEngineerings;
    private _layerEngineerings;
    iterationInnerNotation: Notation | null;
    layerInnerNotation: Notation | null;
    minValue: Decimal;
    recipString: [
        string,
        string
    ];
    constructor(func: (...values: Decimal[]) => Decimal, limits: DecimalSource[], limitsAreMaximums?: boolean, engineerings?: DecimalSource | DecimalSource[][], rounding?: DecimalSource | ((value: Decimal) => Decimal), rangeLimits?: [
        DecimalSource,
        DecimalSource
    ][], revertValues?: (DecimalSource | boolean)[], argumentOrder?: number[], argumentChars?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], argumentToLeft?: boolean[], argumentShown?: (value: Decimal, index: number, allArguments: Decimal[]) => boolean, innerNotations?: (Notation | null) | (Notation | null)[], iteration_maxnum?: DecimalSource, iterationFunction?: (value: Decimal) => Decimal, iterationInverseAlready?: boolean, layer_maxnum?: DecimalSource, layerFunction?: (value: Decimal) => Decimal, layerInverseAlready?: boolean, layerMimics?: boolean, iterationChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], layerChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], max_iterations_in_a_row?: number, max_layers_in_a_row?: number, superexpAfter?: [
        boolean,
        boolean
    ], iterationEngineerings?: DecimalSource | DecimalSource[], layerEngineerings?: DecimalSource | DecimalSource[], iterationInnerNotation?: Notation | null, layerInnerNotation?: Notation | null, minValue?: DecimalSource, recipString?: [
        string,
        string
    ]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get func(): (...values: Decimal[]) => Decimal;
    set func(func: (...values: Decimal[]) => Decimal);
    get limits(): DecimalSource[];
    set limits(limits: DecimalSource[]);
    get engineerings(): DecimalSource | DecimalSource[][];
    set engineerings(input: DecimalSource | DecimalSource[][]);
    get rangeLimits(): [
        DecimalSource,
        DecimalSource
    ][];
    set rangeLimits(rangeLimits: [
        DecimalSource,
        DecimalSource
    ][]);
    get revertValues(): (DecimalSource | boolean)[];
    set revertValues(revertValues: (DecimalSource | boolean)[]);
    get argumentChars(): [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    set argumentChars(argumentChars: [
        string,
        string,
        string,
        string,
        string,
        string
    ][]);
    get argumentOrder(): number[];
    set argumentOrder(argumentOrder: number[]);
    get argumentToLeft(): boolean[];
    set argumentToLeft(argumentToLeft: boolean[]);
    get iterationEngineerings(): DecimalSource | DecimalSource[];
    set iterationEngineerings(engineerings: DecimalSource | DecimalSource[]);
    get layerEngineerings(): DecimalSource | DecimalSource[];
    set layerEngineerings(engineerings: DecimalSource | DecimalSource[]);
    get innerNotations(): (Notation | null) | (Notation | null)[];
    set innerNotations(innerNotations: (Notation | null) | (Notation | null)[]);
}
/**
 * Uses three increasing functions to create a Double Factorials-style notation: numbers are expressed as a series of terms, where each term is a whole number run through the first function, then
 * raised to some power (or whatever the second function does), and the terms are multiplied together (or whatever the third function does).
 * @param termFunc ( (value : Decimal) => Decimal ! ) The function applied to integers to generate the terms.
 * @param powerFunc ( (term : Decimal, power : Decimal) => Decimal ) The function used in place of raising a term to a power. Default is (term, power) => Decimal.pow(term, power).
 * @param betweenFunc ( (leftover : Decimal, term : Decimal) => Decimal ) The function that combines each term. "leftover" is value from the rest of the terms thus far. Default is (leftover, term) => Decimal.mul(leftover, term).
 * @param termInverseAlready ( boolean ) If this parameter is false, termFunc is the increasing function, so Decimal.increasingInverse is used to figure out what the terms are based on the value given.
 * If this parameter is true, then termFunc is already the inverse function. Default is false.
 * @param powerInverseAlready ( boolean ) If this parameter is false, then powerFunc takes the current term and the power and returns their combination's value. If this parameter is true, then
 * powerFunc is the inverse function: it takes a value and the current term and finds the power that that term would need to be combined with to make that value. Default is false.
 * @param betweenInverseAlready ( boolean ) If this parameter is false, then betweenFunc takes the remaining number and the current term and returns the total value. If this parameter is true, then
 * betweenFunc is the inverse function: it takes the total value and the current term and finds the leftover value that that term would need to be combined with to make that value. Default is false.
 * @param maxTerms ( number ) If there would be too many terms, only the largest few are shown. This parameter controls the maximum amount of terms shown. Default is 8.
 * @param termChars ( [string, string] ) These two strings are placed around each term's number: termChars[0] goes before the term number, termChars[1] goes after. Default is ["f(", ")"].
 * @param powerChars ( [string, string, string] ) When the power is large enough to be shown (which, by default, is when it's above 1), powerChars[0] is placed before the power number, powerChars[1] is placed after, and powerChars[2] is placed on the opposite side of the term from the other two. Default is ["^", "", ""].
 * @param betweenChar ( string ) This string is placed between each term. Default is " * ".
 * @param powerBefore ( boolean ) If this parameter is false, a term's power is written after the term itself. If this parameter is true, the power is written before the term. Default is false.
 * @param reverseTerms ( boolean ) If this parameter is false, terms are written largest to smallest. If this parameter is true, terms are written smallest to largest. Default is false.
 * @param minTerm ( Decimal ) The smallest allowed term number. If the term number would go below this, a constant term (i.e. a term that's just a plain value without using termFunc or powerFunc) is added and the terms stop after that. Default is 1.
 * @param constantTermChars ( [string, string] ) Same as termChars, but for the constant term instead. Default is ["", ""].
 * @param edgeChars ( [string, string] ) edgeChars[0] is placed before the whole string of terms, edgeChars[1] is placed after. Default is ["", ""].
 * @param rangeLimits ( [[Decimal, Decimal], [Decimal, Decimal], [Decimal, Decimal]] ) For the purposes of ensuring Decimal.increasingInverse functions properly, these parameters set limits on the domain of the function.
 * For each entry, rangeLimits[a][0] is the minimum for an argument, rangeLimits[a][1] is the maximum for an argument. rangeLimits[0] is for termFunc, rangeLimits[1] is for powerFunc, rangeLimits[2] is for betweenFunc.
 * These parameters do nothing for the actual result, they only ensure valid behavior.
 * @param termEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed term numbers: if it's three then the term number will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted term numbers are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param powerEngineerings ( Decimal | Decimal[] ) Same as termEngineerings, but for the power numbers instead of the term numbers. Default is 1.
 * @param constantInnerNotation ( Notation ) The notation that the constant term is written in. DefaultNotation is the default.
 * @param termInnerNotation ( Notation | null ) The notation that the term numbers are written in. If this parameter is null, the term numbers are written in this notation yourself (if you're using this option, make sure small numbers reduce back to the constant term!). Is the same as constantInnerNotation by default.
 * @param powerInnerNotation ( Notation | null ) The notation that the power numbers are written in. If this parameter is null, the power numbers are written in this notation yourself (if you're using this option, make sure small numbers reduce back to the constant term!). Is the same as constantInnerNotation by default.
 * @param maxChars ( number ) If the result has reached this many characters after a term has been added, it stops there even if the amount of terms hasn't reached maxTerms yet. Default is Infinity, meaning maxChars doesn't apply by default.
 * @param showConstantTerm ( (value : Decimal) => boolean ) Even if the constant term is reached, it's only actually shown if plugging it into this function would return true. Default is value => true.
 * @param showTerms ( (term : Decimal, power : Decimal) => boolean ) A term is only shown if plugging the term and power into this function would return true. The term is still evaluated even if this function would return false, it's just not shown in the result. Default is (term, power) => true.
 * @param irrelevancyFunc ( (currentValue : Decimal, originalValue : Decimal) => boolean ) If, after a term is added to the result, calling this function (with the current remaining value as its first parameter, the original value before any terms were added (but after the iteration and layer functions are applied, if applicable) as its second) returns true, no more terms are added afterwards. Default is a function that always returns false.
 * @param maxPowersInARow ( number ) If a term's power is equal to or less than this parameter, then that term's power is not written out. Instead, that term is written multiple times in a row, with that amount of times being equal to its power. Default is 1.
 * @param betweenPowersChar ( string ) When multiple of the same term are written in a row, this string is placed between copies of the same term instead of betweenChar. Default is "".
 * @param termWrapperChars ( [string, string] ) When some amount of copies of the same term (that amount of copies may be 1) are written out instead of writing the power as a number, termWrapperChars[0] goes before the whole set of copies, termWrapperChars[1] goes after. Default is ["", ""].
 * @param iteration_maxnum ( Decimal ) If the value exceeds this number, then before running it through func, iterations of iterationFunc are applied to bring it back below this value. Default is (e^5)12.
 * @param iterationFunction ( (value : Decimal) => Decimal ! ) The function that's applied to numbers over iteration_maxnum to bring them back under iteration_maxnum. Default is value => Decimal.pow(10, value).
 * @param iterationInverseAlready ( boolean ) If this parameter is false, then "iterationFunction" is the function to take the inverse of. If this parameter is true, then "iterationFunction" is already the inverse function.
 * For example, if you want iterationFunction to be (v => Decimal.tetrate(2, v)), then if inverseAlready is true,
 * you'd enter (v => Decimal.slog(v, 2)) as iterationFunction instead. Decimal.increasingInverse can be slow, so doing this is mostly useful for speed purposes.
 * @param layer_maxnum ( Decimal ) Whenever the number, before applying any function iterations, is above this value, the amount of layers is increased to bring it back below this value. Default is (e^5)12.
 * @param layerFunction ( (value : Decimal) => Decimal ) For numbers too large to just repeatedly apply iterationFunction, layerFunction is used to determine how many extra "layers" to add on.
 * The default value of layerFunction is value => Decimal.tetrate(10, value.toNumber(), 1, true), i.e. each layer increases the tetra-exponent by 1, i.e. each layer is a power tower layer.
 * @param layerInverseAlready ( boolean ) Same as iterationInverseAlready, but for layerFunction instead.
 * @param layerMimics ( boolean ) If this parameter is false, then layers and iterations are treated as separate. If this parameter is true, then layers act as if they're additional iterations.
 * You should probably only make this parameter true if your layerFunction is approximating what repeatedly applying iterationFunction would do to large numbers.
 * @param iterationChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate iterations of iterationFunction. In each pair, the first entry goes before the number, the second entry goes after the number. iterationChars[0] takes the place of the f() in "f(25)", iterationChars[1] takes the place of the first f() in "f(f(654))" (iterationChars[0] is for the innermost iteration, iterationChars[1] is for the outer ones), and iterationChars[2] takes the place of the (f^) in (f^10)4. Default is [["f(", ")"], ["f(", ")"], ["(f^", ")"]].
 * @param layerChars ( [[string, string], [string, string], [string, string]] ) Same as iterationChars, but for layers instead of iterations. Since each layer is equivalent to an exponent level by default, the default is [["e", ""], ["e", ""], ["(e^", ")"]]. This parameter is unused if layerMimics is true.
 * @param max_iterations_in_a_row ( number ) If there are more iterations than this, the f()'s are made into an f^n expression. Default is 5.
 * @param max_layers_in_a_row ( number ) If there are more layers than this, the e's are made into an e^n expression. Default is 3. This parameter is unused if layerMimics is true.
 * @param superexpAfter ( [boolean, boolean] ) If superexpAfter[0] is true, the f^n expression from iterationChars comes after the number instead of before. superexpAfter[1] is for layerChars. Default is [false, false].
 * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted amounts of iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param layerEngineerings ( Decimal | Decimal[] ) Same as iterationEngineerings, but for layers instead of iterations. Default is 1.
 * @param iterationInnerNotation ( Notation | null ) The notation that the number in an (f^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. DefaultNotation is the default.
 * @param layerInnerNotation ( Notation | null ) The notation that the number in an (e^n) expression is itself notated with. If this parameter is null, then that number is written in this notation itself. Is the same as iterationInnerNotation by default. This parameter is unused if layerMimics is true.
 * @param minValue ( Decimal ) The minimum value that is allowed to be run through func. Values below this are just written in innerNotations[0] directly, unless they are reciprocals of numbers that are not below minValue. Default is 0.
 * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal (which happens if it's below 1 and it's below minValue but its reciprocal is not), recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is ["1 / ", ""].
 */
declare class IncreasingFunctionProductNotation extends Notation {
    termFunc: (value: Decimal) => Decimal;
    powerFunc: (term: Decimal, power: Decimal) => Decimal;
    betweenFunc: (leftover: Decimal, term: Decimal) => Decimal;
    termInverseAlready: boolean;
    powerInverseAlready: boolean;
    betweenInverseAlready: boolean;
    private _maxTerms;
    termChars: [
        string,
        string
    ];
    powerChars: [
        string,
        string,
        string
    ];
    betweenChar: string;
    powerBefore: boolean;
    reverseTerms: boolean;
    minTerm: Decimal;
    constantTermChars: [
        string,
        string
    ];
    edgeChars: [
        string,
        string
    ];
    rangeLimits: [
        [
            Decimal,
            Decimal
        ],
        [
            Decimal,
            Decimal
        ],
        [
            Decimal,
            Decimal
        ]
    ];
    private _termEngineerings;
    private _powerEngineerings;
    constantInnerNotation: Notation;
    termInnerNotation: Notation | null;
    powerInnerNotation: Notation | null;
    maxChars: number;
    showConstantTerm: (value: Decimal) => boolean;
    showTerms: (term: Decimal, power: Decimal) => boolean;
    irrelevancyFunc: (currentValue: Decimal, originalValue: Decimal) => boolean;
    maxPowersInARow: number;
    betweenPowersChar: string;
    termWrapperChars: [
        string,
        string
    ];
    iteration_maxnum: Decimal;
    iterationFunction: (value: Decimal) => Decimal;
    iterationInverseAlready: boolean;
    layer_maxnum: Decimal;
    layerFunction: (value: Decimal) => Decimal;
    layerInverseAlready: boolean;
    layerMimics: boolean;
    iterationChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    layerChars: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ];
    max_iterations_in_a_row: number;
    max_layers_in_a_row: number;
    superexpAfter: [
        boolean,
        boolean
    ];
    private _iterationEngineerings;
    private _layerEngineerings;
    iterationInnerNotation: Notation | null;
    layerInnerNotation: Notation | null;
    minValue: Decimal;
    recipString: [
        string,
        string
    ];
    constructor(termFunc: (value: Decimal) => Decimal, powerFunc?: (term: Decimal, power: Decimal) => Decimal, betweenFunc?: (leftover: Decimal, term: Decimal) => Decimal, termInverseAlready?: boolean, powerInverseAlready?: boolean, betweenInverseAlready?: boolean, maxTerms?: number, termChars?: [
        string,
        string
    ], powerChars?: [
        string,
        string,
        string
    ], betweenChar?: string, powerBefore?: boolean, reverseTerms?: boolean, minTerm?: DecimalSource, constantTermChars?: [
        string,
        string
    ], edgeChars?: [
        string,
        string
    ], rangeLimits?: [
        [
            DecimalSource,
            DecimalSource
        ],
        [
            DecimalSource,
            DecimalSource
        ],
        [
            DecimalSource,
            DecimalSource
        ]
    ], termEngineerings?: DecimalSource | DecimalSource[], powerEngineerings?: DecimalSource | DecimalSource[], constantInnerNotation?: Notation, termInnerNotation?: Notation, powerInnerNotation?: Notation, maxChars?: number, showConstantTerm?: (value: Decimal) => boolean, showTerms?: (term: Decimal, power: Decimal) => boolean, irrelevancyFunc?: (currentValue: Decimal, originalValue: Decimal) => boolean, maxPowersInARow?: number, betweenPowersChar?: string, termWrapperChars?: [
        string,
        string
    ], iteration_maxnum?: DecimalSource, iterationFunction?: (value: Decimal) => Decimal, iterationInverseAlready?: boolean, layer_maxnum?: DecimalSource, layerFunction?: (value: Decimal) => Decimal, layerInverseAlready?: boolean, layerMimics?: boolean, iterationChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], layerChars?: [
        [
            string,
            string
        ],
        [
            string,
            string
        ],
        [
            string,
            string
        ]
    ], max_iterations_in_a_row?: number, max_layers_in_a_row?: number, superexpAfter?: [
        boolean,
        boolean
    ], iterationEngineerings?: DecimalSource | DecimalSource[], layerEngineerings?: DecimalSource | DecimalSource[], iterationInnerNotation?: Notation | null, layerInnerNotation?: Notation | null, minValue?: DecimalSource, recipString?: [
        string,
        string
    ]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get maxTerms(): number;
    set maxTerms(maxTerms: number);
    get termEngineerings(): DecimalSource | DecimalSource[];
    set termEngineerings(engineerings: DecimalSource | DecimalSource[]);
    get powerEngineerings(): DecimalSource | DecimalSource[];
    set powerEngineerings(engineerings: DecimalSource | DecimalSource[]);
    get iterationEngineerings(): DecimalSource | DecimalSource[];
    set iterationEngineerings(engineerings: DecimalSource | DecimalSource[]);
    get layerEngineerings(): DecimalSource | DecimalSource[];
    set layerEngineerings(engineerings: DecimalSource | DecimalSource[]);
}
/**
 * A notation that abbreviates numbers using the Fast-Growing Hierarchy, a simple system of functions: f0(n) = n + 1, f1(n) is f0(f0(f0(f0...(n)))) with n f0's,
 * f2(n) is f1(f1(f1(f1...(n)))) with n f1's, and so on, with each function being a repeated version of the previous one.
 * The Fast-Growing Hierarchy functions have a similar growth rate to the hyperoperators: f1 multiplies, f2 is exponential, f3 is tetrational, f4 is pentational, and so on.
 * This notation only goes up to f3.
 * @param maximums ( Decimal[] ) If the number given is above maximums[0], another iteration of f0 is applied. Likewise, going above maximums[1] causes an iteration of f1 to be applied, going above maximums[2] causes an iteration of f2 to be applied, and so on.
 * Later functions are applied before earlier ones. Default is [1, 4, 32, ee41373247578.35493], which are the values that cause the argument to stay below 1 and the amount of iterations of each function to stay below 4.
 * If less than 4 entries are provided, the unfilled entries are set to Infinity, i.e. those later operators don't show up.
 * @param functionChars ( [string, string][] ) The strings used to show each application of each function. functionChars[n] corresponds to f[n]. For each entry, functionChars[n][0] goes before the argument,
 * functionChars[n][1] goes after. Default is [["f0(", ")"], ["f1(", ")"], ["f2(", ")"], ["f3(", ")"]]. If less than 4 entries are provided, the unfilled entries go back to their default values.
 * @param max_in_a_row ( number[] ) If the amount of iterations of f0 is above max_in_a_row[0], the f0's are concatenated into an (f0^n) expression. Likewise for the rest of the functions and their corresponding entries here.
 * Default is [4, 4, 4, 4]. If less than 4 entries are provided, the unfilled entries are set to the same value as the last filled one.
 * @param iterationChars ( [string, string, string][] ) The strings used when the amount of iterations is concatenated. In each entry, iterationChars[n][0] goes before the amount of iterations, iterationChars[n][1] goes after the amount of iterations,
 * and iterationChars[n][2] goes on the opposite side of the argument from the other two. Default is [["(f0^", ")", ""], ["(f1^", ")", ""], ["(f2^", ")", ""], ["(f3^", ")", ""]].
 * If less than 4 entries are provided, the unfilled entries go back to their default values.
 * @param iterationAfter ( boolean[] ) If iterationAfter[n] is true, then the amount of iterations of that function goes after the argument instead of before. Default is [false, false, false, false].
 * If less than 4 entries are provided, the unfilled entries are set to false.
 * @param edgeChars ( [string, string, boolean] ) If any of the functions are applied to the value at least once, then edgeChars[0] goes on the left end of the whole expression, edgeChars[1] goes on the right end.
 * If edgeChars[2] is true, then the other two edgeChars appear even if no other functions are visible. Default is ["", "", false].
 * @param argumentChars ( [string, string, boolean] ) If any of the functions are applied to the value at least once, then argumentChars[0] goes right before the argument, edgeChars[1] goes right after.
 * If argumentChars[2] is true, then the other two argumentChars appear even if no other functions are visible. Default is ["", "", false].
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The argument is rounded to the nearest multiple of this value. If this parameter is a function, then the argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param delimiterPermutation ( number ) The order that the functions are shown in when multiple are present (they're always applied from greatest to least; this parameter is only a visual change). The default is 23, which corresponds to [f0, f1, f2, f3]. Each value from 0 to 23 represents a different ordering.
 * @param engineerings ( Decimal | Decimal[][] ) Either a DecimalSource or an array of arrays of DecimalSources; default is 1. This parameter controls the allowed amount of iterations for each function: for example, if engineerings[0] is [3], then the amount of f0 iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings[1] is [5, 2], then the permitted amounts of f0 iterations are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * If engineerings is a single value, then every argument is given that single value as its engineerings entry. If less than 4 entries are provided, then all unfilled entries will be set equal to the last entry that was given.
 * @param innerNotation ( Notation ) The notation that the argument is itself written in. DefaultNotation is the default.
 * @param iterationInnerNotations ( Notation | Notation[] ) iterationInnerNotations[0] is the notation that the amount of iterations of f0 is written in, and likewise for the rest of the functions.
 * If only a single notation is provided, all 4 entries are set to that notation. If less than 4 entries are provided, the unfilled ones are set to be the same as the last given one. Is the same as innerNotation by default.
 * @param functionShown ( ((value : Decimal) => boolean)[] ) functionShown[0] controls when the f0 iterations are shown: the f0 iterations, whether concatenated or not, are only shown if functionShown[0](amount of f0 iterations) returns true.
 * Default is (value => value.gt(0)) for all five entries, i.e. the iterations are only shown if there's more than zero of them. If less than 4 entries are provided, the unfilled ones are set to be the same as the last given one.
 */
declare class FastGrowingHierarchyNotation extends Notation {
    private _maximums;
    private _functionChars;
    private _max_in_a_row;
    private _iterationChars;
    private _iterationAfter;
    edgeChars: [
        string,
        string,
        boolean
    ];
    argumentChars: [
        string,
        string,
        boolean
    ];
    rounding: DecimalSource | ((value: Decimal) => Decimal);
    delimiterPermutation: number;
    private _engineerings;
    innerNotation: Notation;
    private _iterationInnerNotations;
    private _functionShown;
    constructor(maximums?: DecimalSource[], functionChars?: [
        string,
        string
    ][], max_in_a_row?: number | number[], iterationChars?: [
        string,
        string,
        string
    ][], iterationAfter?: boolean[], edgeChars?: [
        string,
        string,
        boolean
    ], argumentChars?: [
        string,
        string,
        boolean
    ], rounding?: DecimalSource | ((value: Decimal) => Decimal), delimiterPermutation?: number, engineerings?: DecimalSource | DecimalSource[][], innerNotation?: Notation, iterationInnerNotations?: Notation | Notation[], functionShown?: ((value: Decimal) => boolean)[]);
    name: string;
    formatDecimal(value: Decimal): string;
    private FGHEvaluate;
    get maximums(): DecimalSource[];
    set maximums(maximums: DecimalSource[]);
    get functionChars(): [
        string,
        string
    ][];
    set functionChars(functionChars: [
        string,
        string
    ][]);
    get max_in_a_row(): number | number[];
    set max_in_a_row(max_in_a_row: number | number[]);
    get iterationChars(): [
        string,
        string,
        string
    ][];
    set iterationChars(iterationChars: [
        string,
        string,
        string
    ][]);
    get iterationAfter(): boolean[];
    set iterationAfter(iterationAfter: boolean[]);
    get engineerings(): DecimalSource | DecimalSource[][];
    set engineerings(input: DecimalSource | DecimalSource[][]);
    get iterationInnerNotations(): Notation | Notation[];
    set iterationInnerNotations(iterationInnerNotations: Notation | Notation[]);
    get functionShown(): ((value: Decimal) => boolean)[];
    set functionShown(functionShown: ((value: Decimal) => boolean)[]);
}
/**
 * Writes numbers as the layers seen in VeproGames's "Omega Meta Zero". Sort of like a mixed radix base, but with Greek letters, alchemical planet symbols, exponent-styled towers of symbols, and more instead of digits and exponents.
 * This notation would be too complicated to explain all at once, so see the info on the parameters to understand each step of the process.
 * (Unless otherwise stated, whenever a parameter that's an array where each entry corresponds to a set of symbols is given less entries than the amount of sets of symbols, the unfilled entries are set to be the same as the last entry that was provided.)
 * @param symbols ( string[][] ) These are the digits of the mixed-radix base. Each entry of symbols is an array of strings used for one position in the base.
 * symbols[n][0] is the digit for 0 in that position, symbols[n][1] is the digit for 1, and so on. Default is
 * [["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
 * "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"
 * ], ["ϝ", "ϛ", "ͱ", "ϻ", "ϙ", "ͳ", "ϸ"], ["☿", "♀", "♁", "♂", "♃", "♄", "♅", "♆", "♇"]].
 * @param towerHeight ( Decimal | Decimal[] ) Rather than immediately incrementing the next set of symbols after reaching the last symbol of a set, this notation repeats that set of symbols but as an "exponent" on top of the last symbol in its set.
 * This continues until that tower reaches a certain height, and only afterwards does that set of symbols reset and the next set increment. This parameter controls that maximum tower height. If this parameter is a single Decimal,
 * every symbol set has the same maximum height. If it's an array of Decimals, towerHeight[n] is the tower height limit for symbols[n]. Default is 5.
 * @param towerChars ( ([string, string] | boolean )[] ) This parameter controls the characters used to indicate the aforementioned towers. If towerChars[n] is a pair of strings, then for each tower level, towerChars[n][0] goes before the symbol from symbols[n], towerChars[n][1] goes afterwards.
 * If towerChars[n] is a boolean, then a default pair of strings is used: ["s^", ""] for false, ["s<sup>", "</sup>"] for true, where that "s" is replaced with whatever the last symbol of symbols[n] is. Default is false for all entries.
 * @param visibleTowerMax ( number | number[] ) If a tower is taller than this, the tower's entries are concatenated into a "tower iteration" expression. Like with towerHeight, a single number applies to all symbol sets,
 * while an array of numbers has each number correspond to one symbol set. Default is 5.
 * @param toweriterationChars ( [string, string, boolean, Notation][] ) When a tower is tall enough to be concatenated, the entry of this array corresponding to that symbol set is used to express the amount of tower iterations.
 * towerIterationChars[n][0] goes before the amount of iterations, towerIterationChars[n][1] goes after the amount of iterations, towerIterationChars[n][2] is whether the iterations expression goes before or after the symbol atop the tower (before if false, after if true), and towerIterationChars[n][3] is the Notation that the amount of iterations is written in.
 * Default is [["((Ω^)^", ")", false, new DefaultNotation()], ["((ϸ^)^", ")", false, new DefaultNotation()], ["((♇^)^", ")", false, new DefaultNotation()]], though since visibleTowerMax isn't less than towerHeight by default, this parameter doesn't come into play unless one of those parameters is changed from its default.
 * @param symbolAfter ( boolean | boolean[] ) If symbolAfter[n] is true, then the symbol from the next symbol set will go after the current expression instead of before. If a single boolean is provided, all entries are set to that boolean. Default is false.
 * @param parentheses ( [string, string, string, string, string, string][] ) When the nth symbol set is added to the resulting string, parentheses[n][0] goes around the entire expression thus far and parentheses[n][1] goes after, before the new symbol is added.
 * parentheses[n][2] and [n][3] go before and after the new symbol, and parentheses[n][4] and [n][5] go before and after the entire expression after the new symbol is added.
 * The default has ["", "", "", "", "", ""] for parentheses[0] and ["(", ")", "", "", "", ""] for the rest of the entries.
 * @param symbolShown ( ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean) | ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean)[] )
 * The symbol of the nth symbol set is only shown in the resulting expression if calling symbolShown[n] on the value that symbol represents would return true.
 * If only a single function is provided, all entries are set to that function. The default has (value => true) for symbolShown[0] and (value => value.gt(0)) for the rest of the entries,
 * i.e. the greek letters are always visible but the higher two sets only show up if they're nonzero.
 * Like Array.map(), you can include extra arguments in the function: args[1] will be the symbol set's index (so the first symbol set will have index 0, the second symbol set has index 1, etc.), arg[2] is the entire array of symbol values for that digit,
 * arg[3] is the index of the digit this symbol set is part of (the ones place is index 0, the next larger digit is index 1, etc. If there are decimal places, they have negative index), arg[4] is the amount of decimal digits, and arg[5] is the entire array of digit values.
 * @param brackets ( [string, string, string, string, string, string][] ) After the last symbol set, this notation starts using multiple "digits", where a single "digit" consists of a run of symbols from each set.
 * The entries in brackets are placed around each digit (via the same rules as the entries of parentheses) in a cycle: brackets[0] is used for the last digit, brackets[1] for the second-to-last, brackets[2] for the third-to-last, and so on, looping back to brackets[0] after the last entry.
 * Default is [["", "", "[", "]", "", ""]].
 * @param firstBrackets ( [string, string, string, string, string, string][] ) If this array has any entries, the first few digits use those entries instead of the entries in brackets.
 * Default is [["", "", "", "", "", ""]], i.e. the first digit doesn't have the [] around it but the rest do.
 * @param lastBrackets ( [string, string, string, string, string, string][] ) If this array has any entries, the last few digits use those entries instead of the entries in brackets.
 * Default is [], i.e. there's no special treatment for the last digits.
 * @param reverseDigits ( boolean ) Normally, the largest digit is on the left and the smallest digit is on the right, like in a normal number base.
 * If this parameter is true, the order of the digits is reversed. Default is false.
 * @param maxVisibleDigits ( number ) The maximum amount of digits before the notation switches to scientific form (in which the amount of unshown digits is written as an exponent like in scientific notation). Default is 3.
 * @param expChars ( [string, string, string, string, string, string] ) The characters placed around the exponent in scientific form (using the same rules as parentheses and brackets). Default is ["", "", "{", "}", "", ""].
 * @param expAfter ( boolean ) If this parameter is true, the exponent is written after the digits instead of before. Default is false.
 * @param maxVisibleDigitsInExp ( number ) The amount of digits shown once the expression is in scientific form. Default is 2.
 * @param exponentOffset ( boolean ) If this parameter is false, the exponent is the amount of unwritten digits. If this parameter is true, the exponent is increased to one less than the amount of total digits, as if there was a decimal point after the first digit. Default is true.
 * @param bracketsInExp ( [string, string, string, string, string, string][] ) Same as brackets, but this parameter is used instead once the expression is in scientific form. Is the same as brackets by default.
 * @param firstBracketsInExp ( [string, string, string, string, string, string][] ) Same as firstBrackets, but this parameter is used instead once the expression is in scientific form. Is the same as firstBrackets by default.
 * @param lastBracketsInExp ( [string, string, string, string, string, string][] ) Same as lastBrackets, but this parameter is used instead once the expression is in scientific form. Is the same as lastBrackets by default.
 * @param expInnerNotation ( Notation | null ) If this parameter is null, the exponent is written in this Omega Meta Zero notation itself. If this parameter is a notation, the exponent is written in that notation. Default is null.
 * @param uncertainChar ( string ) If the exponent is so large that the digits cease to be relevant, this string is placed where the digits would be. Default is "◯".
 * @param uncertainThreshold ( Decimal ) If the exponent is equal to or greater than this value, uncertainChar is written instead of the digits. Default is 636152238258658, which matches with the point where the original Omega Meta Zero starts using ◯.
 * @param maxVisibleLayers ( number ) The maximum amount of layers of nested exponents before the notation starts writing the amount of additional layers separately (note that this is a little different from the original Omega Meta Zero, which switches to base-10 hyperscientific at this point). Default is 4.
 * @param layerChars ( [string, string, string, string, string, string] ) The characters placed around the amount of extra exponent layers (using the same rules as expChars). Default is ["", "", "◖", "◗", "", ""].
 * @param layerAfter ( boolean ) If this parameter is true, the amount of layers is written after the rest of the expression instead of before. Default is false.
 * @param maxVisibleLayersPost ( number ) The amount of nested exponent layers shown after the amount of extra layers starts being written separately. Default is 1.
 * @param layerOffset ( boolean ) If this parameter is false, the layer number is the amount of unwritten layers. If this parameter is true, the layer number is increased to one less than the amount of total layers. Default is false.
 * @param layerInnerNotation ( Notation | null ) If this parameter is null, the layer number is written in this Omega Meta Zero notation itself. If this parameter is a notation, the layer number is written in that notation. Default is null.
 * @param layerUncertainChar ( string ) If the layer is so large that the exponent and digits cease to be relevant, this string is placed where the exponent and digits would be. Is the same as uncertainChar by default.
 * @param layerUncertainThreshold ( Decimal ) If the layer amount is equal to or greater than this value, layerUncertainChair is written instead of the exponent and digits. Default is 9e15.
 * @param decimalPlaces ( number ) The amount of digits shown after the ones digit. Default is 0.
 * @param decimalPoint ( [string, string] ) Once all the sub-ones digits are written but before the whole digits are written, decimalPoint[0] goes before the expression, decimalPoint[1] goes after. Default is [";", ""].
 * @param decimalBrackets ( [string, string, string, string, string, string][] ) Same as brackets, but used for sub-ones digits instead. Default is [["", "", "[", "]", "", ""]].
 * @param showDecimalZeroes ( number ) If this number is negative, trailing zero sub-ones digits are not shown. If this number is zero, trailing zero sub-ones digits are only shown if at least one sub-ones digit is nonzero. If this number is positive, training zero sub-ones digits are shown. Default is 1.
 * @param negExpThreshold ( number ) If the amount of leading zero sub-one digits would be at least this, the number is written in scientific form (with a negative exponent) instead. Default is 1.
 * @param negExpChars ( null | [string, string, string, string, string, string] ) If this parameter is not null, then when the exponent is negative, negExpChars is used instead of expChars (and the exponent is written as its absolute value). Default is null.
 * @param negExpAfter ( boolean ) If negExpChars is used instead of expChars, negExpAfter is used instead of expAfter. Default is false.
 * @param recipThreshold ( number ) Numbers too small to write as themselves are written in terms of their reciprocals.
 * If recipThreshold is 0, anything below 1 is written in terms of its reciprocal. If recipThreshold is 1, then numbers that would be written in negative-exponent scientific are written in terms of their reciprocal.
 * If recipThreshold is 2, then the threshold for writing in terms of its reciprocal is the negative exponent point where the digits switch to using undefinedChar, or the point where a second exponent layer shows up, whichever is less small.
 * If recipThreshold is 3, the threshold is the second exponent layer. Any other recipThreshold value acts as 0. Default is 2.
 * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal, recipString[0] goes before it, recipString[1] goes after. Default is ["/", ""].
 */
declare class OmegaMetaZeroNotation extends Notation {
    private _symbols;
    private _towerHeight;
    private _towerChars;
    private _visibleTowerMax;
    private _toweriterationChars;
    private _symbolAfter;
    private _parentheses;
    private _symbolShown;
    private _brackets;
    firstBrackets: [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    lastBrackets: [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    reverseDigits: boolean;
    private _maxVisibleDigits;
    expChars: [
        string,
        string,
        string,
        string,
        string,
        string
    ];
    expAfter: boolean;
    private _maxVisibleDigitsInExp;
    exponentOffset: boolean;
    private _bracketsInExp;
    firstBracketsInExp: [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    lastBracketsInExp: [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    expInnerNotation: Notation | null;
    uncertainChar: string;
    uncertainThreshold: Decimal;
    private _maxVisibleLayers;
    layerChars: [
        string,
        string,
        string,
        string,
        string,
        string
    ];
    layerAfter: boolean;
    private _maxVisibleLayersPost;
    layerOffset: boolean;
    layerInnerNotation: Notation | null;
    layerUncertainChar: string;
    layerUncertainThreshold: Decimal;
    private _decimalPlaces;
    decimalPoint: [
        string,
        string
    ];
    private _decimalBrackets;
    showDecimalZeroes: number;
    private _negExpThreshold;
    negExpChars: null | [
        string,
        string,
        string,
        string,
        string,
        string
    ];
    negExpAfter: boolean;
    recipThreshold: number;
    recipString: [
        string,
        string
    ];
    constructor(symbols?: string[][], towerHeight?: DecimalSource | DecimalSource[], towerChars?: ([
        string,
        string
    ] | boolean)[], visibleTowerMax?: number | number[], toweriterationChars?: [
        string,
        string,
        boolean,
        Notation
    ][], symbolAfter?: boolean | boolean[], parentheses?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], symbolShown?: ((value: Decimal, index: number, symbolValues: Decimal[], digitIndex: number, decimalPlaceAmount: number, digitValues: Decimal[]) => boolean) | ((value: Decimal, index: number, symbolValues: Decimal[], digitIndex: number, decimalPlaceAmount: number, digitValues: Decimal[]) => boolean)[], brackets?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], firstBrackets?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], lastBrackets?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], reverseDigits?: boolean, maxVisibleDigits?: number, expChars?: [
        string,
        string,
        string,
        string,
        string,
        string
    ], expAfter?: boolean, maxVisibleDigitsInExp?: number, exponentOffset?: boolean, bracketsInExp?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], firstBracketsInExp?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], lastBracketsInExp?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], expInnerNotation?: Notation | null, uncertainChar?: string, uncertainThreshold?: DecimalSource, maxVisibleLayers?: number, layerChars?: [
        string,
        string,
        string,
        string,
        string,
        string
    ], layerAfter?: boolean, maxVisibleLayersPost?: number, layerOffset?: boolean, layerInnerNotation?: Notation | null, layerUncertainChar?: string, layerUncertainThreshold?: DecimalSource, decimalPlaces?: number, decimalPoint?: [
        string,
        string
    ], decimalBrackets?: [
        string,
        string,
        string,
        string,
        string,
        string
    ][], showDecimalZeroes?: number, negExpThreshold?: number, negExpChars?: null | [
        string,
        string,
        string,
        string,
        string,
        string
    ], negExpAfter?: boolean, recipThreshold?: number, recipString?: [
        string,
        string
    ]);
    name: string;
    private formatSingleDigit;
    formatDecimal(value: Decimal): string;
    private setSymbolsAndOthers;
    get symbols(): string[][];
    set symbols(symbols: string[][]);
    get towerHeight(): DecimalSource | DecimalSource[];
    set towerHeight(towerHeight: DecimalSource | DecimalSource[]);
    get towerChars(): ([
        string,
        string
    ] | boolean)[];
    set towerChars(towerChars: ([
        string,
        string
    ] | boolean)[]);
    get visibleTowerMax(): number | number[];
    set visibleTowerMax(visibleTowerMax: number | number[]);
    get towerIterationChars(): [
        string,
        string,
        boolean,
        Notation
    ][];
    set towerIterationChars(towerIterationChars: [
        string,
        string,
        boolean,
        Notation
    ][]);
    get symbolAfter(): boolean | boolean[];
    set symbolAfter(symbolAfter: boolean | boolean[]);
    get parentheses(): [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    set parentheses(parentheses: [
        string,
        string,
        string,
        string,
        string,
        string
    ][]);
    get symbolShown(): ((value: Decimal, index: number, symbolValues: Decimal[], digitIndex: number, decimalPlaceAmount: number, digitValues: Decimal[]) => boolean) | ((value: Decimal, index: number, symbolValues: Decimal[], digitIndex: number, decimalPlaceAmount: number, digitValues: Decimal[]) => boolean)[];
    set symbolShown(symbolShown: ((value: Decimal, index: number, symbolValues: Decimal[], digitIndex: number, decimalPlaceAmount: number, digitValues: Decimal[]) => boolean) | ((value: Decimal, index: number, symbolValues: Decimal[], digitIndex: number, decimalPlaceAmount: number, digitValues: Decimal[]) => boolean)[]);
    get brackets(): [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    set brackets(brackets: [
        string,
        string,
        string,
        string,
        string,
        string
    ][]);
    get bracketsInExp(): [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    set bracketsInExp(brackets: [
        string,
        string,
        string,
        string,
        string,
        string
    ][]);
    get maxVisibleDigits(): number;
    set maxVisibleDigits(maxVisibleDigits: number);
    get maxVisibleDigitsInExp(): number;
    set maxVisibleDigitsInExp(maxVisibleDigits: number);
    get maxVisibleLayers(): number;
    set maxVisibleLayers(maxVisibleLayers: number);
    get maxVisibleLayersPost(): number;
    set maxVisibleLayersPost(maxVisibleLayers: number);
    get decimalPlaces(): number;
    set decimalPlaces(decimalPlaces: number);
    get decimalBrackets(): [
        string,
        string,
        string,
        string,
        string,
        string
    ][];
    set decimalBrackets(decimalBrackets: [
        string,
        string,
        string,
        string,
        string,
        string
    ][]);
    get negExpThreshold(): number;
    set negExpThreshold(negExpThreshold: number);
}
/** This object is where all of the notation presets are stored. Use Presets when outputting to plain text. */
declare let Presets: {
    Default: Notation;
    Scientific: Notation;
    Engineering: Notation;
    Logarithm: Notation;
    Hyperscientific: Notation;
    SuperLogarithm: Notation;
    PowerTower: Notation;
    PentaScientific: Notation;
    PentaLogarithm: Notation;
    NaturalLogarithm: Notation;
    NaturalSuperLogarithm: Notation;
    NaturalPentaLogarithm: Notation;
    LogarithmBase: (base: DecimalSource) => Notation;
    SuperLogarithmBase: (base: DecimalSource) => Notation;
    PentaLogarithmBase: (base: DecimalSource) => Notation;
    DoubleLogarithm: Notation;
    AlternateBase: (value: number) => Notation;
    Binary: Notation;
    BinaryIL: Notation;
    Ternary: Notation;
    Quaternary: Notation;
    Seximal: Notation;
    Octal: Notation;
    Duodecimal: Notation;
    DozenalXE: Notation;
    Dozenal23: Notation;
    Hexadecimal: Notation;
    BalancedTernary: Notation;
    BijectiveDecimal: Notation;
    Standard: Notation;
    LongScale: Notation;
    ADStandard: Notation;
    ADLongScale: Notation;
    AarexStandard: Notation;
    AarexLongScale: Notation;
    MixedScientific: Notation;
    MixedScientificLongScale: Notation;
    ADMixedScientific: Notation;
    ADMixedScientificLongScale: Notation;
    AarexMixedScientific: Notation;
    AarexMixedScientificLongScale: Notation;
    Letters: Notation;
    Alphabet: Notation;
    GreekLetters: Notation;
    GreekAlphabet: Notation;
    ADGreekLetters: Notation;
    Emoji: Notation;
    EmojiAlphabet: Notation;
    XYZ: Notation;
    ElementLetters: Notation;
    RomanNumerals: Notation;
    ADRoman: Notation;
    Septecoman: Notation;
    SI: Notation;
    SIWritten: Notation;
    MixedSI: Notation;
    BinarySI: Notation;
    BinarySIWritten: Notation;
    CombinedD: Notation;
    HyperSI: Notation;
    HyperSIWritten: Notation;
    SandcastleBuilder: Notation;
    SandcastleBuilderWritten: Notation;
    CookieFonsterExtendedSI: Notation;
    LooseFraction: Notation;
    MediumFraction: Notation;
    PreciseFraction: Notation;
    LooseMixedNumber: Notation;
    MediumMixedNumber: Notation;
    PreciseMixedNumber: Notation;
    LetterDigits: Notation;
    AlphabetDigits: Notation;
    Myriad: Notation;
    ADMyriad: Notation;
    AarexMyriad: Notation;
    DoubleBinaryNames: Notation;
    DoubleBinaryPrefixes: Notation;
    Alphaquint: Notation;
    Hypersplit: Notation;
    HypersplitBase3: Notation;
    HypersplitBase2: Notation;
    HyperE: Notation;
    Infinity: Notation;
    Eternity: Notation;
    Brackets: Notation;
    SimplifiedWritten: (value: number) => Notation;
    Dots: Notation;
    Hearts: Notation;
    Dominoes: Notation;
    NumericDominoes: (value: number) => Notation;
    Factorial: Notation;
    FactorialAmount: Notation;
    FactorialScientific: Notation;
    FactorialHyperscientific: Notation;
    Factoradic: Notation;
    SquareRoot: Notation;
    CubeRoot: Notation;
    Root: (base: DecimalSource) => Notation;
    IncreasingRoot: Notation;
    SuperSquareRoot: Notation;
    Tritetrated: Notation;
    SuperRoot: (base: DecimalSource) => Notation;
    IncreasingSuperRoot: Notation;
    PentaSquareRoot: Notation;
    Tripentated: Notation;
    PentaRoot: (base: DecimalSource) => Notation;
    WeakHyperscientific: Notation;
    SuperSquareScientific: Notation;
    ExponentTower: Notation;
    ExponentTowerK: Notation;
    Prime: Notation;
    PsiLetters: Notation;
    PsiDash: Notation;
    PsiLettersBinary: Notation;
    PsiDashBinary: Notation;
    FastGrowingHierarchy: Notation;
    HardyHierarchy: Notation;
    OmegaLayers: Notation;
    OmegaLayersRamped: Notation;
    OmegaLayerNumber: Notation;
    IncreasingOperator: Notation;
    IncreasingOperatorBase2: Notation;
    IncreasingOperatorBase3: Notation;
    Omega: Notation;
    OmegaShort: Notation;
    Fours: Notation;
    Triangular: Notation;
    Square: Notation;
    DoubleFactorials: Notation;
    TritetratedProduct: Notation;
    Grid: Notation;
    TetrationFloat: Notation;
    Polynomial: (base: DecimalSource) => Notation;
    RationalFunction: (base: DecimalSource) => Notation;
    BaseThreeHalves: Notation;
    BasePhi: Notation;
    BaseE: Notation;
    BasePi: Notation;
    Parentheses: Notation;
    OmegaMetaZero: Notation;
    OmegaMetaZeroAlphaAmount: Notation;
    FillingFractions: Notation;
    Blind: Notation;
    PowersOfOne: Notation;
};
/** This object is where all of the notation presets are stored. Use HTMLPresets when outputting to innerHTML. */
declare let HTMLPresets: {
    Default: Notation;
    Scientific: Notation;
    Engineering: Notation;
    Logarithm: Notation;
    Hyperscientific: Notation;
    SuperLogarithm: Notation;
    PowerTower: Notation;
    PentaScientific: Notation;
    PentaLogarithm: Notation;
    NaturalLogarithm: Notation;
    NaturalSuperLogarithm: Notation;
    NaturalPentaLogarithm: Notation;
    LogarithmBase: (base: DecimalSource) => Notation;
    SuperLogarithmBase: (base: DecimalSource) => Notation;
    PentaLogarithmBase: (base: DecimalSource) => Notation;
    DoubleLogarithm: Notation;
    AlternateBase: (value: number) => Notation;
    Binary: Notation;
    BinaryIL: Notation;
    Ternary: Notation;
    Quaternary: Notation;
    Seximal: Notation;
    Octal: Notation;
    Duodecimal: Notation;
    DozenalXE: Notation;
    Dozenal23: Notation;
    Hexadecimal: Notation;
    BalancedTernary: Notation;
    BijectiveDecimal: Notation;
    Standard: Notation;
    LongScale: Notation;
    ADStandard: Notation;
    ADLongScale: Notation;
    AarexStandard: Notation;
    AarexLongScale: Notation;
    MixedScientific: Notation;
    MixedScientificLongScale: Notation;
    ADMixedScientific: Notation;
    ADMixedScientificLongScale: Notation;
    AarexMixedScientific: Notation;
    AarexMixedScientificLongScale: Notation;
    Letters: Notation;
    Alphabet: Notation;
    GreekLetters: Notation;
    GreekAlphabet: Notation;
    ADGreekLetters: Notation;
    Emoji: Notation;
    EmojiAlphabet: Notation;
    XYZ: Notation;
    ElementLetters: Notation;
    RomanNumerals: Notation;
    ADRoman: Notation;
    Septecoman: Notation;
    SI: Notation;
    SIWritten: Notation;
    MixedSI: Notation;
    BinarySI: Notation;
    BinarySIWritten: Notation;
    CombinedD: Notation;
    HyperSI: Notation;
    HyperSIWritten: Notation;
    SandcastleBuilder: Notation;
    SandcastleBuilderWritten: Notation;
    CookieFonsterExtendedSI: Notation;
    LooseFraction: Notation;
    MediumFraction: Notation;
    PreciseFraction: Notation;
    LooseMixedNumber: Notation;
    MediumMixedNumber: Notation;
    PreciseMixedNumber: Notation;
    LetterDigits: Notation;
    AlphabetDigits: Notation;
    Myriad: Notation;
    ADMyriad: Notation;
    AarexMyriad: Notation;
    DoubleBinaryNames: Notation;
    DoubleBinaryPrefixes: Notation;
    Alphaquint: Notation;
    Hypersplit: Notation;
    HypersplitBase3: Notation;
    HypersplitBase2: Notation;
    HyperE: Notation;
    Infinity: Notation;
    Eternity: Notation;
    Brackets: Notation;
    SimplifiedWritten: (value: number) => Notation;
    Dots: Notation;
    Hearts: Notation;
    Dominoes: Notation;
    NumericDominoes: (value: number) => Notation;
    ColoredDominoes: (value: number) => Notation;
    Factorial: Notation;
    FactorialAmount: Notation;
    FactorialScientific: Notation;
    FactorialHyperscientific: Notation;
    Factoradic: Notation;
    SquareRoot: Notation;
    CubeRoot: Notation;
    Root: (base: DecimalSource) => Notation;
    IncreasingRoot: Notation;
    SuperSquareRoot: Notation;
    Tritetrated: Notation;
    SuperRoot: (base: DecimalSource) => Notation;
    IncreasingSuperRoot: Notation;
    PentaSquareRoot: Notation;
    Tripentated: Notation;
    PentaRoot: (base: DecimalSource) => Notation;
    WeakHyperscientific: Notation;
    SuperSquareScientific: Notation;
    ExponentTower: Notation;
    ExponentTowerK: Notation;
    Prime: Notation;
    PsiLetters: Notation;
    PsiDash: Notation;
    PsiLettersBinary: Notation;
    PsiDashBinary: Notation;
    FastGrowingHierarchy: Notation;
    HardyHierarchy: Notation;
    OmegaLayers: Notation;
    OmegaLayersRamped: Notation;
    OmegaLayerNumber: Notation;
    IncreasingOperator: Notation;
    IncreasingOperatorBase2: Notation;
    IncreasingOperatorBase3: Notation;
    Omega: Notation;
    OmegaShort: Notation;
    Fours: Notation;
    Triangular: Notation;
    Square: Notation;
    DoubleFactorials: Notation;
    TritetratedProduct: Notation;
    Grid: Notation;
    TetrationFloat: Notation;
    Polynomial: (base: DecimalSource) => Notation;
    RationalFunction: (base: DecimalSource) => Notation;
    BaseThreeHalves: Notation;
    BasePhi: Notation;
    BaseE: Notation;
    BasePi: Notation;
    Parentheses: Notation;
    OmegaMetaZero: Notation;
    OmegaMetaZeroAlphaAmount: Notation;
    FillingFractions: Notation;
    Blind: Notation;
    PowersOfOne: Notation;
};
export { toDecimal, multabs, commasAndDecimals, fractionApproximation, fractionApproximationD, primeFactorize, primeFactorizeFraction, multibaseLogarithm, scientifify, hyperscientifify, pentascientifify, weak_tetrate, weak_slog, weak_hyperscientifify, increasingFunctionScientifify, increasingScientififyFunction, hypersplit, iteratedfactorial, inverse_factorial, factorial_slog, factorial_scientifify, factorial_hyperscientifify, polygon, polygonRoot, polygonLog, biPolygon, iteratedPolygonRoot, biPolygonRoot, triPolygon, iteratedBiPolygonRoot, triPolygonRoot, FGH0, FGH0inverse, iteratedFGH0, iteratedFGH0inverse, FGH1, FGH1inverse, iteratedFGH1, iteratedFGH1log, FGH2, FGH2inverse, iteratedFGH2, iteratedFGH2log, FGH3, FGH3inverse, iteratedFGH3, iteratedFGH3log, Notation, DefaultNotation, BaseConvert, AlternateBaseNotation, PredeterminedNotation, ConditionalNotation, AppliedFunctionNotation, SignValueNotation, NestedSignValueNotation, FractionNotation, CustomNotation, ScientificNotation, ScientificIterationsNotation, LogarithmNotation, MultiLogarithmNotation, StandardNotation, LettersNotation, HyperscientificNotation, HyperscientificIterationsNotation, SuperLogarithmNotation, MultiSuperLogarithmNotation, ExpandedDefaultNotation, SINotation, NestedSINotation, HyperSINotation, NestedHyperSINotation, MyriadNotation, HypersplitNotation, FactorialNotation, MultiFactorialNotation, FactorialScientificNotation, FactorialScientificIterationsNotation, FactorialHyperscientificNotation, FactorialHyperscientificIterationsNotation, FactorialAmountNotation, MultiFactorialAmountNotation, FactoradicConvert, FactoradicNotation, RootNotation, IncreasingRootNotation, MultiRootNotation, SuperRootNotation, MultiSuperRootNotation, IncreasingSuperRootNotation, PrimeNotation, PsiDashNotation, PrestigeLayerNotation, IncreasingOperatorNotation, PolygonalNotation, DoubleFactorialsNotation, GridNotation, PolynomialNotation, LetterDigitsNotation, physicalScale, MultibaseLogarithmNotation, MultibaseMultiLogarithmNotation, WeakHyperscientificNotation, WeakHyperscientificIterationsNotation, PentaScientificNotation, PentaScientificIterationsNotation, PentaLogarithmNotation, MultiPentaLogarithmNotation, PentaRootNotation, MultiPentaRootNotation, IncreasingPentaRootNotation, IncreasingFunctionNotation, IncreasingFunctionScientificNotation, IncreasingFunctionProductNotation, FastGrowingHierarchyNotation, OmegaMetaZeroNotation, Presets, HTMLPresets };
