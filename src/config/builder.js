const Config = require('./config');
const Dimension = require('./dimension');
const IndexPage = require('./index-page');
const ListPage = require('./list-page');

/**
 * @param {Object[]} configInputs
 * @return {Config[]}
 */
const build = (configInputs) => {
  const result = [];

  configInputs.forEach((configInput) => {
    if (typeof(configInput.key) !== 'string') {
      return;
    }

    const config = new Config(configInput.key);

    setDimensions(config, configInput);
    setIndexPage(config, configInput);
    setListPages(config, configInput);

    result.push(config);
  });

  return result;
};

/**
 * @param {Config} config
 * @param {Object} configInput
 */
const setDimensions = (config, configInput) => {
  if (!Array.isArray(configInput.dimensions)) {
    return;
  }

  configInput.dimensions.forEach((dim) => {
    if (typeof(dim.name) === 'string') {
      const dimension = new Dimension(dim.name);

      if (typeof(dim.sort) === 'string' && ['asc', 'desc'].indexOf(dim.sort) >= 0) {
        dimension.defaultSortType = dim.sort;
      }

      config.addDimension(dimension);
    }
  });
};

/**
 * @param {Config} config
 * @param {Object} configInput
 */
const setIndexPage = (config, configInput) => {
  if (!configInput.indexPage) {
    return;
  }

  if (typeof(configInput.indexPage.path) !== 'string') {
    return;
  }

  if (configInput.indexPage.path.length === 0) {
    return;
  }

  if (typeof(configInput.indexPage.title) !== 'string') {
    return;
  }

  config.indexPath = new IndexPage(configInput.indexPage.path, configInput.indexPage.title);
}

/**
 * @param {Config} config
 * @param {Object} configInput
 */
const setListPages = (config, configInput) => {
  if (!Array.isArray(configInput.listPages)) {
    return;
  }

  configInput.listPages.forEach((listPageInput) => {
    setListPage(config, listPageInput);
  });
};

/**
 * @param {Config} config
 * @param {Object} input
 */
const setListPage = (config, input) => {
  if (typeof(input.dimension) !== 'string') {
    return;
  }

  if (input.dimension.length === 0) {
    return;
  }

  if (typeof(input.path) !== 'string') {
    return;
  }

  if (input.path.length === 0) {
    return;
  }

  if (typeof(input.title) !== 'string') {
    return;
  }

  const listPage = new ListPage(input.dimension, input.path, input.title);

  if (typeof(input.indexPageTitle) === 'string') {
    listPage.indexPageTitle = input.indexPageTitle;
  }

  config.addListPage(listPage);
};

module.exports.build = build;
