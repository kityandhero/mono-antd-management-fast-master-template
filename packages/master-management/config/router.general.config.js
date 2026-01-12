// 此文件将会从模板库自动更新，请勿改动此文件内容。

import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export const entrance = {
  path: '/entrance',
  layout: false,
  routes: [
    { path: '/entrance', redirect: '/entrance/signIn' },
    {
      path: '/entrance/signIn',
      component: './general/Entrance',
    },
  ],
};

export const logs = {
  name: 'logs',
  icon: 'reconciliation',
  path: '/logs',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.errorLog.pageList.permission,
    accessWayCollection.generalLog.pageList.permission,
    accessWayCollection.executeLog.pageList.permission,
    accessWayCollection.sqlLog.pageList.permission,
    accessWayCollection.mongoSlowQueryInfo.singleList.permission,
    accessWayCollection.databaseQueryEfficiency.singleList.permission,
    accessWayCollection.databaseLock.singleList.permission,
    accessWayCollection.databaseIndexSuggestion.singleList.permission,
  ],
  routes: [
    {
      name: 'errorLog',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/errorLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.errorLog.pageList.permission,
      ],
      routes: [
        {
          path: '/logs/errorLog',
          redirect: '/logs/errorLog/pageList',
        },
        {
          path: '/logs/errorLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/logs/errorLog/pageList/no',
        },
        {
          path: '/logs/errorLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/ErrorLog/PageList',
        },
        {
          path: '/logs/errorLog/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/ErrorLog/Edit',
          routes: [
            {
              path: '/logs/errorLog/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/ErrorLog/Edit/BasicInfo',
            },
            {
              path: '/logs/errorLog/edit/:op/:id/:pageKey/paramInfo',
              name: 'paramInfo',
              component: './general/ErrorLog/Edit/ParamInfo',
            },
          ],
        },
      ],
    },
    {
      name: 'generalLog',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/generalLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.generalLog.pageList.permission,
      ],
      routes: [
        {
          path: '/logs/generalLog',
          redirect: '/logs/generalLog/pageList',
        },
        {
          path: '/logs/generalLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/logs/generalLog/pageList/no',
        },
        {
          path: '/logs/generalLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/GeneralLog/PageList',
        },
        {
          path: '/logs/generalLog/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/GeneralLog/Edit',
          routes: [
            {
              path: '/logs/generalLog/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/GeneralLog/Edit/BasicInfo',
            },
          ],
        },
      ],
    },
    {
      name: 'executeLog',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/executeLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.executeLog.pageList.permission,
      ],
      routes: [
        {
          path: '/logs/executeLog',
          redirect: '/logs/executeLog/pageList',
        },
        {
          path: '/logs/executeLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/logs/executeLog/pageList/no',
        },
        {
          path: '/logs/executeLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/ExecuteLog/PageList',
        },
        {
          path: '/logs/executeLog/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/ExecuteLog/Edit',
          routes: [
            {
              path: '/logs/executeLog/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/ExecuteLog/Edit/BasicInfo',
            },
          ],
        },
      ],
    },
    {
      name: 'sqlLog',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/sqlLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.sqlLog.pageList.permission,
      ],
      routes: [
        {
          path: '/logs/sqlLog',
          redirect: '/logs/sqlLog/pageList',
        },
        {
          path: '/logs/sqlLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/logs/sqlLog/pageList/no',
        },
        {
          path: '/logs/sqlLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/SqlLog/PageList',
        },
      ],
    },
    {
      name: 'operationLog',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/operationLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.operationLog.pageList.permission,
      ],
      routes: [
        {
          path: '/logs/operationLog',
          redirect: '/logs/operationLog/pageList',
        },
        {
          path: '/logs/operationLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/logs/operationLog/pageList/no',
        },
        {
          path: '/logs/operationLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/OperationLog/PageList',
        },
      ],
    },
    {
      name: 'mongoSlowQueryInfo',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/mongoSlowQueryInfo',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.mongoSlowQueryInfo.singleList.permission,
      ],
      routes: [
        {
          path: '/logs/mongoSlowQueryInfo',
          redirect: '/logs/mongoSlowQueryInfo/singleList',
        },
        {
          path: '/logs/mongoSlowQueryInfo/singleList',
          name: 'singleList',
          icon: 'bars',
          hideInMenu: true,
          component: './general/MongoSlowQueryInfo/SingleList',
        },
      ],
    },
    {
      name: 'databaseLock',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/databaseLock',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.databaseLock.singleList.permission,
      ],
      routes: [
        {
          path: '/logs/databaseLock',
          redirect: '/logs/databaseLock/singleList',
        },
        {
          path: '/logs/databaseLock/singleList',
          name: 'singleList',
          icon: 'bars',
          hideInMenu: true,
          component: './general/DatabaseLock/SingleList',
        },
      ],
    },
    {
      name: 'databaseQueryEfficiency',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/databaseQueryEfficiency',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.databaseQueryEfficiency.singleList.permission,
      ],
      routes: [
        {
          path: '/logs/databaseQueryEfficiency',
          redirect: '/logs/databaseQueryEfficiency/singleList',
        },
        {
          path: '/logs/databaseQueryEfficiency/singleList',
          name: 'singleList',
          icon: 'bars',
          hideInMenu: true,
          component: './general/DatabaseQueryEfficiency/SingleList',
        },
      ],
    },
    {
      name: 'databaseIndexSuggestion',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/logs/databaseIndexSuggestion',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.databaseIndexSuggestion.singleList.permission,
      ],
      routes: [
        {
          path: '/logs/databaseIndexSuggestion',
          redirect: '/logs/databaseIndexSuggestion/singleList',
        },
        {
          path: '/logs/databaseIndexSuggestion/singleList',
          name: 'singleList',
          icon: 'bars',
          hideInMenu: true,
          component: './general/DatabaseIndexSuggestion/SingleList',
        },
      ],
    },
  ],
};

export const queues = {
  name: 'queues',
  icon: 'reconciliation',
  path: '/queues',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.queueInfo.pageList.permission,
  ],
  routes: [
    {
      name: 'queueInfo',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/queues/queueInfo',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.queueInfo.pageList.permission,
      ],
      routes: [
        {
          path: '/queues/queueInfo',
          redirect: '/queues/queueInfo/pageList',
        },
        {
          path: '/queues/queueInfo/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/queues/queueInfo/pageList/no',
        },
        {
          path: '/queues/queueInfo/pageList/:pageKey',
          hideInMenu: true,
          component: './general/QueueInfo/PageList',
        },
      ],
    },
  ],
};

export const weChatMessageRecord = {
  name: 'weChatMessageRecord',
  icon: 'bars',
  hideChildrenInMenu: true,
  path: '/messagePush/weChatMessageRecord',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.weChatMessageRecord.pageList.permission,
  ],
  routes: [
    {
      path: '/messagePush/weChatMessageRecord',
      redirect: '/messagePush/weChatMessageRecord/pageList/no',
    },
    {
      path: '/messagePush/weChatMessageRecord/pageList/:pageKey',
      name: 'pageList',
      hideInMenu: true,
      component: './general/WeChatMessageRecord/PageList',
    },
  ],
};

export const sms = {
  name: 'sms',
  icon: 'read',
  path: '/sms',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.smsCategory.pageList.permission,
    accessWayCollection.smsLog.pageList.permission,
    accessWayCollection.smsCategoryStatistic.pageList.permission,
  ],
  routes: [
    {
      name: 'smsCategory',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/sms/smsCategory',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.smsCategory.pageList.permission,
      ],
      routes: [
        {
          path: '/sms/smsCategory',
          redirect: '/sms/smsCategory/pageList/no',
        },
        {
          path: '/sms/smsCategory/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SmsCategory/PageList',
        },
      ],
    },
    {
      name: 'smsLog',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/sms/smsLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.smsLog.pageList.permission,
      ],
      routes: [
        {
          path: '/sms/smsLog',
          redirect: '/sms/smsLog/pageList/no',
        },
        {
          path: '/sms/smsLog/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SmsLog/PageList',
        },
      ],
    },
    {
      name: 'smsCategoryStatistic',
      icon: 'bars',
      path: '/sms/smsCategoryStatistic',
      hideChildrenInMenu: true,
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.smsCategoryStatistic.pageList.permission,
      ],
      routes: [
        {
          path: '/sms/smsCategoryStatistic',
          redirect: '/sms/smsCategoryStatistic/pageList/no',
        },
        {
          path: '/sms/smsCategoryStatistic/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SmsCategoryStatistic/PageList',
        },
      ],
    },
  ],
};

