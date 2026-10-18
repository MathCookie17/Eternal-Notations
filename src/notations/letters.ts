import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { Notation } from "../baseline/notation.js";
import { DefaultNotation } from "../baseline/defaultNotation.js";
import { toDecimal, scientifify, lowercaseAlphabet, uppercaseAlphabet } from "../baseline/utils.js";
import { BaseConvert } from "../baseline/alternateBase.js";

    /**
     * Each power of 1,000 gets a letter of the alphabet, so 1,000 is 1a, 55,430,000 is 55.43b, 10^15 is 1e, and so on. aa comes after z, aaa comes after zz.
     * 100A means that there would be 100 lowercase letters in the full expression, 1Aa means 1,000A, 1Ad means (10^12)A, 100B means there would be 100 lowercase letters in an expression beginning with A,
     * 200C means that there would be 200 lowercase letters in an expression beginning with B, and so on. AA comes after Z. 100@ means there would be 100 uppercase letters in a full expression, 1 '@a'
     * (the quotes aren't there, they're just in this explanation to avoid @ doing parameter stuff) means 1,000@, and so on.
     * @param letters ( [string[], string[], string[]] ) An array of three arrays of strings. The first array is the lowercase letters, the second array is the uppercase letters, and the third is the "third letters", of which @ is the only one in the default system. The default setting has the 26 lowercase letters as the first array, the 26 uppercase letters as the second array, and a single-entry array containing only @ as the third array.
     * @param negaLetters ( number | [number, number, number] ) If you think of the letters as being numbers in an alternate base, how many of the digits in the base are negative? Default is -1, which corresponds to a bijective base. 0 would be a regular base, i.e. including a letter for zero.
     * This parameter must be between -1 and (the amount of letters - 2). If this parameter is a single number, then that's the amount of negative letters for all three letter types, but if it's an array then negaLetters[0] is for the lowercase letters, negaLetters[1] is for the uppercase letters, and negaLetters[2] is for the third letters.
     * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
     * @param base ( Decimal ) The number that the letters represent powers of. Default is 1,000.
     * @param max_letters ( number ) The highest amount of letters of a single tier - any more, and they're truncated into the next tier. Default is 12.
     * @param between ( string ) This string goes between the number and the letters. Default is the empty string.
     * @param separator ( string ) This string goes between each letter. Default is the empty string.
     * @param hyperseparator ( string ) This string goes between each tier of letters. Default is the empty string.
     * @param alwaysHyperseparate ( boolean ) If this parameter is true, hyperseparators appear for every letter tier after the first non-empty one, even if some of the later ones are empty (and thus would normally skip their hyperseparator). Default is false.
     * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
     * @param lettersOrder ( number ) The order that the different types of letters go in when multiple are present. Default is 0, which corresponds to [third, uppercase, lowercase]. Each value from 0 to 5 represents a different ordering.
     * @param reverseLetters ( boolean ) If this is true, the letters of a single type are written right to left instead of left to right. Default is false.
     * @param mantissaAfter ( boolean ) If this is true, the number comes after all the letters instead of before. Default is false.
     * @param divisionChar ( [string, string] ) The strings used to represent that the letter expression is actually its reciprocal (for numbers below 1); divisionChar[0] goes before the letter expression, divisionChar[1] goes after the letter expression. Default is ["/", ""].
     * @param specialLetters ( [[(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][]] )
     * An array of three arrays of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different letters (though the amount of letters remains the same). specialLetters[0] is for the lowercase letters, specialLetters[1] is for the uppercase letters, and specialLetters[2] is for the third letters.
     * The function's arguments are the place value of the letter (the last place is place value 0), the letter's distance from the leftmost letter, and the "value" of that letter string (a is 1, z is 26, aa is 27, etc.), and the function returns true if this letter is to use that set of special letters instead of the normal ones; the string array is the set of special letters to be used.
     * Earlier entries in specialLetters take priority, reverting back to the regular letters if none of the special letters apply or if the one that does apply doesn't have enough entries to represent that letter.
     * @param fixedLetters ( [[number, string][], [number, string][], [number, string][]] ) If the value of the letter string matches any of the numbers in that letter type's array in here (fixedLetters[0] is for the lowercase letters, fixedLetters[1] is for the uppercase letters, fixedLetters[2] is for the third letters), the regular letters are not used - instead, the letter string is just set to that number's corresponding string in this array. Default is [[], [], []], i.e. there are no fixed letters.
     * @param concatenation ( [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]] ) concatenation[0] is for lowercase letters, concatenation[1] is for uppercase letters, concatenation[2] is for third letters.
     * If a concatenation entry is not null, then when multiple of the same letter of a single tier are adjacent, they'll be concatenated into a single letter with a number next to it to indicate the amount of that digit that was concatenated.
     * concatenation[n][1] and concatenation[n][2] are placed before and after the concatenation number. If concatenation[n][3] is undefined, the concatenation number is written as a letter string itself, otherwise it's written in whatever notation is given. If concatenation[n][0] is true, then the concatenation number comes after the letter being concatenated, otherwise it comes before.
     * Default is [null, null, null], i.e. no concatenation occurs.
     */
