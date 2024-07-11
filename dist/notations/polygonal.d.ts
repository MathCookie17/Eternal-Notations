import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class PolygonalNotation extends Notation {
    private _sides;
    polyChars: [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]];
    private _maxnum;
    maxPolys: number;
    private _biPolyBase;
    maxBiPolys: number;
    private _triPolyBase;
    innerNotation: Notation;
    private _minnum;
    recipString: [string, string] | null;
    constructor(sides?: DecimalSource, polyChars?: [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]], maxnum?: DecimalSource, maxPolys?: number, biPolyBase?: DecimalSource, maxBiPolys?: number, triPolyBase?: DecimalSource, innerNotation?: Notation, minnum?: DecimalSource, recipString?: [string, string] | null);
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
