import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, multabs, factorial, factorial_scientifify, defaultBaseChars, onlyAllowedCharacters, factorial_hyperscientifify, iteratedfactorial, inverse_factorial, factorial_slog } from "../baseline/utils.js";
import { Notation } from "../baseline/notation.js";

/**
 * Converts a given number into the "factoradic base", where the place values are the factorial numbers, which means each digit can go one value higher than the previous.
 * @param value ( number ! ) The number to be converted.
 * @param digitList ( string[] ) An array of strings taken as the digits of the base. Default is the default 64 digits: 0-9, then A-Z, then a-z, then +, then /.
 * @param placesAbove1 ( number ) The amount of decimal places shown for numbers above 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param placesBelow1 ( number ) The amount of decimal places shown for numbers below 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
 * @param commasMin ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, though this is no different from any value under base^commaSpacing.
 * @param showZeroes ( number ) A positive, zero, or negative number; default is -1. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this is negative, zeroes at the end of the decimal places are not shown. If this is negative infinity, all trailing zeroes are removed, even those before the decimal point.
 * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
 * @param commaSpacing ( number ) How many digits are between each comma. Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param negativeChar ( string ) The character used as the negative sign. Default is "-". There is no negative sign if negaDigits is between 1 and (base - 2); if negaDigits equals (base - 1) or base, the negative sign is used for positive numbers instead of negative numbers.
 * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is 18.
 * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits.
 * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
 * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
 * @param concatenation ( null | [boolean, string, string, Notation?] ) This parameter may either be null or an array containing a boolean, then two strings, then optionally a Notation. If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
 * Default is null, i.e. no concatenation occurs.
 * @returns The number in the given base as a string.
 */
