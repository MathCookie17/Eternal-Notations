import Decimal from "break_eternity.js";
import { DecimalSource } from "break_eternity.js";
import { Notation } from "./baseline/notation";

import { DefaultNotation } from "./baseline/defaultNotation";
import { AppliedFunctionNotation } from "./baseline/appliedFunction";
import { ConditionalNotation } from "./baseline/conditional";
import { PredeterminedNotation } from "./baseline/predetermined";
import { AlternateBaseNotation } from "./baseline/alternateBase";
import { FractionNotation } from "./baseline/fraction";
import { SignValueNotation, NestedSignValueNotation} from "./baseline/signValue";

import { ScientificNotation, ScientificIterationsNotation } from "./notations/scientific";
import { LogarithmNotation, MultiLogarithmNotation } from "./notations/logarithm";
import { HyperscientificNotation, HyperscientificIterationsNotation } from "./notations/hyperscientific";
import { SuperLogarithmNotation, MultiSuperLogarithmNotation } from "./notations/superLogarithm";
import { StandardNotation } from "./notations/standard";
import { LettersNotation } from "./notations/letters";
import { ExpandedDefaultNotation } from "./notations/expandedDefault";
import { SINotation, NestedSINotation } from "./notations/SI";
import { HyperSINotation, NestedHyperSINotation } from "./notations/hyperSI";
import { MyriadNotation } from "./notations/myriad";
import { HypersplitNotation } from "./notations/hypersplit";
import { FactorialNotation, MultiFactorialNotation } from "./notations/factorial";
import { FactorialAmountNotation, MultiFactorialAmountNotation } from "./notations/factorialAmount";
import { FactorialScientificNotation, FactorialScientificIterationsNotation } from "./notations/factorialScientific";
import { FactorialHyperscientificNotation, FactorialHyperscientificIterationsNotation } from "./notations/factorialHyperscientific";
import { FactoradicNotation } from "./notations/factoradic";
import { RootNotation, IncreasingRootNotation, MultiRootNotation } from "./notations/root";
import { SuperRootNotation, IncreasingSuperRootNotation, MultiSuperRootNotation } from "./notations/superRoot";
import { PrimeNotation } from "./notations/prime";
import { PsiDashNotation } from "./notations/psiDash";
import { PrestigeLayerNotation } from "./notations/prestigeLayer";
import { IncreasingOperatorNotation } from "./notations/increasingOperator";
import { PolygonalNotation } from "./notations/polygonal";
import { DoubleFactorialsNotation } from "./notations/doubleFactorials";
import { GridNotation } from "./notations/grid";
import { PolynomialNotation } from "./notations/polynomial.js";
import { LetterDigitsNotation } from "./notations/letterDigits";
import { multabs } from "./baseline/utils";

/** This object is where all of the notation presets are stored. Use Presets when outputting to plain text. */
let Presets : { [key: string]: Notation | ((value : number) => Notation) | ((value : Decimal) => Notation) } = {};
/** This object is where all of the notation presets are stored. Use HTMLPresets when outputting to innerHTML. */
let HTMLPresets : { [key: string]: Notation | ((value : number) => Notation) | ((value : Decimal) => Notation) } = {};

function recipBelow(notation : Notation, minnum : DecimalSource, recipStr : [string, string] = ["1 / ", ""], zeroStr : string | null = null) : Notation {
    return new ConditionalNotation(
        false,
        [new PredeterminedNotation((zeroStr) ? zeroStr : "0"), (value) => (value.eq(0) && zeroStr !== null)], // That ternary operator isn't actually needed here, but TypeScript demands it because it doesn't know there's a check to eliminate the null case
        [new AppliedFunctionNotation((value) => value.recip(), notation, (str) => recipStr[0] + str + recipStr[1]), (value) => (value.lt(minnum) && value.neq(0))],
        [notation, (value) => true]
    )
}

function zeroString(notation : Notation, zeroStr : string) : Notation {
    return new ConditionalNotation(
        false,
        [new PredeterminedNotation(zeroStr), (value) => (value.eq(0))], // That ternary operator isn't actually needed here, but TypeScript demands it because it doesn't know there's a check to eliminate the null case
        [notation, (value) => true]
    )
}

function defaultRound(value : Decimal) {
    if (value.eq(0)) return new Decimal(0);
    return value.abs().log10().floor().sub(3).pow_base(10).min(1);
}

function alphabetRound(value : Decimal) {
    if (value.eq(0)) return new Decimal(0);
    return value.abs().log10().floor().sub(2).pow_base(10).min(1);
}

Presets.Default = new DefaultNotation().setName("Default");
HTMLPresets.Default = new DefaultNotation().setName("Default");

Presets.Scientific = new ScientificNotation(...[,,], defaultRound).setName("Scientific");
Presets.Engineering = new ScientificNotation(...[,,], defaultRound, 3).setName("Engineering");
Presets.Logarithm = new MultiLogarithmNotation(...[,,,,,,,,,,,], new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Logarithm");
Presets.Hyperscientific = new HyperscientificNotation(...[,,], defaultRound).setName("Hyperscientific");
Presets.SuperLogarithm = recipBelow(new MultiSuperLogarithmNotation(...[,,,,,,,,,,,,], new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()), 1, undefined, "0").setName("Super Logarithm");
Presets.PowerTower = recipBelow(new MultiLogarithmNotation(1e10, -1, 0, 10, 1, false, [["", ""], ["", ""], [" PT ", ""]], null, true), 1e-10).setName("Power Tower") //Objectively this should be made with Hyperscientific, but I found it easier to do it this way
Presets.PentaScientific = recipBelow(new HypersplitNotation(
    [["", ""], ["", ""], ["", ""], ["G", ""]],
    10, [10, 1, 1], [1, -1, -1, 1], 23
), 1, undefined, "0").setName("Penta-Scientific");
Presets.PentaLogarithm = recipBelow(new HypersplitNotation(
    [["", ""], ["", ""], ["", ""], ["G", ""]],
    10, [0, 1, 1], [-1, -1, -1, 1], 23, ...[,,,], new DefaultNotation(-6, 5, 0, 1e12, 0)
), 1, undefined, "0").setName("Penta-Logarithm");
Presets.NaturalLogarithm = new MultiLogarithmNotation(...[,,,], Math.E, undefined, true, [["e^", ""], ["e^", ""], ["((e^)^", ")"]], ...[,,,,], new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Natural Logarithm");
Presets.NaturalSuperLogarithm = recipBelow(new MultiSuperLogarithmNotation(...[,,,], Math.E, undefined, [["e↑↑", ""], ["e↑↑", ""], ["(e↑↑^", ")"]], ...[,,,,,,], new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()), 1, undefined, "0").setName("Natural Super Logarithm");
Presets.NaturalPentaLogarithm = recipBelow(new HypersplitNotation(
    [["", ""], ["", ""], ["", ""], ["e↑↑↑", ""]],
    Math.E, [0, 1, 1], [-1, -1, -1, 1], 23, ...[,,,], new DefaultNotation(-6, 5, 0, 1e12, 0)
), 1, undefined, "0").setName("Natural Penta-Logarithm");
Presets.LogarithmBase = (base : DecimalSource) => new MultiLogarithmNotation(...[,,,], base, undefined, true, [["↑", ""], ["↑", ""], ["(↑^", ")"]], null, false, 1, 1, new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Logarithm (base " + new DefaultNotation().format(base) + ")");
Presets.SuperLogarithmBase = (base : DecimalSource) => recipBelow(new MultiSuperLogarithmNotation(...[,,,], base, undefined, [["↑↑", ""], ["↑↑", ""], ["(↑↑^", ")"]], null, false, 1, ...[,,,], new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()), 1, undefined, "0").setName("Super Logarithm (base " + new DefaultNotation().format(base) + ")");
Presets.PentaLogarithmBase = (base : DecimalSource) => recipBelow(new AppliedFunctionNotation(
    (value) => value,
    new HypersplitNotation(
        [["", ""], ["", ""], ["", ""], ["↑↑↑", ""]],
        base, [0, 1, 1], [-1, -1, -1, 1], 23, ...[,,,], new DefaultNotation(-6, 5, 0, 1e12, 0)
    ),
    (str) => new DefaultNotation().format(base) + str
    ), 1, undefined, "0").setName("Penta-Logarithm (base " + new DefaultNotation().format(base) + ")")
Presets.DoubleLogarithm = new MultiLogarithmNotation(undefined, undefined, 2, undefined, 2, ...[,,,,,,], new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Double Logarithm");
HTMLPresets.Scientific = new ScientificNotation(...[,,], defaultRound).setName("Scientific");
HTMLPresets.Engineering = new ScientificNotation(...[,,], defaultRound, 3).setName("Engineering");
HTMLPresets.Logarithm = new MultiLogarithmNotation(...[,,,,,,,,,,,], new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Logarithm");
HTMLPresets.Hyperscientific = new HyperscientificNotation(...[,,], defaultRound).setName("Hyperscientific");
HTMLPresets.SuperLogarithm =  recipBelow(new MultiSuperLogarithmNotation(...[,,,,,,,,,,,,], new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()), 1, undefined, "0").setName("Super Logarithm");
HTMLPresets.PowerTower = recipBelow(new MultiLogarithmNotation(1e10, -1, 0, 10, 1, false, [["", ""], ["", ""], [" PT ", ""]], null, true), 1e-10).setName("Power Tower") //Objectively this should be made with Hyperscientific, but I found it easier to do it this way
HTMLPresets.PentaScientific = recipBelow(new HypersplitNotation(
    [["", ""], ["", ""], ["", ""], ["G", ""]],
    10, [10, 1, 1], [1, -1, -1, 1], 23
), 1, undefined, "0").setName("Penta-Scientific");
HTMLPresets.PentaLogarithm = recipBelow(new HypersplitNotation(
    [["", ""], ["", ""], ["", ""], ["G", ""]],
    10, [0, 1, 1], [-1, -1, -1, 1], 23, ...[,,,], new DefaultNotation(-6, 5, 0, 1e12, 0)
), 1, undefined, "0").setName("Penta-Logarithm");
HTMLPresets.NaturalLogarithm = new MultiLogarithmNotation(...[,,,], Math.E, undefined, true, [["e^", ""], ["e^", ""], ["((e^)^", ")"]], ...[,,,,], new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Natural Logarithm");
HTMLPresets.NaturalSuperLogarithm = recipBelow(new MultiSuperLogarithmNotation(...[,,,], Math.E, undefined, [["e&#8593;&#8593;", ""], ["e&#8593;&#8593;", ""], ["(e&#8593;&#8593;^", ")"]], ...[,,,,,,], new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()), 1, undefined, "0").setName("Natural Super Logarithm");
HTMLPresets.NaturalPentaLogarithm = recipBelow(new HypersplitNotation(
    [["", ""], ["", ""], ["", ""], ["e↑↑↑", ""]],
    Math.E, [0, 1, 1], [-1, -1, -1, 1], 23, ...[,,,], new DefaultNotation(-6, 5, 0, 1e12, 0)
), 1, undefined, "0").setName("Natural Penta-Logarithm");
HTMLPresets.LogarithmBase = (base : DecimalSource) => new MultiLogarithmNotation(...[,,,], base, undefined, true, [["&#8593;", ""], ["&#8593;", ""], ["(&#8593;^", ")"]], null, false, 1, 1, new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Logarithm (base " + new DefaultNotation().format(base) + ")");
HTMLPresets.SuperLogarithmBase = (base : DecimalSource) => recipBelow(new MultiSuperLogarithmNotation(...[,,,], base, undefined, [["&#8593;&#8593;", ""], ["&#8593;&#8593;", ""], ["(&#8593;&#8593;^", ")"]], null, false, 1, ...[,,,], new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()), 1, undefined, "0").setName("Super Logarithm (base " + new DefaultNotation().format(base) + ")");
HTMLPresets.PentaLogarithmBase = (base : DecimalSource) => recipBelow(new AppliedFunctionNotation(
    (value) => value,
    new HypersplitNotation(
        [["", ""], ["", ""], ["", ""], ["&#8593;&#8593;&#8593;", ""]],
        base, [0, 1, 1], [-1, -1, -1, 1], 23, ...[,,,], new DefaultNotation(-6, 5, 0, 1e12, 0)
    ),
    (str) => new DefaultNotation().format(base) + str
    ), 1, undefined, "0").setName("Penta-Logarithm (base " + new DefaultNotation().format(base) + ")")
HTMLPresets.DoubleLogarithm = new MultiLogarithmNotation(undefined, undefined, 2, undefined, 2, ...[,,,,,,], new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()).setName("Double Logarithm");

Presets.AlternateBase = (base : number) => new AlternateBaseNotation(base).setName("Base " + new DefaultNotation().format(base));
Presets.Binary = new AlternateBaseNotation(2, 0, -8, -8, 0, 65536, 1/256, ...[,,,,,], 4, ...[,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Binary");
Presets.Ternary = new AlternateBaseNotation(3, 0, -7, -7, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Ternary");
Presets.Quaternary = new AlternateBaseNotation(4, 0, -6, -6, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Quaternary");
Presets.Seximal = new AlternateBaseNotation(6, 0, -5, -5, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Seximal");
Presets.Octal = new AlternateBaseNotation(8, ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Octal");
Presets.Duodecimal = new AlternateBaseNotation(12, ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Duodecimal");
Presets.DozenalXE = new AlternateBaseNotation(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "E"], ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Dozenal (X, E)");
Presets.Dozenal23 = new AlternateBaseNotation(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "↊", "↋"], ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Dozenal (↊, ↋)");
Presets.Hexadecimal = new AlternateBaseNotation(16, ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Hexadecimal");
Presets.BalancedTernary = new AlternateBaseNotation(["-", "0", "+"], 1, -7, -7, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Balanced Ternary");
Presets.BijectiveDecimal = recipBelow(new AlternateBaseNotation(["1", "2", "3", "4", "5", "6", "7", "8", "9", "A"], -1, 0, 0, ...[,,,,], 3, 1, ...[,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]), 1).setName("Bijective Decimal");
HTMLPresets.AlternateBase = (base : number) => new AlternateBaseNotation(base).setName("Base " + new DefaultNotation().format(base));
HTMLPresets.Binary = new AlternateBaseNotation(2, 0, -8, -8, 0, 65536, 1/256, ...[,,,,,], 4, ...[,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Binary");
HTMLPresets.Ternary = new AlternateBaseNotation(3, 0, -7, -7, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Ternary");
HTMLPresets.Quaternary = new AlternateBaseNotation(4, 0, -6, -6, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Quaternary");
HTMLPresets.Seximal = new AlternateBaseNotation(6, 0, -5, -5, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Seximal");
HTMLPresets.Octal = new AlternateBaseNotation(8, ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Octal");
HTMLPresets.Duodecimal = new AlternateBaseNotation(12, ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Duodecimal");
HTMLPresets.DozenalXE = new AlternateBaseNotation(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "E"], ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Dozenal (X, E)");
HTMLPresets.Dozenal23 = new AlternateBaseNotation(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "&#x218A;", "&#x218B;"], ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Dozenal (↊, ↋)");
HTMLPresets.Hexadecimal = new AlternateBaseNotation(16, ...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]).setName("Hexadecimal");
HTMLPresets.BalancedTernary = new AlternateBaseNotation(["-", "0", "+"], 1, -7, -7, ...[,,,,,,,,,,,], [["e", ""], ["e", ""], ["F", ""], ["F", ""]]).setName("Balanced Ternary");
HTMLPresets.BijectiveDecimal = recipBelow(new AlternateBaseNotation(["1", "2", "3", "4", "5", "6", "7", "8", "9", "A"], -1, 0, 0, ...[,,,,], 3, 1, ...[,,,,,], [["e", ""], ["e", ""], ["#", ""], ["#", ""]]), 1).setName("Bijective Decimal");

Presets.Standard = new StandardNotation(0, false, defaultRound).setName("Standard");
Presets.LongScale = new StandardNotation(0, true, defaultRound).setName("Long Scale");
Presets.ADStandard = new StandardNotation(1, false, defaultRound).setName("AD Standard");
Presets.ADLongScale = new StandardNotation(1, true, defaultRound).setName("AD Long Scale");
Presets.AarexStandard = new StandardNotation(2, false, defaultRound).setName("Aarex Standard");
Presets.AarexLongScale = new StandardNotation(2, true, defaultRound).setName("Aarex Long Scale");
HTMLPresets.Standard = new StandardNotation(0, false, defaultRound).setName("Standard");
HTMLPresets.LongScale = new StandardNotation(0, true, defaultRound).setName("Long Scale");
HTMLPresets.ADStandard = new StandardNotation(1, false, defaultRound).setName("AD Standard");
HTMLPresets.ADLongScale = new StandardNotation(1, true, defaultRound).setName("AD Long Scale");
HTMLPresets.AarexStandard = new StandardNotation(2, false, defaultRound).setName("Aarex Standard");
HTMLPresets.AarexLongScale = new StandardNotation(2, true, defaultRound).setName("Aarex Long Scale");

Presets.MixedScientific = new ScientificNotation(1e66, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(0, false, defaultRound), (value) => value.lt(1e66)], [new ScientificNotation(), (value) => true])).setName("Mixed Scientific");
Presets.MixedScientificLongScale = new ScientificNotation(1e126, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(0, true, defaultRound), (value) => value.lt(1e126)], [new ScientificNotation(), (value) => true])).setName("Mixed Scientific (Long Scale)");
Presets.ADMixedScientific = new ScientificNotation(1e33, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(1, false, defaultRound), (value) => value.lt(1e33)], [new ScientificNotation(), (value) => true])).setName("AD Mixed Scientific");
Presets.ADMixedScientificLongScale = new ScientificNotation(1e60, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(1, true, defaultRound), (value) => value.lt(1e60)], [new ScientificNotation(), (value) => true])).setName("AD Mixed Scientific (Long Scale)");
Presets.AarexMixedScientific = new ScientificNotation(1e36, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(2, false, defaultRound), (value) => value.lt(1e36)], [new ScientificNotation(), (value) => true])).setName("Aarex Mixed Scientific");
Presets.AarexMixedScientificLongScale = new ScientificNotation(1e66, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(2, true, defaultRound), (value) => value.lt(1e66)], [new ScientificNotation(), (value) => true])).setName("Aarex Mixed Scientific (Long Scale)");
HTMLPresets.MixedScientific = new ScientificNotation(1e66, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(0, false, defaultRound), (value) => value.lt(1e66)], [new ScientificNotation(), (value) => true])).setName("Mixed Scientific");
HTMLPresets.MixedScientificLongScale = new ScientificNotation(1e126, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(0, true, defaultRound), (value) => value.lt(1e126)], [new ScientificNotation(), (value) => true])).setName("Mixed Scientific (Long Scale)");
HTMLPresets.ADMixedScientific = new ScientificNotation(1e33, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(1, false, defaultRound), (value) => value.lt(1e33)], [new ScientificNotation(), (value) => true])).setName("AD Mixed Scientific");
HTMLPresets.ADMixedScientificLongScale = new ScientificNotation(1e60, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(1, true, defaultRound), (value) => value.lt(1e60)], [new ScientificNotation(), (value) => true])).setName("AD Mixed Scientific (Long Scale)");
HTMLPresets.AarexMixedScientific = new ScientificNotation(1e36, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(2, false, defaultRound), (value) => value.lt(1e36)], [new ScientificNotation(), (value) => true])).setName("Aarex Mixed Scientific");
HTMLPresets.AarexMixedScientificLongScale = new ScientificNotation(1e66, ...[,,,,], true, ...[,,,,,,], new ConditionalNotation(false, [new StandardNotation(2, true, defaultRound), (value) => value.lt(1e66)], [new ScientificNotation(), (value) => true])).setName("Aarex Mixed Scientific (Long Scale)");

