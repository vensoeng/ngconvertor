(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ngConvertor = factory());
}(this, function () {
  'use strict';

  const KHMER_DIGITS = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//  Convert English/Arabic digits in a string to Khmer digits.
  function toKhmer(input) {
    if (input === null || input === undefined) return '';
    return String(input).replace(/[0-9]/g, function (d) {
      return KHMER_DIGITS[parseInt(d, 10)];
    });
  }

// Convert Khmer digits in a string to English/Arabic digits.
  function toEnglish(input) {
    if (input === null || input === undefined) return '';
    return String(input).replace(/[០-៩]/g, function (d) {
      var index = KHMER_DIGITS.indexOf(d);
      return index !== -1 ? ENGLISH_DIGITS[index] : d;
    });
  }

//  Auto-detect the input type and convert

  function convert(input) {
    if (input === null || input === undefined) return '';
    var str = String(input);
    return /[០-៩]/.test(str) ? toEnglish(str) : toKhmer(str);
  }

// Check whether a string contains only Khmer digits (and optional whitespace).
  function isKhmer(input) {
    if (input === null || input === undefined) return false;
    return /^[\s០-៩]+$/.test(String(input));
  }

// Check whether a string contains only English/Arabic digits (and optional whitespace).
  function isEnglish(input) {
    if (input === null || input === undefined) return false;
    return /^[\s0-9]+$/.test(String(input));
  }

  return {
    toKhmer: toKhmer,
    toEnglish: toEnglish,
    convert: convert,
    isKhmer: isKhmer,
    isEnglish: isEnglish,
    version: '1.0.0'
  };
}));
