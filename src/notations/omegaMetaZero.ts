import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, scientifify } from "../baseline/utils.js";

    /**
     * Writes numbers as the layers seen in VeproGames's "Omega Meta Zero". Sort of like a mixed radix base, but with Greek letters, alchemical planet symbols, exponent-styled towers of symbols, and more instead of digits and exponents.
     * This notation would be too complicated to explain all at once, so see the info on the parameters to understand each step of the process.
     * (Unless otherwise stated, whenever a parameter that's an array where each entry corresponds to a set of symbols is given less entries than the amount of sets of symbols, the unfilled entries are set to be the same as the last entry that was provided.)
     * @param symbols ( string[][] ) These are the digits of the mixed-radix base. Each entry of symbols is an array of strings used for one position in the base.
     * symbols[n][0] is the digit for 0 in that position, symbols[n][1] is the digit for 1, and so on. Default is
     * [["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
     * "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"
     * ], ["ϝ", "ϛ", "ͱ", "ϻ", "ϙ", "ͳ", "ϸ"], ["☿", "♀", "♁", "♂", "♃", "♄", "♅", "♆", "♇"]].
     * @param towerHeight ( Decimal | Decimal[] ) Rather than immediately incrementing the next set of symbols after reaching the last symbol of a set, this notation repeats that set of symbols but as an "exponent" on top of the last symbol in its set.
     * This continues until that tower reaches a certain height, and only afterwards does that set of symbols reset and the next set increment. This parameter controls that maximum tower height. If this parameter is a single Decimal,
     * every symbol set has the same maximum height. If it's an array of Decimals, towerHeight[n] is the tower height limit for symbols[n]. Default is 5.
     * @param towerChars ( ([string, string] | boolean )[] ) This parameter controls the characters used to indicate the aforementioned towers. If towerChars[n] is a pair of strings, then for each tower level, towerChars[n][0] goes before the symbol from symbols[n], towerChars[n][1] goes afterwards.
     * If towerChars[n] is a boolean, then a default pair of strings is used: ["s^", ""] for false, ["s<sup>", "</sup>"] for true, where that "s" is replaced with whatever the last symbol of symbols[n] is. Default is false for all entries.
     * @param visibleTowerMax ( number | number[] ) If a tower is taller than this, the tower's entries are concatenated into a "tower iteration" expression. Like with towerHeight, a single number applies to all symbol sets,
     * while an array of numbers has each number correspond to one symbol set. Default is 5.
     * @param toweriterationChars ( [string, string, boolean, Notation][] ) When a tower is tall enough to be concatenated, the entry of this array corresponding to that symbol set is used to express the amount of tower iterations.
     * towerIterationChars[n][0] goes before the amount of iterations, towerIterationChars[n][1] goes after the amount of iterations, towerIterationChars[n][2] is whether the iterations expression goes before or after the symbol atop the tower (before if false, after if true), and towerIterationChars[n][3] is the Notation that the amount of iterations is written in.
     * Default is [["((Ω^)^", ")", false, new DefaultNotation()], ["((ϸ^)^", ")", false, new DefaultNotation()], ["((♇^)^", ")", false, new DefaultNotation()]], though since visibleTowerMax isn't less than towerHeight by default, this parameter doesn't come into play unless one of those parameters is changed from its default.
     * @param symbolAfter ( boolean | boolean[] ) If symbolAfter[n] is true, then the symbol from the next symbol set will go after the current expression instead of before. If a single boolean is provided, all entries are set to that boolean. Default is false.
     * @param parentheses ( [string, string, string, string, string, string][] ) When the nth symbol set is added to the resulting string, parentheses[n][0] goes around the entire expression thus far and parentheses[n][1] goes after, before the new symbol is added.
     * parentheses[n][2] and [n][3] go before and after the new symbol, and parentheses[n][4] and [n][5] go before and after the entire expression after the new symbol is added.
     * The default has ["", "", "", "", "", ""] for parentheses[0] and ["(", ")", "", "", "", ""] for the rest of the entries.
     * @param symbolShown ( ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean) | ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean)[] )
     * The symbol of the nth symbol set is only shown in the resulting expression if calling symbolShown[n] on the value that symbol represents would return true.
     * If only a single function is provided, all entries are set to that function. The default has (value => true) for symbolShown[0] and (value => value.gt(0)) for the rest of the entries,
     * i.e. the greek letters are always visible but the higher two sets only show up if they're nonzero.
     * Like Array.map(), you can include extra arguments in the function: args[1] will be the symbol set's index (so the first symbol set will have index 0, the second symbol set has index 1, etc.), arg[2] is the entire array of symbol values for that digit,
     * arg[3] is the index of the digit this symbol set is part of (the ones place is index 0, the next larger digit is index 1, etc. If there are decimal places, they have negative index), arg[4] is the amount of decimal digits, and arg[5] is the entire array of digit values.
     * @param brackets ( [string, string, string, string, string, string][] ) After the last symbol set, this notation starts using multiple "digits", where a single "digit" consists of a run of symbols from each set.
     * The entries in brackets are placed around each digit (via the same rules as the entries of parentheses) in a cycle: brackets[0] is used for the last digit, brackets[1] for the second-to-last, brackets[2] for the third-to-last, and so on, looping back to brackets[0] after the last entry.
     * Default is [["", "", "[", "]", "", ""]].
     * @param firstBrackets ( [string, string, string, string, string, string][] ) If this array has any entries, the first few digits use those entries instead of the entries in brackets.
     * Default is [["", "", "", "", "", ""]], i.e. the first digit doesn't have the [] around it but the rest do.
     * @param lastBrackets ( [string, string, string, string, string, string][] ) If this array has any entries, the last few digits use those entries instead of the entries in brackets.
     * Default is [], i.e. there's no special treatment for the last digits.
     * @param reverseDigits ( boolean ) Normally, the largest digit is on the left and the smallest digit is on the right, like in a normal number base.
     * If this parameter is true, the order of the digits is reversed. Default is false.
     * @param maxVisibleDigits ( number ) The maximum amount of digits before the notation switches to scientific form (in which the amount of unshown digits is written as an exponent like in scientific notation). Default is 3.
     * @param expChars ( [string, string, string, string, string, string] ) The characters placed around the exponent in scientific form (using the same rules as parentheses and brackets). Default is ["", "", "{", "}", "", ""].
     * @param expAfter ( boolean ) If this parameter is true, the exponent is written after the digits instead of before. Default is false.
     * @param maxVisibleDigitsInExp ( number ) The amount of digits shown once the expression is in scientific form. Default is 2.
     * @param exponentOffset ( boolean ) If this parameter is false, the exponent is the amount of unwritten digits. If this parameter is true, the exponent is increased to one less than the amount of total digits, as if there was a decimal point after the first digit. Default is true.
     * @param bracketsInExp ( [string, string, string, string, string, string][] ) Same as brackets, but this parameter is used instead once the expression is in scientific form. Is the same as brackets by default.
     * @param firstBracketsInExp ( [string, string, string, string, string, string][] ) Same as firstBrackets, but this parameter is used instead once the expression is in scientific form. Is the same as firstBrackets by default.
     * @param lastBracketsInExp ( [string, string, string, string, string, string][] ) Same as lastBrackets, but this parameter is used instead once the expression is in scientific form. Is the same as lastBrackets by default.
     * @param expInnerNotation ( Notation | null ) If this parameter is null, the exponent is written in this Omega Meta Zero notation itself. If this parameter is a notation, the exponent is written in that notation. Default is null.
     * @param uncertainChar ( string ) If the exponent is so large that the digits cease to be relevant, this string is placed where the digits would be. Default is "◯".
     * @param uncertainThreshold ( Decimal ) If the exponent is equal to or greater than this value, uncertainChar is written instead of the digits. Default is 636152238258658, which matches with the point where the original Omega Meta Zero starts using ◯.
     * @param maxVisibleLayers ( number ) The maximum amount of layers of nested exponents before the notation starts writing the amount of additional layers separately (note that this is a little different from the original Omega Meta Zero, which switches to base-10 hyperscientific at this point). Default is 4.
     * @param layerChars ( [string, string, string, string, string, string] ) The characters placed around the amount of extra exponent layers (using the same rules as expChars). Default is ["", "", "◖", "◗", "", ""].
     * @param layerAfter ( boolean ) If this parameter is true, the amount of layers is written after the rest of the expression instead of before. Default is false.
     * @param maxVisibleLayersPost ( number ) The amount of nested exponent layers shown after the amount of extra layers starts being written separately. Default is 1.
     * @param layerOffset ( boolean ) If this parameter is false, the layer number is the amount of unwritten layers. If this parameter is true, the layer number is increased to one less than the amount of total layers. Default is false.
     * @param layerInnerNotation ( Notation | null ) If this parameter is null, the layer number is written in this Omega Meta Zero notation itself. If this parameter is a notation, the layer number is written in that notation. Default is null.
     * @param layerUncertainChar ( string ) If the layer is so large that the exponent and digits cease to be relevant, this string is placed where the exponent and digits would be. Is the same as uncertainChar by default.
     * @param layerUncertainThreshold ( Decimal ) If the layer amount is equal to or greater than this value, layerUncertainChair is written instead of the exponent and digits. Default is 9e15.
     * @param decimalPlaces ( number ) The amount of digits shown after the ones digit. Default is 0.
     * @param decimalPoint ( [string, string] ) Once all the sub-ones digits are written but before the whole digits are written, decimalPoint[0] goes before the expression, decimalPoint[1] goes after. Default is [";", ""].
     * @param decimalBrackets ( [string, string, string, string, string, string][] ) Same as brackets, but used for sub-ones digits instead. Default is [["", "", "[", "]", "", ""]].
     * @param showDecimalZeroes ( number ) If this number is negative, trailing zero sub-ones digits are not shown. If this number is zero, trailing zero sub-ones digits are only shown if at least one sub-ones digit is nonzero. If this number is positive, training zero sub-ones digits are shown. Default is 1.
     * @param negExpThreshold ( number ) If the amount of leading zero sub-one digits would be at least this, the number is written in scientific form (with a negative exponent) instead. Default is 1.
     * @param negExpChars ( null | [string, string, string, string, string, string] ) If this parameter is not null, then when the exponent is negative, negExpChars is used instead of expChars (and the exponent is written as its absolute value). Default is null.
     * @param negExpAfter ( boolean ) If negExpChars is used instead of expChars, negExpAfter is used instead of expAfter. Default is false.
     * @param recipThreshold ( number ) Numbers too small to write as themselves are written in terms of their reciprocals.
     * If recipThreshold is 0, anything below 1 is written in terms of its reciprocal. If recipThreshold is 1, then numbers that would be written in negative-exponent scientific are written in terms of their reciprocal.
     * If recipThreshold is 2, then the threshold for writing in terms of its reciprocal is the negative exponent point where the digits switch to using undefinedChar, or the point where a second exponent layer shows up, whichever is less small.
     * If recipThreshold is 3, the threshold is the second exponent layer. Any other recipThreshold value acts as 0. Default is 2.
     * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal, recipString[0] goes before it, recipString[1] goes after. Default is ["/", ""].
     */
