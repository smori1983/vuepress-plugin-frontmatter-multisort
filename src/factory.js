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
      sortPages(pages).forEach((page) => {
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

  result.sort();

  return result;
};

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
 * @return {Page[]}
 */
const sortPages = (pages) => {
  pages.sort((a, b) => {
    return a.title <= b.title ? -1 : 1;
  });

  return pages;
};

module.exports.build = build;
