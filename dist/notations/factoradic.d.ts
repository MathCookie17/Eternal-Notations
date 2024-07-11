import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare function FactoradicConvert(value: number, digitList?: string[], placesAbove1?: number, placesBelow1?: number, commasMin?: number, showZeroes?: number, reverseDigits?: boolean, commaSpacing?: number, commaChars?: string[], decimalChar?: string, negativeChar?: string, precision?: number, specialDigits?: [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], concatenation?: null | [boolean, string, string, Notation?]): string;
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
export declare class FactoradicNotation extends Notation {
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
    negExpChars: null | [[string, string] | boolean, [string, string]];
    expBefore: boolean;
    hyperexpBefore: boolean;
    precision: number;
    specialDigits: [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][];
    concatenation: null | [boolean, string, string, Notation?];
    private unconvertedExpChars;
    constructor(digitList?: string[], hyperBase?: DecimalSource, placesAbove1?: number, placesBelow1?: number, commasMin?: DecimalSource, maxnum?: DecimalSource, minnum?: DecimalSource, max_exps_in_a_row?: number, mantissaPower?: DecimalSource, showZeroes?: number, reverseDigits?: boolean, commaSpacing?: number, commaChars?: string[], decimalChar?: string, expChars?: [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]], negExpChars?: null | [[string, string] | boolean, [string, string]], expBefore?: boolean, hyperexpBefore?: boolean, precision?: number, specialDigits?: [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], concatenation?: null | [boolean, string, string, Notation?]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get expChars(): [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]];
    set expChars(input: [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]]);
}
