class IndexPage {
  /**
   * @param {string} path
   * @param {string} title
   */
  constructor(path, title) {
    /**
     * @type {string}
     * @private
     */
    this._path = path;

    /**
     * @type {string}
     * @private
     */
    this._title = title;
  }

  /**
   * @return {Object}
   */
  toConfig() {
    return {
      path: this._path,
      title: this._title,
    };
  }
}

module.exports = IndexPage;
