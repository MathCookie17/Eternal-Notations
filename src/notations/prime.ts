import Decimal from "break_eternity.js";
import { primeFactorizeFraction } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";

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
export class PrimeNotation extends Notation {
    private _maxPrime : number = 10000;
    public max_tower_height : number = 5;
    public fractionPrecision : number = -1e-6;
    public numLimit : number = this._maxPrime**2;
    private _powerBase : number = this._maxPrime;
    public minimum : number = this._maxPrime**-1;
    public multiplicationString : string = " * ";
    public powerString : [string, string] = ["^", ""];
    public powerBefore : boolean = false;
    public expChars : [[string, string, string], [string, string, string]] = [["(", ")^(", ")"], ["(", ")^^(", ")"]];
    public baseInnerNotation : Notation = new DefaultNotation();
    public powerInnerNotation : Notation | null = this.baseInnerNotation;
    public recipString : [string, string] | null = null;

    constructor(
        maxPrime : number = 10000,
        max_tower_height : number = 5,
        fractionPrecision : number = -1e-6,
        numLimit : number = maxPrime**2,
        powerBase : number = maxPrime,
        minimum : number = maxPrime**-1,
        multiplicationString : string = " * ",
        powerString : [string, string] = ["^", ""],
        powerBefore : boolean = false,
        expChars : [[string, string, string], [string, string, string]] = [["(", ")^(", ")"], ["(", ")^^(", ")"]],
        baseInnerNotation : Notation = new DefaultNotation(),
        powerInnerNotation : Notation | null = baseInnerNotation,
        recipString : [string, string] | null = null
    ) {
        super();
        this.maxPrime = maxPrime;
        this.max_tower_height = max_tower_height;
        this.fractionPrecision = fractionPrecision;
        this.numLimit = numLimit;
        this.powerBase = powerBase;
        this.minimum = minimum;
        this.multiplicationString = multiplicationString;
        this.powerString = powerString;
        this.powerBefore = powerBefore;
        this.expChars = expChars;
        this.baseInnerNotation = baseInnerNotation;
        this.powerInnerNotation = powerInnerNotation;
        this.recipString = recipString;
    }

    public name = "Prime Notation";

    public formatNegativeDecimal(value: Decimal): string {
        return this.baseInnerNotation.format(-1) + this.multiplicationString + this.formatDecimal(value);
      }

    public formatDecimal(value: Decimal): string {
        if (value.eq(0) || value.eq(1) || value.eq(-1)) return this.baseInnerNotation.format(value);
        let powerNotation = (this.powerInnerNotation === null) ? this : this.powerInnerNotation;
        if (value.lt(this.minimum)) {
            let recipString = this.recipString;
            if (recipString === null) recipString = ["(", ")" + this.powerString[0] + powerNotation.format(-1) + this.powerString[1]];
            return recipString[0] + this.format(value.recip()) + recipString[1];
        }
        let result = "";
        if (value.lt(this.numLimit)) {
            let factorization = primeFactorizeFraction(value.toNumber(), this._maxPrime, this.fractionPrecision, Infinity, this.numLimit, true, this.numLimit, true);
            if (factorization.length == 0) return this.baseInnerNotation.format(1);
            for (let f = 0; f < factorization.length; f++)
            {
                let subresult = this.baseInnerNotation.format(factorization[f][0]);
                if (factorization[f][1] != 1) {
                    let pStr = this.powerString[0] + powerNotation.format(factorization[f][1]) + this.powerString[1];
                    if (this.powerBefore) subresult = pStr + subresult;
                    else subresult += pStr;
                }
                result += subresult;
                if (f < factorization.length - 1) result += this.multiplicationString;
            }
        }
        else {
            if (value.lt(Decimal.iteratedexp(this._powerBase, this.max_tower_height - 2, new Decimal(this.numLimit).tetrate(2)))) {
                let powArray = [];
                let currentValue = value;
                while (currentValue.gte(Decimal.pow(this.numLimit, this.numLimit))) {
                    powArray.push(this._powerBase);
                    currentValue = currentValue.log(this._powerBase);
                }
                let root = currentValue.log(this.numLimit).plus(1).floor();
                currentValue = currentValue.root(root);
                while (currentValue.gte(this.numLimit)) { //Imprecision safeguard
                    root = root.plus(1);
                    currentValue = currentValue.root(root);
                }
                powArray.push(currentValue, root);
                result = this.expChars[0][0] + this.format(powArray[0]);
                for (let p = 1; p < powArray.length; p++) result += this.expChars[0][1] + this.format(powArray[p]);
                result += this.expChars[0][2];
            }
            else {
                let sroot = value.slog(this.numLimit, 100, true).plus(1).floor();
                if (sroot.lt(this.numLimit)) {
                    let currentValue = value.linear_sroot(sroot.toNumber());
                    result = this.expChars[1][0] + this.format(currentValue) + this.expChars[1][1] + this.format(sroot) + this.expChars[1][2];
                }
                else result = this.expChars[1][0] + this.format(this._powerBase) + this.expChars[1][1] + this.format(value.slog(this._powerBase, 100, true)) + this.expChars[1][2];
            }
        }
        return result;
    }

    public get maxPrime() {
        return this._maxPrime;
    }

    public set maxPrime(maxPrime : number) {
        if (maxPrime < 2) throw new RangeError("maxPrime below 2 in Prime Notation");
        this._maxPrime = maxPrime;
    }

    public get powerBase() {
        return this._powerBase;
    }

    public set powerBase(powerBase : number) {
        if (powerBase <= 1.44466786100976613366) throw new RangeError("Bases with convergent tetration don't work as the powerBase for Prime Notation");
        this._powerBase = powerBase;
    }

}