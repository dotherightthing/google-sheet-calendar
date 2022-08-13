/**
 * @file GscApp.js
 */
/* eslint-disable jsdoc/valid-types */
class GscApp { // eslint-disable-line no-unused-vars
  /**
   * @class
   * @summary Shares settings between classes and provides helper methods.
   * @public
   * @param {object}  config               - Module configuration.
   * @param {boolean} config.debug         - Output debugging messages.
   * @param {object}  config.deploymentIds - Deployment IDs of this standalone project
   * @param {object}  config.scriptIds     - IDs of the various Apps Scripts
   * @param {object}  config.user          - Employee referenced in spreadsheet
   */
  constructor(config = {}) {
    // accepts an object of named arguments
    const options = {};

    // merge config and options objects to create this instance's settings
    this.settings = { ...options, ...config };

    const {
      debug,
      deploymentIds, // eslint-disable-line no-unused-vars
      scriptIds, // eslint-disable-line no-unused-vars
      user, // eslint-disable-line no-unused-vars
    } = this.settings;

    GscCache.settings = { debug };
    GscCalendar.settings = {};
    GscSheet.settings = {};
    GscUtils.settings = {};
  }

  /* Getters and Setters */

  get settings() {
    return this._settings;
  }

  set settings(settings) {
    // merge settings objects
    this._settings = { ...this._settings, ...settings };
  }
}