export const emailSenderAgent = {
  name: 'emailSenderAgent',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/email/emailSenderAgent',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.emailSenderAgent.pageList.permission,
  ],
  routes: [
    {
      path: '/email/emailSenderAgent',
      redirect: '/email/emailSenderAgent/pageList',
    },
    {
      path: '/email/emailSenderAgent/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/email/emailSenderAgent/pageList/no',
    },
    {
      path: '/email/emailSenderAgent/pageList/:pageKey',
      hideInMenu: true,
      component: './general/EmailSenderAgent/PageList',
    },
  ],
};

export const emailMessage = {
  name: 'emailMessage',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/email/emailMessage',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.emailMessage.pageList.permission,
  ],
  routes: [
    {
      path: '/email/emailMessage',
      redirect: '/email/emailMessage/pageList',
    },
    {
      path: '/email/emailMessage/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/email/emailMessage/pageList/no',
    },
    {
      path: '/email/emailMessage/pageList/:pageKey',
      hideInMenu: true,
      component: './general/EmailMessage/PageList',
    },
  ],
};

export const emailSenderAgentStatistic = {
  name: 'emailSenderAgentStatistic',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/email/emailSenderAgentStatistic',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.emailSenderAgentStatistic.pageList.permission,
  ],
  routes: [
    {
      path: '/email/emailSenderAgentStatistic',
      redirect: '/email/emailSenderAgentStatistic/pageList',
    },
    {
      path: '/email/emailSenderAgentStatistic/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/email/emailSenderAgentStatistic/pageList/no',
    },
    {
      path: '/email/emailSenderAgentStatistic/pageList/:pageKey',
      hideInMenu: true,
      component: './general/EmailSenderAgentStatistic/PageList',
    },
  ],
};

export const emailStatistic = {
  name: 'emailStatistic',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/email/emailStatistic',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.emailStatistic.pageList.permission,
  ],
  routes: [
    {
      path: '/email/emailStatistic',
      redirect: '/email/emailStatistic/pageList',
    },
    {
      path: '/email/emailStatistic/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/email/emailStatistic/pageList/no',
    },
    {
      path: '/email/emailStatistic/pageList/:pageKey',
      hideInMenu: true,
      component: './general/EmailStatistic/PageList',
    },
  ],
};

export const email = {
  name: 'email',
  icon: 'read',
  path: '/email',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.emailSenderAgent.pageList.permission,
    accessWayCollection.emailMessage.pageList.permission,
    accessWayCollection.emailSenderAgentStatistic.pageList.permission,
    accessWayCollection.emailStatistic.pageList.permission,
  ],
  routes: [
    emailSenderAgent,
    emailMessage,
    emailSenderAgentStatistic,
    emailStatistic,
  ],
};

