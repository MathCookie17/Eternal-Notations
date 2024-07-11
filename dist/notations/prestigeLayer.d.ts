import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Writes numbers based on a system of infinite layers of prestige, where each layer requires a certain amount of the previous layer and is gained at some root of the previous layer.
 * For example, if root is 3 and requirement is 1e12, then it takes 1e12 of one layer's currency to get 1 of the next layer's currency, and multiplying the amount of one layer by X multiplies the amount of the next layer by X^(1/3).
 * @param root ( Decimal ! ) Each layer's gain is this root of the previous layer's gain.
 * @param requirement ( Decimal ! ) 1 of layer X + 1 requires this much of layer X.
 * @param recursive ( boolean ) If this is true, then once the layer number is itself larger than the original requirement, it will start being written in this notation itself. After a few layers of nesting, this switches to showing the amount of nestings, i.e. the "hyperlayer", along with the "payload" that's nested that many times. Default is false.
 *
 * WARNING: When recursive is true, this notation is significantly laggy. Maybe don't turn this setting to true if you're using this for an incremental game...
 *
 * @param rampings ( [Decimal, Decimal, Decimal][] ) Each entry of this array consists of three Decimals: the first is the layer where that ramping interval starts, the second is the amount the root is ramping by, and the third is the amount the requirement is ramping by.
 * "Ramping" means that on each layer, the root is multiplied by its ramping amount, and the requirement is raised to the power of its ramping amount. For example, if root is 3, requirement is 1e12, and the first entry of ramping is [4, 3, 2],
 * then on the 4th layer the ramping begins, so on the 5th layer root becomes 9 and requirement becomes 1e24, on the 6th layer root becomes 27 and requirement becomes 1e48, on the 7th layer root becomes 81 and requirement becomes 1e96, and so on.
 * Default is [], which is effectively the same as [[0, 1, 1]], i.e. no ramping occurs.
 * @param layerChars ( [string, string] ) A pair of strings. layerChars[0] is placed before the layer number, layerChars[1] is placed after the layer number. Default is ["[", "] "].
 * @param layerBefore ( boolean ) If this parameter is true, the layer comes before the amount of that layer instead of after. Default is true.
 * @param showLayerZero ( boolean ) If this parameter is false, then if the layer is zero, the number just uses amountInnerNotation and doesn't show the layer at all, but the layer is shown even when it's zero if this parameter is true. Default is true.
 * @param amountInnerNotation ( Notation ) The notation that the amount of the current layer is written with. DefaultNotation is the default.
 * @param layerInnerNotation ( Notation ) The notation that the layer number is written with. DefaultNotation is the default.
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in amountInnerNotation.
 * @param maxNesting ( number ) The maximum amount of nestings of the layer before switching to hyperlayer format. This parameter does nothing if recursive is false. Default is 3.
 * @param recursiveChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used for recursive layers: recursiveChars[0][0] goes before the layer number once said layer number is itself notated in this notation, recursiveChars[0][1] goes after the layer number in that scenario.
 * recursiveChars[1] acts like layerChars, but for the hyperlayer number instead of the layer number, and likewise recursiveChars[2] acts like recursiveChars[0] but for the hyperlayer number.  This parameter does nothing if recursive is false. Default is [["[", "]"], ["{", "} "], ["{", "}"]].
 * @param hyperlayerBefore ( boolean ) If this parameter is true, the hyperlayer comes before the payload instead of after. This parameter does nothing if recursive is false. Default is true.
 * @param hypermantissaPower ( number ) Normally, the payload in hyperlayer format is bounded by 1 and requirement, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are requirement and divisorAtLayer(requirement), if hypermantissaPower is 2 then the bounds are divisorAtLayer(requirement) and divisorAtLayer(divisorAtLayer(requirement)), and so on. For example, with a requirement of 1e12, a number normally represented as "{10} 100" would become "{9} [1] 100" with 1 hypermantissaPower and "{8} [[1] 100]" with 2 hypermantissaPower.
 */
export declare class PrestigeLayerNotation extends Notation {
    private _root;
    private _requirement;
    recursive: boolean;
    private _rampings;
    layerChars: [string, string];
    layerBefore: boolean;
    showLayerZero: boolean;
    amountInnerNotation: Notation;
    layerInnerNotation: Notation;
    recipString: [string, string] | null;
    maxNesting: number;
    recursiveChars: [[string, string], [string, string], [string, string]];
    hyperlayerBefore: boolean;
    hypermantissaPower: number;
    private rampingCheckpoints;
    constructor(root: DecimalSource, requirement: DecimalSource, recursive?: boolean, rampings?: [DecimalSource, DecimalSource, DecimalSource][], layerChars?: [string, string], layerBefore?: boolean, showLayerZero?: boolean, amountInnerNotation?: Notation, layerInnerNotation?: Notation, recipString?: [string, string] | null, maxNesting?: number, recursiveChars?: [[string, string], [string, string], [string, string]], hyperlayerBefore?: boolean, hypermantissaPower?: number);
    name: string;
    private calculateCheckpoints;
    private rootAtLayer;
    private outermostDivisor;
    private divisorAtLayer;
    /**
     * Given a certain amount of the layer 0 currency, returns the layer you'd be on.
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     * @param rounded ( boolean ) Ensures that the given layer is a whole number. Default is true.
     */
    getLayer(value: Decimal, rounded?: boolean): Decimal;
    /**
     * Given a certain amount of the layer 0 currency, returns the layer you'd be on and the amount of currency you'd have on that layer. The function returns an array of the form [currency, layer].
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     */
    layerAndCurrency(value: Decimal): [Decimal, Decimal];
    /**
     * Applies getLayer multiple times.
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     * @param iterations ( number ! ) The amount of times getLayer is applied to the value.
     */
    iteratedLayer(value: Decimal, iterations: number): Decimal;
    /**
     * The Prestige Layer equivalent of slog: how many times can we apply getLayer to value before it gets down to 1?
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     */
    getHyperlayer(value: Decimal): Decimal;
    formatDecimal(value: Decimal): string;
    get root(): DecimalSource;
    set root(root: DecimalSource);
    get requirement(): DecimalSource;
    set requirement(requirement: DecimalSource);
    get rampings(): [DecimalSource, DecimalSource, DecimalSource][];
    set rampings(rampings: [DecimalSource, DecimalSource, DecimalSource][]);
}
