import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, polygon, polygonRoot, biPolygon, biPolygonRoot, triPolygon, triPolygonRoot } from "../baseline/utils.js";

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
export class PolygonalNotation extends Notation {
    private _sides : Decimal = new Decimal(3);
    public polyChars : [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]] = 
    [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]];
    private _maxnum : Decimal = new Decimal(26796);
    public maxPolys : number = 5;
    private _biPolyBase : Decimal = Decimal.dTwo;
    public maxBiPolys : number = this.maxPolys;
    private _triPolyBase : Decimal = this._biPolyBase;
    public innerNotation : Notation = new DefaultNotation();
    private _minnum : Decimal = polygon(0.1, this._sides);
    public recipString : [string, string] | null = null;

    constructor(
        sides : DecimalSource = 3,
        polyChars : [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]] = 
            [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]],
        maxnum : DecimalSource = 26796,
        maxPolys : number = 5,
        biPolyBase : DecimalSource = 2,
        maxBiPolys : number = maxPolys,
        triPolyBase : DecimalSource = biPolyBase,
        innerNotation : Notation = new DefaultNotation(),
        minnum : DecimalSource = polygon(0.1, sides),
        recipString : [string, string] | null = null
    ){
        super();
        this.sides = sides;
        this.maxnum = maxnum;
        this.maxPolys = maxPolys;
        this.biPolyBase = biPolyBase;
        this.maxBiPolys = maxBiPolys;
        this.triPolyBase = triPolyBase;
        this.polyChars = polyChars;
        this.innerNotation = innerNotation;
        this.minnum = minnum;
        this.recipString = recipString
    }

    public name = "Polygonal Notation";

    public formatDecimal(value: Decimal): string {
        if (value.lt(this._minnum)) {
            if (value.eq(0)) return this.innerNotation.format(0);
            let recipStr = ["", ""]
            if (this.recipString === null) recipStr = [this.innerNotation.format(1) + " / ", ""];
            else recipStr = this.recipString;
            return recipStr[0] + this.format(value.recip()) + recipStr[1];
        }
        else if (value.lt(polygon(this._maxnum, this._sides))) return this.polyChars[0][0] + this.innerNotation.format(polygonRoot(value, this._sides)) + this.polyChars[0][1];
        else if (value.lt(biPolygon(this.maxPolys, this._sides, this._maxnum))) return this.polyChars[1][0] + this.format(polygonRoot(value, this._sides)) + this.polyChars[1][1];
        else if (value.lt(biPolygon(this._maxnum, this._sides, this._biPolyBase))) return this.polyChars[2][0] + this.innerNotation.format(biPolygonRoot(value, this._sides, this._biPolyBase)) + this.polyChars[2][1];
        else if (value.lt(triPolygon(this.maxBiPolys, this._sides, this._biPolyBase, this._maxnum))) return this.polyChars[3][0] + this.format(biPolygonRoot(value, this._sides, this._biPolyBase)) + this.polyChars[3][1];
        else if (value.lt(triPolygon(this._maxnum.toNumber(), this._sides, this._biPolyBase, this._triPolyBase))) return this.polyChars[4][0] + this.innerNotation.format(triPolygonRoot(value, this._sides, this._biPolyBase, this._triPolyBase)) + this.polyChars[4][1];
        else return this.polyChars[5][0] + this.format(triPolygonRoot(value, this._sides, this._biPolyBase, this._triPolyBase)) + this.polyChars[5][1];
    }

    public get sides() {
        return this._sides;
    }

    public set sides(sides : DecimalSource) {
        let sidesD = toDecimal(sides);
        if (sidesD.lte(2)) throw new RangeError("Sides <= 2 in Polygonal Notation");
        this._sides = sidesD;
    }

    public get maxnum() {
        return this._maxnum;
    }

    public set maxnum(maxnum: DecimalSource) {
        let maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(1)) throw new RangeError("Maxnum <= 1 in Polygonal Notation");
        this._maxnum = maxnumD;
    }

    public get biPolyBase() {
        return this._biPolyBase;
    }

    public set biPolyBase(biPolyBase : DecimalSource) {
        let biPolyBaseD = toDecimal(biPolyBase);
        if (biPolyBaseD.lte(1)) throw new RangeError("biPolyBase <= 1 in Polygonal Notation");
        this._biPolyBase = biPolyBaseD;
    }

    public get triPolyBase() {
        return this._triPolyBase;
    }

    public set triPolyBase(triPolyBase : DecimalSource) {
        let triPolyBaseD = toDecimal(triPolyBase);
        if (triPolyBaseD.lte(1)) throw new RangeError("triPolyBase <= 1 in Polygonal Notation");
        this._triPolyBase = triPolyBaseD;
    }

    public get minnum() {
        return this._minnum;
    }

    public set minnum(minnum: DecimalSource) {
        let minnumD = toDecimal(minnum);
        if (minnumD.gte(1)) throw new RangeError("Minnum >= 1 in Polygonal Notation");
        this._minnum = minnumD;
    }
}