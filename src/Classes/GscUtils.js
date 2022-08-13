/**
 * @file GscUtils.js
 */
/* eslint-disable jsdoc/valid-types */
class GscUtils {
  /**
   * @class
   * @summary Utility methods.
   * @public
   * @param {object} config           - Module configuration.
   * @param {Array}  config.runGroups - Groups of runs, where each group occupies a different tab/sheet in the spreadsheet.
   */
  constructor(config = {}) {
    // accepts an object of named arguments
    const options = {};

    // merge settings, config and options objects to create this instance's settings
    this.settings = { ...options, ...config };
  }

  /* Setters and Getters */

  get settings() {
    return this._settings;
  }

  set settings(settings) {
    // merge settings objects
    this._settings = { ...this._settings, ...settings };
  }

  /* Methods */

  /**
   * isDate
   *
   * @summary Determine whether cell contents string is a date.
   * @memberof GscUtils
   * @static
   * @param {string} str - String to convert
   * @returns {string} safeStr
   */
  static isDate(str) {
    const strDate = Date.parse(str);
    const isDate = !Number.isNaN(strDate);

    return isDate;
  }

  /**
   * objectsMatch
   *
   * @summary Determine whether 2 objects are the same
   * @memberof GscUtils
   * @static
   * @param {object} obj1 - Object 1
   * @param {object} obj2 - Object 2
   * @returns {boolean} match
   * @see {@link https://codepen.io/w3resource/pen/gjBqor}
   */
  static objectsMatch(obj1, obj2) {
    const match = Object.keys(obj2).every(
      (key) => Object.prototype.hasOwnProperty.call(obj1, key) && obj1[key] === obj2[key],
    );

    return match;
  }

  /**
   * stringToCapitalised
   *
   * @summary Capitalise a string
   * @memberof GscUtils
   * @static
   * @param {string} str - String to convert
   * @returns {string} capitalisedStr
   */
  static stringToCapitalised(str) {
    if (typeof str !== 'string') {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * stringToId
   *
   * @summary Convert a string into a form safe for use as an HTML id attribute.
   * @memberof GscUtils
   * @static
   * @param {string} str - String to convert
   * @returns {string} safeStr
   */
  static stringToId(str) {
    if (typeof str !== 'string') {
      return '';
    }

    // Note: "/" is a valid ID character in HTML5, but fails in querySelector.
    let safeStr = str
      .trim()
      .toLowerCase()
      .replaceAll(/([ /.,'"!()])+/g, '-')
      .replaceAll(/[-]{2,}/g, '-'); // --

    if (safeStr[safeStr.length - 1] === '-') {
      safeStr = safeStr.slice(0, -1);
    }

    return safeStr;
  }
}
