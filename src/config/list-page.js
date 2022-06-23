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
     * @type {string[]}
     * @private
     */
    this._sortOrder = [];

    /**
     * @type {string}
     * @private
     */
    this._listItemTitle = ':title';

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
   * @param {string[]} order
   */
  set sortOrder(order) {
    this._sortOrder = order;
  }

  /**
   * @return {string[]}
   */
  get sortOrder() {
    return this._sortOrder;
  }

  /**
   * @param {string} title
   */
  set listItemTitle(title) {
    this._listItemTitle = title;
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
      sortOrder: this._sortOrder,
      listItemTitle: this._listItemTitle,
      indexPageTitle: this._indexPageTitle,
    };
  }
}

module.exports = ListPage;
