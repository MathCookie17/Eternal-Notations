import Decimal from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class PsiDashNotation extends Notation {
    private _maxEntries;
    private _maxPrecision;
    private _base;
    dashString: string;
    letters: [string, string, string, string];
    recipString: [string, string] | null;
    constructor(maxEntries?: number | number[], maxPrecision?: number, base?: number | string[], dashString?: string, letters?: [string, string, string, string], recipString?: [string, string] | null);
    name: string;
    formatDecimal(value: Decimal): string;
    get base(): number | string[];
    set base(base: number | string[]);
    get maxEntries(): number | number[];
    set maxEntries(maxEntries: number | number[]);
    get maxPrecision(): number;
    set maxPrecision(maxPrecision: number);
}
