import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";

/**
 * For reasons unbeknownst to me, break_eternity's Decimal.fromValue does not seem to work on values that are already Decimals, so this function is a version of Decimal.fromValue that does.1
 * Unlike Decimal.fromValue, this function uses the linear approximation of tetration to convert strings that involve tetration.
 * @param value ( Decimal ! ) The DecimalSource to be converted.
 */
export function toDecimal(value: DecimalSource) : Decimal {
    if (typeof value == "object") {
        let d = new Decimal();
        d.sign = value.sign;
        d.mag = value.mag;
        d.layer = value.layer;
        return d;
    }
    else if (typeof value == "string") return Decimal.fromString(value, true);
    else return Decimal.fromValue(value);
}

/**
 * "Multiplicative absolute value". For numbers with absolute value less than 1, returns their reciprocal. Otherwise, returns the original value. (0 just returns 0)
 * @param value ( Decimal ! ) The number to take the multiplicative absolute value of.
 */
export function multabs(value : DecimalSource) : Decimal {
    let valueD = toDecimal(value);
    if (valueD.eq(0)) return new Decimal(0);
    else if (valueD.abs().lt(1)) return valueD.recip();
    else return valueD;
}

/**
 * Rounds the given value to the nearest multiple of some number.
 * @param value ( Decimal ) The value to be rounded.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) If this parameter is a Decimal, then "value" is rounded to the nearest multiple of "rounding".
 * If this parameter is a Decimal -> Decimal function, then "value" is plugged into that function, and whatever that function returns is used as the "rounding" to round to the nearest multiple of.
 * The rounding is not performed at all if "rounding" is 0.
 */
export function round(value : DecimalSource, rounding : DecimalSource | ((value : Decimal) => Decimal)) : Decimal {
    let valueD = toDecimal(value);
    if (typeof rounding != "function") {
        let funcD = toDecimal(rounding);
        rounding = (value) => funcD;
    }
    let roundingVal = rounding(valueD);
    if (roundingVal.eq(0)) return valueD;
    else return valueD.div(roundingVal).round().mul(roundingVal);
}

/**
 * Checks a string to see if it only contains certain characters.
 * @param str ( string ! ) The string to be checked.
 * @param allowed ( string[] ! ) An array of the allowed characters (any strings in this array that are more than one character will end up being ignored).
 */
export function onlyAllowedCharacters(str : string, allowed : string[]) : boolean {
    for (let i = 0; i < str.length; i++) {
        if (allowed.indexOf(str[i]) === -1) return false;
    }
    return true;
}

/**
 * Checks a string to see if it only contains numeric characters: 0 1 2 3 4 5 6 7 8 9 . ,
 * This is just a subset of onlyAllowedCharacters, but it's included here for convienence.
 * @param str ( string ! ) The string to be checked
 * @param negativeAllowed ( boolean ) The character - is also allowed if this is true. Default is false.
 */
export function onlyNumericCharacters(str : string, negativeAllowed : boolean = false) : boolean {
    let allowed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
    if (negativeAllowed) allowed.push("-");
    return onlyAllowedCharacters(str, allowed);
}

export const lowercaseAlphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
export const uppercaseAlphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
export const defaultBaseChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"+", "/"];

/**
 * Takes a number and formats it with commas and decimals.
 * @param value ( number ! ) The number to be formatted.
 * @param placesAbove1 ( number ) For numbers 1 or greater, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) For numbers less than 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commas ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, which means commas are always included.
 * @param decimalChar ( string ) The string used as the decimal point. Default is ".".
 * @param commaChar ( string ) The string used as the comma. Default is ",".
 */
export function commasAndDecimals(value: number, placesAbove1: number = -4, placesBelow1: number = -4, commas: number = 0, decimalChar = ".", commaChar = ","): string {
    if (value == 0) return "0";
    if (!isFinite(value)) return String(value);
    let places = (Math.abs(value) < 1) ? placesBelow1 : placesAbove1;
    if (places > 16) places = 16;
    let negative = (value < 0);
    value = Math.abs(value);
    let [b, e] = scientifify(Decimal.fromNumber(value), Decimal.dTen);
    let base = b.toNumber();
    let exponent = e.toNumber();
    let sigFigs = false;
    if (places < 0) {
        sigFigs = true;
        places = Math.max(-places - exponent - 1, 0);
    }
    let result = "";
    if (value >= 1e21) {
        base = Math.round(base * Math.pow(10, places)) / Math.pow(10, places);
        if (base >= 10) {
            base /= 10;
            exponent += 1;
            if (sigFigs && places > 0) {
                places--;
                base = Math.round(base * Math.pow(10, places)) / Math.pow(10, places);
            }
        }
        result = commasAndDecimals(base, placesAbove1, placesBelow1, commas);
        result += "e";
        if (exponent >= 0) result += "+";
        result += String(exponent);
    }
    else if (value < 1) {
        let ending = Math.round(value * Math.pow(10, places));
        if (ending >= Math.pow(10, places + exponent + 1)) {
            base /= 10;
            exponent += 1;
            ending = Math.round(value * Math.pow(10, places))
        }
        if (ending == 0) return "0";
        let decimalString = String(ending);
        if (exponent >= 0) result = commasAndDecimals(ending / Math.pow(10, places), placesAbove1, placesBelow1, commas);
        else {
            result = "0" + decimalChar;
            for (let i = 1; i < Math.abs(exponent); i++) result += "0";
            while (decimalString.length < places + exponent + 1) decimalString = "0" + decimalString;
            while (decimalString[decimalString.length - 1] == "0") decimalString = decimalString.substring(0, decimalString.length - 1);
            if (decimalString !== ".") result += decimalString;
        }
    }
    else {
        let whole = Math.trunc(value);
        let leftover = value - whole;
        leftover *= Math.pow(10, places);
        leftover = Math.round(leftover);
        if (leftover >= Math.pow(10, places)) {
            leftover -= Math.pow(10, places);
            whole += 1;
        }
        result = String(whole);
        if (value >= commas && commas >= 0) result = addCommas(result, [commaChar]);
        let decimalString = String(leftover);
        if (leftover == 0) decimalString = "";
        else {
            while (decimalString.length < places) decimalString = "0" + decimalString;
            decimalString = decimalChar + decimalString;
            while (decimalString[decimalString.length - 1] == "0") decimalString = decimalString.substring(0, decimalString.length - 1);
        }
        if (decimalString !== decimalChar) result += decimalString;
    }
    if (negative) result = "-" + result;
    return result;
}

/**
 * Adds commas to a string by inserting a comma between every few characters of the string, starting at the end.
 * @param str ( string ! ) The string to be formatted.
 * @param commaChar ( string[] ) The character to be inserted as a comma. Default is ",".
 * @param spacing ( number ) The amount of characters between each commas. Default is 3.
 */
export function addCommas(str: string, commaChars: string[] = [","], spacing: number = 3): string {
    let result = "";
    let commasSoFar = 0;
    while (str.length > spacing) {
        let substr = str.substring(str.length - spacing, str.length);
        str = str.substring(0, str.length - spacing);
        result = commaChars[commasSoFar % commaChars.length] + substr + result;
        commasSoFar++;
    }
    return (str + result);
}

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
export function fractionApproximation(value: number, precision : number, returnForm : number, maxIterations: number = Infinity, maxDenominator : number = Infinity, strictMaxDenominator : boolean = false, maxNumerator : number = Infinity, strictMaxNumerator : boolean = false) : number[] {
    let continuedFraction : number[] = [];
    let whole = 0;
    let numerator = 0;
    let denominator = 1;
    let previous = [0, 0, 1];
    let approximation = 0;
    if (returnForm != 0 && returnForm != 1 && returnForm != 2 && returnForm != 3) returnForm = 0;
    if (returnForm == 3) {
        let result = fractionApproximation(Math.abs(value), precision, 2, maxIterations, maxDenominator, strictMaxDenominator, maxNumerator, strictMaxNumerator);
        if (value < 0) {
            if (result[0] == 0) result[1] *= -1;
            else result[0] *= -1;
        }
        return result;
    }
    if (precision < 0) precision = Math.abs(value * precision);
    if (precision > 1) precision = 1;
    let currentValue = value;
    while (Math.abs(value - approximation) > precision && denominator <= maxDenominator && numerator <= maxNumerator && continuedFraction.length < maxIterations) {
        continuedFraction.push(Math.floor(currentValue));
        previous = [whole, numerator, denominator];
        numerator = continuedFraction[continuedFraction.length - 1];
        denominator = 1;
        for (let i = continuedFraction.length - 2; i >= 0; i--) {
            let temp = denominator;
            denominator = numerator;
            numerator = temp + denominator * continuedFraction[i];
        }
        if (returnForm == 2) {
            numerator -= denominator * continuedFraction[0];
            whole = continuedFraction[0];
        }
        approximation = whole + (numerator / denominator);
        currentValue = currentValue % 1;
        if (currentValue == 0) break;
        else currentValue = 1 / currentValue;
    }
    if ((denominator > maxDenominator && strictMaxDenominator) || (numerator > maxNumerator && strictMaxNumerator && continuedFraction.length > 1)) {
        continuedFraction.pop();
        [whole, numerator, denominator] = previous;
    }
    if (returnForm == 2 && Math.floor(numerator / denominator) != 0) { // Fixes an issue where 1/1 would show up in a mixed number
        whole += Math.floor(numerator / denominator);
        numerator -= denominator * Math.floor(numerator / denominator);
    }
    if (continuedFraction.length == 0) {
        if (returnForm == 0) return [0];
        else if (returnForm == 1) return [0, 1];
        else return [0, 0, 1];
    }
    else {
        if (returnForm == 0) return continuedFraction;
        else if (returnForm == 1) return [numerator, denominator];
        else return [whole, numerator, denominator];
    }
}

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
export function fractionApproximationD(value: DecimalSource, precision : DecimalSource, returnForm : number, maxIterations: number = Infinity, maxDenominator : DecimalSource = Infinity, strictMaxDenominator : boolean = false, maxNumerator : DecimalSource = Infinity, strictMaxNumerator : boolean = false) : Decimal[] {
    value = toDecimal(value);
    precision = toDecimal(precision);
    maxDenominator = toDecimal(maxDenominator);
    if (value.eq(0)) {
        if (returnForm == 0) return [new Decimal(0)];
        else if (returnForm == 1) return [new Decimal(0), new Decimal(1)];
        else return [new Decimal(0), new Decimal(0), new Decimal(1)];
    }
    else if (value.abs().lt(1) && value.layer > 1 && precision.lt(0)) { // Relative precision fails for layer <=-2 numbers because division ceases to function precisely, so we need a special case to ensure they don't appear as 0
        if (returnForm == 0) return [new Decimal(0), value.recip().round()];
        else if (returnForm == 1) return [new Decimal(1), value.recip().round()];
        else return [new Decimal(0), new Decimal(1), value.recip().round()];
    }
    let continuedFraction : Decimal[] = [];
    let whole = new Decimal(0);
    let numerator = new Decimal(0);
    let denominator = new Decimal(1);
    let previous = [whole, numerator, denominator];
    let approximation = new Decimal(0);
    if (returnForm != 0 && returnForm != 1 && returnForm != 2 && returnForm != 3) returnForm = 0;
    if (returnForm == 3) {
        let result = fractionApproximationD(value.abs(), precision, 2, maxIterations, maxDenominator, strictMaxDenominator, maxNumerator, strictMaxNumerator);
        if (value.lt(0)) {
            if (result[0].eq(0)) result[1] = result[1].neg();
            else result[0] = result[0].neg();
        }
        return result;
    }
    if (precision.lt(0)) precision = value.mul(precision).abs();
    if (precision.gt(1)) precision = new Decimal(1);
    let currentValue = value;
    while (value.sub(approximation).abs().gt(precision) && denominator.lte(maxDenominator) && numerator.lte(maxNumerator) && continuedFraction.length < maxIterations) {
        continuedFraction.push(currentValue.floor());
        previous = [whole, numerator, denominator];
        numerator = continuedFraction[continuedFraction.length - 1];
        denominator = new Decimal(1);
        for (let i = continuedFraction.length - 2; i >= 0; i--) {
            let temp = denominator;
            denominator = numerator;
            numerator = temp.plus(denominator.mul(continuedFraction[i]));
        }
        if (returnForm == 2) {
            numerator = numerator.sub(denominator.mul(continuedFraction[0]));
            whole = continuedFraction[0];
        }
        approximation = numerator.div(denominator).plus(whole);
        currentValue = currentValue.mod(1);
        if (currentValue.eq(0)) break;
        else currentValue = currentValue.recip();
    }
    if ((denominator.gt(maxDenominator) && strictMaxDenominator) || (numerator.gt(maxNumerator) && strictMaxNumerator && continuedFraction.length > 1)) {
        continuedFraction.pop();
        [whole, numerator, denominator] = previous;
    }
    if (returnForm == 2 && numerator.div(denominator).floor().neq(0)) { // Fixes an issue where 1/1 would show up in a mixed number
        whole = whole.plus(numerator.div(denominator).floor());
        numerator = numerator.sub(denominator.mul(numerator.div(denominator).floor()))
    }
    if (continuedFraction.length == 0) {
        if (returnForm == 0) return [new Decimal(0)];
        else if (returnForm == 1) return [new Decimal(0), new Decimal(1)];
        else return [new Decimal(0), new Decimal(0), new Decimal(1)];
    }
    else {
        if (returnForm == 0) return continuedFraction;
        else if (returnForm == 1) return [numerator, denominator];
        else return [whole, numerator, denominator];
    }
}

