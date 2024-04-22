import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { toDecimal, scientifify } from "../baseline/utils.js";

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
export class GridNotation extends Notation {
    private _width : number = 8;
    private _height : number = 8;
    private _digits : string[] = ["□", "■"];
    public rowOpenings : [string, string, string] = ["", "   ", "◇"];
    public fullFirstRow : boolean = false;
    public opening : string = "\n";
    public separator : string = "";
    public betweenRows : string = "\n";
    public betweenPlanes : string = "\n\n";
    public minimumSizes : [number, number, number] = [this._width, this._height, 1];
    public backwards : [boolean, boolean, boolean] = [false, false, false];

    constructor(
        width : number = 8,
        height : number = 8,
        digits : string[] = ["□", "■"],
        rowOpenings : [string, string, string] = ["", "   ", "◇"],
        fullFirstRow : boolean = false,
        opening : string = "\n",
        separator : string = "",
        betweenRows : string = "\n",
        betweenPlanes : string = "\n\n",
        minimumSizes : [number, number, number] = [width, height, 1],
        backwards : [boolean, boolean, boolean] = [false, false, false]
    ) {
        super();
        this.width = width;
        this.height = height;
        this.digits = digits;
        this.rowOpenings = rowOpenings;
        this.fullFirstRow = fullFirstRow;
        this.separator = separator;
        this.opening = opening;
        this.betweenRows = betweenRows;
        this.betweenPlanes = betweenPlanes;
        this.minimumSizes = minimumSizes;
        this.backwards = backwards;
    }

    public name = "Grid Notation";

    private nextDigit(value : Decimal) : [Decimal, Decimal] {
        return [value.mod(this._digits.length), value.div(this._digits.length).floor()];
    }

    private nextRow(value : Decimal) : [Decimal, Decimal] {
        if (value.lt(Decimal.pow(this._digits.length, this._width))) return [value, Decimal.dZero];
        let mantissaPower = Decimal.sub(this._width, 1);
        return scientifify(value, this._digits.length, 0, mantissaPower);
    }

    private nextPlane(value : Decimal) : [Decimal, Decimal] {
        let rows = Decimal.dZero;
        if (value.gte(Decimal.pow(10, Number.MAX_SAFE_INTEGER))) {
            rows = value.slog(this._digits.length, 100, true).sub(Decimal.slog(Decimal.pow(10, Number.MAX_SAFE_INTEGER), this._digits.length, true)).plus(1).floor().max(0);
            value = (rows.gte(9e15)) ? Decimal.dOne : value.iteratedlog(this._digits.length, rows.toNumber(), true);
        }
        while (value.gte(Decimal.pow(this._digits.length, this._width))) {
            rows = rows.plus(1);
            value = value.log(this._digits.length).sub(this._width - 1);
        }
        for (let i = 1; i < this._height; i++) {
            rows = rows.sub(1);
            value = value.plus(this._width - 1).pow_base(this._digits.length);
            if (rows.eq(0)) return [value, rows];
        }
        return [value, rows];
    }

    public format(
        value: DecimalSource
      ): string {
  
        let decimal = toDecimal(value);
  
        if (decimal.isNan()) return this.NaNString;
    
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
  
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
    
        return this.formatDecimal(decimal);
      }
  

    public formatDecimal(value: Decimal): string {
        let digitLimit = new Decimal(this._digits.length);
        let rowLimit = digitLimit.pow(this._width);
        let planeLimit = rowLimit;
        for (let i = 1; i < this._height; i++) planeLimit = digitLimit.pow(planeLimit.plus(this._width));
        let negative = false;
        let negExp = false;
        if (value.lt(0)) {
            negative = true;
            value = value.neg();
        }
        if (value.lt(1) && value.neq(0)) {
            negExp = true;
            let mantissaPower = Decimal.sub(this._width, 1);
            let scitifs = scientifify(value, digitLimit, 0, mantissaPower);
            if (this.fullFirstRow) scitifs[1] = scitifs[1].plus(this._width - 1);
            value = digitLimit.pow(scitifs[1].abs()).mul(scitifs[0]);
        }
        else if (this.fullFirstRow) value = value.mul(rowLimit.div(digitLimit));
        let grid : Decimal[][][] = [[[value]]];
        while (grid[grid.length - 1][0][0].gte(planeLimit)) {
            let pair = this.nextPlane(grid[grid.length - 1][0][0]);
            grid[grid.length - 1][0][0] = pair[0];
            grid.push([[pair[1]]]);
        }
        while (grid.length < this.minimumSizes[2]) grid.push([[Decimal.dZero]]);
        for (let p = 0; p < grid.length; p++) {
            let plane = grid[p];
            while (plane[plane.length - 1][0].gte(rowLimit)) {
                let pair = this.nextRow(plane[plane.length - 1][0]);
                plane[plane.length - 1][0] = pair[0];
                plane.push([pair[1]]);
            }
            while (plane.length < this.minimumSizes[1]) plane.push([Decimal.dZero]);
            for (let r = 0; r < plane.length; r++) {
                let row = plane[r];
                while (row[row.length - 1].gte(digitLimit)) {
                    let pair = this.nextDigit(row[row.length - 1]);
                    row[row.length - 1] = pair[0];
                    row.push(pair[1]);
                }
                while (row.length < this.minimumSizes[0]) row.push(Decimal.dZero);
            }
        }
        let result = this.opening;
        let gridStart = (this.backwards[2]) ? grid.length - 1 : 0;
        let gridIncrement = (this.backwards[2]) ? -1 : 1;
        for (let p = gridStart; p < grid.length && p >= 0; p += gridIncrement) {
            let plane = grid[p];
            let planeStart = (this.backwards[1]) ? plane.length - 1 : 0;
            let planeIncrement = (this.backwards[1]) ? -1 : 1;
            for (let r = planeStart; r < plane.length && r >= 0; r += planeIncrement) {
                let row = plane[r];
                if (!negative && !negExp) result += this.rowOpenings[0];
                else {
                    if (p == 0 && ((r == 0 && negative) || (r == 1 && negExp))) result += this.rowOpenings[2];
                    else result += this.rowOpenings[1];
                }
                let rowStart = (this.backwards[0]) ? row.length - 1 : 0;
                let rowIncrement = (this.backwards[0]) ? -1 : 1;
                for (let d = rowStart; d < row.length && d >= 0; d += rowIncrement) {
                    let digit = row[d];
                    result += this._digits[digit.floor().toNumber()];
                    if (d < row.length - 1) result += this.separator;
                }
                if (r < plane.length - 1) result += this.betweenRows;
            }
            if (p < grid.length - 1) result += this.betweenPlanes;
        }
        return result;
    }

    public get width() {
        return this._width;
    }

    public set width(width : number) {
        if (width <= 0) throw new RangeError("Nonpositive width in Grid Notation");
        if (width % 1 != 0) throw new RangeError("Non-whole width in Grid Notation");
        this._width = width;
    }

    public get height() {
        return this._height;
    }

    public set height(height : number) {
        if (height <= 0) throw new RangeError("Nonpositive height in Grid Notation");
        if (height % 1 != 0) throw new RangeError("Non-whole height in Grid Notation");
        this._height = height;
    }

    public get digits() {
        return this._digits;
    }

    public set digits(digits : string[]) {
        if (digits.length < 2) throw new RangeError("Not enough digits for Grid Notation (at least two digits are needed)");
        this._digits = digits;
    }
}