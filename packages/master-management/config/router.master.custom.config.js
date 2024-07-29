import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export const root = {
  path: '/',
  redirect: '/dashboard',
  routes: [],
};

export const dashboard = {
  path: '/dashboard',
  name: 'dashboard',
  icon: 'team',
  authority: [accessWayCollection.super.permission],
  hideChildrenInMenu: true,
  routes: [
    {
      path: '/dashboard',
      redirect: '/dashboard/workbench',
    },
    {
      path: '/dashboard/workbench',
      name: 'workbench',
      icon: 'bars',
      component: './Workbench',
    },
  ],
};
