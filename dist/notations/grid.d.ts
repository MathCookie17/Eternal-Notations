import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class GridNotation extends Notation {
    private _width;
    private _height;
    private _digits;
    rowOpenings: [string, string, string];
    fullFirstRow: boolean;
    opening: string;
    separator: string;
    betweenRows: string;
    betweenPlanes: string;
    minimumSizes: [number, number, number];
    backwards: [boolean, boolean, boolean];
    constructor(width?: number, height?: number, digits?: string[], rowOpenings?: [string, string, string], fullFirstRow?: boolean, opening?: string, separator?: string, betweenRows?: string, betweenPlanes?: string, minimumSizes?: [number, number, number], backwards?: [boolean, boolean, boolean]);
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
