module.exports = {
  title: 'Demo',
  dest: 'example/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      '/-/items/',
      '/-/articles/',
    ],
  },

  plugins: [
    [require('../../src'), {
      configs: [
        {
          key: 'attribute',
          dimensions: [
            {
              name: 'year',
              sort: 'desc',
            },
            {
              name: 'category',
              sort: 'asc',
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
              sortOrder: ['year'],
              indexPageTitle: 'By category',
            },
          ],
        },
        {
          key: 'article',
          dimensions: [
            {
              name: 'author',
            },
            {
              name: 'date',
              sort: 'desc',
            },
            {
              name: 'category',
            },
          ],
          indexPage: {
            path: '/-/articles/',
            title: 'Articles',
          },
          listPages: [
            {
              dimension: 'category',
              path: '/-/articles/category/:dimension/',
              title: 'Articles about :dimension',
              sortOrder: ['date'],
            },
            {
              dimension: 'author',
              path: '/-/articles/author/:dimension/',
              title: 'Articles by :dimension',
              sortOrder: ['date', 'category'],
            },
          ],
        },
      ],
    }],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