export class LettersNotation extends Notation {
    private _letters : [string[], string[], string[]] = [lowercaseAlphabet, uppercaseAlphabet, ["@"]];
    private _negaLetters : [number, number, number] = [-1, -1, -1];
    public rounding : DecimalSource | ((value : Decimal) => Decimal) = Decimal.dZero;
    private _base : Decimal = new Decimal(1000);
    private _max_letters = 12;
    public between : string = "";
    public separator : string = "";
    public hyperseparator : string = "";
    public alwaysHyperseparate : boolean = false;
    public innerNotation : Notation = new DefaultNotation();
    public lettersOrder : number = 0;
    public reverseLetters : boolean = false;
    public mantissaAfter : boolean = false;
    public divisionChar : [string, string] = ["/", ""];
    public specialLetters : [[(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][]] = [[], [], []];
    public fixedLetters : [[number, string][], [number, string][], [number, string][]] = [[], [], []];
    public concatenation : [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]] = [null, null, null];

    constructor(
        letters : [string[], string[], string[]] = [lowercaseAlphabet, uppercaseAlphabet, ["@"]],
        negaLetters : number | [number, number, number] = -1,
        rounding : DecimalSource | ((value : Decimal) => Decimal) = 0,
        base : DecimalSource = 1000,
        max_letters = 12,
        between : string = "",
        separator : string = "",
        hyperseparator : string = "",
        alwaysHyperseparate : boolean = false,
        innerNotation : Notation = new DefaultNotation(),
        lettersOrder : number = 0,
        reverseLetters : boolean = false,
        mantissaAfter : boolean = false,
        divisionChar : [string, string] = ["/", ""],
        specialLetters : [[(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][]] = [[], [], []],
        fixedLetters : [[number, string][], [number, string][], [number, string][]] = [[], [], []],
        concatenation : [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]] = [null, null, null]
        ) {
      super();
      this.letters = letters;
      this.negaLetters = negaLetters;
      this.rounding = rounding;
      this.base = base;
      this.max_letters = max_letters;
      this.between = between;
      this.separator = separator;
      this.hyperseparator = hyperseparator;
      this.alwaysHyperseparate = alwaysHyperseparate;
      this.innerNotation = innerNotation;
      this.lettersOrder = lettersOrder;
      this.reverseLetters = reverseLetters;
      this.mantissaAfter = mantissaAfter;
      this.divisionChar = divisionChar;
      this.specialLetters = specialLetters;
      this.fixedLetters = fixedLetters;
      this.concatenation = concatenation;
    }

