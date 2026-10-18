import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal } from "../baseline/utils.js";

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
export class PrestigeLayerNotation extends Notation {
    private _root : Decimal;
    private _requirement : Decimal;
    public recursive : boolean = false;
    private _rampings : [Decimal, Decimal, Decimal][] = [];
    public layerChars : [string, string] = ["[", "] "];
    public layerBefore : boolean = true;
    public showLayerZero : boolean = true;
    public amountInnerNotation : Notation = new DefaultNotation();
    public layerInnerNotation : Notation = new DefaultNotation();
    public recipString : [string, string] | null = null;
    public maxNesting : number = 3;
    public recursiveChars : [[string, string], [string, string], [string, string]] = [["[", "]"], ["{", "} "], ["{", "}"]];
    public hyperlayerBefore : boolean = true;
    public hypermantissaPower : number = 0;

    private rampingCheckpoints ! : [Decimal, Decimal, Decimal, Decimal, Decimal][];

    constructor(
        root : DecimalSource,
        requirement : DecimalSource,
        recursive : boolean = false,
        rampings : [DecimalSource, DecimalSource, DecimalSource][] = [],
        layerChars : [string, string] = ["[", "] "],
        layerBefore : boolean = true,
        showLayerZero : boolean = true,
        amountInnerNotation : Notation = new DefaultNotation(),
        layerInnerNotation : Notation = new DefaultNotation(),
        recipString : [string, string] | null = null,
        maxNesting : number = 3,
        recursiveChars : [[string, string], [string, string], [string, string]] = [["[", "]"], ["{", "} "], ["{", "}"]],
        hyperlayerBefore : boolean = true,
        hypermantissaPower : number = 0
    ) {
        super();
        this._root = toDecimal(root);
        this._requirement = toDecimal(requirement);
        let rampingsD : [Decimal, Decimal, Decimal][] = []
        for (let r = 0; r < rampings.length; r++) {
            rampingsD.push([toDecimal(rampings[r][0]), toDecimal(rampings[r][1]), toDecimal(rampings[r][2])])
        }
        this._rampings = rampingsD.sort((value, other) => Decimal.cmp(value[0], other[0]));
        for (let r = 0; r < this._rampings.length - 1; r++) {
            if (this._rampings[r][0].eq(this._rampings[r + 1][0])) this._rampings.splice(r, 1);
        }
        if (this._rampings.length == 0 || this._rampings[0][0].neq(0)) this._rampings.unshift([Decimal.dZero, Decimal.dOne, Decimal.dOne]);
        this.calculateCheckpoints(this._root, this._requirement, this._rampings);
        this.layerChars = layerChars;
        this.layerBefore = layerBefore;
        this.showLayerZero = showLayerZero;
        this.amountInnerNotation = amountInnerNotation;
        this.layerInnerNotation = layerInnerNotation;
        this.recipString = recipString;
        this.recursive = recursive;
        this.maxNesting = maxNesting;
        this.recursiveChars = recursiveChars;
        this.hyperlayerBefore = hyperlayerBefore;
        this.hypermantissaPower = hypermantissaPower;
    }

    public name = "Prestige Layer Notation";

