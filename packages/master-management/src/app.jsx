import React from 'react';

import { mergeLayoutSetting } from 'antd-management-fast-framework';

import { MenuCard } from './components/MenuCard';
import {
  buildActionItems,
  buildSiderMenuExtra,
  buildSiderMenuFooter,
  getLogo,
  getTitle,
  themeToken,
} from './utils';

export * from './app.core';

export const layout = ({ initialState, setInitialState }) => {
  return mergeLayoutSetting({
    logo: getLogo(),
    title: getTitle(),
    water: 'test',
    actionItems: buildActionItems(),
    initialState: initialState || {},
    setInitialState,
    themeToken: themeToken,
    // keepCollapsed: true,
    groupMenu: true,
    // collapsedShowTitle: true,
    backgroundImageItems: [
      {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuExtra: buildSiderMenuExtra(),
    menuFooter: buildSiderMenuFooter(),
    miniMenu: <MenuCard />,
    config: {},
  });
};