Presets.Letters = new LettersNotation(...[,,], defaultRound).setName("Letters");
Presets.Alphabet = new LettersNotation(
    [
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    ], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true
).setName("Alphabet");
Presets.GreekLetters = new LettersNotation(
    [
        ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω"],
        ["Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"],
        ["Ϝ"]
    ], -1, defaultRound
).setName("Greek Letters");
Presets.GreekAlphabet = new LettersNotation(
    [
        ["ϙ","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"],
        ["ϙ","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"],
        ["ϙ","α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"]
    ], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true
).setName("Greek Alphabet");
Presets.ADGreekLetters = new LettersNotation(
    [
        ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"],
        ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"],
        ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"]
    ], -1, defaultRound, 1000, 9, "", "", "|", true, new DefaultNotation(), 0, false, true
).setName("AD Greek Letters");
Presets.Emoji = new LettersNotation(
    [
        ["😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡"],
        ["🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "👁️‍🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"],
        ["𓁨"]
    ], -1, defaultRound
).setName("Emoji");
Presets.EmojiAlphabet = new LettersNotation(
    [
        ["🚫", "😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡", "🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "👁️‍🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"],
        ["🚫", "😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡", "🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "👁️‍🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"],
        ["🚫", "😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡", "🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "👁️‍🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"]
    ], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true
).setName("Emoji Alphabet");
Presets.XYZ = new LettersNotation([["X"], ["Y"], ["Z"]], 0, defaultRound, 10, 9, "", "", "", false, new DefaultNotation(), 5).setName("XYZ");
Presets.ElementLetters = new LettersNotation(
    [
        ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Eb","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"],
        ["H\u0305","H\u0305e\u0305","L\u0305i\u0305","B\u0305e\u0305","B\u0305","C\u0305","N\u0305","O\u0305","F\u0305","N\u0305e\u0305","N\u0305a\u0305","M\u0305g\u0305","A\u0305l\u0305","S\u0305i\u0305","P\u0305","S\u0305","C\u0305l\u0305","A\u0305r\u0305","K\u0305","C\u0305a\u0305","S\u0305c\u0305","T\u0305i\u0305","V\u0305","C\u0305r\u0305","M\u0305n\u0305","F\u0305e\u0305","C\u0305o\u0305","N\u0305i\u0305","C\u0305u\u0305","Z\u0305n\u0305","G\u0305a\u0305","G\u0305e\u0305","A\u0305s\u0305","S\u0305e\u0305","B\u0305r\u0305","K\u0305r\u0305","R\u0305b\u0305","S\u0305r\u0305","Y\u0305","Z\u0305r\u0305","N\u0305b\u0305","M\u0305o\u0305","T\u0305c\u0305","R\u0305u\u0305","R\u0305h\u0305","P\u0305d\u0305","A\u0305g\u0305","C\u0305d\u0305","I\u0305n\u0305","S\u0305n\u0305","S\u0305b\u0305","T\u0305e\u0305","I\u0305","X\u0305e\u0305","C\u0305s\u0305","B\u0305a\u0305","L\u0305a\u0305","C\u0305e\u0305","P\u0305r\u0305","N\u0305d\u0305","P\u0305m\u0305","S\u0305m\u0305","E\u0305u\u0305","G\u0305d\u0305","T\u0305b\u0305","D\u0305y\u0305","H\u0305o\u0305","E\u0305b\u0305","T\u0305m\u0305","Y\u0305b\u0305","L\u0305u\u0305","H\u0305f\u0305","T\u0305a\u0305","W\u0305","R\u0305e\u0305","O\u0305s\u0305","I\u0305r\u0305","P\u0305t\u0305","A\u0305u\u0305","H\u0305g\u0305","T\u0305l\u0305","P\u0305b\u0305","B\u0305i\u0305","P\u0305o\u0305","A\u0305t\u0305","R\u0305n\u0305","F\u0305r\u0305","R\u0305a\u0305","A\u0305c\u0305","T\u0305h\u0305","P\u0305a\u0305","U\u0305","N\u0305p\u0305","P\u0305u\u0305","A\u0305m\u0305","C\u0305m\u0305","B\u0305k\u0305","C\u0305f\u0305","E\u0305s\u0305","F\u0305m\u0305","M\u0305d\u0305","N\u0305o\u0305","L\u0305r\u0305","R\u0305f\u0305","D\u0305b\u0305","S\u0305g\u0305","B\u0305h\u0305","H\u0305s\u0305","M\u0305t\u0305","D\u0305s\u0305","R\u0305g\u0305","C\u0305n\u0305","N\u0305h\u0305","F\u0305l\u0305","M\u0305c\u0305","L\u0305v\u0305","T\u0305s\u0305","O\u0305g\u0305"],
        ["☢"]
    ],
    -1, defaultRound, 118, 12, " ", "", "", false, undefined, 5, undefined, undefined, ["", "-"], undefined, undefined, [[true, "[", "]", new DefaultNotation()], [true, "[", "]", new DefaultNotation()], null]
).setName("Element Letters");
HTMLPresets.Letters = new LettersNotation(...[,,], defaultRound).setName("Letters");
HTMLPresets.Alphabet = new LettersNotation(
    [
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    ], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true
).setName("Alphabet");
HTMLPresets.GreekLetters = new LettersNotation(
    [
        ["&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;"],
        ["&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"],
        ["&#x3DC;"]
    ], -1, defaultRound
).setName("Greek Letters");
HTMLPresets.GreekAlphabet = new LettersNotation(
    [
        ["&#x3D9;","&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;","&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"],
        ["&#x3D9;","&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;","&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"],
        ["&#x3D9;","&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;","&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"]
    ], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true
).setName("Greek Alphabet");
HTMLPresets.ADGreekLetters = new LettersNotation(
    [
        ["&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;","&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"],
        ["&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;","&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"],
        ["&#x3B1;","&#x3B2;","&#x3B3;","&#x3B4;","&#x3B5;","&#x3B6;","&#x3B7;","&#x3B8;","&#x3B9;","&#x3BA;","&#x3BB;","&#x3BC;","&#x3BD;","&#x3BE;","&#x3BF;","&#x3C0;","&#x3C1;","&#x3C3;","&#x3C4;","&#x3C5;","&#x3C6;","&#x3C7;","&#x3C8;","&#x3C9;","&#x391;","&#x392;","&#x393;","&#x394;","&#x395;","&#x396;","&#x397;","&#x398;","&#x399;","&#x39A;","&#x39B;","&#x39C;","&#x39D;","&#x39E;","&#x39F;","&#x3A0;","&#x3A1;","&#x3A3;","&#x3A4;","&#x3A5;","&#x3A6;","&#x3A7;","&#x3A8;","&#x3A9;"]
    ], -1, defaultRound, 1000, 9, "", "", "|", true, new DefaultNotation(), 0, false, true
).setName("AD Greek Letters");
HTMLPresets.Emoji = new LettersNotation(
    [
        ["&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;"],
        ["&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F441;&#xFE0F;&#x200D;&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"],
        ["&#x13068;"]
    ], -1, defaultRound
).setName("Emoji");
HTMLPresets.EmojiAlphabet = new LettersNotation(
    [
        ["&#x1F6AB;", "&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;", "&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F441;&#xFE0F;&#x200D;&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"],
        ["&#x1F6AB;", "&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;", "&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F441;&#xFE0F;&#x200D;&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"],
        ["&#x1F6AB;", "&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;", "&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F441;&#xFE0F;&#x200D;&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"]
    ], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true
).setName("Emoji Alphabet");
HTMLPresets.XYZ = new LettersNotation([["X"], ["Y"], ["Z"]], 0, defaultRound, 10, 9, "", "", "", false, new DefaultNotation(), 5).setName("XYZ");
HTMLPresets.ElementLetters = new LettersNotation(
    [
        ["H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Eb","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"],
        [
            "<span style='text-decoration: overline'>H</span>","<span style='text-decoration: overline'>He</span>","<span style='text-decoration: overline'>Li</span>","<span style='text-decoration: overline'>Be</span>","<span style='text-decoration: overline'>B</span>","<span style='text-decoration: overline'>C</span>","<span style='text-decoration: overline'>N</span>","<span style='text-decoration: overline'>O</span>","<span style='text-decoration: overline'>F</span>","<span style='text-decoration: overline'>Ne</span>","<span style='text-decoration: overline'>Na</span>","<span style='text-decoration: overline'>Mg</span>","<span style='text-decoration: overline'>Al</span>","<span style='text-decoration: overline'>Si</span>","<span style='text-decoration: overline'>P</span>","<span style='text-decoration: overline'>S</span>","<span style='text-decoration: overline'>Cl</span>","<span style='text-decoration: overline'>Ar</span>",
            "<span style='text-decoration: overline'>K</span>","<span style='text-decoration: overline'>Ca</span>","<span style='text-decoration: overline'>Sc</span>","<span style='text-decoration: overline'>Ti</span>","<span style='text-decoration: overline'>V</span>","<span style='text-decoration: overline'>Cr</span>","<span style='text-decoration: overline'>Mn</span>","<span style='text-decoration: overline'>Fe</span>","<span style='text-decoration: overline'>Co</span>","<span style='text-decoration: overline'>Ni</span>","<span style='text-decoration: overline'>Cu</span>","<span style='text-decoration: overline'>Zn</span>","<span style='text-decoration: overline'>Ga</span>","<span style='text-decoration: overline'>Ge</span>","<span style='text-decoration: overline'>As</span>","<span style='text-decoration: overline'>Se</span>","<span style='text-decoration: overline'>Br</span>","<span style='text-decoration: overline'>Kr</span>",
            "<span style='text-decoration: overline'>Rb</span>","<span style='text-decoration: overline'>Sr</span>","<span style='text-decoration: overline'>Y</span>","<span style='text-decoration: overline'>Zr</span>","<span style='text-decoration: overline'>Nb</span>","<span style='text-decoration: overline'>Mo</span>","<span style='text-decoration: overline'>Tc</span>","<span style='text-decoration: overline'>Ru</span>","<span style='text-decoration: overline'>Rh</span>","<span style='text-decoration: overline'>Pd</span>","<span style='text-decoration: overline'>Ag</span>","<span style='text-decoration: overline'>Cd</span>","<span style='text-decoration: overline'>In</span>","<span style='text-decoration: overline'>Sn</span>","<span style='text-decoration: overline'>Sb</span>","<span style='text-decoration: overline'>Te</span>","<span style='text-decoration: overline'>I</span>","<span style='text-decoration: overline'>Xe</span>",
            "<span style='text-decoration: overline'>Cs</span>","<span style='text-decoration: overline'>Ba</span>","<span style='text-decoration: overline'>La</span>","<span style='text-decoration: overline'>Ce</span>","<span style='text-decoration: overline'>Pr</span>","<span style='text-decoration: overline'>Nd</span>","<span style='text-decoration: overline'>Pm</span>","<span style='text-decoration: overline'>Sm</span>","<span style='text-decoration: overline'>Eu</span>","<span style='text-decoration: overline'>Gd</span>","<span style='text-decoration: overline'>Tb</span>","<span style='text-decoration: overline'>Dy</span>","<span style='text-decoration: overline'>Ho</span>","<span style='text-decoration: overline'>Eb</span>","<span style='text-decoration: overline'>Tm</span>","<span style='text-decoration: overline'>Yb</span>","<span style='text-decoration: overline'>Lu</span>","<span style='text-decoration: overline'>Hf</span>","<span style='text-decoration: overline'>Ta</span>","<span style='text-decoration: overline'>W</span>","<span style='text-decoration: overline'>Re</span>","<span style='text-decoration: overline'>Os</span>","<span style='text-decoration: overline'>Ir</span>","<span style='text-decoration: overline'>Pt</span>","<span style='text-decoration: overline'>Au</span>","<span style='text-decoration: overline'>Hg</span>","<span style='text-decoration: overline'>Tl</span>","<span style='text-decoration: overline'>Pb</span>","<span style='text-decoration: overline'>Bi</span>","<span style='text-decoration: overline'>Po</span>","<span style='text-decoration: overline'>At</span>","<span style='text-decoration: overline'>Rn</span>",
            "<span style='text-decoration: overline'>Fr</span>","<span style='text-decoration: overline'>Ra</span>","<span style='text-decoration: overline'>Ac</span>","<span style='text-decoration: overline'>Th</span>","<span style='text-decoration: overline'>Pa</span>","<span style='text-decoration: overline'>U</span>","<span style='text-decoration: overline'>Np</span>","<span style='text-decoration: overline'>Pu</span>","<span style='text-decoration: overline'>Am</span>","<span style='text-decoration: overline'>Cm</span>","<span style='text-decoration: overline'>Bk</span>","<span style='text-decoration: overline'>Cf</span>","<span style='text-decoration: overline'>Es</span>","<span style='text-decoration: overline'>Fm</span>","<span style='text-decoration: overline'>Md</span>","<span style='text-decoration: overline'>No</span>","<span style='text-decoration: overline'>Lr</span>","<span style='text-decoration: overline'>Rf</span>","<span style='text-decoration: overline'>Db</span>","<span style='text-decoration: overline'>Sg</span>","<span style='text-decoration: overline'>Bh</span>","<span style='text-decoration: overline'>Hs</span>","<span style='text-decoration: overline'>Mt</span>","<span style='text-decoration: overline'>Ds</span>","<span style='text-decoration: overline'>Rg</span>","<span style='text-decoration: overline'>Cn</span>","<span style='text-decoration: overline'>Nh</span>","<span style='text-decoration: overline'>Fl</span>","<span style='text-decoration: overline'>Mc</span>","<span style='text-decoration: overline'>Lv</span>","<span style='text-decoration: overline'>Ts</span>","<span style='text-decoration: overline'>Og</span>"
        ],
        ["&#x2622;"]
    ],
    -1, defaultRound, 118, 12, " ", "", "", false, undefined, 5, undefined, undefined, ["", "-"], undefined, undefined, [[true, "<sub>", "</sub>", new DefaultNotation()], [true, "<sub>", "</sub>", new DefaultNotation()], null]
).setName("Element Letters");

Presets.RomanNumerals = recipBelow(new NestedSignValueNotation([
    ["M̅", 1000000], ["C̅M̅", 900000], ["D̅", 500000], ["C̅D̅", 400000], ["C̅", 100000], ["X̅C̅", 90000], ["L̅", 50000],
    ["X̅L̅", 40000], ["X̅", 10000], ["MX̅", 9000], ["V̅", 5000], ["MV̅", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5],
    ["⁙", 5/12], ["∷", 4/12], ["∴", 3/12], [":", 2/12], ["·", 1/12]
], 1/12), 1/12, ["I / ", ""], "nulla").setName("Roman Numerals");
Presets.ADRoman = new ExpandedDefaultNotation(4000000, 1/12, 5, 4000000, 0, 0, 1, undefined, undefined, [["↑", ""], ["I↑", ""], ["↑↑", ""], ["I↑↑", ""]], [false, ["I / ", ""]], false, false, 1, 1,
    new SignValueNotation([
        ["M̅", 1000000], ["C̅M̅", 900000], ["D̅", 500000], ["C̅D̅", 400000], ["C̅", 100000], ["X̅C̅", 90000], ["L̅", 50000],
        ["X̅L̅", 40000], ["X̅", 10000], ["MX̅", 9000], ["V̅", 5000], ["MV̅", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
        ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5],
        ["⁙", 5/12], ["∷", 4/12], ["∴", 3/12], [":", 2/12], ["·", 1/12]
    ], 1/12, ...[,,,,,], "nulla"), undefined, [true, true]).setName("AD Roman");
Presets.Septecoman = new ExpandedDefaultNotation(17**7, 1/289, 3, 17, 1/289, 0, 1, [17, 7], [1], [["[", "]"], ["[", "]I"], ["{", "}"], ["{", "}I"]], [false, ["I / ", ""]], true, true, 1/17, 1/17,
    new SignValueNotation([
        ["OE", 17**6 * 7], ["TEOE", 17**6 * 6], ["TETEOE", 17**6 * 5], ["TE", 17**6], 
        ["NE", 17**5 * 7], ["DENE", 17**5 * 6], ["DEDENE", 17**5 * 5], ["DE", 17**5], 
        ["SE", 17**4 * 7], ["ESE", 17**4 * 6], ["EESE", 17**4 * 5], ["E", 17**4], 
        ["H", 17**3 * 7], ["FH", 17**3 * 6], ["FFH", 17**3 * 5], ["F", 17**3], 
        ["O", 17**2 * 7], ["TO", 17**2 * 6], ["TTO", 17**2 * 5], ["T", 17**2], 
        ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], 
        ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1],
        ["Ƨ", 17**-1 * 7], ["ꓷƧ", 17**-1 * 6], ["ꓷꓷƧ", 17**-1 * 5], ["ꓷ", 17**-1],
        ["И", 17**-2 * 7], ["ꓕИ", 17**-2 * 6], ["ꓕꓕИ", 17**-2 * 5], ["ꓕ", 17**-2]
    ], 1/289, ...[,,,,,], "Z"), new SignValueNotation([
        ["OE", 17**6 * 7], ["TEOE", 17**6 * 6], ["TETEOE", 17**6 * 5], ["TE", 17**6], 
        ["NE", 17**5 * 7], ["DENE", 17**5 * 6], ["DEDENE", 17**5 * 5], ["DE", 17**5], 
        ["SE", 17**4 * 7], ["ESE", 17**4 * 6], ["EESE", 17**4 * 5], ["E", 17**4], 
        ["H", 17**3 * 7], ["FH", 17**3 * 6], ["FFH", 17**3 * 5], ["F", 17**3], 
        ["O", 17**2 * 7], ["TO", 17**2 * 6], ["TTO", 17**2 * 5], ["T", 17**2], 
        ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], 
        ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1],
        ["Ƨ", 0.4117], ["ꓷƧ", 0.3529], ["ꓷꓷƧ", 0.2941], ["ꓷ", 0.0588]
    ], 1/289), [true, true]).setName("Septecoman");
