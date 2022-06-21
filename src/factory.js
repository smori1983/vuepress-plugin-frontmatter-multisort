/**
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 */

/**
 * @param {Page[]} pages
 * @param {Object} config
 * @return {Partial<PageOptions>[]}
 */
const build = (pages, config) => {
  /**
   * @type {Page[]}
   */
  const targetPages = [];

  pages.forEach((page) => {
    if (isTargetPage(page, config)) {
      targetPages.push(page);
    }
  });

  const additionalPages = [];

  const indexLines = [];
  indexLines.push(`# ${config.indexPage.title}`);
  indexLines.push('');
  targetPages.forEach((page) => {
    indexLines.push(`- [${page.title}](${page.regularPath})`);
  });

  config.listPages.forEach((listPageConfig) => {
    const dimension = listPageConfig.dimension;
    const dimensionValues = getDimensionValues(targetPages, config, dimension);

    indexLines.push(`## ${listPageConfig.indexPageTitle}`);
    indexLines.push('');

    dimensionValues.forEach((dimensionValue) => {
      const lines = [];
      const pageTitle = listPageConfig.title.replace(':dimension', dimensionValue);

      lines.push(`# ${pageTitle}`);
      lines.push('');
      const pages = filterPagesByDimensionValue(targetPages, config, dimension, dimensionValue);
      sortPages(pages, config, listPageConfig).forEach((page) => {
        lines.push(`- [${page.title}](${page.regularPath})`);
      });
      lines.push('');
      lines.push('-----');
      lines.push(`- Back to [${config.indexPage.title}](${config.indexPage.path})`);

      const path = listPageConfig.path.replace(':dimension', dimensionValue);

      additionalPages.push({
        path: path,
        content: lines.join('\n'),
      });

      indexLines.push(`- [${pageTitle}](${path})`);
    });
  });

  additionalPages.push({
    path: config.indexPage.path,
    frontmatter: {
      title: config.indexPage.title,
    },
    content: indexLines.join('\n'),
  });

  return additionalPages;
};

/**
 * @param {Page} page
 * @param {Object} config
 * @return {boolean}
 */
const isTargetPage = (page, config) => {
  if (!page.frontmatter[config.key]) {
    return false;
  }

  const pageData = page.frontmatter[config.key];

  for (let i = 0; i < config.dimensions.length; i++) {
    const dimension = config.dimensions[i];

    if (!pageData.hasOwnProperty(dimension.name)) {
      return false;
    }
  }

  return true;
};

/**
 * @param {Page[]} pages
 * @param {Object} config
 * @param {string} dimension
 */
const getDimensionValues = (pages, config, dimension) => {
  /**
   * @type {Set<any>}
   */
  const values = new Set();

  pages.forEach((page) => {
    values.add(page.frontmatter[config.key][dimension]);
  });

  const result = Array.from(values);

  if (getSortType(config, dimension) === 'asc') {
    result.sort();
  } else {
    result.sort().reverse();
  }

  return result;
};

/**
 * @param {Object} config
 * @param {string} dimension
 * @return {string}
 */
const getSortType = (config, dimension) => {
  for (let i = 0; i < config.dimensions.length; i++) {
    if (config.dimensions[i].name === dimension) {
      return config.dimensions[i].defaultSortType;
    }
  }

  return 'asc';
}

/**
 * @param {Page[]} pages
 * @param {Object} config
 * @param {string} dimension
 * @param {*} value
 * @return {Page[]}
 */
const filterPagesByDimensionValue = (pages, config, dimension, value) => {
  return pages.filter((page) => {
    return page.frontmatter[config.key][dimension] === value;
  });
};

/**
 * @param {Page[]} pages
 * @param {Object} config
 * @param {Object} listPageConfig
 * @return {Page[]}
 */
const sortPages = (pages, config, listPageConfig) => {
  pages.sort((a, b) => {
    for (let i = 0; i < listPageConfig.sortOrder.length; i++) {
      const dimensionConfig = getDimensionConfig(config, listPageConfig.sortOrder[i]);
      const sortResult = sort(a, b, config, dimensionConfig);

      if (sortResult !== 0) {
        return sortResult;
      }
    }

    return a.title <= b.title ? -1 : 1;
  });

  return pages;
};

/**
 * @param {Page} a
 * @param {Page} b
 * @param {Object} config
 * @param {Object} dimensionConfig
 */
const sort = (a, b, config, dimensionConfig) => {

  if (a.frontmatter[config.key][dimensionConfig.name] === b.frontmatter[config.key][dimensionConfig.name]) {
    return 0;
  }

  if (dimensionConfig.defaultSortType === 'asc') {
    return a.frontmatter[config.key][dimensionConfig.name] <= b.frontmatter[config.key][dimensionConfig.name] ? -1 : 1;
  } else {
    return a.frontmatter[config.key][dimensionConfig.name] <= b.frontmatter[config.key][dimensionConfig.name] ? 1 : -1;
  }
};

/**
 * @param {Object} config
 * @param {string} dimension
 */
const getDimensionConfig = (config, dimension) => {
  for (let i = 0; i < config.dimensions.length; i++) {
    if (config.dimensions[i].name === dimension) {
      return config.dimensions[i];
    }
  }

  return null;
};

module.exports.build = build;