    private calculateCheckpoints(root : Decimal, requirement : Decimal, rampings : [Decimal, Decimal, Decimal][]) {
        let checkpoints : [Decimal, Decimal, Decimal, Decimal, Decimal][] = [[Decimal.dZero, root, requirement, Decimal.dOne, Decimal.dOne]];
        let currentRoot = Decimal.dOne;
        let previousRoot = Decimal.dOne;
        let rampingIndex = 0;
        let singleDivisor = requirement;
        let currentRootRamping = rampings[rampingIndex][1];
        let currentDivisorRamping = rampings[rampingIndex][2];
        let prevLayer = Decimal.dZero;
        let singleRoot = root;
        let rampingDistance = Decimal.dZero;
        if (singleRoot.lt(1)) throw new Error("The root goes below 1 at some point in Prestige Layer Notation, which is not allowed because it can lead to supertask behavior");
        if (singleRoot.eq(1) && this.recursive) throw new Error("The recursive form of this notation does not currently support cases where the root is ever equal to 1. Sorry!");
        if (singleDivisor.lte(1)) throw new Error("The divisor must stay above 1 at all times in Prestige Layer Notation, because otherwise it can lead to higher layers coming at the same time as or even before lower ones");
        while (rampingIndex < rampings.length - 1) {
            rampingDistance = rampings[rampingIndex + 1][0].sub(prevLayer);
            previousRoot = currentRoot.mul(singleRoot.pow(rampingDistance.sub(1))).mul(currentRootRamping.pow(rampingDistance.mul(rampingDistance.sub(1)).div(2)));
            currentRoot = currentRoot.mul(singleRoot.pow(rampingDistance)).mul(currentRootRamping.pow(rampingDistance.plus(1).mul(rampingDistance).div(2)));
            singleDivisor = singleDivisor.pow(currentDivisorRamping.pow(rampingDistance));
            singleRoot = singleRoot.mul(currentRootRamping.pow(rampingDistance));
            rampingIndex++;
            if (singleRoot.lt(1)) throw new Error("The root goes below 1 at some point in Prestige Layer Notation, which is not allowed because it can lead to supertask behavior");
            if (singleRoot.eq(1) && this.recursive) throw new Error("The recursive form of this notation does not currently support cases where the root is ever equal to 1. Sorry!");
            if (singleDivisor.lte(1)) throw new Error("The divisor must stay above 1 at all times in Prestige Layer Notation, because otherwise it can lead to higher layers coming at the same time as or even before lower ones");
            checkpoints.push([rampings[rampingIndex][0], singleRoot, singleDivisor, currentRoot, singleDivisor.pow(previousRoot)])
            currentRootRamping = rampings[rampingIndex][1];
            currentDivisorRamping = rampings[rampingIndex][2];
            prevLayer = rampings[rampingIndex][0];
        }
        this.rampingCheckpoints = checkpoints;
    }

    private rootAtLayer(layer : DecimalSource) : Decimal {
        layer = toDecimal(layer);
        if (layer.eq(0)) return Decimal.dOne;
        let root = Decimal.dOne;
        let rampingIndex = 0;
        let currentRamping = this._rampings[rampingIndex][1];
        let prevLayer = Decimal.dZero;
        let singleRoot = this._root;
        let rampingDistance = Decimal.dZero;
        while (rampingIndex < this.rampingCheckpoints.length - 1 && this.rampingCheckpoints[rampingIndex + 1][0].lte(layer)) rampingIndex++; 
        prevLayer = this.rampingCheckpoints[rampingIndex][0];
        singleRoot = this.rampingCheckpoints[rampingIndex][1];
        root = this.rampingCheckpoints[rampingIndex][3];
        currentRamping = this._rampings[rampingIndex][1];
        rampingDistance = layer.sub(prevLayer);
        root = root.mul(singleRoot.pow(rampingDistance)).mul(currentRamping.pow(rampingDistance.plus(1).mul(rampingDistance).div(2)));
        return root;
    }

    private outermostDivisor(layer : DecimalSource) : Decimal {
        layer = toDecimal(layer);
        if (layer.eq(0)) return Decimal.dOne;
        let divisor = this._requirement;
        let rampingIndex = 0;
        let currentRamping = this._rampings[rampingIndex][2];
        let prevLayer = Decimal.dZero;
        let rampingDistance = Decimal.dZero;
        while (rampingIndex < this.rampingCheckpoints.length - 1 && this.rampingCheckpoints[rampingIndex + 1][0].lte(layer)) rampingIndex++;
        prevLayer = this.rampingCheckpoints[rampingIndex][0];
        divisor = this.rampingCheckpoints[rampingIndex][2];
        currentRamping = this._rampings[rampingIndex][2];
        rampingDistance = layer.sub(prevLayer);
        divisor = divisor.pow(currentRamping.pow(rampingDistance));
        return divisor.pow(this.rootAtLayer(layer.sub(1)));
    }

    private divisorAtLayer(layer : DecimalSource) : Decimal {
        let currentLayer = toDecimal(layer);
        let divisor = Decimal.dOne;
        let oldDivisor = Decimal.dZero;
        while (oldDivisor.neq(divisor) && currentLayer.gt(0)) {
            oldDivisor = divisor;
            divisor = divisor.mul(this.outermostDivisor(currentLayer));
            currentLayer = currentLayer.sub(1);
        }
        return divisor;
    }

