import React from 'react';

import { analysisRoute } from 'antd-management-fast-common';
import { ApplicationWrapper } from 'antd-management-fast-framework';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档:https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

export function rootContainer(container) {
  return React.createElement(ApplicationWrapper, null, container);
}

export function onRouteChange({
  location,
  clientRoutes,
  routes,
  action,
  basename,
}) {
  analysisRoute({
    location,
    clientRoutes,
    routes,
    action,
    basename,
  });
}
