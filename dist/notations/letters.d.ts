import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class LettersNotation extends Notation {
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
    divisionChar: [string, string];
    specialLetters: [[(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][]];
    fixedLetters: [[number, string][], [number, string][], [number, string][]];
    concatenation: [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]];
    constructor(letters?: [string[], string[], string[]], negaLetters?: number | [number, number, number], rounding?: DecimalSource | ((value: Decimal) => Decimal), base?: DecimalSource, max_letters?: number, between?: string, separator?: string, hyperseparator?: string, alwaysHyperseparate?: boolean, innerNotation?: Notation, lettersOrder?: number, reverseLetters?: boolean, mantissaAfter?: boolean, divisionChar?: [string, string], specialLetters?: [[(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][], [(placeValue: number, fromStart?: number, outerValue?: number) => boolean, string[]][]], fixedLetters?: [[number, string][], [number, string][], [number, string][]], concatenation?: [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]]);
    name: string;
    formatDecimal(value: Decimal): string;
    get letters(): [string[], string[], string[]];
    set letters(letters: [string[], string[], string[]]);
    get negaLetters(): number | [number, number, number];
    set negaLetters(negaLetters: number | [number, number, number]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get max_letters(): number;
    set max_letters(max_letters: number);
}