    /**
     * Given a certain amount of the layer 0 currency, returns the layer you'd be on.
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     * @param rounded ( boolean ) Ensures that the given layer is a whole number. Default is true.
     */
    public getLayer(value : Decimal, rounded : boolean = true) : Decimal {
        let layer = Decimal.dZero;
        if (value.lt(this.divisorAtLayer(10))) {
            let layerNum = 0;
            let step_size = 0.001;
            let has_changed_directions_once = false;
            let previously_rose = false;
            for (var i = 1; i < 10000; ++i)
            {
                let currently_rose = value.gt(this.divisorAtLayer(layerNum));
                if (i > 1)
                {
                    if (previously_rose != currently_rose)
                    {
                    has_changed_directions_once = true;
                    }
                }
                previously_rose = currently_rose;
                if (has_changed_directions_once)
                {
                    step_size /= 2;
                }
                else
                {
                    step_size *= 2;
                }
                step_size = Math.abs(step_size) * (currently_rose ? 1 : -1);
                layerNum += step_size;
                if (step_size === 0 || i == 9999) { 
                    layer = new Decimal(layerNum);
                    break; 
                }
            }
        }
        else {
            let layerSlog = 1;
            let step_size = 0.001;
            let has_changed_directions_once = false;
            let previously_rose = false;
            for (var i = 1; i < 10000; ++i)
            {
                layer = Decimal.tetrate(10, layerSlog, 1, true);
                let currently_rose = value.gt(this.divisorAtLayer(layer));
                if (i > 1)
                {
                    if (previously_rose != currently_rose)
                    {
                    has_changed_directions_once = true;
                    }
                }
                previously_rose = currently_rose;
                if (has_changed_directions_once)
                {
                    step_size /= 2;
                }
                else
                {
                    step_size *= 2;
                }
                step_size = Math.abs(step_size) * (currently_rose ? 1 : -1);
                layerSlog += step_size;
                if (layerSlog == Infinity) layerSlog = Number.MAX_VALUE;
                if (step_size === 0) { break; }
            }
        }
        if (layer.lte("1e-320")) return new Decimal(0);
        if (rounded) {
            layer = layer.round();
            if (layer.neq(layer.plus(1))) {
                while (value.gte(this.divisorAtLayer(layer.plus(1)))) layer = layer.plus(1);
                while (value.lt(this.divisorAtLayer(layer))) layer = layer.sub(1);
            }
        }
        return layer;
    }

    /**
     * Given a certain amount of the layer 0 currency, returns the layer you'd be on and the amount of currency you'd have on that layer. The function returns an array of the form [currency, layer].
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     */
    public layerAndCurrency(value : Decimal) : [Decimal, Decimal] {
        let layer = this.getLayer(value);
        let currency = value.div(this.divisorAtLayer(layer)).root(this.rootAtLayer(layer));
        if (layer.eq(layer.plus(1))) currency = Decimal.dOne;
        return [currency, layer];
    }

