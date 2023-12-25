import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '1bc'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '051'),
    routes: [
      {
        path: '/docs/bridge/flow',
        component: ComponentCreator('/docs/bridge/flow', '257'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/bridge/mapper',
        component: ComponentCreator('/docs/bridge/mapper', '60f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/bridge',
        component: ComponentCreator('/docs/category/bridge', '815'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/gas-free',
        component: ComponentCreator('/docs/category/gas-free', 'ab4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/grootswap',
        component: ComponentCreator('/docs/category/grootswap', 'af9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/mirai-chain',
        component: ComponentCreator('/docs/category/mirai-chain', '748'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/mrc20',
        component: ComponentCreator('/docs/category/mrc20', '5cb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/gas-free/introduction',
        component: ComponentCreator('/docs/gas-free/introduction', '9cd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/grootswap/add-lp',
        component: ComponentCreator('/docs/grootswap/add-lp', 'b1a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/grootswap/deployment',
        component: ComponentCreator('/docs/grootswap/deployment', 'ae4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/grootswap/introduction',
        component: ComponentCreator('/docs/grootswap/introduction', '826'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/miraichain/faucet',
        component: ComponentCreator('/docs/miraichain/faucet', 'dc5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/miraichain/intro',
        component: ComponentCreator('/docs/miraichain/intro', '7cf'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/mrc20/',
        component: ComponentCreator('/docs/mrc20/', '013'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/mrc20/example',
        component: ComponentCreator('/docs/mrc20/example', '908'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'b9c'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
