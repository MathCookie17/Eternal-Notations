import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, round, hypersplit } from "../baseline/utils.js";

    /**
     * Writes numbers using increasingly powerful operators: first addition, then multiplication, then exponentiation with a fixed top (i.e. root-style exponentiation),
     * then exponentiation with a fixed bottom (logarithm-style), then tetration with a fixed top (super-root), then tetration with a fixed bottom (super-logarithm).
     * Once too many of one operator is used but before it gets high enough to switch to the next, it starts showing how many times that operator is applied.
     * Smaller numbers with the operators applied to them are themselves written in this notation, allowing for nesting parameters.
     * @param bases ( Decimal | Decimal[] ) bases[0] is the number being added to for addition, bases[1] is the number being multiplied by for multiplication, bases[2] is the height of the exponentiation for roots, bases[3] is the base of the exponentiation for exponentiation, bases[4] is the height of the tetration for super-roots, and bases[5] is the base of the tetration for tetration. If less than 6 entries are provided, then the remaining entries are filled in with defaults: addition's default is 10, multiplication matches addition by default, root gets 2 by default, exponentiation matches multiplication by default, super-root matches root by default, and tetration matches exponentiation by default. If a single Decimal is provided instead of an array, that Decimal is taken as addition's base and the rest are filled in with defaults. The default value of this parameter is 10.
     * @param maximums ( Decimal[] ) An array of Decimals: each one is a forced maximum for one operator, such that if the number being formatted is equal to or above that maximum, it's forced to the next operator. maximums[0] is the default plain number (i.e. the maximum number that doesn't get any operators at all), maximums[1] is for addition, maximums[2] is for multiplication, maximums[3] is for roots, maximums[4] is for exponentiation, and maximums[5] is for super-roots (tetration doesn't get a maximum because there's no operator after it). If less than 6 entries are provided, the remaining ones are set to Infinity (there are other ways for an operator to max out, so this is fine). If the array is empty, then maximums[0] (this one shouldn't be infinite, as if it was the operators wouldn't be used at all) is set to bases[0]. The default value for this parameter has maximums[0] be 10 and the rest of the maximums be Infinity.
     * @param operatorChars ( [[string, string], [string, string], [string, string], [string, string]][] ) An array of arrays of four pairs of strings (the outermost array's length is not fixed like the inner arrays' lengths are). In each of these inner arrays, each pair of strings determines what goes around a number to represent an operator. For example:
     * operatorChars[0][0] is the pair of strings used for the innermost addition for the addition operator, with operatorChars[0][0][0] going before the number being added to and operatorChars[0][0][1] going afterwards. operatorChars[0][1] is also for addition, but for additions after the first one (in case you want to add parentheses around inner ones but not the outermost one, for example). operatorChars[0][2] and [0][3] are for once nesting addition begins, with [0][2] going around the number being added to and [0][3] going around the amount of addition operators applied. operatorChars[1] does all the same things as operatorChars[0] but for multiplication instead of addition, operatorChars[2] is for root, operatorChars[3] is for exponentiation, operatorChars[4] is for super-root, and operatorChars[5] is for tetration.
     * Default is [
        
        [["10 + ", ""], ["10 + ", ""], [" + ", ""], ["10 * ", ""]],
            
        [["10 * ", ""], ["10 * ", ""], [" * ", ""], ["10^", ""]],
            
        [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
            
        [["10^", ""], ["10^", ""], [" ", ""], ["(10^)^", ""]],
            
        [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
            
        [["10^^", ""], ["10^^", ""], [" ", ""], ["(10^^)^", ""]]

     ]
     
     * @param thresholds ( [Decimal, Decimal | boolean, number, Decimal, number][] ) Again, each entry in the outer array corresponds to one of the six operators.
        In the inner arrays, thresholds[n][0] is the value at which the number being added to/multiplied by/raised to a power/etc., the "argument", switches from being written in plainInnerNotation to being written within the Increasing Operator notation itself, and thresholds[n][3] is that notation switch threshold for the amount of times the operator is applied once the nesting form begins.
        thresholds[n][1] is a forced maximum on the argument, i.e. if the argument is not less than this value then another instance of the operator is applied to get it back below the threshold. thresholds[n][2] is the highest amount of times an operator can be applied before it switches to nesting form,
        and thresholds[n][4] is the highest amount of "nestings" (i.e. where the amount of times the operator is applied is itself written in this notation with this operator being applied) before forcefully switching to the next operator.
        thresholds[n][1] can be a boolean instead of a Decimal: if it's false then it's set to the maximum argument of the PREVIOUS operator, and if it's true then it's set to the maximum value before nesting form begins of the previous operator (thresholds[0][1] has no previous operator to refer to, so if it's a boolean then it's set to maximums[0]).
        Default is an array containing six entries that are all [10, true, 4, 10, 2].
     * @param rootBehavior ( null | [boolean, Decimal, Decimal | boolean] ) If this is null (which is the default), then roots behave like the other operators, applying multiple times then switching to nesting form. However, if this is not null, then roots aren't applied multiple times: instead, the degree of the root increases for larger numbers.
        rootBehavior[1] is how much the root degree changes by each time it increases; this value is added to the degree is rootBehavior[0] is false, but it multiplies the degree if rootBehavior[0] is true. rootBehavior[2] is the maximum height of the root before nesting in the height; thresholds[2][2] is ignored if rootBehavior is not null, but thresholds[2][4] still applies.
        rootBehavior[2] can be a boolean, which follows the same rules as thresholds[2][1] does as a boolean.
     * @param superRootBehavior ( null | [boolean, Decimal, Decimal | boolean] ) Same as rootBehavior, but for super-roots instead. Default is null.
     * @param roundings ( [DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal)][] ) For a given operator, if rounding[n][0] is not 0, then the argument is rounded to the nearest multiple of that value if we're not in nesting form yet. If roundings[n][0] is a function, then the argument is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of.
     * roundings[n][1] and roundings[n][2] are similar, but [n][1] is for the argument in nesting form and [n][2] is for the amount of times the operator is applied in nesting form. Default is an array consisting of six [0, 0, 0]s, i.e. no rounding occurs.
     * @param preAdditionFormats ( [Decimal, string, string, string, string, (value : Decimal) => boolean, Notation][] ) Well, that's certainly a confusing type for this parameter, isn't it? Let me explain.
     * This parameter is used to format numbers before the operator begins, for the sake of notations like Omega and Fours. When one of these formats is applied, the number is subtracted by a certain amount and displayed surrounded by some strings corresponding to that amount.
     * Here's what each entry does:
     * preAdditionFormats[n][0] is the value that that format begins being used at, which is also the amount the number is subtracted by.
     * preAdditionFormats[n][1] and [n][2] go before and after the number respectively. preAdditionFormats[n][3] and [n][4] also go before and after the number respectively, on the inside of the gap between [n][1] and [n][2]. (in other words, the writing goes [n][1], [n][3], number, [n][4], [n][2]).
     * The reason [n][3] and [n][4] exist is because of [n][5], a Decimal => boolean function. If this function returns true, then the number is shown, but if it returns false, the number isn't shown. [n][3] and [n][4] are only shown if the number is shown, but [n][1] and [n][2] are shown even if the number isn't.
     * Finally, [n][6] is the notation that the number is formatted in within this expression.
     * All of this means nothing by default, though, since the default for preAdditionFormats is [], i.e. there are no preAdditionFormats by default.
     * @param nestingBefore ( boolean[] ) For each entry of this array (each entry corresponds to one of the six operators), if that entry is true, then when that operator switches to nesting form, the amount of times the operator is applied is written before the argument instead of after. Default is [true, true, false, true, false, true]. If less than six entries are provided, the remaining ones are set to their default values.
     * @param parenthesize ( [[string, string, boolean], [string, string, boolean], [string, string, boolean]][] ) Each entry in the outer array corresponds to one of the six operators, so let's focus on what's inside each entry.
     * Each entry consists of three [string, string, boolean] arrays, used to add parentheses to the argument and application number of an operator.
     * parenthesize[n][0][0] goes before the argument, parenthesize[n][0][1] goes afterwards, and parenthesize[n][0][2] determines when the parentheses start showing up:
     * if it's false then the parentheses only appear once the argument starts being written with Increasing Operator notation itself, but if it's true then the parentheses are always there (If you don't want the parentheses at all, just set the two strings to empty strings).
     * parenthesize[n][0] is for the argument before nesting form activates, parenthesize[n][1] is for the argument in nesting form, and parenthesize[n][2] is for the amount of times the operator is applied in nesting form.
     * @param argumentShown ( [(value : Decimal) => boolean, (value : Decimal) => boolean, [string, string]?, [string, string]?][] ) This parameter allows you to set times when the argument is not shown. As usual, each entry of the outer array corresponds to one of the six operators.
     * In each inner array, argumentShown[n][0] and [n][1] are Decimal -> boolean functions; the argument is only shown if that function returns true. [n][0] is for before nesting form, [n][1] is for during nesting form.
     * If the argument is not shown before nesting form, then argumentShown[n][2] and [n][3] replace operatorChars[n][0] and [n][1] respectively (for nesting form, the part with the argument is simply omitted, meaning operatorChars[n][2] is not used but [n][3] is).
     * @param plainInnerNotation ( Notation ) The notation that regular numbers, i.e. numbers below maximums[0], are written in. DefaultNotation is the default.
     * @param innerNotations ( Notation | [Notation, Notation, Notation][] ) Each entry in the outer array corresponds to one of the six operators.
     * innerNotations[n][0] is the notation that the argument for that operator is written in before switching to nesting form, innerNotations[n][1] is the notation the argument is written in in nesting form, and innerNotations[n][2] is the notation the operator number is written in in nesting form. These notations only apply before the argument and operator number's notational thresholds are reached.
     * You can also just input a single notation here and it will be used everywhere. (I wanted to also allow inputting a single [Notation, Notation, Notation], but it seems TypeScript has no way of safely distinguishing arrays from arrays of arrays...), which is what's done by default:
     * the default value of this parameter is DefaultNotation.
     * @param minnum ( Decimal ) Values smaller than this are written in terms of their reciprocal. The default is the reciprocal of maximums[0].
     * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / (", ")"], where that 1 is however 1 is written in plainInnerNotation.
     */