HTMLPresets.RomanNumerals = recipBelow(new NestedSignValueNotation([
    ["M&#x305;", 1000000], ["C&#x305;M&#x305;", 900000], ["D&#x305;", 500000], ["C&#x305;D&#x305;", 400000], ["C&#x305;", 100000], ["X̅C&#x305;", 90000], ["L&#x305;", 50000],
    ["X&#x305;L&#x305;", 40000], ["X&#x305;", 10000], ["MX&#x305;", 9000], ["V&#x305;", 5000], ["MV&#x305;", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5],
    ["&#x2059;", 5/12], ["&#x2237;", 4/12], ["&#x2234;", 3/12], [":", 2/12], ["&#xB7;", 1/12]
], 1/12), 1/12, ["I / ", ""], "nulla").setName("Roman Numerals");
HTMLPresets.ADRoman = new ExpandedDefaultNotation(4000000, 1/12, 5, 4000000, 0, 0, 1, undefined, undefined, [["&#8593;", ""], ["I&#8593;", ""], ["&#8593;&#8593;", ""], ["I&#8593;&#8593;", ""]], [false, ["I / ", ""]], false, false, 1, 1,
    new SignValueNotation([
        ["M&#x305;", 1000000], ["C&#x305;M&#x305;", 900000], ["D&#x305;", 500000], ["C&#x305;D&#x305;", 400000], ["C&#x305;", 100000], ["X̅C&#x305;", 90000], ["L&#x305;", 50000],
        ["X&#x305;L&#x305;", 40000], ["X&#x305;", 10000], ["MX&#x305;", 9000], ["V&#x305;", 5000], ["MV&#x305;", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
        ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5],
        ["&#x2059;", 5/12], ["&#x2237;", 4/12], ["&#x2234;", 3/12], [":", 2/12], ["&#xB7;", 1/12]
    ], 1/12, ...[,,,,,], "nulla"), undefined, [true, true]).setName("AD Roman");
HTMLPresets.Septecoman = new ExpandedDefaultNotation(17**7, 1/289, 3, 17, 1/289, 0, 1, [17, 7], [1], [["[", "]"], ["[", "]I"], ["{", "}"], ["{", "}I"]], [false, ["I / ", ""]], true, true, 1/17, 1/17,
new SignValueNotation([
    ["OE", 17**6 * 7], ["TEOE", 17**6 * 6], ["TETEOE", 17**6 * 5], ["TE", 17**6], 
    ["NE", 17**5 * 7], ["DENE", 17**5 * 6], ["DEDENE", 17**5 * 5], ["DE", 17**5], 
    ["SE", 17**4 * 7], ["ESE", 17**4 * 6], ["EESE", 17**4 * 5], ["E", 17**4], 
    ["H", 17**3 * 7], ["FH", 17**3 * 6], ["FFH", 17**3 * 5], ["F", 17**3], 
    ["O", 17**2 * 7], ["TO", 17**2 * 6], ["TTO", 17**2 * 5], ["T", 17**2], 
    ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], 
    ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1],
    ["&#x1A7;", 17**-1 * 7], ["&#xA4F7;&#x1A7;", 17**-1 * 6], ["&#xA4F7;&#xA4F7;&#x1A7;", 17**-1 * 5], ["&#xA4F7;", 17**-1],
    ["&#x418;", 17**-2 * 7], ["&#xA4D5;&#x418;", 17**-2 * 6], ["&#xA4D5;&#xA4D5;&#x418;", 17**-2 * 5], ["&#xA4D5;", 17**-2]
], 1/289, ...[,,,,,], "Z"), new SignValueNotation([
    ["OE", 17**6 * 7], ["TEOE", 17**6 * 6], ["TETEOE", 17**6 * 5], ["TE", 17**6], 
    ["NE", 17**5 * 7], ["DENE", 17**5 * 6], ["DEDENE", 17**5 * 5], ["DE", 17**5], 
    ["SE", 17**4 * 7], ["ESE", 17**4 * 6], ["EESE", 17**4 * 5], ["E", 17**4], 
    ["H", 17**3 * 7], ["FH", 17**3 * 6], ["FFH", 17**3 * 5], ["F", 17**3], 
    ["O", 17**2 * 7], ["TO", 17**2 * 6], ["TTO", 17**2 * 5], ["T", 17**2], 
    ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], 
    ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1],
    ["&#x1A7;", 0.4117], ["&#xA4F7;&#x1A7;", 0.3529], ["&#xA4F7;&#xA4F7;&#x1A7;", 0.2941], ["&#xA4F7;", 0.0588]
], 1/289), [true, true]).setName("Septecoman");