    public name = "Letters Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0)) return this.innerNotation.format(0);
      let result = "";
      let negExp = false;
      if (value.lt(1)) {
        negExp = true;
        let [m, e] = scientifify(value, this._base);
        value = this._base.pow(e.neg()).mul(m); 
      }
      let lowercaseLimit = this._max_letters + 1;
      let uppercaseLimit = this._max_letters + 1;
      if (this._letters[0].length > 1) lowercaseLimit = ((this._letters[0].length - this._negaLetters[0] - 1) * Math.pow(this._letters[0].length, this._max_letters) + this._negaLetters[0]) / (this._letters[0].length - 1);
      if (this._letters[1].length > 1) uppercaseLimit = ((this._letters[1].length - this._negaLetters[1] - 1) *  Math.pow(this._letters[1].length, this._max_letters) + this._negaLetters[1]) / (this._letters[1].length - 1);
      let [mantissa, letter] = [Decimal.dZero, Decimal.dZero];
      let uppercaseLetter = Decimal.dZero;
      let thirdLetter = Decimal.dNegOne;
      do {
        thirdLetter = thirdLetter.plus(1);
        if (thirdLetter.gt(0)) {
            if (this._letters[0].length == 1) uppercaseLetter = uppercaseLetter.plus(value.slog(this._base));
            else {
              if (value.gte(Decimal.iteratedexp(10, 4, this._base))) {
                let uppercaseLetterAddition = value.slog(10, 100, true).sub(this._base.slog(10, 100, true)).sub(4).div(2).floor().plus(1);
                value = (uppercaseLetterAddition.gte(4.5e15)) ? Decimal.dOne : value.iteratedlog(10, uppercaseLetterAddition.mul(2).toNumber(), true);
                uppercaseLetter = uppercaseLetter.plus(uppercaseLetterAddition);
              }
              while (value.gte(this._base.pow(lowercaseLimit))) {
                  uppercaseLetter = uppercaseLetter.plus(1);
                  value = value.log(this._base).mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
              }
              uppercaseLetter = uppercaseLetter.plus(value.log(this._base));
            }
            if (this._letters[1].length == 1) value = uppercaseLetter;
            else value = uppercaseLetter.log(this._letters[1].length).plus(1);
            uppercaseLetter = Decimal.dZero;
        }
        if (this._letters[0].length == 1) {
            if (value.gte(this._base.pow(lowercaseLimit))) {
                uppercaseLetter = value.slog(this._base).sub(new Decimal(lowercaseLimit).slog(this._base)).floor();
                value = (uppercaseLetter.gte(9e15)) ? Decimal.dOne : value.iteratedlog(this._base, uppercaseLetter.toNumber(), true);
            }
        }
        else {
            if (value.gte(Decimal.iteratedexp(10, 4, this._base))) {
                uppercaseLetter = value.slog(10, 100, true).sub(this._base.slog(10, 100, true)).sub(4).div(2).floor().plus(1);
                value = (uppercaseLetter.gte(4.5e15)) ? Decimal.dOne : value.iteratedlog(10, uppercaseLetter.mul(2).toNumber(), true);
            }
            while (value.gte(this._base.pow(lowercaseLimit))) {
                uppercaseLetter = uppercaseLetter.plus(1);
                value = value.log(this._base).mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
            }
        }
        if (uppercaseLetter.lt(uppercaseLimit)) {
          [mantissa, letter] = scientifify(value, this._base, this.rounding);
          if (letter.gte(lowercaseLimit)) {
            uppercaseLetter = uppercaseLetter.plus(1);
            if (this._letters[0].length == 1) value = value.log(this._base);
            else value = value.log(this._base).mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
            [mantissa, letter] = scientifify(value, this._base, this.rounding);
          }
        }
      } while (uppercaseLetter.gte(uppercaseLimit));
      let resultArray : string[] = [];
      let mantissaStr = this.innerNotation.format(mantissa);
      if (negExp) result += this.divisionChar;
      let fixedLettersIndices = [this.fixedLetters[0].map((value) => value[0]).indexOf(letter.toNumber()), this.fixedLetters[1].map((value) => value[0]).indexOf(uppercaseLetter.toNumber()), this.fixedLetters[2].map((value) => value[0]).indexOf(thirdLetter.toNumber())];
      if (thirdLetter.toNumber() == 0) resultArray.push("");
      else if (fixedLettersIndices[2] != -1) resultArray.push(this.fixedLetters[2][fixedLettersIndices[2]][1])
      else resultArray.push(BaseConvert(thirdLetter.toNumber(), this._letters[2], 0, 0, this._negaLetters[2], 0, -1, this.reverseLetters, 1, [this.separator], undefined, undefined, undefined, this.specialLetters[2], this.concatenation[2]));
      if (uppercaseLetter.toNumber() == 0) resultArray.push("");
      else if (fixedLettersIndices[1] != -1) resultArray.push(this.fixedLetters[1][fixedLettersIndices[1]][1])
      else resultArray.push(BaseConvert(uppercaseLetter.toNumber(), this._letters[1], 0, 0, this._negaLetters[1], 0, -1, this.reverseLetters, 1, [this.separator], undefined, undefined, undefined, this.specialLetters[1], this.concatenation[1]));
      if (letter.toNumber() == 0) resultArray.push("");
      else if (fixedLettersIndices[0] != -1) resultArray.push(this.fixedLetters[0][fixedLettersIndices[0]][1])
      else resultArray.push(BaseConvert(letter.toNumber(), this._letters[0], 0, 0, this._negaLetters[0], 0, -1, this.reverseLetters, 1, [this.separator], undefined, undefined, undefined, this.specialLetters[0], this.concatenation[0]));
      let orderArray = [2];
      orderArray.splice(this.lettersOrder % 2, 0, 1);
      orderArray.splice(Math.floor(this.lettersOrder / 2) % 3, 0, 0);
      let lettersStr = "";
      while (!(resultArray[orderArray[0]]) && orderArray.length > 0) {
        orderArray.shift();
      }
      while (orderArray.length > 0) {
          lettersStr += resultArray[orderArray[0]];
          let visible = !!resultArray[orderArray[0]];
          orderArray.shift();
          let addAHyperseparator = false;
          for (let o = 0; o < orderArray.length; o++) {
            if (resultArray[orderArray[o]]) addAHyperseparator = true;
          }
          if (orderArray.length != 0 && (this.alwaysHyperseparate || (visible && addAHyperseparator))) lettersStr += this.hyperseparator;
      }
      if (negExp) lettersStr = this.divisionChar[0] + lettersStr + this.divisionChar[1];
      if (this.mantissaAfter) result = lettersStr + this.between + mantissaStr;
      else result = mantissaStr + this.between + lettersStr;
      return result;
    }

    public get letters() {
      return this._letters;
    }

    public set letters(letters : [string[], string[], string[]]) {
      if (letters[0].length == 0 || letters[1].length == 0 || letters[2].length == 0) throw new Error("Empty letters array in Letters Notation");
      this._letters = letters;
    }

    public get negaLetters() {
      return this._negaLetters;
    }
    
    public set negaLetters(negaLetters : number | [number, number, number]) {
      if (!Array.isArray(negaLetters)) negaLetters = [negaLetters, negaLetters, negaLetters];
      this._negaLetters = negaLetters;
    }

    public get base() {
      return this._base;
    }

    public set base(base: DecimalSource) {
      let baseD = toDecimal(base);
      if (baseD.lte(1)) throw new RangeError("Base <= 1 in Letters notation");
      this._base = baseD;
    }

    public get max_letters() {
      return this._max_letters;
    }

    public set max_letters(max_letters : number) {
      if (max_letters <= 0) throw new RangeError("Nonpositive max letters in Letters notation")
      this._max_letters = max_letters;
    }
  }