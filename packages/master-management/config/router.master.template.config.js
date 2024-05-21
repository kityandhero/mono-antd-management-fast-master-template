import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export const entrance = {
  path: '/entrance',
  layout: false,
  routes: [
    { path: '/entrance', redirect: '/entrance/signIn' },
    {
      path: '/entrance/signIn',
      component: './Entrance',
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
          component: './ErrorLog/PageList',
        },
        {
          path: '/logs/errorLog/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './ErrorLog/Edit',
          routes: [
            {
              path: '/logs/errorLog/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './ErrorLog/Edit/BasicInfo',
            },
            {
              path: '/logs/errorLog/edit/:op/:id/:pageKey/paramInfo',
              name: 'paramInfo',
              component: './ErrorLog/Edit/ParamInfo',
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
          component: './GeneralLog/PageList',
        },
        {
          path: '/logs/generalLog/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './GeneralLog/Edit',
          routes: [
            {
              path: '/logs/generalLog/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './GeneralLog/Edit/BasicInfo',
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
          component: './ExecuteLog/PageList',
        },
        {
          path: '/logs/executeLog/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './ExecuteLog/Edit',
          routes: [
            {
              path: '/logs/executeLog/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './ExecuteLog/Edit/BasicInfo',
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
          component: './SqlLog/PageList',
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
          component: './MongoSlowQueryInfo/SingleList',
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
          component: './QueueInfo/PageList',
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
      component: './WeChatMessageRecord/PageList',
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
          component: './SmsCategory/PageList',
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
          component: './SmsLog/PageList',
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
          component: './SmsCategoryStatistic/PageList',
        },
      ],
    },
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
          component: './HostService/PageList',
        },
        {
          path: '/services/hostService/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './HostService/Edit',
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
                  component: './HostService/Edit/ChangeRecord/PageList',
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
          component: './HostServiceLog/PageList',
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
          component: './ApplicationSource/PageList',
        },
        {
          path: '/app/applicationSource/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './ApplicationSource/Edit',
          routes: [
            {
              path: '/app/applicationSource/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './ApplicationSource/Edit/BasicInfo',
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
                  component: './ApplicationSource/Edit/OperateLog/PageList',
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
          component: './Application/PageList',
        },
        {
          path: '/app/application/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './Application/Edit',
          routes: [
            {
              path: '/app/application/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './Application/Edit/BasicInfo',
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
                    './Application/Edit/ApplicationNavigation/PageList',
                },
              ],
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/customGlobalDataInfo',
              name: 'customGlobalDataInfo',
              component: './Application/Edit/CustomGlobalDataInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/pagePathInfo',
              name: 'pagePathInfo',
              component: './Application/Edit/PagePathInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatApplicationInfo',
              name: 'weChatApplicationInfo',
              component: './Application/Edit/WeChatApplicationInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatPayCertificateInfo',
              name: 'weChatPayCertificateInfo',
              component: './Application/Edit/WeChatPayCertificateInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatMessageTemplateInfo',
              name: 'weChatMessageTemplateInfo',
              component: './Application/Edit/WeChatMessageTemplateInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/weChatMessageTargetPathInfo',
              name: 'weChatMessageTargetPathInfo',
              component: './Application/Edit/WeChatMessageTargetPathInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/jiGuangInfo',
              name: 'jiGuangInfo',
              component: './Application/Edit/JiGuangInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/articleNotificationInfo',
              name: 'articleNotificationInfo',
              component: './Application/Edit/ArticleNotificationInfo',
            },
            {
              path: '/app/application/edit/:op/:id/:pageKey/checkInInfo',
              name: 'checkInInfo',
              component: './Application/Edit/CheckInInfo',
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
                  component: './Application/Edit/ApplicationVersion/PageList',
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
                  component: './Application/Edit/OperateLog/PageList',
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
      component: './Tag/PageList',
    },
    {
      path: '/data/tag/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './Tag/Edit',
      routes: [
        {
          path: '/data/tag/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './Tag/Edit/BasicInfo',
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
              component: './Tag/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
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
      component: './OptionPool/PageList',
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
      component: './GeneralDiscourse/PageList',
    },
  ],
};

export const files = {
  name: 'files',
  icon: 'reconciliation',
  path: '/files',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.uploadHistory.pageList.permission,
  ],
  routes: [
    {
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
          component: './UploadHistory/PageList',
        },
      ],
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
      component: './Subsidiary/PageList',
    },
    {
      path: '/organization/subsidiary/add',
      name: 'add',
      hideInMenu: true,
      component: './Subsidiary/AddBasicInfo',
    },
    {
      path: '/organization/subsidiary/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './Subsidiary/Edit',
      routes: [
        {
          path: '/organization/subsidiary/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './Subsidiary/Edit/BasicInfo',
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
              component: './Subsidiary/Edit/OperateLog/PageList',
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
      component: './Department/PageList',
    },
    {
      path: '/organization/department/add',
      name: 'add',
      hideInMenu: true,
      component: './Department/AddBasicInfo',
    },
    {
      path: '/organization/department/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './Department/Edit',
      routes: [
        {
          path: '/organization/department/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './Department/Edit/BasicInfo',
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
              component: './Department/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
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
          component: './Organization/GraphicalTree',
        },
        {
          path: '/organization/graph/graphicalDirectDepartmentTree',
          name: 'graphicalDirectDepartmentTree',
          // hideInMenu: true,
          component: './Organization/GraphicalDirectDepartmentTree',
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
          component: './Workflow/PageList',
        },
        {
          path: '/flow/workflow/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './Workflow/Edit',
          routes: [
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './Workflow/Edit/BasicInfo',
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
                    './Workflow/Edit/WorkflowRangeEffectiveSubsidiaryRelation/PageList',
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
                    './Workflow/Edit/WorkflowRangeEffectiveExternalDepartmentRelation/PageList',
                },
              ],
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/fromInfo',
              name: 'fromInfo',
              component: './Workflow/Edit/FromInfo',
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/designInfo',
              name: 'designInfo',
              component: './Workflow/Edit/DesignInfo',
            },
            {
              path: '/flow/workflow/edit/:op/:id/:pageKey/debugCaseInfo',
              name: 'debugCaseInfo',
              component: './Workflow/Edit/DebugCaseInfo',
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
                  component: './Workflow/Edit/OperateLog/PageList',
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
          component: './WorkflowCase/PageList',
        },
        {
          path: '/flow/workflowCase/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './WorkflowCase/Edit',
          routes: [
            {
              path: '/flow/workflowCase/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './WorkflowCase/Edit/BasicInfo',
            },
            {
              path: '/flow/workflowCase/edit/:op/:id/:pageKey/formInfo',
              name: 'formInfo',
              component: './WorkflowCase/Edit/FormInfo',
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
                  component: './WorkflowCase/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
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
      component: './AccessWay/PageList',
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
      component: './PresetRole/Add',
    },
    {
      path: '/permission/presetRole/pageList/:pageKey',
      name: 'pageList',
      hideInMenu: true,
      component: './PresetRole/PageList',
    },
    {
      path: '/permission/presetRole/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './PresetRole/Edit',
      routes: [
        {
          path: '/permission/presetRole/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './PresetRole/Edit/BasicInfo',
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
              component: './PresetRole/Edit/ModuleInfo/SingleList',
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
              component: './PresetRole/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
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
      component: './User/PageList',
    },
    {
      path: '/person/user/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './User/Edit',
      routes: [
        {
          path: '/person/user/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './User/Edit/BasicInfo',
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/parentInfo',
          name: 'parentInfo',
          component: './User/Edit/ParentInfo',
        },
        {
          path: '/person/user/edit/:op/:id/:pageKey/signetInfo',
          name: 'signetInfo',
          component: './User/Edit/SignetInfo',
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
              component: './User/Edit/UserDepartmentInfo/PageList',
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
              component: './User/Edit/UserSubsidiaryInfo/PageList',
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
              component: './User/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
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
      component: './User/PageListSignet',
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
      component: './UserDevice/PageList',
    },
    {
      path: '/person/userDevice/add',
      name: 'add',
      hideInMenu: true,
      component: './UserDevice/Add',
    },
    {
      path: '/person/userDevice/edit/:op/:id/:pageKey',
      name: 'edit',
      hideInMenu: true,
      component: './UserDevice/Edit',
      routes: [
        {
          path: '/person/userDevice/edit/:op/:id/:pageKey/basicInfo',
          name: 'basicInfo',
          component: './UserDevice/Edit/BasicInfo',
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
              component: './UserDevice/Edit/OperateLog/PageList',
            },
          ],
        },
      ],
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
      component: './InternalTester/PageList',
    },
    {
      path: '/person/internalTester/add',
      hideInMenu: true,
      component: './InternalTester/Add',
    },
  ],
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
          component: './MasterManager/PageList',
        },
        {
          path: '/account/masterManager/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './MasterManager/Edit',
          routes: [
            {
              path: '/account/masterManager/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './MasterManager/Edit/BasicInfo',
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
                  component: './MasterManager/Edit/OperateLog/PageList',
                },
              ],
            },
          ],
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
      component: './CurrentAccount/Setting',
      routes: [
        {
          path: '/currentAccount/setting',
          redirect: '/currentAccount/setting/load/basicInfo',
        },
        {
          path: '/currentAccount/setting/:op/basicInfo',
          component: './CurrentAccount/Setting/BasicInfo',
        },
        {
          path: '/currentAccount/setting/:op/password',
          component: './CurrentAccount/Setting/Password',
        },
      ],
    },
  ],
};

export const currentManagement = {
  name: 'currentManagement',
  icon: 'user',
  path: '/currentManagement',
  access: 'checkAccess',
  authority: [accessWayCollection.super.permission],
  routes: [
    {
      path: '/currentManagement',
      redirect: '/currentManagement/setting',
    },
    {
      name: 'setting',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/currentManagement/setting',
      component: './CurrentManagement/Setting',
      routes: [
        {
          path: '/currentManagement/setting',
          redirect: '/currentManagement/setting/load/basicInfo',
        },
        {
          path: '/currentManagement/setting/:op/basicInfo',
          name: 'basicInfo',
          component: './CurrentManagement/Setting/BasicInfo',
        },
        {
          path: '/currentManagement/setting/:op/defaultImage',
          name: 'defaultImage',
          routes: [
            {
              path: '/currentManagement/setting/:op/defaultImage',
              redirect: '/currentManagement/setting/:op/defaultImage/pageList',
            },
            {
              path: '/currentManagement/setting/:op/defaultImage/pageList',
              component: './CurrentManagement/Setting/DefaultImage/PageList',
            },
          ],
        },
        {
          path: '/currentManagement/setting/:op/fileStorageInfo',
          name: 'fileStorageInfo',
          component: './CurrentManagement/Setting/FileStorageInfo',
        },
        {
          path: '/currentManagement/setting/:op/smsInfo',
          name: 'smsInfo',
          component: './CurrentManagement/Setting/SmsInfo',
        },
        {
          path: '/currentManagement/setting/:op/secretKeyInfo',
          name: 'smsInfo',
          component: './CurrentManagement/Setting/SecretKeyInfo',
        },
        {
          path: '/currentManagement/setting/:op/flowInfo',
          name: 'flowInfo',
          component: './CurrentManagement/Setting/FlowInfo',
        },
        {
          path: '/currentManagement/setting/:op/scoreInfo',
          name: 'scoreInfo',
          component: './CurrentManagement/Setting/ScoreInfo',
        },
        {
          path: '/currentManagement/setting/:op/yonYouKeyInfo',
          name: 'smsInfo',
          component: './CurrentManagement/Setting/YonYouKeyInfo',
        },
        {
          path: '/currentManagement/setting/:op/architectureInfo',
          name: 'otherInfo',
          component: './CurrentManagement/Setting/ArchitectureInfo',
        },
        {
          path: '/currentManagement/setting/:op/editorInfo',
          name: 'editorInfo',
          component: './CurrentManagement/Setting/EditorInfo',
        },
        {
          path: '/currentManagement/setting/:op/otherInfo',
          name: 'otherInfo',
          component: './CurrentManagement/Setting/OtherInfo',
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
      component: './Result/Forbidden',
    },
    {
      path: '/result/serverError',
      name: 'serverError',
      component: './Result/ServerError',
    },
    {
      path: '/result/localError',
      name: 'localError',
      component: './Result/LocalError',
    },
    {
      path: '/result/success',
      name: 'success',
      component: './Result/Success',
    },
    {
      path: '/result/info',
      name: 'info',
      component: './Result/Info',
    },
    {
      path: '/result/warn',
      name: 'warn',
      component: './Result/Warn',
    },
    {
      path: '/result/notFound',
      name: 'notFound',
      component: './Result/NotFound',
    },
  ],
};

export const notFound = { path: '/*', component: './Result/NotFound' };
