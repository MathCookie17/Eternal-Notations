import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class LetterDigitsNotation extends Notation {
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
    recipString: [string, string];
    specialLetters: [[(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][]];
    fixedLetters: [[number, string][], [number, string][], [number, string][]];
    concatenation: [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]];
    constructor(letters?: [string[], string[], string[]], negaLetters?: number | [number, number, number], max_letters?: number, fraction?: boolean, placesAbove1?: number, placesBelow1?: number, lettersOrder?: number, commasMin?: DecimalSource, commaSpacing?: number, commaChars?: string[], decimalChar?: string, hyperseparator?: string, alwaysHyperseparate?: boolean, reverseLetters?: boolean, minnum?: DecimalSource, recipString?: [string, string], specialLetters?: [[(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][]], fixedLetters?: [[number, string][], [number, string][], [number, string][]], concatenation?: [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]]);
    name: string;
    infinityString: string;
    formatDecimal(value: Decimal): string;
    get letters(): [string[], string[], string[]];
    set letters(letters: [string[], string[], string[]]);
    get negaLetters(): number | [number, number, number];
    set negaLetters(negaLetters: number | [number, number, number]);
    get max_letters(): number;
    set max_letters(max_letters: number);
    get fraction(): boolean;
    set fraction(fraction: boolean);
}
