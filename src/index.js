/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageOptions} PageOptions
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const configBuilder = require('./config/builder');
const factory = require('./factory');

/**
 * @param {Object} options
 * @param {Context} context
 * @return {PluginOptionAPI}
 */
module.exports = (options, context) => {
  const prepareAdditionalPages = async () => {
    const pages = [];
    const configs = configBuilder.build(options.configs || []);

    configs.forEach((config) => {
      factory.build(context.pages, config.toConfig()).forEach((page) => {
        pages.push((page));
      });
    });

    return pages;
  };

  return {
    name: 'vuepress-plugin-frontmatter-multisort',
    async additionalPages() {
      return await prepareAdditionalPages();
    },
  };
};
