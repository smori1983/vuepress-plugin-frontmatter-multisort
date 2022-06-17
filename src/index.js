/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

/**
 * @param {Object} options
 * @return {PluginOptionAPI}
 */
module.exports = (options) => {
  return {
    name: 'vuepress-plugin-frontmatter-multisort',
  };
};
