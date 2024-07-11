import Decimal from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
/**
 * Writes numbers as their prime factorization: for example, writes 6 as 2 * 3, and writes 60 as 2^2 * 3 * 5.
 * For larger numbers, approximates them as a square root, then a cube root, then a fourth root, and so on, then as a power tower, and then as a tetration of some number to a whole height.
 * Supports non-whole numbers by approximating them as fractions.
 * @param maxPrime ( number ) Only primes up to this value are checked for. Default is 10000. For example, if maxPrime is 5, then 231 would be written as 3 * 77 because 3 would be checked for but 7 and 11 would not be checked for (and so it wouldn't figure out that 77 is composite).
 * @param max_tower_height ( number ) If the power tower would be taller than this many layers, switches to tetrational format. Default is 5.
 * @param fractionPrecision ( number ) The precision with which non-whole numbers are approximated as fractions. If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional. Default is -1e-6.
 * @param numLimit ( number ) Only numbers below this point can stand on their own; anything higher and exponents are introduced. Default is maxPrime^2, as that's when inaccurate prime factorizations (where a supposed large prime actually has two large prime factors) can start showing up.
 * @param powerBase ( number ) If the power tower has more than two layers, all layers except the top two are set to this value. Default is maxPrime.
 * @param minimum ( number ) Numbers below this value are written in terms of their reciprocal. Default is 1 / maxPrime.
 * @param multiplicationString ( string ) The string placed between two prime factors. Default is " * ".
 * @param powerString ( [string, string] ) When a prime factor has an exponent, such as 3^2, this pair of strings controls what shows up between the base and the exponent: powerString[0] goes before the exponent, powerString[1] goes after the exponent. Default is ["^", ""].
 * @param powerBefore ( boolean ) If this is true, exponents on prime factors go before those primes instead of after. Default is false.
 * @param expChars ( [[string, string, string], [string, string, string]] ) An array containing two arrays, each of which contains three strings. In a power tower, expChars[0][0] goes before the tower, expChars[0][1] goes between each entry, and expChars[0][2] goes at the end of the tower. expChars[1] is like expChars[0], but for tetration instead of exponentiation. Default is [["(", ")^(", ")"], ["(", ")^^(", ")"]].
 * @param baseInnerNotation ( Notation ) The notation that the prime factors are themselves written in. DefaultNotation is the default.
 * @param powerInnerNotation ( Notation | null ) The notation that the exponents on the prime factors are written in. Is the same as baseInnerNotation by default. If this is null, then the exponents are themselves written in Prime notation.
 * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["(", ")" + powerString[0] + -1 + powerString[1]], where that -1 is however powerInnerNotation writes -1.
 */
export declare class PrimeNotation extends Notation {
    private _maxPrime;
    max_tower_height: number;
    fractionPrecision: number;
    numLimit: number;
    private _powerBase;
    minimum: number;
    multiplicationString: string;
    powerString: [string, string];
    powerBefore: boolean;
    expChars: [[string, string, string], [string, string, string]];
    baseInnerNotation: Notation;
    powerInnerNotation: Notation | null;
    recipString: [string, string] | null;
    constructor(maxPrime?: number, max_tower_height?: number, fractionPrecision?: number, numLimit?: number, powerBase?: number, minimum?: number, multiplicationString?: string, powerString?: [string, string], powerBefore?: boolean, expChars?: [[string, string, string], [string, string, string]], baseInnerNotation?: Notation, powerInnerNotation?: Notation | null, recipString?: [string, string] | null);
    name: string;
    formatNegativeDecimal(value: Decimal): string;
    formatDecimal(value: Decimal): string;
    get maxPrime(): number;
    set maxPrime(maxPrime: number);
    get powerBase(): number;
    set powerBase(powerBase: number);
}
