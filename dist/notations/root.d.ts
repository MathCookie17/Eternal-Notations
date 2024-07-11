import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class RootNotation extends Notation {
    height: Decimal;
    iterations: Decimal;
    max_in_a_row: number;
    rootChars: [[string, string], [string, string], [string, string] | null];
    inverseChars: [[string, string], [string, string], [string, string] | null] | null;
    superexpAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    heightInnerNotation: Notation;
    constructor(height?: DecimalSource, iterations?: DecimalSource, max_Fs_in_a_row?: number, rootChars?: [[string, string], [string, string], [string, string] | null], inverseChars?: [[string, string], [string, string], [string, string] | null] | null, superexpAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, heightInnerNotation?: Notation);
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
export declare class IncreasingRootNotation extends Notation {
    private _maxnum;
    minHeight: Decimal;
    private _engineerings;
    rootChars: [[string, string], [string, string], [string, string] | null];
    inverseChars: [[string, string], [string, string], [string, string] | null] | null;
    heightShown: number;
    innerNotation: Notation;
    heightInnerNotation: Notation;
    constructor(maxnum?: DecimalSource, minHeight?: DecimalSource, engineerings?: DecimalSource | DecimalSource[], rootChars?: [[string, string], [string, string], [string, string] | null], inverseChars?: [[string, string], [string, string], [string, string] | null] | null, heightShown?: number, innerNotation?: Notation, heightInnerNotation?: Notation);
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
export declare class MultiRootNotation extends Notation {
    height: Decimal;
    maxnum: Decimal;
    max_iterations_in_a_row: number;
    minIterations: Decimal;
    maxIterations: Decimal;
    layerBase: Decimal;
    max_layers_in_a_row: number;
    private _iterationEngineerings;
    private _layerEngineerings;
    rootChars: [[string, string], [string, string], [string, string] | null];
    inverseChars: [[string, string], [string, string], [string, string] | null] | null;
    superexpAfter: boolean;
    layerChars: [string, string] | null;
    layerAfter: boolean;
    heightShown: number;
    innerNotation: Notation;
    superexponentInnerNotation: Notation;
    heightInnerNotation: Notation;
    constructor(height?: DecimalSource, maxnum?: DecimalSource, max_iterations_in_a_row?: number, minIterations?: DecimalSource, maxIterations?: DecimalSource, layerBase?: DecimalSource, max_layers_in_a_row?: number, iterationEngineerings?: DecimalSource | DecimalSource[], layerEngineerings?: DecimalSource | DecimalSource[], rootChars?: [[string, string], [string, string], [string, string] | null], inverseChars?: [[string, string], [string, string], [string, string] | null] | null, superexpAfter?: boolean, layerChars?: [string, string] | null, layerAfter?: boolean, heightShown?: number, innerNotation?: Notation, superexponentInnerNotation?: Notation, heightInnerNotation?: Notation);
    name: string;
    formatDecimal(value: Decimal): string;
    get iterationEngineerings(): DecimalSource | DecimalSource[];
    set iterationEngineerings(iterationEngineerings: DecimalSource | DecimalSource[]);
    get layerEngineerings(): DecimalSource | DecimalSource[];
    set layerEngineerings(layerEngineerings: DecimalSource | DecimalSource[]);
}
