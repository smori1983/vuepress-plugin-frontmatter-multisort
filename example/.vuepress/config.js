module.exports = {
  title: 'Demo',
  dest: 'example/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [],
  },

  plugins: [
    [require('../../src')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