Presets.SI = new NestedSINotation(...[,,,,], defaultRound).setName("SI");
Presets.SIWritten = new NestedSINotation(
    10,
    [["quetta", 30], ["ronna", 27], ["yotta", 24], ["zetta", 21], ["exa", 18], ["peta", 15], ["tera", 12], ["giga", 9], ["mega", 6], ["kilo", 3]],
    [["quecto", 30], ["ronto", 27], ["yocto", 24], ["zepto", 21], ["atto", 18], ["femto", 15], ["pico", 12], ["nano", 9], ["micro", 6], ["milli", 3]],
    true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]
).setName("SI (Written)");
Presets.BinarySI = new NestedSINotation(
    2,
    [["Yi", 80], ["Zi", 70], ["Ei", 60], ["Pi", 50], ["Ti", 40], ["Gi", 30], ["Mi", 20], ["Ki", 10]],
    "/", true, defaultRound
).setName("Binary SI");
Presets.BinarySIWritten = new NestedSINotation(
    2,
    [["yobi", 80], ["zebi", 70], ["exbi", 60], ["pebi", 50], ["tebi", 40], ["gibi", 30], ["mebi", 20], ["kibi", 10]],
    "/",
    true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]
).setName("Binary SI (Written)");
Presets.CombinedD = new NestedSINotation(
    10,
    [["D", 33], ["N", 30], ["O", 27], ["Sp", 24], ["Sx", 21], ["Qi", 18], ["Qa", 15], ["T", 12], ["B", 9], ["M", 6]],
    "/", true, defaultRound, 2, 3, 0, 0, "", "*"
).setName("Combined-D");
Presets.HyperSI = new NestedHyperSINotation(...[,,,,], defaultRound).setName("Hyper-SI");
Presets.HyperSIWritten = new NestedHyperSINotation(
    10,
    [["deckerexi-", 10], ["tenebexi-", 9], ["cloctexi-", 8], ["hypocexi-", 7], ["alifexi-", 6], ["madenexi-", 5], ["swekexi-", 4], ["brinexi-", 3], ["digexi-", 2], ["plexi-", 1]],
    [["nepogo-", 2], ["logo-", 1]],
    true, defaultRound, 2, 0, " ", "", ["^(", ")"]
).setName("Hyper-SI (Written)");
Presets.SandcastleBuilder = new NestedSINotation(
    10,
    [["Q", 210], ["W", 42], ["L", 39], ["F", 36], ["H", 33], ["S", 30], ["U", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["K", 3]],
    "/", true, defaultRound
).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder");
Presets.SandcastleBuilderWritten = new NestedSINotation(
    10,
    [["Quita", 210], ["Wololo", 42], ["Lotta", 39], ["Ferro", 36], ["Helo", 33], ["Squilli", 30], ["Umpty", 27], ["Yotta", 24], ["Zetta", 21], ["Exa", 18], ["Peta", 15], ["Tera", 12], ["Giga", 9], ["Mega", 6], ["Kilo", 3]],
    "/ ", true, defaultRound, 4, 3, 0, 0, " ", " ", [["^(", ")"], ["^^(", ")"]]
).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder (Written)");
HTMLPresets.SI = new NestedSINotation(...[,,,,], defaultRound).setName("SI");
HTMLPresets.SIWritten = new NestedSINotation(
    10,
    [["quetta", 30], ["ronna", 27], ["yotta", 24], ["zetta", 21], ["exa", 18], ["peta", 15], ["tera", 12], ["giga", 9], ["mega", 6], ["kilo", 3]],
    [["quecto", 30], ["ronto", 27], ["yocto", 24], ["zepto", 21], ["atto", 18], ["femto", 15], ["pico", 12], ["nano", 9], ["micro", 6], ["milli", 3]],
    true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]
).setName("SI (Written)");
HTMLPresets.BinarySI = new NestedSINotation(
    2,
    [["Yi", 80], ["Zi", 70], ["Ei", 60], ["Pi", 50], ["Ti", 40], ["Gi", 30], ["Mi", 20], ["Ki", 10]],
    "/", true, defaultRound
).setName("Binary SI");
HTMLPresets.BinarySIWritten = new NestedSINotation(
    2,
    [["yobi", 80], ["zebi", 70], ["exbi", 60], ["pebi", 50], ["tebi", 40], ["gibi", 30], ["mebi", 20], ["kibi", 10]],
    "/",
    true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]
).setName("Binary SI (Written)");
HTMLPresets.CombinedD = new NestedSINotation(
    10,
    [["D", 33], ["N", 30], ["O", 27], ["Sp", 24], ["Sx", 21], ["Qi", 18], ["Qa", 15], ["T", 12], ["B", 9], ["M", 6]],
    "/", true, defaultRound, 2, 3, 0, 0, "", "*"
).setName("Combined-D");
HTMLPresets.HyperSI = new NestedHyperSINotation(...[,,,,], defaultRound).setName("Hyper-SI");
HTMLPresets.HyperSIWritten = new NestedHyperSINotation(
    10,
    [["deckerexi-", 10], ["tenebexi-", 9], ["cloctexi-", 8], ["hypocexi-", 7], ["alifexi-", 6], ["madenexi-", 5], ["swekexi-", 4], ["brinexi-", 3], ["digexi-", 2], ["plexi-", 1]],
    [["nepogo-", 2], ["logo-", 1]],
    true, defaultRound, 2, 0, " ", "", ["^(", ")"]
).setName("Hyper-SI (Written)");
HTMLPresets.SandcastleBuilder = new NestedSINotation(
    10,
    [["Q", 210], ["W", 42], ["L", 39], ["F", 36], ["H", 33], ["S", 30], ["U", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["K", 3]],
    "/", true, defaultRound
).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder");
HTMLPresets.SandcastleBuilderWritten = new NestedSINotation(
    10,
    [["Quita", 210], ["Wololo", 42], ["Lotta", 39], ["Ferro", 36], ["Helo", 33], ["Squilli", 30], ["Umpty", 27], ["Yotta", 24], ["Zetta", 21], ["Exa", 18], ["Peta", 15], ["Tera", 12], ["Giga", 9], ["Mega", 6], ["Kilo", 3]],
    "/ ", true, defaultRound, 4, 3, 0, 0, " ", " ", [["^(", ")"], ["^^(", ")"]]
).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder (Written)");

Presets.LooseFraction = new FractionNotation(-1e-3).setName("Fraction (Loose)");
Presets.MediumFraction = new FractionNotation(-1e-6).setName("Fraction (Medium)");
Presets.PreciseFraction = new FractionNotation(-1e-10).setName("Fraction (Precise)");
Presets.LooseMixedNumber = new FractionNotation(-1e-3, true).setName("Mixed Number (Loose)");
Presets.MediumMixedNumber = new FractionNotation(-1e-6, true).setName("Mixed Number (Medium)");
Presets.PreciseMixedNumber = new FractionNotation(-1e-10, true).setName("Mixed Number (Precise)");
HTMLPresets.LooseFraction = new FractionNotation(-1e-3).setName("Fraction (Loose)");
HTMLPresets.MediumFraction = new FractionNotation(-1e-6).setName("Fraction (Medium)");
HTMLPresets.PreciseFraction = new FractionNotation(-1e-10).setName("Fraction (Precise)");
HTMLPresets.LooseMixedNumber = new FractionNotation(-1e-3, true).setName("Mixed Number (Loose)");
HTMLPresets.MediumMixedNumber = new FractionNotation(-1e-6, true).setName("Mixed Number (Medium)");
HTMLPresets.PreciseMixedNumber = new FractionNotation(-1e-10, true).setName("Mixed Number (Precise)");

Presets.LetterDigits = zeroString(new LetterDigitsNotation(...[,,,,,,,,,,,,,,], 1/18279),"_").setName("Letter Digits");
Presets.AlphabetDigits = new LetterDigitsNotation(
    [
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    ], 0, 9, false, -3, -3, ...[,,,,,], "|", true, false, 53**-3
).setName("Alphabet Digits");
HTMLPresets.LetterDigits = zeroString(new LetterDigitsNotation(...[,,,,,,,,,,,,,,], 1/18279),"_").setName("Letter Digits");
HTMLPresets.AlphabetDigits = new LetterDigitsNotation(
    [
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        ["~","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    ], 0, 9, false, -3, -3, ...[,,,,,], "|", true, false, 53**-3
).setName("Alphabet Digits");

Presets.Myriad = new MyriadNotation(0, defaultRound).setName("Myriad");
Presets.ADMyriad = new MyriadNotation(1, defaultRound).setName("AD Myriad");
Presets.AarexMyriad = new MyriadNotation(2, defaultRound).setName("Aarex Myriad");
HTMLPresets.Myriad = new MyriadNotation(0, defaultRound).setName("Myriad");
HTMLPresets.ADMyriad = new MyriadNotation(1, defaultRound).setName("AD Myriad");
HTMLPresets.AarexMyriad = new MyriadNotation(2, defaultRound).setName("Aarex Myriad");

let doubleBinaryNames = new MultiLogarithmNotation("2^131072", 5, 0, 2, 1, true, [["(", ")p"], ["", "p"], [" | p^(", ")"]], null, true, 0, 1,
    new NestedSignValueNotation(
        [
            ["X", "2^65536"], ["A", "2^32768"], ["Q", "2^16384"], ["K", "2^8192"],
            ["C", "2^4096"], ["R", "2^2048"], ["D", "2^1024"], ["T", 2**512],
            ["P", 2**256], ["F", 2**128], ["L", 2**64], ["I", 2**32],
            ["S", 65536], ["B", 256], ["H", 16], ["4", 4], ["2", 2], ["1", 1]
        ], 0, false, "round", 1, 1, 3, 0, 0, " ", [["", " "], ["^(", ")"], [" # (", ")"]], 16
    )
)
Presets.DoubleBinaryNames = new ConditionalNotation(false,
    [new DefaultNotation(), value => value.eq(0)],
    [new AppliedFunctionNotation((value) => value.recip(), doubleBinaryNames, (str) => "1 / (" + str + ")"), value => value.lt(1)],
    [doubleBinaryNames, (value) => true]
).setName("Double Binary Names");
HTMLPresets.DoubleBinaryNames = new ConditionalNotation(false,
    [new DefaultNotation(), value => value.eq(0)],
    [new AppliedFunctionNotation((value) => value.recip(), doubleBinaryNames, (str) => "1 / (" + str + ")"), value => value.lt(1)],
    [doubleBinaryNames, (value) => true]
).setName("Double Binary Names");
Presets.DoubleBinaryPrefixes = new NestedSINotation(2,
    [
        ["X", 65536], ["A", 32768], ["Q", 16384], ["K", 8192],
        ["C", 4096], ["R", 2048], ["D", 1024], ["T", 512],
        ["P", 256], ["F", 128], ["L", 64], ["I", 32],
        ["S", 16], ["B", 8], ["H", 4]
    ], "/", true, defaultRound, 1, ...[,,,,,], [["^(", ")"], [" # (", ")"]], 5
).setName("Double Binary Prefixes");
HTMLPresets.DoubleBinaryPrefixes = new NestedSINotation(2,
    [
        ["X", 65536], ["A", 32768], ["Q", 16384], ["K", 8192],
        ["C", 4096], ["R", 2048], ["D", 1024], ["T", 512],
        ["P", 256], ["F", 128], ["L", 64], ["I", 32],
        ["S", 16], ["B", 8], ["H", 4]
    ], "/", true, defaultRound, 1, ...[,,,,,], [["^(", ")"], [" # (", ")"]], 5
).setName("Double Binary Prefixes");

Presets.Hypersplit = new HypersplitNotation(...[,,,,,,,], defaultRound).setName("Hypersplit");
HTMLPresets.Hypersplit = new HypersplitNotation(...[,,,,,,,], defaultRound).setName("Hypersplit");
Presets.HypersplitBase3 = new HypersplitNotation([["", ""], ["*3^", ""], ["((3^)^", ") "], ["((3^^)^", ") "]], 3, [3, 3, 3], ...[,,,,], defaultRound).setName("Hypersplit (Base 3)");
HTMLPresets.HypersplitBase3 = new HypersplitNotation([["", ""], ["*3^", ""], ["((3^)^", ") "], ["((3^^)^", ") "]], 3, [3, 3, 3], ...[,,,,], defaultRound).setName("Hypersplit (Base 3)");

Presets.HyperE = new ConditionalNotation(false,
    [
        new ScientificNotation(...[,,], defaultRound, ...[,,,,], [["E", ""], ["E", ""], ["(E^", ")"]]), 
        function(value){return (multabs(value).lt("1e10") || value.eq(0));}
    ],
    [
        new HypersplitNotation([["", ""], ["E", ""], ["#", ""], ["#", ""]], 10, [0, 1e10, 1e10 - 1], [-1, 1, 0, 0], 23, undefined, 0, defaultRound, [new DefaultNotation(), new DefaultNotation(), new AppliedFunctionNotation(function(value){return value.plus(1);}, new DefaultNotation(), function(str){return str;})]), 
        function(value){return true;}
    ]
).setName("Hyper-E");
HTMLPresets.HyperE = new ConditionalNotation(false,
    [
        new ScientificNotation(...[,,], defaultRound, ...[,,,,], [["E", ""], ["E", ""], ["(E^", ")"]]), 
        function(value){return (multabs(value).lt("1e10") || value.eq(0));}
    ],
    [
        new HypersplitNotation([["", ""], ["E", ""], ["#", ""], ["#", ""]], 10, [0, 1e10, 1e10 - 1], [-1, 1, 0, 0], 23, undefined, 0, defaultRound, [new DefaultNotation(), new DefaultNotation(), new AppliedFunctionNotation(function(value){return value.plus(1);}, new DefaultNotation(), function(str){return str;})]), 
        function(value){return true;}
    ]
).setName("Hyper-E");

Presets.Infinity = recipBelow(new MultiLogarithmNotation(1e16, 5, 1, "2^1024", 1, true, [["", "∞"], ["", "∞"], ["∞^", ""]], null, true, 0, 1, new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation()), Decimal.pow("2^1024", -1e15)).setNotationGlobals(["-(", ")"]).setName("Infinity");
HTMLPresets.Infinity = recipBelow(new MultiLogarithmNotation(1e16, 5, 1, "2^1024", 1, true, [["", "&infin;"], ["", "&infin;"], ["&infin;<sup>", "</sup>"]], null, true, 0, 1, new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation()), Decimal.pow("2^1024", -1e15)).setNotationGlobals(["-(", ")"]).setName("Infinity");
Presets.Eternity = new ConditionalNotation(false,
    [new DefaultNotation(), value => (value.eq(0) || value.eq(1))],
    [new AppliedFunctionNotation(value => value.slog(10, 100, true).log("2^1024"), new DefaultNotation(-6, 5, 0, 1e12, 0), str => "֎" + str), value => value.gt(1)],
    [new AppliedFunctionNotation(value => value.recip().slog(10, 100, true).log("2^1024"), new DefaultNotation(-6, 5, 0, 1e12, 0), str => "֍" + str), value => value.gt(0) && value.lt(1)]
).setName("Eternity");
HTMLPresets.Eternity = new ConditionalNotation(false,
    [new DefaultNotation(), value => (value.eq(0) || value.eq(1))],
    [new AppliedFunctionNotation(value => value.slog(10, 100, true).log("2^1024"), new DefaultNotation(-6, 5, 0, 1e12, 0), str => "&#x58E;" + str), value => value.gt(1)],
    [new AppliedFunctionNotation(value => value.recip().slog(10, 100, true).log("2^1024"), new DefaultNotation(-6, 5, 0, 1e12, 0), str => "&#x58D;" + str), value => value.gt(0) && value.lt(1)],
).setName("Eternity");

Presets.Brackets = new HypersplitNotation([["", ""], ["e", ""], ["", ""], ["", ""]], 6, [0, 46656, Infinity], [-1, 1, 0, -1], 1, undefined, 0, 0, [
    new DefaultNotation(),
    new AlternateBaseNotation([")", "[", "{", "]", "(", "}"], 0, 2, 2, -1, Infinity, 0, ...[,,,], 1),
    new LogarithmNotation(1, undefined, 6, true, [["", ""], ["", ""], ["", ""]], ...[,,,,], new AlternateBaseNotation(["(", "]", "}", "[", ")", "{"], 0, 2, 2, -1, Infinity, 0, ...[,,,], 1, true))
]).setName("Brackets");
HTMLPresets.Brackets = new HypersplitNotation([["", ""], ["e", ""], ["", ""], ["", ""]], 6, [0, 46656, Infinity], [-1, 1, 0, -1], 1, undefined, 0, 0, [
    new DefaultNotation(),
    new AlternateBaseNotation([")", "[", "{", "]", "(", "}"], 0, 2, 2, -1, Infinity, 0, ...[,,,], 1),
    new LogarithmNotation(1, undefined, 6, true, [["", ""], ["", ""], ["", ""]], ...[,,,,], new AlternateBaseNotation(["(", "]", "}", "[", ")", "{"], 0, 2, 2, -1, Infinity, 0, ...[,,,], 1, true))
]).setName("Brackets");
let SimplifiedWrittenArgam = ["Ze","On","Tw","Th","Fo","Fi","Si","Se","Ei","Ni","De","El","Zn","Ti","Zf","Tr","Te","Zo","Di","Ax","Sc","Ts","Dl","Fl","Ca","Qu","Dt","Tn","Cv","Ne","Ki","So","Tv","Tl","Do","Kn","Ex","Ma","Da","Tt","Ko","Lu","Ee","Sl","Cd","Kv","Dr","Fs","Eo","Ef","Ke","Tz","Ci","Su","Ev","Kl","Sv","Ta","Dv","Cl"]
Presets.SimplifiedWritten = (base : number) => new HypersplitNotation(
    [["", ""], ["(", ") "], ["[", "] "], ["{", "} "]], base, [base**3, base**3, base**3], undefined, 0, ...[,,], 1,
    new AlternateBaseNotation(SimplifiedWrittenArgam.slice(0, base), 0, 0, 0, -1)
).setName((base == 10) ? "Simplified Written" : "Simplified Written (Base " + new DefaultNotation().format(base) + ")");
HTMLPresets.SimplifiedWritten = (base : number) => new HypersplitNotation(
    [["", ""], ["(", ") "], ["[", "] "], ["{", "} "]], base, [base**3, base**3, base**3], undefined, 0, ...[,,], 1,
    new AlternateBaseNotation(SimplifiedWrittenArgam.slice(0, base), 0, 0, 0, -1)
).setName((base == 10) ? "Simplified Written" : "Simplified Written (Base " + new DefaultNotation().format(base) + ")");
Presets.Dots = new ExpandedDefaultNotation(
    254**3, 254**-1, 3, 254, 1/254, 2, 1, undefined, undefined, [["", "⣿"], ["", "⣿⠂"], ["", "⣿⣿"], ["", "⣿⣿⠂"]], [["(-", ")⣿"], ["⠂;", ""]], true, true, 1, 1,
    new AlternateBaseNotation(
        ["⠁","⠂","⠃","⠄","⠅","⠆","⠇","⠈","⠉","⠊","⠋","⠌","⠍","⠎","⠏","⠐","⠑","⠒","⠓","⠔","⠕","⠖","⠗","⠘","⠙","⠚","⠛","⠜","⠝","⠞","⠟","⠠","⠡","⠢","⠣","⠤","⠥","⠦","⠧","⠨","⠩","⠪","⠫","⠬","⠭","⠮","⠯","⠰","⠱","⠲","⠳","⠴","⠵","⠶","⠷","⠸","⠹","⠺","⠻","⠼","⠽","⠾","⠿","⡀","⡁","⡂","⡃","⡄","⡅","⡆","⡇","⡈","⡉","⡊","⡋","⡌","⡍","⡎","⡏","⡐","⡑","⡒","⡓","⡔","⡕","⡖","⡗","⡘","⡙","⡚","⡛","⡜","⡝","⡞","⡟","⡠","⡡","⡢","⡣","⡤","⡥","⡦","⡧","⡨","⡩","⡪","⡫","⡬","⡭","⡮","⡯","⡰","⡱","⡲","⡳","⡴","⡵","⡶","⡷","⡸","⡹","⡺","⡻","⡼","⡽","⡾","⡿","⢀","⢁","⢂","⢃","⢄","⢅","⢆","⢇","⢈","⢉","⢊","⢋","⢌","⢍","⢎","⢏","⢐","⢑","⢒","⢓","⢔","⢕","⢖","⢗","⢘","⢙","⢚","⢛","⢜","⢝","⢞","⢟","⢠","⢡","⢢","⢣","⢤","⢥","⢦","⢧","⢨","⢩","⢪","⢫","⢬","⢭","⢮","⢯","⢰","⢱","⢲","⢳","⢴","⢵","⢶","⢷","⢸","⢹","⢺","⢻","⢼","⢽","⢾","⢿","⣀","⣁","⣂","⣃","⣄","⣅","⣆","⣇","⣈","⣉","⣊","⣋","⣌","⣍","⣎","⣏","⣐","⣑","⣒","⣓","⣔","⣕","⣖","⣗","⣘","⣙","⣚","⣛","⣜","⣝","⣞","⣟","⣠","⣡","⣢","⣣","⣤","⣥","⣦","⣧","⣨","⣩","⣪","⣫","⣬","⣭","⣮","⣯","⣰","⣱","⣲","⣳","⣴","⣵","⣶","⣷","⣸","⣹","⣺","⣻","⣼","⣽","⣾"],
        0, 1, 1, -1, ...[,,,,,], 1, false, 3, undefined, ""),
    new AlternateBaseNotation(
        ["⠁","⠂","⠃","⠄","⠅","⠆","⠇","⠈","⠉","⠊","⠋","⠌","⠍","⠎","⠏","⠐","⠑","⠒","⠓","⠔","⠕","⠖","⠗","⠘","⠙","⠚","⠛","⠜","⠝","⠞","⠟","⠠","⠡","⠢","⠣","⠤","⠥","⠦","⠧","⠨","⠩","⠪","⠫","⠬","⠭","⠮","⠯","⠰","⠱","⠲","⠳","⠴","⠵","⠶","⠷","⠸","⠹","⠺","⠻","⠼","⠽","⠾","⠿","⡀","⡁","⡂","⡃","⡄","⡅","⡆","⡇","⡈","⡉","⡊","⡋","⡌","⡍","⡎","⡏","⡐","⡑","⡒","⡓","⡔","⡕","⡖","⡗","⡘","⡙","⡚","⡛","⡜","⡝","⡞","⡟","⡠","⡡","⡢","⡣","⡤","⡥","⡦","⡧","⡨","⡩","⡪","⡫","⡬","⡭","⡮","⡯","⡰","⡱","⡲","⡳","⡴","⡵","⡶","⡷","⡸","⡹","⡺","⡻","⡼","⡽","⡾","⡿","⢀","⢁","⢂","⢃","⢄","⢅","⢆","⢇","⢈","⢉","⢊","⢋","⢌","⢍","⢎","⢏","⢐","⢑","⢒","⢓","⢔","⢕","⢖","⢗","⢘","⢙","⢚","⢛","⢜","⢝","⢞","⢟","⢠","⢡","⢢","⢣","⢤","⢥","⢦","⢧","⢨","⢩","⢪","⢫","⢬","⢭","⢮","⢯","⢰","⢱","⢲","⢳","⢴","⢵","⢶","⢷","⢸","⢹","⢺","⢻","⢼","⢽","⢾","⢿","⣀","⣁","⣂","⣃","⣄","⣅","⣆","⣇","⣈","⣉","⣊","⣋","⣌","⣍","⣎","⣏","⣐","⣑","⣒","⣓","⣔","⣕","⣖","⣗","⣘","⣙","⣚","⣛","⣜","⣝","⣞","⣟","⣠","⣡","⣢","⣣","⣤","⣥","⣦","⣧","⣨","⣩","⣪","⣫","⣬","⣭","⣮","⣯","⣰","⣱","⣲","⣳","⣴","⣵","⣶","⣷","⣸","⣹","⣺","⣻","⣼","⣽","⣾"],
        0, 0, 0, -1), [true, true]
).setName("Dots");
HTMLPresets.Dots = new ExpandedDefaultNotation(
    254**3, 254**-1, 3, 254, 1/254, 2, 1, undefined, undefined, [["", "&#x28FF;"], ["", "&#x28FF;&#x2802;"], ["", "&#x28FF;&#x28FF;"], ["", "&#x28FF;&#x28FF;&#x2802;"]], [["(-", ")&#x28FF;"], ["&#x2802;;", ""]], true, true, 1, 1,
    new AlternateBaseNotation(
        ["&#x2801;","&#x2802;","&#x2803;","&#x2804;","&#x2805;","&#x2806;","&#x2807;","&#x2808;","&#x2809;","&#x280A;","&#x280B;","&#x280C;","&#x280D;","&#x280E;","&#x280F;","&#x2810;","&#x2811;","&#x2812;","&#x2813;","&#x2814;","&#x2815;","&#x2816;","&#x2817;","&#x2818;","&#x2819;","&#x281A;","&#x281B;","&#x281C;","&#x281D;","&#x281E;","&#x281F;","&#x2820;","&#x2821;","&#x2822;","&#x2823;","&#x2824;","&#x2825;","&#x2826;","&#x2827;","&#x2828;","&#x2829;","&#x282A;","&#x282B;","&#x282C;","&#x282D;","&#x282E;","&#x282F;","&#x2830;","&#x2831;","&#x2832;","&#x2833;","&#x2834;","&#x2835;","&#x2836;","&#x2837;","&#x2838;","&#x2839;","&#x283A;","&#x283B;","&#x283C;","&#x283D;","&#x283E;","&#x283F;","&#x2840;","&#x2841;","&#x2842;","&#x2843;","&#x2844;","&#x2845;","&#x2846;","&#x2847;","&#x2848;","&#x2849;","&#x284A;","&#x284B;","&#x284C;","&#x284D;","&#x284E;","&#x284F;","&#x2850;","&#x2851;","&#x2852;","&#x2853;","&#x2854;","&#x2855;","&#x2856;","&#x2857;","&#x2858;","&#x2859;","&#x285A;","&#x285B;","&#x285C;","&#x285D;","&#x285E;","&#x285F;","&#x2860;","&#x2861;","&#x2862;","&#x2863;","&#x2864;","&#x2865;","&#x2866;","&#x2867;","&#x2868;","&#x2869;","&#x286A;","&#x286B;","&#x286C;","&#x286D;","&#x286E;","&#x286F;","&#x2870;","&#x2871;","&#x2872;","&#x2873;","&#x2874;","&#x2875;","&#x2876;","&#x2877;","&#x2878;","&#x2879;","&#x287A;","&#x287B;","&#x287C;","&#x287D;","&#x287E;","&#x287F;","&#x2880;","&#x2881;","&#x2882;","&#x2883;","&#x2884;","&#x2885;","&#x2886;","&#x2887;","&#x2888;","&#x2889;","&#x288A;","&#x288B;","&#x288C;","&#x288D;","&#x288E;","&#x288F;","&#x2890;","&#x2891;","&#x2892;","&#x2893;","&#x2894;","&#x2895;","&#x2896;","&#x2897;","&#x2898;","&#x2899;","&#x289A;","&#x289B;","&#x289C;","&#x289D;","&#x289E;","&#x289F;","&#x28A0;","&#x28A1;","&#x28A2;","&#x28A3;","&#x28A4;","&#x28A5;","&#x28A6;","&#x28A7;","&#x28A8;","&#x28A9;","&#x28AA;","&#x28AB;","&#x28AC;","&#x28AD;","&#x28AE;","&#x28AF;","&#x28B0;","&#x28B1;","&#x28B2;","&#x28B3;","&#x28B4;","&#x28B5;","&#x28B6;","&#x28B7;","&#x28B8;","&#x28B9;","&#x28BA;","&#x28BB;","&#x28BC;","&#x28BD;","&#x28BE;","&#x28BF;","&#x28C0;","&#x28C1;","&#x28C2;","&#x28C3;","&#x28C4;","&#x28C5;","&#x28C6;","&#x28C7;","&#x28C8;","&#x28C9;","&#x28CA;","&#x28CB;","&#x28CC;","&#x28CD;","&#x28CE;","&#x28CF;","&#x28D0;","&#x28D1;","&#x28D2;","&#x28D3;","&#x28D4;","&#x28D5;","&#x28D6;","&#x28D7;","&#x28D8;","&#x28D9;","&#x28DA;","&#x28DB;","&#x28DC;","&#x28DD;","&#x28DE;","&#x28DF;","&#x28E0;","&#x28E1;","&#x28E2;","&#x28E3;","&#x28E4;","&#x28E5;","&#x28E6;","&#x28E7;","&#x28E8;","&#x28E9;","&#x28EA;","&#x28EB;","&#x28EC;","&#x28ED;","&#x28EE;","&#x28EF;","&#x28F0;","&#x28F1;","&#x28F2;","&#x28F3;","&#x28F4;","&#x28F5;","&#x28F6;","&#x28F7;","&#x28F8;","&#x28F9;","&#x28FA;","&#x28FB;","&#x28FC;","&#x28FD;","&#x28FE;"],
        0, 1, 1, -1, ...[,,,,,], 1, false, 3, undefined, ""),
    new AlternateBaseNotation(
        ["&#x2801;","&#x2802;","&#x2803;","&#x2804;","&#x2805;","&#x2806;","&#x2807;","&#x2808;","&#x2809;","&#x280A;","&#x280B;","&#x280C;","&#x280D;","&#x280E;","&#x280F;","&#x2810;","&#x2811;","&#x2812;","&#x2813;","&#x2814;","&#x2815;","&#x2816;","&#x2817;","&#x2818;","&#x2819;","&#x281A;","&#x281B;","&#x281C;","&#x281D;","&#x281E;","&#x281F;","&#x2820;","&#x2821;","&#x2822;","&#x2823;","&#x2824;","&#x2825;","&#x2826;","&#x2827;","&#x2828;","&#x2829;","&#x282A;","&#x282B;","&#x282C;","&#x282D;","&#x282E;","&#x282F;","&#x2830;","&#x2831;","&#x2832;","&#x2833;","&#x2834;","&#x2835;","&#x2836;","&#x2837;","&#x2838;","&#x2839;","&#x283A;","&#x283B;","&#x283C;","&#x283D;","&#x283E;","&#x283F;","&#x2840;","&#x2841;","&#x2842;","&#x2843;","&#x2844;","&#x2845;","&#x2846;","&#x2847;","&#x2848;","&#x2849;","&#x284A;","&#x284B;","&#x284C;","&#x284D;","&#x284E;","&#x284F;","&#x2850;","&#x2851;","&#x2852;","&#x2853;","&#x2854;","&#x2855;","&#x2856;","&#x2857;","&#x2858;","&#x2859;","&#x285A;","&#x285B;","&#x285C;","&#x285D;","&#x285E;","&#x285F;","&#x2860;","&#x2861;","&#x2862;","&#x2863;","&#x2864;","&#x2865;","&#x2866;","&#x2867;","&#x2868;","&#x2869;","&#x286A;","&#x286B;","&#x286C;","&#x286D;","&#x286E;","&#x286F;","&#x2870;","&#x2871;","&#x2872;","&#x2873;","&#x2874;","&#x2875;","&#x2876;","&#x2877;","&#x2878;","&#x2879;","&#x287A;","&#x287B;","&#x287C;","&#x287D;","&#x287E;","&#x287F;","&#x2880;","&#x2881;","&#x2882;","&#x2883;","&#x2884;","&#x2885;","&#x2886;","&#x2887;","&#x2888;","&#x2889;","&#x288A;","&#x288B;","&#x288C;","&#x288D;","&#x288E;","&#x288F;","&#x2890;","&#x2891;","&#x2892;","&#x2893;","&#x2894;","&#x2895;","&#x2896;","&#x2897;","&#x2898;","&#x2899;","&#x289A;","&#x289B;","&#x289C;","&#x289D;","&#x289E;","&#x289F;","&#x28A0;","&#x28A1;","&#x28A2;","&#x28A3;","&#x28A4;","&#x28A5;","&#x28A6;","&#x28A7;","&#x28A8;","&#x28A9;","&#x28AA;","&#x28AB;","&#x28AC;","&#x28AD;","&#x28AE;","&#x28AF;","&#x28B0;","&#x28B1;","&#x28B2;","&#x28B3;","&#x28B4;","&#x28B5;","&#x28B6;","&#x28B7;","&#x28B8;","&#x28B9;","&#x28BA;","&#x28BB;","&#x28BC;","&#x28BD;","&#x28BE;","&#x28BF;","&#x28C0;","&#x28C1;","&#x28C2;","&#x28C3;","&#x28C4;","&#x28C5;","&#x28C6;","&#x28C7;","&#x28C8;","&#x28C9;","&#x28CA;","&#x28CB;","&#x28CC;","&#x28CD;","&#x28CE;","&#x28CF;","&#x28D0;","&#x28D1;","&#x28D2;","&#x28D3;","&#x28D4;","&#x28D5;","&#x28D6;","&#x28D7;","&#x28D8;","&#x28D9;","&#x28DA;","&#x28DB;","&#x28DC;","&#x28DD;","&#x28DE;","&#x28DF;","&#x28E0;","&#x28E1;","&#x28E2;","&#x28E3;","&#x28E4;","&#x28E5;","&#x28E6;","&#x28E7;","&#x28E8;","&#x28E9;","&#x28EA;","&#x28EB;","&#x28EC;","&#x28ED;","&#x28EE;","&#x28EF;","&#x28F0;","&#x28F1;","&#x28F2;","&#x28F3;","&#x28F4;","&#x28F5;","&#x28F6;","&#x28F7;","&#x28F8;","&#x28F9;","&#x28FA;","&#x28FB;","&#x28FC;","&#x28FD;","&#x28FE;"],
        0, 0, 0, -1), [true, true]
).setName("Dots");
Presets.Hearts = new NestedSINotation(
    10,
    [["🩷", 10], ["🤍", 9], ["🩶", 8], ["💜", 7], ["💙", 6], ["💚", 5], ["💛", 4], ["🧡", 3], ["❤️", 2], ["🤎", 1]],
    "🩵", true, 1, 1, 5, 2, 0, "", "", [["", ""], ["💗", ""]], 5, "🖤",
    new AlternateBaseNotation(
        ["🖤", "🤎", "❤️", "🧡", "💛","💚", "💙", "💜", "🩶", "🤍"],
        0, 0, 0, -1, ...[,,,,,], 1
    ), [true, false]
).setNotationGlobals(["💔", ""]).setName("Hearts");
HTMLPresets.Hearts = new NestedSINotation(
    10,
    [["&#x1FA77;", 10], ["&#x1F90D;", 9], ["&#x1FA76;", 8], ["&#x1F49C;", 7], ["&#x1F499;", 6], ["&#x1F49A;", 5], ["&#x1F49B;", 4], ["&#x1F9E1;", 3], ["&#x2764;&#xFE0F;", 2], ["&#x1F90E;", 1]],
    "&#x1FA75;", true, 1, 1, 5, 2, 0, "", "", [["", ""], ["&#x1F497;", ""]], 5, "&#x1F5A4;",
    new AlternateBaseNotation(
        ["&#x1F5A4;", "&#x1F90E;", "&#x2764;&#xFE0F;", "&#x1F9E1;", "&#x1F49B;","&#x1F49A;", "&#x1F499;", "&#x1F49C;", "&#x1FA76;", "&#x1F90D;"],
        0, 0, 0, -1, ...[,,,,,], 1
    ), [true, false]
).setNotationGlobals(["&#x1F494;", ""]).setName("Hearts");

let numericDominoArray : string[] = [];
let coloredDominoArrays : [string[], string[], string[], string[]] = [[], [], [], []];
DominoCreation: {
    let upper = 0;
    let lower = 0;
    while (upper < 65) {
        numericDominoArray.push("[ " + upper + " | " + lower + " ]");
        for (let c = 0; c <= 3; c++) {
            coloredDominoArrays[c].push(
                `<span class="domino_box">
                <span class="domino_square" style="background-position: calc(100%/3*` + c +
                `) calc(100%/64*` + upper +
                `);"></span>
                <span class="domino_square" style="background-position: calc(100%/3*` + c +
                `) calc(100%/64*` + lower +
                `);"></span></span>`
            )
        }
        if (upper == lower) {
            upper++;
            lower = 0;
        }
        else lower++;
    }
}

Presets.Dominoes = new LetterDigitsNotation(
    [
        ["🁣", "🁪", "🁫", "🁱", "🁲", "🁳", "🁸", "🁹", "🁺", "🁻", "🁿", "🂀", "🂁", "🂂", "🂃", "🂆", "🂇", "🂈", "🂉", "🂊", "🂋", "🂍", "🂎", "🂏", "🂐", "🂑", "🂒", "🂓"],
        ["🁣", "🁪", "🁫", "🁱", "🁲", "🁳", "🁸", "🁹", "🁺", "🁻", "🁿", "🂀", "🂁", "🂂", "🂃", "🂆", "🂇", "🂈", "🂉", "🂊", "🂋", "🂍", "🂎", "🂏", "🂐", "🂑", "🂒", "🂓"],
        ["🁣", "🁪", "🁫", "🁱", "🁲", "🁳", "🁸", "🁹", "🁺", "🁻", "🁿", "🂀", "🂁", "🂂", "🂃", "🂆", "🂇", "🂈", "🂉", "🂊", "🂋", "🂍", "🂎", "🂏", "🂐", "🂑", "🂒", "🂓"]
    ], 0, 9, false, 2, 2, ...[,,,,,], "🁢", true, false, 1/784, ["🀰", ""]
).setName("Dominoes");
HTMLPresets.Dominoes = new LetterDigitsNotation(
    [
        ["&#x1F063;", "&#x1F06A;", "&#x1F06B;", "&#x1F071;", "&#x1F072;", "&#x1F073;", "&#x1F078;", "&#x1F079;", "&#x1F07A;", "&#x1F07B;", "&#x1F07F;", "&#x1F080;", "&#x1F081;", "&#x1F082;", "&#x1F083;", "&#x1F086;", "&#x1F087;", "&#x1F088;", "&#x1F089;", "&#x1F08A;", "&#x1F08B;", "&#x1F08D;", "&#x1F08E;", "&#x1F08F;", "&#x1F090;", "&#x1F091;", "&#x1F092;", "&#x1F093;"],
        ["&#x1F063;", "&#x1F06A;", "&#x1F06B;", "&#x1F071;", "&#x1F072;", "&#x1F073;", "&#x1F078;", "&#x1F079;", "&#x1F07A;", "&#x1F07B;", "&#x1F07F;", "&#x1F080;", "&#x1F081;", "&#x1F082;", "&#x1F083;", "&#x1F086;", "&#x1F087;", "&#x1F088;", "&#x1F089;", "&#x1F08A;", "&#x1F08B;", "&#x1F08D;", "&#x1F08E;", "&#x1F08F;", "&#x1F090;", "&#x1F091;", "&#x1F092;", "&#x1F093;"],
        ["&#x1F063;", "&#x1F06A;", "&#x1F06B;", "&#x1F071;", "&#x1F072;", "&#x1F073;", "&#x1F078;", "&#x1F079;", "&#x1F07A;", "&#x1F07B;", "&#x1F07F;", "&#x1F080;", "&#x1F081;", "&#x1F082;", "&#x1F083;", "&#x1F086;", "&#x1F087;", "&#x1F088;", "&#x1F089;", "&#x1F08A;", "&#x1F08B;", "&#x1F08D;", "&#x1F08E;", "&#x1F08F;", "&#x1F090;", "&#x1F091;", "&#x1F092;", "&#x1F093;"]
    ], 0, 9, false, 2, 2, ...[,,,,,], "&#x1F062;", true, false, 1/784, ["&#x1F030;", ""]
).setName("Dominoes");
Presets.NumericDominoes = (highest : number) => new LetterDigitsNotation(
    [numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2)],
    0, 9, false, 2, 2, ...[,,,,,], "||", true, false, ((highest + 1) * (highest + 2) / 2)**-2, ["[==]", ""]
).setName("Numeric Dominoes (Double " + new DefaultNotation().format(highest) + ")");
HTMLPresets.NumericDominoes = (highest : number) => new LetterDigitsNotation(
    [numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2)],
    0, 9, false, 2, 2, ...[,,,,,], "||", true, false, ((highest + 1) * (highest + 2) / 2)**-2, ["[==]", ""]
).setName("Numeric Dominoes (Double " + new DefaultNotation().format(highest) + ")");
HTMLPresets.ColoredDominoes = (highest : number) => new LetterDigitsNotation(
    [coloredDominoArrays[1].slice(0, (highest + 1) * (highest + 2) / 2), coloredDominoArrays[2].slice(0, (highest + 1) * (highest + 2) / 2), coloredDominoArrays[3].slice(0, (highest + 1) * (highest + 2) / 2)],
    0, 9, false, 2, 2, undefined, -1, 3, undefined, "", "", false, false, ((highest + 1) * (highest + 2) / 2)**-2,
    [
        `<span class="domino_box">
                <span class="domino_square" style="background-position: calc(100%/3*1) 0;"></span>
                <span class="domino_square" style="background-position: 100% 0;"></span>
                </span>`, ""
    ], [[[(placeValue) => (placeValue < 0), coloredDominoArrays[0].slice(0, (highest + 1) * (highest + 2) / 2)]], [], []]
    ).setNotationGlobals(
        [`<span class="domino_box">
        <span class="domino_square" style="background-position: calc(100%/3*2) 0;"></span>
        <span class="domino_square" style="background-position: 0 0;"></span>
        </span>`, ""]
    ).setName("Colored Dominoes (Double " + new DefaultNotation().format(highest) + ")");

Presets.Factorial = new MultiFactorialNotation().setName("Factorial");
Presets.FactorialAmount = new FactorialAmountNotation().setName("Factorial Amount");
Presets.FactorialScientific = new FactorialScientificNotation(...[,,], defaultRound).setName("Factorial Scientific");
Presets.FactorialHyperscientific = recipBelow(new FactorialHyperscientificNotation(...[,,], defaultRound), 1).setName("Factorial Hyperscientific");
Presets.Factoradic = new FactoradicNotation(...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["!", ""], ["!", ""]]).setName("Factoradic");
HTMLPresets.Factorial = new MultiFactorialNotation().setName("Factorial");
HTMLPresets.FactorialAmount = new FactorialAmountNotation().setName("Factorial Amount");
HTMLPresets.FactorialScientific = new FactorialScientificNotation(...[,,], defaultRound).setName("Factorial Scientific");
HTMLPresets.FactorialHyperscientific = recipBelow(new FactorialHyperscientificNotation(...[,,], defaultRound), 1).setName("Factorial Hyperscientific");
HTMLPresets.Factoradic = new FactoradicNotation(...[,,,,,,,,,,,,,,], [["e", ""], ["e", ""], ["!", ""], ["!", ""]]).setName("Factoradic");