export const services = {
  name: 'services',
  icon: 'reconciliation',
  path: '/services',
  routes: [
    {
      name: 'hostService',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/services/hostService',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.hostService.pageList.permission,
        accessWayCollection.hostServiceLog.pageList.permission,
      ],
      routes: [
        {
          path: '/services/hostService',
          redirect: '/services/hostService/pageList',
        },
        {
          path: '/services/hostService/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/services/hostService/pageList/no',
        },
        {
          path: '/services/hostService/pageList/:pageKey',
          hideInMenu: true,
          component: './general/HostService/PageList',
        },
        {
          path: '/services/hostService/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/HostService/Edit',
          routes: [
            {
              path: '/services/hostService/edit/:op/:id/:pageKey/changeRecord',
              routes: [
                {
                  path: '/services/hostService/edit/:op/:id/:pageKey/changeRecord',
                  redirect:
                    '/services/hostService/edit/:op/:id/:pageKey/changeRecord/pageList',
                },
                {
                  path: '/services/hostService/edit/:op/:id/:pageKey/changeRecord/pageList',
                  component: './general/HostService/Edit/ChangeRecord/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'hostServiceLog',
      icon: 'reconciliation',
      hideChildrenInMenu: true,
      path: '/services/hostServiceLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.hostServiceLog.pageList.permission,
      ],
      routes: [
        {
          path: '/services/hostServiceLog',
          redirect: '/services/hostServiceLog/pageList',
        },
        {
          path: '/services/hostServiceLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/services/hostServiceLog/pageList/no',
        },
        {
          path: '/services/hostServiceLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/HostServiceLog/PageList',
        },
      ],
    },
  ],
};

export const apps = {
  name: 'app',
  icon: 'appstore',
  path: '/app',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.applicationSource.pageList.permission,
    accessWayCollection.application.pageList.permission,
  ],
  routes: [
    {
      name: 'applicationSource',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/app/applicationSource',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.applicationSource.pageList.permission,
      ],
      routes: [
        {
          path: '/app/applicationSource',
          redirect: '/app/applicationSource/pageList',
        },
        {
          path: '/app/applicationSource/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/app/applicationSource/pageList/no',
        },
        {
          path: '/app/applicationSource/pageList/:pageKey',
          hideInMenu: true,
          component: './general/ApplicationSource/PageList',
        },
        {
          path: '/app/applicationSource/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/ApplicationSource/Edit',
          routes: [
            {
              path: '/app/applicationSource/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/ApplicationSource/Edit/BasicInfo',
            },
            {
              path: '/app/applicationSource/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/app/applicationSource/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/app/applicationSource/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/app/applicationSource/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './general/ApplicationSource/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'application',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/app/application',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.application.pageList.permission,
      ],
      routes: [
        {
          path: '/app/application',
          redirect: '/app/application/pageList/no',
        },
        {
          path: '/app/application/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/Application/PageList',
        },
        {
          path: '/app/application/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/Application/Edit',
          routes: [
            {
              path: '/app/application/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/Application/Edit/BasicInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/applicationNavigation',
              name: 'applicationNavigation',
              routes: [
                {
                  path: '/app/application/edit/:op/:id/:pageKey/applicationNavigation',
                  redirect:
                    '/app/application/edit/:op/:id/:pageKey/applicationNavigation/pageList',
                },
                {
                  path: '/app/application/edit/:op/:id/:pageKey/applicationNavigation/pageList',
                  component:
                    './general/Application/Edit/ApplicationNavigation/PageList',
                },
              ],
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/customGlobalDataInfo',
              name: 'customGlobalDataInfo',
              component: './general/Application/Edit/CustomGlobalDataInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/pagePathInfo',
              name: 'pagePathInfo',
              component: './general/Application/Edit/PagePathInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatApplicationInfo',
              name: 'weChatApplicationInfo',
              component: './general/Application/Edit/WeChatApplicationInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatPayCertificateInfo',
              name: 'weChatPayCertificateInfo',
              component: './general/Application/Edit/WeChatPayCertificateInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatMessageTemplateInfo',
              name: 'weChatMessageTemplateInfo',
              component: './general/Application/Edit/WeChatMessageTemplateInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatMessageTargetPathInfo',
              name: 'weChatMessageTargetPathInfo',
              component:
                './general/Application/Edit/WeChatMessageTargetPathInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/jiGuangInfo',
              name: 'jiGuangInfo',
              component: './general/Application/Edit/JiGuangInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/articleNotificationInfo',
              name: 'articleNotificationInfo',
              component: './general/Application/Edit/ArticleNotificationInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/checkInInfo',
              name: 'checkInInfo',
              component: './general/Application/Edit/CheckInInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/applicationVersion',
              name: 'applicationVersion',
              routes: [
                {
                  path: '/app/application/edit/:op/:id/:pageKey/applicationVersion',
                  redirect:
                    '/app/application/edit/:op/:id/:pageKey/applicationVersion/pageList',
                },
                {
                  path: '/app/application/edit/:op/:id/:pageKey/applicationVersion/pageList',
                  component:
                    './general/Application/Edit/ApplicationVersion/PageList',
                },
              ],
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/app/application/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/app/application/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/app/application/edit/:op/:id/:pageKey/operateLog/pageList',
                  component: './general/Application/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const tag = {
  name: 'tag',
  icon: 'tags',
  hideChildrenInMenu: true,
  path: '/data/tag',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.tag.pageList.permission,
  ],
  routes: [
    {
      path: '/data/tag',
      redirect: '/data/tag/pageList',
    },
    {
      path: '/data/tag/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/data/tag/pageList/no',
    },
    {
      path: '/data/tag/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Tag/PageList',
    },
    {
      path: '/data/tag/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Tag/Edit',
      routes: [
        {
          path: '/data/tag/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Tag/Edit/BasicInfo',
        },
        {
          path: '/data/tag/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/data/tag/edit/:op/:id/:pageKey/operateLog',
              redirect: '/data/tag/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/data/tag/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Tag/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const administrativeDivision = {
  name: 'administrativeDivision',
  icon: 'tags',
  hideChildrenInMenu: true,
  path: '/data/administrativeDivision',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.administrativeDivision.pageList.permission,
  ],
  routes: [
    {
      path: '/data/administrativeDivision',
      redirect: '/data/administrativeDivision/pageList',
    },
    {
      path: '/data/administrativeDivision/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/data/administrativeDivision/pageList/no',
    },
    {
      path: '/data/administrativeDivision/pageList/:pageKey',
      hideInMenu: true,
      component: './general/AdministrativeDivision/PageList',
    },
    {
      path: '/data/administrativeDivision/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/AdministrativeDivision/Edit',
      routes: [
        {
          path: '/data/administrativeDivision/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/AdministrativeDivision/Edit/BasicInfo',
        },
        {
          path: '/data/administrativeDivision/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/data/administrativeDivision/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/data/administrativeDivision/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/data/administrativeDivision/edit/:op/:id/:pageKey/operateLog/pageList',
              component:
                './general/AdministrativeDivision/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const section = {
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
      component: './general/Section/PageList',
    },
    {
      path: '/news/section/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Section/Edit',
      routes: [
        {
          path: '/news/section/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Section/Edit/BasicInfo',
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
                './general/Section/Edit/SectionApplicationConfig/PageList',
            },
          ],
        },
        {
          path: '/news/section/edit/:op/:id/:pageKey/contentInfo',
          name: 'contentInfo',
          component: './general/Section/Edit/ContentInfo',
        },
        {
          path: '/news/section/edit/:op/:id/:pageKey/mediaInfo',
          name: 'mediaInfo',
          component: './general/Section/Edit/MediaInfo',
        },
        {
          path: '/news/section/edit/:op/:id/:pageKey/scoreInfo',
          component: './general/Section/Edit/ReadObtainScoreInfo',
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
              component: './general/Section/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const businessSet = {
  name: 'businessSet',
  icon: 'optionPools',
  hideChildrenInMenu: true,
  path: '/data/businessSet',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.businessSet.pageList.permission,
  ],
  routes: [
    {
      path: '/data/businessSet',
      redirect: '/data/businessSet/pageList',
    },
    {
      path: '/data/businessSet/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/data/businessSet/pageList/no',
    },
    {
      path: '/data/businessSet/pageList/:pageKey',
      hideInMenu: true,
      component: './general/BusinessSet/PageList',
    },
  ],
};

export const optionPool = {
  name: 'optionPool',
  icon: 'optionPools',
  hideChildrenInMenu: true,
  path: '/data/optionPool',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.optionPool.pageList.permission,
  ],
  routes: [
    {
      path: '/data/optionPool',
      redirect: '/data/optionPool/pageList',
    },
    {
      path: '/data/optionPool/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/data/optionPool/pageList/no',
    },
    {
      path: '/data/optionPool/pageList/:pageKey',
      hideInMenu: true,
      component: './general/OptionPool/PageList',
    },
  ],
};

export const generalDiscourse = {
  name: 'generalDiscourse',
  icon: 'bars',
  hideChildrenInMenu: true,
  path: '/data/generalDiscourse',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.generalDiscourse.pageList.permission,
  ],
  routes: [
    {
      path: '/data/generalDiscourse',
      redirect: '/data/generalDiscourse/pageList/no',
    },
    {
      path: '/data/generalDiscourse/pageList/:pageKey',
      name: 'pageList',
      hideInMenu: true,
      component: './general/GeneralDiscourse/PageList',
    },
  ],
};

export const subsidiaryMessages = {
  name: 'subsidiaryMessages',
  icon: 'read',
  path: '/subsidiaryMessages',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.subsidiaryComplaintCategory.pageList.permission,
    accessWayCollection.subsidiaryComplaintMessage.pageList.permission,
    accessWayCollection.subsidiaryFeedbackMessage.pageList.permission,
    accessWayCollection.subsidiaryReportMessage.pageList.permission,
  ],
  routes: [
    {
      name: 'subsidiaryComplaintCategory',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/subsidiaryMessages/subsidiaryComplaintCategory',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryComplaintCategory.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryComplaintCategory',
          redirect:
            '/subsidiaryMessages/subsidiaryComplaintCategory/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryComplaintCategory/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SubsidiaryComplaintCategory/PageList',
        },
      ],
    },
    {
      name: 'subsidiaryComplaintMessage',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/subsidiaryMessages/subsidiaryComplaintMessage',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryComplaintMessage.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryComplaintMessage',
          redirect:
            '/subsidiaryMessages/subsidiaryComplaintMessage/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryComplaintMessage/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SubsidiaryComplaintMessage/PageList',
        },
        {
          path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/SubsidiaryComplaintMessage/Edit',
          routes: [
            {
              path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/SubsidiaryComplaintMessage/Edit/BasicInfo',
            },
            {
              path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/subsidiaryMessages/subsidiaryComplaintMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './general/SubsidiaryComplaintMessage/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'subsidiaryFeedbackMessage',
      icon: 'bars',
      path: '/subsidiaryMessages/subsidiaryFeedbackMessage',
      hideChildrenInMenu: true,
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryFeedbackMessage.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryFeedbackMessage',
          redirect: '/subsidiaryMessages/subsidiaryFeedbackMessage/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryFeedbackMessage/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SubsidiaryFeedbackMessage/PageList',
        },
        {
          path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/SubsidiaryFeedbackMessage/Edit',
          routes: [
            {
              path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/SubsidiaryFeedbackMessage/Edit/BasicInfo',
            },
            {
              path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/subsidiaryMessages/subsidiaryFeedbackMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './general/SubsidiaryFeedbackMessage/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'subsidiaryReportMessage',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/subsidiaryMessages/subsidiaryReportMessage',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.subsidiaryReportMessage.pageList.permission,
      ],
      routes: [
        {
          path: '/subsidiaryMessages/subsidiaryReportMessage',
          redirect: '/subsidiaryMessages/subsidiaryReportMessage/pageList/no',
        },
        {
          path: '/subsidiaryMessages/subsidiaryReportMessage/pageList/:pageKey',
          name: 'pageList',
          hideInMenu: true,
          component: './general/SubsidiaryReportMessage/PageList',
        },
        {
          path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/SubsidiaryReportMessage/Edit',
          routes: [
            {
              path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/SubsidiaryReportMessage/Edit/BasicInfo',
            },
            {
              path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/subsidiaryMessages/subsidiaryReportMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  component:
                    './general/SubsidiaryReportMessage/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const question = {
  name: 'question',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/survey/question',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.question.pageList.permission,
  ],
  routes: [
    {
      path: '/survey/question',
      redirect: '/survey/question/pageList',
    },
    {
      path: '/survey/question/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/survey/question/pageList/no',
    },
    {
      path: '/survey/question/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Question/PageList',
    },
    {
      path: '/survey/question/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Question/Edit',
      routes: [
        {
          path: '/survey/question/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Question/Edit/BasicInfo',
        },
        {
          path: '/survey/question/edit/:op/:id/:pageKey/items',
          name: 'items',
          routes: [
            {
              path: '/survey/question/edit/:op/:id/:pageKey/items',
              redirect: '/survey/question/edit/:op/:id/:pageKey/items/pageList',
            },
            {
              path: '/survey/question/edit/:op/:id/:pageKey/items/pageList',
              component: './general/Question/Edit/Items/PageList',
            },
          ],
        },
        {
          path: '/survey/question/edit/:op/:id/:pageKey/answerInfo',
          name: 'answerInfo',
          component: './general/Question/Edit/AnswerInfo',
        },
        {
          path: '/survey/question/edit/:op/:id/:pageKey/tagInfo',
          name: 'tagInfo',
          authority: [
            accessWayCollection.questionTagRelation.pageList.permission,
          ],
          routes: [
            {
              path: '/survey/question/edit/:op/:id/:pageKey/tagInfo',
              redirect:
                '/survey/question/edit/:op/:id/:pageKey/tagInfo/pageList',
            },
            {
              path: '/survey/question/edit/:op/:id/:pageKey/tagInfo/pageList',
              component: './general/Question/Edit/TagInfo/PageList',
            },
          ],
        },
        {
          path: '/survey/question/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/survey/question/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/survey/question/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/survey/question/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Question/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const questionItem = {
  name: 'questionItem',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/survey/questionItem',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.question.pageList.permission,
  ],
  routes: [
    {
      path: '/survey/questionItem',
      redirect: '/survey/questionItem/pageList',
    },
    {
      path: '/survey/questionItem/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/survey/questionItem/pageList/no',
    },
    {
      path: '/survey/questionItem/pageList/:pageKey',
      hideInMenu: true,
      component: './general/QuestionItem/PageList',
    },
  ],
};

export const questionnaire = {
  name: 'questionnaire',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/survey/questionnaire',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.questionnaire.pageList.permission,
  ],
  routes: [
    {
      path: '/survey/questionnaire',
      redirect: '/survey/questionnaire/pageList',
    },
    {
      path: '/survey/questionnaire/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/survey/questionnaire/pageList/no',
    },
    {
      path: '/survey/questionnaire/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Questionnaire/PageList',
    },
    {
      path: '/survey/questionnaire/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Questionnaire/Edit',
      routes: [
        {
          path: '/survey/questionnaire/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Questionnaire/Edit/BasicInfo',
        },
        {
          path: '/survey/questionnaire/edit/:op/:id/:pageKey/question',
          name: 'question',
          routes: [
            {
              path: '/survey/questionnaire/edit/:op/:id/:pageKey/question',
              redirect:
                '/survey/questionnaire/edit/:op/:id/:pageKey/question/pageList',
            },
            {
              path: '/survey/questionnaire/edit/:op/:id/:pageKey/question/pageList',
              component: './general/Questionnaire/Edit/Question/PageList',
            },
          ],
        },
        {
          path: '/survey/questionnaire/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/survey/questionnaire/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/survey/questionnaire/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/survey/questionnaire/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Questionnaire/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const survey = {
  name: 'survey',
  icon: 'reconciliation',
  path: '/survey',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.question.pageList.permission,
  ],
  routes: [question, questionItem, questionnaire],
};

export const uploadHistory = {
  name: 'uploadHistory',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/files/uploadHistory',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.uploadHistory.pageList.permission,
  ],
  routes: [
    {
      path: '/files/uploadHistory',
      redirect: '/files/uploadHistory/pageList',
    },
    {
      path: '/files/uploadHistory/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/files/uploadHistory/pageList/no',
    },
    {
      path: '/files/uploadHistory/pageList/:pageKey',
      hideInMenu: true,
      component: './general/UploadHistory/PageList',
    },
  ],
};

export const cloudStorage = {
  name: 'cloudStorage',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/files/cloudStorage',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.cloudStorage.pageList.permission,
  ],
  routes: [
    {
      path: '/files/cloudStorage',
      redirect: '/files/cloudStorage/pageList',
    },
    {
      path: '/files/cloudStorage/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/files/cloudStorage/pageList/no',
    },
    {
      path: '/files/cloudStorage/pageList/:pageKey',
      hideInMenu: true,
      component: './general/CloudStorage/PageList',
    },
  ],
};

export const subsidiary = {
  name: 'subsidiary',
  icon: 'subsidiary',
  hideChildrenInMenu: true,
  path: '/organization/subsidiary',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.subsidiary.pageList.permission,
  ],
  routes: [
    {
      path: '/organization/subsidiary',
      redirect: '/organization/subsidiary/pageList',
    },
    {
      path: '/organization/subsidiary/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/organization/subsidiary/pageList/no',
    },
    {
      path: '/organization/subsidiary/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Subsidiary/PageList',
    },
    {
      path: '/organization/subsidiary/add',
      name: 'add',
      hideInMenu: true,
      component: './general/Subsidiary/AddBasicInfo',
    },
    {
      path: '/organization/subsidiary/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Subsidiary/Edit',
      routes: [
        {
          path: '/organization/subsidiary/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Subsidiary/Edit/BasicInfo',
        },
        {
          path: '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Subsidiary/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const department = {
  name: 'department',
  icon: 'department',
  hideChildrenInMenu: true,
  path: '/organization/department',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.department.pageList.permission,
  ],
  routes: [
    {
      path: '/organization/department',
      redirect: '/organization/department/pageList',
    },
    {
      path: '/organization/department/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/organization/department/pageList/no',
    },
    {
      path: '/organization/department/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Department/PageList',
    },
    {
      path: '/organization/department/add',
      name: 'add',
      hideInMenu: true,
      component: './general/Department/AddBasicInfo',
    },
    {
      path: '/organization/department/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Department/Edit',
      routes: [
        {
          path: '/organization/department/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Department/Edit/BasicInfo',
        },
        {
          path: '/organization/department/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/organization/department/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/organization/department/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/organization/department/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Department/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const position = {
  name: 'position',
  icon: 'position',
  hideChildrenInMenu: true,
  path: '/organization/position',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.position.pageList.permission,
  ],
  routes: [
    {
      path: '/organization/position',
      redirect: '/organization/position/pageList',
    },
    {
      path: '/organization/position/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/organization/position/pageList/no',
    },
    {
      path: '/organization/position/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Position/PageList',
    },
  ],
};

export const positionGrade = {
  name: 'positionGrade',
  icon: 'positionGrade',
  hideChildrenInMenu: true,
  path: '/organization/positionGrade',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.positionGrade.pageList.permission,
  ],
  routes: [
    {
      path: '/organization/positionGrade',
      redirect: '/organization/positionGrade/pageList',
    },
    {
      path: '/organization/positionGrade/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/organization/positionGrade/pageList/no',
    },
    {
      path: '/organization/positionGrade/pageList/:pageKey',
      hideInMenu: true,
      component: './general/PositionGrade/PageList',
    },
  ],
};

export const organization = {
  name: 'organization',
  icon: 'deploymentUnit',
  path: '/organization',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.subsidiary.pageList.permission,
    accessWayCollection.department.pageList.permission,
  ],
  routes: [
    subsidiary,
    department,
    position,
    positionGrade,
    {
      name: 'graph',
      icon: 'graph',
      // hideChildrenInMenu: true,
      path: '/organization/graph',
      routes: [
        {
          path: '/organization/graph',
          redirect: '/organization/graph/graphicalTree',
        },
        {
          path: '/organization/graph/graphicalTree',
          name: 'graphicalTree',
          // hideInMenu: true,
          component: './general/Organization/GraphicalTree',
        },
        {
          path: '/organization/graph/graphicalDirectDepartmentTree',
          name: 'graphicalDirectDepartmentTree',
          // hideInMenu: true,
          component: './general/Organization/GraphicalDirectDepartmentTree',
        },
      ],
    },
  ],
};

export const flow = {
  name: 'flow',
  icon: 'reconciliation',
  path: '/flow',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.workflow.pageList.permission,
    accessWayCollection.workflowCase.pageList.permission,
    accessWayCollection.workflowCaseProcessHistory.pageList.permission,
    accessWayCollection.workflowCaseNextProcessProgress.pageList.permission,
    accessWayCollection.workflowCaseNextProcessNotification.pageList.permission,
    accessWayCollection.workflowCaseNextProcessApprove.pageList.permission,
  ],
  routes: [
    {
      name: 'workflow',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflow',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflow.pageList.permission,
      ],
      routes: [
        {
          path: '/flow/workflow',
          redirect: '/flow/workflow/pageList',
        },
        {
          path: '/flow/workflow/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflow/pageList/no',
        },
        {
          path: '/flow/workflow/pageList/:pageKey',
          hideInMenu: true,
          component: './general/Workflow/PageList',
        },
        {
          path: '/flow/workflow/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/Workflow/Edit',
          routes: [
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/Workflow/Edit/BasicInfo',
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveSubsidiaryRelation',
              name: 'workflowRangeEffectiveSubsidiaryRelation',
              routes: [
                {
                  path: '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveSubsidiaryRelation',
                  redirect:
                    '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveSubsidiaryRelation/pageList',
                },
                {
                  path: '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveSubsidiaryRelation/pageList',
                  component:
                    './general/Workflow/Edit/WorkflowRangeEffectiveSubsidiaryRelation/PageList',
                },
              ],
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveExternalDepartmentRelation',
              name: 'workflowRangeEffectiveExternalDepartmentRelation',
              routes: [
                {
                  path: '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveExternalDepartmentRelation',
                  redirect:
                    '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveExternalDepartmentRelation/pageList',
                },
                {
                  path: '/flow/workflow/edit/:op/:id/:pageKey/workflowRangeEffectiveExternalDepartmentRelation/pageList',
                  component:
                    './general/Workflow/Edit/WorkflowRangeEffectiveExternalDepartmentRelation/PageList',
                },
              ],
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/fromInfo',
              name: 'fromInfo',
              component: './general/Workflow/Edit/FromInfo',
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/designInfo',
              name: 'designInfo',
              component: './general/Workflow/Edit/DesignInfo',
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/debugCaseInfo',
              name: 'debugCaseInfo',
              component: './general/Workflow/Edit/DebugCaseInfo',
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/flow/workflow/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flow/workflow/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/flow/workflow/edit/:op/:id/:pageKey/operateLog/pageList',
                  component: './general/Workflow/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'workflowCase',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflowCase',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCase.pageList.permission,
      ],
      routes: [
        {
          path: '/flow/workflowCase',
          redirect: '/flow/workflowCase/pageList',
        },
        {
          path: '/flow/workflowCase/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflowCase/pageList/no',
        },
        {
          path: '/flow/workflowCase/pageList/:pageKey',
          hideInMenu: true,
          component: './general/WorkflowCase/PageList',
        },
        {
          path: '/flow/workflowCase/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/WorkflowCase/Edit',
          routes: [
            {
              path: '/flow/workflowCase/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/WorkflowCase/Edit/BasicInfo',
            },
            {
              path: '/flow/workflowCase/edit/:op/:id/:pageKey/formInfo',
              name: 'formInfo',
              component: './general/WorkflowCase/Edit/FormInfo',
            },
            {
              path: '/flow/workflowCase/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/flow/workflowCase/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/flow/workflowCase/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/flow/workflowCase/edit/:op/:id/:pageKey/operateLog/pageList',
                  component: './general/WorkflowCase/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'workflowCaseProcessHistory',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflowCaseProcessHistory',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseProcessHistory.pageList.permission,
      ],
      routes: [
        {
          path: '/flow/workflowCaseProcessHistory',
          redirect: '/flow/workflowCaseProcessHistory/pageList',
        },
        {
          path: '/flow/workflowCaseProcessHistory/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflowCaseProcessHistory/pageList/no',
        },
        {
          path: '/flow/workflowCaseProcessHistory/pageList/:pageKey',
          hideInMenu: true,
          component: './general/WorkflowCaseProcessHistory/PageList',
        },
      ],
    },
    {
      name: 'workflowCaseNextProcessProgress',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflowCaseNextProcessProgress',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseNextProcessProgress.pageList.permission,
      ],
      routes: [
        {
          path: '/flow/workflowCaseNextProcessProgress',
          redirect: '/flow/workflowCaseNextProcessProgress/pageList',
        },
        {
          path: '/flow/workflowCaseNextProcessProgress/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflowCaseNextProcessProgress/pageList/no',
        },
        {
          path: '/flow/workflowCaseNextProcessProgress/pageList/:pageKey',
          hideInMenu: true,
          component: './general/WorkflowCaseNextProcessProgress/PageList',
        },
      ],
    },
    {
      name: 'workflowCaseNextProcessNotification',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflowCaseNextProcessNotification',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseNextProcessNotification.pageList
          .permission,
      ],
      routes: [
        {
          path: '/flow/workflowCaseNextProcessNotification',
          redirect: '/flow/workflowCaseNextProcessNotification/pageList',
        },
        {
          path: '/flow/workflowCaseNextProcessNotification/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflowCaseNextProcessNotification/pageList/no',
        },
        {
          path: '/flow/workflowCaseNextProcessNotification/pageList/:pageKey',
          hideInMenu: true,
          component: './general/WorkflowCaseNextProcessNotification/PageList',
        },
      ],
    },
    {
      name: 'workflowCaseNextProcessApprove',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflowCaseNextProcessApprove',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseNextProcessApprove.pageList.permission,
      ],
      routes: [
        {
          path: '/flow/workflowCaseNextProcessApprove',
          redirect: '/flow/workflowCaseNextProcessApprove/pageList',
        },
        {
          path: '/flow/workflowCaseNextProcessApprove/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflowCaseNextProcessApprove/pageList/no',
        },
        {
          path: '/flow/workflowCaseNextProcessApprove/pageList/:pageKey',
          hideInMenu: true,
          component: './general/WorkflowCaseNextProcessApprove/PageList',
        },
      ],
    },
    {
      name: 'workflowCaseUserMonitorConfiguration',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/workflowCaseUserMonitorConfiguration',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.workflowCaseUserMonitorConfiguration.pageList
          .permission,
      ],
      routes: [
        {
          path: '/flow/workflowCaseUserMonitorConfiguration',
          redirect: '/flow/workflowCaseUserMonitorConfiguration/pageList',
        },
        {
          path: '/flow/workflowCaseUserMonitorConfiguration/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/workflowCaseUserMonitorConfiguration/pageList/no',
        },
        {
          path: '/flow/workflowCaseUserMonitorConfiguration/pageList/:pageKey',
          hideInMenu: true,
          component: './general/WorkflowCaseUserMonitorConfiguration/PageList',
        },
      ],
    },
    {
      name: 'userWorkflowConfigure',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/flow/userWorkflowConfigure',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.userWorkflowConfigure.pageList.permission,
      ],
      routes: [
        {
          path: '/flow/userWorkflowConfigure',
          redirect: '/flow/userWorkflowConfigure/pageList',
        },
        {
          path: '/flow/userWorkflowConfigure/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/flow/userWorkflowConfigure/pageList/no',
        },
        {
          path: '/flow/userWorkflowConfigure/pageList/:pageKey',
          hideInMenu: true,
          component: './general/UserWorkflowConfigure/PageList',
        },
      ],
    },
  ],
};

export const accessWay = {
  name: 'accessWay',
  icon: 'bars',
  hideChildrenInMenu: true,
  path: '/permission/accessWay',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.accessWay.pageList.permission,
  ],
  routes: [
    {
      path: '/permission/accessWay',
      redirect: '/permission/accessWay/pageList',
    },
    {
      path: '/permission/accessWay/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/permission/accessWay/pageList/no',
    },
    {
      path: '/permission/accessWay/pageList/:pageKey',
      hideInMenu: true,
      component: './general/AccessWay/PageList',
    },
  ],
};

export const presetRole = {
  name: 'presetRole',
  icon: 'bars',
  hideChildrenInMenu: true,
  path: '/permission/presetRole',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.presetRole.pageList.permission,
  ],
  routes: [
    {
      path: '/permission/presetRole',
      redirect: '/permission/presetRole/pageList/no',
    },
    {
      path: '/permission/presetRole/add',
      name: 'add',
      hideInMenu: true,
      component: './general/PresetRole/Add',
    },
    {
      path: '/permission/presetRole/pageList/:pageKey',
      name: 'pageList',
      hideInMenu: true,
      component: './general/PresetRole/PageList',
    },
    {
      path: '/permission/presetRole/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/PresetRole/Edit',
      routes: [
        {
          path: '/permission/presetRole/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/PresetRole/Edit/BasicInfo',
        },
        {
          path: '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo',
          name: 'moduleInfo',
          routes: [
            {
              path: '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo',
              redirect:
                '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo/singleList',
            },
            {
              path: '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo/singleList',
              name: 'singleList',
              component: './general/PresetRole/Edit/ModuleInfo/SingleList',
            },
          ],
        },
        {
          path: '/permission/presetRole/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/permission/presetRole/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/permission/presetRole/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/permission/presetRole/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/PresetRole/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const customer = {
  name: 'customer',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/frontEndUser/customer',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.customer.pageList.permission,
  ],
  routes: [
    {
      path: '/frontEndUser/customer',
      redirect: '/frontEndUser/customer/pageList',
    },
    {
      path: '/frontEndUser/customer/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/frontEndUser/customer/pageList/no',
    },
    {
      path: '/frontEndUser/customer/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Customer/PageList',
    },
    {
      path: '/frontEndUser/customer/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Customer/Edit',
      routes: [
        {
          path: '/frontEndUser/customer/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Customer/Edit/BasicInfo',
        },
        {
          path: '/frontEndUser/customer/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/frontEndUser/customer/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/frontEndUser/customer/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/frontEndUser/customer/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Customer/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const customerLoginLog = {
  name: 'customerLoginLog',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/frontEndUser/customerLoginLog',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.customerLoginLog.pageList.permission,
  ],
  routes: [
    {
      path: '/frontEndUser/customerLoginLog',
      redirect: '/frontEndUser/customerLoginLog/pageList',
    },
    {
      path: '/frontEndUser/customerLoginLog/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/frontEndUser/customerLoginLog/pageList/no',
    },
    {
      path: '/frontEndUser/customerLoginLog/pageList/:pageKey',
      hideInMenu: true,
      component: './general/CustomerLoginLog/PageList',
    },
  ],
};

export const customerWechatApplicationInfo = {
  name: 'customerWechatApplicationInfo',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/frontEndUser/customerWechatApplicationInfo',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.customerWechatApplicationInfo.pageList.permission,
  ],
  routes: [
    {
      path: '/frontEndUser/customerWechatApplicationInfo',
      redirect: '/frontEndUser/customerWechatApplicationInfo/pageList',
    },
    {
      path: '/frontEndUser/customerWechatApplicationInfo/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/frontEndUser/customerWechatApplicationInfo/pageList/no',
    },
    {
      path: '/frontEndUser/customerWechatApplicationInfo/pageList/:pageKey',
      hideInMenu: true,
      component: './general/CustomerWechatApplicationInfo/PageList',
    },
  ],
};

export const user = {
  name: 'user',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/person/user',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.user.pageList.permission,
  ],
  routes: [
    {
      path: '/person/user',
      redirect: '/person/user/pageList',
    },
    {
      path: '/person/user/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/user/pageList/no',
    },
    {
      path: '/person/user/pageList/:pageKey',
      hideInMenu: true,
      component: './general/User/PageList',
    },
    {
      path: '/person/user/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/User/Edit',
      routes: [
        {
          path: '/person/user/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/User/Edit/BasicInfo',
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/parentInfo',
          name: 'parentInfo',
          component: './general/User/Edit/ParentInfo',
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/signetInfo',
          name: 'signetInfo',
          component: './general/User/Edit/SignetInfo',
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo',
          name: 'userDepartmentInfo',
          routes: [
            {
              path: '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo',
              redirect:
                '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo/pageList',
            },
            {
              path: '/person/user/edit/:op/:id/:pageKey/userDepartmentInfo/pageList',
              component: './general/User/Edit/UserDepartmentInfo/PageList',
            },
          ],
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/userSubsidiaryInfo',
          name: 'userSubsidiaryInfo',
          routes: [
            {
              path: '/person/user/edit/:op/:id/:pageKey/userSubsidiaryInfo',
              redirect:
                '/person/user/edit/:op/:id/:pageKey/userSubsidiaryInfo/pageList',
            },
            {
              path: '/person/user/edit/:op/:id/:pageKey/userSubsidiaryInfo/pageList',
              component: './general/User/Edit/UserSubsidiaryInfo/PageList',
            },
          ],
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/person/user/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/person/user/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/person/user/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/User/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const userLoginLog = {
  name: 'userLoginLog',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/person/userLoginLog',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.userLoginLog.pageList.permission,
  ],
  routes: [
    {
      path: '/person/userLoginLog',
      redirect: '/person/userLoginLog/pageList',
    },
    {
      path: '/person/userLoginLog/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/userLoginLog/pageList/no',
    },
    {
      path: '/person/userLoginLog/pageList/:pageKey',
      hideInMenu: true,
      component: './general/UserLoginLog/PageList',
    },
  ],
};

export const userSignet = {
  name: 'userSignet',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/person/userSignet',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.user.pageList.permission,
  ],
  routes: [
    {
      path: '/person/userSignet',
      redirect: '/person/userSignet/pageList',
    },
    {
      path: '/person/userSignet/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/userSignet/pageList/no',
    },
    {
      path: '/person/userSignet/pageList/:pageKey',
      hideInMenu: true,
      component: './general/User/PageListSignet',
    },
  ],
};

export const userDevice = {
  name: 'userDevice',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/person/userDevice',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.userDevice.pageList.permission,
  ],
  routes: [
    {
      path: '/person/userDevice',
      redirect: '/person/userDevice/pageList',
    },
    {
      path: '/person/userDevice/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/userDevice/pageList/no',
    },
    {
      path: '/person/userDevice/pageList/:pageKey',
      hideInMenu: true,
      component: './general/UserDevice/PageList',
    },
    {
      path: '/person/userDevice/add',
      name: 'add',
      hideInMenu: true,
      component: './general/UserDevice/Add',
    },
    {
      path: '/person/userDevice/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/UserDevice/Edit',
      routes: [
        {
          path: '/person/userDevice/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/UserDevice/Edit/BasicInfo',
        },
        {
          path: '/person/userDevice/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/person/userDevice/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/person/userDevice/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/person/userDevice/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/UserDevice/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const userWechatApplicationInfo = {
  name: 'userWechatApplicationInfo',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/person/userWechatApplicationInfo',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.userWechatApplicationInfo.pageList.permission,
  ],
  routes: [
    {
      path: '/person/userWechatApplicationInfo',
      redirect: '/person/userWechatApplicationInfo/pageList',
    },
    {
      path: '/person/userWechatApplicationInfo/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/userWechatApplicationInfo/pageList/no',
    },
    {
      path: '/person/userWechatApplicationInfo/pageList/:pageKey',
      hideInMenu: true,
      component: './general/UserWechatApplicationInfo/PageList',
    },
  ],
};

export const userGeneralDiscourse = {
  name: 'userGeneralDiscourse',
  icon: 'user',
  hideChildrenInMenu: true,
  path: '/person/userGeneralDiscourse',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.userGeneralDiscourse.pageList.permission,
  ],
  routes: [
    {
      path: '/person/userGeneralDiscourse',
      redirect: '/person/userGeneralDiscourse/pageList',
    },
    {
      path: '/person/userGeneralDiscourse/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/userGeneralDiscourse/pageList/no',
    },
    {
      path: '/person/userGeneralDiscourse/pageList/:pageKey',
      hideInMenu: true,
      component: './general/UserGeneralDiscourse/PageList',
    },
  ],
};

export const internalTester = {
  name: 'internalTester',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/person/internalTester',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.internalTester.pageList.permission,
  ],
  routes: [
    {
      path: '/person/internalTester',
      redirect: '/person/internalTester/pageList',
    },
    {
      path: '/person/internalTester/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/person/internalTester/pageList/no',
    },
    {
      path: '/person/internalTester/pageList/:pageKey',
      hideInMenu: true,
      component: './general/InternalTester/PageList',
    },
    {
      path: '/person/internalTester/add',
      hideInMenu: true,
      component: './general/InternalTester/Add',
    },
  ],
};

const galleryCategory = {
  name: 'galleryCategory',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/assistTools/galleryCategory',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.galleryCategory.pageList.permission,
  ],
  routes: [
    {
      path: '/assistTools/galleryCategory',
      redirect: '/assistTools/galleryCategory/pageList',
    },
    {
      path: '/assistTools/galleryCategory/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/assistTools/galleryCategory/pageList/no',
    },
    {
      path: '/assistTools/galleryCategory/pageList/:pageKey',
      hideInMenu: true,
      component: './general/GalleryCategory/PageList',
    },
  ],
};

const gallery = {
  name: 'gallery',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/assistTools/gallery',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.gallery.pageList.permission,
  ],
  routes: [
    {
      path: '/assistTools/gallery',
      redirect: '/assistTools/gallery/pageList',
    },
    {
      path: '/assistTools/gallery/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/assistTools/gallery/pageList/no',
    },
    {
      path: '/assistTools/gallery/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Gallery/PageList',
    },
    {
      path: '/assistTools/gallery/add',
      name: 'add',
      hideInMenu: true,
      component: './general/Gallery/AddBasicInfo',
    },
    {
      path: '/assistTools/gallery/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/Gallery/Edit',
      routes: [
        {
          path: '/assistTools/gallery/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/Gallery/Edit/BasicInfo',
        },
        {
          path: '/assistTools/gallery/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/assistTools/gallery/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/assistTools/gallery/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/assistTools/gallery/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/Gallery/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

const qrCodeCategory = {
  name: 'qrCodeCategory',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/assistTools/qrCodeCategory',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.qrCodeCategory.pageList.permission,
  ],
  routes: [
    {
      path: '/assistTools/qrCodeCategory',
      redirect: '/assistTools/qrCodeCategory/pageList',
    },
    {
      path: '/assistTools/qrCodeCategory/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/assistTools/qrCodeCategory/pageList/no',
    },
    {
      path: '/assistTools/qrCodeCategory/pageList/:pageKey',
      hideInMenu: true,
      component: './general/QrCodeCategory/PageList',
    },
  ],
};

const qrCode = {
  name: 'qrCode',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/assistTools/qrCode',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.qrCode.pageList.permission,
  ],
  routes: [
    {
      path: '/assistTools/qrCode',
      redirect: '/assistTools/qrCode/pageList',
    },
    {
      path: '/assistTools/qrCode/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/assistTools/qrCode/pageList/no',
    },
    {
      path: '/assistTools/qrCode/pageList/:pageKey',
      hideInMenu: true,
      component: './general/QrCode/PageList',
    },
    {
      path: '/assistTools/qrCode/add',
      name: 'add',
      hideInMenu: true,
      component: './general/QrCode/AddBasicInfo',
    },
    {
      path: '/assistTools/qrCode/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/QrCode/Edit',
      routes: [
        {
          path: '/assistTools/qrCode/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/QrCode/Edit/BasicInfo',
        },
        {
          path: '/assistTools/qrCode/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/assistTools/qrCode/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/assistTools/qrCode/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/assistTools/qrCode/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/QrCode/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

const callCenterCategory = {
  name: 'callCenterCategory',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/assistTools/callCenterCategory',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.callCenterCategory.pageList.permission,
  ],
  routes: [
    {
      path: '/assistTools/callCenterCategory',
      redirect: '/assistTools/callCenterCategory/pageList',
    },
    {
      path: '/assistTools/callCenterCategory/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/assistTools/callCenterCategory/pageList/no',
    },
    {
      path: '/assistTools/callCenterCategory/pageList/:pageKey',
      hideInMenu: true,
      component: './general/CallCenterCategory/PageList',
    },
  ],
};

const callCenter = {
  name: 'callCenter',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/assistTools/callCenter',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.callCenter.pageList.permission,
  ],
  routes: [
    {
      path: '/assistTools/callCenter',
      redirect: '/assistTools/callCenter/pageList',
    },
    {
      path: '/assistTools/callCenter/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/assistTools/callCenter/pageList/no',
    },
    {
      path: '/assistTools/callCenter/pageList/:pageKey',
      hideInMenu: true,
      component: './general/CallCenter/PageList',
    },
    {
      path: '/assistTools/callCenter/add',
      name: 'add',
      hideInMenu: true,
      component: './general/CallCenter/AddBasicInfo',
    },
    {
      path: '/assistTools/callCenter/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/CallCenter/Edit',
      routes: [
        {
          path: '/assistTools/callCenter/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/CallCenter/Edit/BasicInfo',
        },
        {
          path: '/assistTools/callCenter/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/assistTools/callCenter/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/assistTools/callCenter/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/assistTools/callCenter/edit/:op/:id/:pageKey/operateLog/pageList',
              component: './general/CallCenter/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const assistTools = {
  name: 'assistTools',
  icon: 'reconciliation',
  path: '/assistTools',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.galleryCategory.pageList.permission,
    accessWayCollection.gallery.pageList.permission,
    accessWayCollection.callCenterCategory.pageList.permission,
    accessWayCollection.callCenter.pageList.permission,
    accessWayCollection.qrCodeCategory.pageList.permission,
    accessWayCollection.qrCode.pageList.permission,
  ],
  routes: [
    galleryCategory,
    gallery,
    qrCodeCategory,
    qrCode,
    callCenterCategory,
    callCenter,
  ],
};

const applicationUserFeedback = {
  name: 'applicationUserFeedback',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/applicationFeedback/applicationUserFeedback',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.applicationUserFeedback.pageList.permission,
  ],
  routes: [
    {
      path: '/applicationFeedback/applicationUserFeedback',
      redirect: '/applicationFeedback/applicationUserFeedback/pageList',
    },
    {
      path: '/applicationFeedback/applicationUserFeedback/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/applicationFeedback/applicationUserFeedback/pageList/no',
    },
    {
      path: '/applicationFeedback/applicationUserFeedback/pageList/:pageKey',
      hideInMenu: true,
      component: './general/ApplicationUserFeedback/PageList',
    },
    {
      path: '/applicationFeedback/applicationUserFeedback/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/ApplicationUserFeedback/Edit',
      routes: [
        {
          path: '/applicationFeedback/applicationUserFeedback/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/ApplicationUserFeedback/Edit/BasicInfo',
        },
        {
          path: '/applicationFeedback/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/applicationFeedback/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/applicationFeedback/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/applicationFeedback/applicationUserFeedback/edit/:op/:id/:pageKey/operateLog/pageList',
              component:
                './general/ApplicationUserFeedback/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

const applicationCustomerFeedback = {
  name: 'applicationCustomerFeedback',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/applicationFeedback/applicationCustomerFeedback',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.applicationCustomerFeedback.pageList.permission,
  ],
  routes: [
    {
      path: '/applicationFeedback/applicationCustomerFeedback',
      redirect: '/applicationFeedback/applicationCustomerFeedback/pageList',
    },
    {
      path: '/applicationFeedback/applicationCustomerFeedback/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/applicationFeedback/applicationCustomerFeedback/pageList/no',
    },
    {
      path: '/applicationFeedback/applicationCustomerFeedback/pageList/:pageKey',
      hideInMenu: true,
      component: './general/ApplicationCustomerFeedback/PageList',
    },
    {
      path: '/applicationFeedback/applicationCustomerFeedback/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './general/ApplicationCustomerFeedback/Edit',
      routes: [
        {
          path: '/applicationFeedback/applicationCustomerFeedback/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './general/ApplicationCustomerFeedback/Edit/BasicInfo',
        },
        {
          path: '/applicationFeedback/applicationCustomerFeedback/edit/:op/:id/:pageKey/operateLog',
          name: 'operateLog',
          routes: [
            {
              path: '/applicationFeedback/applicationCustomerFeedback/edit/:op/:id/:pageKey/operateLog',
              redirect:
                '/applicationFeedback/applicationCustomerFeedback/edit/:op/:id/:pageKey/operateLog/pageList',
            },
            {
              path: '/applicationFeedback/applicationCustomerFeedback/edit/:op/:id/:pageKey/operateLog/pageList',
              component:
                './general/ApplicationCustomerFeedback/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
    },
  ],
};

export const applicationFeedback = {
  name: 'applicationFeedback',
  icon: 'reconciliation',
  path: '/applicationFeedback',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.applicationUserFeedback.pageList.permission,
    accessWayCollection.applicationCustomerFeedback.pageList.permission,
  ],
  routes: [applicationUserFeedback, applicationCustomerFeedback],
};

const keyValueInfrastructure = {
  name: 'keyValueInfrastructure',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/dataDictionaryInfrastructure/keyValueInfrastructure',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.keyValueInfrastructure.pageList.permission,
  ],
  routes: [
    {
      path: '/dataDictionaryInfrastructure/keyValueInfrastructure',
      redirect: '/dataDictionaryInfrastructure/keyValueInfrastructure/pageList',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueInfrastructure/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect:
        '/dataDictionaryInfrastructure/keyValueInfrastructure/pageList/no',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueInfrastructure/pageList/:pageKey',
      hideInMenu: true,
      component: './general/KeyValueInfrastructure/PageList',
    },
  ],
};

const keyValueApplication = {
  name: 'keyValueApplication',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/dataDictionaryInfrastructure/keyValueApplication',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.keyValueApplication.pageList.permission,
  ],
  routes: [
    {
      path: '/dataDictionaryInfrastructure/keyValueApplication',
      redirect: '/dataDictionaryInfrastructure/keyValueApplication/pageList',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueApplication/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/dataDictionaryInfrastructure/keyValueApplication/pageList/no',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueApplication/pageList/:pageKey',
      hideInMenu: true,
      component: './general/KeyValueApplication/PageList',
    },
  ],
};

const keyValueSection = {
  name: 'keyValueSection',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/dataDictionaryInfrastructure/keyValueSection',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.keyValueSection.pageList.permission,
  ],
  routes: [
    {
      path: '/dataDictionaryInfrastructure/keyValueSection',
      redirect: '/dataDictionaryInfrastructure/keyValueSection/pageList',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueSection/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/dataDictionaryInfrastructure/keyValueSection/pageList/no',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueSection/pageList/:pageKey',
      hideInMenu: true,
      component: './general/KeyValueSection/PageList',
    },
  ],
};

const keyValueWorkflow = {
  name: 'keyValueWorkflow',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/dataDictionaryInfrastructure/keyValueWorkflow',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.keyValueWorkflow.pageList.permission,
  ],
  routes: [
    {
      path: '/dataDictionaryInfrastructure/keyValueWorkflow',
      redirect: '/dataDictionaryInfrastructure/keyValueWorkflow/pageList',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueWorkflow/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/dataDictionaryInfrastructure/keyValueWorkflow/pageList/no',
    },
    {
      path: '/dataDictionaryInfrastructure/keyValueWorkflow/pageList/:pageKey',
      hideInMenu: true,
      component: './general/KeyValueWorkflow/PageList',
    },
  ],
};

export const dataDictionaryInfrastructure = {
  name: 'dataDictionaryInfrastructure',
  icon: 'reconciliation',
  path: '/dataDictionaryInfrastructure',
  access: 'checkAccess',
  authority: [accessWayCollection.super.permission],
  routes: [
    {
      path: '/dataDictionaryInfrastructure',
      redirect: '/dataDictionaryInfrastructure/keyValueInfrastructure',
    },
    keyValueInfrastructure,
    keyValueApplication,
    keyValueSection,
    keyValueWorkflow,
  ],
};

const sqlEntityInfrastructure = {
  name: 'sqlEntityInfrastructure',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/developTools/sqlEntityInfrastructure',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.sqlEntity.pageListInfrastructure.permission,
  ],
  routes: [
    {
      path: '/developTools/sqlEntityInfrastructure',
      redirect: '/developTools/sqlEntityInfrastructure/pageList',
    },
    {
      path: '/developTools/sqlEntityInfrastructure/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/developTools/sqlEntityInfrastructure/pageList/no',
    },
    {
      path: '/developTools/sqlEntityInfrastructure/pageList/:pageKey',
      hideInMenu: true,
      component: './general/SqlEntity/PageListInfrastructure',
    },
  ],
};

const sqlEntityBusiness = {
  name: 'sqlEntityBusiness',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/developTools/sqlEntityBusiness',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.sqlEntity.pageListBusiness.permission,
  ],
  routes: [
    {
      path: '/developTools/sqlEntityBusiness',
      redirect: '/developTools/sqlEntityBusiness/pageList',
    },
    {
      path: '/developTools/sqlEntityBusiness/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/developTools/sqlEntityBusiness/pageList/no',
    },
    {
      path: '/developTools/sqlEntityBusiness/pageList/:pageKey',
      hideInMenu: true,
      component: './general/SqlEntity/PageListBusiness',
    },
  ],
};

const developInfo = {
  name: 'developInfo',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/developTools/developInfo',
  access: 'checkAccess',
  authority: [accessWayCollection.super.permission],
  routes: [
    {
      path: '/developTools/developInfo',
      redirect: '/developTools/developInfo/overview',
    },
    {
      path: '/developTools/developInfo/overview',
      name: 'overview',
      hideInMenu: true,
      component: './general/DevelopInfo/Overview',
      routes: [
        {
          path: '/developTools/developInfo/overview',
          redirect: '/developTools/developInfo/overview/actionMap',
        },
        {
          path: '/developTools/developInfo/overview/actionMap',
          name: 'actionMap',
          component: './general/DevelopInfo/Overview/ActionMap',
        },
        {
          path: '/developTools/developInfo/overview/modelConfig',
          name: 'modelConfig',
          component: './general/DevelopInfo/Overview/ModelConfig',
        },
        {
          path: '/developTools/developInfo/overview/permissionContent',
          name: 'permissionContent',
          component: './general/DevelopInfo/Overview/PermissionContent',
        },
      ],
    },
  ],
};

const channel = {
  name: 'channel',
  icon: 'reconciliation',
  hideChildrenInMenu: true,
  path: '/developTools/channel',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.channel.pageList.permission,
  ],
  routes: [
    {
      path: '/developTools/channel',
      redirect: '/developTools/channel/pageList',
    },
    {
      path: '/developTools/channel/pageList',
      name: 'pageList',
      icon: 'bars',
      redirect: '/developTools/channel/pageList/no',
    },
    {
      path: '/developTools/channel/pageList/:pageKey',
      hideInMenu: true,
      component: './general/Channel/PageList',
    },
  ],
};

export const developTools = {
  name: 'developTools',
  icon: 'reconciliation',
  path: '/developTools',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.sqlEntity.pageListInfrastructure.permission,
    accessWayCollection.sqlEntity.pageListBusiness.permission,
  ],
  routes: [sqlEntityInfrastructure, sqlEntityBusiness, channel, developInfo],
};

export const account = {
  name: 'account',
  icon: 'team',
  path: '/account',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.masterManager.pageList.permission,
  ],
  routes: [
    {
      name: 'masterManager',
      icon: 'masterManager',
      hideChildrenInMenu: true,
      path: '/account/masterManager',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.masterManager.pageList.permission,
      ],
      routes: [
        {
          path: '/account/masterManager',
          redirect: '/account/masterManager/pageList',
        },
        {
          path: '/account/masterManager/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/account/masterManager/pageList/no',
        },
        {
          path: '/account/masterManager/pageList/:pageKey',
          hideInMenu: true,
          component: './general/MasterManager/PageList',
        },
        {
          path: '/account/masterManager/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './general/MasterManager/Edit',
          routes: [
            {
              path: '/account/masterManager/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './general/MasterManager/Edit/BasicInfo',
            },
            {
              path: '/account/masterManager/edit/:op/:id/:pageKey/loginLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/account/masterManager/edit/:op/:id/:pageKey/loginLog',
                  redirect:
                    '/account/masterManager/edit/:op/:id/:pageKey/loginLog/pageList',
                },
                {
                  path: '/account/masterManager/edit/:op/:id/:pageKey/loginLog/pageList',
                  component: './general/MasterManager/Edit/LoginLog/PageList',
                },
              ],
            },
            {
              path: '/account/masterManager/edit/:op/:id/:pageKey/operateLog',
              name: 'operateLog',
              routes: [
                {
                  path: '/account/masterManager/edit/:op/:id/:pageKey/operateLog',
                  redirect:
                    '/account/masterManager/edit/:op/:id/:pageKey/operateLog/pageList',
                },
                {
                  path: '/account/masterManager/edit/:op/:id/:pageKey/operateLog/pageList',
                  component: './general/MasterManager/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'masterManagerLoginLog',
      icon: 'masterManagerLoginLog',
      hideChildrenInMenu: true,
      path: '/account/masterManagerLoginLog',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.masterManagerLoginLog.pageList.permission,
      ],
      routes: [
        {
          path: '/account/masterManagerLoginLog',
          redirect: '/account/masterManagerLoginLog/pageList',
        },
        {
          path: '/account/masterManagerLoginLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/account/masterManagerLoginLog/pageList/no',
        },
        {
          path: '/account/masterManagerLoginLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/MasterManagerLoginLog/PageList',
        },
      ],
    },
  ],
};

export const currentAccount = {
  name: 'currentAccount',
  icon: 'user',
  path: '/currentAccount',
  routes: [
    {
      path: '/currentAccount',
      redirect: '/currentAccount/setting',
    },
    {
      name: 'setting',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/currentAccount/setting',
      component: './general/CurrentAccount/Setting',
      routes: [
        {
          path: '/currentAccount/setting',
          redirect: '/currentAccount/setting/load/basicInfo',
        },
        {
          path: '/currentAccount/setting/:op/basicInfo',
          component: './general/CurrentAccount/Setting/BasicInfo',
        },
        {
          path: '/currentAccount/setting/:op/password',
          component: './general/CurrentAccount/Setting/Password',
        },
      ],
    },
    {
      name: 'loginLog',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/currentAccount/loginLog',
      routes: [
        {
          path: '/currentAccount/loginLog',
          redirect: '/currentAccount/loginLog/pageList',
        },
        {
          path: '/currentAccount/loginLog/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/currentAccount/loginLog/pageList/no',
        },
        {
          path: '/currentAccount/loginLog/pageList/:pageKey',
          hideInMenu: true,
          component: './general/CurrentAccount/LoginLog/PageList',
        },
      ],
    },
  ],
};

export const currentManagementInfrastructure = {
  name: 'infrastructure',
  icon: 'user',
  path: '/currentManagement/infrastructure',
  access: 'checkAccess',
  hideChildrenInMenu: true,
  authority: [accessWayCollection.super.permission],
  routes: [
    {
      path: '/currentManagement/infrastructure',
      redirect: '/currentManagement/infrastructure/setting',
    },
    {
      name: 'setting',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/currentManagement/infrastructure/setting',
      component: './general/CurrentManagementInfrastructure/Setting',
      routes: [
        {
          path: '/currentManagement/infrastructure/setting',
          redirect: '/currentManagement/infrastructure/setting/load/basicInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/basicInfo',
          name: 'basicInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/BasicInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/defaultValueInfo',
          name: 'basicInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/DefaultValueInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/defaultImage',
          name: 'defaultImage',
          routes: [
            {
              path: '/currentManagement/infrastructure/setting/:op/defaultImage',
              redirect:
                '/currentManagement/infrastructure/setting/:op/defaultImage/pageList',
            },
            {
              path: '/currentManagement/infrastructure/setting/:op/defaultImage/pageList',
              component:
                './general/CurrentManagementInfrastructure/Setting/DefaultImage/PageList',
            },
          ],
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/fileStorageInfo',
          name: 'fileStorageInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/FileStorageInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/smsInfo',
          name: 'smsInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/SmsInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/secretKeyInfo',
          name: 'smsInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/SecretKeyInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/flowInfo',
          name: 'flowInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/FlowInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/scoreInfo',
          name: 'scoreInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/ScoreInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/architectureInfo',
          name: 'otherInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/ArchitectureInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/editorInfo',
          name: 'editorInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/EditorInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/diskSpaceMonitoringInfo',
          name: 'editorInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/DiskSpaceMonitoringInfo',
        },
        {
          path: '/currentManagement/infrastructure/setting/:op/otherInfo',
          name: 'otherInfo',
          component:
            './general/CurrentManagementInfrastructure/Setting/OtherInfo',
        },
      ],
    },
  ],
};

export const result = {
  path: '/result',
  name: 'result',
  icon: 'bars',
  hideInMenu: true,
  routes: [
    {
      path: '/result',
      redirect: '/result/forbidden',
    },
    {
      path: '/result/forbidden',
      name: 'forbidden',
      component: './general/Result/Forbidden',
    },
    {
      path: '/result/serverError',
      name: 'serverError',
      component: './general/Result/ServerError',
    },
    {
      path: '/result/localError',
      name: 'localError',
      component: './general/Result/LocalError',
    },
    {
      path: '/result/success',
      name: 'success',
      component: './general/Result/Success',
    },
    {
      path: '/result/info',
      name: 'info',
      component: './general/Result/Info',
    },
    {
      path: '/result/warn',
      name: 'warn',
      component: './general/Result/Warn',
    },
    {
      path: '/result/notFound',
      name: 'notFound',
      component: './general/Result/NotFound',
    },
  ],
};

export const notFound = { path: '/*', component: './general/Result/NotFound' };
