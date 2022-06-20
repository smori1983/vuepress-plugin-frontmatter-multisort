module.exports = {
  title: 'Demo',
  dest: 'example/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      '/-/items/',
    ],
  },

  plugins: [
    [require('../../src'), {
      config: {
        key: 'attribute',
        dimensions: [
          {
            name: 'year',
          },
          {
            name: 'category',
          },
          {
            name: 'name',
          },
        ],
        indexPage: {
          path: '/-/items/',
          title: 'Item list',
        },
        listPages: [
          {
            dimension: 'year',
            path: '/-/items/year/:dimension/',
            title: 'Item list (:dimension)',
            indexPageTitle: 'By year',
          },
          {
            dimension: 'category',
            path: '/-/items/category/:dimension/',
            title: 'Item list (:dimension)',
            indexPageTitle: 'By category',
          },
        ],
      },
    }],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
