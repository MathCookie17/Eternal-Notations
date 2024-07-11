import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
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
export declare class IncreasingOperatorNotation extends Notation {
    private _bases;
    private _maximums;
    private _operatorChars;
    private _thresholds;
    private _rootBehavior;
    private _superRootBehavior;
    private _roundings;
    private _preAdditionFormats;
    private _nestingBefore;
    private _parenthesize;
    private _argumentShown;
    plainInnerNotation: Notation;
    private _innerNotations;
    minnum: Decimal;
    recipString: [string, string] | null;
    private argumentMaximums;
    private symbolicMaximums;
    private nestingMaximums;
    private unconvertedThresholds;
    constructor(bases?: DecimalSource | DecimalSource[], maximums?: DecimalSource[], operatorChars?: [[string, string], [string, string], [string, string], [string, string]][], thresholds?: [DecimalSource, DecimalSource | boolean, number, DecimalSource, number][], rootBehavior?: null | [boolean, DecimalSource, DecimalSource | boolean], superRootBehavior?: null | [boolean, DecimalSource, DecimalSource | boolean], roundings?: [DecimalSource | ((value: Decimal) => Decimal), DecimalSource | ((value: Decimal) => Decimal), DecimalSource | ((value: Decimal) => Decimal)][], preAdditionFormats?: [DecimalSource, string, string, string, string, (value: Decimal) => boolean, Notation][], nestingBefore?: boolean[], parenthesize?: [[string, string, boolean], [string, string, boolean], [string, string, boolean]][], argumentShown?: [(value: Decimal) => boolean, (value: Decimal) => boolean, [string, string]?, [string, string]?][], plainInnerNotation?: Notation, innerNotations?: Notation | [Notation, Notation, Notation][], minnum?: DecimalSource | undefined, recipString?: [string, string] | null);
    name: string;
    private setMaximums;
    formatDecimal(value: Decimal): string;
    get bases(): DecimalSource | DecimalSource[];
    set bases(bases: DecimalSource | DecimalSource[]);
    get maximums(): DecimalSource[];
    set maximums(maximums: DecimalSource[]);
    get operatorChars(): [[string, string], [string, string], [string, string], [string, string]][];
    set operatorChars(operatorChars: [[string, string], [string, string], [string, string], [string, string]][]);
    get thresholds(): [DecimalSource, DecimalSource | boolean, number, DecimalSource, number][];
    set thresholds(thresholds: [DecimalSource, DecimalSource | boolean, number, DecimalSource, number][]);
    get rootBehavior(): null | [boolean, Decimal, Decimal | boolean];
    set rootBehavior(rootBehavior: null | [boolean, Decimal, Decimal | boolean]);
    get superRootBehavior(): null | [boolean, Decimal, Decimal | boolean];
    set superRootBehavior(superRootBehavior: null | [boolean, Decimal, Decimal | boolean]);
    get roundings(): [DecimalSource | ((value: Decimal) => Decimal), DecimalSource | ((value: Decimal) => Decimal), DecimalSource | ((value: Decimal) => Decimal)][];
    set roundings(roundings: [DecimalSource | ((value: Decimal) => Decimal), DecimalSource | ((value: Decimal) => Decimal), DecimalSource | ((value: Decimal) => Decimal)][]);
    get preAdditionFormats(): [DecimalSource, string, string, string, string, (value: Decimal) => boolean, Notation][];
    set preAdditionFormats(preAdditionFormats: [DecimalSource, string, string, string, string, (value: Decimal) => boolean, Notation][]);
    get nestingBefore(): boolean[];
    set nestingBefore(nestingBefore: boolean[]);
    get parenthesize(): [[string, string, boolean], [string, string, boolean], [string, string, boolean]][];
    set parenthesize(parenthesize: [[string, string, boolean], [string, string, boolean], [string, string, boolean]][]);
    get argumentShown(): [(value: Decimal) => boolean, (value: Decimal) => boolean, [string, string]?, [string, string]?][];
    set argumentShown(argumentShown: [(value: Decimal) => boolean, (value: Decimal) => boolean, [string, string]?, [string, string]?][]);
    get innerNotations(): Notation | [Notation, Notation, Notation][];
    set innerNotations(innerNotations: Notation | [Notation, Notation, Notation][]);
}
