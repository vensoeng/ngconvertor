(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    var api = factory();
    root.NGConvertor = api;
    root.ngConvertor = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  // Digit conversion constants
  const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Text conversion constants
  var DIGITS = [
    "សូន្យ",
    "មួយ",
    "ពីរ",
    "បី",
    "បួន",
    "ប្រាំ",
    "ប្រាំមួយ",
    "ប្រាំពីរ",
    "ប្រាំបី",
    "ប្រាំបួន"
  ];

  var TENS = {
    2: "ម្ភៃ",
    3: "សាមសិប",
    4: "សែសិប",
    5: "ហាសិប",
    6: "ហុកសិប",
    7: "ចិតសិប",
    8: "ប៉ែតសិប",
    9: "កៅសិប"
  };

  var LARGE_SCALES = ["", "លាន", "ប៊ីលាន", "ទ្រីលាន", "ក្វាទ្រីលាន"];

  // Digit conversion functions
  function toKhmer(input) {
    if (input === null || input === undefined) return '';
    return String(input).replace(/[0-9]/g, function (d) {
      return KHMER_DIGITS[parseInt(d, 10)];
    });
  }

  function toEnglish(input) {
    if (input === null || input === undefined) return '';
    return String(input).replace(/[០-៩]/g, function (d) {
      var index = KHMER_DIGITS.indexOf(d);
      return index !== -1 ? ENGLISH_DIGITS[index] : d;
    });
  }

  function convertDigits(input) {
    if (input === null || input === undefined) return '';
    var str = String(input);
    return /[០-៩]/.test(str) ? toEnglish(str) : toKhmer(str);
  }

  function isKhmer(input) {
    if (input === null || input === undefined) return false;
    return /^[\s០-៩]+$/.test(String(input));
  }

  function isEnglish(input) {
    if (input === null || input === undefined) return false;
    return /^[\s0-9]+$/.test(String(input));
  }

  // Text conversion functions
  function sanitizeNumericString(value) {
    var normalized = String(value).replace(/[,_\s]/g, "").trim();

    if (!/^[-+]?\d+(\.\d+)?$/.test(normalized)) {
      throw new Error("NGConvertor only accepts plain numbers, numeric strings, or bigint values.");
    }

    return normalized;
  }

  function groupBySix(numberStr) {
    var groups = [];
    for (var i = numberStr.length; i > 0; i -= 6) {
      var start = Math.max(0, i - 6);
      groups.unshift(numberStr.slice(start, i));
    }
    return groups;
  }

  function convertUnder100(n) {
    if (n < 10) {
      return DIGITS[n];
    }

    if (n < 20) {
      if (n === 10) {
        return "ដប់";
      }
      return "ដប់" + DIGITS[n % 10];
    }

    var tens = Math.floor(n / 10);
    var ones = n % 10;
    var text = TENS[tens] || "";

    if (ones > 0) {
      text += DIGITS[ones];
    }

    return text;
  }

  function convertUnder1000(n) {
    if (n < 100) {
      return convertUnder100(n);
    }

    var hundreds = Math.floor(n / 100);
    var rest = n % 100;
    var text = DIGITS[hundreds] + "រយ";

    if (rest > 0) {
      text += convertUnder100(rest);
    }

    return text;
  }

  function convertUnderMillion(n) {
    if (n < 1000) {
      return convertUnder1000(n);
    }

    var text = "";
    var rest = n;

    var hundredThousands = Math.floor(rest / 100000);
    if (hundredThousands > 0) {
      text += convertUnder100(hundredThousands) + "សែន";
      rest %= 100000;
    }

    var tenThousands = Math.floor(rest / 10000);
    if (tenThousands > 0) {
      text += convertUnder100(tenThousands) + "មុីន";
      rest %= 10000;
    }

    var thousands = Math.floor(rest / 1000);
    if (thousands > 0) {
      text += convertUnder100(thousands) + "ពាន់";
      rest %= 1000;
    }

    if (rest > 0) {
      text += convertUnder1000(rest);
    }

    return text;
  }

  function convertIntegerPart(integerPart) {
    var trimmed = integerPart.replace(/^0+(?=\d)/, "");

    if (trimmed === "0") {
      return DIGITS[0];
    }

    var groups = groupBySix(trimmed);
    var output = "";

    for (var i = 0; i < groups.length; i += 1) {
      var groupValue = parseInt(groups[i], 10);
      if (!groupValue) {
        continue;
      }

      var scaleIndex = groups.length - i - 1;
      var scale = LARGE_SCALES[scaleIndex] || "";
      output += convertUnderMillion(groupValue) + scale;
    }

    return output || DIGITS[0];
  }

  function convertFractionPart(fractionPart) {
    if (!fractionPart || !fractionPart.length) {
      return "";
    }

    var out = "ចុច";

    for (var i = 0; i < fractionPart.length; i += 1) {
      out += DIGITS[parseInt(fractionPart.charAt(i), 10)];
    }

    return out;
  }

  function toKhmerText(input) {
    if (typeof input === "number" && !Number.isFinite(input)) {
      throw new Error("NGConvertor cannot convert Infinity or NaN.");
    }

    var raw;
    if (typeof input === "bigint") {
      raw = input.toString();
    } else {
      raw = sanitizeNumericString(input);
    }

    var sign = "";
    if (raw.charAt(0) === "-") {
      sign = "ដក";
      raw = raw.slice(1);
    } else if (raw.charAt(0) === "+" || raw.charAt(0) === ",") {
      raw = raw.slice(1);
    }

    var parts = raw.split(".");
    var intPart = parts[0] || "0";
    var fracPart = parts[1] || "";

    var result = convertIntegerPart(intPart) + convertFractionPart(fracPart);
    return sign + result;
  }

  function isValid(input) {
    try {
      if (typeof input === "bigint") {
        return true;
      }
      sanitizeNumericString(input);
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    version: "2.0.0",
    // Direct exports for backward compatibility
    toKhmer: toKhmer,
    toEnglish: toEnglish,
    convert: convertDigits, // digits convert
    isKhmer: isKhmer,
    isEnglish: isEnglish,
    toKhmerText: toKhmerText,
    isValid: isValid,
    // Namespaced exports
    digits: {
      toKhmer: toKhmer,
      toEnglish: toEnglish,
      convert: convertDigits,
      isKhmer: isKhmer,
      isEnglish: isEnglish
    },
    text: {
      toKhmerText: toKhmerText,
      convert: toKhmerText,
      isValid: isValid
    }
  };
});