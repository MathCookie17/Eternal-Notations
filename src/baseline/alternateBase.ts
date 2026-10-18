import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, scientifify, defaultBaseChars, hyperscientifify, multabs, onlyAllowedCharacters } from "./utils.js";
import { Notation } from "./notation.js";

/**
 * Converts a given number into a different base.
 * @param value ( number ! ) The number to be converted.
 * @param base ( number | string[] ! ) This can be either a number or an array of strings. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings.
 * @param placesAbove1 ( number ) The amount of decimal places shown for numbers above 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). This value must be set to zero if negaDigits is -1 or base, as bijective bases do not support non-whole numbers. Default is -4.
 * @param placesBelow1 ( number ) The amount of decimal places shown for numbers below 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). This value must be set to zero if negaDigits is -1 or base, as bijective bases do not support non-whole numbers. Default is -4.
 * @param negaDigits ( number ) How many of the digits are negative? Default is 0, which means the digits are from 0 to (base - 1). For example, if negaDigits is 1, the digits are from -1 to (base - 2). For odd bases, set this to (base - 1)/2 for the "balanced" version of that base. The maximum value of negaDigits is the base itself, and the minimum value is -1 (which results in the bijective version of the base); values outside this range will throw an error. You can't set negaDigits to anything other than 0 or -1 if base is given as a number (rather than an array of strings), since digits for negative numbers are not included in the default set of digits.
 * @param commasMin ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, though this is no different from any value under base^commaSpacing.
 * @param showZeroes ( number ) A positive, zero, or negative number; default is -1. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this is negative, zeroes at the end of the decimal places are not shown. If this is negative infinity, all trailing zeroes are removed, even those before the decimal point.
 * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
 * @param commaSpacing ( number ) How many digits are between each comma. Default is 3.
 * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
 * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
 * @param negativeChar ( string ) The character used as the negative sign. Default is "-". There is no negative sign if negaDigits is between 1 and (base - 2); if negaDigits equals (base - 1) or base, the negative sign is used for positive numbers instead of negative numbers.
 * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is however many digits (2^53 - 1) has in that base.
 * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits (though the numeric value of the base remains the same).
 * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
 * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
 * @param concatenation ( null | [boolean, string, string, Notation?] ) This parameter may either be null or an array containing a boolean, then two strings, then optionally a Notation. If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
 * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
 * Default is null, i.e. no concatenation occurs.
 */
