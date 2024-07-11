import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Abbreviates a number by splitting it into hyperoperators like how OmegaNum does, except there's an exponentiation entry between the mantissa and the tetration entry.
 * @param delimiters ( [string, string][] ) An array of pairs of strings. Each pair of strings is placed around one of the numbers in the split to indicate which hyperoperator it is, with the first string in the pair coming before the number and the second string in the pair coming after the number. delimiters[0] goes with the mantissa, delimiters[1] goes with the exponent, delimiters[2] goes with the tetration, delimiters[3] goes with the pentation. Default is [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", ") "]]. If there are less than four entries, the remaining entries are filled in with empty strings.
 * @param base ( Decimal ) The base of the exponentiation, tetration, and pentation. Default is 10.
 * @param maximums ( Decimal | Decimal[] ) The largest allowed values for each operator: anything equal to or above this rolls over to the next operator. maximums[0] is the mantissa limit, maximums[1] is the exponent limit, maximums[2] is the tetration limit. Default is [10, 10, 10], where that 10 is whatever the base is. Setting the mantissa maximum to 0 or either of the other two maximums to 1 (actually, anything less than or equal to its corresponding expMult) will effectively disable that operator: for example, if maximums[1] is 1, then exponentiation is effectively excluded from the operators. If just one Decimal is given rather than an array, all three maximums are the same. If there are less than three entries, the last entry is copied to fill the remaining ones.
 * @param showZeroes ( number | number[] ) This parameter controls whether hyperoperators in the split with a value of 0 are shown or not. Default is [1, -1, -1, -1], where for each operator, a positive value means it's always shown even if zero, a negative value means it's not shown if it's zero, and a 0 means it's shown when it's zero but only if a higher hyperoperator is nonzero. If only one number is given rather than an array, then the latter three entries all become that value, but the mantissa's showZeroes always defaults to 1 unless you directly change it with an array. If there are less than four entries, the last entry is copied to fill the remaining ones.
 * @param delimiterPermutation ( number ) The order that the hyperoperators go in when multiple are present. The default is 1, which corresponds to [pentation, tetration, mantissa, exponent]. Each value from 0 to 23 represents a different ordering.
 * @param originalMaximums ( Decimal | Decimal[] ) These are the maximums that apply when the next operator is 0: for example, if maximums is [10, 10, 10] but originalMaximums is [100, 10, 10], then the mantissa can go up to 100 before exponents begin but once the exponent has begun increasing then the mantissa is limited to 10 (this applies even if tetration or pentation is above 0, as long as exponent is still 0). Is the same as maximums by default.
 * @param minnum ( Decimal ) Values above this and below maximums[0] will just return [value, 0, 0, 0] instead of doing any splitting; this prevents small-but-not-too-small values like 2 from forcing negative exponents. Default is 1. Set this value to a negative number to disable this functionality.
 * @param mantissaRounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
 * @param innerNotations ( Notation | Notations[] ) The notations that the numbers are themselves notated with. Has up to four entries, corresponding to the mantissa, exponent, tetration, and pentation in that order. The default is for DefaultNotation to be used for all four. If this is just a single Notation instead of an array, all four hyperoperators use the same innerNotation. If there are less than four entries, the last entry is copied to fill the remaining ones.
 * @param engineerings ( Decimal | [Decimal | Decimal[], Decimal | Decimal[], Decimal | Decimal[]] ) An array of three arrays of Decimals, each of which may potentially be just a single Decimal instead of an array of them. These behave like the engineerings parameter in other notations; the first entry is for exponentiation, the second is for tetration, the third is for pentation. You may make this a single Decimal instead of an array at all to give all three the same single engineering value, but you can't make a single array to give to all three because an array of single Decimals uses "different single values for each of the three hyperoperators" rather than "the same array for all three hyperoperators"... in other words, if you use an array, the upper-level array needs to have three entries, one for each non-mantissa hyperoperator in the split, and each entry of this three-entry array behaves as an engineerings parameter. Default is [[1], [1], [1]], and if less than three entries are provided, the remaining ones are set to [1].
 * @param expMultipliers ( Decimal | Decimal[] ) An array of up to three Decimals which multiply the exponent, tetration, and pentation respectively; this multiplication happens once to start and one more time between each application of the next hyperoperator. Default is [1, 1, 1]. If just one Decimal is given rather than an array, all three multipliers are the same. If there are less than three entries, the remaining ones are set to 1.
 */
export declare class HypersplitNotation extends Notation {
    private _delimiters;
    private _base;
    private _maximums;
    private _showZeroes;
    delimiterPermutation: number;
    private _originalMaximums;
    minnum: Decimal;
    mantissaRounding: DecimalSource | ((value: Decimal) => Decimal);
    private _innerNotations;
    private _engineerings;
    private _expMultipliers;
    constructor(delimiters?: [string, string][], base?: DecimalSource, maximums?: DecimalSource | DecimalSource[], showZeroes?: number | number[], delimiterPermutation?: number, originalMaximums?: DecimalSource | DecimalSource[], minnum?: DecimalSource, mantissaRounding?: DecimalSource | ((value: Decimal) => Decimal), innerNotations?: Notation | Notation[], engineerings?: DecimalSource | [DecimalSource | DecimalSource[], DecimalSource | DecimalSource[], DecimalSource | DecimalSource[]], expMultipliers?: DecimalSource | DecimalSource[]);
    name: string;
    format(value: DecimalSource): string;
    formatDecimal(value: Decimal): string;
    get delimiters(): [string, string][];
    set delimiters(delimiters: [string, string][]);
    get base(): DecimalSource;
    set base(base: DecimalSource);
    get maximums(): DecimalSource | DecimalSource[];
    set maximums(maximums: DecimalSource | DecimalSource[]);
    get showZeroes(): number | number[];
    set showZeroes(showZeroes: number | number[]);
    get originalMaximums(): DecimalSource | DecimalSource[];
    set originalMaximums(originalMaximums: DecimalSource | DecimalSource[]);
    get innerNotations(): Notation | Notation[];
    set innerNotations(innerNotations: Notation | Notation[]);
    get engineerings(): DecimalSource | [DecimalSource | DecimalSource[], DecimalSource | DecimalSource[], DecimalSource | DecimalSource[]];
    set engineerings(input: DecimalSource | [DecimalSource | DecimalSource[], DecimalSource | DecimalSource[], DecimalSource | DecimalSource[]]);
    get expMultipliers(): DecimalSource | DecimalSource[];
    set expMultipliers(expMultipliers: DecimalSource | DecimalSource[]);
}
