import Decimal from "break_eternity.js";
import type { DecimalSource } from "break_eternity.js";
import { toDecimal, scientifify, commasAndDecimals, hyperscientifify } from "./utils.js";
import { Notation } from "./notation.js";

  /**
   * The default way to abbreviate numbers - any leftover numbers in other notations are typically put through this to add commas and decimal places.
   * Starts with unabbreviated numbers, then scientific notation, then scientific notation with multiple e's, and finally F notation.
   * @param placesAbove1 ( number ) For numbers above 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param placesBelow1 ( number ) For numbers below 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. Default is 0, which means commas are always shown. If this value is negative, commas are never used.
   * @param maxnum ( Decimal ) The point at which the notation switches to scientific. Default is 1e12.
   * @param minnum ( Decimal ) The point below 1 at which the notation switches to scientific with a negative exponent. Default is 1e-6.
   * @param max_es_in_a_row ( number ) If the scientific representation would have more e's in the front than this, switches to F notation. Default is 5.
   * @param decimalChar ( string ) The string used as the decimal point. Default is ".".
   * @param commaChar ( string ) The string used as the comma. Default is ",".
   * 
   * This notation does not have an innerNotation parameter.
   */
  export class DefaultNotation extends Notation {
    public placesAbove1 = -4;
    public placesBelow1 = -4;
    public commasMin = Decimal.dZero;
    public maxnum = new Decimal(1e12);
    public minnum = new Decimal(1e-6);
    public max_es_in_a_row = 5;
    public decimalChar = ".";
    public commaChar = ","
  
    constructor(
      placesAbove1 = -4, 
      placesBelow1 = -4, 
      commasMin : DecimalSource = 0, 
      maxnum: DecimalSource = 1e12, 
      minnum : DecimalSource = 1e-6, 
      max_es_in_a_row: number = 5,
      decimalChar = ".",
      commaChar = ","
      ) {
      super();
      this.placesAbove1 = placesAbove1;
      this.placesBelow1 = placesBelow1;
      this.commasMin = toDecimal(commasMin); 
      this.maxnum = toDecimal(maxnum);
      this.minnum = toDecimal(minnum);
      this.max_es_in_a_row = max_es_in_a_row;
      this.decimalChar = decimalChar;
      this.commaChar = commaChar;
    }

    public name = "Default Notation";
  
    public formatDecimal(value: Decimal): string {
      if (value.eq(0)) return "0";
      if (value.gte(this.minnum) && value.lt(this.maxnum)) return commasAndDecimals(value.toNumber(), this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar);
      let result = ""
      let negExp = false;
      let places = (value.gte(1)) ? this.placesAbove1 : this.placesBelow1;
      let sigFigs = false;
      if (places < 0) {
        sigFigs = true;
        places = -places - 1; //mantissa is always between 1 and 10 and exponent is always whole, so the significant figures calculation is simplified
      }
      if (value.lt(1)) {
        negExp = true;
        let [m, e] = scientifify(value, 10, Math.pow(10, -places));
        value = e.neg().pow10().mul(m);
      }
      if (value.lt(Decimal.pow10(this.maxnum))) {
        let [m, e] = scientifify(value, 10, Math.pow(10, -places));
        let mantissa = m.toNumber();
        let exponent = e.toNumber();
        if (negExp) exponent *= -1;
        result = commasAndDecimals(mantissa, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar) + "e" + commasAndDecimals(exponent, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar);
      }
      else if (value.lt(Decimal.iteratedexp(10, this.max_es_in_a_row + 1, this.maxnum, true))) {
        while (value.gte(Decimal.pow10(this.maxnum))) {
          result += "e";
          value = value.log10();
        }
        if (negExp) value = value.neg();
        result += this.format(value);
      }
      else if (value.lt(Decimal.tetrate(10, this.maxnum.toNumber(), 1, true))) {
        let [m, e] = hyperscientifify(value, 10, Math.pow(10, -places));
        let mantissa = m.toNumber();
        let exponent = e.toNumber();
        if (negExp) exponent *= -1;
        result = commasAndDecimals(mantissa, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar) + "F" + commasAndDecimals(exponent, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar);
      }
      else {
        let exponent = value.slog(10, 100, true);
        if (negExp) exponent = exponent.neg();
        result = "F" + this.format(exponent);
      }
      return result;
    }
  }