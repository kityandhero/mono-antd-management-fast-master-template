import { connect } from 'easy-soft-dva';
import { checkHasAuthority, showSimpleErrorMessage } from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  extraBuildType,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  closeSlowQueryRecordAction,
  openSlowQueryRecordAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { CurrentOperationDrawer } from '../CurrentOperationDrawer';
import { ProfilingDrawer } from '../ProfilingDrawer';

const { SinglePage: SinglePageView } = DataSinglePageView;

@connect(({ mongoSlowQueryInfo, schedulingControl }) => ({
  mongoSlowQueryInfo,
  schedulingControl,
}))
class SinglePage extends SinglePageView {
  componentAuthority =
    accessWayCollection.mongoSlowQueryInfo.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Mongo慢查询列表',
      paramsKey: accessWayCollection.mongoSlowQueryInfo.singleList.paramsKey,
      loadApiPath:
        modelTypeCollection.mongoSlowQueryInfoTypeCollection.singleList,
    };
  }

  openSlowQueryRecord = () => {
    openSlowQueryRecordAction({
      target: this,
    });
  };

  closeSlowQueryRecord = () => {
    closeSlowQueryRecordAction({
      target: this,
    });
  };

  showCurrentOperationDrawer = () => {
    CurrentOperationDrawer.open();
  };

  showProfilingDrawer = () => {
    ProfilingDrawer.open();
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.read(),
          text: '获取当前实时操作',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.mongoSlowQueryInfo.getCurrentOperations
              .permission,
          ),
          handleClick: () => {
            this.showCurrentOperationDrawer();
          },
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const that = this;

    return {
      size: 'small',
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'openSlowQueryRecord': {
            that.openSlowQueryRecord(handleData);
            break;
          }

          case 'closeSlowQueryRecord': {
            that.closeSlowQueryRecord(handleData);
            break;
          }

          case 'showProfilingDrawer': {
            that.showProfilingDrawer(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage(`can not find matched key "${key}"`);
            break;
          }
        }
      },
      handleData: {},
      items: [
        {
          key: 'openSlowQueryRecord',
          icon: iconBuilder.playCircle(),
          size: 'small',
          text: '开启慢查询日志',
          confirm: true,
          title: '即将开启慢查询日志，确定吗？',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.mongoSlowQueryInfo.openSlowQueryRecord
              .permission,
          ),
        },
        {
          key: 'closeSlowQueryRecord',
          icon: iconBuilder.pauseCircle(),
          size: 'small',
          text: '关闭慢查询日志',
          confirm: true,
          title: '即将关闭慢查询日志，确定吗？',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.mongoSlowQueryInfo.closeSlowQueryRecord
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showProfilingDrawer',
          icon: iconBuilder.read(),
          size: 'small',
          text: '查看 Profiling 状态信息',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.mongoSlowQueryInfo.getProfilingStatus
              .permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.nameSpace,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      fixed: 'right',
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '连接 mongo, 获取慢查询配置, 示例如下: db.getProfilingStatus()。',
        },
        {
          text: '开启慢日志, 设置超过100毫秒的操作为慢操作, 示例如下: db.setProfilingLevel(1,100)。',
        },
        {
          text: '查看慢日志内容, 示例如下: db.system.profile.find().sort({$natural:-1}).limit(1).explain(true)。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    return (
      <>
        <CurrentOperationDrawer maskClosable />

        <ProfilingDrawer maskClosable />
      </>
    );
  };
}

export default SinglePage;