    /**
     * Applies getLayer multiple times.
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     * @param iterations ( number ! ) The amount of times getLayer is applied to the value.
     */
    public iteratedLayer(value : Decimal, iterations : number) : Decimal {
        if (iterations == 0) return value;
        let safeIterationPoint = new Decimal("F10"); //The point at which we can ignore all the root and divisor stuff and just use slog to get down below it
        while (this.getLayer(safeIterationPoint).neq(Decimal.iteratedlog(safeIterationPoint, 10, 2))) safeIterationPoint = this.divisorAtLayer(safeIterationPoint);
        let iterationsSoFar = 0;
        let safeIterations = 0;
        while (value.gte(safeIterationPoint) && iterationsSoFar < iterations) {
            safeIterations = Decimal.slog(value, 10, true).sub(Decimal.slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().min(iterations).toNumber();
            iterationsSoFar += safeIterations;
            value = value.iteratedlog(10, Decimal.slog(value, 10, true).sub(Decimal.slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().min(iterations).mul(2).toNumber(), true);
        }
        while (iterationsSoFar < iterations) {
            value = this.getLayer(value);
            iterationsSoFar++;
        }
        return value;
    }

    /**
     * The Prestige Layer equivalent of slog: how many times can we apply getLayer to value before it gets down to 1?
     * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
     */
    public getHyperlayer(value : Decimal) : Decimal {
        let safeIterationPoint = new Decimal("F10"); //The point at which we can ignore all the root and divisor stuff and just use slog to get down below it
        while (this.getLayer(safeIterationPoint).neq(Decimal.iteratedlog(safeIterationPoint, 10, 2))) safeIterationPoint = this.divisorAtLayer(safeIterationPoint);
        let result = Decimal.dNegOne;
        let safeIterations = 0;
        while (value.gte(safeIterationPoint)) {
            safeIterations = Decimal.slog(value, 10, true).sub(Decimal.slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().toNumber();
            result = result.plus(safeIterations);
            value = value.iteratedlog(10, Decimal.slog(value, 10, true).sub(Decimal.slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().mul(2).toNumber(), true);
        }
        while (value.gte(1)) {
            result = result.plus(1);
            value = this.getLayer(value);
        }
        result = result.plus(value);
        return result;
    }

    public formatDecimal(value: Decimal): string {
        if (value.eq(0)) return this.amountInnerNotation.format(0);
        if (value.lt(1)) {
            let rString = ["", ""];
            if (this.recipString === null) rString = [this.amountInnerNotation.format(1) + " / ", ""];
            else rString = this.recipString;
            return rString[0] + this.format(value.recip()) + rString[1];
        }
        let rawHyperlayer = Decimal.dZero;
        let hyperlayer = 0;
        if (this.recursive) {
            rawHyperlayer = this.getHyperlayer(value);
            hyperlayer = rawHyperlayer.sub(1).floor().max(0).toNumber();
        }
        let result = "";
        if (hyperlayer <= this.maxNesting) {
            let [currency, layer] = this.layerAndCurrency(this.iteratedLayer(value, hyperlayer));
            if (!this.showLayerZero && layer.eq(0)) result = this.amountInnerNotation.format(value);
            else {
                let currencyStr = this.amountInnerNotation.format(currency);
                let layerStr = this.layerChars[0] + this.layerInnerNotation.format(layer) + this.layerChars[1];
                if (this.layerBefore) result = layerStr + currencyStr;
                else result = currencyStr + layerStr;
            }
            for (let h = 0; h < hyperlayer; h++) result = this.recursiveChars[0][0] + result + this.recursiveChars[0][1];
        }
        else if (hyperlayer < this.divisorAtLayer(1).toNumber()) {
            let currencyStr = this.format(this.iteratedLayer(value, hyperlayer - this.hypermantissaPower));
            let layerStr = this.recursiveChars[1][0] + this.layerInnerNotation.format(hyperlayer - this.hypermantissaPower) + this.recursiveChars[1][1];
            if (this.hyperlayerBefore) result = layerStr + currencyStr;
            else result = currencyStr + layerStr;
        }
        else {
            result = this.recursiveChars[2][0] + this.format(hyperlayer) + this.recursiveChars[2][1];
        }
        return result;
    }

    public get root() {
        return this._root;
    }

    public set root(root : DecimalSource) {
        let rootD = toDecimal(root);
        this.calculateCheckpoints(rootD, this._requirement, this._rampings);
        this._root = rootD;
    }

    public get requirement() {
        return this._requirement;
    }

    public set requirement(requirement : DecimalSource) {
        let requirementD = toDecimal(requirement);
        this.calculateCheckpoints(this._root, requirementD, this._rampings);
        this._requirement = requirementD;
    }

    public get rampings() {
        return this._rampings;
    }

    public set rampings(rampings : [DecimalSource, DecimalSource, DecimalSource][]) {
        let rampingsD : [Decimal, Decimal, Decimal][] = []
        for (let r = 0; r < rampings.length; r++) {
            rampingsD.push([toDecimal(rampings[r][0]), toDecimal(rampings[r][1]), toDecimal(rampings[r][2])])
        }
        rampingsD = rampingsD.sort((value, other) => Decimal.cmp(value[0], other[0]));
        for (let r = 0; r < rampingsD.length - 1; r++) {
            if (rampingsD[r][0].eq(rampingsD[r + 1][0])) rampingsD.splice(r, 1);
        }
        if (rampingsD.length == 0 || rampingsD[0][0].neq(0)) rampingsD.unshift([Decimal.dZero, Decimal.dOne, Decimal.dOne]);
        this.calculateCheckpoints(this._root, this._requirement, rampingsD);
        this._rampings = rampingsD;
    }
}