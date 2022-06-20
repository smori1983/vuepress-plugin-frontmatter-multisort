class Dimension {
  /**
   * @param {string} name
   */
  constructor(name) {
    /**
     * @type {string}
     * @private
     */
    this._name = name;

    /**
     * @type {string}
     * @private
     */
    this._cardinality = 'single';

    /**
     * @type {string}
     * @private
     */
    this._defaultSortType = 'asc';
  }

  /**
   * @return {string}
   */
  get name() {
    return this._name;
  }

  /**
   * @param {string} type
   */
  set defaultSortType(type) {
    this._defaultSortType = type;
  }

  /**
   * @return {Object}
   */
  toConfig() {
    return {
      name: this._name,
      cardinality: this._cardinality,
      defaultSortType: this._defaultSortType,
    };
  }
}

module.exports = Dimension;
