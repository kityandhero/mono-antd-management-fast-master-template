import { accessWayCollection } from '../src/customConfig/accessWayCollection';

import { dashboard, root } from './router.custom.config';
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
  section,
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
} from './router.general.config';

export default [
  entrance,
  root,
  dashboard,
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
    routes: [
      {
        path: '/news',
        redirect: '/news/section',
      },
      section,
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