export function FactoradicConvert(
  value: number, 
  digitList: string[] = defaultBaseChars, 
  placesAbove1: number = -4,
  placesBelow1: number = -4,
  commasMin: number = 0, 
  showZeroes : number = -1, 
  reverseDigits : boolean = false,
  commaSpacing : number = 3, 
  commaChars : string[] = [","], 
  decimalChar : string = ".", 
  negativeChar : string = "-", 
  precision : number = 18,
  specialDigits : [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] = [],
  concatenation : null | [boolean, string, string, Notation?] = null
  ): string {
  let originalValue = value;
  if (digitList.length < 2) throw new RangeError("Factoradic requires at least two digits.");
  if (value > new Decimal(digitList.length).factorial().round().toNumber()) throw new RangeError("Not enough digits were given for a number that large.")
  if (Math.max(placesAbove1, placesBelow1) > digitList.length - 1) throw new RangeError("More digits are needed to use that many decimal places.")
  if (value == 0) {
      let result = digitList[0];
      if (showZeroes > 0 && placesAbove1 > 0) {
          result += decimalChar;
          for (let p = 0; p < placesAbove1; p++) {
              result += digitList[0];
          }
      }
      return result;
  }
  let negative = false;
  if (value < 0) {
      negative = true;
      value *= -1;
  }
  let precisionSoFar = 0;
  let digits : number[] = [];
  let digitPosition = 0;
  let places = (Math.abs(value) < 1) ? placesBelow1 : placesAbove1;
  let sigFigs = false;
  if (places < 0) {
      sigFigs = true;
      places = Math.max(-places - 1, 0);
  }
  if (value < 1) while (factorial(digitPosition - 1) >= value) {
    digitPosition--;
    if (sigFigs) places++;
  }
  else while (factorial(digitPosition + 2) <= value) {
    digitPosition++;
    if (sigFigs && places > 0) places--;
  }
  if (digitPosition < -places) return FactoradicConvert(0, digitList, placesAbove1, placesBelow1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
  let startDigitPosition = digitPosition;
  
  while (Math.abs(value) >= factorial(-places - 1) && digitPosition >= -places && precisionSoFar < precision) {
      let factorialPosition = digitPosition + Math.sign(digitPosition) + ((digitPosition == 0) ? 1 : 0);
      let digitLimit = Math.abs(factorialPosition) + 1;
      if (digitPosition == -places) digits.push(Math.round(value/factorial(factorialPosition)));
      else digits.push(Math.floor(value/factorial(factorialPosition)));
      value -= digits[digits.length - 1] * factorial(factorialPosition);
      if (digits[digits.length - 1] < 0 || digits[digits.length - 1] >= digitLimit) {
          let analyzed = digits.length - 1;
          let analyzedDigitPosition = digitPosition;
          while (digits[analyzed] < 0 || digits[analyzed] >= digitLimit) {
              let extracted = Math.floor((digits[analyzed]) / digitLimit);
              digits[analyzed] -= extracted * digitLimit;
              if (analyzed == 0) {
                  digits.unshift(extracted);
                  if ((startDigitPosition < 0 || sigFigs) && places > 0) places--;
                  startDigitPosition++;
                  precisionSoFar++;
              }
              else {
                  digits[analyzed - 1] += extracted;
              }
              analyzed--;
              analyzedDigitPosition++;
              digitLimit = Math.abs(analyzedDigitPosition + Math.sign(analyzedDigitPosition) + ((analyzedDigitPosition == 0) ? 1 : 0)) + 1;
          }
      }
      digitPosition--;
      precisionSoFar++;
  }
  if (showZeroes == Number.NEGATIVE_INFINITY) {
      while (digits[digits.length - 1] == 0) digits.pop();
  }
  else while (digits[0] == 0 && startDigitPosition > -1) {
      digits.shift();
      startDigitPosition--;
  }
  while (digitPosition >= 0 || (digitPosition >= -places && showZeroes != -1)) {
      digits.push(0);
      digitPosition--;
  }
  digitPosition = startDigitPosition;
  let digitChars : [string, number][] = [];
  let result = "";
  while (digitPosition >= 0) {
      let digitLocation = digitList;
      for (let d = 0; d < specialDigits.length; d++) {
          if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0]) {
              digitLocation = specialDigits[d][1];
              break;
          }
      }
      digitChars.push([digitLocation[digits[0]], 1]);
      digits.shift();
      if (digits.length == 0) break;
      digitPosition--;
  }
  if (concatenation !== null) {
    for (let c = 1; c < digitChars.length; c++) {
      if (digitChars[c][0] == digitChars[c - 1][0]) {
        digitChars[c - 1][1]++;
        digitChars.splice(c, 1);
        c--;
      }
    }
  }
  while (digitChars.length > 0) {
    let digitStr = digitChars[0][0];
    if (concatenation !== null && digitChars[0][1] > 1) {
      digitStr = "";
      if (concatenation[3] === undefined) digitStr = FactoradicConvert(digitChars[0][1], digitList, placesAbove1, placesBelow1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
      else digitStr = concatenation[3].format(digitChars[0][1]);
      digitStr = concatenation[1] + digitStr + concatenation[2];
      if (concatenation[0]) digitStr = digitChars[0][0] + digitStr;
      else digitStr += digitChars[0][0];
    }
    if (reverseDigits) result = digitStr + result;
    else result += digitStr;
    digitChars.shift();
    if (commasMin >= 0 && Math.abs(originalValue) >= commasMin && digitChars.length % commaSpacing == 0 && digitChars.length != 0) {
        if (reverseDigits) result = commaChars[(digitChars.length / commaSpacing - 1) % commaChars.length] + result;
        else result += commaChars[(digitChars.length / commaSpacing - 1) % commaChars.length];
    }
  }
  if (showZeroes <= 0 && onlyAllowedCharacters(digits.join(""), ["0"])) digits = [];
  if (digits.length > 0) {
      while (digits[digits.length - 1] === 0 && showZeroes < 0) digits.pop();
  }
  if (digits.length > 0) {
      let digitLocation = digitList;
      for (let d = 0; d < specialDigits.length; d++) {
          if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0]) {
              digitLocation = specialDigits[d][1];
              break;
          }
      }
      digitChars.push([digitLocation[0], 1]);
      if (startDigitPosition < 0) {
          for (let i = 1; i < -startDigitPosition; i++) {
              digitPosition--;
              digitLocation = digitList;
              for (let d = 0; d < specialDigits.length; d++) {
                  if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0]) {
                      digitLocation = specialDigits[d][1];
                      break;
                  }
              }
              digitChars.push([digitLocation[0], 1]);
          }
      }
      while (digits.length > 0) {
          digitPosition--;
          digitLocation = digitList;
          for (let d = 0; d < specialDigits.length; d++) {
              if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0]) {
                  digitLocation = specialDigits[d][1];
                  break;
              }
          }
          digitChars.push([digitLocation[digits[0]], 1]);
          digits.shift();
      }
      if (result == "") result = digitChars[0][0];
      digitChars.shift();
      if (reverseDigits) result = decimalChar + result;
      else result += decimalChar;
      if (concatenation !== null) {
        for (let c = 1; c < digitChars.length; c++) {
          if (digitChars[c][0] == digitChars[c - 1][0]) {
            digitChars[c - 1][1]++;
            digitChars.splice(c, 1);
            c--;
          }
        }
      }
      while (digitChars.length > 0) {
        let digitStr = digitChars[0][0];
        if (concatenation !== null && digitChars[0][1] > 1) {
          digitStr = "";
          if (concatenation[3] === undefined) digitStr = FactoradicConvert(digitChars[0][1], digitList, placesAbove1, placesBelow1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
          else digitStr = concatenation[3].format(digitChars[0][1]);
          digitStr = concatenation[1] + digitStr + concatenation[2];
          if (concatenation[0]) digitStr = digitChars[0][0] + digitStr;
          else digitStr += digitChars[0][0];
        }
        if (reverseDigits) result = digitStr + result;
        else result += digitStr;
        digitChars.shift();
      }
  }
  if (negative) result = negativeChar + result;
  return result;
}

  /**
   * Abbreviates a given number in the "factoradic base", where the place values are the factorial numbers, which means each digit can go one value higher than the previous. Behaves like AlternateBaseNotation for larger numbers, but with factorials instead of powers.
   * @param digitList ( string[] ) An array of strings taken as the digits of the base. Default is the default 64 digits: 0-9, then A-Z, then a-z, then +, then /.
   * @param hyperBase ( Decimal ) The base used for the hyperscientific stage of the notation. Default is 720.
   * @param placesAbove1 ( number ) For numbers above 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param placesBelow1 ( number ) For numbers below 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. Default is 0, which means commas are always shown. If this value is negative, commas are never used.
   * @param maxnum ( Decimal ) Numbers greater than or equal to this are converted into scientific notation. Default is 1307674368000 (15!).
   * @param minnum ( Decimal ) Numbers less than this are converted into scientific notation. Default is 1 / 362880 (1 / 9!).
   * @param max_exps_in_a_row ( number ) If the scientific representation would have more "exponential characters" (Which defaults to $) than this, switches to the hyperscientific stage of the notation. Default is 5.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in factorial-scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, a number normally represented as "1$15", would become "15$14" with 1 mantissaPower and "210$13" with 2 mantissaPower.
   * @param showZeroes ( number ) A positive, zero, or negative number. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this negative, zeroes at the end of the decimal places are not shown. Default is -1.
   * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
   * @param commaSpacing ( number ) How many digits are between each comma? Default is 3.
   * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
   * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 'b' on it, where 'b' is however hyperBase is formatted in this notation), and expChars[3][1] (expChars[2][1] with a 'b' on it, where 'b' is however hyperBase is formatted in this notation). Default is [["$", ""], [false, ""], ["!", ""], [false, ""]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [true, "1 / "], where that 1 is replaced with whatever digitList[1] is.
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
   * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is 18.
   * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits.
   * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
   * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
   * @param concatenation ( null | [boolean, string, string, Notation?] ) If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
   * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
   * Default is null, i.e. no concatenation occurs.
   * 
   * This notation does not have an innerNotation parameter.
   */