export class IncreasingOperatorNotation extends Notation {
    private _bases : Decimal[];
    private _maximums : Decimal[];
    private _operatorChars : [[string, string], [string, string], [string, string], [string, string]][];
    private _thresholds ! : [Decimal, Decimal, number, Decimal, number][]; //setMaximums in the constructor assigns this
    private _rootBehavior : null | [boolean, Decimal, Decimal | boolean];
    private _superRootBehavior : null | [boolean, Decimal, Decimal | boolean];
    private _roundings : [DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal)][];
    private _preAdditionFormats : [Decimal, string, string, string, string, (value : Decimal) => boolean, Notation][];
    private _nestingBefore : boolean[];
    private _parenthesize : [[string, string, boolean], [string, string, boolean], [string, string, boolean]][];
    private _argumentShown : [(value : Decimal) => boolean, (value : Decimal) => boolean, [string, string]?, [string, string]?][];
    public plainInnerNotation : Notation;
    private _innerNotations : [Notation, Notation, Notation][];
    public minnum : Decimal;
    public recipString : [string, string] | null;

    private argumentMaximums ! : Decimal[]; //setMaximums in the constructor assigns this
    private symbolicMaximums ! : Decimal[]; //setMaximums in the constructor assigns this
    private nestingMaximums ! : Decimal[]; //setMaximums in the constructor assigns this
    private unconvertedThresholds : [Decimal, Decimal | boolean, number, Decimal, number][];

    constructor(
        bases : DecimalSource | DecimalSource[] = 10,
        maximums : DecimalSource[] = [10, Decimal.dInf, Decimal.dInf, Decimal.dInf, Decimal.dInf, Decimal.dInf],
        operatorChars : [[string, string], [string, string], [string, string], [string, string]][] = [
            [["10 + ", ""], ["10 + ", ""], [" + ", ""], ["10 * ", ""]],
            [["10 * ", ""], ["10 * ", ""], [" * ", ""], ["10^", ""]],
            [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
            [["10^", ""], ["10^", ""], [" ", ""], ["(10^)^", ""]],
            [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
            [["10^^", ""], ["10^^", ""], [" ", ""], ["(10^^)^", ""]]
        ],
        thresholds : [DecimalSource, DecimalSource | boolean, number, DecimalSource, number][] = [
            [10, true, 4, 10, 2],
            [10, true, 4, 10, 2],
            [10, true, 4, 10, 2],
            [10, true, 4, 10, 2],
            [10, true, 4, 10, 2],
            [10, true, 4, 10, 2]
        ],
        rootBehavior : null | [boolean, DecimalSource, DecimalSource | boolean] = null,
        superRootBehavior : null | [boolean, DecimalSource, DecimalSource | boolean] = rootBehavior,
        roundings : [DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal)][] = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        preAdditionFormats : [DecimalSource, string, string, string, string, (value : Decimal) => boolean, Notation][] = [],
        nestingBefore : boolean[] = [true, true, false, true, false, true],
        parenthesize : [[string, string, boolean], [string, string, boolean], [string, string, boolean]][] = [
            [["", "", false], ["", "", false], ["(", ")", false]],
            [["(", ")", false], ["(", ")", false], ["(", ")", false]],
            [["(", ")", false], ["(", ")", false], ["(", ")", false]],
            [["(", ")", false], ["", "", false], ["(", ")", false]],
            [["(", ")", false], ["", "", false], ["(", ")", false]],
            [["(", ")", false], ["", "", false], ["(", ")", false]]
        ],
        argumentShown : [(value : Decimal) => boolean, (value : Decimal) => boolean, [string, string]?, [string, string]?][] = [],
        plainInnerNotation : Notation = new DefaultNotation(),
        innerNotations : Notation | [Notation, Notation, Notation][] = new DefaultNotation(),
        minnum : DecimalSource | undefined = undefined,
        recipString : [string, string] | null = null,
    ) { //Normally I make these constructors call the set methods, but so many set methods call setMaximums that I think it's best to have the constructor do things in full here
        super();
        if (!Array.isArray(bases)) bases = [bases];
        this._bases = bases.map(toDecimal);
        while (this._bases.length < 6) {
            if (this._bases.length == 0) this._bases.push(Decimal.dTen);
            if (this._bases.length == 1) this._bases.push(this._bases[0]);
            if (this._bases.length == 2) this._bases.push(Decimal.dTwo); //Default root height is 2
            if (this._bases.length == 3) this._bases.push(this._bases[1]);
            if (this._bases.length == 4) this._bases.push(this._bases[2]); //Default super-root height matches root height
            if (this._bases.length == 5) this._bases.push(this._bases[3]);
        }
        if (this._bases[0].lte(0)) throw new RangeError("Addition base <= 0 in Increasing Operator notation");
        if (this._bases[1].lte(1)) throw new RangeError("Multiplication base <= 1 in Increasing Operator notation");
        if (this._bases[2].lte(1)) throw new RangeError("Root height <= 1 in Increasing Operator notation");
        if (this._bases[3].lte(1.44466786100976613366)) throw new RangeError("Exponent base <= e^(1/e) in Increasing Operator notation");
        if (this._bases[4].lte(1)) throw new RangeError("Super-root height <= 1 in Increasing Operator notation");
        if (this._bases[5].lte(1.44466786100976613366)) throw new RangeError("Tetration base <= e^(1/e) in Increasing Operator notation");
        this._maximums = maximums.map(toDecimal);
        while (this._maximums.length < 6) {
            if (this._maximums.length == 0) this._maximums.push(this._bases[0]);
            else this._maximums.push(Decimal.dInf);
        }
        this._operatorChars = operatorChars;
        let defaultOperatorChars : [[string, string], [string, string], [string, string], [string, string]][] = [
            [["10 + ", ""], ["10 + ", ""], [" + ", ""], ["10 * ", ""]],
            [["10 * ", ""], ["10 * ", ""], [" * ", ""], ["10^", ""]],
            [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
            [["10^", ""], ["10^", ""], [" ", ""], ["(10^)^", ""]],
            [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
            [["10^^", ""], ["10^^", ""], [" ", ""], ["(10^^)^", ""]]
        ];
        while (this._operatorChars.length < 6) this._operatorChars.push(defaultOperatorChars[this._operatorChars.length]);
        if (rootBehavior === null) this._rootBehavior = rootBehavior;
        else { // I have to jump through a lot of hoops to make TypeScript happy here
            let RB0 = rootBehavior[0];
            let RB1 = toDecimal(rootBehavior[1]);
            let RB2 = (typeof rootBehavior[2] == "boolean") ? rootBehavior[2] : toDecimal(rootBehavior[2])
            this._rootBehavior = [RB0, RB1, RB2];
        }
        if (superRootBehavior === null) this._superRootBehavior = superRootBehavior;
        else { // I have to jump through a lot of hoops to make TypeScript happy here
            let RB0 = superRootBehavior[0];
            let RB1 = toDecimal(superRootBehavior[1]);
            let RB2 = (typeof superRootBehavior[2] == "boolean") ? superRootBehavior[2] : toDecimal(superRootBehavior[2])
            this._superRootBehavior = [RB0, RB1, RB2];
        }
        while (roundings.length < 6) roundings.push([Decimal.dZero, Decimal.dZero, Decimal.dZero]);
        this._roundings = roundings;
        this._preAdditionFormats = preAdditionFormats.map((value) => ([toDecimal(value[0]), value[1], value[2], value[3], value[4], value[5], value[6]]));
        this._preAdditionFormats = this._preAdditionFormats.sort((value, other) => (Decimal.cmp(value[0], other[0])));
        this.unconvertedThresholds = [];
        for (let t = 0; t < thresholds.length; t++) {
            let possibleBool = thresholds[t][1]
            if ((typeof possibleBool == "boolean")) this.unconvertedThresholds.push([toDecimal(thresholds[t][0]), possibleBool, thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);
            else this.unconvertedThresholds.push([toDecimal(thresholds[t][0]), toDecimal(possibleBool), thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);
        }
        if (this.unconvertedThresholds.length == 0) this.unconvertedThresholds.push([Decimal.dTen, true, 4, Decimal.dTen, 2]);
        while (this.unconvertedThresholds.length < 6) this.unconvertedThresholds.push(this.unconvertedThresholds[this.unconvertedThresholds.length - 1]);
        this.setMaximums(this.unconvertedThresholds);
        this._nestingBefore = nestingBefore;
        while (this._nestingBefore.length < 6) {
            if (this._nestingBefore.length == 0 || this._nestingBefore.length % 2 == 1) this._nestingBefore.push(true);
            else this._nestingBefore.push(false);
        }
        this._parenthesize = parenthesize;
        while (this._parenthesize.length < 6) this._parenthesize.push([["", "", false], ["", "", false], ["", "", false]]);
        this.plainInnerNotation = plainInnerNotation;
        this._argumentShown = argumentShown;
        while (this._argumentShown.length < 6) this._argumentShown.push([(value) => true, (value) => true]);
        if (!Array.isArray(innerNotations)) innerNotations = [[innerNotations, innerNotations, innerNotations]];
        this._innerNotations = innerNotations;
        if (this._innerNotations.length == 0) this._innerNotations.push([new DefaultNotation(), new DefaultNotation(), new DefaultNotation()])
        while (this._innerNotations.length < 6) this._innerNotations.push(this._innerNotations[this._innerNotations.length - 1]);
        if (minnum === undefined) this.minnum = this._maximums[0].recip();
        else this.minnum = toDecimal(minnum);
        this.recipString = recipString;
    }

    public name = "Increasing Operator Notation";

    private setMaximums(thresholds? : [Decimal, Decimal | boolean, number, Decimal, number][]) {
        let argumentMaximums : Decimal[] = []; //The highest number allowed to stand on its own on each operator before another symbol of that operator is brought in
        let symbolicMaximums : Decimal[] = []; //The highest number on each operator before its nesting begins
        let nestingMaximums : Decimal[] = []; //The limit of each operator before moving to the next operator
        if (thresholds != undefined) this._thresholds = [];
        let possibleBool : Decimal | boolean;
        //Addition maximums
        if (thresholds !== undefined) {
            possibleBool = thresholds[0][1];
            if (typeof possibleBool == "boolean") possibleBool = this._maximums[0];
            this._thresholds.push([thresholds[0][0], possibleBool, thresholds[0][2], thresholds[0][3], thresholds[0][4]]);
        }
        argumentMaximums.push(this._thresholds[0][0].min(this._maximums[1]).max(this._maximums[0]).min(this._thresholds[0][1]));
        if (!argumentMaximums[0].isFinite()) argumentMaximums[0] = Decimal.dInf;
        symbolicMaximums.push(argumentMaximums[0].plus(this._bases[0].mul(this._thresholds[0][2])));
        if (!symbolicMaximums[0].isFinite()) symbolicMaximums[0] = Decimal.dInf;
        nestingMaximums.push(symbolicMaximums[0].max(this._thresholds[0][3]).mul(this._bases[0].pow(this._thresholds[0][4])));
        if (!nestingMaximums[0].isFinite()) nestingMaximums[0] = Decimal.dInf;
        nestingMaximums[0] = nestingMaximums[0].min(this._maximums[1]).max(this._maximums[0]);
        if (!nestingMaximums[0].isFinite()) nestingMaximums[0] = Decimal.dInf;
        //Multiplication maximums
        if (thresholds !== undefined) {
            possibleBool = thresholds[1][1];
            if (possibleBool === false) possibleBool = argumentMaximums[0];
            else if (possibleBool === true) possibleBool = symbolicMaximums[0];
            this._thresholds.push([thresholds[1][0], possibleBool, thresholds[1][2], thresholds[1][3], thresholds[1][4]]);
        }
        argumentMaximums.push(this._thresholds[1][0].min(this._maximums[2]).max(nestingMaximums[0]).min(this._thresholds[1][1]));
        if (!argumentMaximums[1].isFinite()) argumentMaximums[1] = Decimal.dInf;
        symbolicMaximums.push(argumentMaximums[1].mul(this._bases[1].pow(this._thresholds[1][2])));
        if (!symbolicMaximums[1].isFinite()) symbolicMaximums[1] = Decimal.dInf;
        nestingMaximums.push(Decimal.iteratedexp(this._bases[1], this._thresholds[1][4], symbolicMaximums[1].max(this._thresholds[1][3]), true));
        if (!nestingMaximums[1].isFinite()) nestingMaximums[1] = Decimal.dInf;
        nestingMaximums[1] = nestingMaximums[1].min(this._maximums[2]).max(nestingMaximums[0]);
        if (!nestingMaximums[1].isFinite()) nestingMaximums[1] = Decimal.dInf;
        //Root maximums
        if (thresholds !== undefined) {
            possibleBool = thresholds[2][1];
            if (possibleBool === false) possibleBool = argumentMaximums[1];
            else if (possibleBool === true) possibleBool = symbolicMaximums[1];
            this._thresholds.push([thresholds[2][0], possibleBool, thresholds[2][2], thresholds[2][3], thresholds[2][4]]);
        }
        argumentMaximums.push(this._thresholds[2][0].min(this._maximums[3]).max(nestingMaximums[1]).min(this._thresholds[2][1]));
        if (!argumentMaximums[2].isFinite()) argumentMaximums[2] = Decimal.dInf;
        if (this._rootBehavior === null) {
            symbolicMaximums.push(argumentMaximums[2].pow(this._bases[2].pow(this._thresholds[2][2])));
            if (!symbolicMaximums[2].isFinite()) symbolicMaximums[2] = Decimal.dInf;
            let nestedRootMaximum = symbolicMaximums[2].max(this._thresholds[2][3]);
            for (let r = 0; r < this._thresholds[2][4]; r++) nestedRootMaximum = argumentMaximums[2].pow(this._bases[2].pow(nestedRootMaximum));
            nestingMaximums.push(nestedRootMaximum);
        }
        else {
            possibleBool = this._rootBehavior[2];
            if (possibleBool === false) possibleBool = argumentMaximums[1];
            else if (possibleBool === true) possibleBool = symbolicMaximums[1];
            let maxDegree = Decimal.min(possibleBool, nestingMaximums[1]);
            symbolicMaximums.push(argumentMaximums[2].pow(maxDegree));
            if (!symbolicMaximums[2].isFinite()) symbolicMaximums[2] = Decimal.dInf;
            let nestedRootMaximum = symbolicMaximums[2];
            for (let r = 0; r < this._thresholds[2][4]; r++) nestedRootMaximum = argumentMaximums[2].pow(nestedRootMaximum);
            nestingMaximums.push(nestedRootMaximum);
        }
        if (!nestingMaximums[2].isFinite()) nestingMaximums[2] = Decimal.dInf;
        nestingMaximums[2] = nestingMaximums[2].min(this._maximums[3]).max(nestingMaximums[1]);
        if (!nestingMaximums[2].isFinite()) nestingMaximums[2] = Decimal.dInf;
        //Exponentiation maximums
        if (thresholds !== undefined) {
            possibleBool = thresholds[3][1];
            if (possibleBool === false) possibleBool = argumentMaximums[2];
            else if (possibleBool === true) possibleBool = symbolicMaximums[2];
            this._thresholds.push([thresholds[3][0], possibleBool, thresholds[3][2], thresholds[3][3], thresholds[3][4]]);
        }
        argumentMaximums.push(this._thresholds[3][0].min(this._maximums[4]).max(nestingMaximums[2]).min(this._thresholds[3][1]));
        if (!argumentMaximums[3].isFinite()) argumentMaximums[3] = Decimal.dInf;
        symbolicMaximums.push(Decimal.iteratedexp(this._bases[3], this._thresholds[3][2], argumentMaximums[3], true));
        if (!symbolicMaximums[3].isFinite()) symbolicMaximums[3] = Decimal.dInf;
        nestingMaximums.push(Decimal.pentate(this._bases[3], this._thresholds[3][4], symbolicMaximums[3].max(this._thresholds[3][3]), true));
        if (!nestingMaximums[3].isFinite()) nestingMaximums[3] = Decimal.dInf;
        nestingMaximums[3] = nestingMaximums[3].min(this._maximums[4]).max(nestingMaximums[2]);
        if (!nestingMaximums[3].isFinite()) nestingMaximums[3] = Decimal.dInf;
        //Super-root maximums
        if (thresholds !== undefined) {
            possibleBool = thresholds[4][1];
            if (possibleBool === false) possibleBool = argumentMaximums[3];
            else if (possibleBool === true) possibleBool = symbolicMaximums[3];
            this._thresholds.push([thresholds[4][0], possibleBool, thresholds[4][2], thresholds[4][3], thresholds[4][4]]);
        }
        argumentMaximums.push(this._thresholds[4][0].min(this._maximums[5]).max(nestingMaximums[3]).min(this._thresholds[4][1]));
        if (!argumentMaximums[4].isFinite()) argumentMaximums[4] = Decimal.dInf;
        if (this._superRootBehavior === null) {
            let symbolicSRootMaximum = argumentMaximums[4];
            for (let r = 0; r < this._thresholds[4][2]; r++) symbolicSRootMaximum = Decimal.tetrate(symbolicSRootMaximum, this._bases[4].toNumber(), 1, true);
            symbolicMaximums.push(symbolicSRootMaximum);
            if (!symbolicMaximums[4].isFinite()) symbolicMaximums[4] = Decimal.dInf;
            let nestedSRootMaximum = symbolicMaximums[4].max(this._thresholds[4][3]);
            for (let r = 0; r < this._thresholds[4][4] && nestedSRootMaximum.isFinite(); r++) {
                let currentValue = argumentMaximums[4];
                let iterations = 0;
                while (iterations < nestedSRootMaximum.toNumber()) {
                    currentValue = Decimal.tetrate(currentValue, this._bases[4].toNumber(), 1, true);
                    iterations++;
                    if (currentValue.gte("F10")) {
                        currentValue = currentValue.layeradd10((nestedSRootMaximum.toNumber() - iterations) * Math.ceil(this._bases[4].toNumber() - 1), true);
                        break;
                    }
                }
                nestedSRootMaximum = currentValue;
            }
            nestingMaximums.push(nestedSRootMaximum);
        }
        else {
            possibleBool = this._superRootBehavior[2];
            if (possibleBool === false) possibleBool = argumentMaximums[3];
            else if (possibleBool === true) possibleBool = symbolicMaximums[3];
            let maxDegree = Decimal.min(possibleBool, nestingMaximums[3]);
            symbolicMaximums.push(argumentMaximums[4].tetrate(maxDegree.toNumber(), 1, true));
            if (!symbolicMaximums[4].isFinite()) symbolicMaximums[4] = Decimal.dInf;
            let nestedSRootMaximum = symbolicMaximums[4];
            for (let r = 0; r < this._thresholds[4][4] && nestedSRootMaximum.isFinite(); r++) nestedSRootMaximum = argumentMaximums[4].tetrate(nestedSRootMaximum.toNumber(), 1, true)
            nestingMaximums.push(nestedSRootMaximum);
        }
        if (!nestingMaximums[4].isFinite()) nestingMaximums[4] = Decimal.dInf;
        nestingMaximums[4] = nestingMaximums[4].min(this._maximums[5]).max(nestingMaximums[3]);
        if (!nestingMaximums[4].isFinite()) nestingMaximums[4] = Decimal.dInf;
        //Tetration maximums
        if (thresholds !== undefined) {
            possibleBool = thresholds[5][1];
            if (possibleBool === false) possibleBool = argumentMaximums[4];
            else if (possibleBool === true) possibleBool = symbolicMaximums[4];
            this._thresholds.push([thresholds[5][0], possibleBool, thresholds[5][2], thresholds[5][3], thresholds[5][4]]);
        }
        argumentMaximums.push(this._thresholds[5][0].max(nestingMaximums[4]).min(this._thresholds[5][1]));
        if (!argumentMaximums[5].isFinite()) argumentMaximums[5] = Decimal.dInf;
        let symbolicTetrationMaximum = argumentMaximums[4];
        for (let r = 0; r < this._thresholds[5][2] && symbolicTetrationMaximum.isFinite(); r++) symbolicTetrationMaximum = Decimal.tetrate(this._bases[5], symbolicTetrationMaximum.toNumber(), 1, true);
        symbolicMaximums.push(symbolicTetrationMaximum);
        if (!symbolicMaximums[5].isFinite()) symbolicMaximums[5] = Decimal.dInf;
        nestingMaximums.push(Decimal.dInf); //Tetration is the highest operator here, so no need for a maximum (plus the nesting maximum would be hexational, and that's way above break_eternity's scope)
        this.argumentMaximums = argumentMaximums;
        this.symbolicMaximums = symbolicMaximums;
        this.nestingMaximums = nestingMaximums;
    }

    public formatDecimal(value: Decimal): string {
        if (value.lt(this.minnum) && (value.neq(0) || this._maximums[0].lt(0))) {
            if (value.eq(0)) return this.plainInnerNotation.format(0);
            let recipStr = ["", ""]
            if (this.recipString === null) recipStr = [this.plainInnerNotation.format(1) + " / (", ")"];
            else recipStr = this.recipString;
            return recipStr[0] + this.format(value.recip()) + recipStr[1];
        }
        let operator = -1;
        if (value.gte(this._maximums[0])) {
            operator++;
            while (operator < 5 && value.gte(this.nestingMaximums[operator])) operator++;
        }
        if (operator == -1) {
            if (this._preAdditionFormats.length == 0 || value.lt(this._preAdditionFormats[0][0])) {
                return this.plainInnerNotation.format(value);
            }
            else {
                let prf = 0;
                while (prf < this._preAdditionFormats.length - 1 && value.gte(this._preAdditionFormats[prf + 1][0])) prf++;
                let argument = value.sub(this._preAdditionFormats[prf][0]);
                let result = "";
                if (this._preAdditionFormats[prf][5](argument)) result = this._preAdditionFormats[prf][3] + this._preAdditionFormats[prf][6].format(argument) + this._preAdditionFormats[prf][4];
                result = this._preAdditionFormats[prf][1] + result + this._preAdditionFormats[prf][2];
                return result;
            }
        }
        
        let result = "";
        let argument = Decimal.dZero;
        let operatorNum = Decimal.dZero;
        let argumentStr = "";
        let operatorStr = "";
        let rootHeighting = false;
        if ((operator == 2 && this._rootBehavior !== null) || (operator == 4 && this._superRootBehavior !== null)) rootHeighting = true;
        
        if (operator == 0) {
            operatorNum = value.sub(this.argumentMaximums[0]).div(this._bases[0]).floor().plus(1);
            argument = value.sub(operatorNum.mul(this._bases[0]));
        }
        else if (operator == 1) {
            operatorNum = value.div(this.argumentMaximums[1]).log(this._bases[1]).floor().plus(1);
            argument = value.div(this._bases[1].pow(operatorNum));
        }
        else if (operator == 2) {
            if (this._rootBehavior === null) {
                operatorNum = value.log(this.argumentMaximums[2]).log(this._bases[2]).floor().plus(1);
                argument = value.root(this._bases[2].pow(operatorNum));
            }
            else if (this._rootBehavior[0] === false) {
                operatorNum = value.log(this.argumentMaximums[2]).sub(this._bases[2]).div(this._rootBehavior[1]).plus(1).floor().mul(this._rootBehavior[1]).plus(this._bases[2]);
                argument = value.root(operatorNum);
            }
            else {
                operatorNum = value.log(this.argumentMaximums[2]).div(this._bases[2]).log(this._rootBehavior[1]).plus(1).floor().pow_base(this._rootBehavior[1]).mul(this._bases[2]);
                argument = value.root(operatorNum);
            }
        }
        else if (operator == 3) {
            operatorNum = value.slog(this._bases[3], 100, true).sub(this.argumentMaximums[3].slog(this._bases[3], 100, true)).floor().plus(1);
            argument = (operatorNum.gte(9e15)) ? this.argumentMaximums[3] : value.iteratedlog(this._bases[3], operatorNum.toNumber(), true);
        }
        else if (operator == 4) {
            if (this._superRootBehavior === null) {
                operatorNum = Decimal.slog(value.min(this.argumentMaximums[4]), 10, true).sub(Decimal.slog(Decimal.iteratedexp(10, Math.ceil(this._bases[4].toNumber()) + 1, new Decimal(Number.MAX_SAFE_INTEGER)), 10, true)).div(Math.ceil(this._bases[4].toNumber()) - 1).floor().plus(1).max(0);
                argument = value;
                if (operatorNum.gt(0)) argument = (operatorNum.gte(9e15)) ? this.argumentMaximums[4] : Decimal.iteratedlog(argument, 10, operatorNum.mul(Math.ceil(this._bases[4].toNumber()) - 1).toNumber(), true);
                while (argument.gte(this.argumentMaximums[4])) {
                    operatorNum = operatorNum.plus(1);
                    argument = argument.linear_sroot(this._bases[4].toNumber());
                }
            }
            else if (this._superRootBehavior[0] === false) {
                operatorNum = value.slog(this.argumentMaximums[4]).plus(1).sub(this._bases[4]).div(this._superRootBehavior[1]).floor().mul(this._superRootBehavior[1]).plus(this._bases[4]);
                argument = value.linear_sroot(operatorNum.toNumber());
            }
            else {
                operatorNum = value.slog(this.argumentMaximums[4]).plus(1).div(this._bases[4]).log(this._superRootBehavior[1]).floor().pow_base(this._superRootBehavior[1]).mul(this._bases[4]);
                argument = value.linear_sroot(operatorNum.toNumber());
            }
        }
        else if (operator == 5) {
            let split = hypersplit(value, this._bases[5], [this.argumentMaximums[5], 1, 1]);
            operatorNum = split[3];
            argument = split[0];
        }


        if (!rootHeighting && value.lt(this.symbolicMaximums[operator]) && operatorNum.gte(0)) {
            argument = round(argument, this._roundings[operator][0]);
            if (argument.lt(this._thresholds[operator][0])) argumentStr = this._innerNotations[operator][0].format(argument);
            else argumentStr = this.format(argument);
            if (this._argumentShown[operator][0](argument)) {
                result = argumentStr;
                if (this._parenthesize[operator][0][2] || argument.gte(this._thresholds[operator][0])) result = this._parenthesize[operator][0][0] + result + this._parenthesize[operator][0][1];
                for (let i = 0; i < operatorNum.toNumber(); i++) result = this._operatorChars[operator][(i == 0) ? 0 : 1][0] + result + this._operatorChars[operator][(i == 0) ? 0 : 1][1];
            }
            else {
                let replacementBelow = this._argumentShown[operator][2];
                let replacementAbove = this._argumentShown[operator][3]
                if (replacementBelow === undefined) result = this._operatorChars[operator][0][0] + result + this._operatorChars[operator][0][1];
                else result = replacementBelow[0] + result + replacementBelow[1];
                for (let i = 1; i < operatorNum.toNumber(); i++) {
                    if (replacementAbove === undefined) result = this._operatorChars[operator][1][0] + result + this._operatorChars[operator][1][1];
                    else result = replacementAbove[0] + result + replacementAbove[1];
                }
            }
        }
        else {
            argument = round(argument, this._roundings[operator][1]); 
            operatorNum = round(operatorNum, this._roundings[operator][2]);
            if (argument.lt(this._thresholds[operator][0])) argumentStr = this._innerNotations[operator][1].format(argument);
            else argumentStr = this.format(argument);
            if (this._parenthesize[operator][1][2] || argument.gte(this._thresholds[operator][0])) argumentStr = this._parenthesize[operator][1][0] + argumentStr + this._parenthesize[operator][1][1];
            if (operatorNum.lt(this._thresholds[operator][3])) operatorStr = this._innerNotations[operator][2].format(operatorNum);
            else operatorStr = this.format(operatorNum);
            if (this._parenthesize[operator][2][2] || operatorNum.gte(this._thresholds[operator][3])) operatorStr = this._parenthesize[operator][2][0] + operatorStr + this._parenthesize[operator][2][1];
            argumentStr = this._operatorChars[operator][2][0] + argumentStr + this._operatorChars[operator][2][1];
            operatorStr = this._operatorChars[operator][3][0] + operatorStr + this._operatorChars[operator][3][1];
            if (!(this._argumentShown[operator][1](argument))) result = operatorStr;
            else if (this._nestingBefore[operator]) result = operatorStr + argumentStr;
            else result = argumentStr + operatorStr; 
        }
        return result;
    }

    public get bases() {
        return this._bases;
    }

    public set bases(bases : DecimalSource | DecimalSource[]) {
        if (!Array.isArray(bases)) bases = [bases];
        let basesD = bases.map(toDecimal);
        while (basesD.length < 6) {
            if (basesD.length == 0) basesD.push(Decimal.dTen);
            if (basesD.length == 1) basesD.push(basesD[0]);
            if (basesD.length == 2) basesD.push(Decimal.dTwo); //Default root height is 2
            if (basesD.length == 3) basesD.push(basesD[1]);
            if (basesD.length == 4) basesD.push(basesD[2]); //Default super-root height matches root height
            if (basesD.length == 5) basesD.push(basesD[3]);
        }
        if (basesD[0].lte(0)) throw new RangeError("Addition base <= 0 in Increasing Operator notation");
        if (basesD[1].lte(1)) throw new RangeError("Multiplication base <= 1 in Increasing Operator notation");
        if (basesD[2].lte(1)) throw new RangeError("Root height <= 1 in Increasing Operator notation");
        if (basesD[3].lte(1.44466786100976613366)) throw new RangeError("Exponent base <= e^(1/e) in Increasing Operator notation");
        if (basesD[4].lte(1)) throw new RangeError("Super-root height <= 1 in Increasing Operator notation");
        if (basesD[5].lte(1.44466786100976613366)) throw new RangeError("Tetration base <= e^(1/e) in Increasing Operator notation");
        this._bases = basesD;
        this.setMaximums(this.unconvertedThresholds);
    }

    public get maximums() {
        return this._maximums;
    }

    public set maximums(maximums : DecimalSource[]) {
        let maximumsD = maximums.map(toDecimal);
        while (maximumsD.length < 6) {
            if (maximumsD.length == 0) maximumsD.push(this._bases[0]);
            else maximumsD.push(Decimal.dInf);
        }
        this._maximums = maximumsD;
        this.setMaximums(this.unconvertedThresholds);
    }

    public get operatorChars() {
        return this._operatorChars;
    }

    public set operatorChars(operatorChars : [[string, string], [string, string], [string, string], [string, string]][]) {
        let defaultOperatorChars : [[string, string], [string, string], [string, string], [string, string]][] = [
            [["10 + ", ""], ["10 + ", ""], ["", ""], ["10 * ", " + "]],
            [["10 * ", ""], ["10 * ", ""], ["", ""], ["10^", " * "]],
            [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
            [["10^", ""], ["10^", ""], ["", ""], ["(10^)^", " "]],
            [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
            [["10^^", ""], ["10^^", ""], ["", ""], ["(10^^)^", " "]],
        ];
        while (operatorChars.length < 6) operatorChars.push(defaultOperatorChars[operatorChars.length]);
        this._operatorChars = operatorChars;
    }

    public get thresholds() {
        return this.unconvertedThresholds;
    }

    public set thresholds(thresholds : [DecimalSource, DecimalSource | boolean, number, DecimalSource, number][]) {
        let unconvertedThresholds : [Decimal, boolean | Decimal, number, Decimal, number][] = [];
        for (let t = 0; t < thresholds.length; t++) {
            let possibleBool = thresholds[t][1]
            if ((typeof possibleBool == "boolean")) unconvertedThresholds.push([toDecimal(thresholds[t][0]), possibleBool, thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);
            else unconvertedThresholds.push([toDecimal(thresholds[t][0]), toDecimal(possibleBool), thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);
        }
        if (unconvertedThresholds.length == 0) unconvertedThresholds.push([Decimal.dTen, true, 4, Decimal.dTen, 2]);
        while (unconvertedThresholds.length < 6) unconvertedThresholds.push(unconvertedThresholds[unconvertedThresholds.length - 1]);
        this.unconvertedThresholds = unconvertedThresholds;
        this.setMaximums(this.unconvertedThresholds);
    }

    public get rootBehavior() {
        return this._rootBehavior;
    }

    public set rootBehavior(rootBehavior : null | [boolean, Decimal, Decimal | boolean]) {
        this._rootBehavior = rootBehavior;
        this.setMaximums(this.unconvertedThresholds);
    }

    public get superRootBehavior() {
        return this._superRootBehavior;
    }

    public set superRootBehavior(superRootBehavior : null | [boolean, Decimal, Decimal | boolean]) {
        this._superRootBehavior = superRootBehavior;
        this.setMaximums(this.unconvertedThresholds);
    }

    public get roundings() {
        return this._roundings;
    }

    public set roundings(roundings : [DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal), DecimalSource | ((value : Decimal) => Decimal)][]) {
        while (roundings.length < 6) roundings.push([Decimal.dZero, Decimal.dZero, Decimal.dZero]);
        this._roundings = roundings;
    }

    public get preAdditionFormats() {
        return this._preAdditionFormats;
    }

    public set preAdditionFormats(preAdditionFormats : [DecimalSource, string, string, string, string, (value : Decimal) => boolean, Notation][]) {
        let preAdditionFormatsD : [Decimal, string, string, string, string, (value: Decimal) => boolean, Notation][] = preAdditionFormats.map((value) => ([toDecimal(value[0]), value[1], value[2], value[3], value[4], value[5], value[6]]));
        this._preAdditionFormats = preAdditionFormatsD.sort((value, other) => (Decimal.cmp(value[0], other[0])));
    }

    public get nestingBefore() {
        return this._nestingBefore;
    }

    public set nestingBefore(nestingBefore : boolean[]) {
        while (nestingBefore.length < 6) {
            if (nestingBefore.length == 0 || nestingBefore.length % 2 == 1) nestingBefore.push(true);
            else nestingBefore.push(false);
        }
        this._nestingBefore = nestingBefore;
    }

    public get parenthesize() {
        return this._parenthesize;
    }

    public set parenthesize(parenthesize : [[string, string, boolean], [string, string, boolean], [string, string, boolean]][]) {
        while (parenthesize.length < 6) parenthesize.push([["(", ")", false], ["(", ")", false], ["(", ")", false]]);
        this._parenthesize = parenthesize;
    }

    public get argumentShown() {
        return this._argumentShown;
    }
    
    public set argumentShown(argumentShown : [(value : Decimal) => boolean, (value : Decimal) => boolean, [string, string]?, [string, string]?][]) {
        while (argumentShown.length < 4) argumentShown.push([(value) => true, (value) => true]);
        this._argumentShown = argumentShown;
    }

    public get innerNotations() {
        return this._innerNotations;
    }

    public set innerNotations(innerNotations : Notation | [Notation, Notation, Notation][]) {
        if (!Array.isArray(innerNotations)) innerNotations = [[innerNotations, innerNotations, innerNotations]];
        if (innerNotations.length == 0) innerNotations.push([new DefaultNotation(), new DefaultNotation(), new DefaultNotation()])
        while (innerNotations.length < 6) innerNotations.push(innerNotations[innerNotations.length - 1]);
        this._innerNotations = innerNotations;
    }
}