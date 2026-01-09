import { connect } from 'easy-soft-dva';

import { columnPlaceholder } from 'antd-management-fast-common';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { SinglePage: SinglePageView } = DataSinglePageView;

@connect(({ databaseLock, schedulingControl }) => ({
  databaseLock,
  schedulingControl,
}))
class SinglePage extends SinglePageView {
  showSearchForm = false;

  columnOperateVisible = false;

  componentAuthority = accessWayCollection.databaseLock.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '数据库锁查询',
      paramsKey: accessWayCollection.databaseLock.singleList.paramsKey,
      loadApiPath: modelTypeCollection.databaseLockTypeCollection.singleList,
    };
  }

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.spid,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.tableName,
      width: 320,
      showRichFacade: true,
      emptyValue: '--',
    },
    columnPlaceholder,
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '需要赋予数据库权限, 例如 赋予public角色view server state的权限 grant view server state to public, 撤销该权限 revoke view server state to public。',
        },
      ],
    };
  };
}

export default SinglePage;