export class OmegaMetaZeroNotation extends Notation {
    private _symbols : string[][] = [
      [
        "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
        "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"
      ], ["ϝ", "ϛ", "ͱ", "ϻ", "ϙ", "ͳ", "ϸ"], ["☿", "♀", "♁", "♂", "♃", "♄", "♅", "♆", "♇"]
    ]
    private _towerHeight : Decimal[] = [new Decimal(5), new Decimal(5), new Decimal(5)];
    private _towerChars : [string, string][] = [];
    private _visibleTowerMax : number[] = [5, 5, 5];
    private _toweriterationChars : [string, string, boolean, Notation][] = [];
    private _symbolAfter : boolean[] = [false, false, false];
    private _parentheses : [string, string, string, string, string, string][] = [["", "", "", "", "", ""], ["(", ")", "", "", "", ""], ["(", ")", "", "", "", ""]];
    private _symbolShown : ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean)[] = [value => true, value => value.gt(0), value => value.gt(0)];
    private _brackets : [string, string, string, string, string, string][] = [["", "", "[", "]", "", ""]];
    public firstBrackets : [string, string, string, string, string, string][] = [["", "", "", "", "", ""]];
    public lastBrackets : [string, string, string, string, string, string][] = [];
    public reverseDigits : boolean = false;
    private _maxVisibleDigits : number = 3;
    public expChars : [string, string, string, string, string, string] = ["", "", "{", "}", "", ""];
    public expAfter : boolean = false;
    private _maxVisibleDigitsInExp : number = 2;
    public exponentOffset : boolean = true;
    private _bracketsInExp : [string, string, string, string, string, string][] = this._brackets;
    public firstBracketsInExp : [string, string, string, string, string, string][] = this.firstBrackets;
    public lastBracketsInExp : [string, string, string, string, string, string][] = this.lastBrackets;
    public expInnerNotation : Notation | null = null;
    public uncertainChar : string = "◯";
    public uncertainThreshold : Decimal = new Decimal(636152238258658);
    private _maxVisibleLayers : number = 4;
    public layerChars : [string, string, string, string, string, string] = ["", "", "◖", "◗", "", ""];
    public layerAfter : boolean = false;
    private _maxVisibleLayersPost : number = 1;
    public layerOffset : boolean = false;
    public layerInnerNotation : Notation | null = null;
    public layerUncertainChar : string = this.uncertainChar;
    public layerUncertainThreshold : Decimal = new Decimal(9e15);
    private _decimalPlaces : number = 0;
    public decimalPoint : [string, string] = [";", ""];
    private _decimalBrackets : [string, string, string, string, string, string][] = [["", "", "[", "]", "", ""]];
    public showDecimalZeroes : number = 1;
    private _negExpThreshold : number = 1;
    public negExpChars : null | [string, string, string, string, string, string] = null;
    public negExpAfter : boolean = false;
    public recipThreshold : number = 0;
    public recipString : [string, string] = ["/", ""];

    constructor(
      symbols : string[][] = [
        [
          "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
          "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"
        ], ["ϝ", "ϛ", "ͱ", "ϻ", "ϙ", "ͳ", "ϸ"], ["☿", "♀", "♁", "♂", "♃", "♄", "♅", "♆", "♇"]
      ],
      towerHeight : DecimalSource | DecimalSource[] = 5,
      towerChars : ([string, string] | boolean)[] = [false],
      visibleTowerMax : number | number[] = 5,
      toweriterationChars : [string, string, boolean, Notation][] = [],
      symbolAfter : boolean | boolean[] = false,
      parentheses : [string, string, string, string, string, string][] = [["", "", "", "", "", ""], ["(", ")", "", "", "", ""], ["(", ")", "", "", "", ""]],
      symbolShown : ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean) | ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean)[] = [value => true, value => value.gt(0), value => value.gt(0)],
      brackets : [string, string, string, string, string, string][] = [["", "", "[", "]", "", ""]],
      firstBrackets : [string, string, string, string, string, string][] = [["", "", "", "", "", ""]],
      lastBrackets : [string, string, string, string, string, string][] = [],
      reverseDigits : boolean = false,
      maxVisibleDigits : number = 3,
      expChars : [string, string, string, string, string, string] = ["", "", "{", "}", "", ""],
      expAfter : boolean = false,
      maxVisibleDigitsInExp : number = 2,
      exponentOffset : boolean = true,
      bracketsInExp : [string, string, string, string, string, string][] = brackets,
      firstBracketsInExp : [string, string, string, string, string, string][] = firstBrackets,
      lastBracketsInExp : [string, string, string, string, string, string][] = lastBrackets,
      expInnerNotation : Notation | null = null,
      uncertainChar : string = "◯",
      uncertainThreshold : DecimalSource = 636152238258658,
      maxVisibleLayers : number = 4,
      layerChars : [string, string, string, string, string, string] = ["", "", "◖", "◗", "", ""],
      layerAfter : boolean = false,
      maxVisibleLayersPost : number = 1,
      layerOffset : boolean = false,
      layerInnerNotation : Notation | null = null,
      layerUncertainChar : string = uncertainChar,
      layerUncertainThreshold : DecimalSource = 9e15,
      decimalPlaces : number = 0,
      decimalPoint : [string, string] = [";", ""],
      decimalBrackets : [string, string, string, string, string, string][] = [["", "", "[", "]", "", ""]],
      showDecimalZeroes : number = 1,
      negExpThreshold : number = 1,
      negExpChars : null | [string, string, string, string, string, string] = null,
      negExpAfter : boolean = false,
      recipThreshold : number = 0,
      recipString : [string, string] = ["/", ""]
        ) {
      super();
      this.setSymbolsAndOthers(symbols, towerHeight, towerChars, visibleTowerMax, toweriterationChars, symbolAfter, parentheses, symbolShown);
      this.brackets = brackets;
      this.firstBrackets = firstBrackets;
      this.lastBrackets = lastBrackets;
      this.reverseDigits = reverseDigits;
      this.maxVisibleDigits = maxVisibleDigits;
      this.expChars = expChars;
      this.expAfter = expAfter;
      this.maxVisibleDigitsInExp = maxVisibleDigitsInExp;
      this.exponentOffset = exponentOffset;
      this.bracketsInExp = bracketsInExp;
      this.firstBracketsInExp = firstBracketsInExp;
      this.lastBracketsInExp = lastBracketsInExp;
      this.expInnerNotation = expInnerNotation;
      this.uncertainChar = uncertainChar;
      this.uncertainThreshold = toDecimal(uncertainThreshold);
      this.maxVisibleLayers = maxVisibleLayers;
      this.layerChars = layerChars;
      this.layerAfter = layerAfter;
      this.maxVisibleLayersPost = maxVisibleLayersPost;
      this.layerOffset = layerOffset;
      this.layerInnerNotation = layerInnerNotation;
      this.layerUncertainChar = layerUncertainChar;
      this.layerUncertainThreshold = toDecimal(layerUncertainThreshold);
      this.decimalPlaces = decimalPlaces;
      this.decimalPoint = decimalPoint;
      this.decimalBrackets = decimalBrackets;
      this.showDecimalZeroes = showDecimalZeroes;
      this.negExpThreshold = negExpThreshold;
      this.negExpChars = negExpChars;
      this.negExpAfter = negExpAfter;
      this.recipThreshold = recipThreshold;
      this.recipString = recipString; 
    }

    public name = "Omega Meta Zero Notation";

    private formatSingleDigit(value : Decimal, limits ? : Decimal[], transitions ? : Decimal[], digitIndex : number = 0, decimalPlaces : number = 0, digitValues : Decimal[] = [value]) : string {
      if (limits === undefined) {
        limits = [new Decimal(this._symbols[0].length).mul(this._towerHeight[0])];
        for (let s = 1; s < this._symbols.length - 1; s++) limits.push(Decimal.mul(this._symbols[s].length, this._towerHeight[s]));
        limits.push(Decimal.dInf);
      }
      if (transitions === undefined) {
        transitions = [limits[0]];
        for (let s = 1; s < this._symbols.length - 1; s++) transitions.push(transitions[s - 1].mul(limits[s]));
        transitions.push(Decimal.dInf);
      }
      let currentValue = value;
      let remainders : Decimal[] = [];
      for (let s = this._symbols.length - 2; s >= 0; s--) {
        let thisRemainder = currentValue.div(transitions[s]).floor();
        remainders.push(thisRemainder);
        currentValue = currentValue.mod(transitions[s], true);
      }
      remainders.push(currentValue.round());
      remainders.reverse();
      let cleared = 0;
      let copiedRemainders : Decimal[] = [];
      for (let r = 0; r < remainders.length; r++) copiedRemainders.push(remainders[r]);
      while (copiedRemainders.length > 1 && copiedRemainders[copiedRemainders.length - 1].eq(0)) copiedRemainders.pop();
      while (cleared < copiedRemainders.length) {
        if (copiedRemainders[cleared].eq(0) && copiedRemainders.length > 1) {
          let examined = cleared + 1;
          while (examined < copiedRemainders.length) {
            if (copiedRemainders[examined].neq(0)) break;
            examined++;
          }
          if (examined == copiedRemainders.length) {
            copiedRemainders = copiedRemainders.slice(0, cleared);
            cleared--;
            continue;
          }
        }
        if (copiedRemainders[cleared].gte(0) && copiedRemainders[cleared].lt(limits[cleared])) cleared++;
        else {
          let offset = copiedRemainders[cleared].div(limits[cleared]).floor();
          if (cleared == limits.length - 1) {
            if (copiedRemainders[cleared].lt(0)) {
              copiedRemainders[cleared] = copiedRemainders[cleared].sub(offset.mul(limits[cleared]));
              copiedRemainders.pop();
              cleared--;
            }
            else break;
          }
          if (cleared == copiedRemainders.length - 1) copiedRemainders.push(Decimal.dZero);
          copiedRemainders[cleared + 1] = copiedRemainders[cleared + 1].plus(offset);
          copiedRemainders[cleared] = copiedRemainders[cleared].sub(offset.mul(limits[cleared]));
        }
      }
      for (let r = 0; r < remainders.length; r++) remainders[r] = (r < copiedRemainders.length) ? copiedRemainders[r] : Decimal.dZero;
      let result = "";
      for (let s = 0; s < remainders.length; s++) {
        let thisRemainder = remainders[s];
        if (this._symbolShown[s](thisRemainder, s, remainders, digitIndex, decimalPlaces, digitValues)) {
          let towerHeight = thisRemainder.div(this._symbols[s].length).floor();
          let numRemainder = thisRemainder.mod(this._symbols[s].length, true).toNumber();
          result = this._parentheses[s][0] + result + this._parentheses[s][1];
          let symbolStr = this._symbols[s][numRemainder];
          if (towerHeight.gte(0) && towerHeight.lte(this._visibleTowerMax[s])) {
            for (let t = 0; t < towerHeight.toNumber(); t++) symbolStr = this._towerChars[s][0] + symbolStr + this._towerChars[s][1];
          }
          else {
            let towerStr = this._toweriterationChars[s][0] + this._toweriterationChars[s][3].format(towerHeight) + this._toweriterationChars[s][1];
            if (this._toweriterationChars[s][2]) symbolStr = symbolStr + towerStr;
            else symbolStr = towerStr + symbolStr;
          }
          symbolStr = this._parentheses[s][2] + symbolStr + this._parentheses[s][3];
          if (this._symbolAfter[s]) result = result + symbolStr;
          else result = symbolStr + result;
          result = this._parentheses[s][4] + result + this._parentheses[s][5];
        }
      }
      return result;
    }
  
    public formatDecimal(value: Decimal): string {
      let limits = [new Decimal(this._symbols[0].length).mul(this._towerHeight[0])];
      for (let s = 1; s < this._symbols.length; s++) limits.push(Decimal.mul(this._symbols[s].length, this._towerHeight[s]));
      let transitions = [limits[0]];
      for (let s = 1; s < this._symbols.length; s++) transitions.push(transitions[s - 1].mul(limits[s]));
      limits.pop();
      let digitBase = transitions[transitions.length - 1];
      let recipThreshold = Decimal.dOne;
      if (this.recipThreshold == 1) {
        recipThreshold = digitBase.pow(-this._negExpThreshold);
      }
      else if (this.recipThreshold == 2) {
        let offset = (this.exponentOffset) ? 0 : this._maxVisibleDigitsInExp - 1
        let exponentLimit = Decimal.min(this.uncertainThreshold.plus(offset), Decimal.pow(digitBase, this._maxVisibleDigits));
        recipThreshold = Decimal.pow(digitBase, exponentLimit.plus(offset)).recip();
      }
      else if (this.recipThreshold == 3) {
        let offset = (this.exponentOffset) ? 0 : this._maxVisibleDigitsInExp - 1
        let exponentLimit = Decimal.pow(digitBase, this._maxVisibleDigits);
        recipThreshold = Decimal.pow(digitBase, exponentLimit.plus(offset)).recip();
      }
      if (value.neq(0) && value.lt(recipThreshold)) return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
      let layerLimit = digitBase.pow(this._maxVisibleDigits);
      let layerMantissaLimit = layerLimit;
      for (let l = 0; l < this._maxVisibleLayers;) {
        if (!this.exponentOffset) layerLimit = layerLimit.plus(this._maxVisibleDigitsInExp - 1);
        layerLimit = digitBase.pow(layerLimit);
        if (l < this._maxVisibleLayersPost) layerMantissaLimit = layerLimit;
        l++;
        if (layerLimit.gte("e100")) {
          layerLimit = Decimal.iteratedexp(digitBase, this._maxVisibleLayers - l, layerLimit, true);
          if (l < this._maxVisibleLayersPost) layerMantissaLimit = Decimal.iteratedexp(digitBase, this._maxVisibleLayersPost - l, layerLimit, true);
          break;
        }
      }
      transitions.pop(); // Would have just put this statement into digitBase, but then TypeScript would have to account for the case where it's undefined
      let digits : Decimal[] = [];
      let currentValue = value;
      let exponent : Decimal = Decimal.dZero;
      let layers : Decimal = Decimal.dZero;
      let scientific = false;
      let layerScientific = false;
      if (value.gte(layerLimit)) {
        layerScientific = true;
        if (currentValue.gte(layerMantissaLimit)) {
          let safeMax = Decimal.max("ee100", layerMantissaLimit);
          let safeMaxSlog = Decimal.slog(safeMax, digitBase, true);
          while (currentValue.gte(safeMax)) {
            if (!currentValue.isFinite()) currentValue = layerMantissaLimit; // Combats imprecision
            let safeIterations = Decimal.slog(currentValue, digitBase, true).sub(safeMaxSlog).floor().plus(1).max(0).toNumber();
            layers = layers.plus(safeIterations);
            currentValue = currentValue.iteratedlog(digitBase, safeIterations, true);
          }
          while (currentValue.gte(layerMantissaLimit)) {
            if (!currentValue.isFinite()) currentValue = layerMantissaLimit; // Combats imprecision
            currentValue = currentValue.log(digitBase);
            if (!this.exponentOffset) currentValue = currentValue.sub(this._maxVisibleDigitsInExp - 1);
            layers = layers.plus(1);
          }
        }
        if (this.layerOffset) layers = layers.plus(this._maxVisibleLayersPost);
      }
      if (layers.gte(this.layerUncertainThreshold)) exponent = Decimal.dInf;
      else if (currentValue.gte(digitBase.pow(this._maxVisibleDigits)) || (currentValue.neq(0) && currentValue.lt(digitBase.pow(-this._negExpThreshold)))) {
        scientific = true;
        [currentValue, exponent] = scientifify(currentValue, digitBase, 0, this._maxVisibleDigitsInExp - 1);
        if (this.exponentOffset) exponent = exponent.plus(this._maxVisibleDigitsInExp - 1);
      }
      let decimalPlaces = this._decimalPlaces;
      if (scientific) decimalPlaces = 0;
      if (value.eq(0)) decimalPlaces = 0;
      if (exponent.abs().lt(this.uncertainThreshold)) {
        let digitExponent = Decimal.log(currentValue, digitBase).floor();
        for (let e = digitExponent.toNumber(); e > -decimalPlaces; e--) {
          let placeValue = Decimal.pow(digitBase, e);
          let thisRemainder = currentValue.div(placeValue).floor();
          digits.push(thisRemainder);
          currentValue = currentValue.mod(placeValue, true);
        }
        digits.push(currentValue.mul(Decimal.pow(digitBase, decimalPlaces)).floor());
        digits.reverse();
        while (digits.length > decimalPlaces && digits.length > 1 && digits[digits.length - 1].eq(0)) digits.pop();
        let cleared = 0;
        let copiedDigits : Decimal[] = [];
        for (let r = 0; r < digits.length; r++) copiedDigits.push(digits[r]);
        while (cleared < digits.length) {
          if (copiedDigits[cleared].eq(0)) {
            let examined = cleared + 1;
            while (examined < copiedDigits.length) {
              if (copiedDigits[examined].neq(0)) break;
              examined++;
            }
            if (examined == copiedDigits.length) {
              copiedDigits = copiedDigits.slice(0, cleared);
              cleared--;
              if (copiedDigits.length == 0) break;
              continue;
            }
          }
          if (copiedDigits[cleared].gte(0) && copiedDigits[cleared].lt(digitBase)) cleared++;
          else {
            let offset = copiedDigits[cleared].div(digitBase).floor();
            if (cleared == copiedDigits.length - 1) copiedDigits.push(Decimal.dZero);
            copiedDigits[cleared + 1] = copiedDigits[cleared + 1].plus(offset);
            copiedDigits[cleared] = copiedDigits[cleared].sub(offset.mul(digitBase));
          }
        }
        for (let r = 0; r < digits.length; r++) digits[r] = (r < copiedDigits.length) ? copiedDigits[r] : Decimal.dZero;
      }
      let removeDecimalZeroes = false;
      if (this.showDecimalZeroes < 0) removeDecimalZeroes = true;
      else if (this.showDecimalZeroes > 0) removeDecimalZeroes = false;
      else {
        removeDecimalZeroes = true;
        for (let d = 0; d < this._decimalPlaces && d < digits.length; d++) if (digits[d].neq(0)) {removeDecimalZeroes = false; break;}
      }
      if (removeDecimalZeroes) {
        while (digits.length > 0 && digits[0].eq(0) && decimalPlaces > 0) {
          digits.shift();
          decimalPlaces--;
        }
      }
      if (digits.length != 0) {
        while (digits.length < decimalPlaces + 1) digits.push(Decimal.dZero);
      }
      let result = "";
      if (exponent.eq(Infinity)) {
        result = this.layerUncertainChar;
      }
      else {
        if (digits.length == 0) result = this.uncertainChar;
        else for (let s = 0; s < digits.length; s++) {
          let thisDigit = digits[s];
          let usedBrackets : [string, string, string, string, string, string];
          if (scientific) {
            if (digits.length - s - 1 < this.firstBracketsInExp.length) usedBrackets = this.firstBracketsInExp[digits.length - s - 1];
            else if (s < this.lastBracketsInExp.length) usedBrackets = this.lastBracketsInExp[s];
            else usedBrackets = this._bracketsInExp[s % this._bracketsInExp.length];
          }
          else {
            if (s < decimalPlaces) usedBrackets = this.decimalBrackets[(-s - 1) % this._decimalBrackets.length]
            else if (digits.length - s - 1 < this.firstBrackets.length) usedBrackets = this.firstBrackets[digits.length - s - 1];
            else if ((s - decimalPlaces) < this.lastBrackets.length) usedBrackets = this.lastBrackets[(s - decimalPlaces)];
            else usedBrackets = this._brackets[(s - decimalPlaces) % this._brackets.length];
          }
          result = usedBrackets[0] + result + usedBrackets[1];
          let symbolStr = this.formatSingleDigit(thisDigit, undefined, undefined, s - decimalPlaces, decimalPlaces, digits);
          symbolStr = usedBrackets[2] + symbolStr + usedBrackets[3];
          if (this.reverseDigits) result = result + symbolStr;
          else result = symbolStr + result;
          result = usedBrackets[4] + result + usedBrackets[5];
          if (s == decimalPlaces - 1) {
            result = this.decimalPoint[0] + result + this.decimalPoint[1];
          }
        }
        if (scientific) {
          let usedExpChars = this.expChars;
          let usedExpAfter = this.expAfter;
          if (exponent.lt(0) && this.negExpChars !== null) {
            exponent = exponent.abs();
            usedExpChars = this.negExpChars;
            usedExpAfter = this.negExpAfter;
          }
          result = usedExpChars[0] + result + usedExpChars[1];
          let symbolStr : string;
          if (this.expInnerNotation === null) symbolStr = this.format(exponent);
          else symbolStr = this.expInnerNotation.format(exponent);
          symbolStr = usedExpChars[2] + symbolStr + usedExpChars[3];
          if (usedExpAfter) result = result + symbolStr;
          else result = symbolStr + result;
          result = usedExpChars[4] + result + usedExpChars[5];
        }
      }
      if (layerScientific) {
        result = this.layerChars[0] + result + this.layerChars[1];
        let symbolStr : string;
        if (this.layerInnerNotation === null) symbolStr = this.format(layers);
        else symbolStr = this.layerInnerNotation.format(layers);
        symbolStr = this.layerChars[2] + symbolStr + this.layerChars[3];
        if (this.layerAfter) result = result + symbolStr;
        else result = symbolStr + result;
        result = this.layerChars[4] + result + this.layerChars[5];
      }
      return result;
    }

    private setSymbolsAndOthers(
      symbols : string[][],
      towerHeight : DecimalSource | DecimalSource[],
      towerChars : ([string, string] | boolean)[],
      visibleTowerMax : number | number[],
      toweriterationChars : [string, string, boolean, Notation][],
      symbolAfter : boolean | boolean[],
      parentheses : [string, string, string, string, string, string][],
      symbolShown : ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean) | ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean)[],
    ) {
      if (symbols.length == 0) throw new Error("Omega Meta Zero notation doesn't work without any symbols!");
      for (let s = 0; s < symbols.length; s++) if (symbols[s].length < 2) throw new Error("Each set of symbols in Omega Meta Zero notation must have at least two symbols")
      this._symbols = symbols;
      // Changing the amount of symbol sets requires re-running a bunch of other setters too
      this.towerHeight = towerHeight;
      this.towerChars = towerChars;
      this.visibleTowerMax = visibleTowerMax;
      this.towerIterationChars = toweriterationChars;
      this.symbolAfter = symbolAfter;
      this.parentheses = parentheses;
      this.symbolShown = symbolShown;
    }

    public get symbols() {
      return this._symbols;
    }

    public set symbols(symbols : string[][]) {
      if (symbols.length == 0) throw new Error("Omega Meta Zero notation doesn't work without any symbols!");
      for (let s = 0; s < symbols.length; s++) if (symbols[s].length < 2) throw new Error("Each set of symbols in Omega Meta Zero notation must have at least two symbols")
      this.setSymbolsAndOthers(symbols, this._towerHeight, this._towerChars, this._visibleTowerMax, this._toweriterationChars, this._symbolAfter, this._parentheses, this._symbolShown)
    }

    public get towerHeight() {
      return this._towerHeight;
    }

    public set towerHeight(towerHeight : DecimalSource | DecimalSource[]) {
      if (!Array.isArray(towerHeight)) towerHeight = [towerHeight];
      let towerHeightD = towerHeight.map(toDecimal)
      if (towerHeightD.length == 0) towerHeightD.push(new Decimal(5));
      while (towerHeightD.length < this._symbols.length) towerHeightD.push(towerHeightD[towerHeightD.length - 1]);
      this._towerHeight = towerHeightD;
    }

    public get towerChars() {
      return this._towerChars;
    }

    public set towerChars(towerChars : ([string, string] | boolean)[]) {
      if (towerChars.length == 0) towerChars.push(false);
      while (towerChars.length < this.symbols.length) towerChars.push(towerChars[towerChars.length - 1]);
      // Another round of "writing the code in a more complicated way to make TypeScript happy":
      let newTowerChars : [string, string][] = [];
      for (let t = 0; t < towerChars.length; t++) {
        let tc = towerChars[t];
        if (tc === true) newTowerChars.push([this.symbols[t][this.symbols[t].length - 1] + "<sup>", "</sup>"])
        else if (tc === false) newTowerChars.push([this.symbols[t][this.symbols[t].length - 1] + "^", ""]);
        else newTowerChars.push(tc);
      }
      this._towerChars = newTowerChars;
    }

    public get visibleTowerMax() {
      return this._visibleTowerMax;
    }

    public set visibleTowerMax(visibleTowerMax : number | number[]) {
      if (!Array.isArray(visibleTowerMax)) visibleTowerMax = [visibleTowerMax];
      if (visibleTowerMax.length == 0) visibleTowerMax.push(5);
      while (visibleTowerMax.length < this.symbols.length) visibleTowerMax.push(visibleTowerMax[visibleTowerMax.length - 1]);
      this._visibleTowerMax = visibleTowerMax;
    }

    public get towerIterationChars() {
      return this._toweriterationChars;
    }

    public set towerIterationChars(towerIterationChars : [string, string, boolean, Notation][]) {
      while (towerIterationChars.length < this.symbols.length) towerIterationChars.push(["(" + this._towerChars[towerIterationChars.length][0] + "^", this._towerChars[towerIterationChars.length][1] + ")", false, new DefaultNotation()]);
      this._toweriterationChars = towerIterationChars;
    }

    public get symbolAfter() {
      return this._symbolAfter;
    }

    public set symbolAfter(symbolAfter : boolean | boolean[]) {
      if (!Array.isArray(symbolAfter)) symbolAfter = [symbolAfter];
      if (symbolAfter.length == 0) symbolAfter.push(false);
      while (symbolAfter.length < this.symbols.length) symbolAfter.push(symbolAfter[symbolAfter.length - 1]);
      this._symbolAfter = symbolAfter;
    }

    public get parentheses() {
      return this._parentheses;
    }

    public set parentheses(parentheses : [string, string, string, string, string, string][]) {
      if (parentheses.length == 0) parentheses.push(["", "", "", "", "", ""]);
      while (parentheses.length < this.symbols.length) parentheses.push(parentheses[parentheses.length - 1]);
      this._parentheses = parentheses;
    }

    public get symbolShown() {
      return this._symbolShown;
    }

    public set symbolShown(symbolShown : ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean) | ((value : Decimal, index : number, symbolValues : Decimal[], digitIndex : number, decimalPlaceAmount : number, digitValues : Decimal[]) => boolean)[]) {
      if (!Array.isArray(symbolShown)) symbolShown = [symbolShown];
      if (symbolShown.length == 0) symbolShown.push(value => value.gt(0));
      while (symbolShown.length < this.symbols.length) symbolShown.push(symbolShown[symbolShown.length - 1]);
      this._symbolShown = symbolShown;
    }

    public get brackets() {
      return this._brackets;
    }

    public set brackets(brackets : [string, string, string, string, string, string][]) {
      if (brackets.length == 0) brackets = [["", "", "", "", "", ""]];
      this._brackets = brackets;
    }

    public get bracketsInExp() {
      return this._bracketsInExp;
    }

    public set bracketsInExp(brackets : [string, string, string, string, string, string][]) {
      if (brackets.length == 0) brackets = [["", "", "", "", "", ""]];
      this._bracketsInExp = brackets;
    }

    public get maxVisibleDigits() {
      return this._maxVisibleDigits;
    }

    public set maxVisibleDigits(maxVisibleDigits : number) {
      if (maxVisibleDigits < 1) throw new RangeError("maxVisibleDigits cannot be below 1 in Omega Meta Zero notation");
      if (maxVisibleDigits % 1 != 0) throw new RangeError("maxVisibleDigits must be a whole number in Omega Meta Zero notation");
      this._maxVisibleDigits = maxVisibleDigits;
    }

    public get maxVisibleDigitsInExp() {
      return this._maxVisibleDigitsInExp;
    }

    public set maxVisibleDigitsInExp(maxVisibleDigits : number) {
      if (maxVisibleDigits < 1) throw new RangeError("maxVisibleDigitsInExp cannot be below 1 in Omega Meta Zero notation");
      if (maxVisibleDigits % 1 != 0) throw new RangeError("maxVisibleDigitsInExp must be a whole number in Omega Meta Zero notation");
      this._maxVisibleDigitsInExp = maxVisibleDigits;
    }

    public get maxVisibleLayers() {
      return this._maxVisibleLayers;
    }

    public set maxVisibleLayers(maxVisibleLayers : number) {
      if (maxVisibleLayers < 0) throw new RangeError("maxVisibleLayers cannot be below 0 in Omega Meta Zero notation");
      if (maxVisibleLayers % 1 != 0) throw new RangeError("maxVisibleLayers must be a whole number in Omega Meta Zero notation");
      this._maxVisibleLayers = maxVisibleLayers;
    }

    public get maxVisibleLayersPost() {
      return this._maxVisibleLayersPost;
    }

    public set maxVisibleLayersPost(maxVisibleLayers : number) {
      if (maxVisibleLayers < 0) throw new RangeError("maxVisibleLayersPost cannot be below 0 in Omega Meta Zero notation");
      if (maxVisibleLayers % 1 != 0) throw new RangeError("maxVisibleLayersPost  must be a whole number in Omega Meta Zero notation");
      this._maxVisibleLayersPost = maxVisibleLayers;
    }

    public get decimalPlaces() {
      return this._decimalPlaces;
    }

    public set decimalPlaces(decimalPlaces : number) {
      if (decimalPlaces < 0) throw new RangeError("decimalPlaces cannot be below 0 in Omega Meta Zero notation");
      if (decimalPlaces % 1 != 0) throw new RangeError("decimalPlaces must be a whole number in Omega Meta Zero notation");
      this._decimalPlaces = decimalPlaces;
    }

    public get decimalBrackets() {
      return this._decimalBrackets;
    }

    public set decimalBrackets(decimalBrackets : [string, string, string, string, string, string][]) {
      if (decimalBrackets.length == 0) decimalBrackets = [["", "", "", "", "", ""]];
      this._decimalBrackets = decimalBrackets;
    }

    public get negExpThreshold() {
      return this._negExpThreshold;
    }

    public set negExpThreshold(negExpThreshold : number) {
      if (negExpThreshold < 0) throw new RangeError("negExpThreshold cannot be below 0 in Omega Meta Zero notation");
      this._negExpThreshold = negExpThreshold;
    }

  }