Presets.SquareRoot = new MultiRootNotation(2).setName("Square Root");
Presets.CubeRoot = new MultiRootNotation(3).setName("Cube Root");
Presets.Root = (degree : Decimal) => new MultiRootNotation(degree).setName("Root (Degree " + new DefaultNotation().format(degree) + ")");
Presets.IncreasingRoot = recipBelow(new IncreasingRootNotation(), 1).setName("Increasing Root");
Presets.SuperSquareRoot = recipBelow(new MultiSuperRootNotation(2), 1, undefined, "0").setName("Super Square Root");
Presets.Tritetrated = recipBelow(new MultiSuperRootNotation(3), 1, undefined, "0").setName("Tritetrated");
Presets.SuperRoot = (degree : number) => recipBelow(new MultiSuperRootNotation(degree), 1, undefined, "0").setName("Super Root (Degree " + new DefaultNotation().format(degree) + ")");
Presets.IncreasingSuperRoot = recipBelow(new IncreasingSuperRootNotation(), 1, undefined, "0").setName("Increasing Super Root");
HTMLPresets.SquareRoot = new MultiRootNotation(2).setName("Square Root");
HTMLPresets.CubeRoot = new MultiRootNotation(3).setName("Cube Root");
HTMLPresets.Root = (degree : Decimal) => new MultiRootNotation(degree).setName("Root (Degree " + new DefaultNotation().format(degree) + ")");
HTMLPresets.IncreasingRoot = recipBelow(new IncreasingRootNotation(), 1).setName("Increasing Root");
HTMLPresets.SuperSquareRoot = recipBelow(new MultiSuperRootNotation(2), 1, undefined, "0").setName("Super Square Root");
HTMLPresets.Tritetrated = recipBelow(new MultiSuperRootNotation(3), 1, undefined, "0").setName("Tritetrated");
HTMLPresets.SuperRoot = (degree : number) => recipBelow(new MultiSuperRootNotation(degree), 1, undefined, "0").setName("Super Root (Degree " + new DefaultNotation().format(degree) + ")");
HTMLPresets.IncreasingSuperRoot = recipBelow(new IncreasingSuperRootNotation(), 1, undefined, "0").setName("Increasing Super Root");

Presets.Prime = new PrimeNotation().setName("Prime");
HTMLPresets.Prime = new PrimeNotation(...[,,,,,,,], ["<sup>", "</sup>"]).setName("Prime");

Presets.PsiLetters = new PsiDashNotation(1).setName("Psi Letters");
Presets.PsiDash = new PsiDashNotation().setName("Psi Dash");
HTMLPresets.PsiLetters = new PsiDashNotation(1).setName("Psi Letters");
HTMLPresets.PsiDash = new PsiDashNotation().setName("Psi Dash");

