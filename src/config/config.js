/**
 * @typedef {import('./dimension')} Dimension
 * @typedef {import('./index-page')} IndexPage
 * @typedef {import('./list-page')} ListPage
 */

class Config {
  /**
   * @param {string} key
   */
  constructor(key) {
    /**
     * @type {string}
     * @private
     */
    this._key = key;

    /**
     * @type {Dimension[]}
     * @private
     */
    this._dimensions = [];

    /**
     * @type {IndexPage|null}
     * @private
     */
    this._indexPage = null;

    /**
     * @type {ListPage[]}
     * @private
     */
    this._listPages = [];
  }

  /**
   * @param {Dimension} dimension
   */
  addDimension(dimension) {
    if (this._findDimension(dimension.name) === null) {
      this._dimensions.push(dimension);
    }
  }

  /**
   * @param {IndexPage} page
   */
  set indexPath(page) {
    this._indexPage = page;
  }

  /**
   * @param {ListPage} page
   */
  addListPage(page) {
    if (this._findDimension(page.dimension) === null) {
      return;
    }

    for (let i = 0; i < page.sortOrder.length; i++) {
      if (this._findDimension(page.sortOrder[i]) === null) {
        return;
      }
    }

    this._listPages.push(page);
  }

  /**
   * @param {string} name
   * @return {Dimension|null}
   * @private
   */
  _findDimension(name) {
    const result = this._dimensions.find((dimension) => {
      return dimension.name === name;
    });

    return result || null;
  }

  /**
   * @return {Object}
   */
  toConfig() {
    return {
      key: this._key,
      dimensions: this._dimensions.map((dim) => dim.toConfig()),
      indexPage: this._indexPage.toConfig(),
      listPages: this._listPages.map((page) => page.toConfig()),
    };
  }
}

module.exports = Config;