export function BaseConvert(
  value: number, 
  base : number | string[], 
  placesAbove1: number = -4,
  placesBelow1: number = -4, 
  negaDigits : number = 0, 
  commasMin: number = 0, 
  showZeroes : number = -1,
  reverseDigits : boolean = false,
  commaSpacing : number = 3, 
  commaChars : string[] = [","], 
  decimalChar : string = ".", 
  negativeChar : string = "-", 
  precision : number = (typeof base == "number") ? Math.floor(Math.log(Number.MAX_SAFE_INTEGER)/Math.log(base) + 1) : Math.floor(Math.log(Number.MAX_SAFE_INTEGER)/Math.log(base.length) + 1),
  specialDigits : [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] = [],
  concatenation : null | [boolean, string, string, Notation?] = null
  ): string {
  if (typeof base == "number") {
      if (base < 0) throw new RangeError("Negative bases are not implemented");
      if (base == 0) throw new RangeError("There is no such thing as base 0");
      if (base % 1 != 0) throw new RangeError("Fractional bases are not supported");
      if (base > 64 || (base == 64 && negaDigits == -1)) throw new RangeError("There are only 64 default base digits; if you want to use a base above 64, provide your own character array.");
      if (negaDigits == -1) base = defaultBaseChars.slice(1, base + 1);
      else if (negaDigits == 0) base = defaultBaseChars.slice(0, base);
      else throw new RangeError("You have to specify your own characters for bases with negative digits.")
  }
  let originalValue = value;
  let baseNum = base.length;
  if (baseNum == 0) throw new RangeError("There is no such thing as base 0");
  if (negaDigits < -1 || negaDigits > baseNum || negaDigits % 1 != 0) throw new RangeError("Invalid negaDigits value in base conversion")
  if ((placesAbove1 > 0 || placesBelow1 > 0) && (negaDigits == -1 || negaDigits == baseNum)) throw new Error("Bijective bases do not support non-whole numbers");
  if ((placesAbove1 > 0 || placesBelow1 > 0) && baseNum == 1) throw new Error("Unary does not support non-whole numbers");
  if (baseNum == 1) return base[0].repeat(value);
  if (Math.abs(value) < 1 && (negaDigits == -1 || negaDigits == baseNum)) return "";
  if (value == 0) {
      let result = base[negaDigits];
      if (showZeroes > 0 && placesAbove1 > 0) {
          if (reverseDigits) result = decimalChar + result;
          else result += decimalChar;
          for (let p = 0; p < placesAbove1; p++) {
              if (reverseDigits) result = base[negaDigits] + result;
              else result += base[negaDigits];
          }
      }
      return result;
  }
  if (negaDigits > baseNum - 2) {
      return BaseConvert(-value, base, placesAbove1, placesBelow1, baseNum - negaDigits - 1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
  }
  let negative = false;
  if (value < 0 && negaDigits < 1) {
      negative = true;
      value *= -1;
  }
  let precisionSoFar = 0;
  let digits : number[] = [];
  let digitPosition = Math.floor(Math.log(Math.abs(value))/Math.log(baseNum));
  let startDigitPosition = digitPosition;
  let places = (Math.abs(value) < 1) ? placesBelow1 : placesAbove1;
  if (digitPosition < 0) {
      value *= Math.pow(baseNum, -digitPosition);
      if (places > 0) {
        places = places + digitPosition;
        if (places < 0) return BaseConvert(0, base, placesAbove1, placesBelow1, negaDigits, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
      } 
      digitPosition = 0;
  }
  let sigFigs = false;
  if (places < 0) {
      sigFigs = true;
      if (startDigitPosition < 0) places = -places - 1;
      else places = Math.max(-places - startDigitPosition - 1, 0);
  }
  while (Math.abs(value) >= Math.pow(baseNum, -places) && digitPosition >= -places && precisionSoFar < precision) {
      if (digitPosition == -places) digits.push(Math.round(value/Math.pow(baseNum, digitPosition)));
      else digits.push(Math.floor(value/Math.pow(baseNum, digitPosition)));
      value -= digits[digits.length - 1] * Math.pow(baseNum, digitPosition);
      if (digits[digits.length - 1] < -negaDigits || digits[digits.length - 1] >= baseNum - negaDigits) {
          let analyzed = digits.length - 1;
          while (digits[analyzed] < -negaDigits || digits[analyzed] >= baseNum - negaDigits) {
              if (analyzed == 0 && digits[analyzed] == 0) {
                  //We can only get here in a bijective base
                  digits.shift();
                  startDigitPosition--;
                  break;
              }
              let extracted = Math.floor((digits[analyzed] + negaDigits) / baseNum);
              digits[analyzed] -= extracted * baseNum;
              if (analyzed == 0) {
                  digits.unshift(extracted);
                  if (startDigitPosition < 0) {
                      value /= baseNum;
                      digitPosition--;
                  }
                  else if (sigFigs && places > 0) places--;
                  startDigitPosition++;
                  precisionSoFar++;
              }
              else {
                  digits[analyzed - 1] += extracted;
                  analyzed--;
              }
          }
      }
      digitPosition--;
      precisionSoFar++;
  }
  if (digitPosition >= 0 && negaDigits == -1) {
      //We can't end a bijective base string with a bunch of 0s, so subtract 1 from the last digit and end it with a bunch of the second-highest digit and one of the highest digit instead
      let analyzed = digits.length - 1;
      digits[analyzed] -= 1;
      while (digits[analyzed] == 0) {
          digits[analyzed] = baseNum;
          analyzed--;
          if (analyzed == -1) {
              digits.shift();
              startDigitPosition--;
              break;
          }
          else digits[analyzed] -= 1;
      }
  }
  while (digits[0] == 0) {
      digits.shift();
      startDigitPosition--;
  }
  if (showZeroes == Number.NEGATIVE_INFINITY) {
      while (digits[digits.length - 1] == 0) digits.pop();
  }
  else while (digitPosition >= 0 || (digitPosition >= -places && showZeroes >= 0)) {
      if (negaDigits == -1) {
          if (digitPosition == 0) digits.push(baseNum);
          else digits.push(baseNum - 1);
      }
      else digits.push(0);
      digitPosition--;
  }
  digitPosition = startDigitPosition;
  let digitChars : [string, number][] = [];
  let result = "";
  while (digitPosition >= 0) {
      let digitLocation = base;
      for (let d = 0; d < specialDigits.length; d++) {
          if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0] + negaDigits) {
              digitLocation = specialDigits[d][1];
              break;
          }
      }
      digitChars.push([digitLocation[digits[0] + negaDigits], 1]);
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
      if (concatenation[3] === undefined) digitStr = BaseConvert(digitChars[0][1], base, placesAbove1, placesBelow1, negaDigits, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
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
      let digitLocation = base;
      for (let d = 0; d < specialDigits.length; d++) {
          if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0] + negaDigits) {
              digitLocation = specialDigits[d][1];
              break;
          }
      }
      digitChars.push([digitLocation[negaDigits], 1]);
      if (startDigitPosition < 0) {
          for (let i = 1; i < -startDigitPosition; i++) {
              digitPosition--;
              digitLocation = base;
              for (let d = 0; d < specialDigits.length; d++) {
                  if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0] + negaDigits) {
                      digitLocation = specialDigits[d][1];
                      break;
                  }
              }
              digitChars.push([digitLocation[negaDigits], 1]);
          }
      }
      while (digits.length > 0) {
          digitPosition--;
          digitLocation = base;
          for (let d = 0; d < specialDigits.length; d++) {
              if (specialDigits[d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[d][1].length > digits[0] + negaDigits) {
                  digitLocation = specialDigits[d][1];
                  break;
              }
          }
          digitChars.push([digitLocation[digits[0] + negaDigits], 1]);
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
          if (concatenation[3] === undefined) digitStr = BaseConvert(digitChars[0][1], base, placesAbove1, placesBelow1, negaDigits, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
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
   * Behaves similarly to DefaultNotation, but supports alternate bases (any whole-number base between 2 and 64, or higher if you provide your own digits) and has more customization.
   * @param base ( number | string[] ! ) This can be either a number or an array of strings. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings.
   * @param negaDigits ( number ) How many of the digits are negative? Default is 0, which means the digits are from 0 to (base - 1). For example, if negaDigits is 1, the digits are from -1 to (base - 2). For odd bases, set this to (base - 1)/2 for the "balanced" version of that base. The maximum value of negaDigits is the base itself, and the minimum value is -1 (which results in the bijective version of the base); values outside this range will throw an error. You can't set negaDigits to anything other than 0 or -1 if base is given as a number (rather than an array of strings), since digits for negative numbers are not included in the default set of digits. Note that if negaDigits equals -1 or negaDigits equals the base, the amount of decimal places when calling format must be 0, as bijective bases do not support non-whole numbers.
   * @param placesAbove1 ( number ) For numbers above 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param placesBelow1 ( number ) For numbers below 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. Default is 0, which means commas are always shown. If this value is negative, commas are never used.
   * @param maxnum ( Decimal ) Numbers greater than or equal to this are converted into scientific notation. Default is base^12.
   * @param minnum ( Decimal ) Numbers less than this are converted into scientific notation. Default is base^-6.
   * @param max_exps_in_a_row ( number ) If the scientific representation would have more "exponential characters" (like the e in usual scientific notation) in the front than this, switches to F notation. Default is 5.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
   * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are base and base^^2, if hypermantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F8" would become "100F7" with 1 hypermantissaPower and "(1e100)F6" with 2 hypermantissaPower. 
   * @param showZeroes ( number ) A positive, zero, or negative number; default is -1. If this is positive, all the decimal places up to (places) are shown, even if some of them are zeroes at the end. If this is zero, all the decimal places up to (places) are shown, even if some are zeroes at the end, but only if not all of the decimal places are zero. If this is negative, zeroes at the end of the decimal places are not shown. If this is negative infinity, then trailing zeroes are always removed, even those before the decimal point.
   * @param reverseDigits ( boolean ) If this parameter is true, digits are written right-to-left instead of left-to-right. Default is false.
   * @param commaSpacing ( number ) How many digits are between each comma? Default is 3.
   * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
   * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 1 on it), and expChars[3][1] (expChars[2][1] with a 1 on it). Default is [["$", ""], ["$", ""], ["#", ""], ["#", ""]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
   * @param precision ( number ) How many digits are actually calculated before the remaining ones are just set to 0; this parameter exists so the notation doesn't bother displaying meaningless digits beyond the limit of floating point precision. Default is however many digits (2^53 - 1) has in that base.
   * @param specialDigits ( [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] ) An array of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different digits (though the numeric value of the base remains the same).
   * The function's arguments are the place value of the digit (the ones place is place value 0), the digit's distance from the leftmost digit, and the value being inputted, and the function returns true if this digit is to use that set of special digits instead of the normal ones; the string array is the set of special digits to be used.
   * Earlier entries in specialDigits take priority, reverting back to the digits from base if none of the special digits apply or if the one that does apply doesn't have enough entries to represent that digit.
   * @param concatenation ( null | [boolean, string, string, Notation?] ) If this parameter is not null, then when multiple of the same digit are adjacent, they'll be concatenated into a single digit with a number next to it to indicate the amount of that digit that was concatenated.
   * concatenation[1] and concatenation[2] are placed before and after the concatenation number. If concatenation[3] is undefined, the concatenation number is written in the alternate base itself, otherwise it's written in whatever notation is given. If concatenation[0] is true, then the concatenation number comes after the digit being concatenated, otherwise it comes before.
   * Default is null, i.e. no concatenation occurs.
   * 
   * This notation does not have an innerNotation parameter.
   */
export class AlternateBaseNotation extends Notation {
    private _base ! : string[];
    public negaDigits = 0;
    public placesAbove1 = -4;
    public placesBelow1 = -4;
    public commasMin : Decimal = Decimal.dZero;
    public maxnum : Decimal;
    public minnum : Decimal;
    public max_exps_in_a_row = 5;
    public mantissaPower : Decimal = Decimal.dZero;
    public hypermantissaPower : Decimal = Decimal.dZero;
    public showZeroes : number = -1;
    public reverseDigits : boolean = false;
    public commaSpacing = 3;
    public commaChars = [","];
    public decimalChar = ".";
    private _expChars : [string, string][] = [["$", ""], ["$", ""], ["#", ""], ["#", ""]];
    public negExpChars : null | [[string, string] | boolean, [string, string]] = null;
    public expBefore : boolean = false;
    public hyperexpBefore : boolean = false;
    public precision : number;
    public specialDigits : [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] = [];
    public concatenation : null | [boolean, string, string, Notation?] = null;
    private unconvertedExpChars : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]];
  
    constructor(
      base : number | string[], 
      negaDigits : number = 0, 
      placesAbove1 : number = -4,
      placesBelow1 : number = -4, 
      commasMin : DecimalSource = 0,
      maxnum : DecimalSource = ((typeof base == "number") ? Decimal.pow(base, 12) : Decimal.pow(base.length, 12)),
      minnum : DecimalSource = ((typeof base == "number") ? Decimal.pow(base, -6) : Decimal.pow(base.length, -6)),
      max_exps_in_a_row : number = 5,
      mantissaPower : DecimalSource = 0,
      hypermantissaPower : DecimalSource = 0,
      showZeroes : number = -1,
      reverseDigits : boolean = false,
      commaSpacing : number = 3,
      commaChars : string[] = [","],
      decimalChar : string = ".",
      expChars : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] = [["$", ""], ["$", ""], ["#", ""], ["#", ""]],
      negExpChars : null | [[string, string] | boolean, [string, string]] = null,
      expBefore : boolean = false,
      hyperexpBefore : boolean = false,
      precision : number = (typeof base == "number") ? Math.floor(Math.log(Number.MAX_SAFE_INTEGER)/Math.log(base) + 1) : Math.floor(Math.log(Number.MAX_SAFE_INTEGER)/Math.log(base.length) + 1),
      specialDigits : [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][] = [],
      concatenation : null | [boolean, string, string, Notation?] = null
      ) {
      super();
      this.negaDigits = negaDigits;
      this.base = base;
      this.placesAbove1 = placesAbove1;
      this.placesBelow1 = placesBelow1;
      this.commasMin = toDecimal(commasMin);
      this.maxnum = toDecimal(maxnum);
      this.minnum = toDecimal(minnum);
      this.max_exps_in_a_row = max_exps_in_a_row;
      this.mantissaPower = toDecimal(mantissaPower);
      this.hypermantissaPower = toDecimal(hypermantissaPower);
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

    public name = "Alternate Base Notation";

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
      if ((value.abs().gte(this.minnum) && value.abs().lt(this.maxnum)) || value.eq(0)) return BaseConvert(value.toNumber(), this._base, this.placesAbove1, this.placesBelow1, this.negaDigits, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
      let result = "";
      let negExp = false;
      let baseNum = this._base.length;
      let places = (value.gte(1)) ? this.placesAbove1 : this.placesBelow1;
      if (this.negaDigits > baseNum || this.negaDigits < -1 || this.negaDigits % 1 != 0) throw new RangeError("negaDigits out of range in Alternate Base Notation");
      if (this.negaDigits > (baseNum - 2)) {
        let baseCopy = new AlternateBaseNotation(this._base, baseNum - this.negaDigits - 1, this.placesAbove1, this.placesBelow1, this.commasMin, this.maxnum, this.minnum, this.max_exps_in_a_row, this.mantissaPower, this.hypermantissaPower, this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.unconvertedExpChars, this.negExpChars, this.expBefore, this.hyperexpBefore, this.precision, this.specialDigits, this.concatenation);
        return baseCopy.format(value.neg());
      }
      let sigFigPlaces = places;
      if (places < 0) sigFigPlaces = -places - 1;
      let mantissaLimit = 0;
      for (let i = -this.mantissaPower; i <= sigFigPlaces; i++) {
        mantissaLimit += (baseNum - this.negaDigits - 1)/Math.pow(baseNum, i);
      }
      mantissaLimit += 1/Math.pow(baseNum, sigFigPlaces);
      let hypermantissaLimit : DecimalSource = 0;
      for (let i = 0; i <= sigFigPlaces; i++) {
        hypermantissaLimit += (baseNum - this.negaDigits - 1)/Math.pow(baseNum, i);
      }
      hypermantissaLimit += 1/Math.pow(baseNum, sigFigPlaces);
      hypermantissaLimit = Decimal.iteratedexp(baseNum, this.hypermantissaPower.toNumber(), new Decimal(mantissaLimit), true);
      if (value.abs().lt(1)) {
        if (this.negExpChars != null && (this.negExpChars[0] == true || multabs(value.abs()).gte(Decimal.pow(baseNum, this.maxnum)))) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
        negExp = true;
        let [m, e] = scientifify(value, baseNum, 0, this.mantissaPower);
        value = Decimal.pow(baseNum, e.neg()).mul(m);
      }
      if (value.abs().lt(Decimal.pow(baseNum, this.maxnum))) {
        let [m, e] = scientifify(value, baseNum, 0, this.mantissaPower);
        let mantissa = m.toNumber();
        let exponent = e.toNumber();
        let unroundedmantissa = mantissa;
        mantissa = Math.round(unroundedmantissa * Math.pow(baseNum, sigFigPlaces)) / Math.pow(baseNum, sigFigPlaces);
        while (Math.abs(mantissa) >= mantissaLimit) {
            unroundedmantissa /= baseNum;
            mantissa = Math.round(unroundedmantissa * Math.pow(baseNum, sigFigPlaces)) / Math.pow(baseNum, sigFigPlaces);
            exponent += 1;
        }
        while (Math.abs(mantissa) < mantissaLimit/baseNum) {
            unroundedmantissa *= baseNum;
            mantissa = Math.round(unroundedmantissa * Math.pow(baseNum, sigFigPlaces)) / Math.pow(baseNum, sigFigPlaces);
            exponent -= 1;
        }
        if (negExp) exponent *= -1;
        let beforeChar = this._expChars[0][0];
        let afterChar = this._expChars[0][1];
        if (exponent < 0 && this.negExpChars !== null && this.negExpChars[0] !== false) {
          if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          beforeChar = this.negExpChars[0][0];
          afterChar = this.negExpChars[0][1];
          exponent *= -1;
        }
        let baseStr = BaseConvert(mantissa, this._base, this.placesAbove1, this.placesBelow1, this.negaDigits, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
        let exponentStr = BaseConvert(exponent, this._base, this.placesAbove1, this.placesBelow1, this.negaDigits, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation)
        if (this.expBefore) result = beforeChar + exponentStr + afterChar + baseStr;
        else result = baseStr + beforeChar + exponentStr + afterChar;
      }
      else {
        let negative = false;
        if (value.lt(0)) {
            negative = true;
            value = value.neg();
        }
        if (value.lt(Decimal.iteratedexp(baseNum, this.max_exps_in_a_row + 1, this.maxnum, true))) {
            let added_es = 0;
            while (value.gte(Decimal.pow(baseNum, this.maxnum))) {
              added_es++;
              value = value.log(baseNum).mul(value.sign);
            }
            if (negExp) value = value.neg();
            result = this.format(value);
            for (let e = 0; e < added_es; e++) result = this._expChars[1][0] + result + this._expChars[1][1];
          }
          else if (value.lt(Decimal.tetrate(baseNum, this.maxnum.toNumber(), 1, true))) {
            let [mantissa, exponent] = hyperscientifify(value, baseNum, 0, this.hypermantissaPower);
            let unroundedmantissa = mantissa;
            mantissa = unroundedmantissa.mul(Math.pow(baseNum, sigFigPlaces)).round().div(Math.pow(baseNum, sigFigPlaces));
            while (mantissa.gt(hypermantissaLimit)) {
              unroundedmantissa = unroundedmantissa.log(baseNum);
              mantissa = unroundedmantissa.mul(Math.pow(baseNum, sigFigPlaces)).round().div(Math.pow(baseNum, sigFigPlaces));
              exponent = exponent.plus(1);
            }
            while (mantissa.lte(hypermantissaLimit.log(baseNum))) {
              unroundedmantissa = Decimal.pow(baseNum, unroundedmantissa);
              mantissa = unroundedmantissa.mul(Math.pow(baseNum, sigFigPlaces)).round().div(Math.pow(baseNum, sigFigPlaces));
              exponent = exponent.sub(1);
            }
            if (negExp) exponent = exponent.neg();
            let baseStr = this.format(mantissa);
            let exponentStr = this.format(exponent);
            if (this.hyperexpBefore) result = this._expChars[2][0] + exponentStr + this._expChars[2][1] + baseStr;
            else result = baseStr + this._expChars[2][0] + exponentStr + this._expChars[2][1];
          }
          else {
            let exponent = value.slog(baseNum, 100, true);
            if (negExp) exponent = exponent.neg();
            result = this._expChars[3][0] + this.format(exponent) + this._expChars[3][1];
          }
          if (negative) result = this.negativeString[0] + result + this.negativeString[1];
      }
      return result;
    }

    /**
     * Returns an array containing the digits of the base.
     */
    public get base() {
      return this._base;
    }

    public set base(base : number | string[]) {
      if (typeof base == "number") {
        if (base < 0) throw new RangeError("Negative bases are not implemented");
        if (base == 0) throw new RangeError("There is no such thing as base 0");
        if (base == 1) throw new RangeError("Tally marks are not an abbreviation");
        if (base % 1 != 0) throw new RangeError("Fractional bases are not supported");
        if (base > 64 || (base == 64 && this.negaDigits == -1)) throw new RangeError("There are only 64 default base digits; if you want to use a base above 64, provide your own character array.");
        if (this.negaDigits == -1) base = defaultBaseChars.slice(1, base + 1);
        else if (this.negaDigits == 0) base = defaultBaseChars.slice(0, base);
        else throw new RangeError("You have to specify your own characters for bases with negative digits.")
      }
      this._base = base;
    }

    public get expChars() {
      return this.unconvertedExpChars;
    }

    public set expChars(input : [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]]) {
      let one = this.format(1);
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
      else if (input[3][0] === false) expChars[3][0] = one + input[2][0];
      else if (input[3][0] === true) expChars[3][0] = input[2][0] + one;
      if (typeof input[3][1] == "string") expChars[3][1] = input[3][1];
      else if (input[3][1] === false) expChars[3][1] = one + input[2][1];
      else if (input[3][1] === true) expChars[3][1] = input[2][1] + one;
      this._expChars = expChars;
    }

  }