// This preset has been removed for now because it's too laggy
// Presets.PrestigeLayer = (root : Decimal, requirement : Decimal) => new PrestigeLayerNotation(root, requirement, true).setName("Prestige Layer (Root " + new DefaultNotation().format(root) + ", Requirement" + new DefaultNotation().format(requirement) + ")");
// HTMLPresets.PrestigeLayer = (root : Decimal, requirement : Decimal) => new PrestigeLayerNotation(root, requirement, true).setName("Prestige Layer (Root " + new DefaultNotation().format(root) + ", Requirement" + new DefaultNotation().format(requirement) + ")");
let OmegaLayersPlain = ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ","υ","φ","χ","ψ","ω","Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω","Ω^α","Ω^β","Ω^γ","Ω^δ","Ω^ε","Ω^ζ","Ω^η","Ω^θ","Ω^ι","Ω^κ","Ω^λ","Ω^μ","Ω^ν","Ω^ξ","Ω^ο","Ω^π","Ω^ρ","Ω^σ","Ω^τ","Ω^υ","Ω^φ","Ω^χ","Ω^ψ","Ω^ω","Ω^Α","Ω^Β","Ω^Γ","Ω^Δ","Ω^Ε","Ω^Ζ","Ω^Η","Ω^Θ","Ω^Ι","Ω^Κ","Ω^Λ","Ω^Μ","Ω^Ν","Ω^Ξ","Ω^Ο","Ω^Π","Ω^Ρ","Ω^Σ","Ω^Τ","Ω^Υ","Ω^Φ","Ω^Χ","Ω^Ψ","Ω^Ω","Ωψ^α","Ωψ^β","Ωψ^γ","Ωψ^δ","Ωψ^ε","Ωψ^ζ","Ωψ^η","Ωψ^θ","Ωψ^ι","Ωψ^κ","Ωψ^λ","Ωψ^μ","Ωψ^ν","Ωψ^ξ","Ωψ^ο","Ωψ^π","Ωψ^ρ","Ωψ^σ","Ωψ^τ","Ωψ^υ","Ωψ^φ","Ωψ^χ","Ωψ^ψ","Ωψ^ω","Ωψ^Α","Ωψ^Β","Ωψ^Γ","Ωψ^Δ","Ωψ^Ε","Ωψ^Ζ","Ωψ^Η","Ωψ^Θ","Ωψ^Ι","Ωψ^Κ","Ωψ^Λ","Ωψ^Μ","Ωψ^Ν","Ωψ^Ξ","Ωψ^Ο","Ωψ^Π","Ωψ^Ρ","Ωψ^Σ","Ωψ^Τ","Ωψ^Υ","Ωψ^Φ","Ωψ^Χ","Ωψ^Ψ","Ωψ^Ω","Ωϝ^α","Ωϝ^β","Ωϝ^γ","Ωϝ^δ","Ωϝ^ε","Ωϝ^ζ","Ωϝ^η","Ωϝ^θ","Ωϝ^ι","Ωϝ^κ","Ωϝ^λ","Ωϝ^μ","Ωϝ^ν","Ωϝ^ξ","Ωϝ^ο","Ωϝ^π","Ωϝ^ρ","Ωϝ^σ","Ωϝ^τ","Ωϝ^υ","Ωϝ^φ","Ωϝ^χ","Ωϝ^ψ","Ωϝ^ω","Ωϝ^Α","Ωϝ^Β","Ωϝ^Γ","Ωϝ^Δ","Ωϝ^Ε","Ωϝ^Ζ","Ωϝ^Η","Ωϝ^Θ","Ωϝ^Ι","Ωϝ^Κ","Ωϝ^Λ","Ωϝ^Μ","Ωϝ^Ν","Ωϝ^Ξ","Ωϝ^Ο","Ωϝ^Π","Ωϝ^Ρ","Ωϝ^Σ","Ωϝ^Τ","Ωϝ^Υ","Ωϝ^Φ","Ωϝ^Χ","Ωϝ^Ψ","Ωϝ^Ω","Ωϛ^α","Ωϛ^β","Ωϛ^γ","Ωϛ^δ","Ωϛ^ε","Ωϛ^ζ","Ωϛ^η","Ωϛ^θ","Ωϛ^ι","Ωϛ^κ","Ωϛ^λ","Ωϛ^μ","Ωϛ^ν","Ωϛ^ξ","Ωϛ^ο","Ωϛ^π","Ωϛ^ρ","Ωϛ^σ","Ωϛ^τ","Ωϛ^υ","Ωϛ^φ","Ωϛ^χ","Ωϛ^ψ","Ωϛ^ω","Ωϛ^Α","Ωϛ^Β","Ωϛ^Γ","Ωϛ^Δ","Ωϛ^Ε","Ωϛ^Ζ","Ωϛ^Η","Ωϛ^Θ","Ωϛ^Ι","Ωϛ^Κ","Ωϛ^Λ","Ωϛ^Μ","Ωϛ^Ν","Ωϛ^Ξ","Ωϛ^Ο","Ωϛ^Π","Ωϛ^Ρ","Ωϛ^Σ","Ωϛ^Τ","Ωϛ^Υ","Ωϛ^Φ","Ωϛ^Χ","Ωϛ^Ψ","Ωϛ^Ω","Ωͱ^α","Ωͱ^β","Ωͱ^γ","Ωͱ^δ","Ωͱ^ε","Ωͱ^ζ","Ωͱ^η","Ωͱ^θ","Ωͱ^ι","Ωͱ^κ","Ωͱ^λ","Ωͱ^μ","Ωͱ^ν","Ωͱ^ξ","Ωͱ^ο","Ωͱ^π","Ωͱ^ρ","Ωͱ^σ","Ωͱ^τ","Ωͱ^υ","Ωͱ^φ","Ωͱ^χ","Ωͱ^ψ","Ωͱ^ω","Ωͱ^Α","Ωͱ^Β","Ωͱ^Γ","Ωͱ^Δ","Ωͱ^Ε","Ωͱ^Ζ","Ωͱ^Η","Ωͱ^Θ","Ωͱ^Ι","Ωͱ^Κ","Ωͱ^Λ","Ωͱ^Μ","Ωͱ^Ν","Ωͱ^Ξ","Ωͱ^Ο","Ωͱ^Π","Ωͱ^Ρ","Ωͱ^Σ","Ωͱ^Τ","Ωͱ^Υ","Ωͱ^Φ","Ωͱ^Χ","Ωͱ^Ψ","Ωͱ^Ω","Ωϻ^α","Ωϻ^β","Ωϻ^γ","Ωϻ^δ","Ωϻ^ε","Ωϻ^ζ","Ωϻ^η","Ωϻ^θ","Ωϻ^ι","Ωϻ^κ","Ωϻ^λ","Ωϻ^μ","Ωϻ^ν","Ωϻ^ξ","Ωϻ^ο","Ωϻ^π","Ωϻ^ρ","Ωϻ^σ","Ωϻ^τ","Ωϻ^υ","Ωϻ^φ","Ωϻ^χ","Ωϻ^ψ","Ωϻ^ω","Ωϻ^Α","Ωϻ^Β","Ωϻ^Γ","Ωϻ^Δ","Ωϻ^Ε","Ωϻ^Ζ","Ωϻ^Η","Ωϻ^Θ","Ωϻ^Ι","Ωϻ^Κ","Ωϻ^Λ","Ωϻ^Μ","Ωϻ^Ν","Ωϻ^Ξ","Ωϻ^Ο","Ωϻ^Π","Ωϻ^Ρ","Ωϻ^Σ","Ωϻ^Τ","Ωϻ^Υ","Ωϻ^Φ","Ωϻ^Χ","Ωϻ^Ψ","Ωϻ^Ω","Ωϙ^α","Ωϙ^β","Ωϙ^γ","Ωϙ^δ","Ωϙ^ε","Ωϙ^ζ","Ωϙ^η","Ωϙ^θ","Ωϙ^ι","Ωϙ^κ","Ωϙ^λ","Ωϙ^μ","Ωϙ^ν","Ωϙ^ξ","Ωϙ^ο","Ωϙ^π","Ωϙ^ρ","Ωϙ^σ","Ωϙ^τ","Ωϙ^υ","Ωϙ^φ","Ωϙ^χ","Ωϙ^ψ","Ωϙ^ω","Ωϙ^Α","Ωϙ^Β","Ωϙ^Γ","Ωϙ^Δ","Ωϙ^Ε","Ωϙ^Ζ","Ωϙ^Η","Ωϙ^Θ","Ωϙ^Ι","Ωϙ^Κ","Ωϙ^Λ","Ωϙ^Μ","Ωϙ^Ν","Ωϙ^Ξ","Ωϙ^Ο","Ωϙ^Π","Ωϙ^Ρ","Ωϙ^Σ","Ωϙ^Τ","Ωϙ^Υ","Ωϙ^Φ","Ωϙ^Χ","Ωϙ^Ψ","Ωϙ^Ω","Ωͳ^α","Ωͳ^β","Ωͳ^γ","Ωͳ^δ","Ωͳ^ε","Ωͳ^ζ","Ωͳ^η","Ωͳ^θ","Ωͳ^ι","Ωͳ^κ","Ωͳ^λ","Ωͳ^μ","Ωͳ^ν","Ωͳ^ξ","Ωͳ^ο","Ωͳ^π","Ωͳ^ρ","Ωͳ^σ","Ωͳ^τ","Ωͳ^υ","Ωͳ^φ","Ωͳ^χ","Ωͳ^ψ","Ωͳ^ω","Ωͳ^Α","Ωͳ^Β","Ωͳ^Γ","Ωͳ^Δ","Ωͳ^Ε","Ωͳ^Ζ","Ωͳ^Η","Ωͳ^Θ","Ωͳ^Ι","Ωͳ^Κ","Ωͳ^Λ","Ωͳ^Μ","Ωͳ^Ν","Ωͳ^Ξ","Ωͳ^Ο","Ωͳ^Π","Ωͳ^Ρ","Ωͳ^Σ","Ωͳ^Τ","Ωͳ^Υ","Ωͳ^Φ","Ωͳ^Χ","Ωͳ^Ψ","Ωͳ^Ω","Ωϸ^α","Ωϸ^β","Ωϸ^γ","Ωϸ^δ","Ωϸ^ε","Ωϸ^ζ","Ωϸ^η","Ωϸ^θ","Ωϸ^ι","Ωϸ^κ","Ωϸ^λ","Ωϸ^μ","Ωϸ^ν","Ωϸ^ξ","Ωϸ^ο","Ωϸ^π","Ωϸ^ρ","Ωϸ^σ","Ωϸ^τ","Ωϸ^υ","Ωϸ^φ","Ωϸ^χ","Ωϸ^ψ","Ωϸ^ω","Ωϸ^Α","Ωϸ^Β","Ωϸ^Γ","Ωϸ^Δ","Ωϸ^Ε","Ωϸ^Ζ","Ωϸ^Η","Ωϸ^Θ","Ωϸ^Ι","Ωϸ^Κ","Ωϸ^Λ","Ωϸ^Μ","Ωϸ^Ν","Ωϸ^Ξ","Ωϸ^Ο","Ωϸ^Π","Ωϸ^Ρ","Ωϸ^Σ","Ωϸ^Τ","Ωϸ^Υ","Ωϸ^Φ","Ωϸ^Χ","Ωϸ^Ψ","Ωϸ^Ω"];
let OmegaLayersHTML = ["&#945;","&#946;","&#947;","&#948;","&#949;","&#950;","&#951;","&#952;","&#953;","&#954;","&#955;","&#956;","&#957;","&#958;","&#959;","&#960;","&#961;","&#963;","&#964;","&#965;","&#966;","&#967;","&#968;","&#969;","&#913;","&#914;","&#915;","&#916;","&#917;","&#918;","&#919;","&#920;","&#921;","&#922;","&#923;","&#924;","&#925;","&#926;","&#927;","&#928;","&#929;","&#931;","&#932;","&#933;","&#934;","&#935;","&#936;","&#937;","&#937;<sup>&#945;</sup>","&#937;<sup>&#946;</sup>","&#937;<sup>&#947;</sup>","&#937;<sup>&#948;</sup>","&#937;<sup>&#949;</sup>","&#937;<sup>&#950;</sup>","&#937;<sup>&#951;</sup>","&#937;<sup>&#952;</sup>","&#937;<sup>&#953;</sup>","&#937;<sup>&#954;</sup>","&#937;<sup>&#955;</sup>","&#937;<sup>&#956;</sup>","&#937;<sup>&#957;</sup>","&#937;<sup>&#958;</sup>","&#937;<sup>&#959;</sup>","&#937;<sup>&#960;</sup>","&#937;<sup>&#961;</sup>","&#937;<sup>&#963;</sup>","&#937;<sup>&#964;</sup>","&#937;<sup>&#965;</sup>","&#937;<sup>&#966;</sup>","&#937;<sup>&#967;</sup>","&#937;<sup>&#968;</sup>","&#937;<sup>&#969;</sup>","&#937;<sup>&#913;</sup>","&#937;<sup>&#914;</sup>","&#937;<sup>&#915;</sup>","&#937;<sup>&#916;</sup>","&#937;<sup>&#917;</sup>","&#937;<sup>&#918;</sup>","&#937;<sup>&#919;</sup>","&#937;<sup>&#920;</sup>","&#937;<sup>&#921;</sup>","&#937;<sup>&#922;</sup>","&#937;<sup>&#923;</sup>","&#937;<sup>&#924;</sup>","&#937;<sup>&#925;</sup>","&#937;<sup>&#926;</sup>","&#937;<sup>&#927;</sup>","&#937;<sup>&#928;</sup>","&#937;<sup>&#929;</sup>","&#937;<sup>&#931;</sup>","&#937;<sup>&#932;</sup>","&#937;<sup>&#933;</sup>","&#937;<sup>&#934;</sup>","&#937;<sup>&#935;</sup>","&#937;<sup>&#936;</sup>","&#937;<sup>&#937;</sup>","&#937;<sub>&#968;</sub><sup>&#945;</sup>","&#937;<sub>&#968;</sub><sup>&#946;</sup>","&#937;<sub>&#968;</sub><sup>&#947;</sup>","&#937;<sub>&#968;</sub><sup>&#948;</sup>","&#937;<sub>&#968;</sub><sup>&#949;</sup>","&#937;<sub>&#968;</sub><sup>&#950;</sup>","&#937;<sub>&#968;</sub><sup>&#951;</sup>","&#937;<sub>&#968;</sub><sup>&#952;</sup>","&#937;<sub>&#968;</sub><sup>&#953;</sup>","&#937;<sub>&#968;</sub><sup>&#954;</sup>","&#937;<sub>&#968;</sub><sup>&#955;</sup>","&#937;<sub>&#968;</sub><sup>&#956;</sup>","&#937;<sub>&#968;</sub><sup>&#957;</sup>","&#937;<sub>&#968;</sub><sup>&#958;</sup>","&#937;<sub>&#968;</sub><sup>&#959;</sup>","&#937;<sub>&#968;</sub><sup>&#960;</sup>","&#937;<sub>&#968;</sub><sup>&#961;</sup>","&#937;<sub>&#968;</sub><sup>&#963;</sup>","&#937;<sub>&#968;</sub><sup>&#964;</sup>","&#937;<sub>&#968;</sub><sup>&#965;</sup>","&#937;<sub>&#968;</sub><sup>&#966;</sup>","&#937;<sub>&#968;</sub><sup>&#967;</sup>","&#937;<sub>&#968;</sub><sup>&#968;</sup>","&#937;<sub>&#968;</sub><sup>&#969;</sup>","&#937;<sub>&#968;</sub><sup>&#913;</sup>","&#937;<sub>&#968;</sub><sup>&#914;</sup>","&#937;<sub>&#968;</sub><sup>&#915;</sup>","&#937;<sub>&#968;</sub><sup>&#916;</sup>","&#937;<sub>&#968;</sub><sup>&#917;</sup>","&#937;<sub>&#968;</sub><sup>&#918;</sup>","&#937;<sub>&#968;</sub><sup>&#919;</sup>","&#937;<sub>&#968;</sub><sup>&#920;</sup>","&#937;<sub>&#968;</sub><sup>&#921;</sup>","&#937;<sub>&#968;</sub><sup>&#922;</sup>","&#937;<sub>&#968;</sub><sup>&#923;</sup>","&#937;<sub>&#968;</sub><sup>&#924;</sup>","&#937;<sub>&#968;</sub><sup>&#925;</sup>","&#937;<sub>&#968;</sub><sup>&#926;</sup>","&#937;<sub>&#968;</sub><sup>&#927;</sup>","&#937;<sub>&#968;</sub><sup>&#928;</sup>","&#937;<sub>&#968;</sub><sup>&#929;</sup>","&#937;<sub>&#968;</sub><sup>&#931;</sup>","&#937;<sub>&#968;</sub><sup>&#932;</sup>","&#937;<sub>&#968;</sub><sup>&#933;</sup>","&#937;<sub>&#968;</sub><sup>&#934;</sup>","&#937;<sub>&#968;</sub><sup>&#935;</sup>","&#937;<sub>&#968;</sub><sup>&#936;</sup>","&#937;<sub>&#968;</sub><sup>&#937;</sup>","&#937;<sub>&#989;</sub><sup>&#945;</sup>","&#937;<sub>&#989;</sub><sup>&#946;</sup>","&#937;<sub>&#989;</sub><sup>&#947;</sup>","&#937;<sub>&#989;</sub><sup>&#948;</sup>","&#937;<sub>&#989;</sub><sup>&#949;</sup>","&#937;<sub>&#989;</sub><sup>&#950;</sup>","&#937;<sub>&#989;</sub><sup>&#951;</sup>","&#937;<sub>&#989;</sub><sup>&#952;</sup>","&#937;<sub>&#989;</sub><sup>&#953;</sup>","&#937;<sub>&#989;</sub><sup>&#954;</sup>","&#937;<sub>&#989;</sub><sup>&#955;</sup>","&#937;<sub>&#989;</sub><sup>&#956;</sup>","&#937;<sub>&#989;</sub><sup>&#957;</sup>","&#937;<sub>&#989;</sub><sup>&#958;</sup>","&#937;<sub>&#989;</sub><sup>&#959;</sup>","&#937;<sub>&#989;</sub><sup>&#960;</sup>","&#937;<sub>&#989;</sub><sup>&#961;</sup>","&#937;<sub>&#989;</sub><sup>&#963;</sup>","&#937;<sub>&#989;</sub><sup>&#964;</sup>","&#937;<sub>&#989;</sub><sup>&#965;</sup>","&#937;<sub>&#989;</sub><sup>&#966;</sup>","&#937;<sub>&#989;</sub><sup>&#967;</sup>","&#937;<sub>&#989;</sub><sup>&#968;</sup>","&#937;<sub>&#989;</sub><sup>&#969;</sup>","&#937;<sub>&#989;</sub><sup>&#913;</sup>","&#937;<sub>&#989;</sub><sup>&#914;</sup>","&#937;<sub>&#989;</sub><sup>&#915;</sup>","&#937;<sub>&#989;</sub><sup>&#916;</sup>","&#937;<sub>&#989;</sub><sup>&#917;</sup>","&#937;<sub>&#989;</sub><sup>&#918;</sup>","&#937;<sub>&#989;</sub><sup>&#919;</sup>","&#937;<sub>&#989;</sub><sup>&#920;</sup>","&#937;<sub>&#989;</sub><sup>&#921;</sup>","&#937;<sub>&#989;</sub><sup>&#922;</sup>","&#937;<sub>&#989;</sub><sup>&#923;</sup>","&#937;<sub>&#989;</sub><sup>&#924;</sup>","&#937;<sub>&#989;</sub><sup>&#925;</sup>","&#937;<sub>&#989;</sub><sup>&#926;</sup>","&#937;<sub>&#989;</sub><sup>&#927;</sup>","&#937;<sub>&#989;</sub><sup>&#928;</sup>","&#937;<sub>&#989;</sub><sup>&#929;</sup>","&#937;<sub>&#989;</sub><sup>&#931;</sup>","&#937;<sub>&#989;</sub><sup>&#932;</sup>","&#937;<sub>&#989;</sub><sup>&#933;</sup>","&#937;<sub>&#989;</sub><sup>&#934;</sup>","&#937;<sub>&#989;</sub><sup>&#935;</sup>","&#937;<sub>&#989;</sub><sup>&#936;</sup>","&#937;<sub>&#989;</sub><sup>&#937;</sup>","&#937;<sub>&#987;</sub><sup>&#945;</sup>","&#937;<sub>&#987;</sub><sup>&#946;</sup>","&#937;<sub>&#987;</sub><sup>&#947;</sup>","&#937;<sub>&#987;</sub><sup>&#948;</sup>","&#937;<sub>&#987;</sub><sup>&#949;</sup>","&#937;<sub>&#987;</sub><sup>&#950;</sup>","&#937;<sub>&#987;</sub><sup>&#951;</sup>","&#937;<sub>&#987;</sub><sup>&#952;</sup>","&#937;<sub>&#987;</sub><sup>&#953;</sup>","&#937;<sub>&#987;</sub><sup>&#954;</sup>","&#937;<sub>&#987;</sub><sup>&#955;</sup>","&#937;<sub>&#987;</sub><sup>&#956;</sup>","&#937;<sub>&#987;</sub><sup>&#957;</sup>","&#937;<sub>&#987;</sub><sup>&#958;</sup>","&#937;<sub>&#987;</sub><sup>&#959;</sup>","&#937;<sub>&#987;</sub><sup>&#960;</sup>","&#937;<sub>&#987;</sub><sup>&#961;</sup>","&#937;<sub>&#987;</sub><sup>&#963;</sup>","&#937;<sub>&#987;</sub><sup>&#964;</sup>","&#937;<sub>&#987;</sub><sup>&#965;</sup>","&#937;<sub>&#987;</sub><sup>&#966;</sup>","&#937;<sub>&#987;</sub><sup>&#967;</sup>","&#937;<sub>&#987;</sub><sup>&#968;</sup>","&#937;<sub>&#987;</sub><sup>&#969;</sup>","&#937;<sub>&#987;</sub><sup>&#913;</sup>","&#937;<sub>&#987;</sub><sup>&#914;</sup>","&#937;<sub>&#987;</sub><sup>&#915;</sup>","&#937;<sub>&#987;</sub><sup>&#916;</sup>","&#937;<sub>&#987;</sub><sup>&#917;</sup>","&#937;<sub>&#987;</sub><sup>&#918;</sup>","&#937;<sub>&#987;</sub><sup>&#919;</sup>","&#937;<sub>&#987;</sub><sup>&#920;</sup>","&#937;<sub>&#987;</sub><sup>&#921;</sup>","&#937;<sub>&#987;</sub><sup>&#922;</sup>","&#937;<sub>&#987;</sub><sup>&#923;</sup>","&#937;<sub>&#987;</sub><sup>&#924;</sup>","&#937;<sub>&#987;</sub><sup>&#925;</sup>","&#937;<sub>&#987;</sub><sup>&#926;</sup>","&#937;<sub>&#987;</sub><sup>&#927;</sup>","&#937;<sub>&#987;</sub><sup>&#928;</sup>","&#937;<sub>&#987;</sub><sup>&#929;</sup>","&#937;<sub>&#987;</sub><sup>&#931;</sup>","&#937;<sub>&#987;</sub><sup>&#932;</sup>","&#937;<sub>&#987;</sub><sup>&#933;</sup>","&#937;<sub>&#987;</sub><sup>&#934;</sup>","&#937;<sub>&#987;</sub><sup>&#935;</sup>","&#937;<sub>&#987;</sub><sup>&#936;</sup>","&#937;<sub>&#987;</sub><sup>&#937;</sup>","&#937;<sub>&#881;</sub><sup>&#945;</sup>","&#937;<sub>&#881;</sub><sup>&#946;</sup>","&#937;<sub>&#881;</sub><sup>&#947;</sup>","&#937;<sub>&#881;</sub><sup>&#948;</sup>","&#937;<sub>&#881;</sub><sup>&#949;</sup>","&#937;<sub>&#881;</sub><sup>&#950;</sup>","&#937;<sub>&#881;</sub><sup>&#951;</sup>","&#937;<sub>&#881;</sub><sup>&#952;</sup>","&#937;<sub>&#881;</sub><sup>&#953;</sup>","&#937;<sub>&#881;</sub><sup>&#954;</sup>","&#937;<sub>&#881;</sub><sup>&#955;</sup>","&#937;<sub>&#881;</sub><sup>&#956;</sup>","&#937;<sub>&#881;</sub><sup>&#957;</sup>","&#937;<sub>&#881;</sub><sup>&#958;</sup>","&#937;<sub>&#881;</sub><sup>&#959;</sup>","&#937;<sub>&#881;</sub><sup>&#960;</sup>","&#937;<sub>&#881;</sub><sup>&#961;</sup>","&#937;<sub>&#881;</sub><sup>&#963;</sup>","&#937;<sub>&#881;</sub><sup>&#964;</sup>","&#937;<sub>&#881;</sub><sup>&#965;</sup>","&#937;<sub>&#881;</sub><sup>&#966;</sup>","&#937;<sub>&#881;</sub><sup>&#967;</sup>","&#937;<sub>&#881;</sub><sup>&#968;</sup>","&#937;<sub>&#881;</sub><sup>&#969;</sup>","&#937;<sub>&#881;</sub><sup>&#913;</sup>","&#937;<sub>&#881;</sub><sup>&#914;</sup>","&#937;<sub>&#881;</sub><sup>&#915;</sup>","&#937;<sub>&#881;</sub><sup>&#916;</sup>","&#937;<sub>&#881;</sub><sup>&#917;</sup>","&#937;<sub>&#881;</sub><sup>&#918;</sup>","&#937;<sub>&#881;</sub><sup>&#919;</sup>","&#937;<sub>&#881;</sub><sup>&#920;</sup>","&#937;<sub>&#881;</sub><sup>&#921;</sup>","&#937;<sub>&#881;</sub><sup>&#922;</sup>","&#937;<sub>&#881;</sub><sup>&#923;</sup>","&#937;<sub>&#881;</sub><sup>&#924;</sup>","&#937;<sub>&#881;</sub><sup>&#925;</sup>","&#937;<sub>&#881;</sub><sup>&#926;</sup>","&#937;<sub>&#881;</sub><sup>&#927;</sup>","&#937;<sub>&#881;</sub><sup>&#928;</sup>","&#937;<sub>&#881;</sub><sup>&#929;</sup>","&#937;<sub>&#881;</sub><sup>&#931;</sup>","&#937;<sub>&#881;</sub><sup>&#932;</sup>","&#937;<sub>&#881;</sub><sup>&#933;</sup>","&#937;<sub>&#881;</sub><sup>&#934;</sup>","&#937;<sub>&#881;</sub><sup>&#935;</sup>","&#937;<sub>&#881;</sub><sup>&#936;</sup>","&#937;<sub>&#881;</sub><sup>&#937;</sup>","&#937;<sub>&#1019;</sub><sup>&#945;</sup>","&#937;<sub>&#1019;</sub><sup>&#946;</sup>","&#937;<sub>&#1019;</sub><sup>&#947;</sup>","&#937;<sub>&#1019;</sub><sup>&#948;</sup>","&#937;<sub>&#1019;</sub><sup>&#949;</sup>","&#937;<sub>&#1019;</sub><sup>&#950;</sup>","&#937;<sub>&#1019;</sub><sup>&#951;</sup>","&#937;<sub>&#1019;</sub><sup>&#952;</sup>","&#937;<sub>&#1019;</sub><sup>&#953;</sup>","&#937;<sub>&#1019;</sub><sup>&#954;</sup>","&#937;<sub>&#1019;</sub><sup>&#955;</sup>","&#937;<sub>&#1019;</sub><sup>&#956;</sup>","&#937;<sub>&#1019;</sub><sup>&#957;</sup>","&#937;<sub>&#1019;</sub><sup>&#958;</sup>","&#937;<sub>&#1019;</sub><sup>&#959;</sup>","&#937;<sub>&#1019;</sub><sup>&#960;</sup>","&#937;<sub>&#1019;</sub><sup>&#961;</sup>","&#937;<sub>&#1019;</sub><sup>&#963;</sup>","&#937;<sub>&#1019;</sub><sup>&#964;</sup>","&#937;<sub>&#1019;</sub><sup>&#965;</sup>","&#937;<sub>&#1019;</sub><sup>&#966;</sup>","&#937;<sub>&#1019;</sub><sup>&#967;</sup>","&#937;<sub>&#1019;</sub><sup>&#968;</sup>","&#937;<sub>&#1019;</sub><sup>&#969;</sup>","&#937;<sub>&#1019;</sub><sup>&#913;</sup>","&#937;<sub>&#1019;</sub><sup>&#914;</sup>","&#937;<sub>&#1019;</sub><sup>&#915;</sup>","&#937;<sub>&#1019;</sub><sup>&#916;</sup>","&#937;<sub>&#1019;</sub><sup>&#917;</sup>","&#937;<sub>&#1019;</sub><sup>&#918;</sup>","&#937;<sub>&#1019;</sub><sup>&#919;</sup>","&#937;<sub>&#1019;</sub><sup>&#920;</sup>","&#937;<sub>&#1019;</sub><sup>&#921;</sup>","&#937;<sub>&#1019;</sub><sup>&#922;</sup>","&#937;<sub>&#1019;</sub><sup>&#923;</sup>","&#937;<sub>&#1019;</sub><sup>&#924;</sup>","&#937;<sub>&#1019;</sub><sup>&#925;</sup>","&#937;<sub>&#1019;</sub><sup>&#926;</sup>","&#937;<sub>&#1019;</sub><sup>&#927;</sup>","&#937;<sub>&#1019;</sub><sup>&#928;</sup>","&#937;<sub>&#1019;</sub><sup>&#929;</sup>","&#937;<sub>&#1019;</sub><sup>&#931;</sup>","&#937;<sub>&#1019;</sub><sup>&#932;</sup>","&#937;<sub>&#1019;</sub><sup>&#933;</sup>","&#937;<sub>&#1019;</sub><sup>&#934;</sup>","&#937;<sub>&#1019;</sub><sup>&#935;</sup>","&#937;<sub>&#1019;</sub><sup>&#936;</sup>","&#937;<sub>&#1019;</sub><sup>&#937;</sup>","&#937;<sub>&#985;</sub><sup>&#945;</sup>","&#937;<sub>&#985;</sub><sup>&#946;</sup>","&#937;<sub>&#985;</sub><sup>&#947;</sup>","&#937;<sub>&#985;</sub><sup>&#948;</sup>","&#937;<sub>&#985;</sub><sup>&#949;</sup>","&#937;<sub>&#985;</sub><sup>&#950;</sup>","&#937;<sub>&#985;</sub><sup>&#951;</sup>","&#937;<sub>&#985;</sub><sup>&#952;</sup>","&#937;<sub>&#985;</sub><sup>&#953;</sup>","&#937;<sub>&#985;</sub><sup>&#954;</sup>","&#937;<sub>&#985;</sub><sup>&#955;</sup>","&#937;<sub>&#985;</sub><sup>&#956;</sup>","&#937;<sub>&#985;</sub><sup>&#957;</sup>","&#937;<sub>&#985;</sub><sup>&#958;</sup>","&#937;<sub>&#985;</sub><sup>&#959;</sup>","&#937;<sub>&#985;</sub><sup>&#960;</sup>","&#937;<sub>&#985;</sub><sup>&#961;</sup>","&#937;<sub>&#985;</sub><sup>&#963;</sup>","&#937;<sub>&#985;</sub><sup>&#964;</sup>","&#937;<sub>&#985;</sub><sup>&#965;</sup>","&#937;<sub>&#985;</sub><sup>&#966;</sup>","&#937;<sub>&#985;</sub><sup>&#967;</sup>","&#937;<sub>&#985;</sub><sup>&#968;</sup>","&#937;<sub>&#985;</sub><sup>&#969;</sup>","&#937;<sub>&#985;</sub><sup>&#913;</sup>","&#937;<sub>&#985;</sub><sup>&#914;</sup>","&#937;<sub>&#985;</sub><sup>&#915;</sup>","&#937;<sub>&#985;</sub><sup>&#916;</sup>","&#937;<sub>&#985;</sub><sup>&#917;</sup>","&#937;<sub>&#985;</sub><sup>&#918;</sup>","&#937;<sub>&#985;</sub><sup>&#919;</sup>","&#937;<sub>&#985;</sub><sup>&#920;</sup>","&#937;<sub>&#985;</sub><sup>&#921;</sup>","&#937;<sub>&#985;</sub><sup>&#922;</sup>","&#937;<sub>&#985;</sub><sup>&#923;</sup>","&#937;<sub>&#985;</sub><sup>&#924;</sup>","&#937;<sub>&#985;</sub><sup>&#925;</sup>","&#937;<sub>&#985;</sub><sup>&#926;</sup>","&#937;<sub>&#985;</sub><sup>&#927;</sup>","&#937;<sub>&#985;</sub><sup>&#928;</sup>","&#937;<sub>&#985;</sub><sup>&#929;</sup>","&#937;<sub>&#985;</sub><sup>&#931;</sup>","&#937;<sub>&#985;</sub><sup>&#932;</sup>","&#937;<sub>&#985;</sub><sup>&#933;</sup>","&#937;<sub>&#985;</sub><sup>&#934;</sup>","&#937;<sub>&#985;</sub><sup>&#935;</sup>","&#937;<sub>&#985;</sub><sup>&#936;</sup>","&#937;<sub>&#985;</sub><sup>&#937;</sup>","&#937;<sub>&#883;</sub><sup>&#945;</sup>","&#937;<sub>&#883;</sub><sup>&#946;</sup>","&#937;<sub>&#883;</sub><sup>&#947;</sup>","&#937;<sub>&#883;</sub><sup>&#948;</sup>","&#937;<sub>&#883;</sub><sup>&#949;</sup>","&#937;<sub>&#883;</sub><sup>&#950;</sup>","&#937;<sub>&#883;</sub><sup>&#951;</sup>","&#937;<sub>&#883;</sub><sup>&#952;</sup>","&#937;<sub>&#883;</sub><sup>&#953;</sup>","&#937;<sub>&#883;</sub><sup>&#954;</sup>","&#937;<sub>&#883;</sub><sup>&#955;</sup>","&#937;<sub>&#883;</sub><sup>&#956;</sup>","&#937;<sub>&#883;</sub><sup>&#957;</sup>","&#937;<sub>&#883;</sub><sup>&#958;</sup>","&#937;<sub>&#883;</sub><sup>&#959;</sup>","&#937;<sub>&#883;</sub><sup>&#960;</sup>","&#937;<sub>&#883;</sub><sup>&#961;</sup>","&#937;<sub>&#883;</sub><sup>&#963;</sup>","&#937;<sub>&#883;</sub><sup>&#964;</sup>","&#937;<sub>&#883;</sub><sup>&#965;</sup>","&#937;<sub>&#883;</sub><sup>&#966;</sup>","&#937;<sub>&#883;</sub><sup>&#967;</sup>","&#937;<sub>&#883;</sub><sup>&#968;</sup>","&#937;<sub>&#883;</sub><sup>&#969;</sup>","&#937;<sub>&#883;</sub><sup>&#913;</sup>","&#937;<sub>&#883;</sub><sup>&#914;</sup>","&#937;<sub>&#883;</sub><sup>&#915;</sup>","&#937;<sub>&#883;</sub><sup>&#916;</sup>","&#937;<sub>&#883;</sub><sup>&#917;</sup>","&#937;<sub>&#883;</sub><sup>&#918;</sup>","&#937;<sub>&#883;</sub><sup>&#919;</sup>","&#937;<sub>&#883;</sub><sup>&#920;</sup>","&#937;<sub>&#883;</sub><sup>&#921;</sup>","&#937;<sub>&#883;</sub><sup>&#922;</sup>","&#937;<sub>&#883;</sub><sup>&#923;</sup>","&#937;<sub>&#883;</sub><sup>&#924;</sup>","&#937;<sub>&#883;</sub><sup>&#925;</sup>","&#937;<sub>&#883;</sub><sup>&#926;</sup>","&#937;<sub>&#883;</sub><sup>&#927;</sup>","&#937;<sub>&#883;</sub><sup>&#928;</sup>","&#937;<sub>&#883;</sub><sup>&#929;</sup>","&#937;<sub>&#883;</sub><sup>&#931;</sup>","&#937;<sub>&#883;</sub><sup>&#932;</sup>","&#937;<sub>&#883;</sub><sup>&#933;</sup>","&#937;<sub>&#883;</sub><sup>&#934;</sup>","&#937;<sub>&#883;</sub><sup>&#935;</sup>","&#937;<sub>&#883;</sub><sup>&#936;</sup>","&#937;<sub>&#883;</sub><sup>&#937;</sup>","&#937;<sub>&#1016;</sub><sup>&#945;</sup>","&#937;<sub>&#1016;</sub><sup>&#946;</sup>","&#937;<sub>&#1016;</sub><sup>&#947;</sup>","&#937;<sub>&#1016;</sub><sup>&#948;</sup>","&#937;<sub>&#1016;</sub><sup>&#949;</sup>","&#937;<sub>&#1016;</sub><sup>&#950;</sup>","&#937;<sub>&#1016;</sub><sup>&#951;</sup>","&#937;<sub>&#1016;</sub><sup>&#952;</sup>","&#937;<sub>&#1016;</sub><sup>&#953;</sup>","&#937;<sub>&#1016;</sub><sup>&#954;</sup>","&#937;<sub>&#1016;</sub><sup>&#955;</sup>","&#937;<sub>&#1016;</sub><sup>&#956;</sup>","&#937;<sub>&#1016;</sub><sup>&#957;</sup>","&#937;<sub>&#1016;</sub><sup>&#958;</sup>","&#937;<sub>&#1016;</sub><sup>&#959;</sup>","&#937;<sub>&#1016;</sub><sup>&#960;</sup>","&#937;<sub>&#1016;</sub><sup>&#961;</sup>","&#937;<sub>&#1016;</sub><sup>&#963;</sup>","&#937;<sub>&#1016;</sub><sup>&#964;</sup>","&#937;<sub>&#1016;</sub><sup>&#965;</sup>","&#937;<sub>&#1016;</sub><sup>&#966;</sup>","&#937;<sub>&#1016;</sub><sup>&#967;</sup>","&#937;<sub>&#1016;</sub><sup>&#968;</sup>","&#937;<sub>&#1016;</sub><sup>&#969;</sup>","&#937;<sub>&#1016;</sub><sup>&#913;</sup>","&#937;<sub>&#1016;</sub><sup>&#914;</sup>","&#937;<sub>&#1016;</sub><sup>&#915;</sup>","&#937;<sub>&#1016;</sub><sup>&#916;</sup>","&#937;<sub>&#1016;</sub><sup>&#917;</sup>","&#937;<sub>&#1016;</sub><sup>&#918;</sup>","&#937;<sub>&#1016;</sub><sup>&#919;</sup>","&#937;<sub>&#1016;</sub><sup>&#920;</sup>","&#937;<sub>&#1016;</sub><sup>&#921;</sup>","&#937;<sub>&#1016;</sub><sup>&#922;</sup>","&#937;<sub>&#1016;</sub><sup>&#923;</sup>","&#937;<sub>&#1016;</sub><sup>&#924;</sup>","&#937;<sub>&#1016;</sub><sup>&#925;</sup>","&#937;<sub>&#1016;</sub><sup>&#926;</sup>","&#937;<sub>&#1016;</sub><sup>&#927;</sup>","&#937;<sub>&#1016;</sub><sup>&#928;</sup>","&#937;<sub>&#1016;</sub><sup>&#929;</sup>","&#937;<sub>&#1016;</sub><sup>&#931;</sup>","&#937;<sub>&#1016;</sub><sup>&#932;</sup>","&#937;<sub>&#1016;</sub><sup>&#933;</sup>","&#937;<sub>&#1016;</sub><sup>&#934;</sup>","&#937;<sub>&#1016;</sub><sup>&#935;</sup>","&#937;<sub>&#1016;</sub><sup>&#936;</sup>","&#937;<sub>&#1016;</sub><sup>&#937;</sup>"];
let OmegaLayersBasePlain = new AlternateBaseNotation(
    OmegaLayersPlain, -1, 0, 0, 0, 480**4, 1, 3, 1, 1, -1, true, 1, ["↑"], ".", [["↑↑", ""], [false, ""], ["↑↑↑", ""], [false, ""]]
);
let OmegaLayersBaseHTML = new AlternateBaseNotation(
    OmegaLayersHTML, -1, 0, 0, 0, 480**4, 1, 3, 1, 1, -1, true, 1, ["&#8593;"], ".", [["&#8593;&#8593;", ""], [false, ""], ["&#8593;&#8593;&#8593;", ""], [false, ""]]
)
Presets.OmegaLayers = new PrestigeLayerNotation(24, 1e24, false, [[3, 1.1, 1.1], [8, 1, 1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(
    ((value) => value.plus(1)), OmegaLayersBasePlain, ((value) => value)
)).setName("Omega Layers");
Presets.OmegaLayersRamped = new PrestigeLayerNotation(24, 1e24, false, [[1, 1.1, 1.1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(
    ((value) => value.plus(1)), OmegaLayersBasePlain, ((value) => value)
)).setName("Omega Layers (Ramped)");
Presets.OmegaLayerNumber = new FractionNotation(-1e-6, true, ...[,,,,,], [[" (", ")"], ["/(", ")"], ["", ""]], 1, OmegaLayersBasePlain).setName("Omega Layer Number");
HTMLPresets.OmegaLayers = new PrestigeLayerNotation(24, 1e24, false, [[3, 1.1, 1.1], [8, 1, 1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(
    ((value) => value.plus(1)), OmegaLayersBaseHTML, ((value) => value)
)).setName("Omega Layers");
HTMLPresets.OmegaLayersRamped = new PrestigeLayerNotation(24, 1e24, false, [[1, 1.1, 1.1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(
    ((value) => value.plus(1)), OmegaLayersBaseHTML, ((value) => value)
)).setName("Omega Layers (Ramped)");
HTMLPresets.OmegaLayerNumber = new FractionNotation(-1e-6, true, ...[,,,,,], [[" (", ")"], ["/(", ")"], ["", ""]], 1, OmegaLayersBaseHTML).setName("Omega Layer Number");

Presets.IncreasingOperator = new IncreasingOperatorNotation(10, [10, Infinity, Infinity, 0, Infinity, 0]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator");
HTMLPresets.IncreasingOperator = new IncreasingOperatorNotation(10, [10, Infinity, Infinity, 0, Infinity, 0]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator");
Presets.IncreasingOperatorBase2 = new IncreasingOperatorNotation(
    2, [2, Decimal.dInf, Decimal.dInf, 0, Decimal.dInf, 0],
    [[["2 + ", ""], ["2 + ", ""], [" + ", ""], ["2 * ", ""]],
    [["2 * ", ""], ["2 * ", ""], [" * ", ""], ["2^", ""]],
    [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
    [["2^", ""], ["2^", ""], [" ", ""], ["(2^)^", ""]],
    [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
    [["2^^", ""], ["2^^", ""], [" ", ""], ["(2^^)^", ""]]], 
    [[2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2]]
).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 2)");
HTMLPresets.IncreasingOperatorBase2 = new IncreasingOperatorNotation(
    2, [2, Decimal.dInf, Decimal.dInf, 0, Decimal.dInf, 0],
    [[["2 + ", ""], ["2 + ", ""], [" + ", ""], ["2 * ", ""]],
    [["2 * ", ""], ["2 * ", ""], [" * ", ""], ["2^", ""]],
    [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]],
    [["2^", ""], ["2^", ""], [" ", ""], ["(2^)^", ""]],
    [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]],
    [["2^^", ""], ["2^^", ""], [" ", ""], ["(2^^)^", ""]]], 
    [[2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2],
    [2, true, 4, 2, 2]]
).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 2)");
Presets.IncreasingOperatorBase3 = new IncreasingOperatorNotation(
    [3, 3, 3, 3, 3, 3], [3, Decimal.dInf, Decimal.dInf, 0, Decimal.dInf, 0],
    [[["3 + ", ""], ["3 + ", ""], [" + ", ""], ["3 * ", ""]],
    [["3 * ", ""], ["3 * ", ""], [" * ", ""], ["3^", ""]],
    [["", "^3"], ["(", ")^3"], ["", ""], ["^3^", ""]],
    [["3^", ""], ["3^", ""], [" ", ""], ["(3^)^", ""]],
    [["", "^^3"], ["(", ")^^3"], ["", ""], [" (^^3)^", ""]],
    [["3^^", ""], ["3^^", ""], [" ", ""], ["(3^^)^", ""]]], 
    [[3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2]]
).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 3)");
HTMLPresets.IncreasingOperatorBase3 = new IncreasingOperatorNotation(
    [3, 3, 3, 3, 3, 3], [3, Decimal.dInf, Decimal.dInf, 0, Decimal.dInf, 0],
    [[["3 + ", ""], ["3 + ", ""], [" + ", ""], ["3 * ", ""]],
    [["3 * ", ""], ["3 * ", ""], [" * ", ""], ["3^", ""]],
    [["", "^3"], ["(", ")^3"], ["", ""], ["^3^", ""]],
    [["3^", ""], ["3^", ""], [" ", ""], ["(3^)^", ""]],
    [["", "^^3"], ["(", ")^^3"], ["", ""], [" (^^3)^", ""]],
    [["3^^", ""], ["3^^", ""], [" ", ""], ["(3^^)^", ""]]], 
    [[3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2],
    [3, true, 4, 3, 2]]
).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 3)");
Presets.Omega = new IncreasingOperatorNotation(
    8000,
    [8000, Infinity, Infinity, 0, Infinity, 0],
    [
        [["ω^", ""], ["ω^", ""], ["", ""], ["ω(", ")^"]],
        [["ω(", ")"], ["ω(", ")"], ["(", ")"], ["ω[", "]"]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["ω[", "]"], ["ω[", "]"], ["[", "]"], ["ω{", "}"]]
    ], 
    [
        [0, 8000, 3, 10, 5],
        [0, 8000, 0, 100, 5]
    ], null, null, undefined,
    [
        [0, "β<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [1000, "ζ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [2000, "λ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [3000, "ψ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [4000, "Σ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [5000, "Θ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [6000, "Ψ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [7000, "ω<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
    ], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["Ʊ(", ")"]
).setName("Omega")
HTMLPresets.Omega = new IncreasingOperatorNotation(
    8000,
    [8000, Infinity, Infinity, 0, Infinity, 0],
    [
        [["&omega;^", ""], ["&omega;^", ""], ["", ""], ["&omega;(", ")^"]],
        [["&omega;(", ")"], ["&omega;(", ")"], ["(", ")"], ["&omega;[", "]"]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["&omega;[", "]"], ["&omega;[", "]"], ["[", "]"], ["&omega;{", "}"]]
    ], 
    [
        [0, 8000, 3, 10, 5],
        [0, 8000, 0, 100, 5]
    ], null, null, undefined,
    [
        [0, "&beta;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [1000, "&zeta;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [2000, "&lambda;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [3000, "&psi;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [4000, "&Sigma;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [5000, "&Theta;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [6000, "&Psi;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [7000, "&omega;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
    ], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["&#433;(", ")"]
).setName("Omega")
Presets.OmegaShort = new IncreasingOperatorNotation(
    8000,
    [8000, Infinity, Infinity, 0, Infinity, 0],
    [
        [["ω^", ""], ["ω^", ""], ["", ""], ["ω(", ")^"]],
        [["ω(", ")"], ["ω(", ")"], ["(", ")"], ["ω[", "]"]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["ω[", "]"], ["ω[", "]"], ["[", "]"], ["ω{", "}"]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["ω{", "}"], ["ω{", "}"], ["[", "]"], ["ω{{", "}}"]]
    ], 
    [
        [0, 8000, 2, 10, 1],
        [0, 8000, 0, 100, 1],
        [0, 8000, 0, 100, 1],
        [0, 8000, 0, 100, 5],
    ], null, null, undefined,
    [
        [0, "β<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [1000, "ζ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [2000, "λ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [3000, "ψ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [4000, "Σ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [5000, "Θ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [6000, "Ψ<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
        [7000, "ω<", ">", "", "", (value) => true, new DefaultNotation(0, 0)],
    ], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["Ʊ(", ")"]
).setName("Omega (Short)")
HTMLPresets.OmegaShort = new IncreasingOperatorNotation(
    8000,
    [8000, Infinity, Infinity, 0, Infinity, 0],
    [
        [["&omega;^", ""], ["&omega;^", ""], ["", ""], ["&omega;(", ")^"]],
        [["&omega;(", ")"], ["&omega;(", ")"], ["(", ")"], ["&omega;[", "]"]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["&omega;[", "]"], ["&omega;[", "]"], ["[", "]"], ["&omega;{", "}"]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["&omega;{", "}"], ["&omega;{", "}"], ["[", "]"], ["&omega;{{", "}}"]]
    ], 
    [
        [0, 8000, 2, 10, 1],
        [0, 8000, 0, 100, 1],
        [0, 8000, 0, 100, 1],
        [0, 8000, 0, 100, 5],
    ], null, null, undefined,
    [
        [0, "&beta;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [1000, "&zeta;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [2000, "&lambda;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [3000, "&psi;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [4000, "&Sigma;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [5000, "&Theta;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [6000, "&Psi;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
        [7000, "&omega;<sub>", "</sub>", "", "", (value) => true, new DefaultNotation(0, 0)],
    ], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["&#433;(", ")"]
).setName("Omega (Short)")
let Fours = new IncreasingOperatorNotation(
    [16, 4, 2, 4, 2, 4],
    [16, 1024, 0, Infinity, Infinity, Infinity],
    [
        [["", "+4×4"], ["", "+4×4"], ["", "+"], ["4×4×", ""]],
        [["", ""], ["", ""], ["", ""], ["", ""]],
        [["", ""], ["", ""], ["", ""], ["^", ""]],
        [["4^", ""], ["4^", ""], ["", ""], ["", ""]],
        [["", ""], ["", ""], ["", ""], ["^^", ""]],
        [["4^^", ""], ["4^^", ""], ["", ""], ["", ""]]
    ], 
    [
        [0, 16, 1, 0, 2],
        [0, 0, 0, 0, 0],
        [0, 1024, 0, 0, 0],
        [0, Infinity, 3, 0, 0],
        [0, 4**16, 0, 0, 0],
        [0, Infinity, 3, 0, 0]
        
    ], [true, 2, 256], [false, 1, 4**16],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0, "4-4", "", "", "", (value) => false, new DefaultNotation()],
        [1, "4÷4", "", "", "", (value) => false, new DefaultNotation()],
        [2, "√4", "", "", "", (value) => false, new DefaultNotation()],
        [3, "4-4÷4", "", "", "", (value) => false, new DefaultNotation()],
        [4, "4", "", "", "", (value) => false, new DefaultNotation()],
        [5, "4+4÷4", "", "", "", (value) => false, new DefaultNotation()],
        [6, "4!÷4", "", "", "", (value) => false, new DefaultNotation()],
        [7, "(4!+4)÷4", "", "", "", (value) => false, new DefaultNotation()],
        [8, "4+4", "", "", "", (value) => false, new DefaultNotation()],
        [9, "4+4+4÷4", "", "", "", (value) => false, new DefaultNotation()],
        [10, "4!÷4+4", "", "", "", (value) => false, new DefaultNotation()],
        [11, "44÷4", "", "", "", (value) => false, new DefaultNotation()],
        [12, "4!÷√4", "", "", "", (value) => false, new DefaultNotation()],
        [13, "44÷4+√4", "", "", "", (value) => false, new DefaultNotation()],
        [14, "4×4-√4", "", "", "", (value) => false, new DefaultNotation()],
        [15, "4×4-4÷4", "", "", "", (value) => false, new DefaultNotation()],
    ], [false, false, false, false, false, false],
    [
        [["", "", false], ["", "", false], ["(", ")", false]],
        [["", "", false], ["", "", false], ["", "", false]],
        [["", "", false], ["(", ")", false], ["(", ")", false]],
        [["(", ")", false], ["", "", false], ["", "", false]],
        [["", "", false], ["(", ")", false], ["(", ")", false]],
        [["(", ")", false], ["", "", false], ["", "", false]]
    ],
    [
        [(value) => (value.floor().neq(0)), (value) => (value.floor().neq(0)), ["", "4×4"], ["", "4×4"]]
    ], new DefaultNotation(), new DefaultNotation(), 1, ["(4÷4)÷(", ")"]
)
Presets.Fours = new ConditionalNotation(false, [new AppliedFunctionNotation((value) => Decimal.div(4, value), Fours, (str) => ("4÷(" + str + ")")), (value) => (value.abs().lt(1) && value.neq(0))], [Fours, (value) => true]).setNotationGlobals(["-(", ")"]).setName("Fours");
HTMLPresets.Fours = new ConditionalNotation(false, [new AppliedFunctionNotation((value) => Decimal.div(4, value), Fours, (str) => ("4÷(" + str + ")")), (value) => (value.abs().lt(1) && value.neq(0))], [Fours, (value) => true]).setNotationGlobals(["-(", ")"]).setName("Fours");

Presets.Triangular = new PolygonalNotation(3, [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]], 26796).setName("Triangular");
HTMLPresets.Triangular = new PolygonalNotation(3, [["&#x25B3;", ""], ["&#x25B3;(", ")"], ["&#x25B3;&#x25B3;", ""], ["&#x25B3;&#x25B3;(", ")"], ["&#x25B3;&#x25B3;&#x25B3;", ""], ["&#x25B3;&#x25B3;&#x25B3;(", ")"]], 26796).setName("Triangular");
Presets.Square = new PolygonalNotation(4, [["□", ""], ["□(", ")"], ["□□", ""], ["□□(", ")"], ["□□□", ""], ["□□□(", ")"]], 65536).setName("Square");
HTMLPresets.Square = new PolygonalNotation(4, [["□", ""], ["□(", ")"], ["□□", ""], ["□□(", ")"], ["□□□", ""], ["□□□(", ")"]], 65536).setName("Square");

Presets.DoubleFactorials = new DoubleFactorialsNotation().setName("Double Factorials");
HTMLPresets.DoubleFactorials = new DoubleFactorialsNotation().setName("Double Factorials");

Presets.Grid = new GridNotation(...[,,,,,,,,], " || ").setName("Grid");
HTMLPresets.Grid = new GridNotation(...[,,], ["&#x25A1;", "&#x25A0;"], ["", "&nbsp;&nbsp;&nbsp;", "&#x25C7;"], undefined, "<br>", "", "<br>", "<br><br>").setName("Grid");
let tetrationFloat = new HypersplitNotation([["", ""], ["", ""], ["", ""], ["", ""]], 2, [2, 1024, 512], [1, 1, 1, 1], 0, ...[,,,], [
    new AppliedFunctionNotation(undefined, new GridNotation(11, 1, ["0", "1"], undefined, true, "", ...[,,,,], [true, true, true]), (str) => str.slice(1)),
    new GridNotation(10, 1, ["0", "1"], undefined, false, "", ...[,,,,], [true, true, true]),
    new GridNotation(9, 1, ["0", "1"], undefined, false, "", ...[,,,,], [true, true, true]),
    new DefaultNotation()
]);
Presets.TetrationFloat = new ConditionalNotation(true,
    [new PredeterminedNotation("01111111111100000000000000000000"), value => value.eq(0)],
    [new PredeterminedNotation("00111111111100000000000000000000"), value => value.eq(Infinity)],
    [new PredeterminedNotation("10111111111100000000000000000000"), value => value.eq(-Infinity)],
    [new PredeterminedNotation("00111111111101010101010101010101"), value => !(value.isFinite())],
    [new AppliedFunctionNotation(value => value, tetrationFloat, str => "00" + str), value => value.gte(1)],
    [new AppliedFunctionNotation(value => value.neg(), tetrationFloat, str => "10" + str), value => value.lte(-1)],
    [new AppliedFunctionNotation(value => value.recip(), tetrationFloat, str => "01" + str), value => value.lt(1) && value.gt(0)],
    [new AppliedFunctionNotation(value => value.neg().recip(), tetrationFloat, str => "11" + str), value => value.gt(-1) && value.lt(0)]
).setName("Tetration Float");
HTMLPresets.TetrationFloat = new ConditionalNotation(true,
    [new PredeterminedNotation("01111111111100000000000000000000"), value => value.eq(0)],
    [new PredeterminedNotation("00111111111100000000000000000000"), value => value.eq(Infinity)],
    [new PredeterminedNotation("10111111111100000000000000000000"), value => value.eq(-Infinity)],
    [new PredeterminedNotation("00111111111101010101010101010101"), value => !(value.isFinite())],
    [new AppliedFunctionNotation(value => value, tetrationFloat, str => "00" + str), value => value.gte(1)],
    [new AppliedFunctionNotation(value => value.neg(), tetrationFloat, str => "10" + str), value => value.lte(-1)],
    [new AppliedFunctionNotation(value => value.recip(), tetrationFloat, str => "01" + str), value => value.lt(1) && value.gt(0)],
    [new AppliedFunctionNotation(value => value.neg().recip(), tetrationFloat, str => "11" + str), value => value.gt(-1) && value.lt(0)]
).setName("Tetration Float");
Presets.Polynomial = (value : DecimalSource) => new PolynomialNotation(value, ...[,,,,,,,,,,,,,,,], ["^", ""], ["", ""], 0, ...[,,,,,,,], defaultRound).setName("Polynomial (x = " + new DefaultNotation().format(value) + ")");
HTMLPresets.Polynomial = (value : DecimalSource) => new PolynomialNotation(value, ...[,,,,,,,,,,,,,,,,,,,,,,,,,], defaultRound).setName("Polynomial (x = " + new DefaultNotation().format(value) + ")");
Presets.RationalFunction = (value : DecimalSource) => new FractionNotation(-1e-6, ...[,,,,,,], [["(", ")"], [" / (", ")"], ["", " "]], 1, new PolynomialNotation(value, ...[,,,,,,,,,,,,,,,], ["^", ""], ["", ""], 0, ...[,,,,,,,], defaultRound)).setName("Rational Function (x = " + new DefaultNotation().format(value) + ")");
HTMLPresets.RationalFunction = (value : DecimalSource) => new FractionNotation(-1e-6, ...[,,,,,,], [["(", ")"], [" / (", ")"], ["", " "]], 1, new PolynomialNotation(value, ...[,,,,,,,,,,,,,,,,,,,,,,,,,], defaultRound)).setName("Rational Function (x = " + new DefaultNotation().format(value) + ")").setName("Rational Function (x = " + new DefaultNotation().format(value) + ")");
Presets.BaseThreeHalves = new ExpandedDefaultNotation(1.5**39, 1, 5, 1.5, ...[,,,,,,,,,,,], new PolynomialNotation(1.5, 0, -Infinity, false, 39, "", 1.5**39, 1.5**39, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base 1.5");
Presets.BasePhi = new ExpandedDefaultNotation(1.618033988749895**30, 1, 5, 1.618033988749895, ...[,,,,,,,,,,,], new PolynomialNotation(1.618033988749895, 0, -Infinity, false, 39, "", 1.618033988749895**30, 1.618033988749895**30, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base phi");
Presets.BaseE = new ExpandedDefaultNotation(2.718281828459045**21, 1, 5, 2.718281828459045, ...[,,,,,,,,,,,], new PolynomialNotation(2.718281828459045, 0, -Infinity, false, 39, "", 2.718281828459045**21, 2.718281828459045**21, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base e");
Presets.BasePi = new ExpandedDefaultNotation(3.141592653589793**20, 1, 5, 3.141592653589793, ...[,,,,,,,,,,,], new PolynomialNotation(3.141592653589793, 0, -Infinity, false, 39, "", 3.141592653589793**20, 3.141592653589793**20, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base pi");
HTMLPresets.BaseThreeHalves = new ExpandedDefaultNotation(1.5**39, 1, 5, 1.5, ...[,,,,,,,,,,,], new PolynomialNotation(1.5, 0, -Infinity, false, 39, "", 1.5**39, 1.5**39, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base 1.5");
HTMLPresets.BasePhi = new ExpandedDefaultNotation(1.618033988749895**30, 1, 5, 1.618033988749895, ...[,,,,,,,,,,,], new PolynomialNotation(1.618033988749895, 0, -Infinity, false, 39, "", 1.618033988749895**30, 1.618033988749895**30, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base phi");
HTMLPresets.BaseE = new ExpandedDefaultNotation(2.718281828459045**21, 1, 5, 2.718281828459045, ...[,,,,,,,,,,,], new PolynomialNotation(2.718281828459045, 0, -Infinity, false, 39, "", 2.718281828459045**21, 2.718281828459045**21, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base e");
HTMLPresets.BasePi = new ExpandedDefaultNotation(3.141592653589793**20, 1, 5, 3.141592653589793, ...[,,,,,,,,,,,], new PolynomialNotation(3.141592653589793, 0, -Infinity, false, 39, "", 3.141592653589793**20, 3.141592653589793**20, 5, 1, undefined, "", "", "", "", ...[,,,,], [true, true], ...[,,,], "-", ["", "."])).setName("Base pi");

Presets.Blind = new PredeterminedNotation("").setName("Blind");
Presets.PowersOfOne = new AppliedFunctionNotation((value) => Decimal.pow(1, value), new DefaultNotation(), (str) => str).setName("Powers of One");
HTMLPresets.Blind = new PredeterminedNotation("").setName("Blind");
HTMLPresets.PowersOfOne = new AppliedFunctionNotation((value) => Decimal.pow(1, value), new DefaultNotation(), (str) => str).setName("Powers of One");


export { Presets, HTMLPresets }