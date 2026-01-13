import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { columnFacadeMode, extraBuildType } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataSinglePageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { CommandDrawer } from '../CommandDrawer';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { SinglePage: SinglePageView } = DataSinglePageView;

@connect(({ databaseQueryEfficiency, schedulingControl }) => ({
  databaseQueryEfficiency,
  schedulingControl,
}))
class SinglePage extends SinglePageView {
  showSearchForm = false;

  componentAuthority =
    accessWayCollection.databaseQueryEfficiency.singleList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '数据库查询效率列表',
      paramsKey:
        accessWayCollection.databaseQueryEfficiency.singleList.paramsKey,
      loadApiPath:
        modelTypeCollection.databaseQueryEfficiencyTypeCollection.singleList,
      currentRecord: null,
    };
  }

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  showCommandDrawer = () => {
    CommandDrawer.open();
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.read(),
          text: '获取命令信息',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.databaseQueryEfficiency.getCommand.permission,
          ),
          handleClick: () => {
            this.showCommandDrawer();
          },
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.queryStatement,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageElapsedTime,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageCpuTime,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageWaitTime,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageLogicalReads,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.averageWrites,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.executionCount,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.lastExecutionTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处显示的是近期较为耗时的查询信息。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <CommandDrawer maskClosable />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default SinglePage;
