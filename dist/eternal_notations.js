(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('break_eternity.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'break_eternity.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EternalNotations = {}, global.Decimal));
})(this, (function (exports, Decimal) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Decimal__default = /*#__PURE__*/_interopDefaultLegacy(Decimal);

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * For reasons unbeknownst to me, break_eternity's Decimal.fromValue does not seem to work on values that are already Decimals, so this function is a version of Decimal.fromValue that does.1
   * Unlike Decimal.fromValue, this function uses the linear approximation of tetration to convert strings that involve tetration.
   * @param value ( Decimal ! ) The DecimalSource to be converted.
   */
  function toDecimal(value) {
    if (_typeof(value) == "object") {
      var d = new Decimal__default["default"]();
      d.sign = value.sign;
      d.mag = value.mag;
      d.layer = value.layer;
      return d;
    } else if (typeof value == "string") return Decimal__default["default"].fromString(value, true);else return Decimal__default["default"].fromValue(value);
  }
  /**
   * "Multiplicative absolute value". For numbers with absolute value less than 1, returns their reciprocal. Otherwise, returns the original value. (0 just returns 0)
   * @param value ( Decimal ! ) The number to take the multiplicative absolute value of.
   */
  function multabs(value) {
    var valueD = toDecimal(value);
    if (valueD.eq(0)) return new Decimal__default["default"](0);else if (valueD.abs().lt(1)) return valueD.recip();else return valueD;
  }
  /**
   * Rounds the given value to the nearest multiple of some number.
   * @param value ( Decimal ) The value to be rounded.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) If this parameter is a Decimal, then "value" is rounded to the nearest multiple of "rounding".
   * If this parameter is a Decimal -> Decimal function, then "value" is plugged into that function, and whatever that function returns is used as the "rounding" to round to the nearest multiple of.
   * The rounding is not performed at all if "rounding" is 0.
   */
  function round(value, rounding) {
    var valueD = toDecimal(value);
    if (typeof rounding != "function") {
      var funcD = toDecimal(rounding);
      rounding = function rounding(value) {
        return funcD;
      };
    }
    var roundingVal = rounding(valueD);
    if (roundingVal.eq(0)) return valueD;else return valueD.div(roundingVal).round().mul(roundingVal);
  }
  /**
   * Checks a string to see if it only contains certain characters.
   * @param str ( string ! ) The string to be checked.
   * @param allowed ( string[] ! ) An array of the allowed characters (any strings in this array that are more than one character will end up being ignored).
   */
  function onlyAllowedCharacters(str, allowed) {
    for (var i = 0; i < str.length; i++) {
      if (allowed.indexOf(str[i]) === -1) return false;
    }
    return true;
  }
  var lowercaseAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var uppercaseAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var defaultBaseChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "+", "/"];
  /**
   * Takes a number and formats it with commas and decimals.
   * @param value ( number ! ) The number to be formatted.
   * @param placesAbove1 ( number ) For numbers 1 or greater, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param placesBelow1 ( number ) For numbers less than 1, this is the amount of decimal places shown. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off). Default is -4.
   * @param commas ( number ) The smallest value where commas are included. If this is negative, then commas are never included. Default is 0, which means commas are always included.
   * @param decimalChar ( string ) The string used as the decimal point. Default is ".".
   * @param commaChar ( string ) The string used as the comma. Default is ",".
   */
  function commasAndDecimals(value) {
    var placesAbove1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -4;
    var placesBelow1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -4;
    var commas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var decimalChar = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ".";
    var commaChar = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ",";
    if (value == 0) return "0";
    if (!isFinite(value)) return String(value);
    var places = Math.abs(value) < 1 ? placesBelow1 : placesAbove1;
    if (places > 16) places = 16;
    var negative = value < 0;
    value = Math.abs(value);
    var _scientifify = scientifify(Decimal__default["default"].fromNumber(value), Decimal__default["default"].dTen),
      _scientifify2 = _slicedToArray(_scientifify, 2),
      b = _scientifify2[0],
      e = _scientifify2[1];
    var base = b.toNumber();
    var exponent = e.toNumber();
    var sigFigs = false;
    if (places < 0) {
      sigFigs = true;
      places = Math.max(-places - exponent - 1, 0);
    }
    var result = "";
    if (value >= 1e21) {
      base = Math.round(base * Math.pow(10, places)) / Math.pow(10, places);
      if (base >= 10) {
        base /= 10;
        exponent += 1;
        if (sigFigs && places > 0) {
          places--;
          base = Math.round(base * Math.pow(10, places)) / Math.pow(10, places);
        }
      }
      result = commasAndDecimals(base, placesAbove1, placesBelow1, commas);
      result += "e";
      if (exponent >= 0) result += "+";
      result += String(exponent);
    } else if (value < 1) {
      var ending = Math.round(value * Math.pow(10, places));
      if (ending >= Math.pow(10, places + exponent + 1)) {
        base /= 10;
        exponent += 1;
        ending = Math.round(value * Math.pow(10, places));
      }
      if (ending == 0) return "0";
      var decimalString = String(ending);
      if (exponent >= 0) result = commasAndDecimals(ending / Math.pow(10, places), placesAbove1, placesBelow1, commas);else {
        result = "0" + decimalChar;
        for (var i = 1; i < Math.abs(exponent); i++) result += "0";
        while (decimalString.length < places + exponent + 1) decimalString = "0" + decimalString;
        while (decimalString[decimalString.length - 1] == "0") decimalString = decimalString.substring(0, decimalString.length - 1);
        if (decimalString !== ".") result += decimalString;
      }
    } else {
      var whole = Math.trunc(value);
      var leftover = value - whole;
      leftover *= Math.pow(10, places);
      leftover = Math.round(leftover);
      if (leftover >= Math.pow(10, places)) {
        leftover -= Math.pow(10, places);
        whole += 1;
      }
      result = String(whole);
      if (value >= commas && commas >= 0) result = addCommas(result, [commaChar]);
      var _decimalString = String(leftover);
      if (leftover == 0) _decimalString = "";else {
        while (_decimalString.length < places) _decimalString = "0" + _decimalString;
        _decimalString = decimalChar + _decimalString;
        while (_decimalString[_decimalString.length - 1] == "0") _decimalString = _decimalString.substring(0, _decimalString.length - 1);
      }
      if (_decimalString !== decimalChar) result += _decimalString;
    }
    if (negative) result = "-" + result;
    return result;
  }
  /**
   * Adds commas to a string by inserting a comma between every few characters of the string, starting at the end.
   * @param str ( string ! ) The string to be formatted.
   * @param commaChar ( string[] ) The character to be inserted as a comma. Default is ",".
   * @param spacing ( number ) The amount of characters between each commas. Default is 3.
   */
  function addCommas(str) {
    var commaChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [","];
    var spacing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var result = "";
    var commasSoFar = 0;
    while (str.length > spacing) {
      var substr = str.substring(str.length - spacing, str.length);
      str = str.substring(0, str.length - spacing);
      result = commaChars[commasSoFar % commaChars.length] + substr + result;
      commasSoFar++;
    }
    return str + result;
  }
  /**
   * Approximates a number as a fraction using continued fractions, returning whatever the first continued fraction approximation of that number that's close enough to the true value is.
   * @param value ( number ! ) The value to be approximated as a fraction.
   * @param precision ( number ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional. If precision is 0, it will be as exact as floating point numbers will allow.
   * @param returnForm ( number ! ) Controls what the returned array represents. 0 means "continued fraction", 1 means "numerator and denominator", 2 means "whole number, numerator, denominator", 3 means "whole number, numerator, and denominator, but change the fractional part for negatives to match how mixed numbers are actually written".
   * @param maxIterations ( number ) The process will end after this many iterations even if the desired precision has not been reached. Default is Infinity.
   * @param maxDenominator ( number ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
   * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
   * @param maxNumerator ( number ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
   * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
   */
  function fractionApproximation(value, precision, returnForm) {
    var maxIterations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
    var maxDenominator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Infinity;
    var strictMaxDenominator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var maxNumerator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Infinity;
    var strictMaxNumerator = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var continuedFraction = [];
    var whole = 0;
    var numerator = 0;
    var denominator = 1;
    var previous = [0, 0, 1];
    var approximation = 0;
    if (returnForm != 0 && returnForm != 1 && returnForm != 2 && returnForm != 3) returnForm = 0;
    if (returnForm == 3) {
      var result = fractionApproximation(Math.abs(value), precision, 2, maxIterations, maxDenominator, strictMaxDenominator, maxNumerator, strictMaxNumerator);
      if (value < 0) {
        if (result[0] == 0) result[1] *= -1;else result[0] *= -1;
      }
      return result;
    }
    if (precision < 0) precision = Math.abs(value * precision);
    if (precision > 1) precision = 1;
    var currentValue = value;
    while (Math.abs(value - approximation) > precision && denominator <= maxDenominator && numerator <= maxNumerator && continuedFraction.length < maxIterations) {
      continuedFraction.push(Math.floor(currentValue));
      previous = [whole, numerator, denominator];
      numerator = continuedFraction[continuedFraction.length - 1];
      denominator = 1;
      for (var i = continuedFraction.length - 2; i >= 0; i--) {
        var temp = denominator;
        denominator = numerator;
        numerator = temp + denominator * continuedFraction[i];
      }
      if (returnForm == 2) {
        numerator -= denominator * continuedFraction[0];
        whole = continuedFraction[0];
      }
      approximation = whole + numerator / denominator;
      currentValue = currentValue % 1;
      if (currentValue == 0) break;else currentValue = 1 / currentValue;
    }
    if (denominator > maxDenominator && strictMaxDenominator || numerator > maxNumerator && strictMaxNumerator && continuedFraction.length > 1) {
      continuedFraction.pop();
      var _previous = previous;
      var _previous2 = _slicedToArray(_previous, 3);
      whole = _previous2[0];
      numerator = _previous2[1];
      denominator = _previous2[2];
    }
    if (returnForm == 2 && Math.floor(numerator / denominator) != 0) {
      // Fixes an issue where 1/1 would show up in a mixed number
      whole += Math.floor(numerator / denominator);
      numerator -= denominator * Math.floor(numerator / denominator);
    }
    if (continuedFraction.length == 0) {
      if (returnForm == 0) return [0];else if (returnForm == 1) return [0, 1];else return [0, 0, 1];
    } else {
      if (returnForm == 0) return continuedFraction;else if (returnForm == 1) return [numerator, denominator];else return [whole, numerator, denominator];
    }
  }
  /**
   * Approximates a Decimal as a fraction using continued fractions, returning whatever the first continued fraction approximation of that number that's close enough to the true value is.
   * @param value ( Decimal ! ) The value to be approximated as a fraction.
   * @param precision ( Decimal ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
   * @param returnForm ( number ! ) Controls what the returned array represents. 0 means "continued fraction", 1 means "numerator and denominator", 2 means "whole number, numerator, denominator", 3 means "whole number, numerator, and denominator, but flip for negatives to match how mixed numbers are actually written".
   * @param maxIterations ( number ) The process will end after this many iterations even if the desired precision has not been reached. Default is Infinity.
   * @param maxDenominator ( Decimal ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
   * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
   * @param maxNumerator ( Decimal ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
   * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
   */
  function fractionApproximationD(value, precision, returnForm) {
    var maxIterations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
    var maxDenominator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Infinity;
    var strictMaxDenominator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var maxNumerator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Infinity;
    var strictMaxNumerator = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    value = toDecimal(value);
    precision = toDecimal(precision);
    maxDenominator = toDecimal(maxDenominator);
    if (value.eq(0)) {
      if (returnForm == 0) return [new Decimal__default["default"](0)];else if (returnForm == 1) return [new Decimal__default["default"](0), new Decimal__default["default"](1)];else return [new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](1)];
    } else if (value.abs().lt(1) && value.layer > 1 && precision.lt(0)) {
      // Relative precision fails for layer <=-2 numbers because division ceases to function precisely, so we need a special case to ensure they don't appear as 0
      if (returnForm == 0) return [new Decimal__default["default"](0), value.recip().round()];else if (returnForm == 1) return [new Decimal__default["default"](1), value.recip().round()];else return [new Decimal__default["default"](0), new Decimal__default["default"](1), value.recip().round()];
    }
    var continuedFraction = [];
    var whole = new Decimal__default["default"](0);
    var numerator = new Decimal__default["default"](0);
    var denominator = new Decimal__default["default"](1);
    var previous = [whole, numerator, denominator];
    var approximation = new Decimal__default["default"](0);
    if (returnForm != 0 && returnForm != 1 && returnForm != 2 && returnForm != 3) returnForm = 0;
    if (returnForm == 3) {
      var result = fractionApproximationD(value.abs(), precision, 2, maxIterations, maxDenominator, strictMaxDenominator, maxNumerator, strictMaxNumerator);
      if (value.lt(0)) {
        if (result[0].eq(0)) result[1] = result[1].neg();else result[0] = result[0].neg();
      }
      return result;
    }
    if (precision.lt(0)) precision = value.mul(precision).abs();
    if (precision.gt(1)) precision = new Decimal__default["default"](1);
    var currentValue = value;
    while (value.sub(approximation).abs().gt(precision) && denominator.lte(maxDenominator) && numerator.lte(maxNumerator) && continuedFraction.length < maxIterations) {
      continuedFraction.push(currentValue.floor());
      previous = [whole, numerator, denominator];
      numerator = continuedFraction[continuedFraction.length - 1];
      denominator = new Decimal__default["default"](1);
      for (var i = continuedFraction.length - 2; i >= 0; i--) {
        var temp = denominator;
        denominator = numerator;
        numerator = temp.plus(denominator.mul(continuedFraction[i]));
      }
      if (returnForm == 2) {
        numerator = numerator.sub(denominator.mul(continuedFraction[0]));
        whole = continuedFraction[0];
      }
      approximation = numerator.div(denominator).plus(whole);
      currentValue = currentValue.mod(1);
      if (currentValue.eq(0)) break;else currentValue = currentValue.recip();
    }
    if (denominator.gt(maxDenominator) && strictMaxDenominator || numerator.gt(maxNumerator) && strictMaxNumerator && continuedFraction.length > 1) {
      continuedFraction.pop();
      var _previous3 = previous;
      var _previous4 = _slicedToArray(_previous3, 3);
      whole = _previous4[0];
      numerator = _previous4[1];
      denominator = _previous4[2];
    }
    if (returnForm == 2 && numerator.div(denominator).floor().neq(0)) {
      // Fixes an issue where 1/1 would show up in a mixed number
      whole = whole.plus(numerator.div(denominator).floor());
      numerator = numerator.sub(denominator.mul(numerator.div(denominator).floor()));
    }
    if (continuedFraction.length == 0) {
      if (returnForm == 0) return [new Decimal__default["default"](0)];else if (returnForm == 1) return [new Decimal__default["default"](0), new Decimal__default["default"](1)];else return [new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](1)];
    } else {
      if (returnForm == 0) return continuedFraction;else if (returnForm == 1) return [numerator, denominator];else return [whole, numerator, denominator];
    }
  }
  function gcd(a, b) {
    if (b == 0) return a;else return gcd(b, a % b);
  }
  /**
   * Returns an array of all the primes that are not greater than max.
   * @param max ( number ! ) The cutoff point for the list of primes.
   */
  function primesArray(max) {
    if (max < 2) return [];
    var primes = [2];
    while (Math.pow(primes[primes.length - 1], 2) < max) primes = primesArray(Math.pow(primes[primes.length - 1], 2) - 1);
    var arr = Array(Number(max) + 1).fill(true);
    arr[0] = false;
    arr[1] = false;
    for (var p = 0; p < primes.length && Math.pow(primes[p], 2) <= max; p++) {
      for (var i = Number(primes[p]) * 2; i < arr.length; i += Number(primes[p])) {
        arr[i] = false;
      }
    }
    var newprimes = [];
    for (var a = 0; a < arr.length; a++) {
      if (arr[a]) newprimes.push(a);
    }
    return newprimes;
  }
  /**
   * Turns a whole number into its prime factorization. Returns an array of pairs of numbers: in each pair is a prime and its exponent. For example, 60 would return [[2, 2], [3, 1], [5, 1]] since its prime factoration is 2^2 * 3^1 * 5^1.
   * 1 returns an empty array, 0 returns [[0, 1]], negatives have [-1, 1] on the beginning of their array.
   * @param value ( number ! ) The number to factorize. Must be an integer.
   * @param primes ( number | number[] ! ) If this is an array, that array is the list of prime factors to check for. If this is a number, all primes that are not greater than that number are checked.
   */
  function primeFactorize(value, primes) {
    if (value == 0) return [[0, 1]];
    if (typeof primes == "number") primes = primesArray(primes);
    var result = [];
    if (value < 0) {
      result.push([-1, 1]);
      value *= -1;
    }
    var currentValue = value;
    for (var p = 0; p < primes.length; p++) {
      var base = primes[p];
      var exponent = 0;
      while (currentValue % base == 0) {
        currentValue /= base;
        exponent++;
      }
      if (exponent > 0) result.push([base, exponent]);
    }
    if (currentValue > 1) result.push([currentValue, 1]); //Leftover factors
    return result;
  }
  /**
   * Uses fractionApproximation to find an approximation of value as a fraction, then finds the prime factorization of that fraction using primeFactorize.
   * For example, 40/63 would return [[2, 3], [3, -2], [5, 1], [7, -1]] because it's equal to 2^3 * 3^-2 * 5^1 * 7^-1.
   * @param value ( number ! ) The number to factorize.
   * @param primes ( number | number[] ! ) If this is an array, that array is the list of prime factors to check for. If this is a number, all primes that are not greater than that number are checked.
   * @param precision ( number ! ) If this is positive, the fraction approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
   * @param maxIterations ( number ) The fraction approximating process will end after this many iterations even if the desired precision has not been reached. Default is Infinity.
   * @param maxDenominator ( number ) If the fraction approximation's denominator is above this, the fraction approximating ends there. Default is Infinity, which means there is no maximum denominator.
   * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the fraction approximating stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
   * @param maxNumerator ( number ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
   * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
   */
  function primeFactorizeFraction(value, primes, precision) {
    var maxIterations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
    var maxDenominator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Infinity;
    var strictMaxDenominator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var maxNumerator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Infinity;
    var strictMaxNumerator = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    if (value == 0) return [[0, 1]];
    if (typeof primes == "number") primes = primesArray(primes);
    var result = [];
    if (value < 0) {
      result.push([-1, 1]);
      value *= -1;
    }
    var _fractionApproximatio = fractionApproximation(value, precision, 1, maxIterations, maxDenominator, strictMaxDenominator, maxNumerator, strictMaxNumerator),
      _fractionApproximatio2 = _slicedToArray(_fractionApproximatio, 2),
      numerator = _fractionApproximatio2[0],
      denominator = _fractionApproximatio2[1];
    var numeratorPrimes = primeFactorize(numerator, primes);
    var denominatorPrimes = primeFactorize(denominator, primes);
    //Test to make sure leftover factors don't go into each other
    if (numeratorPrimes.length > 0 && denominatorPrimes.length > 0) {
      var sharedLastFactor = gcd(numeratorPrimes[numeratorPrimes.length - 1][0], denominatorPrimes[denominatorPrimes.length - 1][0]);
      if (sharedLastFactor > 1) {
        numeratorPrimes[numeratorPrimes.length - 1][0] /= sharedLastFactor;
        denominatorPrimes[denominatorPrimes.length - 1][0] /= sharedLastFactor;
        if (numeratorPrimes[numeratorPrimes.length - 1][0] == 1) numeratorPrimes.pop();
        if (denominatorPrimes[denominatorPrimes.length - 1][0] == 1) denominatorPrimes.pop();
      }
    }
    //Merge the lists
    var takeFromDenominator = false;
    while (numeratorPrimes.length > 0 || denominatorPrimes.length > 0) {
      if (numeratorPrimes.length == 0) takeFromDenominator = true;else if (denominatorPrimes.length == 0) takeFromDenominator = false;else takeFromDenominator = numeratorPrimes[0][0] > denominatorPrimes[0][0];
      if (takeFromDenominator) {
        if (result.length > 0 && result[result.length - 1][0] == denominatorPrimes[0][0]) result[result.length - 1][1] -= denominatorPrimes[0][1];else result.push([denominatorPrimes[0][0], -denominatorPrimes[0][1]]);
        denominatorPrimes.shift();
      } else {
        if (result.length > 0 && result[result.length - 1][0] == numeratorPrimes[0][0]) result[result.length - 1][1] += numeratorPrimes[0][1];else result.push([numeratorPrimes[0][0], numeratorPrimes[0][1]]);
        numeratorPrimes.shift();
      }
      if (result[result.length - 1][1] == 0) result.pop();
    }
    return result;
  }
  function currentEngineering(value, engineerings) {
    if (value.lt(0)) throw new RangeError("currentEngineering does not currently support negative values");
    if (value.eq(0)) return Array(engineerings.length).fill(Decimal__default["default"].dZero);
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    var arr = [];
    var currentValue = new Decimal__default["default"](value);
    for (var s = 0; s < engineerings.length; s++) {
      var portion = currentValue.div(engineerings[s]).floor().max(0);
      currentValue = currentValue.sub(portion.mul(engineerings[s]));
      if (currentValue.lt(0)) {
        portion = portion.sub(1);
        currentValue = currentValue.plus(engineerings[s]);
      }
      arr.push(portion);
    }
    return arr;
  }
  function engineeringValue(arr, engineerings) {
    var result = new Decimal__default["default"](0);
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    for (var i = 0; i < Math.min(arr.length, engineerings.length); i++) {
      result = result.plus(arr[i].mul(engineerings[i]));
    }
    return result;
  }
  function currentEngineeringValue(value, engineerings) {
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (value.eq(0)) return new Decimal__default["default"](0);else if (value.lt(0)) return upperCurrentEngineeringValue(value.neg(), engineerings).neg();else return engineeringValue(currentEngineering(value, engineerings), engineerings);
  }
  function nextEngineering(value, engineerings) {
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    var currentValue = Decimal__default["default"].dInf;
    var oldArr = currentEngineering(value, engineerings);
    var finalArr = _construct(Array, _toConsumableArray(oldArr));
    for (var s = engineerings.length - 1; s >= 0; s--) {
      var newArr = _construct(Array, _toConsumableArray(oldArr));
      newArr[s] = newArr[s].plus(1);
      for (var t = s + 1; t < engineerings.length; t++) {
        newArr[t] = new Decimal__default["default"](0);
      }
      var newValue = engineeringValue(newArr, engineerings);
      if (newValue.gt(value) && newValue.lt(currentValue)) {
        currentValue = newValue;
        finalArr = newArr;
      }
    }
    return finalArr;
  }
  function nextEngineeringValue(value, engineerings) {
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (value.eq(0)) return engineerings[engineerings.length - 1];else if (value.lt(0)) return previousEngineeringValue(value.neg(), engineerings).neg();else return engineeringValue(nextEngineering(value, engineerings), engineerings);
  }
  function previousEngineering(value, engineerings) {
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    var currentValue = Decimal__default["default"].dNegInf;
    var oldArr = currentEngineering(value, engineerings);
    var finalArr = _construct(Array, _toConsumableArray(oldArr));
    for (var s = engineerings.length - 1; s >= 0; s--) {
      if (oldArr[s].gt(0)) {
        var newArr = _construct(Array, _toConsumableArray(oldArr));
        newArr[s] = newArr[s].minus(1);
        newArr = newArr.slice(0, s + 1);
        var newValue = engineeringValue(newArr, engineerings);
        var difference = engineerings[s];
        for (var t = s + 1; t < engineerings.length; t++) {
          var coefficient = difference.div(engineerings[t]).floor().max(0);
          var portion = coefficient.mul(engineerings[t]);
          if (portion.eq(difference)) {
            coefficient = coefficient.sub(1);
            portion = portion.sub(engineerings[t]);
          }
          difference = difference.sub(portion);
          newValue = newValue.add(portion);
          newArr.push(coefficient);
        }
        if (newValue.lt(value) && newValue.gt(currentValue)) {
          currentValue = newValue;
          finalArr = newArr;
        }
      }
    }
    return finalArr;
  }
  function previousEngineeringValue(value, engineerings) {
    engineerings = engineerings.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (value.eq(0)) return engineerings[engineerings.length - 1].neg();else if (value.lt(0)) return nextEngineeringValue(value.neg(), engineerings).neg();else return engineeringValue(previousEngineering(value, engineerings), engineerings);
  }
  function upperCurrentEngineeringValue(value, engineerings) {
    var c = currentEngineeringValue(value, engineerings);
    if (value.eq(c)) return c;else return nextEngineeringValue(value, engineerings);
  }
  /**
   * Decimal's iteratedexp, except each exponentiation in the iteratedexp, instead of just being base^value, is base^(value/mult), so that taking the logarithm to undo it would require multiplying by the mult after said logarithm.
   */
  //If you're wondering why this is a separate function... well, it had a more complex implementation until I realized it could be reduced to its current form.
  function iteratedexpmult(base, payload, height, mult) {
    var _map = [base, payload, mult].map(toDecimal),
      _map2 = _slicedToArray(_map, 3),
      baseD = _map2[0],
      payloadD = _map2[1],
      multD = _map2[2];
    return Decimal__default["default"].iteratedexp(baseD.pow(multD.recip()), height, payloadD, true);
  }
  /**
   * Decimal's iteratedlog, except the value is multiplied by mult after each logarithm.
   */
  function iteratedmultlog(value, base, times, mult) {
    var _map3 = [value, base, mult].map(toDecimal),
      _map4 = _slicedToArray(_map3, 3),
      valueD = _map4[0],
      baseD = _map4[1],
      multD = _map4[2];
    return Decimal__default["default"].iteratedlog(valueD, baseD.pow(multD.recip()), times, true);
  }
  /**
   * This function is to iteratedexpmult and iteratedmultlog as slog is to iteratedexp/tetrate and iteratedlog.
   */
  function multslog(value, base, mult) {
    var _map5 = [value, base, mult].map(toDecimal),
      _map6 = _slicedToArray(_map5, 3),
      valueD = _map6[0],
      baseD = _map6[1],
      multD = _map6[2];
    return valueD.slog(baseD.pow(multD.recip()), 100, true);
  }
  /**
   * Converts a Decimal into a list of two Decimals, [b, e], such that b * (base)^e equals the original value.
   * @param value ( Decimal ! ) The value we want to turn into scientific notation.
   * @param base ( Decimal ) The base of the scientific notation we're using (default is 10)
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, 2.357e224 in base 10, which normally returns [2.357, 224], would become [23.57, 223] with 1 mantissaPower and [235.7, 222] with 2 mantissaPower.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param expMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
   */
  function scientifify(value) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Decimal__default["default"].dTen;
    var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Decimal__default["default"].dZero;
    var mantissaPower = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Decimal__default["default"].dZero;
    var engineerings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Decimal__default["default"].dOne;
    var expMultiplier = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Decimal__default["default"].dOne;
    var valueD = toDecimal(value);
    var baseD = toDecimal(base);
    var mantissaPowerD = toDecimal(mantissaPower);
    var expMultiplierD = toDecimal(expMultiplier);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    var engineeringsD = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (valueD.eq(0)) return [new Decimal__default["default"](0), new Decimal__default["default"](-Infinity)];
    if (valueD.eq(Decimal__default["default"].dInf)) return [new Decimal__default["default"](Infinity), new Decimal__default["default"](Infinity)];
    if (valueD.eq(Decimal__default["default"].dNegInf)) return [new Decimal__default["default"](-Infinity), new Decimal__default["default"](Infinity)];
    if (!valueD.isFinite()) return [new Decimal__default["default"](NaN), new Decimal__default["default"](NaN)];
    if (valueD.lt(0)) {
      var preFlip = scientifify(valueD.neg(), baseD, rounding, mantissaPower, engineerings, expMultiplier);
      return [preFlip[0].neg(), preFlip[1]];
    }
    if (baseD.eq(1) || baseD.lte(0)) {
      if (baseD.lt(0)) console.log("Negative base in scientifify");else console.log("Invalid base in scientifify");
      return [baseD, new Decimal__default["default"](NaN)];
    }
    var b = valueD.log(baseD);
    var e = currentEngineeringValue(b.sub(mantissaPowerD), engineeringsD);
    if (e.lt(0) && e.neq(b.sub(mantissaPowerD))) e = previousEngineeringValue(b.sub(mantissaPowerD), engineeringsD);
    b = Decimal__default["default"].pow(base, b.sub(e));
    var unroundedB = b;
    b = round(b, rounding);
    if (e.abs().gte(9e15)) b = Decimal__default["default"].pow(baseD, mantissaPowerD);else {
      var oldB = Decimal__default["default"].dZero;
      var checkComplete = false;
      var loopWatch = false;
      do {
        oldB = unroundedB;
        var upperLimit = baseD.pow(nextEngineeringValue(e, engineeringsD).sub(currentEngineeringValue(e, engineeringsD)).plus(mantissaPower));
        var lowerLimit = baseD.pow(mantissaPowerD);
        if (baseD.lt(1)) {
          if (b.lte(upperLimit)) {
            b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(previousEngineeringValue(e, engineeringsD)));
            e = previousEngineeringValue(e, engineeringsD);
            unroundedB = b;
            b = round(b, rounding);
            loopWatch = true;
          } else if (b.gt(lowerLimit)) {
            b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(nextEngineeringValue(e, engineeringsD)));
            e = nextEngineeringValue(e, engineeringsD);
            unroundedB = b;
            if (loopWatch) b = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
            b = round(b, rounding);
            if (loopWatch) break;
          } else checkComplete = true;
        } else {
          if (b.gte(upperLimit)) {
            b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(nextEngineeringValue(e, engineeringsD)));
            e = nextEngineeringValue(e, engineeringsD);
            unroundedB = b;
            if (loopWatch) b = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
            b = round(b, rounding);
            if (loopWatch) break;
          } else if (b.lt(lowerLimit)) {
            b = unroundedB.mul(baseD.pow(e)).div(baseD.pow(previousEngineeringValue(e, engineeringsD)));
            e = previousEngineeringValue(e, engineeringsD);
            unroundedB = b;
            b = round(b, rounding);
            loopWatch = true;
          } else checkComplete = true;
        }
      } while (!checkComplete && oldB.neq(unroundedB));
    }
    e = e.mul(expMultiplierD);
    return [b, e];
  }
  /**
   * Converts a Decimal into a list of two Decimals, [b, e], such that Decimal.iteratedexp(base, e, b, true) equals the original value.
   * @param value ( Decimal ! ) The value we want to turn into hyperscientific notation.
   * @param base ( Decimal ) The base of the hyperscientific notation we're using (default is 10).
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, 1e100 in base 10, which normally returns [2, 2], would become [100, 1] with 1 mantissaPower and [1e100, 0] with 2 mantissaPower.
   * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param expMultiplier ( Decimal ) Each exponentiation in the iteratedexp, instead of just being base^value, is base^(value/expMultiplier), so that taking the logarithm to undo it would require multiplying by the expMultiplier after said logarithm. Default is 1.
   * @param hyperexpMultiplier ( Decimal ) In the returned pair, e is multiplied by this value. Default is 1.
   */
  function hyperscientifify(value) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Decimal__default["default"].dTen;
    var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Decimal__default["default"].dZero;
    var hypermantissaPower = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Decimal__default["default"].dZero;
    var engineerings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Decimal__default["default"].dOne;
    var expMultiplier = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Decimal__default["default"].dOne;
    var hyperexpMultiplier = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Decimal__default["default"].dOne;
    var valueD = toDecimal(value);
    var baseD = toDecimal(base);
    var hypermantissaPowerD = toDecimal(hypermantissaPower);
    var expMultiplierD = toDecimal(expMultiplier);
    var hyperexpMultiplierD = toDecimal(hyperexpMultiplier);
    var effectiveBase = baseD.pow(expMultiplierD.recip());
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    var engineeringsD = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (effectiveBase.lte(1)) return [baseD, new Decimal__default["default"](NaN)];
    if (valueD.eq(Decimal__default["default"].dInf)) return [new Decimal__default["default"](Infinity), new Decimal__default["default"](Infinity)];
    if (valueD.eq(Decimal__default["default"].dNegInf)) return [new Decimal__default["default"](-Infinity), new Decimal__default["default"](-2)];
    if (!valueD.isFinite()) return [new Decimal__default["default"](NaN), new Decimal__default["default"](NaN)];
    if (valueD.gte(effectiveBase.tetrate(Infinity))) return [valueD.div(effectiveBase.tetrate(Infinity)), new Decimal__default["default"](Infinity)];
    var e, b;
    if (valueD.lt(iteratedexpmult(baseD, 1, engineeringsD[engineeringsD.length - 1].mul(10).toNumber(), expMultiplierD)) && valueD.gt(Decimal__default["default"].max(-Infinity, iteratedexpmult(baseD, 1, engineeringsD[engineeringsD.length - 1].mul(-10).toNumber(), expMultiplierD)))) {
      // We really want to avoid calling slog on small numbers, so just let the "oldB" loop below handle it. The loop limit of 10 was chosen arbitrarily.
      e = new Decimal__default["default"](0);
      b = valueD;
    } else {
      e = currentEngineeringValue(multslog(valueD, baseD, expMultiplierD).sub(hypermantissaPowerD), engineeringsD);
      if (e.lt(0) && e.neq(multslog(valueD, baseD, expMultiplierD).sub(hypermantissaPowerD))) e = previousEngineeringValue(multslog(valueD, baseD, expMultiplierD).sub(hypermantissaPowerD), engineeringsD);
      b = iteratedmultlog(valueD, baseD, e.toNumber(), expMultiplierD);
    }
    var unroundedB = b;
    b = round(b, rounding);
    if (e.abs().gte(9e15)) b = baseD.iteratedexp(hypermantissaPowerD.toNumber(), Decimal__default["default"].dOne, true);else {
      var oldB = Decimal__default["default"].dZero;
      var checkComplete = false;
      var loopWatch = false;
      do {
        oldB = unroundedB;
        var upperLimit = iteratedexpmult(baseD, Decimal__default["default"].dOne, nextEngineeringValue(e, engineeringsD).sub(currentEngineeringValue(e, engineeringsD)).plus(hypermantissaPowerD).toNumber(), expMultiplierD);
        var lowerLimit = iteratedexpmult(baseD, Decimal__default["default"].dOne, hypermantissaPowerD.toNumber(), expMultiplierD);
        if (b.gte(upperLimit)) {
          b = iteratedmultlog(unroundedB, baseD, nextEngineeringValue(e, engineeringsD).sub(e).toNumber(), expMultiplierD);
          e = nextEngineeringValue(e, engineeringsD);
          unroundedB = b;
          if (loopWatch) b = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
          b = round(b, rounding);
          if (loopWatch) break;
        } else if (b.lt(lowerLimit)) {
          b = iteratedexpmult(baseD, unroundedB, e.sub(previousEngineeringValue(e, engineeringsD)).toNumber(), expMultiplierD);
          e = previousEngineeringValue(e, engineeringsD);
          unroundedB = b;
          b = round(b, rounding);
          loopWatch = true;
        } else checkComplete = true;
      } while (!checkComplete && oldB.neq(unroundedB));
    }
    e = e.mul(hyperexpMultiplierD);
    return [b, e];
  }
  /**
   * Splits a Decimal into an array of four decimals, [M, E, T, P], such that if b is the base, b^^b^^b^^...^^(b^b^b^b...^(m * b^e))) = the original Decimal, where there are T b^'s and P b^^'s.
   * In other words, this function splits a Decimal into a hyperoperator array like in OmegaNum, except there's an exponentiation entry between the mantissa and the tetration entry.
   * @param value ( Decimal ! ) The Decimal inputted into the function.
   * @param base ( Decimal ) The base of the exponentiation, tetration, and pentation. Default is 10.
   * @param maximums ( Decimal[] ) The largest allowed values for each operator: anything equal to or above this rolls over to the next operator. maximums[0] is the mantissa limit, maximums[1] is the exponent limit, maximums[2] is the tetration limit. Default is [10, 10, 10], where that 10 is replaced with whatever the base is. Setting maximums[0] to 0 effectively disables the mantissa, setting maximums[1] to be equal to or less than expMult effectively disables the exponent, and setting maximums[2] to be equal to or less than hyperexpMult effectively disables the tetration.
   * @param originalMaximums ( Decimal[] ) These are the maximums that apply when the next operator is 0: for example, if maximums is [10, 10, 10] but originalMaximums is [100, 10, 10], then the mantissa can go up to 100 before exponents begin but once the exponent has begun increasing then the mantissa is limited to 10 (this applies even if tetration or pentation is above 0, as long as exponent is still 0). Is the same as maximums by default.
   * @param minnum ( Decimal ) Values above this and below maximums[0] will just return [value, 0, 0, 0] instead of doing any splitting; this prevents small-but-not-too-small values like 2 from forcing negative exponents. Default is 1. Set this value to a negative number to disable this functionality.
   * @param mantissaRounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
   * @param hyperengineerings ( Decimal | Decimal[] ) Same as engineerings, but for the tetration value instead.
   * @param pentaengineerings ( Decimal | Decimal[] ) Same as engineerings, but for the pentation value instead.
   * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
   * @param hyperexpMult ( Decimal ) Each tetration in the process is multiplied by this value. Default is 1.
   * @param pentaexpMult ( Decimal ) The pentation value is multiplied by this value. Default is 1.
   */
  function hypersplit(value) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var maximums = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [10, 10, 10];
    var originalMaximums = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : maximums;
    var minnum = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
    var mantissaRounding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var engineerings = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
    var hyperengineerings = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    var pentaengineerings = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
    var expMult = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
    var hyperexpMult = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
    var pentaexpMult = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 1;
    var valueD = toDecimal(value);
    var baseD = toDecimal(base);
    var maximumsD = maximums.map(toDecimal);
    if (maximumsD.length == 0) maximumsD.push(new Decimal__default["default"](base));
    while (maximumsD.length < 3) maximumsD.push(maximumsD[maximumsD.length - 1]);
    var originalMaximumsD = originalMaximums.map(toDecimal);
    if (originalMaximumsD.length == 0) originalMaximumsD = maximumsD;
    while (originalMaximumsD.length < 3) originalMaximumsD.push(originalMaximumsD[originalMaximumsD.length - 1]);
    var minnumD = toDecimal(minnum);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    var engineeringsD = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (!Array.isArray(hyperengineerings)) hyperengineerings = [hyperengineerings];
    var hyperengineeringsD = hyperengineerings.map(toDecimal);
    hyperengineeringsD = hyperengineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (!Array.isArray(pentaengineerings)) pentaengineerings = [pentaengineerings];
    var pentaengineeringsD = pentaengineerings.map(toDecimal);
    pentaengineeringsD = pentaengineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    var expMultD = toDecimal(expMult);
    var hyperexpMultD = toDecimal(hyperexpMult);
    var pentaexpMultD = toDecimal(pentaexpMult);
    if (baseD.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Hypersplit does not support convergent tetrations");
    var mantissaRemoved = maximumsD[0].eq(0);
    var amountRemoved = 0;
    if (maximumsD[1].lte(expMultD)) {
      amountRemoved = 1;
      maximumsD[1] = Decimal__default["default"].dOne;
      if (maximumsD[2].lte(hyperexpMultD)) {
        amountRemoved = 2;
        maximumsD[2] = Decimal__default["default"].dOne;
      }
    }
    var limits = [maximumsD[0]];
    if (mantissaRemoved) {
      limits.push(iteratedexpmult(baseD, maximumsD[1], 1, expMultD));
      limits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(maximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
      limits[2] = limits[2].max(limits[1]);
    } else {
      limits.push(iteratedexpmult(baseD, previousEngineeringValue(maximumsD[1], engineeringsD), 1, expMultD).mul(maximumsD[0]));
      limits[1] = limits[1].max(limits[0]);
      limits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(maximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
      limits[2] = limits[2].max(limits[1]);
    }
    var originalLimits = [originalMaximumsD[0]];
    if (mantissaRemoved) {
      originalLimits.push(iteratedexpmult(baseD, originalMaximumsD[1], 1, expMultD));
      originalLimits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(originalMaximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
      originalLimits[2] = originalLimits[2].max(originalLimits[1]);
    } else {
      originalLimits.push(iteratedexpmult(baseD, previousEngineeringValue(originalMaximumsD[1], engineeringsD), 1, expMultD).mul(maximumsD[0]));
      originalLimits[1] = originalLimits[1].max(originalLimits[0]);
      originalLimits.push(iteratedexpmult(baseD, limits[1], previousEngineeringValue(originalMaximumsD[2].div(hyperexpMult), hyperengineeringsD).toNumber(), expMultD));
      originalLimits[2] = originalLimits[2].max(originalLimits[1]);
    }
    if (valueD.eq(0) && amountRemoved == 0) return [new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](0)];
    if (!mantissaRemoved && minnumD.gte(0) && valueD.abs().lt(originalMaximumsD[0]) && valueD.abs().gte(minnumD)) return [valueD, new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](0)];
    if (valueD.lt(1) && amountRemoved == 1) {
      if (mantissaRemoved) {
        var _tetration = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
        _tetration = round(_tetration, mantissaRounding);
        return [new Decimal__default["default"](0), new Decimal__default["default"](0), _tetration, new Decimal__default["default"](0)];
      } else {
        var _tetration2 = previousEngineeringValue(Decimal__default["default"].dZero, hyperengineeringsD);
        while (valueD.lt(0) && _tetration2.gt(-2)) _tetration2 = previousEngineeringValue(_tetration2, hyperengineeringsD);
        var _mantissa = iteratedmultlog(valueD, baseD, _tetration2.toNumber(), expMult);
        return [_mantissa, new Decimal__default["default"](0), _tetration2.mul(hyperexpMult), new Decimal__default["default"](0)];
      }
    }
    if (valueD.lt(1) && amountRemoved == 2) {
      if (mantissaRemoved) {
        //Just use the same values as for tetration, I don't have any better ideas
        var _pentation = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
        _pentation = round(_pentation, mantissaRounding);
        return [new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](0), _pentation];
      } else {
        var _pentation2 = nextEngineeringValue(new Decimal__default["default"](0), pentaengineeringsD);
        for (var p = 0; p < _pentation2.toNumber(); p++) {
          valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
        }
        return [valueD, new Decimal__default["default"](0), new Decimal__default["default"](0), _pentation2.mul(pentaexpMultD)];
      }
    }
    var negative = false;
    if (valueD.lt(0)) {
      negative = true;
      valueD = valueD.neg();
    }
    var negExp = false;
    if (valueD.lt(1) && valueD.recip().gte(originalLimits[1]) && amountRemoved < 1) {
      negExp = true;
      valueD = valueD.recip();
    }
    var oldB = Decimal__default["default"].dZero;
    var checkComplete = false;
    var pentation = new Decimal__default["default"](0);
    if (mantissaRemoved && amountRemoved > 1) {
      while (valueD.gte(baseD)) {
        valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
        pentation = pentation.plus(1);
      }
      pentation = pentation.plus(valueD.log(baseD)).mul(hyperexpMult);
      pentation = round(pentation, mantissaRounding);
      return [new Decimal__default["default"](0), new Decimal__default["default"](0), new Decimal__default["default"](0), pentation];
    }
    if (valueD.gte(originalLimits[2])) {
      while (valueD.gte(limits[2])) {
        var pentIncrease = nextEngineeringValue(pentation, pentaengineeringsD).sub(pentation).toNumber();
        for (var _p = 0; _p < pentIncrease; _p++) {
          valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
        }
        pentation = pentation.plus(pentIncrease);
      }
    }
    pentation = pentation.mul(pentaexpMultD);
    var hypermantissa = valueD,
      tetration = new Decimal__default["default"](0);
    if (mantissaRemoved && amountRemoved > 0) {
      tetration = multslog(valueD, baseD, expMult).mul(hyperexpMult);
      tetration = round(tetration, mantissaRounding);
      if (tetration.gte(maximumsD[2])) {
        valueD = toDecimal(value);
        var _pentIncrease = nextEngineeringValue(pentation, pentaengineeringsD).sub(pentation).toNumber();
        for (var _p2 = 0; _p2 < _pentIncrease; _p2++) {
          valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
        }
        var _hypersplit = hypersplit(valueD, base, maximums, originalMaximums, minnum, mantissaRounding, engineerings, hyperengineerings, pentaengineerings, expMult, hyperexpMult),
          _hypersplit2 = _slicedToArray(_hypersplit, 4),
          m = _hypersplit2[0],
          e = _hypersplit2[1],
          t = _hypersplit2[2],
          _p3 = _hypersplit2[3];
        _p3 = _p3.plus(_pentIncrease);
        return [m, e, t, _p3.mul(pentaexpMult)];
      } else return [new Decimal__default["default"](0), new Decimal__default["default"](0), tetration, pentation];
    }
    if (amountRemoved > 1) {
      hypermantissa = round(hypermantissa, mantissaRounding);
    } else if (pentation.eq(0) && valueD.gte(originalLimits[1]) || pentation.gt(0) && valueD.gte(limits[1])) {
      var hypermantissaPower = multslog(limits[1], baseD, expMultD);
      var _hyperscientifify = hyperscientifify(valueD, baseD, 0, hypermantissaPower, hyperengineeringsD, expMultD);
      var _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2);
      hypermantissa = _hyperscientifify2[0];
      tetration = _hyperscientifify2[1];
      oldB = Decimal__default["default"].dZero;
      checkComplete = false;
      do {
        oldB = hypermantissa;
        if (hypermantissa.gte(limits[1])) {
          hypermantissa = iteratedmultlog(hypermantissa, baseD, nextEngineeringValue(tetration, hyperengineeringsD).sub(tetration).toNumber(), expMultD);
          tetration = nextEngineeringValue(tetration, hyperengineeringsD);
        } else if (iteratedexpmult(baseD, hypermantissa, tetration.sub(previousEngineeringValue(tetration, hyperengineeringsD)).toNumber(), expMultD).lt(limits[1])) {
          hypermantissa = iteratedexpmult(baseD, hypermantissa, tetration.sub(previousEngineeringValue(tetration, hyperengineeringsD)).toNumber(), expMultD);
          tetration = previousEngineeringValue(tetration, hyperengineeringsD);
        } else checkComplete = true;
      } while (!checkComplete && oldB.neq(hypermantissa));
    }
    var mantissaPower = Decimal__default["default"].dZero;
    var mantissa = hypermantissa,
      exponent = new Decimal__default["default"](0);
    var scientififyLoopDone = false;
    do {
      mantissaPower = Decimal__default["default"].dZero;
      mantissa = hypermantissa;
      exponent = new Decimal__default["default"](0);
      if (mantissaRemoved) {
        var _ref = [new Decimal__default["default"](0), round(hypermantissa.log(baseD), mantissaRounding)];
        mantissa = _ref[0];
        exponent = _ref[1];
      } else if (amountRemoved < 1 && mantissa.gte(originalMaximumsD[0])) {
        mantissaPower = limits[0].log(baseD).sub(engineeringsD[engineeringsD.length - 1]); // Not a perfect value, but we'll let the loop below fix the errors. We guarantee mantissaPower behaves as we want it to here because mantissaPower cares about the lower limit while hypersplit cares about the upper limit, and once engineerings is involved the two won't coincide so easily.
        var _scientifify3 = scientifify(hypermantissa, baseD, 0, mantissaPower, engineeringsD);
        var _scientifify4 = _slicedToArray(_scientifify3, 2);
        mantissa = _scientifify4[0];
        exponent = _scientifify4[1];
      }
      var unroundedmantissa = new Decimal__default["default"](mantissa);
      mantissa = round(mantissa, mantissaRounding);
      if (amountRemoved < 1 && !mantissaRemoved) {
        var _oldB = Decimal__default["default"].dZero;
        var _checkComplete = false;
        var loopWatch = false;
        do {
          _oldB = unroundedmantissa;
          var upperLimit = exponent.eq(0) ? originalLimits[0] : limits[0];
          var lowerLimit = upperLimit.div(baseD.pow(exponent.sub(previousEngineeringValue(exponent, engineeringsD))));
          if (mantissa.gte(upperLimit)) {
            unroundedmantissa = unroundedmantissa.mul(baseD.pow(exponent)).div(baseD.pow(nextEngineeringValue(exponent, engineeringsD)));
            exponent = nextEngineeringValue(exponent, engineeringsD);
            if (loopWatch) mantissa = lowerLimit; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
            mantissa = round(unroundedmantissa, mantissaRounding);
            if (loopWatch) break;
          } else if (mantissa.lt(lowerLimit)) {
            unroundedmantissa = unroundedmantissa.mul(baseD.pow(exponent)).div(baseD.pow(previousEngineeringValue(exponent, engineeringsD)));
            exponent = previousEngineeringValue(exponent, engineeringsD);
            mantissa = round(unroundedmantissa, mantissaRounding);
            loopWatch = true;
          } else _checkComplete = true;
        } while (!_checkComplete && _oldB.neq(unroundedmantissa));
      }
      if (exponent.gte(tetration.eq(0) ? originalMaximumsD[1] : maximumsD[1])) {
        //Rounding might set us over the limit
        hypermantissa = iteratedmultlog(hypermantissa, baseD, nextEngineeringValue(tetration, hyperengineeringsD).sub(tetration).toNumber(), expMultD);
        tetration = nextEngineeringValue(tetration, hyperengineeringsD);
      } else scientififyLoopDone = true;
    } while (!scientififyLoopDone);
    tetration = tetration.mul(hyperexpMultD);
    if (tetration.gte(pentation.eq(0) ? originalMaximumsD[2] : maximumsD[2])) {
      valueD = toDecimal(value);
      var _pentIncrease2 = nextEngineeringValue(pentation, pentaengineeringsD).sub(pentation).toNumber();
      for (var _p4 = 0; _p4 < _pentIncrease2; _p4++) {
        valueD = multslog(valueD, baseD, expMultD).mul(hyperexpMultD);
      }
      var _hypersplit3 = hypersplit(valueD, base, maximums, originalMaximums, minnum, mantissaRounding, engineerings, hyperengineerings, pentaengineerings, expMult, hyperexpMult),
        _hypersplit4 = _slicedToArray(_hypersplit3, 4),
        _m = _hypersplit4[0],
        _e = _hypersplit4[1],
        _t = _hypersplit4[2],
        _p5 = _hypersplit4[3];
      _p5 = _p5.plus(_pentIncrease2);
      return [_m, _e, _t, _p5.mul(pentaexpMult)];
    }
    exponent = exponent.mul(expMultD);
    if (negExp) exponent = exponent.neg();
    if (negative) mantissa = mantissa.neg();
    if (amountRemoved > 0) exponent = new Decimal__default["default"](0);
    if (amountRemoved > 1) tetration = new Decimal__default["default"](0);
    return [mantissa, exponent, tetration, pentation];
  }
  //Decimal's factorial function is too imprecise for something as precision-needing as base conversion, so here's a quick implementation of factorial. For ease of implementing factoradic, -1! is 1 / 1!, -2! is 1 / 2!, -3! is 1 / 3!, and so on.
  function factorial(value) {
    if (value % 1 != 0) throw new RangeError("Non-whole factorials are not implemented.");
    var result = 1;
    if (value >= 0) for (var i = 1; i <= value; i++) result *= i;else for (var _i = 1; _i <= -value; _i++) result /= _i;
    return result;
  }
  /**
   * Repeatedly takes the factorial of a Decimal.
   * @param value ( Decimal ! ) The number we're taking factorials of.
   * @param iterations ( number ) The amount of times the factorial is taken. Uses an approximation for non-whole amounts of iterations. Default is 1.
   */
  function iteratedfactorial(value) {
    var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var valueD = toDecimal(value);
    if (iterations == 0) return valueD;
    if (iterations == 1) return valueD.factorial();
    if (valueD.lt(0.461632144968362341262659542325) && iterations % 1 != 0) return new Decimal__default["default"](NaN); //I'm not sure what fractional iterations would mean below the local minimum
    if (iterations < 0) return inverse_factorial(valueD, -iterations);
    var wholeiterations = Math.floor(iterations);
    var fraciterations = iterations - wholeiterations;
    var payload = valueD;
    if (fraciterations != 0) payload = payload.mul(valueD.factorial().div(valueD).pow(fraciterations));
    for (var f = 0; f < wholeiterations; f++) {
      if (payload.eq(1)) return new Decimal__default["default"](1); //1!!!!!... is always 1
      if (payload.eq(2)) return new Decimal__default["default"](2); //2!!!!!... is always 2
      if (payload.gt(new Decimal__default["default"](Number.MAX_SAFE_INTEGER).pow10())) return Decimal__default["default"].iteratedexp(10, wholeiterations - f, payload, true);
      payload = payload.factorial();
      if (f > 10000) return payload; //Bail after 10000 iterations if nothing is happening
    }
    return payload;
  }
  /**
   * The inverse of the factorial function: finds the number x such that x! = value. Equivalent to iteratedfactorial with a negative amount of iterations.
   * @param value ( Decimal ! ) The value we're finding the inverse factorial of.
   * @param iterations ( number ) The amount of times the factorial is taken. Default is 1. For example, if iterations is 2, then it finds the number x such that x!! = value. Default is 1.
   */
  function inverse_factorial(value) {
    var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var valueD = toDecimal(value);
    if (valueD.eq(1)) return new Decimal__default["default"](1);
    if (valueD.eq(2)) return new Decimal__default["default"](2);
    if (iterations < 0) return iteratedfactorial(valueD, -iterations);
    //I'm not dealing with the uncertainty of negative factorials here. I carefully studied super-root to handle small inputs for it in break_eternity, and maybe with enough studying I could handle small inputs for a single-factorial, but multiple factorials would be far too chaotic.
    //Besides, handling special cases like that might be useful for break_eternity (a large number library), but not for eternal_notations (a notations library).
    if (valueD.lt(iteratedfactorial(0.461632144968362341262659542325, iterations))) throw new Error("Inverse_factorial is currently unsupported for values below the local minimum. Sorry!");
    //Loop procedure adapted from Decimal.linear_sroot
    var upperBound = new Decimal__default["default"](2);
    if (valueD.gt(2)) upperBound = valueD.linear_sroot(Math.floor(iterations + 1)).mul(2); //x! is lower-bounded by (x/2)^^2
    var lower = Decimal__default["default"].dZero; //This is zero because we might be on a higher layer, so the lower bound might actually some 10^10^10...^0
    var layer = upperBound.layer;
    if (layer == 0) lower = new Decimal__default["default"](0.461632144968362341262659542325);
    var upper = upperBound.iteratedlog(10, layer, true);
    var previous = upper;
    var guess = upper.div(2);
    var loopGoing = true;
    while (loopGoing) {
      guess = lower.add(upper).div(2);
      if (iteratedfactorial(Decimal__default["default"].iteratedexp(10, layer, guess, true), iterations).gt(valueD)) upper = guess;else lower = guess;
      if (guess.eq(previous)) loopGoing = false;else previous = guess;
    }
    if (iteratedfactorial(Decimal__default["default"].iteratedexp(10, layer, guess, true), iterations).eq_tolerance(valueD, 1e-9)) return Decimal__default["default"].iteratedexp(10, layer, guess, true);else return new Decimal__default["default"](NaN);
  }
  /**
   * This function is to iteratedfactorial and inverse_factorial as slog is to iteratedexp and iteratedlog: it returns the amount of times factorial must be applied to the base to return the given value.
   * @param value ( Decimal ! ) The value we're finding the factorial_slog for.
   * @param base ( Decimal ) The number that the factorials are repeatedly applied to. The base must be greater than 2. Default is 3.
   */
  function factorial_slog(value) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var valueD = toDecimal(value);
    var baseD = toDecimal(base);
    if (baseD.lte(2)) throw new RangeError("factorial_slog is not supported for bases equal to or below 2, since iteratedfactorial isn't increasing for those bases.");
    if (valueD.eq(2)) return new Decimal__default["default"](-Infinity);
    if (valueD.lt(2)) return new Decimal__default["default"](NaN);
    if (valueD.eq(baseD)) return new Decimal__default["default"](0); //Combats imprecision
    if (valueD.gte(Decimal__default["default"].tetrate(baseD, 1e17))) return valueD.slog(baseD, 100, true); //At this scale the difference between factorial_slog and regular slog is lost in precision
    if (valueD.lt(baseD)) {
      var lower = -1e-18;
      var upper = -2e-18;
      var guess = 0;
      while (iteratedfactorial(baseD, upper).gt(valueD)) {
        lower *= 2;
        upper *= 2;
      }
      var previous = -1;
      while (previous != guess) {
        previous = guess;
        guess = (lower + upper) / 2;
        if (iteratedfactorial(baseD, guess).gt(valueD)) lower = guess;else upper = guess;
      }
      return toDecimal(guess);
    } else {
      var _lower = 1e-18;
      var _upper = 2e-18;
      var _guess = 0;
      while (iteratedfactorial(baseD, _upper).lt(valueD)) {
        _lower *= 2;
        _upper *= 2;
      }
      var _previous5 = -1;
      while (_previous5 != _guess) {
        _previous5 = _guess;
        _guess = (_lower + _upper) / 2;
        if (iteratedfactorial(baseD, _guess).lt(valueD)) _lower = _guess;else _upper = _guess;
      }
      return toDecimal(_guess);
    }
  }
  /**
   * Converts a Decimal into a list of two Decimals, [b, e], such that b * e! equals the original value.
   * @param value ( Decimal ! ) The value to be converted into "factorial scientific notation".
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in factorial-scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   */
  function factorial_scientifify(value) {
    var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Decimal__default["default"].dZero;
    var mantissaPower = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Decimal__default["default"].dZero;
    var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Decimal__default["default"].dOne;
    var valueD = toDecimal(value);
    var mantissaPowerD = toDecimal(mantissaPower);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    var engineeringsD = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (valueD.eq(0)) return [new Decimal__default["default"](0), new Decimal__default["default"](0)];
    if (valueD.eq(1)) return [new Decimal__default["default"](1), new Decimal__default["default"](1)]; //Combats imprecision for this one special case that I especially want to be correct
    if (valueD.eq(Decimal__default["default"].dInf)) return [new Decimal__default["default"](Infinity), new Decimal__default["default"](Infinity)];
    if (valueD.eq(Decimal__default["default"].dNegInf)) return [new Decimal__default["default"](-Infinity), new Decimal__default["default"](Infinity)];
    if (!valueD.isFinite()) return [new Decimal__default["default"](NaN), new Decimal__default["default"](NaN)];
    if (valueD.lt(0)) {
      var preFlip = factorial_scientifify(valueD.neg(), rounding, mantissaPower, engineerings);
      return [preFlip[0].neg(), preFlip[1]];
    }
    var b = Decimal__default["default"].dZero;
    var e = Decimal__default["default"].dZero;
    var unroundedB = b;
    if (valueD.lt(1)) {
      b = inverse_factorial(valueD.recip());
      e = currentEngineeringValue(b.plus(mantissaPowerD), engineeringsD);
      b = valueD.div(e.factorial().recip());
      unroundedB = b;
      b = round(b, rounding);
      if (valueD.lte("e-9e15")) {
        b = e.factorial().div(e.sub(mantissaPowerD).factorial());
      } else {
        var oldB = Decimal__default["default"].dZero;
        var checkComplete = false;
        var loopWatch = false;
        do {
          oldB = unroundedB;
          var upperLimit = previousEngineeringValue(e, engineeringsD).sub(mantissaPower).factorial().recip();
          var lowerLimit = currentEngineeringValue(e, engineeringsD).sub(mantissaPower).factorial().recip();
          if (e.gt(0) && b.mul(e.factorial().recip()).gte(upperLimit)) {
            if (loopWatch) break; // Since the mantissa range varies, I can't force its value to the lower limit, so there's a chance this results in a mantissa slightly larger than it's supposed to be. break_eternity factorials are imprecise anyway.
            e = previousEngineeringValue(e, engineeringsD);
            unroundedB = valueD.div(e.factorial().recip());
            b = round(unroundedB, rounding);
          } else if (b.mul(e.factorial().recip()).lt(lowerLimit)) {
            e = nextEngineeringValue(e, engineeringsD);
            unroundedB = valueD.div(e.factorial().recip());
            b = round(unroundedB, rounding);
            loopWatch = true;
          } else checkComplete = true;
        } while (!checkComplete && oldB.neq(unroundedB));
      }
      e = e.neg();
    } else {
      b = inverse_factorial(valueD);
      e = currentEngineeringValue(b.sub(mantissaPowerD), engineeringsD);
      b = valueD.div(e.factorial());
      unroundedB = b;
      b = round(b, rounding);
      if (valueD.gte("e9e15")) {
        b = e.factorial().div(e.sub(mantissaPowerD).factorial());
      } else {
        var _oldB2 = Decimal__default["default"].dZero;
        var _checkComplete2 = false;
        var _loopWatch = false;
        do {
          _oldB2 = unroundedB;
          var nextE = nextEngineeringValue(e, engineeringsD).plus(mantissaPower).factorial();
          var currentE = currentEngineeringValue(e, engineeringsD).plus(mantissaPower).factorial();
          if (b.mul(e.factorial()).gte(nextE)) {
            if (_loopWatch) break; // Since the mantissa range varies, I can't force its value to the lower limit, so there's a chance this results in a mantissa slightly larger than it's supposed to be. break_eternity factorials are imprecise anyway.
            unroundedB = unroundedB.mul(e.factorial()).div(nextEngineeringValue(e, engineeringsD).factorial());
            e = nextEngineeringValue(e, engineeringsD);
            b = round(unroundedB, rounding);
          } else if (e.gt(0) && b.mul(e.factorial()).lt(currentE)) {
            unroundedB = unroundedB.mul(e.factorial()).div(previousEngineeringValue(e, engineeringsD).factorial());
            e = previousEngineeringValue(e, engineeringsD);
            b = round(unroundedB, rounding);
            _loopWatch = true;
          } else _checkComplete2 = true;
        } while (!_checkComplete2 && _oldB2.neq(unroundedB));
      }
    }
    return [b, e];
  }
  /**
   * Converts a Decimal into a list of two Decimals, [b, e], such that b!!!... with e !'s equals the original value.
   * @param value ( Decimal ! ) The value to be converted into "factorial hyperscientific notation".
   * @param limit ( Decimal ) If the mantissa is below this value, the amount of factorials is decreased by 1 to bring the mantissa back to being equal to or above this value. Default is 3.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   */
  function factorial_hyperscientifify(value) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Decimal__default["default"](3);
    var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Decimal__default["default"].dZero;
    var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Decimal__default["default"].dOne;
    var valueD = toDecimal(value);
    var limitD = toDecimal(limit);
    if (!Array.isArray(engineerings)) engineerings = [engineerings];
    var engineeringsD = engineerings.map(toDecimal);
    engineeringsD = engineeringsD.sort(function (a, b) {
      if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
    }).reverse();
    if (valueD.eq(Decimal__default["default"].dInf)) return [new Decimal__default["default"](Infinity), new Decimal__default["default"](Infinity)];
    if (valueD.lte(2) || limitD.lte(2)) return [valueD, new Decimal__default["default"](0)];
    if (!valueD.isFinite()) return [new Decimal__default["default"](NaN), new Decimal__default["default"](NaN)];
    var fs = factorial_slog(valueD, limitD);
    var e = currentEngineeringValue(fs, engineeringsD);
    if (e.lt(0) && e.neq(fs)) e = previousEngineeringValue(fs, engineeringsD);
    var unroundedB = inverse_factorial(valueD, e.toNumber());
    var b = round(unroundedB, rounding);
    if (e.abs().gte(9e15)) b = limitD;else if (e.gte(0)) {
      var oldB = Decimal__default["default"].dZero;
      var checkComplete = false;
      var loopWatch = false;
      do {
        oldB = unroundedB;
        var upperLimit = iteratedfactorial(limitD, nextEngineeringValue(e, engineeringsD).sub(currentEngineeringValue(e, engineeringsD)).toNumber());
        if (b.gte(upperLimit)) {
          e = nextEngineeringValue(e, engineeringsD);
          unroundedB = inverse_factorial(valueD, e.toNumber());
          if (loopWatch) unroundedB = limitD; //If we've gone both up and down, the mantissa is too close to the boundary, so just set it to the boundary value
          b = round(unroundedB, rounding);
          if (loopWatch) break;
        } else if (b.lt(limitD)) {
          e = previousEngineeringValue(e, engineeringsD);
          unroundedB = inverse_factorial(valueD, e.toNumber());
          b = round(unroundedB, rounding);
          loopWatch = true;
        } else checkComplete = true;
      } while (!checkComplete && oldB.neq(unroundedB));
    }
    return [b, e];
  }
  /**
   * Returns the nth polygonal number of s sides; 3 sides is triangular numbers, 4 sides is perfect squares, etc.
   * Grows quadratically.
   * @param value ( Decimal ! ) The value we're taking the polygonal number of.
   * @param sides ( Decimal ! ) The amount of sides on the polygon.
   */
  function polygon(value, sides) {
    var valueD = toDecimal(value);
    var sidesD = toDecimal(sides);
    return valueD.sub(1).mul(sidesD.sub(2)).plus(2).mul(valueD).div(2);
  }
  /**
   * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds n given x and s.
   * Grows at a square root rate (square root itself, of course, is the s = 4 case of polygonRoot).
   * @param value ( Decimal ! ) The x in the above example.
   * @param sides ( Decimal ! ) The s in the above example.
   */
  function polygonRoot(value, sides) {
    var valueD = toDecimal(value);
    var sidesD = toDecimal(sides);
    if (sidesD.eq(2)) return valueD;
    return sidesD.sub(2).mul(8).mul(valueD).plus(sidesD.sqr().sub(sidesD.mul(8)).plus(16)).sqrt().plus(sidesD).sub(4).div(sidesD.mul(2).sub(4));
  }
  /**
   * One of the inverses of the polygon function. For polygon(n, s) = x, this function finds s given x and n.
   * This is actually weaker than polygonRoot - polygonRoot has the strength of square root, but polygonLog has the strength of division.
   * @param value ( Decimal ! ) The x in the above example.
   * @param base ( Decimal ! ) The n in the above example.
   */
  function polygonLog(value, base) {
    var valueD = toDecimal(value);
    var baseD = toDecimal(base);
    return valueD.plus(baseD.mul(baseD.sub(2))).div(baseD.sqr().sub(baseD).div(2));
  }
  /**
   * Iterated polygon: this function returns the result of applying polygon(x, s) to 'payload' (with the result placed in the x of the next application) 'value' times.
   * Grows double-exponentially, using a linear approximation for fractional values (though this becomes irrelevant for values above 8 or so, as there's an approximating formula that holds for non-small values)
   * @param value ( Decimal ! ) The amount of times the polygon function is applied.
   * @param sides ( Decimal ! ) The amount of sides on the polygon.
   * @param payload ( Decimal ) The number the polygon function is repeatedly applied to. Default is 2.
   */
  function biPolygon(value, sides) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var valueD = toDecimal(value);
    var sidesD = toDecimal(sides);
    var payloadD = toDecimal(payload);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (payloadD.eq(1)) return new Decimal__default["default"](1);
    if (payloadD.eq(0)) return new Decimal__default["default"](0);
    if (payloadD.lt(0)) throw new RangeError("Repeated polygonal functions do not currently support negative payloads");
    if (valueD.lt(0)) return iteratedPolygonRoot(payloadD, valueD.neg(), sidesD);
    if (payloadD.gt(1)) {
      var iterationArray = [payloadD];
      while (iterationArray[iterationArray.length - 1].plus(Decimal__default["default"].sub(4, sides).max(1)).neq(iterationArray[iterationArray.length - 1])) iterationArray.push(polygon(iterationArray[iterationArray.length - 1], sidesD)); //The max(1) is there mostly to make sure sides == 4 gets a few entries rather than stopping right away
      var finalIteration = polygon(iterationArray[iterationArray.length - 1], sidesD);
      // https://oeis.org/A007501 shows an example of the formula here:
      // Nesting the polygon operation results in an expression that quickly approaches A * B^2^n + C, for some constants A, B, and C. (the OEIS example doesn't include C in its approximation, but testing has shown me that C for triangular numbers should be -0.5)
      // This is not accurate for the first few entries, but quickly becomes accurate.
      // A and C are determined exclusively by the number of sides:
      var A = sidesD.sub(2).div(2).recip();
      var C = sidesD.sub(4).div(sidesD.sub(2).mul(2));
      // But we'll need to get B experimentally, as both payload and sides influence it:
      var B = finalIteration.sub(C).div(A).root(Decimal__default["default"].pow(2, iterationArray.length));
      iterationArray.push(finalIteration);
      var valueNum = valueD.toNumber();
      if (valueNum >= 0 && valueNum < iterationArray.length && valueNum % 1 == 0) return iterationArray[valueNum];else if (valueNum < iterationArray.length - 1) {
        // We'll use a linear approximation here: find the two closest whole-iteration values (from iterationArray), find their n's under A * B^2^n + C, and set that n to be between the two based on the given value
        var lowerN = iterationArray[Math.floor(valueNum)].sub(C).div(A).log(B).log(2).toNumber();
        var upperN = iterationArray[Math.ceil(valueNum)].sub(C).div(A).log(B).log(2).toNumber();
        if (!Number.isFinite(lowerN) || !Number.isFinite(upperN)) {
          // The numbers are too small for the double-exponent approximation to work, so just use a square root approximation instead
          var _lowerN = iterationArray[Math.floor(valueNum)].sqrt().toNumber();
          var _upperN = iterationArray[Math.ceil(valueNum)].sqrt().toNumber();
          var _fracVal = valueNum % 1;
          return Decimal__default["default"].sqr(_upperN * _fracVal + _lowerN * (1 - _fracVal));
        }
        var fracVal = valueNum % 1;
        var thisN = upperN * fracVal + lowerN * (1 - fracVal);
        return B.pow(Decimal__default["default"].pow(2, thisN)).mul(A).plus(C);
      } else return B.pow(Decimal__default["default"].pow(2, value)).mul(A).plus(C);
    } else {
      if (sidesD.eq(4)) return payloadD.pow(Decimal__default["default"].pow(2, value)); //This applies to the payload > 1 case too but it wasn't needed there. Here, however, the algorithm used doesn't work when sides == 4, so the special case is needed
      else if (sidesD.lt(6)) {
        var addedNumber = Decimal__default["default"].sub(4, sidesD);
        var _iterationArray = [payloadD];
        while (_iterationArray[_iterationArray.length - 1].plus(addedNumber).neq(addedNumber)) _iterationArray.push(polygon(_iterationArray[_iterationArray.length - 1], sidesD));
        var _finalIteration = polygon(_iterationArray[_iterationArray.length - 1], sidesD);
        _iterationArray.push(_finalIteration);
        var _valueNum = valueD.toNumber();
        if (_valueNum >= 0 && _valueNum < _iterationArray.length && _valueNum % 1 == 0) return _iterationArray[_valueNum];else if (_valueNum < _iterationArray.length - 1) {
          var _lowerN2 = _iterationArray[Math.floor(_valueNum)];
          var _upperN2 = _iterationArray[Math.ceil(_valueNum)];
          if (_lowerN2.lt(0) || _upperN2.lt(0)) return new Decimal__default["default"](NaN); //The result here would be complex. I'm not sure what it would be exactly, but it would be complex.
          var _fracVal2 = _valueNum % 1;
          return Decimal__default["default"].mul(_upperN2.pow(_fracVal2), _lowerN2.pow(1 - _fracVal2)); // Just take the geometric mean of the two, since the approximation approaches division
        } else return _finalIteration.mul(addedNumber.div(2).pow(valueD.sub(_iterationArray.length))); // Yes, this returns NaN if addedNumber is negative and valueD isn't whole. That's intended, because it would be complex.
      } else {
        // The behavior here gets chaotic (though somehow it's periodic with period 4 when sides == 7; sides == 6 and 8 are chaotic, and I haven't looked at non-integer sides), so I'm not dealing with it. You can have a loop for whole values, take it or leave it.
        if (valueD.mod(1).neq(0)) return new Decimal__default["default"](NaN);
        var iterationsSoFar = Decimal__default["default"].dZero;
        while (iterationsSoFar.lt(valueD)) {
          iterationsSoFar = iterationsSoFar.plus(1);
          var oldPayload = payloadD;
          payloadD = polygon(payloadD, sidesD);
          if (payloadD.eq(0)) return new Decimal__default["default"](0);
          if (payloadD.eq(oldPayload.sqr())) return payloadD.pow(Decimal__default["default"].pow(2, valueD.sub(iterationsSoFar))); // When sides is above 8 it rebounds back to essentially squaring each time
        }
        return payloadD;
      }
    }
  }
  /**
   * Performs polygonRoot on 'payload', 'iterations' times. Equivalent to biPolygon with a negative value.
   * @param payload ( Decimal ! ) The number that's having the polygonal root repeatedly taken on.
   * @param iterations ( Decimal ! ) The amount of times the polygonal root is taken.
   * @param sides ( Decimal ! ) The amount of sides on the polygon.
   */
  function iteratedPolygonRoot(payload, iterations, sides) {
    var payloadD = toDecimal(payload);
    var originalPayload = payloadD;
    var iterationsD = toDecimal(iterations);
    var sidesD = toDecimal(sides);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (payloadD.eq(1)) return new Decimal__default["default"](1);
    if (payloadD.eq(0)) return new Decimal__default["default"](0);
    if (payloadD.lt(0)) throw new RangeError("Repeated polygonal functions do not currently support negative payloads");
    if (iterationsD.lt(0)) return biPolygon(iterationsD.neg(), sidesD, payloadD);
    var A = sidesD.sub(2).div(2).recip();
    if (payloadD.gt(1)) {
      var iterationsSoFar = Decimal__default["default"].dZero;
      var safeIterations = Decimal__default["default"].dZero;
      if (payloadD.gt(Decimal__default["default"].max(1e100, sidesD.sqr()))) safeIterations = payloadD.root(Decimal__default["default"].max(1e100, sidesD.sqr())).log(2).sub(1).floor().max(0).min(iterationsD.ceil()); // 1e100 was chosen arbitrarily as a "high enough to ignore the details" value
      if (safeIterations.gt(0)) {
        payloadD = payloadD.root(Decimal__default["default"].pow(2, safeIterations)).mul(Decimal__default["default"].pow(A, Decimal__default["default"].dOne.sub(Decimal__default["default"].pow(2, safeIterations.neg())))); // For a precise result you'd also want to do subtraction under square roots with C here, but C's going to be so small compared to these numbers that we can ignore it
        iterationsSoFar = iterationsSoFar.plus(safeIterations);
      }
      while (iterationsD.gt(iterationsSoFar)) {
        payloadD = polygonRoot(payloadD, sidesD);
        iterationsSoFar = iterationsSoFar.plus(1);
        if (payloadD.eq(1)) return new Decimal__default["default"](1);
      }
      if (iterationsSoFar.sub(iterationsD).neq(0)) {
        payloadD = biPolygon(iterationsSoFar.sub(iterationsD), sidesD, payloadD);
      }
      if (!payloadD.isFinite()) return payloadD;
      // This answer is close, but not exact for some reason (it's within typical Decimal precision limits if iterations is an integer, but in non-integer iterations what we have so far isn't good enough), so time for a guess-and-check loop!
      var lower = Decimal__default["default"].dZero;
      var upper = payloadD.mul(2).slog(10, 100, true);
      var has_changed_directions_once = false;
      while (lower.neq_tolerance(upper, 1e-15)) {
        var payloadSlog = lower.plus(upper).div(2);
        payloadD = Decimal__default["default"].tetrate(10, payloadSlog.toNumber(), 1, true);
        var bp = biPolygon(iterationsD, sidesD, payloadD);
        if (bp.eq(originalPayload)) return payloadD;else if (bp.lt(originalPayload)) {
          if (has_changed_directions_once) lower = payloadSlog;else upper = upper.mul(2);
        } else {
          upper = payloadSlog;
          has_changed_directions_once = true;
        }
      }
      return payloadD;
    } else {
      if (sidesD.eq(4)) return payloadD.root(Decimal__default["default"].pow(2, iterationsD));else if (sidesD.lt(4) || payloadD.gte(sidesD.sub(4).div(sidesD.sub(2)))) {
        var _iterationsSoFar = Decimal__default["default"].dZero;
        var _safeIterations = Decimal__default["default"].dZero;
        var addedNumber = Decimal__default["default"].sub(4, sidesD);
        var multiplier = addedNumber.div(2);
        var safeThreshold = multiplier.div(1e16);
        if (payloadD.abs().lt(safeThreshold)) _safeIterations = payloadD.abs().root(safeThreshold.log(multiplier)).log(multiplier).abs().floor();
        if (_safeIterations.gt(0)) {
          _iterationsSoFar = _safeIterations;
          payloadD = payloadD.root(Decimal__default["default"].pow(2, _safeIterations)).mul(Decimal__default["default"].pow(A, Decimal__default["default"].dOne.sub(Decimal__default["default"].pow(2, _safeIterations.neg()))));
        }
        while (iterationsD.gt(_iterationsSoFar)) {
          payloadD = polygonRoot(payloadD, sidesD);
          _iterationsSoFar = _iterationsSoFar.plus(1);
          if (payloadD.eq(1)) return new Decimal__default["default"](1);
        }
        if (_iterationsSoFar.sub(iterationsD).neq(0)) {
          payloadD = biPolygon(_iterationsSoFar.sub(iterationsD), sidesD, payloadD);
        }
        var _lower2 = payloadD.recip().div(2).slog(10, 100, true);
        var _upper2 = Decimal__default["default"].dZero;
        var _has_changed_directions_once = false;
        while (_lower2.neq_tolerance(_upper2, 1e-15)) {
          var _payloadSlog = _lower2.plus(_upper2).div(2);
          payloadD = Decimal__default["default"].tetrate(10, _payloadSlog.toNumber(), 1, true).recip();
          var _bp = biPolygon(iterationsD, sidesD, payloadD);
          if (_bp.eq(originalPayload)) return payloadD;else if (_bp.lt(originalPayload)) {
            _lower2 = _payloadSlog;
            _has_changed_directions_once = true;
          } else {
            if (_has_changed_directions_once) _upper2 = _payloadSlog;else _lower2 = _lower2.mul(2);
          }
        }
        return payloadD;
      } else {
        // Chaotic behavior, so only a whole iterations loop is provided
        if (iterationsD.mod(1).neq(0)) return new Decimal__default["default"](NaN);
        var _iterationsSoFar2 = Decimal__default["default"].dZero;
        while (_iterationsSoFar2.lt(iterationsD)) {
          _iterationsSoFar2 = _iterationsSoFar2.plus(1);
          payloadD = polygonRoot(payloadD, sidesD);
          if (payloadD.eq(0)) return new Decimal__default["default"](0);
        }
        return payloadD;
      }
    }
  }
  /**
   * Inverse function of biPolygon: for biPolygon(n, s, p) = x, this function finds n given x, s, and p.
   * Grows double-logarithmically.
   * @param value ( Decimal ! ) The x in the above example.
   * @param sides ( Decimal ! ) The s in the above example.
   * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
   */
  function biPolygonRoot(value, sides) {
    var zeroValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var valueD = toDecimal(value);
    var sidesD = toDecimal(sides);
    var zeroValueD = toDecimal(zeroValue);
    if (sidesD.eq(2)) return new Decimal__default["default"](NaN);
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (zeroValueD.eq(1)) return new Decimal__default["default"](NaN);
    if (valueD.eq(1)) return new Decimal__default["default"](-Infinity);
    if (valueD.lt(1)) return new Decimal__default["default"](NaN);
    // Same process to find constants is done here as in biPolygon, as we'll just invert the approximation formula if value is large enough
    var iterationArray = [zeroValueD];
    while (iterationArray[iterationArray.length - 1].plus(Decimal__default["default"].sub(4, sides).max(1)).neq(iterationArray[iterationArray.length - 1])) iterationArray.push(polygon(iterationArray[iterationArray.length - 1], sidesD));
    var finalIteration = polygon(iterationArray[iterationArray.length - 1], sidesD);
    var A = sidesD.sub(2).div(2).recip();
    var C = sidesD.sub(4).div(sidesD.sub(2).mul(2));
    var B = finalIteration.sub(C).div(A).root(Decimal__default["default"].pow(2, iterationArray.length));
    if (valueD.eq(zeroValueD)) return Decimal__default["default"].dZero;else if (valueD.gte(finalIteration)) return valueD.sub(C).div(A).log(B).log(2);else if (valueD.gt(zeroValueD)) {
      var guess = Decimal__default["default"].dZero;
      var lower = Decimal__default["default"].dZero;
      var upper = new Decimal__default["default"](iterationArray.length);
      var has_changed_directions_once = false;
      while (lower.neq_tolerance(upper, 1e-15)) {
        guess = lower.plus(upper).div(2);
        var bp = biPolygon(guess, sidesD, zeroValueD);
        if (bp.eq(valueD)) return guess;else if (bp.lt(valueD)) {
          if (has_changed_directions_once) lower = guess;else upper = upper.mul(2);
        } else {
          upper = guess;
          has_changed_directions_once = true;
        }
      }
      return guess;
    } else {
      var _guess2 = new Decimal__default["default"](0);
      var _lower3 = Decimal__default["default"].dNegOne;
      var _upper3 = Decimal__default["default"].dZero;
      var _has_changed_directions_once2 = false;
      while (_lower3.neq_tolerance(_upper3, 1e-15)) {
        _guess2 = _lower3.plus(_upper3).div(2);
        var _bp2 = biPolygon(_guess2, sidesD, zeroValueD);
        if (_bp2.eq(valueD)) return _guess2;else if (_bp2.lt(valueD)) {
          _lower3 = _guess2;
          _has_changed_directions_once2 = true;
        } else {
          if (_has_changed_directions_once2) _upper3 = _guess2;else _lower3 = _lower3.mul(2);
        }
      }
      return _guess2;
    }
  }
  /**
   * Iterated biPolygon: this function returns the result of applying biPolygon(x, s, p) to 'base' (with the result placed in the x of the next application) 'value' times.
   * Grows tetrationally (increasing value by 1 increases the super-logarithm by around 2). Uses a "linear" approximation for fractional values; I'll admit the approximation used is pretty arbitrary, because I didn't have any better ideas.
   * @param value ( number ! ) The amount of times the biPolygon function is applied.
   * @param sides ( Decimal ! ) The amount of sides on the polygon.
   * @param base ( Decimal ) The payload used in each application of biPolygon. Default is 2.
   * @param payload ( Decimal ) The value that biPolygon is repeatedly applied to. Default is 2.
   */
  function triPolygon(value, sides) {
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var sidesD = toDecimal(sides);
    var baseD = toDecimal(base);
    var payloadD = toDecimal(payload);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (value < 0) return iteratedBiPolygonRoot(payloadD, -value, sides, base);
    var fracValue = value % 1;
    var wholeValue = value - fracValue;
    // This is probably a really bad linear approximation, but oh well.
    var floorPayload = payloadD.slog(10, 100, true).toNumber();
    var ceilingPayload = biPolygon(payloadD, sidesD, baseD).slog(10, 100, true).toNumber();
    payloadD = Decimal__default["default"].tetrate(10, ceilingPayload * fracValue + floorPayload * (1 - fracValue), 1, true);
    var iterations = 0;
    while (iterations < wholeValue) {
      iterations++;
      payloadD = biPolygon(payloadD, sidesD, baseD);
      if (payloadD.gt(Decimal__default["default"].pow10(Number.MAX_SAFE_INTEGER))) {
        payloadD = Decimal__default["default"].iteratedexp(10, (wholeValue - iterations) * 2, payloadD, true);
        break;
      }
    }
    return payloadD;
  }
  /**
   * Performs biPolygonRoot on 'payload', 'iterations' times. Equivalent to triPolygon with a negative value.
   * @param payload ( Decimal ! ) The number that's having the bipolygonal root repeatedly taken on.
   * @param iterations ( number ! ) The amount of times the bipolygonal root is taken.
   * @param sides ( Decimal ) The amount of sides on the polygon.
   * @param zeroValue ( Decimal ) The value that returns 0 for its root. Default is 2.
   */
  function iteratedBiPolygonRoot(payload, iterations, sides) {
    var zeroValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var payloadD = toDecimal(payload);
    var originalPayload = payloadD;
    var sidesD = toDecimal(sides);
    var zeroValueD = toDecimal(zeroValue);
    if (sidesD.eq(2)) return payloadD;
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    if (payloadD.lt(1)) return new Decimal__default["default"](NaN);
    var iterationsSoFar = 0;
    var safeIterations = Decimal__default["default"].dZero;
    if (payloadD.gt(Decimal__default["default"].iteratedexp(10, 3, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)))) safeIterations = payloadD.slog(10, 100, true).sub(Decimal__default["default"].slog(Decimal__default["default"].iteratedexp(10, 3, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)), 10, true)).div(2).plus(1).floor();
    if (safeIterations.gt(0)) {
      payloadD = payloadD.iteratedlog(10, safeIterations.mul(2).toNumber(), true);
      iterationsSoFar = iterationsSoFar + safeIterations.toNumber();
    }
    while (iterations > iterationsSoFar) {
      if (payloadD.lt(1)) return new Decimal__default["default"](NaN);
      payloadD = biPolygonRoot(payloadD, sidesD, zeroValueD);
      iterationsSoFar += 1;
    }
    if (!payloadD.isFinite()) return new Decimal__default["default"](NaN);
    if (iterationsSoFar - iterations != 0) {
      payloadD = triPolygon(iterationsSoFar - iterations, sidesD, zeroValueD, payloadD);
    }
    var lower = Decimal__default["default"].dNegOne;
    var upper = payloadD.slog(10, 100, true).mul(2).max(5);
    var has_changed_directions_once = false;
    while (lower.neq_tolerance(upper, 1e-15)) {
      var guess = lower.plus(upper).div(2);
      payloadD = Decimal__default["default"].tetrate(10, guess.toNumber(), 1, true);
      var tp = triPolygon(iterations, sidesD, zeroValueD, payloadD);
      if (tp.eq(originalPayload)) return payloadD;else if (tp.lt(originalPayload)) {
        if (has_changed_directions_once) lower = guess;else upper = upper.mul(2);
      } else {
        upper = guess;
        has_changed_directions_once = true;
      }
    }
    return payloadD;
  }
  /**
   * Inverse function of triPolygon: for triPolygon(n, s, b, p) = x, this function finds n given x, s, b, and p.
   * Grows super-logarithmically.
   * @param value ( Decimal ! ) The x in the above example.
   * @param sides ( Decimal ! ) The s in the above example.
   * @param base ( Decimal ) The b in the above example. Default is 2.
   * @param zeroValue ( Decimal ) The value that returns 0 for its root, a.k.a. the p in the above example. Default is 2.
   */
  function triPolygonRoot(value, sides) {
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var zeroValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
    var valueD = toDecimal(value);
    var originalValue = valueD;
    var sidesD = toDecimal(sides);
    var baseD = toDecimal(base);
    var zeroValueD = toDecimal(zeroValue);
    if (sidesD.eq(2)) return new Decimal__default["default"](NaN);
    if (sidesD.lt(2)) throw new RangeError("Repeated polygonal functions do not currently support sides < 2");
    var result = 0;
    var safeIterations = Decimal__default["default"].dZero;
    if (valueD.gt(Decimal__default["default"].iteratedexp(10, 3, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)))) safeIterations = valueD.slog(10, 100, true).sub(Decimal__default["default"].slog(Decimal__default["default"].iteratedexp(10, 3, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)), 10, true)).div(2).plus(1).floor();
    if (safeIterations.gt(0)) {
      valueD = valueD.iteratedlog(10, safeIterations.mul(2).toNumber(), true);
      result += safeIterations.toNumber();
    }
    if (result > 4.5e15) return new Decimal__default["default"](result);
    while (valueD.gt(zeroValueD)) {
      result++;
      var newvalueD = biPolygonRoot(valueD, sidesD, baseD);
      if (newvalueD.gt(valueD)) return new Decimal__default["default"](NaN); // I haven't analyzed biPolygon enough to handle this
      valueD = newvalueD;
    }
    var lower = 0;
    var upper = result * 2;
    var has_changed_directions_once = false;
    while (Math.abs(lower - upper) / Math.max(lower, upper) > 1e-15) {
      result = (lower + upper) / 2;
      var tp = triPolygon(result, sidesD, baseD, zeroValueD);
      if (tp.eq(originalValue)) return new Decimal__default["default"](result);else if (tp.lt(originalValue)) {
        if (has_changed_directions_once) lower = result;else upper = upper * 2;
      } else {
        upper = result;
        has_changed_directions_once = true;
      }
    }
    return new Decimal__default["default"](result);
  }

  var Notation = /*#__PURE__*/function () {
    function Notation() {
      _classCallCheck(this, Notation);
      //Parameter stuff
      this.negativeString = ["-", ""];
      this.infinityString = "Infinite";
      this.negativeInfinityString = null;
      this.NaNString = "???";
      this.isInfinite = function (decimal) {
        return decimal.abs().gte(Decimal__default["default"].dInf);
      };
      this.name = "";
    }
    //Notation stuff
    return _createClass(Notation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatNegativeDecimal",
      value: function formatNegativeDecimal(value) {
        return this.negativeString[0] + this.formatDecimal(value) + this.negativeString[1];
      }
    }, {
      key: "infinite",
      get: function get() {
        return this.infinityString;
      }
    }, {
      key: "negativeInfinite",
      get: function get() {
        if (this.negativeInfinityString === null) return this.negativeString[0] + this.infinityString + this.negativeString[1];else return this.negativeInfinityString;
      }
      /**
       * Sets the five parameters that all notations have, then returns back the notation it was given but with those changes made. Parameters left undefined here are not changed.
       * @param negativeString A [string, string] or undefined. If this is a pair of strings, negative numbers have negativeString[0] placed in front of them and negativeString[1] placed after them (default is ["-", ""]). The negative string is unaltered if this is undefined.
       * @param infinityString A string or undefined. If this is a string, this becomes what the notation returns for positive infinities ("Infinite" by default). The infinity string is unaltered if this is undefined.
       * @param negativeInfinityString A string, null, or undefined. If this is a string, this becomes what the notation returns for negative infinities. If this is null, then negative infinities use negativeString and infinityString concatenated (this is the default behavior). The negative infinity string is unaltered if this is undefined.
       * @param NaNString A string or undefined. If this is a string, this becomes what the notation returns for NaN ("???" by default). The NaN string is unaltered if this is undefined.
       * @param isInfinite A Decimal => boolean function, or undefined. If this is a function, then that function is what tests if a number is considered infinite (the default is decimal.abs().gte(Decimal.dInf), which means "only return true if the Decimal is actually infinite", but by changing this function, this can be changed to, say, mark anything above 2^1024 as infinite). The infinite-checking function is unaltered if this is undefined.
       */
    }, {
      key: "setNotationGlobals",
      value: function setNotationGlobals(negativeString, infinityString, negativeInfinityString, NaNString, isInfinite) {
        if (negativeString !== undefined) this.negativeString = negativeString;
        if (infinityString !== undefined) this.infinityString = infinityString;
        if (negativeInfinityString !== undefined) this.negativeInfinityString = negativeInfinityString;
        if (NaNString !== undefined) this.NaNString = NaNString;
        if (isInfinite !== undefined) this.isInfinite = isInfinite;
        return this;
      }
      /**
       * Changes the name of the Notation, then gives you back the Notation. (i.e. returns this)
       */
    }, {
      key: "setName",
      value: function setName(name) {
        this.name = name;
        return this;
      }
    }]);
  }();

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
  var DefaultNotation = /*#__PURE__*/function (_Notation) {
    function DefaultNotation() {
      var _this;
      var placesAbove1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -4;
      var placesBelow1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -4;
      var commasMin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var maxnum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1e12;
      var minnum = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1e-6;
      var max_es_in_a_row = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 5;
      var decimalChar = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ".";
      var commaChar = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : ",";
      _classCallCheck(this, DefaultNotation);
      _this = _callSuper(this, DefaultNotation);
      _this.placesAbove1 = -4;
      _this.placesBelow1 = -4;
      _this.commasMin = Decimal__default["default"].dZero;
      _this.maxnum = new Decimal__default["default"](1e12);
      _this.minnum = new Decimal__default["default"](1e-6);
      _this.max_es_in_a_row = 5;
      _this.decimalChar = ".";
      _this.commaChar = ",";
      _this.name = "Default Notation";
      _this.placesAbove1 = placesAbove1;
      _this.placesBelow1 = placesBelow1;
      _this.commasMin = toDecimal(commasMin);
      _this.maxnum = toDecimal(maxnum);
      _this.minnum = toDecimal(minnum);
      _this.max_es_in_a_row = max_es_in_a_row;
      _this.decimalChar = decimalChar;
      _this.commaChar = commaChar;
      return _this;
    }
    _inherits(DefaultNotation, _Notation);
    return _createClass(DefaultNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return "0";
        if (value.gte(this.minnum) && value.lt(this.maxnum)) return commasAndDecimals(value.toNumber(), this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar);
        var result = "";
        var negExp = false;
        var places = value.gte(1) ? this.placesAbove1 : this.placesBelow1;
        if (places < 0) {
          places = -places - 1; //mantissa is always between 1 and 10 and exponent is always whole, so the significant figures calculation is simplified
        }
        if (value.lt(1)) {
          negExp = true;
          var _scientifify = scientifify(value, 10, Math.pow(10, -places)),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            m = _scientifify2[0],
            e = _scientifify2[1];
          value = e.neg().pow10().mul(m);
        }
        if (value.lt(Decimal__default["default"].pow10(this.maxnum))) {
          var _scientifify3 = scientifify(value, 10, Math.pow(10, -places)),
            _scientifify4 = _slicedToArray(_scientifify3, 2),
            _m = _scientifify4[0],
            _e = _scientifify4[1];
          var mantissa = _m.toNumber();
          var exponent = _e.toNumber();
          if (negExp) exponent *= -1;
          result = commasAndDecimals(mantissa, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar) + "e" + commasAndDecimals(exponent, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar);
        } else if (value.lt(Decimal__default["default"].iteratedexp(10, this.max_es_in_a_row + 1, this.maxnum, true))) {
          while (value.gte(Decimal__default["default"].pow10(this.maxnum))) {
            result += "e";
            value = value.log10();
          }
          if (negExp) value = value.neg();
          result += this.format(value);
        } else if (value.lt(Decimal__default["default"].tetrate(10, this.maxnum.toNumber(), 1, true))) {
          var _hyperscientifify = hyperscientifify(value, 10, Math.pow(10, -places)),
            _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
            _m2 = _hyperscientifify2[0],
            _e2 = _hyperscientifify2[1];
          var _mantissa = _m2.toNumber();
          var _exponent = _e2.toNumber();
          if (negExp) _exponent *= -1;
          result = commasAndDecimals(_mantissa, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar) + "F" + commasAndDecimals(_exponent, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.decimalChar, this.commaChar);
        } else {
          var _exponent2 = value.slog(10, 100, true);
          if (negExp) _exponent2 = _exponent2.neg();
          result = "F" + this.format(_exponent2);
        }
        return result;
      }
    }]);
  }(Notation);

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
  function BaseConvert(value, base) {
    var placesAbove1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -4;
    var placesBelow1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -4;
    var negaDigits = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var commasMin = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var showZeroes = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : -1;
    var reverseDigits = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var commaSpacing = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 3;
    var commaChars = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [","];
    var decimalChar = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : ".";
    var negativeChar = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "-";
    var precision = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : typeof base == "number" ? Math.floor(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(base) + 1) : Math.floor(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(base.length) + 1);
    var specialDigits = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : [];
    var concatenation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : null;
    if (typeof base == "number") {
      if (base < 0) throw new RangeError("Negative bases are not implemented");
      if (base == 0) throw new RangeError("There is no such thing as base 0");
      if (base % 1 != 0) throw new RangeError("Fractional bases are not supported");
      if (base > 64 || base == 64 && negaDigits == -1) throw new RangeError("There are only 64 default base digits; if you want to use a base above 64, provide your own character array.");
      if (negaDigits == -1) base = defaultBaseChars.slice(1, base + 1);else if (negaDigits == 0) base = defaultBaseChars.slice(0, base);else throw new RangeError("You have to specify your own characters for bases with negative digits.");
    }
    var originalValue = value;
    var baseNum = base.length;
    if (baseNum == 0) throw new RangeError("There is no such thing as base 0");
    if (negaDigits < -1 || negaDigits > baseNum || negaDigits % 1 != 0) throw new RangeError("Invalid negaDigits value in base conversion");
    if ((placesAbove1 > 0 || placesBelow1 > 0) && (negaDigits == -1 || negaDigits == baseNum)) throw new Error("Bijective bases do not support non-whole numbers");
    if ((placesAbove1 > 0 || placesBelow1 > 0) && baseNum == 1) throw new Error("Unary does not support non-whole numbers");
    if (baseNum == 1) return base[0].repeat(value);
    if (Math.abs(value) < 1 && (negaDigits == -1 || negaDigits == baseNum)) return "";
    if (value == 0) {
      var _result = base[negaDigits];
      if (showZeroes > 0 && placesAbove1 > 0) {
        if (reverseDigits) _result = decimalChar + _result;else _result += decimalChar;
        for (var p = 0; p < placesAbove1; p++) {
          if (reverseDigits) _result = base[negaDigits] + _result;else _result += base[negaDigits];
        }
      }
      return _result;
    }
    if (negaDigits > baseNum - 2) {
      return BaseConvert(-value, base, placesAbove1, placesBelow1, baseNum - negaDigits - 1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
    }
    var negative = false;
    if (value < 0 && negaDigits < 1) {
      negative = true;
      value *= -1;
    }
    var precisionSoFar = 0;
    var digits = [];
    var digitPosition = Math.floor(Math.log(Math.abs(value)) / Math.log(baseNum));
    var startDigitPosition = digitPosition;
    var places = Math.abs(value) < 1 ? placesBelow1 : placesAbove1;
    if (digitPosition < 0) {
      value *= Math.pow(baseNum, -digitPosition);
      if (places > 0) {
        places = places + digitPosition;
        if (places < 0) return BaseConvert(0, base, placesAbove1, placesBelow1, negaDigits, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
      }
      digitPosition = 0;
    }
    var sigFigs = false;
    if (places < 0) {
      sigFigs = true;
      if (startDigitPosition < 0) places = -places - 1;else places = Math.max(-places - startDigitPosition - 1, 0);
    }
    while (Math.abs(value) >= Math.pow(baseNum, -places) && digitPosition >= -places && precisionSoFar < precision) {
      if (digitPosition == -places) digits.push(Math.round(value / Math.pow(baseNum, digitPosition)));else digits.push(Math.floor(value / Math.pow(baseNum, digitPosition)));
      value -= digits[digits.length - 1] * Math.pow(baseNum, digitPosition);
      if (digits[digits.length - 1] < -negaDigits || digits[digits.length - 1] >= baseNum - negaDigits) {
        var analyzed = digits.length - 1;
        while (digits[analyzed] < -negaDigits || digits[analyzed] >= baseNum - negaDigits) {
          if (analyzed == 0 && digits[analyzed] == 0) {
            //We can only get here in a bijective base
            digits.shift();
            startDigitPosition--;
            break;
          }
          var extracted = Math.floor((digits[analyzed] + negaDigits) / baseNum);
          digits[analyzed] -= extracted * baseNum;
          if (analyzed == 0) {
            digits.unshift(extracted);
            if (startDigitPosition < 0) {
              value /= baseNum;
              digitPosition--;
            } else if (sigFigs && places > 0) places--;
            startDigitPosition++;
            precisionSoFar++;
          } else {
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
      var _analyzed = digits.length - 1;
      digits[_analyzed] -= 1;
      while (digits[_analyzed] == 0) {
        digits[_analyzed] = baseNum;
        _analyzed--;
        if (_analyzed == -1) {
          digits.shift();
          startDigitPosition--;
          break;
        } else digits[_analyzed] -= 1;
      }
    }
    while (digits[0] == 0) {
      digits.shift();
      startDigitPosition--;
    }
    if (showZeroes == Number.NEGATIVE_INFINITY) {
      while (digits[digits.length - 1] == 0) digits.pop();
    } else while (digitPosition >= 0 || digitPosition >= -places && showZeroes >= 0) {
      if (negaDigits == -1) {
        if (digitPosition == 0) digits.push(baseNum);else digits.push(baseNum - 1);
      } else digits.push(0);
      digitPosition--;
    }
    digitPosition = startDigitPosition;
    var digitChars = [];
    var result = "";
    while (digitPosition >= 0) {
      var digitLocation = base;
      for (var d = 0; d < specialDigits.length; d++) {
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
      for (var c = 1; c < digitChars.length; c++) {
        if (digitChars[c][0] == digitChars[c - 1][0]) {
          digitChars[c - 1][1]++;
          digitChars.splice(c, 1);
          c--;
        }
      }
    }
    while (digitChars.length > 0) {
      var digitStr = digitChars[0][0];
      if (concatenation !== null && digitChars[0][1] > 1) {
        digitStr = "";
        if (concatenation[3] === undefined) digitStr = BaseConvert(digitChars[0][1], base, placesAbove1, placesBelow1, negaDigits, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);else digitStr = concatenation[3].format(digitChars[0][1]);
        digitStr = concatenation[1] + digitStr + concatenation[2];
        if (concatenation[0]) digitStr = digitChars[0][0] + digitStr;else digitStr += digitChars[0][0];
      }
      if (reverseDigits) result = digitStr + result;else result += digitStr;
      digitChars.shift();
      if (commasMin >= 0 && Math.abs(originalValue) >= commasMin && digitChars.length % commaSpacing == 0 && digitChars.length != 0) {
        if (reverseDigits) result = commaChars[(digitChars.length / commaSpacing - 1) % commaChars.length] + result;else result += commaChars[(digitChars.length / commaSpacing - 1) % commaChars.length];
      }
    }
    if (showZeroes <= 0 && onlyAllowedCharacters(digits.join(""), ["0"])) digits = [];
    if (digits.length > 0) {
      while (digits[digits.length - 1] === 0 && showZeroes < 0) digits.pop();
    }
    if (digits.length > 0) {
      var _digitLocation = base;
      for (var _d = 0; _d < specialDigits.length; _d++) {
        if (specialDigits[_d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[_d][1].length > digits[0] + negaDigits) {
          _digitLocation = specialDigits[_d][1];
          break;
        }
      }
      digitChars.push([_digitLocation[negaDigits], 1]);
      if (startDigitPosition < 0) {
        for (var i = 1; i < -startDigitPosition; i++) {
          digitPosition--;
          _digitLocation = base;
          for (var _d2 = 0; _d2 < specialDigits.length; _d2++) {
            if (specialDigits[_d2][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[_d2][1].length > digits[0] + negaDigits) {
              _digitLocation = specialDigits[_d2][1];
              break;
            }
          }
          digitChars.push([_digitLocation[negaDigits], 1]);
        }
      }
      while (digits.length > 0) {
        digitPosition--;
        _digitLocation = base;
        for (var _d3 = 0; _d3 < specialDigits.length; _d3++) {
          if (specialDigits[_d3][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[_d3][1].length > digits[0] + negaDigits) {
            _digitLocation = specialDigits[_d3][1];
            break;
          }
        }
        digitChars.push([_digitLocation[digits[0] + negaDigits], 1]);
        digits.shift();
      }
      if (result == "") result = digitChars[0][0];
      digitChars.shift();
      if (reverseDigits) result = decimalChar + result;else result += decimalChar;
      if (concatenation !== null) {
        for (var _c = 1; _c < digitChars.length; _c++) {
          if (digitChars[_c][0] == digitChars[_c - 1][0]) {
            digitChars[_c - 1][1]++;
            digitChars.splice(_c, 1);
            _c--;
          }
        }
      }
      while (digitChars.length > 0) {
        var _digitStr = digitChars[0][0];
        if (concatenation !== null && digitChars[0][1] > 1) {
          _digitStr = "";
          if (concatenation[3] === undefined) _digitStr = BaseConvert(digitChars[0][1], base, placesAbove1, placesBelow1, negaDigits, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);else _digitStr = concatenation[3].format(digitChars[0][1]);
          _digitStr = concatenation[1] + _digitStr + concatenation[2];
          if (concatenation[0]) _digitStr = digitChars[0][0] + _digitStr;else _digitStr += digitChars[0][0];
        }
        if (reverseDigits) result = _digitStr + result;else result += _digitStr;
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
  var AlternateBaseNotation = /*#__PURE__*/function (_Notation) {
    function AlternateBaseNotation(base) {
      var _this;
      var negaDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var placesAbove1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -4;
      var placesBelow1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -4;
      var commasMin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var maxnum = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : typeof base == "number" ? Decimal__default["default"].pow(base, 12) : Decimal__default["default"].pow(base.length, 12);
      var minnum = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : typeof base == "number" ? Decimal__default["default"].pow(base, -6) : Decimal__default["default"].pow(base.length, -6);
      var max_exps_in_a_row = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 5;
      var mantissaPower = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      var hypermantissaPower = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
      var showZeroes = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : -1;
      var reverseDigits = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;
      var commaSpacing = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 3;
      var commaChars = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : [","];
      var decimalChar = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : ".";
      var expChars = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : [["$", ""], ["$", ""], ["#", ""], ["#", ""]];
      var negExpChars = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : null;
      var expBefore = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : false;
      var hyperexpBefore = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : false;
      var precision = arguments.length > 19 && arguments[19] !== undefined ? arguments[19] : typeof base == "number" ? Math.floor(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(base) + 1) : Math.floor(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(base.length) + 1);
      var specialDigits = arguments.length > 20 && arguments[20] !== undefined ? arguments[20] : [];
      var concatenation = arguments.length > 21 && arguments[21] !== undefined ? arguments[21] : null;
      _classCallCheck(this, AlternateBaseNotation);
      _this = _callSuper(this, AlternateBaseNotation);
      _this.negaDigits = 0;
      _this.placesAbove1 = -4;
      _this.placesBelow1 = -4;
      _this.commasMin = Decimal__default["default"].dZero;
      _this.max_exps_in_a_row = 5;
      _this.mantissaPower = Decimal__default["default"].dZero;
      _this.hypermantissaPower = Decimal__default["default"].dZero;
      _this.showZeroes = -1;
      _this.reverseDigits = false;
      _this.commaSpacing = 3;
      _this.commaChars = [","];
      _this.decimalChar = ".";
      _this._expChars = [["$", ""], ["$", ""], ["#", ""], ["#", ""]];
      _this.negExpChars = null;
      _this.expBefore = false;
      _this.hyperexpBefore = false;
      _this.specialDigits = [];
      _this.concatenation = null;
      _this.name = "Alternate Base Notation";
      _this.negaDigits = negaDigits;
      _this.base = base;
      _this.placesAbove1 = placesAbove1;
      _this.placesBelow1 = placesBelow1;
      _this.commasMin = toDecimal(commasMin);
      _this.maxnum = toDecimal(maxnum);
      _this.minnum = toDecimal(minnum);
      _this.max_exps_in_a_row = max_exps_in_a_row;
      _this.mantissaPower = toDecimal(mantissaPower);
      _this.hypermantissaPower = toDecimal(hypermantissaPower);
      _this.showZeroes = showZeroes;
      _this.reverseDigits = reverseDigits;
      _this.commaSpacing = commaSpacing;
      _this.commaChars = commaChars;
      _this.decimalChar = decimalChar;
      _this.unconvertedExpChars = expChars;
      _this.expBefore = expBefore;
      _this.hyperexpBefore = hyperexpBefore;
      _this.precision = precision;
      _this.specialDigits = specialDigits;
      _this.concatenation = concatenation;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(AlternateBaseNotation, _Notation);
    return _createClass(AlternateBaseNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.abs().gte(this.minnum) && value.abs().lt(this.maxnum) || value.eq(0)) return BaseConvert(value.toNumber(), this._base, this.placesAbove1, this.placesBelow1, this.negaDigits, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
        var result = "";
        var negExp = false;
        var baseNum = this._base.length;
        var places = value.gte(1) ? this.placesAbove1 : this.placesBelow1;
        if (this.negaDigits > baseNum || this.negaDigits < -1 || this.negaDigits % 1 != 0) throw new RangeError("negaDigits out of range in Alternate Base Notation");
        if (this.negaDigits > baseNum - 2) {
          var baseCopy = new AlternateBaseNotation(this._base, baseNum - this.negaDigits - 1, this.placesAbove1, this.placesBelow1, this.commasMin, this.maxnum, this.minnum, this.max_exps_in_a_row, this.mantissaPower, this.hypermantissaPower, this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.unconvertedExpChars, this.negExpChars, this.expBefore, this.hyperexpBefore, this.precision, this.specialDigits, this.concatenation);
          return baseCopy.format(value.neg());
        }
        var sigFigPlaces = places;
        if (places < 0) sigFigPlaces = -places - 1;
        var mantissaLimit = 0;
        for (var i = -this.mantissaPower; i <= sigFigPlaces; i++) {
          mantissaLimit += (baseNum - this.negaDigits - 1) / Math.pow(baseNum, i);
        }
        mantissaLimit += 1 / Math.pow(baseNum, sigFigPlaces);
        var hypermantissaLimit = 0;
        for (var _i = 0; _i <= sigFigPlaces; _i++) {
          hypermantissaLimit += (baseNum - this.negaDigits - 1) / Math.pow(baseNum, _i);
        }
        hypermantissaLimit += 1 / Math.pow(baseNum, sigFigPlaces);
        hypermantissaLimit = Decimal__default["default"].iteratedexp(baseNum, this.hypermantissaPower.toNumber(), new Decimal__default["default"](mantissaLimit), true);
        if (value.abs().lt(1)) {
          if (this.negExpChars != null && (this.negExpChars[0] == true || multabs(value.abs()).gte(Decimal__default["default"].pow(baseNum, this.maxnum)))) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          negExp = true;
          var _scientifify = scientifify(value, baseNum, 0, this.mantissaPower),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            m = _scientifify2[0],
            e = _scientifify2[1];
          value = Decimal__default["default"].pow(baseNum, e.neg()).mul(m);
        }
        if (value.abs().lt(Decimal__default["default"].pow(baseNum, this.maxnum))) {
          var _scientifify3 = scientifify(value, baseNum, 0, this.mantissaPower),
            _scientifify4 = _slicedToArray(_scientifify3, 2),
            _m = _scientifify4[0],
            _e = _scientifify4[1];
          var mantissa = _m.toNumber();
          var exponent = _e.toNumber();
          var unroundedmantissa = mantissa;
          mantissa = Math.round(unroundedmantissa * Math.pow(baseNum, sigFigPlaces)) / Math.pow(baseNum, sigFigPlaces);
          while (Math.abs(mantissa) >= mantissaLimit) {
            unroundedmantissa /= baseNum;
            mantissa = Math.round(unroundedmantissa * Math.pow(baseNum, sigFigPlaces)) / Math.pow(baseNum, sigFigPlaces);
            exponent += 1;
          }
          while (Math.abs(mantissa) < mantissaLimit / baseNum) {
            unroundedmantissa *= baseNum;
            mantissa = Math.round(unroundedmantissa * Math.pow(baseNum, sigFigPlaces)) / Math.pow(baseNum, sigFigPlaces);
            exponent -= 1;
          }
          if (negExp) exponent *= -1;
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (exponent < 0 && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent *= -1;
          }
          var baseStr = BaseConvert(mantissa, this._base, this.placesAbove1, this.placesBelow1, this.negaDigits, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
          var exponentStr = BaseConvert(exponent, this._base, this.placesAbove1, this.placesBelow1, this.negaDigits, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + baseStr;else result = baseStr + beforeChar + exponentStr + afterChar;
        } else {
          var negative = false;
          if (value.lt(0)) {
            negative = true;
            value = value.neg();
          }
          if (value.lt(Decimal__default["default"].iteratedexp(baseNum, this.max_exps_in_a_row + 1, this.maxnum, true))) {
            var added_es = 0;
            while (value.gte(Decimal__default["default"].pow(baseNum, this.maxnum))) {
              added_es++;
              value = value.log(baseNum).mul(value.sign);
            }
            if (negExp) value = value.neg();
            result = this.format(value);
            for (var _e2 = 0; _e2 < added_es; _e2++) result = this._expChars[1][0] + result + this._expChars[1][1];
          } else if (value.lt(Decimal__default["default"].tetrate(baseNum, this.maxnum.toNumber(), 1, true))) {
            var _hyperscientifify = hyperscientifify(value, baseNum, 0, this.hypermantissaPower),
              _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
              _mantissa = _hyperscientifify2[0],
              _exponent = _hyperscientifify2[1];
            var _unroundedmantissa = _mantissa;
            _mantissa = _unroundedmantissa.mul(Math.pow(baseNum, sigFigPlaces)).round().div(Math.pow(baseNum, sigFigPlaces));
            while (_mantissa.gt(hypermantissaLimit)) {
              _unroundedmantissa = _unroundedmantissa.log(baseNum);
              _mantissa = _unroundedmantissa.mul(Math.pow(baseNum, sigFigPlaces)).round().div(Math.pow(baseNum, sigFigPlaces));
              _exponent = _exponent.plus(1);
            }
            while (_mantissa.lte(hypermantissaLimit.log(baseNum))) {
              _unroundedmantissa = Decimal__default["default"].pow(baseNum, _unroundedmantissa);
              _mantissa = _unroundedmantissa.mul(Math.pow(baseNum, sigFigPlaces)).round().div(Math.pow(baseNum, sigFigPlaces));
              _exponent = _exponent.sub(1);
            }
            if (negExp) _exponent = _exponent.neg();
            var _baseStr = this.format(_mantissa);
            var _exponentStr = this.format(_exponent);
            if (this.hyperexpBefore) result = this._expChars[2][0] + _exponentStr + this._expChars[2][1] + _baseStr;else result = _baseStr + this._expChars[2][0] + _exponentStr + this._expChars[2][1];
          } else {
            var _exponent2 = value.slog(baseNum, 100, true);
            if (negExp) _exponent2 = _exponent2.neg();
            result = this._expChars[3][0] + this.format(_exponent2) + this._expChars[3][1];
          }
          if (negative) result = this.negativeString[0] + result + this.negativeString[1];
        }
        return result;
      }
      /**
       * Returns an array containing the digits of the base.
       */
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        if (typeof base == "number") {
          if (base < 0) throw new RangeError("Negative bases are not implemented");
          if (base == 0) throw new RangeError("There is no such thing as base 0");
          if (base == 1) throw new RangeError("Tally marks are not an abbreviation");
          if (base % 1 != 0) throw new RangeError("Fractional bases are not supported");
          if (base > 64 || base == 64 && this.negaDigits == -1) throw new RangeError("There are only 64 default base digits; if you want to use a base above 64, provide your own character array.");
          if (this.negaDigits == -1) base = defaultBaseChars.slice(1, base + 1);else if (this.negaDigits == 0) base = defaultBaseChars.slice(0, base);else throw new RangeError("You have to specify your own characters for bases with negative digits.");
        }
        this._base = base;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        expChars.push(["", ""]);
        if (typeof input[3][0] == "string") expChars[3][0] = input[3][0];else if (input[3][0] === false) expChars[3][0] = one + input[2][0];else if (input[3][0] === true) expChars[3][0] = input[2][0] + one;
        if (typeof input[3][1] == "string") expChars[3][1] = input[3][1];else if (input[3][1] === false) expChars[3][1] = one + input[2][1];else if (input[3][1] === true) expChars[3][1] = input[2][1] + one;
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * This notation, no matter what you put in, returns a particular string. Used for things like Blind notation.
   * @param str ( string ! ) The string that this notation returns.
   */
  var PredeterminedNotation = /*#__PURE__*/function (_Notation) {
    function PredeterminedNotation(str) {
      var _this;
      _classCallCheck(this, PredeterminedNotation);
      _this = _callSuper(this, PredeterminedNotation);
      _this.name = "Predetermined Notation";
      _this.str = str;
      return _this;
    }
    _inherits(PredeterminedNotation, _Notation);
    return _createClass(PredeterminedNotation, [{
      key: "format",
      value: function format(value) {
        return this.str;
      }
    }, {
      key: "formatNegativeDecimal",
      value: function formatNegativeDecimal(value) {
        return this.str;
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        return this.str;
      }
    }]);
  }(Notation);

  /**
   * Has an array of notations to choose from, selecting one of them to abbreviate the value based on certain conditions.
   *
   * @param specialIncluded ( boolean ! ) If this parameter is true, then special numbers (negatives, infinities, etc.) use the conditions to decide which notation to be abbreviated in as well. If this parameter is false, then negatives use negativeSign and their absolute value as usual, and infinities and NaNs still use their respective strings as usual.
   *
   * After that first argument, this notation can take as many arguments as you want to give it. The arguments are of type [Notation, Decimal -> boolean], i.e. pairs where the first entry of each pair is a Notation and the second is a predicate that takes a Decimal. To abbreviate a Decimal value, this notation starts at the beginning of the arguments, and for each argument it checks whether the value satisfies that argument's predicate; if so, that argument's notation is used to abbreviate the value, otherwise the checking moves on to the next argument. An error is thrown if the value doesn't satisfy any of the predicates.
   */
  var ConditionalNotation = /*#__PURE__*/function (_Notation) {
    function ConditionalNotation(specialIncluded) {
      var _this;
      _classCallCheck(this, ConditionalNotation);
      _this = _callSuper(this, ConditionalNotation);
      _this.name = "Conditional Notation";
      _this.specialIncluded = specialIncluded;
      for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        options[_key - 1] = arguments[_key];
      }
      _this.options = options;
      return _this;
    }
    _inherits(ConditionalNotation, _Notation);
    return _createClass(ConditionalNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (this.specialIncluded) {
          for (var n = 0; n < this.options.length; n++) {
            if (this.options[n][1](decimal)) return this.options[n][0].format(decimal);
          }
          throw new Error("No notation was chosen.");
        } else {
          if (decimal.isNan()) return this.NaNString;
          if (this.isInfinite(decimal)) {
            return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
          }
          if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
            return this.format(0);
          }
          return decimal.sgn() < 0 && !this.specialIncluded ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
        }
      }
    }, {
      key: "formatNegativeDecimal",
      value: function formatNegativeDecimal(value) {
        return this.negativeString[0] + this.formatDecimal(value) + this.negativeString[1];
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        for (var n = 0; n < this.options.length; n++) {
          if (this.options[n][1](value)) return this.options[n][0].format(value);
        }
        throw new Error("No notation was chosen.");
      }
    }]);
  }(Notation);

  /**
   * Applies a function to the value, puts a string before it and/or a string after it, then uses InnerNotation to abbreviate the new value.
   * @param DecimalFunc ( Decimal -> Decimal ) The Decimal -> Decimal function that this notation applies before using InnerNotation. Default is the identity function.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param StringFunc ( string -> string ) The string -> string function that this notation applies after using InnerNotation. Default is the identity function.
   * @param nonFiniteApplied ( boolean ) This is false by default; if this is true, then the functions here are applied even to infinities and NaN. If this is false, then the infinityString, negativeInfinityString, and NaNString of the inner notation, not this notation, are used.
   */
  var AppliedFunctionNotation = /*#__PURE__*/function (_Notation) {
    function AppliedFunctionNotation() {
      var _this;
      var DecimalFunc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (value) {
        return value;
      };
      var innerNotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new DefaultNotation();
      var StringFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (str) {
        return str;
      };
      var nonFiniteApplied = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      _classCallCheck(this, AppliedFunctionNotation);
      _this = _callSuper(this, AppliedFunctionNotation);
      _this.innerNotation = new DefaultNotation();
      _this.nonFiniteApplied = false;
      _this.name = "Applied Function Notation";
      _this.DecimalFunc = DecimalFunc;
      _this.innerNotation = innerNotation;
      _this.StringFunc = StringFunc;
      _this.nonFiniteApplied = nonFiniteApplied;
      return _this;
    }
    _inherits(AppliedFunctionNotation, _Notation);
    return _createClass(AppliedFunctionNotation, [{
      key: "format",
      value: function format(value) {
        value = toDecimal(value);
        if (!value.isFinite() && !this.nonFiniteApplied) return this.innerNotation.format(value);
        return this.StringFunc(this.innerNotation.format(this.DecimalFunc(value)));
      }
    }, {
      key: "formatNegativeDecimal",
      value: function formatNegativeDecimal(value) {
        return this.StringFunc(this.innerNotation.formatNegativeDecimal(this.DecimalFunc(value)));
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        return this.StringFunc(this.innerNotation.formatDecimal(this.DecimalFunc(value)));
      }
    }]);
  }(Notation);

  /**
   * Given an array of strings with values, takes a nonnegative Decimal value and converts it into an array that contains how many of each of those strings you'd need to add up to that value.
   * @param value The value to be converted.
   * @param numerals An array of pairs of strings and Decimals, sorted from highest to lowest Decimal. This function may not work if the numerals aren't sorted correctly.
   * @param rounding Rounds the value to the nearest multiple of this value. Default is the value of the lowest string.
   * @param roundType Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
   * @returns An array of pairs of strings and Decimals, where each Decimal is the amount of that corresponding string; if you multiply the value of each string by its corresponding Decimal in the returned array and sum those values, you get back the original value.
   */
  function SignValueArray(value, numerals) {
    var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : numerals[numerals.length - 1][1];
    var roundType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "round";
    if (numerals.length == 0) throw new Error("No numerals provided");
    value = toDecimal(value);
    rounding = toDecimal(rounding);
    if (value.lt(0)) throw new RangeError("Negative numbers are not supported by SignValueArray");
    if (value.eq(0)) return [];
    if (rounding.gt(0)) {
      if (roundType === "floor") value = value.div(rounding).floor().mul(rounding);else if (roundType === "round") value = value.div(rounding).round().mul(rounding);else if (roundType === "ceil" || roundType === "ceiling") value = value.div(rounding).ceil().mul(rounding);else if (roundType === "trunc") value = value.div(rounding).trunc().mul(rounding);
    }
    var result = [];
    numerals = numerals.sort(function (a, b) {
      return Decimal__default["default"].cmp(a[1], b[1]) * -1;
    });
    for (var analyzed = 0; analyzed < numerals.length; analyzed++) {
      var numeralVal = toDecimal(numerals[analyzed][1]);
      var coefficient = value.div(numeralVal).floor();
      while (coefficient.plus(1).mul(numeralVal).lte(value)) {
        //Combats imprecision
        coefficient = coefficient.plus(1);
      }
      value = value.sub(coefficient.mul(numeralVal));
      if (coefficient.gt(0)) result.push([numerals[analyzed][0], coefficient]);
    }
    return result;
  }
  /**
   * Same as SignValueArray, except each entry of the array contains three entries instead of two, with the third being the Decimal value of that entry's string.
   * @param value The value to be converted.
   * @param numerals An array of pairs of strings and Decimals, sorted from highest to lowest Decimal. This function may not work if the numerals aren't sorted correctly.
   * @param rounding Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
   * @param roundType Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
   * @returns An array of [string, Decimal, Decimal] triples, where each first Decimal is the amount of that corresponding string and each second Decimal is the value of that string; if you multiply the two Decimals in each entry in the returned array and sum those products, you get back the original value (minus any part smaller than the smallest numeral).
   */
  function DetailedSignValueArray(value, numerals) {
    var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var roundType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "round";
    if (numerals.length == 0) throw new Error("No numerals provided");
    value = toDecimal(value);
    rounding = toDecimal(rounding);
    if (value.lt(0)) throw new RangeError("Negative numbers are not supported by SignValueArray");
    if (value.eq(0)) return [];
    if (rounding.gt(0)) {
      if (roundType === "floor") value = value.div(rounding).floor().mul(rounding);else if (roundType === "round") value = value.div(rounding).round().mul(rounding);else if (roundType === "ceil" || roundType === "ceiling") value = value.div(rounding).ceil().mul(rounding);else if (roundType === "trunc") value = value.div(rounding).trunc().mul(rounding);
    }
    var result = [];
    numerals.sort(function (a, b) {
      return Decimal__default["default"].cmp(a[1], b[1]) * -1;
    });
    for (var analyzed = 0; analyzed < numerals.length; analyzed++) {
      var numeralVal = toDecimal(numerals[analyzed][1]);
      var coefficient = value.div(numeralVal).floor();
      value = value.sub(coefficient.mul(numeralVal));
      if (coefficient.gt(0)) result.push([numerals[analyzed][0], coefficient, numeralVal]);
    }
    return result;
  }
  /**
   * Given an array of sign-value numerals such as Roman numerals, converts the number into that sign-value system. For example, given the Roman numerals themselves, 325 becomes CCCXXV.
   * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
   * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
   * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
   * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
   * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
   * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
   * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like M(6). Default is ["(", ")"].
   * @param zero ( string ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
   * @param innerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
   */
  var SignValueNotation = /*#__PURE__*/function (_Notation) {
    function SignValueNotation(numerals) {
      var _this;
      var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var frontToBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var roundType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "round";
      var max_in_a_row = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
      var separator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
      var delimiters = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ["(", ")"];
      var zero = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
      var innerNotation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : new DefaultNotation();
      _classCallCheck(this, SignValueNotation);
      _this = _callSuper(this, SignValueNotation);
      _this.frontToBack = false;
      _this.roundType = "round";
      _this.max_in_a_row = 4;
      _this.separator = "";
      _this.delimiters = ["(", ")"];
      _this.zero = "";
      _this.innerNotation = new DefaultNotation();
      _this.name = "Sign-Value Notation";
      _this.numerals = numerals;
      _this.frontToBack = frontToBack;
      _this.rounding = toDecimal(rounding);
      _this.roundType = roundType;
      _this.max_in_a_row = max_in_a_row;
      _this.separator = separator;
      _this.delimiters = delimiters;
      _this.zero = zero;
      _this.innerNotation = innerNotation;
      return _this;
    }
    _inherits(SignValueNotation, _Notation);
    return _createClass(SignValueNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var arr = SignValueArray(value, this._numerals, this.rounding, this.roundType);
        if (arr.length == 0) return this.zero;
        var result = "";
        for (var s = 0; s < arr.length; s++) {
          var subresult = "";
          if (arr[s][1].lte(this.max_in_a_row)) for (var i = 0; i < arr[s][1].toNumber(); i++) {
            subresult += arr[s][0];
          } else subresult += arr[s][0] + this.delimiters[0] + this.innerNotation.format(arr[s][1]) + this.delimiters[1];
          if (this.frontToBack) {
            result = subresult + result;
            if (s < arr.length - 1) result = this.separator + result;
          } else {
            result += subresult;
            if (s < arr.length - 1) result += this.separator;
          }
        }
        return result;
      }
    }, {
      key: "numerals",
      get: function get() {
        return this._numerals;
      },
      set: function set(numerals) {
        if (numerals.length == 0) throw new Error("No numerals provided for signValue notation");
        this._numerals = numerals.map(function (entry) {
          return [entry[0], toDecimal(entry[1])];
        });
        this._numerals.sort(function (a, b) {
          return Decimal__default["default"].cmp(a[1], b[1]) * -1;
        });
      }
    }]);
  }(Notation);
  /**
   * A variant of SignValueNotation where the numbers in truncated expressions are themselves notated in this notation. Once the parentheses are deep enough, brackets are introduced to represent the number of parentheses layers, and later on braces are introduced to represent the number of bracket layers.
   * @param numerals ( [string, Decimal][] ! ) An array of pairs of strings and Decimals. Each pair consists of a numeral (the string) and the value of that numeral (the Decimal).
   * @param frontToBack ( boolean ) If this is false, numerals are ordered largest to smallest. If this is true, numerals are ordered smallest to largest. Default is false.
   * @param rounding ( Decimal ) Rounds the value to the nearest multiple of this value. Default is 0, which means no rounding occurs.
   * @param roundType ( string ) Chooses how to round the value: options are "floor", "round", "ceil"/"ceiling", and "trunc". Any other option will not round at all. Default is "round".
   * @param max_in_a_row ( number ) The maximum amount of one numeral in a row. Any more of one numeral in a row than this is truncated: for example, MMMMMM would become M(6). Default is 4.
   * @param max_nestingP ( number ) The maximum layers of nesting of parentheses - any more layers and brackets are introduced. Default is 3.
   * @param max_nestingB ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Is the same as maxNestingP by default.
   * @param mantissaPower ( Decimal ) Normally, once brackets are introduced, the number in parentheses is limited to between 1 and the value of the numeral that has the brackets on it, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower, the bounds are (value) and (value^2), and so on. For example, a number represented with Roman numerals as M[VI](I) with 0 mantissaPower becomes M[V](M) with 1 mantissaPower and M[IV](M(M)) with 2 mantissaPower.
   * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets and parentheses is limited to between (value of the numeral in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented with Roman numerals as M{V}(M) with 1 hypermantissaPower becomes M{VI}(I) with 0 hypermantissaPower and M{IV}[M](I) with 2 mantissaPower.
   * @param separator ( string ) This string is placed between each numeral. Default is the empty string.
   * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that determine what goes before and after the number in a truncated expression like M(6). The first two strings replace parentheses, the middle two replace brackets, and the last two replace braces. Default is [["(", ")"], ["[", "]"], ["{", "}"]].
   * @param delimiterPermutation ( number ) The order that the numeral, parentheses, brackets, and braces go in when multiple are present. Default is 9, which corresponds to [numeral, braces, brackets, parentheses]. Each value from 0 to 23 represents a different ordering.
   * @param zero ( number ) The string used for numbers closer to zero than the smallest numeral. Default is the empty string.
   * @param showOnLarge ( [boolean, boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
   * showOnLarge[0] is for when parentheses are the highest delimiter, showOnLarge[1] is for when brackets are the highest delimiter, and showOnLarge[2] is for when braces are the highest delimiter.
   *
   * This notation does not have an InnerNotation parameter.
   */
  var NestedSignValueNotation = /*#__PURE__*/function (_Notation2) {
    function NestedSignValueNotation(numerals) {
      var _this2;
      var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var frontToBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var roundType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "round";
      var max_in_a_row = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 4;
      var max_nestingP = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
      var max_nestingB = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : max_nestingP;
      var mantissaPower = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var hypermantissaPower = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var separator = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "";
      var delimiters = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [["(", ")"], ["[", "]"], ["{", "}"]];
      var delimiterPermutation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 9;
      var zero = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : "";
      var showOnLarge = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : [true, true, true];
      _classCallCheck(this, NestedSignValueNotation);
      _this2 = _callSuper(this, NestedSignValueNotation);
      _this2.frontToBack = false;
      _this2.roundType = "round";
      _this2.max_in_a_row = 4;
      _this2.max_nestingP = 3;
      _this2.max_nestingB = _this2.max_nestingP;
      _this2.mantissaPower = Decimal__default["default"].dZero;
      _this2.hypermantissaPower = Decimal__default["default"].dOne;
      _this2.separator = "";
      _this2.delimiters = [["(", ")"], ["[", "]"], ["{", "}"]];
      _this2.delimiterPermutation = 9;
      _this2.zero = "";
      _this2.showOnLarge = [true, true, true];
      _this2.name = "Nested Sign-Value Notation";
      _this2.numerals = numerals;
      _this2.frontToBack = frontToBack;
      _this2.rounding = toDecimal(rounding);
      _this2.roundType = roundType;
      _this2.max_in_a_row = max_in_a_row;
      _this2.max_nestingP = max_nestingP;
      _this2.max_nestingB = max_nestingB;
      _this2.mantissaPower = toDecimal(mantissaPower);
      _this2.hypermantissaPower = toDecimal(hypermantissaPower);
      _this2.separator = separator;
      _this2.delimiters = delimiters;
      _this2.delimiterPermutation = delimiterPermutation;
      _this2.zero = zero;
      _this2.showOnLarge = showOnLarge;
      return _this2;
    }
    _inherits(NestedSignValueNotation, _Notation2);
    return _createClass(NestedSignValueNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var arr = DetailedSignValueArray(value, this._numerals, this.rounding, this.roundType);
        if (arr.length == 0) return this.zero;
        var result = "";
        for (var s = 0; s < arr.length; s++) {
          var orderArray = [1];
          orderArray.splice(this.delimiterPermutation % 2, 0, 2);
          orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 3);
          orderArray.splice(Math.floor(this.delimiterPermutation / 6) % 4, 0, 4);
          var portion = arr[s][1].mul(arr[s][2]);
          if (arr[s][1].lte(this.max_in_a_row)) for (var i = 0; i < arr[s][1].toNumber(); i++) {
            if (this.frontToBack) result = arr[s][0] + result;else result += arr[s][0];
          } else if (arr[s][1].lt(arr[s][2].pow(this.max_nestingP))) {
            var subresult = "";
            while (orderArray.length > 0) {
              if (orderArray[0] == 1 && this.showOnLarge[0]) subresult += arr[s][0];else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(arr[s][1]) + this.delimiters[0][1];
              orderArray.shift();
            }
            if (this.frontToBack) result = subresult + result;else result += subresult;
          } else if (arr[s][1].mul(arr[s][2]).lt(Decimal__default["default"].tetrate(arr[s][2], this.max_nestingB + 1))) {
            var _scientifify = scientifify(portion, arr[s][2], this.rounding, this.mantissaPower),
              _scientifify2 = _slicedToArray(_scientifify, 2),
              mantissa = _scientifify2[0],
              exponent = _scientifify2[1];
            var _subresult = "";
            while (orderArray.length > 0) {
              if (orderArray[0] == 1 && this.showOnLarge[1]) _subresult += arr[s][0];else if (orderArray[0] == 2) _subresult += this.delimiters[0][0] + this.format(mantissa) + this.delimiters[0][1];else if (orderArray[0] == 3) _subresult += this.delimiters[1][0] + this.format(exponent) + this.delimiters[1][1];
              orderArray.shift();
            }
            if (this.frontToBack) result = _subresult + result;else result += _subresult;
            break;
          } else {
            var _hyperscientifify = hyperscientifify(portion, arr[s][2], this.rounding, this.hypermantissaPower),
              _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
              hypermantissa = _hyperscientifify2[0],
              hyperexponent = _hyperscientifify2[1];
            var _scientifify3 = scientifify(hypermantissa, arr[s][2], this.rounding, this.mantissaPower),
              _scientifify4 = _slicedToArray(_scientifify3, 2),
              _mantissa = _scientifify4[0],
              _exponent = _scientifify4[1];
            if (hypermantissa.lt(arr[s][2].pow(this.max_nestingP + 1))) {
              _mantissa = hypermantissa;
              _exponent = Decimal__default["default"].dZero;
            }
            var _subresult2 = "";
            while (orderArray.length > 0) {
              if (orderArray[0] == 1 && this.showOnLarge[2]) _subresult2 += arr[s][0];else if (orderArray[0] == 2) _subresult2 += this.delimiters[0][0] + this.format(_mantissa) + this.delimiters[0][1];else if (orderArray[0] == 3 && _exponent.gt(0)) _subresult2 += this.delimiters[1][0] + this.format(_exponent) + this.delimiters[1][1];else if (orderArray[0] == 4) _subresult2 += this.delimiters[2][0] + this.format(hyperexponent) + this.delimiters[2][1];
              orderArray.shift();
            }
            if (this.frontToBack) result = _subresult2 + result;else result += _subresult2;
          }
          if (s < arr.length - 1) {
            if (this.frontToBack) result = this.separator + result;else result += this.separator;
          }
        }
        return result;
      }
    }, {
      key: "numerals",
      get: function get() {
        return this._numerals;
      },
      set: function set(numerals) {
        if (numerals.length == 0) throw new Error("No numerals provided for signValue notation");
        this._numerals = numerals.map(function (entry) {
          return [entry[0], toDecimal(entry[1])];
        });
        this._numerals.sort(function (a, b) {
          return Decimal__default["default"].cmp(a[1], b[1]) * -1;
        });
      }
    }]);
  }(Notation);

  /**
   * Writes a number as a fraction that approximates its value. (The approximation is found via continued fractions).
   * @param precision ( Decimal ! ) If this is positive, the approximation will be within 'precision' of the true value. If this is negative, the approximation will be within 'value'/abs('precision') of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
   * @param mixedNumber ( boolean ) If this is true, the fractions are written as mixed numbers, i.e. the whole part is separate from the fractional part. Default is false.
   * @param maxIterations ( number ) The approximation will end after this many continued fractions iterations even if the desired precision has not been reached. Default is Infinity.
   * @param maxDenominator ( Decimal ) If the approximation's denominator is above this, the approximation ends there. Default is Infinity, which means there is no maximum denominator.
   * @param strictMaxDenominator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum denominator is exceeded, it stops at the last approximation before the maximum denominator is exceeded. Default is false.
   * @param maxNumerator ( Decimal ) If the approximation's numerator is above this, the approximation ends there. Default is Infinity, which means there is no maximum numerator.
   * @param strictMaxNumerator ( boolean ) If this parameter is true, then rather than the approximation stopping at the first approximation after the maximum numerator is exceeded, it stops at the last approximation before the maximum numerator is exceeded (unless the approximation is already a whole number, in which case this parameter does not apply). Default is false.
   * @param delimiters ( [[string, string], [string, string], [string, string]] ) An array of pairs of strings. Each pair of strings is placed around one of the numbers in the fraction to indicate which part of the fraction it is, with the first string in the pair coming before the number and the second string in the pair coming after the number. delimiters[0] goes with the numerator, delimiters[1] goes with the denominator, and delimiters[2] goes with the whole number if mixedNumber is true. Default is [["", ""], ["/", ""], ["", " "]].
   * @param delimiterPermutation ( number ) The order that the parts of the fraction go in. Default is 1, which corresponds to [whole, numerator, denominator]. Each value from 0 to 5 represents a different ordering.
   * @param numeratorInnerNotation ( Notation ) The notation that the numerator, and by default the rest of the fraction as well, is abbreviated in. DefaultNotation is the default.
   * @param wholeInnerNotation ( Notation ) The notation that the whole number in the mixed number fraction is abbreviated with. Is the same as numeratorInnerNotation by default.
   * @param denominatorInnerNotation ( Notation ) The notation that the denominator in the fraction is abbreviated with. Is the same as numeratorInnerNotation by default.
   * @param showUnitDenominator ( boolean ) Controls whether the denominator is displayed even if it's 1. Default is false. This does not apply to mixed numbers, since there the fractional part is always hidden if it's zero.
   */
  var FractionNotation = /*#__PURE__*/function (_Notation) {
    function FractionNotation(precision) {
      var _this;
      var mixedNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maxIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
      var maxDenominator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Decimal__default["default"].dInf;
      var strictMaxDenominator = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var maxNumerator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Decimal__default["default"].dInf;
      var strictMaxNumerator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var delimiters = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [["", ""], ["/", ""], ["", " "]];
      var delimiterPermutation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var numeratorInnerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var wholeInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : numeratorInnerNotation;
      var denominatorInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : numeratorInnerNotation;
      var showUnitDenominator = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : false;
      _classCallCheck(this, FractionNotation);
      _this = _callSuper(this, FractionNotation);
      _this.mixedNumber = false;
      _this.maxIterations = Infinity;
      _this.maxDenominator = Decimal__default["default"].dInf;
      _this.strictMaxDenominator = false;
      _this.maxNumerator = Decimal__default["default"].dInf;
      _this.strictMaxNumerator = false;
      _this.delimiters = [["", ""], ["/", ""], ["", " "]];
      _this.delimiterPermutation = 1;
      _this.numeratorInnerNotation = new DefaultNotation();
      _this.wholeInnerNotation = _this.numeratorInnerNotation;
      _this.denominatorInnerNotation = _this.numeratorInnerNotation;
      _this.showUnitDenominator = false;
      _this.name = "Fraction Notation";
      _this.precision = toDecimal(precision);
      _this.mixedNumber = mixedNumber;
      _this.maxIterations = maxIterations;
      _this.maxDenominator = toDecimal(maxDenominator);
      _this.strictMaxDenominator = strictMaxDenominator;
      _this.maxNumerator = toDecimal(maxNumerator);
      _this.strictMaxNumerator = strictMaxNumerator;
      _this.delimiters = delimiters;
      _this.delimiterPermutation = delimiterPermutation;
      _this.numeratorInnerNotation = numeratorInnerNotation;
      _this.wholeInnerNotation = wholeInnerNotation;
      _this.denominatorInnerNotation = denominatorInnerNotation;
      _this.showUnitDenominator = showUnitDenominator;
      return _this;
    }
    _inherits(FractionNotation, _Notation);
    return _createClass(FractionNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var fraction = fractionApproximationD(value, this.precision, this.mixedNumber ? 3 : 1, this.maxIterations, this.maxDenominator, this.strictMaxDenominator, this.maxNumerator, this.strictMaxNumerator);
        if (fraction.length == 2) fraction.unshift(Decimal__default["default"].dZero);
        if (fraction[0].eq(0) && fraction[1].eq(0)) return this.wholeInnerNotation.format(0);
        var orderArray = [1];
        orderArray.splice(this.delimiterPermutation % 2, 0, 2);
        orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 3);
        var result = "";
        while (orderArray.length > 0) {
          if (orderArray[0] == 1 && (fraction[1].neq(0) || !this.mixedNumber)) result += this.delimiters[0][0] + this.numeratorInnerNotation.format(fraction[1]) + this.delimiters[0][1];else if (orderArray[0] == 2 && (this.showUnitDenominator || fraction[2].neq(1)) && (fraction[1].neq(0) || !this.mixedNumber)) result += this.delimiters[1][0] + this.denominatorInnerNotation.format(fraction[2]) + this.delimiters[1][1];else if (orderArray[0] == 3 && fraction[0].neq(0)) result += this.delimiters[2][0] + this.wholeInnerNotation.format(fraction[0]) + this.delimiters[2][1];
          orderArray.shift();
        }
        return result;
      }
    }]);
  }(Notation);

  /**
   * Applies a Decimal -> string function to the inputted Decimal. Basically, you can make your own notation with this.
   * @param func ( Decimal -> string ! ) The Decimal -> string function that this notation runs.
   * @param negativeStringUsed ( boolean ) This parameter is false by default. If it's true, then negative numbers aren't run through func directly - instead, their absolute value is run through func, and then negativeString is put on front.
   * @param infinityStringUsed ( boolean ) This parameter is true by default. If it's true, then infinite numbers aren't run through func - instead, they just use infinityString and negativeInfinityString.
   */
  var CustomNotation = /*#__PURE__*/function (_Notation) {
    function CustomNotation(func) {
      var _this;
      var negativeStringUsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var infinityStringUsed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      _classCallCheck(this, CustomNotation);
      _this = _callSuper(this, CustomNotation);
      _this.negativeStringUsed = false;
      _this.infinityStringUsed = false;
      _this.name = "Custom Notation";
      _this.func = func;
      _this.negativeStringUsed = negativeStringUsed;
      _this.infinityStringUsed = infinityStringUsed;
      return _this;
    }
    _inherits(CustomNotation, _Notation);
    return _createClass(CustomNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          if (this.infinityStringUsed) return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;else return decimal.sgn() < 0 ? this.negativeStringUsed ? this.negativeString + this.formatDecimal(Decimal__default["default"].dInf) : this.formatDecimal(Decimal__default["default"].dNegInf) : this.formatDecimal(Decimal__default["default"].dInf);
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && this.negativeStringUsed ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        return this.func(value);
      }
    }]);
  }(Notation);

  /**
   * Scientific notation. Abbreviates 9 as "9e0" and 10^50 as "1e50". For larger numbers, switches to abbreviations like "e1e17" and eventually "(e^7)1e6", similarly to break_eternity's default toString.
   * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in scientific notation. Default is 1e12.
   * @param max_es_in_a_row ( number ) If the scientific representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2e0". Default is false.
   * @param base ( Decimal ) Scientific notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "1e2".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", and expChars[2] takes the place of the (e^) in (e^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["(e^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var ScientificNotation = /*#__PURE__*/function (_Notation) {
    function ScientificNotation() {
      var _this;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e12;
      var max_es_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var mantissaPower = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var iteration_zero = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var base = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 10;
      var expChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [["e", ""], ["e", ""], ["(e^", ")"]];
      var negExpChars = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      var expBefore = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var superexpAfter = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      var expMult = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 1;
      var mantissaInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : exponentInnerNotation;
      _classCallCheck(this, ScientificNotation);
      _this = _callSuper(this, ScientificNotation);
      _this._maxnum = new Decimal__default["default"](1e12);
      _this.max_es_in_a_row = 5;
      _this.rounding = Decimal__default["default"].dZero;
      _this._engineerings = [Decimal__default["default"].dOne];
      _this.mantissaPower = Decimal__default["default"].dZero;
      _this.iteration_zero = false;
      _this._base = Decimal__default["default"].dTen;
      _this._expChars = [["e", ""], ["e", ""], ["(e^", ")"]];
      _this.negExpChars = null;
      _this.expBefore = false;
      _this.superexpAfter = false;
      _this._expMult = Decimal__default["default"].dOne;
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = _this.mantissaInnerNotation;
      _this.superexponentInnerNotation = _this.exponentInnerNotation;
      _this.name = "Scientific Notation";
      _this.maxnum = maxnum;
      _this.max_es_in_a_row = max_es_in_a_row;
      _this.rounding = rounding;
      _this.engineerings = engineerings;
      _this.mantissaPower = toDecimal(mantissaPower);
      _this.iteration_zero = iteration_zero;
      _this._base = toDecimal(base);
      _this.expBefore = expBefore;
      _this.superexpAfter = superexpAfter;
      _this.expMult = expMult;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.unconvertedExpChars = expChars;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(ScientificNotation, _Notation);
    return _createClass(ScientificNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.mantissaInnerNotation.format(0);
        if (this.iteration_zero && value.lt(this._maxnum) && value.gt(this._maxnum.recip())) return this.mantissaInnerNotation.format(value);
        var result = "";
        if (multabs(value).lt(Decimal__default["default"].pow(this._base, this._maxnum))) {
          var _scientifify = scientifify(value, this._base, this.rounding, this.mantissaPower, this._engineerings, this._expMult),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            mantissa = _scientifify2[0],
            exponent = _scientifify2[1];
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (exponent.lt(0) && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent = exponent.neg();
          }
          var mantissaStr = this.mantissaInnerNotation.format(mantissa);
          var exponentStr = this.exponentInnerNotation.format(exponent);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;else result = mantissaStr + beforeChar + exponentStr + afterChar;
        } else {
          var negExp = false;
          if (value.lt(1)) {
            if (this.negExpChars != null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            negExp = true;
            var _scientifify3 = scientifify(value, this._base, this.rounding, this.mantissaPower, this._engineerings, this._expMult),
              _scientifify4 = _slicedToArray(_scientifify3, 2),
              m = _scientifify4[0],
              e = _scientifify4[1];
            value = Decimal__default["default"].pow(this._base, e.neg()).mul(m);
          }
          var added_es = multslog(value, this._base, this._expMult).sub(multslog(this._maxnum, this._base, this._expMult)).floor().toNumber();
          value = added_es > 9e15 ? this._maxnum : iteratedmultlog(value, this._base, added_es, this._expMult);
          while (value.gte(Decimal__default["default"].pow(this._base, this._maxnum))) {
            added_es += 1;
            value = iteratedmultlog(value, this._base, 1, this._expMult);
          }
          if (negExp) value = value.neg();
          result = this.format(value);
          if (added_es <= this.max_es_in_a_row) {
            for (var i = 0; i < added_es; i++) {
              result = this._expChars[1][0] + result + this._expChars[1][1];
            }
          } else {
            var eStr = this.superexponentInnerNotation.format(added_es);
            eStr = this._expChars[2][0] + eStr + this._expChars[2][1];
            if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          }
        }
        return result;
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Scientific Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Scientific Notation");
        this._base = baseD;
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Scientific Notation");
        this._expMult = expMultD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.mantissaInnerNotation.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);
  /**
   * This notation performs scientific notation a certain number of times. 1 iteration means the number is in the form AeB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AeBeC, and so on.
   * @param iterations ( number ! ) The amount of iterations.
   * @param max_es_in_a_row ( number ) If the scientific representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
   * @param base ( Decimal ) Scientific notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "1e2".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", and expChars[2] takes the place of the (e^) in (e^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["(e^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest exponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var ScientificIterationsNotation = /*#__PURE__*/function (_Notation2) {
    function ScientificIterationsNotation(iterations) {
      var _this2;
      var max_es_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var mantissaPower = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var base = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;
      var expChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["e", ""], ["e", ""], ["(e^", ")"]];
      var negExpChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var expBefore = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var superexpAfter = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var expMult = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      var mantissaInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : exponentInnerNotation;
      _classCallCheck(this, ScientificIterationsNotation);
      _this2 = _callSuper(this, ScientificIterationsNotation);
      _this2.max_es_in_a_row = 5;
      _this2.rounding = Decimal__default["default"].dZero;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.mantissaPower = Decimal__default["default"].dZero;
      _this2._base = Decimal__default["default"].dTen;
      _this2._expChars = [["e", ""], ["e", ""], ["(e^", ")"]];
      _this2.negExpChars = null;
      _this2.expBefore = false;
      _this2.superexpAfter = false;
      _this2._expMult = Decimal__default["default"].dOne;
      _this2.mantissaInnerNotation = new DefaultNotation();
      _this2.exponentInnerNotation = _this2.mantissaInnerNotation;
      _this2.superexponentInnerNotation = _this2.exponentInnerNotation;
      _this2.name = "Scientific Iterations Notation";
      _this2.iterations = iterations;
      _this2.max_es_in_a_row = max_es_in_a_row;
      _this2.rounding = rounding;
      _this2.engineerings = engineerings;
      _this2.mantissaPower = toDecimal(mantissaPower);
      _this2._base = toDecimal(base);
      _this2.expBefore = expBefore;
      _this2.superexpAfter = superexpAfter;
      _this2.expMult = expMult;
      _this2.mantissaInnerNotation = mantissaInnerNotation;
      _this2.exponentInnerNotation = exponentInnerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.unconvertedExpChars = expChars;
      _this2.expChars = expChars;
      _this2.negExpChars = negExpChars;
      return _this2;
    }
    _inherits(ScientificIterationsNotation, _Notation2);
    return _createClass(ScientificIterationsNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.mantissaInnerNotation.format(0);
        if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
        var iterations = this._iterations;
        var result = "";
        var negExp = false;
        var originalValue = value;
        if (value.lt(1)) {
          negExp = true;
          var _scientifify5 = scientifify(value, this._base, this.rounding, this.mantissaPower, this._engineerings, this._expMult),
            _scientifify6 = _slicedToArray(_scientifify5, 2),
            m = _scientifify6[0],
            e = _scientifify6[1];
          value = Decimal__default["default"].pow(this._base, e.neg()).mul(m);
        }
        if (iterations > multslog(value, this._base, this._expMult).ceil().toNumber() + 3) iterations = multslog(value, this._base, this._expMult).ceil().toNumber() + 3;
        var added_es = Decimal__default["default"].min(this._iterations, multslog(value, this._base, this._expMult).sub(multslog(new Decimal__default["default"](Number.MAX_SAFE_INTEGER), this._base, this._expMult)).floor()).toNumber();
        if (added_es < iterations - multslog(new Decimal__default["default"](Number.MAX_SAFE_INTEGER), this._base, this._expMult).ceil().toNumber()) added_es = iterations - multslog(new Decimal__default["default"](Number.MAX_SAFE_INTEGER), this._base, this._expMult).ceil().toNumber();
        if (added_es < 0) added_es = 0;
        if (negExp && this.negExpChars !== null && (added_es > 0 || this.negExpChars[0] === true)) return this.negExpChars[1][0] + this.format(originalValue.recip()) + this.negExpChars[1][1];
        value = iteratedmultlog(value, this._base, added_es, this._expMult);
        var sciArray = [value];
        for (var i = 0; i < iterations - added_es; i++) {
          if (sciArray[sciArray.length - 1].eq(0)) break;
          var _scientifify7 = scientifify(sciArray[sciArray.length - 1], this._base, this.rounding, this.mantissaPower, this._engineerings, this._expMult),
            _scientifify8 = _slicedToArray(_scientifify7, 2),
            mantissa = _scientifify8[0],
            exponent = _scientifify8[1];
          if (i == 0 && negExp) exponent = exponent.neg();
          sciArray.pop();
          sciArray.push(mantissa, exponent);
        }
        var endings = sciArray.length - 1;
        var beforeChar = this._expChars[0][0];
        var afterChar = this._expChars[0][1];
        console.log(structuredClone(sciArray));
        while (sciArray.length > 0) {
          var numStr = "";
          var toFormat = sciArray[0];
          if (this.negExpChars !== null && typeof this.negExpChars[0] !== "boolean" && toFormat.lt(0)) {
            toFormat = toFormat.neg();
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            negExp = false;
          }
          if (sciArray.length == 1) numStr = this.exponentInnerNotation.format(toFormat);else numStr = this.mantissaInnerNotation.format(toFormat);
          // if (!onlyNumericCharacters(numStr) && !(onlyNumericCharacters(numStr, true) && sciArray.length == 1)) numStr = "(" + numStr + ")";
          if (this.expBefore) {
            if (sciArray.length <= endings) result = afterChar + result;
            result = numStr + result;
            sciArray.shift();
          } else {
            if (sciArray.length <= endings) result += beforeChar;
            result += numStr;
            sciArray.shift();
          }
          beforeChar = this._expChars[0][0];
          afterChar = this._expChars[0][1];
        }
        if (negExp && added_es > 0) {
          result = this.negativeString[0] + result + this.negativeString[1];
          negExp = false;
        }
        for (var _e = 0; _e < endings; _e++) {
          if (this.expBefore) result = beforeChar + result;else result += afterChar;
        }
        if (added_es <= this.max_es_in_a_row) {
          for (var _i = 0; _i < added_es; _i++) result = this._expChars[1][0] + result + this._expChars[1][1];
        } else {
          var eStr = this.superexponentInnerNotation.format(added_es);
          eStr = this._expChars[2][0] + eStr + this._expChars[2][1];
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
        }
        return result;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Scientific Iterations Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.lte(1)) throw new RangeError("Base <= 1 in Scientific Iterations Notation");
        this._base = toDecimal(base);
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (this._base.lte(1)) throw new RangeError("Base <= 1 in Scientific Iterations Notation");
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        this._expMult = expMultD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.mantissaInnerNotation.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates numbers in terms of their logarithm, so 10^12 is "e12" and 2 is "e0.301".
   * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Logarithm notation, 2 is double Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "lg100".
   * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
   * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
   * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
   * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
   * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
   * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
   * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
   * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var LogarithmNotation = /*#__PURE__*/function (_Notation) {
    function LogarithmNotation() {
      var _this;
      var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var max_es_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var negLogBehavior = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var expChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["e", ""], ["e", ""], ["(e^", ")"]];
      var logChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [["lg", ""], ["lg", ""], ["(lg^", ")"]];
      var superexpAfter = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var baseShown = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var expMult = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var innerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : innerNotation;
      var baseInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : innerNotation;
      _classCallCheck(this, LogarithmNotation);
      _this = _callSuper(this, LogarithmNotation);
      _this.iterations = 1;
      _this.max_es_in_a_row = 5;
      _this._base = Decimal__default["default"].dTen;
      _this.negLogBehavior = true;
      _this.expChars = [["e", ""], ["e", ""], ["(e^", ")"]];
      _this.logChars = [["lg", ""], ["lg", ""], ["(lg^", ")"]];
      _this.superexpAfter = false;
      _this.baseShown = 0;
      _this._expMult = Decimal__default["default"].dOne;
      _this.innerNotation = new DefaultNotation();
      _this.superexponentInnerNotation = _this.innerNotation;
      _this.baseInnerNotation = _this.innerNotation;
      _this.name = "Logarithm Notation";
      _this.iterations = iterations;
      _this.max_es_in_a_row = max_es_in_a_row;
      _this._base = toDecimal(base);
      _this.negLogBehavior = negLogBehavior;
      _this.expChars = expChars;
      _this.logChars = logChars;
      _this.superexpAfter = superexpAfter;
      _this.baseShown = baseShown;
      _this.expMult = expMult;
      _this.innerNotation = innerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.baseInnerNotation = baseInnerNotation;
      return _this;
    }
    _inherits(LogarithmNotation, _Notation);
    return _createClass(LogarithmNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && this.iterations >= 0 ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0) && this.iterations == 0) return this.innerNotation.format(0);
        var result = "";
        var iterations = this.iterations;
        var negExp = false;
        if (value.lt(1) && value.gt(0) && this.negLogBehavior) {
          negExp = true;
          value = value.log(this._base).neg();
          iterations -= 1;
        }
        // Some optimization has been done in these next few statements to avoid calling slog on small numbers when possible
        if (iterations >= 1 && value.lte(0)) iterations = 0;else if (iterations >= 2 && value.lte(1)) iterations = 1;else if (!iteratedmultlog(value, this._base, iterations, this._expMult).isFinite()) iterations = Math.ceil(multslog(value, this._base, this._expMult).sub(1e-12).toNumber() + 1);
        while (!iteratedmultlog(value, this._base, iterations, this._expMult).isFinite()) iterations -= 1;
        value = iteratedmultlog(value, this._base, iterations, this._expMult);
        var usedChars = this.expChars;
        if (iterations < 0 && this.logChars != null) {
          usedChars = this.logChars;
          iterations *= -1;
        }
        var baseStr = "";
        if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
        result = this.innerNotation.format(value);
        if (iterations >= 0 && iterations <= this.max_es_in_a_row && iterations % 1 == 0) {
          for (var i = 0; i < iterations; i++) {
            var eChar = usedChars[i == 0 ? 0 : 1][0];
            var afterChar = usedChars[i == 0 ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
          }
        } else {
          var _eChar = usedChars[2][0];
          var _afterChar = usedChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = _eChar + eStr + _afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
        }
        if (negExp) {
          var _eChar2 = this.expChars[iterations == 0 ? 0 : 1][0];
          var _afterChar2 = this.expChars[iterations == 0 ? 0 : 1][1];
          result = _eChar2 + this.negativeString[0] + result + this.negativeString[1] + _afterChar2;
          if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
        }
        return result;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1)) throw new RangeError("Base <= 1 in Logarithm Notation");
        this._base = baseD;
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1)) throw new RangeError("Base <= 1 in Logarithm Notation");
        this._expMult = expMultD;
      }
    }]);
  }(Notation);
  /**
   * A variant of logarithm notation that uses a different amount of logarithm iterations depending on how large the number is.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e12.
   * @param max_es_in_a_row ( number ) If the logarithm representation would have more e's at the beginning than this, those e's are made into an e^n expression. Default is 5.
   * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
   * @param base ( Decimal ) This notation normally works in powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "e2".
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param negLogBehavior ( boolean ) If this parameter is true, then numbers between 0 and 1 are treated as reciprocals, meaning their first logarithm is made negative before the rest of the iterations. Default is true.
   * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the e in "e10", expChars[1] takes the place of the first e in "ee10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (e^) in (e^10)4. Default is [["e", ""], ["e", ""], ["(e^", ")"]].
   * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["lg", ""], ["lg", ""], ["(lg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as e^-1.
   * @param superexpAfter ( boolean ) This is false by default; if it's true, an (e^n) expression comes after the number instead of before.
   * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
   * @param expMult ( Decimal ) On each logarithm iteration, the result is multiplied by this number. Default is 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (e^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var MultiLogarithmNotation = /*#__PURE__*/function (_Notation2) {
    function MultiLogarithmNotation() {
      var _this2;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e12;
      var max_es_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var minIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
      var engineerings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var negLogBehavior = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var expChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["e", ""], ["e", ""], ["(e^", ")"]];
      var logChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [["lg", ""], ["lg", ""], ["(lg^", ")"]];
      var superexpAfter = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var baseShown = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
      var expMult = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      var innerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : innerNotation;
      var baseInnerNotation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : innerNotation;
      _classCallCheck(this, MultiLogarithmNotation);
      _this2 = _callSuper(this, MultiLogarithmNotation);
      _this2._maxnum = new Decimal__default["default"](1e12);
      _this2.max_es_in_a_row = 5;
      _this2.minIterations = 1;
      _this2._base = Decimal__default["default"].dTen;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.negLogBehavior = true;
      _this2.expChars = [["e", ""], ["e", ""], ["(e^", ")"]];
      _this2.logChars = [["lg", ""], ["lg", ""], ["(lg^", ")"]];
      _this2.superexpAfter = false;
      _this2.baseShown = 0;
      _this2._expMult = Decimal__default["default"].dOne;
      _this2.innerNotation = new DefaultNotation();
      _this2.superexponentInnerNotation = _this2.innerNotation;
      _this2.baseInnerNotation = _this2.innerNotation;
      _this2.name = "Multi-Logarithm Notation";
      _this2.maxnum = maxnum;
      _this2.max_es_in_a_row = max_es_in_a_row;
      _this2.minIterations = minIterations;
      _this2._base = toDecimal(base);
      _this2.engineerings = engineerings;
      _this2.negLogBehavior = negLogBehavior;
      _this2.expChars = expChars;
      _this2.logChars = logChars;
      _this2.superexpAfter = superexpAfter;
      _this2.baseShown = baseShown;
      _this2.expMult = expMult;
      _this2.innerNotation = innerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.baseInnerNotation = baseInnerNotation;
      return _this2;
    }
    _inherits(MultiLogarithmNotation, _Notation2);
    return _createClass(MultiLogarithmNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && this.minIterations >= 0 ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var originalValue = value;
        var negExp = false;
        if (value.lt(1) && this.negLogBehavior) {
          negExp = true;
          value = multabs(value);
        }
        var iterations = this.minIterations;
        if (!iteratedmultlog(value, this._base, this.minIterations, this._expMult).isFinite()) {
          var decIterations = toDecimal(iterations);
          if (value.gte(this._base)) decIterations = currentEngineeringValue(multslog(value, this._base, this._expMult).plus(2), this._engineerings);
          while (!iteratedmultlog(value, this._base, decIterations.toNumber(), this._expMult).isFinite()) decIterations = previousEngineeringValue(decIterations, this._engineerings);
          iterations = decIterations.toNumber();
        } else if (value.gte(iteratedexpmult(this._base, this._maxnum, this.minIterations, this._expMult))) iterations = nextEngineeringValue(multslog(value, this._base, this._expMult).sub(multslog(this._maxnum, this._base, this._expMult)), this._engineerings).toNumber();
        if (iterations > 9e15) {
          // Imprecision was causing problems, so if we're too high, just ignore the logarithm process and find an equivalent expression based only on iterations, since at that point the leftover value means nothing
          if (negExp) iterations -= 1;
          var result = this.innerNotation.format(1);
          var baseStr = "";
          if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
          var eChar = this.expChars[2][0];
          var afterChar = this.expChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
          if (negExp) {
            var _eChar3 = this.expChars[iterations == 0 ? 0 : 1][0];
            var _afterChar3 = this.expChars[iterations == 0 ? 0 : 1][1];
            result = _eChar3 + this.negativeString[0] + result + this.negativeString[1] + _afterChar3;
            if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
          }
          return result;
        }
        return new LogarithmNotation(iterations, this.max_es_in_a_row, this._base, this.negLogBehavior, this.expChars, this.logChars, this.superexpAfter, this.baseShown, this._expMult, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(originalValue);
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lt(0)) throw new RangeError("Negative maxnum in Multi-Logarithm Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Logarithm Notation");
        this._base = baseD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Logarithm Notation");
        this._expMult = expMultD;
      }
    }]);
  }(Notation);

  /**
   * Uses the names of large numbers to abbreviate them: a million is 1 M, two billion is 2 B, and so on. Larger names use the -illion scheme devised by Jonathan Bowers.
   * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
   * @param longScale ( boolean ) The short scale is used if this is false, the long scale is used if this is true. Default is false.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
   * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   */
  var StandardNotation = /*#__PURE__*/function (_Notation) {
    function StandardNotation() {
      var _this;
      var dialect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var longScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var entriesLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
      var charLimit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
      var innerNotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new DefaultNotation();
      _classCallCheck(this, StandardNotation);
      _this = _callSuper(this, StandardNotation);
      _this._dialect = 0;
      _this.longScale = false;
      _this.rounding = Decimal__default["default"].dZero;
      _this._entriesLimit = 5;
      _this._charLimit = 50;
      _this.innerNotation = new DefaultNotation();
      _this.charLimitReached = false;
      _this.name = "Standard Notation";
      _this.dialect = dialect;
      _this.longScale = longScale;
      _this.rounding = rounding;
      _this.entriesLimit = entriesLimit;
      _this.charLimit = charLimit;
      _this.innerNotation = innerNotation;
      if (_this._dialect == 1) {
        // Antimatter Dimensions Standard
        _this.prefixes = {
          early1: ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
          layer1: [["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]],
          early2: ["", "MI", "MC", "NA", "PC", "FM", "AT", "ZP"]
        };
      } else if (dialect == 2) _this.prefixes = {
        // Aarex's Abbreviation System
        early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
        layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], ["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]],
        early2: ["", "Mi", "Mc", "Na", "Pc", "Fem", "At", "Zep", "Yo", "Xn", "Vc", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En"],
        layer2: [["", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En", "Ve", "Mec", "Duc", "Trc", "Tec", "Pc", "Hxc", "Hpc", "Otc", "Ec"], ["", "Vc", "Is", "TrC", "TeC", "PeC", "HeC", "HpC", "OtC", "EnC"], ["", "Hec", "DHc", "TrH", "TeH", "PeH", "HeH", "HpH", "OtH", "EnH"]],
        early3: ["", "Kl", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe", "Dk", "Hn", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
        layer3: [["", "eN", "oD", "tR", "tE", "pT", "eX", "zE", "yO", "xN", "DaK", "En", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD", "Ik", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN", "Trk", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN", "Tek", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN", "Pek", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN", "Exk", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN", "Zak", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN", "Yok", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN", "Nek", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"], ["T", "EN", "OD", "TR", "TE", "PT", "EC", "ZT", "YT", "XE", "DaK", "En", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD", "IK", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN", "TrK", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN", "TeK", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN", "PeK", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN", "ExK", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN", "ZaK", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN", "YoK", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN", "NeK", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"], ["", "Ho", "Do", "To", "Tr", "Po", "Ex", "Zo", "Yo", "No"]],
        // layer3[0] is the layer3 entries below 100, layer3[1] is the layer3 entries below 100 when they come after a multiple of 100, and layer3[2] is the multiples of 100
        prefixearly3: ["", "", "D", "T", "Tr", "P", "Ex", "Z", "Y", "N", "DK", "HN", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
        early4: ["", "KaL", "MeJ", "GiJ", "AsT", "LuN", "FrM", "JoV", "SoL", "BeT", "GaX", "GlO", "SuP", "VrS", "MlT"]
      };else _this.prefixes = {
        // MathCookie's Standard
        early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
        // Below a decillion
        layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], ["", "Cn", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]],
        // Ones, tens, and hundreds prefixes on layer 1
        early2: ["", "Ml", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"],
        // First 19 on layer 2
        layer2: [["", "Me", "Du", "To", "Tt", "Pn", "Hx", "Hp", "Ot", "En", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"], ["", "Vc", "Ic", "Ta", "Te", "Pe", "He", "Ht", "Oa", "Ea"], ["", "Hc", "Dh", "Th", "Tth", "Ph", "Hxh", "Hph", "Oh", "Eh"]],
        // Ones, tens, and hundreds on layer 2. 11 through 19 use their ones entry, but higher numbers go back to ones + tens
        early3: ["", "Ki", "Mg", "Gg", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"],
        // First 19 on layer 3
        layer3: [["", "Hd", "Di", "Ti", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"], ["", "Da", "Ik", "Tak", "Tek", "Pk", "Ek", "Zk", "Yk", "Nk"], ["", "Ho", "Bo", "Tro", "Tot", "Po", "Eo", "Zo", "Yo", "Nt"]],
        // Ones, tens, and hundreds on layer 3. Behaves the same as layer 2
        prefixearly3: ["", "", "Dl", "Ta", "Tl", "Pl", "El", "Zl", "Yl", "Nl", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"],
        // When layer 3 entries below 20 are used as a prefix on a layer 4 entry rather than standing on their own, these are used. The usual layer3 entries are used above 20.
        early4: ["", "Ka", "Mj", "Gj", "As", "Lu", "Fr", "Jv", "Sl", "Bt", "Gx", "Go", "Sp", "Vs", "Mu"] // Layer 4; the illions run out after Mu
      };
      return _this;
    }
    _inherits(StandardNotation, _Notation);
    return _createClass(StandardNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        this.charLimitReached = false;
        if (value.eq(0)) return this.innerNotation.format(0);
        var result = "";
        var negExp = false;
        var base = new Decimal__default["default"](1000);
        if (this.longScale) base = new Decimal__default["default"](1e6);
        if (value.lt(1) && this._dialect == 2) {
          if (value.gte(0.01)) return this.innerNotation.format(value);
          var recipNotation = new AppliedFunctionNotation(function (value) {
            return value.recip();
          }, this, function (value) {
            return "1 / " + value;
          });
          return recipNotation.format(value);
        }
        if (value.lt(1)) {
          negExp = true;
          var _scientifify = scientifify(value, base),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            m = _scientifify2[0],
            e = _scientifify2[1];
          value = base.pow(e.neg()).mul(m);
        }
        if (this._dialect == 2 && value.gte(Decimal__default["default"].tetrate(10, base.toNumber()))) {
          if (negExp) result += "/";
          result += "MXS^";
          result += this.format(value.slog(10));
          return result;
        } else if (this._dialect != 2 && value.gte(base.pentate(2))) {
          if (negExp) result += "/";
          result += "Il^";
          result += this.format(value.slog(base));
          return result;
        } else {
          var limit = new Decimal__default["default"]("eee3e45");
          if (this._dialect == 1) {
            if (this.longScale) limit = new Decimal__default["default"]("e6e24");else limit = new Decimal__default["default"]("e3e24");
          }
          var aboveLimit = false;
          if (value.gte(limit)) {
            aboveLimit = true;
            var limBase = base;
            if (this._dialect == 2) limBase = Decimal__default["default"].dTen;
            var fronts = value.slog(limBase).sub(limit.slog(limBase)).plus(1).floor();
            value = value.iteratedlog(limBase, fronts.toNumber(), true);
            if (this._dialect == 2) {
              if (negExp) result += "/";
              if (fronts.eq(1)) result += "MXS-(";else result += "MXS^" + this.format(fronts) + "-(";
              negExp = false;
            } else {
              if (negExp) result += "/";
              if (fronts.eq(1)) result += "Il(";else result += "Il^" + this.format(fronts) + "(";
              negExp = false;
            }
          }
          var _scientifify3 = scientifify(value, base, this.rounding),
            _scientifify4 = _slicedToArray(_scientifify3, 2),
            mantissa = _scientifify4[0],
            illion = _scientifify4[1];
          if (value.lte(base.pow(Decimal__default["default"].pow(1000, this._entriesLimit)))) result += this.innerNotation.format(mantissa);
          if (illion.eq(0)) return result; //No -illion here
          if (value.lte(base.pow(Decimal__default["default"].pow(1000, this._entriesLimit)))) result += " ";
          if (negExp) result += "/";
          if (!this.longScale) illion = illion.sub(1); //Since 1,000 is the "0th" illion and 1,000,000 is the first; this isn't an issue in long scale
          var charsSoFar = 0; //This is used to keep track of whether we've hit the character limit
          if (illion.lt(10)) result += this.prefixes.early1[illion.toNumber()];else {
            var iterations = 0;
            while (iterations < this._entriesLimit && illion.gt(0)) {
              //Layer 1 loop
              iterations++;
              var superillion = illion.log(1000).floor();
              var coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
              //These next few if statements address imprecision errors
              var imprecisions = 0;
              if (coefficient.eq(0)) {
                superillion = superillion.sub(1);
                coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
                imprecisions++;
              }
              if (coefficient.gte(1000)) {
                superillion = superillion.plus(1);
                coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
                imprecisions++;
              }
              if (coefficient.eq(0) && imprecisions == 2) {
                //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
                coefficient = Decimal__default["default"].dOne;
                illion = Decimal__default["default"].dZero;
              } else illion = illion.sub(coefficient.mul(Decimal__default["default"].pow(1000, superillion)));
              var coefficientPart = this.prefixes.layer1[0][coefficient.mod(10).toNumber()] + this.prefixes.layer1[1][coefficient.div(10).floor().mod(10).toNumber()] + this.prefixes.layer1[2][coefficient.div(100).floor().mod(10).toNumber()];
              if (coefficient.gt(1) || superillion.eq(0)) {
                result += coefficientPart;
                charsSoFar += coefficientPart.length;
              }
              var superPart = "";
              superPart += this.calcLayer2(superillion, charsSoFar);
              charsSoFar += superPart.length;
              result += superPart;
              if (this.charLimitReached) break;
              if (illion.gt(0)) {
                result += "-";
                charsSoFar += 1;
              }
              if (charsSoFar > this._charLimit && illion.gt(0)) this.charLimitReached = true;
              if (this.charLimitReached) break;
            }
            if (iterations == this._entriesLimit && illion.gt(0)) this.charLimitReached = true;
          }
          if (this.charLimitReached) result += "...";
          if (aboveLimit) result += ")";
        }
        return result;
      }
    }, {
      key: "calcLayer2",
      value: function calcLayer2(illion) {
        var charsComingIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var result = "";
        var charsSoFar = 0;
        var iterations = 0;
        while (iterations < this._entriesLimit && illion.gt(0)) {
          //Layer 2 loop
          iterations++;
          var superillion = illion.log(1000).floor();
          var coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
          var imprecisions = 0;
          if (coefficient.eq(0)) {
            superillion = superillion.sub(1);
            coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
            imprecisions++;
          }
          if (coefficient.gte(1000)) {
            superillion = superillion.plus(1);
            coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
            imprecisions++;
          }
          if (coefficient.eq(0) && imprecisions == 2) {
            //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
            coefficient = Decimal__default["default"].dOne;
            illion = Decimal__default["default"].dZero;
          } else illion = illion.sub(coefficient.mul(Decimal__default["default"].pow(1000, superillion)));
          var coefficientPart = "";
          if (coefficient.mod(100).lt(20)) {
            if (superillion.eq(0) && coefficient.lt(100)) coefficientPart = this.prefixes.early2[coefficient.mod(100).toNumber()];else coefficientPart = this.prefixes.layer2[0][coefficient.mod(100).toNumber()];
          } else coefficientPart = this.prefixes.layer2[0][coefficient.mod(10).toNumber()] + this.prefixes.layer2[1][coefficient.div(10).floor().mod(10).toNumber()];
          if (coefficient.gte(100)) coefficientPart += this.prefixes.layer2[2][coefficient.div(100).floor().mod(10).toNumber()];
          if (coefficient.gt(1) || superillion.eq(0)) {
            result += coefficientPart;
            charsSoFar += coefficientPart.length;
          }
          var superPart = this.calcLayer3(superillion, charsComingIn + charsSoFar);
          charsSoFar += superPart.length;
          result += superPart;
          if (this.charLimitReached) break;
          if (illion.gt(0)) {
            if (this._dialect == 2) {
              result += "a'";
              charsSoFar += 2;
            } else {
              result += "_";
              charsSoFar += 1;
            }
          }
          if (charsComingIn + charsSoFar > this._charLimit && illion.gt(0)) this.charLimitReached = true;
          if (this.charLimitReached) break;
        }
        if (iterations == this._entriesLimit && illion.gt(0)) this.charLimitReached = true;
        return result;
      }
    }, {
      key: "calcLayer3",
      value: function calcLayer3(illion) {
        var charsComingIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var result = "";
        var charsSoFar = 0;
        var iterations = 0;
        while (iterations < this._entriesLimit && illion.gt(0)) {
          //Layer 3 loop
          iterations++;
          var superillion = illion.log(1000).floor();
          var coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
          var imprecisions = 0;
          if (coefficient.eq(0)) {
            superillion = superillion.sub(1);
            coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
            imprecisions++;
          }
          if (coefficient.gte(1000)) {
            superillion = superillion.plus(1);
            coefficient = illion.div(Decimal__default["default"].pow(1000, superillion)).floor();
            imprecisions++;
          }
          if (coefficient.eq(0) && imprecisions == 2) {
            //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
            coefficient = Decimal__default["default"].dOne;
            illion = Decimal__default["default"].dZero;
          } else illion = illion.sub(coefficient.mul(Decimal__default["default"].pow(1000, superillion)));
          var coefficientPart = "";
          if (coefficient.lt(20) || coefficient.mod(100).lt(20) && this._dialect != 2) {
            if (superillion.eq(0) && coefficient.lt(100)) coefficientPart += this.prefixes.early3[coefficient.mod(100).toNumber()];else if (superillion.eq(0)) coefficientPart += this.prefixes.layer3[0][coefficient.mod(100).toNumber()];else coefficientPart += this.prefixes.prefixearly3[coefficient.mod(100).toNumber()];
            if (coefficient.gte(100)) coefficientPart += this.prefixes.layer3[2][coefficient.div(100).floor().mod(10).toNumber()];
          } else {
            if (this._dialect == 2) {
              coefficientPart += this.prefixes.layer3[2][coefficient.div(100).floor().mod(10).toNumber()];
              if (coefficient.lt(100)) coefficientPart += this.prefixes.layer3[0][coefficient.mod(100).toNumber()];else coefficientPart += this.prefixes.layer3[1][coefficient.mod(100).toNumber()];
            } else {
              coefficientPart = this.prefixes.layer3[0][coefficient.mod(10).toNumber()] + this.prefixes.layer3[1][coefficient.div(10).floor().mod(10).toNumber()];
              if (coefficient.gte(100)) coefficientPart += this.prefixes.layer3[2][coefficient.div(100).floor().mod(10).toNumber()];
            }
          }
          var superPart = "";
          superPart = this.prefixes.early4[superillion.toNumber()]; //No need for a calcLayer4 because the illions don't go that far
          if (this._dialect == 2 && superillion.gt(0)) {
            //Aarex's Abbreviation System has some character manipulation at Tier 4
            if (coefficient.gt(1)) {
              superPart = superPart.substring(1);
              if (superillion.eq(9)) superPart = "eeT";
              superPart = coefficientPart + superPart;
            }
            if (illion.lt(4)) {
              superPart += this.prefixes.layer3[0][illion.toNumber()];
              result += superPart;
              charsSoFar += superPart.length;
              illion = Decimal__default["default"].dZero;
            } else {
              if (superillion.eq(3)) superPart += "`";else superPart = superPart.substring(0, superPart.length - 1);
              result += superPart;
              charsSoFar += superPart.length;
            }
          } else {
            result += coefficientPart;
            charsSoFar += coefficientPart.length;
            charsSoFar += superPart.length;
            result += superPart;
          }
          if (this.charLimitReached) break;
          if (illion.gt(0) && this._dialect != 2) {
            result += "~";
            charsSoFar += 1;
          }
          if (charsComingIn + charsSoFar > this._charLimit && illion.gt(0)) this.charLimitReached = true;
          if (this.charLimitReached) break;
        }
        if (iterations == this._entriesLimit && illion.gt(0)) this.charLimitReached = true;
        return result;
      }
    }, {
      key: "dialect",
      get: function get() {
        return this._dialect;
      },
      set: function set(dialect) {
        this._dialect = dialect;
        if (this._dialect == 1) {
          // Antimatter Dimensions Standard
          this.prefixes = {
            early1: ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"],
            layer1: [["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]],
            early2: ["", "MI", "MC", "NA", "PC", "FM", "AT", "ZP"]
          };
        } else if (dialect == 2) this.prefixes = {
          // Aarex's Abbreviation System
          early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"],
          layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], ["", "Ce", "Dc", "Tc", "Qe", "Qu", "Se", "Su", "Oe", "Ne"]],
          early2: ["", "Mi", "Mc", "Na", "Pc", "Fem", "At", "Zep", "Yo", "Xn", "Vc", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En"],
          layer2: [["", "Me", "Du", "Tre", "Te", "Pe", "He", "Hp", "Ot", "En", "Ve", "Mec", "Duc", "Trc", "Tec", "Pc", "Hxc", "Hpc", "Otc", "Ec"], ["", "Vc", "Is", "TrC", "TeC", "PeC", "HeC", "HpC", "OtC", "EnC"], ["", "Hec", "DHc", "TrH", "TeH", "PeH", "HeH", "HpH", "OtH", "EnH"]],
          early3: ["", "Kl", "Mg", "Gi", "Ter", "Pt", "Ex", "Zt", "Yt", "Xe", "Dk", "Hn", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
          layer3: [["", "eN", "oD", "tR", "tE", "pT", "eX", "zE", "yO", "xN", "DaK", "En", "Dok", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD", "Ik", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN", "Trk", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN", "Tek", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN", "Pek", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN", "Exk", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN", "Zak", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN", "Yok", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN", "Nek", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"], ["T", "EN", "OD", "TR", "TE", "PT", "EC", "ZT", "YT", "XE", "DaK", "En", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD", "IK", "IkeN", "IcoD", "IctR", "IctE", "IkpT", "IkeX", "IczE", "IkyO", "IcxN", "TrK", "TkeN", "TcoD", "TctR", "TctE", "TkpT", "TkeX", "TczE", "TkyO", "TcxN", "TeK", "TekeN", "TecoD", "TectR", "TectE", "TekpT", "TekeX", "TeczE", "TekyO", "TecxN", "PeK", "PkeN", "PcoD", "PctR", "PctE", "PkpT", "PkeX", "PczE", "PkyO", "PcxN", "ExK", "EkeN", "EcoD", "EctR", "EctE", "EkpT", "EkeX", "EczE", "EkyO", "EcxN", "ZaK", "ZkeN", "ZcoD", "ZctR", "ZctE", "ZkpT", "ZkeX", "ZczE", "ZkyO", "ZcxN", "YoK", "YkeN", "YcoD", "YctR", "YctE", "YkpT", "YkeX", "YczE", "YkyO", "YcxN", "NeK", "NkeN", "NcoD", "NctR", "NctE", "NkpT", "NkeX", "NczE", "NkyO", "NcxN"], ["", "Ho", "Do", "To", "Tr", "Po", "Ex", "Zo", "Yo", "No"]],
          // layer3[0] is the layer3 entries below 100, layer3[1] is the layer3 entries below 100 when they come after a multiple of 100, and layer3[2] is the multiples of 100
          prefixearly3: ["", "", "D", "T", "Tr", "P", "Ex", "Z", "Y", "N", "DK", "HN", "DoK", "TrD", "TeD", "PeD", "ExD", "ZeD", "YoD", "NeD"],
          early4: ["", "KaL", "MeJ", "GiJ", "AsT", "LuN", "FrM", "JoV", "SoL", "BeT", "GaX", "GlO", "SuP", "VrS", "MlT"]
        };else this.prefixes = {
          // MathCookie's Standard
          early1: ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
          // Below a decillion
          layer1: [["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], ["", "Cn", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]],
          // Ones, tens, and hundreds prefixes on layer 1
          early2: ["", "Ml", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"],
          // First 19 on layer 2
          layer2: [["", "Me", "Du", "To", "Tt", "Pn", "Hx", "Hp", "Ot", "En", "Vc", "Mec", "Duc", "Tec", "Ttc", "Pnc", "Hxc", "Hpc", "Otc", "Enc"], ["", "Qc", "Ic", "Ta", "Te", "Pe", "He", "Ht", "Oa", "Ea"], ["", "Hc", "Dh", "Th", "Tth", "Ph", "Hxh", "Hph", "Oh", "Eh"]],
          // Ones, tens, and hundreds on layer 2. 11 through 19 use their ones entry, but higher numbers go back to ones + tens
          early3: ["", "Ki", "Mg", "Gg", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"],
          // First 19 on layer 3
          layer3: [["", "Hd", "Di", "Ti", "Tr", "Pt", "Ex", "Zt", "Yt", "Xe", "Da", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"], ["", "Da", "Ik", "Tak", "Tek", "Pk", "Ek", "Zk", "Yk", "Nk"], ["", "Ho", "Bo", "Tro", "Tot", "Po", "Eo", "Zo", "Yo", "Nt"]],
          // Ones, tens, and hundreds on layer 3. Behaves the same as layer 2
          prefixearly3: ["", "", "Dl", "Ta", "Tl", "Pl", "El", "Zl", "Yl", "Nl", "Qt", "Hd", "Dok", "Tad", "Ted", "Pd", "Ed", "Zd", "Yd", "Nd"],
          // When layer 3 entries below 20 are used as a prefix on a layer 4 entry rather than standing on their own, these are used. The usual layer3 entries are used above 20.
          early4: ["", "Ka", "Mj", "Gj", "As", "Lu", "Fr", "Jv", "Sl", "Bt", "Gx", "Go", "Sp", "Vs", "Mu"] // Layer 4; the illions run out after Mu
        };
      }
    }, {
      key: "entriesLimit",
      get: function get() {
        return this._entriesLimit;
      },
      set: function set(entriesLimit) {
        if (entriesLimit <= 0) throw new RangeError("Non-positive entriesLimit in Standard Notation");
        this._entriesLimit = entriesLimit;
      }
    }, {
      key: "charLimit",
      get: function get() {
        return this._charLimit;
      },
      set: function set(charLimit) {
        if (charLimit <= 0) throw new RangeError("Non-positive charLimit in Standard Notation");
        this._charLimit = charLimit;
      }
    }]);
  }(Notation);

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
  var LettersNotation = /*#__PURE__*/function (_Notation) {
    function LettersNotation() {
      var _this;
      var letters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [lowercaseAlphabet, uppercaseAlphabet, ["@"]];
      var negaLetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
      var max_letters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 12;
      var between = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
      var separator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
      var hyperseparator = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
      var alwaysHyperseparate = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var innerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var lettersOrder = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
      var reverseLetters = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;
      var mantissaAfter = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : false;
      var divisionChar = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : ["/", ""];
      var specialLetters = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : [[], [], []];
      var fixedLetters = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : [[], [], []];
      var concatenation = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : [null, null, null];
      _classCallCheck(this, LettersNotation);
      _this = _callSuper(this, LettersNotation);
      _this._letters = [lowercaseAlphabet, uppercaseAlphabet, ["@"]];
      _this._negaLetters = [-1, -1, -1];
      _this.rounding = Decimal__default["default"].dZero;
      _this._base = new Decimal__default["default"](1000);
      _this._max_letters = 12;
      _this.between = "";
      _this.separator = "";
      _this.hyperseparator = "";
      _this.alwaysHyperseparate = false;
      _this.innerNotation = new DefaultNotation();
      _this.lettersOrder = 0;
      _this.reverseLetters = false;
      _this.mantissaAfter = false;
      _this.divisionChar = ["/", ""];
      _this.specialLetters = [[], [], []];
      _this.fixedLetters = [[], [], []];
      _this.concatenation = [null, null, null];
      _this.name = "Letters Notation";
      _this.letters = letters;
      _this.negaLetters = negaLetters;
      _this.rounding = rounding;
      _this.base = base;
      _this.max_letters = max_letters;
      _this.between = between;
      _this.separator = separator;
      _this.hyperseparator = hyperseparator;
      _this.alwaysHyperseparate = alwaysHyperseparate;
      _this.innerNotation = innerNotation;
      _this.lettersOrder = lettersOrder;
      _this.reverseLetters = reverseLetters;
      _this.mantissaAfter = mantissaAfter;
      _this.divisionChar = divisionChar;
      _this.specialLetters = specialLetters;
      _this.fixedLetters = fixedLetters;
      _this.concatenation = concatenation;
      return _this;
    }
    _inherits(LettersNotation, _Notation);
    return _createClass(LettersNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.innerNotation.format(0);
        var result = "";
        var negExp = false;
        if (value.lt(1)) {
          negExp = true;
          var _scientifify = scientifify(value, this._base),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            m = _scientifify2[0],
            e = _scientifify2[1];
          value = this._base.pow(e.neg()).mul(m);
        }
        var lowercaseLimit = this._max_letters + 1;
        var uppercaseLimit = this._max_letters + 1;
        if (this._letters[0].length > 1) lowercaseLimit = ((this._letters[0].length - this._negaLetters[0] - 1) * Math.pow(this._letters[0].length, this._max_letters) + this._negaLetters[0]) / (this._letters[0].length - 1);
        if (this._letters[1].length > 1) uppercaseLimit = ((this._letters[1].length - this._negaLetters[1] - 1) * Math.pow(this._letters[1].length, this._max_letters) + this._negaLetters[1]) / (this._letters[1].length - 1);
        var _ref = [Decimal__default["default"].dZero, Decimal__default["default"].dZero],
          mantissa = _ref[0],
          letter = _ref[1];
        var uppercaseLetter = Decimal__default["default"].dZero;
        var thirdLetter = Decimal__default["default"].dNegOne;
        do {
          thirdLetter = thirdLetter.plus(1);
          if (thirdLetter.gt(0)) {
            if (this._letters[0].length == 1) uppercaseLetter = uppercaseLetter.plus(value.slog(this._base));else {
              if (value.gte(Decimal__default["default"].iteratedexp(10, 4, this._base))) {
                var uppercaseLetterAddition = value.slog(10, 100, true).sub(this._base.slog(10, 100, true)).sub(4).div(2).floor().plus(1);
                value = uppercaseLetterAddition.gte(4.5e15) ? Decimal__default["default"].dOne : value.iteratedlog(10, uppercaseLetterAddition.mul(2).toNumber(), true);
                uppercaseLetter = uppercaseLetter.plus(uppercaseLetterAddition);
              }
              while (value.gte(this._base.pow(lowercaseLimit))) {
                uppercaseLetter = uppercaseLetter.plus(1);
                value = value.log(this._base).mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
              }
              uppercaseLetter = uppercaseLetter.plus(value.log(this._base));
            }
            if (this._letters[1].length == 1) value = uppercaseLetter;else value = uppercaseLetter.log(this._letters[1].length).plus(1);
            uppercaseLetter = Decimal__default["default"].dZero;
          }
          if (this._letters[0].length == 1) {
            if (value.gte(this._base.pow(lowercaseLimit))) {
              uppercaseLetter = value.slog(this._base).sub(new Decimal__default["default"](lowercaseLimit).slog(this._base)).floor();
              value = uppercaseLetter.gte(9e15) ? Decimal__default["default"].dOne : value.iteratedlog(this._base, uppercaseLetter.toNumber(), true);
            }
          } else {
            if (value.gte(Decimal__default["default"].iteratedexp(10, 4, this._base))) {
              uppercaseLetter = value.slog(10, 100, true).sub(this._base.slog(10, 100, true)).sub(4).div(2).floor().plus(1);
              value = uppercaseLetter.gte(4.5e15) ? Decimal__default["default"].dOne : value.iteratedlog(10, uppercaseLetter.mul(2).toNumber(), true);
            }
            while (value.gte(this._base.pow(lowercaseLimit))) {
              uppercaseLetter = uppercaseLetter.plus(1);
              value = value.log(this._base).mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
            }
          }
          if (uppercaseLetter.lt(uppercaseLimit)) {
            var _scientifify3 = scientifify(value, this._base, this.rounding);
            var _scientifify4 = _slicedToArray(_scientifify3, 2);
            mantissa = _scientifify4[0];
            letter = _scientifify4[1];
            if (letter.gte(lowercaseLimit)) {
              uppercaseLetter = uppercaseLetter.plus(1);
              if (this._letters[0].length == 1) value = value.log(this._base);else value = value.log(this._base).mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
              var _scientifify5 = scientifify(value, this._base, this.rounding);
              var _scientifify6 = _slicedToArray(_scientifify5, 2);
              mantissa = _scientifify6[0];
              letter = _scientifify6[1];
            }
          }
        } while (uppercaseLetter.gte(uppercaseLimit));
        var resultArray = [];
        var mantissaStr = this.innerNotation.format(mantissa);
        if (negExp) result += this.divisionChar;
        var fixedLettersIndices = [this.fixedLetters[0].map(function (value) {
          return value[0];
        }).indexOf(letter.toNumber()), this.fixedLetters[1].map(function (value) {
          return value[0];
        }).indexOf(uppercaseLetter.toNumber()), this.fixedLetters[2].map(function (value) {
          return value[0];
        }).indexOf(thirdLetter.toNumber())];
        if (thirdLetter.toNumber() == 0) resultArray.push("");else if (fixedLettersIndices[2] != -1) resultArray.push(this.fixedLetters[2][fixedLettersIndices[2]][1]);else resultArray.push(BaseConvert(thirdLetter.toNumber(), this._letters[2], 0, 0, this._negaLetters[2], 0, -1, this.reverseLetters, 1, [this.separator], undefined, undefined, undefined, this.specialLetters[2], this.concatenation[2]));
        if (uppercaseLetter.toNumber() == 0) resultArray.push("");else if (fixedLettersIndices[1] != -1) resultArray.push(this.fixedLetters[1][fixedLettersIndices[1]][1]);else resultArray.push(BaseConvert(uppercaseLetter.toNumber(), this._letters[1], 0, 0, this._negaLetters[1], 0, -1, this.reverseLetters, 1, [this.separator], undefined, undefined, undefined, this.specialLetters[1], this.concatenation[1]));
        if (letter.toNumber() == 0) resultArray.push("");else if (fixedLettersIndices[0] != -1) resultArray.push(this.fixedLetters[0][fixedLettersIndices[0]][1]);else resultArray.push(BaseConvert(letter.toNumber(), this._letters[0], 0, 0, this._negaLetters[0], 0, -1, this.reverseLetters, 1, [this.separator], undefined, undefined, undefined, this.specialLetters[0], this.concatenation[0]));
        var orderArray = [2];
        orderArray.splice(this.lettersOrder % 2, 0, 1);
        orderArray.splice(Math.floor(this.lettersOrder / 2) % 3, 0, 0);
        var lettersStr = "";
        while (!resultArray[orderArray[0]] && orderArray.length > 0) {
          orderArray.shift();
        }
        while (orderArray.length > 0) {
          lettersStr += resultArray[orderArray[0]];
          var visible = !!resultArray[orderArray[0]];
          orderArray.shift();
          var addAHyperseparator = false;
          for (var o = 0; o < orderArray.length; o++) {
            if (resultArray[orderArray[o]]) addAHyperseparator = true;
          }
          if (orderArray.length != 0 && (this.alwaysHyperseparate || visible && addAHyperseparator)) lettersStr += this.hyperseparator;
        }
        if (negExp) lettersStr = this.divisionChar[0] + lettersStr + this.divisionChar[1];
        if (this.mantissaAfter) result = lettersStr + this.between + mantissaStr;else result = mantissaStr + this.between + lettersStr;
        return result;
      }
    }, {
      key: "letters",
      get: function get() {
        return this._letters;
      },
      set: function set(letters) {
        if (letters[0].length == 0 || letters[1].length == 0 || letters[2].length == 0) throw new Error("Empty letters array in Letters Notation");
        this._letters = letters;
      }
    }, {
      key: "negaLetters",
      get: function get() {
        return this._negaLetters;
      },
      set: function set(negaLetters) {
        if (!Array.isArray(negaLetters)) negaLetters = [negaLetters, negaLetters, negaLetters];
        this._negaLetters = negaLetters;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.lte(1)) throw new RangeError("Base <= 1 in Letters notation");
        this._base = baseD;
      }
    }, {
      key: "max_letters",
      get: function get() {
        return this._max_letters;
      },
      set: function set(max_letters) {
        if (max_letters <= 0) throw new RangeError("Nonpositive max letters in Letters notation");
        this._max_letters = max_letters;
      }
    }]);
  }(Notation);

  /**
   * Scientific notation, but with tetration instead of exponentiation. Abbreviates 9 as "9F0", 1,000 as "3F1", and 10^10^10^10 as "1F4".
   * @param maxnum ( Decimal ) Only exponents below this value are allowed - anything higher and the exponent itself is abbreviated in hyperscientific notation. Default is 1e10.
   * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 2 to just be abbreviated as "2" instead of "2F0". Default is false.
   * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is true.
   * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
   * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var HyperscientificNotation = /*#__PURE__*/function (_Notation) {
    function HyperscientificNotation() {
      var _this;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e10;
      var max_Fs_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var mantissaPower = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var iteration_zero = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var base = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 10;
      var expChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [["F", ""], ["F", ""], ["(F^", ")"]];
      var negExpChars = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      var expBefore = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var superexpAfter = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      var formatNegatives = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
      var expMult = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 1;
      var hyperexpMult = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 1;
      var mantissaInnerNotation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : exponentInnerNotation;
      _classCallCheck(this, HyperscientificNotation);
      _this = _callSuper(this, HyperscientificNotation);
      _this._maxnum = new Decimal__default["default"](1e10);
      _this.max_Fs_in_a_row = 5;
      _this.rounding = Decimal__default["default"].dZero;
      _this._engineerings = [Decimal__default["default"].dOne];
      _this._mantissaPower = Decimal__default["default"].dZero;
      _this.iteration_zero = false;
      _this._base = Decimal__default["default"].dTen;
      _this._expChars = [["F", ""], ["F", ""], ["(F^", ")"]];
      _this.negExpChars = null;
      _this.expBefore = false;
      _this.superexpAfter = false;
      _this.formatNegatives = true;
      _this._expMult = Decimal__default["default"].dOne;
      _this._hyperexpMult = Decimal__default["default"].dOne;
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = _this.mantissaInnerNotation;
      _this.superexponentInnerNotation = _this.exponentInnerNotation;
      _this.name = "Hyperscientific Notation";
      _this.maxnum = maxnum;
      _this.max_Fs_in_a_row = max_Fs_in_a_row;
      _this.rounding = rounding;
      _this.engineerings = engineerings;
      _this.mantissaPower = mantissaPower;
      _this.iteration_zero = iteration_zero;
      _this._base = toDecimal(base);
      _this.expBefore = expBefore;
      _this.superexpAfter = superexpAfter;
      _this.formatNegatives = formatNegatives;
      _this.expMult = expMult;
      _this.hyperexpMult = hyperexpMult;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.unconvertedExpChars = expChars;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(HyperscientificNotation, _Notation);
    return _createClass(HyperscientificNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && !this.formatNegatives ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (this.iteration_zero && value.lt(this._maxnum) && value.gt(this._maxnum.recip())) return this.mantissaInnerNotation.format(value);
        var result = "";
        if (value.lt(iteratedexpmult(this._base, 1, this._maxnum.toNumber(), this._expMult))) {
          var _hyperscientifify = hyperscientifify(value, this._base, this.rounding, this._mantissaPower, this._engineerings, this._expMult, this._hyperexpMult),
            _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
            mantissa = _hyperscientifify2[0],
            exponent = _hyperscientifify2[1];
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (exponent.lt(0) && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent = exponent.neg();
          }
          var mantissaStr = this.mantissaInnerNotation.format(mantissa);
          var exponentStr = this.exponentInnerNotation.format(exponent);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;else result = mantissaStr + beforeChar + exponentStr + afterChar;
        } else {
          if (value.lt(1) && this.negExpChars !== null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          var added_Fs = 0;
          while (value.gte(iteratedexpmult(this._base, 1, this._maxnum.toNumber(), this._expMult))) {
            added_Fs++;
            value = multslog(value, this._base, this._expMult).mul(this._hyperexpMult);
          }
          result = this.format(value);
          if (added_Fs <= this.max_Fs_in_a_row) {
            result = this._expChars[1][0] + result + this._expChars[1][1];
          } else {
            var FStr = this.superexponentInnerNotation.format(added_Fs);
            FStr = this._expChars[2][0] + FStr + this._expChars[2][1];
            if (this.superexpAfter) result = result + FStr;else result = FStr + result;
          }
        }
        return result;
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Hyperscientific Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Notation");
        this._base = baseD;
      }
    }, {
      key: "mantissaPower",
      get: function get() {
        return this._mantissaPower;
      },
      set: function set(mantissaPower) {
        var mantissaPowerD = toDecimal(mantissaPower);
        if (mantissaPowerD.lt(-2)) throw new RangeError("mantissaPower below -2 in Hyperscientific Notation");
        this._mantissaPower = mantissaPowerD;
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Notation");
        this._expMult = expMultD;
      }
    }, {
      key: "hyperexpMult",
      get: function get() {
        return this._hyperexpMult;
      },
      set: function set(hyperexpMult) {
        var hyperexpMultD = toDecimal(hyperexpMult);
        if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
        this._hyperexpMult = hyperexpMultD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.mantissaInnerNotation.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);
  /**
   * This notation performs hyperscientific notation a certain number of times. 1 iteration means the number is in the form AFB (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form AFBFC, and so on.
   * @param iterations ( number ! ) The amount of iterations.
   * @param max_Fs_in_a_row ( number ) If the hyperscientific representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed hyperexponent values: if it's three then the hyperexponent will always be a multiple of 3, like in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted hyperexponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular hyperscientific notation.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^^2, if mantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F3" would become "100F2" with 1 mantissaPower and "(1e100)F1" with 2 mantissaPower.
   * @param base ( Decimal ) Hyperscientific notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "2F1".
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the hyperexponent, the second entry goes after the hyperexponent. expChars[0] takes the place of the F in "1F10", expChars[1] takes the place of the first F in "F1F10", and expChars[2] takes the place of the (F^) in (F^10)4. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [["F", ""], ["F", ""], ["(F^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in hyperscientific directly. Default is false.
   * @param expMult ( Decimal ) On each single exponentiation in the tetration, the exponent is multiplied by this value. Default is 1.
   * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest hyperexponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var HyperscientificIterationsNotation = /*#__PURE__*/function (_Notation2) {
    function HyperscientificIterationsNotation(iterations) {
      var _this2;
      var max_Fs_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var mantissaPower = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var base = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 10;
      var expChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["F", ""], ["F", ""], ["(F^", ")"]];
      var negExpChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var expBefore = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var superexpAfter = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var formatNegatives = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      var expMult = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 1;
      var hyperexpMult = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 1;
      var mantissaInnerNotation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : exponentInnerNotation;
      _classCallCheck(this, HyperscientificIterationsNotation);
      _this2 = _callSuper(this, HyperscientificIterationsNotation);
      _this2.max_Fs_in_a_row = 5;
      _this2.rounding = Decimal__default["default"].dZero;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.mantissaPower = Decimal__default["default"].dZero;
      _this2._base = Decimal__default["default"].dTen;
      _this2._expChars = [["F", ""], ["F", ""], ["(F^", ")"]];
      _this2.negExpChars = null;
      _this2.expBefore = false;
      _this2.superexpAfter = false;
      _this2.formatNegatives = false;
      _this2._expMult = Decimal__default["default"].dOne;
      _this2._hyperexpMult = Decimal__default["default"].dOne;
      _this2.mantissaInnerNotation = new DefaultNotation();
      _this2.exponentInnerNotation = _this2.mantissaInnerNotation;
      _this2.superexponentInnerNotation = _this2.exponentInnerNotation;
      _this2.name = "Hyperscientific Iterations Notation";
      _this2.iterations = iterations;
      _this2.max_Fs_in_a_row = max_Fs_in_a_row;
      _this2.rounding = rounding;
      _this2.engineerings = engineerings;
      _this2.mantissaPower = toDecimal(mantissaPower);
      _this2._base = toDecimal(base);
      _this2.expBefore = expBefore;
      _this2.superexpAfter = superexpAfter;
      _this2.formatNegatives = formatNegatives;
      _this2.expMult = expMult;
      _this2.hyperexpMult = hyperexpMult;
      _this2.mantissaInnerNotation = mantissaInnerNotation;
      _this2.exponentInnerNotation = exponentInnerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.unconvertedExpChars = expChars;
      _this2.expChars = expChars;
      _this2.negExpChars = negExpChars;
      return _this2;
    }
    _inherits(HyperscientificIterationsNotation, _Notation2);
    return _createClass(HyperscientificIterationsNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && !this.formatNegatives ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
        var iterations = this._iterations;
        var result = "";
        var added_Fs = 0;
        while (value.gt(Decimal__default["default"].tetrate(10, Number.MAX_SAFE_INTEGER, 1, true)) && added_Fs < iterations) {
          added_Fs++;
          value = multslog(value, this._base, this._expMult).mul(this._hyperexpMult);
        }
        var sciArray = [value];
        for (var i = 0; i < iterations - added_Fs; i++) {
          if (sciArray[sciArray.length - 1].lte(0) && !this.formatNegatives) break;
          var _hyperscientifify3 = hyperscientifify(sciArray[sciArray.length - 1], this._base, this.rounding, this.mantissaPower, this._engineerings, this._expMult, this._hyperexpMult),
            _hyperscientifify4 = _slicedToArray(_hyperscientifify3, 2),
            mantissa = _hyperscientifify4[0],
            exponent = _hyperscientifify4[1];
          sciArray.pop();
          sciArray.push(mantissa, exponent);
        }
        var endings = sciArray.length - 1;
        var beforeChar = this._expChars[0][0];
        var afterChar = this._expChars[0][1];
        while (sciArray.length > 0) {
          var numStr = "";
          var toFormat = sciArray[0];
          if (this.negExpChars !== null && typeof this.negExpChars[0] !== "boolean" && toFormat.lt(0)) {
            toFormat = toFormat.neg();
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
          }
          if (sciArray.length == 1) numStr = this.exponentInnerNotation.format(toFormat);else numStr = this.mantissaInnerNotation.format(toFormat);
          if (this.expBefore) {
            if (sciArray.length <= endings) result = afterChar + result;
            result = numStr + result;
            sciArray.shift();
          } else {
            if (sciArray.length <= endings) result += beforeChar;
            result += numStr;
            sciArray.shift();
          }
          beforeChar = this._expChars[0][0];
          afterChar = this._expChars[0][1];
        }
        for (var e = 0; e < endings; e++) {
          if (this.expBefore) result = beforeChar + result;else result += afterChar;
        }
        if (added_Fs <= this.max_Fs_in_a_row) {
          for (var _i = 0; _i < added_Fs; _i++) result = this._expChars[1][0] + result + this._expChars[1][1];
        } else {
          var FStr = this.superexponentInnerNotation.format(added_Fs);
          FStr = this._expChars[2][0] + FStr + this._expChars[2][1];
          if (this.superexpAfter) result = result + FStr;else result = FStr + result;
        }
        return result;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Hyperscientific Iterations Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Iterations Notation");
        this._base = baseD;
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyperscientific Iterations Notation");
        this._expMult = expMultD;
      }
    }, {
      key: "hyperexpMult",
      get: function get() {
        return this._hyperexpMult;
      },
      set: function set(hyperexpMult) {
        var hyperexpMultD = toDecimal(hyperexpMult);
        if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
        this._hyperexpMult = hyperexpMultD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.mantissaInnerNotation.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates numbers in terms of their super-logarithm, so 10 is "F1" and 10^10^10 is "F3". Uses the linear approximation of tetration.
   * @param iterations ( number ) The amount of logarithm iterations: 1 is basic Super-Logarithm notation, 2 is double Super-Logarithm, and so on. This can be negative: with -1 iterations, 2 would be "slg10,000,000,000".
   * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
   * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
   * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
   * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
   * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
   * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
   * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
   * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
   * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var SuperLogarithmNotation = /*#__PURE__*/function (_Notation) {
    function SuperLogarithmNotation() {
      var _this;
      var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var max_Fs_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var expChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["F", ""], ["F", ""], ["(F^", ")"]];
      var logChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["slg", ""], ["slg", ""], ["(slg^", ")"]];
      var superexpAfter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var baseShown = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var formatNegatives = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var expMult = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var hyperexpMult = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
      var innerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : innerNotation;
      var baseInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : innerNotation;
      _classCallCheck(this, SuperLogarithmNotation);
      _this = _callSuper(this, SuperLogarithmNotation);
      _this._iterations = 1;
      _this.max_Fs_in_a_row = 5;
      _this._base = Decimal__default["default"].dTen;
      _this.expChars = [["F", ""], ["F", ""], ["(F^", ")"]];
      _this.logChars = [["slg", ""], ["slg", ""], ["(slg^", ")"]];
      _this.superexpAfter = false;
      _this.baseShown = 0;
      _this.formatNegatives = false;
      _this._expMult = Decimal__default["default"].dOne;
      _this._hyperexpMult = Decimal__default["default"].dOne;
      _this.innerNotation = new DefaultNotation();
      _this.superexponentInnerNotation = _this.innerNotation;
      _this.baseInnerNotation = _this.innerNotation;
      _this.name = "Super Logarithm Notation";
      _this.iterations = iterations;
      _this.max_Fs_in_a_row = max_Fs_in_a_row;
      _this._base = toDecimal(base);
      _this.expChars = expChars;
      _this.logChars = logChars;
      _this.superexpAfter = superexpAfter;
      _this.baseShown = baseShown;
      _this.formatNegatives = formatNegatives;
      _this.expMult = expMult;
      _this.hyperexpMult = hyperexpMult;
      _this.innerNotation = innerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.baseInnerNotation = baseInnerNotation;
      return _this;
    }
    _inherits(SuperLogarithmNotation, _Notation);
    return _createClass(SuperLogarithmNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && !this.formatNegatives ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var result = "";
        var iterations = this._iterations;
        if (iterations < 0) for (var i = 0; i < -iterations; i++) value = iteratedexpmult(this._base, 1, value.div(this._hyperexpMult).toNumber(), this._expMult);else for (var _i = 0; _i < iterations; _i++) value = multslog(value, this._base, this._expMult).mul(this._hyperexpMult);
        var usedChars = this.expChars;
        if (iterations < 0 && this.logChars != null) {
          usedChars = this.logChars;
          iterations *= -1;
        }
        var baseStr = "";
        if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
        result = this.innerNotation.format(value);
        if (iterations >= 0 && iterations <= this.max_Fs_in_a_row && iterations % 1 == 0) {
          for (var _i2 = 0; _i2 < iterations; _i2++) {
            var eChar = usedChars[_i2 == 0 ? 0 : 1][0];
            var afterChar = usedChars[_i2 == 0 ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
          }
        } else {
          var _eChar = usedChars[2][0];
          var _afterChar = usedChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = _eChar + eStr + _afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
        }
        return result;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Super Logarithm Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Super Logarithm Notation");
        this._base = baseD;
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Super Logarithm Notation");
        this._expMult = expMultD;
      }
    }, {
      key: "hyperexpMult",
      get: function get() {
        return this._hyperexpMult;
      },
      set: function set(hyperexpMult) {
        var hyperexpMultD = toDecimal(hyperexpMult);
        if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
        this._hyperexpMult = hyperexpMultD;
      }
    }]);
  }(Notation);
  /**
   * A variant of super-logarithm notation that uses a different amount of super-logarithm iterations depending on how large the number is.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
   * @param max_Fs_in_a_row ( number ) If the super-logarithm representation would have more F's at the beginning than this, those F's are made into an F^n expression. Default is 5.
   * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
   * @param base ( Decimal ) This notation normally works in tetra-powers of 10, but you can change this value to change that. Default is 10. For example, set this to 9, and 81 becomes "F1.315".
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param expChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate logarithm notation. In each pair, the first entry goes before the number, the second entry goes after the number. expChars[0] takes the place of the F in "F10", expChars[1] takes the place of the first F in "FF10" (expChars[0] is for the innermost logarithm, expChars[1] is for the outer ones), and expChars[2] takes the place of the (F^) in (F^10)4. Default is [["F", ""], ["F", ""], ["(F^", ")"]].
   * @param logChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of expChars used for a logarithm of negative iterations. Default is [["slg", ""], ["slg", ""], ["(slg^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of expChars[2], such as F^-1.
   * @param superexpAfter ( boolean ) This is false by default; if it's true, an (F^n) expression comes after the number instead of before.
   * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
   * @param formatNegatives ( boolean ) If this parameter is false, negative numbers are just formatted using their absolute value with negativeString around it, like in most notations. If this parameter is true, negative numbers are formatted in super-logarithm notation directly. Default is false.
   * @param expMult ( Decimal ) On each logarithm iteration within the super-logarithm, the result is multiplied by this number. Default is 1.
   * @param hyperexpMult ( Decimal ) On each super-logarithm iteration within, the result is multiplied by this number. Default is 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (F^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var MultiSuperLogarithmNotation = /*#__PURE__*/function (_Notation2) {
    function MultiSuperLogarithmNotation() {
      var _this2;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e10;
      var max_Fs_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var minIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
      var engineerings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var expChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [["F", ""], ["F", ""], ["(F^", ")"]];
      var logChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["slg", ""], ["slg", ""], ["(slg^", ")"]];
      var superexpAfter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var baseShown = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      var formatNegatives = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var expMult = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      var hyperexpMult = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 1;
      var innerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : innerNotation;
      var baseInnerNotation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : innerNotation;
      _classCallCheck(this, MultiSuperLogarithmNotation);
      _this2 = _callSuper(this, MultiSuperLogarithmNotation);
      _this2._maxnum = new Decimal__default["default"](1e10);
      _this2.max_Fs_in_a_row = 5;
      _this2.minIterations = 1;
      _this2._base = Decimal__default["default"].dTen;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.expChars = [["F", ""], ["F", ""], ["(F^", ")"]];
      _this2.logChars = [["slg", ""], ["slg", ""], ["(slg^", ")"]];
      _this2.superexpAfter = false;
      _this2.baseShown = 0;
      _this2.formatNegatives = false;
      _this2._expMult = Decimal__default["default"].dOne;
      _this2._hyperexpMult = Decimal__default["default"].dOne;
      _this2.innerNotation = new DefaultNotation();
      _this2.superexponentInnerNotation = _this2.innerNotation;
      _this2.baseInnerNotation = _this2.innerNotation;
      _this2.name = "Multi-Super Logarithm Notation";
      _this2.maxnum = maxnum;
      _this2.max_Fs_in_a_row = max_Fs_in_a_row;
      _this2.minIterations = minIterations;
      _this2._base = toDecimal(base);
      _this2.engineerings = engineerings;
      _this2.expChars = expChars;
      _this2.logChars = logChars;
      _this2.superexpAfter = superexpAfter;
      _this2.baseShown = baseShown;
      _this2.formatNegatives = formatNegatives;
      _this2.expMult = expMult;
      _this2.hyperexpMult = hyperexpMult;
      _this2.innerNotation = innerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.baseInnerNotation = baseInnerNotation;
      return _this2;
    }
    _inherits(MultiSuperLogarithmNotation, _Notation2);
    return _createClass(MultiSuperLogarithmNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && !this.formatNegatives ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var iterations = 0;
        var currentValue = toDecimal(value);
        if (this.minIterations < 0) while (iterations > this.minIterations) {
          iterations--;
          currentValue = iteratedexpmult(this._base, 1, currentValue.div(this._hyperexpMult).toNumber(), this._expMult);
        } else while (iterations < this.minIterations) {
          iterations++;
          currentValue = multslog(currentValue, this._base, this._expMult).mul(this._hyperexpMult);
        }
        while (currentValue.gte(this._maxnum)) {
          var currentiterations = iterations;
          iterations = nextEngineeringValue(new Decimal__default["default"](iterations), this._engineerings).toNumber();
          for (var i = currentiterations; i < iterations; i++) currentValue = multslog(currentValue, this._base, this._expMult).mul(this._hyperexpMult);
        }
        return new SuperLogarithmNotation(iterations, this.max_Fs_in_a_row, this._base, this.expChars, this.logChars, this.superexpAfter, this.baseShown, this.formatNegatives, this._expMult, this._hyperexpMult, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Multi-Super Logarithm Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Super Logarithm Notation");
        this._base = baseD;
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._base.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Multi-Super Logarithm Notation");
        this._expMult = expMultD;
      }
    }, {
      key: "hyperexpMult",
      get: function get() {
        return this._hyperexpMult;
      },
      set: function set(hyperexpMult) {
        var hyperexpMultD = toDecimal(hyperexpMult);
        if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
        this._hyperexpMult = hyperexpMultD;
      }
    }]);
  }(Notation);

  /**
   * The progression of this notation is similar to Default notation: unabbreviated, then scientific, then hyperscientific. However, this notation is not itself a default: instead, it lets you customize the process.
   * @param maxnum ( Decimal ) The point at which the notation switches to scientific. Default is 1e12.
   * @param minnum ( Decimal ) The point below 1 at which the notation switches to scientific with a negative exponent. Default is 1e-6.
   * @param max_es_in_a_row ( number ) If the scientific representation would have more e's than this, switches to F notation. Default is 5.
   * @param logBase ( Decimal ) The base of the scientific notation. Default is 10.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and the base, which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are base and base^2, if mantissaPower is 2 then the bounds are base^2 and base^3, and so on. For example, a number normally represented as "2.357e224" would become "23.57e223" with 1 mantissaPower and "235.7e222" with 2 mantissaPower.
   * @param hypermantissaPower ( Decimal ) Normally, the mantissa in hyperscientific notation is bounded by 1 and the base, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are base and base^^2, if hypermantissaPower is 2 then the bounds are base^^2 and base^^3, and so on. For example, a number normally represented as "2F8" would become "100F7" with 1 hypermantissaPower and "(1e100)F6" with 2 hypermantissaPower.
   * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed exponent values: if it's three then the exponent will always be a multiple of 3, as in engineering notation. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted exponent values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0). Default is 1, which corresponds to regular scientific notation.
   * @param hyperengineerings ( Decimal | DecimalSource[] ) Same as engineerings, but for the hyperexponent instead.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string], [string | boolean, string | boolean]] ) An array of four pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the e in "1e10", expChars[1] takes the place of the first e in "e1e10", expChars[2] takes the place of the F in "1F10", and expChars[3] takes the place of the F in "F1e10". If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way this notation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it), expChars[3][0] (expChars[2][0] with a 1 on it), and expChars[3][1] (expChars[2][1] with a 1 on it). Default is [["e", ""], ["e", ""], ["F", ""], ["F", ""]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param hyperexpBefore ( boolean ) If this parameter is true, the hyperexponent comes before the mantissa instead of after. Default is false.
   * @param expMult ( Decimal ) Each exponentiation in the process is multiplied by this value. Default is 1.
   * @param hyperexpMult ( Decimal ) Each hyperexponent in the process is multiplied by this value. Default is 1.
   * @param mantissaInnerNotation ( Notation ) The notation that the mantissa is itself notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the exponent is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param hyperexpFormat ( [boolean, boolean] ) A pair of booleans that determines whether the numbers in a hyperscientific expression are notated using ExpandedDefaultNotation itself rather than the innerNotations. The first entry is for the mantissa, the second is for the hyperexponent. This only applies to "xFy" expressions; "Fx" expressions (where x is over the maxnum) always formats x in ExpandedDefaultNotation itself. Default is [false, false].
   */
  var ExpandedDefaultNotation = /*#__PURE__*/function (_Notation) {
    function ExpandedDefaultNotation() {
      var _this;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Decimal__default["default"](1e12);
      var minnum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Decimal__default["default"](1e-6);
      var max_es_in_a_row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var logBase = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Decimal__default["default"].dTen;
      var rounding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Decimal__default["default"].dZero;
      var mantissaPower = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Decimal__default["default"].dZero;
      var hypermantissaPower = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Decimal__default["default"].dZero;
      var engineerings = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [Decimal__default["default"].dOne];
      var hyperengineerings = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [Decimal__default["default"].dOne];
      var expChars = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [["e", ""], ["e", ""], ["F", ""], ["F", ""]];
      var negExpChars = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
      var expBefore = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : false;
      var hyperexpBefore = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : false;
      var expMult = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : Decimal__default["default"].dOne;
      var hyperexpMult = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : Decimal__default["default"].dOne;
      var mantissaInnerNotation = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : mantissaInnerNotation;
      var hyperexpFormat = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : [false, false];
      _classCallCheck(this, ExpandedDefaultNotation);
      _this = _callSuper(this, ExpandedDefaultNotation);
      _this._maxnum = new Decimal__default["default"](1e12);
      _this._minnum = new Decimal__default["default"](1e-6);
      _this.max_es_in_a_row = 5;
      _this._logBase = Decimal__default["default"].dTen;
      _this.rounding = Decimal__default["default"].dZero;
      _this.mantissaPower = Decimal__default["default"].dZero;
      _this._hypermantissaPower = Decimal__default["default"].dZero;
      _this._engineerings = [Decimal__default["default"].dOne];
      _this._hyperengineerings = [Decimal__default["default"].dOne];
      _this._expChars = [["e", ""], ["e", ""], ["F", ""], ["F", ""]];
      _this.negExpChars = null;
      _this.expBefore = false;
      _this.hyperexpBefore = false;
      _this._expMult = Decimal__default["default"].dOne;
      _this._hyperexpMult = Decimal__default["default"].dOne;
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = _this.mantissaInnerNotation;
      _this.hyperexpFormat = [false, false];
      _this.name = "Expanded Default Notation";
      _this._maxnum = toDecimal(maxnum);
      _this.minnum = minnum;
      _this.max_es_in_a_row = max_es_in_a_row;
      _this._logBase = toDecimal(logBase);
      _this.rounding = rounding;
      _this.mantissaPower = toDecimal(mantissaPower);
      _this.hypermantissaPower = hypermantissaPower;
      _this.engineerings = engineerings;
      _this.hyperengineerings = hyperengineerings;
      _this.expBefore = expBefore;
      _this.hyperexpBefore = hyperexpBefore;
      _this.expMult = expMult;
      _this.hyperexpMult = hyperexpMult;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      _this.hyperexpFormat = hyperexpFormat;
      _this.unconvertedExpChars = expChars;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(ExpandedDefaultNotation, _Notation);
    return _createClass(ExpandedDefaultNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0) || value.abs().gte(this._minnum) && value.abs().lt(this._maxnum)) return this.mantissaInnerNotation.format(value);
        var negative = false;
        if (value.lt(0)) {
          negative = true;
          value = value.neg();
        }
        var result = "";
        if (multabs(value.abs()).lt(iteratedexpmult(this._logBase, this._maxnum, 1, this._expMult))) {
          var _scientifify = scientifify(value, this._logBase, this.rounding, this.mantissaPower, this._engineerings, this._expMult),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            mantissa = _scientifify2[0],
            exponent = _scientifify2[1];
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (exponent.lt(0) && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent = exponent.neg();
          }
          var mantissaStr = this.mantissaInnerNotation.format(mantissa);
          var exponentStr = this.exponentInnerNotation.format(exponent);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;else result = mantissaStr + beforeChar + exponentStr + afterChar;
        } else {
          var negExp = false;
          if (value.lt(1)) {
            if (this.negExpChars != null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            negExp = true;
            var _scientifify3 = scientifify(value, 10, this.rounding),
              _scientifify4 = _slicedToArray(_scientifify3, 2),
              m = _scientifify4[0],
              e = _scientifify4[1];
            value = e.neg().pow10().mul(m);
          }
          if (value.lt(iteratedexpmult(this._logBase, this._maxnum, this.max_es_in_a_row + 1, this._expMult))) {
            var added_es = 0;
            while (value.gte(iteratedexpmult(this._logBase, this._maxnum, 1, this._expMult))) {
              added_es++;
              value = iteratedmultlog(value, this._logBase, 1, this._expMult);
            }
            if (negExp) value = value.neg();
            result = this.format(value);
            for (var _e = 0; _e < added_es; _e++) result = this._expChars[1][0] + result + this._expChars[1][1];
          } else if (value.lt(iteratedexpmult(this._logBase, 1, this._maxnum.div(this._hyperexpMult).toNumber(), this._expMult))) {
            var _hyperscientifify = hyperscientifify(value, this._logBase, this.rounding, this._hypermantissaPower, this._hyperengineerings, this._expMult, this._hyperexpMult),
              _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
              _mantissa = _hyperscientifify2[0],
              _exponent = _hyperscientifify2[1];
            if (negExp) _exponent = _exponent.neg();
            var baseStr = this.hyperexpFormat[0] ? this.format(_mantissa) : this.mantissaInnerNotation.format(_mantissa);
            var _exponentStr = this.hyperexpFormat[1] ? this.format(_exponent) : this.exponentInnerNotation.format(_exponent);
            if (this.hyperexpBefore) result = this._expChars[2][0] + _exponentStr + this._expChars[2][1] + baseStr;else result = baseStr + this._expChars[2][0] + _exponentStr + this._expChars[2][1];
          } else {
            var _exponent2 = multslog(value, this._logBase, this._expMult).mul(this._hyperexpMult);
            if (negExp) _exponent2 = _exponent2.neg();
            result = this._expChars[3][0] + this.format(_exponent2) + this._expChars[3][1];
          }
          if (negative) result = this.negativeString + result;
        }
        return result;
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(0)) throw new RangeError("Nonpositive maxnum in Expanded Default Notation");
        if (this._minnum.gte(maxnumD)) throw new RangeError("Maxnum below minnum in Expanded Default Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "minnum",
      get: function get() {
        return this._minnum;
      },
      set: function set(minnum) {
        var minnumD = toDecimal(minnum);
        if (minnumD.gte(this._maxnum)) throw new RangeError("Minnum above maxnum in Expanded Default Notation");
        this._minnum = minnumD;
      }
    }, {
      key: "logBase",
      get: function get() {
        return this._logBase;
      },
      set: function set(logBase) {
        var logBaseD = toDecimal(logBase);
        if (logBaseD.pow(this._expMult.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Expanded Default Notation");
        this._logBase = logBaseD;
      }
    }, {
      key: "hypermantissaPower",
      get: function get() {
        return this._hypermantissaPower;
      },
      set: function set(hypermantissaPower) {
        var hypermantissaPowerD = toDecimal(hypermantissaPower);
        if (hypermantissaPowerD.lt(-2)) throw new RangeError("hypermantissaPower below -2 in Hyperscientific Notation");
        this._hypermantissaPower = hypermantissaPowerD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "hyperengineerings",
      get: function get() {
        return this._hyperengineerings;
      },
      set: function set(hyperengineerings) {
        if (!Array.isArray(hyperengineerings)) hyperengineerings = [hyperengineerings];
        if (hyperengineerings.length == 0) {
          this._hyperengineerings = [Decimal__default["default"].dOne];
          return;
        }
        var hyperengineeringsD = hyperengineerings.map(toDecimal);
        this._hyperengineerings = hyperengineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "expMult",
      get: function get() {
        return this._expMult;
      },
      set: function set(expMult) {
        var expMultD = toDecimal(expMult);
        if (expMultD.eq(0)) throw new RangeError("expMult should not be zero");
        if (this._logBase.pow(expMultD.recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Expanded Default Notation");
        this._expMult = expMultD;
      }
    }, {
      key: "hyperexpMult",
      get: function get() {
        return this._hyperexpMult;
      },
      set: function set(hyperexpMult) {
        var hyperexpMultD = toDecimal(hyperexpMult);
        if (hyperexpMultD.eq(0)) throw new RangeError("hyperexpMult should not be zero");
        this._hyperexpMult = hyperexpMultD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        expChars.push(["", ""]);
        if (typeof input[3][0] == "string") expChars[3][0] = input[3][0];else if (input[3][0] === false) expChars[3][0] = one + input[2][0];else if (input[3][0] === true) expChars[3][0] = input[2][0] + one;
        if (typeof input[3][1] == "string") expChars[3][1] = input[3][1];else if (input[3][1] === false) expChars[3][1] = one + input[2][1];else if (input[3][1] === true) expChars[3][1] = input[2][1] + one;
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates a number using the SI prefixes: 1,000 is 1 k, 10^12 is 1 T, 10^30 is 1 Q, 10^33 is 1 kQ, 10^72 is 1 TQQ, 10^300 is 1 Q[10], and so on.
   * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
   * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
   * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
   * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
   * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
   * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
   * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
   * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Q[6]. Default is ["[", "]"].
   * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
   * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
   */
  var SINotation = /*#__PURE__*/function (_Notation) {
    function SINotation() {
      var _this;
      var logBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var prefixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]];
      var negaPrefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]];
      var frontToBack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var rounding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var max_in_a_row = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 4;
      var mantissaPower = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var space = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : " ";
      var separator = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "";
      var delimiters = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : ["[", "]"];
      var zero = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "";
      var mantissaInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new DefaultNotation();
      _classCallCheck(this, SINotation);
      _this = _callSuper(this, SINotation);
      _this._logBase = new Decimal__default["default"](10);
      _this.frontToBack = true;
      _this.max_in_a_row = 4;
      _this.mantissaPower = Decimal__default["default"].dZero;
      _this.space = " ";
      _this.separator = "";
      _this.delimiters = ["[", "]"];
      _this.zero = "";
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = new DefaultNotation();
      _this.name = "SI Notation";
      _this.logBase = logBase;
      _this.prefixes = prefixes;
      _this.negaPrefixes = negaPrefixes;
      _this.frontToBack = frontToBack;
      _this.rounding = rounding;
      _this.max_in_a_row = max_in_a_row;
      _this.mantissaPower = toDecimal(mantissaPower);
      _this.space = space;
      _this.separator = separator;
      _this.delimiters = delimiters;
      _this.zero = zero;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      return _this;
    }
    _inherits(SINotation, _Notation);
    return _createClass(SINotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.mantissaInnerNotation.format(0);
        var negExp = false;
        var prefixesUsed = this._prefixes;
        var _scientifify = scientifify(value, this.logBase, this.rounding, this.mantissaPower, (value.lt(1) && _typeof(this.negaPrefixes) == "object" ? this.negaPrefixes : this.prefixes).map(function (p) {
            return p[1];
          })),
          _scientifify2 = _slicedToArray(_scientifify, 2),
          mantissa = _scientifify2[0],
          exponent = _scientifify2[1];
        if (exponent.lt(0)) {
          negExp = true;
          if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
          exponent = exponent.neg();
        }
        var arr = DetailedSignValueArray(exponent, prefixesUsed);
        var result = "";
        if (arr.length == 0) result = this.zero;else {
          for (var s = 0; s < arr.length; s++) {
            var subresult = "";
            if (arr[s][1].lte(this.max_in_a_row)) for (var i = 0; i < arr[s][1].toNumber(); i++) {
              subresult += arr[s][0];
              if (i < arr[s][1].toNumber() - 1) subresult += this.separator;
            } else subresult += arr[s][0] + this.delimiters[0] + this.exponentInnerNotation.format(arr[s][1]) + this.delimiters[1];
            if (this.frontToBack) {
              result = subresult + result;
              if (s < arr.length - 1) result = this.separator + result;
            } else {
              result += subresult;
              if (s < arr.length - 1) result += this.separator;
            }
          }
        }
        if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
        result = this.mantissaInnerNotation.format(mantissa) + this.space + result;
        return result;
      }
    }, {
      key: "logBase",
      get: function get() {
        return this._logBase;
      },
      set: function set(logBase) {
        var logBaseD = toDecimal(logBase);
        if (logBaseD.lte(1)) throw new RangeError("Base <= 1 in SI notation");
        this._logBase = logBaseD;
      }
    }, {
      key: "prefixes",
      get: function get() {
        return this._prefixes;
      },
      set: function set(prefixes) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in SI Notation");
        this._prefixes = prefixes.map(function (entry) {
          return [entry[0], toDecimal(entry[1])];
        });
        this._prefixes.sort(function (a, b) {
          return Decimal__default["default"].cmp(a[1], b[1]) * -1;
        });
      }
    }, {
      key: "negaPrefixes",
      get: function get() {
        return this._negaPrefixes;
      },
      set: function set(negaPrefixes) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;else {
          this._negaPrefixes = negaPrefixes.map(function (entry) {
            return [entry[0], toDecimal(entry[1])];
          });
          this._negaPrefixes.sort(function (a, b) {
            return Decimal__default["default"].cmp(a[1], b[1]) * -1;
          });
        }
      }
    }]);
  }(Notation);
  /**
   * A variant of SINotation where the numbers in truncated expressions are themselves notated in this notation. Once the brackets are deep enough, braces are introduced to represent the number of brackets layers.
   * @param logBase ( Decimal ) The base used by the prefixes. Default is 10.
   * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an exponent on logBase (the Decimal). Default is [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]].
   * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
   * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, QQQQQQ would become Q[6]. Default is 4.
   * @param max_nesting ( number ) The maximum layers of nesting of brackets - any more layers and braces are introduced. Default is 3.
   * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase * smallest prefix), at 2 mantissaPower the bounds are (logBase^2) and (logBase^2 * smallest prefix) and so on. For example, a number represented as 1 M with 0 mantissaPower becomes 1,000 k with 1 mantissaPower.
   * @param hypermantissaPower ( Decimal ) Normally, once braces are introduced, the number represented by the brackets is limited to between (value of the prefix in question) and (value^value), which corresponds to the default of 1 hypermantissaPower. At 0 hypermantissaPower the bounds are 1 and (value), at 2 hypermantissaPower the bounds are (value^value) and (value^^3) and so on. For example, a number represented as Q{5}(10) with 0 hypermantissaPower becomes Q{4}(1 Q[10]) with 0 hypermantissaPower and Q{4}(Q[1 Q[10]]) with 2 mantissaPower.
   * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
   * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
   * @param delimiters ( [[string, string], [string, string]] ) An array of two pairs of strings that determine what goes before and after the number in a truncated expression like Q[6]. The first two strings replace brackets, the last two replace braces. Default is [["[", "]"], ["{", "}"]].
   * @param delimiterPermutation ( number ) The order that the numeral, brackets, and braces go in when multiple are present. Default is 3, which corresponds to [numeral, braces, brackets]. Each value from 0 to 5 represents a different ordering.
   * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
   * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
   * @param showOnLarge ( [boolean, boolean] ) This parameter shows whether the numeral that the delimiters are placed on is shown - if an entry is true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
   * showOnLarge[0] is for when brackets are the highest delimiter, showOnLarge[1] is for when braces are the highest delimiter.
   */
  var NestedSINotation = /*#__PURE__*/function (_Notation2) {
    function NestedSINotation() {
      var _this2;
      var logBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var prefixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["Q", 30], ["R", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["k", 3]];
      var negaPrefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [["q", 30], ["r", 27], ["y", 24], ["z", 21], ["a", 18], ["f", 15], ["p", 12], ["n", 9], ["µ", 6], ["m", 3]];
      var frontToBack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var rounding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var max_in_a_row = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 4;
      var max_nesting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 3;
      var mantissaPower = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var hypermantissaPower = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      var space = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : " ";
      var separator = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "";
      var delimiters = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [["[", "]"], ["{", "}"]];
      var delimiterPermutation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 3;
      var zero = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : "";
      var innerNotation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : new DefaultNotation();
      var showOnLarge = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : [true, true];
      _classCallCheck(this, NestedSINotation);
      _this2 = _callSuper(this, NestedSINotation);
      _this2._logBase = new Decimal__default["default"](10);
      _this2.frontToBack = true;
      _this2.max_in_a_row = 4;
      _this2._max_nesting = 3;
      _this2.mantissaPower = Decimal__default["default"].dZero;
      _this2._hypermantissaPower = Decimal__default["default"].dZero;
      _this2.space = " ";
      _this2.separator = "";
      _this2.delimiters = [["[", "]"], ["{", "}"]];
      _this2.delimiterPermutation = 3;
      _this2.zero = "";
      _this2.innerNotation = new DefaultNotation();
      _this2.showOnLarge = [true, true];
      _this2.name = "Nested SI Notation";
      _this2.logBase = logBase;
      _this2.prefixes = prefixes;
      _this2.negaPrefixes = negaPrefixes;
      _this2.frontToBack = frontToBack;
      _this2.rounding = rounding;
      _this2.max_in_a_row = max_in_a_row;
      _this2.max_nesting = max_nesting;
      _this2.mantissaPower = toDecimal(mantissaPower);
      _this2.hypermantissaPower = hypermantissaPower;
      _this2.space = space;
      _this2.separator = separator;
      _this2.delimiters = delimiters;
      _this2.delimiterPermutation = delimiterPermutation;
      _this2.zero = zero;
      _this2.innerNotation = innerNotation;
      _this2.showOnLarge = showOnLarge;
      return _this2;
    }
    _inherits(NestedSINotation, _Notation2);
    return _createClass(NestedSINotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.innerNotation.format(0);
        var negExp = false;
        var prefixesUsed = this._prefixes;
        var _scientifify3 = scientifify(value, this.logBase, this.rounding, this.mantissaPower, (value.lt(1) && _typeof(this.negaPrefixes) == "object" ? this.negaPrefixes : this.prefixes).map(function (p) {
            return p[1];
          })),
          _scientifify4 = _slicedToArray(_scientifify3, 2),
          mantissa = _scientifify4[0],
          exponent = _scientifify4[1];
        if (exponent.lt(0)) {
          negExp = true;
          if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
          exponent = exponent.neg();
        }
        var arr = DetailedSignValueArray(exponent, prefixesUsed);
        var result = "";
        if (arr.length == 0) result = this.zero;
        var orderArray = [1];
        orderArray.splice(this.delimiterPermutation % 2, 0, 2);
        orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 3);
        for (var s = 0; s < arr.length; s++) {
          var portion = arr[s][1].mul(arr[s][2]);
          if (arr[s][1].lte(this.max_in_a_row)) for (var i = 0; i < arr[s][1].toNumber(); i++) {
            if (this.frontToBack) result = arr[s][0] + result;else result += arr[s][0];
            if (i < arr[s][1].toNumber() - 1) {
              if (this.frontToBack) result = this.separator + result;else result += this.separator;
            }
          } else {
            if (this._logBase.pow(arr[s][1].mul(arr[s][2])).lt(Decimal__default["default"].tetrate(this._logBase.pow(arr[s][2]), this._max_nesting + 1))) {
              var subresult = "";
              while (orderArray.length > 0) {
                if (orderArray[0] == 1 && this.showOnLarge[0]) subresult += arr[s][0];else if (orderArray[0] == 2) subresult += this.delimiters[0][0] + this.format(arr[s][1]) + this.delimiters[0][1];
                orderArray.shift();
              }
              if (this.frontToBack) result = subresult + result;else result += subresult;
            } else {
              var _hyperscientifify = hyperscientifify(portion, this._logBase.pow(arr[s][2]), this.rounding, this._hypermantissaPower),
                _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
                _mantissa = _hyperscientifify2[0],
                hyperexponent = _hyperscientifify2[1];
              var _subresult = "";
              while (orderArray.length > 0) {
                if (orderArray[0] == 1 && this.showOnLarge[1]) _subresult += arr[s][0];else if (orderArray[0] == 2) _subresult += this.delimiters[0][0] + this.format(_mantissa) + this.delimiters[0][1];else if (orderArray[0] == 3) _subresult += this.delimiters[1][0] + this.format(hyperexponent.plus(1)) + this.delimiters[1][1];
                orderArray.shift();
              }
              if (this.frontToBack) result = _subresult + result;else result += _subresult;
            }
            if (arr[s][1].gte(this._logBase.pow(this._prefixes[this._prefixes.length - 1][1].plus(this.mantissaPower)))) {
              //Exponent is no longer integer accurate, so don't bother showing mantissa or lower prefixes
              if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
              return result;
            }
          }
          if (s < arr.length - 1) {
            if (this.frontToBack) result = this.separator + result;else result += this.separator;
          }
        }
        if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
        if (this.zero == "" && arr.length == 0) result = this.innerNotation.format(mantissa);else result = this.innerNotation.format(mantissa) + this.space + result;
        return result;
      }
    }, {
      key: "logBase",
      get: function get() {
        return this._logBase;
      },
      set: function set(logBase) {
        var logBaseD = toDecimal(logBase);
        if (logBaseD.lte(1)) throw new RangeError("Base <= 1 in Nested SI notation");
        this._logBase = logBaseD;
      }
    }, {
      key: "prefixes",
      get: function get() {
        return this._prefixes;
      },
      set: function set(prefixes) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in Nested SI Notation");
        this._prefixes = prefixes.map(function (entry) {
          return [entry[0], toDecimal(entry[1])];
        });
        this._prefixes.sort(function (a, b) {
          return Decimal__default["default"].cmp(a[1], b[1]) * -1;
        });
      }
    }, {
      key: "negaPrefixes",
      get: function get() {
        return this._negaPrefixes;
      },
      set: function set(negaPrefixes) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in Nested SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;else {
          this._negaPrefixes = negaPrefixes.map(function (entry) {
            return [entry[0], toDecimal(entry[1])];
          });
          this._negaPrefixes.sort(function (a, b) {
            return Decimal__default["default"].cmp(a[1], b[1]) * -1;
          });
        }
      }
    }, {
      key: "hypermantissaPower",
      get: function get() {
        return this._hypermantissaPower;
      },
      set: function set(hypermantissaPower) {
        var hypermantissaPowerD = toDecimal(hypermantissaPower);
        if (hypermantissaPowerD.lt(-2)) throw new RangeError("hypermantissaPower below -2 in Nested SI Notation");
        this._hypermantissaPower = hypermantissaPowerD;
      }
    }, {
      key: "max_nesting",
      get: function get() {
        return this._max_nesting;
      },
      set: function set(max_nesting) {
        if (max_nesting <= 0) throw new RangeError("Nonpositive max nesting in Nested SI Notation");
        this._max_nesting = max_nesting;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates a number using "hyper-SI" prefixes that represent the tetra-powers of 10: 10 is 1 Pl, 100 is 2 Pl, 10^9 is 9 Pl, 10^10 is 1 Dg, 10^100 is 2 Dg, 10^10^9 is 9 Dg, 10^10^10 is 1 Bi, and so on. It's similar to hyperscientific, but with the hyper-exponent replaced by an equivalent prefix abbreviation.
   * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
   * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
   * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
   * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
   * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (slogBase) and (slogBase^smallest prefix), at 2 mantissaPower the bounds are (slogBase^slogBase) and (slogBase^slogBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
   * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
   * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
   * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
   * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
   * @param mantissaInnerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the number inside a truncated expression is notated with. DefaultNotation is the default.
   */
  var HyperSINotation = /*#__PURE__*/function (_Notation) {
    function HyperSINotation() {
      var _this;
      var slogBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var prefixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]];
      var negaPrefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [["np", 2], ["lg", 1]];
      var frontToBack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var rounding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var max_in_a_row = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 4;
      var mantissaPower = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var space = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : " ";
      var separator = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "";
      var delimiters = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : ["(", ")"];
      var zero = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "";
      var mantissaInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new DefaultNotation();
      _classCallCheck(this, HyperSINotation);
      _this = _callSuper(this, HyperSINotation);
      _this._slogBase = new Decimal__default["default"](10);
      _this.frontToBack = true;
      _this.max_in_a_row = 4;
      _this._mantissaPower = Decimal__default["default"].dZero;
      _this.space = " ";
      _this.separator = "";
      _this.delimiters = ["(", ")"];
      _this.zero = "";
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = new DefaultNotation();
      _this.name = "Hyper-SI Notation";
      _this._slogBase = toDecimal(slogBase);
      _this._prefixes = prefixes.map(function (entry) {
        return [entry[0], toDecimal(entry[1])];
      });
      if (typeof negaPrefixes == "string") _this._negaPrefixes = negaPrefixes;else _this._negaPrefixes = negaPrefixes.map(function (entry) {
        return [entry[0], toDecimal(entry[1])];
      });
      _this.frontToBack = frontToBack;
      _this.rounding = rounding;
      _this.max_in_a_row = max_in_a_row;
      _this._mantissaPower = toDecimal(mantissaPower);
      _this.space = space;
      _this.separator = separator;
      _this.delimiters = delimiters;
      _this.zero = zero;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      return _this;
    }
    _inherits(HyperSINotation, _Notation);
    return _createClass(HyperSINotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var negExp = false;
        var prefixesUsed = this._prefixes;
        var _hyperscientifify = hyperscientifify(value, this.slogBase, this.rounding, this.mantissaPower, (value.lt(1) && _typeof(this.negaPrefixes) == "object" ? this.negaPrefixes : this.prefixes).map(function (p) {
            return p[1];
          })),
          _hyperscientifify2 = _slicedToArray(_hyperscientifify, 2),
          mantissa = _hyperscientifify2[0],
          hyperexponent = _hyperscientifify2[1];
        if (hyperexponent.lt(0)) {
          negExp = true;
          if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
          hyperexponent = hyperexponent.neg();
        }
        var arr = DetailedSignValueArray(hyperexponent, prefixesUsed);
        var result = "";
        if (arr.length == 0) result = this.zero;else {
          for (var s = 0; s < arr.length; s++) {
            var subresult = "";
            if (arr[s][1].lte(this.max_in_a_row)) for (var i = 0; i < arr[s][1].toNumber(); i++) {
              subresult += arr[s][0];
              if (i < arr[s][1].toNumber() - 1) subresult += this.separator;
            } else subresult += arr[s][0] + this.delimiters[0] + this.exponentInnerNotation.format(arr[s][1]) + this.delimiters[1];
            if (this.frontToBack) {
              result = subresult + result;
              if (s < arr.length - 1) result = this.separator + result;
            } else {
              result += subresult;
              if (s < arr.length - 1) result += this.separator;
            }
          }
        }
        if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
        result = this.mantissaInnerNotation.format(mantissa) + this.space + result;
        return result;
      }
    }, {
      key: "slogBase",
      get: function get() {
        return this._slogBase;
      },
      set: function set(slogBase) {
        var slogBaseD = toDecimal(slogBase);
        if (slogBaseD.lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hyper-SI Notation");
        this._slogBase = slogBaseD;
      }
    }, {
      key: "prefixes",
      get: function get() {
        return this._prefixes;
      },
      set: function set(prefixes) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in Hyper-SI Notation");
        this._prefixes = prefixes.map(function (entry) {
          return [entry[0], toDecimal(entry[1])];
        });
        this._prefixes.sort(function (a, b) {
          return Decimal__default["default"].cmp(a[1], b[1]) * -1;
        });
      }
    }, {
      key: "negaPrefixes",
      get: function get() {
        return this._negaPrefixes;
      },
      set: function set(negaPrefixes) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in Hyper-SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;else {
          this._negaPrefixes = negaPrefixes.map(function (entry) {
            return [entry[0], toDecimal(entry[1])];
          });
          this._negaPrefixes.sort(function (a, b) {
            return Decimal__default["default"].cmp(a[1], b[1]) * -1;
          });
        }
      }
    }, {
      key: "mantissaPower",
      get: function get() {
        return this._mantissaPower;
      },
      set: function set(mantissaPower) {
        var mantissaPowerD = toDecimal(mantissaPower);
        if (mantissaPowerD.lt(-2)) throw new RangeError("mantissaPower below -2 in Hyper-SI Notation");
        this._mantissaPower = mantissaPowerD;
      }
    }]);
  }(Notation);
  /**
   * A variant of HyperSINotation where the numbers in truncated expressions are themselves notated in this notation.
   * @param slogBase ( Decimal ) The base used by the prefixes. Default is 10.
   * @param prefixes ( [string, Decimal][] ) An array of pairs of strings and Decimals used as the prefixes. Each pair consists of a prefix (the string) and the value of that prefix as an tetra-exponent on slogBase (the Decimal). Default is [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]].
   * @param negaPrefixes ( [string, Decimal][] | string ) An array of pairs of strings and Decimals used as the prefixes for numbers less than 1. The default is [["np", 2], ["lg", 1]]. If this is a string instead of such an array, then the usual prefixes are used, but that string is placed at the start of the prefixes to indicate the use of negative prefixes.
   * @param frontToBack ( boolean ) If this is false, prefixes are ordered largest to smallest. If this is true, prefixes are ordered smallest to largest. Default is true.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param max_in_a_row ( number ) The maximum amount of one prefix in a row. Any more of one prefix in a row than this is truncated: for example, DkDkDkDkDkDk would become Dk(6). Default is 4.
   * @param mantissaPower ( Decimal ) Normally, the mantissa number is limited to between 1 and the value of the smallest prefix, which corresponds to the default of 0 mantissaPower. At 1 mantissaPower the bounds are (logBase) and (logBase^smallest prefix), at 2 mantissaPower the bounds are (logBase^logBase) and (logBase^logBase^smallest prefix) and so on. For example, a number represented as 1 Bi with 0 mantissaPower becomes 10 Dg with 1 mantissaPower and 10,000,000,000 Pl with 2 mantissaPower.
   * @param space ( string ) This string is placed between the number and the prefixes. Default is a single space.
   * @param separator ( string ) This string is placed between each prefix. Default is the empty string.
   * @param delimiters ( [string, string] ) A pair of strings that determine what goes before and after the number in a truncated expression like Dk(6). Default is ["(", ")"].
   * @param delimitersBefore ( boolean ) If this is true, the number and delimiters in a truncated expression go before the prefix instead of after. Default is false.
   * @param zero ( string ) The prefix used to represent the 0th prefix. Default is the empty string.
   * @param innerNotation ( Notation ) The notation that the number before the prefixes is notated with. DefaultNotation is the default.
   * @param showOnLarge ( boolean ) This parameter shows whether the numeral that the delimiters are placed on is shown - if it's true then the numeral and the delimiters are both shown, if it's false then the delimiters and what's inside them are still shown but the numeral they're on is not.
   */
  var NestedHyperSINotation = /*#__PURE__*/function (_Notation2) {
    function NestedHyperSINotation() {
      var _this2;
      var slogBase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var prefixes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["Dk", 10], ["Tb", 9], ["Co", 8], ["Hc", 7], ["Af", 6], ["Md", 5], ["Sk", 4], ["Bi", 3], ["Dg", 2], ["Pl", 1]];
      var negaPrefixes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [["np", 2], ["lg", 1]];
      var frontToBack = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var rounding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var max_in_a_row = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 4;
      var mantissaPower = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var space = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : " ";
      var separator = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "";
      var delimiters = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : ["(", ")"];
      var delimitersBefore = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      var zero = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "";
      var innerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new DefaultNotation();
      var showOnLarge = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : true;
      _classCallCheck(this, NestedHyperSINotation);
      _this2 = _callSuper(this, NestedHyperSINotation);
      _this2._slogBase = new Decimal__default["default"](10);
      _this2.frontToBack = true;
      _this2.max_in_a_row = 4;
      _this2._mantissaPower = Decimal__default["default"].dZero;
      _this2.space = " ";
      _this2.separator = "";
      _this2.delimiters = ["(", ")"];
      _this2.delimitersBefore = false;
      _this2.zero = "";
      _this2.innerNotation = new DefaultNotation();
      _this2.showOnLarge = true;
      _this2.name = "Nested Hyper-SI Notation";
      _this2._slogBase = toDecimal(slogBase);
      _this2._prefixes = prefixes.map(function (entry) {
        return [entry[0], toDecimal(entry[1])];
      });
      if (typeof negaPrefixes == "string") _this2._negaPrefixes = negaPrefixes;else _this2._negaPrefixes = negaPrefixes.map(function (entry) {
        return [entry[0], toDecimal(entry[1])];
      });
      _this2.frontToBack = frontToBack;
      _this2.rounding = rounding;
      _this2.max_in_a_row = max_in_a_row;
      _this2._mantissaPower = toDecimal(mantissaPower);
      _this2.space = space;
      _this2.separator = separator;
      _this2.delimiters = delimiters;
      _this2.delimitersBefore = delimitersBefore;
      _this2.zero = zero;
      _this2.innerNotation = innerNotation;
      _this2.showOnLarge = showOnLarge;
      return _this2;
    }
    _inherits(NestedHyperSINotation, _Notation2);
    return _createClass(NestedHyperSINotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var negExp = false;
        var prefixesUsed = this._prefixes;
        var _hyperscientifify3 = hyperscientifify(value, this.slogBase, this.rounding, this.mantissaPower, (value.lt(1) && _typeof(this.negaPrefixes) == "object" ? this.negaPrefixes : this.prefixes).map(function (p) {
            return p[1];
          })),
          _hyperscientifify4 = _slicedToArray(_hyperscientifify3, 2),
          mantissa = _hyperscientifify4[0],
          hyperexponent = _hyperscientifify4[1];
        if (hyperexponent.lt(0)) {
          negExp = true;
          if (Array.isArray(this._negaPrefixes)) prefixesUsed = this._negaPrefixes;
          hyperexponent = hyperexponent.neg();
        }
        var arr = DetailedSignValueArray(hyperexponent, prefixesUsed);
        var result = "";
        if (arr.length == 0) result = this.zero;
        for (var s = 0; s < arr.length; s++) {
          if (arr[s][1].lte(this.max_in_a_row)) for (var i = 0; i < arr[s][1].toNumber(); i++) {
            if (this.frontToBack) result = arr[s][0] + result;else result += arr[s][0];
          } else {
            var subresult = "";
            if (this.delimitersBefore) subresult = this.delimiters[0] + this.format(arr[s][1]) + this.delimiters[1] + (this.showOnLarge ? arr[s][0] : "");else subresult = (this.showOnLarge ? arr[s][0] : "") + this.delimiters[0] + this.format(arr[s][1]) + this.delimiters[1];
            if (this.frontToBack) result = subresult + result;else result += subresult;
            if (arr[s][1].gte(this._slogBase.tetrate(this._prefixes[this._prefixes.length - 1][1].plus(this._mantissaPower).toNumber(), 1, true))) {
              //Exponent is no longer integer accurate, so don't bother showing mantissa or lower prefixes
              if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
              return result;
            }
          }
          if (s < arr.length - 1) {
            if (this.frontToBack) result = this.separator + result;else result += this.separator;
          }
        }
        if (negExp && typeof this._negaPrefixes == "string") result = this._negaPrefixes + result;
        if (this.zero == "" && arr.length == 0) result = this.innerNotation.format(mantissa);else result = this.innerNotation.format(mantissa) + this.space + result;
        return result;
      }
    }, {
      key: "slogBase",
      get: function get() {
        return this._slogBase;
      },
      set: function set(slogBase) {
        var slogBaseD = toDecimal(slogBase);
        if (slogBaseD.lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Nested Hyper-SI Notation");
        this._slogBase = slogBaseD;
      }
    }, {
      key: "prefixes",
      get: function get() {
        return this._prefixes;
      },
      set: function set(prefixes) {
        if (prefixes.length == 0) throw new Error("Empty prefixes array in Nested Hyper-SI Notation");
        this._prefixes = prefixes.map(function (entry) {
          return [entry[0], toDecimal(entry[1])];
        });
        this._prefixes.sort(function (a, b) {
          return Decimal__default["default"].cmp(a[1], b[1]) * -1;
        });
      }
    }, {
      key: "negaPrefixes",
      get: function get() {
        return this._negaPrefixes;
      },
      set: function set(negaPrefixes) {
        if (negaPrefixes.length == 0) throw new Error("Empty negative prefixes array in Nested Hyper-SI Notation");
        if (typeof negaPrefixes == "string") this._negaPrefixes = negaPrefixes;else {
          this._negaPrefixes = negaPrefixes.map(function (entry) {
            return [entry[0], toDecimal(entry[1])];
          });
          this._negaPrefixes.sort(function (a, b) {
            return Decimal__default["default"].cmp(a[1], b[1]) * -1;
          });
        }
      }
    }, {
      key: "mantissaPower",
      get: function get() {
        return this._mantissaPower;
      },
      set: function set(mantissaPower) {
        var mantissaPowerD = toDecimal(mantissaPower);
        if (mantissaPowerD.lt(-2)) throw new RangeError("mantissaPower below -2 in Nested Hyper-SI Notation");
        this._mantissaPower = mantissaPowerD;
      }
    }]);
  }(Notation);

  /**
   * Uses Donald Knuth's -yllion proposal to abbreviate numbers. In this system, rather than each power of 1,000 getting a new name, each new number name after a hundred is the square of the previous one.
   * @param dialect ( number ) Controls which set of prefixes is used. Dialect 0 is MathCookie's Standard (the set of prefixes chosen by the creator of eternal_notations), dialect 1 uses the prefixes from Antimatter Dimensions, and dialect 2 is Aarex's Abbreviation System by Aarex Tiaokhiao. Default is 0 (MathCookie's Standard). Any value other than 0, 1, or 2 will default back to 0.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param lowestAbbreviated The smallest -yllion that gets abbreviated - numbers below this -yllion are written out in full. Default is 1, i.e. a myllion, i.e. 10^8. Set this to 0 to have a myriad (10^4) get abbreviated too, set this to 2 to make a myllion also be written out but a byllion still be abbreviated, and so on. Do not set this parameter to anything below 0 or higher than 6.
   * @param entriesLimit ( number ) How many "entries" of a single tier can show up before the notation cuts off with an ellipsis. Default is 6. For example, NNgNeMc-NNgNeMl-NNgNe has 3 entries.
   * @param charLimit ( number ) How many characters long the abbreviation can be (not including the number at the front, just the -illion prefix) before the notation cuts off with an ellipsis. Default is 100.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. Default is an AlternateBaseNotation that still works in base 10, but used the myriad system's commas instead of the usual commas.
   */
  var MyriadNotation = /*#__PURE__*/function (_Notation) {
    function MyriadNotation() {
      var _this;
      var dialect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rounding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var lowestAbbreviated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var entriesLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;
      var charLimit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
      var innerNotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new AlternateBaseNotation(10, 0, -4, -4, 0, "2^1024", "1e-6", 5, 0, 0, -1, false, 4, [",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", "::", ",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", ";;;", ",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", "::", ",", ";", ",", ":", ",", ";", ",", ";;", ",", ";", ",", ":", ",", ";", ",", ":::"]);
      _classCallCheck(this, MyriadNotation);
      _this = _callSuper(this, MyriadNotation);
      _this._dialect = 0;
      _this.rounding = Decimal__default["default"].dZero;
      _this._lowestAbbreviated = 1;
      _this._entriesLimit = 20;
      _this._charLimit = 50;
      _this.charLimitReached = false;
      _this.name = "Myriad Notation";
      _this.dialect = dialect;
      _this.rounding = rounding;
      _this.lowestAbbreviated = lowestAbbreviated;
      _this.entriesLimit = entriesLimit;
      _this.charLimit = charLimit;
      _this.innerNotation = innerNotation;
      if (_this._dialect == 1)
        // Antimatter Dimensions Standard
        _this.prefixes = [["m", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"], ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]];else if (dialect == 2) _this.prefixes = [["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]];else
        // MathCookie's Standard
        _this.prefixes = [["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
        // Below a decyllion
        ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"],
        // Ones
        ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"],
        // Tens
        ["", "Cn", "My", "CnMy", "LtM", "CnLtM", "MyLtM", "CnMyLtM", "LtB"] // Powers of 100
        ];
      return _this;
    }
    _inherits(MyriadNotation, _Notation);
    return _createClass(MyriadNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        this.charLimitReached = false;
        if (value.eq(0)) return this.innerNotation.format(0);
        var result = "";
        var negExp = false;
        var base = Decimal__default["default"].pow(10000, Decimal__default["default"].pow(2, this._lowestAbbreviated));
        if (value.lt(1) && this._dialect == 2) {
          if (value.gte(0.01)) return this.innerNotation.format(value);
          var recipNotation = new AppliedFunctionNotation(function (value) {
            return value.recip();
          }, this, function (value) {
            return "1 / " + value;
          });
          return recipNotation.format(value);
        }
        if (value.lt(1)) {
          negExp = true;
          var _scientifify = scientifify(value, base),
            _scientifify2 = _slicedToArray(_scientifify, 2),
            m = _scientifify2[0],
            e = _scientifify2[1];
          value = base.pow(e.neg()).mul(m);
        }
        var latins = Decimal__default["default"].dZero;
        if (value.gte(Decimal__default["default"].pow(10000, Decimal__default["default"].pow(2, 1e16)))) {
          latins = Decimal__default["default"].slog(value, 10, true).sub(4).div(2).floor().max(0);
          value = latins.gte(4.5e15) ? Decimal__default["default"].dOne : value.iteratedlog(10, latins.mul(2).toNumber(), true);
          while (value.gte(Decimal__default["default"].pow(10000, Decimal__default["default"].pow(2, 1e16)))) {
            latins = latins.plus(1);
            value = value.log(10000).log(2);
          }
          if (negExp) result += "/";
          if (latins.eq(1)) result += "Lt[";else {
            result += "Lt^" + this.format(latins);
            if (latins.gte(base)) return result;else result += "[";
          }
          negExp = false;
        }
        var _scientifify3 = scientifify(value, 10000, this.rounding, 0, Decimal__default["default"].pow(2, this._lowestAbbreviated).round()),
          _scientifify4 = _slicedToArray(_scientifify3, 2),
          mantissa = _scientifify4[0],
          exponent = _scientifify4[1];
        if (value.lte(Decimal__default["default"].pow(10000, Decimal__default["default"].pow(2, this._entriesLimit + this._lowestAbbreviated)))) result += this.innerNotation.format(mantissa);
        if (exponent.eq(0)) return result; //No -yllion here
        if (value.lte(Decimal__default["default"].pow(10000, Decimal__default["default"].pow(2, this._entriesLimit + this._lowestAbbreviated)))) result += " ";
        if (negExp) result += "/";
        var charsSoFar = 0; //This is used to keep track of whether we've hit the character limit
        var iterations = 0; //This is used to keep track of whether we've hit the entry limit
        while (exponent.gt(0)) {
          iterations++;
          var yllion = exponent.log(2).floor();
          while (exponent.gte(Decimal__default["default"].pow(2, yllion.plus(1)))) yllion = yllion.plus(1); //This line deals with log imprecision
          exponent = exponent.sub(Decimal__default["default"].pow(2, yllion).round());
          var str = this.calcYllion(yllion);
          result += str;
          charsSoFar += str.length;
          if (exponent.gt(0)) {
            result += "-";
            charsSoFar += 1;
            if (charsSoFar > this._charLimit) {
              this.charLimitReached = true;
              break;
            }
          }
          if (iterations == this._entriesLimit && exponent.gt(0)) {
            this.charLimitReached = true;
            break;
          }
        }
        if (this.charLimitReached) result += "...";
        if (latins.gt(0)) result += "]";
        return result;
      }
    }, {
      key: "calcYllion",
      value: function calcYllion(yllion) {
        if (yllion.lt(0)) throw new Error("Myriad notation has attempted to calculate a negative -yllion. This is a bug in Eternal Notations, so it's probably not your fault.");
        var yllionN = yllion.round().toNumber(); //Converting yllion to a number is safe because we never go above the byllionth (10^16th) yllion. yllion should never be non-whole to begin with, but you never know with floating point.
        var result = "";
        if (yllionN < 10) return this.prefixes[0][yllionN];else while (yllionN > 0) {
          var hundred = Math.floor(Math.log10(yllionN) / 2);
          var coefficient = Math.floor(yllionN / Math.pow(100, hundred));
          var imprecisions = 0;
          if (coefficient == 0) {
            hundred -= 1;
            coefficient = Math.floor(yllionN / Math.pow(100, hundred));
            imprecisions++;
          }
          if (coefficient >= 100) {
            hundred += 1;
            coefficient = Math.floor(yllionN / Math.pow(100, hundred));
            imprecisions++;
          }
          if (coefficient == 0 && imprecisions == 2) {
            //If we've run into both bounding errors and we're back to zero, we're too close to the boundary, so just act as if we're there
            coefficient = 1;
            yllionN = 0;
          } else yllionN = yllionN - coefficient * Math.pow(100, hundred);
          if (coefficient > 1 || hundred == 0) result += this.prefixes[1][coefficient % 10] + this.prefixes[2][Math.floor(coefficient / 10)];
          result += this.prefixes[3][hundred];
          if (yllionN > 0) {
            if (this._dialect == 2) {
              result += "'a";
            } else {
              result += "_";
            }
          }
        }
        return result;
      }
    }, {
      key: "dialect",
      get: function get() {
        return this._dialect;
      },
      set: function set(dialect) {
        this._dialect = dialect;
        if (this._dialect == 1)
          // Antimatter Dimensions Standard
          this.prefixes = [["m", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"], ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]];else if (dialect == 2) this.prefixes = [["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "N"], ["", "De", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"], ["", "Ce", "My", "CeMy", "LtM", "CeLtM", "MyLtM", "CeMyLtM", "LtB"]];else
          // MathCookie's Standard
          this.prefixes = [["m", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"],
          // Below a decyllion
          ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "O", "N"],
          // Ones
          ["", "Dc", "Vg", "Tg", "Qg", "Qq", "Sg", "St", "Og", "Ng"],
          // Tens
          ["", "Cn", "My", "CnMy", "LtM", "CnLtM", "MyLtM", "CnMyLtM", "LtB"] // Powers of 100
          ];
      }
    }, {
      key: "lowestAbbreviated",
      get: function get() {
        return this._lowestAbbreviated;
      },
      set: function set(lowestAbbreviated) {
        if (lowestAbbreviated < 0 || lowestAbbreviated > 6) throw new RangeError("Invalid lowestAbbreviated in Myriad Notation");
        this._lowestAbbreviated = lowestAbbreviated;
      }
    }, {
      key: "entriesLimit",
      get: function get() {
        return this._entriesLimit;
      },
      set: function set(entriesLimit) {
        if (entriesLimit <= 0) throw new RangeError("Non-positive entriesLimit in Myriad Notation");
        this._entriesLimit = entriesLimit;
      }
    }, {
      key: "charLimit",
      get: function get() {
        return this._charLimit;
      },
      set: function set(charLimit) {
        if (charLimit <= 0) throw new RangeError("Non-positive charLimit in Myriad Notation");
        this._charLimit = charLimit;
      }
    }]);
  }(Notation);

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
  var HypersplitNotation = /*#__PURE__*/function (_Notation) {
    function HypersplitNotation() {
      var _this;
      var delimiters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", " "]];
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var maximums = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : base;
      var showZeroes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [1, -1, -1, -1];
      var delimiterPermutation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var originalMaximums = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : maximums;
      var minnum = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var mantissaRounding = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var innerNotations = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : new DefaultNotation();
      var engineerings = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
      var expMultipliers = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 1;
      _classCallCheck(this, HypersplitNotation);
      _this = _callSuper(this, HypersplitNotation);
      _this._delimiters = [["", ""], ["*10^", ""], ["((10^)^", ") "], ["((10^^)^", ") "]];
      _this._base = Decimal__default["default"].dTen;
      _this._maximums = [Decimal__default["default"].dTen, Decimal__default["default"].dTen, Decimal__default["default"].dTen];
      _this._showZeroes = [1, -1, -1, -1];
      _this.delimiterPermutation = 1;
      _this._originalMaximums = _this._maximums;
      _this.minnum = Decimal__default["default"].dOne;
      _this.mantissaRounding = Decimal__default["default"].dZero;
      _this._innerNotations = [new DefaultNotation()];
      _this._engineerings = [[Decimal__default["default"].dOne], [Decimal__default["default"].dOne], [Decimal__default["default"].dOne]];
      _this._expMultipliers = [Decimal__default["default"].dOne, Decimal__default["default"].dOne, Decimal__default["default"].dOne];
      _this.name = "Hypersplit Notation";
      _this.delimiters = delimiters;
      _this._base = toDecimal(base);
      _this.maximums = maximums;
      _this.showZeroes = showZeroes;
      _this.delimiterPermutation = delimiterPermutation;
      _this.originalMaximums = originalMaximums;
      _this.minnum = toDecimal(minnum);
      _this.mantissaRounding = mantissaRounding;
      _this.innerNotations = innerNotations;
      _this.engineerings = engineerings;
      _this.expMultipliers = expMultipliers;
      return _this;
    }
    _inherits(HypersplitNotation, _Notation);
    return _createClass(HypersplitNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return decimal.sgn() < 0 && this._maximums[0].eq(0) ? this.formatNegativeDecimal(decimal.abs()) : this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var hp = hypersplit(value, this._base, this._maximums, this._originalMaximums, this.minnum, this.mantissaRounding, this._engineerings[0], this._engineerings[1], this._engineerings[2], this._expMultipliers[0], this._expMultipliers[1], this._expMultipliers[2]);
        var orderArray = [0];
        orderArray.splice(this.delimiterPermutation % 2, 0, 1);
        orderArray.splice(Math.floor(this.delimiterPermutation / 2) % 3, 0, 2);
        orderArray.splice(Math.floor(this.delimiterPermutation / 6) % 4, 0, 3);
        var result = "";
        while (orderArray.length > 0) {
          if (orderArray[0] == 0 && (this._showZeroes[0] > 0 || this._showZeroes[0] == 0 && (hp[1].neq(0) || hp[2].neq(0) || hp[3].neq(0)) || hp[0].neq(0))) result += this._delimiters[0][0] + this._innerNotations[0].format(hp[0]) + this._delimiters[0][1];else if (orderArray[0] == 1 && (this._showZeroes[1] > 0 || this._showZeroes[1] == 0 && (hp[2].neq(0) || hp[3].neq(0)) || hp[1].neq(0))) result += this._delimiters[1][0] + this._innerNotations[1].format(hp[1]) + this._delimiters[1][1];else if (orderArray[0] == 2 && (this._showZeroes[2] > 0 || this._showZeroes[2] == 0 && hp[3].neq(0) || hp[2].neq(0))) result += this._delimiters[2][0] + this._innerNotations[2].format(hp[2]) + this._delimiters[2][1];else if (orderArray[0] == 3 && (this._showZeroes[3] > 0 || hp[3].neq(0))) result += this._delimiters[3][0] + this._innerNotations[3].format(hp[3]) + this._delimiters[3][1];
          orderArray.shift();
        }
        return result;
      }
    }, {
      key: "delimiters",
      get: function get() {
        return this._delimiters;
      },
      set: function set(delimiters) {
        while (delimiters.length < 4) delimiters.push(["", ""]);
        this._delimiters = delimiters;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.pow(this._expMultipliers[0].recip()).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hypersplit Notation");
        this._base = baseD;
      }
    }, {
      key: "maximums",
      get: function get() {
        return this._maximums;
      },
      set: function set(maximums) {
        if (!Array.isArray(maximums)) maximums = [maximums];
        this._maximums = maximums.map(toDecimal);
        while (this._maximums.length < 3) this._maximums.push(this._maximums[this._maximums.length - 1]);
      }
    }, {
      key: "showZeroes",
      get: function get() {
        return this._showZeroes;
      },
      set: function set(showZeroes) {
        if (!Array.isArray(showZeroes)) showZeroes = [1, showZeroes];
        this._showZeroes = showZeroes;
        while (this._showZeroes.length < 4) this._showZeroes.push(this._showZeroes[this._showZeroes.length - 1]);
      }
    }, {
      key: "originalMaximums",
      get: function get() {
        return this._originalMaximums;
      },
      set: function set(originalMaximums) {
        if (!Array.isArray(originalMaximums)) originalMaximums = [originalMaximums];
        this._originalMaximums = originalMaximums.map(toDecimal);
        while (this._originalMaximums.length < 3) this._originalMaximums.push(this._originalMaximums[this._originalMaximums.length - 1]);
      }
    }, {
      key: "innerNotations",
      get: function get() {
        return this._innerNotations;
      },
      set: function set(innerNotations) {
        if (!Array.isArray(innerNotations)) innerNotations = [innerNotations];
        this._innerNotations = innerNotations;
        while (this._innerNotations.length < 4) this._innerNotations.push(this._innerNotations[this._innerNotations.length - 1]);
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(input) {
        if (!Array.isArray(input)) input = [input, input, input];
        var result = [[Decimal__default["default"].dOne], [Decimal__default["default"].dOne], [Decimal__default["default"].dOne]];
        for (var i = 0; i < input.length; i++) {
          var entry = input[i];
          if (!Array.isArray(entry)) result[i] = [toDecimal(entry)];else if (entry.length == 0) result[i] = [Decimal__default["default"].dOne];else result[i] = entry.map(toDecimal);
        }
        this._engineerings = result;
      }
    }, {
      key: "expMultipliers",
      get: function get() {
        return this._expMultipliers;
      },
      set: function set(expMultipliers) {
        if (!Array.isArray(expMultipliers)) expMultipliers = [expMultipliers];
        while (expMultipliers.length < 3) expMultipliers.push(Decimal__default["default"].dOne);
        if (this._base.pow(Decimal__default["default"].recip(expMultipliers[0])).lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work for Hypersplit Notation");
        this._expMultipliers = expMultipliers.map(toDecimal);
      }
    }]);
  }(Notation);

  /**
   * Represents numbers in terms of factorials, so 24 is "4!" and 720 is "6!".
   * @param iterations ( number ) The amount of factorial iterations: 1 is factorial notation, 2 is double factorial (as in (x!)!, not the other meaning of "multifactorial"), and so on. This can be negative: with -1 iterations, 4 would be "24¡".
   * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
   * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
   * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
   */
  var FactorialNotation = /*#__PURE__*/function (_Notation) {
    function FactorialNotation() {
      var _this;
      var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var max_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var factorialChars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [["", "!"], ["", "!"], ["!", ""]];
      var inverseChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["", "¡"], ["", "¡"], ["¡", ""]];
      var superexpAfter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var innerNotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : innerNotation;
      _classCallCheck(this, FactorialNotation);
      _this = _callSuper(this, FactorialNotation);
      _this.iterations = 1;
      _this._max_in_a_row = 5;
      _this.factorialChars = [["", "!"], ["", "!"], ["!", ""]];
      _this.inverseChars = [["", "¡"], ["", "¡"], ["¡", ""]];
      _this.superexpAfter = true;
      _this.innerNotation = new DefaultNotation();
      _this.superexponentInnerNotation = _this.innerNotation;
      _this.name = "Factorial Notation";
      _this.iterations = iterations;
      _this.max_in_a_row = max_in_a_row;
      _this.factorialChars = factorialChars;
      _this.inverseChars = inverseChars;
      _this.superexpAfter = superexpAfter;
      _this.innerNotation = innerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      return _this;
    }
    _inherits(FactorialNotation, _Notation);
    return _createClass(FactorialNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0) && this.iterations == 0) return this.innerNotation.format(0);
        if (value.lt(1)) {
          var recipNotation = new AppliedFunctionNotation(function (value) {
            return value.recip();
          }, this, function (value) {
            return "1 / " + value;
          });
          return recipNotation.format(value);
        }
        var result = "";
        var iterations = this.iterations;
        value = inverse_factorial(value, iterations);
        var usedChars = this.factorialChars;
        if (iterations < 0 && this.inverseChars != null) {
          usedChars = this.inverseChars;
          iterations *= -1;
        }
        result = this.innerNotation.format(value);
        if (iterations >= 0 && iterations <= this._max_in_a_row && iterations % 1 == 0) {
          for (var i = 0; i < iterations; i++) {
            var eChar = usedChars[i == 0 ? 0 : 1][0];
            var afterChar = usedChars[i == 0 ? 0 : 1][1];
            result = eChar + result + afterChar;
          }
        } else {
          var _eChar = usedChars[2][0];
          var _afterChar = usedChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = _eChar + eStr + _afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
        }
        return result;
      }
    }, {
      key: "max_in_a_row",
      get: function get() {
        return this._max_in_a_row;
      },
      set: function set(max_in_a_row) {
        if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Factorial Notation");
        this._max_in_a_row = max_in_a_row;
      }
    }]);
  }(Notation);
  /**
   * A variant of factorial notation that uses a different amount of factorial iterations depending on how large the number is.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 3628800, i.e. 10!.
   * @param max_in_a_row ( number ) If the there are more !'s than this, those !'s are made into a !n expression. Default is 5.
   * @param minIterations ( number ) The minimum amount of factorial iterations. Default is 1.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the factorial characters. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "6!", factorialChars[1] takes the place of the second ! in "25!!" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the ! in 45!7. Default is [["", "!"], ["", "!"], ["!", ""]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of inverseChars used for a factorial of negative iterations. Default is [["", "¡"], ["", "¡"], ["¡", ""]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of factorialChars[2], such as !-1.
   * @param superexpAfter ( boolean ) This is true by default; if it's true, an !n expression comes after the number instead of before.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an !n expression is itself notated with. Is the same as innerNotation by default.
   */
  var MultiFactorialNotation = /*#__PURE__*/function (_Notation2) {
    function MultiFactorialNotation() {
      var _this2;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3628800;
      var max_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var minIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var factorialChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["", "!"], ["", "!"], ["!", ""]];
      var inverseChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [["", "¡"], ["", "¡"], ["¡", ""]];
      var superexpAfter = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var innerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : innerNotation;
      _classCallCheck(this, MultiFactorialNotation);
      _this2 = _callSuper(this, MultiFactorialNotation);
      _this2._maxnum = new Decimal__default["default"](3628800);
      _this2._max_in_a_row = 5;
      _this2.minIterations = 1;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.factorialChars = [["", "!"], ["", "!"], ["!", ""]];
      _this2.inverseChars = [["", "¡"], ["", "¡"], ["¡", ""]];
      _this2.superexpAfter = true;
      _this2.innerNotation = new DefaultNotation();
      _this2.superexponentInnerNotation = _this2.innerNotation;
      _this2.name = "Multi-Factorial Notation";
      _this2._maxnum = toDecimal(maxnum);
      _this2.max_in_a_row = max_in_a_row;
      _this2.minIterations = minIterations;
      _this2.engineerings = engineerings;
      _this2.factorialChars = factorialChars;
      _this2.inverseChars = inverseChars;
      _this2.superexpAfter = superexpAfter;
      _this2.innerNotation = innerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      return _this2;
    }
    _inherits(MultiFactorialNotation, _Notation2);
    return _createClass(MultiFactorialNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var iterations = this.minIterations;
        if (value.eq(0)) iterations = 0;else if (multabs(value).gte(iteratedfactorial(this._maxnum, this.minIterations - 1))) iterations = nextEngineeringValue(factorial_slog(multabs(value)).sub(factorial_slog(this._maxnum)), this._engineerings).max(this.minIterations).toNumber();
        if (iterations > 9e15) {
          var result = this.innerNotation.format(this._maxnum);
          var eChar = this.factorialChars[2][0];
          var afterChar = this.factorialChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          return result;
        }
        return new FactorialNotation(iterations, this._max_in_a_row, this.factorialChars, this.inverseChars, this.superexpAfter, this.innerNotation, this.superexponentInnerNotation).format(value);
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(2)) throw new RangeError("maxnum <= 2 in Multi-Factorial Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "max_in_a_row",
      get: function get() {
        return this._max_in_a_row;
      },
      set: function set(max_in_a_row) {
        if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Multi-Factorial Notation");
        this._max_in_a_row = max_in_a_row;
      }
    }]);
  }(Notation);

  /**
   * Like scientific notation, but with factorials instead of exponents. Abbreviates 12 as "2 * 3!" and 16! as "1 * 16!". For larger numbers, switches to abbreviations like "(8 * 17!)!" and eventually "(!5)5.6 * 7!", the latter of which means "start with 5.6 * 7! and take the factorial of it 5 times".
   * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-scientific notation. Default is 3628800.
   * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 1 to just be abbreviated as "1" instead of "1 * 1!". Default is false.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / ", "!"], ["1 / ", ""]].
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var FactorialScientificNotation = /*#__PURE__*/function (_Notation) {
    function FactorialScientificNotation() {
      var _this;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3628800;
      var max_es_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var mantissaPower = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var iteration_zero = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var expChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [[" * ", "!"], ["(", ")!"], [" (!", ")"]];
      var negExpChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [[" / ", "!"], ["1 / ", ""]];
      var expBefore = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var superexpAfter = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
      var mantissaInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : exponentInnerNotation;
      _classCallCheck(this, FactorialScientificNotation);
      _this = _callSuper(this, FactorialScientificNotation);
      _this._maxnum = new Decimal__default["default"](3628800);
      _this.max_es_in_a_row = 5;
      _this.rounding = Decimal__default["default"].dZero;
      _this._engineerings = [Decimal__default["default"].dOne];
      _this.mantissaPower = Decimal__default["default"].dZero;
      _this.iteration_zero = false;
      _this._expChars = [[" * ", "!"], ["(", ")!"], [" (!", ")"]];
      _this.negExpChars = [[" / ", "!"], ["1 / ", ""]];
      _this.expBefore = false;
      _this.superexpAfter = true;
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = _this.mantissaInnerNotation;
      _this.superexponentInnerNotation = _this.exponentInnerNotation;
      _this.name = "Factorial Scientific Notation";
      _this.maxnum = maxnum;
      _this.max_es_in_a_row = max_es_in_a_row;
      _this.rounding = rounding;
      _this.engineerings = engineerings;
      _this.mantissaPower = toDecimal(mantissaPower);
      _this.iteration_zero = iteration_zero;
      _this.expBefore = expBefore;
      _this.superexpAfter = superexpAfter;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.unconvertedExpChars = expChars;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(FactorialScientificNotation, _Notation);
    return _createClass(FactorialScientificNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.mantissaInnerNotation.format(0);
        if (this.iteration_zero && value.lt(this._maxnum) && value.gt(this._maxnum.recip())) return this.mantissaInnerNotation.format(value);
        var result = "";
        if (multabs(value).lt(this._maxnum.factorial())) {
          var _factorial_scientifif = factorial_scientifify(value, this.rounding, this.mantissaPower, this._engineerings),
            _factorial_scientifif2 = _slicedToArray(_factorial_scientifif, 2),
            mantissa = _factorial_scientifif2[0],
            exponent = _factorial_scientifif2[1];
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (exponent.lt(0) && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent = exponent.neg();
          }
          var mantissaStr = this.mantissaInnerNotation.format(mantissa);
          var exponentStr = this.exponentInnerNotation.format(exponent);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;else result = mantissaStr + beforeChar + exponentStr + afterChar;
        } else {
          var negExp = false;
          if (value.lt(1)) {
            if (this.negExpChars != null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            negExp = true;
            var _factorial_scientifif3 = factorial_scientifify(value, this.rounding, this.mantissaPower, this._engineerings),
              _factorial_scientifif4 = _slicedToArray(_factorial_scientifif3, 2),
              m = _factorial_scientifif4[0],
              e = _factorial_scientifif4[1];
            value = m.mul(e.neg().factorial());
          }
          var added_es = factorial_slog(value, this._maxnum).floor().toNumber();
          value = added_es > 9e15 ? this._maxnum : inverse_factorial(value, added_es);
          while (value.gte(this._maxnum.factorial())) {
            added_es += 1;
            value = inverse_factorial(value, 1);
          }
          if (negExp) value = value.neg();
          result = this.format(value);
          if (added_es <= this.max_es_in_a_row) {
            for (var i = 0; i < added_es; i++) {
              result = this._expChars[1][0] + result + this._expChars[1][1];
            }
          } else {
            var eStr = this.superexponentInnerNotation.format(added_es);
            eStr = this._expChars[2][0] + eStr + this._expChars[2][1];
            if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          }
        }
        return result;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(2)) throw new RangeError("maxnum <= 2 in Factorial Scientific Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.mantissaInnerNotation.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);
  /**
   * This notation performs factorial-scientific notation a certain number of times. 1 iteration means the number is in the form A * B! (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A * (B * C!)!, and so on.
   * @param iterations ( number ! ) The amount of iterations.
   * @param max_es_in_a_row ( number ) If the factorial representation would have more !'s at the end than this, those !'s are made into an !n expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial values: if it's three then the factorial will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param mantissaPower ( Decimal ) Normally, the mantissa in scientific notation is bounded by 1 and (exponent + 1), which corresponds to the default mantissaPower of 0. If mantissaPower is 1, the bounds are (exponent + 1) and (exponent + 1)*(exponent + 2), if mantissaPower is 2 then the bounds are (exponent)*(exponent + 1) and (exponent)*(exponent + 1)*(exponent + 2), and so on. For example, 15!, which normally returns [1, 15], would become [15, 14] with 1 mantissaPower and [210, 13] with 2 mantissaPower.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the exponent, the second entry goes after the exponent. expChars[0] takes the place of the * and ! in "4 * 14!", expChars[1] takes the place of the ()! in "(7.5 * 11!)!", and expChars[2] takes the place of the ! in 7!9. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats 1 tacked on the beginning, and if it's true than the 1 is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 1 on it). Default is [[" * ", "!"], ["(", ")!"], ["(!", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior. Default is [[" / (", ")!"], ["1 / ", ""]].
   * @param expBefore ( boolean ) If this parameter is true, the exponent comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is true.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var FactorialScientificIterationsNotation = /*#__PURE__*/function (_Notation2) {
    function FactorialScientificIterationsNotation(iterations) {
      var _this2;
      var max_es_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var mantissaPower = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var expChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [[" * (", ")!"], ["(", ")!"], [" (!", ")"]];
      var negExpChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [[" / (", ")!"], ["1 / ", ""]];
      var expBefore = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var superexpAfter = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
      var mantissaInnerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : exponentInnerNotation;
      _classCallCheck(this, FactorialScientificIterationsNotation);
      _this2 = _callSuper(this, FactorialScientificIterationsNotation);
      _this2.max_es_in_a_row = 5;
      _this2.rounding = Decimal__default["default"].dZero;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.mantissaPower = Decimal__default["default"].dZero;
      _this2._expChars = [[" * (", ")!"], ["(", ")!"], [" (!", ")"]];
      _this2.negExpChars = [[" / (", ")!"], ["1 / ", ""]];
      _this2.expBefore = false;
      _this2.superexpAfter = true;
      _this2.mantissaInnerNotation = new DefaultNotation();
      _this2.exponentInnerNotation = _this2.mantissaInnerNotation;
      _this2.superexponentInnerNotation = _this2.exponentInnerNotation;
      _this2.name = "Factorial Scientific Iterations Notation";
      _this2.iterations = iterations;
      _this2.max_es_in_a_row = max_es_in_a_row;
      _this2.rounding = rounding;
      _this2.engineerings = engineerings;
      _this2.mantissaPower = toDecimal(mantissaPower);
      _this2.expBefore = expBefore;
      _this2.superexpAfter = superexpAfter;
      _this2.mantissaInnerNotation = mantissaInnerNotation;
      _this2.exponentInnerNotation = exponentInnerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.unconvertedExpChars = expChars;
      _this2.expChars = expChars;
      _this2.negExpChars = negExpChars;
      return _this2;
    }
    _inherits(FactorialScientificIterationsNotation, _Notation2);
    return _createClass(FactorialScientificIterationsNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.mantissaInnerNotation.format(0);
        if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
        var iterations = this._iterations;
        var result = "";
        var negExp = false;
        var originalValue = value;
        if (value.lt(1)) {
          negExp = true;
          var _factorial_scientifif5 = factorial_scientifify(value, this.rounding, this.mantissaPower, this._engineerings),
            _factorial_scientifif6 = _slicedToArray(_factorial_scientifif5, 2),
            m = _factorial_scientifif6[0],
            e = _factorial_scientifif6[1];
          value = e.neg().factorial().mul(m);
        }
        var added_es = Decimal__default["default"].min(this._iterations, factorial_slog(value).sub(factorial_slog(new Decimal__default["default"](Number.MAX_SAFE_INTEGER))).floor()).toNumber();
        if (added_es < iterations - factorial_slog(new Decimal__default["default"](Number.MAX_SAFE_INTEGER)).ceil().toNumber()) added_es = iterations - factorial_slog(new Decimal__default["default"](Number.MAX_SAFE_INTEGER)).ceil().toNumber();
        if (added_es < 0) added_es = 0;
        if (negExp && this.negExpChars !== null && (added_es > 0 || this.negExpChars[0] === true)) return this.negExpChars[1][0] + this.format(originalValue.recip()) + this.negExpChars[1][1];
        value = inverse_factorial(value, added_es);
        var sciArray = [value];
        for (var i = 0; i < iterations - added_es; i++) {
          if (sciArray[sciArray.length - 1].eq(0)) break;
          var _factorial_scientifif7 = factorial_scientifify(sciArray[sciArray.length - 1], this.rounding, this.mantissaPower, this._engineerings),
            _factorial_scientifif8 = _slicedToArray(_factorial_scientifif7, 2),
            mantissa = _factorial_scientifif8[0],
            exponent = _factorial_scientifif8[1];
          if (i == 0 && negExp) exponent = exponent.neg();
          sciArray.pop();
          sciArray.push(mantissa, exponent);
        }
        var endings = sciArray.length - 1;
        var beforeChar = this._expChars[0][0];
        var afterChar = this._expChars[0][1];
        while (sciArray.length > 0) {
          var numStr = "";
          var toFormat = sciArray[0];
          if (this.negExpChars !== null && typeof this.negExpChars[0] !== "boolean" && toFormat.lt(0)) {
            toFormat = toFormat.neg();
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
          }
          if (sciArray.length == 1) numStr = this.exponentInnerNotation.format(toFormat);else numStr = this.mantissaInnerNotation.format(toFormat);
          if (this.expBefore) {
            if (sciArray.length <= endings) result = afterChar + result;
            result = numStr + result;
            sciArray.shift();
          } else {
            if (sciArray.length <= endings) result += beforeChar;
            result += numStr;
            sciArray.shift();
          }
          beforeChar = this._expChars[0][0];
          afterChar = this._expChars[0][1];
        }
        for (var _e = 0; _e < endings; _e++) {
          if (this.expBefore) result = beforeChar + result;else result += afterChar;
        }
        if (added_es <= this.max_es_in_a_row) {
          for (var _i = 0; _i < added_es; _i++) result = this._expChars[1][0] + result + this._expChars[1][1];
        } else {
          var eStr = this.superexponentInnerNotation.format(added_es);
          eStr = this._expChars[2][0] + eStr + this._expChars[2][1];
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
        }
        return result;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Factorial Scientific Iterations Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.mantissaInnerNotation.format(1);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * Like hyperscientific notation, but with repeated factorials instead of tetration. For example, 6 (3!) could be 3!1, 4!2 means 4!! (which is around 6.2e23), and 7!20 means 7!!!!!!... with 20 !'s.
   * @param maxnum ( Decimal ) Only factorials below this value are allowed - anything higher and the factorial number itself is abbreviated in factorial-hyperscientific notation. Default is 3628800.
   * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param limit ( Decimal ) If the mantissa is below the limit, a factorial is removed to bring the mantissa back above the limit. Default is 3.
   * @param iteration_zero ( boolean ) If this is true, then numbers less than maxnum will ignore the scientific notation and jump directly to the innerNotation - useful if you want 6 to just be abbreviated as "6" instead of "3!1". Default is false.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var FactorialHyperscientificNotation = /*#__PURE__*/function (_Notation) {
    function FactorialHyperscientificNotation() {
      var _this;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3628800;
      var max_Fs_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;
      var iteration_zero = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var expChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["!", ""], [false, ""], ["(!^", ")"]];
      var negExpChars = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var expBefore = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var superexpAfter = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var mantissaInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : exponentInnerNotation;
      _classCallCheck(this, FactorialHyperscientificNotation);
      _this = _callSuper(this, FactorialHyperscientificNotation);
      _this.maxnum = new Decimal__default["default"](3628800);
      _this.max_Fs_in_a_row = 5;
      _this.rounding = Decimal__default["default"].dZero;
      _this._engineerings = [Decimal__default["default"].dOne];
      _this._limit = new Decimal__default["default"](3);
      _this.iteration_zero = false;
      _this._expChars = [["!", ""], ["!", ""], ["(!^", ")"]];
      _this.negExpChars = null;
      _this.expBefore = false;
      _this.superexpAfter = false;
      _this.mantissaInnerNotation = new DefaultNotation();
      _this.exponentInnerNotation = _this.mantissaInnerNotation;
      _this.superexponentInnerNotation = _this.exponentInnerNotation;
      _this.name = "Factorial Hyperscientific Notation";
      _this.maxnum = toDecimal(maxnum);
      _this.max_Fs_in_a_row = max_Fs_in_a_row;
      _this.rounding = rounding;
      _this.engineerings = engineerings;
      _this.limit = limit;
      _this.iteration_zero = iteration_zero;
      _this.expBefore = expBefore;
      _this.superexpAfter = superexpAfter;
      _this.mantissaInnerNotation = mantissaInnerNotation;
      _this.exponentInnerNotation = exponentInnerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.unconvertedExpChars = expChars;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(FactorialHyperscientificNotation, _Notation);
    return _createClass(FactorialHyperscientificNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (this.iteration_zero && value.lt(this.maxnum) && value.gt(this.maxnum.recip())) return this.mantissaInnerNotation.format(value);
        var result = "";
        if (value.lt(iteratedfactorial(this._limit, this.maxnum.toNumber()))) {
          var _factorial_hyperscien = factorial_hyperscientifify(value, this._limit, this.rounding, this._engineerings),
            _factorial_hyperscien2 = _slicedToArray(_factorial_hyperscien, 2),
            mantissa = _factorial_hyperscien2[0],
            exponent = _factorial_hyperscien2[1];
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (exponent.lt(0) && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent = exponent.neg();
          }
          var mantissaStr = this.mantissaInnerNotation.format(mantissa);
          var exponentStr = this.exponentInnerNotation.format(exponent);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + mantissaStr;else result = mantissaStr + beforeChar + exponentStr + afterChar;
        } else {
          if (value.lt(1) && this.negExpChars !== null) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          var added_Fs = 0;
          while (value.gte(iteratedfactorial(this._limit, this.maxnum.toNumber()))) {
            added_Fs++;
            value = factorial_slog(value, this._limit);
          }
          result = this.format(value);
          if (added_Fs <= this.max_Fs_in_a_row) {
            result = this._expChars[1][0] + result + this._expChars[1][1];
          } else {
            var FStr = this.superexponentInnerNotation.format(added_Fs);
            FStr = this._expChars[2][0] + FStr + this._expChars[2][1];
            if (this.superexpAfter) result = result + FStr;else result = FStr + result;
          }
        }
        return result;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "limit",
      get: function get() {
        return this._limit;
      },
      set: function set(limit) {
        var limitD = toDecimal(limit);
        if (limitD.lte(2)) throw new Error("Limit <= 2 in Factorial Hyperscientific Notation");
        this._limit = limitD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var limitStr = this.mantissaInnerNotation.format(this._limit);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = limitStr + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + limitStr;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = limitStr + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + limitStr;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);
  /**
   * This notation performs factorial-hyperscientific notation a certain number of times. 1 iteration means the number is in the form A!B (where A and B are abbreviated using the innerNotation), 2 iterations means the number is in the form A!B!C, and so on.
   * @param iterations ( number ! ) The amount of iterations.
   * @param max_Fs_in_a_row ( number ) If the representation would have more layers of !'s at the end than this, those !'s are made into an (!^n) expression. Default is 5.
   * @param rounding ( DecimalSource | ((value : Decimal) => Decimal) ) The mantissa is rounded to the nearest multiple of this value. If this parameter is a function, then the mantissa is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   * @param engineerings ( Decimal | DecimalSource[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed factorial amount values: if it's three then the factorial amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted factorial amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param limit ( Decimal ) If the mantissa is equal to or above the limit, another factorial is taken to bring the mantissa back above the limit. Default is 3.
   * @param expChars ( [[string, string], [string | boolean, string | boolean], [string, string]] ) An array of three pairs of strings that are used as the between characters for scientific notation. In each pair, the first entry goes before the factorial amount, the second entry goes after the factorial amount. expChars[0] takes the place of the ! in "3!4", expChars[1] takes the place of the 3! in "3!5!7!", and expChars[2] takes the place of the (!^ and ) in (!^5)4!7. If expChars[1][0] is a boolean instead of a string: if it's false, then expChars[1][0] is set to be expChars[0][0] with the way mantissaInnerNotation formats the limit tacked on the beginning, and if it's true than the limit string is tacked on the end instead. Likewise for expChars[1][1] (expChars[0][1] with a 'l' on it, where 'l' is however the limit is formatted in mantissaInnerNotation). Default is [["!", ""], [false, ""], ["(!^", ")"]].
   * @param negExpChars ( null | [[string, string] | boolean, [string, string]] ) This can either be null or a pair of pairs of strings (in which the first pair of strings may be a boolean instead). Ignore this parameter if it's null, which is the default. If it's a pair of pairs of strings, then the first pair is used like expChars[0] but for negative exponents (so if it's ["d", ""], then 2e-4 would be 2d4 instead), and the second pair is used on small numbers whose reciprocals are large enough to need expChars[1], in which case the second pair indicates that a reciprocal has been taken. If negExpChars[0] is a boolean instead, then if it's true the notation goes directly to the reciprocal behavior for all inputs less than 1, while if it's false then single-iteration inputs don't use negExpChars but multi-iteration ones still use reciprocal behavior.
   * @param expBefore ( boolean ) If this parameter is true, the factorial amount comes before the mantissa instead of after. Default is false.
   * @param superexpAfter ( boolean ) If this parameter is true, (e^n) expressions come after the rest of the number instead of before. Default is false.
   * @param mantissaInnerNotation ( Notation ) The notation that the numbers within the mantissas are themselves notated with. DefaultNotation is the default.
   * @param exponentInnerNotation ( Notation ) The notation that the highest factorial is itself notated with. Is the same as mantissaInnerNotation by default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (!^n) expression is itself notated with. Is the same as exponentInnerNotation by default.
   */
  var FactorialHyperscientificIterationsNotation = /*#__PURE__*/function (_Notation2) {
    function FactorialHyperscientificIterationsNotation(iterations) {
      var _this2;
      var max_Fs_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var rounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var engineerings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;
      var expChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [["!", ""], [false, ""], ["(!^", ")"]];
      var negExpChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var expBefore = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var superexpAfter = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var mantissaInnerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var exponentInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : mantissaInnerNotation;
      var superexponentInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : exponentInnerNotation;
      _classCallCheck(this, FactorialHyperscientificIterationsNotation);
      _this2 = _callSuper(this, FactorialHyperscientificIterationsNotation);
      _this2.max_Fs_in_a_row = 5;
      _this2.rounding = Decimal__default["default"].dZero;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2._limit = new Decimal__default["default"](3);
      _this2._expChars = [["!", ""], ["!", ""], ["(!^", ")"]];
      _this2.negExpChars = null;
      _this2.expBefore = false;
      _this2.superexpAfter = false;
      _this2.mantissaInnerNotation = new DefaultNotation();
      _this2.exponentInnerNotation = _this2.mantissaInnerNotation;
      _this2.superexponentInnerNotation = _this2.exponentInnerNotation;
      _this2.name = "Factorial Hyperscientific Iterations Notation";
      _this2.iterations = iterations;
      _this2.max_Fs_in_a_row = max_Fs_in_a_row;
      _this2.rounding = rounding;
      if (!Array.isArray(engineerings)) engineerings = [engineerings];
      var engineeringsD = engineerings.map(toDecimal);
      _this2._engineerings = engineeringsD.sort(function (a, b) {
        if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
      }).reverse();
      _this2.limit = limit;
      _this2.expBefore = expBefore;
      _this2.superexpAfter = superexpAfter;
      _this2.mantissaInnerNotation = mantissaInnerNotation;
      _this2.exponentInnerNotation = exponentInnerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.unconvertedExpChars = expChars;
      _this2.expChars = expChars;
      _this2.negExpChars = negExpChars;
      return _this2;
    }
    _inherits(FactorialHyperscientificIterationsNotation, _Notation2);
    return _createClass(FactorialHyperscientificIterationsNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (this._iterations == 0) return this.mantissaInnerNotation.format(value);
        var iterations = this._iterations;
        var result = "";
        var added_Fs = 0;
        while (value.gt(Decimal__default["default"].tetrate(10, Number.MAX_SAFE_INTEGER, 1, true)) && added_Fs < iterations) {
          added_Fs++;
          value = factorial_slog(value, this._limit);
        }
        var sciArray = [value];
        for (var i = 0; i < iterations - added_Fs; i++) {
          if (sciArray[sciArray.length - 1].lte(2)) break;
          var _factorial_hyperscien3 = factorial_hyperscientifify(sciArray[sciArray.length - 1], this._limit, this.rounding, this._engineerings),
            _factorial_hyperscien4 = _slicedToArray(_factorial_hyperscien3, 2),
            mantissa = _factorial_hyperscien4[0],
            exponent = _factorial_hyperscien4[1];
          sciArray.pop();
          sciArray.push(mantissa, exponent);
        }
        var endings = sciArray.length - 1;
        var beforeChar = this._expChars[0][0];
        var afterChar = this._expChars[0][1];
        while (sciArray.length > 0) {
          var numStr = "";
          var toFormat = sciArray[0];
          if (this.negExpChars !== null && typeof this.negExpChars[0] !== "boolean" && toFormat.lt(0)) {
            toFormat = toFormat.neg();
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
          }
          if (sciArray.length == 1) numStr = this.exponentInnerNotation.format(toFormat);else numStr = this.mantissaInnerNotation.format(toFormat);
          if (this.expBefore) {
            if (sciArray.length <= endings) result = afterChar + result;
            result = numStr + result;
            sciArray.shift();
          } else {
            if (sciArray.length <= endings) result += beforeChar;
            result += numStr;
            sciArray.shift();
          }
          beforeChar = this._expChars[0][0];
          afterChar = this._expChars[0][1];
        }
        for (var e = 0; e < endings; e++) {
          if (this.expBefore) result = beforeChar + result;else result += afterChar;
        }
        if (added_Fs <= this.max_Fs_in_a_row) {
          for (var _i = 0; _i < added_Fs; _i++) result = this._expChars[1][0] + result + this._expChars[1][1];
        } else {
          var FStr = this.superexponentInnerNotation.format(added_Fs);
          FStr = this._expChars[2][0] + FStr + this._expChars[2][1];
          if (this.superexpAfter) result = result + FStr;else result = FStr + result;
        }
        return result;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Factorial Hyperscientific Iterations Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "limit",
      get: function get() {
        return this._limit;
      },
      set: function set(limit) {
        var limitD = toDecimal(limit);
        if (limitD.lte(2)) throw new Error("Limit <= 2 in Factorial Hyperscientific Notation");
        this._limit = limitD;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var limitStr = this.mantissaInnerNotation.format(this._limit);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = limitStr + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + limitStr;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = limitStr + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + limitStr;
        expChars.push(input[2]);
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates numbers in terms of how many times you'd have to apply factorial to 3 to get to them, so 3 is 3!0, 6 is 3!1, and 720 is 3!2.
   * @param iterations ( number ) The amount of factorial-amount iterations.
   * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
   * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
   * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
   * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
   * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var FactorialAmountNotation = /*#__PURE__*/function (_Notation) {
    function FactorialAmountNotation() {
      var _this;
      var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var max_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
      var factorialChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["!", ""], ["!", ""], ["(!^", ")"]];
      var inverseChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["¡", ""], ["¡", ""], ["(¡^", ")"]];
      var superexpAfter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var baseShown = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
      var innerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : innerNotation;
      var baseInnerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : innerNotation;
      _classCallCheck(this, FactorialAmountNotation);
      _this = _callSuper(this, FactorialAmountNotation);
      _this._iterations = 1;
      _this._max_in_a_row = 5;
      _this._base = new Decimal__default["default"](3);
      _this.factorialChars = [["!", ""], ["!", ""], ["(!^", ")"]];
      _this.inverseChars = [["¡", ""], ["¡", ""], ["(¡^", ")"]];
      _this.superexpAfter = false;
      _this.baseShown = 1;
      _this.innerNotation = new DefaultNotation();
      _this.superexponentInnerNotation = _this.innerNotation;
      _this.baseInnerNotation = _this.innerNotation;
      _this.name = "Factorial Amount Notation";
      _this.iterations = iterations;
      _this._max_in_a_row = max_in_a_row;
      _this.base = base;
      _this.factorialChars = factorialChars;
      _this.inverseChars = inverseChars;
      _this.superexpAfter = superexpAfter;
      _this.baseShown = baseShown;
      _this.innerNotation = innerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.baseInnerNotation = baseInnerNotation;
      return _this;
    }
    _inherits(FactorialAmountNotation, _Notation);
    return _createClass(FactorialAmountNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var result = "";
        if (value.lt(1) && value.neq(0)) return "1 / " + this.format(value.recip());
        if (value.lte(2)) return this.innerNotation.format(value);
        var iterations = this._iterations;
        if (this._iterations < 0) for (iterations = 0; iterations > this._iterations && value.gt(2); iterations--) value = iteratedfactorial(this._base, value.toNumber());else for (iterations = 0; iterations < this._iterations && value.gt(2); iterations++) value = factorial_slog(value, this._base);
        var usedChars = this.factorialChars;
        if (iterations < 0 && this.inverseChars != null) {
          usedChars = this.inverseChars;
          iterations *= -1;
        }
        var baseStr = "";
        if (this.baseShown) baseStr = this.baseInnerNotation.format(this._base);
        result = this.innerNotation.format(value);
        if (iterations >= 0 && iterations <= this._max_in_a_row && iterations % 1 == 0) {
          for (var i = 0; i < iterations; i++) {
            var eChar = usedChars[i == 0 ? 0 : 1][0];
            var afterChar = usedChars[i == 0 ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
          }
        } else {
          var _eChar = usedChars[2][0];
          var _afterChar = usedChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = _eChar + eStr + _afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.baseShown < 0) result = result + baseStr;else result = baseStr + result;
        }
        return result;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Factorial Amount Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }, {
      key: "max_in_a_row",
      get: function get() {
        return this._max_in_a_row;
      },
      set: function set(max_in_a_row) {
        if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Factorial Amount Notation");
        this._max_in_a_row = max_in_a_row;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.lte(2)) throw new RangeError("Base <= 2 in Factorial Amount Notation");
        this._base = baseD;
      }
    }]);
  }(Notation);
  /**
   * A variant of factorial amount notation that uses a different amount of iterations depending on how large the number is.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
   * @param max_in_a_row ( number ) If there would be more 3!'s in the expression than this, those 3!'s are made into a (3!^n) expression. Default is 5.
   * @param minIterations ( number ) The minimum amount of logarithm iterations. Default is 1.
   * @param base ( Decimal ) The value the repeated factorials are applied to. Default is 3.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param factorialChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate factorial amount notation. In each pair, the first entry goes before the number, the second entry goes after the number. factorialChars[0] takes the place of the ! in "2.5!6", factorialChars[1] takes the place of the second ! in "3!5!8" (factorialChars[0] is for the innermost factorial, factorialChars[1] is for the outer ones), and factorialChars[2] takes the place of the (!^) in 3(!^10)4. Default is [["!", ""], ["!", ""], ["(!^", ")"]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] | null ) An equivalent of factorialChars used for a factorial amount of negative iterations. Default is [["¡", ""], ["¡", ""], ["(¡^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative powers of factorialChars[2], such as !^-1.
   * @param superexpAfter ( boolean ) This is false by default; if it's true, a (!^n) expression comes after the number instead of before.
   * @param baseShown ( number ) This is 0 by default. If this is 0, the base is not shown. If this is positive, the base is shown at the beginning of the expression. If this is negative, the base is shown at the end of the expression.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in a (!^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var MultiFactorialAmountNotation = /*#__PURE__*/function (_Notation2) {
    function MultiFactorialAmountNotation() {
      var _this2;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e10;
      var max_in_a_row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var minIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;
      var engineerings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var factorialChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [["!", ""], ["!", ""], ["(!^", ")"]];
      var inverseChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["¡", ""], ["¡", ""], ["(¡^", ")"]];
      var superexpAfter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var baseShown = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var innerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : innerNotation;
      var baseInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : innerNotation;
      _classCallCheck(this, MultiFactorialAmountNotation);
      _this2 = _callSuper(this, MultiFactorialAmountNotation);
      _this2._maxnum = new Decimal__default["default"](3628800);
      _this2._max_in_a_row = 5;
      _this2.minIterations = 1;
      _this2._base = new Decimal__default["default"](3);
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.factorialChars = [["!", ""], ["!", ""], ["(!^", ")"]];
      _this2.inverseChars = [["¡", ""], ["¡", ""], ["(¡^", ")"]];
      _this2.superexpAfter = false;
      _this2.baseShown = 1;
      _this2.innerNotation = new DefaultNotation();
      _this2.superexponentInnerNotation = _this2.innerNotation;
      _this2.baseInnerNotation = _this2.innerNotation;
      _this2.name = "Multi-Factorial Amount Notation";
      _this2.maxnum = maxnum;
      _this2.max_in_a_row = max_in_a_row;
      _this2.minIterations = minIterations;
      _this2.base = base;
      _this2.engineerings = engineerings;
      _this2.factorialChars = factorialChars;
      _this2.inverseChars = inverseChars;
      _this2.superexpAfter = superexpAfter;
      _this2.baseShown = baseShown;
      _this2.innerNotation = innerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.baseInnerNotation = baseInnerNotation;
      return _this2;
    }
    _inherits(MultiFactorialAmountNotation, _Notation2);
    return _createClass(MultiFactorialAmountNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.lte(1) && value.neq(0)) return "1 / " + this.format(value.recip());
        if (value.lte(2)) return this.innerNotation.format(value);
        var iterations = 0;
        var currentValue = toDecimal(value);
        while (iterations < this.minIterations && currentValue.gt(2)) {
          iterations++;
          currentValue = factorial_slog(currentValue, this._base);
        }
        while (currentValue.gte(this._maxnum)) {
          var currentiterations = iterations;
          iterations = nextEngineeringValue(new Decimal__default["default"](iterations), this._engineerings).toNumber();
          for (var i = currentiterations; i < iterations; i++) {
            currentValue = factorial_slog(currentValue, this._base);
            if (currentValue.lte(2)) break;
          }
        }
        return new FactorialAmountNotation(iterations, this._max_in_a_row, this._base, this.factorialChars, this.inverseChars, this.superexpAfter, this.baseShown, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(2)) throw new RangeError("maxnum <= 2 in Multi-Factorial Amount Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "max_in_a_row",
      get: function get() {
        return this._max_in_a_row;
      },
      set: function set(max_in_a_row) {
        if (max_in_a_row < 0) throw new RangeError("Negative max_in_a_row in Multi-Factorial Amount Notation");
        this._max_in_a_row = max_in_a_row;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        var baseD = toDecimal(base);
        if (baseD.lte(2)) throw new RangeError("Base <= 2 in Multi-Factorial Amount Notation");
        this._base = baseD;
      }
    }]);
  }(Notation);

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
  function FactoradicConvert(value) {
    var digitList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultBaseChars;
    var placesAbove1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -4;
    var placesBelow1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -4;
    var commasMin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var showZeroes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
    var reverseDigits = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var commaSpacing = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 3;
    var commaChars = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [","];
    var decimalChar = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : ".";
    var negativeChar = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : "-";
    var precision = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 18;
    var specialDigits = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : [];
    var concatenation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : null;
    var originalValue = value;
    if (digitList.length < 2) throw new RangeError("Factoradic requires at least two digits.");
    if (value > new Decimal__default["default"](digitList.length).factorial().round().toNumber()) throw new RangeError("Not enough digits were given for a number that large.");
    if (Math.max(placesAbove1, placesBelow1) > digitList.length - 1) throw new RangeError("More digits are needed to use that many decimal places.");
    if (value == 0) {
      var _result = digitList[0];
      if (showZeroes > 0 && placesAbove1 > 0) {
        _result += decimalChar;
        for (var p = 0; p < placesAbove1; p++) {
          _result += digitList[0];
        }
      }
      return _result;
    }
    var negative = false;
    if (value < 0) {
      negative = true;
      value *= -1;
    }
    var precisionSoFar = 0;
    var digits = [];
    var digitPosition = 0;
    var places = Math.abs(value) < 1 ? placesBelow1 : placesAbove1;
    var sigFigs = false;
    if (places < 0) {
      sigFigs = true;
      places = Math.max(-places - 1, 0);
    }
    if (value < 1) while (factorial(digitPosition - 1) >= value) {
      digitPosition--;
      if (sigFigs) places++;
    } else while (factorial(digitPosition + 2) <= value) {
      digitPosition++;
      if (sigFigs && places > 0) places--;
    }
    if (digitPosition < -places) return FactoradicConvert(0, digitList, placesAbove1, placesBelow1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);
    var startDigitPosition = digitPosition;
    while (Math.abs(value) >= factorial(-places - 1) && digitPosition >= -places && precisionSoFar < precision) {
      var factorialPosition = digitPosition + Math.sign(digitPosition) + (digitPosition == 0 ? 1 : 0);
      var digitLimit = Math.abs(factorialPosition) + 1;
      if (digitPosition == -places) digits.push(Math.round(value / factorial(factorialPosition)));else digits.push(Math.floor(value / factorial(factorialPosition)));
      value -= digits[digits.length - 1] * factorial(factorialPosition);
      if (digits[digits.length - 1] < 0 || digits[digits.length - 1] >= digitLimit) {
        var analyzed = digits.length - 1;
        var analyzedDigitPosition = digitPosition;
        while (digits[analyzed] < 0 || digits[analyzed] >= digitLimit) {
          var extracted = Math.floor(digits[analyzed] / digitLimit);
          digits[analyzed] -= extracted * digitLimit;
          if (analyzed == 0) {
            digits.unshift(extracted);
            if ((startDigitPosition < 0 || sigFigs) && places > 0) places--;
            startDigitPosition++;
            precisionSoFar++;
          } else {
            digits[analyzed - 1] += extracted;
          }
          analyzed--;
          analyzedDigitPosition++;
          digitLimit = Math.abs(analyzedDigitPosition + Math.sign(analyzedDigitPosition) + (analyzedDigitPosition == 0 ? 1 : 0)) + 1;
        }
      }
      digitPosition--;
      precisionSoFar++;
    }
    if (showZeroes == Number.NEGATIVE_INFINITY) {
      while (digits[digits.length - 1] == 0) digits.pop();
    } else while (digits[0] == 0 && startDigitPosition > -1) {
      digits.shift();
      startDigitPosition--;
    }
    while (digitPosition >= 0 || digitPosition >= -places && showZeroes != -1) {
      digits.push(0);
      digitPosition--;
    }
    digitPosition = startDigitPosition;
    var digitChars = [];
    var result = "";
    while (digitPosition >= 0) {
      var digitLocation = digitList;
      for (var d = 0; d < specialDigits.length; d++) {
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
      for (var c = 1; c < digitChars.length; c++) {
        if (digitChars[c][0] == digitChars[c - 1][0]) {
          digitChars[c - 1][1]++;
          digitChars.splice(c, 1);
          c--;
        }
      }
    }
    while (digitChars.length > 0) {
      var digitStr = digitChars[0][0];
      if (concatenation !== null && digitChars[0][1] > 1) {
        digitStr = "";
        if (concatenation[3] === undefined) digitStr = FactoradicConvert(digitChars[0][1], digitList, placesAbove1, placesBelow1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);else digitStr = concatenation[3].format(digitChars[0][1]);
        digitStr = concatenation[1] + digitStr + concatenation[2];
        if (concatenation[0]) digitStr = digitChars[0][0] + digitStr;else digitStr += digitChars[0][0];
      }
      if (reverseDigits) result = digitStr + result;else result += digitStr;
      digitChars.shift();
      if (commasMin >= 0 && Math.abs(originalValue) >= commasMin && digitChars.length % commaSpacing == 0 && digitChars.length != 0) {
        if (reverseDigits) result = commaChars[(digitChars.length / commaSpacing - 1) % commaChars.length] + result;else result += commaChars[(digitChars.length / commaSpacing - 1) % commaChars.length];
      }
    }
    if (showZeroes <= 0 && onlyAllowedCharacters(digits.join(""), ["0"])) digits = [];
    if (digits.length > 0) {
      while (digits[digits.length - 1] === 0 && showZeroes < 0) digits.pop();
    }
    if (digits.length > 0) {
      var _digitLocation = digitList;
      for (var _d = 0; _d < specialDigits.length; _d++) {
        if (specialDigits[_d][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[_d][1].length > digits[0]) {
          _digitLocation = specialDigits[_d][1];
          break;
        }
      }
      digitChars.push([_digitLocation[0], 1]);
      if (startDigitPosition < 0) {
        for (var i = 1; i < -startDigitPosition; i++) {
          digitPosition--;
          _digitLocation = digitList;
          for (var _d2 = 0; _d2 < specialDigits.length; _d2++) {
            if (specialDigits[_d2][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[_d2][1].length > digits[0]) {
              _digitLocation = specialDigits[_d2][1];
              break;
            }
          }
          digitChars.push([_digitLocation[0], 1]);
        }
      }
      while (digits.length > 0) {
        digitPosition--;
        _digitLocation = digitList;
        for (var _d3 = 0; _d3 < specialDigits.length; _d3++) {
          if (specialDigits[_d3][0](digitPosition, startDigitPosition - digitPosition, value) && specialDigits[_d3][1].length > digits[0]) {
            _digitLocation = specialDigits[_d3][1];
            break;
          }
        }
        digitChars.push([_digitLocation[digits[0]], 1]);
        digits.shift();
      }
      if (result == "") result = digitChars[0][0];
      digitChars.shift();
      if (reverseDigits) result = decimalChar + result;else result += decimalChar;
      if (concatenation !== null) {
        for (var _c = 1; _c < digitChars.length; _c++) {
          if (digitChars[_c][0] == digitChars[_c - 1][0]) {
            digitChars[_c - 1][1]++;
            digitChars.splice(_c, 1);
            _c--;
          }
        }
      }
      while (digitChars.length > 0) {
        var _digitStr = digitChars[0][0];
        if (concatenation !== null && digitChars[0][1] > 1) {
          _digitStr = "";
          if (concatenation[3] === undefined) _digitStr = FactoradicConvert(digitChars[0][1], digitList, placesAbove1, placesBelow1, commasMin, showZeroes, reverseDigits, commaSpacing, commaChars, decimalChar, negativeChar, precision, specialDigits, concatenation);else _digitStr = concatenation[3].format(digitChars[0][1]);
          _digitStr = concatenation[1] + _digitStr + concatenation[2];
          if (concatenation[0]) _digitStr = digitChars[0][0] + _digitStr;else _digitStr += digitChars[0][0];
        }
        if (reverseDigits) result = _digitStr + result;else result += _digitStr;
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
  var FactoradicNotation = /*#__PURE__*/function (_Notation) {
    function FactoradicNotation() {
      var _this;
      var digitList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBaseChars;
      var hyperBase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 720;
      var placesAbove1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -4;
      var placesBelow1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -4;
      var commasMin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var maxnum = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1307674368000;
      var minnum = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1 / 362880;
      var max_exps_in_a_row = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 5;
      var mantissaPower = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      var showZeroes = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : -1;
      var reverseDigits = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      var commaSpacing = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 3;
      var commaChars = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : [","];
      var decimalChar = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : ".";
      var expChars = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : [["$", ""], [false, ""], ["!", ""], [false, ""]];
      var negExpChars = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : [true, [digitList[1] + " / ", ""]];
      var expBefore = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : false;
      var hyperexpBefore = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : false;
      var precision = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : 18;
      var specialDigits = arguments.length > 19 && arguments[19] !== undefined ? arguments[19] : [];
      var concatenation = arguments.length > 20 && arguments[20] !== undefined ? arguments[20] : null;
      _classCallCheck(this, FactoradicNotation);
      _this = _callSuper(this, FactoradicNotation);
      _this.digitList = defaultBaseChars;
      _this.hyperBase = new Decimal__default["default"](720);
      _this.placesAbove1 = -4;
      _this.placesBelow1 = -4;
      _this.commasMin = Decimal__default["default"].dZero;
      _this.maxnum = new Decimal__default["default"](1307674368000);
      _this.minnum = new Decimal__default["default"](1 / 362880);
      _this.max_exps_in_a_row = 5;
      _this.mantissaPower = Decimal__default["default"].dZero;
      _this.showZeroes = -1;
      _this.reverseDigits = false;
      _this.commaSpacing = 3;
      _this.commaChars = [","];
      _this.decimalChar = ".";
      _this._expChars = [["$", ""], ["$", ""], ["!", ""], ["!", ""]];
      _this.negExpChars = null;
      _this.expBefore = false;
      _this.hyperexpBefore = false;
      _this.specialDigits = [];
      _this.concatenation = null;
      _this.name = "Factoradic Notation";
      _this.digitList = digitList;
      _this.hyperBase = toDecimal(hyperBase);
      _this.placesAbove1 = placesAbove1;
      _this.placesBelow1 = placesBelow1;
      _this.commasMin = toDecimal(commasMin);
      _this.maxnum = toDecimal(maxnum);
      _this.minnum = toDecimal(minnum);
      _this.max_exps_in_a_row = max_exps_in_a_row;
      _this.mantissaPower = toDecimal(mantissaPower);
      _this.showZeroes = showZeroes;
      _this.reverseDigits = reverseDigits;
      _this.commaSpacing = commaSpacing;
      _this.commaChars = commaChars;
      _this.decimalChar = decimalChar;
      _this.unconvertedExpChars = expChars;
      _this.expBefore = expBefore;
      _this.hyperexpBefore = hyperexpBefore;
      _this.precision = precision;
      _this.specialDigits = specialDigits;
      _this.concatenation = concatenation;
      _this.expChars = expChars;
      _this.negExpChars = negExpChars;
      return _this;
    }
    _inherits(FactoradicNotation, _Notation);
    return _createClass(FactoradicNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.abs().gte(this.minnum) && value.abs().lt(this.maxnum) || value.eq(0)) return FactoradicConvert(value.toNumber(), this.digitList, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
        var result = "";
        var negExp = false;
        var places = value.gte(1) ? this.placesAbove1 : this.placesBelow1;
        var sigFigPlaces = places;
        if (places < 0) sigFigPlaces = -places - 1;
        if (value.abs().lt(1)) {
          if (this.negExpChars != null && (this.negExpChars[0] == true || multabs(value.abs()).gte(this.maxnum.factorial()))) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
          negExp = true;
          var _factorial_scientifif = factorial_scientifify(value, 0, this.mantissaPower),
            _factorial_scientifif2 = _slicedToArray(_factorial_scientifif, 2),
            m = _factorial_scientifif2[0],
            e = _factorial_scientifif2[1];
          value = e.neg().factorial().mul(m);
        }
        if (value.abs().lt(this.maxnum.factorial())) {
          var _factorial_scientifif3 = factorial_scientifify(value, 1 / factorial(sigFigPlaces + 1), this.mantissaPower),
            _factorial_scientifif4 = _slicedToArray(_factorial_scientifif3, 2),
            _m = _factorial_scientifif4[0],
            _e = _factorial_scientifif4[1];
          var mantissa = _m.toNumber();
          var exponent = _e.toNumber();
          if (negExp) exponent *= -1;
          var beforeChar = this._expChars[0][0];
          var afterChar = this._expChars[0][1];
          if (negExp && this.negExpChars !== null && this.negExpChars[0] !== false) {
            if (this.negExpChars[0] === true) return this.negExpChars[1][0] + this.format(value.recip()) + this.negExpChars[1][1];
            beforeChar = this.negExpChars[0][0];
            afterChar = this.negExpChars[0][1];
            exponent *= -1;
          }
          var baseStr = FactoradicConvert(mantissa, this.digitList, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
          var exponentStr = FactoradicConvert(exponent, this.digitList, this.placesAbove1, this.placesBelow1, this.commasMin.toNumber(), this.showZeroes, this.reverseDigits, this.commaSpacing, this.commaChars, this.decimalChar, this.negativeString[0], this.precision, this.specialDigits, this.concatenation);
          if (this.expBefore) result = beforeChar + exponentStr + afterChar + baseStr;else result = baseStr + beforeChar + exponentStr + afterChar;
        } else {
          var negative = false;
          if (value.lt(0)) {
            negative = true;
            value = value.neg();
          }
          if (value.lt(iteratedfactorial(this.maxnum, this.max_exps_in_a_row))) {
            var added_es = 0;
            while (value.gte(this.maxnum.factorial())) {
              added_es++;
              value = inverse_factorial(value);
            }
            result = this.format(value);
            for (var _e2 = 0; _e2 < added_es; _e2++) result = this._expChars[1][0] + result + this._expChars[1][1];
          } else if (value.lt(iteratedfactorial(this.hyperBase, this.maxnum.toNumber()))) {
            var _factorial_hyperscien = factorial_hyperscientifify(value, this.hyperBase, 1 / factorial(sigFigPlaces + 1)),
              _factorial_hyperscien2 = _slicedToArray(_factorial_hyperscien, 2),
              _mantissa = _factorial_hyperscien2[0],
              _exponent = _factorial_hyperscien2[1];
            while (_mantissa.gte(this.hyperBase)) {
              _mantissa = inverse_factorial(_mantissa);
              _exponent = _exponent.plus(1);
            }
            while (_mantissa.lt(inverse_factorial(this.hyperBase))) {
              _mantissa = _mantissa.factorial();
              _exponent = _exponent.sub(1);
            }
            var _baseStr = this.format(_mantissa);
            var _exponentStr = this.format(_exponent);
            if (this.hyperexpBefore) result = this._expChars[2][0] + _exponentStr + this._expChars[2][1] + _baseStr;else result = _baseStr + this._expChars[2][0] + _exponentStr + this._expChars[2][1];
          } else {
            var _exponent2 = factorial_slog(value, this.hyperBase);
            result = this._expChars[3][0] + this.format(_exponent2) + this._expChars[3][1];
          }
          if (negative) result = this.negativeString + result;
        }
        return result;
      }
    }, {
      key: "expChars",
      get: function get() {
        return this.unconvertedExpChars;
      },
      set: function set(input) {
        var one = this.format(1);
        var limitStr = this.format(this.hyperBase);
        var expChars = [];
        expChars.push(input[0]);
        expChars.push(["", ""]);
        if (typeof input[1][0] == "string") expChars[1][0] = input[1][0];else if (input[1][0] === false) expChars[1][0] = one + input[0][0];else if (input[1][0] === true) expChars[1][0] = input[0][0] + one;
        if (typeof input[1][1] == "string") expChars[1][1] = input[1][1];else if (input[1][1] === false) expChars[1][1] = one + input[0][1];else if (input[1][1] === true) expChars[1][1] = input[0][1] + one;
        expChars.push(input[2]);
        expChars.push(["", ""]);
        if (typeof input[3][0] == "string") expChars[3][0] = input[3][0];else if (input[3][0] === false) expChars[3][0] = limitStr + input[2][0];else if (input[3][0] === true) expChars[3][0] = input[2][0] + limitStr;
        if (typeof input[3][1] == "string") expChars[3][1] = input[3][1];else if (input[3][1] === false) expChars[3][1] = limitStr + input[2][1];else if (input[3][1] === true) expChars[3][1] = input[2][1] + limitStr;
        this._expChars = expChars;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates numbers in terms of a root; this is the square root by default, so 64 is 8^2 and 10,000 is 100^2.
   * @param height ( Decimal ) The height of the root. Default is 2.
   * @param iterations ( Decimal ) The amount of root iterations: 1 is regular Root notation, 2 means the root is taken twice, and so on. This can be negative: for example, with -1 iterations, 13 would be "√(169)"
   * @param max_in_a_row ( number ) If there are more root iterations than this, then the ^b's are made into a ^b^n expression. Default is 5.
   * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
   * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null ) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
   * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
   * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param heightInnerNotation ( Notation ) The notation that the height within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var RootNotation = /*#__PURE__*/function (_Notation) {
    function RootNotation() {
      var _this;
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var max_Fs_in_a_row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var rootChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["", "^"], ["(", ")^"], null];
      var inverseChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["√(", ")"], ["√(", ")"], null];
      var superexpAfter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var heightShown = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : -1;
      var innerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : innerNotation;
      var heightInnerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : innerNotation;
      _classCallCheck(this, RootNotation);
      _this = _callSuper(this, RootNotation);
      _this.height = Decimal__default["default"].dTwo;
      _this.iterations = Decimal__default["default"].dOne;
      _this.max_in_a_row = 5;
      _this.rootChars = [["", "^"], ["(", ")^"], null];
      _this.inverseChars = [["√(", ")"], ["√(", ")"], null];
      _this.superexpAfter = true;
      _this.heightShown = -1;
      _this.innerNotation = new DefaultNotation();
      _this.superexponentInnerNotation = _this.innerNotation;
      _this.heightInnerNotation = _this.innerNotation;
      _this.name = "Root Notation";
      _this.height = toDecimal(height);
      _this.iterations = toDecimal(iterations);
      _this.max_in_a_row = max_Fs_in_a_row;
      _this.rootChars = rootChars;
      _this.inverseChars = inverseChars;
      _this.superexpAfter = superexpAfter;
      _this.heightShown = heightShown;
      _this.innerNotation = innerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.heightInnerNotation = heightInnerNotation;
      return _this;
    }
    _inherits(RootNotation, _Notation);
    return _createClass(RootNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var result = "";
        var iterations = this.iterations;
        value = value.root(this.height.pow(this.iterations));
        var usedChars = this.rootChars;
        if (iterations.lt(0) && this.inverseChars != null) {
          usedChars = this.inverseChars;
          iterations = iterations.neg();
        }
        var baseStr = this.heightInnerNotation.format(this.height);
        if (usedChars[2] === null) {
          if (this.iterations.lt(0)) usedChars[2] = ["^" + baseStr + "^-", ""];else usedChars[2] = ["^" + baseStr + "^", ""];
        } else if (this.inverseChars != null) iterations = iterations.abs();
        if (!this.heightShown) baseStr = "";
        result = this.innerNotation.format(value);
        if (iterations.gte(0) && iterations.lte(this.max_in_a_row) && iterations.mod(1).eq(0)) {
          for (var i = 0; i < iterations.toNumber(); i++) {
            var eChar = usedChars[i == 0 ? 0 : 1][0];
            var afterChar = usedChars[i == 0 ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.heightShown < 0) result = result + baseStr;else if (this.heightShown > 0) result = baseStr + result;
          }
        } else {
          var _eChar = usedChars[2][0];
          var _afterChar = usedChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = _eChar + eStr + _afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.heightShown < -1) result = result + baseStr;else if (this.heightShown > 1) result = baseStr + result;
        }
        return result;
      }
    }]);
  }(Notation);
  /**
   * A variant of root notation that uses a different root height depending on how large the number is.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 10000.
   * @param minHeight ( Decimal ) The minimum root height. Default is 2.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
   * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null ) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
   * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
   * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param heightInnerNotation ( Notation ) The notation that the height within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var IncreasingRootNotation = /*#__PURE__*/function (_Notation2) {
    function IncreasingRootNotation() {
      var _this2;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
      var minHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var engineerings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var rootChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["", "^"], ["(", ")^"], null];
      var inverseChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["√(", ")"], ["√(", ")"], null];
      var heightShown = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
      var innerNotation = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new DefaultNotation();
      var heightInnerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : innerNotation;
      _classCallCheck(this, IncreasingRootNotation);
      _this2 = _callSuper(this, IncreasingRootNotation);
      _this2._maxnum = new Decimal__default["default"](10000);
      _this2.minHeight = Decimal__default["default"].dTwo;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.rootChars = [["", "^"], ["(", ")^"], null];
      _this2.inverseChars = [["√(", ")"], ["√(", ")"], null];
      _this2.heightShown = -1;
      _this2.innerNotation = new DefaultNotation();
      _this2.heightInnerNotation = _this2.innerNotation;
      _this2.name = "Increasing Root Notation";
      _this2.maxnum = maxnum;
      _this2.minHeight = toDecimal(minHeight);
      _this2.engineerings = engineerings;
      _this2.rootChars = rootChars;
      _this2.inverseChars = inverseChars;
      _this2.heightShown = heightShown;
      _this2.innerNotation = innerNotation;
      _this2.heightInnerNotation = heightInnerNotation;
      return _this2;
    }
    _inherits(IncreasingRootNotation, _Notation2);
    return _createClass(IncreasingRootNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.innerNotation.format(0);
        var height = nextEngineeringValue(Decimal__default["default"].log(value, this._maxnum), this._engineerings).max(this.minHeight);
        return new RootNotation(height, 1, 5, this.rootChars, this.inverseChars, true, this.heightShown, this.innerNotation, this.innerNotation, this.heightInnerNotation).format(value);
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(1)) throw new RangeError("maxnum <= 1 in Increasing Root Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }]);
  }(Notation);
  /**
   * A variant of root notation that uses a different amount of root iterations depending on how large the number is. Once the amount of iterations gets too high, we go to a higher layer where the amount of iterations is itself written in this notation, and repeat that layering process for larger and larger numbers.
   * @param height ( Decimal ) The height of the root. Default is 2.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 10000.
   * @param max_iterations_in_a_row ( number ) If there are more root iterations than this, then the ^b's are made into a ^b^n expression. Default is 5.
   * @param minIterations ( Decimal ) The minimum amount of root iterations. Default is 1.
   * @param maxIterations ( Decimal ) The amount of root iterations must be less than this: anything higher and the layer is increased. Default is 10000.
   * @param layerBase ( Decimal ) The number that we're repeatedly taking the root of on higher layers. Default is equal to the height so that the power tower is filled with one number instead of two alternating numbers.
   * @param max_layers_in_a_row ( number ) If there are more root iterations than this, then the ^b^h's are made into a (^b^h)^n expression. Default is 3.
   * @param iterationEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of iterations: if it's three then the iteration amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param layerEngineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed amounts of layers: if it's three then the layer amount will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted layer amount values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param rootChars ( [[string, string], [string, string], [string, string] | null] ) An array of three pairs of strings that are used as the characters to indicate root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ^ in "5^2", rootChars[1] takes the place of the ( and )^ in "(7^2)^2^2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the ^2^13 in 7^2^13. Default is [["", "^"], ["", "^"], null]; if rootChars[2] is null, then it's set to ["^(base)^", ""].
   * @param inverseChars ( [[string, string], [string, string], [string, string] | null] | null) An equivalent of rootChars used for a root of negative iterations. Default is [["√(", ")"], ["√(", ")"], null]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as ^2^-1.
   * @param superexpAfter ( boolean ) This is true by default; if it's true, a ^b^n expression comes after the number instead of before.
   * @param layerChars ( [string, string] ) A pair of strings that represent an additional layer: the first string is placed before the number, the second is placed afterwards. Default is ["", "^b^h"], where b is layerBase and h is height.
   * @param layerAfter ( boolean ) This is false by default; if it's true, the layerChars come after the number instead of before.
   * @param heightShown ( number ) This is -1 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression. The height is not shown once the root is made into a ^b^n expression unless the absolute value of this parameter is above 1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the n in an (^b^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param heightInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var MultiRootNotation = /*#__PURE__*/function (_Notation3) {
    function MultiRootNotation() {
      var _this3;
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var maxnum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
      var max_iterations_in_a_row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var minIterations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var maxIterations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10000;
      var layerBase = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : height;
      var max_layers_in_a_row = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 3;
      var iterationEngineerings = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
      var layerEngineerings = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
      var rootChars = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [["", "^"], ["(", ")^"], null];
      var inverseChars = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [["√(", ")"], ["√(", ")"], null];
      var superexpAfter = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : true;
      var layerChars = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : null;
      var layerAfter = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
      var heightShown = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : -1;
      var innerNotation = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : innerNotation;
      var heightInnerNotation = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : innerNotation;
      _classCallCheck(this, MultiRootNotation);
      _this3 = _callSuper(this, MultiRootNotation);
      _this3.height = Decimal__default["default"].dTwo;
      _this3.maxnum = new Decimal__default["default"](10000);
      _this3.max_iterations_in_a_row = 5;
      _this3.minIterations = Decimal__default["default"].dOne;
      _this3.maxIterations = new Decimal__default["default"](10000);
      _this3.layerBase = _this3.height;
      _this3.max_layers_in_a_row = 3;
      _this3._iterationEngineerings = [Decimal__default["default"].dOne];
      _this3._layerEngineerings = [Decimal__default["default"].dOne];
      _this3.rootChars = [["", "^"], ["(", ")^"], null];
      _this3.inverseChars = [["√(", ")"], ["√(", ")"], null];
      _this3.superexpAfter = true;
      _this3.layerChars = null;
      _this3.layerAfter = false;
      _this3.heightShown = -1;
      _this3.innerNotation = new DefaultNotation();
      _this3.superexponentInnerNotation = _this3.innerNotation;
      _this3.heightInnerNotation = _this3.innerNotation;
      _this3.name = "Multi-Root Notation";
      _this3.height = toDecimal(height);
      _this3.maxnum = toDecimal(maxnum);
      _this3.max_iterations_in_a_row = max_iterations_in_a_row;
      _this3.minIterations = toDecimal(minIterations);
      _this3.maxIterations = toDecimal(maxIterations);
      _this3.layerBase = toDecimal(layerBase);
      _this3.max_layers_in_a_row = max_layers_in_a_row;
      _this3.iterationEngineerings = iterationEngineerings;
      _this3.layerEngineerings = layerEngineerings;
      _this3.rootChars = rootChars;
      _this3.inverseChars = inverseChars;
      _this3.superexpAfter = superexpAfter;
      _this3.layerChars = layerChars;
      _this3.layerAfter = layerAfter;
      _this3.heightShown = heightShown;
      _this3.innerNotation = innerNotation;
      _this3.superexponentInnerNotation = superexponentInnerNotation;
      _this3.heightInnerNotation = heightInnerNotation;
      return _this3;
    }
    _inherits(MultiRootNotation, _Notation3);
    return _createClass(MultiRootNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.innerNotation.format(0);
        if (value.lt(1)) return this.innerNotation.format(1) + " / " + this.format(value.recip());
        var layers = 0;
        layers = currentEngineeringValue(Decimal__default["default"].slog(value, 10, true).sub(Decimal__default["default"].slog(Decimal__default["default"].iteratedexp(10, 2, new Decimal__default["default"](Number.MAX_SAFE_INTEGER), true))).div(2), this._layerEngineerings).max(0).toNumber();
        if (layers > 0) value = value.iteratedlog(10, layers * 2, true);
        if (layers >= 4.5e15) value = this.maxnum.pow(Decimal__default["default"].pow(this.height, this.maxIterations));else while (value.gte(this.maxnum.pow(Decimal__default["default"].pow(this.height, this.maxIterations)))) {
          var nextLayers = nextEngineeringValue(new Decimal__default["default"](layers), this._layerEngineerings).toNumber();
          var layerdiff = nextLayers - layers;
          for (var i = 0; i < layerdiff; i++) value = value.log(this.layerBase).log(this.height);
          layers = nextLayers;
        }
        var iterations = value.log(this.maxnum).log(this.height);
        if (!Decimal__default["default"].isFinite(iterations)) iterations = this.minIterations;else iterations = nextEngineeringValue(iterations, this._iterationEngineerings).max(this.minIterations);
        var subresult = new RootNotation(this.height, iterations, this.max_iterations_in_a_row, this.rootChars, this.inverseChars, this.superexpAfter, this.heightShown, this.innerNotation, this.superexponentInnerNotation, this.heightInnerNotation).format(value);
        var result = subresult;
        if (layers == 0) return subresult;
        var layerBeforeStr = "";
        var layerAfterStr = "";
        var baseStr = this.heightInnerNotation.format(this.layerBase);
        var usedChars = this.rootChars;
        if (usedChars[2] === null) {
          if (iterations.lt(0)) usedChars[2] = ["^" + baseStr + "^-", ""];else usedChars[2] = ["^" + baseStr + "^", ""];
        }
        if (!this.heightShown) baseStr = "";
        if (this.layerChars == null) {
          var eChar = usedChars[0][0];
          var afterChar = usedChars[0][1];
          var eStr = this.heightInnerNotation.format(this.height);
          if (this.superexpAfter) eStr = baseStr + "^" + eStr + afterChar;else eStr = baseStr + "^" + eStr + eChar;
          if (this.layerAfter) layerAfterStr = eStr;else layerBeforeStr = eStr;
        } else {
          layerBeforeStr = this.layerChars[0];
          layerAfterStr = this.layerChars[1];
        }
        if (layers >= 0 && layers <= this.max_layers_in_a_row) {
          for (var l = 0; l < layers; l++) {
            result = layerBeforeStr + result + layerAfterStr;
          }
        } else {
          var leStr = this.superexponentInnerNotation.format(layers);
          if (this.layerAfter) leStr = "(" + layerAfterStr + ")" + "^" + leStr;else leStr = "(" + layerBeforeStr + ")" + "^" + leStr;
          if (this.layerAfter) result = result + "(" + leStr + ")";else result = "(" + leStr + ")" + result;
        }
        return result;
      }
    }, {
      key: "iterationEngineerings",
      get: function get() {
        return this._iterationEngineerings;
      },
      set: function set(iterationEngineerings) {
        if (!Array.isArray(iterationEngineerings)) iterationEngineerings = [iterationEngineerings];
        if (iterationEngineerings.length == 0) {
          this._iterationEngineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = iterationEngineerings.map(toDecimal);
        this._iterationEngineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }, {
      key: "layerEngineerings",
      get: function get() {
        return this._layerEngineerings;
      },
      set: function set(layerEngineerings) {
        if (!Array.isArray(layerEngineerings)) layerEngineerings = [layerEngineerings];
        if (layerEngineerings.length == 0) {
          this._layerEngineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = layerEngineerings.map(toDecimal);
        this._layerEngineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }]);
  }(Notation);

  /**
   * Abbreviates numbers in terms of their super-root; this is the square super-root by default, so 256 is 4↑↑2 and 46,656 is 6↑↑2.
   * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
   * @param iterations ( number ) The amount of super-root iterations: 1 is regular Super-Root notation, 2 means the super-root is taken twice, and so on. This can be negative.
   * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
   * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
   * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
   * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var SuperRootNotation = /*#__PURE__*/function (_Notation) {
    function SuperRootNotation() {
      var _this;
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var max_Fs_in_a_row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var rootChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      var inverseChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      var superexpAfter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var heightShown = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : -1;
      var innerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : innerNotation;
      var baseInnerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : innerNotation;
      _classCallCheck(this, SuperRootNotation);
      _this = _callSuper(this, SuperRootNotation);
      _this._height = 2;
      _this._iterations = 1;
      _this.max_in_a_row = 5;
      _this.rootChars = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      _this.inverseChars = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      _this.superexpAfter = true;
      _this.heightShown = -1;
      _this.innerNotation = new DefaultNotation();
      _this.superexponentInnerNotation = _this.innerNotation;
      _this.baseInnerNotation = _this.innerNotation;
      _this.name = "Super Root Notation";
      _this.height = height;
      _this.iterations = iterations;
      _this.max_in_a_row = max_Fs_in_a_row;
      _this.rootChars = rootChars;
      _this.inverseChars = inverseChars;
      _this.superexpAfter = superexpAfter;
      _this.heightShown = heightShown;
      _this.innerNotation = innerNotation;
      _this.superexponentInnerNotation = superexponentInnerNotation;
      _this.baseInnerNotation = baseInnerNotation;
      return _this;
    }
    _inherits(SuperRootNotation, _Notation);
    return _createClass(SuperRootNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var result = "";
        var iterations = this._iterations;
        if (iterations < 0) {
          var i = 0;
          for (; i > iterations; i--) {
            if (value.gt(Decimal__default["default"].iteratedexp(10, Math.ceil(this._height) + 1, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)))) {
              value = Decimal__default["default"].tetrate(10, (i - iterations) * (Math.ceil(this._height) - 1), value, true);
              i = iterations;
            }
            value = Decimal__default["default"].tetrate(value, this._height, 1, true);
          }
        } else {
          var _i = 0;
          _i = Decimal__default["default"].slog(value, 10, true).sub(Decimal__default["default"].slog(Decimal__default["default"].iteratedexp(10, Math.ceil(this._height) + 1, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)), 10, true)).div(Math.ceil(this._height) - 1).floor().max(0).min(iterations).toNumber();
          if (_i > 0) value = Decimal__default["default"].iteratedlog(value, 10, _i * (Math.ceil(this._height) - 1), true);
          for (; _i < iterations; _i++) {
            var newvalue = Decimal__default["default"].linear_sroot(value, this._height);
            if (newvalue.isNan()) {
              iterations = _i;
              break;
            }
            value = newvalue;
          }
        }
        var usedChars = this.rootChars;
        if (iterations < 0 && this.inverseChars != null) {
          usedChars = this.inverseChars;
          iterations *= -1;
        }
        var heightStr = "";
        if (this.heightShown) heightStr = this.baseInnerNotation.format(this._height);
        result = this.innerNotation.format(value);
        if (iterations >= 0 && iterations <= this.max_in_a_row && iterations % 1 == 0) {
          for (var _i2 = 0; _i2 < iterations; _i2++) {
            var eChar = usedChars[_i2 == 0 ? 0 : 1][0];
            var afterChar = usedChars[_i2 == 0 ? 0 : 1][1];
            result = eChar + result + afterChar;
            if (this.heightShown < 0) result = result + heightStr;else result = heightStr + result;
          }
        } else {
          var _eChar = usedChars[2][0];
          var _afterChar = usedChars[2][1];
          var eStr = this.superexponentInnerNotation.format(iterations);
          eStr = _eChar + eStr + _afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.heightShown < 0) result = result + heightStr;else result = heightStr + result;
        }
        return result;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(height) {
        if (height < 1) throw new RangeError("Super root notation does not work with a height less than 1.");
        this._height = height;
      }
    }, {
      key: "iterations",
      get: function get() {
        return this._iterations;
      },
      set: function set(iterations) {
        if (iterations % 1 != 0) throw new RangeError("Super Root Notation requires a whole number of iterations");
        this._iterations = iterations;
      }
    }]);
  }(Notation);
  /**
   * A variant of super-root notation that uses a different amount of super-root iterations depending on how large the number is.
   * @param height ( number ) The height of the super-root. Default is 2. This notation does not work with a super-root height less than 1.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the amount of iterations increases. Default is 1e10.
   * @param max_in_a_row ( number ) If there are more super-root iterations than this, then the ↑↑b's are made into a (↑↑b^n) expression. Default is 5.
   * @param minIterations ( number ) The minimum amount of super-root iterations. Default is 1.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed iteration amounts: if it's three then the amount of iterations will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted iteration amounts are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
   * @param superexpAfter ( boolean ) This is true by default; if it's true, an (↑↑^n) expression comes after the number instead of before.
   * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param superexponentInnerNotation ( Notation ) The notation that the number in an (↑↑^n) expression is itself notated with. Is the same as innerNotation by default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var MultiSuperRootNotation = /*#__PURE__*/function (_Notation2) {
    function MultiSuperRootNotation() {
      var _this2;
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var maxnum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e10;
      var max_in_a_row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
      var minIterations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var engineerings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var rootChars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      var inverseChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      var superexpAfter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
      var heightShown = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : -1;
      var innerNotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : new DefaultNotation();
      var superexponentInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : innerNotation;
      var baseInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : innerNotation;
      _classCallCheck(this, MultiSuperRootNotation);
      _this2 = _callSuper(this, MultiSuperRootNotation);
      _this2._height = 2;
      _this2._maxnum = new Decimal__default["default"](1e10);
      _this2.max_in_a_row = 5;
      _this2.minIterations = 1;
      _this2._engineerings = [Decimal__default["default"].dOne];
      _this2.rootChars = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      _this2.inverseChars = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      _this2.superexpAfter = true;
      _this2.heightShown = -1;
      _this2.innerNotation = new DefaultNotation();
      _this2.superexponentInnerNotation = _this2.innerNotation;
      _this2.baseInnerNotation = _this2.innerNotation;
      _this2.name = "Multi-Super Root Notation";
      _this2.height = height;
      _this2.maxnum = maxnum;
      _this2.max_in_a_row = max_in_a_row;
      _this2.minIterations = minIterations;
      _this2.engineerings = engineerings;
      _this2.rootChars = rootChars;
      _this2.inverseChars = inverseChars;
      _this2.superexpAfter = superexpAfter;
      _this2.heightShown = heightShown;
      _this2.innerNotation = innerNotation;
      _this2.superexponentInnerNotation = superexponentInnerNotation;
      _this2.baseInnerNotation = baseInnerNotation;
      return _this2;
    }
    _inherits(MultiSuperRootNotation, _Notation2);
    return _createClass(MultiSuperRootNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.gte(Decimal__default["default"].tetrate(10, 9e15, 1))) {
          // Imprecision was causing problems, so if we're too high, just ignore the root process and find an equivalent expression with slog
          var result = this.innerNotation.format(this._maxnum);
          var eChar = this.rootChars[2][0];
          var afterChar = this.rootChars[2][1];
          var eStr = this.superexponentInnerNotation.format(Decimal__default["default"].slog(value, 10, true).div(Math.ceil(this._height) - 1));
          var heightStr = "";
          if (this.heightShown) heightStr = this.baseInnerNotation.format(this._height);
          eStr = eChar + eStr + afterChar;
          if (this.superexpAfter) result = result + eStr;else result = eStr + result;
          if (this.heightShown < 0) result = result + heightStr;else result = heightStr + result;
          return result;
        }
        var iterations = 0;
        var currentValue = toDecimal(value);
        if (this.minIterations < 0) {
          for (; iterations > this.minIterations; iterations--) {
            if (currentValue.gt(Decimal__default["default"].iteratedexp(10, Math.ceil(this._height) + 1, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)))) {
              currentValue = Decimal__default["default"].tetrate(10, (iterations - this.minIterations) * (Math.ceil(this._height) - 1), currentValue, true);
              iterations = this.minIterations;
            }
            currentValue = Decimal__default["default"].tetrate(currentValue, this._height, 1, true);
          }
        } else {
          var addediterations = currentEngineeringValue(Decimal__default["default"].slog(currentValue, 10, true).sub(Decimal__default["default"].slog(Decimal__default["default"].iteratedexp(10, Math.ceil(this._height) + 1, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)), 10, true)).div(Math.ceil(this._height) - 1), this._engineerings).max(this.minIterations);
          if (addediterations.gt(0)) currentValue = Decimal__default["default"].iteratedlog(currentValue, 10, addediterations.mul(Math.ceil(this._height) - 1).toNumber(), true);
          iterations += addediterations.toNumber();
          while (iterations < this.minIterations) {
            var newvalue = Decimal__default["default"].linear_sroot(currentValue, this._height);
            if (newvalue.isNan()) break;
            currentValue = newvalue;
            iterations++;
          }
        }
        IterationLoop: while (currentValue.gte(this._maxnum)) {
          var _newvalue = currentValue;
          var currentiterations = iterations;
          iterations = nextEngineeringValue(new Decimal__default["default"](iterations), this._engineerings).toNumber();
          var iterationDifference = iterations - currentiterations;
          if (iterations == currentiterations) iterationDifference = 1; //If the amount of iterations is so high that nextEngineeringValue doesn't change it, ignore the engineering stuff and just get down to the point.
          for (var i = 0; i < iterationDifference; i++) {
            _newvalue = Decimal__default["default"].linear_sroot(currentValue, this._height);
            if (_newvalue.isNan()) {
              iterations = currentiterations;
              break IterationLoop;
            }
            currentValue = _newvalue;
          }
        }
        return new SuperRootNotation(this._height, iterations, this.max_in_a_row, this.rootChars, this.inverseChars, this.superexpAfter, this.heightShown, this.innerNotation, this.superexponentInnerNotation, this.baseInnerNotation).format(value);
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(height) {
        if (height < 1) throw new RangeError("Super root notation does not work with a height less than 1.");
        this._height = height;
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(1)) throw new RangeError("maxnum <= 1 in Multi-Super Root Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }]);
  }(Notation);
  /**
   * A variant of super-root notation that uses a different super-root height depending on how large the number is.
   * @param maxnum ( Decimal ) Only numbers below this value are allowed to show up on their own - anything higher and the height increases. Default is 65536.
   * @param minHeight ( number ) The minimum super-root height. Default is 2.
   * @param engineerings ( Decimal | Decimal[] ) Either a DecimalSource or an array of DecimalSources; default is 1. This parameter controls the allowed height values: if it's three then the height will always be a multiple of 3. If this is an array, then multiples of those values are added from greatest to least to get the allowed values: for example, if engineerings is [5, 2], then the permitted height values are 2, 4, 5, 7, 9, 10, 12, 14... and so on, i.e. multiples of 5 plus a multiple of 2 less than 5 (which may be 0).
   * @param rootChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used as the characters to indicate super-root notation. In each pair, the first entry goes before the number, the second entry goes after the number. rootChars[0] takes the place of the ↑↑ in "7↑↑2", rootChars[1] takes the place of the second ↑↑ in "(8↑↑2)↑↑2" (rootChars[0] is for the innermost root, rootChars[1] is for the outer ones), and rootChars[2] takes the place of the (↑↑^) in 6(↑↑^7)2. Default is [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]].
   * @param inverseChars ( [[string, string], [string, string], [string, string]] ) An equivalent of rootChars used for a super-root of negative iterations. Default is [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]]. If this is set to null instead of a pair of strings, negative iterations just show negative iterations of rootChars[2], such as (↑↑^-1).
   * @param heightShown ( number ) This is 0 by default. If this is 0, the height is not shown. If this is positive, the height is shown at the beginning of the expression. If this is negative, the height is shown at the end of the expression.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param baseInnerNotation ( Notation ) The notation that the base within the expression, if included, is itself notated with. Is the same as innerNotation by default.
   */
  var IncreasingSuperRootNotation = /*#__PURE__*/function (_Notation3) {
    function IncreasingSuperRootNotation() {
      var _this3;
      var maxnum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 65536;
      var minHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var engineerings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var rootChars = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      var inverseChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      var heightShown = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1;
      var innerNotation = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new DefaultNotation();
      var baseInnerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : innerNotation;
      _classCallCheck(this, IncreasingSuperRootNotation);
      _this3 = _callSuper(this, IncreasingSuperRootNotation);
      _this3._maxnum = new Decimal__default["default"](65536);
      _this3._minHeight = 2;
      _this3._engineerings = [Decimal__default["default"].dOne];
      _this3.rootChars = [["", "↑↑"], ["(", ")↑↑"], ["(↑↑^", ")"]];
      _this3.inverseChars = [["sroot(", ")"], ["sroot(", ")"], ["(sroot^", ")"]];
      _this3.heightShown = -1;
      _this3.innerNotation = new DefaultNotation();
      _this3.baseInnerNotation = _this3.innerNotation;
      _this3.name = "Increasing Super Root Notation";
      _this3.maxnum = maxnum;
      _this3.minHeight = minHeight;
      _this3.engineerings = engineerings;
      _this3.rootChars = rootChars;
      _this3.inverseChars = inverseChars;
      _this3.heightShown = heightShown;
      _this3.innerNotation = innerNotation;
      _this3.baseInnerNotation = baseInnerNotation;
      return _this3;
    }
    _inherits(IncreasingSuperRootNotation, _Notation3);
    return _createClass(IncreasingSuperRootNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.innerNotation.format(0);
        var height = nextEngineeringValue(Decimal__default["default"].slog(value, this._maxnum.toNumber(), true), this._engineerings).max(this._minHeight).toNumber();
        if (value.gte(Decimal__default["default"].tetrate(10, 9e15, 1))) {
          // Imprecision was causing problems, so if we're too high, just ignore the root process and find an equivalent expression with slog
          var result = this.innerNotation.format(this._maxnum);
          var eChar = this.rootChars[0][0];
          var afterChar = this.rootChars[0][1];
          result = eChar + result + afterChar;
          var heightStr = this.baseInnerNotation.format(height);
          if (this.heightShown < 0) result = result + heightStr;else result = heightStr + result;
          return result;
        }
        return new SuperRootNotation(height, 1, 5, this.rootChars, this.inverseChars, true, this.heightShown, this.innerNotation, this.innerNotation, this.baseInnerNotation).format(value);
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(1)) throw new RangeError("maxnum <= 1 in Increasing Super Root Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "minHeight",
      get: function get() {
        return this._minHeight;
      },
      set: function set(minHeight) {
        if (minHeight < 1) throw new RangeError("Super root notation does not work with a height less than 1.");
        this._minHeight = minHeight;
      }
    }, {
      key: "engineerings",
      get: function get() {
        return this._engineerings;
      },
      set: function set(engineerings) {
        if (!Array.isArray(engineerings)) engineerings = [engineerings];
        if (engineerings.length == 0) {
          this._engineerings = [Decimal__default["default"].dOne];
          return;
        }
        var engineeringsD = engineerings.map(toDecimal);
        this._engineerings = engineeringsD.sort(function (a, b) {
          if (a.lt(b)) return -1;else if (a.eq(b)) return 0;else return 1;
        }).reverse();
      }
    }]);
  }(Notation);

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
  var PrimeNotation = /*#__PURE__*/function (_Notation) {
    function PrimeNotation() {
      var _this;
      var maxPrime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
      var max_tower_height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      var fractionPrecision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1e-6;
      var numLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.pow(maxPrime, 2);
      var powerBase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : maxPrime;
      var minimum = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Math.pow(maxPrime, -1);
      var multiplicationString = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : " * ";
      var powerString = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : ["^", ""];
      var powerBefore = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var expChars = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [["(", ")^(", ")"], ["(", ")^^(", ")"]];
      var baseInnerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : new DefaultNotation();
      var powerInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : baseInnerNotation;
      var recipString = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : null;
      _classCallCheck(this, PrimeNotation);
      _this = _callSuper(this, PrimeNotation);
      _this._maxPrime = 10000;
      _this.max_tower_height = 5;
      _this.fractionPrecision = -1e-6;
      _this.numLimit = Math.pow(_this._maxPrime, 2);
      _this._powerBase = _this._maxPrime;
      _this.minimum = Math.pow(_this._maxPrime, -1);
      _this.multiplicationString = " * ";
      _this.powerString = ["^", ""];
      _this.powerBefore = false;
      _this.expChars = [["(", ")^(", ")"], ["(", ")^^(", ")"]];
      _this.baseInnerNotation = new DefaultNotation();
      _this.powerInnerNotation = _this.baseInnerNotation;
      _this.recipString = null;
      _this.name = "Prime Notation";
      _this.maxPrime = maxPrime;
      _this.max_tower_height = max_tower_height;
      _this.fractionPrecision = fractionPrecision;
      _this.numLimit = numLimit;
      _this.powerBase = powerBase;
      _this.minimum = minimum;
      _this.multiplicationString = multiplicationString;
      _this.powerString = powerString;
      _this.powerBefore = powerBefore;
      _this.expChars = expChars;
      _this.baseInnerNotation = baseInnerNotation;
      _this.powerInnerNotation = powerInnerNotation;
      _this.recipString = recipString;
      return _this;
    }
    _inherits(PrimeNotation, _Notation);
    return _createClass(PrimeNotation, [{
      key: "formatNegativeDecimal",
      value: function formatNegativeDecimal(value) {
        return this.baseInnerNotation.format(-1) + this.multiplicationString + this.formatDecimal(value);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0) || value.eq(1) || value.eq(-1)) return this.baseInnerNotation.format(value);
        var powerNotation = this.powerInnerNotation === null ? this : this.powerInnerNotation;
        if (value.lt(this.minimum)) {
          var recipString = this.recipString;
          if (recipString === null) recipString = ["(", ")" + this.powerString[0] + powerNotation.format(-1) + this.powerString[1]];
          return recipString[0] + this.format(value.recip()) + recipString[1];
        }
        var result = "";
        if (value.lt(this.numLimit)) {
          var factorization = primeFactorizeFraction(value.toNumber(), this._maxPrime, this.fractionPrecision, Infinity, this.numLimit, true, this.numLimit, true);
          if (factorization.length == 0) return this.baseInnerNotation.format(1);
          for (var f = 0; f < factorization.length; f++) {
            var subresult = this.baseInnerNotation.format(factorization[f][0]);
            if (factorization[f][1] != 1) {
              var pStr = this.powerString[0] + powerNotation.format(factorization[f][1]) + this.powerString[1];
              if (this.powerBefore) subresult = pStr + subresult;else subresult += pStr;
            }
            result += subresult;
            if (f < factorization.length - 1) result += this.multiplicationString;
          }
        } else {
          if (value.lt(Decimal__default["default"].iteratedexp(this._powerBase, this.max_tower_height - 2, new Decimal__default["default"](this.numLimit).tetrate(2)))) {
            var powArray = [];
            var currentValue = value;
            while (currentValue.gte(Decimal__default["default"].pow(this.numLimit, this.numLimit))) {
              powArray.push(this._powerBase);
              currentValue = currentValue.log(this._powerBase);
            }
            var root = currentValue.log(this.numLimit).plus(1).floor();
            currentValue = currentValue.root(root);
            while (currentValue.gte(this.numLimit)) {
              //Imprecision safeguard
              root = root.plus(1);
              currentValue = currentValue.root(root);
            }
            powArray.push(currentValue, root);
            result = this.expChars[0][0] + this.format(powArray[0]);
            for (var p = 1; p < powArray.length; p++) result += this.expChars[0][1] + this.format(powArray[p]);
            result += this.expChars[0][2];
          } else {
            var sroot = value.slog(this.numLimit, 100, true).plus(1).floor();
            if (sroot.lt(this.numLimit)) {
              var _currentValue = value.linear_sroot(sroot.toNumber());
              result = this.expChars[1][0] + this.format(_currentValue) + this.expChars[1][1] + this.format(sroot) + this.expChars[1][2];
            } else result = this.expChars[1][0] + this.format(this._powerBase) + this.expChars[1][1] + this.format(value.slog(this._powerBase, 100, true)) + this.expChars[1][2];
          }
        }
        return result;
      }
    }, {
      key: "maxPrime",
      get: function get() {
        return this._maxPrime;
      },
      set: function set(maxPrime) {
        if (maxPrime < 2) throw new RangeError("maxPrime below 2 in Prime Notation");
        this._maxPrime = maxPrime;
      }
    }, {
      key: "powerBase",
      get: function get() {
        return this._powerBase;
      },
      set: function set(powerBase) {
        if (powerBase <= 1.44466786100976613366) throw new RangeError("Bases with convergent tetration don't work as the powerBase for Prime Notation");
        this._powerBase = powerBase;
      }
    }]);
  }(Notation);

  /**
   * Uses PsiCubed2's "lexiographic ordering" as described at https://googology.fandom.com/wiki/User_blog:PsiCubed2/An_intuitive_lexicographic_ordering_of_numbers_up_to_P10_(%CF%89%5E%CF%89-level).
   * In summary, this notation starts with exponential expressions with E, then tetrational with F, then pentational with G, then (though this usually doesn't come up) hexational with H, but after the first entry (which represents the logarithm/super-logarithm/penta-logarithm) there are entries after dashes that each add accuracy to the approximation.
   * For example, in an E4-x expression, that x is the digits of the mantissa in n*10^4, and in an F8-x expression, that x is whatever's at the top of the power tower of 8 tens that represents the given value.
   * This notation obeys the rule that chopping off characters from the end always produces less accurate approximations, which means each digit has more precedence than all the digits afterwards:
   * for example, anything of the form F2-45-42..., no matter what comes after that 2, is greater than anything of the form F2-45-41...
   * @param maxEntries ( number | number[] ) In its complete form, this is an array of four numbers: the first determines the maximum amount of dash entries for E-level numbers, the second is for F-level numbers, the third is for G-level numbers, and the fourth is for H-level numbers. If a single number is given instead of an array, all three values are set to that same number. If less than four elements are provided, the remaining elements are set to be equal to the last provided element. Default is [2, 4, 6, 8].
   * @param maxPrecision ( number ) The highest amount of digits that a dash entry can show. Default is 10.
   * @param base ( number | string[] ) This parameter, which can be either a number or an array of strings, controls the base this notation works in. If the base is a number, the default set of digits for that base is used: 0 through 9, then A through Z, then a through z, then + and /. This notation will throw an error if base is a number above 64, as only 64 default digits are chosen. If base is an array of strings, then those strings are taken as the digits of the base (the number of the base is base.length in this case); bases above 64 are allowed if you provide an array with more than 64 strings. Default is 10.
   * @param dashString ( string ) The string placed between each dash entry. Default is "-".
   * @param letters ( [string, string, string, string] ) The three letters used for exponential, tetrational, pentational, and hexational expressions respectively. Default is ["E", "F", "G", "H"].
   * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in the base being used.
   *
   * Since this notation relies on its base to format the numbers themselves, it does not have an innerNotation parameter.
   */
  var PsiDashNotation = /*#__PURE__*/function (_Notation) {
    function PsiDashNotation() {
      var _this;
      var maxEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [2, 4, 6, 8];
      var maxPrecision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var dashString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "-";
      var letters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ["E", "F", "G", "H"];
      var recipString = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      _classCallCheck(this, PsiDashNotation);
      _this = _callSuper(this, PsiDashNotation);
      _this._maxEntries = [2, 4, 6, 8];
      _this._maxPrecision = 10;
      _this.dashString = "-";
      _this.letters = ["E", "F", "G", "H"];
      _this.recipString = null;
      _this.name = "Psi Dash Notation";
      _this.maxEntries = maxEntries;
      _this.maxPrecision = maxPrecision;
      _this.base = base;
      _this.dashString = dashString;
      _this.letters = letters;
      _this.recipString = recipString;
      return _this;
    }
    _inherits(PsiDashNotation, _Notation);
    return _createClass(PsiDashNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var currentValue = value;
        var baseNum = this._base.length;
        var baseNumD = new Decimal__default["default"](baseNum);
        if (value.eq(0)) return this._base[0];
        if (value.eq(1)) return this.letters[0] + this._base[0];
        if (value.lt(1)) {
          var rString = ["", ""];
          if (this.recipString === null) rString = [this._base[1] + " / ", ""];else rString = this.recipString;
          return rString[0] + this.format(value.recip()) + rString[1];
        }
        var startLetter = -1;
        var E = 0,
          F = 0,
          G = 0,
          H = 0;
        var dashArray = [];
        if (!baseNumD.tetrate(2).isFinite() || value.lt(baseNumD.tetrate(2))) {
          E = 1;
          currentValue = value.log(baseNum);
          startLetter = 0;
        } else if (!baseNumD.pentate(2).isFinite() || value.lt(baseNumD.pentate(2))) {
          F = 1;
          currentValue = value.slog(baseNum, 100, true);
          startLetter = 1;
        } else if (!baseNumD.pentate(baseNum).isFinite() || value.lt(baseNumD.pentate(baseNum))) {
          G = 1;
          currentValue = hypersplit(value, baseNum, [0, 1, 1])[3];
          startLetter = 2;
        } else {
          //H is only needed in base 3, but it's still here
          H = 1;
          var hexaValue = Decimal__default["default"].dZero;
          while (currentValue.gte(baseNum)) {
            currentValue = hypersplit(currentValue, baseNum, [0, 1, 1])[3];
            hexaValue = hexaValue.plus(1);
          }
          currentValue = currentValue.log(baseNum).plus(hexaValue);
          startLetter = 3;
        }
        var result = this.letters[startLetter];
        var maxEntries = this._maxEntries[startLetter];
        if (maxEntries == 1) {
          var _innerNotation = new AlternateBaseNotation(this._base, 0, this._maxPrecision - 1, this._maxPrecision - 1, Decimal__default["default"].dInf, Decimal__default["default"].dInf, 0);
          result += _innerNotation.format(currentValue);
          return result;
        }
        while ((E > 0 || F > 0 || G > 0 || H > 0) && dashArray.length < maxEntries - 1 && currentValue.lte(Decimal__default["default"].pow(baseNum, this._maxPrecision)) && currentValue.lte(Number.MAX_VALUE)) {
          var _sciPair = scientifify(currentValue, baseNum, Math.pow(baseNum, 1 - this._maxPrecision));
          dashArray.push(_sciPair[0].mul(baseNumD.pow(_sciPair[1])).floor().div(baseNumD.pow(_sciPair[1])));
          if (E > 0) {
            E--;
            currentValue = Decimal__default["default"].pow(baseNum, currentValue);
          } else if (F > 0) {
            F--;
            E = currentValue.floor().toNumber();
            currentValue = Decimal__default["default"].pow(baseNum, currentValue.mod(1));
          } else if (G > 0) {
            G--;
            F = currentValue.floor().toNumber();
            currentValue = Decimal__default["default"].pow(baseNum, currentValue.mod(1));
          } else if (H > 0) {
            H--;
            G = currentValue.floor().toNumber();
            currentValue = Decimal__default["default"].pow(baseNum, currentValue.mod(1));
          }
        }
        var sciPair = scientifify(currentValue, baseNum, Math.pow(baseNum, 1 - this._maxPrecision));
        dashArray.push(sciPair[0].mul(baseNumD.pow(sciPair[1])).floor().div(baseNumD.pow(sciPair[1])));
        while (dashArray.length > 1 && scientifify(dashArray[dashArray.length - 1], baseNum, Math.pow(baseNum, -this._maxPrecision + 1))[0].eq(1)) dashArray.pop();
        var innerNotation = new AlternateBaseNotation(this._base, 0, this._maxPrecision - 1, this._maxPrecision - 1, -1, Decimal__default["default"].dInf, undefined, undefined, undefined, undefined, -Infinity, undefined, undefined, undefined, "", undefined, undefined, undefined, undefined, this._maxPrecision);
        for (var d = 0; d < dashArray.length; d++) {
          result += innerNotation.format(dashArray[d]);
          if (d < dashArray.length - 1) result += this.dashString;
        }
        return result;
      }
    }, {
      key: "base",
      get: function get() {
        return this._base;
      },
      set: function set(base) {
        if (typeof base == "number") {
          if (base < 0) throw new RangeError("Negative bases are not implemented");
          if (base % 1 != 0) throw new RangeError("Fractional bases are not supported");
          if (base > 64) throw new RangeError("There are only 64 default base digits; if you want to use a base above 64, provide your own character array.");
          base = defaultBaseChars.slice(0, base);
        }
        if (base.length == 0) throw new RangeError("There is no such thing as base 0");
        if (base.length < 3) throw new RangeError("Psi Dash Notation doesn't work with base 1 or 2");
        this._base = base;
      }
    }, {
      key: "maxEntries",
      get: function get() {
        return this._maxEntries;
      },
      set: function set(maxEntries) {
        if (!Array.isArray(maxEntries)) maxEntries = [maxEntries];
        while (maxEntries.length < 4) maxEntries.push(maxEntries[maxEntries.length - 1]);
        if (maxEntries[0] < 1 || maxEntries[1] < 1 || maxEntries[2] < 1 || maxEntries[3] < 1) throw new RangeError("Less than 1 entry in Psi Dash Notation");
        this._maxEntries = maxEntries;
      }
    }, {
      key: "maxPrecision",
      get: function get() {
        return this._maxPrecision;
      },
      set: function set(maxPrecision) {
        if (maxPrecision < 1) throw new RangeError("maxPrecision < 1 in Psi Dash Notation");
        this._maxPrecision = maxPrecision;
      }
    }]);
  }(Notation);

  /**
   * Writes numbers based on a system of infinite layers of prestige, where each layer requires a certain amount of the previous layer and is gained at some root of the previous layer.
   * For example, if root is 3 and requirement is 1e12, then it takes 1e12 of one layer's currency to get 1 of the next layer's currency, and multiplying the amount of one layer by X multiplies the amount of the next layer by X^(1/3).
   * @param root ( Decimal ! ) Each layer's gain is this root of the previous layer's gain.
   * @param requirement ( Decimal ! ) 1 of layer X + 1 requires this much of layer X.
   * @param recursive ( boolean ) If this is true, then once the layer number is itself larger than the original requirement, it will start being written in this notation itself. After a few layers of nesting, this switches to showing the amount of nestings, i.e. the "hyperlayer", along with the "payload" that's nested that many times. Default is false.
   *
   * WARNING: When recursive is true, this notation is significantly laggy. Maybe don't turn this setting to true if you're using this for an incremental game...
   *
   * @param rampings ( [Decimal, Decimal, Decimal][] ) Each entry of this array consists of three Decimals: the first is the layer where that ramping interval starts, the second is the amount the root is ramping by, and the third is the amount the requirement is ramping by.
   * "Ramping" means that on each layer, the root is multiplied by its ramping amount, and the requirement is raised to the power of its ramping amount. For example, if root is 3, requirement is 1e12, and the first entry of ramping is [4, 3, 2],
   * then on the 4th layer the ramping begins, so on the 5th layer root becomes 9 and requirement becomes 1e24, on the 6th layer root becomes 27 and requirement becomes 1e48, on the 7th layer root becomes 81 and requirement becomes 1e96, and so on.
   * Default is [], which is effectively the same as [[0, 1, 1]], i.e. no ramping occurs.
   * @param layerChars ( [string, string] ) A pair of strings. layerChars[0] is placed before the layer number, layerChars[1] is placed after the layer number. Default is ["[", "] "].
   * @param layerBefore ( boolean ) If this parameter is true, the layer comes before the amount of that layer instead of after. Default is true.
   * @param showLayerZero ( boolean ) If this parameter is false, then if the layer is zero, the number just uses amountInnerNotation and doesn't show the layer at all, but the layer is shown even when it's zero if this parameter is true. Default is true.
   * @param amountInnerNotation ( Notation ) The notation that the amount of the current layer is written with. DefaultNotation is the default.
   * @param layerInnerNotation ( Notation ) The notation that the layer number is written with. DefaultNotation is the default.
   * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in amountInnerNotation.
   * @param maxNesting ( number ) The maximum amount of nestings of the layer before switching to hyperlayer format. This parameter does nothing if recursive is false. Default is 3.
   * @param recursiveChars ( [[string, string], [string, string], [string, string]] ) An array of three pairs of strings that are used for recursive layers: recursiveChars[0][0] goes before the layer number once said layer number is itself notated in this notation, recursiveChars[0][1] goes after the layer number in that scenario.
   * recursiveChars[1] acts like layerChars, but for the hyperlayer number instead of the layer number, and likewise recursiveChars[2] acts like recursiveChars[0] but for the hyperlayer number.  This parameter does nothing if recursive is false. Default is [["[", "]"], ["{", "} "], ["{", "}"]].
   * @param hyperlayerBefore ( boolean ) If this parameter is true, the hyperlayer comes before the payload instead of after. This parameter does nothing if recursive is false. Default is true.
   * @param hypermantissaPower ( number ) Normally, the payload in hyperlayer format is bounded by 1 and requirement, which corresponds to the default hypermantissaPower of 0. If hypermantissaPower is 1, the bounds are requirement and divisorAtLayer(requirement), if hypermantissaPower is 2 then the bounds are divisorAtLayer(requirement) and divisorAtLayer(divisorAtLayer(requirement)), and so on. For example, with a requirement of 1e12, a number normally represented as "{10} 100" would become "{9} [1] 100" with 1 hypermantissaPower and "{8} [[1] 100]" with 2 hypermantissaPower.
   */
  var PrestigeLayerNotation = /*#__PURE__*/function (_Notation) {
    function PrestigeLayerNotation(root, requirement) {
      var _this;
      var recursive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rampings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var layerChars = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ["[", "] "];
      var layerBefore = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var showLayerZero = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var amountInnerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new DefaultNotation();
      var layerInnerNotation = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : new DefaultNotation();
      var recipString = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
      var maxNesting = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 3;
      var recursiveChars = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [["[", "]"], ["{", "} "], ["{", "}"]];
      var hyperlayerBefore = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : true;
      var hypermantissaPower = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : 0;
      _classCallCheck(this, PrestigeLayerNotation);
      _this = _callSuper(this, PrestigeLayerNotation);
      _this.recursive = false;
      _this._rampings = [];
      _this.layerChars = ["[", "] "];
      _this.layerBefore = true;
      _this.showLayerZero = true;
      _this.amountInnerNotation = new DefaultNotation();
      _this.layerInnerNotation = new DefaultNotation();
      _this.recipString = null;
      _this.maxNesting = 3;
      _this.recursiveChars = [["[", "]"], ["{", "} "], ["{", "}"]];
      _this.hyperlayerBefore = true;
      _this.hypermantissaPower = 0;
      _this.name = "Prestige Layer Notation";
      _this._root = toDecimal(root);
      _this._requirement = toDecimal(requirement);
      var rampingsD = [];
      for (var r = 0; r < rampings.length; r++) {
        rampingsD.push([toDecimal(rampings[r][0]), toDecimal(rampings[r][1]), toDecimal(rampings[r][2])]);
      }
      _this._rampings = rampingsD.sort(function (value, other) {
        return Decimal__default["default"].cmp(value[0], other[0]);
      });
      for (var _r = 0; _r < _this._rampings.length - 1; _r++) {
        if (_this._rampings[_r][0].eq(_this._rampings[_r + 1][0])) _this._rampings.splice(_r, 1);
      }
      if (_this._rampings.length == 0 || _this._rampings[0][0].neq(0)) _this._rampings.unshift([Decimal__default["default"].dZero, Decimal__default["default"].dOne, Decimal__default["default"].dOne]);
      _this.calculateCheckpoints(_this._root, _this._requirement, _this._rampings);
      _this.layerChars = layerChars;
      _this.layerBefore = layerBefore;
      _this.showLayerZero = showLayerZero;
      _this.amountInnerNotation = amountInnerNotation;
      _this.layerInnerNotation = layerInnerNotation;
      _this.recipString = recipString;
      _this.recursive = recursive;
      _this.maxNesting = maxNesting;
      _this.recursiveChars = recursiveChars;
      _this.hyperlayerBefore = hyperlayerBefore;
      _this.hypermantissaPower = hypermantissaPower;
      return _this;
    }
    _inherits(PrestigeLayerNotation, _Notation);
    return _createClass(PrestigeLayerNotation, [{
      key: "calculateCheckpoints",
      value: function calculateCheckpoints(root, requirement, rampings) {
        var checkpoints = [[Decimal__default["default"].dZero, root, requirement, Decimal__default["default"].dOne, Decimal__default["default"].dOne]];
        var currentRoot = Decimal__default["default"].dOne;
        var previousRoot = Decimal__default["default"].dOne;
        var rampingIndex = 0;
        var singleDivisor = requirement;
        var currentRootRamping = rampings[rampingIndex][1];
        var currentDivisorRamping = rampings[rampingIndex][2];
        var prevLayer = Decimal__default["default"].dZero;
        var singleRoot = root;
        var rampingDistance = Decimal__default["default"].dZero;
        if (singleRoot.lt(1)) throw new Error("The root goes below 1 at some point in Prestige Layer Notation, which is not allowed because it can lead to supertask behavior");
        if (singleRoot.eq(1) && this.recursive) throw new Error("The recursive form of this notation does not currently support cases where the root is ever equal to 1. Sorry!");
        if (singleDivisor.lte(1)) throw new Error("The divisor must stay above 1 at all times in Prestige Layer Notation, because otherwise it can lead to higher layers coming at the same time as or even before lower ones");
        while (rampingIndex < rampings.length - 1) {
          rampingDistance = rampings[rampingIndex + 1][0].sub(prevLayer);
          previousRoot = currentRoot.mul(singleRoot.pow(rampingDistance.sub(1))).mul(currentRootRamping.pow(rampingDistance.mul(rampingDistance.sub(1)).div(2)));
          currentRoot = currentRoot.mul(singleRoot.pow(rampingDistance)).mul(currentRootRamping.pow(rampingDistance.plus(1).mul(rampingDistance).div(2)));
          singleDivisor = singleDivisor.pow(currentDivisorRamping.pow(rampingDistance));
          singleRoot = singleRoot.mul(currentRootRamping.pow(rampingDistance));
          rampingIndex++;
          if (singleRoot.lt(1)) throw new Error("The root goes below 1 at some point in Prestige Layer Notation, which is not allowed because it can lead to supertask behavior");
          if (singleRoot.eq(1) && this.recursive) throw new Error("The recursive form of this notation does not currently support cases where the root is ever equal to 1. Sorry!");
          if (singleDivisor.lte(1)) throw new Error("The divisor must stay above 1 at all times in Prestige Layer Notation, because otherwise it can lead to higher layers coming at the same time as or even before lower ones");
          checkpoints.push([rampings[rampingIndex][0], singleRoot, singleDivisor, currentRoot, singleDivisor.pow(previousRoot)]);
          currentRootRamping = rampings[rampingIndex][1];
          currentDivisorRamping = rampings[rampingIndex][2];
          prevLayer = rampings[rampingIndex][0];
        }
        this.rampingCheckpoints = checkpoints;
      }
    }, {
      key: "rootAtLayer",
      value: function rootAtLayer(layer) {
        layer = toDecimal(layer);
        if (layer.eq(0)) return Decimal__default["default"].dOne;
        var root = Decimal__default["default"].dOne;
        var rampingIndex = 0;
        var currentRamping = this._rampings[rampingIndex][1];
        var prevLayer = Decimal__default["default"].dZero;
        var singleRoot = this._root;
        var rampingDistance = Decimal__default["default"].dZero;
        while (rampingIndex < this.rampingCheckpoints.length - 1 && this.rampingCheckpoints[rampingIndex + 1][0].lte(layer)) rampingIndex++;
        prevLayer = this.rampingCheckpoints[rampingIndex][0];
        singleRoot = this.rampingCheckpoints[rampingIndex][1];
        root = this.rampingCheckpoints[rampingIndex][3];
        currentRamping = this._rampings[rampingIndex][1];
        rampingDistance = layer.sub(prevLayer);
        root = root.mul(singleRoot.pow(rampingDistance)).mul(currentRamping.pow(rampingDistance.plus(1).mul(rampingDistance).div(2)));
        return root;
      }
    }, {
      key: "outermostDivisor",
      value: function outermostDivisor(layer) {
        layer = toDecimal(layer);
        if (layer.eq(0)) return Decimal__default["default"].dOne;
        var divisor = this._requirement;
        var rampingIndex = 0;
        var currentRamping = this._rampings[rampingIndex][2];
        var prevLayer = Decimal__default["default"].dZero;
        var rampingDistance = Decimal__default["default"].dZero;
        while (rampingIndex < this.rampingCheckpoints.length - 1 && this.rampingCheckpoints[rampingIndex + 1][0].lte(layer)) rampingIndex++;
        prevLayer = this.rampingCheckpoints[rampingIndex][0];
        divisor = this.rampingCheckpoints[rampingIndex][2];
        currentRamping = this._rampings[rampingIndex][2];
        rampingDistance = layer.sub(prevLayer);
        divisor = divisor.pow(currentRamping.pow(rampingDistance));
        return divisor.pow(this.rootAtLayer(layer.sub(1)));
      }
    }, {
      key: "divisorAtLayer",
      value: function divisorAtLayer(layer) {
        var currentLayer = toDecimal(layer);
        var divisor = Decimal__default["default"].dOne;
        var oldDivisor = Decimal__default["default"].dZero;
        while (oldDivisor.neq(divisor) && currentLayer.gt(0)) {
          oldDivisor = divisor;
          divisor = divisor.mul(this.outermostDivisor(currentLayer));
          currentLayer = currentLayer.sub(1);
        }
        return divisor;
      }
      /**
       * Given a certain amount of the layer 0 currency, returns the layer you'd be on.
       * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
       * @param rounded ( boolean ) Ensures that the given layer is a whole number. Default is true.
       */
    }, {
      key: "getLayer",
      value: function getLayer(value) {
        var rounded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var layer = Decimal__default["default"].dZero;
        if (value.lt(this.divisorAtLayer(10))) {
          var _layer = 0;
          var step_size = 0.001;
          var has_changed_directions_once = false;
          var previously_rose = false;
          for (var i = 1; i < 10000; ++i) {
            var currently_rose = value.gt(this.divisorAtLayer(_layer));
            if (i > 1) {
              if (previously_rose != currently_rose) {
                has_changed_directions_once = true;
              }
            }
            previously_rose = currently_rose;
            if (has_changed_directions_once) {
              step_size /= 2;
            } else {
              step_size *= 2;
            }
            step_size = Math.abs(step_size) * (currently_rose ? 1 : -1);
            _layer += step_size;
            if (step_size === 0) {
              break;
            }
          }
        } else {
          var layerSlog = 1;
          var _step_size = 0.001;
          var _has_changed_directions_once = false;
          var _previously_rose = false;
          for (var i = 1; i < 10000; ++i) {
            layer = Decimal__default["default"].tetrate(10, layerSlog, 1, true);
            var _currently_rose = value.gt(this.divisorAtLayer(layer));
            if (i > 1) {
              if (_previously_rose != _currently_rose) {
                _has_changed_directions_once = true;
              }
            }
            _previously_rose = _currently_rose;
            if (_has_changed_directions_once) {
              _step_size /= 2;
            } else {
              _step_size *= 2;
            }
            _step_size = Math.abs(_step_size) * (_currently_rose ? 1 : -1);
            layerSlog += _step_size;
            if (layerSlog == Infinity) layerSlog = Number.MAX_VALUE;
            if (_step_size === 0) {
              break;
            }
          }
        }
        if (rounded) {
          layer = layer.round();
          if (layer.neq(layer.plus(1))) {
            while (value.gte(this.divisorAtLayer(layer.plus(1)))) layer = layer.plus(1);
            while (value.lt(this.divisorAtLayer(layer))) layer = layer.sub(1);
          }
        }
        return layer;
      }
      /**
       * Given a certain amount of the layer 0 currency, returns the layer you'd be on and the amount of currency you'd have on that layer. The function returns an array of the form [currency, layer].
       * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
       */
    }, {
      key: "layerAndCurrency",
      value: function layerAndCurrency(value) {
        var layer = this.getLayer(value);
        var currency = value.div(this.divisorAtLayer(layer)).root(this.rootAtLayer(layer));
        if (layer.eq(layer.plus(1))) currency = Decimal__default["default"].dOne;
        return [currency, layer];
      }
      /**
       * Applies getLayer multiple times.
       * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
       * @param iterations ( number ! ) The amount of times getLayer is applied to the value.
       */
    }, {
      key: "iteratedLayer",
      value: function iteratedLayer(value, iterations) {
        if (iterations == 0) return value;
        var safeIterationPoint = new Decimal__default["default"]("F10"); //The point at which we can ignore all the root and divisor stuff and just use slog to get down below it
        while (this.getLayer(safeIterationPoint).neq(Decimal__default["default"].iteratedlog(safeIterationPoint, 10, 2))) safeIterationPoint = this.divisorAtLayer(safeIterationPoint);
        var iterationsSoFar = 0;
        var safeIterations = 0;
        while (value.gte(safeIterationPoint) && iterationsSoFar < iterations) {
          safeIterations = Decimal__default["default"].slog(value, 10, true).sub(Decimal__default["default"].slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().min(iterations).toNumber();
          iterationsSoFar += safeIterations;
          value = value.iteratedlog(10, Decimal__default["default"].slog(value, 10, true).sub(Decimal__default["default"].slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().min(iterations).mul(2).toNumber(), true);
        }
        while (iterationsSoFar < iterations) {
          value = this.getLayer(value);
          iterationsSoFar++;
        }
        return value;
      }
      /**
       * The Prestige Layer equivalent of slog: how many times can we apply getLayer to value before it gets down to 1?
       * @param value ( Decimal ! ) The amount of the layer 0 currency you have.
       */
    }, {
      key: "getHyperlayer",
      value: function getHyperlayer(value) {
        var safeIterationPoint = new Decimal__default["default"]("F10"); //The point at which we can ignore all the root and divisor stuff and just use slog to get down below it
        while (this.getLayer(safeIterationPoint).neq(Decimal__default["default"].iteratedlog(safeIterationPoint, 10, 2))) safeIterationPoint = this.divisorAtLayer(safeIterationPoint);
        var result = Decimal__default["default"].dNegOne;
        var safeIterations = 0;
        while (value.gte(safeIterationPoint)) {
          safeIterations = Decimal__default["default"].slog(value, 10, true).sub(Decimal__default["default"].slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().toNumber();
          result = result.plus(safeIterations);
          value = value.iteratedlog(10, Decimal__default["default"].slog(value, 10, true).sub(Decimal__default["default"].slog(safeIterationPoint, 10, true)).div(2).plus(1).floor().mul(2).toNumber(), true);
        }
        while (value.gte(1)) {
          result = result.plus(1);
          value = this.getLayer(value);
        }
        result = result.plus(value);
        return result;
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.amountInnerNotation.format(0);
        if (value.lt(1)) {
          var rString = ["", ""];
          if (this.recipString === null) rString = [this.amountInnerNotation.format(1) + " / ", ""];else rString = this.recipString;
          return rString[0] + this.format(value.recip()) + rString[1];
        }
        var rawHyperlayer = Decimal__default["default"].dZero;
        var hyperlayer = 0;
        if (this.recursive) {
          rawHyperlayer = this.getHyperlayer(value);
          hyperlayer = rawHyperlayer.sub(1).floor().max(0).toNumber();
        }
        var result = "";
        if (hyperlayer <= this.maxNesting) {
          var _this$layerAndCurrenc = this.layerAndCurrency(this.iteratedLayer(value, hyperlayer)),
            _this$layerAndCurrenc2 = _slicedToArray(_this$layerAndCurrenc, 2),
            currency = _this$layerAndCurrenc2[0],
            layer = _this$layerAndCurrenc2[1];
          if (!this.showLayerZero && layer.eq(0)) result = this.amountInnerNotation.format(value);else {
            var currencyStr = this.amountInnerNotation.format(currency);
            var layerStr = this.layerChars[0] + this.layerInnerNotation.format(layer) + this.layerChars[1];
            if (this.layerBefore) result = layerStr + currencyStr;else result = currencyStr + layerStr;
          }
          for (var h = 0; h < hyperlayer; h++) result = this.recursiveChars[0][0] + result + this.recursiveChars[0][1];
        } else if (hyperlayer < this.divisorAtLayer(1).toNumber()) {
          var _currencyStr = this.format(this.iteratedLayer(value, hyperlayer - this.hypermantissaPower));
          var _layerStr = this.recursiveChars[1][0] + this.layerInnerNotation.format(hyperlayer - this.hypermantissaPower) + this.recursiveChars[1][1];
          if (this.hyperlayerBefore) result = _layerStr + _currencyStr;else result = _currencyStr + _layerStr;
        } else {
          result = this.recursiveChars[2][0] + this.format(hyperlayer) + this.recursiveChars[2][1];
        }
        return result;
      }
    }, {
      key: "root",
      get: function get() {
        return this._root;
      },
      set: function set(root) {
        var rootD = toDecimal(root);
        this.calculateCheckpoints(rootD, this._requirement, this._rampings);
        this._root = rootD;
      }
    }, {
      key: "requirement",
      get: function get() {
        return this._requirement;
      },
      set: function set(requirement) {
        var requirementD = toDecimal(requirement);
        this.calculateCheckpoints(this._root, requirementD, this._rampings);
        this._requirement = requirementD;
      }
    }, {
      key: "rampings",
      get: function get() {
        return this._rampings;
      },
      set: function set(rampings) {
        var rampingsD = [];
        for (var r = 0; r < rampings.length; r++) {
          rampingsD.push([toDecimal(rampings[r][0]), toDecimal(rampings[r][1]), toDecimal(rampings[r][2])]);
        }
        rampingsD = rampingsD.sort(function (value, other) {
          return Decimal__default["default"].cmp(value[0], other[0]);
        });
        for (var _r2 = 0; _r2 < rampingsD.length - 1; _r2++) {
          if (rampingsD[_r2][0].eq(rampingsD[_r2 + 1][0])) rampingsD.splice(_r2, 1);
        }
        if (rampingsD.length == 0 || rampingsD[0][0].neq(0)) rampingsD.unshift([Decimal__default["default"].dZero, Decimal__default["default"].dOne, Decimal__default["default"].dOne]);
        this.calculateCheckpoints(this._root, this._requirement, rampingsD);
        this._rampings = rampingsD;
      }
    }]);
  }(Notation);

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
  var IncreasingOperatorNotation = /*#__PURE__*/function (_Notation) {
    function IncreasingOperatorNotation() {
      var _this;
      var bases = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var maximums = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [10, Decimal__default["default"].dInf, Decimal__default["default"].dInf, Decimal__default["default"].dInf, Decimal__default["default"].dInf, Decimal__default["default"].dInf];
      var operatorChars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [[["10 + ", ""], ["10 + ", ""], [" + ", ""], ["10 * ", ""]], [["10 * ", ""], ["10 * ", ""], [" * ", ""], ["10^", ""]], [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]], [["10^", ""], ["10^", ""], [" ", ""], ["(10^)^", ""]], [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]], [["10^^", ""], ["10^^", ""], [" ", ""], ["(10^^)^", ""]]];
      var thresholds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [[10, true, 4, 10, 2], [10, true, 4, 10, 2], [10, true, 4, 10, 2], [10, true, 4, 10, 2], [10, true, 4, 10, 2], [10, true, 4, 10, 2]];
      var rootBehavior = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var superRootBehavior = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : rootBehavior;
      var roundings = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
      var preAdditionFormats = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
      var nestingBefore = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [true, true, false, true, false, true];
      var parenthesize = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [[["", "", false], ["", "", false], ["(", ")", false]], [["(", ")", false], ["(", ")", false], ["(", ")", false]], [["(", ")", false], ["(", ")", false], ["(", ")", false]], [["(", ")", false], ["", "", false], ["(", ")", false]], [["(", ")", false], ["", "", false], ["(", ")", false]], [["(", ")", false], ["", "", false], ["(", ")", false]]];
      var argumentShown = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [];
      var plainInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : new DefaultNotation();
      var innerNotations = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new DefaultNotation();
      var minnum = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : undefined;
      var recipString = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : null;
      _classCallCheck(this, IncreasingOperatorNotation);
      _this = _callSuper(this, IncreasingOperatorNotation);
      _this.name = "Increasing Operator Notation";
      if (!Array.isArray(bases)) bases = [bases];
      _this._bases = bases.map(toDecimal);
      while (_this._bases.length < 6) {
        if (_this._bases.length == 0) _this._bases.push(Decimal__default["default"].dTen);
        if (_this._bases.length == 1) _this._bases.push(_this._bases[0]);
        if (_this._bases.length == 2) _this._bases.push(Decimal__default["default"].dTwo); //Default root height is 2
        if (_this._bases.length == 3) _this._bases.push(_this._bases[1]);
        if (_this._bases.length == 4) _this._bases.push(_this._bases[2]); //Default super-root height matches root height
        if (_this._bases.length == 5) _this._bases.push(_this._bases[3]);
      }
      if (_this._bases[0].lte(0)) throw new RangeError("Addition base <= 0 in Increasing Operator notation");
      if (_this._bases[1].lte(1)) throw new RangeError("Multiplication base <= 1 in Increasing Operator notation");
      if (_this._bases[2].lte(1)) throw new RangeError("Root height <= 1 in Increasing Operator notation");
      if (_this._bases[3].lte(1.44466786100976613366)) throw new RangeError("Exponent base <= e^(1/e) in Increasing Operator notation");
      if (_this._bases[4].lte(1)) throw new RangeError("Super-root height <= 1 in Increasing Operator notation");
      if (_this._bases[5].lte(1.44466786100976613366)) throw new RangeError("Tetration base <= e^(1/e) in Increasing Operator notation");
      _this._maximums = maximums.map(toDecimal);
      while (_this._maximums.length < 6) {
        if (_this._maximums.length == 0) _this._maximums.push(_this._bases[0]);else _this._maximums.push(Decimal__default["default"].dInf);
      }
      _this._operatorChars = operatorChars;
      var defaultOperatorChars = [[["10 + ", ""], ["10 + ", ""], [" + ", ""], ["10 * ", ""]], [["10 * ", ""], ["10 * ", ""], [" * ", ""], ["10^", ""]], [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]], [["10^", ""], ["10^", ""], [" ", ""], ["(10^)^", ""]], [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]], [["10^^", ""], ["10^^", ""], [" ", ""], ["(10^^)^", ""]]];
      while (_this._operatorChars.length < 6) _this._operatorChars.push(defaultOperatorChars[_this._operatorChars.length]);
      if (rootBehavior === null) _this._rootBehavior = rootBehavior;else {
        // I have to jump through a lot of hoops to make TypeScript happy here
        var RB0 = rootBehavior[0];
        var RB1 = toDecimal(rootBehavior[1]);
        var RB2 = typeof rootBehavior[2] == "boolean" ? rootBehavior[2] : toDecimal(rootBehavior[2]);
        _this._rootBehavior = [RB0, RB1, RB2];
      }
      if (superRootBehavior === null) _this._superRootBehavior = superRootBehavior;else {
        // I have to jump through a lot of hoops to make TypeScript happy here
        var _RB = superRootBehavior[0];
        var _RB2 = toDecimal(superRootBehavior[1]);
        var _RB3 = typeof superRootBehavior[2] == "boolean" ? superRootBehavior[2] : toDecimal(superRootBehavior[2]);
        _this._superRootBehavior = [_RB, _RB2, _RB3];
      }
      while (roundings.length < 6) roundings.push([Decimal__default["default"].dZero, Decimal__default["default"].dZero, Decimal__default["default"].dZero]);
      _this._roundings = roundings;
      _this._preAdditionFormats = preAdditionFormats.map(function (value) {
        return [toDecimal(value[0]), value[1], value[2], value[3], value[4], value[5], value[6]];
      });
      _this._preAdditionFormats = _this._preAdditionFormats.sort(function (value, other) {
        return Decimal__default["default"].cmp(value[0], other[0]);
      });
      _this.unconvertedThresholds = [];
      for (var t = 0; t < thresholds.length; t++) {
        var possibleBool = thresholds[t][1];
        if (typeof possibleBool == "boolean") _this.unconvertedThresholds.push([toDecimal(thresholds[t][0]), possibleBool, thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);else _this.unconvertedThresholds.push([toDecimal(thresholds[t][0]), toDecimal(possibleBool), thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);
      }
      if (_this.unconvertedThresholds.length == 0) _this.unconvertedThresholds.push([Decimal__default["default"].dTen, true, 4, Decimal__default["default"].dTen, 2]);
      while (_this.unconvertedThresholds.length < 6) _this.unconvertedThresholds.push(_this.unconvertedThresholds[_this.unconvertedThresholds.length - 1]);
      _this.setMaximums(_this.unconvertedThresholds);
      _this._nestingBefore = nestingBefore;
      while (_this._nestingBefore.length < 6) {
        if (_this._nestingBefore.length == 0 || _this._nestingBefore.length % 2 == 1) _this._nestingBefore.push(true);else _this._nestingBefore.push(false);
      }
      _this._parenthesize = parenthesize;
      while (_this._parenthesize.length < 6) _this._parenthesize.push([["", "", false], ["", "", false], ["", "", false]]);
      _this.plainInnerNotation = plainInnerNotation;
      _this._argumentShown = argumentShown;
      while (_this._argumentShown.length < 6) _this._argumentShown.push([function (value) {
        return true;
      }, function (value) {
        return true;
      }]);
      if (!Array.isArray(innerNotations)) innerNotations = [[innerNotations, innerNotations, innerNotations]];
      _this._innerNotations = innerNotations;
      if (_this._innerNotations.length == 0) _this._innerNotations.push([new DefaultNotation(), new DefaultNotation(), new DefaultNotation()]);
      while (_this._innerNotations.length < 6) _this._innerNotations.push(_this._innerNotations[_this._innerNotations.length - 1]);
      if (minnum === undefined) _this.minnum = _this._maximums[0].recip();else _this.minnum = toDecimal(minnum);
      _this.recipString = recipString;
      return _this;
    }
    _inherits(IncreasingOperatorNotation, _Notation);
    return _createClass(IncreasingOperatorNotation, [{
      key: "setMaximums",
      value: function setMaximums(thresholds) {
        var argumentMaximums = []; //The highest number allowed to stand on its own on each operator before another symbol of that operator is brought in
        var symbolicMaximums = []; //The highest number on each operator before its nesting begins
        var nestingMaximums = []; //The limit of each operator before moving to the next operator
        if (thresholds != undefined) this._thresholds = [];
        var possibleBool;
        //Addition maximums
        if (thresholds !== undefined) {
          possibleBool = thresholds[0][1];
          if (typeof possibleBool == "boolean") possibleBool = this._maximums[0];
          this._thresholds.push([thresholds[0][0], possibleBool, thresholds[0][2], thresholds[0][3], thresholds[0][4]]);
        }
        argumentMaximums.push(this._thresholds[0][0].min(this._maximums[1]).max(this._maximums[0]).min(this._thresholds[0][1]));
        if (!argumentMaximums[0].isFinite()) argumentMaximums[0] = Decimal__default["default"].dInf;
        symbolicMaximums.push(argumentMaximums[0].plus(this._bases[0].mul(this._thresholds[0][2])));
        if (!symbolicMaximums[0].isFinite()) symbolicMaximums[0] = Decimal__default["default"].dInf;
        nestingMaximums.push(symbolicMaximums[0].max(this._thresholds[0][3]).mul(this._bases[0].pow(this._thresholds[0][4])));
        if (!nestingMaximums[0].isFinite()) nestingMaximums[0] = Decimal__default["default"].dInf;
        nestingMaximums[0] = nestingMaximums[0].min(this._maximums[1]).max(this._maximums[0]);
        if (!nestingMaximums[0].isFinite()) nestingMaximums[0] = Decimal__default["default"].dInf;
        //Multiplication maximums
        if (thresholds !== undefined) {
          possibleBool = thresholds[1][1];
          if (possibleBool === false) possibleBool = argumentMaximums[0];else if (possibleBool === true) possibleBool = symbolicMaximums[0];
          this._thresholds.push([thresholds[1][0], possibleBool, thresholds[1][2], thresholds[1][3], thresholds[1][4]]);
        }
        argumentMaximums.push(this._thresholds[1][0].min(this._maximums[2]).max(nestingMaximums[0]).min(this._thresholds[1][1]));
        if (!argumentMaximums[1].isFinite()) argumentMaximums[1] = Decimal__default["default"].dInf;
        symbolicMaximums.push(argumentMaximums[1].mul(this._bases[1].pow(this._thresholds[1][2])));
        if (!symbolicMaximums[1].isFinite()) symbolicMaximums[1] = Decimal__default["default"].dInf;
        nestingMaximums.push(Decimal__default["default"].iteratedexp(this._bases[1], this._thresholds[1][4], symbolicMaximums[1].max(this._thresholds[1][3]), true));
        if (!nestingMaximums[1].isFinite()) nestingMaximums[1] = Decimal__default["default"].dInf;
        nestingMaximums[1] = nestingMaximums[1].min(this._maximums[2]).max(nestingMaximums[0]);
        if (!nestingMaximums[1].isFinite()) nestingMaximums[1] = Decimal__default["default"].dInf;
        //Root maximums
        if (thresholds !== undefined) {
          possibleBool = thresholds[2][1];
          if (possibleBool === false) possibleBool = argumentMaximums[1];else if (possibleBool === true) possibleBool = symbolicMaximums[1];
          this._thresholds.push([thresholds[2][0], possibleBool, thresholds[2][2], thresholds[2][3], thresholds[2][4]]);
        }
        argumentMaximums.push(this._thresholds[2][0].min(this._maximums[3]).max(nestingMaximums[1]).min(this._thresholds[2][1]));
        if (!argumentMaximums[2].isFinite()) argumentMaximums[2] = Decimal__default["default"].dInf;
        if (this._rootBehavior === null) {
          symbolicMaximums.push(argumentMaximums[2].pow(this._bases[2].pow(this._thresholds[2][2])));
          if (!symbolicMaximums[2].isFinite()) symbolicMaximums[2] = Decimal__default["default"].dInf;
          var nestedRootMaximum = symbolicMaximums[2].max(this._thresholds[2][3]);
          for (var r = 0; r < this._thresholds[2][4]; r++) nestedRootMaximum = argumentMaximums[2].pow(this._bases[2].pow(nestedRootMaximum));
          nestingMaximums.push(nestedRootMaximum);
        } else {
          possibleBool = this._rootBehavior[2];
          if (possibleBool === false) possibleBool = argumentMaximums[1];else if (possibleBool === true) possibleBool = symbolicMaximums[1];
          var maxDegree = Decimal__default["default"].min(possibleBool, nestingMaximums[1]);
          symbolicMaximums.push(argumentMaximums[2].pow(maxDegree));
          if (!symbolicMaximums[2].isFinite()) symbolicMaximums[2] = Decimal__default["default"].dInf;
          var _nestedRootMaximum = symbolicMaximums[2];
          for (var _r = 0; _r < this._thresholds[2][4]; _r++) _nestedRootMaximum = argumentMaximums[2].pow(_nestedRootMaximum);
          nestingMaximums.push(_nestedRootMaximum);
        }
        if (!nestingMaximums[2].isFinite()) nestingMaximums[2] = Decimal__default["default"].dInf;
        nestingMaximums[2] = nestingMaximums[2].min(this._maximums[3]).max(nestingMaximums[1]);
        if (!nestingMaximums[2].isFinite()) nestingMaximums[2] = Decimal__default["default"].dInf;
        //Exponentiation maximums
        if (thresholds !== undefined) {
          possibleBool = thresholds[3][1];
          if (possibleBool === false) possibleBool = argumentMaximums[2];else if (possibleBool === true) possibleBool = symbolicMaximums[2];
          this._thresholds.push([thresholds[3][0], possibleBool, thresholds[3][2], thresholds[3][3], thresholds[3][4]]);
        }
        argumentMaximums.push(this._thresholds[3][0].min(this._maximums[4]).max(nestingMaximums[2]).min(this._thresholds[3][1]));
        if (!argumentMaximums[3].isFinite()) argumentMaximums[3] = Decimal__default["default"].dInf;
        symbolicMaximums.push(Decimal__default["default"].iteratedexp(this._bases[3], this._thresholds[3][2], argumentMaximums[3], true));
        if (!symbolicMaximums[3].isFinite()) symbolicMaximums[3] = Decimal__default["default"].dInf;
        nestingMaximums.push(Decimal__default["default"].pentate(this._bases[3], this._thresholds[3][4], symbolicMaximums[3].max(this._thresholds[3][3]), true));
        if (!nestingMaximums[3].isFinite()) nestingMaximums[3] = Decimal__default["default"].dInf;
        nestingMaximums[3] = nestingMaximums[3].min(this._maximums[4]).max(nestingMaximums[2]);
        if (!nestingMaximums[3].isFinite()) nestingMaximums[3] = Decimal__default["default"].dInf;
        //Super-root maximums
        if (thresholds !== undefined) {
          possibleBool = thresholds[4][1];
          if (possibleBool === false) possibleBool = argumentMaximums[3];else if (possibleBool === true) possibleBool = symbolicMaximums[3];
          this._thresholds.push([thresholds[4][0], possibleBool, thresholds[4][2], thresholds[4][3], thresholds[4][4]]);
        }
        argumentMaximums.push(this._thresholds[4][0].min(this._maximums[5]).max(nestingMaximums[3]).min(this._thresholds[4][1]));
        if (!argumentMaximums[4].isFinite()) argumentMaximums[4] = Decimal__default["default"].dInf;
        if (this._superRootBehavior === null) {
          var symbolicSRootMaximum = argumentMaximums[4];
          for (var _r2 = 0; _r2 < this._thresholds[4][2]; _r2++) symbolicSRootMaximum = Decimal__default["default"].tetrate(symbolicSRootMaximum, this._bases[4].toNumber(), 1, true);
          symbolicMaximums.push(symbolicSRootMaximum);
          if (!symbolicMaximums[4].isFinite()) symbolicMaximums[4] = Decimal__default["default"].dInf;
          var nestedSRootMaximum = symbolicMaximums[4].max(this._thresholds[4][3]);
          for (var _r3 = 0; _r3 < this._thresholds[4][4] && nestedSRootMaximum.isFinite(); _r3++) {
            var currentValue = argumentMaximums[4];
            var iterations = 0;
            while (iterations < nestedSRootMaximum.toNumber()) {
              currentValue = Decimal__default["default"].tetrate(currentValue, this._bases[4].toNumber(), 1, true);
              iterations++;
              if (currentValue.gte("F10")) {
                currentValue = currentValue.layeradd10((nestedSRootMaximum.toNumber() - iterations) * Math.ceil(this._bases[4].toNumber() - 1), true);
                break;
              }
            }
            nestedSRootMaximum = currentValue;
          }
          nestingMaximums.push(nestedSRootMaximum);
        } else {
          possibleBool = this._superRootBehavior[2];
          if (possibleBool === false) possibleBool = argumentMaximums[3];else if (possibleBool === true) possibleBool = symbolicMaximums[3];
          var _maxDegree = Decimal__default["default"].min(possibleBool, nestingMaximums[3]);
          symbolicMaximums.push(argumentMaximums[4].tetrate(_maxDegree.toNumber(), 1, true));
          if (!symbolicMaximums[4].isFinite()) symbolicMaximums[4] = Decimal__default["default"].dInf;
          var _nestedSRootMaximum = symbolicMaximums[4];
          for (var _r4 = 0; _r4 < this._thresholds[4][4] && _nestedSRootMaximum.isFinite(); _r4++) _nestedSRootMaximum = argumentMaximums[4].tetrate(_nestedSRootMaximum.toNumber(), 1, true);
          nestingMaximums.push(_nestedSRootMaximum);
        }
        if (!nestingMaximums[4].isFinite()) nestingMaximums[4] = Decimal__default["default"].dInf;
        nestingMaximums[4] = nestingMaximums[4].min(this._maximums[5]).max(nestingMaximums[3]);
        if (!nestingMaximums[4].isFinite()) nestingMaximums[4] = Decimal__default["default"].dInf;
        //Tetration maximums
        if (thresholds !== undefined) {
          possibleBool = thresholds[5][1];
          if (possibleBool === false) possibleBool = argumentMaximums[4];else if (possibleBool === true) possibleBool = symbolicMaximums[4];
          this._thresholds.push([thresholds[5][0], possibleBool, thresholds[5][2], thresholds[5][3], thresholds[5][4]]);
        }
        argumentMaximums.push(this._thresholds[5][0].max(nestingMaximums[4]).min(this._thresholds[5][1]));
        if (!argumentMaximums[5].isFinite()) argumentMaximums[5] = Decimal__default["default"].dInf;
        var symbolicTetrationMaximum = argumentMaximums[4];
        for (var _r5 = 0; _r5 < this._thresholds[5][2] && symbolicTetrationMaximum.isFinite(); _r5++) symbolicTetrationMaximum = Decimal__default["default"].tetrate(this._bases[5], symbolicTetrationMaximum.toNumber(), 1, true);
        symbolicMaximums.push(symbolicTetrationMaximum);
        if (!symbolicMaximums[5].isFinite()) symbolicMaximums[5] = Decimal__default["default"].dInf;
        nestingMaximums.push(Decimal__default["default"].dInf); //Tetration is the highest operator here, so no need for a maximum (plus the nesting maximum would be hexational, and that's way above break_eternity's scope)
        this.argumentMaximums = argumentMaximums;
        this.symbolicMaximums = symbolicMaximums;
        this.nestingMaximums = nestingMaximums;
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.lt(this.minnum) && (value.neq(0) || this._maximums[0].lt(0))) {
          if (value.eq(0)) return this.plainInnerNotation.format(0);
          var recipStr = ["", ""];
          if (this.recipString === null) recipStr = [this.plainInnerNotation.format(1) + " / (", ")"];else recipStr = this.recipString;
          return recipStr[0] + this.format(value.recip()) + recipStr[1];
        }
        var operator = -1;
        if (value.gte(this._maximums[0])) {
          operator++;
          while (operator < 5 && value.gte(this.nestingMaximums[operator])) operator++;
        }
        if (operator == -1) {
          if (this._preAdditionFormats.length == 0 || value.lt(this._preAdditionFormats[0][0])) {
            return this.plainInnerNotation.format(value);
          } else {
            var prf = 0;
            while (prf < this._preAdditionFormats.length - 1 && value.gte(this._preAdditionFormats[prf + 1][0])) prf++;
            var _argument = value.sub(this._preAdditionFormats[prf][0]);
            var _result = "";
            if (this._preAdditionFormats[prf][5](_argument)) _result = this._preAdditionFormats[prf][3] + this._preAdditionFormats[prf][6].format(_argument) + this._preAdditionFormats[prf][4];
            _result = this._preAdditionFormats[prf][1] + _result + this._preAdditionFormats[prf][2];
            return _result;
          }
        }
        var result = "";
        var argument = Decimal__default["default"].dZero;
        var operatorNum = Decimal__default["default"].dZero;
        var argumentStr = "";
        var operatorStr = "";
        var rootHeighting = false;
        if (operator == 2 && this._rootBehavior !== null || operator == 4 && this._superRootBehavior !== null) rootHeighting = true;
        if (operator == 0) {
          operatorNum = value.sub(this.argumentMaximums[0]).div(this._bases[0]).floor().plus(1);
          argument = value.sub(operatorNum.mul(this._bases[0]));
        } else if (operator == 1) {
          operatorNum = value.div(this.argumentMaximums[1]).log(this._bases[1]).floor().plus(1);
          argument = value.div(this._bases[1].pow(operatorNum));
        } else if (operator == 2) {
          if (this._rootBehavior === null) {
            operatorNum = value.log(this.argumentMaximums[2]).log(this._bases[2]).floor().plus(1);
            argument = value.root(this._bases[2].pow(operatorNum));
          } else if (this._rootBehavior[0] === false) {
            operatorNum = value.log(this.argumentMaximums[2]).sub(this._bases[2]).div(this._rootBehavior[1]).plus(1).floor().mul(this._rootBehavior[1]).plus(this._bases[2]);
            argument = value.root(operatorNum);
          } else {
            operatorNum = value.log(this.argumentMaximums[2]).div(this._bases[2]).log(this._rootBehavior[1]).plus(1).floor().pow_base(this._rootBehavior[1]).mul(this._bases[2]);
            argument = value.root(operatorNum);
          }
        } else if (operator == 3) {
          operatorNum = value.slog(this._bases[3], 100, true).sub(this.argumentMaximums[3].slog(this._bases[3], 100, true)).floor().plus(1);
          argument = operatorNum.gte(9e15) ? this.argumentMaximums[3] : value.iteratedlog(this._bases[3], operatorNum.toNumber(), true);
        } else if (operator == 4) {
          if (this._superRootBehavior === null) {
            operatorNum = Decimal__default["default"].slog(value.min(this.argumentMaximums[4]), 10, true).sub(Decimal__default["default"].slog(Decimal__default["default"].iteratedexp(10, Math.ceil(this._bases[4].toNumber()) + 1, new Decimal__default["default"](Number.MAX_SAFE_INTEGER)), 10, true)).div(Math.ceil(this._bases[4].toNumber()) - 1).floor().plus(1).max(0);
            argument = value;
            if (operatorNum.gt(0)) argument = operatorNum.gte(9e15) ? this.argumentMaximums[4] : Decimal__default["default"].iteratedlog(argument, 10, operatorNum.mul(Math.ceil(this._bases[4].toNumber()) - 1).toNumber(), true);
            while (argument.gte(this.argumentMaximums[4])) {
              operatorNum = operatorNum.plus(1);
              argument = argument.linear_sroot(this._bases[4].toNumber());
            }
          } else if (this._superRootBehavior[0] === false) {
            operatorNum = value.slog(this.argumentMaximums[4]).plus(1).sub(this._bases[4]).div(this._superRootBehavior[1]).floor().mul(this._superRootBehavior[1]).plus(this._bases[4]);
            argument = value.linear_sroot(operatorNum.toNumber());
          } else {
            operatorNum = value.slog(this.argumentMaximums[4]).plus(1).div(this._bases[4]).log(this._superRootBehavior[1]).floor().pow_base(this._superRootBehavior[1]).mul(this._bases[4]);
            argument = value.linear_sroot(operatorNum.toNumber());
          }
        } else if (operator == 5) {
          var split = hypersplit(value, this._bases[5], [this.argumentMaximums[5], 1, 1]);
          operatorNum = split[3];
          argument = split[0];
        }
        if (!rootHeighting && value.lt(this.symbolicMaximums[operator]) && operatorNum.gte(0)) {
          argument = round(argument, this._roundings[operator][0]);
          if (argument.lt(this._thresholds[operator][0])) argumentStr = this._innerNotations[operator][0].format(argument);else argumentStr = this.format(argument);
          if (this._argumentShown[operator][0](argument)) {
            result = argumentStr;
            if (this._parenthesize[operator][0][2] || argument.gte(this._thresholds[operator][0])) result = this._parenthesize[operator][0][0] + result + this._parenthesize[operator][0][1];
            for (var i = 0; i < operatorNum.toNumber(); i++) result = this._operatorChars[operator][i == 0 ? 0 : 1][0] + result + this._operatorChars[operator][i == 0 ? 0 : 1][1];
          } else {
            var replacementBelow = this._argumentShown[operator][2];
            var replacementAbove = this._argumentShown[operator][3];
            if (replacementBelow === undefined) result = this._operatorChars[operator][0][0] + result + this._operatorChars[operator][0][1];else result = replacementBelow[0] + result + replacementBelow[1];
            for (var _i = 1; _i < operatorNum.toNumber(); _i++) {
              if (replacementAbove === undefined) result = this._operatorChars[operator][1][0] + result + this._operatorChars[operator][1][1];else result = replacementAbove[0] + result + replacementAbove[1];
            }
          }
        } else {
          argument = round(argument, this._roundings[operator][1]);
          operatorNum = round(operatorNum, this._roundings[operator][2]);
          if (argument.lt(this._thresholds[operator][0])) argumentStr = this._innerNotations[operator][1].format(argument);else argumentStr = this.format(argument);
          if (this._parenthesize[operator][1][2] || argument.gte(this._thresholds[operator][0])) argumentStr = this._parenthesize[operator][1][0] + argumentStr + this._parenthesize[operator][1][1];
          if (operatorNum.lt(this._thresholds[operator][3])) operatorStr = this._innerNotations[operator][2].format(operatorNum);else operatorStr = this.format(operatorNum);
          if (this._parenthesize[operator][2][2] || operatorNum.gte(this._thresholds[operator][3])) operatorStr = this._parenthesize[operator][2][0] + operatorStr + this._parenthesize[operator][2][1];
          argumentStr = this._operatorChars[operator][2][0] + argumentStr + this._operatorChars[operator][2][1];
          operatorStr = this._operatorChars[operator][3][0] + operatorStr + this._operatorChars[operator][3][1];
          if (!this._argumentShown[operator][1](argument)) result = operatorStr;else if (this._nestingBefore[operator]) result = operatorStr + argumentStr;else result = argumentStr + operatorStr;
        }
        return result;
      }
    }, {
      key: "bases",
      get: function get() {
        return this._bases;
      },
      set: function set(bases) {
        if (!Array.isArray(bases)) bases = [bases];
        var basesD = bases.map(toDecimal);
        while (basesD.length < 6) {
          if (basesD.length == 0) basesD.push(Decimal__default["default"].dTen);
          if (basesD.length == 1) basesD.push(basesD[0]);
          if (basesD.length == 2) basesD.push(Decimal__default["default"].dTwo); //Default root height is 2
          if (basesD.length == 3) basesD.push(basesD[1]);
          if (basesD.length == 4) basesD.push(basesD[2]); //Default super-root height matches root height
          if (basesD.length == 5) basesD.push(basesD[3]);
        }
        if (basesD[0].lte(0)) throw new RangeError("Addition base <= 0 in Increasing Operator notation");
        if (basesD[1].lte(1)) throw new RangeError("Multiplication base <= 1 in Increasing Operator notation");
        if (basesD[2].lte(1)) throw new RangeError("Root height <= 1 in Increasing Operator notation");
        if (basesD[3].lte(1.44466786100976613366)) throw new RangeError("Exponent base <= e^(1/e) in Increasing Operator notation");
        if (basesD[4].lte(1)) throw new RangeError("Super-root height <= 1 in Increasing Operator notation");
        if (basesD[5].lte(1.44466786100976613366)) throw new RangeError("Tetration base <= e^(1/e) in Increasing Operator notation");
        this._bases = basesD;
        this.setMaximums(this.unconvertedThresholds);
      }
    }, {
      key: "maximums",
      get: function get() {
        return this._maximums;
      },
      set: function set(maximums) {
        var maximumsD = maximums.map(toDecimal);
        while (maximumsD.length < 6) {
          if (maximumsD.length == 0) maximumsD.push(this._bases[0]);else maximumsD.push(Decimal__default["default"].dInf);
        }
        this._maximums = maximumsD;
        this.setMaximums(this.unconvertedThresholds);
      }
    }, {
      key: "operatorChars",
      get: function get() {
        return this._operatorChars;
      },
      set: function set(operatorChars) {
        var defaultOperatorChars = [[["10 + ", ""], ["10 + ", ""], ["", ""], ["10 * ", " + "]], [["10 * ", ""], ["10 * ", ""], ["", ""], ["10^", " * "]], [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]], [["10^", ""], ["10^", ""], ["", ""], ["(10^)^", " "]], [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]], [["10^^", ""], ["10^^", ""], ["", ""], ["(10^^)^", " "]]];
        while (operatorChars.length < 6) operatorChars.push(defaultOperatorChars[operatorChars.length]);
        this._operatorChars = operatorChars;
      }
    }, {
      key: "thresholds",
      get: function get() {
        return this.unconvertedThresholds;
      },
      set: function set(thresholds) {
        var unconvertedThresholds = [];
        for (var t = 0; t < thresholds.length; t++) {
          var possibleBool = thresholds[t][1];
          if (typeof possibleBool == "boolean") unconvertedThresholds.push([toDecimal(thresholds[t][0]), possibleBool, thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);else unconvertedThresholds.push([toDecimal(thresholds[t][0]), toDecimal(possibleBool), thresholds[t][2], toDecimal(thresholds[t][3]), thresholds[t][4]]);
        }
        if (unconvertedThresholds.length == 0) unconvertedThresholds.push([Decimal__default["default"].dTen, true, 4, Decimal__default["default"].dTen, 2]);
        while (unconvertedThresholds.length < 6) unconvertedThresholds.push(unconvertedThresholds[unconvertedThresholds.length - 1]);
        this.unconvertedThresholds = unconvertedThresholds;
        this.setMaximums(this.unconvertedThresholds);
      }
    }, {
      key: "rootBehavior",
      get: function get() {
        return this._rootBehavior;
      },
      set: function set(rootBehavior) {
        this._rootBehavior = rootBehavior;
        this.setMaximums(this.unconvertedThresholds);
      }
    }, {
      key: "superRootBehavior",
      get: function get() {
        return this._superRootBehavior;
      },
      set: function set(superRootBehavior) {
        this._superRootBehavior = superRootBehavior;
        this.setMaximums(this.unconvertedThresholds);
      }
    }, {
      key: "roundings",
      get: function get() {
        return this._roundings;
      },
      set: function set(roundings) {
        while (roundings.length < 6) roundings.push([Decimal__default["default"].dZero, Decimal__default["default"].dZero, Decimal__default["default"].dZero]);
        this._roundings = roundings;
      }
    }, {
      key: "preAdditionFormats",
      get: function get() {
        return this._preAdditionFormats;
      },
      set: function set(preAdditionFormats) {
        var preAdditionFormatsD = preAdditionFormats.map(function (value) {
          return [toDecimal(value[0]), value[1], value[2], value[3], value[4], value[5], value[6]];
        });
        this._preAdditionFormats = preAdditionFormatsD.sort(function (value, other) {
          return Decimal__default["default"].cmp(value[0], other[0]);
        });
      }
    }, {
      key: "nestingBefore",
      get: function get() {
        return this._nestingBefore;
      },
      set: function set(nestingBefore) {
        while (nestingBefore.length < 6) {
          if (nestingBefore.length == 0 || nestingBefore.length % 2 == 1) nestingBefore.push(true);else nestingBefore.push(false);
        }
        this._nestingBefore = nestingBefore;
      }
    }, {
      key: "parenthesize",
      get: function get() {
        return this._parenthesize;
      },
      set: function set(parenthesize) {
        while (parenthesize.length < 6) parenthesize.push([["(", ")", false], ["(", ")", false], ["(", ")", false]]);
        this._parenthesize = parenthesize;
      }
    }, {
      key: "argumentShown",
      get: function get() {
        return this._argumentShown;
      },
      set: function set(argumentShown) {
        while (argumentShown.length < 4) argumentShown.push([function (value) {
          return true;
        }, function (value) {
          return true;
        }]);
        this._argumentShown = argumentShown;
      }
    }, {
      key: "innerNotations",
      get: function get() {
        return this._innerNotations;
      },
      set: function set(innerNotations) {
        if (!Array.isArray(innerNotations)) innerNotations = [[innerNotations, innerNotations, innerNotations]];
        if (innerNotations.length == 0) innerNotations.push([new DefaultNotation(), new DefaultNotation(), new DefaultNotation()]);
        while (innerNotations.length < 6) innerNotations.push(innerNotations[innerNotations.length - 1]);
        this._innerNotations = innerNotations;
      }
    }]);
  }(Notation);

  /**
   * Abbreviates numbers in terms of polygonal numbers (triangular numbers by default, but the amount of sides can be changed). For example, 10 is the 4th triangular number, so it's written as △4.
   * △△ represents the amount of times △ is applied to 2, so △△10 means △(△(△(...△2))) with 10 △'s. Similarly, △△△ represents the amount of times △△ is applied to 2, so △△△5 means △△(△△(△△(△△(△△(2))))).
   * @param sides ( Decimal ) The amount of sides on the polygon in question. Default is 3, which means the triangular numbers are used. This parameter must be greater than 2.
   * @param polyChars ( [[string, string], [string, string], [string, string], [string, string], [string, string], [string, string]] )
   * When the number under a single-polygon is below maxnum (so it's written as a plain number), polyChars[0][0] is placed before the number and polyChars[0][1] is placed after the number.
   * polyChars[1][0] and [1][1] are used instead when the number is itself written in this notation.
   * polyChars[2] and [3] serve the same purpose as [0] and [1] respectively but for double-polygons,
   * and polyChars[4] and [5] are for triple-polygons.
   * Default is [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]].
   * @param maxnum ( Decimal ) Only numbers smaller than this can appear on their own; any larger and another polygonal root is taken. Default is 26796, i.e. △△5.
   * @param maxPolys ( number ) The largest amount of single polygons in a row - any larger and they're truncated into a double polygon string. Default is 5.
   * @param biPolyBase ( Decimal ) The number that the single-polygons are repeatedly applied to to calculate the double-polygon number. Default is 2.
   * @param maxBiPolys ( number ) The largest amount of double polygons in a row - any larger and they're truncated into a triple polygon string. Is the same as maxPolys by default.
   * @param triPolyBase ( Decimal ) The number that the double-polygons are repeatedly applied to to calculate the triple-polygon number. Default is 2.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param minnum ( Decimal ) Values smaller than this are written in terms of their reciprocal. Default is whatever number is written as △0.1, which with sides == 3 is 0.055.
   * @param recipString ( [string, string] | null ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / ", ""], where that 1 is however 1 is written in plainInnerNotation.
   */
  var PolygonalNotation = /*#__PURE__*/function (_Notation) {
    function PolygonalNotation() {
      var _this;
      var sides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var polyChars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]];
      var maxnum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 26796;
      var maxPolys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;
      var biPolyBase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
      var maxBiPolys = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : maxPolys;
      var triPolyBase = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : biPolyBase;
      var innerNotation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : new DefaultNotation();
      var minnum = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : polygon(0.1, sides);
      var recipString = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
      _classCallCheck(this, PolygonalNotation);
      _this = _callSuper(this, PolygonalNotation);
      _this._sides = new Decimal__default["default"](3);
      _this.polyChars = [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]];
      _this._maxnum = new Decimal__default["default"](26796);
      _this.maxPolys = 5;
      _this._biPolyBase = Decimal__default["default"].dTwo;
      _this.maxBiPolys = _this.maxPolys;
      _this._triPolyBase = _this._biPolyBase;
      _this.innerNotation = new DefaultNotation();
      _this._minnum = polygon(0.1, _this._sides);
      _this.recipString = null;
      _this.name = "Polygonal Notation";
      _this.sides = sides;
      _this.maxnum = maxnum;
      _this.maxPolys = maxPolys;
      _this.biPolyBase = biPolyBase;
      _this.maxBiPolys = maxBiPolys;
      _this.triPolyBase = triPolyBase;
      _this.polyChars = polyChars;
      _this.innerNotation = innerNotation;
      _this.minnum = minnum;
      _this.recipString = recipString;
      return _this;
    }
    _inherits(PolygonalNotation, _Notation);
    return _createClass(PolygonalNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.lt(this._minnum)) {
          if (value.eq(0)) return this.innerNotation.format(0);
          var recipStr = ["", ""];
          if (this.recipString === null) recipStr = [this.innerNotation.format(1) + " / ", ""];else recipStr = this.recipString;
          return recipStr[0] + this.format(value.recip()) + recipStr[1];
        } else if (value.lt(polygon(this._maxnum, this._sides))) return this.polyChars[0][0] + this.innerNotation.format(polygonRoot(value, this._sides)) + this.polyChars[0][1];else if (value.lt(biPolygon(this.maxPolys, this._sides, this._maxnum))) return this.polyChars[1][0] + this.format(polygonRoot(value, this._sides)) + this.polyChars[1][1];else if (value.lt(biPolygon(this._maxnum, this._sides, this._biPolyBase))) return this.polyChars[2][0] + this.innerNotation.format(biPolygonRoot(value, this._sides, this._biPolyBase)) + this.polyChars[2][1];else if (value.lt(triPolygon(this.maxBiPolys, this._sides, this._biPolyBase, this._maxnum))) return this.polyChars[3][0] + this.format(biPolygonRoot(value, this._sides, this._biPolyBase)) + this.polyChars[3][1];else if (value.lt(triPolygon(this._maxnum.toNumber(), this._sides, this._biPolyBase, this._triPolyBase))) return this.polyChars[4][0] + this.innerNotation.format(triPolygonRoot(value, this._sides, this._biPolyBase, this._triPolyBase)) + this.polyChars[4][1];else return this.polyChars[5][0] + this.format(triPolygonRoot(value, this._sides, this._biPolyBase, this._triPolyBase)) + this.polyChars[5][1];
      }
    }, {
      key: "sides",
      get: function get() {
        return this._sides;
      },
      set: function set(sides) {
        var sidesD = toDecimal(sides);
        if (sidesD.lte(2)) throw new RangeError("Sides <= 2 in Polygonal Notation");
        this._sides = sidesD;
      }
    }, {
      key: "maxnum",
      get: function get() {
        return this._maxnum;
      },
      set: function set(maxnum) {
        var maxnumD = toDecimal(maxnum);
        if (maxnumD.lte(1)) throw new RangeError("Maxnum <= 1 in Polygonal Notation");
        this._maxnum = maxnumD;
      }
    }, {
      key: "biPolyBase",
      get: function get() {
        return this._biPolyBase;
      },
      set: function set(biPolyBase) {
        var biPolyBaseD = toDecimal(biPolyBase);
        if (biPolyBaseD.lte(1)) throw new RangeError("biPolyBase <= 1 in Polygonal Notation");
        this._biPolyBase = biPolyBaseD;
      }
    }, {
      key: "triPolyBase",
      get: function get() {
        return this._triPolyBase;
      },
      set: function set(triPolyBase) {
        var triPolyBaseD = toDecimal(triPolyBase);
        if (triPolyBaseD.lte(1)) throw new RangeError("triPolyBase <= 1 in Polygonal Notation");
        this._triPolyBase = triPolyBaseD;
      }
    }, {
      key: "minnum",
      get: function get() {
        return this._minnum;
      },
      set: function set(minnum) {
        var minnumD = toDecimal(minnum);
        if (minnumD.gte(1)) throw new RangeError("Minnum >= 1 in Polygonal Notation");
        this._minnum = minnumD;
      }
    }]);
  }(Notation);

  /**
   * A Myriad-like notation that abbreviates numbers in terms of powers of double factorials (as in 3!! = (3!)! = 720) and a coefficient. Numbers below 720 are just written as normal, then a factor of 3!! is introduced, so 1080 would be 1.5 * 3!!.
   * Above 720^2, powers of 3!! are written as, well, powers of 3!!, so 1,000,000 would be around 1.929 * 3!!^2. The highest double factorial is included first, so powers of 4!! start being included, then 5!!, and so on; for example, 10^^4 is written as 5!! * 6!!^2 * 7!!^9 * 8!!^7 * 9!!^4 * 10!!^4 * 11!!^7 * 12!!^2.
   * Once the double factorial number gets too high, the entire thing is wrapped in a single factorial, such as (12!!^5 * 13!!^7)!, then multiple factorials, then the number of factorials gets written out, eventually in this notation as well.
   * @param minDF ( Decimal ) The lowest double factorial that gets written as a double factorial - numbers below that are just written as the coefficient. Default is 3, meaning 3!! (720) is the cutoff point for the coefficient.
   * @param maxDF ( Decimal ) The limit of double factorial numbers - once the double factorial would reach this point, the number gets wrapped in another single factorial. Default is 3628800, i.e. 10!.
   * @param reverseTerms ( boolean ) If this parameter is true, the double factorials are written in descending order instead of ascending order. Default is false.
   * @param maxTerms ( number ) Only the largest few terms (double factorials and the coefficient) are written - this parameter controls how many terms are written. Default is 8.
   * @param multiplicationSign ( string ) The string placed between each term. Default is " * ".
   * @param divisionSign ( string ) The string placed between each term for numbers below 1. Default is " / ".
   * @param DFChars ( [[string, string], [string, string], [string, string]] ) These are the strings used to indicate double factorials. For each of the three pairs in this array, the first entry goes before the number in question, the second goes after.
   * DFChars[0][0] and [0][1] go before and after the double factorial number itself. When a double factorial is raised to a power, [1][0] and [1][1] then go around that double factorial string, while [2][0] and [2][1] go around the exponent. Default is [["", "!!"], ["", ""], ["^", ""]].
   * @param powerBefore ( boolean ) If this is true, the exponent on a double factorial goes before the double factorial instead of after. Default is false.
   * @param factorialChars ( [[string, string], [string, string], [string, string], [string, string]] ) These strings are used for larger numbers to indicate further factorials have been taken. For each of the four pairs in this array, the first entry goes before the number in question, the second goes after.
   * factorialChars[0][0] and [0][1] go around the rest of the expression to indicate a single factorial is taken, then once more factorials are taken, [1][0] and [1][1] are used for all factorials beyond the innermost one.
   * Once it switches to writing out the amount of factorials as a number, [2][0] and [2][1] go around the rest of the expression, [3][0] and [3][1] go around the factorial amount. Default is [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]].
   * @param maxFactorials ( number ) The largest amount of factorials that will be written out in a row - any more than this and the amount of factorials starts being written as a number. Default is 5.
   * @param factorialBefore ( boolean ) If this is true, the amount of factorials for super large numbers is written before the rest of the expression instead of after. Default is false.
   * @param coefficientInnerNotation ( Notation ) The notation that the coefficient is written in. DefaultNotation is the default.
   * @param DFInnerNotation ( Notation ) The notation that the double factorial numbers are written in. Is the same as coefficientInnerNotation by default.
   * @param powerInnerNotation ( Notation ) The notation that the exponents on double factorials are written in. Is the same as coefficientInnerNotation by default.
   * @param factorialInnerNotation ( Notation | null ) The notation that the amount of factorials is written in - if this is null, then the amount of factorials is written in this notation itself. Default is null.
   * @param recipString ( [string, string] ) When a number is written in terms of its reciprocal, recipString[0] goes before that reciprocal, recipString[1] goes afterwards. Default is null, which means recipString is set to ["1 / (", ")"], where that "1 / " is actually the concatenation of (how coefficientInnerNotation formats 1) and divisionSign.
   */
  var DoubleFactorialsNotation = /*#__PURE__*/function (_Notation) {
    function DoubleFactorialsNotation() {
      var _this;
      var minDF = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var maxDF = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3628800;
      var reverseTerms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var maxTerms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 8;
      var multiplicationSign = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : " * ";
      var divisionSign = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : " / ";
      var DFChars = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [["", "!!"], ["", ""], ["^", ""]];
      var powerBefore = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var factorialChars = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]];
      var maxFactorials = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 5;
      var factorialBefore = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : false;
      var coefficientInnerNotation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : new DefaultNotation();
      var DFInnerNotation = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : coefficientInnerNotation;
      var powerInnerNotation = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : coefficientInnerNotation;
      var factorialInnerNotation = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : null;
      var recipString = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : null;
      _classCallCheck(this, DoubleFactorialsNotation);
      _this = _callSuper(this, DoubleFactorialsNotation);
      _this._minDF = new Decimal__default["default"](3);
      _this._maxDF = new Decimal__default["default"](3628800);
      _this.reverseTerms = false;
      _this._maxTerms = 8;
      _this.multiplicationSign = " * ";
      _this.divisionSign = " / ";
      _this.DFChars = [["", "!!"], ["", ""], ["^", ""]];
      _this.powerBefore = false;
      _this.factorialChars = [["(", ")!"], ["", "!"], ["(", ")!"], ["(", ")"]];
      _this.maxFactorials = 5;
      _this.factorialBefore = false;
      _this.coefficientInnerNotation = new DefaultNotation();
      _this.DFInnerNotation = _this.coefficientInnerNotation;
      _this.powerInnerNotation = _this.coefficientInnerNotation;
      _this.factorialInnerNotation = null;
      _this.recipString = null;
      _this.name = "Double Factorials Notation";
      minDF = toDecimal(minDF);
      if (minDF.lte(1)) throw new RangeError("minDF <= 1 in Double Factorials Notation");
      _this._minDF = minDF;
      _this.maxDF = maxDF;
      _this.reverseTerms = reverseTerms;
      _this._maxTerms = maxTerms;
      _this.multiplicationSign = multiplicationSign;
      _this.divisionSign = divisionSign;
      _this.DFChars = DFChars;
      _this.powerBefore = powerBefore;
      _this.factorialChars = factorialChars;
      _this.factorialBefore = factorialBefore;
      _this.maxFactorials = maxFactorials;
      _this.coefficientInnerNotation = coefficientInnerNotation;
      _this.DFInnerNotation = DFInnerNotation;
      _this.powerInnerNotation = powerInnerNotation;
      _this.factorialInnerNotation = factorialInnerNotation;
      _this.recipString = recipString;
      return _this;
    }
    _inherits(DoubleFactorialsNotation, _Notation);
    return _createClass(DoubleFactorialsNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.coefficientInnerNotation.format(0);
        var currentValue = value;
        var minDFNum = iteratedfactorial(this._minDF, 2);
        var multiplicationUsed = this.multiplicationSign;
        var negExp = false;
        if (value.lt(1)) {
          if (value.lt(iteratedfactorial(this._minDF.plus(this._maxTerms).sub(1).min(this._maxDF), 2).recip())) {
            var recipString = ["", ""];
            if (this.recipString === null) recipString = [this.coefficientInnerNotation.format(1) + this.divisionSign + "(", ")"];else recipString = this.recipString;
            return recipString[0] + this.format(value.recip()) + recipString[1];
          }
          negExp = true;
          currentValue = value.recip().mul(minDFNum);
          multiplicationUsed = this.divisionSign;
        }
        var result = "";
        var factorialLimit = iteratedfactorial(this._maxDF, 2);
        var factorials = Decimal__default["default"].dZero;
        if (currentValue.gte(factorialLimit)) {
          factorials = factorial_slog(currentValue).sub(factorial_slog(factorialLimit)).plus(1).floor().max(0);
          currentValue = factorials.gte(9e15) ? iteratedfactorial(this._minDF, 2) : inverse_factorial(currentValue, factorials.toNumber());
        }
        var currentDF = inverse_factorial(currentValue, 2).floor();
        var termsSoFar = 0;
        while (currentDF.gte(this._minDF)) {
          var DFNum = iteratedfactorial(currentDF, 2);
          var subresult = this.DFChars[0][0] + this.DFInnerNotation.format(currentDF) + this.DFChars[0][1];
          var power = currentValue.log(DFNum).floor();
          var powerString = "";
          if (power.neq(1)) {
            subresult = this.DFChars[1][0] + subresult + this.DFChars[1][1];
            powerString = this.DFChars[2][0] + this.powerInnerNotation.format(power) + this.DFChars[2][1];
          }
          if (this.powerBefore) subresult = powerString + subresult;else subresult += powerString;
          if (this.reverseTerms) result += subresult;else result = subresult + result;
          termsSoFar++;
          if (termsSoFar >= this._maxTerms) break;else {
            if (this.reverseTerms) result += multiplicationUsed;else result = multiplicationUsed + result;
          }
          currentValue = currentValue.div(DFNum.pow(power));
          currentDF = inverse_factorial(currentValue, 2).floor();
        }
        if (termsSoFar < this._maxTerms) {
          if (negExp) {
            currentValue = minDFNum.div(currentValue);
          }
          if (this.reverseTerms) result += this.coefficientInnerNotation.format(currentValue);else result = this.coefficientInnerNotation.format(currentValue) + result;
        }
        if (factorials.gt(0)) {
          if (factorials.lte(this.maxFactorials)) {
            result = this.factorialChars[0][0] + result + this.factorialChars[0][1];
            for (var i = 1; i < factorials.toNumber(); i++) result = this.factorialChars[1][0] + result + this.factorialChars[1][1];
          } else {
            result = this.factorialChars[2][0] + result + this.factorialChars[2][1];
            var factorialString = "";
            if (this.factorialInnerNotation === null) factorialString = this.factorialChars[3][0] + this.format(factorials) + this.factorialChars[3][1];else factorialString = this.factorialChars[3][0] + this.factorialInnerNotation.format(factorials) + this.factorialChars[3][1];
            if (this.factorialBefore) result = factorialString + result;else result += factorialString;
          }
        }
        return result;
      }
    }, {
      key: "minDF",
      get: function get() {
        return this._minDF;
      },
      set: function set(minDF) {
        var minDFD = toDecimal(minDF);
        if (minDFD.lte(1)) throw new RangeError("minDF <= 1 in Double Factorials Notation");
        if (minDFD.gte(this._maxDF)) throw new RangeError("minDF above maxDF in Double Factorials Notation");
        this._minDF = minDFD;
      }
    }, {
      key: "maxDF",
      get: function get() {
        return this._maxDF;
      },
      set: function set(maxDF) {
        var maxDFD = toDecimal(maxDF);
        if (maxDFD.lte(1)) throw new RangeError("maxDF <= 1 in Double Factorials Notation");
        if (maxDFD.lte(this._minDF)) throw new RangeError("maxDF below minDF in Double Factorials Notation");
        this._maxDF = maxDFD;
      }
    }, {
      key: "maxTerms",
      get: function get() {
        return this._maxTerms;
      },
      set: function set(maxTerms) {
        if (maxTerms <= 0) throw new RangeError("Nonpositive max terms in Double Factorials Notation");
        this._maxTerms = maxTerms;
      }
    }]);
  }(Notation);

  /**
   * Uses a grid of empty and filled squares to represent numbers. Each row is written in binary, where empty squares are 0s and filled squares are 1s.
   * The first row represents the number itself. The second row represents how many extra squares the first row should have before the last ones (the last ones are what's shown) - in other words, whatever number n is in the second row means the first row is multiplied by 2^n.
   * The third row shows the amount of extra squares that should be in the second row, and so on.
   * Negative numbers have an empty diamond in front of the first row, and such a diamond can also be in front of the second row (so the exponent of the 2^n is negative) for small numbers.
   * For tetrational numbers, there may even be a second plane: the second plane's number is the amount of extra rows that the first plane should have before the last ones (the last ones are what's shown).
   * @param width ( number ) The amount of squares in each row. Default is 8.
   * @param height ( number ) The amount of rows in each plane. Default is 8.
   * @param digits ( string[] ) The digits used to represent the numbers. These digits determine what number base the grid works in; as the name implies, digits[n] is the digit for the number n. Default is ["□", "■"].
   * @param rowOpenings ( [string, string, string] ) Each row begins with rowOpenings[0] normally, but if either of the first two rows is negative, then non-negative rows begin with rowOpenings[1] and negative rows begin with rowOpenings[2]. Default is ["", " ", "◇"].
   * @param fullFirstRow ( boolean ) If this parameter is true, the first row is divided by 2^(width - 1) so it always uses all of its digits, allowing representations of non-whole numbers to not just collapse to their integer part. Default is false.
   * @param opening ( string ) This string goes before the grid. Default is a newline character.
   * @param separator ( string ) This string goes between each digit. Default is the empty string.
   * @param betweenRows ( string ) This string goes between each row. Default is a newline character.
   * @param betweenPlanes ( string ) This string goes between each plane. Default is two newline characters.
   * @param minimumSizes ( [number, number, number] ) Digits of 0 will be added to the end of each row to ensure every row has at least a width of minimumSizes[0]. Rows of 0s will be added to the end of each plane to ensure every plane has at least a height of minimumSizes[1]. Planes of 0s will be added to the end of the grid to ensure the grid has at least a depth of minimumSizes[2]. Default is [width, height, 1], i.e. each plane is expanded to its full size but no extra planes are added.
   * @param backwards ( [boolean, boolean, boolean] ) If backwards[0] is true, then the digits within each row go greatest-to-least instead of least-to-greatest. backwards[1] is similar but for the order of rows within each plane, and backwards[2] is for the order of planes. Default is [false, false, false].
   *
   * This notation does not have an InnerNotation parameter.
   */
  var GridNotation = /*#__PURE__*/function (_Notation) {
    function GridNotation() {
      var _this;
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
      var digits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ["□", "■"];
      var rowOpenings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ["", "   ", "◇"];
      var fullFirstRow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var opening = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "\n";
      var separator = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
      var betweenRows = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "\n";
      var betweenPlanes = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : "\n\n";
      var minimumSizes = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [width, height, 1];
      var backwards = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : [false, false, false];
      _classCallCheck(this, GridNotation);
      _this = _callSuper(this, GridNotation);
      _this._width = 8;
      _this._height = 8;
      _this._digits = ["□", "■"];
      _this.rowOpenings = ["", "   ", "◇"];
      _this.fullFirstRow = false;
      _this.opening = "\n";
      _this.separator = "";
      _this.betweenRows = "\n";
      _this.betweenPlanes = "\n\n";
      _this.minimumSizes = [_this._width, _this._height, 1];
      _this.backwards = [false, false, false];
      _this.name = "Grid Notation";
      _this.width = width;
      _this.height = height;
      _this.digits = digits;
      _this.rowOpenings = rowOpenings;
      _this.fullFirstRow = fullFirstRow;
      _this.separator = separator;
      _this.opening = opening;
      _this.betweenRows = betweenRows;
      _this.betweenPlanes = betweenPlanes;
      _this.minimumSizes = minimumSizes;
      _this.backwards = backwards;
      return _this;
    }
    _inherits(GridNotation, _Notation);
    return _createClass(GridNotation, [{
      key: "nextDigit",
      value: function nextDigit(value) {
        return [value.mod(this._digits.length), value.div(this._digits.length).floor()];
      }
    }, {
      key: "nextRow",
      value: function nextRow(value) {
        if (value.lt(Decimal__default["default"].pow(this._digits.length, this._width))) return [value, Decimal__default["default"].dZero];
        var mantissaPower = Decimal__default["default"].sub(this._width, 1);
        return scientifify(value, this._digits.length, 0, mantissaPower);
      }
    }, {
      key: "nextPlane",
      value: function nextPlane(value) {
        var rows = Decimal__default["default"].dZero;
        if (value.gte(Decimal__default["default"].pow(10, Number.MAX_SAFE_INTEGER))) {
          rows = value.slog(this._digits.length, 100, true).sub(Decimal__default["default"].slog(Decimal__default["default"].pow(10, Number.MAX_SAFE_INTEGER), this._digits.length, true)).plus(1).floor().max(0);
          value = rows.gte(9e15) ? Decimal__default["default"].dOne : value.iteratedlog(this._digits.length, rows.toNumber(), true);
        }
        while (value.gte(Decimal__default["default"].pow(this._digits.length, this._width))) {
          rows = rows.plus(1);
          value = value.log(this._digits.length).sub(this._width - 1);
        }
        for (var i = 1; i < this._height; i++) {
          rows = rows.sub(1);
          value = value.plus(this._width - 1).pow_base(this._digits.length);
          if (rows.eq(0)) return [value, rows];
        }
        return [value, rows];
      }
    }, {
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        var digitLimit = new Decimal__default["default"](this._digits.length);
        var rowLimit = digitLimit.pow(this._width);
        var planeLimit = rowLimit;
        for (var i = 1; i < this._height; i++) planeLimit = digitLimit.pow(planeLimit.plus(this._width));
        var negative = false;
        var negExp = false;
        if (value.lt(0)) {
          negative = true;
          value = value.neg();
        }
        if (value.lt(1) && value.neq(0)) {
          negExp = true;
          var mantissaPower = Decimal__default["default"].sub(this._width, 1);
          var scitifs = scientifify(value, digitLimit, 0, mantissaPower);
          if (this.fullFirstRow) scitifs[1] = scitifs[1].plus(this._width - 1);
          value = digitLimit.pow(scitifs[1].abs()).mul(scitifs[0]);
        } else if (this.fullFirstRow) value = value.mul(rowLimit.div(digitLimit));
        var grid = [[[value]]];
        while (grid[grid.length - 1][0][0].gte(planeLimit)) {
          var pair = this.nextPlane(grid[grid.length - 1][0][0]);
          grid[grid.length - 1][0][0] = pair[0];
          grid.push([[pair[1]]]);
        }
        while (grid.length < this.minimumSizes[2]) grid.push([[Decimal__default["default"].dZero]]);
        for (var p = 0; p < grid.length; p++) {
          var plane = grid[p];
          while (plane[plane.length - 1][0].gte(rowLimit)) {
            var _pair = this.nextRow(plane[plane.length - 1][0]);
            plane[plane.length - 1][0] = _pair[0];
            plane.push([_pair[1]]);
          }
          while (plane.length < this.minimumSizes[1]) plane.push([Decimal__default["default"].dZero]);
          for (var r = 0; r < plane.length; r++) {
            var row = plane[r];
            while (row[row.length - 1].gte(digitLimit)) {
              var _pair2 = this.nextDigit(row[row.length - 1]);
              row[row.length - 1] = _pair2[0];
              row.push(_pair2[1]);
            }
            while (row.length < this.minimumSizes[0]) row.push(Decimal__default["default"].dZero);
          }
        }
        var result = this.opening;
        var gridStart = this.backwards[2] ? grid.length - 1 : 0;
        var gridIncrement = this.backwards[2] ? -1 : 1;
        for (var _p = gridStart; _p < grid.length && _p >= 0; _p += gridIncrement) {
          var _plane = grid[_p];
          var planeStart = this.backwards[1] ? _plane.length - 1 : 0;
          var planeIncrement = this.backwards[1] ? -1 : 1;
          for (var _r = planeStart; _r < _plane.length && _r >= 0; _r += planeIncrement) {
            var _row = _plane[_r];
            if (!negative && !negExp) result += this.rowOpenings[0];else {
              if (_p == 0 && (_r == 0 && negative || _r == 1 && negExp)) result += this.rowOpenings[2];else result += this.rowOpenings[1];
            }
            var rowStart = this.backwards[0] ? _row.length - 1 : 0;
            var rowIncrement = this.backwards[0] ? -1 : 1;
            for (var d = rowStart; d < _row.length && d >= 0; d += rowIncrement) {
              var digit = _row[d];
              result += this._digits[digit.floor().toNumber()];
              if (d < _row.length - 1) result += this.separator;
            }
            if (_r < _plane.length - 1) result += this.betweenRows;
          }
          if (_p < grid.length - 1) result += this.betweenPlanes;
        }
        return result;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      },
      set: function set(width) {
        if (width <= 0) throw new RangeError("Nonpositive width in Grid Notation");
        if (width % 1 != 0) throw new RangeError("Non-whole width in Grid Notation");
        this._width = width;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      },
      set: function set(height) {
        if (height <= 0) throw new RangeError("Nonpositive height in Grid Notation");
        if (height % 1 != 0) throw new RangeError("Non-whole height in Grid Notation");
        this._height = height;
      }
    }, {
      key: "digits",
      get: function get() {
        return this._digits;
      },
      set: function set(digits) {
        if (digits.length < 2) throw new RangeError("Not enough digits for Grid Notation (at least two digits are needed)");
        this._digits = digits;
      }
    }]);
  }(Notation);

  /**
   * Writes numbers in the form of a polynomial-ish expression, with x having a certain value. For example, if x is 10, then 346 is written as 3x^2 + 4x + 6.
   * @param value ( Decimal ) The value of x. Default is 10.
   * @param formatExponents ( number ) If this parameter is positive, then exponents are also written as polynomials, so x^x, x^(3x + 2), x^x^4x, and so on can appear. If this parameter is negative, the exponents are only written as numbers. If this parameter is zero, the exponents are not written at all. Default is 1.
   * @param minimumTerm ( Decimal ) The lowest power of x that gets a term, which may have a non-whole coefficient to account for what would be terms below this one. Default is 0, i.e. the constant term.
   * @param fractionInverse ( boolean ) This parameter controls how negative powers of x are handled.
   * If this parameter is true, then the powers of x continue below the constant term, so if x = 10, then 1.25 is written as 1 + 2x^-1 + 5x^-2.
   * If this parameter is false, then the negative powers of x use denominators instead of negative exponents, so if x = 10, then 1.25 is written as 1 + 2/x + 5/x^2.
   * Default is true.
   * @param maxTerms ( number ) The highest amount of terms shown; terms after the first few are cut off. Default is 8.
   * @param variableStr ( string ) The string used to represent the variable. Default is "x".
   * @param maxMultiTerm ( Decimal ) Only values below this have multiple terms shown. Values above this only show a single term and a coefficient (which may be non-whole). Default is value^^3 or 3^30, whichever is larger.
   * @param maxSingleTerm ( Decimal ) Values above this are considered too big to show on their own, so they get an x^ placed before them and are written in terms of that exponent. Default is value^^5.
   * @param maxExps ( number ) The highest amount of x^'s that can be placed before the polynomial in a row; any more than this and they're abbreviated in (x^)^n form. Default is 5.
   * @param showZeroTerms ( number ) If this parameter is negative, terms with a coefficient of zero are skipped. If this parameter is zero, then terms with a coefficient of zero are shown as long as there's some term with a nonzero coefficient later on. If this parameter is positive, terms, even those with a coefficient of zero, continue to be shown until the maximum amount of terms is hit. Default is -1.
   * @param innerNotation ( Notation ) The notation that the numbers within the expression are themselves notated with. DefaultNotation is the default.
   * @param additionSign ( string ) This string is placed between each term. Default is " + ".
   * @param subtractionSign ( string ) This string is placed between each term for negative numbers. Default is " - ".
   * @param multiplicationSign ( string ) This string is placed between the coefficient and the variable term. Default is the empty string.
   * @param divisionSign ( string ) This string is placed between the coefficient and the variable term for terms below x^0 when inverseTerms is positive. Default is "/".
   * @param multiplicationBefore ( boolean ) If this parameter is true, the coefficient is placed before the variable instead of after. Default is true.
   * @param powerStrings ( [string, string] ) A pair of strings used to denote exponents on variables: powerStrings[0] goes before the exponent, powerStrings[1] goes after the exponent. Default is ["<sup>", "</sup>"].
   * @param coefficientStrings ( [string, string] ) A pair of strings used to denote coefficients on variables: coefficientStrings[0] goes before the coefficient, coefficientStrings[1] goes after the coefficient. Default is ["", ""].
   * @param parenthesizePower ( number ) If this parameter is negative, parentheses are not placed around the exponent. If this parameter is zero, parentheses are placed around the exponent if it contains variables, but not if it's just a number. If this parameter is positive, parentheses are always placed around the exponent. Default is -1.
   * @param unitCoefficientShown ( [boolean, boolean] ) If unitCoefficientShown[0] is true, the coefficient is shown even if it's 1. unitCoefficientShown[1] does the same thing, but for when divisionSign is used instead of for multiplicationSign. Default is [false, true].
   * @param unitPowerShown ( boolean ) Normally, the exponent on x is not shown if it's 1, but it's shown even in that case if unitPowerShown is true. Default is false.
   * @param expStrings ( [[string, string], [string, string], [string, string], [string, string]] ) An array of four pairs of strings that indicate exponentiation on large numbers. In each pair, expStrings[n][0] goes before the value in question, expStrings[n][1] goes after.
   * expStrings[0] replaces the x^() that directly surrounds the number when it's large enough to get x^'s before it. expStrings[1] concerns the rest of the x^'s - expStrings[0] is only for the innermost x^, expStrings[1] is for the rest.
   * expStrings[2] replaces the (x^)^n that indicates repeated exponentiation when that n is just a number, expStrings[3] does the same thing but for when that n contains variables.
   * Default is [["x^(", ")"], ["x^", ""], ["(x^)^", " "], ["(x^)^(", ") "]], where that x is replaced with whatever variableStr is.
   * @param superexpBefore ( boolean ) If this value is true, the repeated exponentiation string stuff comes before the polynomial instead of afterwards. Default is true.
   * @param frontSubtractionSign ( string ) This string is placed at the beginning of the expression for negative numbers. Is the same as subtractionSign by default.
   * @param constantStrings ( [string, string] ) A pair of strings used to denote the constant term: coefficientStrings[0] goes before the constant term, coefficientStrings[1] goes after the constant term. Default is ["", ""].
   * @param precision ( Decimal ) The expression will stop once it gets to within this level of precision compared to the original value, to ensure that meaningless terms (like an x^2 term in an expression with an x^2,000) from floating point imprecision aren't included. Default is 1.2e-16.
   * @param minimumTermRounding ( DecimalSource | ((value : Decimal) => Decimal) ) If the expression includes the minimum term, the minimum term is rounded to the nearest multiple of this value. If this parameter is a function, then the minimum term is plugged into the function, and whatever the function returns is used as the value to round to the nearest multiple of. The rounding is not performed at all if rounding is 0. Default is 0.
   */
  var PolynomialNotation = /*#__PURE__*/function (_Notation) {
    function PolynomialNotation() {
      var _this;
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var formatExponents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var minimumTerm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var fractionInverse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var maxTerms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 8;
      var variableStr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "x";
      var maxMultiTerm = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Decimal__default["default"].tetrate(value, 3).max(Math.pow(3, 30));
      var maxSingleTerm = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : Decimal__default["default"].tetrate(value, 5);
      var maxExps = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 5;
      var showZeroTerms = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : -1;
      var innerNotation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : new DefaultNotation();
      var additionSign = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : " + ";
      var subtractionSign = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : " - ";
      var multiplicationSign = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : "";
      var divisionSign = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : "/";
      var multiplicationBefore = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : true;
      var powerStrings = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : ["<sup>", "</sup>"];
      var coefficientStrings = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : ["", ""];
      var parenthesizePower = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : -1;
      var unitCoefficientShown = arguments.length > 19 && arguments[19] !== undefined ? arguments[19] : [false, true];
      var unitPowerShown = arguments.length > 20 && arguments[20] !== undefined ? arguments[20] : false;
      var expStrings = arguments.length > 21 && arguments[21] !== undefined ? arguments[21] : [[variableStr + "^(", ")"], [variableStr + "^", ""], ["(" + variableStr + "^)^", " "], ["(" + variableStr + "^)^(", ") "]];
      var superexpBefore = arguments.length > 22 && arguments[22] !== undefined ? arguments[22] : true;
      var frontSubtractionSign = arguments.length > 23 && arguments[23] !== undefined ? arguments[23] : subtractionSign;
      var constantStrings = arguments.length > 24 && arguments[24] !== undefined ? arguments[24] : ["", ""];
      var precision = arguments.length > 25 && arguments[25] !== undefined ? arguments[25] : 1.2e-16;
      var minimumTermRounding = arguments.length > 26 && arguments[26] !== undefined ? arguments[26] : 0;
      _classCallCheck(this, PolynomialNotation);
      _this = _callSuper(this, PolynomialNotation);
      _this._value = Decimal__default["default"].dTen;
      _this.formatExponents = 1;
      _this.minimumTerm = Decimal__default["default"].dZero;
      _this.fractionInverse = true;
      _this._maxTerms = 8;
      _this.variableStr = "x";
      _this.maxMultiTerm = _this._value.tetrate(3).max(Math.pow(3, 30));
      _this.maxSingleTerm = _this._value.tetrate(5);
      _this.maxExps = 5;
      _this.showZeroTerms = -1;
      _this.innerNotation = new DefaultNotation();
      _this.additionSign = " + ";
      _this.subtractionSign = " - ";
      _this.multiplicationSign = "";
      _this.divisionSign = "/";
      _this.multiplicationBefore = true;
      _this.powerStrings = ["<sup>", "</sup>"];
      _this.coefficientStrings = ["", ""];
      _this.parenthesizePower = -1;
      _this.unitCoefficientShown = [false, true];
      _this.unitPowerShown = false;
      _this.superexpBefore = true;
      _this.frontSubtractionSign = _this.subtractionSign;
      _this.constantStrings = ["", ""];
      _this.precision = new Decimal__default["default"](1.2e-16);
      _this.minimumTermRounding = Decimal__default["default"].dZero;
      _this.name = "Polynomial Notation";
      _this.formatExponents = formatExponents;
      _this.value = value;
      _this.minimumTerm = toDecimal(minimumTerm);
      _this.fractionInverse = fractionInverse;
      _this.maxTerms = maxTerms;
      _this.variableStr = variableStr;
      _this.maxMultiTerm = toDecimal(maxMultiTerm);
      _this.maxSingleTerm = toDecimal(maxSingleTerm);
      _this.maxExps = maxExps;
      _this.showZeroTerms = showZeroTerms;
      _this.innerNotation = innerNotation;
      _this.additionSign = additionSign;
      _this.subtractionSign = subtractionSign;
      _this.multiplicationSign = multiplicationSign;
      _this.divisionSign = divisionSign;
      _this.multiplicationBefore = multiplicationBefore;
      _this.powerStrings = powerStrings;
      _this.coefficientStrings = coefficientStrings;
      _this.parenthesizePower = parenthesizePower;
      _this.unitCoefficientShown = unitCoefficientShown;
      _this.unitPowerShown = unitPowerShown;
      _this.expStrings = expStrings;
      _this.superexpBefore = superexpBefore;
      _this.frontSubtractionSign = frontSubtractionSign;
      _this.constantStrings = constantStrings;
      _this.precision = toDecimal(precision);
      _this.minimumTermRounding = minimumTermRounding;
      return _this;
    }
    _inherits(PolynomialNotation, _Notation);
    return _createClass(PolynomialNotation, [{
      key: "format",
      value: function format(value) {
        var decimal = toDecimal(value);
        if (decimal.isNan()) return this.NaNString;
        if (this.isInfinite(decimal)) {
          return decimal.sgn() < 0 ? this.negativeInfinite : this.infinite;
        }
        if (decimal.neq(0) && this.isInfinite(decimal.recip())) {
          return this.format(0);
        }
        return this.formatDecimal(decimal);
      }
    }, {
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return this.innerNotation.format(0);
        var result = "";
        var negative = false;
        if (value.lt(0)) {
          negative = true;
          value = value.abs();
          result = this.frontSubtractionSign;
        }
        if (value.lte(this.maxMultiTerm.recip()) || this.minimumTerm.isFinite() && value.lt(this._value.pow(this.minimumTerm)) && value.lt(this._value.pow(this.minimumTerm.neg().div(2)))) {
          result += this.innerNotation.format(1) + this.divisionSign + "(" + this.format(value.recip()) + ")";
          return result;
        }
        var baseString = this.variableStr;
        var bottomExps = value.slog(this._value, 100, true).sub(this.maxSingleTerm.slog(this._value, 100, true)).plus(1).floor().max(0);
        if (bottomExps.lt(9e15)) {
          value = value.iteratedlog(this._value, bottomExps.toNumber(), true);
          var currentValue = value;
          var bottom = value.mul(this.precision);
          var roundingMultiple = this.minimumTerm.eq(-Infinity) ? Decimal__default["default"].dZero : typeof this.minimumTermRounding == "function" ? this.minimumTermRounding(value.mod(this._value.pow(this.minimumTerm))) : toDecimal(this.minimumTermRounding);
          currentValue = round(currentValue, this.minimumTerm.eq(-Infinity) ? Decimal__default["default"].dZero : this._value.pow(this.minimumTerm).mul(roundingMultiple));
          var termsSoFar = 0;
          var maxTerms = currentValue.lt(this.maxMultiTerm) ? this._maxTerms : 1;
          var power = currentValue.log(this._value).floor().plus(1);
          while (termsSoFar < maxTerms && (currentValue.gte(bottom) || this.showZeroTerms > 0)) {
            termsSoFar++;
            var coefficient = void 0;
            var powerNum = void 0;
            if (this.showZeroTerms >= 0) {
              power = power.sub(1);
              powerNum = this._value.pow(power);
              coefficient = currentValue.div(powerNum);
            } else {
              var _scientifify = scientifify(currentValue, this._value);
              var _scientifify2 = _slicedToArray(_scientifify, 2);
              coefficient = _scientifify2[0];
              power = _scientifify2[1];
              powerNum = this._value.pow(power);
            }
            if (power.lt(this.minimumTerm)) {
              power = this.minimumTerm;
              powerNum = this._value.pow(power);
              coefficient = currentValue.div(powerNum);
            }
            if (value.lt(this.maxMultiTerm) && power.gt(this.minimumTerm)) coefficient = coefficient.floor();else coefficient = round(coefficient, this.minimumTermRounding);
            var subresult = "";
            if (power.eq(0)) subresult = this.constantStrings[0] + this.innerNotation.format(coefficient) + this.constantStrings[1];else {
              var reciprocal = false;
              if (this.fractionInverse && power.lt(0)) {
                reciprocal = true;
                power = power.abs();
              }
              var powerString = "";
              if (this.formatExponents != 0 && (this.unitPowerShown || power.neq(1))) {
                if (this.formatExponents > 0) powerString = this.format(power);else powerString = this.innerNotation.format(power);
                if (this.parenthesizePower > 0 || this.parenthesizePower == 0 && power.abs().gte(this._value) && this.formatExponents > 0) powerString = "(" + powerString + ")";
                powerString = this.powerStrings[0] + powerString + this.powerStrings[1];
              }
              powerString = baseString + powerString;
              var coefficientString = "";
              if (coefficient.neq(1) || this.unitCoefficientShown[0] && !reciprocal || this.unitCoefficientShown[1] && reciprocal) {
                coefficientString = this.innerNotation.format(coefficient);
                coefficientString = this.coefficientStrings[0] + coefficientString + this.coefficientStrings[1];
              }
              subresult = powerString;
              var usedSign = reciprocal ? this.divisionSign : this.multiplicationSign;
              if (coefficientString) {
                if (this.multiplicationBefore) subresult = coefficientString + usedSign + powerString;else subresult = powerString + usedSign + coefficientString;
              }
            }
            result += subresult;
            if (power.lte(this.minimumTerm)) break;
            currentValue = currentValue.sub(powerNum.mul(coefficient));
            if (termsSoFar < maxTerms && (currentValue.gt(bottom) || this.showZeroTerms > 0)) {
              if (negative) result += this.subtractionSign;else result += this.additionSign;
            }
          }
        }
        if (bottomExps.gt(0) && bottomExps.lte(this.maxExps)) {
          result = this.expStrings[0][0] + result + this.expStrings[0][1];
          for (var i = 1; i < bottomExps.toNumber(); i++) result = this.expStrings[1][0] + result + this.expStrings[1][1];
        } else if (bottomExps.gt(this.maxExps)) {
          var superexpString = "";
          if (bottomExps.lt(this._value)) superexpString = this.expStrings[2][0] + this.format(bottomExps) + this.expStrings[2][1];else superexpString = this.expStrings[3][0] + this.format(bottomExps) + this.expStrings[3][1];
          if (this.superexpBefore) result = superexpString + result;else result += superexpString;
        }
        return result;
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(value) {
        var valueD = toDecimal(value);
        if (valueD.lte(1)) throw new RangeError("Value <= 1 in Polynomial Notation");
        if (this.formatExponents > 0 && valueD.lte(1.44466786100976613366)) throw new RangeError("Bases with convergent tetration don't work in Polynomial Notation with formatted exponents");
        this._value = valueD;
      }
    }, {
      key: "maxTerms",
      get: function get() {
        return this._maxTerms;
      },
      set: function set(maxTerms) {
        if (maxTerms <= 0) throw new RangeError("Nonpositive max terms in Polynomial Notation");
        this._maxTerms = maxTerms;
      }
    }]);
  }(Notation);

  /**
   * Similar to Letters notation, but without a mantissa: the lowercase letters themselves represent the number, so a is 1, b is 2... z is 26, aa is 27... and so on.
   * Uppercase letters mean the same thing they do in Letters notation: in an expression with an uppercase A, the number (which here is represented by the lowercase letters) represent the amount of lowercase letters that would be in the full expression without the A,
   * an uppercase B expression's lowercase letters represent how many lowercase letters would be in an uppercase A expression, and so on.
   * @param letters ( [string[], string[], string[]] ) An array of three arrays of strings. The first array is the lowercase letters, the second array is the uppercase letters, and the third is the "third letters", of which @ is the only one in the default system. The default setting has the 26 lowercase letters as the first array, the 26 uppercase letters as the second array, and a single-entry array containing only @ as the third array.
   * @param negaLetters ( number | [number, number, number] ) In this notation, the letters are like the digits in an alternate base - this parameter controls how many of the digits in the base are negative. Default is -1, which corresponds to a bijective base. 0 would be a regular base, i.e. including a letter for zero.
   * This parameter must be between -1 and (the amount of letters - 2). If this parameter is a single number, then that's the amount of negative letters for all three letter types, but if it's an array then negaLetters[0] is for the lowercase letters, negaLetters[1] is for the uppercase letters, and negaLetters[2] is for the third letters.
   * @param max_letters ( number ) The highest amount of letters of a single tier - any more, and they're truncated into the next tier. Default is 9.
   * @param fraction ( boolean ) If this parameter is false, a non-whole lowercase letter is represented by decimal places. If this parameter is true, a non-whole lowercase letter is represented by an approximation as a "mixed number" fraction. Default is true. Note that if negaLetters[0] is -1 or equal to letters[0].length, an error will be thrown if this parameter is false, as bijective bases don't allow decimal places.
   * @param placesAbove1 ( number ) If fraction is false, then this is the amount of decimal places shown for numbers above 1. If this is negative, then the absolute value of this parameter is the amount of significant figures shown (though place values before the decimal point are never cut off).
   * On the other hand, if fraction is true, then this is the precision of the fractional approximation. If this is positive, the approximation will be within placesAbove1 of the true value. If this is negative, the approximation will be within value/abs(placesAbove1) of the true value. In other words, a positive precision is absolute, a negative precision is proportional.
   * @param placesBelow1 ( number ) Same as placesAbove1, but for values below 1 instead.
   * @param lettersOrder ( number ) The order that the different types of letters go in when multiple are present. Default is 0, which corresponds to [third, uppercase, lowercase]. Each value from 0 to 5 represents a different ordering.
   * @param commasMin ( Decimal ) Only numbers equal to or greater than this value show commas. If this value is negative, commas are never used. Default is -1.
   * @param commaSpacing ( number ) How many digits are between each comma? Default is 3.
   * @param commaChars ( string[] ) What are the commas? If this array of strings has only one character, that character is used as the comma. If the array has multiple characters, the array is cycled through, so commaChars[0] is used for the first comma (the comma closest to the ones place), commaChars[1] is used for the second comma, and repeat, going back to commaChars[0] after the last entry. Default is [","].
   * @param decimalChar ( string ) The character used as the decimal point. Default is ".".
   * @param hyperseparator ( string ) This string goes between each tier of letters. Default is the empty string.
   * @param alwaysHyperseparate ( boolean ) If this parameter is true, hyperseparators appear for every letter tier after the first non-empty one, even if some of the later ones are empty (and thus would normally skip their hyperseparator). Default is false.
   * @param reverseLetters ( boolean ) If this is true, the letters of a single type are written right to left instead of left to right. Default is false.
   * @param minnum ( Decimal ) Numbers less than this are written in terms of their reciprocal. Default is 1.
   * @param recipString ( [string, string] ) The strings used to represent that the letter expression is actually its reciprocal (for numbers below minnum); divisionChar[0] goes before the letter expression, divisionChar[1] goes after the letter expression. Default is ["/", ""].
   * @param specialLetters ( [[(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][], [(placeValue : number, fromStart? : number, outerValue? : number) => boolean, string[]][]] )
   * An array of three arrays of pairs where each pair contains a (number, number?, number?) -> boolean function and a string array; this parameter allows different place values to use different letters (though the amount of letters remains the same). specialLetters[0] is for the lowercase letters, specialLetters[1] is for the uppercase letters, and specialLetters[2] is for the third letters.
   * The function's arguments are the place value of the letter (the last place is place value 0), the letter's distance from the leftmost letter, and the "value" of that letter string (a is 1, z is 26, aa is 27, etc.), and the function returns true if this letter is to use that set of special letters instead of the normal ones; the string array is the set of special letters to be used.
   * Earlier entries in specialLetters take priority, reverting back to the regular letters if none of the special letters apply or if the one that does apply doesn't have enough entries to represent that letter.
   * @param fixedLetters ( [[number, string][], [number, string][], [number, string][]] ) If the value of the letter string matches any of the numbers in that letter type's array in here (fixedLetters[0] is for the lowercase letters, fixedLetters[1] is for the uppercase letters, fixedLetters[2] is for the third letters), the regular letters are not used - instead, the letter string is just set to that number's corresponding string in this array. Default is [[], [], []], i.e. there are no fixed letters.
   * @param concatenation ( [null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?], null | [boolean, string, string, Notation?]] ) concatenation[0] is for lowercase letters, concatenation[1] is for uppercase letters, concatenation[2] is for third letters.
   * If a concatenation entry is not null, then when multiple of the same letter of a single tier are adjacent, they'll be concatenated into a single letter with a number next to it to indicate the amount of that digit that was concatenated.
   * concatenation[n][1] and concatenation[n][2] are placed before and after the concatenation number. If concatenation[n][3] is undefined, the concatenation number is written as a letter string itself, otherwise it's written in whatever notation is given. If concatenation[n][0] is true, then the concatenation number comes after the letter being concatenated, otherwise it comes before.
   * Default is [null, null, null], i.e. no concatenation occurs.
   *
   * This notation does not have an innerNotation parameter.
   */
  var LetterDigitsNotation = /*#__PURE__*/function (_Notation) {
    function LetterDigitsNotation() {
      var _this;
      var letters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [lowercaseAlphabet, uppercaseAlphabet, ["@"]];
      var negaLetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var max_letters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;
      var fraction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var placesAbove1 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1e-6;
      var placesBelow1 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : -1e-6;
      var lettersOrder = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var commasMin = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : -1;
      var commaSpacing = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 3;
      var commaChars = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : [","];
      var decimalChar = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : ".";
      var hyperseparator = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "";
      var alwaysHyperseparate = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : false;
      var reverseLetters = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
      var minnum = arguments.length > 14 && arguments[14] !== undefined ? arguments[14] : 1;
      var recipString = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : ["/", ""];
      var specialLetters = arguments.length > 16 && arguments[16] !== undefined ? arguments[16] : [[], [], []];
      var fixedLetters = arguments.length > 17 && arguments[17] !== undefined ? arguments[17] : [[], [], []];
      var concatenation = arguments.length > 18 && arguments[18] !== undefined ? arguments[18] : [null, null, null];
      _classCallCheck(this, LetterDigitsNotation);
      _this = _callSuper(this, LetterDigitsNotation);
      _this._letters = [lowercaseAlphabet, uppercaseAlphabet, ["@"]];
      _this._negaLetters = [-1, -1, -1];
      _this._max_letters = 9;
      _this._fraction = true;
      _this.placesAbove1 = -1e-6;
      _this.placesBelow1 = -1e-6;
      _this.lettersOrder = 0;
      _this.commasMin = Decimal__default["default"].dNegOne;
      _this.commaSpacing = 3;
      _this.commaChars = [","];
      _this.decimalChar = ".";
      _this.hyperseparator = "";
      _this.alwaysHyperseparate = false;
      _this.reverseLetters = false;
      _this.minnum = Decimal__default["default"].dOne;
      _this.recipString = ["/", ""];
      _this.specialLetters = [[], [], []];
      _this.fixedLetters = [[], [], []];
      _this.concatenation = [null, null, null];
      _this.name = "Letters Notation";
      _this.letters = letters;
      _this.negaLetters = negaLetters;
      _this.max_letters = max_letters;
      _this.fraction = fraction;
      _this.placesAbove1 = placesAbove1;
      _this.placesBelow1 = placesBelow1;
      _this.lettersOrder = lettersOrder;
      _this.commasMin = toDecimal(commasMin);
      _this.commaSpacing = commaSpacing;
      _this.commaChars = commaChars;
      _this.decimalChar = decimalChar;
      _this.hyperseparator = hyperseparator;
      _this.alwaysHyperseparate = alwaysHyperseparate;
      _this.reverseLetters = reverseLetters;
      _this.minnum = toDecimal(minnum);
      _this.recipString = recipString;
      _this.specialLetters = specialLetters;
      _this.fixedLetters = fixedLetters;
      _this.concatenation = concatenation;
      return _this;
    }
    _inherits(LetterDigitsNotation, _Notation);
    return _createClass(LetterDigitsNotation, [{
      key: "formatDecimal",
      value: function formatDecimal(value) {
        if (value.eq(0)) return BaseConvert(0, this._letters[0], 0, 0, this._negaLetters[0], 0, -1, this.reverseLetters, this.commaSpacing, this.commaChars, undefined, undefined, undefined, this.specialLetters[0], this.concatenation[0]);
        if (value.lt(this.minnum)) return this.recipString[0] + this.format(value.recip()) + this.recipString[1];
        // let negExp = false;
        // if (value.lt(1)) {
        //   negExp = true;
        //   let [m, e] = scientifify(value, this._letters[0].length);
        //   value = this._base.pow(e.neg()).mul(m); 
        // }
        var lowercaseLimit = this._max_letters + 1;
        var uppercaseLimit = this._max_letters + 1;
        if (this._letters[0].length > 1) lowercaseLimit = ((this._letters[0].length - this._negaLetters[0] - 1) * Math.pow(this._letters[0].length, this._max_letters) + this._negaLetters[0]) / (this._letters[0].length - 1);
        if (this._letters[1].length > 1) uppercaseLimit = ((this._letters[1].length - this._negaLetters[1] - 1) * Math.pow(this._letters[1].length, this._max_letters) + this._negaLetters[1]) / (this._letters[1].length - 1);
        var letter = Decimal__default["default"].dZero;
        var uppercaseLetter = Decimal__default["default"].dZero;
        var thirdLetter = Decimal__default["default"].dNegOne;
        do {
          thirdLetter = thirdLetter.plus(1);
          if (thirdLetter.gt(0)) {
            if (value.gte(Decimal__default["default"].iteratedexp(10, 4, new Decimal__default["default"](this._letters[0].length)))) {
              var uppercaseLetterAddition = value.slog(10, 100, true).sub(Decimal__default["default"].slog(this._letters[0].length, 10, true)).sub(4).floor().plus(1);
              value = uppercaseLetterAddition.gte(9e15) ? Decimal__default["default"].dOne : value.iteratedlog(10, uppercaseLetterAddition.toNumber(), true);
              uppercaseLetter = uppercaseLetter.plus(uppercaseLetterAddition);
            }
            while (value.gte(lowercaseLimit)) {
              uppercaseLetter = uppercaseLetter.plus(1);
              value = value.mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
            }
            uppercaseLetter = uppercaseLetter.plus(value.log(this._letters[0].length));
            if (this._letters[1].length == 1) value = uppercaseLetter;else value = uppercaseLetter.log(this._letters[1].length).plus(1);
            uppercaseLetter = Decimal__default["default"].dZero;
          }
          if (value.gte(Decimal__default["default"].iteratedexp(10, 4, new Decimal__default["default"](this._letters[0].length)))) {
            uppercaseLetter = value.slog(10, 100, true).sub(Decimal__default["default"].slog(this._letters[0].length, 10, true)).sub(4).floor().plus(1);
            value = uppercaseLetter.gte(9e15) ? Decimal__default["default"].dOne : value.iteratedlog(10, uppercaseLetter.toNumber(), true);
          }
          while (value.gte(lowercaseLimit)) {
            uppercaseLetter = uppercaseLetter.plus(1);
            value = value.mul(this._letters[0].length - 1).sub(this._negaLetters[0]).div(this._letters[0].length - this._negaLetters[0] - 1).log(this._letters[0].length).plus(1);
          }
          letter = value;
        } while (uppercaseLetter.gte(uppercaseLimit));
        var resultArray = [];
        var fixedLettersIndices = [this.fixedLetters[0].map(function (value) {
          return value[0];
        }).indexOf(letter.toNumber()), this.fixedLetters[1].map(function (value) {
          return value[0];
        }).indexOf(uppercaseLetter.toNumber()), this.fixedLetters[2].map(function (value) {
          return value[0];
        }).indexOf(thirdLetter.toNumber())];
        if (thirdLetter.toNumber() == 0) resultArray.push("");else if (fixedLettersIndices[2] != -1) resultArray.push(this.fixedLetters[2][fixedLettersIndices[2]][1]);else resultArray.push(BaseConvert(thirdLetter.toNumber(), this._letters[2], 0, 0, this._negaLetters[2], this.commasMin.toNumber(), -1, this.reverseLetters, this.commaSpacing, this.commaChars, undefined, undefined, undefined, this.specialLetters[2], this.concatenation[2]));
        if (uppercaseLetter.toNumber() == 0) resultArray.push("");else if (fixedLettersIndices[1] != -1) resultArray.push(this.fixedLetters[1][fixedLettersIndices[1]][1]);else resultArray.push(BaseConvert(uppercaseLetter.toNumber(), this._letters[1], 0, 0, this._negaLetters[1], this.commasMin.toNumber(), -1, this.reverseLetters, this.commaSpacing, this.commaChars, undefined, undefined, undefined, this.specialLetters[1], this.concatenation[1]));
        if (fixedLettersIndices[0] != -1) resultArray.push(this.fixedLetters[0][fixedLettersIndices[0]][1]);else {
          if (this._fraction) {
            var ab = _construct(AlternateBaseNotation, [this._letters[0], this._negaLetters[0], this.placesAbove1, this.placesBelow1, this.commasMin, Infinity, 0].concat(_arrayWithoutHoles([,,,,]), [this.reverseLetters, this.commaSpacing, this.commaChars, this.decimalChar], _arrayWithoutHoles([,,,,,]), [this.specialLetters[0], this.concatenation[0]]));
            resultArray.push(_construct(FractionNotation, [letter.lt(1) ? this.placesBelow1 : this.placesAbove1, true].concat(_arrayWithoutHoles([,,,,,,,]), [ab])).format(letter));
          } else {
            resultArray.push(BaseConvert(letter.toNumber(), this._letters[0], this.placesAbove1, this.placesBelow1, this._negaLetters[0], this.commasMin.toNumber(), -1, this.reverseLetters, this.commaSpacing, this.commaChars, this.decimalChar, undefined, undefined, this.specialLetters[0], this.concatenation[0]));
          }
        }
        var orderArray = [2];
        orderArray.splice(this.lettersOrder % 2, 0, 1);
        orderArray.splice(Math.floor(this.lettersOrder / 2) % 3, 0, 0);
        var lettersStr = "";
        while (!resultArray[orderArray[0]] && orderArray.length > 0) {
          orderArray.shift();
        }
        while (orderArray.length > 0) {
          lettersStr += resultArray[orderArray[0]];
          var visible = !!resultArray[orderArray[0]];
          orderArray.shift();
          var addAHyperseparator = false;
          for (var o = 0; o < orderArray.length; o++) {
            if (resultArray[orderArray[o]]) addAHyperseparator = true;
          }
          if (orderArray.length != 0 && (this.alwaysHyperseparate || visible && addAHyperseparator)) lettersStr += this.hyperseparator;
        }
        return lettersStr;
      }
    }, {
      key: "letters",
      get: function get() {
        return this._letters;
      },
      set: function set(letters) {
        if (letters[0].length < 2 || letters[1].length < 2) throw new Error("The first two letter sets in Letter Digits Notation must each have at least two letters!");
        if (letters[2].length == 0) throw new Error("Empty letters array in Letter Digits Notation");
        this._letters = letters;
      }
    }, {
      key: "negaLetters",
      get: function get() {
        return this._negaLetters;
      },
      set: function set(negaLetters) {
        if (!Array.isArray(negaLetters)) negaLetters = [negaLetters, negaLetters, negaLetters];
        if (negaLetters[0] == -1) this._fraction = true;
        this._negaLetters = negaLetters;
      }
    }, {
      key: "max_letters",
      get: function get() {
        return this._max_letters;
      },
      set: function set(max_letters) {
        if (max_letters <= 0) throw new RangeError("Nonpositive max letters in Letter Digits notation");
        this._max_letters = max_letters;
      }
    }, {
      key: "fraction",
      get: function get() {
        return this._fraction;
      },
      set: function set(fraction) {
        if (this._negaLetters[0] == -1 && !fraction) throw new Error("Decimal representations aren't allowed in bijective bases, so when negaLetters[0] is 1 in Letter Digits Notation, fraction must be true");
        this._fraction = fraction;
      }
    }]);
  }(Notation);

  /**
   * This function gives a physical description of the Decimal it's given, to get across how large the number is.
   * For reasonably-sized numbers, this function expresses them in terms of how large of a volume you could fill with that many litres of water.
   * Once we get beyond the observable universe, it starts going to 4D versions of galaxies and universes, then 5D, and so on.
   * Then, for numbers where the amount of dimensions gets too large, it switches to considering an endlessly-replicating bacteria colony that doubles every second, and it tells you how long it would take for that exponential growth to reach your number.
   * Once that timespan becomes too long, it switches to considering the amount of possible permutations of the atoms in various objects.
   * Beyond that point, it switches between the atoms and bacteria scenarios, examining permutations, then permutations of the permutations, and so on.
   * Finally, for tetrational numbers, it gives up on representing the number itself and instead considers writing them as a power tower of 10s and how tall that power tower would be.
   *
   * Though this function behaves similarly to a Notation, it is not actually a Notation.
   *
   * @param value ( Decimal ! ) The value to give a description of.
   */
  function physicalScale(value) {
    value = toDecimal(value);
    var negative = false;
    if (value.eq(0)) return "With 0 litres of water, you'll be left thirsty because you have no water.";
    if (value.eq(Decimal__default["default"].dInf) || value.eq(Decimal__default["default"].dNegInf)) return "There is no scale that can accomodate the infinite.";
    if (value.eq(Decimal__default["default"].dNaN)) return "That is not a number, and so it cannot be measured.";
    if (!value.isFinite()) return "There appears to be an error with the input.";
    if (value.lt(0)) {
      negative = true;
      value = value.abs();
    }
    var recip = false;
    if (value.lt(2.82e-42)) {
      recip = true;
      value = value.recip();
    }
    if (negative && !recip) return "(Negative numbers are not supported, so using the absolute value instead): " + physicalScale(value);
    if (!negative && recip) return "(That number is too small, so using its reciprocal instead): " + physicalScale(value);
    if (negative && recip) return "(That number is both negative and too small, so using its negative reciprocal instead): " + physicalScale(value);
    var dn = new DefaultNotation();
    var scaleResult = physicalScaleInternal(value);
    if (scaleResult[0] == 0) {
      var amount = value.div(scaleResult[2]);
      return "With " + dn.format(value) + " litres of water, you could fill " + dn.format(amount) + " " + scaleResult[1] + ".";
    } else if (scaleResult[0] == 1) {
      var dimension = scaleResult[3];
      var _amount = value.div(scaleResult[2].pow(dimension.div(3)));
      return "With " + dn.format(value) + " " + dn.format(dimension) + "D litres of water, you could fill " + dn.format(_amount) + " " + dn.format(dimension) + "D " + scaleResult[1] + ".";
    } else if (scaleResult[0] == 2) {
      var factorials = scaleResult[3];
      var _amount2 = inverse_factorial(value, factorials).div(scaleResult[2]);
      if (factorials == 0) return dn.format(value) + " atoms would be enough to make " + dn.format(_amount2) + " " + scaleResult[1] + ".";else if (factorials == 1) return dn.format(value) + " is the amount of ways to rearrange all of the atoms in " + dn.format(_amount2) + " " + scaleResult[1] + ".";else if (factorials == 2) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(_amount2) + " " + scaleResult[1] + ", then the amount of ways to rearrange that set of rearrangements would be " + dn.format(value) + ".";else if (factorials == 2) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(_amount2) + " " + scaleResult[1] + ", then the amount of ways to rearrange that set of rearrangements would be " + dn.format(value) + ".";else if (factorials == 3) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(_amount2) + " " + scaleResult[1] + ", then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, the size of the final resulting set would be " + dn.format(value) + ".";else if (factorials == 4) return "If you recorded every single way to rearrange all of the atoms in " + dn.format(_amount2) + " " + scaleResult[1] + ", then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step 1 more time, the size of the final resulting set would be " + dn.format(value) + ".";else return "If you recorded every single way to rearrange all of the atoms in " + dn.format(_amount2) + " " + scaleResult[1] + ", then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step " + dn.format(factorials - 3) + " more times, the size of the final resulting set would be " + dn.format(value) + ".";
    } else if (scaleResult[0] == 3) {
      var _factorials = scaleResult[3];
      var _amount3 = inverse_factorial(value, _factorials).log(2).div(scaleResult[2]);
      if (_factorials == 0) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, it would take " + dn.format(_amount3) + " " + scaleResult[1] + " for the colony to reach a population of " + dn.format(value) + ".";else if (_factorials == 1) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(_amount3) + " " + scaleResult[1] + ", the amount of ways to rearrange all of the bacteria in the colony would be " + dn.format(value) + ".";else if (_factorials == 2) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(_amount3) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then the amount of ways to rearrange that set of rearrangements would be " + dn.format(value) + ".";else if (_factorials == 3) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(_amount3) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, the size of the final resulting set would be " + dn.format(value) + ".";else if (_factorials == 4) return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(_amount3) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step 1 more time, the size of the final resulting set would be " + dn.format(value) + ".";else return "If you started with a single bacteria and the bacteria split in two every second, then with unlimited space and resources, if you let it grow for " + dn.format(_amount3) + " " + scaleResult[1] + ", then you recorded every single way to rearrange all of the bacteria in the colony, then recorded every way to rearrange that set of rearrangements, then recorded every way to rearrange THAT set, and repeat that step " + dn.format(_factorials - 3) + " more times, the size of the final resulting set would be " + dn.format(value) + ".";
    } else if (scaleResult[0] == 4 || scaleResult[0] == 5) {
      var nanocosmic = scaleResult[3];
      var _amount4 = value.slog(10, 100, true).div(scaleResult[2]);
      if (nanocosmic == 0) {
        if (scaleResult[0] == 5) return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be " + dn.format(_amount4) + " times as tall as " + scaleResult[1] + ".";else return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be as tall as " + dn.format(_amount4) + " " + scaleResult[1] + ".";
      } else if (nanocosmic == 1) {
        if (scaleResult[0] == 5) return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be " + dn.format(_amount4) + " times as tall as " + scaleResult[1] + " in a larger universe where each proton is as large as our universe.";else return "If " + dn.format(value) + " was written as a power tower of 10s in 12-point font, that tower would be as tall as " + dn.format(_amount4) + " " + scaleResult[1] + " in a larger universe where each proton is as large as our universe.";
      } else if (nanocosmic == 2) {
        if (scaleResult[0] == 5) return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as large as our universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be " + dn.format(_amount4) + " times as tall as " + scaleResult[1] + " in that large universe.";else return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as large as our universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be as tall as " + dn.format(_amount4) + " " + scaleResult[1] + " in that large universe.";
      } else {
        if (scaleResult[0] == 5) return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as another smaller universe, and so on, where our universe is " + dn.format(nanocosmic) + " layers below the largest universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be " + dn.format(_amount4) + " times as tall as " + scaleResult[1] + " in that large universe.";else return "Consider a large universe where each proton is as large as a smaller universe, and each proton in such a smaller universe is itself as another smaller universe, and so on, where our universe is " + dn.format(nanocosmic) + " layers below the largest universe. If " + dn.format(value) + " was written as a power tower of 10s in 12-point font in our universe, that tower would be as tall as " + dn.format(_amount4) + " " + scaleResult[1] + " in that large universe.";
      }
    } else return "There appears to be an error, either in the input or in this function.";
  }
  function physicalScaleInternal(value) {
    if (value.lt(Decimal__default["default"].pow(2, 86400))) {
      /**
       * For reasonably-sized numbers, gives you how much that many litres of water would fill.
       * The main sources used were the Antimatter Dimensions Statistics page ( list of objects found https://antimatter-dimensions.fandom.com/wiki/Statistics ) and the Wikipedia article on Orders of magnitude (volume), https://en.wikipedia.org/wiki/Orders_of_magnitude_(volume). Note that Antimatter Dimensions itself clearly used that Wikipedia article as its own source.
       * The uranium nucleus volume was found by multiplying the volume of a proton by 238 (uranium's atomic weight, i.e. the amount of particles in its nucleus - protons and neutrons have near-idential volumes, so no need to differentiate between them)
       * The diameter of a water molecule seems to be somewhere from 260 to 280 pm according to various sources; 280 pm was used here since it was the figure I saw the most.
       * When I think of a "large" water bottle, I think of a one-litre bottle, and I feel that a water bottle is a good starting point as an amount of water a person can understand.
       * I've seen several sources claim that car fuel tanks hold on average 12-16 US gallons, so I used 14 US gallons here
       * Type C school bus dimensions taken from https://www.measuringknowhow.com/school-bus-dimensions/, using the mean for all three dimensions
       * Apparently the volume of Sydney Harbor is actually used as a unit sometimes
       * Lake Superior may not be the single largest lake in the world, but I think it counts as the most famous-for-its-size lake.
       * Of course I'm going to use the Pacific Ocean, the largest ocean in the world, here.
       * "Small dwarf galaxies" comes from "Estimated volume of a small dwarf galaxy like NGC 1705" on the Wikipedia article, "galaxies" uses the Milky Way, "galaxy groups" uses the Local Group, and "galactic superclusters" uses the Virgo Supercluster
       * Most of the rest agree with Antimatter Dimensions, but with some names changed
       * Beyond the observable universe, moves to 4D, then 5D, etc.
       */
      var objects = ["protons", "uranium nuclei", "hydrogen atoms", "water molecules", "viruses", "red blood cells", "grains of sand", "grains of rice", "teaspoons", "large water bottles", "car fuel tanks", "fridge-freezers", "school buses", "Olympic-sized swimming pools", "Great Pyramids of Giza", "Sydney Harbors", "Lake Superiors", "Pacific Oceans", "Earths", "Jupiters", "Suns", "red giant stars", "hypergiant stars", "nebulas", "Oort clouds", "small dwarf galaxies", "galaxies", "galaxy groups", "galactic superclusters", "observable universes"];
      var volumes = [2.82e-42, 6.7116e-40, 7.23e-27, 2.1952e-26, 5e-18, 9e-14, 6.2e-8, 5e-5, 3.555e-3, 1, 52.995764976, 1000, 67596.84, 2.5e6, 2.6006e9, 5.62e11, 1.2232e16, 6.6988e20, 1.08321e24, 1.4313e27, 1.412e30, 5e35, 8e39, 1.7e48, 1.7e51, 3e58, 3.3e64, 5e71, 3.5e75, 3.4e83].map(toDecimal);
      var index = 0;
      var dimension = new Decimal__default["default"](3);
      var rootedValue = value;
      if (value.gte(Decimal__default["default"].pow(3.3e64, 4 / 3))) {
        index = 26;
        dimension = value.log(3.4e83).mul(3).floor();
        rootedValue = value.root(dimension.div(3));
        var nextRootedValue = value.root(dimension.plus(1).div(3));
        if (dimension.lt(6) && nextRootedValue.gte(5e71) || dimension.lt(9) && nextRootedValue.gte(3.5e75)) {
          dimension = dimension.plus(1);
          rootedValue = nextRootedValue;
        }
      }
      while (index < objects.length - 1 && volumes[index + 1].lte(rootedValue)) index++;
      if (dimension.eq(3)) return [0, objects[index], volumes[index], dimension];else return [1, objects[index], volumes[index], dimension];
    } else if (value.lt(Decimal__default["default"].tetrate(10, 66))) {
      var factorials = factorial_slog(value).sub(factorial_slog(1.00369e14)).floor().max(0).toNumber();
      value = inverse_factorial(value, factorials);
      if (value.lt(Decimal__default["default"].pow(2, 420))) {
        /**
         * How many atoms are in this object? (I chose to use atoms here rather than the previous litres use because rearranging atoms makes more sense than rearranging litres of water)
         * This time the main source is https://en.wikipedia.org/wiki/Orders_of_magnitude_(mass).
         * For organic things like viruses and cells where I could find their mass but not the amount of atoms in them, I'm pretending they're made entirely of carbon and then doubling the amount that would give me (because of hydrogen atoms contributing less mass) - based on the result I got for a human body, this seems like a good rough estimate.
         * "Viruses" uses the human adenovirus since it's medium-sized, "bacteria" uses E.coli, and "cells" uses Wikipedia's estimate of the average human cell mass
         * I saw lots of different estimates for the amount of atoms in a grain of sand, so I used the grains of sand used by Antimatter Dimensions for volume and then turned that volume into an amount of atoms using sand's density (from https://www.aqua-calc.com/page/density-table/substance/sand-coma-and-blank-dry) and chemical composition (mostly silicon dioxide).
         * For pennies, I used the actual 95% zinc and 5% copper proportions, so that one should be pretty accurate
         * I think most of the material in a baseball is the wool, so I'm going with the carbon estimate again
         * Assuming a mass of 3,200 kg for the elephant - Wikipedia lists between 2,700 and 6,300, but other websites indicate that only the males go above the low end of that range.
         * https://www.britannica.com/animal/blue-whale says that blue whales average 150 (metric) tons
         * The asteroid here is 433 Eros (https://en.wikipedia.org/wiki/433_Eros), which I believe is the asteroid Antimatter Dimensions is comparing to. I'm assuming silicon dioxide for the composition here.
         * Earth's atmosphere is used for the atmosphere example
         * For anything beyond Earth here (Jupiter and upwards), it's assumed that 75% of the mass is hydrogen and 25% of the mass is helium
         * The Milky Way is the galaxy used, and the Laniakea Supercluster is the large galactic supercluster used.
         * After the observable universe, we switch back to the final few volume objects, jam-packing that amount of space with hydrogen atoms.
         */
        var _objects = ["atoms", "viruses", "bacteria", "cells", "grains of sand", "pennies", "baseballs", "human bodies", "elephants", "blue whales", "Great Pyramids of Giza", "large asteroids", "atmospheres", "Earths", "Jupiters", "Suns", "star clusters", "galaxies", "large galactic superclusters", "observable universes", "completely filled galaxies", "completely filled galaxy groups", "completely filled galactic superclusters", "completely filled observable universes"];
        var atoms = [1, 2.51e7, 1.00369e11, 1.00369e14, 3.0408e18, 2.306e22, 1.46036e25, 7.02583e27, 3.2118e29, 1.5055e31, 6.02215e35, 4.0216e41, 2.1205e44, 1.33e50, 6.5074e53, 6.81697e56, 3.428e61, 7.8395e68, 6.817e73, 1e80, 4.564e90, 6.916e97, 4.841e101, 4.703e109].map(toDecimal);
        var _index = 0;
        while (_index < _objects.length - 1 && atoms[_index + 1].lte(value)) _index++;
        return [2, _objects[_index], atoms[_index], factorials];
      } else {
        /**
         * How long would a bacteria colony that doubles in size every second take to reach a population this large?
         */
        var units = ["seconds", "minutes", "hours", "days", "weeks", "years", "decades", "centuries", "millennia", "galactic years", "Sun lifespans", "red dwarf lifespans", "bismuth-209 half-lives"];
        var seconds = [1, 60, 3600, 86400, 604800, 31536000, 315360000, 3153600000, 31536000000, 7.0956e15, 3.1536e17, 3.1536e20, 6.338736e26].map(toDecimal);
        var time = value.log(2);
        var _index2 = 0;
        while (_index2 < units.length - 1 && seconds[_index2 + 1].lte(time)) _index2++;
        return [3, units[_index2], seconds[_index2], factorials];
      }
    } else {
      /**
       * If the number was written as a power tower of 10s in 12-point font, how tall would the tower be?
       * https://en.wikipedia.org/wiki/Orders_of_magnitude_(length) was used as the source for this one.
       * 12-point font has each character be 1/6 inches tall.
       * Letter paper, which is 11 inches tall, is used for the piece of paper
       * "Adult human" takes the female average and the male average and averages them together
       * The Milky Way is used for "galaxies", and the Virgo Supercluster is used for "galactic superclusters".
       */
      var nanocosmic = 0;
      var length = value.slog(10, 100, true);
      while (length.gte(2.5128216e34)) {
        nanocosmic++;
        length = length.mul(1.12805703456e-42);
      }
      var _objects2 = ["hydrogen atoms", "wavelengths of green light", "grains of sand", "pieces of paper", "adult humans", "American football fields", "Burj Khalifas", "Mount Everests", "the altitude of the International Space Station", "Earths", "the distance from the Earth to the Moon", "the distance from the Earth to the Sun", "the distance from the Sun to Neptune", "the distance from the Sun to Proxima Centauri", "galaxies", "galactic superclusters", "observable universes"];
      var heights = [5.6692908e-8, 0.000125787444, 0.11811024, 66, 399.21258, 21600, 32598.43, 2090281.8, 9.8622e7, 3.009921e9, 9.094488e10, 3.533808e13, 1.0626162e15, 9.430902e18, 1.95348e23, 1.1621016e25, 4.4919702e26, 2.094018e29].map(toDecimal);
      var types = [4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 5, 5, 5, 5, 4, 4, 4];
      var _index3 = 0;
      while (_index3 < _objects2.length - 1 && heights[_index3 + 1].lte(length)) _index3++;
      return [types[_index3], _objects2[_index3], heights[_index3].div(Decimal__default["default"].pow(1.12805703456e-42, nanocosmic)), nanocosmic];
    }
  }

  /** This object is where all of the notation presets are stored. Use Presets when outputting to plain text. */
  var Presets = {};
  /** This object is where all of the notation presets are stored. Use HTMLPresets when outputting to innerHTML. */
  var HTMLPresets = {};
  function recipBelow(notation, minnum) {
    var recipStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ["1 / ", ""];
    var zeroStr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return new ConditionalNotation(false, [new PredeterminedNotation(zeroStr ? zeroStr : "0"), function (value) {
      return value.eq(0) && zeroStr !== null;
    }],
    // That ternary operator isn't actually needed here, but TypeScript demands it because it doesn't know there's a check to eliminate the null case
    [new AppliedFunctionNotation(function (value) {
      return value.recip();
    }, notation, function (str) {
      return recipStr[0] + str + recipStr[1];
    }), function (value) {
      return value.lt(minnum) && value.neq(0);
    }], [notation, function (value) {
      return true;
    }]);
  }
  function zeroString(notation, zeroStr) {
    return new ConditionalNotation(false, [new PredeterminedNotation(zeroStr), function (value) {
      return value.eq(0);
    }],
    // That ternary operator isn't actually needed here, but TypeScript demands it because it doesn't know there's a check to eliminate the null case
    [notation, function (value) {
      return true;
    }]);
  }
  function defaultRound(value) {
    if (value.eq(0)) return new Decimal__default["default"](0);
    return value.abs().log10().floor().sub(3).pow_base(10).min(1);
  }
  function alphabetRound(value) {
    if (value.eq(0)) return new Decimal__default["default"](0);
    return value.abs().log10().floor().sub(2).pow_base(10).min(1);
  }
  Presets.Default = new DefaultNotation().setName("Default");
  HTMLPresets.Default = new DefaultNotation().setName("Default");
  Presets.Scientific = _construct(ScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Scientific");
  Presets.Engineering = _construct(ScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound, 3])).setName("Engineering");
  Presets.Logarithm = _construct(MultiLogarithmNotation, _arrayWithoutHoles([,,,,,,,,,,,]).concat([new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Logarithm");
  Presets.Hyperscientific = _construct(HyperscientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Hyperscientific");
  Presets.SuperLogarithm = recipBelow(_construct(MultiSuperLogarithmNotation, _arrayWithoutHoles([,,,,,,,,,,,,]).concat([new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])), 1, undefined, "0").setName("Super Logarithm");
  Presets.PowerTower = recipBelow(new MultiLogarithmNotation(1e10, -1, 0, 10, 1, false, [["", ""], ["", ""], [" PT ", ""]], null, true), 1e-10).setName("Power Tower"); //Objectively this should be made with Hyperscientific, but I found it easier to do it this way
  Presets.PentaScientific = recipBelow(new HypersplitNotation([["", ""], ["", ""], ["", ""], ["G", ""]], 10, [10, 1, 1], [1, -1, -1, 1], 23), 1, undefined, "0").setName("Penta-Scientific");
  Presets.PentaLogarithm = recipBelow(_construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["G", ""]], 10, [0, 1, 1], [-1, -1, -1, 1], 23].concat(_arrayWithoutHoles([,,,]), [new DefaultNotation(-6, 5, 0, 1e12, 0)])), 1, undefined, "0").setName("Penta-Logarithm");
  Presets.NaturalLogarithm = _construct(MultiLogarithmNotation, _arrayWithoutHoles([,,,]).concat([Math.E, undefined, true, [["e^", ""], ["e^", ""], ["((e^)^", ")"]]], _arrayWithoutHoles([,,,,]), [new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Natural Logarithm");
  Presets.NaturalSuperLogarithm = recipBelow(_construct(MultiSuperLogarithmNotation, _arrayWithoutHoles([,,,]).concat([Math.E, undefined, [["e↑↑", ""], ["e↑↑", ""], ["(e↑↑^", ")"]]], _arrayWithoutHoles([,,,,,,]), [new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])), 1, undefined, "0").setName("Natural Super Logarithm");
  Presets.NaturalPentaLogarithm = recipBelow(_construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["e↑↑↑", ""]], Math.E, [0, 1, 1], [-1, -1, -1, 1], 23].concat(_arrayWithoutHoles([,,,]), [new DefaultNotation(-6, 5, 0, 1e12, 0)])), 1, undefined, "0").setName("Natural Penta-Logarithm");
  Presets.LogarithmBase = function (base) {
    return _construct(MultiLogarithmNotation, _arrayWithoutHoles([,,,]).concat([base, undefined, true, [["↑", ""], ["↑", ""], ["(↑^", ")"]], null, false, 1, 1, new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Logarithm (base " + new DefaultNotation().format(base) + ")");
  };
  Presets.SuperLogarithmBase = function (base) {
    return recipBelow(_construct(MultiSuperLogarithmNotation, _arrayWithoutHoles([,,,]).concat([base, undefined, [["↑↑", ""], ["↑↑", ""], ["(↑↑^", ")"]], null, false, 1], _arrayWithoutHoles([,,,]), [new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])), 1, undefined, "0").setName("Super Logarithm (base " + new DefaultNotation().format(base) + ")");
  };
  Presets.PentaLogarithmBase = function (base) {
    return recipBelow(new AppliedFunctionNotation(function (value) {
      return value;
    }, _construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["↑↑↑", ""]], base, [0, 1, 1], [-1, -1, -1, 1], 23].concat(_arrayWithoutHoles([,,,]), [new DefaultNotation(-6, 5, 0, 1e12, 0)])), function (str) {
      return new DefaultNotation().format(base) + str;
    }), 1, undefined, "0").setName("Penta-Logarithm (base " + new DefaultNotation().format(base) + ")");
  };
  Presets.DoubleLogarithm = _construct(MultiLogarithmNotation, [undefined, undefined, 2, undefined, 2].concat(_arrayWithoutHoles([,,,,,,]), [new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Double Logarithm");
  HTMLPresets.Scientific = _construct(ScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Scientific");
  HTMLPresets.Engineering = _construct(ScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound, 3])).setName("Engineering");
  HTMLPresets.Logarithm = _construct(MultiLogarithmNotation, _arrayWithoutHoles([,,,,,,,,,,,]).concat([new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Logarithm");
  HTMLPresets.Hyperscientific = _construct(HyperscientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Hyperscientific");
  HTMLPresets.SuperLogarithm = recipBelow(_construct(MultiSuperLogarithmNotation, _arrayWithoutHoles([,,,,,,,,,,,,]).concat([new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])), 1, undefined, "0").setName("Super Logarithm");
  HTMLPresets.PowerTower = recipBelow(new MultiLogarithmNotation(1e10, -1, 0, 10, 1, false, [["", ""], ["", ""], [" PT ", ""]], null, true), 1e-10).setName("Power Tower"); //Objectively this should be made with Hyperscientific, but I found it easier to do it this way
  HTMLPresets.PentaScientific = recipBelow(new HypersplitNotation([["", ""], ["", ""], ["", ""], ["G", ""]], 10, [10, 1, 1], [1, -1, -1, 1], 23), 1, undefined, "0").setName("Penta-Scientific");
  HTMLPresets.PentaLogarithm = recipBelow(_construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["G", ""]], 10, [0, 1, 1], [-1, -1, -1, 1], 23].concat(_arrayWithoutHoles([,,,]), [new DefaultNotation(-6, 5, 0, 1e12, 0)])), 1, undefined, "0").setName("Penta-Logarithm");
  HTMLPresets.NaturalLogarithm = _construct(MultiLogarithmNotation, _arrayWithoutHoles([,,,]).concat([Math.E, undefined, true, [["e^", ""], ["e^", ""], ["((e^)^", ")"]]], _arrayWithoutHoles([,,,,]), [new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Natural Logarithm");
  HTMLPresets.NaturalSuperLogarithm = recipBelow(_construct(MultiSuperLogarithmNotation, _arrayWithoutHoles([,,,]).concat([Math.E, undefined, [["e&#8593;&#8593;", ""], ["e&#8593;&#8593;", ""], ["(e&#8593;&#8593;^", ")"]]], _arrayWithoutHoles([,,,,,,]), [new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])), 1, undefined, "0").setName("Natural Super Logarithm");
  HTMLPresets.NaturalPentaLogarithm = recipBelow(_construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["e↑↑↑", ""]], Math.E, [0, 1, 1], [-1, -1, -1, 1], 23].concat(_arrayWithoutHoles([,,,]), [new DefaultNotation(-6, 5, 0, 1e12, 0)])), 1, undefined, "0").setName("Natural Penta-Logarithm");
  HTMLPresets.LogarithmBase = function (base) {
    return _construct(MultiLogarithmNotation, _arrayWithoutHoles([,,,]).concat([base, undefined, true, [["&#8593;", ""], ["&#8593;", ""], ["(&#8593;^", ")"]], null, false, 1, 1, new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Logarithm (base " + new DefaultNotation().format(base) + ")");
  };
  HTMLPresets.SuperLogarithmBase = function (base) {
    return recipBelow(_construct(MultiSuperLogarithmNotation, _arrayWithoutHoles([,,,]).concat([base, undefined, [["&#8593;&#8593;", ""], ["&#8593;&#8593;", ""], ["(&#8593;&#8593;^", ")"]], null, false, 1], _arrayWithoutHoles([,,,]), [new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])), 1, undefined, "0").setName("Super Logarithm (base " + new DefaultNotation().format(base) + ")");
  };
  HTMLPresets.PentaLogarithmBase = function (base) {
    return recipBelow(new AppliedFunctionNotation(function (value) {
      return value;
    }, _construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["&#8593;&#8593;&#8593;", ""]], base, [0, 1, 1], [-1, -1, -1, 1], 23].concat(_arrayWithoutHoles([,,,]), [new DefaultNotation(-6, 5, 0, 1e12, 0)])), function (str) {
      return new DefaultNotation().format(base) + str;
    }), 1, undefined, "0").setName("Penta-Logarithm (base " + new DefaultNotation().format(base) + ")");
  };
  HTMLPresets.DoubleLogarithm = _construct(MultiLogarithmNotation, [undefined, undefined, 2, undefined, 2].concat(_arrayWithoutHoles([,,,,,,]), [new DefaultNotation(-4, 3, 0, 1e12, 0), new DefaultNotation(), new DefaultNotation()])).setName("Double Logarithm");
  Presets.AlternateBase = function (base) {
    return new AlternateBaseNotation(base).setName("Base " + new DefaultNotation().format(base));
  };
  Presets.Binary = _construct(AlternateBaseNotation, [2, 0, -8, -8, 0, 65536, 1 / 256].concat(_arrayWithoutHoles([,,,,,]), [4], _arrayWithoutHoles([,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Binary");
  Presets.Ternary = _construct(AlternateBaseNotation, [3, 0, -7, -7].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Ternary");
  Presets.Quaternary = _construct(AlternateBaseNotation, [4, 0, -6, -6].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Quaternary");
  Presets.Seximal = _construct(AlternateBaseNotation, [6, 0, -5, -5].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Seximal");
  Presets.Octal = _construct(AlternateBaseNotation, [8].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Octal");
  Presets.Duodecimal = _construct(AlternateBaseNotation, [12].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Duodecimal");
  Presets.DozenalXE = _construct(AlternateBaseNotation, [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "E"]].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Dozenal (X, E)");
  Presets.Dozenal23 = _construct(AlternateBaseNotation, [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "↊", "↋"]].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Dozenal (↊, ↋)");
  Presets.Hexadecimal = _construct(AlternateBaseNotation, [16].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Hexadecimal");
  Presets.BalancedTernary = _construct(AlternateBaseNotation, [["-", "0", "+"], 1, -7, -7].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Balanced Ternary");
  Presets.BijectiveDecimal = recipBelow(_construct(AlternateBaseNotation, [["1", "2", "3", "4", "5", "6", "7", "8", "9", "A"], -1, 0, 0].concat(_arrayWithoutHoles([,,,,]), [3, 1], _arrayWithoutHoles([,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])), 1).setName("Bijective Decimal");
  HTMLPresets.AlternateBase = function (base) {
    return new AlternateBaseNotation(base).setName("Base " + new DefaultNotation().format(base));
  };
  HTMLPresets.Binary = _construct(AlternateBaseNotation, [2, 0, -8, -8, 0, 65536, 1 / 256].concat(_arrayWithoutHoles([,,,,,]), [4], _arrayWithoutHoles([,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Binary");
  HTMLPresets.Ternary = _construct(AlternateBaseNotation, [3, 0, -7, -7].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Ternary");
  HTMLPresets.Quaternary = _construct(AlternateBaseNotation, [4, 0, -6, -6].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Quaternary");
  HTMLPresets.Seximal = _construct(AlternateBaseNotation, [6, 0, -5, -5].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Seximal");
  HTMLPresets.Octal = _construct(AlternateBaseNotation, [8].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Octal");
  HTMLPresets.Duodecimal = _construct(AlternateBaseNotation, [12].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Duodecimal");
  HTMLPresets.DozenalXE = _construct(AlternateBaseNotation, [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "X", "E"]].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Dozenal (X, E)");
  HTMLPresets.Dozenal23 = _construct(AlternateBaseNotation, [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "&#x218A;", "&#x218B;"]].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Dozenal (↊, ↋)");
  HTMLPresets.Hexadecimal = _construct(AlternateBaseNotation, [16].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])).setName("Hexadecimal");
  HTMLPresets.BalancedTernary = _construct(AlternateBaseNotation, [["-", "0", "+"], 1, -7, -7].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [[["e", ""], ["e", ""], ["F", ""], ["F", ""]]])).setName("Balanced Ternary");
  HTMLPresets.BijectiveDecimal = recipBelow(_construct(AlternateBaseNotation, [["1", "2", "3", "4", "5", "6", "7", "8", "9", "A"], -1, 0, 0].concat(_arrayWithoutHoles([,,,,]), [3, 1], _arrayWithoutHoles([,,,,,]), [[["e", ""], ["e", ""], ["#", ""], ["#", ""]]])), 1).setName("Bijective Decimal");
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
  Presets.MixedScientific = _construct(ScientificNotation, [1e66].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(0, false, defaultRound), function (value) {
    return value.lt(1e66);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Mixed Scientific");
  Presets.MixedScientificLongScale = _construct(ScientificNotation, [1e126].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(0, true, defaultRound), function (value) {
    return value.lt(1e126);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Mixed Scientific (Long Scale)");
  Presets.ADMixedScientific = _construct(ScientificNotation, [1e33].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(1, false, defaultRound), function (value) {
    return value.lt(1e33);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("AD Mixed Scientific");
  Presets.ADMixedScientificLongScale = _construct(ScientificNotation, [1e60].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(1, true, defaultRound), function (value) {
    return value.lt(1e60);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("AD Mixed Scientific (Long Scale)");
  Presets.AarexMixedScientific = _construct(ScientificNotation, [1e36].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(2, false, defaultRound), function (value) {
    return value.lt(1e36);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Aarex Mixed Scientific");
  Presets.AarexMixedScientificLongScale = _construct(ScientificNotation, [1e66].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(2, true, defaultRound), function (value) {
    return value.lt(1e66);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Aarex Mixed Scientific (Long Scale)");
  HTMLPresets.MixedScientific = _construct(ScientificNotation, [1e66].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(0, false, defaultRound), function (value) {
    return value.lt(1e66);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Mixed Scientific");
  HTMLPresets.MixedScientificLongScale = _construct(ScientificNotation, [1e126].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(0, true, defaultRound), function (value) {
    return value.lt(1e126);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Mixed Scientific (Long Scale)");
  HTMLPresets.ADMixedScientific = _construct(ScientificNotation, [1e33].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(1, false, defaultRound), function (value) {
    return value.lt(1e33);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("AD Mixed Scientific");
  HTMLPresets.ADMixedScientificLongScale = _construct(ScientificNotation, [1e60].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(1, true, defaultRound), function (value) {
    return value.lt(1e60);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("AD Mixed Scientific (Long Scale)");
  HTMLPresets.AarexMixedScientific = _construct(ScientificNotation, [1e36].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(2, false, defaultRound), function (value) {
    return value.lt(1e36);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Aarex Mixed Scientific");
  HTMLPresets.AarexMixedScientificLongScale = _construct(ScientificNotation, [1e66].concat(_arrayWithoutHoles([,,,,]), [true], _arrayWithoutHoles([,,,,,,]), [new ConditionalNotation(false, [new StandardNotation(2, true, defaultRound), function (value) {
    return value.lt(1e66);
  }], [new ScientificNotation(), function (value) {
    return true;
  }])])).setName("Aarex Mixed Scientific (Long Scale)");
  Presets.Letters = _construct(LettersNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Letters");
  Presets.Alphabet = new LettersNotation([["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true).setName("Alphabet");
  Presets.GreekLetters = new LettersNotation([["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"], ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"], ["Ϝ"]], -1, defaultRound).setName("Greek Letters");
  Presets.GreekAlphabet = new LettersNotation([["ϙ", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"], ["ϙ", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"], ["ϙ", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"]], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true).setName("Greek Alphabet");
  Presets.ADGreekLetters = new LettersNotation([["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"], ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"], ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"]], -1, defaultRound, 1000, 9, "", "", "|", true, new DefaultNotation(), 0, false, true).setName("AD Greek Letters");
  Presets.Emoji = new LettersNotation([["😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡"], ["🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"], ["𓁨"]], -1, defaultRound).setName("Emoji");
  Presets.EmojiAlphabet = new LettersNotation([["🚫", "😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡", "🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"], ["🚫", "😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡", "🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"], ["🚫", "😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡", "🚨", "🅱️", "🍒", "😈", "💥", "👠", "🔫", "🏥", "👀", "🤹", "😵", "❤️", "🔢", "🌑", "🍩", "💍", "🗨️", "®", "💰", "🏆", "🦄", "🌋", "🤷", "✂️", "🟡", "💤"]], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true).setName("Emoji Alphabet");
  Presets.XYZ = new LettersNotation([["X"], ["Y"], ["Z"]], 0, defaultRound, 10, 9, "", "", "", false, new DefaultNotation(), 5).setName("XYZ");
  Presets.ElementLetters = new LettersNotation([["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Eb", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"], ["H\u0305", "H\u0305e\u0305", "L\u0305i\u0305", "B\u0305e\u0305", "B\u0305", "C\u0305", "N\u0305", "O\u0305", "F\u0305", "N\u0305e\u0305", "N\u0305a\u0305", "M\u0305g\u0305", "A\u0305l\u0305", "S\u0305i\u0305", "P\u0305", "S\u0305", "C\u0305l\u0305", "A\u0305r\u0305", "K\u0305", "C\u0305a\u0305", "S\u0305c\u0305", "T\u0305i\u0305", "V\u0305", "C\u0305r\u0305", "M\u0305n\u0305", "F\u0305e\u0305", "C\u0305o\u0305", "N\u0305i\u0305", "C\u0305u\u0305", "Z\u0305n\u0305", "G\u0305a\u0305", "G\u0305e\u0305", "A\u0305s\u0305", "S\u0305e\u0305", "B\u0305r\u0305", "K\u0305r\u0305", "R\u0305b\u0305", "S\u0305r\u0305", "Y\u0305", "Z\u0305r\u0305", "N\u0305b\u0305", "M\u0305o\u0305", "T\u0305c\u0305", "R\u0305u\u0305", "R\u0305h\u0305", "P\u0305d\u0305", "A\u0305g\u0305", "C\u0305d\u0305", "I\u0305n\u0305", "S\u0305n\u0305", "S\u0305b\u0305", "T\u0305e\u0305", "I\u0305", "X\u0305e\u0305", "C\u0305s\u0305", "B\u0305a\u0305", "L\u0305a\u0305", "C\u0305e\u0305", "P\u0305r\u0305", "N\u0305d\u0305", "P\u0305m\u0305", "S\u0305m\u0305", "E\u0305u\u0305", "G\u0305d\u0305", "T\u0305b\u0305", "D\u0305y\u0305", "H\u0305o\u0305", "E\u0305b\u0305", "T\u0305m\u0305", "Y\u0305b\u0305", "L\u0305u\u0305", "H\u0305f\u0305", "T\u0305a\u0305", "W\u0305", "R\u0305e\u0305", "O\u0305s\u0305", "I\u0305r\u0305", "P\u0305t\u0305", "A\u0305u\u0305", "H\u0305g\u0305", "T\u0305l\u0305", "P\u0305b\u0305", "B\u0305i\u0305", "P\u0305o\u0305", "A\u0305t\u0305", "R\u0305n\u0305", "F\u0305r\u0305", "R\u0305a\u0305", "A\u0305c\u0305", "T\u0305h\u0305", "P\u0305a\u0305", "U\u0305", "N\u0305p\u0305", "P\u0305u\u0305", "A\u0305m\u0305", "C\u0305m\u0305", "B\u0305k\u0305", "C\u0305f\u0305", "E\u0305s\u0305", "F\u0305m\u0305", "M\u0305d\u0305", "N\u0305o\u0305", "L\u0305r\u0305", "R\u0305f\u0305", "D\u0305b\u0305", "S\u0305g\u0305", "B\u0305h\u0305", "H\u0305s\u0305", "M\u0305t\u0305", "D\u0305s\u0305", "R\u0305g\u0305", "C\u0305n\u0305", "N\u0305h\u0305", "F\u0305l\u0305", "M\u0305c\u0305", "L\u0305v\u0305", "T\u0305s\u0305", "O\u0305g\u0305"], ["☢"]], -1, defaultRound, 118, 12, " ", "", "", false, undefined, 5, undefined, undefined, ["", "-"], undefined, undefined, [[true, "[", "]", new DefaultNotation()], [true, "[", "]", new DefaultNotation()], null]).setName("Element Letters");
  HTMLPresets.Letters = _construct(LettersNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Letters");
  HTMLPresets.Alphabet = new LettersNotation([["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true).setName("Alphabet");
  HTMLPresets.GreekLetters = new LettersNotation([["&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;"], ["&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"], ["&#x3DC;"]], -1, defaultRound).setName("Greek Letters");
  HTMLPresets.GreekAlphabet = new LettersNotation([["&#x3D9;", "&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;", "&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"], ["&#x3D9;", "&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;", "&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"], ["&#x3D9;", "&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;", "&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"]], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true).setName("Greek Alphabet");
  HTMLPresets.ADGreekLetters = new LettersNotation([["&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;", "&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"], ["&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;", "&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"], ["&#x3B1;", "&#x3B2;", "&#x3B3;", "&#x3B4;", "&#x3B5;", "&#x3B6;", "&#x3B7;", "&#x3B8;", "&#x3B9;", "&#x3BA;", "&#x3BB;", "&#x3BC;", "&#x3BD;", "&#x3BE;", "&#x3BF;", "&#x3C0;", "&#x3C1;", "&#x3C3;", "&#x3C4;", "&#x3C5;", "&#x3C6;", "&#x3C7;", "&#x3C8;", "&#x3C9;", "&#x391;", "&#x392;", "&#x393;", "&#x394;", "&#x395;", "&#x396;", "&#x397;", "&#x398;", "&#x399;", "&#x39A;", "&#x39B;", "&#x39C;", "&#x39D;", "&#x39E;", "&#x39F;", "&#x3A0;", "&#x3A1;", "&#x3A3;", "&#x3A4;", "&#x3A5;", "&#x3A6;", "&#x3A7;", "&#x3A8;", "&#x3A9;"]], -1, defaultRound, 1000, 9, "", "", "|", true, new DefaultNotation(), 0, false, true).setName("AD Greek Letters");
  HTMLPresets.Emoji = new LettersNotation([["&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;"], ["&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"], ["&#x13068;"]], -1, defaultRound).setName("Emoji");
  HTMLPresets.EmojiAlphabet = new LettersNotation([["&#x1F6AB;", "&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;", "&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"], ["&#x1F6AB;", "&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;", "&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"], ["&#x1F6AB;", "&#x1F620;", "&#x1F382;", "&#x1F384;", "&#x1F480;", "&#x1F346;", "&#x1F46A;", "&#x1F308;", "&#x1F4AF;", "&#x1F366;", "&#x1F383;", "&#x1F48B;", "&#x1F602;", "&#x1F319;", "&#x26D4;", "&#x1F419;", "&#x1F4A9;", "&#x2753;", "&#x2622;", "&#x1F648;", "&#x1F44D;", "&#x2602;", "&#x270C;", "&#x26A0;", "&#x274C;", "&#x1F60B;", "&#x26A1;", "&#x1F6A8;", "&#x1F171;&#xFE0F;", "&#x1F352;", "&#x1F608;", "&#x1F4A5;", "&#x1F460;", "&#x1F52B;", "&#x1F3E5;", "&#x1F440;", "&#x1F939;", "&#x1F635;", "&#x2764;&#xFE0F;", "&#x1F522;", "&#x1F311;", "&#x1F369;", "&#x1F48D;", "&#x1F5E8;&#xFE0F;", "&#xAE;", "&#x1F4B0;", "&#x1F3C6;", "&#x1F984;", "&#x1F30B;", "&#x1F937;", "&#x2702;&#xFE0F;", "&#x1F7E1;", "&#x1F4A4;"]], 0, alphabetRound, 1000, 9, "", "", "|", true, new DefaultNotation(-3, -3), 0, false, true).setName("Emoji Alphabet");
  HTMLPresets.XYZ = new LettersNotation([["X"], ["Y"], ["Z"]], 0, defaultRound, 10, 9, "", "", "", false, new DefaultNotation(), 5).setName("XYZ");
  HTMLPresets.ElementLetters = new LettersNotation([["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Eb", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"], ["<span style='text-decoration: overline'>H</span>", "<span style='text-decoration: overline'>He</span>", "<span style='text-decoration: overline'>Li</span>", "<span style='text-decoration: overline'>Be</span>", "<span style='text-decoration: overline'>B</span>", "<span style='text-decoration: overline'>C</span>", "<span style='text-decoration: overline'>N</span>", "<span style='text-decoration: overline'>O</span>", "<span style='text-decoration: overline'>F</span>", "<span style='text-decoration: overline'>Ne</span>", "<span style='text-decoration: overline'>Na</span>", "<span style='text-decoration: overline'>Mg</span>", "<span style='text-decoration: overline'>Al</span>", "<span style='text-decoration: overline'>Si</span>", "<span style='text-decoration: overline'>P</span>", "<span style='text-decoration: overline'>S</span>", "<span style='text-decoration: overline'>Cl</span>", "<span style='text-decoration: overline'>Ar</span>", "<span style='text-decoration: overline'>K</span>", "<span style='text-decoration: overline'>Ca</span>", "<span style='text-decoration: overline'>Sc</span>", "<span style='text-decoration: overline'>Ti</span>", "<span style='text-decoration: overline'>V</span>", "<span style='text-decoration: overline'>Cr</span>", "<span style='text-decoration: overline'>Mn</span>", "<span style='text-decoration: overline'>Fe</span>", "<span style='text-decoration: overline'>Co</span>", "<span style='text-decoration: overline'>Ni</span>", "<span style='text-decoration: overline'>Cu</span>", "<span style='text-decoration: overline'>Zn</span>", "<span style='text-decoration: overline'>Ga</span>", "<span style='text-decoration: overline'>Ge</span>", "<span style='text-decoration: overline'>As</span>", "<span style='text-decoration: overline'>Se</span>", "<span style='text-decoration: overline'>Br</span>", "<span style='text-decoration: overline'>Kr</span>", "<span style='text-decoration: overline'>Rb</span>", "<span style='text-decoration: overline'>Sr</span>", "<span style='text-decoration: overline'>Y</span>", "<span style='text-decoration: overline'>Zr</span>", "<span style='text-decoration: overline'>Nb</span>", "<span style='text-decoration: overline'>Mo</span>", "<span style='text-decoration: overline'>Tc</span>", "<span style='text-decoration: overline'>Ru</span>", "<span style='text-decoration: overline'>Rh</span>", "<span style='text-decoration: overline'>Pd</span>", "<span style='text-decoration: overline'>Ag</span>", "<span style='text-decoration: overline'>Cd</span>", "<span style='text-decoration: overline'>In</span>", "<span style='text-decoration: overline'>Sn</span>", "<span style='text-decoration: overline'>Sb</span>", "<span style='text-decoration: overline'>Te</span>", "<span style='text-decoration: overline'>I</span>", "<span style='text-decoration: overline'>Xe</span>", "<span style='text-decoration: overline'>Cs</span>", "<span style='text-decoration: overline'>Ba</span>", "<span style='text-decoration: overline'>La</span>", "<span style='text-decoration: overline'>Ce</span>", "<span style='text-decoration: overline'>Pr</span>", "<span style='text-decoration: overline'>Nd</span>", "<span style='text-decoration: overline'>Pm</span>", "<span style='text-decoration: overline'>Sm</span>", "<span style='text-decoration: overline'>Eu</span>", "<span style='text-decoration: overline'>Gd</span>", "<span style='text-decoration: overline'>Tb</span>", "<span style='text-decoration: overline'>Dy</span>", "<span style='text-decoration: overline'>Ho</span>", "<span style='text-decoration: overline'>Eb</span>", "<span style='text-decoration: overline'>Tm</span>", "<span style='text-decoration: overline'>Yb</span>", "<span style='text-decoration: overline'>Lu</span>", "<span style='text-decoration: overline'>Hf</span>", "<span style='text-decoration: overline'>Ta</span>", "<span style='text-decoration: overline'>W</span>", "<span style='text-decoration: overline'>Re</span>", "<span style='text-decoration: overline'>Os</span>", "<span style='text-decoration: overline'>Ir</span>", "<span style='text-decoration: overline'>Pt</span>", "<span style='text-decoration: overline'>Au</span>", "<span style='text-decoration: overline'>Hg</span>", "<span style='text-decoration: overline'>Tl</span>", "<span style='text-decoration: overline'>Pb</span>", "<span style='text-decoration: overline'>Bi</span>", "<span style='text-decoration: overline'>Po</span>", "<span style='text-decoration: overline'>At</span>", "<span style='text-decoration: overline'>Rn</span>", "<span style='text-decoration: overline'>Fr</span>", "<span style='text-decoration: overline'>Ra</span>", "<span style='text-decoration: overline'>Ac</span>", "<span style='text-decoration: overline'>Th</span>", "<span style='text-decoration: overline'>Pa</span>", "<span style='text-decoration: overline'>U</span>", "<span style='text-decoration: overline'>Np</span>", "<span style='text-decoration: overline'>Pu</span>", "<span style='text-decoration: overline'>Am</span>", "<span style='text-decoration: overline'>Cm</span>", "<span style='text-decoration: overline'>Bk</span>", "<span style='text-decoration: overline'>Cf</span>", "<span style='text-decoration: overline'>Es</span>", "<span style='text-decoration: overline'>Fm</span>", "<span style='text-decoration: overline'>Md</span>", "<span style='text-decoration: overline'>No</span>", "<span style='text-decoration: overline'>Lr</span>", "<span style='text-decoration: overline'>Rf</span>", "<span style='text-decoration: overline'>Db</span>", "<span style='text-decoration: overline'>Sg</span>", "<span style='text-decoration: overline'>Bh</span>", "<span style='text-decoration: overline'>Hs</span>", "<span style='text-decoration: overline'>Mt</span>", "<span style='text-decoration: overline'>Ds</span>", "<span style='text-decoration: overline'>Rg</span>", "<span style='text-decoration: overline'>Cn</span>", "<span style='text-decoration: overline'>Nh</span>", "<span style='text-decoration: overline'>Fl</span>", "<span style='text-decoration: overline'>Mc</span>", "<span style='text-decoration: overline'>Lv</span>", "<span style='text-decoration: overline'>Ts</span>", "<span style='text-decoration: overline'>Og</span>"], ["&#x2622;"]], -1, defaultRound, 118, 12, " ", "", "", false, undefined, 5, undefined, undefined, ["", "-"], undefined, undefined, [[true, "<sub>", "</sub>", new DefaultNotation()], [true, "<sub>", "</sub>", new DefaultNotation()], null]).setName("Element Letters");
  Presets.RomanNumerals = recipBelow(new NestedSignValueNotation([["M̅", 1000000], ["C̅M̅", 900000], ["D̅", 500000], ["C̅D̅", 400000], ["C̅", 100000], ["X̅C̅", 90000], ["L̅", 50000], ["X̅L̅", 40000], ["X̅", 10000], ["MX̅", 9000], ["V̅", 5000], ["MV̅", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5], ["⁙", 5 / 12], ["∷", 4 / 12], ["∴", 3 / 12], [":", 2 / 12], ["·", 1 / 12]], 1 / 12), 1 / 12, ["I / ", ""], "nulla").setName("Roman Numerals");
  Presets.ADRoman = new ExpandedDefaultNotation(4000000, 1 / 12, 5, 4000000, 0, 0, 1, undefined, undefined, [["↑", ""], ["I↑", ""], ["↑↑", ""], ["I↑↑", ""]], [false, ["I / ", ""]], false, false, 1, 1, _construct(SignValueNotation, [[["M̅", 1000000], ["C̅M̅", 900000], ["D̅", 500000], ["C̅D̅", 400000], ["C̅", 100000], ["X̅C̅", 90000], ["L̅", 50000], ["X̅L̅", 40000], ["X̅", 10000], ["MX̅", 9000], ["V̅", 5000], ["MV̅", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5], ["⁙", 5 / 12], ["∷", 4 / 12], ["∴", 3 / 12], [":", 2 / 12], ["·", 1 / 12]], 1 / 12].concat(_arrayWithoutHoles([,,,,,]), ["nulla"])), undefined, [true, true]).setName("AD Roman");
  Presets.Septecoman = new ExpandedDefaultNotation(Math.pow(17, 7), 1 / 289, 3, 17, 1 / 289, 0, 1, [17, 7], [1], [["[", "]"], ["[", "]I"], ["{", "}"], ["{", "}I"]], [false, ["I / ", ""]], true, true, 1 / 17, 1 / 17, _construct(SignValueNotation, [[["OE", Math.pow(17, 6) * 7], ["TEOE", Math.pow(17, 6) * 6], ["TETEOE", Math.pow(17, 6) * 5], ["TE", Math.pow(17, 6)], ["NE", Math.pow(17, 5) * 7], ["DENE", Math.pow(17, 5) * 6], ["DEDENE", Math.pow(17, 5) * 5], ["DE", Math.pow(17, 5)], ["SE", Math.pow(17, 4) * 7], ["ESE", Math.pow(17, 4) * 6], ["EESE", Math.pow(17, 4) * 5], ["E", Math.pow(17, 4)], ["H", Math.pow(17, 3) * 7], ["FH", Math.pow(17, 3) * 6], ["FFH", Math.pow(17, 3) * 5], ["F", Math.pow(17, 3)], ["O", Math.pow(17, 2) * 7], ["TO", Math.pow(17, 2) * 6], ["TTO", Math.pow(17, 2) * 5], ["T", Math.pow(17, 2)], ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1], ["Ƨ", Math.pow(17, -1) * 7], ["ꓷƧ", Math.pow(17, -1) * 6], ["ꓷꓷƧ", Math.pow(17, -1) * 5], ["ꓷ", Math.pow(17, -1)], ["И", Math.pow(17, -2) * 7], ["ꓕИ", Math.pow(17, -2) * 6], ["ꓕꓕИ", Math.pow(17, -2) * 5], ["ꓕ", Math.pow(17, -2)]], 1 / 289].concat(_arrayWithoutHoles([,,,,,]), ["Z"])), new SignValueNotation([["OE", Math.pow(17, 6) * 7], ["TEOE", Math.pow(17, 6) * 6], ["TETEOE", Math.pow(17, 6) * 5], ["TE", Math.pow(17, 6)], ["NE", Math.pow(17, 5) * 7], ["DENE", Math.pow(17, 5) * 6], ["DEDENE", Math.pow(17, 5) * 5], ["DE", Math.pow(17, 5)], ["SE", Math.pow(17, 4) * 7], ["ESE", Math.pow(17, 4) * 6], ["EESE", Math.pow(17, 4) * 5], ["E", Math.pow(17, 4)], ["H", Math.pow(17, 3) * 7], ["FH", Math.pow(17, 3) * 6], ["FFH", Math.pow(17, 3) * 5], ["F", Math.pow(17, 3)], ["O", Math.pow(17, 2) * 7], ["TO", Math.pow(17, 2) * 6], ["TTO", Math.pow(17, 2) * 5], ["T", Math.pow(17, 2)], ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1], ["Ƨ", 0.4117], ["ꓷƧ", 0.3529], ["ꓷꓷƧ", 0.2941], ["ꓷ", 0.0588]], 1 / 289), [true, true]).setName("Septecoman");
  HTMLPresets.RomanNumerals = recipBelow(new NestedSignValueNotation([["M&#x305;", 1000000], ["C&#x305;M&#x305;", 900000], ["D&#x305;", 500000], ["C&#x305;D&#x305;", 400000], ["C&#x305;", 100000], ["X̅C&#x305;", 90000], ["L&#x305;", 50000], ["X&#x305;L&#x305;", 40000], ["X&#x305;", 10000], ["MX&#x305;", 9000], ["V&#x305;", 5000], ["MV&#x305;", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5], ["&#x2059;", 5 / 12], ["&#x2237;", 4 / 12], ["&#x2234;", 3 / 12], [":", 2 / 12], ["&#xB7;", 1 / 12]], 1 / 12), 1 / 12, ["I / ", ""], "nulla").setName("Roman Numerals");
  HTMLPresets.ADRoman = new ExpandedDefaultNotation(4000000, 1 / 12, 5, 4000000, 0, 0, 1, undefined, undefined, [["&#8593;", ""], ["I&#8593;", ""], ["&#8593;&#8593;", ""], ["I&#8593;&#8593;", ""]], [false, ["I / ", ""]], false, false, 1, 1, _construct(SignValueNotation, [[["M&#x305;", 1000000], ["C&#x305;M&#x305;", 900000], ["D&#x305;", 500000], ["C&#x305;D&#x305;", 400000], ["C&#x305;", 100000], ["X̅C&#x305;", 90000], ["L&#x305;", 50000], ["X&#x305;L&#x305;", 40000], ["X&#x305;", 10000], ["MX&#x305;", 9000], ["V&#x305;", 5000], ["MV&#x305;", 4000], ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1], ["S", 0.5], ["&#x2059;", 5 / 12], ["&#x2237;", 4 / 12], ["&#x2234;", 3 / 12], [":", 2 / 12], ["&#xB7;", 1 / 12]], 1 / 12].concat(_arrayWithoutHoles([,,,,,]), ["nulla"])), undefined, [true, true]).setName("AD Roman");
  HTMLPresets.Septecoman = new ExpandedDefaultNotation(Math.pow(17, 7), 1 / 289, 3, 17, 1 / 289, 0, 1, [17, 7], [1], [["[", "]"], ["[", "]I"], ["{", "}"], ["{", "}I"]], [false, ["I / ", ""]], true, true, 1 / 17, 1 / 17, _construct(SignValueNotation, [[["OE", Math.pow(17, 6) * 7], ["TEOE", Math.pow(17, 6) * 6], ["TETEOE", Math.pow(17, 6) * 5], ["TE", Math.pow(17, 6)], ["NE", Math.pow(17, 5) * 7], ["DENE", Math.pow(17, 5) * 6], ["DEDENE", Math.pow(17, 5) * 5], ["DE", Math.pow(17, 5)], ["SE", Math.pow(17, 4) * 7], ["ESE", Math.pow(17, 4) * 6], ["EESE", Math.pow(17, 4) * 5], ["E", Math.pow(17, 4)], ["H", Math.pow(17, 3) * 7], ["FH", Math.pow(17, 3) * 6], ["FFH", Math.pow(17, 3) * 5], ["F", Math.pow(17, 3)], ["O", Math.pow(17, 2) * 7], ["TO", Math.pow(17, 2) * 6], ["TTO", Math.pow(17, 2) * 5], ["T", Math.pow(17, 2)], ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1], ["&#x1A7;", Math.pow(17, -1) * 7], ["&#xA4F7;&#x1A7;", Math.pow(17, -1) * 6], ["&#xA4F7;&#xA4F7;&#x1A7;", Math.pow(17, -1) * 5], ["&#xA4F7;", Math.pow(17, -1)], ["&#x418;", Math.pow(17, -2) * 7], ["&#xA4D5;&#x418;", Math.pow(17, -2) * 6], ["&#xA4D5;&#xA4D5;&#x418;", Math.pow(17, -2) * 5], ["&#xA4D5;", Math.pow(17, -2)]], 1 / 289].concat(_arrayWithoutHoles([,,,,,]), ["Z"])), new SignValueNotation([["OE", Math.pow(17, 6) * 7], ["TEOE", Math.pow(17, 6) * 6], ["TETEOE", Math.pow(17, 6) * 5], ["TE", Math.pow(17, 6)], ["NE", Math.pow(17, 5) * 7], ["DENE", Math.pow(17, 5) * 6], ["DEDENE", Math.pow(17, 5) * 5], ["DE", Math.pow(17, 5)], ["SE", Math.pow(17, 4) * 7], ["ESE", Math.pow(17, 4) * 6], ["EESE", Math.pow(17, 4) * 5], ["E", Math.pow(17, 4)], ["H", Math.pow(17, 3) * 7], ["FH", Math.pow(17, 3) * 6], ["FFH", Math.pow(17, 3) * 5], ["F", Math.pow(17, 3)], ["O", Math.pow(17, 2) * 7], ["TO", Math.pow(17, 2) * 6], ["TTO", Math.pow(17, 2) * 5], ["T", Math.pow(17, 2)], ["N", 17 * 7], ["DN", 17 * 6], ["DDN", 17 * 5], ["D", 17], ["S", 7], ["IS", 6], ["IIS", 5], ["I", 1], ["&#x1A7;", 0.4117], ["&#xA4F7;&#x1A7;", 0.3529], ["&#xA4F7;&#xA4F7;&#x1A7;", 0.2941], ["&#xA4F7;", 0.0588]], 1 / 289), [true, true]).setName("Septecoman");
  Presets.SI = _construct(NestedSINotation, _arrayWithoutHoles([,,,,]).concat([defaultRound])).setName("SI");
  Presets.SIWritten = new NestedSINotation(10, [["quetta", 30], ["ronna", 27], ["yotta", 24], ["zetta", 21], ["exa", 18], ["peta", 15], ["tera", 12], ["giga", 9], ["mega", 6], ["kilo", 3]], [["quecto", 30], ["ronto", 27], ["yocto", 24], ["zepto", 21], ["atto", 18], ["femto", 15], ["pico", 12], ["nano", 9], ["micro", 6], ["milli", 3]], true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]).setName("SI (Written)");
  Presets.BinarySI = new NestedSINotation(2, [["Yi", 80], ["Zi", 70], ["Ei", 60], ["Pi", 50], ["Ti", 40], ["Gi", 30], ["Mi", 20], ["Ki", 10]], "/", true, defaultRound).setName("Binary SI");
  Presets.BinarySIWritten = new NestedSINotation(2, [["yobi", 80], ["zebi", 70], ["exbi", 60], ["pebi", 50], ["tebi", 40], ["gibi", 30], ["mebi", 20], ["kibi", 10]], "/", true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]).setName("Binary SI (Written)");
  Presets.CombinedD = new NestedSINotation(10, [["D", 33], ["N", 30], ["O", 27], ["Sp", 24], ["Sx", 21], ["Qi", 18], ["Qa", 15], ["T", 12], ["B", 9], ["M", 6]], "/", true, defaultRound, 2, 3, 0, 0, "", "*").setName("Combined-D");
  Presets.HyperSI = _construct(NestedHyperSINotation, _arrayWithoutHoles([,,,,]).concat([defaultRound])).setName("Hyper-SI");
  Presets.HyperSIWritten = new NestedHyperSINotation(10, [["deckerexi-", 10], ["tenebexi-", 9], ["cloctexi-", 8], ["hypocexi-", 7], ["alifexi-", 6], ["madenexi-", 5], ["swekexi-", 4], ["brinexi-", 3], ["digexi-", 2], ["plexi-", 1]], [["nepogo-", 2], ["logo-", 1]], true, defaultRound, 2, 0, " ", "", ["^(", ")"]).setName("Hyper-SI (Written)");
  Presets.SandcastleBuilder = new NestedSINotation(10, [["Q", 210], ["W", 42], ["L", 39], ["F", 36], ["H", 33], ["S", 30], ["U", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["K", 3]], "/", true, defaultRound).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder");
  Presets.SandcastleBuilderWritten = new NestedSINotation(10, [["Quita", 210], ["Wololo", 42], ["Lotta", 39], ["Ferro", 36], ["Helo", 33], ["Squilli", 30], ["Umpty", 27], ["Yotta", 24], ["Zetta", 21], ["Exa", 18], ["Peta", 15], ["Tera", 12], ["Giga", 9], ["Mega", 6], ["Kilo", 3]], "/ ", true, defaultRound, 4, 3, 0, 0, " ", " ", [["^(", ")"], ["^^(", ")"]]).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder (Written)");
  HTMLPresets.SI = _construct(NestedSINotation, _arrayWithoutHoles([,,,,]).concat([defaultRound])).setName("SI");
  HTMLPresets.SIWritten = new NestedSINotation(10, [["quetta", 30], ["ronna", 27], ["yotta", 24], ["zetta", 21], ["exa", 18], ["peta", 15], ["tera", 12], ["giga", 9], ["mega", 6], ["kilo", 3]], [["quecto", 30], ["ronto", 27], ["yocto", 24], ["zepto", 21], ["atto", 18], ["femto", 15], ["pico", 12], ["nano", 9], ["micro", 6], ["milli", 3]], true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]).setName("SI (Written)");
  HTMLPresets.BinarySI = new NestedSINotation(2, [["Yi", 80], ["Zi", 70], ["Ei", 60], ["Pi", 50], ["Ti", 40], ["Gi", 30], ["Mi", 20], ["Ki", 10]], "/", true, defaultRound).setName("Binary SI");
  HTMLPresets.BinarySIWritten = new NestedSINotation(2, [["yobi", 80], ["zebi", 70], ["exbi", 60], ["pebi", 50], ["tebi", 40], ["gibi", 30], ["mebi", 20], ["kibi", 10]], "/", true, defaultRound, 2, 3, 0, 0, " ", "", [["^(", ")"], ["^^(", ")"]]).setName("Binary SI (Written)");
  HTMLPresets.CombinedD = new NestedSINotation(10, [["D", 33], ["N", 30], ["O", 27], ["Sp", 24], ["Sx", 21], ["Qi", 18], ["Qa", 15], ["T", 12], ["B", 9], ["M", 6]], "/", true, defaultRound, 2, 3, 0, 0, "", "*").setName("Combined-D");
  HTMLPresets.HyperSI = _construct(NestedHyperSINotation, _arrayWithoutHoles([,,,,]).concat([defaultRound])).setName("Hyper-SI");
  HTMLPresets.HyperSIWritten = new NestedHyperSINotation(10, [["deckerexi-", 10], ["tenebexi-", 9], ["cloctexi-", 8], ["hypocexi-", 7], ["alifexi-", 6], ["madenexi-", 5], ["swekexi-", 4], ["brinexi-", 3], ["digexi-", 2], ["plexi-", 1]], [["nepogo-", 2], ["logo-", 1]], true, defaultRound, 2, 0, " ", "", ["^(", ")"]).setName("Hyper-SI (Written)");
  HTMLPresets.SandcastleBuilder = new NestedSINotation(10, [["Q", 210], ["W", 42], ["L", 39], ["F", 36], ["H", 33], ["S", 30], ["U", 27], ["Y", 24], ["Z", 21], ["E", 18], ["P", 15], ["T", 12], ["G", 9], ["M", 6], ["K", 3]], "/", true, defaultRound).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder");
  HTMLPresets.SandcastleBuilderWritten = new NestedSINotation(10, [["Quita", 210], ["Wololo", 42], ["Lotta", 39], ["Ferro", 36], ["Helo", 33], ["Squilli", 30], ["Umpty", 27], ["Yotta", 24], ["Zetta", 21], ["Exa", 18], ["Peta", 15], ["Tera", 12], ["Giga", 9], ["Mega", 6], ["Kilo", 3]], "/ ", true, defaultRound, 4, 3, 0, 0, " ", " ", [["^(", ")"], ["^^(", ")"]]).setNotationGlobals(undefined, undefined, undefined, "Mustard", undefined).setName("Sandcastle Builder (Written)");
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
  Presets.LetterDigits = zeroString(_construct(LetterDigitsNotation, _arrayWithoutHoles([,,,,,,,,,,,,,,]).concat([1 / 18279])), "_").setName("Letter Digits");
  Presets.AlphabetDigits = _construct(LetterDigitsNotation, [[["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]], 0, 9, false, -3, -3].concat(_arrayWithoutHoles([,,,,,]), ["|", true, false, Math.pow(53, -3)])).setName("Alphabet Digits");
  HTMLPresets.LetterDigits = zeroString(_construct(LetterDigitsNotation, _arrayWithoutHoles([,,,,,,,,,,,,,,]).concat([1 / 18279])), "_").setName("Letter Digits");
  HTMLPresets.AlphabetDigits = _construct(LetterDigitsNotation, [[["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], ["~", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]], 0, 9, false, -3, -3].concat(_arrayWithoutHoles([,,,,,]), ["|", true, false, Math.pow(53, -3)])).setName("Alphabet Digits");
  Presets.Myriad = new MyriadNotation(0, defaultRound).setName("Myriad");
  Presets.ADMyriad = new MyriadNotation(1, defaultRound).setName("AD Myriad");
  Presets.AarexMyriad = new MyriadNotation(2, defaultRound).setName("Aarex Myriad");
  HTMLPresets.Myriad = new MyriadNotation(0, defaultRound).setName("Myriad");
  HTMLPresets.ADMyriad = new MyriadNotation(1, defaultRound).setName("AD Myriad");
  HTMLPresets.AarexMyriad = new MyriadNotation(2, defaultRound).setName("Aarex Myriad");
  var doubleBinaryNames = new MultiLogarithmNotation("2^131072", 5, 0, 2, 1, true, [["(", ")p"], ["", "p"], [" | p^(", ")"]], null, true, 0, 1, new NestedSignValueNotation([["X", "2^65536"], ["A", "2^32768"], ["Q", "2^16384"], ["K", "2^8192"], ["C", "2^4096"], ["R", "2^2048"], ["D", "2^1024"], ["T", Math.pow(2, 512)], ["P", Math.pow(2, 256)], ["F", Math.pow(2, 128)], ["L", Math.pow(2, 64)], ["I", Math.pow(2, 32)], ["S", 65536], ["B", 256], ["H", 16], ["4", 4], ["2", 2], ["1", 1]], 0, false, "round", 1, 1, 3, 0, 0, " ", [["", " "], ["^(", ")"], [" # (", ")"]], 16));
  Presets.DoubleBinaryNames = new ConditionalNotation(false, [new DefaultNotation(), function (value) {
    return value.eq(0);
  }], [new AppliedFunctionNotation(function (value) {
    return value.recip();
  }, doubleBinaryNames, function (str) {
    return "1 / (" + str + ")";
  }), function (value) {
    return value.lt(1);
  }], [doubleBinaryNames, function (value) {
    return true;
  }]).setName("Double Binary Names");
  HTMLPresets.DoubleBinaryNames = new ConditionalNotation(false, [new DefaultNotation(), function (value) {
    return value.eq(0);
  }], [new AppliedFunctionNotation(function (value) {
    return value.recip();
  }, doubleBinaryNames, function (str) {
    return "1 / (" + str + ")";
  }), function (value) {
    return value.lt(1);
  }], [doubleBinaryNames, function (value) {
    return true;
  }]).setName("Double Binary Names");
  Presets.DoubleBinaryPrefixes = _construct(NestedSINotation, [2, [["X", 65536], ["A", 32768], ["Q", 16384], ["K", 8192], ["C", 4096], ["R", 2048], ["D", 1024], ["T", 512], ["P", 256], ["F", 128], ["L", 64], ["I", 32], ["S", 16], ["B", 8], ["H", 4]], "/", true, defaultRound, 1].concat(_arrayWithoutHoles([,,,,,]), [[["^(", ")"], [" # (", ")"]], 5])).setName("Double Binary Prefixes");
  HTMLPresets.DoubleBinaryPrefixes = _construct(NestedSINotation, [2, [["X", 65536], ["A", 32768], ["Q", 16384], ["K", 8192], ["C", 4096], ["R", 2048], ["D", 1024], ["T", 512], ["P", 256], ["F", 128], ["L", 64], ["I", 32], ["S", 16], ["B", 8], ["H", 4]], "/", true, defaultRound, 1].concat(_arrayWithoutHoles([,,,,,]), [[["^(", ")"], [" # (", ")"]], 5])).setName("Double Binary Prefixes");
  Presets.Hypersplit = _construct(HypersplitNotation, _arrayWithoutHoles([,,,,,,,]).concat([defaultRound])).setName("Hypersplit");
  HTMLPresets.Hypersplit = _construct(HypersplitNotation, _arrayWithoutHoles([,,,,,,,]).concat([defaultRound])).setName("Hypersplit");
  Presets.HypersplitBase3 = _construct(HypersplitNotation, [[["", ""], ["*3^", ""], ["((3^)^", ") "], ["((3^^)^", ") "]], 3, [3, 3, 3]].concat(_arrayWithoutHoles([,,,,]), [defaultRound])).setName("Hypersplit (Base 3)");
  HTMLPresets.HypersplitBase3 = _construct(HypersplitNotation, [[["", ""], ["*3^", ""], ["((3^)^", ") "], ["((3^^)^", ") "]], 3, [3, 3, 3]].concat(_arrayWithoutHoles([,,,,]), [defaultRound])).setName("Hypersplit (Base 3)");
  Presets.HyperE = new ConditionalNotation(false, [_construct(ScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound], _arrayWithoutHoles([,,,,]), [[["E", ""], ["E", ""], ["(E^", ")"]]])), function (value) {
    return multabs(value).lt("1e10") || value.eq(0);
  }], [new HypersplitNotation([["", ""], ["E", ""], ["#", ""], ["#", ""]], 10, [0, 1e10, 1e10 - 1], [-1, 1, 0, 0], 23, undefined, 0, defaultRound, [new DefaultNotation(), new DefaultNotation(), new AppliedFunctionNotation(function (value) {
    return value.plus(1);
  }, new DefaultNotation(), function (str) {
    return str;
  })]), function (value) {
    return true;
  }]).setName("Hyper-E");
  HTMLPresets.HyperE = new ConditionalNotation(false, [_construct(ScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound], _arrayWithoutHoles([,,,,]), [[["E", ""], ["E", ""], ["(E^", ")"]]])), function (value) {
    return multabs(value).lt("1e10") || value.eq(0);
  }], [new HypersplitNotation([["", ""], ["E", ""], ["#", ""], ["#", ""]], 10, [0, 1e10, 1e10 - 1], [-1, 1, 0, 0], 23, undefined, 0, defaultRound, [new DefaultNotation(), new DefaultNotation(), new AppliedFunctionNotation(function (value) {
    return value.plus(1);
  }, new DefaultNotation(), function (str) {
    return str;
  })]), function (value) {
    return true;
  }]).setName("Hyper-E");
  Presets.Infinity = recipBelow(new MultiLogarithmNotation(1e16, 5, 1, "2^1024", 1, true, [["", "∞"], ["", "∞"], ["∞^", ""]], null, true, 0, 1, new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation()), Decimal__default["default"].pow("2^1024", -1e15)).setNotationGlobals(["-(", ")"]).setName("Infinity");
  HTMLPresets.Infinity = recipBelow(new MultiLogarithmNotation(1e16, 5, 1, "2^1024", 1, true, [["", "&infin;"], ["", "&infin;"], ["&infin;<sup>", "</sup>"]], null, true, 0, 1, new DefaultNotation(-5, 4, 0, 1e12, 0), new DefaultNotation()), Decimal__default["default"].pow("2^1024", -1e15)).setNotationGlobals(["-(", ")"]).setName("Infinity");
  Presets.Eternity = new ConditionalNotation(false, [new DefaultNotation(), function (value) {
    return value.eq(0) || value.eq(1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.slog(10, 100, true).log("2^1024");
  }, new DefaultNotation(-6, 5, 0, 1e12, 0), function (str) {
    return "֎" + str;
  }), function (value) {
    return value.gt(1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.recip().slog(10, 100, true).log("2^1024");
  }, new DefaultNotation(-6, 5, 0, 1e12, 0), function (str) {
    return "֍" + str;
  }), function (value) {
    return value.gt(0) && value.lt(1);
  }]).setName("Eternity");
  HTMLPresets.Eternity = new ConditionalNotation(false, [new DefaultNotation(), function (value) {
    return value.eq(0) || value.eq(1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.slog(10, 100, true).log("2^1024");
  }, new DefaultNotation(-6, 5, 0, 1e12, 0), function (str) {
    return "&#x58E;" + str;
  }), function (value) {
    return value.gt(1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.recip().slog(10, 100, true).log("2^1024");
  }, new DefaultNotation(-6, 5, 0, 1e12, 0), function (str) {
    return "&#x58D;" + str;
  }), function (value) {
    return value.gt(0) && value.lt(1);
  }]).setName("Eternity");
  Presets.Brackets = new HypersplitNotation([["", ""], ["e", ""], ["", ""], ["", ""]], 6, [0, 46656, Infinity], [-1, 1, 0, -1], 1, undefined, 0, 0, [new DefaultNotation(), _construct(AlternateBaseNotation, [[")", "[", "{", "]", "(", "}"], 0, 2, 2, -1, Infinity, 0].concat(_arrayWithoutHoles([,,,]), [1])), _construct(LogarithmNotation, [1, undefined, 6, true, [["", ""], ["", ""], ["", ""]]].concat(_arrayWithoutHoles([,,,,]), [_construct(AlternateBaseNotation, [["(", "]", "}", "[", ")", "{"], 0, 2, 2, -1, Infinity, 0].concat(_arrayWithoutHoles([,,,]), [1, true]))]))]).setName("Brackets");
  HTMLPresets.Brackets = new HypersplitNotation([["", ""], ["e", ""], ["", ""], ["", ""]], 6, [0, 46656, Infinity], [-1, 1, 0, -1], 1, undefined, 0, 0, [new DefaultNotation(), _construct(AlternateBaseNotation, [[")", "[", "{", "]", "(", "}"], 0, 2, 2, -1, Infinity, 0].concat(_arrayWithoutHoles([,,,]), [1])), _construct(LogarithmNotation, [1, undefined, 6, true, [["", ""], ["", ""], ["", ""]]].concat(_arrayWithoutHoles([,,,,]), [_construct(AlternateBaseNotation, [["(", "]", "}", "[", ")", "{"], 0, 2, 2, -1, Infinity, 0].concat(_arrayWithoutHoles([,,,]), [1, true]))]))]).setName("Brackets");
  var SimplifiedWrittenArgam = ["Ze", "On", "Tw", "Th", "Fo", "Fi", "Si", "Se", "Ei", "Ni", "De", "El", "Zn", "Ti", "Zf", "Tr", "Te", "Zo", "Di", "Ax", "Sc", "Ts", "Dl", "Fl", "Ca", "Qu", "Dt", "Tn", "Cv", "Ne", "Ki", "So", "Tv", "Tl", "Do", "Kn", "Ex", "Ma", "Da", "Tt", "Ko", "Lu", "Ee", "Sl", "Cd", "Kv", "Dr", "Fs", "Eo", "Ef", "Ke", "Tz", "Ci", "Su", "Ev", "Kl", "Sv", "Ta", "Dv", "Cl"];
  Presets.SimplifiedWritten = function (base) {
    return _construct(HypersplitNotation, [[["", ""], ["(", ") "], ["[", "] "], ["{", "} "]], base, [Math.pow(base, 3), Math.pow(base, 3), Math.pow(base, 3)], undefined, 0].concat(_arrayWithoutHoles([,,]), [1, new AlternateBaseNotation(SimplifiedWrittenArgam.slice(0, base), 0, 0, 0, -1)])).setName(base == 10 ? "Simplified Written" : "Simplified Written (Base " + new DefaultNotation().format(base) + ")");
  };
  HTMLPresets.SimplifiedWritten = function (base) {
    return _construct(HypersplitNotation, [[["", ""], ["(", ") "], ["[", "] "], ["{", "} "]], base, [Math.pow(base, 3), Math.pow(base, 3), Math.pow(base, 3)], undefined, 0].concat(_arrayWithoutHoles([,,]), [1, new AlternateBaseNotation(SimplifiedWrittenArgam.slice(0, base), 0, 0, 0, -1)])).setName(base == 10 ? "Simplified Written" : "Simplified Written (Base " + new DefaultNotation().format(base) + ")");
  };
  Presets.Dots = new ExpandedDefaultNotation(Math.pow(254, 3), Math.pow(254, -1), 3, 254, 1 / 254, 2, 1, undefined, undefined, [["", "⣿"], ["", "⣿⠂"], ["", "⣿⣿"], ["", "⣿⣿⠂"]], [["(-", ")⣿"], ["⠂;", ""]], true, true, 1, 1, _construct(AlternateBaseNotation, [["⠁", "⠂", "⠃", "⠄", "⠅", "⠆", "⠇", "⠈", "⠉", "⠊", "⠋", "⠌", "⠍", "⠎", "⠏", "⠐", "⠑", "⠒", "⠓", "⠔", "⠕", "⠖", "⠗", "⠘", "⠙", "⠚", "⠛", "⠜", "⠝", "⠞", "⠟", "⠠", "⠡", "⠢", "⠣", "⠤", "⠥", "⠦", "⠧", "⠨", "⠩", "⠪", "⠫", "⠬", "⠭", "⠮", "⠯", "⠰", "⠱", "⠲", "⠳", "⠴", "⠵", "⠶", "⠷", "⠸", "⠹", "⠺", "⠻", "⠼", "⠽", "⠾", "⠿", "⡀", "⡁", "⡂", "⡃", "⡄", "⡅", "⡆", "⡇", "⡈", "⡉", "⡊", "⡋", "⡌", "⡍", "⡎", "⡏", "⡐", "⡑", "⡒", "⡓", "⡔", "⡕", "⡖", "⡗", "⡘", "⡙", "⡚", "⡛", "⡜", "⡝", "⡞", "⡟", "⡠", "⡡", "⡢", "⡣", "⡤", "⡥", "⡦", "⡧", "⡨", "⡩", "⡪", "⡫", "⡬", "⡭", "⡮", "⡯", "⡰", "⡱", "⡲", "⡳", "⡴", "⡵", "⡶", "⡷", "⡸", "⡹", "⡺", "⡻", "⡼", "⡽", "⡾", "⡿", "⢀", "⢁", "⢂", "⢃", "⢄", "⢅", "⢆", "⢇", "⢈", "⢉", "⢊", "⢋", "⢌", "⢍", "⢎", "⢏", "⢐", "⢑", "⢒", "⢓", "⢔", "⢕", "⢖", "⢗", "⢘", "⢙", "⢚", "⢛", "⢜", "⢝", "⢞", "⢟", "⢠", "⢡", "⢢", "⢣", "⢤", "⢥", "⢦", "⢧", "⢨", "⢩", "⢪", "⢫", "⢬", "⢭", "⢮", "⢯", "⢰", "⢱", "⢲", "⢳", "⢴", "⢵", "⢶", "⢷", "⢸", "⢹", "⢺", "⢻", "⢼", "⢽", "⢾", "⢿", "⣀", "⣁", "⣂", "⣃", "⣄", "⣅", "⣆", "⣇", "⣈", "⣉", "⣊", "⣋", "⣌", "⣍", "⣎", "⣏", "⣐", "⣑", "⣒", "⣓", "⣔", "⣕", "⣖", "⣗", "⣘", "⣙", "⣚", "⣛", "⣜", "⣝", "⣞", "⣟", "⣠", "⣡", "⣢", "⣣", "⣤", "⣥", "⣦", "⣧", "⣨", "⣩", "⣪", "⣫", "⣬", "⣭", "⣮", "⣯", "⣰", "⣱", "⣲", "⣳", "⣴", "⣵", "⣶", "⣷", "⣸", "⣹", "⣺", "⣻", "⣼", "⣽", "⣾"], 0, 1, 1, -1].concat(_arrayWithoutHoles([,,,,,]), [1, false, 3, undefined, ""])), new AlternateBaseNotation(["⠁", "⠂", "⠃", "⠄", "⠅", "⠆", "⠇", "⠈", "⠉", "⠊", "⠋", "⠌", "⠍", "⠎", "⠏", "⠐", "⠑", "⠒", "⠓", "⠔", "⠕", "⠖", "⠗", "⠘", "⠙", "⠚", "⠛", "⠜", "⠝", "⠞", "⠟", "⠠", "⠡", "⠢", "⠣", "⠤", "⠥", "⠦", "⠧", "⠨", "⠩", "⠪", "⠫", "⠬", "⠭", "⠮", "⠯", "⠰", "⠱", "⠲", "⠳", "⠴", "⠵", "⠶", "⠷", "⠸", "⠹", "⠺", "⠻", "⠼", "⠽", "⠾", "⠿", "⡀", "⡁", "⡂", "⡃", "⡄", "⡅", "⡆", "⡇", "⡈", "⡉", "⡊", "⡋", "⡌", "⡍", "⡎", "⡏", "⡐", "⡑", "⡒", "⡓", "⡔", "⡕", "⡖", "⡗", "⡘", "⡙", "⡚", "⡛", "⡜", "⡝", "⡞", "⡟", "⡠", "⡡", "⡢", "⡣", "⡤", "⡥", "⡦", "⡧", "⡨", "⡩", "⡪", "⡫", "⡬", "⡭", "⡮", "⡯", "⡰", "⡱", "⡲", "⡳", "⡴", "⡵", "⡶", "⡷", "⡸", "⡹", "⡺", "⡻", "⡼", "⡽", "⡾", "⡿", "⢀", "⢁", "⢂", "⢃", "⢄", "⢅", "⢆", "⢇", "⢈", "⢉", "⢊", "⢋", "⢌", "⢍", "⢎", "⢏", "⢐", "⢑", "⢒", "⢓", "⢔", "⢕", "⢖", "⢗", "⢘", "⢙", "⢚", "⢛", "⢜", "⢝", "⢞", "⢟", "⢠", "⢡", "⢢", "⢣", "⢤", "⢥", "⢦", "⢧", "⢨", "⢩", "⢪", "⢫", "⢬", "⢭", "⢮", "⢯", "⢰", "⢱", "⢲", "⢳", "⢴", "⢵", "⢶", "⢷", "⢸", "⢹", "⢺", "⢻", "⢼", "⢽", "⢾", "⢿", "⣀", "⣁", "⣂", "⣃", "⣄", "⣅", "⣆", "⣇", "⣈", "⣉", "⣊", "⣋", "⣌", "⣍", "⣎", "⣏", "⣐", "⣑", "⣒", "⣓", "⣔", "⣕", "⣖", "⣗", "⣘", "⣙", "⣚", "⣛", "⣜", "⣝", "⣞", "⣟", "⣠", "⣡", "⣢", "⣣", "⣤", "⣥", "⣦", "⣧", "⣨", "⣩", "⣪", "⣫", "⣬", "⣭", "⣮", "⣯", "⣰", "⣱", "⣲", "⣳", "⣴", "⣵", "⣶", "⣷", "⣸", "⣹", "⣺", "⣻", "⣼", "⣽", "⣾"], 0, 0, 0, -1), [true, true]).setName("Dots");
  HTMLPresets.Dots = new ExpandedDefaultNotation(Math.pow(254, 3), Math.pow(254, -1), 3, 254, 1 / 254, 2, 1, undefined, undefined, [["", "&#x28FF;"], ["", "&#x28FF;&#x2802;"], ["", "&#x28FF;&#x28FF;"], ["", "&#x28FF;&#x28FF;&#x2802;"]], [["(-", ")&#x28FF;"], ["&#x2802;;", ""]], true, true, 1, 1, _construct(AlternateBaseNotation, [["&#x2801;", "&#x2802;", "&#x2803;", "&#x2804;", "&#x2805;", "&#x2806;", "&#x2807;", "&#x2808;", "&#x2809;", "&#x280A;", "&#x280B;", "&#x280C;", "&#x280D;", "&#x280E;", "&#x280F;", "&#x2810;", "&#x2811;", "&#x2812;", "&#x2813;", "&#x2814;", "&#x2815;", "&#x2816;", "&#x2817;", "&#x2818;", "&#x2819;", "&#x281A;", "&#x281B;", "&#x281C;", "&#x281D;", "&#x281E;", "&#x281F;", "&#x2820;", "&#x2821;", "&#x2822;", "&#x2823;", "&#x2824;", "&#x2825;", "&#x2826;", "&#x2827;", "&#x2828;", "&#x2829;", "&#x282A;", "&#x282B;", "&#x282C;", "&#x282D;", "&#x282E;", "&#x282F;", "&#x2830;", "&#x2831;", "&#x2832;", "&#x2833;", "&#x2834;", "&#x2835;", "&#x2836;", "&#x2837;", "&#x2838;", "&#x2839;", "&#x283A;", "&#x283B;", "&#x283C;", "&#x283D;", "&#x283E;", "&#x283F;", "&#x2840;", "&#x2841;", "&#x2842;", "&#x2843;", "&#x2844;", "&#x2845;", "&#x2846;", "&#x2847;", "&#x2848;", "&#x2849;", "&#x284A;", "&#x284B;", "&#x284C;", "&#x284D;", "&#x284E;", "&#x284F;", "&#x2850;", "&#x2851;", "&#x2852;", "&#x2853;", "&#x2854;", "&#x2855;", "&#x2856;", "&#x2857;", "&#x2858;", "&#x2859;", "&#x285A;", "&#x285B;", "&#x285C;", "&#x285D;", "&#x285E;", "&#x285F;", "&#x2860;", "&#x2861;", "&#x2862;", "&#x2863;", "&#x2864;", "&#x2865;", "&#x2866;", "&#x2867;", "&#x2868;", "&#x2869;", "&#x286A;", "&#x286B;", "&#x286C;", "&#x286D;", "&#x286E;", "&#x286F;", "&#x2870;", "&#x2871;", "&#x2872;", "&#x2873;", "&#x2874;", "&#x2875;", "&#x2876;", "&#x2877;", "&#x2878;", "&#x2879;", "&#x287A;", "&#x287B;", "&#x287C;", "&#x287D;", "&#x287E;", "&#x287F;", "&#x2880;", "&#x2881;", "&#x2882;", "&#x2883;", "&#x2884;", "&#x2885;", "&#x2886;", "&#x2887;", "&#x2888;", "&#x2889;", "&#x288A;", "&#x288B;", "&#x288C;", "&#x288D;", "&#x288E;", "&#x288F;", "&#x2890;", "&#x2891;", "&#x2892;", "&#x2893;", "&#x2894;", "&#x2895;", "&#x2896;", "&#x2897;", "&#x2898;", "&#x2899;", "&#x289A;", "&#x289B;", "&#x289C;", "&#x289D;", "&#x289E;", "&#x289F;", "&#x28A0;", "&#x28A1;", "&#x28A2;", "&#x28A3;", "&#x28A4;", "&#x28A5;", "&#x28A6;", "&#x28A7;", "&#x28A8;", "&#x28A9;", "&#x28AA;", "&#x28AB;", "&#x28AC;", "&#x28AD;", "&#x28AE;", "&#x28AF;", "&#x28B0;", "&#x28B1;", "&#x28B2;", "&#x28B3;", "&#x28B4;", "&#x28B5;", "&#x28B6;", "&#x28B7;", "&#x28B8;", "&#x28B9;", "&#x28BA;", "&#x28BB;", "&#x28BC;", "&#x28BD;", "&#x28BE;", "&#x28BF;", "&#x28C0;", "&#x28C1;", "&#x28C2;", "&#x28C3;", "&#x28C4;", "&#x28C5;", "&#x28C6;", "&#x28C7;", "&#x28C8;", "&#x28C9;", "&#x28CA;", "&#x28CB;", "&#x28CC;", "&#x28CD;", "&#x28CE;", "&#x28CF;", "&#x28D0;", "&#x28D1;", "&#x28D2;", "&#x28D3;", "&#x28D4;", "&#x28D5;", "&#x28D6;", "&#x28D7;", "&#x28D8;", "&#x28D9;", "&#x28DA;", "&#x28DB;", "&#x28DC;", "&#x28DD;", "&#x28DE;", "&#x28DF;", "&#x28E0;", "&#x28E1;", "&#x28E2;", "&#x28E3;", "&#x28E4;", "&#x28E5;", "&#x28E6;", "&#x28E7;", "&#x28E8;", "&#x28E9;", "&#x28EA;", "&#x28EB;", "&#x28EC;", "&#x28ED;", "&#x28EE;", "&#x28EF;", "&#x28F0;", "&#x28F1;", "&#x28F2;", "&#x28F3;", "&#x28F4;", "&#x28F5;", "&#x28F6;", "&#x28F7;", "&#x28F8;", "&#x28F9;", "&#x28FA;", "&#x28FB;", "&#x28FC;", "&#x28FD;", "&#x28FE;"], 0, 1, 1, -1].concat(_arrayWithoutHoles([,,,,,]), [1, false, 3, undefined, ""])), new AlternateBaseNotation(["&#x2801;", "&#x2802;", "&#x2803;", "&#x2804;", "&#x2805;", "&#x2806;", "&#x2807;", "&#x2808;", "&#x2809;", "&#x280A;", "&#x280B;", "&#x280C;", "&#x280D;", "&#x280E;", "&#x280F;", "&#x2810;", "&#x2811;", "&#x2812;", "&#x2813;", "&#x2814;", "&#x2815;", "&#x2816;", "&#x2817;", "&#x2818;", "&#x2819;", "&#x281A;", "&#x281B;", "&#x281C;", "&#x281D;", "&#x281E;", "&#x281F;", "&#x2820;", "&#x2821;", "&#x2822;", "&#x2823;", "&#x2824;", "&#x2825;", "&#x2826;", "&#x2827;", "&#x2828;", "&#x2829;", "&#x282A;", "&#x282B;", "&#x282C;", "&#x282D;", "&#x282E;", "&#x282F;", "&#x2830;", "&#x2831;", "&#x2832;", "&#x2833;", "&#x2834;", "&#x2835;", "&#x2836;", "&#x2837;", "&#x2838;", "&#x2839;", "&#x283A;", "&#x283B;", "&#x283C;", "&#x283D;", "&#x283E;", "&#x283F;", "&#x2840;", "&#x2841;", "&#x2842;", "&#x2843;", "&#x2844;", "&#x2845;", "&#x2846;", "&#x2847;", "&#x2848;", "&#x2849;", "&#x284A;", "&#x284B;", "&#x284C;", "&#x284D;", "&#x284E;", "&#x284F;", "&#x2850;", "&#x2851;", "&#x2852;", "&#x2853;", "&#x2854;", "&#x2855;", "&#x2856;", "&#x2857;", "&#x2858;", "&#x2859;", "&#x285A;", "&#x285B;", "&#x285C;", "&#x285D;", "&#x285E;", "&#x285F;", "&#x2860;", "&#x2861;", "&#x2862;", "&#x2863;", "&#x2864;", "&#x2865;", "&#x2866;", "&#x2867;", "&#x2868;", "&#x2869;", "&#x286A;", "&#x286B;", "&#x286C;", "&#x286D;", "&#x286E;", "&#x286F;", "&#x2870;", "&#x2871;", "&#x2872;", "&#x2873;", "&#x2874;", "&#x2875;", "&#x2876;", "&#x2877;", "&#x2878;", "&#x2879;", "&#x287A;", "&#x287B;", "&#x287C;", "&#x287D;", "&#x287E;", "&#x287F;", "&#x2880;", "&#x2881;", "&#x2882;", "&#x2883;", "&#x2884;", "&#x2885;", "&#x2886;", "&#x2887;", "&#x2888;", "&#x2889;", "&#x288A;", "&#x288B;", "&#x288C;", "&#x288D;", "&#x288E;", "&#x288F;", "&#x2890;", "&#x2891;", "&#x2892;", "&#x2893;", "&#x2894;", "&#x2895;", "&#x2896;", "&#x2897;", "&#x2898;", "&#x2899;", "&#x289A;", "&#x289B;", "&#x289C;", "&#x289D;", "&#x289E;", "&#x289F;", "&#x28A0;", "&#x28A1;", "&#x28A2;", "&#x28A3;", "&#x28A4;", "&#x28A5;", "&#x28A6;", "&#x28A7;", "&#x28A8;", "&#x28A9;", "&#x28AA;", "&#x28AB;", "&#x28AC;", "&#x28AD;", "&#x28AE;", "&#x28AF;", "&#x28B0;", "&#x28B1;", "&#x28B2;", "&#x28B3;", "&#x28B4;", "&#x28B5;", "&#x28B6;", "&#x28B7;", "&#x28B8;", "&#x28B9;", "&#x28BA;", "&#x28BB;", "&#x28BC;", "&#x28BD;", "&#x28BE;", "&#x28BF;", "&#x28C0;", "&#x28C1;", "&#x28C2;", "&#x28C3;", "&#x28C4;", "&#x28C5;", "&#x28C6;", "&#x28C7;", "&#x28C8;", "&#x28C9;", "&#x28CA;", "&#x28CB;", "&#x28CC;", "&#x28CD;", "&#x28CE;", "&#x28CF;", "&#x28D0;", "&#x28D1;", "&#x28D2;", "&#x28D3;", "&#x28D4;", "&#x28D5;", "&#x28D6;", "&#x28D7;", "&#x28D8;", "&#x28D9;", "&#x28DA;", "&#x28DB;", "&#x28DC;", "&#x28DD;", "&#x28DE;", "&#x28DF;", "&#x28E0;", "&#x28E1;", "&#x28E2;", "&#x28E3;", "&#x28E4;", "&#x28E5;", "&#x28E6;", "&#x28E7;", "&#x28E8;", "&#x28E9;", "&#x28EA;", "&#x28EB;", "&#x28EC;", "&#x28ED;", "&#x28EE;", "&#x28EF;", "&#x28F0;", "&#x28F1;", "&#x28F2;", "&#x28F3;", "&#x28F4;", "&#x28F5;", "&#x28F6;", "&#x28F7;", "&#x28F8;", "&#x28F9;", "&#x28FA;", "&#x28FB;", "&#x28FC;", "&#x28FD;", "&#x28FE;"], 0, 0, 0, -1), [true, true]).setName("Dots");
  Presets.Hearts = new NestedSINotation(10, [["🩷", 10], ["🤍", 9], ["🩶", 8], ["💜", 7], ["💙", 6], ["💚", 5], ["💛", 4], ["🧡", 3], ["❤️", 2], ["🤎", 1]], "🩵", true, 1, 1, 5, 2, 0, "", "", [["", ""], ["💗", ""]], 5, "🖤", _construct(AlternateBaseNotation, [["🖤", "🤎", "❤️", "🧡", "💛", "💚", "💙", "💜", "🩶", "🤍"], 0, 0, 0, -1].concat(_arrayWithoutHoles([,,,,,]), [1])), [true, false]).setNotationGlobals(["💔", ""]).setName("Hearts");
  HTMLPresets.Hearts = new NestedSINotation(10, [["&#x1FA77;", 10], ["&#x1F90D;", 9], ["&#x1FA76;", 8], ["&#x1F49C;", 7], ["&#x1F499;", 6], ["&#x1F49A;", 5], ["&#x1F49B;", 4], ["&#x1F9E1;", 3], ["&#x2764;&#xFE0F;", 2], ["&#x1F90E;", 1]], "&#x1FA75;", true, 1, 1, 5, 2, 0, "", "", [["", ""], ["&#x1F497;", ""]], 5, "&#x1F5A4;", _construct(AlternateBaseNotation, [["&#x1F5A4;", "&#x1F90E;", "&#x2764;&#xFE0F;", "&#x1F9E1;", "&#x1F49B;", "&#x1F49A;", "&#x1F499;", "&#x1F49C;", "&#x1FA76;", "&#x1F90D;"], 0, 0, 0, -1].concat(_arrayWithoutHoles([,,,,,]), [1])), [true, false]).setNotationGlobals(["&#x1F494;", ""]).setName("Hearts");
  var numericDominoArray = [];
  var coloredDominoArrays = [[], [], [], []];
  {
    var upper = 0;
    var lower = 0;
    while (upper < 65) {
      numericDominoArray.push("[ " + upper + " | " + lower + " ]");
      for (var c = 0; c <= 3; c++) {
        coloredDominoArrays[c].push("<span class=\"domino_box\">\n                <span class=\"domino_square\" style=\"background-position: calc(100%/3*" + c + ") calc(100%/64*" + upper + ");\"></span>\n                <span class=\"domino_square\" style=\"background-position: calc(100%/3*" + c + ") calc(100%/64*" + lower + ");\"></span></span>");
      }
      if (upper == lower) {
        upper++;
        lower = 0;
      } else lower++;
    }
  }
  Presets.Dominoes = _construct(LetterDigitsNotation, [[["🁣", "🁪", "🁫", "🁱", "🁲", "🁳", "🁸", "🁹", "🁺", "🁻", "🁿", "🂀", "🂁", "🂂", "🂃", "🂆", "🂇", "🂈", "🂉", "🂊", "🂋", "🂍", "🂎", "🂏", "🂐", "🂑", "🂒", "🂓"], ["🁣", "🁪", "🁫", "🁱", "🁲", "🁳", "🁸", "🁹", "🁺", "🁻", "🁿", "🂀", "🂁", "🂂", "🂃", "🂆", "🂇", "🂈", "🂉", "🂊", "🂋", "🂍", "🂎", "🂏", "🂐", "🂑", "🂒", "🂓"], ["🁣", "🁪", "🁫", "🁱", "🁲", "🁳", "🁸", "🁹", "🁺", "🁻", "🁿", "🂀", "🂁", "🂂", "🂃", "🂆", "🂇", "🂈", "🂉", "🂊", "🂋", "🂍", "🂎", "🂏", "🂐", "🂑", "🂒", "🂓"]], 0, 9, false, 2, 2].concat(_arrayWithoutHoles([,,,,,]), ["🁢", true, false, 1 / 784, ["🀰", ""]])).setName("Dominoes");
  HTMLPresets.Dominoes = _construct(LetterDigitsNotation, [[["&#x1F063;", "&#x1F06A;", "&#x1F06B;", "&#x1F071;", "&#x1F072;", "&#x1F073;", "&#x1F078;", "&#x1F079;", "&#x1F07A;", "&#x1F07B;", "&#x1F07F;", "&#x1F080;", "&#x1F081;", "&#x1F082;", "&#x1F083;", "&#x1F086;", "&#x1F087;", "&#x1F088;", "&#x1F089;", "&#x1F08A;", "&#x1F08B;", "&#x1F08D;", "&#x1F08E;", "&#x1F08F;", "&#x1F090;", "&#x1F091;", "&#x1F092;", "&#x1F093;"], ["&#x1F063;", "&#x1F06A;", "&#x1F06B;", "&#x1F071;", "&#x1F072;", "&#x1F073;", "&#x1F078;", "&#x1F079;", "&#x1F07A;", "&#x1F07B;", "&#x1F07F;", "&#x1F080;", "&#x1F081;", "&#x1F082;", "&#x1F083;", "&#x1F086;", "&#x1F087;", "&#x1F088;", "&#x1F089;", "&#x1F08A;", "&#x1F08B;", "&#x1F08D;", "&#x1F08E;", "&#x1F08F;", "&#x1F090;", "&#x1F091;", "&#x1F092;", "&#x1F093;"], ["&#x1F063;", "&#x1F06A;", "&#x1F06B;", "&#x1F071;", "&#x1F072;", "&#x1F073;", "&#x1F078;", "&#x1F079;", "&#x1F07A;", "&#x1F07B;", "&#x1F07F;", "&#x1F080;", "&#x1F081;", "&#x1F082;", "&#x1F083;", "&#x1F086;", "&#x1F087;", "&#x1F088;", "&#x1F089;", "&#x1F08A;", "&#x1F08B;", "&#x1F08D;", "&#x1F08E;", "&#x1F08F;", "&#x1F090;", "&#x1F091;", "&#x1F092;", "&#x1F093;"]], 0, 9, false, 2, 2].concat(_arrayWithoutHoles([,,,,,]), ["&#x1F062;", true, false, 1 / 784, ["&#x1F030;", ""]])).setName("Dominoes");
  Presets.NumericDominoes = function (highest) {
    return _construct(LetterDigitsNotation, [[numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2)], 0, 9, false, 2, 2].concat(_arrayWithoutHoles([,,,,,]), ["||", true, false, Math.pow((highest + 1) * (highest + 2) / 2, -2), ["[==]", ""]])).setName("Numeric Dominoes (Double " + new DefaultNotation().format(highest) + ")");
  };
  HTMLPresets.NumericDominoes = function (highest) {
    return _construct(LetterDigitsNotation, [[numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2), numericDominoArray.slice(0, (highest + 1) * (highest + 2) / 2)], 0, 9, false, 2, 2].concat(_arrayWithoutHoles([,,,,,]), ["||", true, false, Math.pow((highest + 1) * (highest + 2) / 2, -2), ["[==]", ""]])).setName("Numeric Dominoes (Double " + new DefaultNotation().format(highest) + ")");
  };
  HTMLPresets.ColoredDominoes = function (highest) {
    return new LetterDigitsNotation([coloredDominoArrays[1].slice(0, (highest + 1) * (highest + 2) / 2), coloredDominoArrays[2].slice(0, (highest + 1) * (highest + 2) / 2), coloredDominoArrays[3].slice(0, (highest + 1) * (highest + 2) / 2)], 0, 9, false, 2, 2, undefined, -1, 3, undefined, "", "", false, false, Math.pow((highest + 1) * (highest + 2) / 2, -2), ["<span class=\"domino_box\">\n                <span class=\"domino_square\" style=\"background-position: calc(100%/3*1) 0;\"></span>\n                <span class=\"domino_square\" style=\"background-position: 100% 0;\"></span>\n                </span>", ""], [[[function (placeValue) {
      return placeValue < 0;
    }, coloredDominoArrays[0].slice(0, (highest + 1) * (highest + 2) / 2)]], [], []]).setNotationGlobals(["<span class=\"domino_box\">\n        <span class=\"domino_square\" style=\"background-position: calc(100%/3*2) 0;\"></span>\n        <span class=\"domino_square\" style=\"background-position: 0 0;\"></span>\n        </span>", ""]).setName("Colored Dominoes (Double " + new DefaultNotation().format(highest) + ")");
  };
  Presets.Factorial = new MultiFactorialNotation().setName("Factorial");
  Presets.FactorialAmount = new FactorialAmountNotation().setName("Factorial Amount");
  Presets.FactorialScientific = _construct(FactorialScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Factorial Scientific");
  Presets.FactorialHyperscientific = recipBelow(_construct(FactorialHyperscientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])), 1).setName("Factorial Hyperscientific");
  Presets.Factoradic = _construct(FactoradicNotation, _arrayWithoutHoles([,,,,,,,,,,,,,,]).concat([[["e", ""], ["e", ""], ["!", ""], ["!", ""]]])).setName("Factoradic");
  HTMLPresets.Factorial = new MultiFactorialNotation().setName("Factorial");
  HTMLPresets.FactorialAmount = new FactorialAmountNotation().setName("Factorial Amount");
  HTMLPresets.FactorialScientific = _construct(FactorialScientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])).setName("Factorial Scientific");
  HTMLPresets.FactorialHyperscientific = recipBelow(_construct(FactorialHyperscientificNotation, _arrayWithoutHoles([,,]).concat([defaultRound])), 1).setName("Factorial Hyperscientific");
  HTMLPresets.Factoradic = _construct(FactoradicNotation, _arrayWithoutHoles([,,,,,,,,,,,,,,]).concat([[["e", ""], ["e", ""], ["!", ""], ["!", ""]]])).setName("Factoradic");
  Presets.SquareRoot = new MultiRootNotation(2).setName("Square Root");
  Presets.CubeRoot = new MultiRootNotation(3).setName("Cube Root");
  Presets.Root = function (degree) {
    return new MultiRootNotation(degree).setName("Root (Degree " + new DefaultNotation().format(degree) + ")");
  };
  Presets.IncreasingRoot = recipBelow(new IncreasingRootNotation(), 1).setName("Increasing Root");
  Presets.SuperSquareRoot = recipBelow(new MultiSuperRootNotation(2), 1, undefined, "0").setName("Super Square Root");
  Presets.Tritetrated = recipBelow(new MultiSuperRootNotation(3), 1, undefined, "0").setName("Tritetrated");
  Presets.SuperRoot = function (degree) {
    return recipBelow(new MultiSuperRootNotation(degree), 1, undefined, "0").setName("Super Root (Degree " + new DefaultNotation().format(degree) + ")");
  };
  Presets.IncreasingSuperRoot = recipBelow(new IncreasingSuperRootNotation(), 1, undefined, "0").setName("Increasing Super Root");
  HTMLPresets.SquareRoot = new MultiRootNotation(2).setName("Square Root");
  HTMLPresets.CubeRoot = new MultiRootNotation(3).setName("Cube Root");
  HTMLPresets.Root = function (degree) {
    return new MultiRootNotation(degree).setName("Root (Degree " + new DefaultNotation().format(degree) + ")");
  };
  HTMLPresets.IncreasingRoot = recipBelow(new IncreasingRootNotation(), 1).setName("Increasing Root");
  HTMLPresets.SuperSquareRoot = recipBelow(new MultiSuperRootNotation(2), 1, undefined, "0").setName("Super Square Root");
  HTMLPresets.Tritetrated = recipBelow(new MultiSuperRootNotation(3), 1, undefined, "0").setName("Tritetrated");
  HTMLPresets.SuperRoot = function (degree) {
    return recipBelow(new MultiSuperRootNotation(degree), 1, undefined, "0").setName("Super Root (Degree " + new DefaultNotation().format(degree) + ")");
  };
  HTMLPresets.IncreasingSuperRoot = recipBelow(new IncreasingSuperRootNotation(), 1, undefined, "0").setName("Increasing Super Root");
  Presets.Prime = new PrimeNotation().setName("Prime");
  HTMLPresets.Prime = _construct(PrimeNotation, _arrayWithoutHoles([,,,,,,,]).concat([["<sup>", "</sup>"]])).setName("Prime");
  Presets.PsiLetters = new PsiDashNotation(1).setName("Psi Letters");
  Presets.PsiDash = new PsiDashNotation().setName("Psi Dash");
  HTMLPresets.PsiLetters = new PsiDashNotation(1).setName("Psi Letters");
  HTMLPresets.PsiDash = new PsiDashNotation().setName("Psi Dash");
  // This preset has been removed for now because it's too laggy
  // Presets.PrestigeLayer = (root : Decimal, requirement : Decimal) => new PrestigeLayerNotation(root, requirement, true).setName("Prestige Layer (Root " + new DefaultNotation().format(root) + ", Requirement" + new DefaultNotation().format(requirement) + ")");
  // HTMLPresets.PrestigeLayer = (root : Decimal, requirement : Decimal) => new PrestigeLayerNotation(root, requirement, true).setName("Prestige Layer (Root " + new DefaultNotation().format(root) + ", Requirement" + new DefaultNotation().format(requirement) + ")");
  var OmegaLayersPlain = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω", "Ω^α", "Ω^β", "Ω^γ", "Ω^δ", "Ω^ε", "Ω^ζ", "Ω^η", "Ω^θ", "Ω^ι", "Ω^κ", "Ω^λ", "Ω^μ", "Ω^ν", "Ω^ξ", "Ω^ο", "Ω^π", "Ω^ρ", "Ω^σ", "Ω^τ", "Ω^υ", "Ω^φ", "Ω^χ", "Ω^ψ", "Ω^ω", "Ω^Α", "Ω^Β", "Ω^Γ", "Ω^Δ", "Ω^Ε", "Ω^Ζ", "Ω^Η", "Ω^Θ", "Ω^Ι", "Ω^Κ", "Ω^Λ", "Ω^Μ", "Ω^Ν", "Ω^Ξ", "Ω^Ο", "Ω^Π", "Ω^Ρ", "Ω^Σ", "Ω^Τ", "Ω^Υ", "Ω^Φ", "Ω^Χ", "Ω^Ψ", "Ω^Ω", "Ωψ^α", "Ωψ^β", "Ωψ^γ", "Ωψ^δ", "Ωψ^ε", "Ωψ^ζ", "Ωψ^η", "Ωψ^θ", "Ωψ^ι", "Ωψ^κ", "Ωψ^λ", "Ωψ^μ", "Ωψ^ν", "Ωψ^ξ", "Ωψ^ο", "Ωψ^π", "Ωψ^ρ", "Ωψ^σ", "Ωψ^τ", "Ωψ^υ", "Ωψ^φ", "Ωψ^χ", "Ωψ^ψ", "Ωψ^ω", "Ωψ^Α", "Ωψ^Β", "Ωψ^Γ", "Ωψ^Δ", "Ωψ^Ε", "Ωψ^Ζ", "Ωψ^Η", "Ωψ^Θ", "Ωψ^Ι", "Ωψ^Κ", "Ωψ^Λ", "Ωψ^Μ", "Ωψ^Ν", "Ωψ^Ξ", "Ωψ^Ο", "Ωψ^Π", "Ωψ^Ρ", "Ωψ^Σ", "Ωψ^Τ", "Ωψ^Υ", "Ωψ^Φ", "Ωψ^Χ", "Ωψ^Ψ", "Ωψ^Ω", "Ωϝ^α", "Ωϝ^β", "Ωϝ^γ", "Ωϝ^δ", "Ωϝ^ε", "Ωϝ^ζ", "Ωϝ^η", "Ωϝ^θ", "Ωϝ^ι", "Ωϝ^κ", "Ωϝ^λ", "Ωϝ^μ", "Ωϝ^ν", "Ωϝ^ξ", "Ωϝ^ο", "Ωϝ^π", "Ωϝ^ρ", "Ωϝ^σ", "Ωϝ^τ", "Ωϝ^υ", "Ωϝ^φ", "Ωϝ^χ", "Ωϝ^ψ", "Ωϝ^ω", "Ωϝ^Α", "Ωϝ^Β", "Ωϝ^Γ", "Ωϝ^Δ", "Ωϝ^Ε", "Ωϝ^Ζ", "Ωϝ^Η", "Ωϝ^Θ", "Ωϝ^Ι", "Ωϝ^Κ", "Ωϝ^Λ", "Ωϝ^Μ", "Ωϝ^Ν", "Ωϝ^Ξ", "Ωϝ^Ο", "Ωϝ^Π", "Ωϝ^Ρ", "Ωϝ^Σ", "Ωϝ^Τ", "Ωϝ^Υ", "Ωϝ^Φ", "Ωϝ^Χ", "Ωϝ^Ψ", "Ωϝ^Ω", "Ωϛ^α", "Ωϛ^β", "Ωϛ^γ", "Ωϛ^δ", "Ωϛ^ε", "Ωϛ^ζ", "Ωϛ^η", "Ωϛ^θ", "Ωϛ^ι", "Ωϛ^κ", "Ωϛ^λ", "Ωϛ^μ", "Ωϛ^ν", "Ωϛ^ξ", "Ωϛ^ο", "Ωϛ^π", "Ωϛ^ρ", "Ωϛ^σ", "Ωϛ^τ", "Ωϛ^υ", "Ωϛ^φ", "Ωϛ^χ", "Ωϛ^ψ", "Ωϛ^ω", "Ωϛ^Α", "Ωϛ^Β", "Ωϛ^Γ", "Ωϛ^Δ", "Ωϛ^Ε", "Ωϛ^Ζ", "Ωϛ^Η", "Ωϛ^Θ", "Ωϛ^Ι", "Ωϛ^Κ", "Ωϛ^Λ", "Ωϛ^Μ", "Ωϛ^Ν", "Ωϛ^Ξ", "Ωϛ^Ο", "Ωϛ^Π", "Ωϛ^Ρ", "Ωϛ^Σ", "Ωϛ^Τ", "Ωϛ^Υ", "Ωϛ^Φ", "Ωϛ^Χ", "Ωϛ^Ψ", "Ωϛ^Ω", "Ωͱ^α", "Ωͱ^β", "Ωͱ^γ", "Ωͱ^δ", "Ωͱ^ε", "Ωͱ^ζ", "Ωͱ^η", "Ωͱ^θ", "Ωͱ^ι", "Ωͱ^κ", "Ωͱ^λ", "Ωͱ^μ", "Ωͱ^ν", "Ωͱ^ξ", "Ωͱ^ο", "Ωͱ^π", "Ωͱ^ρ", "Ωͱ^σ", "Ωͱ^τ", "Ωͱ^υ", "Ωͱ^φ", "Ωͱ^χ", "Ωͱ^ψ", "Ωͱ^ω", "Ωͱ^Α", "Ωͱ^Β", "Ωͱ^Γ", "Ωͱ^Δ", "Ωͱ^Ε", "Ωͱ^Ζ", "Ωͱ^Η", "Ωͱ^Θ", "Ωͱ^Ι", "Ωͱ^Κ", "Ωͱ^Λ", "Ωͱ^Μ", "Ωͱ^Ν", "Ωͱ^Ξ", "Ωͱ^Ο", "Ωͱ^Π", "Ωͱ^Ρ", "Ωͱ^Σ", "Ωͱ^Τ", "Ωͱ^Υ", "Ωͱ^Φ", "Ωͱ^Χ", "Ωͱ^Ψ", "Ωͱ^Ω", "Ωϻ^α", "Ωϻ^β", "Ωϻ^γ", "Ωϻ^δ", "Ωϻ^ε", "Ωϻ^ζ", "Ωϻ^η", "Ωϻ^θ", "Ωϻ^ι", "Ωϻ^κ", "Ωϻ^λ", "Ωϻ^μ", "Ωϻ^ν", "Ωϻ^ξ", "Ωϻ^ο", "Ωϻ^π", "Ωϻ^ρ", "Ωϻ^σ", "Ωϻ^τ", "Ωϻ^υ", "Ωϻ^φ", "Ωϻ^χ", "Ωϻ^ψ", "Ωϻ^ω", "Ωϻ^Α", "Ωϻ^Β", "Ωϻ^Γ", "Ωϻ^Δ", "Ωϻ^Ε", "Ωϻ^Ζ", "Ωϻ^Η", "Ωϻ^Θ", "Ωϻ^Ι", "Ωϻ^Κ", "Ωϻ^Λ", "Ωϻ^Μ", "Ωϻ^Ν", "Ωϻ^Ξ", "Ωϻ^Ο", "Ωϻ^Π", "Ωϻ^Ρ", "Ωϻ^Σ", "Ωϻ^Τ", "Ωϻ^Υ", "Ωϻ^Φ", "Ωϻ^Χ", "Ωϻ^Ψ", "Ωϻ^Ω", "Ωϙ^α", "Ωϙ^β", "Ωϙ^γ", "Ωϙ^δ", "Ωϙ^ε", "Ωϙ^ζ", "Ωϙ^η", "Ωϙ^θ", "Ωϙ^ι", "Ωϙ^κ", "Ωϙ^λ", "Ωϙ^μ", "Ωϙ^ν", "Ωϙ^ξ", "Ωϙ^ο", "Ωϙ^π", "Ωϙ^ρ", "Ωϙ^σ", "Ωϙ^τ", "Ωϙ^υ", "Ωϙ^φ", "Ωϙ^χ", "Ωϙ^ψ", "Ωϙ^ω", "Ωϙ^Α", "Ωϙ^Β", "Ωϙ^Γ", "Ωϙ^Δ", "Ωϙ^Ε", "Ωϙ^Ζ", "Ωϙ^Η", "Ωϙ^Θ", "Ωϙ^Ι", "Ωϙ^Κ", "Ωϙ^Λ", "Ωϙ^Μ", "Ωϙ^Ν", "Ωϙ^Ξ", "Ωϙ^Ο", "Ωϙ^Π", "Ωϙ^Ρ", "Ωϙ^Σ", "Ωϙ^Τ", "Ωϙ^Υ", "Ωϙ^Φ", "Ωϙ^Χ", "Ωϙ^Ψ", "Ωϙ^Ω", "Ωͳ^α", "Ωͳ^β", "Ωͳ^γ", "Ωͳ^δ", "Ωͳ^ε", "Ωͳ^ζ", "Ωͳ^η", "Ωͳ^θ", "Ωͳ^ι", "Ωͳ^κ", "Ωͳ^λ", "Ωͳ^μ", "Ωͳ^ν", "Ωͳ^ξ", "Ωͳ^ο", "Ωͳ^π", "Ωͳ^ρ", "Ωͳ^σ", "Ωͳ^τ", "Ωͳ^υ", "Ωͳ^φ", "Ωͳ^χ", "Ωͳ^ψ", "Ωͳ^ω", "Ωͳ^Α", "Ωͳ^Β", "Ωͳ^Γ", "Ωͳ^Δ", "Ωͳ^Ε", "Ωͳ^Ζ", "Ωͳ^Η", "Ωͳ^Θ", "Ωͳ^Ι", "Ωͳ^Κ", "Ωͳ^Λ", "Ωͳ^Μ", "Ωͳ^Ν", "Ωͳ^Ξ", "Ωͳ^Ο", "Ωͳ^Π", "Ωͳ^Ρ", "Ωͳ^Σ", "Ωͳ^Τ", "Ωͳ^Υ", "Ωͳ^Φ", "Ωͳ^Χ", "Ωͳ^Ψ", "Ωͳ^Ω", "Ωϸ^α", "Ωϸ^β", "Ωϸ^γ", "Ωϸ^δ", "Ωϸ^ε", "Ωϸ^ζ", "Ωϸ^η", "Ωϸ^θ", "Ωϸ^ι", "Ωϸ^κ", "Ωϸ^λ", "Ωϸ^μ", "Ωϸ^ν", "Ωϸ^ξ", "Ωϸ^ο", "Ωϸ^π", "Ωϸ^ρ", "Ωϸ^σ", "Ωϸ^τ", "Ωϸ^υ", "Ωϸ^φ", "Ωϸ^χ", "Ωϸ^ψ", "Ωϸ^ω", "Ωϸ^Α", "Ωϸ^Β", "Ωϸ^Γ", "Ωϸ^Δ", "Ωϸ^Ε", "Ωϸ^Ζ", "Ωϸ^Η", "Ωϸ^Θ", "Ωϸ^Ι", "Ωϸ^Κ", "Ωϸ^Λ", "Ωϸ^Μ", "Ωϸ^Ν", "Ωϸ^Ξ", "Ωϸ^Ο", "Ωϸ^Π", "Ωϸ^Ρ", "Ωϸ^Σ", "Ωϸ^Τ", "Ωϸ^Υ", "Ωϸ^Φ", "Ωϸ^Χ", "Ωϸ^Ψ", "Ωϸ^Ω"];
  var OmegaLayersHTML = ["&#945;", "&#946;", "&#947;", "&#948;", "&#949;", "&#950;", "&#951;", "&#952;", "&#953;", "&#954;", "&#955;", "&#956;", "&#957;", "&#958;", "&#959;", "&#960;", "&#961;", "&#963;", "&#964;", "&#965;", "&#966;", "&#967;", "&#968;", "&#969;", "&#913;", "&#914;", "&#915;", "&#916;", "&#917;", "&#918;", "&#919;", "&#920;", "&#921;", "&#922;", "&#923;", "&#924;", "&#925;", "&#926;", "&#927;", "&#928;", "&#929;", "&#931;", "&#932;", "&#933;", "&#934;", "&#935;", "&#936;", "&#937;", "&#937;<sup>&#945;</sup>", "&#937;<sup>&#946;</sup>", "&#937;<sup>&#947;</sup>", "&#937;<sup>&#948;</sup>", "&#937;<sup>&#949;</sup>", "&#937;<sup>&#950;</sup>", "&#937;<sup>&#951;</sup>", "&#937;<sup>&#952;</sup>", "&#937;<sup>&#953;</sup>", "&#937;<sup>&#954;</sup>", "&#937;<sup>&#955;</sup>", "&#937;<sup>&#956;</sup>", "&#937;<sup>&#957;</sup>", "&#937;<sup>&#958;</sup>", "&#937;<sup>&#959;</sup>", "&#937;<sup>&#960;</sup>", "&#937;<sup>&#961;</sup>", "&#937;<sup>&#963;</sup>", "&#937;<sup>&#964;</sup>", "&#937;<sup>&#965;</sup>", "&#937;<sup>&#966;</sup>", "&#937;<sup>&#967;</sup>", "&#937;<sup>&#968;</sup>", "&#937;<sup>&#969;</sup>", "&#937;<sup>&#913;</sup>", "&#937;<sup>&#914;</sup>", "&#937;<sup>&#915;</sup>", "&#937;<sup>&#916;</sup>", "&#937;<sup>&#917;</sup>", "&#937;<sup>&#918;</sup>", "&#937;<sup>&#919;</sup>", "&#937;<sup>&#920;</sup>", "&#937;<sup>&#921;</sup>", "&#937;<sup>&#922;</sup>", "&#937;<sup>&#923;</sup>", "&#937;<sup>&#924;</sup>", "&#937;<sup>&#925;</sup>", "&#937;<sup>&#926;</sup>", "&#937;<sup>&#927;</sup>", "&#937;<sup>&#928;</sup>", "&#937;<sup>&#929;</sup>", "&#937;<sup>&#931;</sup>", "&#937;<sup>&#932;</sup>", "&#937;<sup>&#933;</sup>", "&#937;<sup>&#934;</sup>", "&#937;<sup>&#935;</sup>", "&#937;<sup>&#936;</sup>", "&#937;<sup>&#937;</sup>", "&#937;<sub>&#968;</sub><sup>&#945;</sup>", "&#937;<sub>&#968;</sub><sup>&#946;</sup>", "&#937;<sub>&#968;</sub><sup>&#947;</sup>", "&#937;<sub>&#968;</sub><sup>&#948;</sup>", "&#937;<sub>&#968;</sub><sup>&#949;</sup>", "&#937;<sub>&#968;</sub><sup>&#950;</sup>", "&#937;<sub>&#968;</sub><sup>&#951;</sup>", "&#937;<sub>&#968;</sub><sup>&#952;</sup>", "&#937;<sub>&#968;</sub><sup>&#953;</sup>", "&#937;<sub>&#968;</sub><sup>&#954;</sup>", "&#937;<sub>&#968;</sub><sup>&#955;</sup>", "&#937;<sub>&#968;</sub><sup>&#956;</sup>", "&#937;<sub>&#968;</sub><sup>&#957;</sup>", "&#937;<sub>&#968;</sub><sup>&#958;</sup>", "&#937;<sub>&#968;</sub><sup>&#959;</sup>", "&#937;<sub>&#968;</sub><sup>&#960;</sup>", "&#937;<sub>&#968;</sub><sup>&#961;</sup>", "&#937;<sub>&#968;</sub><sup>&#963;</sup>", "&#937;<sub>&#968;</sub><sup>&#964;</sup>", "&#937;<sub>&#968;</sub><sup>&#965;</sup>", "&#937;<sub>&#968;</sub><sup>&#966;</sup>", "&#937;<sub>&#968;</sub><sup>&#967;</sup>", "&#937;<sub>&#968;</sub><sup>&#968;</sup>", "&#937;<sub>&#968;</sub><sup>&#969;</sup>", "&#937;<sub>&#968;</sub><sup>&#913;</sup>", "&#937;<sub>&#968;</sub><sup>&#914;</sup>", "&#937;<sub>&#968;</sub><sup>&#915;</sup>", "&#937;<sub>&#968;</sub><sup>&#916;</sup>", "&#937;<sub>&#968;</sub><sup>&#917;</sup>", "&#937;<sub>&#968;</sub><sup>&#918;</sup>", "&#937;<sub>&#968;</sub><sup>&#919;</sup>", "&#937;<sub>&#968;</sub><sup>&#920;</sup>", "&#937;<sub>&#968;</sub><sup>&#921;</sup>", "&#937;<sub>&#968;</sub><sup>&#922;</sup>", "&#937;<sub>&#968;</sub><sup>&#923;</sup>", "&#937;<sub>&#968;</sub><sup>&#924;</sup>", "&#937;<sub>&#968;</sub><sup>&#925;</sup>", "&#937;<sub>&#968;</sub><sup>&#926;</sup>", "&#937;<sub>&#968;</sub><sup>&#927;</sup>", "&#937;<sub>&#968;</sub><sup>&#928;</sup>", "&#937;<sub>&#968;</sub><sup>&#929;</sup>", "&#937;<sub>&#968;</sub><sup>&#931;</sup>", "&#937;<sub>&#968;</sub><sup>&#932;</sup>", "&#937;<sub>&#968;</sub><sup>&#933;</sup>", "&#937;<sub>&#968;</sub><sup>&#934;</sup>", "&#937;<sub>&#968;</sub><sup>&#935;</sup>", "&#937;<sub>&#968;</sub><sup>&#936;</sup>", "&#937;<sub>&#968;</sub><sup>&#937;</sup>", "&#937;<sub>&#989;</sub><sup>&#945;</sup>", "&#937;<sub>&#989;</sub><sup>&#946;</sup>", "&#937;<sub>&#989;</sub><sup>&#947;</sup>", "&#937;<sub>&#989;</sub><sup>&#948;</sup>", "&#937;<sub>&#989;</sub><sup>&#949;</sup>", "&#937;<sub>&#989;</sub><sup>&#950;</sup>", "&#937;<sub>&#989;</sub><sup>&#951;</sup>", "&#937;<sub>&#989;</sub><sup>&#952;</sup>", "&#937;<sub>&#989;</sub><sup>&#953;</sup>", "&#937;<sub>&#989;</sub><sup>&#954;</sup>", "&#937;<sub>&#989;</sub><sup>&#955;</sup>", "&#937;<sub>&#989;</sub><sup>&#956;</sup>", "&#937;<sub>&#989;</sub><sup>&#957;</sup>", "&#937;<sub>&#989;</sub><sup>&#958;</sup>", "&#937;<sub>&#989;</sub><sup>&#959;</sup>", "&#937;<sub>&#989;</sub><sup>&#960;</sup>", "&#937;<sub>&#989;</sub><sup>&#961;</sup>", "&#937;<sub>&#989;</sub><sup>&#963;</sup>", "&#937;<sub>&#989;</sub><sup>&#964;</sup>", "&#937;<sub>&#989;</sub><sup>&#965;</sup>", "&#937;<sub>&#989;</sub><sup>&#966;</sup>", "&#937;<sub>&#989;</sub><sup>&#967;</sup>", "&#937;<sub>&#989;</sub><sup>&#968;</sup>", "&#937;<sub>&#989;</sub><sup>&#969;</sup>", "&#937;<sub>&#989;</sub><sup>&#913;</sup>", "&#937;<sub>&#989;</sub><sup>&#914;</sup>", "&#937;<sub>&#989;</sub><sup>&#915;</sup>", "&#937;<sub>&#989;</sub><sup>&#916;</sup>", "&#937;<sub>&#989;</sub><sup>&#917;</sup>", "&#937;<sub>&#989;</sub><sup>&#918;</sup>", "&#937;<sub>&#989;</sub><sup>&#919;</sup>", "&#937;<sub>&#989;</sub><sup>&#920;</sup>", "&#937;<sub>&#989;</sub><sup>&#921;</sup>", "&#937;<sub>&#989;</sub><sup>&#922;</sup>", "&#937;<sub>&#989;</sub><sup>&#923;</sup>", "&#937;<sub>&#989;</sub><sup>&#924;</sup>", "&#937;<sub>&#989;</sub><sup>&#925;</sup>", "&#937;<sub>&#989;</sub><sup>&#926;</sup>", "&#937;<sub>&#989;</sub><sup>&#927;</sup>", "&#937;<sub>&#989;</sub><sup>&#928;</sup>", "&#937;<sub>&#989;</sub><sup>&#929;</sup>", "&#937;<sub>&#989;</sub><sup>&#931;</sup>", "&#937;<sub>&#989;</sub><sup>&#932;</sup>", "&#937;<sub>&#989;</sub><sup>&#933;</sup>", "&#937;<sub>&#989;</sub><sup>&#934;</sup>", "&#937;<sub>&#989;</sub><sup>&#935;</sup>", "&#937;<sub>&#989;</sub><sup>&#936;</sup>", "&#937;<sub>&#989;</sub><sup>&#937;</sup>", "&#937;<sub>&#987;</sub><sup>&#945;</sup>", "&#937;<sub>&#987;</sub><sup>&#946;</sup>", "&#937;<sub>&#987;</sub><sup>&#947;</sup>", "&#937;<sub>&#987;</sub><sup>&#948;</sup>", "&#937;<sub>&#987;</sub><sup>&#949;</sup>", "&#937;<sub>&#987;</sub><sup>&#950;</sup>", "&#937;<sub>&#987;</sub><sup>&#951;</sup>", "&#937;<sub>&#987;</sub><sup>&#952;</sup>", "&#937;<sub>&#987;</sub><sup>&#953;</sup>", "&#937;<sub>&#987;</sub><sup>&#954;</sup>", "&#937;<sub>&#987;</sub><sup>&#955;</sup>", "&#937;<sub>&#987;</sub><sup>&#956;</sup>", "&#937;<sub>&#987;</sub><sup>&#957;</sup>", "&#937;<sub>&#987;</sub><sup>&#958;</sup>", "&#937;<sub>&#987;</sub><sup>&#959;</sup>", "&#937;<sub>&#987;</sub><sup>&#960;</sup>", "&#937;<sub>&#987;</sub><sup>&#961;</sup>", "&#937;<sub>&#987;</sub><sup>&#963;</sup>", "&#937;<sub>&#987;</sub><sup>&#964;</sup>", "&#937;<sub>&#987;</sub><sup>&#965;</sup>", "&#937;<sub>&#987;</sub><sup>&#966;</sup>", "&#937;<sub>&#987;</sub><sup>&#967;</sup>", "&#937;<sub>&#987;</sub><sup>&#968;</sup>", "&#937;<sub>&#987;</sub><sup>&#969;</sup>", "&#937;<sub>&#987;</sub><sup>&#913;</sup>", "&#937;<sub>&#987;</sub><sup>&#914;</sup>", "&#937;<sub>&#987;</sub><sup>&#915;</sup>", "&#937;<sub>&#987;</sub><sup>&#916;</sup>", "&#937;<sub>&#987;</sub><sup>&#917;</sup>", "&#937;<sub>&#987;</sub><sup>&#918;</sup>", "&#937;<sub>&#987;</sub><sup>&#919;</sup>", "&#937;<sub>&#987;</sub><sup>&#920;</sup>", "&#937;<sub>&#987;</sub><sup>&#921;</sup>", "&#937;<sub>&#987;</sub><sup>&#922;</sup>", "&#937;<sub>&#987;</sub><sup>&#923;</sup>", "&#937;<sub>&#987;</sub><sup>&#924;</sup>", "&#937;<sub>&#987;</sub><sup>&#925;</sup>", "&#937;<sub>&#987;</sub><sup>&#926;</sup>", "&#937;<sub>&#987;</sub><sup>&#927;</sup>", "&#937;<sub>&#987;</sub><sup>&#928;</sup>", "&#937;<sub>&#987;</sub><sup>&#929;</sup>", "&#937;<sub>&#987;</sub><sup>&#931;</sup>", "&#937;<sub>&#987;</sub><sup>&#932;</sup>", "&#937;<sub>&#987;</sub><sup>&#933;</sup>", "&#937;<sub>&#987;</sub><sup>&#934;</sup>", "&#937;<sub>&#987;</sub><sup>&#935;</sup>", "&#937;<sub>&#987;</sub><sup>&#936;</sup>", "&#937;<sub>&#987;</sub><sup>&#937;</sup>", "&#937;<sub>&#881;</sub><sup>&#945;</sup>", "&#937;<sub>&#881;</sub><sup>&#946;</sup>", "&#937;<sub>&#881;</sub><sup>&#947;</sup>", "&#937;<sub>&#881;</sub><sup>&#948;</sup>", "&#937;<sub>&#881;</sub><sup>&#949;</sup>", "&#937;<sub>&#881;</sub><sup>&#950;</sup>", "&#937;<sub>&#881;</sub><sup>&#951;</sup>", "&#937;<sub>&#881;</sub><sup>&#952;</sup>", "&#937;<sub>&#881;</sub><sup>&#953;</sup>", "&#937;<sub>&#881;</sub><sup>&#954;</sup>", "&#937;<sub>&#881;</sub><sup>&#955;</sup>", "&#937;<sub>&#881;</sub><sup>&#956;</sup>", "&#937;<sub>&#881;</sub><sup>&#957;</sup>", "&#937;<sub>&#881;</sub><sup>&#958;</sup>", "&#937;<sub>&#881;</sub><sup>&#959;</sup>", "&#937;<sub>&#881;</sub><sup>&#960;</sup>", "&#937;<sub>&#881;</sub><sup>&#961;</sup>", "&#937;<sub>&#881;</sub><sup>&#963;</sup>", "&#937;<sub>&#881;</sub><sup>&#964;</sup>", "&#937;<sub>&#881;</sub><sup>&#965;</sup>", "&#937;<sub>&#881;</sub><sup>&#966;</sup>", "&#937;<sub>&#881;</sub><sup>&#967;</sup>", "&#937;<sub>&#881;</sub><sup>&#968;</sup>", "&#937;<sub>&#881;</sub><sup>&#969;</sup>", "&#937;<sub>&#881;</sub><sup>&#913;</sup>", "&#937;<sub>&#881;</sub><sup>&#914;</sup>", "&#937;<sub>&#881;</sub><sup>&#915;</sup>", "&#937;<sub>&#881;</sub><sup>&#916;</sup>", "&#937;<sub>&#881;</sub><sup>&#917;</sup>", "&#937;<sub>&#881;</sub><sup>&#918;</sup>", "&#937;<sub>&#881;</sub><sup>&#919;</sup>", "&#937;<sub>&#881;</sub><sup>&#920;</sup>", "&#937;<sub>&#881;</sub><sup>&#921;</sup>", "&#937;<sub>&#881;</sub><sup>&#922;</sup>", "&#937;<sub>&#881;</sub><sup>&#923;</sup>", "&#937;<sub>&#881;</sub><sup>&#924;</sup>", "&#937;<sub>&#881;</sub><sup>&#925;</sup>", "&#937;<sub>&#881;</sub><sup>&#926;</sup>", "&#937;<sub>&#881;</sub><sup>&#927;</sup>", "&#937;<sub>&#881;</sub><sup>&#928;</sup>", "&#937;<sub>&#881;</sub><sup>&#929;</sup>", "&#937;<sub>&#881;</sub><sup>&#931;</sup>", "&#937;<sub>&#881;</sub><sup>&#932;</sup>", "&#937;<sub>&#881;</sub><sup>&#933;</sup>", "&#937;<sub>&#881;</sub><sup>&#934;</sup>", "&#937;<sub>&#881;</sub><sup>&#935;</sup>", "&#937;<sub>&#881;</sub><sup>&#936;</sup>", "&#937;<sub>&#881;</sub><sup>&#937;</sup>", "&#937;<sub>&#1019;</sub><sup>&#945;</sup>", "&#937;<sub>&#1019;</sub><sup>&#946;</sup>", "&#937;<sub>&#1019;</sub><sup>&#947;</sup>", "&#937;<sub>&#1019;</sub><sup>&#948;</sup>", "&#937;<sub>&#1019;</sub><sup>&#949;</sup>", "&#937;<sub>&#1019;</sub><sup>&#950;</sup>", "&#937;<sub>&#1019;</sub><sup>&#951;</sup>", "&#937;<sub>&#1019;</sub><sup>&#952;</sup>", "&#937;<sub>&#1019;</sub><sup>&#953;</sup>", "&#937;<sub>&#1019;</sub><sup>&#954;</sup>", "&#937;<sub>&#1019;</sub><sup>&#955;</sup>", "&#937;<sub>&#1019;</sub><sup>&#956;</sup>", "&#937;<sub>&#1019;</sub><sup>&#957;</sup>", "&#937;<sub>&#1019;</sub><sup>&#958;</sup>", "&#937;<sub>&#1019;</sub><sup>&#959;</sup>", "&#937;<sub>&#1019;</sub><sup>&#960;</sup>", "&#937;<sub>&#1019;</sub><sup>&#961;</sup>", "&#937;<sub>&#1019;</sub><sup>&#963;</sup>", "&#937;<sub>&#1019;</sub><sup>&#964;</sup>", "&#937;<sub>&#1019;</sub><sup>&#965;</sup>", "&#937;<sub>&#1019;</sub><sup>&#966;</sup>", "&#937;<sub>&#1019;</sub><sup>&#967;</sup>", "&#937;<sub>&#1019;</sub><sup>&#968;</sup>", "&#937;<sub>&#1019;</sub><sup>&#969;</sup>", "&#937;<sub>&#1019;</sub><sup>&#913;</sup>", "&#937;<sub>&#1019;</sub><sup>&#914;</sup>", "&#937;<sub>&#1019;</sub><sup>&#915;</sup>", "&#937;<sub>&#1019;</sub><sup>&#916;</sup>", "&#937;<sub>&#1019;</sub><sup>&#917;</sup>", "&#937;<sub>&#1019;</sub><sup>&#918;</sup>", "&#937;<sub>&#1019;</sub><sup>&#919;</sup>", "&#937;<sub>&#1019;</sub><sup>&#920;</sup>", "&#937;<sub>&#1019;</sub><sup>&#921;</sup>", "&#937;<sub>&#1019;</sub><sup>&#922;</sup>", "&#937;<sub>&#1019;</sub><sup>&#923;</sup>", "&#937;<sub>&#1019;</sub><sup>&#924;</sup>", "&#937;<sub>&#1019;</sub><sup>&#925;</sup>", "&#937;<sub>&#1019;</sub><sup>&#926;</sup>", "&#937;<sub>&#1019;</sub><sup>&#927;</sup>", "&#937;<sub>&#1019;</sub><sup>&#928;</sup>", "&#937;<sub>&#1019;</sub><sup>&#929;</sup>", "&#937;<sub>&#1019;</sub><sup>&#931;</sup>", "&#937;<sub>&#1019;</sub><sup>&#932;</sup>", "&#937;<sub>&#1019;</sub><sup>&#933;</sup>", "&#937;<sub>&#1019;</sub><sup>&#934;</sup>", "&#937;<sub>&#1019;</sub><sup>&#935;</sup>", "&#937;<sub>&#1019;</sub><sup>&#936;</sup>", "&#937;<sub>&#1019;</sub><sup>&#937;</sup>", "&#937;<sub>&#985;</sub><sup>&#945;</sup>", "&#937;<sub>&#985;</sub><sup>&#946;</sup>", "&#937;<sub>&#985;</sub><sup>&#947;</sup>", "&#937;<sub>&#985;</sub><sup>&#948;</sup>", "&#937;<sub>&#985;</sub><sup>&#949;</sup>", "&#937;<sub>&#985;</sub><sup>&#950;</sup>", "&#937;<sub>&#985;</sub><sup>&#951;</sup>", "&#937;<sub>&#985;</sub><sup>&#952;</sup>", "&#937;<sub>&#985;</sub><sup>&#953;</sup>", "&#937;<sub>&#985;</sub><sup>&#954;</sup>", "&#937;<sub>&#985;</sub><sup>&#955;</sup>", "&#937;<sub>&#985;</sub><sup>&#956;</sup>", "&#937;<sub>&#985;</sub><sup>&#957;</sup>", "&#937;<sub>&#985;</sub><sup>&#958;</sup>", "&#937;<sub>&#985;</sub><sup>&#959;</sup>", "&#937;<sub>&#985;</sub><sup>&#960;</sup>", "&#937;<sub>&#985;</sub><sup>&#961;</sup>", "&#937;<sub>&#985;</sub><sup>&#963;</sup>", "&#937;<sub>&#985;</sub><sup>&#964;</sup>", "&#937;<sub>&#985;</sub><sup>&#965;</sup>", "&#937;<sub>&#985;</sub><sup>&#966;</sup>", "&#937;<sub>&#985;</sub><sup>&#967;</sup>", "&#937;<sub>&#985;</sub><sup>&#968;</sup>", "&#937;<sub>&#985;</sub><sup>&#969;</sup>", "&#937;<sub>&#985;</sub><sup>&#913;</sup>", "&#937;<sub>&#985;</sub><sup>&#914;</sup>", "&#937;<sub>&#985;</sub><sup>&#915;</sup>", "&#937;<sub>&#985;</sub><sup>&#916;</sup>", "&#937;<sub>&#985;</sub><sup>&#917;</sup>", "&#937;<sub>&#985;</sub><sup>&#918;</sup>", "&#937;<sub>&#985;</sub><sup>&#919;</sup>", "&#937;<sub>&#985;</sub><sup>&#920;</sup>", "&#937;<sub>&#985;</sub><sup>&#921;</sup>", "&#937;<sub>&#985;</sub><sup>&#922;</sup>", "&#937;<sub>&#985;</sub><sup>&#923;</sup>", "&#937;<sub>&#985;</sub><sup>&#924;</sup>", "&#937;<sub>&#985;</sub><sup>&#925;</sup>", "&#937;<sub>&#985;</sub><sup>&#926;</sup>", "&#937;<sub>&#985;</sub><sup>&#927;</sup>", "&#937;<sub>&#985;</sub><sup>&#928;</sup>", "&#937;<sub>&#985;</sub><sup>&#929;</sup>", "&#937;<sub>&#985;</sub><sup>&#931;</sup>", "&#937;<sub>&#985;</sub><sup>&#932;</sup>", "&#937;<sub>&#985;</sub><sup>&#933;</sup>", "&#937;<sub>&#985;</sub><sup>&#934;</sup>", "&#937;<sub>&#985;</sub><sup>&#935;</sup>", "&#937;<sub>&#985;</sub><sup>&#936;</sup>", "&#937;<sub>&#985;</sub><sup>&#937;</sup>", "&#937;<sub>&#883;</sub><sup>&#945;</sup>", "&#937;<sub>&#883;</sub><sup>&#946;</sup>", "&#937;<sub>&#883;</sub><sup>&#947;</sup>", "&#937;<sub>&#883;</sub><sup>&#948;</sup>", "&#937;<sub>&#883;</sub><sup>&#949;</sup>", "&#937;<sub>&#883;</sub><sup>&#950;</sup>", "&#937;<sub>&#883;</sub><sup>&#951;</sup>", "&#937;<sub>&#883;</sub><sup>&#952;</sup>", "&#937;<sub>&#883;</sub><sup>&#953;</sup>", "&#937;<sub>&#883;</sub><sup>&#954;</sup>", "&#937;<sub>&#883;</sub><sup>&#955;</sup>", "&#937;<sub>&#883;</sub><sup>&#956;</sup>", "&#937;<sub>&#883;</sub><sup>&#957;</sup>", "&#937;<sub>&#883;</sub><sup>&#958;</sup>", "&#937;<sub>&#883;</sub><sup>&#959;</sup>", "&#937;<sub>&#883;</sub><sup>&#960;</sup>", "&#937;<sub>&#883;</sub><sup>&#961;</sup>", "&#937;<sub>&#883;</sub><sup>&#963;</sup>", "&#937;<sub>&#883;</sub><sup>&#964;</sup>", "&#937;<sub>&#883;</sub><sup>&#965;</sup>", "&#937;<sub>&#883;</sub><sup>&#966;</sup>", "&#937;<sub>&#883;</sub><sup>&#967;</sup>", "&#937;<sub>&#883;</sub><sup>&#968;</sup>", "&#937;<sub>&#883;</sub><sup>&#969;</sup>", "&#937;<sub>&#883;</sub><sup>&#913;</sup>", "&#937;<sub>&#883;</sub><sup>&#914;</sup>", "&#937;<sub>&#883;</sub><sup>&#915;</sup>", "&#937;<sub>&#883;</sub><sup>&#916;</sup>", "&#937;<sub>&#883;</sub><sup>&#917;</sup>", "&#937;<sub>&#883;</sub><sup>&#918;</sup>", "&#937;<sub>&#883;</sub><sup>&#919;</sup>", "&#937;<sub>&#883;</sub><sup>&#920;</sup>", "&#937;<sub>&#883;</sub><sup>&#921;</sup>", "&#937;<sub>&#883;</sub><sup>&#922;</sup>", "&#937;<sub>&#883;</sub><sup>&#923;</sup>", "&#937;<sub>&#883;</sub><sup>&#924;</sup>", "&#937;<sub>&#883;</sub><sup>&#925;</sup>", "&#937;<sub>&#883;</sub><sup>&#926;</sup>", "&#937;<sub>&#883;</sub><sup>&#927;</sup>", "&#937;<sub>&#883;</sub><sup>&#928;</sup>", "&#937;<sub>&#883;</sub><sup>&#929;</sup>", "&#937;<sub>&#883;</sub><sup>&#931;</sup>", "&#937;<sub>&#883;</sub><sup>&#932;</sup>", "&#937;<sub>&#883;</sub><sup>&#933;</sup>", "&#937;<sub>&#883;</sub><sup>&#934;</sup>", "&#937;<sub>&#883;</sub><sup>&#935;</sup>", "&#937;<sub>&#883;</sub><sup>&#936;</sup>", "&#937;<sub>&#883;</sub><sup>&#937;</sup>", "&#937;<sub>&#1016;</sub><sup>&#945;</sup>", "&#937;<sub>&#1016;</sub><sup>&#946;</sup>", "&#937;<sub>&#1016;</sub><sup>&#947;</sup>", "&#937;<sub>&#1016;</sub><sup>&#948;</sup>", "&#937;<sub>&#1016;</sub><sup>&#949;</sup>", "&#937;<sub>&#1016;</sub><sup>&#950;</sup>", "&#937;<sub>&#1016;</sub><sup>&#951;</sup>", "&#937;<sub>&#1016;</sub><sup>&#952;</sup>", "&#937;<sub>&#1016;</sub><sup>&#953;</sup>", "&#937;<sub>&#1016;</sub><sup>&#954;</sup>", "&#937;<sub>&#1016;</sub><sup>&#955;</sup>", "&#937;<sub>&#1016;</sub><sup>&#956;</sup>", "&#937;<sub>&#1016;</sub><sup>&#957;</sup>", "&#937;<sub>&#1016;</sub><sup>&#958;</sup>", "&#937;<sub>&#1016;</sub><sup>&#959;</sup>", "&#937;<sub>&#1016;</sub><sup>&#960;</sup>", "&#937;<sub>&#1016;</sub><sup>&#961;</sup>", "&#937;<sub>&#1016;</sub><sup>&#963;</sup>", "&#937;<sub>&#1016;</sub><sup>&#964;</sup>", "&#937;<sub>&#1016;</sub><sup>&#965;</sup>", "&#937;<sub>&#1016;</sub><sup>&#966;</sup>", "&#937;<sub>&#1016;</sub><sup>&#967;</sup>", "&#937;<sub>&#1016;</sub><sup>&#968;</sup>", "&#937;<sub>&#1016;</sub><sup>&#969;</sup>", "&#937;<sub>&#1016;</sub><sup>&#913;</sup>", "&#937;<sub>&#1016;</sub><sup>&#914;</sup>", "&#937;<sub>&#1016;</sub><sup>&#915;</sup>", "&#937;<sub>&#1016;</sub><sup>&#916;</sup>", "&#937;<sub>&#1016;</sub><sup>&#917;</sup>", "&#937;<sub>&#1016;</sub><sup>&#918;</sup>", "&#937;<sub>&#1016;</sub><sup>&#919;</sup>", "&#937;<sub>&#1016;</sub><sup>&#920;</sup>", "&#937;<sub>&#1016;</sub><sup>&#921;</sup>", "&#937;<sub>&#1016;</sub><sup>&#922;</sup>", "&#937;<sub>&#1016;</sub><sup>&#923;</sup>", "&#937;<sub>&#1016;</sub><sup>&#924;</sup>", "&#937;<sub>&#1016;</sub><sup>&#925;</sup>", "&#937;<sub>&#1016;</sub><sup>&#926;</sup>", "&#937;<sub>&#1016;</sub><sup>&#927;</sup>", "&#937;<sub>&#1016;</sub><sup>&#928;</sup>", "&#937;<sub>&#1016;</sub><sup>&#929;</sup>", "&#937;<sub>&#1016;</sub><sup>&#931;</sup>", "&#937;<sub>&#1016;</sub><sup>&#932;</sup>", "&#937;<sub>&#1016;</sub><sup>&#933;</sup>", "&#937;<sub>&#1016;</sub><sup>&#934;</sup>", "&#937;<sub>&#1016;</sub><sup>&#935;</sup>", "&#937;<sub>&#1016;</sub><sup>&#936;</sup>", "&#937;<sub>&#1016;</sub><sup>&#937;</sup>"];
  var OmegaLayersBasePlain = new AlternateBaseNotation(OmegaLayersPlain, -1, 0, 0, 0, Math.pow(480, 4), 1, 3, 1, 1, -1, true, 1, ["↑"], ".", [["↑↑", ""], [false, ""], ["↑↑↑", ""], [false, ""]]);
  var OmegaLayersBaseHTML = new AlternateBaseNotation(OmegaLayersHTML, -1, 0, 0, 0, Math.pow(480, 4), 1, 3, 1, 1, -1, true, 1, ["&#8593;"], ".", [["&#8593;&#8593;", ""], [false, ""], ["&#8593;&#8593;&#8593;", ""], [false, ""]]);
  Presets.OmegaLayers = new PrestigeLayerNotation(24, 1e24, false, [[3, 1.1, 1.1], [8, 1, 1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(function (value) {
    return value.plus(1);
  }, OmegaLayersBasePlain, function (value) {
    return value;
  })).setName("Omega Layers");
  Presets.OmegaLayersRamped = new PrestigeLayerNotation(24, 1e24, false, [[1, 1.1, 1.1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(function (value) {
    return value.plus(1);
  }, OmegaLayersBasePlain, function (value) {
    return value;
  })).setName("Omega Layers (Ramped)");
  Presets.OmegaLayerNumber = _construct(FractionNotation, [-1e-6, true].concat(_arrayWithoutHoles([,,,,,]), [[[" (", ")"], ["/(", ")"], ["", ""]], 1, OmegaLayersBasePlain])).setName("Omega Layer Number");
  HTMLPresets.OmegaLayers = new PrestigeLayerNotation(24, 1e24, false, [[3, 1.1, 1.1], [8, 1, 1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(function (value) {
    return value.plus(1);
  }, OmegaLayersBaseHTML, function (value) {
    return value;
  })).setName("Omega Layers");
  HTMLPresets.OmegaLayersRamped = new PrestigeLayerNotation(24, 1e24, false, [[1, 1.1, 1.1]], [" ", ""], false, true, new DefaultNotation(), new AppliedFunctionNotation(function (value) {
    return value.plus(1);
  }, OmegaLayersBaseHTML, function (value) {
    return value;
  })).setName("Omega Layers (Ramped)");
  HTMLPresets.OmegaLayerNumber = _construct(FractionNotation, [-1e-6, true].concat(_arrayWithoutHoles([,,,,,]), [[[" (", ")"], ["/(", ")"], ["", ""]], 1, OmegaLayersBaseHTML])).setName("Omega Layer Number");
  Presets.IncreasingOperator = new IncreasingOperatorNotation(10, [10, Infinity, Infinity, 0, Infinity, 0]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator");
  HTMLPresets.IncreasingOperator = new IncreasingOperatorNotation(10, [10, Infinity, Infinity, 0, Infinity, 0]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator");
  Presets.IncreasingOperatorBase2 = new IncreasingOperatorNotation(2, [2, Decimal__default["default"].dInf, Decimal__default["default"].dInf, 0, Decimal__default["default"].dInf, 0], [[["2 + ", ""], ["2 + ", ""], [" + ", ""], ["2 * ", ""]], [["2 * ", ""], ["2 * ", ""], [" * ", ""], ["2^", ""]], [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]], [["2^", ""], ["2^", ""], [" ", ""], ["(2^)^", ""]], [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]], [["2^^", ""], ["2^^", ""], [" ", ""], ["(2^^)^", ""]]], [[2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2]]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 2)");
  HTMLPresets.IncreasingOperatorBase2 = new IncreasingOperatorNotation(2, [2, Decimal__default["default"].dInf, Decimal__default["default"].dInf, 0, Decimal__default["default"].dInf, 0], [[["2 + ", ""], ["2 + ", ""], [" + ", ""], ["2 * ", ""]], [["2 * ", ""], ["2 * ", ""], [" * ", ""], ["2^", ""]], [["", "^2"], ["(", ")^2"], ["", ""], ["^2^", ""]], [["2^", ""], ["2^", ""], [" ", ""], ["(2^)^", ""]], [["", "^^2"], ["(", ")^^2"], ["", ""], [" (^^2)^", ""]], [["2^^", ""], ["2^^", ""], [" ", ""], ["(2^^)^", ""]]], [[2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2], [2, true, 4, 2, 2]]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 2)");
  Presets.IncreasingOperatorBase3 = new IncreasingOperatorNotation([3, 3, 3, 3, 3, 3], [3, Decimal__default["default"].dInf, Decimal__default["default"].dInf, 0, Decimal__default["default"].dInf, 0], [[["3 + ", ""], ["3 + ", ""], [" + ", ""], ["3 * ", ""]], [["3 * ", ""], ["3 * ", ""], [" * ", ""], ["3^", ""]], [["", "^3"], ["(", ")^3"], ["", ""], ["^3^", ""]], [["3^", ""], ["3^", ""], [" ", ""], ["(3^)^", ""]], [["", "^^3"], ["(", ")^^3"], ["", ""], [" (^^3)^", ""]], [["3^^", ""], ["3^^", ""], [" ", ""], ["(3^^)^", ""]]], [[3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2]]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 3)");
  HTMLPresets.IncreasingOperatorBase3 = new IncreasingOperatorNotation([3, 3, 3, 3, 3, 3], [3, Decimal__default["default"].dInf, Decimal__default["default"].dInf, 0, Decimal__default["default"].dInf, 0], [[["3 + ", ""], ["3 + ", ""], [" + ", ""], ["3 * ", ""]], [["3 * ", ""], ["3 * ", ""], [" * ", ""], ["3^", ""]], [["", "^3"], ["(", ")^3"], ["", ""], ["^3^", ""]], [["3^", ""], ["3^", ""], [" ", ""], ["(3^)^", ""]], [["", "^^3"], ["(", ")^^3"], ["", ""], [" (^^3)^", ""]], [["3^^", ""], ["3^^", ""], [" ", ""], ["(3^^)^", ""]]], [[3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2], [3, true, 4, 3, 2]]).setNotationGlobals(["-(", ")"]).setName("Increasing Operator (Base 3)");
  Presets.Omega = new IncreasingOperatorNotation(8000, [8000, Infinity, Infinity, 0, Infinity, 0], [[["ω^", ""], ["ω^", ""], ["", ""], ["ω(", ")^"]], [["ω(", ")"], ["ω(", ")"], ["(", ")"], ["ω[", "]"]], [["", ""], ["", ""], ["", ""], ["", ""]], [["ω[", "]"], ["ω[", "]"], ["[", "]"], ["ω{", "}"]]], [[0, 8000, 3, 10, 5], [0, 8000, 0, 100, 5]], null, null, undefined, [[0, "β<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [1000, "ζ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [2000, "λ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [3000, "ψ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [4000, "Σ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [5000, "Θ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [6000, "Ψ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [7000, "ω<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)]], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["Ʊ(", ")"]).setName("Omega");
  HTMLPresets.Omega = new IncreasingOperatorNotation(8000, [8000, Infinity, Infinity, 0, Infinity, 0], [[["&omega;^", ""], ["&omega;^", ""], ["", ""], ["&omega;(", ")^"]], [["&omega;(", ")"], ["&omega;(", ")"], ["(", ")"], ["&omega;[", "]"]], [["", ""], ["", ""], ["", ""], ["", ""]], [["&omega;[", "]"], ["&omega;[", "]"], ["[", "]"], ["&omega;{", "}"]]], [[0, 8000, 3, 10, 5], [0, 8000, 0, 100, 5]], null, null, undefined, [[0, "&beta;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [1000, "&zeta;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [2000, "&lambda;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [3000, "&psi;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [4000, "&Sigma;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [5000, "&Theta;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [6000, "&Psi;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [7000, "&omega;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)]], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["&#433;(", ")"]).setName("Omega");
  Presets.OmegaShort = new IncreasingOperatorNotation(8000, [8000, Infinity, Infinity, 0, Infinity, 0], [[["ω^", ""], ["ω^", ""], ["", ""], ["ω(", ")^"]], [["ω(", ")"], ["ω(", ")"], ["(", ")"], ["ω[", "]"]], [["", ""], ["", ""], ["", ""], ["", ""]], [["ω[", "]"], ["ω[", "]"], ["[", "]"], ["ω{", "}"]], [["", ""], ["", ""], ["", ""], ["", ""]], [["ω{", "}"], ["ω{", "}"], ["[", "]"], ["ω{{", "}}"]]], [[0, 8000, 2, 10, 1], [0, 8000, 0, 100, 1], [0, 8000, 0, 100, 1], [0, 8000, 0, 100, 5]], null, null, undefined, [[0, "β<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [1000, "ζ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [2000, "λ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [3000, "ψ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [4000, "Σ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [5000, "Θ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [6000, "Ψ<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [7000, "ω<", ">", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)]], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["Ʊ(", ")"]).setName("Omega (Short)");
  HTMLPresets.OmegaShort = new IncreasingOperatorNotation(8000, [8000, Infinity, Infinity, 0, Infinity, 0], [[["&omega;^", ""], ["&omega;^", ""], ["", ""], ["&omega;(", ")^"]], [["&omega;(", ")"], ["&omega;(", ")"], ["(", ")"], ["&omega;[", "]"]], [["", ""], ["", ""], ["", ""], ["", ""]], [["&omega;[", "]"], ["&omega;[", "]"], ["[", "]"], ["&omega;{", "}"]], [["", ""], ["", ""], ["", ""], ["", ""]], [["&omega;{", "}"], ["&omega;{", "}"], ["[", "]"], ["&omega;{{", "}}"]]], [[0, 8000, 2, 10, 1], [0, 8000, 0, 100, 1], [0, 8000, 0, 100, 1], [0, 8000, 0, 100, 5]], null, null, undefined, [[0, "&beta;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [1000, "&zeta;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [2000, "&lambda;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [3000, "&psi;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [4000, "&Sigma;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [5000, "&Theta;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [6000, "&Psi;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)], [7000, "&omega;<sub>", "</sub>", "", "", function (value) {
    return true;
  }, new DefaultNotation(0, 0)]], undefined, [], undefined, new DefaultNotation(0, 0), new DefaultNotation(0, 0), 1, ["&#433;(", ")"]).setName("Omega (Short)");
  var Fours = new IncreasingOperatorNotation([16, 4, 2, 4, 2, 4], [16, 1024, 0, Infinity, Infinity, Infinity], [[["", "+4×4"], ["", "+4×4"], ["", "+"], ["4×4×", ""]], [["", ""], ["", ""], ["", ""], ["", ""]], [["", ""], ["", ""], ["", ""], ["^", ""]], [["4^", ""], ["4^", ""], ["", ""], ["", ""]], [["", ""], ["", ""], ["", ""], ["^^", ""]], [["4^^", ""], ["4^^", ""], ["", ""], ["", ""]]], [[0, 16, 1, 0, 2], [0, 0, 0, 0, 0], [0, 1024, 0, 0, 0], [0, Infinity, 3, 0, 0], [0, Math.pow(4, 16), 0, 0, 0], [0, Infinity, 3, 0, 0]], [true, 2, 256], [false, 1, Math.pow(4, 16)], [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]], [[0, "4-4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [1, "4÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [2, "√4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [3, "4-4÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [4, "4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [5, "4+4÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [6, "4!÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [7, "(4!+4)÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [8, "4+4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [9, "4+4+4÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [10, "4!÷4+4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [11, "44÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [12, "4!÷√4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [13, "44÷4+√4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [14, "4×4-√4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()], [15, "4×4-4÷4", "", "", "", function (value) {
    return false;
  }, new DefaultNotation()]], [false, false, false, false, false, false], [[["", "", false], ["", "", false], ["(", ")", false]], [["", "", false], ["", "", false], ["", "", false]], [["", "", false], ["(", ")", false], ["(", ")", false]], [["(", ")", false], ["", "", false], ["", "", false]], [["", "", false], ["(", ")", false], ["(", ")", false]], [["(", ")", false], ["", "", false], ["", "", false]]], [[function (value) {
    return value.floor().neq(0);
  }, function (value) {
    return value.floor().neq(0);
  }, ["", "4×4"], ["", "4×4"]]], new DefaultNotation(), new DefaultNotation(), 1, ["(4÷4)÷(", ")"]);
  Presets.Fours = new ConditionalNotation(false, [new AppliedFunctionNotation(function (value) {
    return Decimal__default["default"].div(4, value);
  }, Fours, function (str) {
    return "4÷(" + str + ")";
  }), function (value) {
    return value.abs().lt(1) && value.neq(0);
  }], [Fours, function (value) {
    return true;
  }]).setNotationGlobals(["-(", ")"]).setName("Fours");
  HTMLPresets.Fours = new ConditionalNotation(false, [new AppliedFunctionNotation(function (value) {
    return Decimal__default["default"].div(4, value);
  }, Fours, function (str) {
    return "4÷(" + str + ")";
  }), function (value) {
    return value.abs().lt(1) && value.neq(0);
  }], [Fours, function (value) {
    return true;
  }]).setNotationGlobals(["-(", ")"]).setName("Fours");
  Presets.Triangular = new PolygonalNotation(3, [["△", ""], ["△(", ")"], ["△△", ""], ["△△(", ")"], ["△△△", ""], ["△△△(", ")"]], 26796).setName("Triangular");
  HTMLPresets.Triangular = new PolygonalNotation(3, [["&#x25B3;", ""], ["&#x25B3;(", ")"], ["&#x25B3;&#x25B3;", ""], ["&#x25B3;&#x25B3;(", ")"], ["&#x25B3;&#x25B3;&#x25B3;", ""], ["&#x25B3;&#x25B3;&#x25B3;(", ")"]], 26796).setName("Triangular");
  Presets.Square = new PolygonalNotation(4, [["□", ""], ["□(", ")"], ["□□", ""], ["□□(", ")"], ["□□□", ""], ["□□□(", ")"]], 65536).setName("Square");
  HTMLPresets.Square = new PolygonalNotation(4, [["□", ""], ["□(", ")"], ["□□", ""], ["□□(", ")"], ["□□□", ""], ["□□□(", ")"]], 65536).setName("Square");
  Presets.DoubleFactorials = new DoubleFactorialsNotation().setName("Double Factorials");
  HTMLPresets.DoubleFactorials = new DoubleFactorialsNotation().setName("Double Factorials");
  Presets.Grid = _construct(GridNotation, _arrayWithoutHoles([,,,,,,,,]).concat([" || "])).setName("Grid");
  HTMLPresets.Grid = _construct(GridNotation, _arrayWithoutHoles([,,]).concat([["&#x25A1;", "&#x25A0;"], ["", "&nbsp;&nbsp;&nbsp;", "&#x25C7;"], undefined, "<br>", "", "<br>", "<br><br>"])).setName("Grid");
  var tetrationFloat = _construct(HypersplitNotation, [[["", ""], ["", ""], ["", ""], ["", ""]], 2, [2, 1024, 512], [1, 1, 1, 1], 0].concat(_arrayWithoutHoles([,,,]), [[new AppliedFunctionNotation(undefined, _construct(GridNotation, [11, 1, ["0", "1"], undefined, true, ""].concat(_arrayWithoutHoles([,,,,]), [[true, true, true]])), function (str) {
    return str.slice(1);
  }), _construct(GridNotation, [10, 1, ["0", "1"], undefined, false, ""].concat(_arrayWithoutHoles([,,,,]), [[true, true, true]])), _construct(GridNotation, [9, 1, ["0", "1"], undefined, false, ""].concat(_arrayWithoutHoles([,,,,]), [[true, true, true]])), new DefaultNotation()]]));
  Presets.TetrationFloat = new ConditionalNotation(true, [new PredeterminedNotation("01111111111100000000000000000000"), function (value) {
    return value.eq(0);
  }], [new PredeterminedNotation("00111111111100000000000000000000"), function (value) {
    return value.eq(Infinity);
  }], [new PredeterminedNotation("10111111111100000000000000000000"), function (value) {
    return value.eq(-Infinity);
  }], [new PredeterminedNotation("00111111111101010101010101010101"), function (value) {
    return !value.isFinite();
  }], [new AppliedFunctionNotation(function (value) {
    return value;
  }, tetrationFloat, function (str) {
    return "00" + str;
  }), function (value) {
    return value.gte(1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.neg();
  }, tetrationFloat, function (str) {
    return "10" + str;
  }), function (value) {
    return value.lte(-1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.recip();
  }, tetrationFloat, function (str) {
    return "01" + str;
  }), function (value) {
    return value.lt(1) && value.gt(0);
  }], [new AppliedFunctionNotation(function (value) {
    return value.neg().recip();
  }, tetrationFloat, function (str) {
    return "11" + str;
  }), function (value) {
    return value.gt(-1) && value.lt(0);
  }]).setName("Tetration Float");
  HTMLPresets.TetrationFloat = new ConditionalNotation(true, [new PredeterminedNotation("01111111111100000000000000000000"), function (value) {
    return value.eq(0);
  }], [new PredeterminedNotation("00111111111100000000000000000000"), function (value) {
    return value.eq(Infinity);
  }], [new PredeterminedNotation("10111111111100000000000000000000"), function (value) {
    return value.eq(-Infinity);
  }], [new PredeterminedNotation("00111111111101010101010101010101"), function (value) {
    return !value.isFinite();
  }], [new AppliedFunctionNotation(function (value) {
    return value;
  }, tetrationFloat, function (str) {
    return "00" + str;
  }), function (value) {
    return value.gte(1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.neg();
  }, tetrationFloat, function (str) {
    return "10" + str;
  }), function (value) {
    return value.lte(-1);
  }], [new AppliedFunctionNotation(function (value) {
    return value.recip();
  }, tetrationFloat, function (str) {
    return "01" + str;
  }), function (value) {
    return value.lt(1) && value.gt(0);
  }], [new AppliedFunctionNotation(function (value) {
    return value.neg().recip();
  }, tetrationFloat, function (str) {
    return "11" + str;
  }), function (value) {
    return value.gt(-1) && value.lt(0);
  }]).setName("Tetration Float");
  Presets.Polynomial = function (value) {
    return _construct(PolynomialNotation, [value].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,,]), [["^", ""], ["", ""], 0], _arrayWithoutHoles([,,,,,,,]), [defaultRound])).setName("Polynomial (x = " + new DefaultNotation().format(value) + ")");
  };
  HTMLPresets.Polynomial = function (value) {
    return _construct(PolynomialNotation, [value].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,,,,,,,,,,,,]), [defaultRound])).setName("Polynomial (x = " + new DefaultNotation().format(value) + ")");
  };
  Presets.RationalFunction = function (value) {
    return _construct(FractionNotation, [-1e-6].concat(_arrayWithoutHoles([,,,,,,]), [[["(", ")"], [" / (", ")"], ["", " "]], 1, _construct(PolynomialNotation, [value].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,,]), [["^", ""], ["", ""], 0], _arrayWithoutHoles([,,,,,,,]), [defaultRound]))])).setName("Rational Function (x = " + new DefaultNotation().format(value) + ")");
  };
  HTMLPresets.RationalFunction = function (value) {
    return _construct(FractionNotation, [-1e-6].concat(_arrayWithoutHoles([,,,,,,]), [[["(", ")"], [" / (", ")"], ["", " "]], 1, _construct(PolynomialNotation, [value].concat(_arrayWithoutHoles([,,,,,,,,,,,,,,,,,,,,,,,,,]), [defaultRound]))])).setName("Rational Function (x = " + new DefaultNotation().format(value) + ")").setName("Rational Function (x = " + new DefaultNotation().format(value) + ")");
  };
  Presets.BaseThreeHalves = _construct(ExpandedDefaultNotation, [Math.pow(1.5, 39), 1, 5, 1.5].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [1.5, 0, -Infinity, false, 39, "", Math.pow(1.5, 39), Math.pow(1.5, 39), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base 1.5");
  Presets.BasePhi = _construct(ExpandedDefaultNotation, [Math.pow(1.618033988749895, 30), 1, 5, 1.618033988749895].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [1.618033988749895, 0, -Infinity, false, 39, "", Math.pow(1.618033988749895, 30), Math.pow(1.618033988749895, 30), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base phi");
  Presets.BaseE = _construct(ExpandedDefaultNotation, [Math.pow(2.718281828459045, 21), 1, 5, 2.718281828459045].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [2.718281828459045, 0, -Infinity, false, 39, "", Math.pow(2.718281828459045, 21), Math.pow(2.718281828459045, 21), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base e");
  Presets.BasePi = _construct(ExpandedDefaultNotation, [Math.pow(3.141592653589793, 20), 1, 5, 3.141592653589793].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [3.141592653589793, 0, -Infinity, false, 39, "", Math.pow(3.141592653589793, 20), Math.pow(3.141592653589793, 20), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base pi");
  HTMLPresets.BaseThreeHalves = _construct(ExpandedDefaultNotation, [Math.pow(1.5, 39), 1, 5, 1.5].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [1.5, 0, -Infinity, false, 39, "", Math.pow(1.5, 39), Math.pow(1.5, 39), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base 1.5");
  HTMLPresets.BasePhi = _construct(ExpandedDefaultNotation, [Math.pow(1.618033988749895, 30), 1, 5, 1.618033988749895].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [1.618033988749895, 0, -Infinity, false, 39, "", Math.pow(1.618033988749895, 30), Math.pow(1.618033988749895, 30), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base phi");
  HTMLPresets.BaseE = _construct(ExpandedDefaultNotation, [Math.pow(2.718281828459045, 21), 1, 5, 2.718281828459045].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [2.718281828459045, 0, -Infinity, false, 39, "", Math.pow(2.718281828459045, 21), Math.pow(2.718281828459045, 21), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base e");
  HTMLPresets.BasePi = _construct(ExpandedDefaultNotation, [Math.pow(3.141592653589793, 20), 1, 5, 3.141592653589793].concat(_arrayWithoutHoles([,,,,,,,,,,,]), [_construct(PolynomialNotation, [3.141592653589793, 0, -Infinity, false, 39, "", Math.pow(3.141592653589793, 20), Math.pow(3.141592653589793, 20), 5, 1, undefined, "", "", "", ""].concat(_arrayWithoutHoles([,,,,]), [[true, true]], _arrayWithoutHoles([,,,]), ["-", ["", "."]]))])).setName("Base pi");
  Presets.Blind = new PredeterminedNotation("").setName("Blind");
  Presets.PowersOfOne = new AppliedFunctionNotation(function (value) {
    return Decimal__default["default"].pow(1, value);
  }, new DefaultNotation(), function (str) {
    return str;
  }).setName("Powers of One");
  HTMLPresets.Blind = new PredeterminedNotation("").setName("Blind");
  HTMLPresets.PowersOfOne = new AppliedFunctionNotation(function (value) {
    return Decimal__default["default"].pow(1, value);
  }, new DefaultNotation(), function (str) {
    return str;
  }).setName("Powers of One");

  exports.AlternateBaseNotation = AlternateBaseNotation;
  exports.AppliedFunctionNotation = AppliedFunctionNotation;
  exports.BaseConvert = BaseConvert;
  exports.ConditionalNotation = ConditionalNotation;
  exports.CustomNotation = CustomNotation;
  exports.DefaultNotation = DefaultNotation;
  exports.DoubleFactorialsNotation = DoubleFactorialsNotation;
  exports.ExpandedDefaultNotation = ExpandedDefaultNotation;
  exports.FactoradicConvert = FactoradicConvert;
  exports.FactoradicNotation = FactoradicNotation;
  exports.FactorialAmountNotation = FactorialAmountNotation;
  exports.FactorialHyperscientificIterationsNotation = FactorialHyperscientificIterationsNotation;
  exports.FactorialHyperscientificNotation = FactorialHyperscientificNotation;
  exports.FactorialNotation = FactorialNotation;
  exports.FactorialScientificIterationsNotation = FactorialScientificIterationsNotation;
  exports.FactorialScientificNotation = FactorialScientificNotation;
  exports.FractionNotation = FractionNotation;
  exports.GridNotation = GridNotation;
  exports.HTMLPresets = HTMLPresets;
  exports.HyperSINotation = HyperSINotation;
  exports.HyperscientificIterationsNotation = HyperscientificIterationsNotation;
  exports.HyperscientificNotation = HyperscientificNotation;
  exports.HypersplitNotation = HypersplitNotation;
  exports.IncreasingOperatorNotation = IncreasingOperatorNotation;
  exports.IncreasingRootNotation = IncreasingRootNotation;
  exports.IncreasingSuperRootNotation = IncreasingSuperRootNotation;
  exports.LetterDigitsNotation = LetterDigitsNotation;
  exports.LettersNotation = LettersNotation;
  exports.LogarithmNotation = LogarithmNotation;
  exports.MultiFactorialAmountNotation = MultiFactorialAmountNotation;
  exports.MultiFactorialNotation = MultiFactorialNotation;
  exports.MultiLogarithmNotation = MultiLogarithmNotation;
  exports.MultiRootNotation = MultiRootNotation;
  exports.MultiSuperLogarithmNotation = MultiSuperLogarithmNotation;
  exports.MultiSuperRootNotation = MultiSuperRootNotation;
  exports.MyriadNotation = MyriadNotation;
  exports.NestedHyperSINotation = NestedHyperSINotation;
  exports.NestedSINotation = NestedSINotation;
  exports.NestedSignValueNotation = NestedSignValueNotation;
  exports.Notation = Notation;
  exports.PolygonalNotation = PolygonalNotation;
  exports.PolynomialNotation = PolynomialNotation;
  exports.PredeterminedNotation = PredeterminedNotation;
  exports.Presets = Presets;
  exports.PrestigeLayerNotation = PrestigeLayerNotation;
  exports.PrimeNotation = PrimeNotation;
  exports.PsiDashNotation = PsiDashNotation;
  exports.RootNotation = RootNotation;
  exports.SINotation = SINotation;
  exports.ScientificIterationsNotation = ScientificIterationsNotation;
  exports.ScientificNotation = ScientificNotation;
  exports.SignValueNotation = SignValueNotation;
  exports.StandardNotation = StandardNotation;
  exports.SuperLogarithmNotation = SuperLogarithmNotation;
  exports.SuperRootNotation = SuperRootNotation;
  exports.biPolygon = biPolygon;
  exports.biPolygonRoot = biPolygonRoot;
  exports.commasAndDecimals = commasAndDecimals;
  exports.factorial_hyperscientifify = factorial_hyperscientifify;
  exports.factorial_scientifify = factorial_scientifify;
  exports.factorial_slog = factorial_slog;
  exports.fractionApproximation = fractionApproximation;
  exports.fractionApproximationD = fractionApproximationD;
  exports.hyperscientifify = hyperscientifify;
  exports.hypersplit = hypersplit;
  exports.inverse_factorial = inverse_factorial;
  exports.iteratedBiPolygonRoot = iteratedBiPolygonRoot;
  exports.iteratedPolygonRoot = iteratedPolygonRoot;
  exports.iteratedfactorial = iteratedfactorial;
  exports.multabs = multabs;
  exports.physicalScale = physicalScale;
  exports.polygon = polygon;
  exports.polygonLog = polygonLog;
  exports.polygonRoot = polygonRoot;
  exports.primeFactorize = primeFactorize;
  exports.primeFactorizeFraction = primeFactorizeFraction;
  exports.scientifify = scientifify;
  exports.toDecimal = toDecimal;
  exports.triPolygon = triPolygon;
  exports.triPolygonRoot = triPolygonRoot;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