export class FactoradicNotation extends Notation {
    public digitList : string[] = defaultBaseChars;
    public hyperBase : Decimal = new Decimal(720);
    public placesAbove1 = -4;
    public placesBelow1 = -4;
    public commasMin : Decimal = Decimal.dZero;
    public maxnum : Decimal = new Decimal(1307674368000);
    public minnum : Decimal = new Decimal(1 / 362880);
    public max_exps_in_a_row = 5;
    public mantissaPower : Decimal = Decimal.dZero;
    public showZeroes : number = -1;
    public reverseDigits : boolean = false;
    public commaSpacing = 3;
    public commaChars = [","];
    public decimalChar = ".";
    private _expChars : [string, string][] = [["$", ""], ["$", ""], ["!", ""], ["!", ""]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public hyperexpBefore : boolean = false;
    public precision : number;
    public specialDigits : [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] = [];
    public concatenation : null | [boolean, string, string, Notation?] = null;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]];
  
    constructor(
      digitList : string[] = defaultBaseChars, 
      hyperBase : DecimalSource = 720,
      placesAbove1 : number = -4,
      placesBelow1 : number = -4, 
      commasMin : DecimalSource = 0,
      maxnum : DecimalSource = 1307674368000,
      minnum : DecimalSource = 1 / 362880,
      max_exps_in_a_row : number = 5,
      mantissaPower : DecimalSource = 0,
      showZeroes : number = -1,
      reverseDigits : boolean = false,
      commaSpacing : number = 3,
      commaChars : string[] = [","],
      decimalChar : string = ".",
      expChars : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] = [["$", ""], [false, ""], ["!", ""], [false, ""]],
      negExpChars : null | [[string, string] | boolean, [string, string]] = [true, [digitList[1] + " / ", ""]],
      expBefore : boolean = false,
      hyperexpBefore : boolean = false,
      precision : number = 18,
      specialDigits : [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] = [],
      concatenation : null | [boolean, string, string, Notation?] = null
      ) {
      super();
      this.digitList = digitList;
      this.hyperBase = toDecimal(hyperBase);
      this.placesAbove1 = placesAbove1;
      this.placesBelow1 = placesBelow1;
      this.commasMin = toDecimal(commasMin);
      this.maxnum = toDecimal(maxnum);
      this.minnum = toDecimal(minnum);
      this.max_exps_in_a_row = max_exps_in_a_row;
      this.mantissaPower = toDecimal(mantissaPower);
      this.showZeroes = showZeroes;
      this.reverseDigits = reverseDigits;
      this.commaSpacing = commaSpacing;
      this.commaChars = commaChars;
      this.decimalChar = decimalChar;
      this.unconvertedExpChars = expChars;
      this.expBefore = expBefore;
      this.hyperexpBefore = hyperexpBefore;
      this.precision = precision;
      this.specialDigits = specialDigits;
      this.concatenation = concatenation;
      this.expChars = expChars;
      this.negExpChars = negExpChars;
    }

    public name = "Factoradic Notation";

    public format(
        value: DecimalSource
      ): string {

        let decimal = toDecimal(value);

        if (decimal.isNan()) return this.NaNString;

        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
  
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
    
        return this.formatDecimal(decimal);
      }
  
    public formatDecimal(value: Decimal): string {
      if ((value.abs().gte(this.minnum) && value.abs().lt(this.maxnum)) || value.eq(0)) return FactoradicConvert(value.toNumber(), this.digitList, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
      let result = "";
      let negExp = false;
      let places = (value.gte(1)) ? this.placesAbove1 : this.placesBelow1;
      let sigFigPlaces = places;
      if (places < 0) sigFigPlaces = -places - 1;
      if (value.abs().lt(1)) {
        if (this.negExpChars != null && (this.negExpChars[0] == true || multabs(value.abs()).gte(this.maxnum.factorial()))) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
        negExp = true;
        let [m, e] = factorial_scientifify(value, 0, this.mantissaPower);
        value = e.neg().factorial().mul(m);
      }
      if (value.abs().lt(this.maxnum.factorial())) {
        let [m, e] = factorial_scientifify(value, 1 / factorial(sigFigPlaces + 1), this.mantissaPower);
        let mantissa = m.toNumber();
        let exponent = e.toNumber();
        if (negExp) exponent *= -1;
        let beforeChar = this._expChars[0][0];
        let afterChar = this._expChars[0][1];
        if (negExp && this.negExpChars !== null && this.negExpChars[0] !== false) {
          if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          beforeChar = this.negExpChars[0][0];
          afterChar = this.negExpChars[0][1];
          exponent *= -1;
        }
        let baseStr = FactoradicConvert(mantissa, this.digitList, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
        let exponentStr = FactoradicConvert(exponent, this.digitList, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation)
        if (this.expBefore) result = beforeChar + exponentStr + afterChar + baseStr;
        else result = baseStr + beforeChar + exponentStr + afterChar;
      }
      else {
        let negative = false;
        if (value.lt(0)) {
            negative = true;
            value = value.neg();
        }
        if (value.lt(iteratedfactorial(this.maxnum, this.max_exps_in_a_row))) {
            let added_es = 0;
            while (value.gte(this.maxnum.factorial())) {
              added_es++;
              value = inverse_factorial(value);
            }
            result = this.format(value);
            for (let e = 0; e < added_es; e++) result = this._expChars[1][0] + result + this._expChars[1][1];
          }
          else if (value.lt(iteratedfactorial(this.hyperBase, this.maxnum.toNumber()))) {
            let [mantissa, exponent] = factorial_hyperscientifify(value, this.hyperBase, 1 / factorial(sigFigPlaces + 1));
            while (mantissa.gte(this.hyperBase)) {
              mantissa = inverse_factorial(mantissa);
              exponent = exponent.plus(1);
            }
            while (mantissa.lt(inverse_factorial(this.hyperBase))) {
                mantissa = mantissa.factorial();
                exponent = exponent.sub(1);
            }
            let baseStr = this.format(mantissa);
            let exponentStr = this.format(exponent);
            if (this.hyperexpBefore) result = this._expChars[2][0] + exponentStr + this._expChars[2][1] + baseStr;
            else result = baseStr + this._expChars[2][0] + exponentStr + this._expChars[2][1];
          }
          else {
            let exponent = factorial_slog(value, this.hyperBase);
            result = this._expChars[3][0] + this.format(exponent) + this._expChars[3][1];
          }
          if (negative) result = this.negativeString + result;
      }
      return result;
    }

    public get expChars() {
      return this.unconvertedExpChars;
    }

    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]]) {
      let one = this.format(1);
      let limitStr = this.format(this.hyperBase)
      let expChars : [string, string][] = [];
      expChars.push(input[0]);
      expChars.push(["", ""]);
      if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];
      else if (input[1][0] === false) expChars[1][0] = one + input[0][0];
      else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
      if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];
      else if (input[1][1] === false) expChars[1][1] = one + input[0][1];
      else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
      expChars.push(input[2]);
      expChars.push(["", ""]);
      if (typeof input[3][0] == "string") expChars[3][0] = input[3][0];
      else if (input[3][0] === false) expChars[3][0] = limitStr + input[2][0];
      else if (input[3][0] === true) expChars[3][0] = input[2][0] + limitStr;
      if (typeof input[3][1] == "string") expChars[3][1] = input[3][1];
      else if (input[3][1] === false) expChars[3][1] = limitStr + input[2][1];
      else if (input[3][1] === true) expChars[3][1] = input[2][1] + limitStr;
      this._expChars = expChars;
    }

  }