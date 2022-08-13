/**
 * @file GscCache.js
 */
/* eslint-disable jsdoc/valid-types */
class GscCache { // eslint-disable-line no-unused-vars
  /**
   * @class
   * @summary Temporarily cache results that take time to fetch/compute (memoization).
   *  Current limitations - value size: 9 KB, property store: 500 KB
   * @public
   * @param {object}  config       - Module configuration.
   * @param {boolean} config.debug - Output debugging messages.
   * @see {@link https://developers.google.com/apps-script/guides/services/quotas}
   */
  constructor(config = {}) {
    // accepts an object of named arguments
    const options = {};

    // merge config and options objects to create this instance's settings
    this.settings = { ...options, ...config };
  }

  /* Getters and Setters */

  get settings() {
    return this._settings;
  }

  set settings(settings) {
    // merge settings objects
    this._settings = { ...this._settings, ...settings };
  }

  /**
   * Methods
   *
   * static - self contained, do not need to reference the instance
   * non-static - need access to the instance/'this'
   */

  /**
   * clearCache
   *
   * @summary Removes all keys and values from the script cache.
   * @memberof GscCache
   * @returns {string} Success message
   * @static
   */
  static clearCache() {
    const scriptProperties = PropertiesService.getScriptProperties();

    scriptProperties.deleteAllProperties();

    return 'Stored script properties deleted'; // eslint-disable-line no-console
  }

  /**
   * getCacheItem
   *
   * @summary Get the value of an item in the script cache.
   * @memberof GscCache
   * @static
   * @param {string} key Unique cache key
   * @returns {object} Cache value
   */
  static getCacheItem(key) {
    const { debug } = GscCache.settings;

    // console.log('getCacheItem %s', key);
    let value = null;
    const scriptProperties = PropertiesService.getScriptProperties();
    const stored = scriptProperties.getProperty(key);

    if (stored !== null) {
      value = JSON.parse(stored);

      if (debug) {
        console.log('Read script property %s as %s', key, value); // eslint-disable-line no-console
      }
    }

    return value;
  }

  /**
   * cacheLog
   *
   * @summary Outputs the contents of the script cache to the console.
   * @memberof GscCache
   * @static
   * @returns {object} Cache contents, sorted alphabetically.
   * @see {@link https://spreadsheet.dev/array-method-sort-in-apps-script}
   */
  static cacheLog() {
    const scriptProperties = PropertiesService.getScriptProperties();
    const valueObj = scriptProperties.getProperties();
    const valueKeys = Object.keys(valueObj);
    const valueKeysSorted = valueKeys.sort();
    const sortedObj = {};

    valueKeysSorted.forEach((valueKey) => {
      sortedObj[valueKey] = valueObj[valueKey];
    });

    return sortedObj;
  }

  /**
   * setCacheItem
   *
   * @summary Set the value of an item in the script cache.
   * @memberof GscCache
   * @static
   * @param {string} key Unique cache key
   * @param {object} value Cache value
   */
  static setCacheItem(key, value) {
    const { debug } = GscCache.settings;
    const scriptProperties = PropertiesService.getScriptProperties();

    scriptProperties.setProperty(key, JSON.stringify(value));

    if (debug) {
      console.log('Write script property %s as %s', key, value); // eslint-disable-line no-console
    }
  }
}
