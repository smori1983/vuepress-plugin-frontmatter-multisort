/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const factory = require('./factory');

/**
 * @param {Object} options
 * @param {Context} context
 * @return {PluginOptionAPI}
 */
module.exports = (options, context) => {
  const prepareAdditionalPages = async () => {
    return factory.build(context.pages, options.config || {});
  };

  return {
    name: 'vuepress-plugin-frontmatter-multisort',
    async additionalPages() {
      return await prepareAdditionalPages();
    },
  };
};