function gcd(a : number, b : number) {
    if (b == 0) return a;
    else return gcd(b, a % b);
}

/**
 * Returns an array of all the primes that are not greater than max.
 * @param max ( number ! ) The cutoff point for the list of primes.
 */
export function primesArray(max : number) : number[] {
    if (max < 2) return [];
    let primes = [2];
    while (primes[primes.length - 1] ** 2 < max) primes = primesArray(primes[primes.length - 1] ** 2 - 1);
    let arr = Array(Number(max) + 1).fill(true);
    arr[0] = false; arr[1] = false;
    for (let p = 0; p < primes.length && primes[p] ** 2 <= max; p++) {
        for (let i = Number(primes[p]) * 2; i < arr.length; i += Number(primes[p])) {
            arr[i] = false;
        }
    }
    let newprimes = [];
    for (let a = 0; a < arr.length; a++) {
        if (arr[a]) newprimes.push(a);
    }
    return newprimes;
}

/**
 * Turns a whole number into its prime factorization. Returns an array of pairs of numbers: in each pair is a prime and its exponent. For example, 60 would return [[2, 2], [3, 1], [5, 1]] since its prime factoration is 2^2 * 3^1 * 5^1.
 * 1 returns an empty array, 0 returns [[0, 1]], negatives have [-1, 1] on the beginning of their array.
 * @param value ( number ! ) The number to factorize. Must be an integer.
 * @param primes ( number | number[] ! ) If this is an array, that array is the list of prime factors to check for. If this is a number, all primes that are not greater than that number are checked.
 */
export function primeFactorize(value : number, primes : number | number[]) : [number, number][] {
    if (value == 0) return [[0, 1]];
    if (typeof primes == "number") primes = primesArray(primes);
    let result : [number, number][] = [];
    if (value < 0) {
        result.push([-1, 1]);
        value *= -1;
    }
    let currentValue = value;
    for (let p = 0; p < primes.length; p++) {
        let base = primes[p];
        let exponent = 0;
        while (currentValue % base == 0) {
            currentValue /= base;
            exponent++;
        }
        if (exponent > 0) result.push([base, exponent]);
    }
    if (currentValue > 1) result.push([currentValue, 1]); //Leftover factors
    return result;
}

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
export function primeFactorizeFraction(value : number, primes : number | number[], precision : number, maxIterations: number = Infinity, maxDenominator : number = Infinity, strictMaxDenominator : boolean = false, maxNumerator : number = Infinity, strictMaxNumerator : boolean = false) : [number, number][] {
    if (value == 0) return [[0, 1]];
    if (typeof primes == "number") primes = primesArray(primes);
    let result : [number, number][] = [];
    if (value < 0) {
        result.push([-1, 1]);
        value *= -1;
    }
    let [numerator, denominator] = fractionApproximation(value, precision, 1, maxIterations, maxDenominator, strictMaxDenominator, maxNumerator, strictMaxNumerator);
    let numeratorPrimes = primeFactorize(numerator, primes);
    let denominatorPrimes = primeFactorize(denominator, primes);
    //Test to make sure leftover factors don't go into each other
    if (numeratorPrimes.length > 0 && denominatorPrimes.length > 0) {
        let sharedLastFactor = gcd(numeratorPrimes[numeratorPrimes.length - 1][0], denominatorPrimes[denominatorPrimes.length - 1][0]);
        if (sharedLastFactor > 1) {
            numeratorPrimes[numeratorPrimes.length - 1][0] /= sharedLastFactor;
            denominatorPrimes[denominatorPrimes.length - 1][0] /= sharedLastFactor;
            if (numeratorPrimes[numeratorPrimes.length - 1][0] == 1) numeratorPrimes.pop();
            if (denominatorPrimes[denominatorPrimes.length - 1][0] == 1) denominatorPrimes.pop();
        }
    }
    //Merge the lists
    let takeFromDenominator = false;
    while (numeratorPrimes.length > 0 || denominatorPrimes.length > 0) {
        if (numeratorPrimes.length == 0) takeFromDenominator = true;
        else if (denominatorPrimes.length == 0) takeFromDenominator = false;
        else takeFromDenominator = (numeratorPrimes[0][0] > denominatorPrimes[0][0]);
        if (takeFromDenominator) {
            if (result.length > 0 && result[result.length - 1][0] == denominatorPrimes[0][0]) result[result.length - 1][1] -= denominatorPrimes[0][1];
            else result.push([denominatorPrimes[0][0], -denominatorPrimes[0][1]]);
            denominatorPrimes.shift()
        }
        else {
            if (result.length > 0 && result[result.length - 1][0] == numeratorPrimes[0][0]) result[result.length - 1][1] += numeratorPrimes[0][1];
            else result.push([numeratorPrimes[0][0], numeratorPrimes[0][1]]);
            numeratorPrimes.shift();
        }
        if (result[result.length - 1][1] == 0) result.pop();
    }
    return result;
}

export function currentEngineering(value : Decimal, engineerings : Decimal[]) : Decimal[] {
    if (value.lt(0)) throw new RangeError("currentEngineering does not currently support negative values");
    if (value.eq(0)) return Array(engineerings.length).fill(Decimal.dZero);
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    let arr : Decimal[] = [];
    let currentValue = new Decimal(value);
    for (let s = 0; s < engineerings.length; s++) {
        let portion = currentValue.div(engineerings[s]).floor().max(0);
        currentValue = currentValue.sub(portion.mul(engineerings[s]));
        arr.push(portion);
    }
    return arr;
}

export function engineeringValue(arr : Decimal[], engineerings: Decimal[]) : Decimal {
    let result = new Decimal(0);
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    for (let i = 0; i < Math.min(arr.length, engineerings.length); i++) {
        result = result.plus(arr[i].mul(engineerings[i]));
    }
    return result;
}

export function currentEngineeringValue(value : Decimal, engineerings : Decimal[]) : Decimal {
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (value.eq(0)) return new Decimal(0);
    else if (value.lt(0)) return upperCurrentEngineeringValue(value.neg(), engineerings).neg();
    else return engineeringValue(currentEngineering(value, engineerings), engineerings);
}

export function nextEngineering(value : Decimal, engineerings : Decimal[]) : Decimal[] {
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    let currentValue = Decimal.dInf;
    let oldArr = currentEngineering(value, engineerings);
    let finalArr = new Array(...oldArr);
    for (let s = engineerings.length - 1; s >= 0; s--) {
        let newArr = new Array(...oldArr);
        newArr[s] = newArr[s].plus(1);
        for (let t = s + 1; t < engineerings.length; t++) {
            newArr[t] = new Decimal(0);
        }
        let newValue = engineeringValue(newArr, engineerings);
        if (newValue.gt(value) && newValue.lt(currentValue)) {
            currentValue = newValue;
            finalArr = newArr;
        }
    }
    return finalArr;
}

