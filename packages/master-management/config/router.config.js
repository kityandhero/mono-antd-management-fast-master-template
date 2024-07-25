import { accessWayCollection } from '../src/customConfig/accessWayCollection';

import {
  accessWay,
  account,
  administrativeDivision,
  apps,
  assistTools,
  businessSet,
  cloudStorage,
  currentAccount,
  currentInfrastructureManagement,
  dataDictionaryInfrastructure,
  developTools,
  emailSenderAgent,
  entrance,
  flow,
  generalDiscourse,
  internalTester,
  logs,
  notFound,
  optionPool,
  organization,
  presetRole,
  queues,
  result,
  services,
  sms,
  survey,
  tag,
  uploadHistory,
  user,
  userDevice,
  userLoginLog,
  userSignet,
  weChatMessageRecord,
} from './router.master.template.config';

export default [
  entrance,
  {
    path: '/',
    redirect: '/dashboard',
    routes: [],
  },
  {
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
  },
  logs,
  queues,
  {
    name: 'messagePush',
    icon: 'read',
    path: '/messagePush',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.weChatMessageRecord.pageList.permission,
    ],
    routes: [weChatMessageRecord],
  },
  sms,
  services,
  apps,
  {
    name: 'data',
    icon: 'reconciliation',
    path: '/data',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.businessSet.pageList.permission,
      accessWayCollection.tag.pageList.permission,
      accessWayCollection.optionPool.pageList.permission,
      accessWayCollection.generalDiscourse.pageList.permission,
    ],
    routes: [
      administrativeDivision,
      businessSet,
      tag,
      optionPool,
      generalDiscourse,
      emailSenderAgent,
    ],
  },
  {
    name: 'files',
    icon: 'reconciliation',
    path: '/files',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.uploadHistory.pageList.permission,
      accessWayCollection.cloudStorage.pageList.permission,
    ],
    routes: [cloudStorage, uploadHistory],
  },
  {
    name: 'news',
    icon: 'shop',
    path: '/news',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.section.pageList.permission,
    ],
    // hideChildrenInMenu: true,
    routes: [
      {
        path: '/news',
        redirect: '/news/section',
      },
      {
        name: 'section',
        icon: 'section',

        hideChildrenInMenu: true,
        path: '/news/section',
        access: 'checkAccess',
        authority: [
          accessWayCollection.super.permission,
          accessWayCollection.section.pageList.permission,
        ],
        routes: [
          {
            path: '/news/section',
            redirect: '/news/section/pageList',
          },
          {
            path: '/news/section/pageList',
            redirect: '/news/section/pageList/no',
          },
          {
            path: '/news/section/pageList/:pageKey',
            component: './Section/PageList',
          },
          {
            path: '/news/section/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Section/Edit',
            routes: [
              {
                path: '/news/section/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Section/Edit/BasicInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/sectionApplicationConfig',
                name: 'sectionApplicationConfig',
                routes: [
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/sectionApplicationConfig',
                    redirect:
                      '/news/edit/:op/:id/:pageKey/sectionApplicationConfig/pageList',
                  },
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/sectionApplicationConfig/pageList',
                    component:
                      './Section/Edit/SectionApplicationConfig/PageList',
                  },
                ],
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/contentInfo',
                name: 'contentInfo',
                component: './Section/Edit/ContentInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/mediaInfo',
                name: 'mediaInfo',
                component: './Section/Edit/MediaInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/scoreInfo',
                component: './Section/Edit/ReadObtainScoreInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/news/section/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './Section/Edit/OperateLog/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  survey,
  organization,
  flow,
  {
    name: 'permission',
    icon: 'reconciliation',
    path: '/permission',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.accessWay.pageList.permission,
      accessWayCollection.presetRole.pageList.permission,
    ],
    routes: [accessWay, presetRole],
  },
  {
    name: 'person',
    icon: 'team',
    path: '/person',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.user.pageList.permission,
      accessWayCollection.userDevice.pageList.permission,
      accessWayCollection.internalTester.pageList.permission,
    ],
    routes: [user, userSignet, userDevice, userLoginLog, internalTester],
  },
  account,
  assistTools,
  dataDictionaryInfrastructure,
  developTools,
  currentAccount,
  {
    name: 'currentManagement',
    icon: 'user',
    path: '/currentManagement',
    access: 'checkAccess',
    authority: [accessWayCollection.super.permission],
    routes: [currentInfrastructureManagement],
  },
  result,
  notFound,
];
