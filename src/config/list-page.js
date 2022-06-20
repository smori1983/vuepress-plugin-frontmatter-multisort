class ListPage {
  /**
   * @param {string} dimension
   * @param {string} path
   * @param {string} title
   */
  constructor(dimension, path, title) {
    /**
     * @type {string}
     * @private
     */
    this._dimension = dimension;

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

    /**
     * @type {string}
     * @private
     */
    this._indexPageTitle = dimension;
  }

  /**
   * @return {string}
   */
  get dimension() {
    return this._dimension;
  }

  /**
   * @param {string} value
   */
  set indexPageTitle(value) {
    this._indexPageTitle = value;
  }

  /**
   * @return {Object}
   */
  toConfig() {
    return {
      dimension: this._dimension,
      path: this._path,
      title: this._title,
      indexPageTitle: this._indexPageTitle,
    };
  }
}

module.exports = ListPage;