export function nextEngineeringValue(value : Decimal, engineerings : Decimal[]) : Decimal {
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (value.eq(0)) return engineerings[engineerings.length - 1];
    else if (value.lt(0)) return previousEngineeringValue(value.neg(), engineerings).neg();
    else return engineeringValue(nextEngineering(value, engineerings), engineerings);
}

export function previousEngineering(value : Decimal, engineerings : Decimal[]) : Decimal[] {
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    let currentValue = Decimal.dNegInf;
    let oldArr = currentEngineering(value, engineerings);
    let finalArr = new Array(...oldArr);
    for (let s = engineerings.length - 1; s >= 0; s--) {
        if (oldArr[s].gt(0)) {
            let newArr = new Array(...oldArr);
            newArr[s] = newArr[s].minus(1);
            newArr = newArr.slice(0, s + 1);
            let newValue = engineeringValue(newArr, engineerings);
            let difference = engineerings[s];
            for (let t = s + 1; t < engineerings.length; t++) {
                let coefficient = difference.div(engineerings[t]).floor().max(0);
                let portion = coefficient.mul(engineerings[t]);
                if (portion.eq(difference)) {
                    coefficient = coefficient.sub(1);
                    portion = portion.sub(engineerings[t]);
                }
                difference = difference.sub(portion);
                newValue = newValue.add(portion);
                newArr.push(coefficient);
            }
            if (newValue.lt(value) && newValue.gt(currentValue)) {
                currentValue = newValue;
                finalArr = newArr;
            }
        }
    }
    return finalArr;
}

export function previousEngineeringValue(value : Decimal, engineerings : Decimal[]) : Decimal {
    engineerings = engineerings.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (value.eq(0)) return engineerings[engineerings.length - 1].neg();
    else if (value.lt(0)) return nextEngineeringValue(value.neg(), engineerings).neg();
    else return engineeringValue(previousEngineering(value, engineerings), engineerings);
}

export function upperCurrentEngineeringValue(value : Decimal, engineerings : Decimal[]) : Decimal {
    let c = currentEngineeringValue(value, engineerings);
    if (value.eq(c)) return c;
    else return nextEngineeringValue(value, engineerings);
}

/**
 * Decimal's iteratedexp, except each exponentiation in the iteratedexp, instead of just being base^value, is base^(value/mult), so that taking the logarithm to undo it would require multiplying by the mult after said logarithm.
 */
//If you're wondering why this is a separate function... well, it had a more complex implementation until I realized it could be reduced to its current form.
export function iteratedexpmult(base : DecimalSource, payload : DecimalSource, height : number, mult : DecimalSource) : Decimal {
    let [baseD, payloadD, multD] = [base, payload, mult].map(toDecimal);
    return Decimal.iteratedexp(baseD.pow(multD.recip()), height, payloadD, true);
}

/**
 * Decimal's iteratedlog, except the value is multiplied by mult after each logarithm.
 */
export function iteratedmultlog(value : DecimalSource, base : DecimalSource, times : number, mult : DecimalSource) : Decimal {
    let [valueD, baseD, multD] = [value, base, mult].map(toDecimal);
    return Decimal.iteratedlog(valueD, baseD.pow(multD.recip()), times, true);
}

/**
 * This function is to iteratedexpmult and iteratedmultlog as slog is to iteratedexp/tetrate and iteratedlog.
 */
export function multslog(value : DecimalSource, base : DecimalSource, mult : DecimalSource) : Decimal {
    let [valueD, baseD, multD] = [value, base, mult].map(toDecimal);
    return valueD.slog(baseD.pow(multD.recip()), 100, true);
}

/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b * (base)^e equals the original value.
 * @param value ( Decimal ! ) The value we want to turn into scientific notation.
 * @param base ( Decimal ) The base of the scientific notation we're using (default is 10)
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, 2.357e224 in base 10, which normally returns [2.357, 224], would become [23.57, 223] with 1 mantissaPower and [235.7, 222] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 * @param expMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
 */
export function scientifify(value: DecimalSource, base: DecimalSource = Decimal.dTen, rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero, mantissaPower : DecimalSource = Decimal.dZero, engineerings : DecimalSource | DecimalSource[] = Decimal.dOne, expMultiplier : DecimalSource = Decimal.dOne): [Decimal, Decimal] {
    let valueD = toDecimal(value);
    let baseD = toDecimal(base);
    let mantissaPowerD = toDecimal(mantissaPower);
    let expMultiplierD = toDecimal(expMultiplier);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    let engineeringsD : Decimal[] = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (valueD.eq(0)) return [new Decimal(0), new Decimal(-Infinity)];
    if (valueD.eq(Decimal.dInf)) return [new Decimal(Infinity), new Decimal(Infinity)];
    if (valueD.eq(Decimal.dNegInf)) return [new Decimal(-Infinity), new Decimal(Infinity)];
    if (!valueD.isFinite()) return [new Decimal(NaN), new Decimal(NaN)];
    if (valueD.lt(0)) {
        let preFlip = scientifify(valueD.neg(), baseD, rounding, mantissaPower, engineerings, expMultiplier);
        return [preFlip[0].neg(), preFlip[1]];
    }
    if (baseD.eq(1) || baseD.lte(0)) {
        if (baseD.lt(0)) console.log("Negative base in scientifify");
        else console.log("Invalid base in scientifify")
        return [baseD, new Decimal(NaN)];
    }
    let b = valueD.log(baseD);
    let e = currentEngineeringValue(b.sub(mantissaPowerD), engineeringsD);
    if (e.lt(0) && e.neq(b.sub(mantissaPowerD))) e = previousEngineeringValue(b.sub(mantissaPowerD), engineeringsD);
    b = Decimal.pow(base, b.sub(e));
    let unroundedB = b;
    b = round(b, rounding);
    if (e.abs().gt(Number.MAX_SAFE_INTEGER)) b = Decimal.pow(baseD, mantissaPowerD);
    else {
        let oldB = Decimal.dZero;
        let checkComplete = false;
        let loopWatch = false;
        do {
            oldB = unroundedB;
            let upperLimit = baseD.pow(nextEngineeringValue(e, engineeringsD).sub(currentEngineeringValue(e, engineeringsD)).plus(mantissaPower));
            let lowerLimit = baseD.pow(mantissaPowerD);
            if (baseD.lt(1)) {
                if (b.lte(upperLimit)) {
                    b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(previousEngineeringValue(e, engineeringsD)));
                    e = previousEngineeringValue(e, engineeringsD);
                    unroundedB = b;
                    b = round(b, rounding);
                    loopWatch = true;
                }
                else if (b.gt(lowerLimit)) {
                    b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(nextEngineeringValue(e, engineeringsD)));
                    e = nextEngineeringValue(e, engineeringsD);
                    unroundedB = b;
                    if (loopWatch) b = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
                    b = round(b, rounding);
                    if (loopWatch) break;
                }
                else checkComplete = true;
            }
            else {
                if (b.gte(upperLimit)) {
                    b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(nextEngineeringValue(e, engineeringsD)));
                    e = nextEngineeringValue(e, engineeringsD);
                    unroundedB = b;
                    if (loopWatch) b = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
                    b = round(b, rounding);
                    if (loopWatch) break;
                }
                else if (b.lt(lowerLimit)) {
                    b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(previousEngineeringValue(e, engineeringsD)));
                    e = previousEngineeringValue(e, engineeringsD);
                    unroundedB = b;
                    b = round(b, rounding);
                    loopWatch = true;
                }
                else checkComplete = true;
            }
        } while (!checkComplete && oldB.neq(unroundedB))
    }
    e = e.mul(expMultiplierD);
    return [b, e];
}

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
export function hyperscientifify(value: DecimalSource, base: DecimalSource = Decimal.dTen, rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero, hypermantissaPower : DecimalSource = Decimal.dZero, engineerings : DecimalSource | DecimalSource[] = Decimal.dOne, expMultiplier : DecimalSource = Decimal.dOne, hyperexpMultiplier : DecimalSource = Decimal.dOne): [Decimal, Decimal] {
    let valueD = toDecimal(value);
    let baseD = toDecimal(base);
    let hypermantissaPowerD = toDecimal(hypermantissaPower);
    let expMultiplierD = toDecimal(expMultiplier);
    let hyperexpMultiplierD = toDecimal(hyperexpMultiplier);
    let effectiveBase = baseD.pow(expMultiplierD.recip());
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    let engineeringsD : Decimal[] = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (effectiveBase.lte(1)) return [baseD, new Decimal(NaN)];
    if (valueD.eq(Decimal.dInf)) return [new Decimal(Infinity), new Decimal(Infinity)];
    if (valueD.eq(Decimal.dNegInf)) return [new Decimal(-Infinity), new Decimal(-2)];
    if (!valueD.isFinite()) return [new Decimal(NaN), new Decimal(NaN)];
    if (valueD.gte(effectiveBase.tetrate(Infinity))) return [valueD.div(effectiveBase.tetrate(Infinity)), new Decimal(Infinity)];
    let e : Decimal, b : Decimal;
    if (valueD.lt(iteratedexpmult(baseD, 1, engineeringsD[engineeringsD.length - 1].mul(10).toNumber(), expMultiplierD)) && (valueD.gt(Decimal.max(-Infinity, iteratedexpmult(baseD, 1, engineeringsD[engineeringsD.length - 1].mul(-10).toNumber(), expMultiplierD))))) {
        // We really want to avoid calling slog on small numbers, so just let the "oldB" loop below handle it. The loop limit of 10 was chosen arbitrarily.
        e = new Decimal(0);
        b = valueD;
    }
    else {
        e = currentEngineeringValue(multslog(valueD, baseD, expMultiplierD).sub(hypermantissaPowerD), engineeringsD);
        if (e.lt(0) && e.neq(multslog(valueD, baseD, expMultiplierD).sub(hypermantissaPowerD))) e = previousEngineeringValue(multslog(valueD, baseD, expMultiplierD).sub(hypermantissaPowerD), engineeringsD);
        b = iteratedmultlog(valueD, baseD, e.toNumber(), expMultiplierD);
    }
    let unroundedB = b;
    b = round(b, rounding);
    if (e.abs().gt(Number.MAX_SAFE_INTEGER)) b = baseD.iteratedexp(hypermantissaPowerD.toNumber(), Decimal.dOne, true);
    else {
        let oldB = Decimal.dZero;
        let checkComplete = false;
        let loopWatch = false;
        do {
            oldB = unroundedB;
            let upperLimit = iteratedexpmult(baseD, Decimal.dOne, nextEngineeringValue(e, engineeringsD).sub(currentEngineeringValue(e, engineeringsD)).plus(hypermantissaPowerD).toNumber(), expMultiplierD);
            let lowerLimit = iteratedexpmult(baseD, Decimal.dOne, hypermantissaPowerD.toNumber(), expMultiplierD);
            if (b.gte(upperLimit)) {
                b = iteratedmultlog(unroundedB, baseD, nextEngineeringValue(e, engineeringsD).sub(e).toNumber(), expMultiplierD); 
                e = nextEngineeringValue(e, engineeringsD);
                unroundedB = b;
                if (loopWatch) b = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
                b = round(b, rounding);
                if (loopWatch) break;
            }
            else if (b.lt(lowerLimit)) {
                b = iteratedexpmult(baseD, unroundedB, e.sub(previousEngineeringValue(e, engineeringsD)).toNumber(), expMultiplierD);
                e = previousEngineeringValue(e, engineeringsD);
                unroundedB = b;
                b = round(b, rounding);
                loopWatch = true;
            }
            else checkComplete = true;
        } while (!checkComplete && oldB.neq(unroundedB))
    }
    e = e.mul(hyperexpMultiplierD);
    return [b, e];
}

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
export function hypersplit(
    value : DecimalSource,
    base : DecimalSource = 10,
    maximums : DecimalSource[] = [10, 10, 10],
    originalMaximums : DecimalSource[] = maximums,
    minnum : DecimalSource = 1,
    mantissaRounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
    engineerings : DecimalSource | DecimalSource[] = 1,
    hyperengineerings : DecimalSource | DecimalSource[] = 1,
    pentaengineerings : DecimalSource | DecimalSource[] = 1,
    expMult : DecimalSource = 1,
    hyperexpMult : DecimalSource = 1,
    pentaexpMult : DecimalSource = 1) : [Decimal, Decimal, Decimal, Decimal] {
        let valueD = toDecimal(value);
        let baseD = toDecimal(base);
        let maximumsD = maximums.map(toDecimal);
        if (maximumsD.length == 0) maximumsD.push(new Decimal(base));
        while (maximumsD.length < 3) maximumsD.push(maximumsD[maximumsD.length - 1]);
        let originalMaximumsD = originalMaximums.map(toDecimal);
        if (originalMaximumsD.length == 0) originalMaximumsD = maximumsD;
        while (originalMaximumsD.length < 3) originalMaximumsD.push(originalMaximumsD[originalMaximumsD.length - 1]);
        let minnumD = toDecimal(minnum);
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        let engineeringsD : Decimal[] = engineerings.map(toDecimal);
        engineeringsD = engineeringsD.sort(function(a, b){
            if (a.lt(b)) return -1;
            else if (a.eq(b)) return 0;
            else return 1;
        }).reverse();
        if (!Array.isArray(hyperengineerings)) hyperengineerings = [hyperengineerings];
        let hyperengineeringsD : Decimal[] = hyperengineerings.map(toDecimal);
        hyperengineeringsD = hyperengineeringsD.sort(function(a, b){
            if (a.lt(b)) return -1;
            else if (a.eq(b)) return 0;
            else return 1;
        }).reverse();
        if (!Array.isArray(pentaengineerings)) pentaengineerings = [pentaengineerings];
        let pentaengineeringsD : Decimal[] = pentaengineerings.map(toDecimal);
        pentaengineeringsD = pentaengineeringsD.sort(function(a, b){
            if (a.lt(b)) return -1;
            else if (a.eq(b)) return 0;
            else return 1;
        }).reverse();
        let expMultD = toDecimal(expMult);
        let hyperexpMultD = toDecimal(hyperexpMult);
        let pentaexpMultD = toDecimal(pentaexpMult);
        if (baseD.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Hypersplit does not support convergent tetrations")

        let mantissaRemoved = (maximumsD[0].eq(0));
        let amountRemoved = 0;
        if (maximumsD[1].lte(expMultD)) {
            amountRemoved = 1;
            maximumsD[1] = Decimal.dOne;
            if (maximumsD[2].lte(hyperexpMultD)) {
                amountRemoved = 2;
                maximumsD[2] = Decimal.dOne;
            }
        }
        let limits = [maximumsD[0]];
        if (mantissaRemoved) {
            limits.push(iteratedexpmult(baseD, maximumsD[1], 1, expMultD));
            limits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(maximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
            limits[2] = limits[2].max(limits[1]);
        }
        else {
            limits.push(iteratedexpmult(baseD, previousEngineeringValue(maximumsD[1], engineeringsD), 1, expMultD).mul(maximumsD[0]));
            limits[1] = limits[1].max(limits[0]);
            limits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(maximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
            limits[2] = limits[2].max(limits[1]);
        }
        let originalLimits = [originalMaximumsD[0]];
        if (mantissaRemoved) {
            originalLimits.push(iteratedexpmult(baseD, originalMaximumsD[1], 1, expMultD));
            originalLimits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(originalMaximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
            originalLimits[2] = originalLimits[2].max(originalLimits[1]);
        }
        else {
            originalLimits.push(iteratedexpmult(baseD, previousEngineeringValue(originalMaximumsD[1], engineeringsD), 1, expMultD).mul(maximumsD[0]));
            originalLimits[1] = originalLimits[1].max(originalLimits[0]);
            originalLimits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(originalMaximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
            originalLimits[2] = originalLimits[2].max(originalLimits[1]);
        }

        if (valueD.eq(0) && amountRemoved == 0) return [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
        if (!mantissaRemoved && minnumD.gte(0) && valueD.abs().lt(originalMaximumsD[0]) && valueD.abs().gte(minnumD)) return [valueD, new Decimal(0), new Decimal(0), new Decimal(0)];
        if (valueD.lt(1) && amountRemoved == 1) {
            if (mantissaRemoved) {
                let tetration = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
                tetration = round(tetration, mantissaRounding)
                return [new Decimal(0), new Decimal(0), tetration, new Decimal(0)];
            }
            else {
                let tetration = previousEngineeringValue(Decimal.dZero, hyperengineeringsD);
                while (valueD.lt(0) && tetration.gt(-2)) tetration = previousEngineeringValue(tetration, hyperengineeringsD);
                let mantissa = iteratedmultlog(valueD, baseD, tetration.toNumber(), expMult);
                return [mantissa, new Decimal(0), tetration.mul(hyperexpMult), new Decimal(0)];
            }
        }
        if (valueD.lt(1) && amountRemoved == 2) {
            if (mantissaRemoved) {
                //Just use the same values as for tetration, I don't have any better ideas
                let pentation = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
                pentation = round(pentation, mantissaRounding);
                return [new Decimal(0), new Decimal(0), new Decimal(0), pentation];
            }
            else {
                let pentation = nextEngineeringValue(new Decimal(0), pentaengineeringsD);
                for (let p = 0; p < pentation.toNumber(); p++) {
                    valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
                }
                return [valueD, new Decimal(0), new Decimal(0), pentation.mul(pentaexpMultD)];
            }
        } 
        let negative = false;
        if (valueD.lt(0)) {
            negative = true;
            valueD = valueD.neg();
        }
        let negExp = false;
        if (valueD.lt(1) && valueD.recip().gte(originalLimits[1]) && amountRemoved < 1) {
            negExp = true;
            valueD = valueD.recip();
        }
        let oldB = Decimal.dZero;
        let checkComplete = false;
        let pentation = new Decimal(0);
        if (mantissaRemoved && amountRemoved > 1) {
            while (valueD.gte(baseD)) {
                valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
                pentation = pentation.plus(1);
            }
            pentation = pentation.plus(valueD.log(baseD)).mul(hyperexpMult)
            pentation = round(pentation, mantissaRounding)
            return [new Decimal(0), new Decimal(0), new Decimal(0), pentation];
        }
        if (valueD.gte(originalLimits[2])) {
            while (valueD.gte(limits[2])) {
                let pentIncrease = nextEngineeringValue(pentation, pentaengineeringsD).sub(pentation).toNumber();
                for (let p = 0; p < pentIncrease; p++) {
                    valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
                }
                pentation = pentation.plus(pentIncrease);
            }
        }
        pentation = pentation.mul(pentaexpMultD);
        let [hypermantissa, tetration] = [valueD, new Decimal(0)];
        if (mantissaRemoved && amountRemoved > 0) {
            tetration = multslog(valueD, baseD, expMult).mul(hyperexpMult);
            tetration = round(tetration, mantissaRounding)
            if (tetration.gte(maximumsD[2])) {
                valueD = toDecimal(value);
                let pentIncrease = nextEngineeringValue(pentation, pentaengineeringsD).sub(pentation).toNumber();
                for (let p = 0; p < pentIncrease; p++) {
                    valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
                }
                let [m, e, t, p] = hypersplit(valueD, base, maximums, originalMaximums, minnum, mantissaRounding, engineerings, hyperengineerings, pentaengineerings, expMult, hyperexpMult);
                p = p.plus(pentIncrease);
                return [m, e, t, p.mul(pentaexpMult)];
            }
            else return [new Decimal(0), new Decimal(0), tetration, pentation];
        }
        if (amountRemoved > 1) {
            hypermantissa = round(hypermantissa, mantissaRounding);
        }
        else if ((pentation.eq(0) && valueD.gte(originalLimits[1])) || (pentation.gt(0) && valueD.gte(limits[1]))) {
            let hypermantissaPower = multslog(limits[1], baseD, expMultD);
            [hypermantissa, tetration] = hyperscientifify(valueD, baseD, 0, hypermantissaPower, hyperengineeringsD, expMultD);
            oldB = Decimal.dZero;
            checkComplete = false;
            do {
                oldB = hypermantissa;
                if (hypermantissa.gte(limits[1])) {
                    hypermantissa = iteratedmultlog(hypermantissa, baseD, nextEngineeringValue(tetration, hyperengineeringsD).sub(tetration).toNumber(), expMultD); 
                    tetration = nextEngineeringValue(tetration, hyperengineeringsD);
                }
                else if (iteratedexpmult(baseD, hypermantissa, tetration.sub(previousEngineeringValue(tetration, hyperengineeringsD)).toNumber(), expMultD).lt(limits[1])) {
                    hypermantissa = iteratedexpmult(baseD, hypermantissa, tetration.sub(previousEngineeringValue(tetration, hyperengineeringsD)).toNumber(), expMultD);
                    tetration = previousEngineeringValue(tetration, hyperengineeringsD);
                }
                else checkComplete = true;
            } while (!checkComplete && oldB.neq(hypermantissa));
        }
        let mantissaPower = Decimal.dZero;
        let [mantissa, exponent] = [hypermantissa, new Decimal(0)];
        let scientififyLoopDone = false;
        do {
            mantissaPower = Decimal.dZero;
            [mantissa, exponent] = [hypermantissa, new Decimal(0)];
            if (mantissaRemoved) {
                [mantissa, exponent] = [new Decimal(0), round(hypermantissa.log(baseD), mantissaRounding)];
            }
            else if (amountRemoved < 1 && mantissa.gte(originalMaximumsD[0])) {
                mantissaPower = limits[0].log(baseD).sub(engineeringsD[engineeringsD.length - 1]); // Not a perfect value, but we'll let the loop below fix the errors. We guarantee mantissaPower behaves as we want it to here because mantissaPower cares about the lower limit while hypersplit cares about the upper limit, and once engineerings is involved the two won't coincide so easily.
                [mantissa, exponent] = scientifify(hypermantissa, baseD, 0, mantissaPower, engineeringsD);
            }
            let unroundedmantissa = new Decimal(mantissa);
            mantissa = round(mantissa, mantissaRounding);
            if (amountRemoved < 1 && !mantissaRemoved) {
                let oldB = Decimal.dZero;
                let checkComplete = false;
                let loopWatch = false;
                do {
                    oldB = unroundedmantissa;
                    let upperLimit = (exponent.eq(0)) ? originalLimits[0] : limits[0];
                    let lowerLimit = upperLimit.div(baseD.pow(exponent.sub(previousEngineeringValue(exponent, engineeringsD))));
                    if (mantissa.gte(upperLimit)) {
                        unroundedmantissa = unroundedmantissa.mul(baseD.pow(exponent)).div(baseD.pow(nextEngineeringValue(exponent, engineeringsD)));
                        exponent = nextEngineeringValue(exponent, engineeringsD);
                        if (loopWatch) mantissa = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
                        mantissa = round(unroundedmantissa, mantissaRounding);
                        if (loopWatch) break;
                    }
                    else if (mantissa.lt(lowerLimit)) {
                        unroundedmantissa = unroundedmantissa.mul(baseD.pow(exponent)).div(baseD.pow(previousEngineeringValue(exponent, engineeringsD)));
                        exponent = previousEngineeringValue(exponent, engineeringsD);
                        mantissa = round(unroundedmantissa, mantissaRounding);
                        loopWatch = true;
                    }
                    else checkComplete = true;
                } while (!checkComplete && oldB.neq(unroundedmantissa))
            }
            if (exponent.gte((tetration.eq(0)) ? originalMaximumsD[1] : maximumsD[1])) { //Rounding might set us over the limit
                hypermantissa = iteratedmultlog(hypermantissa, baseD, nextEngineeringValue(tetration, hyperengineeringsD).sub(tetration).toNumber(), expMultD); 
                tetration = nextEngineeringValue(tetration, hyperengineeringsD);
            }
            else scientififyLoopDone = true;
        } while (!scientififyLoopDone);
        tetration = tetration.mul(hyperexpMultD);
        if (tetration.gte((pentation.eq(0)) ? originalMaximumsD[2] : maximumsD[2])) {
            valueD = toDecimal(value);
            let pentIncrease = nextEngineeringValue(pentation, pentaengineeringsD).sub(pentation).toNumber();
            for (let p = 0; p < pentIncrease; p++) {
                valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
            }
            let [m, e, t, p] = hypersplit(valueD, base, maximums, originalMaximums, minnum, mantissaRounding, engineerings, hyperengineerings, pentaengineerings, expMult, hyperexpMult);
            p = p.plus(pentIncrease);
            return [m, e, t, p.mul(pentaexpMult)];
        }
        exponent = exponent.mul(expMultD);
        if (negExp) exponent = exponent.neg();
        if (negative) mantissa = mantissa.neg();
        if (amountRemoved > 0) exponent = new Decimal(0);
        if (amountRemoved > 1) tetration = new Decimal(0);
        return [mantissa, exponent, tetration, pentation];
    }

//Decimal's factorial function is too imprecise for something as precision-needing as base conversion, so here's a quick implementation of factorial. For ease of implementing factoradic, -1! is 1 / 1!, -2! is 1 / 2!, -3! is 1 / 3!, and so on.
export function factorial(value : number) : number {
    if (value % 1 != 0) throw new RangeError("Non-whole factorials are not implemented.");
    let result = 1;
    if (value >= 0) for (let i = 1; i <= value; i++) result *= i;
    else for (let i = 1; i <= -value; i++) result /= i;
    return result;
}

/**
 * Repeatedly takes the factorial of a Decimal.
 * @param value ( Decimal ! ) The number we're taking factorials of.
 * @param iterations ( number ) The amount of times the factorial is taken. Uses an approximation for non-whole amounts of iterations. Default is 1.
 */
export function iteratedfactorial(value: DecimalSource, iterations : number = 1) : Decimal {
    let valueD = toDecimal(value);
    if (iterations == 0) return valueD;
    if (iterations == 1) return valueD.factorial();
    if (valueD.lt(0.461632144968362341262659542325) && iterations % 1 != 0) return new Decimal(NaN); //I'm not sure what fractional iterations would mean below the local minimum
    if (iterations < 0) return inverse_factorial(valueD, -iterations);
    let wholeiterations = Math.floor(iterations);
    let fraciterations = iterations - wholeiterations;
    let payload = valueD;
    if (fraciterations != 0) payload = payload.mul(valueD.factorial().div(valueD).pow(fraciterations)); 
    for (let f = 0; f < wholeiterations; f++) {
        if (payload.eq(1)) return new Decimal(1); //1!!!!!... is always 1
        if (payload.eq(2)) return new Decimal(2); //2!!!!!... is always 2
        if (payload.gt(new Decimal(Number.MAX_SAFE_INTEGER).pow10())) return Decimal.iteratedexp(10, wholeiterations - f, payload, true);
        payload = payload.factorial();
        if (f > 10000) return payload; //Bail after 10000 iterations if nothing is happening
    }
    return payload;
}

/**
 * The inverse of the factorial function: finds the number x such that x! = value. Equivalent to iteratedfactorial with a negative amount of iterations.
 * @param value ( Decimal ! ) The value we're finding the inverse factorial of.
 * @param iterations ( number ) The amount of times the factorial is taken. Default is 1. For example, if iterations is 2, then it finds the number x such that x!! = value. Default is 1.
 */
export function inverse_factorial(value: DecimalSource, iterations : number = 1) : Decimal {
    let valueD = toDecimal(value);
    if (valueD.eq(1)) return new Decimal(1);
    if (valueD.eq(2)) return new Decimal(2);
    if (iterations < 0) return iteratedfactorial(valueD, -iterations);
    //I'm not dealing with the uncertainty of negative factorials here. I carefully studied super-root to handle small inputs for it in break_eternity, and maybe with enough studying I could handle small inputs for a single-factorial, but multiple factorials would be far too chaotic.
    //Besides, handling special cases like that might be useful for break_eternity (a large number library), but not for eternal_notations (a notations library).
    if (valueD.lt(iteratedfactorial(0.461632144968362341262659542325, iterations))) throw new Error("Inverse_factorial is currently unsupported for values below the local minimum. Sorry!");
    //Loop procedure adapted from Decimal.linear_sroot
    let upperBound = new Decimal(2);
    if (valueD.gt(2)) upperBound = valueD.linear_sroot(Math.floor(iterations + 1)).mul(2); //x! is lower-bounded by (x/2)^^2
    let lower = Decimal.dZero; //This is zero because we might be on a higher layer, so the lower bound might actually some 10^10^10...^0
    let layer = upperBound.layer;
    if (layer == 0) lower = new Decimal(0.461632144968362341262659542325);
    let upper = upperBound.iteratedlog(10, layer, true);
    let previous = upper;
    let guess = upper.div(2);
    let loopGoing = true;
    while (loopGoing) {
      guess = lower.add(upper).div(2);
      if (iteratedfactorial(Decimal.iteratedexp(10, layer, guess, true), iterations).gt(valueD)) upper = guess;
      else lower = guess;
      if (guess.eq(previous)) loopGoing = false;
      else previous = guess;
    }
    if (iteratedfactorial(Decimal.iteratedexp(10, layer, guess, true), iterations).eq_tolerance(valueD, 1e-9)) return Decimal.iteratedexp(10, layer, guess, true); 
    else return new Decimal(NaN);
}

/**
 * This function is to iteratedfactorial and inverse_factorial as slog is to iteratedexp and iteratedlog: it returns the amount of times factorial must be applied to the base to return the given value.
 * @param value ( Decimal ! ) The value we're finding the factorial_slog for.
 * @param base ( Decimal ) The number that the factorials are repeatedly applied to. The base must be greater than 2. Default is 3.
 */
export function factorial_slog(value : DecimalSource, base: DecimalSource = 3) : Decimal {
    let valueD = toDecimal(value);
    let baseD = toDecimal(base);
    if (baseD.lte(2)) throw new RangeError("factorial_slog is not supported for bases equal to or below 2, since iteratedfactorial isn't increasing for those bases.");
    if (valueD.eq(2)) return new Decimal(-Infinity);
    if (valueD.lt(2)) return new Decimal(NaN);
    if (valueD.eq(baseD)) return new Decimal(0); //Combats imprecision
    if (valueD.gte(Decimal.tetrate(baseD, 1e17))) return valueD.slog(baseD, 100, true); //At this scale the difference between factorial_slog and regular slog is lost in precision
    if (valueD.lt(baseD)) {
        let lower = -1e-18;
        let upper = -2e-18;
        let guess = 0;
        while (iteratedfactorial(baseD, upper).gt(valueD)) {
            lower *= 2;
            upper *= 2;
        }
        let previous = -1;
        while (previous != guess) {
            previous = guess;
            guess = (lower + upper)/2;
            if (iteratedfactorial(baseD, guess).gt(valueD)) lower = guess;
            else upper = guess;
        }
        return toDecimal(guess);
    }
    else {
        let lower = 1e-18;
        let upper = 2e-18;
        let guess = 0;
        while (iteratedfactorial(baseD, upper).lt(valueD)) {
            lower *= 2;
            upper *= 2;
        }
        let previous = -1;
        while (previous != guess) {
            previous = guess;
            guess = (lower + upper)/2;
            if (iteratedfactorial(baseD, guess).lt(valueD)) lower = guess;
            else upper = guess;
        }
        return toDecimal(guess);
    }
}

/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b * e! equals the original value.
 * @param value ( Decimal ! ) The value to be converted into "factorial scientific notation".
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param mantissaPower ( Decimal ) Normally, the mantissa in factorial-scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
export function factorial_scientifify(value: DecimalSource, rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero, mantissaPower : DecimalSource = Decimal.dZero, engineerings : DecimalSource | DecimalSource[] = Decimal.dOne): [Decimal, Decimal] {
    let valueD = toDecimal(value);
    let mantissaPowerD = toDecimal(mantissaPower);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    let engineeringsD : Decimal[] = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (valueD.eq(0)) return [new Decimal(0), new Decimal(0)];
    if (valueD.eq(1)) return [new Decimal(1), new Decimal(1)]; //Combats imprecision for this one special case that I especially want to be correct
    if (valueD.eq(Decimal.dInf)) return [new Decimal(Infinity), new Decimal(Infinity)];
    if (valueD.eq(Decimal.dNegInf)) return [new Decimal(-Infinity), new Decimal(Infinity)];
    if (!valueD.isFinite()) return [new Decimal(NaN), new Decimal(NaN)];
    if (valueD.lt(0)) {
        let preFlip = factorial_scientifify(valueD.neg(), rounding, mantissaPower, engineerings);
        return [preFlip[0].neg(), preFlip[1]];
    }
    let b = Decimal.dZero;
    let e = Decimal.dZero;
    let unroundedB = b;
    if (valueD.lt(1)) {
        b = inverse_factorial(valueD.recip());
        e = currentEngineeringValue(b.plus(mantissaPowerD), engineeringsD);
        b = valueD.div(e.factorial().recip());
        unroundedB = b;
        b = round(b, rounding);
        if (valueD.lte("e-9e15")) {
            b = e.factorial().div(e.sub(mantissaPowerD).factorial());
        } 
        else {
            let oldB = Decimal.dZero;
            let checkComplete = false;
            do {
                oldB = unroundedB;
                let upperLimit = previousEngineeringValue(e, engineeringsD).sub(mantissaPower).factorial().recip();
                let lowerLimit = currentEngineeringValue(e, engineeringsD).sub(mantissaPower).factorial().recip();
                if (e.gt(0) && b.mul(e.factorial().recip()).gte(upperLimit)) {
                    e = previousEngineeringValue(e, engineeringsD);
                    unroundedB = valueD.div(e.factorial().recip());
                    b = round(unroundedB, rounding);
                }
                else if (b.mul(e.factorial().recip()).lt(lowerLimit)) {
                    e = nextEngineeringValue(e, engineeringsD);
                    unroundedB = valueD.div(e.factorial().recip());
                    b = round(unroundedB, rounding);
                }
                else checkComplete = true;
            } while (!checkComplete && oldB.neq(unroundedB))
        }
        e = e.neg();
    }
    else {
        b = inverse_factorial(valueD);
        e = currentEngineeringValue(b.sub(mantissaPowerD), engineeringsD);
        b = valueD.div(e.factorial());
        unroundedB = b;
        b = round(b, rounding);
        if (valueD.gte("e9e15")) {
            b = e.factorial().div(e.sub(mantissaPowerD).factorial());
        }
        else {
            let oldB = Decimal.dZero;
            let checkComplete = false;
            do {
                oldB = unroundedB;
                let nextE = nextEngineeringValue(e, engineeringsD).plus(mantissaPower).factorial();
                let currentE = currentEngineeringValue(e, engineeringsD).plus(mantissaPower).factorial();
                if (b.mul(e.factorial()).gte(nextE)) {
                    unroundedB = unroundedB.mul(e.factorial()).div(nextEngineeringValue(e, engineeringsD).factorial());
                    e = nextEngineeringValue(e, engineeringsD);
                    b = round(unroundedB, rounding);
                }
                else if (e.gt(0) && b.mul(e.factorial()).lt(currentE)) {
                    unroundedB = unroundedB.mul(e.factorial()).div(previousEngineeringValue(e, engineeringsD).factorial());
                    e = previousEngineeringValue(e, engineeringsD);
                    b = round(unroundedB, rounding);
                }
                else checkComplete = true;
            } while (!checkComplete && oldB.neq(unroundedB))
        }
    }
    return [b, e];
}

/**
 * Converts a Decimal into a list of two Decimals, [b, e], such that b!!!... with e !'s equals the original value.
 * @param value ( Decimal ! ) The value to be converted into "factorial hyperscientific notation".
 * @param limit ( Decimal ) If the mantissa is below this value, the amount of factorials is decreased by 1 to bring the mantissa back to being equal to or above this value. Default is 3.
 * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
 */
export function factorial_hyperscientifify(value: DecimalSource, limit: DecimalSource = new Decimal(3), rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero, engineerings : DecimalSource | DecimalSource[] = Decimal.dOne): [Decimal, Decimal] {
    let valueD = toDecimal(value);
    let limitD = toDecimal(limit);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    let engineeringsD : Decimal[] = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function(a, b){
        if (a.lt(b)) return -1;
        else if (a.eq(b)) return 0;
        else return 1;
    }).reverse();
    if (valueD.eq(Decimal.dInf)) return [new Decimal(Infinity), new Decimal(Infinity)];
    if (valueD.lte(2) || limitD.lte(2)) return [valueD, new Decimal(0)];
    if (!valueD.isFinite()) return [new Decimal(NaN), new Decimal(NaN)];
    let fs = factorial_slog(valueD, limitD)
    let e = currentEngineeringValue(fs, engineeringsD);
    if (e.lt(0) && e.neq(fs)) e = previousEngineeringValue(fs, engineeringsD);
    let unroundedB = inverse_factorial(valueD, e.toNumber());
    let b = round(unroundedB, rounding);
    if (e.abs().gt(Number.MAX_SAFE_INTEGER)) b = limitD;
    else if (e.gte(0)) {
        let oldB = Decimal.dZero;
        let checkComplete = false;
        let loopWatch = false;
        do {
            oldB = unroundedB;
            let upperLimit = iteratedfactorial(limitD, nextEngineeringValue(e, engineeringsD).sub(currentEngineeringValue(e, engineeringsD)).toNumber());
            if (b.gte(upperLimit)) {
                e = nextEngineeringValue(e, engineeringsD);
                unroundedB = inverse_factorial(valueD, e.toNumber());
                if (loopWatch) unroundedB = limitD; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
                b = round(unroundedB, rounding);
                if (loopWatch) break;
            }
            else if (b.lt(limitD)) {
                e = previousEngineeringValue(e, engineeringsD);
                unroundedB = inverse_factorial(valueD, e.toNumber());
                b = round(unroundedB, rounding);
                loopWatch = true;
            }
            else checkComplete = true;
        } while (!checkComplete && oldB.neq(unroundedB))
    }
    return [b, e];
}

/**
 * Returns the nth polygonal number of s sides; 3 sides is triangular numbers, 4 sides is perfect squares, etc.
 * Grows quadratically.
 * @param value ( Decimal ! ) The value we're taking the polygonal number of.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 */
export function polygon(value : DecimalSource, sides : DecimalSource) : Decimal {
    let valueD = toDecimal(value);
    let sidesD = toDecimal(sides);
    return valueD.sub(1).mul(sidesD.sub(2)).plus(2).mul(valueD).div(2);
}

/**
 * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds n given x and s.
 * Grows at a square root rate (square root itself, of course, is the s = 4 case of polygonRoot).
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 */
export function polygonRoot(value : DecimalSource, sides : DecimalSource) : Decimal {
    let valueD = toDecimal(value);
    let sidesD = toDecimal(sides);
    if (sidesD.eq(2)) return valueD;
    return sidesD.sub(2).mul(8).mul(valueD).plus(sidesD.sqr().sub(sidesD.mul(8)).plus(16)).sqrt().plus(sidesD).sub(4).div(sidesD.mul(2).sub(4));
}

/**
 * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds s given x and n.
 * This is actually weaker than polygonRoot - polygonRoot has the strength of square root, but polygonLog has the strength of division.
 * @param value ( Decimal ! ) The x in the above example.
 * @param base ( Decimal ! ) The n in the above example.
 */
export function polygonLog(value : DecimalSource, base : DecimalSource) : Decimal {
    let valueD = toDecimal(value);
    let baseD = toDecimal(base);
    return valueD.plus(baseD.mul(baseD.sub(2))).div(baseD.sqr().sub(baseD).div(2));
}

/**
 * Iterated polygon: this function returns the result of applying polygon(x, s) to 'payload' (with the result placed in the x of the next application) 'value' times.
 * Grows double-exponentially, using a linear approximation for fractional values (though this becomes irrelevant for values above 8 or so, as there's an approximating formula that holds for non-small values)
 * @param value ( Decimal ! ) The amount of times the polygon function is applied.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 * @param payload ( Decimal ) The number the polygon function is repeatedly applied to. Default is 2.
 */
export function biPolygon(value : DecimalSource, sides : DecimalSource, payload : DecimalSource = 2) : Decimal {
    let valueD = toDecimal(value);
    let sidesD = toDecimal(sides);
    let payloadD = toDecimal(payload);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (payloadD.eq(1)) return new Decimal(1);
    if (payloadD.eq(0)) return new Decimal(0);
    if (payloadD.lt(0)) throw new RangeError("Repeated polygonal functions do not currently support negative payloads");
    if (valueD.lt(0)) return iteratedPolygonRoot(payloadD, valueD.neg(), sidesD);
    if (payloadD.gt(1)) {
        let iterationArray = [payloadD];
        while (iterationArray[iterationArray.length - 1].plus(Decimal.sub(4, sides).max(1)).neq(iterationArray[iterationArray.length - 1])) iterationArray.push(polygon(iterationArray[iterationArray.length - 1], sidesD)); //The max(1) is there mostly to make sure sides == 4 gets a few entries rather than stopping right away
        let finalIteration = polygon(iterationArray[iterationArray.length - 1], sidesD);
        // https://oeis.org/A007501 shows an example of the formula here:
        // Nesting the polygon operation results in an expression that quickly approaches A * B^2^n + C, for some constants A, B, and C. (the OEIS example doesn't include C in its approximation, but testing has shown me that C for triangular numbers should be -0.5)
        // This is not accurate for the first few entries, but quickly becomes accurate.
        // A and C are determined exclusively by the number of sides:
        let A = sidesD.sub(2).div(2).recip();
        let C = sidesD.sub(4).div(sidesD.sub(2).mul(2));
        // But we'll need to get B experimentally, as both payload and sides influence it:
        let B = finalIteration.sub(C).div(A).root(Decimal.pow(2, iterationArray.length));
    
        iterationArray.push(finalIteration);
        console.log(iterationArray);
        console.log(A);
        console.log(B);
        console.log(C);
        let valueNum = valueD.toNumber();
        if (valueNum >= 0 && valueNum < iterationArray.length && valueNum % 1 == 0) return iterationArray[valueNum];
        else if (valueNum < iterationArray.length - 1) {
            // We'll use a linear approximation here: find the two closest whole-iteration values (from iterationArray), find their n's under A * B^2^n + C, and set that n to be between the two based on the given value
            let lowerN = iterationArray[Math.floor(valueNum)].sub(C).div(A).log(B).log(2).toNumber();
            let upperN = iterationArray[Math.ceil(valueNum)].sub(C).div(A).log(B).log(2).toNumber();
            if (!Number.isFinite(lowerN) || !Number.isFinite(upperN)) {
                // The numbers are too small for the double-exponent approximation to work, so just use a square root approximation instead
                let lowerN = iterationArray[Math.floor(valueNum)].sqrt().toNumber();
                let upperN = iterationArray[Math.ceil(valueNum)].sqrt().toNumber();
                let fracVal = valueNum % 1;
                return Decimal.sqr(upperN * fracVal + lowerN * (1 - fracVal));
            }
            let fracVal = valueNum % 1
            let thisN = upperN * fracVal + lowerN * (1 - fracVal);
            return B.pow(Decimal.pow(2, thisN)).mul(A).plus(C);
        }
        else return B.pow(Decimal.pow(2, value)).mul(A).plus(C);
    }
    else {
        if (sidesD.eq(4)) return payloadD.pow(Decimal.pow(2, value)); //This applies to the payload > 1 case too but it wasn't needed there. Here, however, the algorithm used doesn't work when sides == 4, so the special case is needed
        else if (sidesD.lt(6)) {
            let addedNumber = Decimal.sub(4, sidesD);
            let iterationArray = [payloadD];
            while (iterationArray[iterationArray.length - 1].plus(addedNumber).neq(addedNumber)) iterationArray.push(polygon(iterationArray[iterationArray.length - 1], sidesD));
            let finalIteration = polygon(iterationArray[iterationArray.length - 1], sidesD);
            iterationArray.push(finalIteration);
            let valueNum = valueD.toNumber();
            if (valueNum >= 0 && valueNum < iterationArray.length && valueNum % 1 == 0) return iterationArray[valueNum];
            else if (valueNum < iterationArray.length - 1) {
                let lowerN = iterationArray[Math.floor(valueNum)];
                let upperN = iterationArray[Math.ceil(valueNum)];
                if (lowerN.lt(0) || upperN.lt(0)) return new Decimal(NaN); //The result here would be complex. I'm not sure what it would be exactly, but it would be complex.
                let fracVal = valueNum % 1
                return Decimal.mul(upperN.pow(fracVal), lowerN.pow(1 - fracVal)); // Just take the geometric mean of the two, since the approximation approaches division
            }
            else return finalIteration.mul(addedNumber.div(2).pow(valueD.sub(iterationArray.length))); // Yes, this returns NaN if addedNumber is negative and valueD isn't whole. That's intended, because it would be complex.
        }
        else {
            // The behavior here gets chaotic (though somehow it's periodic with period 4 when sides == 7; sides == 6 and 8 are chaotic, and I haven't looked at non-integer sides), so I'm not dealing with it. You can have a loop for whole values, take it or leave it.
            if (valueD.mod(1).neq(0)) return new Decimal(NaN);
            let iterationsSoFar = Decimal.dZero;
            while (iterationsSoFar.lt(valueD)) {
                iterationsSoFar = iterationsSoFar.plus(1);
                let oldPayload = payloadD;
                payloadD = polygon(payloadD, sidesD);
                if (payloadD.eq(0)) return new Decimal(0);
                if (payloadD.eq(oldPayload.sqr())) return payloadD.pow(Decimal.pow(2, valueD.sub(iterationsSoFar))); // When sides is above 8 it rebounds back to essentially squaring each time
            }
            return payloadD;
        }
    }
}

/**
 * Performs polygonRoot on 'payload', 'iterations' times. Equivalent to biPolygon with a negative value.
 * @param payload ( Decimal ! ) The number that's having the polygonal root repeatedly taken on.
 * @param iterations ( Decimal ! ) The amount of times the polygonal root is taken.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 */
export function iteratedPolygonRoot(payload : DecimalSource, iterations : DecimalSource, sides : DecimalSource) : Decimal {
    let payloadD = toDecimal(payload);
    let originalPayload = payloadD;
    let iterationsD = toDecimal(iterations);
    let sidesD = toDecimal(sides);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (payloadD.eq(1)) return new Decimal(1);
    if (payloadD.eq(0)) return new Decimal(0);
    if (payloadD.lt(0)) throw new RangeError("Repeated polygonal functions do not currently support negative payloads");
    if (iterationsD.lt(0)) return biPolygon(iterationsD.neg(), sidesD, payloadD);
    let A = sidesD.sub(2).div(2).recip();
    
    if (payloadD.gt(1)) {
        let iterationsSoFar = Decimal.dZero;
        let safeIterations = Decimal.dZero;
        if (payloadD.gt(Decimal.max(1e100, sidesD.sqr()))) safeIterations = payloadD.root(Decimal.max(1e100, sidesD.sqr())).log(2).sub(1).floor().max(0).min(iterationsD.ceil()); // 1e100 was chosen arbitrarily as a "high enough to ignore the details" value
        if (safeIterations.gt(0)) {
            payloadD = payloadD.root(Decimal.pow(2, safeIterations)).mul(Decimal.pow(A, Decimal.dOne.sub(Decimal.pow(2, safeIterations.neg())))); // For a precise result you'd also want to do subtraction under square roots with C here, but C's going to be so small compared to these numbers that we can ignore it
            iterationsSoFar = iterationsSoFar.plus(safeIterations);
        }
        while (iterationsD.gt(iterationsSoFar)) {
            payloadD = polygonRoot(payloadD, sidesD);
            iterationsSoFar = iterationsSoFar.plus(1);
            if (payloadD.eq(1)) return new Decimal(1);
        }
        if (iterationsSoFar.sub(iterationsD).neq(0)) {
            payloadD = biPolygon(iterationsSoFar.sub(iterationsD), sidesD, payloadD);
        }
        if (!payloadD.isFinite()) return payloadD;
    
        // This answer is close, but not exact for some reason (it's within typical Decimal precision limits if iterations is an integer, but in non-integer iterations what we have so far isn't good enough), so time for a guess-and-check loop!
        let lower = Decimal.dZero;
        let upper = payloadD.mul(2).slog(10, 100, true);
        let has_changed_directions_once = false;
        while (lower.neq_tolerance(upper, 1e-15)) {
            let payloadSlog = lower.plus(upper).div(2);
            payloadD = Decimal.tetrate(10, payloadSlog.toNumber(), 1, true);
            let bp = biPolygon(iterationsD, sidesD, payloadD);
            if (bp.eq(originalPayload)) return payloadD;
            else if (bp.lt(originalPayload)) {
                if (has_changed_directions_once) lower = payloadSlog;
                else upper = upper.mul(2);
            }
            else {
                upper = payloadSlog;
                has_changed_directions_once = true;
            }
        }
        return payloadD;
    }
    else {
        if (sidesD.eq(4)) return payloadD.root(Decimal.pow(2, iterationsD));
        else if (sidesD.lt(4) || payloadD.gte(sidesD.sub(4).div(sidesD.sub(2)))) {
            let iterationsSoFar = Decimal.dZero;
            let safeIterations = Decimal.dZero;
            let addedNumber = Decimal.sub(4, sidesD);
            let multiplier = addedNumber.div(2);
            let safeThreshold = multiplier.div(1e16);
            if (payloadD.abs().lt(safeThreshold)) safeIterations = payloadD.abs().root(safeThreshold.log(multiplier)).log(multiplier).abs().floor();
            if (safeIterations.gt(0)) {
                iterationsSoFar = safeIterations;
                payloadD = payloadD.root(Decimal.pow(2, safeIterations)).mul(Decimal.pow(A, Decimal.dOne.sub(Decimal.pow(2, safeIterations.neg()))));
            }
            while (iterationsD.gt(iterationsSoFar)) {
                payloadD = polygonRoot(payloadD, sidesD);
                iterationsSoFar = iterationsSoFar.plus(1);
                if (payloadD.eq(1)) return new Decimal(1);
            }
            if (iterationsSoFar.sub(iterationsD).neq(0)) {
                payloadD = biPolygon(iterationsSoFar.sub(iterationsD), sidesD, payloadD);
            }
            let lower = payloadD.recip().div(2).slog(10, 100, true);
            let upper = Decimal.dZero;
            let has_changed_directions_once = false;
            while (lower.neq_tolerance(upper, 1e-15)) {
                let payloadSlog = lower.plus(upper).div(2);
                payloadD = Decimal.tetrate(10, payloadSlog.toNumber(), 1, true).recip();
                let bp = biPolygon(iterationsD, sidesD, payloadD);
                if (bp.eq(originalPayload)) return payloadD;
                else if (bp.lt(originalPayload)) {
                    lower = payloadSlog;
                    has_changed_directions_once = true;
                }
                else {
                    if (has_changed_directions_once) upper = payloadSlog;
                    else lower = lower.mul(2);
                }
            }
            return payloadD;
        }
        else { // Chaotic behavior, so only a whole iterations loop is provided
            if (iterationsD.mod(1).neq(0)) return new Decimal(NaN);
            let iterationsSoFar = Decimal.dZero;
            while (iterationsSoFar.lt(iterationsD)) {
                iterationsSoFar = iterationsSoFar.plus(1);
                payloadD = polygonRoot(payloadD, sidesD);
                if (payloadD.eq(0)) return new Decimal(0);
            }
            return payloadD;
        }
    }
}

/**
 * Inverse function of biPolygon: for biPolygon(n, s, p) = x, this function finds n given x, s, and p.
 * Grows double-logarithmically.
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
 */
export function biPolygonRoot(value : DecimalSource, sides : DecimalSource, zeroValue : DecimalSource = 2) : Decimal {
    let valueD = toDecimal(value);
    let sidesD = toDecimal(sides);
    let zeroValueD = toDecimal(zeroValue);
    if (sidesD.eq(2)) return new Decimal(NaN);
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (zeroValueD.eq(1)) return new Decimal(NaN);
    if (valueD.eq(1)) return new Decimal(-Infinity);
    if (valueD.lt(1)) return new Decimal(NaN);
    // Same process to find constants is done here as in biPolygon, as we'll just invert the approximation formula if value is large enough
    let iterationArray = [zeroValueD];
    while (iterationArray[iterationArray.length - 1].plus(Decimal.sub(4, sides).max(1)).neq(iterationArray[iterationArray.length - 1])) iterationArray.push(polygon(iterationArray[iterationArray.length - 1], sidesD));
    let finalIteration = polygon(iterationArray[iterationArray.length - 1], sidesD);
    let A = sidesD.sub(2).div(2).recip();
    let C = sidesD.sub(4).div(sidesD.sub(2).mul(2));
    let B = finalIteration.sub(C).div(A).root(Decimal.pow(2, iterationArray.length));

    if (valueD.eq(zeroValueD)) return Decimal.dZero;
    else if (valueD.gte(finalIteration)) return valueD.sub(C).div(A).log(B).log(2);
    else if (valueD.gt(zeroValueD)) {
        let guess = Decimal.dZero;
        let lower = Decimal.dZero;
        let upper = new Decimal(iterationArray.length);
        let has_changed_directions_once = false;
        while (lower.neq_tolerance(upper, 1e-15)) {
            guess = lower.plus(upper).div(2);
            let bp = biPolygon(guess, sidesD, zeroValueD);
            if (bp.eq(valueD)) return guess;
            else if (bp.lt(valueD)) {
                if (has_changed_directions_once) lower = guess;
                else upper = upper.mul(2);
            }
            else {
                upper = guess;
                has_changed_directions_once = true;
            }
        }
        return guess;
    }
    else {
        let guess = new Decimal(0);
        let lower = Decimal.dNegOne;
        let upper = Decimal.dZero;
        let has_changed_directions_once = false;
        while (lower.neq_tolerance(upper, 1e-15)) {
            guess = lower.plus(upper).div(2);
            let bp = biPolygon(guess, sidesD, zeroValueD);
            if (bp.eq(valueD)) return guess;
            else if (bp.lt(valueD)) {
                lower = guess;
                has_changed_directions_once = true;
            }
            else {
                if (has_changed_directions_once) upper = guess;
                else lower = lower.mul(2);
            }
        }
        return guess;
    }
}

/**
 * Iterated biPolygon: this function returns the result of applying biPolygon(x, s, p) to 'base' (with the result placed in the x of the next application) 'value' times.
 * Grows tetrationally (increasing value by 1 increases the super-logarithm by around 2). Uses a "linear" approximation for fractional values; I'll admit the approximation used is pretty arbitrary, because I didn't have any better ideas.
 * @param value ( number ! ) The amount of times the biPolygon function is applied.
 * @param sides ( Decimal ! ) The amount of sides on the polygon.
 * @param base ( Decimal ) The payload used in each application of biPolygon. Default is 2.
 * @param payload ( Decimal ) The value that biPolygon is repeatedly applied to. Default is 2.
 */
export function triPolygon(value : number, sides : DecimalSource, base : DecimalSource = 2, payload : DecimalSource = 2) : Decimal {
    let sidesD = toDecimal(sides);
    let baseD = toDecimal(base);
    let payloadD = toDecimal(payload);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (value < 0) return iteratedBiPolygonRoot(payloadD, -value, sides, base);
    let fracValue = value % 1;
    let wholeValue = value - fracValue;
    // This is probably a really bad linear approximation, but oh well.
    let floorPayload = payloadD.slog(10, 100, true).toNumber();
    let ceilingPayload = biPolygon(payloadD, sidesD, baseD).slog(10, 100, true).toNumber();
    payloadD = Decimal.tetrate(10, ceilingPayload * fracValue + floorPayload * (1 - fracValue), 1, true);
    let iterations = 0;
    while (iterations < wholeValue) {
        iterations++;
        payloadD = biPolygon(payloadD, sidesD, baseD);
        if (payloadD.gt(Decimal.pow10(Number.MAX_SAFE_INTEGER))) {
            payloadD = Decimal.iteratedexp(10, (wholeValue - iterations) * 2, payloadD, true);
            break;
        }
    }
    return payloadD;
}

/**
 * Performs biPolygonRoot on 'payload', 'iterations' times. Equivalent to triPolygon with a negative value.
 * @param payload ( Decimal ! ) The number that's having the bipolygonal root repeatedly taken on.
 * @param iterations ( number ! ) The amount of times the bipolygonal root is taken.
 * @param sides ( Decimal ) The amount of sides on the polygon.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root. Default is 2.
 */
export function iteratedBiPolygonRoot(payload : DecimalSource, iterations : number, sides : DecimalSource, zeroValue : DecimalSource = 2) : Decimal {
    let payloadD = toDecimal(payload);
    let originalPayload = payloadD;
    let sidesD = toDecimal(sides);
    let zeroValueD = toDecimal(zeroValue);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (payloadD.lt(1)) return new Decimal(NaN);
    let iterationsSoFar = 0;
    let safeIterations = Decimal.dZero;
    if (payloadD.gt(Decimal.iteratedexp(10, 3, new Decimal(Number.MAX_SAFE_INTEGER)))) safeIterations = payloadD.slog(10, 100, true).sub(Decimal.slog(Decimal.iteratedexp(10, 3, new Decimal(Number.MAX_SAFE_INTEGER)), 10, true)).div(2).plus(1).floor();
    if (safeIterations.gt(0)) {
        payloadD = payloadD.iteratedlog(10, safeIterations.mul(2).toNumber(), true);
        iterationsSoFar = iterationsSoFar + safeIterations.toNumber();
    }
    while (iterations > iterationsSoFar) {
        if (payloadD.lt(1)) return new Decimal(NaN);
        payloadD = biPolygonRoot(payloadD, sidesD, zeroValueD);
        iterationsSoFar += 1;
    }
    if (!payloadD.isFinite()) return new Decimal(NaN);
    if (iterationsSoFar - iterations != 0) {
        payloadD = triPolygon(iterationsSoFar - iterations, sidesD, zeroValueD, payloadD);
    }

    let lower = Decimal.dNegOne;
    let upper = payloadD.slog(10, 100, true).mul(2).max(5);
    let has_changed_directions_once = false;
    while (lower.neq_tolerance(upper, 1e-15)) {
        let guess = lower.plus(upper).div(2)
        payloadD = Decimal.tetrate(10, guess.toNumber(), 1, true);
        let tp = triPolygon(iterations, sidesD, zeroValueD, payloadD);
        if (tp.eq(originalPayload)) return payloadD;
        else if (tp.lt(originalPayload)) {
            if (has_changed_directions_once) lower = guess;
            else upper = upper.mul(2);
        }
        else {
            upper = guess;
            has_changed_directions_once = true;
        }
    }
    return payloadD;
}

/**
 * Inverse function of triPolygon: for triPolygon(n, s, b, p) = x, this function finds n given x, s, b, and p.
 * Grows super-logarithmically.
 * @param value ( Decimal ! ) The x in the above example.
 * @param sides ( Decimal ! ) The s in the above example.
 * @param base ( Decimal ) The b in the above example. Default is 2.
 * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
 */
export function triPolygonRoot(value : DecimalSource, sides : DecimalSource, base : DecimalSource = 2, zeroValue : DecimalSource = 2) : Decimal {
    let valueD = toDecimal(value);
    let originalValue = valueD;
    let sidesD = toDecimal(sides);
    let baseD = toDecimal(base);
    let zeroValueD = toDecimal(zeroValue);
    if (sidesD.eq(2)) return new Decimal(NaN);
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    let result = 0;
    let safeIterations = Decimal.dZero;
    if (valueD.gt(Decimal.iteratedexp(10, 3, new Decimal(Number.MAX_SAFE_INTEGER)))) safeIterations = valueD.slog(10, 100, true).sub(Decimal.slog(Decimal.iteratedexp(10, 3, new Decimal(Number.MAX_SAFE_INTEGER)), 10, true)).div(2).plus(1).floor();
    if (safeIterations.gt(0)) {
        valueD = valueD.iteratedlog(10, safeIterations.mul(2).toNumber(), true);
        result += safeIterations.toNumber();
    }
    while (valueD.gt(zeroValueD)) {
        result++;
        let newvalueD = biPolygonRoot(valueD, sidesD, baseD);
        if (newvalueD.gt(valueD)) return new Decimal(NaN); // I haven't analyzed biPolygon enough to handle this
        valueD = newvalueD;
    }
    let lower = 0;
    let upper = result * 2;
    let has_changed_directions_once = false;
    while (Math.abs(lower - upper) / Math.max(lower, upper) > 1e-15) {
        result = (lower + upper)/2;
        let tp = triPolygon(result, sidesD, baseD, zeroValueD);
        if (tp.eq(originalValue)) return new Decimal(result);
        else if (tp.lt(originalValue)) {
            if (has_changed_directions_once) lower = result;
            else upper = upper * 2;
        }
        else {
            upper = result;
            has_changed_directions_once = true;
        }
        console.log(result + " " + tp);
    }
    return new Decimal(result);
}